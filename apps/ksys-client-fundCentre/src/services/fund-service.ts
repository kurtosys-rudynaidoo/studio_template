/**
 * Fund Data Service
 * Handles fund data fetching, normalization, and request body building
 */

import { KSYSApiService } from './ksys-api-service';
import type {
	KSYSSearchEntityRequest,
	KSYSEntity,
	KSYSDocument,
	SearchCriteria,
	IncludeConfig,
	MatchType,
} from '@/types/ksys-api.types';
import type {
	Fund,
	FundDocument,
	Shareclass,
	FundListResponse,
	FundStatistic,
} from '@/types/fund.types';
import type { FiltersState } from '@/types/filter.types';
import type { ModuleConfig } from '@/types/fund-center.types';
import { filtersToSearchCriteria } from '@/types/filter.types';
import { absolutizeKurtosysDocumentUrl, documentPathLooksLikeStorageUrl } from '@/utils/document-url';
import { openDocumentInBrowser } from '@/utils/open-document';
import { FUND_COMMENTARY_LIMIT_TO } from '@/constants/fund-commentary-includes';
import { normalizeEntityCommentaries } from '@/utils/entity-commentaries';
import { STANDARD_DOCUMENTS_JOIN_SPEC } from '@/constants/document-join-spec';
import { isFundLevelSharedDocumentType } from '@/utils/fund-documents';
import { toDisplayString } from '@/utils/formatters';

/**
 * Fund service configuration
 */
export interface FundServiceConfig {
	apiService: KSYSApiService;
	fundGroupProperty?: string;
}

/**
 * Request parameters for fetching funds
 */
export interface FetchFundsParams {
	moduleConfig: ModuleConfig;
	filters: FiltersState;
	searchText?: string;
	start?: number;
	limit?: number;
	culture?: string;
	embedConfig?: {
		fundlist?: string;
		culture?: string;
	};
	fundType?: string | string[]; // For building search criteria (array = multiple types e.g. Institutional + Subadvised)
}

/**
 * Fund Data Service
 */
export class FundService {
	private apiService: KSYSApiService;
	private fundGroupProperty: string;

	constructor(config: FundServiceConfig) {
		this.apiService = config.apiService;
		this.fundGroupProperty = config.fundGroupProperty || 'kurtosys_id';
	}

