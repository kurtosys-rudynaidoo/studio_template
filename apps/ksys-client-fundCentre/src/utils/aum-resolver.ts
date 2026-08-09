/**
 * Resolve AUM (assets under management) from shareclass statistics and properties.
 * Mutual funds often use the same stats as institutional, but labels/codes can differ
 * (casing, "Total Net Assets", snake_case port_chars, or properties_pub only).
 */

import type { Fund, FundStatistic, Shareclass } from '@/types/fund.types';

export interface ResolvedAum {
	value: number;
	asAtDate?: string;
}

export function parseStatisticNumber(value: unknown): number | null {
	if (value === null || value === undefined) return null;
	if (typeof value === 'number' && Number.isFinite(value)) return value;
	if (typeof value === 'string') {
		const cleaned = value.replace(/[$,\s]/g, '');
		const n = parseFloat(cleaned);
		return Number.isFinite(n) ? n : null;
	}
	return null;
}

function normalizeLabel(label: string): string {
	return (label || '').trim().replace(/\s+/g, ' ');
}

function labelKey(label: string): string {
	return normalizeLabel(label).replace(/_/g, ' ').toLowerCase();
}

function statsWithCode(shareclass: Shareclass, codeNorm: string): FundStatistic[] {
	const want = codeNorm.toLowerCase();
	return shareclass.statistics.filter((s) => (s.code || '').toLowerCase() === want);
}

/** Preferred display labels for AUM within monthly_prices (and similar). */
const PRIMARY_AUM_LABEL_RES = [
	/^net\s*assets?$/i,
	/^total\s+net\s+assets?$/i,
	/^fund\s+total\s+net\s+assets?$/i,
	/^total\s+fund\s+assets?$/i,
	/^tna$/i,
];

function pickStatisticForAum(stats: FundStatistic[]): FundStatistic | null {
	for (const re of PRIMARY_AUM_LABEL_RES) {
		const hit = stats.find((s) => re.test(normalizeLabel(s.label)));
		if (hit && parseStatisticNumber(hit.value) != null) return hit;
	}
	const fuzzy = stats.find((s) => {
		const l = labelKey(s.label);
		if (l.includes('holding')) return false;
		return l.includes('net') && l.includes('asset');
	});
	if (fuzzy && parseStatisticNumber(fuzzy.value) != null) return fuzzy;
	for (const s of stats) {
		if (parseStatisticNumber(s.value) != null) return s;
	}
	return null;
}

const PORT_CHARS_AUM_KEY_RES = [
	/^total\s*net\s*assets?$/i,
	/^fund\s*net\s*assets?$/i,
	/^aum$/i,
	/^tna$/i,
	/^assets?\s*under\s*management$/i,
];

function pickPortCharsAum(stats: FundStatistic[]): FundStatistic | null {
	for (const s of stats) {
		const key = labelKey(s.label);
		if (PORT_CHARS_AUM_KEY_RES.some((re) => re.test(key)) && parseStatisticNumber(s.value) != null) {
			return s;
		}
	}
	for (const s of stats) {
		const key = labelKey(s.label);
		if (key.includes('net') && key.includes('asset') && !key.includes('holding') && parseStatisticNumber(s.value) != null) {
			return s;
		}
	}
	return null;
}

const AUM_PROPERTY_KEYS = [
	'total_net_assets',
	'net_assets',
	'aum',
	'fund_aum',
	'total_assets',
	'strategy_assets',
	'net_asset_value',
	'fund_net_assets',
	'total_fund_assets',
];

function pickAumFromProperties(shareclass: Shareclass, fund: Fund): number | null {
	for (const key of AUM_PROPERTY_KEYS) {
		const raw = shareclass.properties?.[key] ?? fund.properties?.[key];
		const n = parseStatisticNumber(raw);
		if (n != null) return n;
	}
	return null;
}

/**
 * Best-effort AUM from monthly_prices, then port_chars, then properties_pub-backed properties.
 */
export function resolveAum(shareclass: Shareclass, fund: Fund): ResolvedAum | null {
	const monthly = statsWithCode(shareclass, 'monthly_prices');
	const fromMonthly = pickStatisticForAum(monthly);
	if (fromMonthly) {
		const v = parseStatisticNumber(fromMonthly.value);
		if (v != null) {
			return { value: v, asAtDate: fromMonthly.asAtDate };
		}
	}

	const port = statsWithCode(shareclass, 'port_chars');
	const fromPort = pickPortCharsAum(port);
	if (fromPort) {
		const v = parseStatisticNumber(fromPort.value);
		if (v != null) {
			return { value: v, asAtDate: fromPort.asAtDate };
		}
	}

	const fromProps = pickAumFromProperties(shareclass, fund);
	if (fromProps != null) {
		return { value: fromProps };
	}

	return null;
}

