/**
 * Build e2e-results/fund-center-visual-report.pdf from e2e-results/e2e-captures.json + screenshots.
 * Run after: npx playwright test
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'e2e-results');
/** Matrix suite + click suite (see `e2e/fund-center-matrix.spec.ts`, `e2e/fund-center-tab-clicks.spec.ts`). */
const manifestFiles = ['e2e-captures-matrix.json', 'e2e-captures-clicks.json'];
const pdfPath = path.join(outDir, 'fund-center-visual-report.pdf');

function wrapText(text, font, fontSize, maxWidth) {
	const lines = [];
	const words = String(text).split(/\s+/).filter(Boolean);
	let line = '';
	for (const w of words) {
		const trial = line ? `${line} ${w}` : w;
		if (font.widthOfTextAtSize(trial, fontSize) <= maxWidth) {
			line = trial;
		} else {
			if (line) lines.push(line);
			line = w;
			if (font.widthOfTextAtSize(w, fontSize) > maxWidth) {
				let rest = w;
				while (rest.length) {
					let low = 1;
					let high = rest.length;
					let best = 1;
					while (low <= high) {
						const mid = Math.floor((low + high) / 2);
						if (font.widthOfTextAtSize(rest.slice(0, mid), fontSize) <= maxWidth) {
							best = mid;
							low = mid + 1;
						} else {
							high = mid - 1;
						}
					}
					if (best < 1) best = 1;
					lines.push(rest.slice(0, best));
					rest = rest.slice(best);
				}
				line = '';
			}
		}
	}
	if (line) lines.push(line);
	return lines;
}

async function main() {
	const sections = [];
	for (const file of manifestFiles) {
		const p = path.join(outDir, file);
		if (fs.existsSync(p)) {
			const manifest = JSON.parse(fs.readFileSync(p, 'utf8'));
			const captures = Array.isArray(manifest.captures) ? manifest.captures : [];
			if (captures.length) {
				sections.push({ label: file.replace(/\.json$/i, ''), manifest, captures });
			}
		}
	}
	if (sections.length === 0) {
		console.error(`Missing capture JSON in ${outDir}. Run: npm run test:e2e`);
		process.exit(1);
	}

	const doc = await PDFDocument.create();
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

	const pageW = 612;
	const pageH = 792;
	const margin = 40;
	const contentW = pageW - margin * 2;

	let page = doc.addPage([pageW, pageH]);
	let y = pageH - margin;

	const ensureSpace = (h) => {
		if (y - h < margin) {
			page = doc.addPage([pageW, pageH]);
			y = pageH - margin;
		}
	};

	const drawLines = (text, size, bold) => {
		const f = bold ? fontBold : font;
		for (const ln of wrapText(text, f, size, contentW)) {
			ensureSpace(size + 8);
			page.drawText(ln, {
				x: margin,
				y: y - size,
				size,
				font: f,
				color: rgb(0.08, 0.08, 0.1),
			});
			y -= size + 5;
		}
	};

	drawLines('Fund Center — E2E visual report', 16, true);
	drawLines(`Generated: ${new Date().toISOString()}`, 9, false);
	drawLines(
		`Sections: ${sections.map((s) => `${s.label} (${s.captures.length})`).join(' · ')}`,
		9,
		false,
	);
	y -= 8;

	for (const section of sections) {
		drawLines(`— ${section.label} —`, 12, true);
		drawLines(`Source: ${section.manifest.generatedAt || 'unknown'}`, 8, false);
		y -= 6;

		for (const cap of section.captures) {
			drawLines(cap.title || cap.id, 11, true);
			if (cap.ok === false) {
				drawLines('Status: FAILED', 9, true);
			} else {
				drawLines('Status: passed', 9, false);
			}
			drawLines(cap.description || '', 9, false);
			y -= 6;

			const imgPath = path.join(outDir, cap.image || '');
			if (fs.existsSync(imgPath)) {
				const bytes = fs.readFileSync(imgPath);
				let embedded;
				try {
					embedded = await doc.embedPng(bytes);
				} catch {
					try {
						embedded = await doc.embedJpg(bytes);
					} catch {
						drawLines('(Screenshot could not be embedded.)', 8, false);
						y -= 4;
						continue;
					}
				}
				const maxW = contentW;
				const scale = maxW / embedded.width;
				const dw = maxW;
				const dh = embedded.height * scale;
				ensureSpace(dh + 12);
				page.drawImage(embedded, {
					x: margin,
					y: y - dh,
					width: dw,
					height: dh,
				});
				y -= dh + 14;
			} else {
				drawLines(`(Missing image: ${cap.image})`, 8, false);
				y -= 4;
			}
			y -= 10;
		}
		y -= 6;
	}

	fs.writeFileSync(pdfPath, await doc.save());
	console.log(`PDF written: ${pdfPath}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
