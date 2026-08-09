/**
 * FundCard Component
 * Card view for mobile/responsive list – all columns in stacked layout, expand for full details.
 */

import type { Fund, Shareclass } from '@/types/fund.types';
import type { ColumnConfig, FundType, ModuleId } from '@/types/fund-center.types';
import type { FundService } from '@/services/fund-service';
import { renderColumnValue } from '@/utils/column-renderer';
import { Button } from '@/components/ui/button';
import DocumentCell from './DocumentCell';
import FundCardExpanded from './FundCardExpanded';
import { useExpandedFund } from '@/hooks/useExpandedFund';
import { filterDocumentsForDocumentColumn, scopeDocumentsToShareclass } from '@/utils/fund-documents';
import { formatFundDisplayName } from '@/utils/fund-display-name';
import { toDisplayString } from '@/utils/formatters';

export interface FundCardProps {
	fund: Fund;
	shareclass: Shareclass;
	columns: ColumnConfig[];
	onExpand?: (fund: Fund) => void;
	isExpanded?: boolean;
	fundService?: FundService;
	culture?: string;
	moduleId?: ModuleId;
	/** When false, hide expand and expanded section (e.g. Materials) */
	expandable?: boolean;
	fundType?: FundType;
}

function FundCard({
	fund,
	shareclass,
	columns,
	onExpand,
	isExpanded = false,
	fundService,
	culture = 'en-US',
	moduleId,
	expandable = true,
	fundType,
}: FundCardProps) {
	const { data: expandedFund, isLoading: isLoadingExpanded } = useExpandedFund({
		clientCode: shareclass.clientCode || shareclass.code || '',
		culture,
		fundService: fundService!,
		enabled: isExpanded && !!fundService && !!shareclass.clientCode,
	});

	const displayFund = expandedFund || fund;

	const handleToggleExpand = () => {
		if (expandable && onExpand) {
			onExpand(fund);
		}
	};

	const rowDocuments = scopeDocumentsToShareclass(displayFund.documents, shareclass, displayFund);
	const displayName = formatFundDisplayName(shareclass.name || fund.name, fundType);
	const hasNameColumn = columns.some((column) => column.code === 'name');
	const hasTickerColumn = columns.some((column) => column.code === 'ticker');
	const showTickerFallback = !!toDisplayString(shareclass.ticker) && !hasTickerColumn;
	const showCardHeader = !hasNameColumn || showTickerFallback;

	const renderExpandButton = () => {
		if (!expandable) return null;

		return (
			<Button
				variant="ghost"
				size="icon"
				onClick={handleToggleExpand}
				aria-label={isExpanded ? 'Collapse fund details' : 'Expand fund details'}
				className="fund-center-card-expand-toggle shrink-0 h-9 w-9 rounded-full border border-gray-200 bg-white hover:bg-gray-50">
				{isExpanded ? '−' : '+'}
			</Button>
		);
	};

	const renderCellContent = (column: ColumnConfig) => {
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
			const urlType = (shareclass.properties?.url_type as string) || (fund.properties?.url_type as string);
			const urlSuffix = (shareclass.properties?.url_suffix as string) || (fund.properties?.url_suffix as string);
			const name = displayName;
			const nameContent = urlType && urlSuffix ? (
				<a
					href={`/${urlType}/${urlSuffix}/`}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:underline"
					style={{
						color: 'var(--text-dark)',
						fontFamily: 'var(--font-sans)',
						fontSize: '16px',
						fontWeight: 'var(--table-name-font-weight)',
					}}>
					{name}
				</a>
			) : (
				<span
					style={{
						fontFamily: 'var(--font-sans)',
						fontSize: '16px',
						fontWeight: 'var(--table-name-font-weight)',
					}}>
					{name}
				</span>
			);

			if (urlType && urlSuffix) {
				return (
					<div className="flex items-center justify-between gap-3">
						<div className="min-w-0 flex-1">{nameContent}</div>
						{renderExpandButton()}
					</div>
				);
			}
			return (
				<div className="flex items-center justify-between gap-3">
					<div className="min-w-0 flex-1">{nameContent}</div>
					{renderExpandButton()}
				</div>
			);
		}
		return renderColumnValue(fund, shareclass, column);
	};

	return (
		<div
			className="rounded-lg border border-[var(--border-row)] bg-white p-4 shadow-sm"
			style={{ fontFamily: 'var(--font-sans)' }}>
			{showCardHeader && (
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0 flex-1">
						{!hasNameColumn && (
							<h3
								className="font-semibold text-[var(--text-dark)]"
								style={{ fontSize: '18px', lineHeight: '1.3' }}>
								{displayName}
							</h3>
						)}
						{showTickerFallback && (
							<p className="mt-0.5 text-sm text-[var(--text-body)]">
								Ticker: {toDisplayString(shareclass.ticker)}
							</p>
						)}
					</div>
					{!hasNameColumn && renderExpandButton()}
				</div>
			)}

			<div className={`${showCardHeader ? 'mt-4' : ''} space-y-3`}>
				{columns.map((column) => (
					<div key={column.code} className="flex flex-col gap-1">
						<div
							className="text-xs font-medium uppercase tracking-wide"
							style={{ color: 'var(--section-header)' }}>
							{column.label}
						</div>
						<div
							className="text-sm text-[var(--text-dark)] break-words"
							style={{ lineHeight: '1.4' }}>
							{renderCellContent(column)}
						</div>
					</div>
				))}
			</div>

			{expandable && isExpanded && (
				<div className="mt-4 pt-4 border-t border-[var(--border-row)]">
					{isLoadingExpanded ? (
						<div className="flex items-center justify-center py-8 text-[var(--text-body)] text-sm">
							Loading fund details…
						</div>
					) : (
						<FundCardExpanded fund={displayFund} shareclass={shareclass} moduleId={moduleId} fundType={fundType} />
					)}
				</div>
			)}
		</div>
	);
}

export default FundCard;
