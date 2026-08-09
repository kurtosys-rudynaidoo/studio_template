import { defineConfig, devices } from '@playwright/test';

const ciStrict = ['1', 'true', 'yes'].includes(String(process.env.CI ?? '').toLowerCase());
/** Cursor/agent shells often set `CI=true`; only GitHub Actions should force a brand-new webServer. */
const githubActions = process.env.GITHUB_ACTIONS === 'true';
/** Dedicated port so E2E does not fight `npm run dev` on 5174 or half-dead reused processes. */
const e2ePort = process.env.PLAYWRIGHT_E2E_PORT || '5199';
const e2eOrigin = `http://127.0.0.1:${e2ePort}`;

/**
 * Visual / smoke E2E for Fund Center (tab matrix, screenshots, PDF report).
 * Run: npm run test:e2e — starts Vite if nothing is listening on the URL.
 */
export default defineConfig({
	testDir: 'e2e',
	timeout: 15 * 60 * 1000,
	expect: { timeout: 60_000 },
	fullyParallel: false,
	forbidOnly: ciStrict,
	retries: 0,
	workers: 1,
	reporter: [['list'], ['html', { outputFolder: 'e2e-results/playwright-html', open: 'never' }]],
	use: {
		baseURL: process.env.PLAYWRIGHT_BASE_URL || e2eOrigin,
		trace: 'off',
		screenshot: 'off',
		video: 'off',
		...devices['Desktop Chrome'],
	},
	projects: [{ name: 'chromium', use: { channel: undefined } }],
	webServer: {
		command: `npx vite --host 127.0.0.1 --port ${e2ePort}`,
		url: e2eOrigin,
		reuseExistingServer: !githubActions,
		timeout: 120_000,
		stdout: 'pipe',
		stderr: 'pipe',
	},
});
