import { defineConfig } from 'vite';
import path from 'path';
import { createRequire } from 'module';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const require = createRequire(import.meta.url);
const envConfig = require('./config/env.config.cjs');
const buildEnv = process.env.BUILD_ENV || process.env.NODE_ENV || 'development';
const config = envConfig.getConfig(buildEnv);
const sharedStylesEmpty = path.resolve(__dirname, './config/shared-styles-empty.css');

/**
 * Host mode:
 * - dxm (default): React externalized — Kurtosys DXM / App Manager provides React
 * - cms: React bundled — self-contained for WordPress / Pantheon / custom CMS
 */
const hostMode = (process.env.HOST_MODE || 'dxm').toLowerCase();
const bundleReact = hostMode === 'cms';

const rollupOutput = {
	format: 'iife',
	entryFileNames: config.filename,
	assetFileNames: (assetInfo) => {
		const name = assetInfo.name ?? '';
		if (name.endsWith('.ttf') || name.endsWith('.woff') || name.endsWith('.woff2') || name.endsWith('.otf')) {
			const fileName = name.split('/').pop() || name;
			return fileName;
		}
		return '[name][extname]';
	},
};

if (!bundleReact) {
	rollupOutput.globals = {
		react: 'React',
		'react-dom': 'ReactDOM',
		'react-dom/client': 'ReactDOM',
		'react/jsx-runtime': '__REACT_JSX_RUNTIME',
		'react/jsx-dev-runtime': '__REACT_JSX_RUNTIME',
	};
}

export default defineConfig(({ command }) => ({
	base: './',
	server: {
		port: 5174,
		strictPort: false,
	},
	plugins: [
		react(),
		tailwindcss(),
		...(command === 'serve' ? [nodePolyfills()] : []),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@client/shared-styles': sharedStylesEmpty,
		},
	},
	define: {
		'import.meta.env.VITE_SHARED_CSS_URL': JSON.stringify(command === 'build' ? config.sharedCssUrl : ''),
		'import.meta.env.VITE_EMBED_BASE_URL': JSON.stringify(config.embedBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_URL': JSON.stringify(config.apiBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_TOKEN': JSON.stringify(config.apiToken),
		'import.meta.env.VITE_FUND_API_URL': JSON.stringify(config.fundApiBaseUrl),
		'import.meta.env.VITE_SAVED_SEARCH_TOKEN': JSON.stringify(config.savedSearchToken),
		'import.meta.env.VITE_CONTAINER_ID': JSON.stringify(config.containerId),
		'import.meta.env.VITE_HOST_MODE': JSON.stringify(hostMode),
		global: 'globalThis',
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
		},
	},
	build: {
		outDir: 'dist-build',
		cssCodeSplit: false,
		manifest: 'manifest.json',
		rollupOptions: {
			external: bundleReact
				? []
				: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
			output: rollupOutput,
		},
		chunkSizeWarningLimit: 1000,
	},
}));
