/**
 * Optional Vite config: one JavaScript chunk + one CSS file (no vendor split).
 * Build: npm run build:single | build:staging:single | build:prod:single
 * Output: dist-build-single/bundle.js, bundle.css
 */
import { defineConfig } from 'vite';
import path from 'path';
import { createRequire } from 'module';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

const require = createRequire(import.meta.url);
const envConfig = require('./config/env.config.cjs');
const postcssScopeEmbed = require('./scripts/postcss-scope-embed.cjs');
const buildEnv = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
const config = envConfig.getConfig(buildEnv);

export default defineConfig(({ command }) => ({
	base: './',
	server: {
		watch: {
			ignored: ['**/e2e-results/**', '**/test-results/**'],
		},
	},
	css: {
		postcss: {
			plugins: [postcssScopeEmbed()],
		},
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
		'import.meta.env.VITE_EMBED_BASE_URL': JSON.stringify(config.embedBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_URL': JSON.stringify(config.apiBaseUrl),
		'import.meta.env.VITE_KURTOSYS_API_TOKEN': JSON.stringify(config.apiToken),
		'import.meta.env.VITE_EMBED_DEFAULT_FUNDLIST': JSON.stringify(config.defaultFundlist || ''),
		'import.meta.env.VITE_SUBADVISED_LANDING_URL': JSON.stringify(config.subadvisedLandingUrl || ''),
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
		outDir: 'dist-build-single',
		manifest: 'manifest.json',
		cssCodeSplit: false,
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
				entryFileNames: 'bundle.js',
				assetFileNames: (assetInfo) => {
					const name = assetInfo.name ?? '';
					if (name.endsWith('.css')) {
						return 'bundle.css';
					}
					if (name.endsWith('.ttf') || name.endsWith('.woff') || name.endsWith('.woff2') || name.endsWith('.otf')) {
						const fileName = name.split('/').pop() || name;
						return fileName;
					}
					return '[name][extname]';
				},
			},
		},
		chunkSizeWarningLimit: 5000,
	},
}));
