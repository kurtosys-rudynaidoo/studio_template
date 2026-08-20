import { describe, expect, it, afterEach } from 'vitest';

import { installDecorativeTrackingImageGuard } from './decorative-tracking-images';

describe('installDecorativeTrackingImageGuard', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('marks body tracking pixels without alt as decorative', () => {
		const img = document.createElement('img');
		img.src = 'https://d21y75miwcfqoq.cloudfront.net/2ae264f7';
		img.setAttribute('style', 'position: absolute');
		img.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
		document.body.appendChild(img);

		const stop = installDecorativeTrackingImageGuard();
		expect(img.getAttribute('alt')).toBe('');
		expect(img.getAttribute('role')).toBe('presentation');
		stop();
	});

	it('does not alter informative images that already have alt', () => {
		const img = document.createElement('img');
		img.src = 'https://example.com/photo.jpg';
		img.alt = 'Portfolio manager';
		document.body.appendChild(img);

		const stop = installDecorativeTrackingImageGuard();
		expect(img.getAttribute('alt')).toBe('Portfolio manager');
		expect(img.getAttribute('role')).toBeNull();
		stop();
	});

	it('marks late-injected tracking pixels', async () => {
		const stop = installDecorativeTrackingImageGuard();

		const img = document.createElement('img');
		img.src = 'https://d21y75miwcfqoq.cloudfront.net/abcdef12';
		img.setAttribute('style', 'position: absolute');
		document.body.appendChild(img);

		await new Promise((r) => setTimeout(r, 0));
		expect(img.getAttribute('alt')).toBe('');
		stop();
	});
});
