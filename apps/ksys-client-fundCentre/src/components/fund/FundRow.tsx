/**
 * FundRow Component
 * Individual fund row with expand/collapse functionality
 */

import { useCallback, type CSSProperties, type ReactNode } from 'react';

import type { Fund, Shareclass } from '@/types/fund.types';
import type { ColumnConfig, FundType, ModuleId } from '@/types/fund-center.types';
import type { FundService } from '@/services/fund-service';
import { renderColumnValue } from '@/utils/column-renderer';
import { isDocumentColumn } from '@/utils/table-columns';
import { Button } from '@/components/ui/button';
import DocumentCell from './DocumentCell';
import FundCardExpanded from './FundCardExpanded';
import { useExpandedFund } from '@/hooks/useExpandedFund';
import { filterDocumentsForDocumentColumn, scopeDocumentsToShareclass } from '@/utils/fund-documents';
import { fundExpandedPanelDomId } from '@/utils/fund-dom-ids';
import { formatFundDisplayName } from '@/utils/fund-display-name';
import { FUND_TABLE_BODY_TD, FUND_TABLE_DOCUMENT_COL_MIN_WIDTH, FUND_TABLE_DOCUMENT_COL_MIN_WIDTH_COMPACT, FUND_TABLE_INCEPTION_COL_MIN_WIDTH } from '@/utils/fund-table-thead';

const ROW_CELL_BORDER = { borderBottom: '1px solid var(--border-row)' } as const;

const NAME_STYLE: CSSProperties = {
	color: 'var(--text-dark)',
	fontFamily: 'var(--font-sans)',
	fontWeight: 'var(--table-name-font-weight)',
	fontSize: '14px',
	lineHeight: '1.4',
};

export interface FundRowProps {
	fund: Fund;
	shareclass: Shareclass;
	columns: ColumnConfig[];
	onExpand?: (fund: Fund, shareclass: Shareclass) => void;
	isExpanded?: boolean;
	isAlternate?: boolean;
	fundService?: FundService;
	culture?: string;
	moduleId?: ModuleId;
	/** When false, hide expand button and do not render expanded section */
	expandable?: boolean;
	fundType?: FundType;
}

