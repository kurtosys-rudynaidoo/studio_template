const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const KEEP = ['appManager.js', 'shared.css'];

if (!fs.existsSync(distDir)) {
	process.exit(0);
}

const legacy = path.join(distDir, 'bp-shared.css');
if (fs.existsSync(legacy)) fs.unlinkSync(legacy);

const files = fs.readdirSync(distDir);
let removed = 0;

for (const file of files) {
	if (KEEP.includes(file) || file === 'bp-shared.css') continue;
	fs.rmSync(path.join(distDir, file), { recursive: true, force: true });
	removed++;
}

if (fs.existsSync(legacy)) {
	throw new Error('clean-dist: bp-shared.css must not be emitted');
}

if (removed > 0) {
	console.log(`✅ Cleaned dist-build: kept ${KEEP.join(', ')}, removed ${removed} extra file(s)`);
}
