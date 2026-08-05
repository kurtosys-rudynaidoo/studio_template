/**
 * Keep only deployable artifacts in dist-build/.
 * Removes scaffolding: index.html, vite.svg, manifests, embed-loader, etc.
 *
 * Kept:
 *   - config.filename (e.g. overview.js) — required
 *   - shared.css / bp-shared.css — optional shared stylesheet if present
 */
var fs = require('fs');
var path = require('path');
var envConfig = require('../config/env.config.cjs');

var env = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
var config = envConfig.getConfig(env);
var distDir = path.resolve(__dirname, '..', 'dist-build');

var KEEP = new Set(
	[config.filename, 'shared.css', 'bp-shared.css'].filter(Boolean),
);

function clean() {
	if (!fs.existsSync(distDir)) {
		console.warn('⚠️  dist-build not found — nothing to clean');
		return;
	}

	var kept = [];
	var removed = [];

	for (var entry of fs.readdirSync(distDir)) {
		var full = path.join(distDir, entry);
		var stat = fs.statSync(full);
		if (stat.isDirectory()) {
			fs.rmSync(full, { recursive: true, force: true });
			removed.push(entry + '/');
			continue;
		}
		if (KEEP.has(entry)) {
			kept.push(entry);
			continue;
		}
		fs.unlinkSync(full);
		removed.push(entry);
	}

	if (!fs.existsSync(path.join(distDir, config.filename))) {
		throw new Error(
			'clean-dist-artifacts: required bundle missing after clean: ' + config.filename,
		);
	}

	console.log(
		'✅ Cleaned dist-build: kept [' +
			kept.join(', ') +
			']' +
			(removed.length ? ', removed ' + removed.length + ' file(s)' : ''),
	);
}

clean();
