/**
 * Hook to fetch disclaimers from KSYS API
 * Used for tooltips and other disclaimer content
 */

import { useQuery } from '@tanstack/react-query';
import type { KSYSApiService } from '@/services/ksys-api-service';

export interface DisclaimerItem {
	disclaimerId: number;
	disclaimerType: string;
	clientId: number;
	disclaimers: Array<{
		culture: string;
		disclaimer: string;
	}>;
	lastModified: string;
	created: string;
	status: string;
	workflow: {
		approvedBy: unknown[];
		rejectedBy: unknown[];
		status: string;
	};
	lastPublished: string;
	lastAction: string;
	disclaimers_draft: unknown[];
}

export interface ListDisclaimersResponse {
	disclaimers?: DisclaimerItem[];
}

function isDisclaimerItem(value: unknown): value is DisclaimerItem {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const record = value as Partial<DisclaimerItem>;
	return typeof record.disclaimerType === 'string' && Array.isArray(record.disclaimers);
}

/**
 * FundPress listdisclaimers may return an array, a single item, `{ disclaimers: [...] }`,
 * or a type-keyed map `{ disclaimers: { "Type Name": [{ culture, disclaimer }] } }`.
 */
export function normalizeListDisclaimersResponse(response: unknown): DisclaimerItem[] {
	if (!response) {
		return [];
	}

	if (Array.isArray(response)) {
		return response.filter(isDisclaimerItem);
	}

	if (typeof response !== 'object') {
		return [];
	}

	const record = response as Record<string, unknown>;

	if (isDisclaimerItem(record)) {
		return [record];
	}

	const nested = record.disclaimers;
	if (Array.isArray(nested)) {
		return nested.filter(isDisclaimerItem);
	}

	if (isDisclaimerItem(nested)) {
		return [nested];
	}

	if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
		return Object.entries(nested as Record<string, unknown>).flatMap(([disclaimerType, cultures]) => {
			if (!Array.isArray(cultures)) {
				return [];
			}

			return [
				{
					disclaimerId: 0,
					disclaimerType,
					clientId: 0,
					disclaimers: cultures.filter(
						(entry): entry is { culture: string; disclaimer: string } =>
							typeof entry === 'object' &&
							entry !== null &&
							typeof (entry as { culture?: unknown }).culture === 'string' &&
							typeof (entry as { disclaimer?: unknown }).disclaimer === 'string',
					),
					lastModified: '',
					created: '',
					status: '',
					workflow: { approvedBy: [], rejectedBy: [], status: '' },
					lastPublished: '',
					lastAction: '',
					disclaimers_draft: [],
				},
			];
		});
	}

	for (const key of ['values', 'data', 'items'] as const) {
		const bucket = record[key];
		if (Array.isArray(bucket)) {
			return bucket.filter(isDisclaimerItem);
		}
	}

	return [];
}

export interface UseDisclaimersOptions {
	apiService: KSYSApiService;
	global?: boolean;
	culture?: string;
	enabled?: boolean;
}

export function useDisclaimers(options: UseDisclaimersOptions) {
	const { apiService, global = true, culture = 'en-US', enabled = true } = options;

	return useQuery<ListDisclaimersResponse>({
		queryKey: ['disclaimers', global, culture],
		queryFn: async () => {
			const response = await apiService.listDisclaimers({ global });
			return { disclaimers: normalizeListDisclaimersResponse(response) };
		},
		enabled: enabled && !!apiService,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
}

/**
 * Get disclaimer content for a specific type and culture
 */
export function getDisclaimerContent(
	disclaimers: DisclaimerItem[] | undefined,
	disclaimerType: string,
	culture: string = 'en-US',
): string | null {
	if (!disclaimers) {
		return null;
	}

	const disclaimer = disclaimers.find(
		(d) => d.disclaimerType.toLowerCase() === disclaimerType.toLowerCase(),
	);
	if (!disclaimer) {
		return null;
	}

	// Find the appropriate culture, fallback to en-US, then first available
	const cultureDisclaimer =
		disclaimer.disclaimers.find((d) => d.culture === culture) ||
		disclaimer.disclaimers.find((d) => d.culture === 'en-US') ||
		disclaimer.disclaimers[0];

	return cultureDisclaimer?.disclaimer || null;
}

/** Disclaimer types to try for Mutual Fund → Overview tab footer (FundPress CMS order). */
export const MUTUAL_FUND_OVERVIEW_TAB_DISCLAIMER_TYPES = [
	'Mutual Fund Overview Tab Bottom',
	'General',
] as const;

/**
 * Returns the first matching disclaimer HTML for any of the given types.
 */
export function getDisclaimerContentForTypes(
	disclaimers: DisclaimerItem[] | undefined,
	disclaimerTypes: readonly string[],
	culture: string = 'en-US',
): string | null {
	for (const disclaimerType of disclaimerTypes) {
		const content = getDisclaimerContent(disclaimers, disclaimerType, culture);
		if (content) {
			return content;
		}
	}
	return null;
}

/** Resolves Mutual Fund → Overview tab footer copy from listdisclaimers payload. */
export function resolveMutualFundOverviewDisclaimerHtml(
	response: unknown,
	culture: string = 'en-US',
): string | null {
	const disclaimers = normalizeListDisclaimersResponse(response);
	return getDisclaimerContentForTypes(disclaimers, MUTUAL_FUND_OVERVIEW_TAB_DISCLAIMER_TYPES, culture);
}

/** Disclaimer types for Mutual Fund → Performance tab footer (FundPress CMS order). */
export const MUTUAL_FUND_PERFORMANCE_TAB_DISCLAIMER_TYPES = ['Mutual Fund Performance Tab Bottom'] as const;

/** Resolves Mutual Fund → Performance tab footer copy from listdisclaimers payload. */
export function resolveMutualFundPerformanceDisclaimerHtml(
	response: unknown,
	culture: string = 'en-US',
): string | null {
	const disclaimers = normalizeListDisclaimersResponse(response);
	return getDisclaimerContentForTypes(disclaimers, MUTUAL_FUND_PERFORMANCE_TAB_DISCLAIMER_TYPES, culture);
}

/** Disclaimer types for Institutional Strategies → Performance tab footer (FundPress CMS order). */
export const INSTITUTIONAL_STRATEGIES_PERFORMANCE_TAB_DISCLAIMER_TYPES = [
	'Global Performance Disclosure',
	'Institutional Strategies Performance Tab Bottom',
	'Strategies Performance Tab Bottom',
	'Performance',
] as const;

/** Resolves Institutional Strategies → Performance tab footer copy from listdisclaimers payload. */
export function resolveInstitutionalStrategiesPerformanceDisclaimerHtml(
	response: unknown,
	culture: string = 'en-US',
): string | null {
	const disclaimers = normalizeListDisclaimersResponse(response);
	return getDisclaimerContentForTypes(
		disclaimers,
		INSTITUTIONAL_STRATEGIES_PERFORMANCE_TAB_DISCLAIMER_TYPES,
		culture,
	);
}

