const postcss = require('postcss');
const { getConfig } = require('../config/env.config.cjs');
const { scopeAndInlineCss } = require('./scope-and-inline-css.cjs');

const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
const config = getConfig(env);
const distDir = require('path').resolve(__dirname, '..', 'dist-build');
const jsFile = require('path').join(distDir, config.filename);

scopeAndInlineCss({
	postcss,
	distDir,
	jsFile,
	scopeIds: [config.containerId, `${config.containerId}-portal`],
});
