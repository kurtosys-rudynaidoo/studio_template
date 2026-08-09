import { describe, it, expect } from 'vitest';
import { formatDate, formatValue, parseCalendarDate, toDisplayString } from './formatters';

describe('toDisplayString', () => {
	it('unwraps nested value and locale keys', () => {
		expect(toDisplayString({ value: { en: 'BPFIX' } })).toBe('BPFIX');
		expect(toDisplayString({ 'en-US': 'ABCDX' })).toBe('ABCDX');
		expect(toDisplayString({ value: 'Z' })).toBe('Z');
	});

	it('returns primitives as text', () => {
		expect(toDisplayString('TICK')).toBe('TICK');
		expect(toDisplayString(42)).toBe('42');
		expect(toDisplayString(null)).toBe('');
	});

	it('does not emit object Object for plain objects', () => {
		expect(toDisplayString({ foo: 'bar' })).toBe('bar');
		expect(toDisplayString({})).toBe('');
	});
});

describe('parseCalendarDate', () => {
	it('parses YYYY-MM-DD as a local calendar date', () => {
		const d = parseCalendarDate('2026-06-30');
		expect(d).not.toBeNull();
		expect(d!.getFullYear()).toBe(2026);
		expect(d!.getMonth()).toBe(5);
		expect(d!.getDate()).toBe(30);
	});

	it('parses ISO datetime prefix as calendar date (avoids UTC midnight shift)', () => {
		const d = parseCalendarDate('2026-06-30T00:00:00.000Z');
		expect(d).not.toBeNull();
		expect(d!.getFullYear()).toBe(2026);
		expect(d!.getMonth()).toBe(5);
		expect(d!.getDate()).toBe(30);
	});
});

describe('formatDate', () => {
	it('formats date-only API values as MM/DD/YYYY without timezone day shift', () => {
		expect(formatDate('2026-06-30')).toBe('06/30/2026');
		expect(formatDate('2026-06-30T00:00:00.000Z')).toBe('06/30/2026');
		expect(formatValue('2026-06-30', 'date')).toBe('06/30/2026');
	});

	it('returns empty string for invalid or empty input', () => {
		expect(formatDate(null)).toBe('');
		expect(formatDate(undefined)).toBe('');
		expect(formatDate('not-a-date')).toBe('');
	});
});
