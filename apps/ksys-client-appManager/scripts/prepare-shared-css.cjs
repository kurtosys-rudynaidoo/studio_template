const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssScopeEmbed = require('../../../scripts/postcss-scope-embed.cjs');
const { productScopeIds } = require('../../../scripts/embed-scope-ids.cjs');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const repoRoot = path.resolve(__dirname, '../../..');
const SHARED_NAME = 'shared.css';

/**
 * Consolidate Vite-emitted CSS into shared.css for co-deployment with appManager.js.
 * Unlayer and ID-scope it so a host theme's unlayered element rules do not win.
 * inline-css.cjs skips shared.css so it is not injected into the JS bundle.
 */
function prepareSharedCss() {
	if (!fs.existsSync(distDir)) {
		console.log('⚠️  dist-build not found, skipping prepare-shared-css');
		return;
	}

	const legacyAlias = path.join(distDir, 'bp-shared.css');
	if (fs.existsSync(legacyAlias)) fs.unlinkSync(legacyAlias);

	const cssFiles = fs.readdirSync(distDir).filter((file) => file.endsWith('.css') && file !== SHARED_NAME);
	if (cssFiles.length === 0) {
		console.log('⚠️  prepare-shared-css: no emitted CSS files found');
		return;
	}

	let combined = '';
	for (const file of cssFiles) {
		combined += fs.readFileSync(path.join(distDir, file), 'utf8');
	}

	const scopeIds = productScopeIds(repoRoot);
	combined = postcss([postcssScopeEmbed({ scopeIds })]).process(combined, { from: SHARED_NAME }).css;
	if (combined.includes('@layer')) {
		throw new Error('prepare-shared-css: @layer survived in shared.css');
	}

	fs.writeFileSync(path.join(distDir, SHARED_NAME), combined, 'utf8');
	for (const file of cssFiles) {
		fs.unlinkSync(path.join(distDir, file));
	}
	console.log(`✅ Wrote ${SHARED_NAME} from ${cssFiles.length} file(s)`);
}

prepareSharedCss();
