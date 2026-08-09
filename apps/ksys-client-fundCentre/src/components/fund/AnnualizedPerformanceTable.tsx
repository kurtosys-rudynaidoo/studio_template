/**
 * AnnualizedPerformanceTable Component
 * Table of period columns (1M, 3M, YTD, etc.) and rows (fund, benchmark, secondary benchmark)
 * From strategy-app AnnualizedPerformance; consumes monthly_performance statistic
 */

import { useMemo } from 'react';
import type { Fund, Shareclass } from '@/types/fund.types';
import { formatDate, formatNumber } from '@/utils/formatters';
import { FUND_THEAD_TH, FUND_TABLE_BODY_TD } from '@/utils/fund-table-thead';

export interface AnnualizedPerformanceTableProps {
	fund: Fund;
	shareclass?: Shareclass;
}

const PERIOD_ORDER = ['1M', '3M', 'YTD', '1YR', '3YR', '5YR', '10YR', 'SI'] as const;
const LABEL_DISPLAY: Record<string, string> = {
	'1M': '1 M',
	'3M': '3 M',
	YTD: 'YTD',
	'1YR': '1 YR',
	'3YR': '3 YR',
	'5YR': '5 YR',
	'10YR': '10 YR',
	SI: 'SI',
};

function formatCellValue(value: number | null | undefined): string {
	if (value === null || value === undefined) return '—';
	const num = typeof value === 'number' ? value : parseFloat(String(value));
	if (isNaN(num)) return '—';
	return formatNumber(num, 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function AnnualizedPerformanceTable({ fund, shareclass }: AnnualizedPerformanceTableProps) {
	const activeShareclass = shareclass || fund.shareclasses[0];
	const monthlyPerformance = useMemo(() => {
		const stats = activeShareclass?.statistics?.filter((s) => s.code === 'monthly_performance') || [];
		return stats.find((s) => s.values && Array.isArray(s.values)) || null;
	}, [activeShareclass]);

	const { periods, rows } = useMemo(() => {
		if (!monthlyPerformance?.values?.length) {
			return { periods: [] as string[], rows: [] as Array<{ label: string; values: Record<string, number | null> }> };
		}
		const periodSet = new Set<string>();
		monthlyPerformance.values.forEach((v) => {
			if (v.label) periodSet.add(v.label);
		});
		const ordered: string[] = PERIOD_ORDER.filter((p) => periodSet.has(p));
		const knownPeriodSet = new Set<string>(PERIOD_ORDER);
		periodSet.forEach((p) => {
			if (!knownPeriodSet.has(p)) ordered.push(p);
		});

		const fundName = fund.name || activeShareclass?.name || 'Fund';
		const benchmarkPrimary = (activeShareclass?.properties?.benchmark_primary as string) || 'Primary Benchmark';
		const benchmarkSecondaryRaw = activeShareclass?.properties?.benchmark_secondary;
		const benchmarkSecondary =
			benchmarkSecondaryRaw != null && benchmarkSecondaryRaw !== ''
				? String(
						typeof benchmarkSecondaryRaw === 'object' && 'value' in benchmarkSecondaryRaw
							? (benchmarkSecondaryRaw as { value: unknown }).value
							: benchmarkSecondaryRaw,
					)
				: null;

		const rowValue: Record<string, number | null> = {};
		const rowBenchmark: Record<string, number | null> = {};
		const rowSecondary: Record<string, number | null> = {};

		monthlyPerformance.values.forEach((v) => {
			const period = v.label;
			if (!period) return;
			rowValue[period] = v.value != null ? Number(v.value) : null;
			rowBenchmark[period] = v.benchmark_value != null ? Number(v.benchmark_value) : null;
			rowSecondary[period] = v.secondary_benchmark_value != null ? Number(v.secondary_benchmark_value) : null;
		});

		const rowsList: Array<{ label: string; values: Record<string, number | null> }> = [
			{ label: `${fundName} (Net of Fees)`, values: rowValue },
			{ label: benchmarkPrimary, values: rowBenchmark },
		];
		if (benchmarkSecondary) {
			rowsList.push({ label: benchmarkSecondary, values: rowSecondary });
		}
		return { periods: ordered, rows: rowsList };
	}, [monthlyPerformance, fund.name, activeShareclass]);

	const inceptionDate = (activeShareclass?.properties?.inception_date ||
		activeShareclass?.properties?.since_inception_date ||
		fund.properties?.inception_date) as string | undefined;
	const formattedInception = inceptionDate
		? formatDate(inceptionDate, { month: '2-digit', day: '2-digit', year: 'numeric' })
		: '';

	if (!periods.length || !rows.length) {
		return (
			<div className="mt-10">
				<h2
					className="mb-4 text-lg font-normal"
					style={{
						color: '#000',
						fontFamily: 'var(--font-condensed)',
						fontSize: '18px',
					}}>
					Annualized performance
				</h2>
				{inceptionDate && (
					<div className="text-sm text-muted-foreground mb-2">Since inception: {formattedInception}</div>
				)}
				<p className="text-muted-foreground">No performance data available</p>
			</div>
		);
	}

	return (
		<div className="mt-10">
			<h2
				className="mb-4 text-lg font-normal"
				style={{
					color: '#000',
					fontFamily: 'var(--font-condensed)',
					fontSize: '18px',
				}}>
				Annualized performance
			</h2>
			{inceptionDate && (
				<div className="text-sm text-muted-foreground mb-2">Since inception: {formattedInception}</div>
			)}
			<div className="min-w-0 overflow-x-hidden">
				<table
					className="w-full border-collapse"
					style={{
						fontFamily: 'var(--font-condensed)',
						fontSize: '16px',
						tableLayout: 'fixed',
						width: '100%',
					}}>
					<thead>
						<tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
							<th className={`${FUND_THEAD_TH} border-b border-border`} style={{ width: '22%', minWidth: 0 }} />
							{periods.map((period) => (
								<th
									key={period}
									className={`${FUND_THEAD_TH} border-b border-border text-left`}
									style={{ minWidth: 0 }}
								>
									{LABEL_DISPLAY[period] || period}
								</th>
							))}
						</tr>
						{inceptionDate && (
							<tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
								<th
									className="align-middle border-b border-border px-3 py-2 text-left text-xs font-normal leading-snug text-muted-foreground [font-family:var(--font-sans)]"
									style={{ width: '22%', minWidth: 0 }}
								/>
								{periods.map((period) => (
									<th
										key={period}
										className="align-middle border-b border-border px-3 py-2 text-left text-xs font-normal leading-snug text-muted-foreground [font-family:var(--font-sans)]"
									>
										{period === 'SI' ? formattedInception : ''}
									</th>
								))}
							</tr>
						)}
					</thead>
					<tbody>
						{rows.map((row, rowIndex) => (
							<tr key={rowIndex}>
								<td
									className={`${FUND_TABLE_BODY_TD} border-b border-border px-3 text-left`}
									style={{
										color: '#000',
										fontWeight: rowIndex === 0 ? 500 : 400,
										width: '22%',
										minWidth: 0,
										textAlign: 'left',
										wordWrap: 'break-word',
										overflowWrap: 'break-word',
									}}
								>
									{row.label}
								</td>
								{periods.map((period) => (
									<td
										key={period}
										className={`${FUND_TABLE_BODY_TD} border-b border-border px-3 text-left tabular-nums`}
										style={{
											color: '#000',
											fontWeight: rowIndex === 0 ? 500 : 400,
											textAlign: 'left',
										}}
									>
										{formatCellValue(row.values[period])}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default AnnualizedPerformanceTable;
