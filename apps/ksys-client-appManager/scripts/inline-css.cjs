const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');

/**
 * Inline CSS into the JS bundle for DXM compatibility.
 * DXM only loads JS files — this reads the generated CSS,
 * prepends a runtime <style> injection into the JS bundle,
 * then deletes the CSS file.
 */
var SKIP_INLINE = ['shared.css', 'bp-shared.css'];

function inlineCss() {
	var files = fs.readdirSync(distDir);
	var cssFiles = files.filter(function(f) {
		return f.endsWith('.css') && SKIP_INLINE.indexOf(f) === -1;
	});

	if (cssFiles.length === 0) {
		console.log('ℹ️  No CSS files to inline (shared.css is kept external)');
		return;
	}

	var cssContent = '';
	for (var i = 0; i < cssFiles.length; i++) {
		cssContent += fs.readFileSync(path.join(distDir, cssFiles[i]), 'utf8');
	}

	var escaped = cssContent
		.replace(/\\/g, '\\\\')
		.replace(/`/g, '\\`')
		.replace(/\$/g, '\\$');

	var injection = `(function(){var s=document.createElement('style');s.textContent=\`${escaped}\`;document.head.appendChild(s);})();\n`;

	var jsFiles = files.filter(function(f) { return f.endsWith('.js') && f !== 'embed-loader.js'; });

	if (jsFiles.length === 0) {
		console.log('⚠️  No JS bundle found in dist-build, skipping inline');
		return;
	}

	jsFiles.forEach(function(jsFile) {
		var jsPath = path.join(distDir, jsFile);
		var jsContent = fs.readFileSync(jsPath, 'utf8');
		fs.writeFileSync(jsPath, injection + jsContent, 'utf8');
		console.log('  Inlined CSS into ' + jsFile);
	});

	for (var j = 0; j < cssFiles.length; j++) {
		fs.unlinkSync(path.join(distDir, cssFiles[j]));
	}
	console.log('✅ Inlined CSS into JS and removed ' + cssFiles.join(', '));
}

inlineCss();
