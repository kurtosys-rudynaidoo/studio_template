import type { FundType } from '@/types/fund-center.types';

/** Plural label for fund-type rows (table caption / counts). */
export function countEntityPlural(fundType: FundType | undefined): string {
	switch (fundType) {
		case 'mutual-fund':
		case 'affiliate':
			return 'Funds';
		default:
			return 'Strategies';
	}
}
