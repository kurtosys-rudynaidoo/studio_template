/**
 * DocumentCell Component
 * Document links with document icon; preview only (download disabled).
 * When multiple documents match: PDF opens the selected doc; chevron opens a menu to pick one.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import type { FundDocument } from '@/types/fund.types';
import type { FundService } from '@/services/fund-service';
import { absolutizeKurtosysDocumentUrl } from '@/utils/document-url';
import { openDocumentInBrowser } from '@/utils/open-document';
import { documentIconUrl, documentIconDisplaySize } from '@/constants/document-icon-url';

const FALLBACK_API_BASE =
	(typeof import.meta !== 'undefined' && import.meta.env?.VITE_KURTOSYS_API_URL) || 'https://api-us.fundpress.io';

export interface DocumentCellProps {
	documents: FundDocument[];
	maxVisible?: number;
	/** Used to resolve relative API document paths against the same host as `searchEntity` (e.g. `doc.URL` / `storagePath`). */
	fundService?: FundService;
}

/** Document icon (SVG asset) — compact for table cells */
function DocumentIcon({ className, size = 28 }: { className?: string; size?: number }) {
	const { width, height } = documentIconDisplaySize(size);
	return (
		<img
			src={documentIconUrl}
			alt=""
			width={width}
			height={height}
			className={`fund-center-document-icon ${className ?? ''}`.trim()}
			aria-hidden
			decoding="async"
			style={{
				display: 'block',
				flexShrink: 0,
				objectFit: 'contain',
				opacity: 1,
				visibility: 'visible',
				maxWidth: '100%',
				height: 'auto',
			}}
		/>
	);
}

