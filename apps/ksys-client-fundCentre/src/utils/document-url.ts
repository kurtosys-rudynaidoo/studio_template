/**
 * Kurtosys often returns document paths relative to the API host (e.g. `/{guid}/docstorage/{guid}`).
 * Using those with `window.open()` on the SPA origin resolves against localhost and breaks downloads.
 */

function isApiRelativeDocumentPath(path: string): boolean {
	const p = path.toLowerCase();
	if (p.includes('docstorage')) return true;
	if (p.includes('/documents/')) return true;
	// Typical Kurtosys bucket prefix: /uuid/...
	return /^\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\//i.test(path);
}

/**
 * If `url` is relative but clearly a Kurtosys document path, prefix `apiBaseUrl`.
 * Absolute http(s) URLs are returned unchanged.
 */
export function absolutizeKurtosysDocumentUrl(url: string, apiBaseUrl: string): string {
	const raw = (url || '').trim();
	if (!raw || raw === '#') return raw;
	if (/^https?:\/\//i.test(raw)) return raw;
	if (raw.startsWith('//')) return `https:${raw}`;

	const base = apiBaseUrl.replace(/\/$/, '');
	const path = raw.startsWith('/') ? raw : `/${raw}`;

	if (isApiRelativeDocumentPath(path)) {
		return `${base}${path}`;
	}

	return raw;
}

/**
 * True when `value` looks like a document path/URL (not a retrieve `clientCode` token some APIs put in `URL`).
 */
export function documentPathLooksLikeStorageUrl(value: string): boolean {
	const v = (value || '').trim();
	if (!v) return false;
	if (/^https?:\/\//i.test(v)) return true;
	if (v.startsWith('/') || v.startsWith('//')) return true;
	if (v.toLowerCase().includes('docstorage')) return true;
	return false;
}
