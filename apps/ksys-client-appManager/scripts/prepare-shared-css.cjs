const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const SHARED_NAME = 'shared.css';
/** Optional alias kept for hosts that still expect the older filename. */
const SHARED_ALIAS = 'bp-shared.css';

/**
 * Consolidate Vite-emitted CSS into shared.css for co-deployment with appManager.js.
 * inline-css.cjs skips shared.css so it is not injected into the JS bundle.
 */
function prepareSharedCss() {
	if (!fs.existsSync(distDir)) {
		console.log('⚠️  dist-build not found, skipping prepare-shared-css');
		return;
	}

	const cssFiles = fs
		.readdirSync(distDir)
		.filter((f) => f.endsWith('.css') && f !== SHARED_NAME && f !== SHARED_ALIAS);

	if (cssFiles.length === 0) {
		console.log('⚠️  prepare-shared-css: no emitted CSS files found');
		return;
	}

	let combined = '';
	for (const f of cssFiles) {
		combined += fs.readFileSync(path.join(distDir, f), 'utf8');
	}

	fs.writeFileSync(path.join(distDir, SHARED_NAME), combined, 'utf8');
	fs.writeFileSync(path.join(distDir, SHARED_ALIAS), combined, 'utf8');

	for (const f of cssFiles) {
		fs.unlinkSync(path.join(distDir, f));
	}

	console.log(
		`✅ Wrote ${SHARED_NAME} (+ ${SHARED_ALIAS} alias) from ${cssFiles.length} file(s)`,
	);
}

prepareSharedCss();
