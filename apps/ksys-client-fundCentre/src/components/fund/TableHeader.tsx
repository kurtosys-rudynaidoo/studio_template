/**
 * TableHeader Component
 * Shows "Showing X of X …" with label by fund type (Strategies / Funds / Affiliates)
 */

import type { Fund } from '@/types/fund.types';
import type { FundType } from '@/types/fund-center.types';

export interface TableHeaderProps {
	funds: Fund[];
	/** Drives the plural noun after the count (default: Strategies for institutional / subadvised) */
	fundType?: FundType;
}

function TableHeader(_props: TableHeaderProps) {
	/** When true, hide the “Showing X of Y strategies” line above tables. */
	return null;
}

export default TableHeader;
