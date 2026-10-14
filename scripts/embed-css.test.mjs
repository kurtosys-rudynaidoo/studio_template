import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(root, 'apps/ksys-client-appManager/package.json'));
const postcss = require('postcss');
const postcssScopeEmbed = require(path.join(root, 'scripts/postcss-scope-embed.cjs'));
const { productScopeIds } = require(path.join(root, 'scripts/embed-scope-ids.cjs'));

test('widget template CSS plugin matches the monorepo copy', () => {
	const pairs = [
		['scripts/postcss-scope-embed.cjs', 'ksys-studio-widget-template/scripts/postcss-scope-embed.cjs'],
		['scripts/scope-and-inline-css.cjs', 'ksys-studio-widget-template/scripts/scope-and-inline-css.cjs'],
	];
	for (const [left, right] of pairs) {
		assert.equal(fs.readFileSync(path.join(root, left), 'utf8'), fs.readFileSync(path.join(root, right), 'utf8'));
	}
});

test('host reset and portal helper are present in every app', () => {
	const hostReset = fs.readFileSync(
		path.join(root, 'ksys-studio-widget-template/src/styles/host-reset.css'),
		'utf8',
	);
	const portal = fs.readFileSync(path.join(root, 'ksys-studio-widget-template/src/utils/portal-root.ts'), 'utf8');
	const apps = fs
		.readdirSync(path.join(root, 'apps'))
		.filter((name) => name.startsWith('ksys-'));
	assert.ok(apps.length > 0);
	for (const app of apps) {
		assert.equal(fs.readFileSync(path.join(root, 'apps', app, 'src/styles/host-reset.css'), 'utf8'), hostReset);
		assert.equal(fs.readFileSync(path.join(root, 'apps', app, 'src/utils/portal-root.ts'), 'utf8'), portal);
	}
});

test('finished CSS is unlayered and scoped to the mount and portal', async () => {
	const input = `
		@layer base {
			button { border: 1px solid; }
			h2 { text-transform: uppercase; }
		}
		@layer utilities {
			.border-0 { border-width: 0; }
		}
		@keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
		:root { color: black; }
	`;
	const css = (await postcss([postcssScopeEmbed({ scopeIds: ['overview', 'overview-portal'] })]).process(input, { from: 'fixture.css' })).css;
	assert.equal(css.includes('@layer'), false);
	assert.match(css, /:is\(#overview,#overview-portal\) button/);
	assert.match(css, /:is\(#overview,#overview-portal\) \.border-0/);
	assert.match(css, /:is\(#overview,#overview-portal\) \{/);
	assert.match(css, /@keyframes spin/);
	assert.match(css, /from \{ transform: rotate\(0\); \}/);
});

test('product scope ids skip standalone apps and add portal ids', () => {
	const ids = productScopeIds(root);
	assert.ok(ids.includes('overview'));
	assert.ok(ids.includes('overview-portal'));
	assert.ok(ids.includes('appManager'));
	assert.equal(ids.includes('fundCentre'), false);
	assert.equal(ids.includes('bp-shared'), false);
});

test('scope plugin rejects an empty mount list', () => {
	assert.throws(() => postcssScopeEmbed({ scopeIds: [] }), /scopeIds/);
});
