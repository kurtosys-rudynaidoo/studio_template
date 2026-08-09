/**
 * Directory containing the deployed bundle (same logic as embed-loader `resolveAppBaseUrl`).
 * When the app is embedded on another origin (e.g. WordPress), `import.meta.env.BASE_URL` is still `./`,
 * which would resolve img `src` against the *page* URL — wrong. Prefer the script URL for `bundle.js` / `embed-loader.js`.
 */
function embedStaticBase(): string {
	if (typeof document === 'undefined') {
		return import.meta.env.BASE_URL || '/';
	}
	const selectors = ['script[src*="bundle.js"]', 'script[src*="embed-loader"]'];
	for (const sel of selectors) {
		const el = document.querySelector(sel) as HTMLScriptElement | null;
		const raw = el?.getAttribute('src') || el?.src;
		if (!raw) continue;
		try {
			const abs = new URL(raw, document.baseURI).href;
			const last = abs.lastIndexOf('/');
			if (last > 0) {
				return abs.slice(0, last + 1);
			}
		} catch {
			/* ignore */
		}
	}
	return import.meta.env.BASE_URL || '/';
}

/**
 * Static files co-located with the built bundle (e.g. hashed SVG/PNG in dist).
 * Leading `/` would resolve to the API host root on Kurtosys subpath deploys, not the app folder.
 */
export function publicAssetUrl(filename: string): string {
	const name = filename.replace(/^\//, '');
	const base = embedStaticBase();
	if (base === '/' || base === '') {
		return `/${name}`;
	}
	const prefix = base.endsWith('/') ? base : `${base}/`;
	return `${prefix}${name}`;
}
