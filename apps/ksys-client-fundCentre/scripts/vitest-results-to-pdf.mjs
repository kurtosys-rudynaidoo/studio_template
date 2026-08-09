/**
 * Convert Vitest JSON report (vitest run --reporter=json --outputFile=...) to a simple PDF.
 * Usage: node scripts/vitest-results-to-pdf.mjs [input.json] [output.pdf]
 * Defaults: test-results/vitest-results.json -> test-results/vitest-report.pdf
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const inputPath = path.resolve(root, process.argv[2] || 'test-results/vitest-results.json');
const outputPath = path.resolve(root, process.argv[3] || 'test-results/vitest-report.pdf');

function fitLines(text, font, fontSize, maxWidth) {
	const lines = [];
	const words = String(text).split(/\s+/).filter(Boolean);
	let line = '';
	for (const w of words) {
		const trial = line ? `${line} ${w}` : w;
		if (font.widthOfTextAtSize(trial, fontSize) <= maxWidth) {
			line = trial;
		} else {
			if (line) {
				lines.push(line);
				line = '';
			}
			if (font.widthOfTextAtSize(w, fontSize) <= maxWidth) {
				line = w;
			} else {
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
			}
		}
	}
	if (line) lines.push(line);
	return lines;
}

async function main() {
	if (!fs.existsSync(inputPath)) {
		console.error(`Missing JSON report: ${inputPath}`);
		console.error('Run: npx vitest run --reporter=json --outputFile=test-results/vitest-results.json');
		process.exit(1);
	}

	const raw = fs.readFileSync(inputPath, 'utf8');
	const data = JSON.parse(raw);

	const doc = await PDFDocument.create();
	const font = await doc.embedFont(StandardFonts.Helvetica);
	const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

	const pageWidth = 612;
	const pageHeight = 792;
	const margin = 48;
	const contentWidth = pageWidth - margin * 2;
	let page = doc.addPage([pageWidth, pageHeight]);
	let y = pageHeight - margin;
	const lineHeight = (size) => size + 5;

	const draw = (text, opts = {}) => {
		const size = opts.size ?? 10;
		const bold = opts.bold ?? false;
		const indent = opts.indent ?? 0;
		const f = bold ? fontBold : font;
		const lines = fitLines(text, f, size, contentWidth - indent);
		for (const ln of lines) {
			if (y < margin + 40) {
				page = doc.addPage([pageWidth, pageHeight]);
				y = pageHeight - margin;
			}
			page.drawText(ln, {
				x: margin + indent,
				y: y - size,
				size,
				font: f,
				color: rgb(0.1, 0.1, 0.12),
			});
			y -= lineHeight(size);
		}
	};

	const stamp = new Date().toISOString();
	draw('Vitest test report', { size: 18, bold: true });
	draw(`Generated: ${stamp}`, { size: 9 });
	y -= 6;

	const passed = data.numPassedTests ?? 0;
	const failed = data.numFailedTests ?? 0;
	const pending = data.numPendingTests ?? 0;
	const total = data.numTotalTests ?? passed + failed + pending;
	const suites = data.numTotalTestSuites ?? 0;
	const ok = data.success !== false && failed === 0;

	draw(`Outcome: ${ok ? 'PASSED' : 'FAILED'}`, { size: 12, bold: true });
	draw(
		`Tests: ${passed} passed, ${failed} failed, ${pending} pending (${total} total) · Suites: ${suites}`,
		{ size: 10 },
	);
	y -= 10;

	draw('Results by file', { size: 12, bold: true });
	y -= 4;

	const results = Array.isArray(data.testResults) ? data.testResults : [];
	for (const fileResult of results) {
		const fileName = path.basename(fileResult.name || 'unknown');
		const fileStatus = fileResult.status || 'unknown';
		draw(`${fileName} — ${fileStatus}`, { size: 10, bold: true });
		const assertions = fileResult.assertionResults || [];
		for (const ar of assertions) {
			const mark = ar.status === 'passed' ? '[pass]' : ar.status === 'failed' ? '[fail]' : '[...]';
			const title = ar.title || ar.fullName || '';
			const dur = typeof ar.duration === 'number' ? ` (${ar.duration.toFixed(0)} ms)` : '';
			draw(`${mark} ${title}${dur}`, { size: 9, indent: 12 });
			if (Array.isArray(ar.failureMessages) && ar.failureMessages.length) {
				for (const msg of ar.failureMessages) {
					const cleaned = String(msg).replace(/\r/g, '').slice(0, 2000);
					draw(cleaned, { size: 8, indent: 20 });
				}
			}
		}
		y -= 6;
	}

	const dir = path.dirname(outputPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	const pdfBytes = await doc.save();
	fs.writeFileSync(outputPath, pdfBytes);
	console.log(`PDF written: ${outputPath}`);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
