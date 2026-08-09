#!/usr/bin/env node
import { loadConfig, folderName } from './lib.mjs';

const cfg = loadConfig();
console.log(`clientSlug: ${cfg.clientSlug}`);
console.log(`hostMode:   ${cfg.hostMode ?? '(not set — run npm run init)'}`);
if (cfg.hostMode === 'cms' || cfg.hostMode === 'both') {
	console.log(`cms:        ${cfg.cms?.platform || 'wordpress'}`);
}
console.log(`appsRoot:   ${cfg.appsRoot}`);
console.log('');
for (const app of cfg.apps) {
	const flag = app.required ? ' [required]' : '';
	console.log(`- ${app.id.padEnd(22)} ${folderName(cfg, app.id)}  :${app.port ?? '-'}${flag}`);
}
