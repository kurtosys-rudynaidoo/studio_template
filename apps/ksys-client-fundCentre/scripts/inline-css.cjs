const path = require('path');
const postcss = require('postcss');
const { getConfig } = require('../config/env.config.cjs');
const { scopeAndInlineCss } = require('../../../scripts/scope-and-inline-css.cjs');

const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
const config = getConfig(env);
const distDir = path.resolve(__dirname, '..', 'dist-build');
const jsFile = path.join(distDir, config.filename);
const scopeIds = [
	...new Set([config.containerId, 'fundCenter', 'your-app-container', `${config.containerId}-portal`]),
];

scopeAndInlineCss({ postcss, distDir, jsFile, scopeIds });
