/**
 * FormsDocumentList Component
 * Displays a simple list of documents (one per row) with title and PDF preview icon.
 * Uses a table layout (same as Materials) so Elementor / WordPress theme `<li>` spacing does not apply.
 */

import type { FundDocument } from '@/types/fund.types';
import type { FundService } from '@/services/fund-service';
import { absolutizeKurtosysDocumentUrl } from '@/utils/document-url';
import { openDocumentInBrowser } from '@/utils/open-document';
import { documentIconUrl, documentIconDisplaySize } from '@/constants/document-icon-url';
import { FUND_TABLE_BODY_TD, FUND_TABLE_DOCUMENT_COL_MIN_WIDTH } from '@/utils/fund-table-thead';

const FALLBACK_API_BASE =
	(typeof import.meta !== 'undefined' && import.meta.env?.VITE_KURTOSYS_API_URL) || 'https://api-us.fundpress.io';

const ROW_CELL_BORDER = { borderBottom: '1px solid var(--border-row)' } as const;

const FORMS_LABEL_CELL_STYLE = {
	fontFamily: 'var(--font-sans)',
	fontWeight: 'var(--table-name-font-weight)',
	fontSize: '16px',
	lineHeight: '18px',
	color: 'var(--text-dark)',
	...ROW_CELL_BORDER,
} as const;

const iconButtonClass =
	'fund-center-document-action-btn mx-auto inline-flex shrink-0 items-center justify-center p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#1A6DBC] focus:ring-offset-1 rounded disabled:opacity-50 disabled:cursor-not-allowed';

export interface FormsDocumentItem {
	id: string;
	label: string;
	url: string;
	clientCode?: string;
	filename?: string;
}

export interface FormsDocumentListProps {
	documents: FormsDocumentItem[];
	fundService?: FundService;
}

function formsItemToFundDocument(item: FormsDocumentItem): FundDocument {
	const hasExt = /\.[a-z0-9]+$/i.test(item.label.trim());
	const filename =
		item.filename ||
		(hasExt ? item.label.trim() : `${item.label.trim() || 'document'}.pdf`);
	return {
		id: item.id,
		type: '',
		filename,
		url: item.url === '#' ? '' : item.url,
		...(item.clientCode ? { clientCode: item.clientCode } : {}),
	};
}

function canOpenFormsItem(item: FormsDocumentItem): boolean {
	return !!item.clientCode?.trim() || (!!item.url?.trim() && item.url !== '#');
}

function DocumentIcon({ size = 24 }: { size?: number }) {
	const { width, height } = documentIconDisplaySize(size);
	return (
		<img
			src={documentIconUrl}
			alt=""
			width={width}
			height={height}
			className="fund-center-document-icon"
			aria-hidden
			decoding="async"
			style={{ display: 'block', flexShrink: 0, objectFit: 'contain', opacity: 1, visibility: 'visible' }}
		/>
	);
}

function FormsDocumentList({ documents, fundService }: FormsDocumentListProps) {
	if (!documents || documents.length === 0) {
		return (
			<div className="py-8 text-center text-[var(--text-dark)]" style={{ fontFamily: 'var(--font-sans)' }}>
				No forms available.
			</div>
		);
	}

	return (
		<div
			className="fund-center-forms-table-wrap w-full bg-white"
			role="region"
			aria-label="Forms and applications"
			style={{ fontFamily: 'var(--font-sans)' }}>
			<table className="fund-center-forms-table w-full border-collapse bg-white">
				<caption className="sr-only">Forms and applications</caption>
				<colgroup>
					<col />
					<col style={{ width: FUND_TABLE_DOCUMENT_COL_MIN_WIDTH, minWidth: FUND_TABLE_DOCUMENT_COL_MIN_WIDTH }} />
				</colgroup>
				<tbody>
					{documents.map((doc) => (
						<tr key={doc.id}>
							<td
								className={`${FUND_TABLE_BODY_TD} px-3 text-left align-middle`}
								style={FORMS_LABEL_CELL_STYLE}>
								{doc.label}
							</td>
							<td
								className={`fund-center-document-cell ${FUND_TABLE_BODY_TD} px-3 text-center align-middle`}
								style={{
									...ROW_CELL_BORDER,
									minWidth: FUND_TABLE_DOCUMENT_COL_MIN_WIDTH,
									verticalAlign: 'middle',
								}}>
								<div className="fund-center-document-cell-inner grid w-full place-items-center">
									{canOpenFormsItem(doc) ? (
										<button
											type="button"
											className={iconButtonClass}
											title={`Download ${doc.label}`}
											aria-label={`Download ${doc.label}`}
											disabled={
												!!doc.clientCode?.trim() &&
												(doc.url === '#' || !doc.url?.trim()) &&
												!fundService
											}
											onClick={() => {
												if (!canOpenFormsItem(doc)) return;
												const fd = formsItemToFundDocument(doc);
												void (async () => {
													try {
														if (fundService && (!!fd.clientCode?.trim() || !!fd.url?.trim())) {
															await fundService.openFundDocumentInBrowser(fd);
														} else if (fd.url?.trim()) {
															const openUrl = absolutizeKurtosysDocumentUrl(fd.url, FALLBACK_API_BASE);
															if (openUrl?.trim()) openDocumentInBrowser(openUrl, fd.filename);
														}
													} catch (e) {
														console.error('Failed to open form document', e);
													}
												})();
											}}>
											<DocumentIcon size={24} />
										</button>
									) : (
										<span
											className="inline-flex items-center justify-center opacity-60"
											title="Link not configured"
											role="img"
											aria-label="PDF preview not available">
											<DocumentIcon size={24} />
										</span>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default FormsDocumentList;
