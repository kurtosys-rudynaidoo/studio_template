const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const KEEP = ['appManager.js', 'shared.css', 'bp-shared.css'];

if (!fs.existsSync(distDir)) {
	process.exit(0);
}

const files = fs.readdirSync(distDir);
let removed = 0;

for (const file of files) {
	if (KEEP.includes(file)) continue;
	fs.rmSync(path.join(distDir, file), { recursive: true, force: true });
	removed++;
}

if (removed > 0) {
	console.log(
		`✅ Cleaned dist-build: kept ${KEEP.join(', ')}, removed ${removed} extra file(s)`,
	);
}
