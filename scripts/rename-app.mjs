#!/usr/bin/env node
/**
 * Rename an app id (folder, package name, mount id, embed global, config entry).
 *
 * Usage:
 *   npm run apps:rename -- <oldId> <newId>
 *   npm run apps:rename -- literature materials
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadConfig, saveConfig, toCamel, folderName, assertAppExists } from './lib.mjs';

const oldRaw = process.argv[2];
const newRaw = process.argv[3];
if (!oldRaw || !newRaw) {
	console.error('Usage: npm run apps:rename -- <oldId> <newId>');
	process.exit(1);
}

const cfg = loadConfig();
const oldId = toCamel(oldRaw);
const newId = toCamel(newRaw);
const oldDir = assertAppExists(cfg, oldId);
const newFolder = folderName(cfg, newId);
const newDir = path.join(path.dirname(oldDir), newFolder);

if (fs.existsSync(newDir)) {
	console.error(`Target already exists: ${newDir}`);
	process.exit(1);
}
if (cfg.apps.some((a) => a.id === newId)) {
	console.error(`App id already registered: ${newId}`);
	process.exit(1);
}

fs.renameSync(oldDir, newDir);

replaceInTree(newDir, oldId, newId);
replaceInTree(newDir, folderName(cfg, oldId), newFolder);

const entry = cfg.apps.find((a) => a.id === oldId);
if (entry) {
	entry.id = newId;
	entry.label = entry.label || newId;
}
saveConfig(cfg);
console.log(`Renamed ${oldId} → ${newId}`);
console.log(`Folder: ${newFolder}`);

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