function ChevronDown({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width="12"
			height="12"
			viewBox="0 0 12 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden>
			<path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

function DocumentCell({ documents, fundService }: DocumentCellProps) {
	const [selectedId, setSelectedId] = useState<string>(() => documents?.[0]?.id ?? '');
	const openingRef = useRef(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
	const chevronRef = useRef<HTMLButtonElement>(null);
	const menuPanelRef = useRef<HTMLDivElement>(null);
	const menuId = useRef(`doc-cell-menu-${Math.random().toString(36).slice(2, 9)}`).current;

	useEffect(() => {
		setSelectedId((prev) => {
			if (documents.some((d) => d.id === prev)) return prev;
			return documents[0]?.id ?? '';
		});
	}, [documents]);

	const closeMenu = useCallback(() => {
		setMenuOpen(false);
		setMenuPos(null);
	}, []);

	useEffect(() => {
		if (!menuOpen) return;
		const onDocMouseDown = (e: MouseEvent) => {
			const t = e.target as Node;
			if (chevronRef.current?.contains(t)) return;
			const menuEl = document.getElementById(menuId);
			if (menuEl?.contains(t)) return;
			closeMenu();
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeMenu();
		};
		document.addEventListener('mousedown', onDocMouseDown);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDocMouseDown);
			document.removeEventListener('keydown', onKey);
		};
	}, [menuOpen, closeMenu, menuId]);

	useEffect(() => {
		if (!menuOpen || !menuPanelRef.current) return;
		const first = menuPanelRef.current.querySelector<HTMLButtonElement>('[role="option"]');
		first?.focus();
	}, [menuOpen]);

	const openMenu = useCallback(() => {
		const el = chevronRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		setMenuPos({ top: r.bottom + 4, left: r.left });
		setMenuOpen(true);
	}, []);

	const toggleMenu = useCallback(() => {
		if (menuOpen) closeMenu();
		else openMenu();
	}, [menuOpen, closeMenu, openMenu]);

	const openDocumentPreview = useCallback(
		(doc: FundDocument) => {
			if (openingRef.current) return;
			const hasCode = !!doc.clientCode?.trim();
			const hasPath = !!doc.url?.trim() && doc.url !== '#';
			if (!hasCode && !hasPath) return;

			openingRef.current = true;
			void (async () => {
				try {
					if (fundService && (hasCode || hasPath)) {
						await fundService.openFundDocumentInBrowser(doc);
					} else if (hasPath && !hasCode) {
						const openUrl = absolutizeKurtosysDocumentUrl(doc.url!.trim(), FALLBACK_API_BASE);
						if (openUrl?.trim()) {
							openDocumentInBrowser(openUrl, doc.filename);
						}
					}
				} catch (e) {
					console.error('Failed to open document', e);
				} finally {
					openingRef.current = false;
				}
			})();
		},
		[fundService],
	);

	if (!documents || documents.length === 0) {
		return (
			<span
				className="fund-center-document-cell-content mx-auto block text-muted-foreground text-sm"
				aria-label="No document available">
				—
			</span>
		);
	}

	const selectedDoc = documents.find((d) => d.id === selectedId) ?? documents[0];
	const hasMultiple = documents.length > 1;

	const iconButtonClass =
		'fund-center-document-action-btn mx-auto inline-flex items-center justify-center p-0 border-0 bg-transparent cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#1A6DBC] focus:ring-offset-1 rounded shrink-0';

	if (!hasMultiple) {
		return (
			<button
				type="button"
				title={`Preview ${documents[0].filename}`}
				aria-label={`Preview ${documents[0].filename}`}
				className={iconButtonClass}
				onClick={() => openDocumentPreview(documents[0])}>
				<DocumentIcon size={24} />
			</button>
		);
	}

	return (
		<div className="fund-center-document-cell-content relative mx-auto inline-flex items-center justify-center gap-0.5">
			<button
				type="button"
				title={`Preview ${selectedDoc.filename}`}
				aria-label={`Preview ${selectedDoc.filename}`}
				className={iconButtonClass}
				onClick={() => openDocumentPreview(selectedDoc)}>
				<DocumentIcon size={24} />
			</button>
			<button
				ref={chevronRef}
				type="button"
				className={`${iconButtonClass} text-[var(--text-dark)] p-0.5`}
				aria-expanded={menuOpen}
				aria-haspopup="listbox"
				aria-controls={menuId}
				title="Choose document"
				aria-label="Choose document to preview"
				onClick={(e) => {
					e.stopPropagation();
					toggleMenu();
				}}>
				<ChevronDown />
			</button>
			{menuOpen &&
				menuPos &&
				createPortal(
					<div
						ref={menuPanelRef}
						id={menuId}
						role="listbox"
						aria-label="Documents"
						className="z-[1000] min-w-[10rem] max-w-[min(20rem,calc(100vw-1rem))] rounded border border-gray-200 bg-white py-1 shadow-md"
						style={{
							position: 'fixed',
							top: menuPos.top,
							left: menuPos.left,
							fontFamily: 'var(--font-sans)',
						}}>
						{documents.map((doc) => {
							const label = doc.filename || doc.type || 'Document';
							const selected = doc.id === selectedId;
							return (
								<button
									key={doc.id}
									type="button"
									role="option"
									aria-selected={selected}
									className="block w-full cursor-pointer border-0 bg-transparent px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
									onClick={() => {
										setSelectedId(doc.id);
										closeMenu();
									}}
									onKeyDown={(e) => {
										const root = menuPanelRef.current;
										if (!root) return;
										const opts = [...root.querySelectorAll<HTMLButtonElement>('[role="option"]')];
										const i = opts.indexOf(e.currentTarget);
										if (e.key === 'ArrowDown') {
											e.preventDefault();
											opts[Math.min(i + 1, opts.length - 1)]?.focus();
										} else if (e.key === 'ArrowUp') {
											e.preventDefault();
											opts[Math.max(i - 1, 0)]?.focus();
										} else if (e.key === 'Home') {
											e.preventDefault();
											opts[0]?.focus();
										} else if (e.key === 'End') {
											e.preventDefault();
											opts[opts.length - 1]?.focus();
										}
									}}>
									{label}
								</button>
							);
						})}
					</div>,
					document.getElementById('your-app-container') ?? document.body,
				)}
		</div>
	);
}

export default DocumentCell;
