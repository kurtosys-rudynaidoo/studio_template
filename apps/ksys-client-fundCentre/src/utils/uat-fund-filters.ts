/**
 * Optional client-side fund list shaping.
 *
 * FundPress / fundlist still drives eligibility. Override this module per client
 * when the embed must hide or keep specific rows that the API still returns.
 * Default template behaviour: pass-through (no client-specific exclusions).
 */

import type { Fund } from '@/types/fund.types';
import type { FundType } from '@/types/fund-center.types';

/**
 * Returns funds to render for the active fund type after optional client filters.
 */
export function applyUatFundDisplayFilters(funds: Fund[], _fundType: FundType): Fund[] {
	return funds;
}
