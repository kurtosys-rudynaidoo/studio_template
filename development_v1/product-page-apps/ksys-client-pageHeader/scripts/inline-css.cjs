const fs = require('fs');
const path = require('path');
const { getConfig } = require('../config/env.config.cjs');

const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'development';
const config = getConfig(env);
const distDir = path.resolve(__dirname, '..', 'dist-build');
const jsFile = path.join(distDir, config.filename);

function inlineCss() {
	var cssFiles = fs.readdirSync(distDir).filter(function (f) {
		return f.endsWith('.css') && f !== 'bp-shared.css' && f !== 'shared.css';
	});

	if (cssFiles.length === 0) {
		console.log('⚠️  No CSS files found to inline');
		return;
	}

	var jsContent = fs.readFileSync(jsFile, 'utf8');

	for (var i = 0; i < cssFiles.length; i++) {
		var cssPath = path.join(distDir, cssFiles[i]);
		var cssContent = fs.readFileSync(cssPath, 'utf8');
		var escaped = cssContent
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(/\n/g, '\\n')
			.replace(/\r/g, '');

		var injection =
			"(function(){var s=document.createElement('style');" +
			"s.textContent='" + escaped + "';" +
			"document.head.appendChild(s);})();\n";

		jsContent = injection + jsContent;
		fs.unlinkSync(cssPath);
		console.log('✅ Inlined ' + cssFiles[i] + ' into ' + config.filename);
	}

	fs.writeFileSync(jsFile, jsContent, 'utf8');
}

inlineCss();
