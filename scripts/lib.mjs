import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..');

export const HOST_MODES = ['dxm', 'cms', 'both'];

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

export function normalizeHostMode(raw) {
	const mode = String(raw || '')
		.trim()
		.toLowerCase();
	if (!HOST_MODES.includes(mode)) {
		throw new Error(`Invalid hostMode "${raw}". Use: ${HOST_MODES.join(' | ')}`);
	}
	return mode;
}

/** Resolve which host targets to build for this run. */
export function resolveHostTargets(cfg, override) {
	const mode = override ? normalizeHostMode(override) : cfg.hostMode;
	if (!mode) {
		throw new Error(
			'hostMode is not set. Run `npm run init` first (or pass --host dxm|cms|both).',
		);
	}
	if (mode === 'both') return ['dxm', 'cms'];
	return [mode];
}

export function buildOutputRoot(cfg, host, envOut) {
	const base = path.join(ROOT, cfg.buildResultRoot || 'BuildResult');
	// BuildResult/<host>/<env>/<appId>/
	return path.join(base, host, envOut);
}
