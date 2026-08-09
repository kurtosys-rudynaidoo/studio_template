/**
 * Click-driven tab checks (desktop + mobile). Separate file so Playwright gives a fresh test timeout
 * from the long URL matrix suite. Writes e2e-results/e2e-captures-clicks.json.
 */

import * as fs from 'fs';
import * as path from 'path';

import { expect, test } from '@playwright/test';

import { OUT_DIR, SHOTS, VIEWPORTS, fundCenterUrl } from './fund-center-visual-constants';

test.describe('Fund Center tab clicks (UI)', () => {
	test.beforeAll(() => {
		fs.mkdirSync(SHOTS, { recursive: true });
	});

	test('capture interactions after Performance → Mutual Fund → Materials', async ({ page, baseURL }) => {
		const captures: Array<{
			id: string;
			title: string;
			description: string;
			image: string;
			ok: boolean;
			error?: string;
		}> = [];

		const moduleTablistRef = () =>
			page.getByRole('tablist', {
				name: /Overview, performance, materials, or forms/i,
			});

		for (const vp of VIEWPORTS) {
			await page.setViewportSize({ width: vp.width, height: vp.height });
			await page.goto(fundCenterUrl(baseURL, 'separate-account', 'overview'), {
				waitUntil: 'domcontentloaded',
				timeout: 90_000,
			});
			const fundNav = page.getByRole('navigation', { name: 'Fund category' });
			await expect(fundNav).toBeVisible({ timeout: 60_000 });

			const pushClickShot = async (suffix: string, title: string, description: string, ok = true, err?: string) => {
				const slug = `${vp.name}__click__${suffix}`.replace(/[^a-z0-9-_]+/gi, '_');
				const shotRel = `screenshots/${slug}.png`;
				await page.screenshot({ path: path.join(OUT_DIR, shotRel), fullPage: false });
				captures.push({
					id: slug,
					title,
					description: err ? `${description} ${err}` : description,
					image: shotRel,
					ok,
					...(err ? { error: err } : {}),
				});
			};

			await pushClickShot(
				'inst-overview-start',
				`${vp.name} (UI clicks) — Institutional / Overview`,
				'Baseline before clicking module tabs; confirms app is ready at this viewport.',
			);

			await moduleTablistRef().getByRole('tab', { name: 'Performance', exact: true }).click();
			await expect(
				moduleTablistRef().getByRole('tab', { name: 'Performance', exact: true }),
			).toHaveAttribute('aria-selected', 'true', { timeout: 30_000 });
			await new Promise((r) => setTimeout(r, 800));
			await pushClickShot(
				'inst-performance',
				`${vp.name} (UI clicks) — Institutional / Performance`,
				'Clicked Performance tab; asserts aria-selected and captures performance layout.',
			);

			await page.evaluate(() => window.scrollTo(0, 0));
			const mutualFundTab = page.locator('#fund-type-tab-mutual-fund');
			const mfCount = await mutualFundTab.count();
			if (mfCount === 0) {
				await pushClickShot(
					'mf-skipped',
					`${vp.name} (UI clicks) — Mutual Fund (skipped)`,
					'Expected #fund-type-tab-mutual-fund in DOM for this build; tab missing — skipping switch.',
					false,
					'Mutual Fund tab not present',
				);
				continue;
			}

			await mutualFundTab.scrollIntoViewIfNeeded({ timeout: 30_000 });
			await mutualFundTab.click({ timeout: 30_000 });
			await expect(mutualFundTab).toHaveAttribute('aria-selected', 'true', { timeout: 30_000 });
			await new Promise((r) => setTimeout(r, 800));
			await pushClickShot(
				'mf-after-type-tab',
				`${vp.name} (UI clicks) — Mutual Fund (switched via fund-type tab)`,
				'Clicked Mutual Fund on the fund category row; module tabs should reflect mutual-fund modules.',
			);

			await moduleTablistRef().getByRole('tab', { name: 'Materials', exact: true }).click();
			await expect(
				moduleTablistRef().getByRole('tab', { name: 'Materials', exact: true }),
			).toHaveAttribute('aria-selected', 'true', { timeout: 30_000 });
			await new Promise((r) => setTimeout(r, 800));
			await pushClickShot(
				'mf-materials',
				`${vp.name} (UI clicks) — Mutual Fund / Materials`,
				'Clicked Materials after switching product; validates tab strip and materials panel without URL-only navigation.',
			);
		}

		const manifest = {
			generatedAt: new Date().toISOString(),
			baseURL: baseURL ?? null,
			captures,
		};
		fs.mkdirSync(OUT_DIR, { recursive: true });
		fs.writeFileSync(path.join(OUT_DIR, 'e2e-captures-clicks.json'), JSON.stringify(manifest, null, 2), 'utf8');
	});
});
