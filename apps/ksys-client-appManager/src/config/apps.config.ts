import type { AppInputs, Section } from '@/types/app-manager.types';

const API_BASE = import.meta.env.VITE_KURTOSYS_API_URL || 'https://api-us.kurtosys.app';
const APP_PATH = 'applicationManager/apps';

/** Child widget Studio GUIDs — filled via config/env.config.cjs → Vite define. */
const CHILD_APP_GUIDS: Record<string, string> = {
	pageHeader: import.meta.env.VITE_GUID_PAGE_HEADER || '',
	overview: import.meta.env.VITE_GUID_OVERVIEW || '',
	performance: import.meta.env.VITE_GUID_PERFORMANCE || '',
	portfolioBreakdown: import.meta.env.VITE_GUID_PORTFOLIO_BREAKDOWN || '',
	literature: import.meta.env.VITE_GUID_LITERATURE || '',
};

function appUrl(appId: string, filename: string): string {
	const guid = CHILD_APP_GUIDS[appId];
	if (guid) {
		return `${API_BASE}/${APP_PATH}/${guid}/${filename}`;
	}
	return `/${appId}/${filename}`;
}

export function hasValidGuid(appId: string): boolean {
	return !!CHILD_APP_GUIDS[appId];
}

export function resolveContainerId(
	containerId: string | ((inputs: AppInputs) => string),
	inputs: AppInputs,
): string {
	return typeof containerId === 'function' ? containerId(inputs) : containerId;
}

/**
 * Product-page section registry.
 * Host page (DXM/CMS) usually owns tab UI + mount divs; App Manager loads the scripts.
 * Update labels / add sections when you add widgets (`npm run apps:add`).
 */
export const APP_SECTIONS: Section[] = [
	{
		id: 'header',
		label: 'Header',
		showInNav: false,
		lazy: false,
		apps: [
			{
				id: 'pageHeader',
				name: 'Page Header',
				containerId: 'pageHeader',
				scriptUrl: appUrl('pageHeader', 'pageHeader.js'),
				requiredInputs: ['clientCode', 'culture', 'productType'],
			},
		],
	},
	{
		id: 'overview',
		label: 'Overview',
		showInNav: true,
		lazy: false,
		apps: [
			{
				id: 'overview',
				name: 'Overview',
				containerId: 'overview',
				scriptUrl: appUrl('overview', 'overview.js'),
				requiredInputs: ['clientCode', 'culture', 'productType'],
			},
		],
	},
	{
		id: 'performance',
		label: 'Performance',
		showInNav: true,
		lazy: true,
		apps: [
			{
				id: 'performance',
				name: 'Performance',
				containerId: 'performance',
				scriptUrl: appUrl('performance', 'performance.js'),
				requiredInputs: ['clientCode', 'culture', 'productType'],
			},
		],
	},
	{
		id: 'portfolioBreakdown',
		label: 'Portfolio Breakdown',
		showInNav: true,
		lazy: true,
		apps: [
			{
				id: 'portfolioBreakdown',
				name: 'Portfolio Breakdown',
				containerId: 'portfolioBreakdown',
				scriptUrl: appUrl('portfolioBreakdown', 'portfolioBreakdown.js'),
				requiredInputs: ['clientCode', 'culture', 'productType'],
			},
		],
	},
	{
		id: 'literature',
		label: 'Literature',
		showInNav: true,
		lazy: true,
		apps: [
			{
				id: 'literature',
				name: 'Literature',
				containerId: 'literature',
				scriptUrl: appUrl('literature', 'literature.js'),
				requiredInputs: ['clientCode', 'culture'],
			},
		],
	},
];

export function getNavSections(): Section[] {
	return APP_SECTIONS.filter((s) => s.showInNav);
}
