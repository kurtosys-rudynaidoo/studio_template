import * as path from 'path';

import { buildFundCenterQueryString } from '../src/utils/shareable-link-params';
import type { FundType, ModuleId } from '../src/types/fund-center.types';

export const OUT_DIR = path.join(process.cwd(), 'e2e-results');
export const SHOTS = path.join(OUT_DIR, 'screenshots');

export const MODULE_LABELS: Record<string, string> = {
	overview: 'Overview',
	performance: 'Performance',
	materials: 'Materials',
	forms: 'Forms',
};

export const MATRIX: Array<{
	fundType: string;
	fundTabName: string;
	modules: string[];
}> = [
	{
		fundType: 'separate-account',
		fundTabName: 'Institutional Strategies',
		modules: ['overview', 'performance', 'materials'],
	},
	{
		fundType: 'mutual-fund',
		fundTabName: 'Mutual Fund',
		modules: ['overview', 'performance', 'materials', 'forms'],
	},
];

export const VIEWPORTS = [
	{ name: 'desktop', width: 1440, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
] as const;

/** Build Fund Center start URL using the public categoryTab / tab query format. */
export function fundCenterUrl(baseURL: string | undefined, fundType: string, moduleId: string): string {
	const query = buildFundCenterQueryString(fundType as FundType, moduleId as ModuleId);
	return `${baseURL ?? ''}/?${query}`;
}
