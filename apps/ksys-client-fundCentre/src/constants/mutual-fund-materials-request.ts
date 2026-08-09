import type { SearchCriteria } from '@/types/ksys-api.types';

/** `document_type` values for Mutual Fund → Materials tab document join (FundPress). */
export const MUTUAL_FUND_MATERIALS_DOCUMENT_TYPE_VALUES: string[] = [
	'Factsheet',
	'Commentary',
	'Holdings',
	'Profile',
	'Quarterly Commentary',
	'Prospectus',
	'Statement of Additional Information',
	'Annual Report',
	'Tailored Shareholder Rpt',
	'Semi Annual Report',
	'SAR Tailored Share Rpt',
	'SAI',
	'Fiscal Q1 Holdings',
	'Fiscal Q3 Holdings',
];

function documentTypeSearch(): SearchCriteria[] {
	return [
		{
			matchtype: 'MATCH',
			property: 'document_type',
			values: [...MUTUAL_FUND_MATERIALS_DOCUMENT_TYPE_VALUES],
		},
	];
}

/**
 * Materials module `include.documents.joinSpec` — order: class_name, kurtosys_id, type (per FundPress materials payload).
 */
export function mutualFundMaterialsDocumentsJoinSpec(): Array<{
	joinFrom: string;
	joinTo: string;
	search: SearchCriteria[];
}> {
	return [
		{ joinFrom: 'class_name', joinTo: 'fund_name', search: documentTypeSearch() },
		{ joinFrom: 'kurtosys_id', joinTo: 'kurtosys_id', search: documentTypeSearch() },
		{ joinFrom: 'type', joinTo: 'type', search: documentTypeSearch() },
	];
}
