import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Fund, Shareclass } from '@/types/fund.types';
import PerformanceAndRiskMetrics from './PerformanceAndRiskMetrics';

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

describe('PerformanceAndRiskMetrics', () => {
	it('returns null when no risk or port_chars statistics', () => {
		const fund = makeFund();
		const { container } = render(<PerformanceAndRiskMetrics fund={fund} />);
		expect(container.firstChild).toBeNull();
	});

	it('renders section title and metric grid when risk_stats present', () => {
		const shareclass = makeShareclass({
			statistics: [
				{ code: 'risk_stats', label: 'standard_deviation', value: 15.5 },
				{ code: 'risk_stats', label: 'beta', value: 1.02 },
				{ code: 'risk_stats', label: 'sharpe_ratio', value: 0.85 },
			],
		});
		const fund = makeFund({ shareclasses: [shareclass] });
		render(<PerformanceAndRiskMetrics fund={fund} />);
		expect(screen.getByText('Performance and risk metrics')).toBeInTheDocument();
		expect(screen.getByText('Standard deviation')).toBeInTheDocument();
		expect(screen.getByText('Beta')).toBeInTheDocument();
		expect(screen.getByText('Sharpe ratio')).toBeInTheDocument();
	});

	it('displays formatted values for risk metrics', () => {
		const shareclass = makeShareclass({
			statistics: [
				{ code: 'risk_stats', label: 'standard_deviation', value: 12.34 },
				{ code: 'risk_stats', label: 'alpha', value: 0.5 },
			],
		});
		const fund = makeFund({ shareclasses: [shareclass] });
		render(<PerformanceAndRiskMetrics fund={fund} />);
		expect(screen.getByText('12.34%')).toBeInTheDocument();
	});
});
