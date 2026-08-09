/**
 * Fund Data Model Types
 * Normalized fund/shareclass data structures
 */

import type { KSYSEntity } from './ksys-api.types';

/**
 * Fund manager information
 */
export interface FundManager {
	/** Kurtosys fund manager code — required for `/fund/fundmanagerpicture?code=` (name slug is unreliable). */
	code?: string;
	name: string;
	title?: string;
	bio?: string;
	imageUrl?: string;
	/** Display order from API `extended.order` (ascending). */
	order?: number;
}

/**
 * Fund document
 */
export interface FundDocument {
	id: string;
	type: string;
	filename: string;
	/**
	 * Storage path or absolute URL from API when present (for display / direct-open fallback).
	 * When the API puts only a retrieve token in `URL`, see `clientCode`.
	 */
	url: string;
	/** For POST /documents/retrieveDocument — required for FundPress-style document access. */
	clientCode?: string;
	/** From `meta.kurtosys_id`, or the search entity that owned the document when meta is null. */
	shareclassKurtosysId?: string;
	/** From `meta.fund_name` when set — used to scope docs by class name when kurtosys match is missing. */
	metaFundName?: string;
	/** From document `meta.type` — used with entity `type` when kurtosys and fund_name do not match. */
	metaEntityType?: string;
	language?: string;
	asAtDate?: string;
}

/**
 * Fund commentary
 */
export interface FundCommentary {
	type: string;
	content: string;
	asAtDate?: string;
}

/**
 * Fund disclaimer
 */
export interface FundDisclaimer {
	type: string;
	content: string;
}

/**
 * Fund statistic value
 */
export interface FundStatistic {
	code: string;
	label: string;
	value: unknown;
	asAtDate?: string;
	formattedValue?: string;
	// For chart data, preserve the original values array structure
	values?: Array<{
		as_of_date: string;
		label: string;
		value: number | null;
		benchmark_value?: number | null;
		secondary_benchmark_value?: number | null;
		period?: string;
	}>;
}

/**
 * Shareclass data
 */
export interface Shareclass {
	id: string;
	code: string;
	clientCode?: string;
	name: string;
	ticker?: string;
	currency?: string;
	inceptionDate?: string;
	nav?: number;
	properties: Record<string, unknown>;
	statistics: FundStatistic[];
}

/**
 * Fund data (grouped shareclasses)
 */
export interface Fund {
	id: string;
	kurtosysId: string;
	name: string;
	shareclasses: Shareclass[];
	properties: Record<string, unknown>;
	statistics: FundStatistic[];
	documents?: FundDocument[];
	commentaries?: FundCommentary[];
	fundManagers?: FundManager[];
	disclaimers?: FundDisclaimer[];
	expanded?: boolean;
}

/**
 * Fund list response
 */
export interface FundListResponse {
	funds: Fund[];
	total: number;
	start: number;
	limit: number;
	hasMore: boolean;
}

/**
 * Normalized fund data from KSYS entity
 */
export interface NormalizedFund extends Fund {
	rawEntity?: KSYSEntity;
}

