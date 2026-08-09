/**
 * Hook to fetch expanded fund details
 * Fetches detailed fund information when a row is expanded
 */

import { useQuery } from '@tanstack/react-query';
import type { FundService } from '@/services/fund-service';
import type { Fund } from '@/types/fund.types';

export interface UseExpandedFundOptions {
	clientCode: string;
	culture?: string;
	fundService: FundService;
	enabled?: boolean;
}

export function useExpandedFund(options: UseExpandedFundOptions) {
	const { clientCode, culture = 'en-US', fundService, enabled = true } = options;

	return useQuery<Fund | null>({
		queryKey: ['expandedFund', clientCode, culture],
		queryFn: async () => {
			return await fundService.fetchExpandedFundDetails(clientCode, culture);
		},
		enabled: enabled && !!clientCode && !!fundService,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}

