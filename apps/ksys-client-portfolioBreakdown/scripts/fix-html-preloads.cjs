const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const indexPath = path.join(distDir, 'index.html');
const manifestPath = path.join(distDir, 'asset-manifest.json');

function fixHtmlPreloads() {
  if (!fs.existsSync(indexPath)) {
    console.log('⚠️  index.html not found, skipping preload fix');
    return;
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  // Read manifest
  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }

  // Add preload hints
  const preloads = [];
  
  if (manifest.styles) {
    preloads.push(`<link rel="preload" href="./${manifest.styles}" as="style" crossorigin="anonymous">`);
  }
  
  const vendorChunks = Array.isArray(manifest.vendor) ? manifest.vendor : (manifest.vendor ? [manifest.vendor] : []);
  vendorChunks.forEach(vendor => {
    preloads.push(`<link rel="modulepreload" href="./${vendor}" crossorigin="anonymous">`);
  });

  // Remove existing modulepreload links
  html = html.replace(/<link[^>]*rel="modulepreload"[^>]*>/gi, '');
  
  // Insert preloads after viewport meta tag
  if (preloads.length > 0) {
    const viewportMatch = html.match(/<meta[^>]*name="viewport"[^>]*>/i);
    if (viewportMatch) {
      html = html.replace(
        viewportMatch[0],
        viewportMatch[0] + '\n    ' + preloads.join('\n    ')
      );
    }
  }

  // Ensure correct script loading order
  const vendorReact = vendorChunks.find(v => v.includes('vendor-react'));
  const otherVendors = vendorChunks.filter(v => !v.includes('vendor-react'));
  
  const scriptRegex = /<script[^>]*src="[^"]*\.js"[^>]*><\/script>/gi;
  
  if (vendorReact && manifest.app) {
    html = html.replace(scriptRegex, '');
    
    const scripts = [];
    if (vendorReact) {
      scripts.push(`    <script type="module" crossorigin src="./${vendorReact}"></script>`);
    }
    otherVendors.forEach(vendor => {
      scripts.push(`    <script type="module" crossorigin src="./${vendor}"></script>`);
    });
    scripts.push(`    <script type="module" crossorigin src="./${manifest.app}"></script>`);
    
    html = html.replace('</head>', scripts.join('\n') + '\n  </head>');
  }

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('✅ Fixed index.html: Added preload hints');
}

fixHtmlPreloads();

