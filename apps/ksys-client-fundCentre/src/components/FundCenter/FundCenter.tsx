/**
 * FundCenter Component
 * Main container for the Fund Center application
 */

import { safeUrl } from '@/utils/safe-content';
import { useState, useCallback, useMemo, useEffect, useLayoutEffect, type RefCallback } from 'react';

import { FundCenterLayoutProvider } from '@/contexts/FundCenterLayoutContext';

import { useFundCenterConfig } from '@/hooks/useFundCenterConfig';
import { useFilters } from '@/hooks/useFilters';
import { useFunds } from '@/hooks/useFunds';
import { useFormsDocuments, FORMS_DOCUMENT_TYPE_VALUES } from '@/hooks/useFormsDocuments';
import { useShareableLink } from '@/hooks/useShareableLink';
import {
	useDisclaimers,
	resolveMutualFundOverviewDisclaimerHtml,
	resolveMutualFundPerformanceDisclaimerHtml,
	resolveInstitutionalStrategiesPerformanceDisclaimerHtml,
} from '@/hooks/useDisclaimers';
import { KSYSApiService } from '@/services/ksys-api-service';
import { FundService } from '@/services/fund-service';
import FundTypeTabs, { FUND_CENTER_FUND_TYPE_PANEL_ID } from './FundTypeTabs';
import ModuleTabs, { FUND_CENTER_MODULE_PANEL_ID } from './ModuleTabs';
import FundList from '@/components/fund/FundList';
import FundCenterTabDisclaimer from '@/components/fund/FundCenterTabDisclaimer';
import AllFundsPerformanceTable from '@/components/fund/AllFundsPerformanceTable';
import FormsDocumentList from '@/components/fund/FormsDocumentList';
import type { FormsDocumentItem } from '@/components/fund/FormsDocumentList';
import type { FundType, ModuleId, FundCenterConfig } from '@/types/fund-center.types';
import { FUND_COMMENTARY_LIMIT_TO } from '@/constants/fund-commentary-includes';
import { STANDARD_DOCUMENTS_JOIN_SPEC } from '@/constants/document-join-spec';
import { mutualFundMaterialsDocumentsJoinSpec } from '@/constants/mutual-fund-materials-request';
import { applyUatFundDisplayFilters } from '@/utils/uat-fund-filters';
import {
	FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL,
	FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND,
	FUND_TABLE_INCEPTION_COL_WIDTH,
} from '@/utils/fund-table-thead';

export interface FundCenterProps {
	config?: FundCenterConfig;
}

/** Row `kurtosys_id` first, then `meta.fund_name` vs class or fund name; one PDF per cell. */
const DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 = {
	documentMatchScope: 'kurtosys_id_only' as const,
	maxDocuments: 1,
};

/** Regulatory / fund-wide docs often have no shareclass id — only dedupe when multiple match. */
const DOCUMENT_COLUMN_MAX1 = {
	maxDocuments: 1,
};

/**
 * Shared module configs: same table columns and request body for all fund types
 */
