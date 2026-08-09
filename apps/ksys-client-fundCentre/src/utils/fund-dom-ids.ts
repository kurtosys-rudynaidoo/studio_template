import type { Fund, Shareclass } from '@/types/fund.types';

function segment(v: unknown): string {
	if (v === null || v === undefined) return '';
	if (typeof v === 'string') return v.trim();
	if (typeof v === 'number') return Number.isFinite(v) ? String(v) : '';
	if (typeof v === 'boolean') return v ? 'true' : 'false';
	if (typeof v === 'object' && 'value' in (v as object)) {
		return segment((v as { value: unknown }).value);
	}
	return '';
}

/** Safe fragment for HTML id / aria-controls (no `[object Object]`). */
function slug(s: string, fallback: string): string {
	const raw = (s || fallback).replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/-{2,}/g, '-');
	return raw.replace(/^-+|-+$/g, '') || fallback;
}

/**
 * Stable id for the expanded fund row region (must match button aria-controls).
 */
export function fundExpandedPanelDomId(fund: Fund, shareclass: Shareclass): string {
	const a = segment(fund.id) || segment(fund.kurtosysId) || 'fund';
	const b =
		segment(shareclass.id) || segment(shareclass.code) || segment(shareclass.clientCode) || 'shareclass';
	return `fund-expanded-${slug(a, 'fund')}-${slug(b, 'shareclass')}`;
}
