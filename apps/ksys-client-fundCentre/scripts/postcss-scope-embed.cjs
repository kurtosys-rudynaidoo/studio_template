/**
 * PostCSS: scope every rule to #your-app-container so Fund Center CSS does not
 * collide with WordPress / Elementor global styles (higher specificity, same DOM subtree).
 * Used for Kurtosys embeds (e.g. Investments Center staging on ksysweb.com).
 *
 * Skips @keyframes steps, @font-face, @property, @charset.
 * Maps top-level :root / html / body selector lists to #your-app-container (embed mount is not document root).
 */
const selectorParser = require('postcss-selector-parser');

const SCOPE_ID = 'your-app-container';

function isInsideSkippedAtRule(rule) {
	let p = rule.parent;
	while (p) {
		if (p.type === 'atrule') {
			const n = p.name?.toLowerCase() ?? '';
			if (['keyframes', 'font-face', 'property', 'charset'].includes(n)) {
				return true;
			}
		}
		p = p.parent;
	}
	return false;
}

/** Keyframe step selectors must not be prefixed */
function isKeyframeStepSelector(sel) {
	const s = (sel || '').trim();
	return /^(from|to|-?\d+(?:\.\d+)?%)$/.test(s);
}

function scopeSelectorList(selectorString) {
	return selectorParser((selectors) => {
		selectors.each((selector) => {
			const first = selector.at(0);
			if (first?.type === 'id' && first.value === SCOPE_ID) {
				return;
			}

			const raw = selector.toString().trim();
			if (raw === ':root' || raw === 'html' || raw === 'body') {
				selector.empty();
				selector.append(selectorParser.id({ value: SCOPE_ID }));
				return;
			}

			selector.prepend(selectorParser.combinator({ value: ' ' }));
			selector.prepend(selectorParser.id({ value: SCOPE_ID }));
		});
	}).processSync(selectorString);
}

function postcssScopeEmbed() {
	return {
		postcssPlugin: 'scope-fund-center-embed',
		Rule(rule) {
			if (!rule.selector || rule.selector.trim() === '') return;
			if (isInsideSkippedAtRule(rule)) return;
			if (isKeyframeStepSelector(rule.selector)) return;

			try {
				rule.selector = scopeSelectorList(rule.selector);
			} catch (e) {
				console.warn('[postcss-scope-embed] skipped selector:', rule.selector, e.message);
			}
		},
	};
}

postcssScopeEmbed.postcss = true;

module.exports = postcssScopeEmbed;
