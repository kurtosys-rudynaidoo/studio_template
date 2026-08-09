#!/usr/bin/env node
/**
 * Rename an app id (folder, package, mount, embed global, registry) and rewrite
 * in-repo references that describe that app.
 *
 * Usage:
 *   npm run apps:rename -- <oldId> <newId>
 *
 * Example (do not copy ids into this file as live replace targets):
 *   npm run apps:rename -- literature materials
 *
 * Outside the repo (DXM / CMS / CDN), update mounts and script URLs manually —
 * this script prints a checklist when it finishes.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
	ROOT,
	loadConfig,
	saveConfig,
	toCamel,
	folderName,
	assertAppExists,
} from './lib.mjs';

const SKIP_DIRS = new Set([
	'node_modules',
	'.git',
	'dist',
	'dist-build',
	'.cursor',
	'__pycache__',
	'ksys-studio-widget-template',
	'scripts',
]);

const SKIP_FILES = new Set(['USER_GUIDE.html', 'USER_GUIDE.pdf']);

const TEXT_EXT =
	/\.(tsx?|jsx?|cjs|mjs|json|html?|css|md|txt|svg|yml|yaml)$/i;

const oldRaw = process.argv[2];
const newRaw = process.argv[3];
if (!oldRaw || !newRaw) {
	console.error('Usage: npm run apps:rename -- <oldId> <newId>');
	process.exit(1);
}

const cfg = loadConfig();
const oldId = toCamel(oldRaw);
const newId = toCamel(newRaw);
if (oldId === newId) {
	console.error('oldId and newId are the same after normalization');
	process.exit(1);
}
if (oldId === 'appManager' || newId === 'appManager') {
	console.error(
		'appManager is a required default app and cannot be renamed. Keep ksys-<client>-appManager.',
	);
	process.exit(1);
}

const oldFolder = folderName(cfg, oldId);
const newFolder = folderName(cfg, newId);
const oldDir = assertAppExists(cfg, oldId);
const newDir = path.join(path.dirname(oldDir), newFolder);

if (fs.existsSync(newDir)) {
	console.error(`Target already exists: ${newDir}`);
	process.exit(1);
}
if (cfg.apps.some((a) => a.id === newId)) {
	console.error(`App id already registered: ${newId}`);
	process.exit(1);
}

const changed = [];

fs.renameSync(oldDir, newDir);
changed.push(`${oldFolder}/ → ${newFolder}/`);
renameBuildResultDirs(cfg, oldId, newId, changed);

// Inside the renamed app: full token replace (safe — this is that app's tree).
replaceInTree(newDir, oldFolder, newFolder, changed);
replaceInTree(newDir, oldId, newId, changed);

// Elsewhere in the monorepo: only contextual / path-safe references.
replaceAcrossRepo(ROOT, oldFolder, newFolder, changed, { bareId: false });
replaceAcrossRepo(ROOT, oldId, newId, changed, { bareId: true });

const entry = cfg.apps.find((a) => a.id === oldId);
if (entry) {
	entry.id = newId;
	entry.label = humanize(newId);
}
saveConfig(cfg);
changed.push('studio.config.json');

const uniqueChanged = [...new Set(changed)].sort();
const leftovers = findLeftovers(ROOT, oldId, oldFolder, newDir);

console.log(`\nRenamed ${oldId} → ${newId}`);
console.log(`Folder: ${oldFolder} → ${newFolder}`);
console.log(`In-repo paths updated: ${uniqueChanged.length}`);
for (const rel of uniqueChanged.slice(0, 40)) console.log(`  · ${rel}`);
if (uniqueChanged.length > 40) {
	console.log(`  · … +${uniqueChanged.length - 40} more`);
}

if (leftovers.length) {
	console.log(
		`\nStill mentions old name inside the repo (${leftovers.length}) — review & update:`,
	);
	for (const rel of leftovers.slice(0, 25)) console.log(`  ! ${rel}`);
	if (leftovers.length > 25) {
		console.log(`  ! … +${leftovers.length - 25} more`);
	}
} else {
	console.log('\nNo remaining in-repo project references to the old name.');
}

console.log(`
Outside the repo — update anything that still uses "${oldId}" to "${newId}":
  · DXM / Elementor / App Manager mount nodes  (id="${oldId}" → id="${newId}")
  · Script / CDN URLs                         (${oldId}.js → ${newId}.js)
  · Studio child-app / GUID wiring that names the old file
  · WordPress / Pantheon / CMS embeds and tag-manager snippets
  · Any Confluence / ticket docs that cite the old mount or filename

Rename is only clear when the old name is gone both in this repo and on the host pages.
`);

function humanize(id) {
	return id
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^./, (c) => c.toUpperCase());
}

function renameBuildResultDirs(cfg, fromId, toId, changedOut) {
	const root = path.join(ROOT, cfg.buildResultRoot || 'BuildResult');
	if (!fs.existsSync(root)) return;
	walkDirs(root, (dir) => {
		if (path.basename(dir) !== fromId) return;
		const dest = path.join(path.dirname(dir), toId);
		if (fs.existsSync(dest)) {
			console.warn(
				`BuildResult target exists, skipped: ${path.relative(ROOT, dest)}`,
			);
			return;
		}
		fs.renameSync(dir, dest);
		changedOut.push(`${path.relative(ROOT, dir)}/ → ${toId}/`);
	});
}

function walkDirs(dir, onDir) {
	if (!fs.existsSync(dir)) return;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		onDir(full);
		walkDirs(full, onDir);
	}
}

function replaceInTree(root, from, to, changedOut) {
	if (from === to) return;
	for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
		const full = path.join(root, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'dist-build') continue;
			replaceInTree(full, from, to, changedOut);
			continue;
		}
		if (!TEXT_EXT.test(entry.name)) continue;
		rewriteFile(full, (text) => text.split(from).join(to), changedOut);
	}
}

/**
 * Repo-wide updates.
 * - Folder names: always safe to replace as substrings.
 * - Bare app ids: only contextual forms (mounts, files, JSON ids, etc.) so we
 *   do not rewrite unrelated prose or other apps' MONOREPO suggestion tables.
 */
