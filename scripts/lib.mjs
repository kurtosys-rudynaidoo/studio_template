import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');

export function loadConfig() {
	const cfgPath = path.join(ROOT, 'studio.config.json');
	return JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
}

export function saveConfig(cfg) {
	const cfgPath = path.join(ROOT, 'studio.config.json');
	fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, '\t') + '\n');
}

export function toCamel(raw) {
	return String(raw)
		.split(/[-_\s]+/)
		.filter(Boolean)
		.map((part, i) => (i === 0 ? part : part[0].toUpperCase() + part.slice(1)))
		.join('');
}

export function folderName(cfg, appId) {
	return `${cfg.appPrefix}-${cfg.clientSlug}-${toCamel(appId)}`;
}

export function appDir(cfg, appId) {
	return path.join(ROOT, cfg.appsRoot, folderName(cfg, appId));
}

export function assertAppExists(cfg, appId) {
	const dir = appDir(cfg, appId);
	if (!fs.existsSync(path.join(dir, 'package.json'))) {
		throw new Error(`App not found: ${appId} (${dir})`);
	}
	return dir;
}
