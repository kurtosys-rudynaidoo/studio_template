import { describe, it, expect } from 'vitest';
import {
	filterDocumentsForDocumentColumn,
	isFactsheetDocumentType,
	scopeDocumentsToShareclass,
} from './fund-documents';
import type { Fund, FundDocument, Shareclass } from '@/types/fund.types';

describe('scopeDocumentsToShareclass', () => {
	const share: Shareclass = {
		id: '2246955',
		code: '2246955',
		name: 'Large Cap Value',
		properties: { kurtosys_id: '2246955' },
		statistics: [],
	};

	it('keeps docs matching meta kurtosys id', () => {
		const docs: FundDocument[] = [
			{ id: '1', type: 'Factsheet', filename: 'a.pdf', url: '/x', shareclassKurtosysId: '2246955' },
			{ id: '2', type: 'Factsheet', filename: 'b.pdf', url: '/y', shareclassKurtosysId: '999' },
		];
		const scoped = scopeDocumentsToShareclass(docs, share);
		expect(scoped).toHaveLength(1);
		expect(scoped[0].id).toBe('1');
	});

	it('passes all docs through when shareclass has no kurtosys_id', () => {
		const bare: Shareclass = {
			id: 'x',
			code: 'x',
			name: 'X',
			properties: {},
			statistics: [],
		};
		const docs: FundDocument[] = [
			{ id: '1', type: 'Commentary', filename: 'a.pdf', url: '/x', shareclassKurtosysId: '2246955' },
		];
		expect(scopeDocumentsToShareclass(docs, bare)).toEqual(docs);
	});

	it('excludes docs with no shareclass tag when the row has kurtosys_id', () => {
		const docs: FundDocument[] = [{ id: '1', type: 'Holdings', filename: 'h.pdf', url: '/z' }];
		expect(scopeDocumentsToShareclass(docs, share)).toEqual([]);
	});

	it('with fund: falls back to meta.fund_name vs class name when kurtosys does not match', () => {
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Grouped',
			shareclasses: [share],
			properties: {},
			statistics: [],
		};
		const docs: FundDocument[] = [
			{
				id: '1',
				type: 'Factsheet',
				filename: 'a.pdf',
				url: '/a',
				shareclassKurtosysId: 'other',
				metaFundName: 'Large Cap Value',
			},
		];
		const scoped = scopeDocumentsToShareclass(docs, share, fund);
		expect(scoped).toHaveLength(1);
		expect(scoped[0].id).toBe('1');
	});

	it('with fund: falls back to meta.type when kurtosys and fund_name do not match', () => {
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Grouped',
			shareclasses: [share],
			properties: { type: 'Mutual Fund' },
			statistics: [],
		};
		const docs: FundDocument[] = [
			{
				id: '1',
				type: 'Prospectus',
				filename: 'p.pdf',
				url: '/p',
				shareclassKurtosysId: 'other',
				metaEntityType: 'Mutual Fund',
			},
		];
		const scoped = scopeDocumentsToShareclass(docs, share, fund);
		expect(scoped).toHaveLength(1);
		expect(scoped[0].id).toBe('1');
	});

	it('includes fund-wide shared types (no kurtosys tag) for every share class row', () => {
		const shareA: Shareclass = {
			id: 'a',
			code: 'a',
			name: 'Fund Institutional',
			properties: { kurtosys_id: '111' },
			statistics: [],
		};
		const shareB: Shareclass = {
			id: 'b',
			code: 'b',
			name: 'Fund Investor',
			properties: { kurtosys_id: '222' },
			statistics: [],
		};
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Grouped',
			shareclasses: [shareA, shareB],
			properties: {},
			statistics: [],
		};
		const docs: FundDocument[] = [
			{
				id: 'pros',
				type: 'Prospectus',
				filename: 'prospectus.pdf',
				url: '/p',
			},
		];
		const forA = scopeDocumentsToShareclass(docs, shareA, fund);
		const forB = scopeDocumentsToShareclass(docs, shareB, fund);
		expect(forA.map((d) => d.id)).toEqual(['pros']);
		expect(forB.map((d) => d.id)).toEqual(['pros']);
	});

	it('with fund: kurtosys matches rank before fund_name fallback', () => {
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Grouped',
			shareclasses: [share],
			properties: {},
			statistics: [],
		};
		const docs: FundDocument[] = [
			{
				id: 'tier2',
				type: 'Factsheet',
				filename: 'b.pdf',
				url: '/b',
				shareclassKurtosysId: 'other',
				metaFundName: 'Large Cap Value',
			},
			{
				id: 'tier1',
				type: 'Factsheet',
				filename: 'a.pdf',
				url: '/a',
				shareclassKurtosysId: '2246955',
			},
		];
		const scoped = scopeDocumentsToShareclass(docs, share, fund);
		expect(scoped.map((d) => d.id)).toEqual(['tier1', 'tier2']);
	});
});

