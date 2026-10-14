import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
	'src/services/content-client.ts',
	'src/services/content-client.test.ts',
	'src/hooks/useContent.ts',
];

test('starter apps ship the same optional content client as the widget template', () => {
	const apps = fs.readdirSync(path.join(root, 'apps')).filter((name) => name.startsWith('ksys-'));
	assert.ok(apps.length > 0);
	for (const file of files) {
		const expected = fs.readFileSync(path.join(root, 'ksys-studio-widget-template', file), 'utf8');
		for (const app of apps) {
			assert.equal(fs.readFileSync(path.join(root, 'apps', app, file), 'utf8'), expected, `${app}/${file}`);
		}
	}
});
