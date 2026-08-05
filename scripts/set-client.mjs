#!/usr/bin/env node
/**
 * Change the client slug across all app folders and studio.config.json.
 *
 * Usage:
 *   npm run client:set -- acme
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadConfig, saveConfig, folderName, appDir } from './lib.mjs';

const nextSlug = process.argv[2];
if (!nextSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(nextSlug)) {
	console.error('Usage: npm run client:set -- <clientSlug>');
	console.error('Example: npm run client:set -- acme');
	process.exit(1);
}

const cfg = loadConfig();
const prev = cfg.clientSlug;
if (prev === nextSlug) {
	console.log(`clientSlug already "${nextSlug}"`);
	process.exit(0);
}

for (const app of cfg.apps) {
	const oldDir = appDir(cfg, app.id);
	if (!fs.existsSync(oldDir)) {
		console.warn(`Skipping missing app folder: ${oldDir}`);
		continue;
	}
	cfg.clientSlug = nextSlug;
	const newDir = appDir(cfg, app.id);
	cfg.clientSlug = prev;
	if (fs.existsSync(newDir)) {
		console.error(`Refusing overwrite: ${newDir}`);
		process.exit(1);
	}
	fs.renameSync(oldDir, newDir);
	replaceInTree(newDir, `ksys-${prev}-`, `ksys-${nextSlug}-`);
	replaceInTree(newDir, prev, nextSlug);
	console.log(`${folderName({ ...cfg, clientSlug: prev }, app.id)} → ${path.basename(newDir)}`);
}

cfg.clientSlug = nextSlug;
saveConfig(cfg);
console.log(`Updated studio.config.json clientSlug: ${prev} → ${nextSlug}`);

function replaceInTree(root, from, to) {
	if (from === to) return;
	for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
		const full = path.join(root, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'dist-build' || entry.name === '.git') continue;
			replaceInTree(full, from, to);
			continue;
		}
		if (!/\.(tsx?|jsx?|cjs|mjs|json|html|css|md)$/i.test(entry.name)) continue;
		let text = fs.readFileSync(full, 'utf8');
		if (!text.includes(from)) continue;
		fs.writeFileSync(full, text.split(from).join(to));
	}
}
