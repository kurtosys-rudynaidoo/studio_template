/**
 * Hook to fetch filter options from KSYS API
 */

import { useQuery } from '@tanstack/react-query';
import type { KSYSApiService } from '@/services/ksys-api-service';
import type { SearchCriteria } from '@/types/ksys-api.types';

export interface FilterOptionsResponse {
	[property: string]: Array<{
		label: string;
		value: string;
	}>;
}

export interface UseFilterOptionsOptions {
	apiService: KSYSApiService;
	type: string;
	filterProperties: string[];
	search?: SearchCriteria[];
	fundList?: string[];
	fundListExclusion?: string[];
	enabled?: boolean;
}

export function useFilterOptions(options: UseFilterOptionsOptions) {
	const { apiService, type, filterProperties, search = [], fundList = [], fundListExclusion = [], enabled = true } = options;

	return useQuery<FilterOptionsResponse>({
		queryKey: ['filterOptions', type, filterProperties.join(','), JSON.stringify(search), fundList.join(','), fundListExclusion.join(',')],
		queryFn: async () => {
			console.log('useFilterOptions: Making API request with params:', {
				type,
				filterProperties,
				search,
				fundList,
				fundListExclusion,
			});

			const response = await apiService.getFilters({
				type,
				filterProperties,
				search,
				fundList,
				fundListExclusion,
			});

			console.log('useFilterOptions: Raw API response:', response);
			console.log('useFilterOptions: Response type:', typeof response);
			console.log('useFilterOptions: Is array?', Array.isArray(response));
			if (typeof response === 'object' && response !== null) {
				console.log('useFilterOptions: Response keys:', Object.keys(response));
			}

			return response as FilterOptionsResponse;
		},
		enabled: enabled && !!apiService && filterProperties.length > 0,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

