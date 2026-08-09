import { describe, it, expect } from 'vitest';

import {
	buildFundCenterQueryString,
	decodeCategoryTab,
	decodeTab,
	encodeCategoryTab,
	encodeTab,
	formatQueryString,
	shouldOmitTabParam,
} from './shareable-link-params';

describe('shareable-link-params', () => {
	describe('encodeCategoryTab / decodeCategoryTab', () => {
		it('maps separate-account to "separate account"', () => {
			expect(encodeCategoryTab('separate-account')).toBe('separate account');
			expect(decodeCategoryTab('separate account')).toBe('separate-account');
			expect(decodeCategoryTab('separate-account')).toBe('separate-account');
		});

		it('maps mutual-fund as mutual-fund', () => {
			expect(encodeCategoryTab('mutual-fund')).toBe('mutual-fund');
			expect(decodeCategoryTab('mutual-fund')).toBe('mutual-fund');
		});
	});

	describe('encodeTab / decodeTab', () => {
		it('maps modules to title-case tab labels', () => {
			expect(encodeTab('overview')).toBe('Overview');
			expect(encodeTab('performance')).toBe('Performance');
			expect(encodeTab('materials')).toBe('Materials');
			expect(encodeTab('forms')).toBe('Forms and applications');
		});

		it('decodes tab labels and legacy ids', () => {
			expect(decodeTab('Overview')).toBe('overview');
			expect(decodeTab('Performance')).toBe('performance');
			expect(decodeTab('Materials')).toBe('materials');
			expect(decodeTab('Forms and applications')).toBe('forms');
			expect(decodeTab('forms')).toBe('forms');
			expect(decodeTab('overview')).toBe('overview');
		});
	});

	describe('shouldOmitTabParam', () => {
		it('omits tab only for mutual-fund overview', () => {
			expect(shouldOmitTabParam('mutual-fund', 'overview')).toBe(true);
			expect(shouldOmitTabParam('mutual-fund', 'performance')).toBe(false);
			expect(shouldOmitTabParam('separate-account', 'overview')).toBe(false);
		});
	});

	describe('formatQueryString', () => {
		it('uses %20 for spaces', () => {
			const params = new URLSearchParams();
			params.set('categoryTab', 'separate account');
			params.set('tab', 'Overview');
			expect(formatQueryString(params)).toBe('categoryTab=separate%20account&tab=Overview');
		});
	});

	describe('buildFundCenterQueryString', () => {
		it('matches the agreed URL mapping table', () => {
			expect(buildFundCenterQueryString('separate-account', 'overview')).toBe(
				'categoryTab=separate%20account&tab=Overview',
			);
			expect(buildFundCenterQueryString('separate-account', 'performance')).toBe(
				'categoryTab=separate%20account&tab=Performance',
			);
			expect(buildFundCenterQueryString('separate-account', 'materials')).toBe(
				'categoryTab=separate%20account&tab=Materials',
			);
			expect(buildFundCenterQueryString('mutual-fund', 'overview')).toBe('categoryTab=mutual-fund');
			expect(buildFundCenterQueryString('mutual-fund', 'forms')).toBe(
				'categoryTab=mutual-fund&tab=Forms%20and%20applications',
			);
			expect(buildFundCenterQueryString('mutual-fund', 'materials')).toBe(
				'categoryTab=mutual-fund&tab=Materials',
			);
			expect(buildFundCenterQueryString('mutual-fund', 'performance')).toBe(
				'categoryTab=mutual-fund&tab=Performance',
			);
		});
	});
});
