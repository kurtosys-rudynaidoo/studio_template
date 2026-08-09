import type { ColumnConfig } from '@/types/fund-center.types';

/** True when the label has no spaces — header can stay on one line in fixed layouts. */
export function isSingleWordLabel(label: string): boolean {
	const t = label.trim();
	return t.length > 0 && !/\s/.test(t);
}

/** Columns that show document icons / PDF cells — center header + cell like Overview. */
export function isDocumentColumn(column: ColumnConfig): boolean {
	if (column.data?.documentType || (column.data?.documentTypes && column.data.documentTypes.length > 0)) {
		return true;
	}
	return (
		column.code === 'quarterly_profile' ||
		column.code === 'holdings' ||
		column.code === 'commentary'
	);
}
