const path = require('path');
const postcss = require('postcss');
const { scopeAndInlineCss } = require('../../../scripts/scope-and-inline-css.cjs');
const { productScopeIds } = require('../../../scripts/embed-scope-ids.cjs');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const jsFile = path.join(distDir, 'appManager.js');

scopeAndInlineCss({
	postcss,
	distDir,
	jsFile,
	scopeIds: productScopeIds(path.resolve(__dirname, '../../..')),
});
