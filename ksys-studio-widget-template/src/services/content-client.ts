/**
 * Optional Kurtosys Content Manager reader.
 * The browser calls the CMS. The CMS calls Content Manager with KSYS_CONTENT_TOKEN.
 * Leave baseUrl empty to keep the feature off.
 */

export interface ContentRequest {
	baseUrl: string;
	type: string;
	name: string;
	culture: string;
	signal?: AbortSignal;
}

export function contentBaseUrlFromMount(mount: Element | null | undefined): string {
	const value = mount?.getAttribute('data-content-base-url')?.trim() ?? '';
	return value.replace(/\/$/, '');
}

export function contentUrl(request: ContentRequest): string {
	const base = request.baseUrl.replace(/\/$/, '');
	const type = encodeURIComponent(request.type);
	const name = encodeURIComponent(request.name);
	const culture = encodeURIComponent(request.culture);
	return `${base}/wp-json/ksys/v1/content/${type}/${name}?culture=${culture}`;
}

export function htmlFromContentResponse(payload: unknown): string | undefined {
	if (!payload || typeof payload !== 'object') return undefined;
	const html = (payload as { html?: unknown }).html;
	if (typeof html !== 'string') return undefined;
	const trimmed = html.trim();
	return trimmed || undefined;
}

export async function loadContentHtml(request: ContentRequest): Promise<string | undefined> {
	if (!request.baseUrl.trim() || !request.type.trim() || !request.name.trim()) return undefined;
	try {
		const response = await fetch(contentUrl(request), { signal: request.signal });
		if (!response.ok) return undefined;
		return htmlFromContentResponse(await response.json());
	} catch {
		return undefined;
	}
}
