#!/usr/bin/env node
/**
 * Build every registered app for an environment and host target(s).
 *
 * Usage:
 *   npm run build:stg
 *   node scripts/build-all.mjs stg
 *   node scripts/build-all.mjs stg --host cms
 *
 * Outputs:
 *   BuildResult/<host>/<env>/<appId>/<appId>.js
 *   BuildResult/<host>/<env>/appManager/shared.css
 * Never bp-shared.css.
 *
 * Env abbreviations: dev (development), stg (staging), prd (production)
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
	dev: { npm: 'build:dev', out: 'dev', buildEnv: 'dev' },
	development: { npm: 'build:dev', out: 'dev', buildEnv: 'dev' },
	stg: { npm: 'build:stg', out: 'stg', buildEnv: 'stg' },
	staging: { npm: 'build:stg', out: 'stg', buildEnv: 'stg' },
	prd: { npm: 'build:prd', out: 'prd', buildEnv: 'prd' },
	prod: { npm: 'build:prd', out: 'prd', buildEnv: 'prd' },
	production: { npm: 'build:prd', out: 'prd', buildEnv: 'prd' },
};

function parseArgs(argv) {
	const out = { env: 'stg', host: null };
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
	console.error(`Unknown env: ${args.env}. Use dev|stg|prd`);
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

const envSuffix =
	mapped.out === 'dev' ? 'dev' : mapped.out === 'prd' ? 'prd' : 'stg';

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
				BUILD_ENV: mapped.buildEnv,
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

		if (fs.existsSync(path.join(dist, 'bp-shared.css'))) {
			console.error(`${app.id} emitted bp-shared.css. App Manager publishes shared.css only.`);
			failed += 1;
			continue;
		}

		const sharedCss = path.join(dist, 'shared.css');
		if (fs.existsSync(sharedCss)) fs.copyFileSync(sharedCss, path.join(target, 'shared.css'));

		// Ensure BuildResult folder only has deployables
		for (const entry of fs.readdirSync(target)) {
			if (entry === jsName || entry === 'shared.css') continue;
			fs.rmSync(path.join(target, entry), { recursive: true, force: true });
		}

		console.log(`Collected ${path.relative(ROOT, path.join(target, jsName))}`);
	}
}

if (failed) {
	console.error(`\n${failed} app build(s) failed.`);
	process.exit(1);
}
console.log(`\nDone. Host target(s): ${hosts.join(', ')} · env: ${mapped.out}`);
