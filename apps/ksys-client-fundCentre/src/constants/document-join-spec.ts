import type { SearchCriteria } from '@/types/ksys-api.types';

/**
 * Standard `include.documents.joinSpec` for FundPress searchEntity.
 * Three join legs; `search` is empty on each — API applies matching via joins only.
 */
export type DocumentJoinSpecEntry = {
	joinFrom: string;
	joinTo: string;
	search: SearchCriteria[];
};

export const STANDARD_DOCUMENTS_JOIN_SPEC: DocumentJoinSpecEntry[] = [
	{ joinFrom: 'kurtosys_id', joinTo: 'kurtosys_id', search: [] },
	{ joinFrom: 'type', joinTo: 'type', search: [] },
	{ joinFrom: 'class_name', joinTo: 'fund_name', search: [] },
];
