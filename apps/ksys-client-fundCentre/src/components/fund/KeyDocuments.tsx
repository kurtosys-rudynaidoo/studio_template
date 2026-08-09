/**
 * KeyDocuments Component
 * Document links with document icon; preview only (download disabled)
 */

import type { FundDocument } from '@/types/fund.types';
import type { FundService } from '@/services/fund-service';
import { absolutizeKurtosysDocumentUrl } from '@/utils/document-url';
import { openDocumentInBrowser } from '@/utils/open-document';
import { documentIconUrl, documentIconDisplaySize } from '@/constants/document-icon-url';

const FALLBACK_API_BASE =
	(typeof import.meta !== 'undefined' && import.meta.env?.VITE_KURTOSYS_API_URL) || 'https://api-us.fundpress.io';

export interface KeyDocumentsProps {
	documents: FundDocument[];
	fundService?: FundService;
}

/** Document icon (SVG asset) */
function DocumentIcon({ className }: { className?: string }) {
	const { width, height } = documentIconDisplaySize(32);
	return (
		<img
			src={documentIconUrl}
			alt=""
			width={width}
			height={height}
			className={`fund-center-document-icon ${className ?? ''}`.trim()}
			aria-hidden
			decoding="async"
			style={{ display: 'block', objectFit: 'contain', opacity: 1, visibility: 'visible' }}
		/>
	);
}

function KeyDocuments({ documents, fundService }: KeyDocumentsProps) {
	if (!documents || documents.length === 0) {
		return null;
	}

	const canOpen = (doc: FundDocument) => {
		const hasCode = !!doc.clientCode?.trim();
		const hasPath = !!doc.url?.trim() && doc.url !== '#';
		if (hasCode) return !!fundService;
		return hasPath;
	};

	const openDocument = (doc: FundDocument) => {
		if (!canOpen(doc)) return;
		const hasCode = !!doc.clientCode?.trim();
		const hasPath = !!doc.url?.trim() && doc.url !== '#';

		void (async () => {
			try {
				if (fundService && (hasCode || hasPath)) {
					await fundService.openFundDocumentInBrowser(doc);
				} else if (hasPath) {
					const openUrl = absolutizeKurtosysDocumentUrl(doc.url!.trim(), FALLBACK_API_BASE);
					if (openUrl?.trim()) openDocumentInBrowser(openUrl, doc.filename);
				}
			} catch (e) {
				console.error('Failed to open document', e);
			}
		})();
	};

	const holdingsDocs = documents.filter((doc) => doc.type === 'Holdings');

	if (holdingsDocs.length === 0) {
		return null;
	}

	return (
		<div>
			<h2
				className="text-base font-bold mb-4 hidden"
				style={{
					color: '#000',
					fontFamily: 'var(--font-condensed)',
				}}>
				Key Documents
			</h2>
			<ul className="flex flex-wrap items-center gap-4 list-none p-0 m-0">
				{holdingsDocs.map((doc) => {
					const canPreview = canOpen(doc);

					return (
						<li
							key={doc.id}
							className="flex items-center"
							style={{
								fontFamily: 'var(--font-condensed)',
								fontSize: '16px',
								fontWeight: 400,
							}}>
							<button
								type="button"
								title={canPreview ? `Preview ${doc.filename}` : doc.filename}
								aria-label={canPreview ? `Preview ${doc.filename}` : doc.filename}
								className="fund-center-document-action-btn p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
								onClick={() => openDocument(doc)}
								disabled={!canPreview}>
								<DocumentIcon />
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default KeyDocuments;
