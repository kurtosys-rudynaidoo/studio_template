import { describe, expect, it, vi, afterEach } from 'vitest';

import { contentBaseUrlFromMount, contentUrl, htmlFromContentResponse, loadContentHtml } from './content-client';

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('content client', () => {
	it('reads the mount base URL and ignores a missing attribute', () => {
		const mount = document.createElement('div');
		expect(contentBaseUrlFromMount(mount)).toBe('');
		mount.setAttribute('data-content-base-url', 'https://www.example.com/');
		expect(contentBaseUrlFromMount(mount)).toBe('https://www.example.com');
		expect(contentBaseUrlFromMount(null)).toBe('');
	});

	it('builds the same-origin content route', () => {
		expect(
			contentUrl({
				baseUrl: 'https://www.example.com/',
				type: 'Tooltips',
				name: 'risk warning',
				culture: 'en-US',
			}),
		).toBe('https://www.example.com/wp-json/ksys/v1/content/Tooltips/risk%20warning?culture=en-US');
	});

	it('returns trimmed HTML and ignores an empty body', () => {
		expect(htmlFromContentResponse({ html: '  <p>Hello</p>  ' })).toBe('<p>Hello</p>');
		expect(htmlFromContentResponse({ html: '   ' })).toBeUndefined();
		expect(htmlFromContentResponse(null)).toBeUndefined();
	});

	it('stays off when the page did not opt in', async () => {
		const fetchMock = vi.fn();
		vi.stubGlobal('fetch', fetchMock);
		await expect(
			loadContentHtml({ baseUrl: '', type: 'Notes', name: 'intro', culture: 'en-US' }),
		).resolves.toBeUndefined();
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('returns undefined when the CMS has no published item', async () => {
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
		await expect(
			loadContentHtml({
				baseUrl: 'https://www.example.com',
				type: 'Notes',
				name: 'intro',
				culture: 'en-US',
			}),
		).resolves.toBeUndefined();
	});
});