	/**
	 * Build request body from module config and UI state
	 * Based on actual FundPress API structure
	 */
	buildRequestBody(
		params: FetchFundsParams,
		embedConfig?: { fundlist?: string; culture?: string },
	): KSYSSearchEntityRequest {
		const { moduleConfig, filters, searchText, start = 0, limit = 100, culture } = params;

		// Build request body using embed config variables
		// Priority: params.culture > embedConfig.culture > default
		// Use params.embedConfig if available, otherwise use the passed embedConfig parameter
		const effectiveEmbedConfig = params.embedConfig || embedConfig;
		const requestCulture = culture || effectiveEmbedConfig?.culture || 'en-US';
		const requestFundList = effectiveEmbedConfig?.fundlist ? [effectiveEmbedConfig.fundlist] : [];

		// Start with base request body
		const requestBody: KSYSSearchEntityRequest = {
			type: 'CLSS',
			clientCode: [''],
			fundList: requestFundList,
			fundListExclusion: [],
			start,
			limit,
			culture: requestCulture,
			sourceCulture: 'Default',
			translate: true,
			preserveOriginal: true,
			applyFormats: true,
			disclaimers: true,
		};

		// Add include from module config (with defaults)
		if (moduleConfig.requestBody.include) {
			// Convert the include config to match IncludeConfig type
			const includeConfig: IncludeConfig = {
				...(moduleConfig.requestBody.include.statistics && {
					statistics: moduleConfig.requestBody.include.statistics,
				}),
				...(moduleConfig.requestBody.include.disclaimers && {
					disclaimers: moduleConfig.requestBody.include.disclaimers,
				}),
				...(moduleConfig.requestBody.include.fundManagers && {
					fundManagers: moduleConfig.requestBody.include.fundManagers,
				}),
				...(moduleConfig.requestBody.include.documents && {
					documents: {
						...(moduleConfig.requestBody.include.documents.joinSpec && {
							joinSpec: moduleConfig.requestBody.include.documents.joinSpec.map((spec) => ({
								joinFrom: spec.joinFrom,
								joinTo: spec.joinTo,
								search: (spec.search ?? []).map((s) => ({
									property: s.property,
									values: s.values,
									matchtype: s.matchtype as MatchType,
								})),
							})),
						}),
						...(moduleConfig.requestBody.include.documents.excludeExpired !== undefined && {
							excludeExpired: moduleConfig.requestBody.include.documents.excludeExpired,
						}),
					},
				}),
				...(moduleConfig.requestBody.include.commentaries && {
					commentaries: moduleConfig.requestBody.include.commentaries,
				}),
			};
			requestBody.include = includeConfig;
		}

		// Add includeProperties from module config
		if (moduleConfig.requestBody.includeProperties && moduleConfig.requestBody.includeProperties.length > 0) {
			requestBody.includeProperties = moduleConfig.requestBody.includeProperties;
		}

		// Merge search criteria from filters
		const searchCriteria = filtersToSearchCriteria(filters);
		
		// Convert module config search to SearchCriteria format
		const moduleSearch = (moduleConfig.requestBody.search || []).map((s) => ({
			property: s.property,
			values: s.values,
			matchtype: s.matchtype,
		}));
		
		if (moduleSearch.length > 0 || searchCriteria.length > 0) {
			requestBody.search = [...moduleSearch, ...searchCriteria];
		}

		// Note: We're doing client-side sorting within groups, so we don't need to pass sort to API
		// Keep the default sort for initial load, but user sorting happens client-side
		// Add sort from module config (default sort) - don't use user sort for API
		if (moduleConfig.sort && moduleConfig.sort.length > 0) {
			// Use module config sort
			requestBody.sort = moduleConfig.sort.map((s) => ({
				key: s.property,
				direction: s.direction.toUpperCase() as 'ASC' | 'DESC',
			}));
		} else {
			// Default sort if not specified in module config
			requestBody.sort = [
				{ key: 'class_name', direction: 'ASC' },
				{ key: 'benchmark_primary', direction: 'ASC' },
			];
		}

		// Identifier search (module can override properties / placeholder — e.g. Mutual Fund Materials)
		const idCfg = moduleConfig.requestBody.identifierSearch;
		const trimmedSearch = searchText && searchText.trim() ? searchText.trim() : '';
		if (idCfg) {
			requestBody.identifierSearch = {
				properties: idCfg.properties,
				fuzzy: idCfg.fuzzy ?? true,
				...(idCfg.noDataText ? { noDataText: idCfg.noDataText } : {}),
				placeholder: idCfg.placeholder,
				value: trimmedSearch,
			};
		} else {
			requestBody.identifierSearch = {
				properties: ['class_name'],
				fuzzy: true,
				noDataText: 'No Institutional Strategies found',
				placeholder: {
					format: {
						plural: 'Search Strategies by Name',
						singular: 'Search Strategies by Name',
					},
				},
				value: trimmedSearch,
			};
		}

		return requestBody;
	}

	/**
	 * Fetch funds from API
	 */
	async fetchFunds(params: FetchFundsParams): Promise<FundListResponse> {
		const requestBody = this.buildRequestBody(params, params.embedConfig);

		// Add fund type search if provided (single type or multiple, e.g. Institutional + Subadvised)
		const skipAppendedTypeSearch = params.moduleConfig.requestBody.skipAppendedFundTypeSearch === true;
		if (
			!skipAppendedTypeSearch &&
			params.fundType &&
			(Array.isArray(params.fundType) ? params.fundType.length > 0 : true)
		) {
			const values = Array.isArray(params.fundType) ? params.fundType : [params.fundType];
			const fundTypeSearch: SearchCriteria = {
				property: 'type',
				values,
				matchtype: 'MATCH',
			};

			requestBody.search = [...(requestBody.search || []), fundTypeSearch];
		}

		try {
			const response = await this.apiService.searchEntity(requestBody);

			// Normalize response to Fund objects
			// Response uses 'values' array, with 'data' as fallback
			let entities = response.values || response.data || [];

			// When multiple fund types requested (e.g. Institutional + Subadvised), sort: type order first, then name
			const typeOrder = Array.isArray(params.fundType) ? params.fundType : null;
			if (typeOrder && typeOrder.length > 1) {
				entities = [...entities].sort((a, b) => {
					const typeA = (a.type ?? this.getProperty(a, 'type')) as string | undefined;
					const typeB = (b.type ?? this.getProperty(b, 'type')) as string | undefined;
					const indexA = typeOrder.indexOf(typeA ?? '');
					const indexB = typeOrder.indexOf(typeB ?? '');
					const typeCompare = (indexA === -1 ? typeOrder.length : indexA) - (indexB === -1 ? typeOrder.length : indexB);
					if (typeCompare !== 0) return typeCompare;
					// Secondary sort: by name
					const nameA = this.getEntityName(a).toLowerCase();
					const nameB = this.getEntityName(b).toLowerCase();
					return nameA.localeCompare(nameB);
				});
			}

			const requestCulture = params.culture || params.embedConfig?.culture || 'en-US';
			const funds = this.normalizeEntities(entities, requestCulture);

			return {
				funds,
				total: response.total || funds.length,
				start: response.start || params.start || 0,
				limit: response.limit || params.limit || 50,
				hasMore: (response.start || 0) + (response.limit || 50) < (response.total || 0),
			};
		} catch (error) {
			throw error;
		}
	}

