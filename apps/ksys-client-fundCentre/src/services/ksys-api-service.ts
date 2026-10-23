/**
 * KSYS API Service
 * See docs/DATA-RETRIEVAL.md — POST /fund/searchEntity with x-ksys-token
 */

import { kurtosysRequest } from '@/lib/kurtosys-request';
import { KSYSApiError } from '@/lib/api-client';
import type {
	KSYSSearchEntityRequest,
	KSYSSearchEntityResponse,
	KSYSRetrieveDocumentRequest,
	KSYSSearchDocumentsRequest,
	KSYSSearchDocumentsResponse,
	SearchCriteria,
} from '@/types/ksys-api.types';
import { absolutizeKurtosysDocumentUrl } from '@/utils/document-url';

/** Parse JSON body from POST /documents/retrieveDocument (shape varies by environment). */
function extractRetrieveDocumentUrl(payload: unknown): string {
	if (payload == null) return '';
	if (typeof payload === 'string') return payload.trim();
	if (typeof payload !== 'object') return '';
	const o = payload as Record<string, unknown>;
	const pick = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : '');
	let u =
		pick(o.URL) ||
		pick(o.url) ||
		pick(o.documentUrl) ||
		pick(o.href) ||
		pick(o.storagePath) ||
		pick(o.downloadUrl) ||
		pick(o.downloadURL) ||
		pick(o.fileUrl) ||
		pick(o.link);
	if (u) return u;
	for (const key of ['values', 'data', 'documents'] as const) {
		const arr = o[key];
		if (!Array.isArray(arr) || !arr[0] || typeof arr[0] !== 'object') continue;
		const row = arr[0] as Record<string, unknown>;
		u =
			pick(row.URL) ||
			pick(row.url) ||
			pick(row.storagePath) ||
			pick(row.href) ||
			pick(row.documentUrl) ||
			pick(row.downloadUrl);
		if (u) return u;
	}
	return '';
}

const BLOB_URL_REVOKE_MS = 120_000;

function scheduleRevokeObjectURL(url: string): void {
	setTimeout(() => {
		try {
			URL.revokeObjectURL(url);
		} catch {
			/* ignore */
		}
	}, BLOB_URL_REVOKE_MS);
}

/**
 * KSYS API Service configuration
 */
export interface KSYSApiServiceConfig {
	baseUrl: string;
	token?: string;
}

/**
 * KSYS API Service
 * Handles all KSYS API interactions following documentation patterns
 * Uses kurtosysRequest utility for caching and deduplication
 */
export class KSYSApiService {
	private baseUrl: string;
	private token: string | null = null;

	constructor(config: KSYSApiServiceConfig) {
		this.baseUrl = config.baseUrl;
		this.token = config.token || null;
	}

	/**
	 * Set authentication token
	 */
	setToken(token: string): void {
		this.token = token;
	}

	/** API origin without trailing slash (for resolving relative document URLs). */
	getBaseUrl(): string {
		return this.baseUrl.replace(/\/$/, '');
	}

