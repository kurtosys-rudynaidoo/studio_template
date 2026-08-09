/**
 * Shared fund-center `<th>` styling: padding, vertical alignment, type scale, colors.
 * Use on Fund Table, All Funds Performance, Annualized Performance, etc.
 */
const FUND_THEAD_CORE =
	'align-middle py-3 font-medium [font-size:var(--table-header-font-size)] [line-height:var(--table-header-line-height)] [font-family:var(--font-sans)] [color:var(--text-dark)]';

/** Minimum width for inception date columns (fits MM/DD/YYYY without mid-date wraps). */
export const FUND_TABLE_INCEPTION_COL_MIN_WIDTH = '6rem';

/** Inception date column width as % of table. */
export const FUND_TABLE_INCEPTION_COL_WIDTH = '10%';

/** Standard data column header (horizontal padding 12px). */
export const FUND_THEAD_TH = `${FUND_THEAD_CORE} px-3`;

/**
 * Name column width as % of table (includes inline expand chevron in Overview rows).
 * Keep Mutual Fund Overview, Performance (`showTicker`), and MF Materials aligned; likewise institutional tabs.
 */
export const FUND_TABLE_NAME_COL_WIDTH_INSTITUTIONAL = '15%';
export const FUND_TABLE_NAME_COL_WIDTH_MUTUAL_FUND = '13%';

/** Minimum width for document icon columns (Factsheet, Holdings, Commentary, etc.). */
export const FUND_TABLE_DOCUMENT_COL_MIN_WIDTH = '2.5rem';

/** Narrow document columns on Overview-style tables (fit all columns on laptop viewports). */
export const FUND_TABLE_DOCUMENT_COL_MIN_WIDTH_COMPACT = '2.25rem';

/**
 * Minimum table width before horizontal scroll — Materials grids only; Overview uses width 100%.
 */
export function getFundTableScrollMinWidth(columnCount: number, materialsGrid: boolean): string | undefined {
	if (!materialsGrid) return undefined;
	if (columnCount >= 10) return '76rem';
	if (columnCount >= 8) return '72rem';
	if (columnCount >= 6) return '64rem';
	return undefined;
}

/**
 * Table body `<td>` vertical rhythm and alignment — same whether or not an expand column exists
 * (FundRow, All Funds Performance, Annualized Performance).
 */
export const FUND_TABLE_BODY_TD = 'align-middle py-3';
