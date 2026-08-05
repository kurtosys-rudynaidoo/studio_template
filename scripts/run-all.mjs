#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { loadConfig, assertAppExists } from './lib.mjs';

const script = process.argv[2];
if (!script) {
	console.error('Usage: node scripts/run-all.mjs <npm-script>');
	process.exit(1);
}

const cfg = loadConfig();
let failed = 0;
for (const app of cfg.apps) {
	const dir = assertAppExists(cfg, app.id);
	if (!fs.existsSync(path.join(dir, 'node_modules'))) {
		console.log(`\n== install ${app.id} ==`);
		const install = spawnSync('npm', ['install'], {
			cwd: dir,
			stdio: 'inherit',
			shell: process.platform === 'win32',
		});
		if (install.status !== 0) {
			failed += 1;
			continue;
		}
	}
	console.log(`\n== ${app.id}: npm run ${script} ==`);
	const result = spawnSync('npm', ['run', script], {
		cwd: dir,
		stdio: 'inherit',
		shell: process.platform === 'win32',
	});
	if (result.status !== 0) failed += 1;
}

if (failed) {
	console.error(`\n${failed} app(s) failed.`);
	process.exit(1);
}
console.log('\nAll apps OK.');
