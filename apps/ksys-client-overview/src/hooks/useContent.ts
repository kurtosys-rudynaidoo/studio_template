import { useEffect, useState } from 'react';

import { contentBaseUrlFromMount, loadContentHtml } from '@/services/content-client';

export type ContentStatus = 'idle' | 'loading' | 'ready' | 'missing';

export interface UseContentHtmlOptions {
	/** Mount element that may carry data-content-base-url. */
	mount: HTMLElement | null;
	type: string;
	name: string;
	culture: string;
	/** Off until a widget chooses to read Content Manager. */
	enabled?: boolean;
}

/**
 * Opt-in reader for one published content instance.
 * Does nothing until `enabled` is true and the mount has data-content-base-url.
 */
export function useContentHtml({
	mount,
	type,
	name,
	culture,
	enabled = false,
}: UseContentHtmlOptions): { html: string | undefined; status: ContentStatus } {
	const [html, setHtml] = useState<string | undefined>(undefined);
	const [status, setStatus] = useState<ContentStatus>('idle');

	useEffect(() => {
		if (!enabled) {
			setHtml(undefined);
			setStatus('idle');
			return;
		}
		const baseUrl = contentBaseUrlFromMount(mount);
		if (!baseUrl) {
			setHtml(undefined);
			setStatus('missing');
			return;
		}
		const controller = new AbortController();
		setStatus('loading');
		void loadContentHtml({ baseUrl, type, name, culture, signal: controller.signal }).then((next) => {
			if (controller.signal.aborted) return;
			setHtml(next);
			setStatus(next ? 'ready' : 'missing');
		});
		return () => controller.abort();
	}, [mount, type, name, culture, enabled]);

	return { html, status };
}
