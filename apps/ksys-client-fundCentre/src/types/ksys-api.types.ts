/**
 * KSYS API Request and Response Types
 * Reference: src/docs/categories/data/README.md
 */

/**
 * Search match type for filtering
 */
export type MatchType = 'MATCH' | 'NOT_MATCH' | 'CONTAINS' | 'NOT_CONTAINS';

/**
 * Search criteria for filtering entities
 */
export interface SearchCriteria {
	property: string;
	values: string[];
	matchtype: MatchType;
}

/**
 * Include configuration for related data
 */
export interface IncludeConfig {
	commentaries?: {
		limitTo?: string[];
	};
	disclaimers?: {
		exclude?: boolean;
		[key: string]: unknown;
	};
	documents?: {
		joinSpec?: Array<{
			joinFrom: string;
			joinTo: string;
			search: SearchCriteria[];
		}>;
		excludeExpired?: boolean;
		[key: string]: unknown;
	};
	fundManagers?: Record<string, unknown>;
	statistics?: {
		limitTo?: string[];
		[key: string]: unknown;
	};
	[key: string]: unknown;
}

/**
 * Identifier search configuration
 */
export interface IdentifierSearchConfig {
	properties: string[];
	fuzzy?: boolean;
	noDataText?: string;
	placeholder?: {
		format?: {
			plural?: string;
			singular?: string;
		};
	};
	value?: string;
	// Additional properties that might be in the API
	[key: string]: unknown;
}

/**
 * Sort configuration
 */
export interface SortConfig {
	key: string;
	direction: 'ASC' | 'DESC';
}

/**
 * KSYS API Search Entity Request
 * Used for querying fund/shareclass data
 * Based on actual FundPress API structure
 */
export interface KSYSSearchEntityRequest {
	type: string;
	clientCode?: string[];
	fundList?: string[];
	fundListExclusion?: string[];
	search?: SearchCriteria[];
	identifierSearch?: IdentifierSearchConfig;
	sort?: SortConfig[];
	include?: IncludeConfig;
	limit?: number;
	start?: number;
	culture?: string;
	sourceCulture?: string;
	translate?: boolean;
	preserveOriginal?: boolean;
	applyFormats?: boolean;
	disclaimers?: boolean;
	includeProperties?: string[];
}

/**
 * KSYS API Error Response
 */
export interface KSYSApiErrorResponse {
	error: string;
	status: number;
	code?: string;
	details?: Record<string, unknown>;
	message?: string;
}

/**
 * Property value structure from KSYS API
 */
export interface KSYSPropertyValue {
	value: unknown;
	originalValue?: unknown;
}

/**
 * Statistic value from KSYS API
 */
export interface KSYSStatisticValue {
	as_of_date: string;
	label: string;
	value: number | null;
	benchmark_value?: number | null;
	secondary_benchmark_value?: number | null;
	period?: string;
}

/**
 * Statistic from KSYS API
 */
export interface KSYSStatistic {
	statisticId?: number;
	code: string;
	values: KSYSStatisticValue[];
	ccy?: string;
}

/**
 * Document from KSYS API
 */
export interface KSYSDocument {
	documentId: number;
	/** Instance id for POST /documents/retrieveDocument (some responses only expose this via `URL`). */
	clientCode?: string;
	title?: string;
	filename: string;
	fileType?: string;
	URL?: string;
	storagePath?: string;
	meta?: {
		document_type?: { value: string };
		display_name?: { value: string };
		kurtosys_id?: { value: string };
		[k: string]: { value: string } | undefined;
	};
	lastModified?: string;
	created?: string;
	fileSize?: number;
	active?: number;
	expires?: string;
}

/**
 * Fund Manager from KSYS API
 */
export interface KSYSFundManager {
	code: string;
	name: string;
	biography?: Array<{
		biography: string;
		culture: string;
	}>;
	relatedEntities?: string[];
	extended?: Record<string, unknown>;
}

/**
 * Disclaimer from KSYS API (culture-specific)
 */
export interface KSYSDisclaimer {
	culture: string;
	disclaimer: string;
}

/**
 * Fund/Shareclass entity from KSYS API
 */
export interface KSYSEntity {
	entityId?: number;
	parentEntityId?: number | null;
	type?: string;
	clientId?: number;
	code?: string;
	clientCode?: string;
	kurtosys_id?: string;
	properties_pub?: Record<string, KSYSPropertyValue | unknown>;
	statistics?: KSYSStatistic[];
	documents?: KSYSDocument[];
	/** Legacy array shape, or object map `{ typeKey: [{ commentary, culture }] }` (FundPress). */
	commentaries?:
		| Array<{
				type: string;
				content: string;
		  }>
		| Record<string, Array<{ commentary?: string; content?: string; culture?: string }>>;
	fundManagers?: KSYSFundManager[];
	disclaimers?: Record<string, KSYSDisclaimer[]>;
	lastModified?: string;
	created?: string;
	[key: string]: unknown;
}

/**
 * KSYS API Search Entity Response
 * Based on actual FundPress API response structure
 */
export interface KSYSSearchEntityResponse {
	values?: KSYSEntity[];
	total?: number;
	start?: number;
	limit?: number;
	success?: boolean;
	message?: string;
	groupMetaDates?: Record<string, string>;
	// Legacy support for 'data' field
	data?: KSYSEntity[];
}

/**
 * POST /documents/retrieveDocument — `Content-Type: application/json`, `Accept: application/json`,
 * `x-ksys-token`, body `{"clientCode":["<document clientCode>"]}`.
 */
export interface KSYSRetrieveDocumentRequest {
	clientCode: string[];
}

/**
 * Search Documents request (POST /documents/searchDocuments)
 */
export interface KSYSSearchDocumentsRequest {
	type: string;
	search?: SearchCriteria[];
	sort?: { key: string; direction: 'ASC' | 'DESC' };
	start?: number;
	limit?: number;
}

/**
 * Document entry from searchDocuments response
 */
export interface KSYSDocumentSearchEntry {
	documentId?: number;
	clientCode?: string;
	document_type?: string | { value?: string };
	display_name?: string | { value?: string };
	title?: string | { value?: string };
	filename?: string;
	/** Same shape as entity documents: human-readable label often lives here */
	meta?: {
		display_name?: string | { value?: string };
		document_type?: string | { value?: string };
		[key: string]: unknown;
	};
	URL?: string;
	url?: string;
	storagePath?: string;
	kurtosys_id?: string;
	[id: string]: unknown;
}

/**
 * Search Documents response
 */
export interface KSYSSearchDocumentsResponse {
	values?: KSYSDocumentSearchEntry[];
	data?: KSYSDocumentSearchEntry[];
	total?: number;
	start?: number;
	limit?: number;
}
