/**
 * Document Service
 * Document handling and joinSpec management
 * Uses kurtosysRequest for API calls
 */

import { kurtosysRequest } from '@/lib/kurtosys-request';
import type { KSYSSearchEntityResponse } from '@/types/ksys-api.types';
import type { FundDocument } from '@/types/fund.types';
import { buildExpandedFundRequestBody } from '@/utils/config-mapper';

/**
 * Document service configuration
 */
export interface DocumentServiceConfig {
	baseUrl: string;
	token?: string;
}

/**
 * Document Service
 */
export class DocumentService {
	private baseUrl: string;
	private token: string | null = null;

	constructor(config: DocumentServiceConfig) {
		this.baseUrl = config.baseUrl;
		this.token = config.token || null;
	}

	setToken(token: string): void {
		this.token = token;
	}

	/**
	 * Fetch documents for a fund using joinSpec
	 * Based on actual FundPress API structure
	 */
	async fetchFundDocuments(
		clientCode: string,
		culture: string = 'en-US',
	): Promise<FundDocument[]> {
		const requestBody = buildExpandedFundRequestBody(clientCode, culture);

		try {
			const response = await kurtosysRequest<KSYSSearchEntityResponse>({
				endpoint: '/fund/searchEntity',
				body: requestBody as unknown as Record<string, unknown>,
				apiUrl: this.baseUrl,
				token: this.token || undefined,
			});

			// Extract documents from response
			// Response uses 'values' array, with 'data' as fallback
			const entities = response.values || response.data || [];
			const documents: FundDocument[] = [];

			entities.forEach((entity) => {
				if (entity.documents && Array.isArray(entity.documents)) {
					entity.documents.forEach((doc: any) => {
						documents.push({
							id: doc.kurtosys_id || String(Math.random()),
							type: doc.document_type || '',
							filename: doc.filename || '',
							url: doc.url || doc.download_url || '',
						});
					});
				}
			});

			return documents;
		} catch (error) {
			console.error('Failed to fetch fund documents:', error);
			return [];
		}
	}
}

