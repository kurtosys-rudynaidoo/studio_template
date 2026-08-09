/**
 * FundTable Component
 * Table view with columns and grouping support
 */

import { useMemo, useState, useCallback } from 'react';

import type { Fund, Shareclass } from '@/types/fund.types';
import type { ColumnConfig, FundType, ModuleId } from '@/types/fund-center.types';
import type { FundService } from '@/services/fund-service';
import FundRow from './FundRow';
import FundGroupHeader from './FundGroupHeader';
import TableHeader from './TableHeader';
import { SortColumnIndicator } from './SortColumnIndicator';
import { countEntityPlural } from '@/utils/fund-center-labels';
import { isDocumentColumn, isSingleWordLabel } from '@/utils/table-columns';
import { getLatestAumAsAtDateRaw, getLatestStatisticAsAtDateRaw } from '@/utils/aum-resolver';
import { formatValue } from '@/utils/formatters';
import {
	FUND_TABLE_DOCUMENT_COL_MIN_WIDTH,
	FUND_TABLE_DOCUMENT_COL_MIN_WIDTH_COMPACT,
	FUND_TABLE_INCEPTION_COL_MIN_WIDTH,
	FUND_THEAD_TH,
	getFundTableScrollMinWidth,
} from '@/utils/fund-table-thead';

export interface FundTableProps {
	funds: Fund[];
	columns: ColumnConfig[];
	onFundExpand?: (fund: Fund, shareclass: Shareclass) => void;
	expandedFundIds?: Set<string>;
	fundGroupProperty?: string;
	fundService?: FundService;
	culture?: string;
	moduleId?: ModuleId;
	onSort?: (property: string, direction: 'asc' | 'desc') => void;
	sortState?: { property: string; direction: 'asc' | 'desc' } | null;
	/** When false, hide expand column and disable row expand (e.g. Materials tab) */
	expandable?: boolean;
	fundType?: FundType;
}

const SINGLE_GROUP_KEY = '__single__';

