import { describe, expect, it } from 'vitest';

import {
	normalizeListDisclaimersResponse,
	resolveInstitutionalStrategiesPerformanceDisclaimerHtml,
	resolveMutualFundOverviewDisclaimerHtml,
	resolveMutualFundPerformanceDisclaimerHtml,
} from '@/hooks/useDisclaimers';

const mutualFundOverviewDisclaimer = {
	disclaimerId: 197297,
	disclaimerType: 'Mutual Fund Overview Tab Bottom',
	clientId: 73,
	disclaimers: [
		{
			culture: 'en-US',
			disclaimer:
				'<p><i>The performance data quoted represents past performance and does not guarantee future results.</i></p>',
		},
	],
	lastModified: '2021-10-01T13:09:11.000Z',
	created: '2021-09-28T18:19:23.000Z',
	status: 'Draft',
	workflow: { approvedBy: [], rejectedBy: [], status: 'Draft' },
	lastPublished: '2021-10-01T13:09:11.000Z',
	lastAction: 'Published',
	disclaimers_draft: [],
};

describe('normalizeListDisclaimersResponse', () => {
	it('should normalize a single disclaimer object response', () => {
		const result = normalizeListDisclaimersResponse(mutualFundOverviewDisclaimer);
		expect(result).toHaveLength(1);
		expect(result[0]?.disclaimerType).toBe('Mutual Fund Overview Tab Bottom');
	});

	it('should normalize a disclaimers array wrapper', () => {
		const result = normalizeListDisclaimersResponse({ disclaimers: [mutualFundOverviewDisclaimer] });
		expect(result).toHaveLength(1);
	});

	it('should resolve overview disclaimer html for Mutual Fund Overview Tab Bottom', () => {
		const html = resolveMutualFundOverviewDisclaimerHtml(mutualFundOverviewDisclaimer, 'en-US');
		expect(html).toContain('The performance data quoted represents past performance');
	});
});

const institutionalPerformanceDisclaimer = {
	disclaimerId: 197040,
	disclaimerType: 'Global Performance Disclosure',
	clientId: 73,
	disclaimers: [
		{
			culture: 'en-US',
			disclaimer: '<p>Past performance is not an indication of future results. GIPS®</p>',
		},
	],
	lastModified: '',
	created: '',
	status: 'Published',
	workflow: { approvedBy: [], rejectedBy: [], status: 'Published' },
	lastPublished: '',
	lastAction: 'Published',
	disclaimers_draft: [],
};

describe('resolveInstitutionalStrategiesPerformanceDisclaimerHtml', () => {
	it('should resolve performance disclaimer html for Global Performance Disclosure', () => {
		const html = resolveInstitutionalStrategiesPerformanceDisclaimerHtml(
			institutionalPerformanceDisclaimer,
			'en-US',
		);
		expect(html).toContain('Past performance is not an indication of future results');
	});
});

const mutualFundPerformanceDisclaimer = {
	disclaimerId: 197239,
	disclaimerType: 'Mutual Fund Performance Tab Bottom',
	clientId: 73,
	disclaimers: [
		{
			culture: 'en-US',
			disclaimer:
				'<p><i>The performance data quoted represents past performance and does not guarantee future results.</i></p>',
		},
	],
	lastModified: '',
	created: '',
	status: 'Draft',
	workflow: { approvedBy: [], rejectedBy: [], status: 'Draft' },
	lastPublished: '',
	lastAction: 'Published',
	disclaimers_draft: [],
};

describe('resolveMutualFundPerformanceDisclaimerHtml', () => {
	it('should resolve performance disclaimer html for Mutual Fund Performance Tab Bottom', () => {
		const html = resolveMutualFundPerformanceDisclaimerHtml(mutualFundPerformanceDisclaimer, 'en-US');
		expect(html).toContain('The performance data quoted represents past performance');
	});
});
