import { describe, it, expect } from 'vitest';
import type { Fund, Shareclass } from '@/types/fund.types';
import {
	resolveAum,
	parseStatisticNumber,
	getLatestAumAsAtDateRaw,
	resolveStatisticByCodeAndLabel,
	getLatestStatisticAsAtDateRaw,
	getLatestMonthlyPerformanceAsAtDateRaw,
} from './aum-resolver';

function makeShareclass(overrides: Partial<Shareclass> = {}): Shareclass {
	return {
		id: 'sc1',
		code: 'X',
		name: 'Test',
		properties: {},
		statistics: [],
		...overrides,
	};
}

function makeFund(shareclass: Shareclass): Fund {
	return {
		id: 'f1',
		kurtosysId: 'k1',
		name: 'Fund',
		shareclasses: [shareclass],
		properties: {},
		statistics: [],
	};
}

describe('parseStatisticNumber', () => {
	it('parses formatted strings', () => {
		expect(parseStatisticNumber('1,234,567.5')).toBe(1234567.5);
		expect(parseStatisticNumber('$12.3M')).toBeCloseTo(12.3);
	});
});

describe('resolveAum', () => {
	it('matches Net Assets case-insensitively', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'monthly_prices',
					label: 'net assets',
					value: 5_000_000_000,
				},
			],
		});
		expect(resolveAum(sc, makeFund(sc))?.value).toBe(5_000_000_000);
	});

	it('matches monthly_prices code case-insensitively', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'Monthly_Prices',
					label: 'Total Net Assets',
					value: 100,
				},
			],
		});
		expect(resolveAum(sc, makeFund(sc))?.value).toBe(100);
	});

	it('uses port_chars total_net_assets label', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'port_chars',
					label: 'total_net_assets',
					value: 42_000_000,
				},
			],
		});
		expect(resolveAum(sc, makeFund(sc))?.value).toBe(42_000_000);
	});

	it('falls back to properties_pub-backed total_net_assets', () => {
		const sc = makeShareclass({
			properties: { total_net_assets: 99_000_000 },
			statistics: [],
		});
		expect(resolveAum(sc, makeFund(sc))?.value).toBe(99_000_000);
	});
});

describe('getLatestAumAsAtDateRaw', () => {
	it('returns undefined when no asAtDate on any row', () => {
		const sc = makeShareclass({
			properties: { total_net_assets: 1 },
			statistics: [],
		});
		expect(getLatestAumAsAtDateRaw([makeFund(sc)])).toBeUndefined();
	});

	it('returns the asAtDate from monthly_prices', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'monthly_prices',
					label: 'Total Net Assets',
					value: 100,
					asAtDate: '2024-06-30',
				},
			],
		});
		expect(getLatestAumAsAtDateRaw([makeFund(sc)])).toBe('2024-06-30');
	});

	it('returns the latest date when rows differ', () => {
		const scA = makeShareclass({
			id: 'a',
			statistics: [
				{
					code: 'monthly_prices',
					label: 'Total Net Assets',
					value: 1,
					asAtDate: '2024-01-01',
				},
			],
		});
		const scB = makeShareclass({
			id: 'b',
			statistics: [
				{
					code: 'monthly_prices',
					label: 'Total Net Assets',
					value: 2,
					asAtDate: '2024-12-31',
				},
			],
		});
		const fund = makeFund(scA);
		fund.shareclasses = [scA, scB];
		expect(getLatestAumAsAtDateRaw([fund])).toBe('2024-12-31');
	});
});

describe('resolveStatisticByCodeAndLabel', () => {
	it('returns daily_prices net_assets by label', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'daily_prices',
					label: 'net_assets',
					value: 1_234_567,
					asAtDate: '2025-03-31',
				},
			],
		});
		const r = resolveStatisticByCodeAndLabel(sc, 'daily_prices', 'net_assets');
		expect(r?.value).toBe(1_234_567);
		expect(r?.asAtDate).toBe('2025-03-31');
	});

	it('matches code and label case-insensitively', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'Daily_Prices',
					label: 'Net_Assets',
					value: 99,
				},
			],
		});
		expect(resolveStatisticByCodeAndLabel(sc, 'daily_prices', 'net_assets')?.value).toBe(99);
	});

	it('returns null when label differs', () => {
		const sc = makeShareclass({
			statistics: [{ code: 'daily_prices', label: 'nav', value: 1 }],
		});
		expect(resolveStatisticByCodeAndLabel(sc, 'daily_prices', 'net_assets')).toBeNull();
	});
});

describe('getLatestStatisticAsAtDateRaw', () => {
	it('returns latest asAtDate for configured statistic', () => {
		const scA = makeShareclass({
			id: 'a',
			statistics: [
				{ code: 'daily_prices', label: 'net_assets', value: 1, asAtDate: '2024-01-01' },
			],
		});
		const scB = makeShareclass({
			id: 'b',
			statistics: [
				{ code: 'daily_prices', label: 'net_assets', value: 2, asAtDate: '2024-06-30' },
			],
		});
		const fund = makeFund(scA);
		fund.shareclasses = [scA, scB];
		expect(getLatestStatisticAsAtDateRaw([fund], 'daily_prices', 'net_assets')).toBe('2024-06-30');
	});
});

describe('getLatestMonthlyPerformanceAsAtDateRaw', () => {
	it('returns undefined when no monthly_performance dates', () => {
		const sc = makeShareclass({
			statistics: [{ code: 'monthly_performance', label: '1M', value: 1 }],
		});
		expect(getLatestMonthlyPerformanceAsAtDateRaw([makeFund(sc)])).toBeUndefined();
	});

	it('returns latest date from statistic asAtDate and values as_of_date', () => {
		const sc = makeShareclass({
			statistics: [
				{
					code: 'monthly_performance',
					label: '1M',
					value: 1,
					asAtDate: '2024-01-31',
					values: [
						{ label: '1M', value: 1, as_of_date: '2024-03-31' },
						{ label: '3M', value: 2, as_of_date: '2024-02-29' },
					],
				},
			],
		});
		expect(getLatestMonthlyPerformanceAsAtDateRaw([makeFund(sc)])).toBe('2024-03-31');
	});
});
