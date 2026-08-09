import { describe, expect, it } from 'vitest';

import type { Fund } from '@/types/fund.types';
import { applyUatFundDisplayFilters } from './uat-fund-filters';

function makeFund(name: string, type = 'Mutual Fund'): Fund {
	return {
		clientCode: name,
		name,
		properties: { type: { value: type } },
	} as Fund;
}

describe('applyUatFundDisplayFilters', () => {
	it('passes funds through unchanged in the generic template', () => {
		const funds = [makeFund('Acme Equity'), makeFund('Acme Bond')];
		expect(applyUatFundDisplayFilters(funds, 'mutual-fund')).toEqual(funds);
		expect(applyUatFundDisplayFilters(funds, 'separate-account')).toEqual(funds);
	});
});
