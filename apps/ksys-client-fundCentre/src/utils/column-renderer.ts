/**
 * Column Renderer
 * Handles property lookups and data formatting for table columns
 */

import type { ColumnConfig } from '@/types/fund-center.types';
import type { Fund, Shareclass, FundStatistic } from '@/types/fund.types';
import { resolveAum, resolveStatisticByCodeAndLabel } from './aum-resolver';
import { formatValue, toDisplayString } from './formatters';

/**
 * Get property value from fund/shareclass
 */
function getPropertyValue(
	fund: Fund,
	shareclass: Shareclass,
	property: string,
): unknown {
	// Try shareclass properties first
	if (shareclass.properties && shareclass.properties[property]) {
		return shareclass.properties[property];
	}

	// Try fund properties
	if (fund.properties && fund.properties[property]) {
		return fund.properties[property];
	}

	// Try shareclass direct properties
	if (property === 'name') {
		return shareclass.name;
	}

	if (property === 'ticker') {
		return shareclass.ticker;
	}

	if (property === 'code') {
		return shareclass.code;
	}

	return undefined;
}

/**
 * Find statistic by code or label
 */
function findStatistic(
	statistics: FundStatistic[],
	findConfig: { property: string; value: string },
): FundStatistic | undefined {
	return statistics.find((stat) => {
		if (findConfig.property === 'code') {
			return stat.code === findConfig.value;
		}

		if (findConfig.property === 'label') {
			return stat.label === findConfig.value;
		}

		return false;
	});
}

/**
 * Get value from column data configuration
 */
function getColumnDataValue(
	fund: Fund,
	shareclass: Shareclass,
	columnConfig: ColumnConfig,
): unknown {
	if (!columnConfig.data) {
		return undefined;
	}

	// Direct property lookup
	if (columnConfig.data.property) {
		return getPropertyValue(fund, shareclass, columnConfig.data.property);
	}

	// Code-based lookup (for statistics)
	if (columnConfig.data.code) {
		const statistic = findStatistic(shareclass.statistics, {
			property: 'code',
			value: columnConfig.data.code,
		});

		return statistic?.value;
	}

	// Find-based lookup
	if (columnConfig.data.find) {
		const statistic = findStatistic(shareclass.statistics, columnConfig.data.find);
		return statistic?.value;
	}

	// Index-based lookup (for arrays)
	if (columnConfig.data.index !== undefined) {
		// This would be for array-based properties
		// Implementation depends on data structure
		return undefined;
	}

	return undefined;
}

/**
 * Render column value
 */
export function renderColumnValue(
	fund: Fund,
	shareclass: Shareclass,
	columnConfig: ColumnConfig,
): string {
	// Get the raw value
	let value: unknown;

	if (columnConfig.data) {
		value = getColumnDataValue(fund, shareclass, columnConfig);
	} else {
		// Fallback to property name as key
		value = getPropertyValue(fund, shareclass, columnConfig.code);
	}

	// AUM: institutional uses `resolveAum`. Mutual Fund Overview AUM column uses optional `data.statisticCode` + `statisticLabel` (e.g. daily_prices / net_assets) only — no fallback to `resolveAum`.
	if (columnConfig.code === 'aum') {
		const sc = columnConfig.data?.statisticCode;
		const sl = columnConfig.data?.statisticLabel;
		if (sc != null && sl != null && String(sc) !== '' && String(sl) !== '') {
			const fromStat = resolveStatisticByCodeAndLabel(shareclass, String(sc), String(sl));
			value = fromStat?.value ?? undefined;
		} else {
			const resolved = resolveAum(shareclass, fund);
			value = resolved?.value;
		}
	}

	// Format the value if format config exists
	if (columnConfig.format) {
		return formatValue(value, columnConfig.format.type, {
			...columnConfig.format.options,
			locale: 'en-US', // Could come from config
		});
	}

	// Special formatting for AUM
	if (columnConfig.code === 'aum' && typeof value === 'number') {
		// Format as abbreviated number (e.g., 47.6B, 80.7M)
		if (value >= 1_000_000_000) {
			return `${(value / 1_000_000_000).toFixed(1)}B`;
		}
		if (value >= 1_000_000) {
			return `${(value / 1_000_000).toFixed(1)}M`;
		}
		if (value >= 1_000) {
			return `${(value / 1_000).toFixed(1)}K`;
		}
		return value.toLocaleString('en-US');
	}

	if (value === null || value === undefined) {
		return '';
	}

	const asText = toDisplayString(value);
	if (asText !== '') {
		return asText;
	}
	if (typeof value === 'bigint') {
		return String(value);
	}
	return '';
}

/**
 * Get all column values for a fund/shareclass row
 */
export function getColumnValues(
	fund: Fund,
	shareclass: Shareclass,
	columns: ColumnConfig[],
): Record<string, string> {
	const values: Record<string, string> = {};

	columns.forEach((column) => {
		values[column.code] = renderColumnValue(fund, shareclass, column);
	});

	return values;
}