	/** Same base URL as API calls — for resolving relative document paths in the UI. */
	getApiBaseUrl(): string {
		return this.apiService.getBaseUrl();
	}

	/**
	 * Resolve a URL suitable for `window.open`: POST retrieveDocument when `clientCode` is set, else absolutized storage URL.
	 */
	async resolveDocumentOpenUrl(doc: FundDocument): Promise<string> {
		const code = doc.clientCode?.trim();
		if (code) {
			return this.apiService.retrieveDocument(code);
		}
		const raw = doc.url?.trim();
		if (!raw || raw === '#') {
			throw new Error('Document has no clientCode or storage URL');
		}
		const absolute = absolutizeKurtosysDocumentUrl(raw, this.getApiBaseUrl());
		return this.apiService.fetchAuthenticatedDocumentBlobUrl(absolute);
	}

	/** Resolve with auth (POST retrieve + blob GET) and trigger browser open/download — shared by table cells, forms, etc. */
	async openFundDocumentInBrowser(doc: FundDocument, filenameOverride?: string): Promise<void> {
		const openUrl = await this.resolveDocumentOpenUrl(doc);
		if (openUrl?.trim()) {
			openDocumentInBrowser(openUrl, filenameOverride ?? doc.filename);
		}
	}

	/**
	 * Fetch expanded fund details for a specific clientCode
	 * Used when expanding a fund row to show detailed information
	 */
	async fetchExpandedFundDetails(
		clientCode: string,
		culture: string = 'en-US',
	): Promise<Fund | null> {
		const requestBody: KSYSSearchEntityRequest = {
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

		try {
			const response = await this.apiService.searchEntity(requestBody);
			const entities = response.values || response.data || [];
			
			if (entities.length === 0) {
				return null;
			}

			const funds = this.normalizeEntities(entities, culture);
			return funds.length > 0 ? funds[0] : null;
		} catch (error) {
			console.error(`Failed to fetch expanded details for ${clientCode}:`, error);
			throw error;
		}
	}

	/**
	 * Normalize KSYS entities to Fund objects
	 */
	private normalizeEntities(entities: KSYSEntity[], culture: string = 'en-US'): Fund[] {
		// Group entities by fund (using fundGroupProperty)
		const fundMap = new Map<string, KSYSEntity[]>();

		entities.forEach((entity) => {
			const fundId = this.getFundId(entity);
			if (!fundMap.has(fundId)) {
				fundMap.set(fundId, []);
			}
			fundMap.get(fundId)!.push(entity);
		});

		// Convert grouped entities to Fund objects
		const funds: Fund[] = [];

		fundMap.forEach((shareclassEntities, fundId) => {
			const primaryEntity = shareclassEntities[0];
			const shareclasses = shareclassEntities.map((entity) =>
				this.normalizeShareclass(entity),
			);

			const mergedRawDocs = this.mergeEntityDocuments(shareclassEntities);

			const fund: Fund = {
				id: fundId,
				kurtosysId: primaryEntity.kurtosys_id || fundId,
				name: this.getEntityName(primaryEntity),
				shareclasses,
				properties: primaryEntity.properties_pub || {},
				statistics: this.normalizeStatistics(primaryEntity),
				documents: mergedRawDocs.length
					? mergedRawDocs.map(({ doc, entityKurtosysId }) => this.mapOneDocument(doc, entityKurtosysId))
					: undefined,
				commentaries: normalizeEntityCommentaries(primaryEntity.commentaries, culture),
				fundManagers: this.normalizeFundManagers(primaryEntity),
				disclaimers: this.normalizeDisclaimers(primaryEntity),
			};

			funds.push(fund);
		});

		return funds;
	}

	/**
	 * Coerce API fields used as stable string ids (grouping key, shareclass id, DOM).
	 * Prevents `String({ value: … })` → `"[object Object]"` when grouping on `properties_pub`.
	 */
	private coerceEntityIdSegment(value: unknown): string | undefined {
		if (value === null || value === undefined) return undefined;
		if (typeof value === 'string') {
			const t = value.trim();
			return t || undefined;
		}
		if (typeof value === 'number') {
			return Number.isFinite(value) ? String(value) : undefined;
		}
		if (typeof value === 'boolean') {
			return value ? 'true' : 'false';
		}
		if (typeof value === 'object' && 'value' in (value as object)) {
			return this.coerceEntityIdSegment((value as { value: unknown }).value);
		}
		return undefined;
	}

	/**
	 * Get fund ID from entity (for grouping)
	 */
	private getFundId(entity: KSYSEntity): string {
		if (this.fundGroupProperty === 'kurtosys_id' && entity.kurtosys_id != null && entity.kurtosys_id !== '') {
			const id = this.coerceEntityIdSegment(entity.kurtosys_id);
			if (id) return id;
		}

		if (
			this.fundGroupProperty &&
			this.fundGroupProperty !== 'kurtosys_id' &&
			entity.properties_pub &&
			Object.prototype.hasOwnProperty.call(entity.properties_pub, this.fundGroupProperty)
		) {
			const resolved = this.getProperty(entity, this.fundGroupProperty);
			const coerced = this.coerceEntityIdSegment(resolved);
			if (coerced) return coerced;
		}

		return (
			this.coerceEntityIdSegment(entity.code) ||
			this.coerceEntityIdSegment(entity.kurtosys_id) ||
			String(Math.random())
		);
	}

	/**
	 * Get entity name
	 */
	private getEntityName(entity: KSYSEntity): string {
		const className = this.getProperty(entity, 'class_name');
		if (className) {
			return String(className);
		}

		return entity.code || entity.clientCode || 'Unknown Fund';
	}

	/**
	 * Normalize shareclass from entity
	 */
	private normalizeShareclass(entity: KSYSEntity): Shareclass {
		return {
			id:
				this.coerceEntityIdSegment(entity.code) ||
				this.coerceEntityIdSegment(entity.kurtosys_id) ||
				String(Math.random()),
			code: this.coerceEntityIdSegment(entity.code) || '',
			clientCode: entity.clientCode,
			name: this.getEntityName(entity),
			ticker: (() => {
				const raw = this.getProperty(entity, 'ticker');
				const s = toDisplayString(raw);
				return s || undefined;
			})(),
			currency: this.getProperty(entity, 'currency') as string | undefined,
			inceptionDate: this.getProperty(entity, 'inception_date') as string | undefined,
			nav: this.getProperty(entity, 'nav') as number | undefined,
			properties: this.normalizeProperties(entity.properties_pub),
			statistics: this.normalizeStatistics(entity),
		};
	}

	/**
	 * Normalize properties_pub object
	 * Properties can be {value, originalValue} structures or direct values
	 */
	private normalizeProperties(properties_pub?: Record<string, unknown>): Record<string, unknown> {
		if (!properties_pub) {
			return {};
		}

		const normalized: Record<string, unknown> = {};

		Object.entries(properties_pub).forEach(([key, prop]) => {
			// Check if it's a KSYSPropertyValue structure
			if (typeof prop === 'object' && prop !== null && 'value' in prop) {
				normalized[key] = (prop as { value: unknown }).value;
			} else {
				normalized[key] = prop;
			}
		});

		return normalized;
	}

	/**
	 * Get property value from entity
	 * Handles both {value, originalValue} structure and direct values
	 */
	private getProperty(entity: KSYSEntity, property: string): unknown {
		if (!entity.properties_pub || !entity.properties_pub[property]) {
			return undefined;
		}

		const prop = entity.properties_pub[property];
		
		// Check if it's a KSYSPropertyValue structure
		if (typeof prop === 'object' && prop !== null && 'value' in prop) {
			return (prop as { value: unknown }).value;
		}

		// Return direct value
		return prop;
	}

	/**
	 * Normalize statistics array
	 * Statistics have a code and a values array with multiple data points
	 * We preserve both the flattened structure (for easy lookup) and the original values array (for charts)
	 */
	private normalizeStatistics(entity: KSYSEntity): FundStatistic[] {
		if (!entity.statistics || !Array.isArray(entity.statistics)) {
			return [];
		}

		const normalized: FundStatistic[] = [];

		entity.statistics.forEach((stat) => {
			if (stat.values && Array.isArray(stat.values)) {
				// Store the original values array for chart data
				const valuesArray = stat.values.map((v) => ({
					as_of_date: v.as_of_date,
					label: v.label,
					value: v.value,
					benchmark_value: v.benchmark_value,
					secondary_benchmark_value: v.secondary_benchmark_value,
					period: v.period,
				}));

				// Each statistic can have multiple values (different periods/labels)
				stat.values.forEach((statValue) => {
					normalized.push({
						code: stat.code || '',
						label: statValue.label || '',
						value: statValue.value,
						asAtDate: statValue.as_of_date,
						formattedValue: statValue.value !== null && statValue.value !== undefined
							? String(statValue.value)
							: undefined,
						// Store the full values array on the first entry for each statistic code
						values: normalized.find((s) => s.code === stat.code) ? undefined : valuesArray,
					});
				});
			}
		});

		return normalized;
	}

	/**
	 * Dedupe joined documents when multiple shareclasses return the same `documentId`.
	 * Carries each entity’s `kurtosys_id` so docs with null `meta.kurtosys_id` still scope to the correct row.
	 */
	private mergeEntityDocuments(entities: KSYSEntity[]): Array<{ doc: KSYSDocument; entityKurtosysId?: string }> {
		const seen = new Set<number>();
		const out: Array<{ doc: KSYSDocument; entityKurtosysId?: string }> = [];
		for (const entity of entities) {
			if (!entity.documents?.length) continue;
			const entityKurtosysId = this.getEntityKurtosysId(entity);
			for (const d of entity.documents) {
				const id = d.documentId;
				if (id != null && Number.isFinite(id)) {
					if (seen.has(id)) continue;
					seen.add(id);
				}
				out.push({ doc: d, entityKurtosysId });
			}
		}
		return out;
	}

	/** Shareclass / entity id for document scoping (properties_pub or top-level). */
	private getEntityKurtosysId(entity: KSYSEntity): string | undefined {
		const fromProp = this.getProperty(entity, 'kurtosys_id');
		if (fromProp != null && String(fromProp).trim() !== '') {
			return String(fromProp).trim();
		}
		if (entity.kurtosys_id != null && String(entity.kurtosys_id).trim() !== '') {
			return String(entity.kurtosys_id).trim();
		}
		return undefined;
	}

	private documentTypeFromApi(doc: KSYSDocument): string {
		const raw = doc.meta?.document_type?.value;
		if (raw != null && String(raw).trim() !== '') {
			return String(raw).trim();
		}
		return '';
	}

	private mapOneDocument(doc: KSYSDocument, documentSourceEntityKurtosysId?: string): FundDocument {
		const documentType = this.documentTypeFromApi(doc);

		const extended = doc as KSYSDocument & { client_code?: string };
		let clientCode =
			(extended.clientCode && String(extended.clientCode).trim()) ||
			(extended.client_code && String(extended.client_code).trim()) ||
			'';

		const urlField = (doc.URL || '').trim();
		if (!clientCode && urlField && !documentPathLooksLikeStorageUrl(urlField)) {
			clientCode = urlField;
		}

		let pathSource = '';
		if (urlField && documentPathLooksLikeStorageUrl(urlField)) {
			pathSource = urlField;
		} else if (doc.storagePath) {
			pathSource = doc.storagePath;
		}
		const url = absolutizeKurtosysDocumentUrl(pathSource, this.apiService.getBaseUrl());

		const kMeta = doc.meta?.kurtosys_id?.value;
		const fromMeta = kMeta != null && String(kMeta).trim() !== '' ? String(kMeta).trim() : undefined;
		/** Explicit meta wins. Fund-wide types with null meta must not inherit the host entity id or only one share class row matches after merge dedupe. */
		let shareclassKurtosysId: string | undefined;
		if (fromMeta) {
			shareclassKurtosysId = fromMeta;
		} else if (isFundLevelSharedDocumentType(documentType)) {
			shareclassKurtosysId = undefined;
		} else {
			shareclassKurtosysId = documentSourceEntityKurtosysId;
		}

		const fnRaw = doc.meta?.fund_name?.value;
		const metaFundName =
			fnRaw != null && String(fnRaw).trim() !== '' ? String(fnRaw).trim() : undefined;

		const typeRaw = doc.meta?.type?.value;
		const metaEntityType =
			typeRaw != null && String(typeRaw).trim() !== '' ? String(typeRaw).trim() : undefined;

		return {
			id: String(doc.documentId || Math.random()),
			type: documentType,
			filename: doc.filename || '',
			url,
			...(clientCode ? { clientCode } : {}),
			...(shareclassKurtosysId ? { shareclassKurtosysId } : {}),
			...(metaFundName ? { metaFundName } : {}),
			...(metaEntityType ? { metaEntityType } : {}),
			language: doc.meta?.display_name?.value,
			asAtDate: doc.lastModified,
		};
	}

	/**
	 * Normalize fund managers
	 * Managers have biography array with culture-specific content
	 * Sorted ascending by `extended.order` when present
	 */
	private normalizeFundManagers(entity: KSYSEntity) {
		if (!entity.fundManagers || !Array.isArray(entity.fundManagers)) {
			return undefined;
		}

		const parseOrder = (extended: Record<string, unknown> | undefined): number | undefined => {
			const raw = extended?.order;
			if (typeof raw === 'number' && Number.isFinite(raw)) {
				return raw;
			}
			if (typeof raw === 'string' && raw.trim() !== '') {
				const parsed = Number(raw);
				if (Number.isFinite(parsed)) {
					return parsed;
				}
			}
			return undefined;
		};

		const managers = entity.fundManagers.map((manager) => {
			// Extract biography for current culture (default to first available)
			let bio = '';
			if (manager.biography && Array.isArray(manager.biography) && manager.biography.length > 0) {
				// Try to find en-US first, then Default, then first available
				const enUSBio = manager.biography.find((b) => b.culture === 'en-US');
				const defaultBio = manager.biography.find((b) => b.culture === 'Default');
				bio = (enUSBio || defaultBio || manager.biography[0])?.biography || '';
			}

			const codeRaw = manager.code as unknown;
			let code: string | undefined;
			if (typeof codeRaw === 'string' && codeRaw.trim() !== '') {
				code = codeRaw.trim();
			} else if (codeRaw && typeof codeRaw === 'object' && 'value' in (codeRaw as object)) {
				const v = (codeRaw as { value: unknown }).value;
				if (typeof v === 'string' && v.trim() !== '') {
					code = v.trim();
				}
			}

			return {
				code,
				name: manager.name || '',
				title: undefined, // Not in the example response
				bio: bio,
				order: parseOrder(manager.extended),
			};
		});

		managers.sort((a, b) => {
			const orderA = a.order ?? Number.POSITIVE_INFINITY;
			const orderB = b.order ?? Number.POSITIVE_INFINITY;
			return orderA - orderB;
		});

		return managers;
	}

	/**
	 * Normalize disclaimers
	 * Disclaimers are an object with keys (types) containing arrays of culture-specific disclaimers
	 */
	private normalizeDisclaimers(entity: KSYSEntity) {
		if (!entity.disclaimers || typeof entity.disclaimers !== 'object' || Array.isArray(entity.disclaimers)) {
			return undefined;
		}

		const normalized: Array<{ type: string; content: string }> = [];

		Object.entries(entity.disclaimers).forEach(([type, disclaimerArray]) => {
			if (Array.isArray(disclaimerArray)) {
				// Find disclaimer for current culture (en-US or Default)
				const enUSDisclaimer = disclaimerArray.find((d: { culture: string }) => d.culture === 'en-US');
				const defaultDisclaimer = disclaimerArray.find((d: { culture: string }) => d.culture === 'Default');
				const disclaimer = enUSDisclaimer || defaultDisclaimer || disclaimerArray[0];

				if (disclaimer && 'disclaimer' in disclaimer) {
					normalized.push({
						type: type,
						content: String(disclaimer.disclaimer || ''),
					});
				}
			}
		});

		return normalized.length > 0 ? normalized : undefined;
	}
}

