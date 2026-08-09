/**
 * useFilters Hook
 * Filter state management using useReducer
 */

import { useReducer, useCallback, useMemo } from 'react';

import type { FiltersState, FilterAction } from '@/types/filter.types';

/**
 * Filter reducer
 */
function filterReducer(state: FiltersState, action: FilterAction): FiltersState {
	switch (action.type) {
		case 'SET_FILTER': {
			return {
				...state,
				filters: {
					...state.filters,
					[action.property]: {
						...state.filters[action.property],
						property: action.property,
						values: action.values,
					},
				},
			};
		}

		case 'CLEAR_FILTER': {
			const newFilters = { ...state.filters };
			delete newFilters[action.property];
			return {
				...state,
				filters: newFilters,
			};
		}

		case 'CLEAR_ALL_FILTERS': {
			return {
				...state,
				filters: {},
			};
		}

		case 'SET_SEARCH_TEXT': {
			return {
				...state,
				searchText: action.text,
			};
		}

		case 'SET_SORT': {
			return {
				...state,
				sort: {
					property: action.property,
					direction: action.direction,
				},
			};
		}

		case 'SET_FILTER_OPTIONS': {
			return {
				...state,
				filters: {
					...state.filters,
					[action.property]: {
						...state.filters[action.property],
						property: action.property,
						options: action.options,
						values: state.filters[action.property]?.values || [],
					},
				},
			};
		}

		case 'SET_FILTER_LOADING': {
			return {
				...state,
				filters: {
					...state.filters,
					[action.property]: {
						...state.filters[action.property],
						property: action.property,
						loading: action.loading,
						values: state.filters[action.property]?.values || [],
					},
				},
			};
		}

		default:
			return state;
	}
}

/**
 * Initial filter state
 */
const initialState: FiltersState = {
	filters: {},
	searchText: '',
};

/**
 * useFilters hook
 */
export function useFilters(initialStateOverride?: Partial<FiltersState>) {
	const [state, dispatch] = useReducer(filterReducer, {
		...initialState,
		...initialStateOverride,
	});

	const setFilter = useCallback((property: string, values: string[]) => {
		dispatch({ type: 'SET_FILTER', property, values });
	}, []);

	const clearFilter = useCallback((property: string) => {
		dispatch({ type: 'CLEAR_FILTER', property });
	}, []);

	const clearAllFilters = useCallback(() => {
		dispatch({ type: 'CLEAR_ALL_FILTERS' });
	}, []);

	const setSearchText = useCallback((text: string) => {
		dispatch({ type: 'SET_SEARCH_TEXT', text });
	}, []);

	const setSort = useCallback((property: string, direction: 'asc' | 'desc') => {
		dispatch({ type: 'SET_SORT', property, direction });
	}, []);

	const setFilterOptions = useCallback((property: string, options: Array<{ label: string; value: string }>) => {
		dispatch({ type: 'SET_FILTER_OPTIONS', property, options });
	}, []);

	const setFilterLoading = useCallback((property: string, loading: boolean) => {
		dispatch({ type: 'SET_FILTER_LOADING', property, loading });
	}, []);

	// Check if any filters are active
	const hasActiveFilters = useMemo(() => {
		return (
			Object.values(state.filters).some((filter) => filter.values.length > 0) ||
			state.searchText.trim().length > 0
		);
	}, [state.filters, state.searchText]);

	return {
		...state,
		setFilter,
		clearFilter,
		clearAllFilters,
		setSearchText,
		setSort,
		setFilterOptions,
		setFilterLoading,
		hasActiveFilters,
	};
}

