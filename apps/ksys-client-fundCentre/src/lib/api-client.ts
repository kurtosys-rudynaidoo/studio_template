/**
 * Base API Client with Error Handling
 * Follows KSYS API documentation patterns and error handling rules
 */

import type { KSYSApiErrorResponse } from '@/types/ksys-api.types';

/**
 * Custom API Error class following error handling patterns
 */
export class KSYSApiError extends Error {
	status: number;
	code?: string;
	details?: Record<string, unknown>;

	constructor(
		message: string,
		status: number,
		code?: string,
		details?: Record<string, unknown>,
	) {
		super(message);
		this.name = 'KSYSApiError';
		this.status = status;
		this.code = code;
		this.details = details;
	}
}

/**
 * API Client configuration
 */
export interface ApiClientConfig {
	baseUrl: string;
	token?: string;
	timeout?: number;
}

/**
 * Request options
 */
export interface RequestOptions extends RequestInit {
	timeout?: number;
}

/**
 * Base API Client
 */
export class ApiClient {
	private baseUrl: string;
	private token: string | null = null;
	private defaultTimeout: number;

	constructor(config: ApiClientConfig) {
		this.baseUrl = config.baseUrl.replace(/\/$/, '');
		this.token = config.token || null;
		this.defaultTimeout = config.timeout || 30000;
	}

	/**
	 * Set authentication token
	 */
	setToken(token: string): void {
		this.token = token;
	}

	/**
	 * Make API request with error handling
	 */
	async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
		const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
		const timeout = options.timeout || this.defaultTimeout;

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			...(this.token && { 'x-ksys-token': this.token }),
			...options.headers,
		};

		const controller = new AbortController();
		const timeoutId = setTimeout(() => {
			controller.abort();
		}, timeout);

		try {
			const response = await fetch(url, {
				...options,
				headers,
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			if (!response.ok) {
				await this.handleErrorResponse(response);
			}

			return await response.json();
		} catch (error) {
			clearTimeout(timeoutId);

			if (error instanceof DOMException && error.name === 'AbortError') {
				throw new KSYSApiError(`Request timed out after ${timeout}ms`, 0, 'TIMEOUT');
			}

			if (error instanceof KSYSApiError) {
				throw error;
			}

			throw new KSYSApiError(
				error instanceof Error ? error.message : 'Network error occurred',
				0,
				'NETWORK_ERROR',
				{ originalError: error },
			);
		}
	}

	/**
	 * Handle error response
	 */
	private async handleErrorResponse(response: Response): Promise<never> {
		let errorData: KSYSApiErrorResponse;

		try {
			errorData = await response.json();
		} catch {
			errorData = {
				error: response.statusText,
				status: response.status,
			};
		}

		throw new KSYSApiError(
			errorData.message || errorData.error || 'Request failed',
			errorData.status,
			errorData.code,
			errorData.details,
		);
	}
}

