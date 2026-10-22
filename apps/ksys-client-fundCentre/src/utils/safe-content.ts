/**
 * The one place untrusted HTML and URLs are made safe (Secure Delivery 3.3 / 3.5).
 * CMS, API and embed-config values are all treated as untrusted.
 */
import DOMPurify from 'dompurify';

/** Sanitise HTML before `dangerouslySetInnerHTML`. Keeps CMS formatting and links; drops scripts, handlers, forms and unsafe URLs. */
export function safeHtml(html: string | undefined | null): string {
	if (!html) return '';
	return DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['form'] });
}

/**
 * Allowlist for hrefs and window.open: `https:`, same-origin, and `blob:` (our own object URLs).
 * Anything else (`javascript:`, `data:`, plain `http:` to another host) returns ''.
 */
export function safeUrl(url: string | undefined | null): string {
	const raw = (url ?? '').trim();
	if (!raw) return '';
	try {
		const u = new URL(raw, window.location.href);
		if (u.protocol === 'https:' || u.protocol === 'blob:' || u.origin === window.location.origin) return raw;
	} catch {
		// unparseable → rejected
	}
	return '';
}
