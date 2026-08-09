/**
 * ModuleTabs Component
 * Overview / Performance / Materials: WAI-ARIA tabs (tablist / tab / tabpanel wired in FundCenter).
 */

import { useCallback, useRef, type KeyboardEvent } from 'react';

import type { ModuleId } from '@/types/fund-center.types';

/** Single module panel id (content swaps; aria-labelledby tracks active tab). */
export const FUND_CENTER_MODULE_PANEL_ID = 'fund-center-module-panel';

export interface ModuleTabsProps {
	modules: Array<{ id: ModuleId; label: string }>;
	activeModule: ModuleId;
	onModuleChange: (module: ModuleId) => void;
}

function ModuleTabs({ modules, activeModule, onModuleChange }: ModuleTabsProps) {
	const tablistRef = useRef<HTMLDivElement>(null);

	const focusTabIndex = useCallback(
		(index: number) => {
			const id = modules[index]?.id;
			if (!id) return;
			requestAnimationFrame(() => {
				tablistRef.current?.querySelector<HTMLButtonElement>(`#module-tab-${id}`)?.focus();
			});
		},
		[modules],
	);

	const handleTabKeyDown = useCallback(
		(e: KeyboardEvent, index: number) => {
			if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
				e.preventDefault();
				const delta = e.key === 'ArrowRight' ? 1 : -1;
				const next = (index + delta + modules.length) % modules.length;
				focusTabIndex(next);
			} else if (e.key === 'Home') {
				e.preventDefault();
				focusTabIndex(0);
			} else if (e.key === 'End') {
				e.preventDefault();
				focusTabIndex(modules.length - 1);
			} else if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onModuleChange(modules[index].id);
			}
		},
		[modules, onModuleChange, focusTabIndex],
	);

	const handleClick = useCallback(
		(moduleId: ModuleId) => {
			onModuleChange(moduleId);
		},
		[onModuleChange],
	);

	return (
		<nav aria-label="Fund data sections" className="min-w-0">
			<div
				ref={tablistRef}
				role="tablist"
				aria-label="Overview, performance, materials, or forms"
				className="fund-center-module-tablist flex flex-wrap items-end gap-0"
				style={{
					fontFamily: 'var(--font-sans)',
					borderBottom: '1px solid var(--tab-module-row-border)',
				}}>
				{modules.map((module, index) => {
					const isActive = module.id === activeModule;
					return (
						<button
							key={module.id}
							type="button"
							role="tab"
							id={`module-tab-${module.id}`}
							aria-selected={isActive}
							aria-controls={FUND_CENTER_MODULE_PANEL_ID}
							tabIndex={0}
							onClick={() => handleClick(module.id)}
							onKeyDown={(e) => handleTabKeyDown(e, index)}
							className="fund-center-module-tab flex items-center justify-center bg-transparent rounded-none"
							style={{
								height: '48px',
								marginBottom: '-1px',
								color: isActive ? 'var(--section-header)' : 'var(--tab-inactive-text)',
								fontFamily: 'var(--font-sans)',
								fontSize: '16px',
								fontWeight: isActive ? 600 : 500,
								lineHeight: 'normal',
								textAlign: 'center',
								padding: '0 20px',
								border: 'none',
								borderBottom: isActive
									? '3px solid var(--tab-module-active-underline)'
									: '3px solid transparent',
								cursor: 'pointer',
								whiteSpace: 'pre-wrap',
							}}>
							{module.label}
						</button>
					);
				})}
			</div>
		</nav>
	);
}

export default ModuleTabs;
