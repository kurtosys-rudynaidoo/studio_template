import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Fund, Shareclass } from '@/types/fund.types';
import AnnualizedPerformanceTable from './AnnualizedPerformanceTable';

function makeShareclass(overrides: Partial<Shareclass> = {}): Shareclass {
	return {
		id: 'sc1',
		code: 'A',
		name: 'Shareclass A',
		properties: {},
		statistics: [],
		...overrides,
	};
}

function makeFund(overrides: Partial<Fund> = {}): Fund {
	return {
		id: 'f1',
		kurtosysId: 'k1',
		name: 'Test Fund',
		shareclasses: [makeShareclass()],
		properties: {},
		statistics: [],
		...overrides,
	};
}

describe('AnnualizedPerformanceTable', () => {
	it('shows empty state when no monthly_performance', () => {
		const fund = makeFund();
		render(<AnnualizedPerformanceTable fund={fund} />);
		expect(screen.getByText('Annualized performance')).toBeInTheDocument();
		expect(screen.getByText('No performance data available')).toBeInTheDocument();
	});

	it('renders table with period columns and fund/benchmark rows when data present', () => {
		const shareclass = makeShareclass({
			properties: { benchmark_primary: 'S&P 500' },
			statistics: [
				{
					code: 'monthly_performance',
					label: '',
					value: null,
					values: [
						{ label: '1M', value: 1.5, benchmark_value: 1.2, secondary_benchmark_value: null },
						{ label: '3M', value: 4.2, benchmark_value: 3.8, secondary_benchmark_value: null },
					],
				},
			],
		});
		const fund = makeFund({ shareclasses: [shareclass] });
		render(<AnnualizedPerformanceTable fund={fund} />);
		expect(screen.getByText('Annualized performance')).toBeInTheDocument();
		expect(screen.getByText('1 M')).toBeInTheDocument();
		expect(screen.getByText('3 M')).toBeInTheDocument();
		expect(screen.getByText(/Test Fund \(Net of Fees\)/)).toBeInTheDocument();
		expect(screen.getByText('S&P 500')).toBeInTheDocument();
		expect(screen.getByText('1.50')).toBeInTheDocument();
		expect(screen.getByText('4.20')).toBeInTheDocument();
	});
});
