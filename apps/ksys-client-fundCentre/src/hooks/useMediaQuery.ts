/**
 * useMediaQuery Hook
 * Returns true when the given media query matches (e.g. for mobile breakpoint).
 */

import { useState, useEffect } from 'react';

/** Legacy phone breakpoint; Fund Center table/card switching uses container width via `useFundCenterCompactLayout`. */
const MOBILE_BREAKPOINT = 768;

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(() => {
		if (typeof window === 'undefined') return false;
		return window.matchMedia(query).matches;
	});

	useEffect(() => {
		const media = window.matchMedia(query);
		setMatches(media.matches);
		const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
		media.addEventListener('change', listener);
		return () => media.removeEventListener('change', listener);
	}, [query]);

	return matches;
}

/** True when viewport width is below the mobile breakpoint (e.g. < 768px) */
export function useIsMobile(breakpointPx: number = MOBILE_BREAKPOINT): boolean {
	return useMediaQuery(`(max-width: ${breakpointPx}px)`);
}
