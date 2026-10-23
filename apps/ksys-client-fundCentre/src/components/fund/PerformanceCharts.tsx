/**
 * PerformanceCharts Component
 * Performance charts with tabs for Monthly and Quarterly performance
 */

import { useState, useMemo } from 'react';
import type { Fund, Shareclass } from '@/types/fund.types';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import { formatDate } from '@/utils/formatters';
import { safeHtml } from '@/utils/safe-content';

export interface PerformanceChartsProps {
	fund: Fund;
	shareclass?: Shareclass;
}

function PerformanceCharts({ fund, shareclass }: PerformanceChartsProps) {
	const [activeTab, setActiveTab] = useState<'monthly' | 'quarterly'>('monthly');
	const activeShareclass = shareclass || fund.shareclasses[0];

	// Get performance statistics (find the one with values array preserved)
	const monthlyPerformance = useMemo(() => {
		const stats = activeShareclass?.statistics?.filter((s) => s.code === 'monthly_performance') || [];
		// Find the first one that has a values array (preserved from normalization)
		return stats.find((s) => s.values && Array.isArray(s.values)) || null;
	}, [activeShareclass]);

	const quarterlyPerformance = useMemo(() => {
		const stats = activeShareclass?.statistics?.filter((s) => s.code === 'quarterly_performance') || [];
		// Find the first one that has a values array (preserved from normalization)
		return stats.find((s) => s.values && Array.isArray(s.values)) || null;
	}, [activeShareclass]);


	// Get chart data for monthly performance
	const monthlyChartData = useMemo(() => {
		if (!monthlyPerformance || !monthlyPerformance.values) {
			return [];
		}

		// Transform statistics values to chart data format
		return monthlyPerformance.values.map((v) => ({
			period: v.label,
			fund: v.value !== null && v.value !== undefined ? Number(v.value) : 0,
			benchmark: v.benchmark_value !== null && v.benchmark_value !== undefined ? Number(v.benchmark_value) : 0,
			secondary: v.secondary_benchmark_value !== null && v.secondary_benchmark_value !== undefined ? Number(v.secondary_benchmark_value) : 0,
		}));
	}, [monthlyPerformance]);

	// Get chart data for quarterly performance
	const quarterlyChartData = useMemo(() => {
		if (!quarterlyPerformance || !quarterlyPerformance.values) {
			return [];
		}

		// Transform statistics values to chart data format
		return quarterlyPerformance.values.map((v) => ({
			period: v.label,
			fund: v.value !== null && v.value !== undefined ? Number(v.value) : 0,
			benchmark: v.benchmark_value !== null && v.benchmark_value !== undefined ? Number(v.benchmark_value) : 0,
			secondary: v.secondary_benchmark_value !== null && v.secondary_benchmark_value !== undefined ? Number(v.secondary_benchmark_value) : 0,
		}));
	}, [quarterlyPerformance]);

	// Get fund name and benchmark names
	const fundName = fund.name || activeShareclass?.name || 'Fund';
	const benchmarkPrimary = (activeShareclass?.properties?.benchmark_primary as string) || 'Benchmark';
	const benchmarkSecondary = (activeShareclass?.properties?.benchmark_secondary as string) || undefined;

	// Get as of date from the most recent statistic
	const asOfDate = useMemo(() => {
		const stats = activeShareclass?.statistics || [];
		const latestStat = stats.find((s) => s.asAtDate);
		return latestStat?.asAtDate
			? formatDate(latestStat.asAtDate, { month: '2-digit', day: '2-digit', year: 'numeric' })
			: undefined;
	}, [activeShareclass]);

	if (!monthlyPerformance && !quarterlyPerformance) {
		return null;
	}

	return (
		<div className="mt-10">
			<div
				className="flex items-start mb-4"
				style={{
					fontFamily: 'var(--font-condensed)',
				}}>
				<button
					onClick={() => setActiveTab('monthly')}
					className="flex items-center justify-center"
					style={{
						height: '51px',
						backgroundColor: activeTab === 'monthly' ? '#0072bc' : 'transparent',
						color: activeTab === 'monthly' ? '#fff' : '#000',
						fontFamily: 'var(--font-condensed)',
						fontSize: '26px',
						fontWeight: 500,
						lineHeight: 'normal',
						textAlign: 'center',
						padding: '0 20px',
						border: 'none',
						cursor: 'pointer',
						whiteSpace: 'pre-wrap',
					}}>
					Monthly Performance
				</button>
				<button
					onClick={() => setActiveTab('quarterly')}
					className="flex items-center justify-center"
					style={{
						height: '51px',
						backgroundColor: activeTab === 'quarterly' ? '#0072bc' : 'transparent',
						color: activeTab === 'quarterly' ? '#fff' : '#000',
						fontFamily: 'var(--font-condensed)',
						fontSize: '26px',
						fontWeight: 500,
						lineHeight: 'normal',
						textAlign: 'center',
						padding: '0 20px',
						border: 'none',
						cursor: 'pointer',
						whiteSpace: 'pre-wrap',
					}}>
					Quarterly Performance
				</button>
			</div>

			<div>
				{activeTab === 'monthly' ? (
					monthlyChartData.length > 0 ? (
						<div>
							<div className="flex justify-end mb-2">
								{asOfDate && (
									<div
										className="text-sm"
										style={{
											fontFamily: 'var(--font-condensed)',
											fontSize: '16px',
											color: '#000',
										}}>
										As of {asOfDate}
									</div>
								)}
							</div>
							<PerformanceBarChart
								data={monthlyChartData}
								series={[
									{ code: 'fund', label: fundName, dataKey: 'fund', color: '#003087' },
									{ code: 'benchmark', label: benchmarkPrimary, dataKey: 'benchmark', color: '#84BD00' },
									...(benchmarkSecondary
										? [{ code: 'secondary', label: benchmarkSecondary, dataKey: 'secondary', color: '#614B79' }]
										: []),
								]}
								xAxisKey="period"
								height={290}
							/>
						</div>
					) : (
						<div className="flex items-center justify-center h-[300px] text-muted-foreground">
							No monthly performance data available
						</div>
					)
				) : (
					quarterlyChartData.length > 0 ? (
						<div>
							<div className="flex justify-end mb-2">
								{asOfDate && (
									<div
										className="text-sm"
										style={{
											fontFamily: 'var(--font-condensed)',
											fontSize: '16px',
											color: '#000',
										}}>
										As of {asOfDate}
									</div>
								)}
							</div>
							<PerformanceBarChart
								data={quarterlyChartData}
								series={[
									{ code: 'fund', label: fundName, dataKey: 'fund', color: '#003087' },
									{ code: 'benchmark', label: benchmarkPrimary, dataKey: 'benchmark', color: '#84BD00' },
									...(benchmarkSecondary
										? [{ code: 'secondary', label: benchmarkSecondary, dataKey: 'secondary', color: '#614B79' }]
										: []),
								]}
								xAxisKey="period"
								height={290}
							/>
						</div>
					) : (
						<div className="flex items-center justify-center h-[300px] text-muted-foreground">
							No quarterly performance data available
						</div>
					)
				)}
			</div>

			{/* Disclaimers for charts */}
			{fund.disclaimers && (
				<ol className="mt-4 space-y-2">
					{fund.disclaimers
						.filter((d) => d.type.includes('Performance') || d.type.includes('Monthly') || d.type.includes('Quarterly'))
						.map((disclaimer, index) => (
							<li
								key={index}
								className="text-xs"
								style={{
									color: '#727272',
									fontFamily: 'var(--font-condensed)',
									fontSize: '11px',
								}}>
								<div dangerouslySetInnerHTML={{ __html: safeHtml(disclaimer.content) }} />
							</li>
						))}
				</ol>
			)}
		</div>
	);
}

export default PerformanceCharts;

