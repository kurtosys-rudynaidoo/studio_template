/**
 * Level Access BP-662 pattern: third-party tracking pixels injected as
 * <img> without an accessible name. App Manager marks matching beacons
 * decorative so new DXM/CMS pages don't fail the same scan.
 *
 * Prefer fixing the host tag; this is a safety net for late-injected pixels.
 */

const TRACKING_REFERRER = 'no-referrer-when-downgrade';

function hasAccessibleName(img: HTMLImageElement): boolean {
	if (img.hasAttribute('alt')) return true;
	if (img.getAttribute('aria-label')?.trim()) return true;
	if (img.getAttribute('aria-labelledby')?.trim()) return true;
	if (img.getAttribute('title')?.trim()) return true;
	return false;
}

function looksLikeTrackingPixel(img: HTMLImageElement): boolean {
	if (hasAccessibleName(img)) return false;

	const src = img.getAttribute('src') || '';
	const styleAttr = img.getAttribute('style') || '';
	const referrer = (img.getAttribute('referrerpolicy') || '').toLowerCase();
	const isBodyChild = img.parentElement === document.body;

	let computedPosition = '';
	try {
		computedPosition = window.getComputedStyle(img).position;
	} catch {
		computedPosition = '';
	}

	const isAbsolute =
		/position\s*:\s*absolute/i.test(styleAttr) || computedPosition === 'absolute';

	const w = img.getAttribute('width');
	const h = img.getAttribute('height');
	const isAttrTiny =
		(w === '0' || w === '1') && (h === '0' || h === '1');
	const isStyleTiny = /(?:^|;)\s*width\s*:\s*1px/i.test(styleAttr) && /(?:^|;)\s*height\s*:\s*1px/i.test(styleAttr);

	// CloudFront (and similar CDN) hash-only paths used by analytics beacons
	const isCdnHashBeacon =
		/cloudfront\.net\/[a-f0-9]{6,}(?:\?|$)/i.test(src) ||
		/\.cloudfront\.net\/[a-f0-9]{6,}$/i.test(src);

	if (isAttrTiny || isStyleTiny) return true;
	if (isBodyChild && isAbsolute) return true;
	if (isCdnHashBeacon && (isAbsolute || isBodyChild)) return true;
	if (referrer === TRACKING_REFERRER && isAbsolute && isBodyChild) return true;

	return false;
}

function markDecorative(img: HTMLImageElement): void {
	img.setAttribute('alt', '');
	img.setAttribute('role', 'presentation');
}

function scan(root: ParentNode = document): number {
	let marked = 0;
	const images = root.querySelectorAll?.('img') ?? [];
	images.forEach((node) => {
		if (!(node instanceof HTMLImageElement)) return;
		if (!looksLikeTrackingPixel(node)) return;
		markDecorative(node);
		marked += 1;
	});
	return marked;
}

/**
 * Scan once and watch for late-injected tracking <img> nodes.
 * Returns a disconnect function.
 */
export function installDecorativeTrackingImageGuard(): () => void {
	if (typeof document === 'undefined') return () => undefined;

	scan(document);

	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type === 'attributes' && mutation.target instanceof HTMLImageElement) {
				if (looksLikeTrackingPixel(mutation.target)) {
					markDecorative(mutation.target);
				}
				continue;
			}
			mutation.addedNodes.forEach((node) => {
				if (node instanceof HTMLImageElement) {
					if (looksLikeTrackingPixel(node)) markDecorative(node);
					return;
				}
				if (node instanceof Element) {
					scan(node);
				}
			});
		}
	});

	observer.observe(document.documentElement, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ['src', 'style', 'referrerpolicy'],
	});

	return () => observer.disconnect();
}
