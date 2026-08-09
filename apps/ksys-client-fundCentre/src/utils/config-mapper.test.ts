import { describe, it, expect } from 'vitest';

import { parseEmbedConfig } from './config-mapper';

describe('parseEmbedConfig', () => {
	it('reads data-subadvised-landing-url', () => {
		const el = document.createElement('div');
		el.setAttribute('data-subadvised-landing-url', ' /subadvised-page ');
		el.setAttribute('data-culture', 'en-US');
		const parsed = parseEmbedConfig(el);
		expect(parsed).not.toBeNull();
		expect(parsed!.subadvisedLandingUrl).toBe('/subadvised-page');
	});

	it('defaults subadvisedLandingUrl to empty when attribute missing', () => {
		const el = document.createElement('div');
		const parsed = parseEmbedConfig(el);
		expect(parsed).not.toBeNull();
		expect(parsed!.subadvisedLandingUrl).toBe('');
	});
});
