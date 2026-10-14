const fs = require('fs');
const path = require('path');
const postcssScopeEmbed = require('./postcss-scope-embed.cjs');

const SKIP = new Set(['shared.css']);

/**
 * Unlayer and ID-scope finished CSS, then inline it into the widget JS.
 * `postcss` is passed in so resolution uses the calling app's node_modules.
 */
function scopeAndInlineCss({ postcss, distDir, jsFile, scopeIds }) {
	if (!postcss) {
		throw new Error('scopeAndInlineCss requires postcss');
	}
	if (!scopeIds?.length) {
		throw new Error('scopeAndInlineCss requires scopeIds');
	}

	const legacy = path.join(distDir, 'bp-shared.css');
	if (fs.existsSync(legacy)) fs.unlinkSync(legacy);

	const cssFiles = fs.readdirSync(distDir).filter((file) => file.endsWith('.css') && !SKIP.has(file));
	if (cssFiles.length === 0) {
		console.log('ℹ️  No CSS files to inline (shared.css stays external)');
		return;
	}

	let jsContent = fs.readFileSync(jsFile, 'utf8');
	for (const file of cssFiles) {
		const cssPath = path.join(distDir, file);
		const cssContent = postcss([postcssScopeEmbed({ scopeIds })]).process(fs.readFileSync(cssPath, 'utf8'), {
			from: cssPath,
		}).css;
		if (cssContent.includes('@layer')) {
			throw new Error(`scope-and-inline-css: @layer survived in ${file}`);
		}
		const escaped = cssContent
			.replace(/\\/g, '\\\\')
			.replace(/'/g, "\\'")
			.replace(/\n/g, '\\n')
			.replace(/\r/g, '');
		const injection =
			"(function(){var s=document.createElement('style');" +
			"s.textContent='" +
			escaped +
			"';" +
			'document.head.appendChild(s);})();\n';
		jsContent = injection + jsContent;
		fs.unlinkSync(cssPath);
		console.log(`✅ Inlined ${file} into ${path.basename(jsFile)}`);
	}
	fs.writeFileSync(jsFile, jsContent, 'utf8');
}

module.exports = { scopeAndInlineCss };
