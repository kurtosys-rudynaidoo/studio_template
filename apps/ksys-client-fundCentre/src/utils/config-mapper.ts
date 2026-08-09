/**
 * Configuration Mapper
 * Maps Fund Center config to component props and request body templates
 */

import type {
	FundCenterConfig,
	FundCenterEmbedConfig,
	ModuleConfig,
	FundTypeConfig,
} from '@/types/fund-center.types';
import type { KSYSSearchEntityRequest } from '@/types/ksys-api.types';
import { FUND_COMMENTARY_LIMIT_TO } from '@/constants/fund-commentary-includes';
import { STANDARD_DOCUMENTS_JOIN_SPEC } from '@/constants/document-join-spec';

/**
 * Parse embed data attributes to FundCenterEmbedConfig
 */
export function parseEmbedConfig(element: HTMLElement | null): FundCenterEmbedConfig | null {
	if (!element) {
		return null;
	}

	return {
		culture: element.getAttribute('data-culture') || 'en-US',
		country: element.getAttribute('data-country') || 'us',
		audience: element.getAttribute('data-audience') || 'institutional',
		apiUrl: element.getAttribute('data-api-url') || '',
		fundlist: element.getAttribute('data-fundlist') || '',
		baseUrl: element.getAttribute('data-base-url') || '',
		configurationKey: element.getAttribute('data-configuration-key') || 'default',
		ksysAppTemplateId: element.getAttribute('data-ksys-app-template-id') || '',
		initialized: element.getAttribute('data-initialized') === 'true',
		subadvisedLandingUrl: element.getAttribute('data-subadvised-landing-url')?.trim() || '',
	};
}

/**
 * Build initial request body from embed config
 * Based on actual FundPress API structure
 */
export function buildInitialRequestBody(
	embedConfig: FundCenterEmbedConfig,
	fundType?: string,
): Partial<KSYSSearchEntityRequest> {
	return {
		type: 'CLSS',
		clientCode: [''],
		fundList: embedConfig.fundlist ? [embedConfig.fundlist] : [],
		fundListExclusion: [],
		search: fundType
			? [
					{
						property: 'type',
						values: [fundType],
						matchtype: 'MATCH',
					},
				]
			: [],
		include: {},
		limit: 0,
		start: 0,
		culture: embedConfig.culture,
		sourceCulture: 'Default',
		translate: true,
		preserveOriginal: true,
		applyFormats: true,
		disclaimers: true,
		includeProperties: ['geographical_focus', 'kurtosys_id'],
	};
}

/**
 * Get module config by fund type and module ID
 */
export function getModuleConfig(
	config: FundCenterConfig,
	fundTypeId: string,
	moduleId: string,
): ModuleConfig | null {
	const fundType = config.fundTypes.find((ft) => ft.id === fundTypeId);
	if (!fundType) {
		return null;
	}

	const module = fundType.modules.find((m) => m.id === moduleId);
	return module || null;
}

/**
 * Get fund type config by ID
 */
export function getFundTypeConfig(
	config: FundCenterConfig,
	fundTypeId: string,
): FundTypeConfig | null {
	return config.fundTypes.find((ft) => ft.id === fundTypeId) || null;
}

/**
 * Build expanded fund request body
 * Based on actual FundPress API structure for expanded fund details
 */
export function buildExpandedFundRequestBody(
	clientCode: string,
	culture: string = 'en-US',
): KSYSSearchEntityRequest {
	return {
		type: 'CLSS',
		clientCode: [clientCode],
		search: [],
		include: {
			commentaries: {
				limitTo: [...FUND_COMMENTARY_LIMIT_TO],
			},
			disclaimers: {},
			documents: {
				joinSpec: STANDARD_DOCUMENTS_JOIN_SPEC.map((spec) => ({
					joinFrom: spec.joinFrom,
					joinTo: spec.joinTo,
					search: spec.search.map((s) => ({ ...s })),
				})),
			},
			fundManagers: {},
			statistics: {
				limitTo: [
					'monthly_prices',
					'monthly_performance',
					'quarterly_performance',
					'calendar_performance',
					'port_chars',
					'risk_stats',
					'yearly_performance',
				],
			},
		},
		applyFormats: true,
		culture,
		sourceCulture: 'Default',
		disclaimers: true,
		translate: true,
	};
}

