/**
 * useFormsDocuments Hook
 * Fetches form documents from POST /documents/searchDocuments for the Forms module.
 */

import { useQuery } from '@tanstack/react-query';
import type { KSYSApiService } from '@/services/ksys-api-service';
import type { KSYSDocumentSearchEntry } from '@/types/ksys-api.types';
import type { FormsDocumentItem } from '@/components/fund/FormsDocumentList';
import { documentPathLooksLikeStorageUrl } from '@/utils/document-url';

/** Document types requested for the Forms tab (also used as list labels when API data is shown). */
export const FORMS_DOCUMENT_TYPE_VALUES = [
	'Account Application',
	'Account Options Form',
	'Certificate BenOwners',
	'Combined IRA Kit',
	'Entity Account App',
	'IRA Disclosure Statement',
	'IRA Qualified Plan Form',
	'Required Minimum Dist',
	'Required Minimum Waiver',
] as const;

/** Request body matching the Forms document search (type CLSS, document_type filter) */
const FORMS_SEARCH_REQUEST = {
	type: 'CLSS',
	search: [
		{
			matchtype: 'MATCH' as const,
			property: 'document_type',
			values: [...FORMS_DOCUMENT_TYPE_VALUES],
		},
	],
	sort: { direction: 'ASC' as const, key: 'document_type' },
	start: 0,
};

function getStringValue(v: string | { value?: string } | undefined): string {
	if (v == null) return '';
	if (typeof v === 'string') return v;
	if (typeof v === 'object' && v != null && 'value' in v) return String((v as { value?: string }).value ?? '');
	return '';
}

/** Prefer user-facing labels; snake_case often appears on `document_type` only */
function formsDocumentLabel(entry: KSYSDocumentSearchEntry): string {
	const meta = entry.meta;
	const fromMetaDisplay =
		getStringValue(meta?.display_name as string | { value?: string } | undefined) ||
		getStringValue((meta as Record<string, unknown> | undefined)?.Display_Name as string | { value?: string } | undefined);

	const fromTopLevel =
		getStringValue(entry.display_name) ||
		getStringValue((entry as Record<string, unknown>).Display_Name as string | { value?: string } | undefined) ||
		getStringValue(entry.title) ||
		getStringValue((entry as Record<string, unknown>).Title as string | { value?: string } | undefined);

	const fallback =
		getStringValue(entry.document_type) ||
		getStringValue((entry as Record<string, unknown>).Document_Type as string | { value?: string } | undefined) ||
		(typeof entry.filename === 'string' && entry.filename.replace(/\.[^.]+$/, '').replace(/_/g, ' ').trim()) ||
		'';

	return (fromMetaDisplay || fromTopLevel || fallback || 'Document').trim();
}

function mapEntryToItem(entry: KSYSDocumentSearchEntry, index: number): FormsDocumentItem {
	const id =
		entry.documentId != null
			? String(entry.documentId)
			: entry.kurtosys_id != null
				? String(entry.kurtosys_id)
				: String(index);
	const label = formsDocumentLabel(entry);
	const ext = entry as Record<string, unknown>;

	let clientCode =
		(entry.clientCode && String(entry.clientCode).trim()) ||
		(typeof ext.client_code === 'string' && ext.client_code.trim()) ||
		'';

	const urlField = String(entry.URL ?? entry.url ?? '').trim();
	const storagePath = typeof entry.storagePath === 'string' ? entry.storagePath.trim() : '';

	if (!clientCode && urlField && !documentPathLooksLikeStorageUrl(urlField)) {
		clientCode = urlField;
	}

	let pathSource = '';
	if (urlField && documentPathLooksLikeStorageUrl(urlField)) {
		pathSource = urlField;
	} else if (storagePath) {
		pathSource = storagePath;
	}

	const url = pathSource || '#';
	const filename = typeof entry.filename === 'string' && entry.filename.trim() ? entry.filename.trim() : undefined;

	return {
		id,
		label,
		url,
		...(clientCode ? { clientCode } : {}),
		...(filename ? { filename } : {}),
	};
}

export interface UseFormsDocumentsOptions {
	apiService: KSYSApiService | null;
	enabled?: boolean;
}

export function useFormsDocuments({ apiService, enabled = true }: UseFormsDocumentsOptions) {
	return useQuery({
		queryKey: ['forms-documents'],
		queryFn: async (): Promise<FormsDocumentItem[]> => {
			if (!apiService) return [];
			const response = await apiService.searchDocuments(FORMS_SEARCH_REQUEST);
			const raw = response.values ?? response.data ?? [];
			return raw.map(mapEntryToItem);
		},
		enabled: !!apiService && enabled,
		staleTime: 5 * 60 * 1000,
	});
}
