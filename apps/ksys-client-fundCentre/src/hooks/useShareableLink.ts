/**
 * useShareableLink Hook
 * URL query parameter management for shareable links
 */

import { useCallback, useMemo } from 'react';

import type { FundType, ModuleId } from '@/types/fund-center.types';
import type { FiltersState } from '@/types/filter.types';
import {
	CATEGORY_TAB_PARAM,
	LEGACY_FUND_TYPE_PARAM,
	LEGACY_MODULE_PARAM,
	TAB_PARAM,
	decodeCategoryTab,
	decodeTab,
	encodeCategoryTab,
	encodeTab,
	formatQueryString,
	shouldOmitTabParam,
} from '@/utils/shareable-link-params';

/**
 * URL state
 */
export interface URLState {
	fundType?: FundType;
	module?: ModuleId;
	filters?: FiltersState;
}

/**
 * useShareableLink hook
 */
export function useShareableLink() {
	// Get current URL state from query params
	const getURLState = useCallback((): URLState => {
		const params = new URLSearchParams(window.location.search);

		const state: URLState = {};

		const fundType =
			decodeCategoryTab(params.get(CATEGORY_TAB_PARAM)) ||
			decodeCategoryTab(params.get(LEGACY_FUND_TYPE_PARAM)) ||
			decodeCategoryTab(params.get('fundType'));
		if (fundType) {
			state.fundType = fundType;
		}

		const module =
			decodeTab(params.get(TAB_PARAM)) ||
			decodeTab(params.get(LEGACY_MODULE_PARAM)) ||
			decodeTab(params.get('module'));
		if (module) {
			state.module = module;
		} else if (fundType === 'mutual-fund' && !params.has(TAB_PARAM) && !params.has(LEGACY_MODULE_PARAM) && !params.has('module')) {
			// Mutual Fund Overview is represented as categoryTab only (no tab param).
			state.module = 'overview';
		}

		// Parse filters from URL - simplified encoding
		const filtersParam = params.get('f');
		if (filtersParam) {
			try {
				// Try base64 decode first (new format), fallback to JSON (old format)
				try {
					const decoded = atob(filtersParam);
					state.filters = JSON.parse(decoded) as FiltersState;
				} catch {
					// Fallback to direct JSON parse (old format)
					state.filters = JSON.parse(decodeURIComponent(filtersParam)) as FiltersState;
				}
			} catch {
				// Invalid filters, ignore
			}
		}

		return state;
	}, []);

	// Build shareable URL with categoryTab / tab encoding
	const buildShareableURL = useCallback((state: URLState): string => {
		const params = new URLSearchParams();

		if (state.fundType) {
			params.set(CATEGORY_TAB_PARAM, encodeCategoryTab(state.fundType));
		}

		if (state.module && state.fundType && !shouldOmitTabParam(state.fundType, state.module)) {
			params.set(TAB_PARAM, encodeTab(state.module));
		} else if (state.module && !state.fundType) {
			params.set(TAB_PARAM, encodeTab(state.module));
		}

		// Only include filters if there are active filters
		if (state.filters) {
			const hasActiveFilters =
				Object.values(state.filters.filters || {}).some((f) => f.values && f.values.length > 0) ||
				(state.filters.searchText && state.filters.searchText.trim().length > 0);

			if (hasActiveFilters) {
				// Use base64 encoding for filters to make URL shorter
				try {
					const filtersJson = JSON.stringify(state.filters);
					const encoded = btoa(filtersJson);
					params.set('f', encoded);
				} catch {
					// Fallback to URL encoding if base64 fails
					params.set('f', encodeURIComponent(JSON.stringify(state.filters)));
				}
			}
		}

		const queryString = formatQueryString(params);
		return queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
	}, []);

	// Update URL without page reload
	const updateURL = useCallback(
		(state: URLState, replace: boolean = false) => {
			const url = buildShareableURL(state);
			if (replace) {
				window.history.replaceState({}, '', url);
			} else {
				window.history.pushState({}, '', url);
			}
		},
		[buildShareableURL],
	);

	// Copy shareable link to clipboard
	const copyShareableLink = useCallback(
		async (state: URLState): Promise<boolean> => {
			try {
				const url = buildShareableURL(state);
				const fullUrl = `${window.location.origin}${url}`;
				await navigator.clipboard.writeText(fullUrl);
				return true;
			} catch (error) {
				console.error('Failed to copy link to clipboard:', error);
				return false;
			}
		},
		[buildShareableURL],
	);

	// Get current shareable URL
	const currentURL = useMemo(() => {
		return buildShareableURL(getURLState());
	}, [buildShareableURL, getURLState]);

	return {
		getURLState,
		buildShareableURL,
		updateURL,
		copyShareableLink,
		currentURL,
	};
}
