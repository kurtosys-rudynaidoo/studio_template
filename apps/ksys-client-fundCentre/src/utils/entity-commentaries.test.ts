import { describe, it, expect } from 'vitest';
import { normalizeEntityCommentaries, pickLocalizedCommentaryText } from './entity-commentaries';

describe('pickLocalizedCommentaryText', () => {
	const rows = [
		{ commentary: 'GB text', culture: 'en-GB' },
		{ commentary: 'US text', culture: 'en-US' },
	];

	it('prefers requested culture', () => {
		expect(pickLocalizedCommentaryText(rows, 'en-GB')).toBe('GB text');
		expect(pickLocalizedCommentaryText(rows, 'en-US')).toBe('US text');
	});

	it('falls back to en-US then first non-empty', () => {
		expect(pickLocalizedCommentaryText([{ commentary: 'Only US', culture: 'en-US' }], 'fr-FR')).toBe('Only US');
	});
});

describe('normalizeEntityCommentaries', () => {
	it('maps object-shaped commentaries (BP API)', () => {
		const raw = {
			investment_approach: [
				{ commentary: 'GB approach', culture: 'en-GB' },
				{ commentary: 'US approach', culture: 'en-US' },
			],
			objective: [{ commentary: 'US objective', culture: 'en-US' }],
		};
		const out = normalizeEntityCommentaries(raw, 'en-US');
		expect(out).toEqual([
			{ type: 'investment_approach', content: 'US approach' },
			{ type: 'objective', content: 'US objective' },
		]);
	});

	it('keeps legacy array shape', () => {
		const raw = [{ type: 'fund_objective', content: 'Legacy' }];
		expect(normalizeEntityCommentaries(raw, 'en-US')).toEqual([{ type: 'fund_objective', content: 'Legacy' }]);
	});
});