function replaceAcrossRepo(root, from, to, changedOut, { bareId }) {
	if (from === to) return;
	scan(root);

	function scan(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (SKIP_DIRS.has(entry.name)) continue;
				// Already fully rewritten inside the renamed app folder.
				if (path.resolve(full) === path.resolve(newDir)) continue;
				scan(full);
				continue;
			}
			if (SKIP_FILES.has(entry.name)) continue;
			if (!TEXT_EXT.test(entry.name)) continue;

			// Generic MONOREPO suggestion tables in other apps keep starter names.
			if (
				entry.name === 'MONOREPO.md' &&
				path.resolve(path.dirname(full)) !== path.resolve(newDir)
			) {
				continue;
			}

			if (!bareId) {
				rewriteFile(full, (text) => text.split(from).join(to), changedOut);
				continue;
			}

			rewriteFile(full, (text) => replaceBareAppId(text, from, to), changedOut);
		}
	}
}

function replaceBareAppId(text, from, to) {
	if (!text.includes(from)) return text;
	let out = text;
	const pairs = [
		[`"id": "${from}"`, `"id": "${to}"`],
		[`'id': '${from}'`, `'id': '${to}'`],
		[`id="${from}"`, `id="${to}"`],
		[`id='${from}'`, `id='${to}'`],
		[`#${from}`, `#${to}`],
		[`${from}.js`, `${to}.js`],
		[`/${from}/`, `/${to}/`],
		[`\`${from}\``, `\`${to}\``],
		[`window.${from}`, `window.${to}`],
		[`'${from}'`, `'${to}'`],
		[`"${from}"`, `"${to}"`],
	];
	for (const [a, b] of pairs) {
		if (out.includes(a)) out = out.split(a).join(b);
	}
	return out;
}

function rewriteFile(full, transform, changedOut) {
	let text;
	try {
		text = fs.readFileSync(full, 'utf8');
	} catch {
		return;
	}
	const next = transform(text);
	if (next === text) return;
	fs.writeFileSync(full, next);
	changedOut.push(path.relative(ROOT, full));
}

function findLeftovers(root, oldId, oldFolder, renamedAppDir) {
	const hits = [];
	scan(root);
	return hits;

	function scan(dir) {
		for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				if (SKIP_DIRS.has(entry.name)) continue;
				scan(full);
				continue;
			}
			if (SKIP_FILES.has(entry.name)) continue;
			if (!TEXT_EXT.test(entry.name)) continue;
			// Generic suggestion tables in other apps still list starter names — OK.
			const rel = path.relative(ROOT, full);
			if (
				rel.endsWith('MONOREPO.md') &&
				path.resolve(path.dirname(full)) !== path.resolve(renamedAppDir)
			) {
				continue;
			}
			let text;
			try {
				text = fs.readFileSync(full, 'utf8');
			} catch {
				continue;
			}
			if (text.includes(oldFolder) || hasProjectRef(text, oldId)) {
				hits.push(rel);
			}
		}
	}
}

function hasProjectRef(text, id) {
	return (
		text.includes(`"id": "${id}"`) ||
		text.includes(`id="${id}"`) ||
		text.includes(`#${id}`) ||
		text.includes(`${id}.js`) ||
		text.includes(`/${id}/`) ||
		text.includes(`window.${id}`) ||
		text.includes(`\`${id}\``)
	);
}