/**
 * Single statistic row: `statistics[].code` + normalized label (e.g. `daily_prices` + `net_assets`).
 * Label match uses the same normalization as other AUM label helpers (spaces, case, underscores).
 */
export function resolveStatisticByCodeAndLabel(
	shareclass: Shareclass,
	statisticCode: string,
	statisticLabel: string,
): ResolvedAum | null {
	const wantCode = statisticCode.trim().toLowerCase();
	const wantLabelKey = labelKey(statisticLabel);
	const stats = shareclass.statistics.filter((s) => (s.code || '').trim().toLowerCase() === wantCode);
	const hit = stats.find((s) => labelKey(s.label || '') === wantLabelKey);
	if (!hit) return null;
	const v = parseStatisticNumber(hit.value);
	if (v == null) return null;
	return { value: v, asAtDate: hit.asAtDate };
}

/**
 * Latest non-null `asAtDate` for a fixed statistic (code + label) across all shareclasses in `funds`.
 */
export function getLatestStatisticAsAtDateRaw(
	funds: Fund[],
	statisticCode: string,
	statisticLabel: string,
): string | undefined {
	const seen: string[] = [];
	for (const fund of funds) {
		for (const sc of fund.shareclasses) {
			const d = resolveStatisticByCodeAndLabel(sc, statisticCode, statisticLabel)?.asAtDate;
			if (d != null && String(d).trim() !== '') {
				seen.push(String(d).trim());
			}
		}
	}
	if (seen.length === 0) return undefined;
	const unique = [...new Set(seen)];
	if (unique.length === 1) return unique[0];
	const scored = unique.map((s) => ({ s, t: Date.parse(s) }));
	const parsed = scored.filter((x) => !Number.isNaN(x.t));
	if (parsed.length > 0) {
		return parsed.reduce((best, cur) => (cur.t > best.t ? cur : best)).s;
	}
	return unique.sort().at(-1);
}

/**
 * Latest non-null AUM `asAtDate` across all shareclasses in `funds` (for a shared table column header).
 * When multiple dates exist, returns the chronologically latest parseable value; otherwise the last sorted string.
 */
export function getLatestAumAsAtDateRaw(funds: Fund[]): string | undefined {
	const seen: string[] = [];
	for (const fund of funds) {
		for (const sc of fund.shareclasses) {
			const d = resolveAum(sc, fund)?.asAtDate;
			if (d != null && String(d).trim() !== '') {
				seen.push(String(d).trim());
			}
		}
	}
	if (seen.length === 0) return undefined;
	const unique = [...new Set(seen)];
	if (unique.length === 1) return unique[0];
	const scored = unique.map((s) => ({ s, t: Date.parse(s) }));
	const parsed = scored.filter((x) => !Number.isNaN(x.t));
	if (parsed.length > 0) {
		return parsed.reduce((best, cur) => (cur.t > best.t ? cur : best)).s;
	}
	return unique.sort().at(-1);
}

/**
 * Latest as-of date for cross-fund **monthly_performance** (statistic `asAtDate` and/or `values[].as_of_date`).
 * Used for a shared Performance table group header.
 */
export function getLatestMonthlyPerformanceAsAtDateRaw(funds: Fund[]): string | undefined {
	const seen: string[] = [];
	for (const fund of funds) {
		for (const sc of fund.shareclasses) {
			for (const s of sc.statistics || []) {
				if ((s.code || '').trim() !== 'monthly_performance') continue;
				const top = s.asAtDate;
				if (top != null && String(top).trim() !== '') {
					seen.push(String(top).trim());
				}
				s.values?.forEach((v) => {
					const raw = v.as_of_date;
					if (raw != null && String(raw).trim() !== '') {
						seen.push(String(raw).trim());
					}
				});
			}
		}
	}
	if (seen.length === 0) return undefined;
	const unique = [...new Set(seen)];
	if (unique.length === 1) return unique[0];
	const scored = unique.map((s) => ({ s, t: Date.parse(s) }));
	const parsed = scored.filter((x) => !Number.isNaN(x.t));
	if (parsed.length > 0) {
		return parsed.reduce((best, cur) => (cur.t > best.t ? cur : best)).s;
	}
	return unique.sort().at(-1);
}
