import type { ScriptLoadStatus } from '@/types/app-manager.types';

const loadStatus: Record<string, ScriptLoadStatus> = {};
const loadPromises: Record<string, Promise<void>> = {};

export function getLoadStatus(appId: string): ScriptLoadStatus {
	return loadStatus[appId] ?? 'idle';
}

export function loadScript(appId: string, scriptUrl: string): Promise<void> {
	if (appId in loadPromises) return loadPromises[appId];
	if (loadStatus[appId] === 'loaded') return Promise.resolve();

	loadStatus[appId] = 'loading';

	loadPromises[appId] = new Promise<void>((resolve, reject) => {
		const script = document.createElement('script');
		script.src = scriptUrl;
		script.crossOrigin = 'anonymous';
		script.async = true;

		script.onload = () => {
			loadStatus[appId] = 'loaded';
			resolve();
		};

		script.onerror = () => {
			loadStatus[appId] = 'error';
			delete loadPromises[appId];
			reject(new Error(`Failed to load script for app: ${appId} (${scriptUrl})`));
		};

		document.head.appendChild(script);
	});

	return loadPromises[appId];
}

export function createLazyObserver(
	onIntersect: (entry: IntersectionObserverEntry) => void,
): IntersectionObserver {
	return new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					onIntersect(entry);
				}
			}
		},
		{ rootMargin: '300px 0px' },
	);
}