	/**
	 * Search entities (funds/shareclasses)
	 * POST /fund/searchEntity — docs/DATA-RETRIEVAL.md
	 */
	async searchEntity(request: KSYSSearchEntityRequest): Promise<KSYSSearchEntityResponse> {
		try {
			const response = await kurtosysRequest<KSYSSearchEntityResponse>({
				endpoint: '/fund/searchEntity',
				body: request as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});

			return response;
		} catch (error) {
			if (error instanceof Error && 'status' in error) {
				throw new KSYSApiError(
					error.message,
					(error as Error & { status: number }).status,
					'SEARCH_ERROR',
				);
			}

			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Failed to search entities',
				0,
				'SEARCH_ERROR',
			);
		}
	}

	/**
	 * Get filters for a given entity type
	 * Based on actual FundPress API: POST /fund/getfilters
	 */
	async getFilters(params: {
		type: string;
		filterProperties: string[];
		search?: SearchCriteria[];
		fundList?: string[];
		fundListExclusion?: string[];
	}): Promise<unknown> {
		try {
			console.log('KSYSApiService.getFilters: Request params:', params);
			
			const response = await kurtosysRequest<unknown>({
				endpoint: '/fund/getfilters',
				body: params as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});

			console.log('KSYSApiService.getFilters: Response received:', response);
			console.log('KSYSApiService.getFilters: Response type:', typeof response);
			
			return response;
		} catch (error) {
			console.error('KSYSApiService.getFilters: Error:', error);
			if (error instanceof Error && 'status' in error) {
				throw new KSYSApiError(
					error.message,
					(error as Error & { status: number }).status,
					'FILTERS_ERROR',
				);
			}

			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Failed to get filters',
				0,
				'FILTERS_ERROR',
			);
		}
	}

	/**
	 * List disclaimers
	 * POST /config/listdisclaimers
	 */
	async listDisclaimers(params: { global?: boolean }): Promise<unknown> {
		try {
			const response = await kurtosysRequest<unknown>({
				endpoint: '/config/listdisclaimers',
				body: params as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});

			return response;
		} catch (error) {
			if (error instanceof Error && 'status' in error) {
				throw new KSYSApiError(
					error.message,
					(error as Error & { status: number }).status,
					'DISCLAIMERS_ERROR',
				);
			}

			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Failed to list disclaimers',
				0,
				'DISCLAIMERS_ERROR',
			);
		}
	}

	/**
	 * Search documents (forms, applications, etc.)
	 * POST /documents/searchDocuments
	 */
	async searchDocuments(request: KSYSSearchDocumentsRequest): Promise<KSYSSearchDocumentsResponse> {
		try {
			const response = await kurtosysRequest<KSYSSearchDocumentsResponse>({
				endpoint: '/documents/searchDocuments',
				body: request as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});
			return response;
		} catch (error) {
			if (error instanceof Error && 'status' in error) {
				throw new KSYSApiError(
					error.message,
					(error as Error & { status: number }).status,
					'SEARCH_DOCUMENTS_ERROR',
				);
			}
			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Failed to search documents',
				0,
				'SEARCH_DOCUMENTS_ERROR',
			);
		}
	}

	/**
	 * GET file bytes with the same auth as API calls. New-tab navigation to storage URLs does not send `x-ksys-token`.
	 */
	async fetchAuthenticatedDocumentBlobUrl(absoluteUrl: string): Promise<string> {
		const token = this.token?.trim();
		const abs = absolutizeKurtosysDocumentUrl(absoluteUrl, this.getBaseUrl());
		if (!token) {
			return abs;
		}
		// Only send the token over https to the API's own origin, never to a host named in API data (3.1 / 3.6).
		let target: URL;
		try {
			target = new URL(abs);
		} catch {
			return abs;
		}
		if (target.protocol !== 'https:' || target.origin !== new URL(this.getBaseUrl()).origin) {
			return abs;
		}

		try {
			const res = await fetch(abs, {
				method: 'GET',
				headers: {
					'x-ksys-token': token,
					Accept: '*/*',
				},
			});
			if (!res.ok) {
				console.warn('Authenticated document GET failed', res.status, abs);
				return abs;
			}
			const blob = await res.blob();
			if (blob.size === 0) {
				console.warn('Authenticated document GET returned empty body', abs);
				return abs;
			}
			const objectUrl = URL.createObjectURL(blob);
			scheduleRevokeObjectURL(objectUrl);
			return objectUrl;
		} catch (e) {
			console.warn('Authenticated document GET error', e);
			return abs;
		}
	}

	/**
	 * POST /documents/retrieveDocument — not sent through the shared request cache (response URLs are often short-lived).
	 * Returns a `blob:` object URL when the file is fetched with `x-ksys-token` so the browser can save or open it.
	 */
	async retrieveDocument(clientCode: string): Promise<string> {
		const trimmed = clientCode.trim();
		if (!trimmed) {
			throw new KSYSApiError('Missing document clientCode', 400, 'RETRIEVE_DOCUMENT_ERROR');
		}
		if (!this.token?.trim()) {
			throw new KSYSApiError(
				'x-ksys-token is required for POST /documents/retrieveDocument',
				401,
				'RETRIEVE_DOCUMENT_ERROR',
			);
		}

		const body: KSYSRetrieveDocumentRequest = { clientCode: [trimmed] };
		const requestUrl = new URL('/documents/retrieveDocument', `${this.getBaseUrl()}/`).href;

		let response: Response;
		try {
			const headers: Record<string, string> = {
				Accept: 'application/json, application/pdf, */*',
				'Content-Type': 'application/json',
				'x-ksys-token': this.token!,
			};

			response = await fetch(requestUrl, {
				method: 'POST',
				headers,
				body: JSON.stringify(body),
			});
		} catch (e) {
			throw new KSYSApiError(
				e instanceof Error ? e.message : 'Network error retrieving document',
				0,
				'RETRIEVE_DOCUMENT_ERROR',
			);
		}

		if (!response.ok) {
			const errText = await response.text();
			throw new KSYSApiError(
				errText || response.statusText || 'Failed to retrieve document',
				response.status,
				'RETRIEVE_DOCUMENT_ERROR',
			);
		}

		const ct = (response.headers.get('content-type') || '').toLowerCase();

		if (ct.includes('application/json') || ct.includes('+json')) {
			const parsed = (await response.json()) as unknown;
			const openUrl = extractRetrieveDocumentUrl(parsed);
			if (!openUrl) {
				throw new KSYSApiError('No document URL in retrieveDocument response', response.status, 'RETRIEVE_DOCUMENT_ERROR');
			}
			const absolute = absolutizeKurtosysDocumentUrl(openUrl, this.getBaseUrl());
			return this.fetchAuthenticatedDocumentBlobUrl(absolute);
		}

		const blob = await response.blob();
		if (
			blob.size > 0 &&
			(ct.includes('pdf') ||
				ct.includes('octet-stream') ||
				ct.includes('msword') ||
				ct.includes('officedocument') ||
				ct.includes('image/'))
		) {
			const objectUrl = URL.createObjectURL(blob);
			scheduleRevokeObjectURL(objectUrl);
			return objectUrl;
		}

		try {
			const parsed = JSON.parse(await blob.text()) as unknown;
			const openUrl = extractRetrieveDocumentUrl(parsed);
			if (!openUrl) {
				throw new KSYSApiError('No document URL in retrieveDocument response', response.status, 'RETRIEVE_DOCUMENT_ERROR');
			}
			const absolute = absolutizeKurtosysDocumentUrl(openUrl, this.getBaseUrl());
			return this.fetchAuthenticatedDocumentBlobUrl(absolute);
		} catch (e) {
			if (e instanceof KSYSApiError) throw e;
			throw new KSYSApiError(
				'Unexpected retrieveDocument response (not JSON with URL or binary)',
				response.status,
				'RETRIEVE_DOCUMENT_ERROR',
			);
		}
	}

	/**
	 * List translations
	 * POST /config/listtranslations
	 */
	async listTranslations(params: {
		culture: string;
		translationCulture: string[];
	}): Promise<unknown> {
		try {
			const response = await kurtosysRequest<unknown>({
				endpoint: '/config/listtranslations',
				body: params as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});

			return response;
		} catch (error) {
			if (error instanceof Error && 'status' in error) {
				throw new KSYSApiError(
					error.message,
					(error as Error & { status: number }).status,
					'TRANSLATIONS_ERROR',
				);
			}

			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Failed to list translations',
				0,
				'TRANSLATIONS_ERROR',
			);
		}
	}
}