function FundTable({
	funds,
	columns,
	onFundExpand,
	expandedFundIds = new Set(),
	fundGroupProperty,
	fundService,
	culture = 'en-US',
	moduleId,
	onSort,
	sortState,
	expandable = true,
	fundType,
}: FundTableProps) {
	const materialsGrid = moduleId === 'materials';
	const noGrouping = fundGroupProperty === undefined || fundGroupProperty === '';
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set([SINGLE_GROUP_KEY]));

	const tableCaption = `List of ${countEntityPlural(fundType).toLowerCase()} and related columns. Sortable headers can be activated with Enter or Space. Use Tab to move through expand controls, links, and document actions in each row. In a screen reader, use table reading commands to move by cell.`;

	const handleSort = useCallback((column: ColumnConfig) => {
		if (!column.sortable || !onSort) {
			return;
		}

		const property = column.data?.property || column.code;
		const currentDirection = sortState?.property === property ? sortState.direction : null;
		const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
		onSort(property, newDirection);
	}, [onSort, sortState]);

	// Sort function for shareclasses within a fund
	const sortShareclasses = useCallback(
		(shareclasses: Shareclass[], property: string, direction: 'asc' | 'desc'): Shareclass[] => {
			const sorted = [...shareclasses].sort((a, b) => {
				let aValue: string | number = String(a.properties?.[property] || a[property as keyof Shareclass] || '').toLowerCase();
				let bValue: string | number = String(b.properties?.[property] || b[property as keyof Shareclass] || '').toLowerCase();

				// Try to parse as numbers if both are numeric
				const aNum = Number(aValue);
				const bNum = Number(bValue);
				if (!isNaN(aNum) && !isNaN(bNum) && aValue !== '' && bValue !== '') {
					aValue = aNum;
					bValue = bNum;
				}

				if (aValue < bValue) return direction === 'asc' ? -1 : 1;
				if (aValue > bValue) return direction === 'asc' ? 1 : -1;
				return 0;
			});
			return sorted;
		},
		[],
	);

	// Group funds by property, or single list when no grouping
	const groupedFunds = useMemo(() => {
		if (noGrouping) {
			const list = sortState && sortState.property
				? [...funds]
						.map((fund) => ({
							...fund,
							shareclasses: sortShareclasses(fund.shareclasses, sortState.property, sortState.direction),
						}))
						.sort((a, b) => {
							const aValue = String(
								(a.shareclasses[0]?.properties?.[sortState.property] as string) ||
									(a.shareclasses[0]?.[sortState.property as keyof Shareclass] as string) ||
									''
							).toLowerCase();
							const bValue = String(
								(b.shareclasses[0]?.properties?.[sortState.property] as string) ||
									(b.shareclasses[0]?.[sortState.property as keyof Shareclass] as string) ||
									''
							).toLowerCase();
							const aNum = Number(aValue);
							const bNum = Number(bValue);
							if (!isNaN(aNum) && !isNaN(bNum) && aValue !== '' && bValue !== '') {
								if (aNum < bNum) return sortState.direction === 'asc' ? -1 : 1;
								if (aNum > bNum) return sortState.direction === 'asc' ? 1 : -1;
								return 0;
							}
							if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
							if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
							return 0;
						})
				: funds;
			return { [SINGLE_GROUP_KEY]: list };
		}

		const groups: Record<string, Fund[]> = {};
		const prop = fundGroupProperty ?? 'benchmark_primary';

		funds.forEach((fund) => {
			fund.shareclasses.forEach((shareclass) => {
				const groupKey =
					(shareclass.properties?.[prop] as string) ||
					(fund.properties?.[prop] as string) ||
					'Other';

				if (!groups[groupKey]) {
					groups[groupKey] = [];
				}

				const existingFund = groups[groupKey].find((f) => f.id === fund.id);
				if (!existingFund) {
					groups[groupKey].push(fund);
				}
			});
		});

		if (sortState && sortState.property) {
			Object.keys(groups).forEach((groupKey) => {
				groups[groupKey] = groups[groupKey]
					.map((fund) => ({
						...fund,
						shareclasses: sortShareclasses(fund.shareclasses, sortState.property, sortState.direction),
					}))
					.sort((a, b) => {
						const aValue = String(
							(a.shareclasses[0]?.properties?.[sortState.property] as string) ||
								(a.shareclasses[0]?.[sortState.property as keyof Shareclass] as string) ||
								''
						).toLowerCase();
						const bValue = String(
							(b.shareclasses[0]?.properties?.[sortState.property] as string) ||
								(b.shareclasses[0]?.[sortState.property as keyof Shareclass] as string) ||
								''
						).toLowerCase();
						const aNum = Number(aValue);
						const bNum = Number(bValue);
						if (!isNaN(aNum) && !isNaN(bNum) && aValue !== '' && bValue !== '') {
							if (aNum < bNum) return sortState.direction === 'asc' ? -1 : 1;
							if (aNum > bNum) return sortState.direction === 'asc' ? 1 : -1;
							return 0;
						}
						if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
						if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
						return 0;
					});
			});
		}

		return groups;
	}, [funds, fundGroupProperty, noGrouping, sortState, sortShareclasses]);

	const handleGroupToggle = (groupId: string) => {
		setExpandedGroups((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(groupId)) {
				newSet.delete(groupId);
			} else {
				newSet.add(groupId);
			}
			return newSet;
		});
	};

	if (funds.length === 0) {
		return (
			<div className="rounded-lg border p-8 text-center text-muted-foreground" role="status" aria-live="polite">
				No funds found
			</div>
		);
	}

	const tableMinWidth =
		materialsGrid && fundType === 'mutual-fund'
			? undefined
			: getFundTableScrollMinWidth(columns.length, materialsGrid);
	const docColMinWidth = materialsGrid ? FUND_TABLE_DOCUMENT_COL_MIN_WIDTH : FUND_TABLE_DOCUMENT_COL_MIN_WIDTH_COMPACT;

	return (
		<div className="w-full min-w-0 max-w-full bg-background">
			<TableHeader funds={funds} fundType={fundType} />

			{Object.entries(groupedFunds).map(([groupKey, groupFunds]) => {
				const isGroupExpanded = expandedGroups.has(groupKey);
				const isSingleList = groupKey === SINGLE_GROUP_KEY;
				const aumCol = columns.find((c) => c.code === 'aum');
				const aumUsesDailyPricesNetAssets =
					aumCol?.data?.statisticCode != null &&
					aumCol?.data?.statisticLabel != null &&
					String(aumCol.data.statisticCode) !== '' &&
					String(aumCol.data.statisticLabel) !== '';
				const aumHeaderAsOfRaw = aumUsesDailyPricesNetAssets
					? getLatestStatisticAsAtDateRaw(
							groupFunds,
							String(aumCol!.data!.statisticCode),
							String(aumCol!.data!.statisticLabel),
						)
					: getLatestAumAsAtDateRaw(groupFunds);
				const aumHeaderAsOf =
					aumHeaderAsOfRaw &&
					formatValue(aumHeaderAsOfRaw, 'date', {
						type: 'date',
						options: { month: '2-digit', day: '2-digit', year: 'numeric' },
					});

				return (
					<div key={groupKey} className="border-b last:border-b-0">
						{!isSingleList && (
							<FundGroupHeader
								label={groupKey}
								groupId={groupKey}
								isExpanded={isGroupExpanded}
								onToggle={handleGroupToggle}
							/>
						)}
						{isGroupExpanded && (
							<section
								aria-labelledby={isSingleList ? undefined : `fundHeader-${groupKey.replace(/\s+/g, '-').toLowerCase()}`}
								className="fund-center-table-scroll min-w-0 w-full max-w-full bg-background">
								<table
									className="w-full border-collapse bg-background"
									style={{
										tableLayout: 'fixed',
										width: '100%',
										minWidth: tableMinWidth,
									}}>
									<caption className="sr-only">{tableCaption}</caption>
									<colgroup>
										{columns.map((column) => {
											const docCol = isDocumentColumn(column);
											return (
												<col
													key={column.code}
													style={{
														width: column.width || undefined,
														minWidth: docCol ? docColMinWidth : undefined,
													}}
												/>
											);
										})}
									</colgroup>
									<thead>
										<tr
											className="border-b"
											style={{
												backgroundColor: 'var(--table-header-bg)',
											}}>
											{columns.map((column) => {
												const isSortable = Boolean(column.sortable && onSort);
												const property = column.data?.property || column.code;
												const isActiveSort = sortState?.property === property;
												const docCol = isDocumentColumn(column);
												const singleWordHeader = isSingleWordLabel(column.label);
												const isAumCol = column.code === 'aum';
												const showAumAsOfLine = Boolean(isAumCol && aumHeaderAsOf);
												const aumAsOfTitleSuffix = showAumAsOfLine ? ` AUM as of ${aumHeaderAsOf}.` : '';
												const aumAsOfTitleNonSort =
													showAumAsOfLine && fundType === 'mutual-fund'
														? `AUM (USD). As of ${aumHeaderAsOf}.`
														: showAumAsOfLine
															? `Assets under management in USD. As of ${aumHeaderAsOf}.`
															: undefined;
												/* Materials: many narrow doc columns — always allow wrap so single-word titles (e.g. "Factsheet") do not overlap. */
												const headerWhiteSpace = (materialsGrid || docCol ? 'normal' : singleWordHeader ? 'nowrap' : 'normal') as
													| 'nowrap'
													| 'normal';

												const headerStyle = {
													width: column.width || undefined,
													minWidth:
														column.code === 'inception_date'
															? FUND_TABLE_INCEPTION_COL_MIN_WIDTH
															: column.code === 'ticker'
																? '6rem'
																: docCol
																	? docColMinWidth
																	: undefined,
													fontWeight: column.code === 'name' ? 'var(--table-name-font-weight)' : 500,
													whiteSpace: headerWhiteSpace,
													// Wrap only at spaces — do not break words mid-token (materials column titles)
													wordBreak: 'normal' as const,
													wordWrap: 'normal' as const,
													overflowWrap: 'normal' as const,
													hyphens: 'none' as const,
													borderBottom: '1px solid var(--border-row)',
												};

												return (
													<th
														key={column.code}
														scope="col"
														aria-sort={isSortable ? (isActiveSort ? (sortState!.direction === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
														tabIndex={isSortable ? 0 : undefined}
														title={
															isSortable
																? `${isActiveSort ? (sortState!.direction === 'asc' ? 'Ascending' : 'Descending') : 'Sort'} — click or press Enter to change${aumAsOfTitleSuffix}`
																: aumAsOfTitleNonSort
														}
														className={`${docCol ? 'fund-center-document-header text-center' : 'text-left'} ${FUND_THEAD_TH} ${
															isSortable ? 'cursor-pointer outline-offset-2 transition-colors hover:bg-gray-100' : ''
														}`}
														onClick={isSortable ? () => handleSort(column) : undefined}
														onKeyDown={
															isSortable
																? (e) => {
																		if (e.key === 'Enter' || e.key === ' ') {
																			e.preventDefault();
																			handleSort(column);
																		}
																	}
																: undefined
														}
														style={headerStyle}>
														<div
															className={`flex w-full min-w-0 items-center gap-2 ${isSortable ? 'justify-between' : docCol ? 'justify-center' : 'justify-start'} ${docCol && (materialsGrid || !singleWordHeader) ? 'min-w-0 flex-wrap' : ''} ${!docCol && singleWordHeader && !showAumAsOfLine && column.code !== 'ticker' ? 'flex-nowrap' : ''}`}>
															<div
																className={
																	showAumAsOfLine
																		? 'flex min-w-0 flex-col items-start gap-0.5 text-left'
																		: docCol
																			? 'min-w-0 text-center'
																			: 'min-w-0 text-left'
																}>
																<span
																	className={
																		materialsGrid && docCol
																			? 'max-w-full text-balance leading-tight'
																			: singleWordHeader && !showAumAsOfLine
																				? 'whitespace-nowrap'
																				: docCol
																					? 'min-w-0'
																					: undefined
																	}>
																	{column.label}
																</span>
																{showAumAsOfLine && (
																	<span
																		className="text-xs font-normal leading-tight"
																		style={{ color: 'var(--text-body)', fontWeight: 400 }}>
																		As of {aumHeaderAsOf}
																	</span>
																)}
															</div>
															{isSortable && (
																<SortColumnIndicator
																	active={isActiveSort}
																	direction={isActiveSort ? sortState!.direction : null}
																/>
															)}
														</div>
													</th>
												);
											})}
										</tr>
									</thead>
									<tbody>
										{groupFunds.map((fund) =>
											fund.shareclasses.map((shareclass, index) => (
												<FundRow
													key={`${fund.id}-${shareclass.id}`}
													fund={fund}
													shareclass={shareclass}
													columns={columns}
													onExpand={onFundExpand}
													isExpanded={expandedFundIds.has(`${fund.id}|${shareclass.id}`)}
													isAlternate={index % 2 === 1}
													fundService={fundService}
													culture={culture}
													moduleId={moduleId}
													expandable={expandable}
													fundType={fundType}
												/>
											)),
										)}
									</tbody>
								</table>
							</section>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default FundTable;

