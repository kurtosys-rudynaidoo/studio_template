/**
 * useWatchlist Hook
 * Watchlist localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Watchlist configuration
 */
export interface WatchlistConfig {
	key: string;
	scope: 'unique' | 'shared';
}

/**
 * useWatchlist hook return type
 */
export interface UseWatchlistReturn {
	watchlist: Set<string>;
	isInWatchlist: (id: string) => boolean;
	addToWatchlist: (id: string) => void;
	removeFromWatchlist: (id: string) => void;
	toggleWatchlist: (id: string) => void;
	clearWatchlist: () => void;
}

/**
 * useWatchlist hook
 */
export function useWatchlist(config: WatchlistConfig = { key: 'fundCenterWatchlist', scope: 'unique' }): UseWatchlistReturn {
	const [watchlist, setWatchlist] = useState<Set<string>>(new Set());

	// Load from localStorage on mount
	useEffect(() => {
		try {
			const stored = localStorage.getItem(config.key);
			if (stored) {
				const ids = JSON.parse(stored) as string[];
				setWatchlist(new Set(ids));
			}
		} catch (error) {
			console.error('Failed to load watchlist from localStorage:', error);
		}
	}, [config.key]);

	// Save to localStorage whenever watchlist changes
	useEffect(() => {
		try {
			localStorage.setItem(config.key, JSON.stringify(Array.from(watchlist)));
		} catch (error) {
			console.error('Failed to save watchlist to localStorage:', error);
		}
	}, [watchlist, config.key]);

	const isInWatchlist = useCallback(
		(id: string) => {
			return watchlist.has(id);
		},
		[watchlist],
	);

	const addToWatchlist = useCallback((id: string) => {
		setWatchlist((prev) => {
			const next = new Set(prev);
			next.add(id);
			return next;
		});
	}, []);

	const removeFromWatchlist = useCallback((id: string) => {
		setWatchlist((prev) => {
			const next = new Set(prev);
			next.delete(id);
			return next;
		});
	}, []);

	const toggleWatchlist = useCallback(
		(id: string) => {
			if (watchlist.has(id)) {
				removeFromWatchlist(id);
			} else {
				addToWatchlist(id);
			}
		},
		[watchlist, addToWatchlist, removeFromWatchlist],
	);

	const clearWatchlist = useCallback(() => {
		setWatchlist(new Set());
	}, []);

	return {
		watchlist,
		isInWatchlist,
		addToWatchlist,
		removeFromWatchlist,
		toggleWatchlist,
		clearWatchlist,
	};
}

