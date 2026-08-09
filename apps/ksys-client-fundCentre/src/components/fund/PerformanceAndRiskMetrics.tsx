/**
 * PerformanceAndRiskMetrics Component
 * Displays performance and risk metrics in a grid (from strategy-app PerformanceMetrics)
 * Reads from risk_stats and port_chars statistics
 */

import { useMemo } from 'react';
import type { Fund, Shareclass } from '@/types/fund.types';
import { formatPercentage, formatNumber } from '@/utils/formatters';

export interface PerformanceAndRiskMetricsProps {
	fund: Fund;
	shareclass?: Shareclass;
}

function getStatValue(stat: { value: unknown } | undefined): string {
	if (!stat || (stat.value !== 0 && (stat.value === null || stat.value === undefined || stat.value === ''))) {
		return '—';
	}
	const num = typeof stat.value === 'number' ? stat.value : parseFloat(String(stat.value));
	if (isNaN(num)) return String(stat.value);
	return String(num);
}

function PerformanceAndRiskMetrics({ fund, shareclass }: PerformanceAndRiskMetricsProps) {
	const activeShareclass = shareclass || fund.shareclasses[0];
	const riskStats = activeShareclass?.statistics?.filter((s) => s.code === 'risk_stats') || [];
	const portChars = activeShareclass?.statistics?.filter((s) => s.code === 'port_chars') || [];

	const findByLabel = (label: string) => riskStats.find((s) => s.label === label || s.label === label.replace(/_/g, ' '));
	const findPortChar = (label: string) => portChars.find((s) => s.label === label);

	const metrics = useMemo(() => {
		const stdDev = findByLabel('standard_deviation');
		const alpha = findByLabel('alpha');
		const beta = findByLabel('beta');
		const sharpe = findByLabel('sharpe_ratio');
		const rSquared = findByLabel('r_squared');
		const upside = findByLabel('upside_capture_ratio');
		const downside = findByLabel('downside_capture_ratio');
		const activeShare = findPortChar('active_share');
		const turnover = findPortChar('portfolio_turnover_trailing_12mo') || findPortChar('portfolio_turnover');
		const numHoldings = findPortChar('num_of_equity_holdings');

		const formatPct = (val: unknown): string => {
			if (val === null || val === undefined || val === '') return '—';
			const n = typeof val === 'number' ? val : parseFloat(String(val));
			if (isNaN(n)) return '—';
			// API values are in percentage points (e.g. 12.34 = 12.34%)
			return formatPercentage(n, 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }, true);
		};
		const formatNum = (val: unknown): string => {
			if (val === null || val === undefined || val === '') return '—';
			const n = typeof val === 'number' ? val : parseFloat(String(val));
			if (isNaN(n)) return '—';
			return formatNumber(n, 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
		};
		const formatCapture = (up: unknown, down: unknown): string => {
			const u = up !== null && up !== undefined && up !== '' ? formatNum(up) : '';
			const d = down !== null && down !== undefined && down !== '' ? formatNum(down) : '';
			if (!u && !d) return '—';
			if (!u) return `—/${d}`;
			if (!d) return `${u}/—`;
			return `${u}/${d}`;
		};

		return [
			{ label: 'Standard deviation', value: stdDev ? formatPct(stdDev.value) : '—' },
			{ label: 'Alpha', value: alpha ? formatPct(alpha.value) : '—' },
			{ label: 'Beta', value: getStatValue(beta) === '—' ? '—' : formatNum(beta!.value) },
			{ label: 'Sharpe ratio', value: getStatValue(sharpe) === '—' ? '—' : formatNum(sharpe!.value) },
			{ label: 'R-squared', value: getStatValue(rSquared) === '—' ? '—' : formatNum(rSquared!.value) },
			{
				label: 'Upside/Downside capture ratio',
				value: upside || downside ? formatCapture(upside?.value, downside?.value) : '—',
			},
			{
				label: 'Active Share',
				value: activeShare ? formatPct(activeShare.value) : '—',
			},
			{
				label: 'Portfolio turnover (Trailing 12 months)',
				value: turnover ? formatPct(turnover.value) : '—',
			},
			{
				label: 'Number of equity holdings',
				value: numHoldings != null && numHoldings.value !== null && numHoldings.value !== undefined
					? String(numHoldings.value)
					: '—',
			},
		];
	}, [riskStats, portChars]);

	const hasAnyValue = metrics.some((m) => m.value !== '—');
	if (!hasAnyValue) {
		return null;
	}

	return (
		<div className="mb-8">
			<h2
				className="mb-4 text-lg font-normal"
				style={{
					color: '#000',
					fontFamily: 'var(--font-condensed)',
					fontSize: '18px',
					lineHeight: '30px',
				}}>
				Performance and risk metrics
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
				{metrics.map((metric, index) => (
					<div
						key={index}
						className="rounded border border-border p-3"
						style={{
							fontFamily: 'var(--font-condensed)',
						}}>
						<div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
						<div className="text-base font-medium" style={{ color: '#000' }}>
							{metric.value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default PerformanceAndRiskMetrics;
