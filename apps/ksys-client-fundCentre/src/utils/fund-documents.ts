import type { Fund, FundDocument, Shareclass } from '@/types/fund.types';

/**
 * Document types that are typically one file per fund (Prospectus, SAI, etc.). When the API leaves
 * `meta.kurtosys_id` null, we must not pin these to a single share class or sibling rows lose them.
 */
const FUND_LEVEL_SHARED_DOCUMENT_TYPES = new Set([
	'Prospectus',
	'SAI',
	'Statement of Additional Information',
	'Annual Report',
	'Semi Annual Report',
	'Tailored Shareholder Rpt',
	'SAR Tailored Share Rpt',
]);

export function isFundLevelSharedDocumentType(type: string): boolean {
	const t = type?.trim();
	if (!t) return false;
	return FUND_LEVEL_SHARED_DOCUMENT_TYPES.has(t);
}

function normalizeMatchKey(s: string): string {
	return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function metaFundNameMatchesShareclassOrFund(doc: FundDocument, shareclass: Shareclass, fund?: Fund): boolean {
	const fn = doc.metaFundName?.trim();
	if (!fn) return false;
	const nk = normalizeMatchKey(fn);
	if (nk === normalizeMatchKey(shareclass.name || '')) return true;
	if (fund?.name && nk === normalizeMatchKey(fund.name)) return true;
	return false;
}

function typeLabelsForFundGroup(shareclass: Shareclass, fund: Fund): Set<string> {
	const labels = new Set<string>();
	const add = (v: unknown) => {
		if (v == null) return;
		const t = String(v).trim();
		if (t) labels.add(normalizeMatchKey(t));
	};
	add(shareclass.properties?.type);
	add(fund.properties?.type);
	for (const sc of fund.shareclasses) {
		add(sc.properties?.type);
	}
	return labels;
}

/**
 * Prefer kurtosys_id–scoped docs, then `meta.fund_name` vs shareclass name, then `meta.type` vs entity type.
 */
function mergeDocumentsWithJoinFallback(docs: FundDocument[], shareclass: Shareclass, fund: Fund): FundDocument[] {
	const sid = String(shareclass.properties?.kurtosys_id ?? '').trim();
	const typeKeys = typeLabelsForFundGroup(shareclass, fund);

	const tier1 = docs.filter((d) => d.shareclassKurtosysId?.trim() === sid);
	const tier1Ids = new Set(tier1.map((d) => d.id));

	/** Same PDF for the whole fund — show on every share class row. */
	const tierFundWide = docs.filter(
		(d) => !d.shareclassKurtosysId?.trim() && isFundLevelSharedDocumentType(d.type),
	);
	const tierFundWideFiltered = tierFundWide.filter((d) => !tier1Ids.has(d.id));
	const afterFundIds = new Set([...tier1Ids, ...tierFundWideFiltered.map((d) => d.id)]);

	const tier2 = docs.filter((d) => {
		if (afterFundIds.has(d.id)) return false;
		return metaFundNameMatchesShareclassOrFund(d, shareclass, fund);
	});
	const tier2Ids = new Set(tier2.map((d) => d.id));

	const tier3 = docs.filter((d) => {
		if (afterFundIds.has(d.id) || tier2Ids.has(d.id)) return false;
		const mt = d.metaEntityType?.trim();
		if (!mt || typeKeys.size === 0) return false;
		return typeKeys.has(normalizeMatchKey(mt));
	});

	return [...tier1, ...tierFundWideFiltered, ...tier2, ...tier3];
}

/**
 * Scope fund-level document lists to one shareclass row.
 * Uses `shareclassKurtosysId` (from `meta.kurtosys_id` or the entity that owned the doc in the search response).
 *
 * When `fund` is passed and the shareclass has `kurtosys_id`, resolution order matches document joins:
 * kurtosys_id → fund_name (vs class name) → type (vs `properties.type` on shareclass / fund).
 */
export function scopeDocumentsToShareclass(
	documents: FundDocument[] | undefined,
	shareclass: Shareclass,
	fund?: Fund,
): FundDocument[] {
	const docs = documents || [];
	const sid = String(shareclass.properties?.kurtosys_id ?? '').trim();
	if (!sid) return docs;
	if (!fund) {
		return docs.filter(
			(d) =>
				d.shareclassKurtosysId?.trim() === sid ||
				(!d.shareclassKurtosysId?.trim() && isFundLevelSharedDocumentType(d.type)),
		);
	}
	return mergeDocumentsWithJoinFallback(docs, shareclass, fund);
}

/** Overview / shared Materials “Factsheet” column: API uses `Factsheet` (see example.json) and sometimes `Profile`. */
export function isFactsheetDocumentType(type: string): boolean {
	return type === 'Factsheet' || type === 'Profile';
}

export interface DocumentColumnFilterOptions {
	documentMatchScope?: 'all' | 'kurtosys_id_only';
	maxDocuments?: number;
}

/**
 * Filter row-scoped documents for a column: optional kurtosys-only scope and max count.
 * For `kurtosys_id_only`, if nothing matches the row id, falls back to `meta.fund_name` vs share class name or fund name.
 */
export function filterDocumentsForDocumentColumn(
	rowDocuments: FundDocument[],
	docTypes: string[],
	shareclass: Shareclass,
	options?: DocumentColumnFilterOptions,
	fund?: Fund,
): FundDocument[] {
	const pool = rowDocuments.filter((doc) => docTypes.includes(doc.type));
	const sid = String(shareclass.properties?.kurtosys_id ?? '').trim();
	let docs = pool;
	if (options?.documentMatchScope === 'kurtosys_id_only' && sid) {
		const byKurtosys = pool.filter((d) => d.shareclassKurtosysId?.trim() === sid);
		docs = byKurtosys.length > 0 ? byKurtosys : pool.filter((d) => metaFundNameMatchesShareclassOrFund(d, shareclass, fund));
	}
	const max = options?.maxDocuments;
	if (typeof max === 'number' && max >= 1 && docs.length > max) {
		docs = docs.slice(0, max);
	}
	return docs;
}
