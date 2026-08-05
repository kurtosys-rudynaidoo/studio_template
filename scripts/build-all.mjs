#!/usr/bin/env node
/**
 * Build every registered app for an environment and host target(s).
 *
 * Usage:
 *   npm run build:staging
 *   node scripts/build-all.mjs staging
 *   node scripts/build-all.mjs staging --host cms
 *
 * Outputs:
 *   BuildResult/<host>/<env>/<appId>/<appId>.js
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {
	ROOT,
	loadConfig,
	assertAppExists,
	resolveHostTargets,
	buildOutputRoot,
} from './lib.mjs';

const envMap = {
	development: { npm: 'build:dev', out: 'dev' },
	staging: { npm: 'build:staging', out: 'staging' },
	production: { npm: 'build:prod', out: 'prod' },
	dev: { npm: 'build:dev', out: 'dev' },
	prod: { npm: 'build:prod', out: 'prod' },
};

function parseArgs(argv) {
	const out = { env: 'staging', host: null };
	const rest = [];
	for (let i = 0; i < argv.length; i++) {
		if (argv[i] === '--host') out.host = argv[++i];
		else rest.push(argv[i]);
	}
	if (rest[0]) out.env = rest[0];
	return out;
}

const args = parseArgs(process.argv.slice(2));
const mapped = envMap[args.env];
if (!mapped) {
	console.error(`Unknown env: ${args.env}. Use development|staging|production`);
	process.exit(1);
}

const cfg = loadConfig();
let hosts;
try {
	hosts = resolveHostTargets(cfg, args.host);
} catch (err) {
	console.error(String(err.message || err));
	console.error('Run: npm run init -- --host dxm|cms|both');
	process.exit(1);
}

let failed = 0;
for (const host of hosts) {
	const outRoot = buildOutputRoot(cfg, host, mapped.out);
	fs.mkdirSync(outRoot, { recursive: true });
	console.log(`\n######## HOST ${host.toUpperCase()} → ${outRoot} ########`);

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

		// Prefer host-specific script when present; else HOST_MODE + generic build:*
		const envSuffix =
			args.env === 'development' || args.env === 'dev'
				? 'dev'
				: args.env === 'production' || args.env === 'prod'
					? 'prod'
					: 'staging';
		const preferred = `build:${host}:${envSuffix}`;
		const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
		const scriptName = pkg.scripts?.[preferred] ? preferred : mapped.npm;

		console.log(`\n== build ${app.id} [${scriptName}] HOST_MODE=${host} ==`);
		const result = spawnSync('npm', ['run', scriptName], {
			cwd: dir,
			stdio: 'inherit',
			shell: process.platform === 'win32',
			env: {
				...process.env,
				HOST_MODE: host,
			},
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

		for (const extra of ['shared.css', 'bp-shared.css', 'embed-loader.js']) {
			const p = path.join(dist, extra);
			if (fs.existsSync(p) && host === 'cms' && extra === 'embed-loader.js') {
				fs.copyFileSync(p, path.join(target, path.basename(p)));
			} else if (fs.existsSync(p) && extra !== 'embed-loader.js') {
				fs.copyFileSync(p, path.join(target, path.basename(p)));
			}
		}
		console.log(`Collected ${path.relative(ROOT, path.join(target, jsName))}`);
	}
}

if (failed) {
	console.error(`\n${failed} app build(s) failed.`);
	process.exit(1);
}
console.log(`\nDone. Host target(s): ${hosts.join(', ')}`);
