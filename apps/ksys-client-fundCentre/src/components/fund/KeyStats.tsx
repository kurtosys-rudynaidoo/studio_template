/**
 * KeyStats Component
 * Displays key fund statistics in a two-column list layout
 */

import { useMemo } from 'react';
import type { Fund, Shareclass } from '@/types/fund.types';
import { resolveAum } from '@/utils/aum-resolver';
import { formatValue } from '@/utils/formatters';

export interface KeyStatsProps {
	fund: Fund;
	shareclass?: Shareclass;
}

interface KeyStat {
	label: string;
	value: string;
}

/** Get display string from a property that may be a value or { value: ... } (KSYS API shape) */
function getPropertyDisplayValue(prop: unknown): string | null {
	if (prop == null) return null;
	if (typeof prop === 'object' && 'value' in prop && (prop as { value: unknown }).value != null) {
		return String((prop as { value: unknown }).value);
	}
	return String(prop);
}

function KeyStats({ fund, shareclass }: KeyStatsProps) {
	const activeShareclass = shareclass || fund.shareclasses[0];

	const stats = useMemo<KeyStat[]>(() => {
		const keyStats: KeyStat[] = [];

		// Investment Style (may be object with value key from API)
		const investmentStyleRaw = activeShareclass?.properties?.investment_style || fund.properties?.investment_style;
		const investmentStyle = getPropertyDisplayValue(investmentStyleRaw);
		if (investmentStyle) {
			keyStats.push({
				label: 'Investment Style',
				value: investmentStyle,
			});
		}

		// Benchmark
		const benchmarkRaw = activeShareclass?.properties?.benchmark_primary || fund.properties?.benchmark_primary;
		const benchmark = getPropertyDisplayValue(benchmarkRaw);
		if (benchmark) {
			keyStats.push({
				label: 'Benchmark',
				value: benchmark,
			});
		}

		// Geographic focus
		const geographicFocusRaw = activeShareclass?.properties?.geographical_focus || fund.properties?.geographical_focus;
		const geographicFocus = getPropertyDisplayValue(geographicFocusRaw);
		if (geographicFocus) {
			keyStats.push({
				label: 'Geographic focus',
				value: geographicFocus,
			});
		}

		// Total Strategy Assets (AUM) — same resolution as Overview AUM column
		const aumResolved = activeShareclass ? resolveAum(activeShareclass, fund) : null;
		if (aumResolved) {
			const formattedAUM = formatValue(aumResolved.value, 'currency', {
				type: 'currency',
				options: {
					style: 'currency',
					currency: 'USD',
					notation: 'compact',
					compactDisplay: 'short',
					minimumFractionDigits: 0,
					maximumFractionDigits: 1,
				},
			});
			keyStats.push({
				label: 'Total Strategy Assets',
				value: formattedAUM,
			});
		}

		// Inception (may be object with value key from API)
		const inceptionDateRaw = activeShareclass?.properties?.inception_date || fund.properties?.inception_date;
		const inceptionDate = inceptionDateRaw != null
			? (typeof inceptionDateRaw === 'object' && 'value' in inceptionDateRaw
				? (inceptionDateRaw as { value: unknown }).value
				: inceptionDateRaw)
			: null;
		if (inceptionDate != null && inceptionDate !== '') {
			const formattedDate = formatValue(inceptionDate, 'date', {
				type: 'date',
				options: {
					month: 'numeric',
					day: 'numeric',
					year: 'numeric',
				},
			});
			keyStats.push({
				label: 'Inception',
				value: formattedDate,
			});
		}

		return keyStats;
	}, [fund, activeShareclass]);

	if (stats.length === 0) {
		return null;
	}

	return (
		<div className="fund-center-key-stats flex flex-col">
			<h2
				className="fund-center-key-stats-title mb-[42px] text-lg font-bold uppercase"
				style={{
					color: 'var(--section-header)',
					fontFamily: 'var(--font-sans)',
					fontSize: '14px',
					lineHeight: '30px',
					letterSpacing: '0.02em',
				}}>
				Key Stats
			</h2>
			<div className="flex flex-col">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="fund-center-key-stat-row flex min-h-[42px] items-start gap-3 py-2"
						style={{
							borderBottom: index < stats.length - 1 ? '1px solid #c8c8c8' : 'none',
							fontFamily: 'var(--font-sans)',
						}}>
						<div
							className="min-w-0 shrink-0 basis-[45%] pt-0.5"
							style={{
								fontSize: '16px',
								lineHeight: '18px',
								color: 'var(--text-dark)',
								fontWeight: 400,
							}}>
							<p className="m-0 leading-[18px] whitespace-nowrap">{stat.label}</p>
						</div>
						<div
							className="min-w-0 flex-1"
							style={{
								fontSize: '16px',
								lineHeight: '18px',
								color: 'var(--text-dark)',
								fontWeight: 400,
							}}>
							<p className="m-0 w-full text-right leading-snug whitespace-pre-wrap break-words">
								{stat.value}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default KeyStats;

