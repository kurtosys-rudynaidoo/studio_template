/**
 * useFunds Hook
 * Fund data fetching with React Query
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { FundListResponse } from '@/types/fund.types';
import type { FiltersState } from '@/types/filter.types';
import type { ModuleConfig } from '@/types/fund-center.types';
import { FundService } from '@/services/fund-service';
import { KSYSApiService } from '@/services/ksys-api-service';

/**
 * Map fund type ID to API search value(s).
 * Institutional Strategies: Separate Account, Subadvised, and Affiliate entity types as returned by FundPress.
 * Mutual Fund excludes Affiliate entities.
 */
function getFundTypeSearchValues(fundType: string): string[] {
	if (fundType === 'separate-account') {
		return ['Separate Account', 'Subadvised', 'Affiliate'];
	}
	if (fundType === 'mutual-fund') {
		return ['Mutual Fund'];
	}
	if (fundType === 'affiliate') {
		return ['Affiliate'];
	}
	const mapping: Record<string, string> = {
		subadvised: 'Subadvised',
	};
	const value = mapping[fundType] || fundType;
	return [value];
}

/**
 * Query key factory
 */
function getFundsQueryKey(
	fundType: string,
	moduleId: string,
	filters: FiltersState,
	start: number,
) {
	// Create a hash of filters for cache key
	const filtersHash = JSON.stringify(filters);
	return ['funds', fundType, moduleId, filtersHash, start] as const;
}

/**
 * useFunds hook options
 */
export interface UseFundsOptions {
	fundType: string;
	moduleConfig: ModuleConfig;
	filters: FiltersState;
	start?: number;
	limit?: number;
	culture?: string;
	apiService: KSYSApiService;
	fundGroupProperty?: string;
	enabled?: boolean;
	embedConfig?: {
		fundlist?: string;
		culture?: string;
	};
}

/**
 * useFunds hook
 */
export function useFunds(options: UseFundsOptions) {
	const {
		fundType,
		moduleConfig,
		filters,
		start = 0,
		limit = 100,
		culture = 'en-US',
		apiService,
		fundGroupProperty,
		enabled = true,
		embedConfig,
	} = options;

	const queryClient = useQueryClient();

	// Create fund service instance (could be memoized)
	const fundService = new FundService({
		apiService,
		fundGroupProperty,
	});

	const queryKey = getFundsQueryKey(fundType, moduleConfig.id, filters, start);

	const query = useQuery<FundListResponse>({
		queryKey,
		queryFn: async () => {
			return fundService.fetchFunds({
				moduleConfig,
				filters,
				searchText: filters.searchText,
				start,
				limit,
				culture: culture || embedConfig?.culture,
				embedConfig,
				fundType: getFundTypeSearchValues(fundType),
			});
		},
		enabled,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});

	const loadMore = async (nextStart: number) => {
		const nextQueryKey = getFundsQueryKey(fundType, moduleConfig.id, filters, nextStart);

		return queryClient.fetchQuery<FundListResponse>({
			queryKey: nextQueryKey,
			queryFn: async () => {
				return fundService.fetchFunds({
					moduleConfig,
					filters,
					searchText: filters.searchText,
					start: nextStart,
					limit,
					culture,
					embedConfig,
					fundType: getFundTypeSearchValues(fundType),
				});
			},
		});
	};

	return {
		...query,
		loadMore,
	};
}

