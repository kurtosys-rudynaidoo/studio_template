import type { FundType } from '@/types/fund-center.types';

/**
 * Optional mutual-fund display prefix to strip (e.g. client legal name).
 * Set via env `VITE_MUTUAL_FUND_NAME_PREFIX` when the client wants shorter list labels.
 * Empty by default — names are shown as returned by FundPress.
 */
function mutualFundNamePrefixPattern(): RegExp | null {
	const prefix = (import.meta.env.VITE_MUTUAL_FUND_NAME_PREFIX || '').trim();
	if (!prefix) return null;
	const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`^${escaped}\\s+`, 'i');
}

export function formatFundDisplayName(
	name: string | undefined | null,
	fundType?: FundType,
): string {
	const raw = (name ?? '').trim();
	if (!raw || fundType !== 'mutual-fund') {
		return raw;
	}
	const pattern = mutualFundNamePrefixPattern();
	if (!pattern) return raw;
	return raw.replace(pattern, '');
}
