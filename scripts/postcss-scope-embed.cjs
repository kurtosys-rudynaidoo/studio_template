/**
 * PostCSS: make a widget stylesheet win over WordPress / Elementor globals.
 *
 * 1. Flatten `@layer` blocks. Host themes ship unlayered CSS, and unlayered rules beat every
 *    layered rule regardless of specificity, so Tailwind utilities and preflight inside
 *    `@layer` lose to `button { … }` / theme heading rules.
 * 2. Prefix every selector with `:is(#mount, …)`. Host themes use class and element selectors,
 *    so one ID outranks them while keeping the widget's own relative specificity intact.
 *
 * Skips @keyframes steps, @font-face, @property, @charset.
 * Maps top-level :root / :host / html / body selectors to the scope itself.
 *
 * Pass `scopeIds`: the mount id plus `${mountId}-portal`. There is no default mount.
 * The copy in ksys-studio-widget-template/scripts must stay identical so scaffolded apps
 * work outside this monorepo.
 */
const SKIPPED_AT_RULES = ['keyframes', 'font-face', 'property', 'charset'];
const ROOT_SELECTORS = new Set([':root', ':host', 'html', 'body']);

function isInsideSkippedAtRule(rule) {
	let parent = rule.parent;
	while (parent) {
		if (parent.type === 'atrule' && SKIPPED_AT_RULES.includes(parent.name?.toLowerCase() ?? '')) {
			return true;
		}
		parent = parent.parent;
	}
	return false;
}

function isKeyframeStepSelector(selector) {
	return /^(from|to|-?\d+(?:\.\d+)?%)$/.test((selector || '').trim());
}

/** Split a selector list on commas that are not inside (), [], or quotes. */
function splitTopLevel(selector) {
	const parts = [];
	let current = '';
	let depth = 0;
	let quote = '';
	for (let i = 0; i < selector.length; i++) {
		const char = selector[i];
		if (quote) {
			current += char;
			if (char === quote && selector[i - 1] !== '\\') quote = '';
			continue;
		}
		if (char === '"' || char === "'") {
			quote = char;
			current += char;
			continue;
		}
		if (char === '(' || char === '[') depth++;
		else if ((char === ')' || char === ']') && depth > 0) depth--;
		if (char === ',' && depth === 0) {
			parts.push(current.trim());
			current = '';
			continue;
		}
		current += char;
	}
	if (current.trim()) parts.push(current.trim());
	return parts;
}

function scopePrefix(scopeIds) {
	if (scopeIds.length === 1) return `#${scopeIds[0]}`;
	return `:is(${scopeIds.map((id) => `#${id}`).join(',')})`;
}

function alreadyScoped(selector, scopeIds) {
	return scopeIds.some((id) => {
		if (selector === `#${id}`) return true;
		return selector.startsWith(`#${id}`) && /[\s.#[:>,+]/.test(selector.charAt(id.length + 1) || ' ');
	});
}

function scopeSelectorList(selectorString, scopeIds) {
	const scope = scopePrefix(scopeIds);
	return splitTopLevel(selectorString)
		.map((selector) => {
			if (ROOT_SELECTORS.has(selector)) return scope;
			if (selector === scope || selector.startsWith(`${scope} `) || selector.startsWith(`${scope}:`)) {
				return selector;
			}
			if (alreadyScoped(selector, scopeIds)) return selector;
			return `${scope} ${selector}`;
		})
		.join(',');
}

function postcssScopeEmbed(options = {}) {
	const scopeIds = options.scopeIds;
	if (!scopeIds?.length) {
		throw new Error('postcss-scope-embed requires scopeIds (mount id and mount-portal id)');
	}
	const flattenLayers = options.flattenLayers !== false;

	return {
		postcssPlugin: 'scope-embed',
		AtRule: {
			layer(atRule) {
				if (!flattenLayers) return;
				if (atRule.nodes) atRule.replaceWith(atRule.nodes);
				else atRule.remove();
			},
		},
		Rule(rule) {
			if (rule.__scoped) return;
			if (!rule.selector || rule.selector.trim() === '') return;
			if (isInsideSkippedAtRule(rule)) return;
			if (isKeyframeStepSelector(rule.selector)) return;
			try {
				rule.selector = scopeSelectorList(rule.selector, scopeIds);
				rule.__scoped = true;
			} catch (error) {
				console.warn('[postcss-scope-embed] skipped selector:', rule.selector, error.message);
			}
		},
	};
}

postcssScopeEmbed.postcss = true;

module.exports = postcssScopeEmbed;
