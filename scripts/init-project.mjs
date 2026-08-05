#!/usr/bin/env node
/**
 * First-run project setup. Choose the embed host up front so builds, docs,
 * and integration artifacts are factored correctly.
 *
 * Usage:
 *   npm run init
 *   npm run init -- --host dxm --client acme
 *   npm run init -- --host cms --client acme --cms-platform pantheon
 *   npm run init -- --host both --client acme
 *
 * host modes:
 *   dxm  — Kurtosys DXM / Studio (App Manager, external React, Studio GUIDs)
 *   cms  — External CMS (WordPress / Pantheon / custom). Self-contained bundle + integration specs
 *   both — Support both host targets from the same widget source
 */
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {
	ROOT,
	HOST_MODES,
	loadConfig,
	saveConfig,
	normalizeHostMode,
} from './lib.mjs';

function parseArgs(argv) {
	const out = { host: null, client: null, cmsPlatform: null, force: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--host') out.host = argv[++i];
		else if (a === '--client') out.client = argv[++i];
		else if (a === '--cms-platform') out.cmsPlatform = argv[++i];
		else if (a === '--force') out.force = true;
		else if (a === '--help' || a === '-h') out.help = true;
	}
	return out;
}

function printHelp() {
	console.log(`Usage: npm run init -- --host <dxm|cms|both> [--client <slug>] [--cms-platform wordpress|pantheon|custom]

Choose the embed host first. This writes studio.config.json hostMode and prepares
hosts/ + docs/integration-specs/ for that delivery model.`);
}

async function prompt(rl, question, fallback = '') {
	const suffix = fallback ? ` [${fallback}]` : '';
	const answer = (await rl.question(`${question}${suffix}: `)).trim();
	return answer || fallback;
}

function ensureHostScaffold(hostMode, cmsPlatform) {
	const hostsRoot = path.join(ROOT, 'hosts');
	fs.mkdirSync(path.join(hostsRoot, 'dxm'), { recursive: true });
	fs.mkdirSync(path.join(hostsRoot, 'cms'), { recursive: true });
	fs.mkdirSync(path.join(ROOT, 'docs', 'integration-specs'), { recursive: true });

	// Marker file so users see which mode is active
	const active = path.join(hostsRoot, 'ACTIVE_HOST_MODE.txt');
	fs.writeFileSync(
		active,
		[
			`hostMode=${hostMode}`,
			`cms.platform=${cmsPlatform || 'n/a'}`,
			`updated=${new Date().toISOString()}`,
			'',
			'DXM: Kurtosys DXM / Studio embeds (App Manager + applicationManager GUIDs)',
			'CMS: External WordPress / Pantheon / custom CMS embeds + integration specs',
			'both: same widget source, dual build outputs under BuildResult/dxm and BuildResult/cms',
			'',
		].join('\n'),
	);
}

async function main() {
	const args = parseArgs(process.argv.slice(2));
	if (args.help) {
		printHelp();
		return;
	}

	const cfg = loadConfig();
	if (cfg.hostMode && !args.force && !args.host) {
		console.log(`Already initialized with hostMode="${cfg.hostMode}".`);
		console.log('Re-run with --force or pass --host to change.');
		console.log(`  npm run init -- --host dxm|cms|both --force`);
		return;
	}

	let host = args.host;
	let client = args.client || cfg.clientSlug || 'client';
	let cmsPlatform = args.cmsPlatform || cfg.cms?.platform || 'wordpress';

	if (!host) {
		const rl = readline.createInterface({ input, output });
		console.log('\n=== Studio product-page project init ===\n');
		console.log('Where will these apps be embedded?\n');
		console.log('  1) dxm   — Kurtosys DXM / Studio (Elementor + App Manager)');
		console.log('  2) cms   — External client CMS (WordPress / Pantheon / custom)');
		console.log('  3) both  — Support both hosts from the same widget source\n');
		const choice = await prompt(rl, 'Choose host mode (dxm|cms|both)', cfg.hostMode || 'dxm');
		host = choice;
		client = await prompt(rl, 'Client slug (folder segment)', client);
		if (normalizeHostMode(host) === 'cms' || normalizeHostMode(host) === 'both') {
			cmsPlatform = await prompt(
				rl,
				'CMS platform (wordpress|pantheon|custom)',
				cmsPlatform,
			);
		}
		rl.close();
	}

	host = normalizeHostMode(host);
	cfg.hostMode = host;
	cfg.clientSlug = client;
	cfg.cms = {
		...(cfg.cms || {}),
		platform: cmsPlatform,
	};
	saveConfig(cfg);
	ensureHostScaffold(host, cmsPlatform);

	console.log('\nInitialized:');
	console.log(`  hostMode     = ${host}`);
	console.log(`  clientSlug   = ${client}`);
	if (host === 'cms' || host === 'both') {
		console.log(`  cms.platform = ${cmsPlatform}`);
	}
	console.log('\nNext:');
	if (client !== 'client') {
		console.log(`  npm run client:set -- ${client}`);
	}
	console.log('  # fill each app config/env.config.cjs GUIDs/tokens');
	console.log('  npm run apps:list');
	console.log(`  npm run build:staging`);
	if (host === 'cms' || host === 'both') {
		console.log('  # copy docs/integration-specs/_TEMPLATE.md per product page');
	}
	console.log('  open USER_GUIDE.html for the full walkthrough\n');
}

main().catch((err) => {
	console.error(err.message || err);
	process.exit(1);
});
