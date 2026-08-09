/**
 * Shareable link query param encoding for Fund Center.
 * Maps internal fund type / module ids to public URL values (and back).
 *
 * Examples:
 * - separate-account + overview → ?categoryTab=separate%20account&tab=Overview
 * - mutual-fund + overview → ?categoryTab=mutual-fund  (tab omitted)
 * - mutual-fund + forms → ?categoryTab=mutual-fund&tab=Forms%20and%20applications
 */

import type { FundType, ModuleId } from '@/types/fund-center.types';

export const CATEGORY_TAB_PARAM = 'categoryTab';
export const TAB_PARAM = 'tab';

/** Legacy short param names (still accepted when reading). */
export const LEGACY_FUND_TYPE_PARAM = 't';
export const LEGACY_MODULE_PARAM = 'm';

const FUND_TYPE_TO_CATEGORY_TAB: Record<FundType, string> = {
	'separate-account': 'separate account',
	'mutual-fund': 'mutual-fund',
	subadvised: 'subadvised',
	affiliate: 'affiliate',
};

const MODULE_TO_TAB: Record<ModuleId, string> = {
	overview: 'Overview',
	performance: 'Performance',
	materials: 'Materials',
	forms: 'Forms and applications',
};

function normalizeKey(value: string): string {
	return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Encode internal fund type id for the `categoryTab` query param.
 */
export function encodeCategoryTab(fundType: FundType): string {
	return FUND_TYPE_TO_CATEGORY_TAB[fundType] ?? fundType;
}

/**
 * Decode `categoryTab` (or legacy `t`) value to an internal fund type id.
 */
export function decodeCategoryTab(raw: string | null | undefined): FundType | undefined {
	if (raw == null) return undefined;
	const key = normalizeKey(raw);
	if (!key) return undefined;

	if (key === 'separate account' || key === 'separate-account') {
		return 'separate-account';
	}
	if (key === 'mutual-fund' || key === 'mutual fund') {
		return 'mutual-fund';
	}
	if (key === 'subadvised') {
		return 'subadvised';
	}
	if (key === 'affiliate') {
		return 'affiliate';
	}

	return undefined;
}

/**
 * Encode internal module id for the `tab` query param.
 */
export function encodeTab(moduleId: ModuleId): string {
	return MODULE_TO_TAB[moduleId] ?? moduleId;
}

/**
 * Decode `tab` (or legacy `m`) value to an internal module id.
 */
export function decodeTab(raw: string | null | undefined): ModuleId | undefined {
	if (raw == null) return undefined;
	const key = normalizeKey(raw);
	if (!key) return undefined;

	if (key === 'overview') return 'overview';
	if (key === 'performance') return 'performance';
	if (key === 'materials') return 'materials';
	if (key === 'forms' || key === 'forms and applications') return 'forms';

	return undefined;
}

/**
 * Whether the `tab` param should be omitted for this fund type + module pair.
 * Mutual Fund Overview uses only `?categoryTab=mutual-fund`.
 */
export function shouldOmitTabParam(fundType: FundType, moduleId: ModuleId): boolean {
	return fundType === 'mutual-fund' && moduleId === 'overview';
}

/**
 * Serialize URLSearchParams using `%20` for spaces (matches site URL convention).
 */
export function formatQueryString(params: URLSearchParams): string {
	return params.toString().replace(/\+/g, '%20');
}

/**
 * Build the Fund Center query string (without leading `?`) for a fund type + module.
 */
export function buildFundCenterQueryString(fundType: FundType, moduleId: ModuleId): string {
	const params = new URLSearchParams();
	params.set(CATEGORY_TAB_PARAM, encodeCategoryTab(fundType));
	if (!shouldOmitTabParam(fundType, moduleId)) {
		params.set(TAB_PARAM, encodeTab(moduleId));
	}
	return formatQueryString(params);
}