describe('filterDocumentsForDocumentColumn', () => {
	const share: Shareclass = {
		id: '2246955',
		code: '2246955',
		name: 'Large Cap Value',
		properties: { kurtosys_id: '2246955' },
		statistics: [],
	};

	it('kurtosys_id_only drops fund-wide matches and maxDocuments keeps one', () => {
		const rowDocs: FundDocument[] = [
			{ id: 'a', type: 'Tailored Shareholder Rpt', filename: 'a.pdf', url: '/a', shareclassKurtosysId: '2246955' },
			{ id: 'b', type: 'Tailored Shareholder Rpt', filename: 'b.pdf', url: '/b', shareclassKurtosysId: '2246955' },
			{ id: 'fund', type: 'Tailored Shareholder Rpt', filename: 'fund.pdf', url: '/f' },
		];
		const out = filterDocumentsForDocumentColumn(
			rowDocs,
			['Tailored Shareholder Rpt'],
			share,
			{
				documentMatchScope: 'kurtosys_id_only',
				maxDocuments: 1,
			},
			undefined,
		);
		expect(out).toHaveLength(1);
		expect(out[0].id).toBe('a');
	});

	it('kurtosys_id_only excludes docs with no shareclass id and no fund_name match', () => {
		const rowDocs: FundDocument[] = [
			{ id: 'fund', type: 'Tailored Shareholder Rpt', filename: 'fund.pdf', url: '/f' },
		];
		const out = filterDocumentsForDocumentColumn(
			rowDocs,
			['Tailored Shareholder Rpt'],
			share,
			{
				documentMatchScope: 'kurtosys_id_only',
				maxDocuments: 1,
			},
			undefined,
		);
		expect(out).toHaveLength(0);
	});

	it('kurtosys_id_only falls back to meta.fund_name vs class name when no kurtosys match', () => {
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Acme All-Cap Value Fund',
			shareclasses: [share],
			properties: {},
			statistics: [],
		};
		const rowDocs: FundDocument[] = [
			{
				id: 'byName',
				type: 'Tailored Shareholder Rpt',
				filename: 'tsr.pdf',
				url: '/t',
				shareclassKurtosysId: 'other',
				metaFundName: 'Large Cap Value',
			},
		];
		const out = filterDocumentsForDocumentColumn(
			rowDocs,
			['Tailored Shareholder Rpt'],
			share,
			{
				documentMatchScope: 'kurtosys_id_only',
				maxDocuments: 1,
			},
			fund,
		);
		expect(out).toHaveLength(1);
		expect(out[0].id).toBe('byName');
	});

	it('kurtosys_id_only falls back to meta.fund_name vs fund.name when class name differs', () => {
		const fund: Fund = {
			id: 'g',
			kurtosysId: 'g',
			name: 'Acme All-Cap Value Fund',
			shareclasses: [share],
			properties: {},
			statistics: [],
		};
		const rowDocs: FundDocument[] = [
			{
				id: 'byFund',
				type: 'Tailored Shareholder Rpt',
				filename: 'tsr.pdf',
				url: '/t',
				shareclassKurtosysId: 'other',
				metaFundName: 'Acme All-Cap Value Fund',
			},
		];
		const out = filterDocumentsForDocumentColumn(
			rowDocs,
			['Tailored Shareholder Rpt'],
			share,
			{
				documentMatchScope: 'kurtosys_id_only',
				maxDocuments: 1,
			},
			fund,
		);
		expect(out).toHaveLength(1);
		expect(out[0].id).toBe('byFund');
	});
});

describe('isFactsheetDocumentType', () => {
	it('matches Factsheet and Profile', () => {
		expect(isFactsheetDocumentType('Factsheet')).toBe(true);
		expect(isFactsheetDocumentType('Profile')).toBe(true);
		expect(isFactsheetDocumentType('Commentary')).toBe(false);
	});
});
