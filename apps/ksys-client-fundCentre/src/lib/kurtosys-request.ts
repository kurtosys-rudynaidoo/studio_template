/**
 * Kurtosys Request Utility
 * Based on similar project implementation with caching and request deduplication
 */

type JsonRecord = Record<string, unknown>;

export interface KurtosysRequestOptions {
	endpoint: string;
	body: JsonRecord;
	apiUrl?: string;
	token?: string;
	signal?: AbortSignal;
	timeoutMs?: number;
}

const DEFAULT_API_URL = import.meta.env.VITE_KURTOSYS_API_URL || 'https://api-us.fundpress.io';
const DEFAULT_TOKEN = import.meta.env.VITE_KURTOSYS_API_TOKEN || '';

// Simple in-memory cache
const responseCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Track in-flight requests to deduplicate
const inFlightRequests = new Map<string, Promise<unknown>>();

/**
 * Get cache key from endpoint and body
 */
function getCacheKey(endpoint: string, body: JsonRecord): string {
	return `${endpoint}:${JSON.stringify(body)}`;
}

/**
 * Get cached response if available and not expired
 */
function getCachedResponse<T>(cacheKey: string): T | undefined {
	const cached = responseCache.get(cacheKey);
	if (!cached) {
		return undefined;
	}

	const age = Date.now() - cached.timestamp;
	if (age > CACHE_TTL) {
		responseCache.delete(cacheKey);
		return undefined;
	}

	return cached.data as T;
}

/**
 * Set cached response
 */
function setCachedResponse(cacheKey: string, data: unknown): void {
	responseCache.set(cacheKey, {
		data,
		timestamp: Date.now(),
	});
}

/**
 * Timeout wrapper for fetch
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
	return Promise.race([
		promise,
		new Promise<never>((_, reject) => {
			setTimeout(() => {
				reject(new Error(`Request timed out after ${timeoutMs}ms`));
			}, timeoutMs);
		}),
	]);
}

/**
 * Safely get text from response
 */
async function safeText(response: Response): Promise<string> {
	try {
		return await response.text();
	} catch {
		return '';
	}
}

/**
 * Kurtosys API request function
 * Handles caching, request deduplication, and error handling
 */
export async function kurtosysRequest<T = unknown>({
	endpoint,
	body,
	apiUrl = DEFAULT_API_URL,
	token = DEFAULT_TOKEN,
	signal,
	timeoutMs = 30000,
}: KurtosysRequestOptions): Promise<T> {
	const cacheKey = getCacheKey(endpoint, body);

	// Check cache first
	const cached = getCachedResponse<T>(cacheKey);
	if (cached !== undefined) {
		return cached;
	}

	// Check if there's already an in-flight request for this exact call
	const inFlightKey = cacheKey;
	const existingRequest = inFlightRequests.get(inFlightKey);
	if (existingRequest) {
		// Return the existing promise to deduplicate requests
		return existingRequest as Promise<T>;
	}

	const url = `${apiUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

	// Create the request promise
	const requestPromise = (async (): Promise<T> => {
		try {
			const response = await withTimeout(
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						...(token ? { 'x-ksys-token': token } : {}),
					},
					body: JSON.stringify(body),
					signal,
				}),
				timeoutMs,
			);

			if (!response.ok) {
				const text = await safeText(response);
				const error = new Error(`Kurtosys API Error (${response.status}): ${text || response.statusText}`);
				(error as Error & { status: number }).status = response.status;
				throw error;
			}

			const result = await response.json();

			// Cache successful responses
			setCachedResponse(cacheKey, result);

			return result as T;
		} catch (error) {
			// Don't cache errors
			throw error;
		} finally {
			// Remove from in-flight requests when done
			inFlightRequests.delete(inFlightKey);
		}
	})();

	// Track this in-flight request
	inFlightRequests.set(inFlightKey, requestPromise);

	return requestPromise;
}

