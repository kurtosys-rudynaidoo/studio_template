/**
 * FundList Component
 * Main list container with view switching (table when embed area is wide, card list when compact)
 */

import { useMemo } from 'react';

import { FUND_CENTER_MATERIALS_COMPACT_LAYOUT_MAX_WIDTH } from '@/constants/fund-center-layout.constants';
import { useFundCenterCompactLayout, useFundCenterContainerWidth } from '@/contexts/FundCenterLayoutContext';
import type { Fund, Shareclass } from '@/types/fund.types';
import type { ColumnConfig, FundType, ModuleId } from '@/types/fund-center.types';
import type { FundService } from '@/services/fund-service';
import FundTable from './FundTable';
import FundCard from './FundCard';
import { Skeleton } from '@/components/ui/skeleton';

export interface FundListProps {
	funds: Fund[];
	columns: ColumnConfig[];
	isLoading?: boolean;
	viewMode?: 'table' | 'card' | 'auto';
	onFundExpand?: (fund: Fund, shareclass: Shareclass) => void;
	expandedFundIds?: Set<string>;
	fundGroupProperty?: string;
	fundService?: FundService;
	culture?: string;
	moduleId?: ModuleId;
	onSort?: (property: string, direction: 'asc' | 'desc') => void;
	sortState?: { property: string; direction: 'asc' | 'desc' } | null;
	fundType?: FundType;
}

function FundList({
	funds,
	columns,
	isLoading = false,
	viewMode = 'auto',
	onFundExpand,
	expandedFundIds = new Set(),
	fundGroupProperty,
	fundService,
	culture = 'en-US',
	moduleId,
	onSort,
	sortState,
	fundType,
}: FundListProps) {
	const useCompactLayoutGlobal = useFundCenterCompactLayout();
	const containerWidth = useFundCenterContainerWidth();

	const useCompactLayout = useMemo(() => {
		if (moduleId === 'materials' && fundType === 'mutual-fund') {
			if (containerWidth === null) {
				return useCompactLayoutGlobal;
			}
			return containerWidth < FUND_CENTER_MATERIALS_COMPACT_LAYOUT_MAX_WIDTH;
		}
		return useCompactLayoutGlobal;
	}, [moduleId, fundType, containerWidth, useCompactLayoutGlobal]);

	// Determine actual view mode (auto = table when container is wide, card list when compact)
	const actualViewMode = useMemo(() => {
		if (viewMode !== 'auto') return viewMode;
		return useCompactLayout ? 'card' : 'table';
	}, [viewMode, useCompactLayout]);

	if (isLoading) {
		return (
			<div className="space-y-4" role="status" aria-live="polite" aria-busy="true">
				<span className="sr-only">Loading fund list</span>
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-16 w-full" />
				))}
			</div>
		);
	}

	if (actualViewMode === 'card') {
		const expandable = moduleId !== 'materials';
		const getExpandKey = (f: Fund, s: Shareclass) => `${f.id}|${s.id}`;
		return (
			<div className="flex flex-col gap-4 bg-background">
				{funds.map((fund) =>
					fund.shareclasses.map((shareclass) => (
						<FundCard
							key={`${fund.id}-${shareclass.id}`}
							fund={fund}
							shareclass={shareclass}
							columns={columns}
							onExpand={(fund) => onFundExpand?.(fund, shareclass)}
							isExpanded={expandedFundIds.has(getExpandKey(fund, shareclass))}
							fundService={fundService}
							culture={culture}
							moduleId={moduleId}
							expandable={expandable}
							fundType={fundType}
						/>
					)),
				)}
			</div>
		);
	}

	return (
		<FundTable
			funds={funds}
			columns={columns}
			onFundExpand={onFundExpand}
			expandedFundIds={expandedFundIds}
			fundGroupProperty={fundGroupProperty}
			fundService={fundService}
			culture={culture}
			moduleId={moduleId}
			onSort={onSort}
			sortState={sortState}
			expandable={moduleId !== 'materials'}
			fundType={fundType}
		/>
	);
}

export default FundList;

