/**
 * Filter Types
 * Filter state management and UI types
 */

import type { SearchCriteria } from './ksys-api.types';

/**
 * Filter value type
 */
export type FilterValue = string | string[] | number | boolean;

/**
 * Active filter state
 */
export interface ActiveFilter {
	property: string;
	values: string[];
	matchType: 'MATCH' | 'NOT_MATCH' | 'CONTAINS' | 'NOT_CONTAINS';
}

/**
 * Filter state for a single filter
 */
export interface FilterState {
	property: string;
	values: string[];
	options?: Array<{ label: string; value: string }>;
	loading?: boolean;
}

/**
 * Complete filter state
 */
export interface FiltersState {
	filters: Record<string, FilterState>;
	searchText: string;
	sort?: {
		property: string;
		direction: 'asc' | 'desc';
	};
}

/**
 * Filter action types
 */
export type FilterAction =
	| { type: 'SET_FILTER'; property: string; values: string[] }
	| { type: 'CLEAR_FILTER'; property: string }
	| { type: 'CLEAR_ALL_FILTERS' }
	| { type: 'SET_SEARCH_TEXT'; text: string }
	| { type: 'SET_SORT'; property: string; direction: 'asc' | 'desc' }
	| { type: 'SET_FILTER_OPTIONS'; property: string; options: Array<{ label: string; value: string }> }
	| { type: 'SET_FILTER_LOADING'; property: string; loading: boolean };

/**
 * Convert filters to search criteria
 */
export function filtersToSearchCriteria(filters: FiltersState): SearchCriteria[] {
	const criteria: SearchCriteria[] = [];

	Object.values(filters.filters).forEach((filter) => {
		if (filter.values.length > 0) {
			criteria.push({
				property: filter.property,
				values: filter.values,
				matchtype: 'MATCH',
			});
		}
	});

	return criteria;
}

