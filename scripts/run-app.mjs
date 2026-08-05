#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadConfig, assertAppExists, toCamel } from './lib.mjs';

const script = process.argv[2] || 'dev';
const appId = toCamel(process.argv[3] || '');
const cfg = loadConfig();

if (!appId) {
	console.error(`Usage: npm run ${script === 'dev' ? 'dev' : script} -- <appId>`);
	console.error('Apps: ' + cfg.apps.map((a) => a.id).join(', '));
	process.exit(1);
}

const dir = assertAppExists(cfg, appId);
ensureInstall(dir);
const result = spawnSync('npm', ['run', script], { cwd: dir, stdio: 'inherit', shell: process.platform === 'win32' });
process.exit(result.status ?? 1);

function ensureInstall(dir) {
	if (!fs.existsSync(path.join(dir, 'node_modules'))) {
		console.log(`Installing dependencies in ${path.basename(dir)}...`);
		const r = spawnSync('npm', ['install'], { cwd: dir, stdio: 'inherit', shell: process.platform === 'win32' });
		if (r.status !== 0) process.exit(r.status ?? 1);
	}
}
