#!/usr/bin/env node
/**
 * Build every registered app for an environment and collect clean artifacts
 * into BuildResult/<env>/<appId>/<appId>.js (plus shared.css if present).
 *
 * Usage:
 *   npm run build:staging
 *   node scripts/build-all.mjs staging
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadConfig, assertAppExists } from './lib.mjs';

const envMap = {
	development: { npm: 'build:dev', out: 'dev' },
	staging: { npm: 'build:staging', out: 'staging' },
	production: { npm: 'build:prod', out: 'prod' },
	dev: { npm: 'build:dev', out: 'dev' },
	prod: { npm: 'build:prod', out: 'prod' },
};

const envKey = process.argv[2] || 'staging';
const mapped = envMap[envKey];
if (!mapped) {
	console.error(`Unknown env: ${envKey}. Use development|staging|production`);
	process.exit(1);
}

const cfg = loadConfig();
const outRoot = path.join(ROOT, cfg.buildResultRoot || 'BuildResult', mapped.out);
fs.mkdirSync(outRoot, { recursive: true });

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

	console.log(`\n== build ${app.id} [${mapped.npm}] ==`);
	const result = spawnSync('npm', ['run', mapped.npm], {
		cwd: dir,
		stdio: 'inherit',
		shell: process.platform === 'win32',
	});
	if (result.status !== 0) {
		failed += 1;
		continue;
	}

	const dist = path.join(dir, 'dist-build');
	const target = path.join(outRoot, app.id);
	fs.rmSync(target, { recursive: true, force: true });
	fs.mkdirSync(target, { recursive: true });

	const jsName = `${app.id}.js`;
	const jsSrc = path.join(dist, jsName);
	if (!fs.existsSync(jsSrc)) {
		console.error(`Missing ${jsName} in ${dist}`);
		failed += 1;
		continue;
	}
	fs.copyFileSync(jsSrc, path.join(target, jsName));

	for (const extra of ['shared.css', 'bp-shared.css']) {
		const p = path.join(dist, extra);
		if (fs.existsSync(p)) fs.copyFileSync(p, path.join(target, path.basename(p)));
	}
	console.log(`Collected ${path.relative(ROOT, path.join(target, jsName))}`);
}

if (failed) {
	console.error(`\n${failed} app(s) failed.`);
	process.exit(1);
}
console.log(`\nBuild outputs in ${outRoot}`);
