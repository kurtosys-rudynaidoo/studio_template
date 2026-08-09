/**
 * AllFundsPerformanceTable Component
 * Cross-fund performance table: funds as rows, period columns (1M, 3M, YTD, etc.)
 * On mobile shows a card list instead of a table.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useFundCenterCompactLayout } from '@/contexts/FundCenterLayoutContext';
import type { Fund, Shareclass } from '@/types/fund.types';
import { formatNumber, formatValue, toDisplayString } from '@/utils/formatters';
import { formatFundDisplayName } from '@/utils/fund-display-name';
import { getLatestMonthlyPerformanceAsAtDateRaw } from '@/utils/aum-resolver';
import { SortColumnIndicator } from './SortColumnIndicator';
import {
	FUND_THEAD_TH,
	FUND_TABLE_BODY_TD,
	FUND_TABLE_INCEPTION_COL_MIN_WIDTH,
	FUND_TABLE_INCEPTION_COL_WIDTH,
	FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL,
	FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND,
} from '@/utils/fund-table-thead';

export interface AllFundsPerformanceTableProps {
	funds: Fund[];
	isLoading?: boolean;
	/** When true, show a Ticker column (e.g. Mutual Fund; value from shareclass.ticker / properties_pub). */
	showTicker?: boolean;
}

const PERIOD_ORDER = ['1M', '3M', 'YTD', '1YR', '3YR', '5YR', '10YR', 'SI'] as const;

const TICKER_COL_WIDTH = '10%';

function normalizePeriodKey(label: string): string {
	return (label || '').replace(/\*+$/g, '').trim();
}

const LABEL_DISPLAY: Record<string, string> = {
	'1M': '1 M',
	'3M': '3 M',
	YTD: 'YTD',
	'1YR': '1 YR',
	'3YR': '3 YR',
	'5YR': '5 YR',
	'10YR': '10 YR',
	SI: 'SI',
};

function formatPeriodHeader(period: string): string {
	return LABEL_DISPLAY[period] || period.replace(/\*+$/g, '');
}

function getShareclassPerformanceRow(shareclass: Fund['shareclasses'][0]): Record<string, number | null> {
	const monthlyStat = shareclass?.statistics?.find((s) => s.code === 'monthly_performance' && s.values?.length);
	if (!monthlyStat?.values) return {};
	const row: Record<string, number | null> = {};
	monthlyStat.values.forEach((v) => {
		if (v.label) {
			const key = normalizePeriodKey(v.label);
			row[key] = v.value != null ? Number(v.value) : null;
		}
	});
	return row;
}

