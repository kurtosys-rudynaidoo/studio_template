const SHARED_STYLESHEET_ID = 'studio-shared-stylesheet';

/** Co-deployed shared.css next to appManager.js (production IIFE). */
export function ensureSharedStylesheet(): void {
	const url = import.meta.env.VITE_SHARED_CSS_URL as string | undefined;
	if (!import.meta.env.PROD || !url) return;
	if (document.getElementById(SHARED_STYLESHEET_ID)) return;
	const link = document.createElement('link');
	link.id = SHARED_STYLESHEET_ID;
	link.rel = 'stylesheet';
	link.href = url;
	link.crossOrigin = 'anonymous';
	document.head.appendChild(link);
}

ensureSharedStylesheet();
