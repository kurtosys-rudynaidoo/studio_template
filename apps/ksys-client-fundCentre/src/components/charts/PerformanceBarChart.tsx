/**
 * PerformanceBarChart Component
 * Config-driven bar charts using Recharts
 */

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface ChartSeries {
	code: string;
	label: string;
	color?: string;
	dataKey: string;
}

export interface PerformanceBarChartProps {
	data: Array<Record<string, unknown>>;
	series: ChartSeries[];
	xAxisKey: string;
	xAxisLabel?: string;
	yAxisLabel?: string;
	height?: number;
}

function PerformanceBarChart({
	data,
	series,
	xAxisKey,
	xAxisLabel,
	yAxisLabel,
	height = 300,
}: PerformanceBarChartProps) {
	// Format data for Recharts
	const chartData = useMemo(() => {
		return data.map((item) => ({
			...item,
			// Ensure all series values are numbers
			...series.reduce((acc, s) => {
				const value = item[s.dataKey];
				acc[s.dataKey] = typeof value === 'number' ? value : parseFloat(String(value || 0));
				return acc;
			}, {} as Record<string, number>),
		}));
	}, [data, series]);

	if (!data || data.length === 0) {
		return (
			<div className="flex items-center justify-center h-[300px] text-muted-foreground">
				No data available
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%" height={height}>
			<BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey={xAxisKey} label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5 } : undefined} />
				<YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined} />
				<Tooltip />
				<Legend />
				{series.map((s) => (
					<Bar key={s.code} dataKey={s.dataKey} name={s.label} fill={s.color || '#8884d8'} />
				))}
			</BarChart>
		</ResponsiveContainer>
	);
}

export default PerformanceBarChart;

