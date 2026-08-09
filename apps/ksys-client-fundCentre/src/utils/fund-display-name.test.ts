import { afterEach, describe, expect, it, vi } from 'vitest';

import { formatFundDisplayName } from './fund-display-name';

describe('formatFundDisplayName', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
	});

	it('returns mutual-fund names unchanged when no prefix is configured', () => {
		expect(formatFundDisplayName('Acme Global Equity Fund', 'mutual-fund')).toBe(
			'Acme Global Equity Fund',
		);
	});

	it('strips configured mutual-fund name prefix when set', () => {
		vi.stubEnv('VITE_MUTUAL_FUND_NAME_PREFIX', 'Acme');
		expect(formatFundDisplayName('Acme Global Equity Fund', 'mutual-fund')).toBe(
			'Global Equity Fund',
		);
		expect(formatFundDisplayName('acme Small Cap Fund', 'mutual-fund')).toBe(
			'Small Cap Fund',
		);
	});

	it('does not strip prefix for institutional strategies', () => {
		vi.stubEnv('VITE_MUTUAL_FUND_NAME_PREFIX', 'Acme');
		expect(formatFundDisplayName('Acme Global Equity', 'separate-account')).toBe(
			'Acme Global Equity',
		);
	});

	it('handles empty values', () => {
		expect(formatFundDisplayName(null, 'mutual-fund')).toBe('');
		expect(formatFundDisplayName(undefined, 'mutual-fund')).toBe('');
	});
});
