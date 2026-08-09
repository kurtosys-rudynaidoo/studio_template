/**
 * Fund Center Configuration Types
 * Based on embed data attributes and KSYS Studio configuration
 */

/**
 * Fund type identifier
 */
export type FundType = 'separate-account' | 'mutual-fund' | 'subadvised' | 'affiliate';

/**
 * Module identifier
 */
export type ModuleId = 'overview' | 'performance' | 'materials' | 'forms';

/**
 * Fund Center embed configuration from data attributes
 */
export interface FundCenterEmbedConfig {
	culture: string;
	country: string;
	audience: string;
	apiUrl: string;
	fundlist: string;
	baseUrl: string;
	configurationKey: string;
	ksysAppTemplateId: string;
	initialized: boolean;
	/** DXM (or site) landing page for Subadvised; from `data-subadvised-landing-url`. Empty = hide link / no redirect. */
	subadvisedLandingUrl: string;
}

/**
 * Column configuration for fund display
 */
export interface ColumnConfig {
	code: string;
	label: string;
	sortable?: boolean;
	width?: string;
	format?: {
		type: 'date' | 'currency' | 'number' | 'percentage' | 'text';
		options?: Record<string, unknown>;
	};
	data?: {
		code?: string;
		property?: string;
		index?: number;
		documentType?: string; /* document_type value for document columns (e.g. 'Factsheet') */
		/** If set, match any of these `document_type` values (e.g. API alias + legacy label). */
		documentTypes?: string[];
		/**
		 * `kurtosys_id_only`: only docs whose `shareclassKurtosysId` matches this row (ignore fund-wide / join fallbacks).
		 * Use when multiple matches should not collapse to fund-level duplicates (e.g. tailored shareholder reports).
		 */
		documentMatchScope?: 'all' | 'kurtosys_id_only';
		/** After type (and scope) filter, keep at most this many — first wins (row document order). */
		maxDocuments?: number;
		find?: {
			property: string;
			value: string;
		};
		/**
		 * When both set (e.g. Mutual Fund Overview AUM column), value comes from
		 * `shareclass.statistics` where `code` matches case-insensitively and `label` matches after normalization (underscores → spaces, lowercased).
		 */
		statisticCode?: string;
		statisticLabel?: string;
	};
}

/**
 * Filter configuration
 */
export interface FilterConfig {
	type: 'checklist' | 'dropdown';
	property: string;
	label: string;
	options?: Array<{ label: string; value: string }> | string[];
	multiple?: boolean;
}

/**
 * Module configuration
 */
export interface ModuleConfig {
	id: ModuleId;
	label: string;
	columns: ColumnConfig[];
	filters?: FilterConfig[];
	requestBody: {
		type: string;
		/** When true, `fetchFunds` does not append fund-type `search` (module `search` is complete). */
		skipAppendedFundTypeSearch?: boolean;
		search?: Array<{
			property: string;
			values: string[];
			matchtype: 'MATCH' | 'NOT_MATCH' | 'CONTAINS' | 'NOT_CONTAINS';
		}>;
		/** Overrides default identifier search for this module (e.g. Mutual Fund Materials). */
		identifierSearch?: {
			properties: string[];
			fuzzy?: boolean;
			noDataText?: string;
			placeholder: {
				format: {
					plural: string;
					singular: string;
				};
			};
		};
		include?: {
			statistics?: {
				limitTo?: string[];
			};
			disclaimers?: {
				exclude?: boolean;
			};
			fundManagers?: Record<string, unknown>;
			documents?: {
				joinSpec?: Array<{
					joinFrom: string;
					joinTo: string;
					search?: Array<{
						matchtype: string;
						property: string;
						values: string[];
					}>;
				}>;
				excludeExpired?: boolean;
			};
			commentaries?: {
				limitTo?: string[];
			};
			[key: string]: unknown;
		};
		includeProperties?: string[];
	};
	sort?: Array<{
		property: string;
		direction: 'asc' | 'desc';
	}>;
}

/**
 * Fund type configuration
 */
export interface FundTypeConfig {
	id: FundType;
	label: string;
	modules: ModuleConfig[];
}

/**
 * Complete Fund Center configuration
 */
export interface FundCenterConfig {
	fundTypes: FundTypeConfig[];
	globalConfig?: {
		documentPreview?: {
			enabled: boolean;
		};
		watchListEnabled?: boolean;
		shareableLink?: {
			enabled: boolean;
			confirmation?: string;
		};
		/** Fallback when embed `data-subadvised-landing-url` is unset; lower precedence than embed. */
		subadvisedLandingUrl?: string;
	};
	responsiveConfig?: {
		switchToCardView?: string; // Breakpoint
	};
	fundGroupProperty?: string;
}