const sharedOverviewModule = {
	id: 'overview' as const,
	label: 'Overview',
	columns: [
		{ code: 'name', label: 'Name', sortable: true, width: FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL },
		{
			code: 'inception_date',
			label: 'Inception Date',
			width: FUND_TABLE_INCEPTION_COL_WIDTH,
			data: { property: 'since_inception_date' },
			format: { type: 'date' as const, options: { month: '2-digit', day: '2-digit', year: 'numeric' } },
		},
		/* Value: `resolveAum()` in column-renderer (monthly_prices → port_chars → AUM-related properties). */
		{ code: 'aum', label: 'AUM($)', width: '8%' },
		{ code: 'benchmark_primary', label: 'Benchmark', sortable: true, width: '16%' },
		{ code: 'geographical_focus', label: 'Geographical Focus', sortable: true, width: '10%' },
		{
			code: 'quarterly_profile',
			label: 'Factsheet',
			width: '7%',
			data: { documentTypes: ['Factsheet', 'Profile'], ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'holdings',
			label: 'Holdings',
			width: '7%',
			data: { documentType: 'Holdings', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'commentary',
			label: 'Commentary',
			width: '7%',
			data: {
				documentTypes: ['Commentary', 'Quarterly Commentary'],
				...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1,
			},
		},
	],
	requestBody: {
		type: 'CLSS',
		include: {
			statistics: {
				limitTo: [
					'monthly_prices',
					'monthly_performance',
					'quarterly_performance',
					'yearly_performance',
					'port_chars',
					'risk_stats',
				],
			},
			commentaries: {
				limitTo: [...FUND_COMMENTARY_LIMIT_TO],
			},
			disclaimers: { exclude: false },
			fundManagers: {},
			documents: {
				joinSpec: [...STANDARD_DOCUMENTS_JOIN_SPEC],
				excludeExpired: false,
			},
		},
		includeProperties: [
			'kurtosys_id',
			'class_name',
			'benchmark_primary',
			'geographical_focus',
			'inception_date',
			'since_inception_date',
			'cusip',
			'url_suffix',
			'url_type',
			'gross_expense',
			'net_expense',
		],
	},
	sort: [
		{ property: 'geographical_focus', direction: 'desc' as const },
		{ property: 'class_name', direction: 'asc' as const },
	],
};

/** Performance tab: same request as Overview so it shows the same entities; still renders the performance table. */
const sharedPerformanceModule = {
	id: 'performance' as const,
	label: 'Performance',
	columns: [],
	requestBody: sharedOverviewModule.requestBody,
	sort: sharedOverviewModule.sort,
};

/** Mutual Fund Overview: same as shared plus Ticker (from `properties_pub.ticker` → shareclass.ticker). */
const mutualFundOverviewModule = {
	...sharedOverviewModule,
	columns: [
		{ code: 'name', label: 'Name', sortable: true, width: FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND },
		{ code: 'ticker', label: 'Ticker', sortable: true, width: '7%', data: { property: 'ticker' } },
		{
			code: 'inception_date',
			label: 'Inception Date',
			width: FUND_TABLE_INCEPTION_COL_WIDTH,
			data: { property: 'since_inception_date' },
			format: { type: 'date' as const, options: { month: '2-digit', day: '2-digit', year: 'numeric' } },
		},
		{
			code: 'aum',
			label: 'AUM ($)',
			width: '7%',
			data: { statisticCode: 'daily_prices', statisticLabel: 'net_assets' },
		},
		{ code: 'benchmark_primary', label: 'Benchmark', sortable: true, width: '14%' },
		{ code: 'geographical_focus', label: 'Geographical Focus', sortable: true, width: '10%' },
		{
			code: 'quarterly_profile',
			label: 'Factsheet',
			width: '7%',
			data: { documentTypes: ['Factsheet', 'Profile'], ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'holdings',
			label: 'Holdings',
			width: '7%',
			data: { documentType: 'Holdings', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'commentary',
			label: 'Commentary',
			width: '7%',
			data: {
				documentTypes: ['Commentary', 'Quarterly Commentary'],
				...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1,
			},
		},
	],
	requestBody: {
		...sharedOverviewModule.requestBody,
		include: {
			...sharedOverviewModule.requestBody.include,
			statistics: {
				limitTo: [...sharedOverviewModule.requestBody.include.statistics.limitTo, 'daily_prices'],
			},
		},
		includeProperties: [
			...new Set([
				...sharedOverviewModule.requestBody.includeProperties,
				'ticker',
				'total_net_assets',
				'net_assets',
				'aum',
				'fund_aum',
				'fund_net_assets',
			]),
		],
	},
};

const mutualFundPerformanceModule = {
	id: 'performance' as const,
	label: 'Performance',
	columns: [],
	requestBody: mutualFundOverviewModule.requestBody,
	sort: mutualFundOverviewModule.sort,
};

const sharedMaterialsModule = {
	id: 'materials' as const,
	label: 'Materials',
	columns: [
		{ code: 'name', label: 'Name', sortable: true, width: FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL },
		{
			code: 'quarterly_profile',
			label: 'Factsheet',
			width: '25%',
			data: { documentTypes: ['Factsheet', 'Profile'], ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'holdings',
			label: 'Holdings',
			width: '25%',
			data: { documentType: 'Holdings', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'commentary',
			label: 'Commentary',
			width: '24%',
			data: {
				documentTypes: ['Commentary', 'Quarterly Commentary'],
				...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1,
			},
		},
	],
	requestBody: {
		type: 'CLSS',
		include: {
			documents: {
				joinSpec: [...STANDARD_DOCUMENTS_JOIN_SPEC],
				excludeExpired: false,
			},
		},
		includeProperties: ['kurtosys_id', 'class_name'],
	},
	sort: [{ property: 'class_name', direction: 'asc' as const }],
};

/**
 * Mutual Fund → Materials: column `label` vs API `document_type` per fc.json (documentType + label can differ).
 * Order matches studio Materials columnConfig (Factsheet → … → Q3 Holdings).
 */
const mutualFundMaterialsModule = {
	id: 'materials' as const,
	label: 'Materials',
	columns: [
		{ code: 'name', label: 'Name', sortable: true, width: FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND },
		{ code: 'ticker', label: 'Ticker', sortable: true, width: '8%' },
		{
			code: 'doc_factsheet',
			label: 'Factsheet',
			width: '5%',
			data: { documentType: 'Factsheet', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'doc_quarterly_commentary',
			label: 'Quarterly Commentary',
			width: '5%',
			data: { documentType: 'Quarterly Commentary', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'doc_prospectus',
			label: 'Prospectus',
			width: '5%',
			data: { documentType: 'Prospectus', ...DOCUMENT_COLUMN_MAX1 },
		},
		{
			code: 'doc_sai',
			label: 'Statement of Additional Information',
			width: '5%',
			data: { documentTypes: ['SAI', 'Statement of Additional Information'], ...DOCUMENT_COLUMN_MAX1 },
		},
		{
			code: 'doc_annual_report',
			label: 'Annual Financial Statement',
			width: '5%',
			data: { documentType: 'Annual Report', ...DOCUMENT_COLUMN_MAX1 },
		},
		{
			code: 'doc_annual_tsr',
			label: 'Annual Tailored Shareholder Report',
			width: '5%',
			data: { documentTypes: ['Tailored Shareholder Rpt'], ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'doc_semi_annual_report',
			label: 'Semi Annual Financial Report',
			width: '5%',
			data: { documentType: 'Semi Annual Report', ...DOCUMENT_COLUMN_MAX1 },
		},
		{
			code: 'doc_sar_tsr',
			label: 'Semi Annual Tailored Shareholder Report',
			width: '5%',
			data: { documentType: 'SAR Tailored Share Rpt', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'doc_fiscal_q1_holdings',
			label: 'Q1 Holdings',
			width: '5%',
			data: { documentType: 'Fiscal Q1 Holdings', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
		{
			code: 'doc_fiscal_q3_holdings',
			label: 'Q3 Holdings',
			width: '5%',
			data: { documentType: 'Fiscal Q3 Holdings', ...DOCUMENT_COLUMN_KURTOSYS_FUND_NAME_MAX1 },
		},
	],
	requestBody: {
		type: 'CLSS',
		skipAppendedFundTypeSearch: true,
		search: [{ property: 'type', values: ['Mutual Fund'], matchtype: 'MATCH' as const }],
		include: {
			statistics: {
				limitTo: ['daily_prices'],
			},
			disclaimers: { exclude: false },
			fundManagers: {},
			documents: {
				joinSpec: mutualFundMaterialsDocumentsJoinSpec(),
				excludeExpired: false,
			},
		},
		includeProperties: [
			'kurtosys_id',
			'class_name',
			'ticker',
			'cusip',
			'url_type',
			'url_suffix',
			'download_url',
			'prospectus',
		],
		identifierSearch: {
			properties: ['ticker', 'class_name', 'cusip', 'share_class', 'fund_center_keywords'],
			fuzzy: true,
			placeholder: {
				format: {
					plural: 'Search Funds by ticker or fund name',
					singular: 'Search Funds by ticker or fund name',
				},
			},
		},
	},
	sort: [{ property: 'class_name', direction: 'asc' as const }],
};

/** Fallback when Forms API returns empty or fails — labels match `document_type` filter values */
const defaultFormsDocuments: FormsDocumentItem[] = FORMS_DOCUMENT_TYPE_VALUES.map((label, index) => ({
	id: String(index + 1),
	label,
	url: '#',
}));

/**
 * Default fund center configuration
 * This would typically come from the KSYS Studio config or API
 */
const defaultConfig: FundCenterConfig = {
	fundTypes: [
		{
			id: 'separate-account',
			label: 'Institutional Strategies',
			modules: [
				{ ...sharedOverviewModule },
				{ ...sharedPerformanceModule },
				{ ...sharedMaterialsModule },
			],
		},
		{
			id: 'mutual-fund',
			label: 'Mutual Funds',
			modules: [
				{ ...mutualFundOverviewModule },
				{ ...mutualFundPerformanceModule },
				{ ...mutualFundMaterialsModule },
				{ id: 'forms', label: 'Forms', columns: [], requestBody: { type: 'CLSS' } },
			],
		},
	],
	globalConfig: {
		subadvisedLandingUrl: '',
	},
};

function FundCenter({ config = defaultConfig }: FundCenterProps) {
	const { config: embedConfig, isLoading: configLoading } = useFundCenterConfig();
	const { getURLState, updateURL } = useShareableLink();
	const [expandedFundIds, setExpandedFundIds] = useState<Set<string>>(new Set());
	const [modulePanelElement, setModulePanelElement] = useState<HTMLDivElement | null>(null);
	const handleModulePanelRef: RefCallback<HTMLDivElement> = useCallback((node) => {
		setModulePanelElement(node);
	}, []);

	// Initialize from URL or defaults (Subadvised → Institutional; Affiliate → Mutual Fund)
	const urlState = getURLState();
	const initialFundType = (() => {
		const t = urlState.fundType;
		if (t === 'subadvised') return 'separate-account' as const;
		if (t === 'affiliate') return 'mutual-fund' as const;
		return (t || 'separate-account') as FundType;
	})();
	const [activeFundType, setActiveFundType] = useState<FundType>(initialFundType);
	const [activeModule, setActiveModule] = useState<ModuleId>(urlState.module || 'overview');

	// Filters
	const filters = useFilters(urlState.filters);

	const resolvedSubadvisedLandingUrl = useMemo(() => {
		// safeUrl: this value drives location.replace and an href, so `javascript:` etc. must never pass.
		const fromEmbed = (embedConfig?.subadvisedLandingUrl ?? '').trim();
		if (fromEmbed) return safeUrl(fromEmbed);
		const fromGlobal = (config.globalConfig?.subadvisedLandingUrl ?? '').trim();
		if (fromGlobal) return safeUrl(fromGlobal);
		return safeUrl(import.meta.env.VITE_SUBADVISED_LANDING_URL);
	}, [embedConfig?.subadvisedLandingUrl, config.globalConfig?.subadvisedLandingUrl]);

	const shouldRedirectToSubadvisedLanding =
		!configLoading &&
		resolvedSubadvisedLandingUrl.length > 0 &&
		urlState.fundType === 'subadvised';

	useLayoutEffect(() => {
		if (configLoading || !resolvedSubadvisedLandingUrl) return;
		if (getURLState().fundType !== 'subadvised') return;
		window.location.replace(resolvedSubadvisedLandingUrl);
	}, [configLoading, resolvedSubadvisedLandingUrl, getURLState]);

	// Get active fund type config
	const activeFundTypeConfig = useMemo(
		() => config.fundTypes.find((ft) => ft.id === activeFundType),
		[config.fundTypes, activeFundType],
	);

	// API Service (initialized from embed config and environment)
	const apiService = useMemo(() => {
		// Use base API URL from environment (data-api-url is for app routing, not API endpoint)
		// The actual API endpoints like /fund/searchEntity are appended to this base URL
		const baseUrl = import.meta.env.VITE_KURTOSYS_API_URL || 'https://api-us.fundpress.io';
		
		// Get token from environment variable (set at build time via vite.config.ts)
		const token = import.meta.env.VITE_KURTOSYS_API_TOKEN;

		if (!token) {
			console.warn('VITE_KURTOSYS_API_TOKEN is not set. API requests may fail.');
		}

		// Log embed config for debugging
		if (embedConfig) {
			console.log('Embed Config:', {
				culture: embedConfig.culture,
				fundlist: embedConfig.fundlist,
				country: embedConfig.country,
				audience: embedConfig.audience,
				apiUrl: embedConfig.apiUrl, // This is for app routing, not API calls
				baseUrl: embedConfig.baseUrl,
			});
		}

		return new KSYSApiService({
			baseUrl,
			token: token || undefined,
		});
	}, [embedConfig]);

	// Fund Service (initialized from API service)
	const fundService = useMemo(() => {
		if (!apiService) {
			return undefined;
		}
		return new FundService({
			apiService,
			fundGroupProperty: config.fundGroupProperty,
		});
	}, [apiService, config.fundGroupProperty]);

	// Get active module config
	const activeModuleConfig = useMemo(
		() => activeFundTypeConfig?.modules.find((m) => m.id === activeModule),
		[activeFundTypeConfig, activeModule],
	);

	// Performance tab shows the same entities as Overview: fetch using Overview module config so we get the same list
	const fetchModuleConfig = useMemo(
		() =>
			activeModule === 'performance'
				? activeFundTypeConfig?.modules.find((m) => m.id === 'overview') ?? activeModuleConfig
				: activeModuleConfig,
		[activeModule, activeFundTypeConfig?.modules, activeModuleConfig],
	);

	// Forms documents (from POST /documents/searchDocuments)
	const { data: formsDocuments = [], isLoading: formsLoading } = useFormsDocuments({
		apiService,
		enabled: activeModule === 'forms' && !shouldRedirectToSubadvisedLanding,
	});

	// Funds data
	const { data: fundsData, isLoading: fundsLoading } = useFunds({
		fundType: activeFundType,
		moduleConfig: fetchModuleConfig || {
			id: 'overview',
			label: 'Overview',
			columns: [],
			requestBody: { type: 'CLSS' },
		},
		filters,
		culture: embedConfig?.culture || 'en-US',
		apiService: apiService!,
		fundGroupProperty: config.fundGroupProperty,
		enabled:
			!!apiService &&
			!!fetchModuleConfig &&
			!!embedConfig &&
			activeModule !== 'forms' &&
			!shouldRedirectToSubadvisedLanding,
		embedConfig: embedConfig
			? {
					fundlist: embedConfig.fundlist,
					culture: embedConfig.culture,
				}
			: undefined,
	});

	const displayFunds = useMemo(
		() => applyUatFundDisplayFilters(fundsData?.funds ?? [], activeFundType),
		[fundsData?.funds, activeFundType],
	);

	const culture = embedConfig?.culture || 'en-US';
	const showMutualFundOverviewDisclaimer =
		activeFundType === 'mutual-fund' && activeModule === 'overview' && !shouldRedirectToSubadvisedLanding;
	const showMutualFundPerformanceDisclaimer =
		activeFundType === 'mutual-fund' &&
		activeModule === 'performance' &&
		!shouldRedirectToSubadvisedLanding;
	const showInstitutionalPerformanceDisclaimer =
		activeFundType === 'separate-account' &&
		activeModule === 'performance' &&
		!shouldRedirectToSubadvisedLanding;
	const needsGlobalDisclaimers =
		showMutualFundOverviewDisclaimer ||
		showMutualFundPerformanceDisclaimer ||
		showInstitutionalPerformanceDisclaimer;

	const { data: globalDisclaimersData } = useDisclaimers({
		apiService,
		global: true,
		culture,
		enabled: needsGlobalDisclaimers,
	});

	const tabDisclaimerHtml = useMemo(() => {
		if (showMutualFundOverviewDisclaimer) {
			return resolveMutualFundOverviewDisclaimerHtml(globalDisclaimersData, culture);
		}
		if (showMutualFundPerformanceDisclaimer) {
			return resolveMutualFundPerformanceDisclaimerHtml(globalDisclaimersData, culture);
		}
		if (showInstitutionalPerformanceDisclaimer) {
			return resolveInstitutionalStrategiesPerformanceDisclaimerHtml(globalDisclaimersData, culture);
		}
		return null;
	}, [
		showMutualFundOverviewDisclaimer,
		showMutualFundPerformanceDisclaimer,
		showInstitutionalPerformanceDisclaimer,
		globalDisclaimersData,
		culture,
	]);

	// Get modules for active fund type
	const modules = useMemo(
		() => activeFundTypeConfig?.modules || [],
		[activeFundTypeConfig],
	);

	// Update active module when fund type changes (reset to first module)
	const handleFundTypeChange = useCallback(
		(fundType: FundType) => {
			setActiveFundType(fundType);
			const fundTypeConfig = config.fundTypes.find((ft) => ft.id === fundType);
			if (fundTypeConfig && fundTypeConfig.modules.length > 0) {
				const firstModule = fundTypeConfig.modules[0].id;
				setActiveModule(firstModule);
				updateURL({ fundType, module: firstModule, filters }, true);
			}
		},
		[config.fundTypes, updateURL, filters],
	);

	const handleModuleChange = useCallback(
		(module: ModuleId) => {
			setActiveModule(module);
			updateURL({ fundType: activeFundType, module, filters }, true);
		},
		[activeFundType, updateURL, filters],
	);

	// Handle column sorting
	const handleSort = useCallback(
		(property: string, direction: 'asc' | 'desc') => {
			filters.setSort(property, direction);
		},
		[filters],
	);

	// Reset active module if it is not available for the current fund type (e.g. Forms only on Mutual Fund)
	useEffect(() => {
		if (!activeFundTypeConfig?.modules.length) return;
		const hasModule = activeFundTypeConfig.modules.some((m) => m.id === activeModule);
		if (!hasModule) {
			const firstModule = activeFundTypeConfig.modules[0].id;
			setActiveModule(firstModule);
			updateURL({ fundType: activeFundType, module: firstModule, filters }, true);
		}
	}, [activeFundType, activeFundTypeConfig, activeModule, filters, updateURL]);

	// Update URL when filters change
	useEffect(() => {
		updateURL({ fundType: activeFundType, module: activeModule, filters }, true);
	}, [filters, activeFundType, activeModule, updateURL]);

	// Expand key is per row/card (fund + shareclass) so only the clicked item expands
	const handleFundExpand = useCallback((expandKey: string) => {
		setExpandedFundIds((prev) => {
			const next = new Set(prev);
			if (next.has(expandKey)) {
				next.delete(expandKey);
			} else {
				next.add(expandKey);
			}
			return next;
		});
	}, []);

	// Sync URL query parameters (will be implemented with useShareableLink hook)
	// For now, just handle state changes

	if (configLoading) {
		return (
			<div
				id="main-content"
				role="region"
				aria-labelledby="fund-center-page-title"
				className="flex w-full min-h-0 flex-1 flex-col bg-background"
				tabIndex={-1}>
				<a href="#main-content" className="skip-to-main">
					Skip to main content
				</a>
				<h1 id="fund-center-page-title" className="sr-only">
					Fund center
				</h1>
				<div className="w-full min-w-0 flex-1 px-3 sm:px-4 py-8">
					<p className="text-center m-0" role="status" aria-live="polite">
						Loading configuration…
					</p>
				</div>
			</div>
		);
	}

	if (shouldRedirectToSubadvisedLanding) {
		return (
			<div
				id="main-content"
				role="region"
				aria-labelledby="fund-center-page-title"
				className="flex w-full min-h-0 flex-1 flex-col bg-background"
				tabIndex={-1}>
				<a href="#main-content" className="skip-to-main">
					Skip to main content
				</a>
				<h1 id="fund-center-page-title" className="sr-only">
					Fund center
				</h1>
				<div className="w-full min-w-0 flex-1 px-3 sm:px-4 py-8">
					<p className="text-center m-0" role="status" aria-live="polite">
						Redirecting…
					</p>
				</div>
			</div>
		);
	}

	const materialsHero = activeModule === 'materials' && activeFundType === 'mutual-fund';
	const modulePanelClass = materialsHero
		? 'mb-6 flex min-h-0 min-w-0 flex-1 flex-col materials-institutional'
		: 'mb-6 w-full min-w-0 flex-1 bg-white';
	const modulePanelStyle = materialsHero ? { padding: '1rem' } : undefined;

	const moduleBody =
		activeModule === 'forms' ? (
			formsLoading ? (
				<div
					className="py-8 text-center text-[var(--text-body)]"
					style={{ fontFamily: 'var(--font-sans)' }}
					role="status"
					aria-live="polite">
					Loading forms…
				</div>
			) : (
				<FormsDocumentList
					documents={formsDocuments.length > 0 ? formsDocuments : defaultFormsDocuments}
					fundService={fundService}
				/>
			)
		) : activeModule === 'performance' ? (
			<AllFundsPerformanceTable
				funds={displayFunds}
				isLoading={fundsLoading}
				showTicker={activeFundType === 'mutual-fund'}
			/>
		) : (
			<FundList
				funds={displayFunds}
				columns={activeModuleConfig?.columns || []}
				isLoading={fundsLoading}
				onFundExpand={(fund, shareclass) => handleFundExpand(`${fund.id}|${shareclass.id}`)}
				expandedFundIds={expandedFundIds}
				fundGroupProperty=""
				fundService={fundService}
				culture={embedConfig?.culture || 'en-US'}
				moduleId={activeModule}
				onSort={handleSort}
				sortState={filters.sort || null}
				fundType={activeFundType}
			/>
		);

	return (
		<FundCenterLayoutProvider containerElement={modulePanelElement}>
		<div className="flex w-full min-h-0 flex-1 flex-col bg-background">
			<div
				id="main-content"
				role="region"
				aria-labelledby="fund-center-page-title"
				className="flex w-full min-h-0 flex-1 flex-col bg-background px-3 sm:px-4 py-6 sm:py-8"
				tabIndex={-1}>
				<a href={`#${FUND_CENTER_FUND_TYPE_PANEL_ID}`} className="skip-to-main">
					Skip to fund list and filters
				</a>
				<h1 id="fund-center-page-title" className="sr-only">
					Fund center
				</h1>
				<div className="mb-6">
					<FundTypeTabs
						fundTypes={config.fundTypes.map((ft) => ({ id: ft.id, label: ft.label }))}
						activeFundType={activeFundType}
						onFundTypeChange={handleFundTypeChange}
						subadvisedLink={
							resolvedSubadvisedLandingUrl
								? { href: resolvedSubadvisedLandingUrl }
								: undefined
						}
					/>
				</div>

				<div
					id={FUND_CENTER_FUND_TYPE_PANEL_ID}
					role="tabpanel"
					aria-labelledby={`fund-type-tab-${activeFundType}`}
					className="flex min-h-0 min-w-0 flex-1 flex-col bg-background">
					{modules.length > 0 && (
						<div className="mb-6">
							<ModuleTabs
								modules={modules.map((m) => ({ id: m.id, label: m.label }))}
								activeModule={activeModule}
								onModuleChange={handleModuleChange}
							/>
						</div>
					)}

					<div
						ref={handleModulePanelRef}
						id={FUND_CENTER_MODULE_PANEL_ID}
						role={modules.length > 0 ? 'tabpanel' : 'region'}
						aria-labelledby={modules.length > 0 ? `module-tab-${activeModule}` : undefined}
						aria-label={modules.length > 0 ? undefined : 'Fund data'}
						className={modulePanelClass}
						style={modulePanelStyle}>
						{moduleBody}
					</div>
					{tabDisclaimerHtml && <FundCenterTabDisclaimer htmlContent={tabDisclaimerHtml} />}
				</div>
			</div>
		</div>
		</FundCenterLayoutProvider>
	);
}

export default FundCenter;

