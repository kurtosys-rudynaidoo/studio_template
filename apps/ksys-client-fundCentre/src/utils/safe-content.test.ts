import { describe, it, expect } from 'vitest';
import { safeHtml, safeUrl } from './safe-content';

describe('safeHtml', () => {
	it('keeps formatting and links', () => {
		expect(safeHtml('<p><strong>Risk</strong> <a href="https://x.com/a">more</a></p>')).toBe(
			'<p><strong>Risk</strong> <a href="https://x.com/a">more</a></p>',
		);
	});
	it('drops scripts, handlers and javascript: links', () => {
		const out = safeHtml('<img src=x onerror="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">x</a>');
		expect(out).not.toMatch(/onerror|<script|javascript:/i);
	});
	it('returns empty for missing input', () => {
		expect(safeHtml(undefined)).toBe('');
	});
});

describe('safeUrl', () => {
	it('allows https, relative and blob URLs', () => {
		expect(safeUrl('https://example.com/a')).toBe('https://example.com/a');
		expect(safeUrl('/funds/abc')).toBe('/funds/abc');
		expect(safeUrl('blob:http://localhost/123')).toBe('blob:http://localhost/123');
	});
	it('rejects script and data URLs and plain http to another host', () => {
		expect(safeUrl('javascript:alert(1)')).toBe('');
		expect(safeUrl(' JavaScript:alert(1)')).toBe('');
		expect(safeUrl('data:text/html,<script>alert(1)</script>')).toBe('');
		expect(safeUrl('http://evil.example/x')).toBe('');
	});
});
