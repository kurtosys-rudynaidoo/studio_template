import type { FundCommentary } from '@/types/fund.types';

function normCulture(c: string): string {
	return String(c || '')
		.trim()
		.toLowerCase()
		.replace(/_/g, '-');
}

type CultureRow = { commentary?: string; content?: string; culture?: string };

function textFromRow(row: CultureRow): string {
	const t = row.commentary ?? row.content;
	if (t == null) return '';
	const s = String(t).trim();
	return s;
}

/**
 * Pick one localized string from API rows like `[{ commentary, culture }, ...]`.
 */
export function pickLocalizedCommentaryText(rows: unknown[] | undefined, culture: string): string | undefined {
	if (!rows?.length) return undefined;
	const list = rows.filter((x): x is CultureRow => x != null && typeof x === 'object');
	if (!list.length) return undefined;

	const tryCulture = (c: string) => {
		const n = normCulture(c);
		const row = list.find((r) => r.culture != null && normCulture(String(r.culture)) === n);
		if (!row) return undefined;
		const text = textFromRow(row);
		return text || undefined;
	};

	const attempts = [
		tryCulture(culture),
		tryCulture('en-US'),
		tryCulture('Default'),
		tryCulture('en-GB'),
		list.map(textFromRow).find((t) => t.length > 0),
	];

	for (const t of attempts) {
		if (t != null && t.trim() !== '') return t;
	}
	return undefined;
}

/**
 * Normalize `entity.commentaries` from searchEntity — supports:
 * - Object map: `{ investment_approach: [{ commentary, culture }], objective: [...] }` (object-map shape)
 * - Array: `[{ type, content }, ...]` (legacy)
 */
export function normalizeEntityCommentaries(raw: unknown, culture: string = 'en-US'): FundCommentary[] | undefined {
	if (raw == null) return undefined;

	if (Array.isArray(raw)) {
		const out: FundCommentary[] = [];
		for (const item of raw) {
			if (item == null || typeof item !== 'object') continue;
			const o = item as { type?: string; content?: string };
			const type = o.type || '';
			const content = String(o.content || '');
			if (type || content) out.push({ type, content });
		}
		return out.length > 0 ? out : undefined;
	}

	if (typeof raw === 'object' && raw !== null && !Array.isArray(raw)) {
		const out: FundCommentary[] = [];
		for (const [type, entries] of Object.entries(raw as Record<string, unknown>)) {
			if (!type || !Array.isArray(entries)) continue;
			const content = pickLocalizedCommentaryText(entries, culture);
			if (content != null && content.trim() !== '') {
				out.push({ type, content });
			}
		}
		return out.length > 0 ? out : undefined;
	}

	return undefined;
}
