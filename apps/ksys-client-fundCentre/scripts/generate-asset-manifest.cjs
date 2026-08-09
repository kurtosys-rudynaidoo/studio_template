const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { getConfig } = require('../config/env.config.cjs');

const distDir = path.resolve(__dirname, '..', process.env.DIST_BUILD_DIR || 'dist-build');
const manifestPath = path.join(distDir, 'manifest.json');
const assetsDir = distDir;

const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'development';
const config = getConfig(env);
const isSingleBundle = process.env.VITE_SINGLE_BUNDLE === '1';
const expectedAppFile = isSingleBundle ? 'bundle.js' : config.filename;
const expectedStylesFile = isSingleBundle
	? 'bundle.css'
	: `styles-${config.filename.replace('.js', '')}.css`;

function generateManifest() {
  // Read Vite's manifest if it exists
  let viteManifest = {};
  if (fs.existsSync(manifestPath)) {
    viteManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }

  const cleanManifest = {
    app: null,
    vendor: [],
    styles: null,
    allFiles: []
  };

  const excludedFiles = ['vite.svg', '.vite', 'manifest.json', 'index.html'];
  const excludedDirs = ['.vite'];

  function processDirectory(dir, baseDir = distDir) {
    if (!fs.existsSync(dir)) {
      return;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const entryName = entry.name;
      const entryPath = path.join(dir, entryName);
      const relativePath = path.relative(baseDir, entryPath);

      // Skip excluded files and directories
      if (excludedFiles.some(excluded => entryName === excluded || entryName.startsWith(excluded))) {
        return;
      }
      if (excludedDirs.some(excluded => entryName === excluded)) {
        return;
      }
      
      if (entry.isFile()) {
        const stats = fs.statSync(entryPath);
        // Use relative path for files in subdirs, or just filename for root files
        const fileName = relativePath.includes(path.sep) ? relativePath.replace(/\\/g, '/') : entryName;
        
        const fileInfo = {
          name: fileName,
          size: stats.size,
          sizeKB: (stats.size / 1024).toFixed(2),
          type: entryName.endsWith('.js') ? 'javascript' : entryName.endsWith('.css') ? 'stylesheet' : 'other'
        };
        
        if (entryName === expectedAppFile || (entryName.endsWith('.js') && !entryName.startsWith('vendor') && !relativePath.includes(path.sep))) {
          cleanManifest.app = fileName;
          cleanManifest.allFiles.push({ ...fileInfo, role: 'main-app' });
        } else if (entryName.startsWith('vendor') && entryName.endsWith('.js')) {
          cleanManifest.vendor.push(fileName);
          cleanManifest.allFiles.push({ ...fileInfo, role: 'vendor-libraries' });
        } else if (entryName === expectedStylesFile || (entryName.startsWith('styles') && entryName.endsWith('.css'))) {
          cleanManifest.styles = fileName;
          cleanManifest.allFiles.push({ ...fileInfo, role: 'styles' });
        } else if (!entryName.endsWith('.json') && entryName !== 'index.html') {
          cleanManifest.allFiles.push({ ...fileInfo, role: 'other' });
        }
      } else if (entry.isDirectory()) {
        // Recursively process subdirectories (though flatten should have moved everything)
        processDirectory(entryPath, baseDir);
      }
    });
  }

  // Process the root directory (and any remaining subdirectories)
  processDirectory(assetsDir);

  /** Short hash so embed loader can append ?v=… — busts CDN / browser cache after each deploy (same filename). */
  function computeAssetVersion(distPath, fileNames) {
    const hash = crypto.createHash('sha256');
    for (const name of fileNames) {
      if (!name) continue;
      const fp = path.join(distPath, name);
      if (!fs.existsSync(fp)) continue;
      hash.update(name);
      hash.update('\0');
      hash.update(fs.readFileSync(fp));
    }
    return hash.digest('hex').slice(0, 12);
  }

  const versionInputs = [cleanManifest.styles, cleanManifest.app].filter(Boolean);
  if (versionInputs.length > 0) {
    cleanManifest.assetVersion = computeAssetVersion(distDir, versionInputs);
  }

  const cleanManifestPath = path.join(distDir, 'asset-manifest.json');
  fs.writeFileSync(cleanManifestPath, JSON.stringify(cleanManifest, null, 2), 'utf8');
  
  console.log('✅ Generated asset-manifest.json');
  return cleanManifest;
}

generateManifest();

