import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Fund } from '@/types/fund.types';
import AllFundsPerformanceTable from './AllFundsPerformanceTable';

function makeFund(overrides: Partial<Fund> = {}): Fund {
	return {
		id: 'f1',
		kurtosysId: 'k1',
		name: 'Fund One',
		shareclasses: [
			{
				id: 'sc1',
				code: 'A',
				name: 'Shareclass A',
				properties: {},
				statistics: [],
			},
		],
		properties: {},
		statistics: [],
		...overrides,
	};
}

describe('AllFundsPerformanceTable', () => {
	it('shows loading message when isLoading is true', () => {
		render(<AllFundsPerformanceTable funds={[]} isLoading />);
		expect(screen.getByText(/Loading performance data/)).toBeInTheDocument();
	});

	it('shows empty state when no funds or no performance data', () => {
		render(<AllFundsPerformanceTable funds={[]} />);
		expect(screen.getByText(/No performance data available/)).toBeInTheDocument();
	});

	it('renders table with fund names and period columns when data present', () => {
		const fund1 = makeFund({
			id: 'f1',
			name: 'Fund One',
			shareclasses: [
				{
					id: 'sc1',
					code: 'A',
					name: 'Fund One',
					properties: {},
					statistics: [
						{
							code: 'monthly_performance',
							label: '',
							value: null,
							values: [
								{ label: '1M', value: 2.1, benchmark_value: null, secondary_benchmark_value: null },
								{ label: '3M', value: 5.0, benchmark_value: null, secondary_benchmark_value: null },
							],
						},
					],
				},
			],
		});
		render(<AllFundsPerformanceTable funds={[fund1]} />);
		expect(screen.getByText('Name')).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: /Performance \(%\)/ })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: /^1 M$/ })).toBeInTheDocument();
		expect(screen.getByRole('columnheader', { name: /^3 M$/ })).toBeInTheDocument();
		expect(screen.getByText('Fund One')).toBeInTheDocument();
		expect(screen.getByText('2.10')).toBeInTheDocument();
		expect(screen.getByText('5.00')).toBeInTheDocument();
	});

	it('renders Ticker column when showTicker is true', () => {
		const fund1 = makeFund({
			shareclasses: [
				{
					id: 'sc1',
					code: 'A',
					name: 'Fund One',
					ticker: 'BPFIX',
					properties: {},
					statistics: [
						{
							code: 'monthly_performance',
							label: '',
							value: null,
							values: [
								{
									label: '1M',
									value: 1.5,
									benchmark_value: null,
									secondary_benchmark_value: null,
								},
							],
						},
					],
				},
			],
		});
		render(<AllFundsPerformanceTable funds={[fund1]} showTicker />);
		expect(screen.getByRole('columnheader', { name: 'Ticker' })).toBeInTheDocument();
		expect(screen.getByText('BPFIX')).toBeInTheDocument();
	});

	it('moves keyboard focus between grid cells with ArrowRight', async () => {
		const fund1 = makeFund({
			shareclasses: [
				{
					id: 'sc1',
					code: 'A',
					name: 'Fund One',
					properties: {},
					statistics: [
						{
							code: 'monthly_performance',
							label: '',
							value: null,
							values: [{ label: '1M', value: 2.1, benchmark_value: null, secondary_benchmark_value: null }],
						},
					],
				},
			],
		});
		render(<AllFundsPerformanceTable funds={[fund1]} />);
		const nameCell = screen.getByText('Fund One').closest('td');
		expect(nameCell).toBeTruthy();
		nameCell!.focus();
		expect(nameCell).toHaveFocus();
		fireEvent.keyDown(nameCell!, { key: 'ArrowRight' });
		await waitFor(() => {
			expect(document.activeElement?.tagName).toBe('TD');
		});
		fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
		await waitFor(() => {
			expect(document.activeElement).toHaveTextContent('2.10');
		});
	});
});
