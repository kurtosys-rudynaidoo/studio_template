/**
 * Writes a distribution zip next to this repo folder (parent of package root).
 * Filename: ksys-client-fundCentre-v{package.json version}-{YYYYMMDD-HHmmss}.zip
 *
 * Uses the `archiver` library (not Windows `tar -a`) so the ZIP opens reliably in Explorer,
 * 7-Zip, and macOS. All paths are stored under one top-level folder for safe "Extract here".
 *
 * Excludes: node_modules, any .git directory, build/test output dirs, and *.zip under the package root.
 */
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const root = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

function localStamp() {
	const d = new Date();
	const p = (n) => String(n).padStart(2, '0');
	return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

/** Single folder name inside the zip (stable for handoff, regardless of disk path depth). */
const ZIP_ROOT = 'ksys-client-fundCentre';

const fileName = `ksys-client-fundCentre-v${pkg.version}-${localStamp()}.zip`;
const out = path.join(root, '..', fileName);
const outNorm = path.normalize(out);
const rootNorm = path.normalize(root);

/** Directory names omitted from handoff zips (build artifacts, deps, VCS). */
const OMIT_DIR_NAMES = new Set([
	'node_modules',
	'.git',
	'dist',
	'dist-build',
	'dist-build-single',
	'dist-ssr',
	'e2e-results',
	'test-results',
]);

/**
 * @param {string} rel relative path using path.sep from project root
 */
function shouldOmit(rel) {
	const segments = rel.split(path.sep);
	if (segments.some((segment) => OMIT_DIR_NAMES.has(segment))) return true;
	const base = segments[segments.length - 1];
	if (base && base.toLowerCase().endsWith('.zip')) return true;
	return false;
}

/**
 * @param {import('archiver').Archiver} archive
 * @param {string} dir absolute dir
 * @param {string} relFromRoot relative from project root ('' for root)
 */
function addTree(archive, dir, relFromRoot) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const ent of entries) {
		const full = path.join(dir, ent.name);
		const rel = relFromRoot ? path.join(relFromRoot, ent.name) : ent.name;
		if (shouldOmit(rel)) continue;
		let st;
		try {
			st = fs.statSync(full);
		} catch {
			continue;
		}
		const nameInZip = `${ZIP_ROOT}/${rel.split(path.sep).join('/')}`;
		if (st.isDirectory()) {
			addTree(archive, full, rel);
		} else if (st.isFile()) {
			archive.file(full, { name: nameInZip });
		}
	}
}

async function main() {
	if (fs.existsSync(outNorm)) {
		fs.unlinkSync(outNorm);
	}

	const output = fs.createWriteStream(outNorm);
	const archive = archiver('zip', { zlib: { level: 9 } });

	const finished = new Promise((resolve, reject) => {
		output.on('close', resolve);
		output.on('error', reject);
		archive.on('error', reject);
	});

	archive.pipe(output);
	addTree(archive, rootNorm, '');
	await archive.finalize();
	await finished;

	// eslint-disable-next-line no-console
	console.log(`Created ${outNorm} (${archive.pointer()} bytes)`);
}

main().catch((err) => {
	// eslint-disable-next-line no-console
	console.error(err);
	process.exit(1);
});
