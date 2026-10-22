import { defineConfig } from 'vite';
import path from 'path';
import { createRequire } from 'module';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const require = createRequire(import.meta.url);
const envConfig = require('./config/env.config.cjs');
const buildEnv = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
const config = envConfig.getConfig(buildEnv);

const hostMode = (process.env.HOST_MODE || 'dxm').toLowerCase();
const bundleReact = hostMode === 'cms';
const guids = config.childAppGuids || {};

const rollupOutput: Record<string, unknown> = {
	format: 'iife',
	entryFileNames: config.filename,
	assetFileNames: (assetInfo: { name?: string }) => {
		const name = assetInfo.name ?? '';
		if (
			name.endsWith('.ttf') ||
			name.endsWith('.woff') ||
			name.endsWith('.woff2') ||
			name.endsWith('.otf')
		) {
			return name.split('/').pop() || name;
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
		port: 5170,
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
		},
	},
	define: {
		'import.meta.env.VITE_SHARED_CSS_URL': JSON.stringify(
			command === 'build' ? config.sharedCssUrl : '',
		),
		'import.meta.env.VITE_EMBED_BASE_URL': JSON.stringify(config.embedBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_URL': JSON.stringify(config.apiBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_TOKEN': JSON.stringify(config.apiToken),
		'import.meta.env.VITE_FUNDPRESS_API_URL': JSON.stringify(config.fundpressUrl),
		'import.meta.env.VITE_SAVED_SEARCH_TOKEN': JSON.stringify(config.savedSearchToken),
		'import.meta.env.VITE_CONTAINER_ID': JSON.stringify(config.containerId),
		'import.meta.env.VITE_HOST_MODE': JSON.stringify(hostMode),
		'import.meta.env.VITE_GUID_PAGE_HEADER': JSON.stringify(guids.pageHeader || ''),
		'import.meta.env.VITE_GUID_OVERVIEW': JSON.stringify(guids.overview || ''),
		'import.meta.env.VITE_GUID_PERFORMANCE': JSON.stringify(guids.performance || ''),
		'import.meta.env.VITE_GUID_PORTFOLIO_BREAKDOWN': JSON.stringify(
			guids.portfolioBreakdown || '',
		),
		'import.meta.env.VITE_GUID_LITERATURE': JSON.stringify(guids.literature || ''),
		global: 'globalThis',
	},
	optimizeDeps: {
		esbuildOptions: {
			define: { global: 'globalThis' },
		},
	},
	// Strip debug logging from minified builds; warn/error stay for support (Secure Delivery 5.1).
	esbuild: { pure: ['console.log', 'console.info', 'console.debug'] },
	build: {
		outDir: 'dist-build',
		cssCodeSplit: false,
		manifest: 'manifest.json',
		rollupOptions: {
			external: bundleReact
				? []
				: [
						'react',
						'react-dom',
						'react-dom/client',
						'react/jsx-runtime',
						'react/jsx-dev-runtime',
					],
			output: rollupOutput,
		},
		chunkSizeWarningLimit: 1500,
	},
}));
