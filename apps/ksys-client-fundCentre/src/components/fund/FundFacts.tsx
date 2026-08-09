/**
 * FundFacts Component
 * Displays fund facts in a grid layout with labels and values
 */

import { useMemo } from 'react';
import type { Fund, Shareclass } from '@/types/fund.types';
import { resolveAum } from '@/utils/aum-resolver';
import { formatValue } from '@/utils/formatters';

export interface FundFactsProps {
	fund: Fund;
	shareclass?: Shareclass;
}

interface FundFact {
	label: string;
	value: string | number | null | undefined;
	asAtDate?: string;
	id: string;
}

function FundFacts({ fund, shareclass }: FundFactsProps) {
	const activeShareclass = shareclass || fund.shareclasses[0];

	// Build fund facts from properties and statistics
	const fundFacts = useMemo<FundFact[]>(() => {
		const facts: FundFact[] = [];

		// Primary Benchmark
		const benchmarkPrimary = activeShareclass?.properties?.benchmark_primary || fund.properties?.benchmark_primary;
		if (benchmarkPrimary) {
			facts.push({
				id: 'primaryBenchmark',
				label: 'Primary Benchmark',
				value: String(benchmarkPrimary),
			});
		}

		// Since Inception Date
		const sinceInceptionDate = activeShareclass?.properties?.since_inception_date || fund.properties?.since_inception_date;
		if (sinceInceptionDate) {
			const formattedDate = formatValue(sinceInceptionDate, 'date', {
				type: 'date',
				options: {
					month: '2-digit',
					day: '2-digit',
					year: 'numeric',
				},
			});
			facts.push({
				id: 'sinceInceptionDate',
				label: 'Since Inception Date',
				value: formattedDate,
			});
		}

		// Geographical Focus
		const geographicalFocus = activeShareclass?.properties?.geographical_focus || fund.properties?.geographical_focus;
		if (geographicalFocus) {
			facts.push({
				id: 'geographicalFocus',
				label: 'Geographical Focus',
				value: String(geographicalFocus),
			});
		}

		// Market Capitalization Focus
		const marketCapFocus = activeShareclass?.properties?.market_cap_focus || fund.properties?.market_cap_focus;
		if (marketCapFocus) {
			facts.push({
				id: 'marketCapitalizationFocus',
				label: 'Market Capitalization Focus',
				value: String(marketCapFocus),
			});
		}

		// Strategy Assets (AUM) — same resolution as Overview AUM column
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
			facts.push({
				id: 'strategyAssets',
				label: 'Strategy Assets',
				value: formattedAUM,
				asAtDate: aumResolved.asAtDate,
			});
		}

		// Number of equity holdings (from port_chars)
		const portChars = activeShareclass?.statistics?.filter((s) => s.code === 'port_chars') || [];
		const numHoldings = portChars.find((s) => s.label === 'num_of_equity_holdings');
		if (numHoldings?.value !== null && numHoldings?.value !== undefined) {
			facts.push({
				id: 'numberOfEquityHoldingsInPortfolio',
				label: 'Number of equity holdings in portfolio',
				value: String(numHoldings.value),
				asAtDate: numHoldings.asAtDate,
			});
		}

		// Upside / Downside Capture (from risk_stats)
		const riskStats = activeShareclass?.statistics?.filter((s) => s.code === 'risk_stats') || [];
		const upsideCapture = riskStats.find((s) => s.label === 'upside_capture_ratio');
		const downsideCapture = riskStats.find((s) => s.label === 'downside_capture_ratio');
		if (upsideCapture && upsideCapture.value !== null && downsideCapture && downsideCapture.value !== null) {
			const upsideValue = typeof upsideCapture.value === 'number' ? upsideCapture.value : parseFloat(String(upsideCapture.value));
			const downsideValue = typeof downsideCapture.value === 'number' ? downsideCapture.value : parseFloat(String(downsideCapture.value));
			facts.push({
				id: 'upsideDownsideCapture',
				label: 'Upside / Downside Capture',
				value: `${upsideValue.toFixed(1)} / ${downsideValue.toFixed(1)}`,
				asAtDate: upsideCapture.asAtDate,
			});
		}

		// Standard Deviation
		const stdDev = riskStats.find((s) => s.label === 'standard_deviation');
		if (stdDev?.value !== null && stdDev?.value !== undefined) {
			const stdDevValue = typeof stdDev.value === 'number' ? stdDev.value : parseFloat(String(stdDev.value));
			facts.push({
				id: 'standardDeviation',
				label: 'Standard Deviation',
				value: `${stdDevValue.toFixed(2)}%`,
				asAtDate: stdDev.asAtDate,
			});
		}

		// Beta
		const beta = riskStats.find((s) => s.label === 'beta');
		if (beta?.value !== null && beta?.value !== undefined) {
			facts.push({
				id: 'beta',
				label: 'Beta',
				value: String(beta.value),
				asAtDate: beta.asAtDate,
			});
		}

		// Sharpe Ratio
		const sharpeRatio = riskStats.find((s) => s.label === 'sharpe_ratio');
		if (sharpeRatio?.value !== null && sharpeRatio?.value !== undefined) {
			facts.push({
				id: 'sharpeRatio',
				label: 'Sharpe Ratio',
				value: String(sharpeRatio.value),
				asAtDate: sharpeRatio.asAtDate,
			});
		}

		// Alpha
		const alpha = riskStats.find((s) => s.label === 'alpha');
		if (alpha?.value !== null && alpha?.value !== undefined) {
			const alphaValue = typeof alpha.value === 'number' ? alpha.value : parseFloat(String(alpha.value));
			facts.push({
				id: 'alpha',
				label: 'Alpha',
				value: `${alphaValue.toFixed(2)}%`,
				asAtDate: alpha.asAtDate,
			});
		}

		// PE (FY1) Multiple
		const peMultiple = portChars.find((s) => s.label === 'pe_fy1_multiple');
		if (peMultiple?.value !== null && peMultiple?.value !== undefined) {
			facts.push({
				id: 'peFy1Multiple',
				label: 'PE (FY1) Multiple',
				value: String(peMultiple.value),
				asAtDate: peMultiple.asAtDate,
			});
		}

		// Free Cash Flow Yield
		const fcfYield = portChars.find((s) => s.label === 'free_cash_flow_yield');
		if (fcfYield?.value !== null && fcfYield?.value !== undefined) {
			const fcfValue = typeof fcfYield.value === 'number' ? fcfYield.value : parseFloat(String(fcfYield.value));
			facts.push({
				id: 'freeCashFlowYield',
				label: 'Free Cash Flow Yield',
				value: `${fcfValue.toFixed(2)}%`,
				asAtDate: fcfYield.asAtDate,
			});
		}

		// Portfolio Turnover
		const turnover = portChars.find((s) => s.label === 'portfolio_turnover_trailing_12mo');
		if (turnover?.value !== null && turnover?.value !== undefined) {
			const turnoverValue = typeof turnover.value === 'number' ? turnover.value : parseFloat(String(turnover.value));
			facts.push({
				id: 'portfolioTurnoverTrailing_12Months',
				label: 'Portfolio Turnover (Trailing 12 Months)',
				value: `${turnoverValue.toFixed(2)}%`,
				asAtDate: turnover.asAtDate,
			});
		}

		return facts;
	}, [fund, activeShareclass]);

	if (fundFacts.length === 0) {
		return null;
	}

	// Info icon SVG (13px x 13px) - blue circle with white "i"
	const InfoIcon = () => (
		<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="6.5" cy="6.5" r="6.5" fill="#003a54" />
			<text x="6.5" y="9.5" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">i</text>
		</svg>
	);

	return (
		<div className="mb-10">
			<div className="grid grid-cols-2 grid-rows-5 gap-0">
				{fundFacts.slice(0, 10).map((fact) => (
					<div
						key={fact.id}
						className="bg-white border-[#c8c8c8] border-[0.5px] border-solid flex flex-col gap-[10px] h-[140px] items-center justify-center px-0 py-[24px]"
						aria-label={`${fact.label} Fund Fact`}>
						<div className="flex flex-col gap-[6px] items-center">
							<div className="flex gap-[10px] items-start justify-center">
								<div
									className="text-center tracking-[-0.24px] whitespace-nowrap"
									style={{
										fontFamily: 'var(--font-condensed)',
										fontSize: '16px',
										lineHeight: 'normal',
										color: '#003a54',
										fontWeight: 400,
									}}>
									<p className="leading-[normal]">{fact.label}</p>
								</div>
								<div className="shrink-0" style={{ width: '13px', height: '13px' }}>
									<InfoIcon />
								</div>
							</div>
							{fact.asAtDate && (
								<div
									className="text-center tracking-[-0.24px]"
									style={{
										fontFamily: 'var(--font-condensed)',
										fontSize: '16px',
										lineHeight: 'normal',
										color: '#003a54',
										fontWeight: 400,
									}}>
									<p className="leading-[normal] whitespace-pre-wrap">
										as of {formatValue(fact.asAtDate, 'date', { type: 'date', options: { month: '2-digit', day: '2-digit', year: 'numeric' } })}
									</p>
								</div>
							)}
						</div>
						<div
							className="text-center whitespace-nowrap"
							style={{
								fontFamily: 'var(--font-condensed)',
								fontSize: '24px',
								lineHeight: '18px',
								color: '#000',
								fontWeight: 700,
							}}>
							<p className="leading-[18px]">{fact.value || 'N/A'}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default FundFacts;
