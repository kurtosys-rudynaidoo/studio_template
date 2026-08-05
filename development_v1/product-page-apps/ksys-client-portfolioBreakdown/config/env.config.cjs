// Environment configuration for Kurtosys Studio embeddable builds.
// Replace placeholders before deploy. Keep secrets out of git when possible
// (use local overrides or CI secrets for tokens).

const environments = {
	development: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_DEV_GUID_HERE',
		filename: 'portfolioBreakdown.js',
		apiToken: 'YOUR_DEV_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_DEV_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'portfolioBreakdown',
		/** window.<embedGlobalName> — defaults to containerId / filename stem */
		embedGlobalName: 'portfolioBreakdown',
	},
	staging: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_STAGING_GUID_HERE',
		filename: 'portfolioBreakdown.js',
		apiToken: 'YOUR_STAGING_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_STAGING_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'portfolioBreakdown',
		embedGlobalName: 'portfolioBreakdown',
	},
	production: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_PRODUCTION_GUID_HERE',
		filename: 'portfolioBreakdown.js',
		apiToken: 'YOUR_PRODUCTION_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_PRODUCTION_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'portfolioBreakdown',
		embedGlobalName: 'portfolioBreakdown',
	},
};

/**
 * @param {string} env
 * @returns {string}
 */
function getBaseUrl(env = 'development') {
	const config = environments[env];
	if (!config) {
		throw new Error(`Unknown environment: ${env}. Available: ${Object.keys(environments).join(', ')}`);
	}
	return `${config.baseUrl}/${config.path}/${config.guid}`;
}

/**
 * Optional shared CSS URL helper for monorepos that publish a shared stylesheet
 * from an appManager / shell app. Override per client as needed.
 * @param {string} env
 * @param {string} baseUrl
 * @param {string} path
 * @returns {string}
 */
function sharedStylesheetUrl(env, baseUrl, path) {
	const sharedGuidByEnv = {
		development: 'YOUR_SHARED_CSS_DEV_GUID_HERE',
		staging: 'YOUR_SHARED_CSS_STAGING_GUID_HERE',
		production: 'YOUR_SHARED_CSS_PRODUCTION_GUID_HERE',
	};
	const guid = sharedGuidByEnv[env];
	if (!guid || guid.includes('YOUR_')) return '';
	return `${baseUrl}/${path}/${guid}/shared.css`;
}

/**
 * @param {string} env
 * @returns {object}
 */
function getConfig(env = 'development') {
	const config = environments[env];
	if (!config) {
		throw new Error(`Unknown environment: ${env}. Available: ${Object.keys(environments).join(', ')}`);
	}
	return {
		...config,
		embedBaseUrl: getBaseUrl(env),
		apiBaseUrl: config.baseUrl,
		fundApiBaseUrl: config.fundApiUrl,
		sharedCssUrl: sharedStylesheetUrl(env, config.baseUrl, config.path),
	};
}

module.exports = {
	environments,
	getBaseUrl,
	getConfig,
};
