import path from 'path';
import { createRequire } from 'module';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const require = createRequire(import.meta.url);
const envConfig = require('./config/env.config.cjs');
const buildEnv = process.env.BUILD_ENV || process.env.NODE_ENV || 'development';
const ksysCfg = envConfig.getConfig(
	['development', 'staging', 'production'].includes(buildEnv) ? buildEnv : 'development',
);

export default defineConfig({
	plugins: [react()],
	define: {
		'import.meta.env.VITE_EMBED_DEFAULT_FUNDLIST': JSON.stringify(ksysCfg.defaultFundlist || ''),
		'import.meta.env.VITE_SUBADVISED_LANDING_URL': JSON.stringify(ksysCfg.subadvisedLandingUrl || ''),
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/test/setup.ts'],
	},
});
