/**
 * URL-driven tab matrix: each fund type × module × viewport.
 * Writes e2e-results/e2e-captures-matrix.json (+ PNGs). Merge into PDF via npm run test:e2e:pdf.
 */

import * as fs from 'fs';
import * as path from 'path';

import { expect, test } from '@playwright/test';

import { MATRIX, MODULE_LABELS, OUT_DIR, SHOTS, VIEWPORTS, fundCenterUrl } from './fund-center-visual-constants';

test.describe('Fund Center URL tab matrix', () => {
	test.beforeAll(() => {
		fs.mkdirSync(SHOTS, { recursive: true });
	});

	test('capture each fund type, module, and viewport', async ({ page, baseURL }) => {
		const captures: Array<{
			id: string;
			title: string;
			description: string;
			image: string;
			ok: boolean;
			error?: string;
		}> = [];

		for (const vp of VIEWPORTS) {
			await page.setViewportSize({ width: vp.width, height: vp.height });

			for (const row of MATRIX) {
				for (const moduleId of row.modules) {
					const modLabel = MODULE_LABELS[moduleId] ?? moduleId;
					const id = `${vp.name}__${row.fundType}__${moduleId}`;
					const slug = id.replace(/[^a-z0-9-_]+/gi, '_');
					const shotRel = `screenshots/${slug}.png`;
					const shotAbs = path.join(OUT_DIR, shotRel);

					const title = `${vp.name} — ${row.fundTabName} — ${modLabel}`;
					const description =
						`Verifies URL state categoryTab/tab for ${row.fundType} / ${moduleId} renders the correct fund-type tab and module tab as selected, ` +
						`and the module panel is visible at ${vp.width}×${vp.height}. Viewport screenshot documents visible chrome and loaded content.`;

					try {
						const url = fundCenterUrl(baseURL, row.fundType, moduleId);
						await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 });

						const fundNav = page.getByRole('navigation', { name: 'Fund category' });
						await expect(fundNav).toBeVisible({ timeout: 60_000 });

						await expect(
							fundNav.getByRole('tab', { name: row.fundTabName, exact: true }),
						).toHaveAttribute('aria-selected', 'true', { timeout: 30_000 });

						const moduleTablist = page.getByRole('tablist', {
							name: /Overview, performance, materials, or forms/i,
						});
						await expect(moduleTablist).toBeVisible({ timeout: 30_000 });
						await expect(
							moduleTablist.getByRole('tab', { name: modLabel, exact: true }),
						).toHaveAttribute('aria-selected', 'true', { timeout: 30_000 });

						const panel = page.locator('#fund-center-module-panel');
						await expect(panel).toBeVisible({ timeout: 30_000 });

						await new Promise((r) => setTimeout(r, 800));
						await page.screenshot({ path: shotAbs, fullPage: false });

						captures.push({
							id: slug,
							title,
							description,
							image: shotRel,
							ok: true,
						});
					} catch (e) {
						const msg = e instanceof Error ? e.message : String(e);
						try {
							await page.screenshot({ path: shotAbs, fullPage: false });
						} catch {
							/* ignore second failure */
						}
						captures.push({
							id: slug,
							title: `${title} (failed)`,
							description: `${description} Failure: ${msg}`,
							image: shotRel,
							ok: false,
							error: msg,
						});
					}
				}
			}
		}

		const manifest = {
			generatedAt: new Date().toISOString(),
			baseURL: baseURL ?? null,
			captures,
		};
		fs.mkdirSync(OUT_DIR, { recursive: true });
		fs.writeFileSync(path.join(OUT_DIR, 'e2e-captures-matrix.json'), JSON.stringify(manifest, null, 2), 'utf8');
	});
});
