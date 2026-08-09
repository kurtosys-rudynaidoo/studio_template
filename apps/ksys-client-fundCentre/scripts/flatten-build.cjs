const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', process.env.DIST_BUILD_DIR || 'dist-build');

/**
 * Flatten build structure - move all files from subfolders to root
 * This ensures all files can be served from a flat URL structure
 * for embedding on 3rd party sites
 */
function flattenBuild() {
	if (!fs.existsSync(distDir)) {
		console.log(`⚠️  ${process.env.DIST_BUILD_DIR || 'dist-build'} directory not found, skipping flatten`);
		return;
	}

	let movedCount = 0;

	function processDirectory(dir) {
		if (!fs.existsSync(dir)) {
			return;
		}

		const entries = fs.readdirSync(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);
			const relativePath = path.relative(distDir, fullPath);

			// Handle .vite directory specially - move manifest.json and remove directory
			if (entry.isDirectory() && entry.name === '.vite') {
				const viteManifestPath = path.join(fullPath, 'manifest.json');
				if (fs.existsSync(viteManifestPath)) {
					const rootManifestPath = path.join(distDir, 'manifest.json');
					// Only copy if root manifest doesn't exist
					if (!fs.existsSync(rootManifestPath)) {
						fs.copyFileSync(viteManifestPath, rootManifestPath);
						movedCount++;
						console.log(`  Moved manifest.json from .vite/ to root`);
					}
				}
				// Remove .vite directory
				fs.rmSync(fullPath, { recursive: true, force: true });
				continue;
			}

			// If it's a directory (and not .vite), recurse into it first
			if (entry.isDirectory()) {
				processDirectory(fullPath);
				// After processing, try to remove if empty
				try {
					if (fs.existsSync(fullPath)) {
						const remaining = fs.readdirSync(fullPath);
						if (remaining.length === 0) {
							fs.rmdirSync(fullPath);
							console.log(`  Removed empty directory: ${path.relative(distDir, fullPath)}`);
						}
					}
				} catch (err) {
					// Directory might not be empty or might have been removed already
				}
				continue;
			}

			// If it's a file and we're not in the root directory, move it to root
			if (entry.isFile() && dir !== distDir) {
				const fileName = entry.name;
				const rootPath = path.join(distDir, fileName);

				// Handle name conflicts (shouldn't happen, but just in case)
				if (fs.existsSync(rootPath)) {
					console.log(`  ⚠️  Skipping ${relativePath} - file already exists in root`);
					continue;
				}

				fs.renameSync(fullPath, rootPath);
				movedCount++;
				console.log(`  Moved ${relativePath} to ${fileName}`);
			}
		}
	}

	console.log('🔄 Flattening build structure...');
	processDirectory(distDir);

	if (movedCount > 0) {
		console.log(`✅ Flattened build structure: moved ${movedCount} file(s) to root`);
	} else {
		console.log('✅ Build structure is already flat');
	}
}

flattenBuild();
