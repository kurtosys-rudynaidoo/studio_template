import type { ReactNode } from 'react';

/** Visually hidden but available to assistive tech (WCAG 1.3.1 / 4.1.2). */
export function VisuallyHidden({ children }: { children: ReactNode }) {
	return <span className="studio-sr-only">{children}</span>;
}

export const FOCUS_RING =
	'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--studio-color-focus)]';

/**
 * Decorative images must use empty alt; informative images need meaningful alt.
 * Prefer this helper so alt is never omitted by accident.
 */
export function accessibleImageProps(options: {
	decorative?: boolean;
	alt?: string;
}): { alt: string; role?: string; 'aria-hidden'?: boolean } {
	if (options.decorative) {
		return { alt: '', role: 'presentation', 'aria-hidden': true };
	}
	const alt = (options.alt || '').trim();
	if (!alt) {
		console.warn('[a11y] Informative image missing alt text');
	}
	return { alt: alt || 'Image' };
}
