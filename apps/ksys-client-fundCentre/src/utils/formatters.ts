/**
 * Formatters
 * Date, currency, number formatting utilities
 * Uses Intl APIs for internationalization
 */

const DISPLAY_STRING_MAX_DEPTH = 10;

/**
 * Turn API / property values into a single line of text (never `[object Object]`).
 * Unwraps Kurtosys-style `{ value }`, locale maps (`en`, `en-US`), and shallow object graphs.
 */
export function toDisplayString(value: unknown, depth = 0): string {
	if (value === null || value === undefined) {
		return '';
	}
	if (typeof value === 'string') {
		return value;
	}
	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}
	if (typeof value !== 'object' || depth > DISPLAY_STRING_MAX_DEPTH) {
		return '';
	}

	if (Array.isArray(value)) {
		for (const item of value) {
			const s = toDisplayString(item, depth + 1);
			if (s) {
				return s;
			}
		}
		return '';
	}

	const o = value as Record<string, unknown>;
	if ('value' in o) {
		return toDisplayString(o.value, depth + 1);
	}
	for (const key of ['en-US', 'en', 'default'] as const) {
		if (typeof o[key] === 'string') {
			return o[key];
		}
	}
	for (const k of Object.keys(o)) {
		const s = toDisplayString(o[k], depth + 1);
		if (s) {
			return s;
		}
	}
	return '';
}

/**
 * Parse API calendar dates without timezone shift.
 * `YYYY-MM-DD` (and ISO strings that start with a date) are treated as local Y/M/D
 * so western timezones (e.g. America/Los_Angeles) do not show the previous day.
 */
export function parseCalendarDate(date: string | Date | number): Date | null {
	if (typeof date === 'string') {
		const trimmed = date.trim();
		const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
		if (match) {
			const year = Number(match[1]);
			const month = Number(match[2]) - 1;
			const day = Number(match[3]);
			const local = new Date(year, month, day);
			if (
				local.getFullYear() === year &&
				local.getMonth() === month &&
				local.getDate() === day
			) {
				return local;
			}
			return null;
		}
		const parsed = new Date(trimmed);
		return Number.isNaN(parsed.getTime()) ? null : parsed;
	}

	if (typeof date === 'number') {
		const parsed = new Date(date);
		return Number.isNaN(parsed.getTime()) ? null : parsed;
	}

	return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Format date using Intl.DateTimeFormat
 */
export function formatDate(
	date: string | Date | number | null | undefined,
	options?: Intl.DateTimeFormatOptions,
	locale: string = 'en-US',
): string {
	if (!date && date !== 0) {
		return '';
	}

	const dateObj = parseCalendarDate(date);
	if (!dateObj) {
		return '';
	}

	/** Default MM/DD/YYYY (en-US). Callers can override, e.g. `month: 'short'`. */
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		...options,
	};

	return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * Format currency using Intl.NumberFormat
 */
export function formatCurrency(
	value: number | string | null | undefined,
	currency: string = 'USD',
	locale: string = 'en-US',
	options?: Intl.NumberFormatOptions,
): string {
	if (value === null || value === undefined || value === '') {
		return '';
	}

	const numValue = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(numValue)) {
		return '';
	}

	// Ensure minimumFractionDigits doesn't exceed maximumFractionDigits
	const minFractionDigits = options?.minimumFractionDigits !== undefined 
		? options.minimumFractionDigits 
		: (options?.maximumFractionDigits !== undefined 
			? Math.min(2, options.maximumFractionDigits) 
			: 2);

	const defaultOptions: Intl.NumberFormatOptions = {
		style: 'currency',
		currency,
		minimumFractionDigits: minFractionDigits,
		maximumFractionDigits: 2,
		...options,
	};

	return new Intl.NumberFormat(locale, defaultOptions).format(numValue);
}

/**
 * Format number using Intl.NumberFormat
 */
export function formatNumber(
	value: number | string | null | undefined,
	locale: string = 'en-US',
	options?: Intl.NumberFormatOptions,
): string {
	if (value === null || value === undefined || value === '') {
		return '';
	}

	const numValue = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(numValue)) {
		return '';
	}

	const defaultOptions: Intl.NumberFormatOptions = {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
		...options,
	};

	return new Intl.NumberFormat(locale, defaultOptions).format(numValue);
}

/**
 * Format percentage
 */
export function formatPercentage(
	value: number | string | null | undefined,
	locale: string = 'en-US',
	options?: Intl.NumberFormatOptions,
	mustDividePercent: boolean = false,
): string {
	if (value === null || value === undefined || value === '') {
		return '';
	}

	let numValue = typeof value === 'string' ? parseFloat(value) : value;

	if (isNaN(numValue)) {
		return '';
	}

	// Divide by 100 if flag is set (e.g., 50 -> 0.5 for 50%)
	if (mustDividePercent) {
		numValue = numValue / 100;
	}

	const defaultOptions: Intl.NumberFormatOptions = {
		style: 'percent',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
		...options,
	};

	return new Intl.NumberFormat(locale, defaultOptions).format(numValue);
}

/**
 * Format based on format type
 */
export function formatValue(
	value: unknown,
	formatType: 'date' | 'currency' | 'number' | 'percentage' | 'text',
	formatOptions?: {
		type?: string;
		options?: Record<string, unknown>;
		currency?: string;
		locale?: string;
		mustDividePercent?: boolean;
	},
): string {
	if (value === null || value === undefined || value === '') {
		return '';
	}

	const locale = formatOptions?.locale || 'en-US';

	switch (formatType) {
		case 'date':
			return formatDate(value as string | Date, formatOptions?.options as Intl.DateTimeFormatOptions, locale);

		case 'currency':
			return formatCurrency(
				value as number,
				formatOptions?.currency || 'USD',
				locale,
				formatOptions?.options as Intl.NumberFormatOptions,
			);

		case 'number':
			return formatNumber(value as number, locale, formatOptions?.options as Intl.NumberFormatOptions);

		case 'percentage':
			return formatPercentage(
				value as number,
				locale,
				formatOptions?.options as Intl.NumberFormatOptions,
				formatOptions?.mustDividePercent,
			);

		case 'text':
		default:
			return toDisplayString(value);
	}
}

