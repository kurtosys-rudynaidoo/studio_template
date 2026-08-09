/**
 * Number Utilities
 * Abbreviated numbers (M/B) and number formatting helpers
 */

/**
 * Number thresholds for abbreviation
 */
export interface NumberThresholds {
	million?: number; // Default: 1000000
	billion?: number; // Default: 1000000000
	trillion?: number; // Default: 1000000000000
}

const defaultThresholds: Required<NumberThresholds> = {
	million: 1000000,
	billion: 1000000000,
	trillion: 1000000000000,
};

/**
 * Format abbreviated number (e.g., 1,234,567 -> 1.2M)
 */
export function formatAbbreviatedNumber(
	value: number | string | null | undefined,
	thresholds: NumberThresholds = {},
	locale: string = 'en-US',
): string {
	if (value === null || value === undefined || value === '') {
		return '';
	}

	const numValue = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(numValue)) {
		return '';
	}

	const finalThresholds = { ...defaultThresholds, ...thresholds };
	const absValue = Math.abs(numValue);
	const sign = numValue < 0 ? '-' : '';

	if (absValue >= finalThresholds.trillion) {
		return `${sign}${(absValue / finalThresholds.trillion).toFixed(1)}T`;
	}

	if (absValue >= finalThresholds.billion) {
		return `${sign}${(absValue / finalThresholds.billion).toFixed(1)}B`;
	}

	if (absValue >= finalThresholds.million) {
		return `${sign}${(absValue / finalThresholds.million).toFixed(1)}M`;
	}

	// Format regular number with thousand separators
	return new Intl.NumberFormat(locale, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(numValue);
}

/**
 * Parse number from string, handling various formats
 */
export function parseNumber(value: string | number | null | undefined): number | null {
	if (value === null || value === undefined || value === '') {
		return null;
	}

	if (typeof value === 'number') {
		return isNaN(value) ? null : value;
	}

	// Remove common formatting characters
	const cleaned = String(value).replace(/[,$%]/g, '');

	const parsed = parseFloat(cleaned);
	return isNaN(parsed) ? null : parsed;
}