function formatCell(value: number | null | undefined): string {
	if (value === null || value === undefined) return '—';
	const n = typeof value === 'number' ? value : parseFloat(String(value));
	if (isNaN(n)) return '—';
	return formatNumber(n, 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function inceptionCellText(shareclass: Shareclass, fund: Fund): string {
	const raw =
		shareclass.properties?.since_inception_date ??
		fund.properties?.since_inception_date ??
		shareclass.properties?.inception_date ??
		fund.properties?.inception_date;
	if (raw == null || raw === '') return '—';
	const s = formatValue(raw, 'date', {
		type: 'date',
		options: { month: '2-digit', day: '2-digit', year: 'numeric' },
	});
	return s || '—';
}

type SortKey = { kind: 'name' } | { kind: 'ticker' } | { kind: 'inception' } | { kind: 'period'; period: string };

function compareNumOrNull(
	a: number | null | undefined,
	b: number | null | undefined,
	dir: 'asc' | 'desc',
): number {
	const m = dir === 'asc' ? 1 : -1;
	const an = a == null || isNaN(Number(a)) ? null : Number(a);
	const bn = b == null || isNaN(Number(b)) ? null : Number(b);
	if (an == null && bn == null) return 0;
	if (an == null) return 1;
	if (bn == null) return -1;
	return (an - bn) * m;
}

function sortKeyEquals(a: SortKey, b: SortKey): boolean {
	if (a.kind !== b.kind) return false;
	if (a.kind === 'period' && b.kind === 'period') return a.period === b.period;
	return true;
}

function NameCell({ fund, shareclass, name }: { fund: Fund; shareclass: Shareclass; name: string }) {
	const urlType = (shareclass.properties?.url_type as string) || (fund.properties?.url_type as string);
	const urlSuffix = (shareclass.properties?.url_suffix as string) || (fund.properties?.url_suffix as string);
	const nameStyle: CSSProperties = {
		color: 'var(--text-dark)',
		fontFamily: 'var(--font-sans)',
		fontWeight: 'var(--table-name-font-weight)',
		fontSize: '14px',
		lineHeight: '1.4',
	};
	if (urlType && urlSuffix) {
		const href = `/${urlType}/${urlSuffix}/`;
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${name} (opens in new tab)`}
				className="hover:underline"
				style={nameStyle}>
				{name}
			</a>
		);
	}
	return <span style={nameStyle}>{name}</span>;
}

interface PerfRow {
	fund: Fund;
	shareclass: Shareclass;
	name: string;
	ticker: string;
	values: Record<string, number | null>;
	inception: string;
}

const compactFieldLabelClass = 'text-xs font-medium uppercase tracking-wide';
const compactFieldValueClass = 'text-sm text-[var(--text-dark)] break-words';

function PerformanceCompactCard({
	row,
	showTicker,
	periods,
	performanceAsAtDisplay,
}: {
	row: PerfRow;
	showTicker: boolean;
	periods: string[];
	performanceAsAtDisplay: string | null;
}) {
	const urlType =
		(row.shareclass.properties?.url_type as string) || (row.fund.properties?.url_type as string);
	const urlSuffix =
		(row.shareclass.properties?.url_suffix as string) || (row.fund.properties?.url_suffix as string);
	const nameLinkStyle: CSSProperties = {
		color: 'var(--text-dark)',
		fontFamily: 'var(--font-sans)',
		fontSize: '16px',
		fontWeight: 'var(--table-name-font-weight)',
	};
	const nameTextStyle: CSSProperties = {
		fontFamily: 'var(--font-sans)',
		fontSize: '16px',
		fontWeight: 'var(--table-name-font-weight)',
	};
	const nameContent =
		urlType && urlSuffix ? (
			<a
				href={`/${urlType}/${urlSuffix}/`}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={`${row.name} (opens in new tab)`}
				className="hover:underline"
				style={nameLinkStyle}>
				{row.name}
			</a>
		) : (
			<span style={nameTextStyle}>{row.name}</span>
		);

	return (
		<div
			className="rounded-lg border border-[var(--border-row)] bg-white p-4 shadow-sm"
			style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-dark)' }}>
			<div className="space-y-3">
				<div className="flex flex-col gap-1">
					<div className={compactFieldLabelClass} style={{ color: 'var(--section-header)' }}>
						Name
					</div>
					<div className={compactFieldValueClass} style={{ lineHeight: '1.4' }}>
						{nameContent}
					</div>
				</div>

				{showTicker && (
					<div className="flex flex-col gap-1">
						<div className={compactFieldLabelClass} style={{ color: 'var(--section-header)' }}>
							Ticker
						</div>
						<div className={compactFieldValueClass} style={{ lineHeight: '1.4' }}>
							{row.ticker}
						</div>
					</div>
				)}

				<div className="flex flex-col gap-1">
					<div className={compactFieldLabelClass} style={{ color: 'var(--section-header)' }}>
						Inception Date
					</div>
					<div className={compactFieldValueClass} style={{ lineHeight: '1.4' }}>
						{row.inception}
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<div className={compactFieldLabelClass} style={{ color: 'var(--section-header)' }}>
						Performance (%)
					</div>
					{performanceAsAtDisplay != null && (
						<div className="text-sm text-[var(--text-body)]" style={{ lineHeight: '1.4' }}>
							As of {performanceAsAtDisplay}
						</div>
					)}
				</div>

				{periods.map((period) => (
					<div key={period} className="flex flex-col gap-1">
						<div className={compactFieldLabelClass} style={{ color: 'var(--section-header)' }}>
							{formatPeriodHeader(period)}
						</div>
						<div className={`${compactFieldValueClass} font-medium tabular-nums`} style={{ lineHeight: '1.4' }}>
							{formatCell(row.values[period])}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function AllFundsPerformanceTable({ funds, isLoading, showTicker = false }: AllFundsPerformanceTableProps) {
	const useCompactLayout = useFundCenterCompactLayout();

	const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({
		key: { kind: 'name' },
		dir: 'asc',
	});

	const { periods, rawRows } = useMemo(() => {
		const periodSet = new Set<string>();
		const rowsList: PerfRow[] = [];
		funds.forEach((fund) => {
			fund.shareclasses?.forEach((shareclass) => {
				const values = getShareclassPerformanceRow(shareclass);
				Object.keys(values).forEach((p) => periodSet.add(normalizePeriodKey(p)));
				const tickerRaw = shareclass.ticker ?? shareclass.properties?.ticker;
				const tickerText = toDisplayString(tickerRaw);
				const ticker = tickerText.trim() !== '' ? tickerText : '—';
				rowsList.push({
					fund,
					shareclass,
					name: formatFundDisplayName(shareclass.name || fund.name || '—', showTicker ? 'mutual-fund' : undefined),
					ticker,
					values,
					inception: inceptionCellText(shareclass, fund),
				});
			});
		});
		const ordered: string[] = [...PERIOD_ORDER.filter((p) => periodSet.has(p))];
		const knownPeriodSet = new Set<string>(PERIOD_ORDER);
		periodSet.forEach((p) => {
			if (!knownPeriodSet.has(p)) ordered.push(p);
		});
		return { periods: ordered, rawRows: rowsList };
	}, [funds, showTicker]);

	const performanceAsAtRaw = useMemo(() => getLatestMonthlyPerformanceAsAtDateRaw(funds), [funds]);
	const performanceAsAtDisplay = useMemo(() => {
		if (!performanceAsAtRaw) return null;
		const s = formatValue(performanceAsAtRaw, 'date', {
			type: 'date',
			options: { month: '2-digit', day: '2-digit', year: 'numeric' },
		});
		return s || null;
	}, [performanceAsAtRaw]);

	const rows = useMemo(() => {
		const dir = sort.dir;
		const copy = [...rawRows];
		copy.sort((a, b) => {
			const k = sort.key;
			if (k.kind === 'name') {
				return a.name.localeCompare(b.name, 'en') * (dir === 'asc' ? 1 : -1);
			}
			if (k.kind === 'ticker') {
				return a.ticker.localeCompare(b.ticker, 'en') * (dir === 'asc' ? 1 : -1);
			}
			if (k.kind === 'inception') {
				return a.inception.localeCompare(b.inception, 'en') * (dir === 'asc' ? 1 : -1);
			}
			if (k.kind === 'period') {
				return compareNumOrNull(a.values[k.period], b.values[k.period], dir);
			}
			return 0;
		});
		return copy;
	}, [rawRows, sort]);

	const handleHeaderClick = useCallback((key: SortKey) => {
		setSort((prev) => {
			if (sortKeyEquals(prev.key, key)) {
				return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
			}
			return { key, dir: 'asc' };
		});
	}, []);

	const headerKeyHandler = useCallback(
		(e: KeyboardEvent<HTMLTableCellElement>, key: SortKey) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handleHeaderClick(key);
			}
		},
		[handleHeaderClick],
	);

	const ariaSortFor = useCallback(
		(key: SortKey): 'ascending' | 'descending' | 'none' => {
			if (!sortKeyEquals(sort.key, key)) return 'none';
			return sort.dir === 'asc' ? 'ascending' : 'descending';
		},
		[sort],
	);

	const periodColStart = showTicker ? 3 : 2;
	const colCount = periodColStart + periods.length;

	/** HTML id must be valid for `getElementById` (roving focus); strip React useId punctuation. */
	const gridId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
	const [focusCell, setFocusCell] = useState({ row: 0, col: 0 });

	useEffect(() => {
		setFocusCell((prev) => ({
			row: Math.min(prev.row, Math.max(0, rows.length - 1)),
			col: Math.min(prev.col, Math.max(0, colCount - 1)),
		}));
	}, [rows.length, colCount]);

	const cellDomId = useCallback((row: number, col: number) => `perf-grid-${gridId}-${row}-${col}`, [gridId]);

	const moveFocusToCell = useCallback(
		(row: number, col: number) => {
			if (row < 0 || row >= rows.length || col < 0 || col >= colCount) return;
			setFocusCell({ row, col });
		},
		[rows.length, colCount],
	);

	useLayoutEffect(() => {
		if (isLoading || !periods.length || !rows.length || useCompactLayout) return;
		document.getElementById(cellDomId(focusCell.row, focusCell.col))?.focus();
	}, [focusCell, cellDomId, isLoading, periods.length, rows.length, useCompactLayout]);

	const handleCellKeyDown = useCallback(
		(e: KeyboardEvent<HTMLTableCellElement>, row: number, col: number) => {
			if (e.key === 'ArrowRight') {
				e.preventDefault();
				if (col < colCount - 1) moveFocusToCell(row, col + 1);
				else if (row < rows.length - 1) moveFocusToCell(row + 1, 0);
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault();
				if (col > 0) moveFocusToCell(row, col - 1);
				else if (row > 0) moveFocusToCell(row - 1, colCount - 1);
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				if (row < rows.length - 1) moveFocusToCell(row + 1, col);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				if (row > 0) moveFocusToCell(row - 1, col);
			} else if (e.key === 'Home') {
				e.preventDefault();
				if (e.ctrlKey) moveFocusToCell(0, 0);
				else moveFocusToCell(row, 0);
			} else if (e.key === 'End') {
				e.preventDefault();
				if (e.ctrlKey) moveFocusToCell(rows.length - 1, colCount - 1);
				else moveFocusToCell(row, colCount - 1);
			}
		},
		[colCount, rows.length, moveFocusToCell],
	);

	/** Equal share of width left after name / inception / ticker — locks layout so nowrap period headers cannot shrink Name. */
	const periodColSharePercent = useMemo(() => {
		if (!periods.length) return '0%';
		const nameNum = Number.parseFloat(showTicker ? FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND : FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL);
		const tickerNum = showTicker ? Number.parseFloat(TICKER_COL_WIDTH) : 0;
		const inceptionNum = Number.parseFloat(FUND_TABLE_INCEPTION_COL_WIDTH);
		const rest = Math.max(0, 100 - nameNum - inceptionNum - tickerNum);
		return `${rest / periods.length}%`;
	}, [periods.length, showTicker]);

	if (isLoading) {
		return (
			<div className="py-8 text-center text-muted-foreground" role="status" aria-live="polite">
				Loading performance data…
			</div>
		);
	}

	if (!periods.length || !rows.length) {
		return (
			<div className="py-8 text-center text-muted-foreground">
				No performance data available. Select Overview to see fund list with details.
			</div>
		);
	}

	if (useCompactLayout) {
		return (
			<div className="flex flex-col gap-4 bg-background" style={{ fontFamily: 'var(--font-sans)' }}>
				{rows.map((row) => (
					<PerformanceCompactCard
						key={`${row.fund.id}|${row.shareclass.id}`}
						row={row}
						showTicker={showTicker}
						periods={periods}
						performanceAsAtDisplay={performanceAsAtDisplay}
					/>
				))}
			</div>
		);
	}

	const cellBorder = { borderBottom: '1px solid var(--border-row)' } as const;

	const nameColWidth = showTicker ? FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND : FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL;

	const inceptionColWidth = FUND_TABLE_INCEPTION_COL_WIDTH;
	const tickerColWidth = TICKER_COL_WIDTH;

	const sortableThBase = {
		...cellBorder,
		cursor: 'pointer' as const,
		userSelect: 'none' as const,
	};

	/* FundTable omits minWidth:0 on the name header; minWidth:0 here let nowrap period labels steal width from Name. */
	const sortablePeriodThStyle = { ...sortableThBase, minWidth: 0 as const };

	const nameSortActive = sort.key.kind === 'name';
	const inceptionSortActive = sort.key.kind === 'inception';
	const tickerSortActive = sort.key.kind === 'ticker';
	const periodSortActive = (p: string) => sort.key.kind === 'period' && sort.key.period === p;

	return (
		<div className="w-full min-w-0 overflow-x-hidden">
			<table
				role="grid"
				aria-readonly="true"
				className="w-full border-collapse"
				style={{
					fontFamily: 'var(--font-sans)',
					fontSize: '14px',
					tableLayout: 'fixed',
					width: '100%',
				}}>
				<caption className="sr-only">
					Cross-fund performance by period. Performance period columns are grouped under a Performance heading.
					{performanceAsAtDisplay != null ? ` As of date ${performanceAsAtDisplay}.` : ''} Column headers are sortable
					with Enter or Space. Inception date is shown per row.
					{showTicker ? ' Includes ticker symbol per row.' : ''} Percentage returns by period column. Use arrow keys
					to move between cells; use Tab to leave the grid.
				</caption>
				<colgroup>
					<col style={{ width: nameColWidth }} />
					<col style={{ width: inceptionColWidth }} />
					{showTicker && <col style={{ width: tickerColWidth }} />}
					{periods.map((period) => (
						<col key={period} style={{ width: periodColSharePercent }} />
					))}
				</colgroup>
				<thead>
					<tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
						<td
							colSpan={periodColStart}
							aria-hidden="true"
							className="border-b border-border bg-[var(--table-header-bg)] p-0"
							style={{ ...cellBorder, minWidth: 0 }}
						/>
						<th
							colSpan={periods.length}
							scope="colgroup"
							id={`${gridId}-perf-group`}
							className={`fund-center-performance-group-header ${FUND_THEAD_TH} border-b border-border text-center font-medium outline-offset-2`}
							style={{ ...cellBorder, minWidth: 0 }}
						>
							<div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-1 gap-y-0 text-center leading-snug">
								<span>
									Performance (%)
									{performanceAsAtDisplay != null && (
										<span className="font-normal text-muted-foreground"> as of {performanceAsAtDisplay}</span>
									)}
								</span>
							</div>
						</th>
					</tr>
					<tr style={{ backgroundColor: 'var(--table-header-bg)' }}>
						<th
							scope="col"
							aria-sort={ariaSortFor({ kind: 'name' })}
							tabIndex={0}
							title="Sort by name — click or press Enter / Space"
							className={`${FUND_THEAD_TH} text-left outline-offset-2 transition-colors`}
							style={{
								...sortableThBase,
								fontWeight: 'var(--table-name-font-weight)',
								width: nameColWidth,
								wordWrap: 'break-word',
								overflowWrap: 'break-word',
							}}
							onClick={() => handleHeaderClick({ kind: 'name' })}
							onKeyDown={(e) => headerKeyHandler(e, { kind: 'name' })}
						>
							<div className="flex w-full min-w-0 items-center justify-between gap-2">
								<span className="min-w-0">Name</span>
								<SortColumnIndicator active={nameSortActive} direction={nameSortActive ? sort.dir : null} />
							</div>
						</th>
						<th
							scope="col"
							aria-sort={ariaSortFor({ kind: 'inception' })}
							tabIndex={0}
							title="Sort by inception date — click or press Enter / Space"
							className={`${FUND_THEAD_TH} text-left outline-offset-2 transition-colors`}
							style={{
								...sortableThBase,
								width: inceptionColWidth,
								minWidth: FUND_TABLE_INCEPTION_COL_MIN_WIDTH,
							}}
							onClick={() => handleHeaderClick({ kind: 'inception' })}
							onKeyDown={(e) => headerKeyHandler(e, { kind: 'inception' })}
						>
							<div className="flex w-full min-w-0 items-center justify-between gap-2">
								<span className="min-w-0">Inception Date</span>
								<SortColumnIndicator
									active={inceptionSortActive}
									direction={inceptionSortActive ? sort.dir : null}
								/>
							</div>
						</th>
						{showTicker && (
							<th
								scope="col"
								aria-sort={ariaSortFor({ kind: 'ticker' })}
								tabIndex={0}
								title="Sort by ticker — click or press Enter / Space"
								className={`${FUND_THEAD_TH} text-left outline-offset-2 transition-colors`}
								style={{
									...sortableThBase,
									width: tickerColWidth,
								}}
								onClick={() => handleHeaderClick({ kind: 'ticker' })}
								onKeyDown={(e) => headerKeyHandler(e, { kind: 'ticker' })}
							>
								<div className="flex w-full min-w-0 items-center justify-between gap-2">
									<span className="min-w-0">Ticker</span>
									<SortColumnIndicator
										active={tickerSortActive}
										direction={tickerSortActive ? sort.dir : null}
									/>
								</div>
							</th>
						)}
						{periods.map((period) => {
							const pActive = periodSortActive(period);
							return (
								<th
									key={period}
									scope="col"
									id={`${gridId}-col-${period}`}
									aria-sort={ariaSortFor({ kind: 'period', period })}
									tabIndex={0}
									title="Sort by this period — click or press Enter / Space"
									className={`${FUND_THEAD_TH} text-left outline-offset-2 transition-colors`}
									style={{
										...sortablePeriodThStyle,
									}}
									onClick={() => handleHeaderClick({ kind: 'period', period })}
									onKeyDown={(e) => headerKeyHandler(e, { kind: 'period', period })}
								>
									<div className="flex w-full min-w-0 items-center justify-between gap-2">
										<span className="min-w-0 whitespace-nowrap text-left">{formatPeriodHeader(period)}</span>
										<SortColumnIndicator active={pActive} direction={pActive ? sort.dir : null} />
									</div>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<td
								role="gridcell"
								id={cellDomId(rowIndex, 0)}
								tabIndex={focusCell.row === rowIndex && focusCell.col === 0 ? 0 : -1}
								className={`${FUND_TABLE_BODY_TD} fund-center-name-cell px-3 text-left outline-offset-2`}
								style={{
									color: 'var(--text-dark)',
									width: nameColWidth,
									fontFamily: 'var(--font-sans)',
									fontSize: '14px',
									lineHeight: '1.4',
									textAlign: 'left',
									...cellBorder,
								}}
								onFocus={() => setFocusCell({ row: rowIndex, col: 0 })}
								onKeyDown={(e) => handleCellKeyDown(e, rowIndex, 0)}
							>
								<NameCell fund={row.fund} shareclass={row.shareclass} name={row.name} />
							</td>
							<td
								role="gridcell"
								id={cellDomId(rowIndex, 1)}
								tabIndex={focusCell.row === rowIndex && focusCell.col === 1 ? 0 : -1}
								className={`${FUND_TABLE_BODY_TD} px-3 text-left outline-offset-2`}
								style={{ color: 'var(--text-dark)', textAlign: 'left', ...cellBorder }}
								onFocus={() => setFocusCell({ row: rowIndex, col: 1 })}
								onKeyDown={(e) => handleCellKeyDown(e, rowIndex, 1)}
							>
								{row.inception}
							</td>
							{showTicker && (
								<td
									role="gridcell"
									id={cellDomId(rowIndex, 2)}
									tabIndex={focusCell.row === rowIndex && focusCell.col === 2 ? 0 : -1}
									className={`${FUND_TABLE_BODY_TD} px-3 text-left tabular-nums outline-offset-2`}
									style={{ color: 'var(--text-dark)', textAlign: 'left', ...cellBorder }}
									onFocus={() => setFocusCell({ row: rowIndex, col: 2 })}
									onKeyDown={(e) => handleCellKeyDown(e, rowIndex, 2)}
								>
									{row.ticker}
								</td>
							)}
							{periods.map((period, pi) => {
								const c = periodColStart + pi;
								return (
									<td
										role="gridcell"
										key={period}
										id={cellDomId(rowIndex, c)}
										headers={`${gridId}-perf-group ${gridId}-col-${period}`}
										tabIndex={focusCell.row === rowIndex && focusCell.col === c ? 0 : -1}
										className={`${FUND_TABLE_BODY_TD} px-3 text-left tabular-nums outline-offset-2`}
										style={{ color: 'var(--text-dark)', textAlign: 'left', ...cellBorder }}
										onFocus={() => setFocusCell({ row: rowIndex, col: c })}
										onKeyDown={(e) => handleCellKeyDown(e, rowIndex, c)}
									>
										{formatCell(row.values[period])}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default AllFundsPerformanceTable;