function FundRow({ fund, shareclass, columns, onExpand, isExpanded = false, isAlternate = false, fundService, culture = 'en-US', moduleId, expandable = true, fundType }: FundRowProps) {
	const { data: expandedFund, isLoading: isLoadingExpanded } = useExpandedFund({
		clientCode: shareclass.clientCode || shareclass.code || '',
		culture,
		fundService: fundService!,
		enabled: isExpanded && !!fundService && !!shareclass.clientCode,
	});

	const handleToggleExpand = useCallback(() => {
		if (onExpand) {
			onExpand(fund, shareclass);
		}
	}, [fund, shareclass, onExpand]);

	const displayFund = expandedFund || fund;
	const expandedRegionId = fundExpandedPanelDomId(fund, shareclass);
	const rowDocuments = scopeDocumentsToShareclass(displayFund.documents, shareclass, displayFund);
	const displayName = formatFundDisplayName(shareclass.name || fund.name, fundType);
	const materialsGrid = moduleId === 'materials';
	const docColMinWidth = materialsGrid ? FUND_TABLE_DOCUMENT_COL_MIN_WIDTH : FUND_TABLE_DOCUMENT_COL_MIN_WIDTH_COMPACT;

	const renderExpandToggle = () => (
		<Button
			variant="ghost"
			onClick={handleToggleExpand}
			aria-expanded={isExpanded}
			aria-controls={isExpanded ? expandedRegionId : undefined}
			aria-label={
				isExpanded ? `Collapse details for ${displayName}` : `Expand details for ${displayName}`
			}
			className="fund-center-expand-toggle relative z-[1] mt-0.5 flex h-5 w-5 min-h-5 min-w-5 shrink-0 items-center justify-center p-0 text-[var(--text-dark)] hover:bg-transparent focus-visible:bg-transparent">
			<svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
				{isExpanded ? (
					<path d="M6 3.5L9.5 8h-7L6 3.5z" fill="currentColor" />
				) : (
					<path d="M6 8.5L2.5 4h7L6 8.5z" fill="currentColor" />
				)}
			</svg>
		</Button>
	);

	const renderNameLabel = () => {
		const urlType = (shareclass.properties?.url_type as string) || (fund.properties?.url_type as string);
		const urlSuffix = (shareclass.properties?.url_suffix as string) || (fund.properties?.url_suffix as string);

		if (urlType && urlSuffix) {
			const href = `/${urlType}/${urlSuffix}/`;
			return (
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`${displayName} (opens in new tab)`}
					className="min-w-0 hover:underline"
					style={NAME_STYLE}>
					{displayName}
				</a>
			);
		}

		return (
			<span className="min-w-0" style={NAME_STYLE}>
				{displayName}
			</span>
		);
	};

	const renderCellContent = (column: ColumnConfig): ReactNode => {
		const docTypes =
			column.data?.documentTypes?.length
				? column.data.documentTypes
				: column.data?.documentType
					? [column.data.documentType]
					: [];
		if (docTypes.length > 0) {
			const documents = filterDocumentsForDocumentColumn(
				rowDocuments,
				docTypes,
				shareclass,
				{
					documentMatchScope: column.data?.documentMatchScope,
					maxDocuments: column.data?.maxDocuments,
				},
				displayFund,
			);
			return <DocumentCell documents={documents} fundService={fundService} />;
		}

		if (column.code === 'name') {
			if (expandable) {
				return (
					<div className="fund-center-name-with-expand flex min-w-0 items-start gap-1">
						{renderExpandToggle()}
						<div className="min-w-0 flex-1">{renderNameLabel()}</div>
					</div>
				);
			}

			return renderNameLabel();
		}

		return renderColumnValue(fund, shareclass, column);
	};

	return (
		<>
			<tr className={`transition-colors ${isAlternate ? 'bg-white' : 'bg-white'}`}>
				{columns.map((column) => {
					const docCol = isDocumentColumn(column);
					const isNameCol = column.code === 'name';
					const cellPaddingClass = 'px-3';
					const cellAlignClass = docCol ? 'text-center' : 'text-left';
					return (
						<td
							key={column.code}
							className={`${FUND_TABLE_BODY_TD} ${docCol ? 'fund-center-document-cell' : ''} ${isNameCol ? 'fund-center-name-cell' : ''} ${cellPaddingClass} ${cellAlignClass}`}
							style={{
								width: column.width || undefined,
								minWidth:
									column.code === 'inception_date'
										? FUND_TABLE_INCEPTION_COL_MIN_WIDTH
										: docCol
											? docColMinWidth
											: undefined,
								fontFamily: 'var(--font-sans)',
								fontWeight: 400,
								fontSize: '14px',
								lineHeight: '1.4',
								color: 'var(--text-dark)',
								...ROW_CELL_BORDER,
								whiteSpace: 'normal',
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
								overflow: 'hidden',
								textAlign: docCol ? 'center' : 'left',
								verticalAlign: 'middle',
							}}>
							{docCol ? (
								<div className="fund-center-document-cell-inner grid w-full place-items-center">
									{renderCellContent(column)}
								</div>
							) : (
								renderCellContent(column)
							)}
						</td>
					);
				})}
			</tr>
			{expandable && isExpanded && (
				<tr>
					<td colSpan={columns.length} className="bg-background px-4 py-6">
						{isLoadingExpanded ? (
							<div className="flex items-center justify-center py-8" role="status" aria-live="polite">
								<span className="text-muted-foreground">Loading fund details…</span>
							</div>
						) : (
							<div id={expandedRegionId} role="region" aria-label={`Details for ${displayName}`}>
								<FundCardExpanded fund={displayFund} shareclass={shareclass} moduleId={moduleId} fundType={fundType} />
							</div>
						)}
					</td>
				</tr>
			)}
		</>
	);
}

export default FundRow;
