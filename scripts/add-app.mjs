#!/usr/bin/env node
/**
 * Add a new app from the widget template and register it in studio.config.json.
 *
 * Usage:
 *   npm run apps:add -- <appId> [port]
 *   npm run apps:add -- holdingsExposure 5178
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, loadConfig, saveConfig, toCamel, folderName, appDir } from './lib.mjs';

const appId = process.argv[2];
const portArg = process.argv[3];

if (!appId) {
	console.error('Usage: npm run apps:add -- <appId> [port]');
	process.exit(1);
}

const cfg = loadConfig();
const camel = toCamel(appId);
if (cfg.apps.some((a) => a.id === camel || a.id === appId)) {
	console.error(`App already registered: ${appId}`);
	process.exit(1);
}

const usedPorts = new Set(cfg.apps.map((a) => a.port).filter(Boolean));
let port = portArg ? Number(portArg) : 5173;
if (!portArg) {
	while (usedPorts.has(port)) port += 1;
}

const template = path.resolve(ROOT, cfg.widgetTemplatePath);
const scaffold = path.join(template, 'scripts', 'scaffold-app.sh');
if (!fs.existsSync(scaffold)) {
	console.error(`Widget template scaffold not found: ${scaffold}`);
	console.error('Set studio.config.json widgetTemplatePath to ksys-studio-widget-template');
	process.exit(1);
}

const appsRootAbs = path.join(ROOT, cfg.appsRoot);
const result = spawnSync('bash', [scaffold, cfg.clientSlug, camel, appsRootAbs], {
	stdio: 'inherit',
});
if (result.status !== 0) process.exit(result.status ?? 1);

const dir = appDir(cfg, camel);
customizeApp(dir, camel, port, humanize(camel));

cfg.apps.push({ id: camel, label: humanize(camel), port });
saveConfig(cfg);
console.log(`Registered ${camel} in studio.config.json`);

function humanize(id) {
	return id
		.replace(/([a-z])([A-Z])/g, '$1 $2')
		.replace(/^./, (c) => c.toUpperCase());
}

function customizeApp(dir, id, port, label) {
	const vitePath = path.join(dir, 'vite.config.ts');
	if (fs.existsSync(vitePath)) {
		let s = fs.readFileSync(vitePath, 'utf8');
		s = s.replace(/port:\s*\d+/, `port: ${port}`);
		fs.writeFileSync(vitePath, s);
	}

	const widgetPath = path.join(dir, 'src/components/Widget/Widget.tsx');
	if (fs.existsSync(widgetPath)) {
		let s = fs.readFileSync(widgetPath, 'utf8');
		s = s.replace(/(\n\t\t\t\t\t)Studio Widget(\n)/, `$1${label}$2`);
		if (s.includes('Studio Widget')) s = s.replace('Studio Widget', label);
		fs.writeFileSync(widgetPath, s);
	}

	const testPath = path.join(dir, 'src/components/App/App.test.tsx');
	if (fs.existsSync(testPath)) {
		let s = fs.readFileSync(testPath, 'utf8');
		s = s.replace(/Studio Widget/g, label);
		fs.writeFileSync(testPath, s);
	}

	console.log(`Customized ${folderName(cfg, id)} (port ${port})`);
}
