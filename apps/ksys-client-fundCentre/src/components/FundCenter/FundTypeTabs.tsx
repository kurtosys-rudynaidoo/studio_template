/**
 * FundTypeTabs Component
 * Top-level fund type navigation: WAI-ARIA tabs (panel wired in FundCenter).
 */

import { useCallback, useRef, type CSSProperties, type KeyboardEvent } from 'react';

import type { FundType } from '@/types/fund-center.types';

export const FUND_CENTER_FUND_TYPE_PANEL_ID = 'fund-center-fund-type-panel';

export interface FundTypeTabsProps {
	fundTypes: Array<{ id: FundType; label: string }>;
	activeFundType: FundType;
	onFundTypeChange: (fundType: FundType) => void;
	/** Sibling link (not a tab): opens DXM / site landing page for Subadvised in a new tab. */
	subadvisedLink?: { href: string; label?: string };
}

const subadvisedLinkBaseStyle: CSSProperties = {
	minHeight: '51px',
	backgroundColor: 'transparent',
	color: 'var(--tab-inactive-text)',
	fontFamily: 'var(--font-sans)',
	fontSize: '16px',
	fontWeight: 500,
	lineHeight: 'normal',
	textAlign: 'center',
	padding: '0 4px',
	border: 'none',
	cursor: 'pointer',
	whiteSpace: 'pre-wrap',
	textDecoration: 'none',
	boxSizing: 'border-box',
};

function FundTypeTabs({
	fundTypes,
	activeFundType,
	onFundTypeChange,
	subadvisedLink,
}: FundTypeTabsProps) {
	const tablistRef = useRef<HTMLDivElement>(null);

	const focusTabIndex = useCallback(
		(index: number) => {
			const id = fundTypes[index]?.id;
			if (!id) return;
			requestAnimationFrame(() => {
				tablistRef.current?.querySelector<HTMLButtonElement>(`#fund-type-tab-${id}`)?.focus();
			});
		},
		[fundTypes],
	);

	const handleTabKeyDown = useCallback(
		(e: KeyboardEvent, index: number) => {
			// Manual activation (WAI-ARIA tabs): arrows move focus only; Enter / Space selects.
			if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
				e.preventDefault();
				const delta = e.key === 'ArrowRight' ? 1 : -1;
				const next = (index + delta + fundTypes.length) % fundTypes.length;
				focusTabIndex(next);
			} else if (e.key === 'Home') {
				e.preventDefault();
				focusTabIndex(0);
			} else if (e.key === 'End') {
				e.preventDefault();
				focusTabIndex(fundTypes.length - 1);
			} else if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onFundTypeChange(fundTypes[index].id);
			}
		},
		[fundTypes, onFundTypeChange, focusTabIndex],
	);

	const handleClick = useCallback(
		(fundTypeId: FundType) => {
			onFundTypeChange(fundTypeId);
		},
		[onFundTypeChange],
	);

	return (
		<nav aria-label="Fund category" className="min-w-0">
			<div
				className="flex flex-wrap items-center gap-6 overflow-x-hidden min-w-0"
				style={{ fontFamily: 'var(--font-sans)' }}>
				<div
					ref={tablistRef}
					role="tablist"
					aria-label="Choose fund category"
					className="fund-center-fund-type-tablist flex flex-wrap items-center gap-6 overflow-x-hidden min-w-0">
					{fundTypes.map((fundType, index) => {
						const isActive = fundType.id === activeFundType;
						return (
							<button
								key={fundType.id}
								type="button"
								role="tab"
								id={`fund-type-tab-${fundType.id}`}
								aria-selected={isActive}
								aria-controls={FUND_CENTER_FUND_TYPE_PANEL_ID}
								tabIndex={0}
								onClick={() => handleClick(fundType.id)}
								onKeyDown={(e) => handleTabKeyDown(e, index)}
								className="fund-center-fund-type-tab flex items-center justify-center rounded-none"
								style={{
									minHeight: '51px',
									backgroundColor: isActive ? 'var(--tab-active-bg)' : 'transparent',
									color: isActive ? 'var(--tab-active-text)' : 'var(--tab-inactive-text)',
									fontFamily: 'var(--font-sans)',
									fontSize: '16px',
									fontWeight: 500,
									lineHeight: 'normal',
									textAlign: 'center',
									padding: isActive ? '0 20px' : '0 4px',
									border: 'none',
									cursor: 'pointer',
									whiteSpace: 'pre-wrap',
								}}>
								{fundType.label}
							</button>
						);
					})}
				</div>
				{subadvisedLink ? (
					<a
						href={subadvisedLink.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`${subadvisedLink.label ?? 'Subadvised'} (opens in new tab)`}
						className="fund-center-fund-type-subadvised-link inline-flex items-center justify-center rounded-none outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
						style={subadvisedLinkBaseStyle}>
						{subadvisedLink.label ?? 'Subadvised'}
					</a>
				) : null}
			</div>
		</nav>
	);
}

export default FundTypeTabs;
