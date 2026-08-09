import { describe, it, expect } from 'vitest';
import { absolutizeKurtosysDocumentUrl, documentPathLooksLikeStorageUrl } from './document-url';

describe('absolutizeKurtosysDocumentUrl', () => {
	const base = 'https://api-us.fundpress.io';

	it('prefixes docstorage paths', () => {
		const rel = '/7038c370-ae8c-452f-8d3b-15ab03a99e24/docstorage/107b7876-7e59-4c26-bc95-5f70de4d0709';
		expect(absolutizeKurtosysDocumentUrl(rel, base)).toBe(
			`${base}${rel}`,
		);
	});

	it('prefixes paths without leading slash when they contain docstorage', () => {
		const rel = '7038c370-ae8c-452f-8d3b-15ab03a99e24/docstorage/x';
		expect(absolutizeKurtosysDocumentUrl(rel, base)).toBe(`${base}/${rel}`);
	});

	it('leaves absolute URLs unchanged', () => {
		const u = 'https://cdn.example.com/file.pdf';
		expect(absolutizeKurtosysDocumentUrl(u, base)).toBe(u);
	});

	it('strips trailing slash from api base', () => {
		const rel = '/foo/docstorage/bar';
		expect(absolutizeKurtosysDocumentUrl(rel, `${base}/`)).toBe(`${base}${rel}`);
	});
});

describe('documentPathLooksLikeStorageUrl', () => {
	it('returns false for retrieve tokens (hex)', () => {
		expect(documentPathLooksLikeStorageUrl('5772174f84fd3e127c1de8677ffc0112046d572b')).toBe(false);
	});

	it('returns true for paths and http URLs', () => {
		expect(documentPathLooksLikeStorageUrl('/7038c370/docstorage/x')).toBe(true);
		expect(documentPathLooksLikeStorageUrl('https://x/y.pdf')).toBe(true);
		expect(documentPathLooksLikeStorageUrl('7038c370-ae8c/docstorage/x')).toBe(true);
	});
});
