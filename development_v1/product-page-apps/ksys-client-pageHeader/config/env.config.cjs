// Environment configuration for Kurtosys Studio embeddable builds.
// Env keys: development | stg | prd
// Aliases accepted: staging→stg, production|prod→prd

const environments = {
	development: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_DEV_GUID_HERE',
		filename: 'pageHeader.js',
		apiToken: 'YOUR_DEV_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_DEV_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'pageHeader',
		/** window.<embedGlobalName> — defaults to containerId / filename stem */
		embedGlobalName: 'pageHeader',
	},
	stg: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_STG_GUID_HERE',
		filename: 'pageHeader.js',
		apiToken: 'YOUR_STG_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_STG_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'pageHeader',
		embedGlobalName: 'pageHeader',
	},
	prd: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_PRD_GUID_HERE',
		filename: 'pageHeader.js',
		apiToken: 'YOUR_PRD_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_PRD_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'pageHeader',
		embedGlobalName: 'pageHeader',
	},
};

const ENV_ALIASES = {
	staging: 'stg',
	production: 'prd',
	prod: 'prd',
	dev: 'development',
};

/**
 * @param {string} env
 * @returns {string}
 */
function normalizeEnv(env = 'development') {
	const raw = String(env || 'development');
	return ENV_ALIASES[raw] || raw;
}

/**
 * @param {string} env
 * @returns {string}
 */
function getBaseUrl(env = 'development') {
	const key = normalizeEnv(env);
	const config = environments[key];
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
	const key = normalizeEnv(env);
	const sharedGuidByEnv = {
		development: 'YOUR_SHARED_CSS_DEV_GUID_HERE',
		stg: 'YOUR_SHARED_CSS_STG_GUID_HERE',
		prd: 'YOUR_SHARED_CSS_PRD_GUID_HERE',
	};
	const guid = sharedGuidByEnv[key];
	if (!guid || guid.includes('YOUR_')) return '';
	return `${baseUrl}/${path}/${guid}/shared.css`;
}

/**
 * @param {string} env
 * @returns {object}
 */
function getConfig(env = 'development') {
	const key = normalizeEnv(env);
	const config = environments[key];
	if (!config) {
		throw new Error(`Unknown environment: ${env}. Available: ${Object.keys(environments).join(', ')}`);
	}
	return {
		...config,
		envKey: key,
		embedBaseUrl: getBaseUrl(key),
		apiBaseUrl: config.baseUrl,
		fundApiBaseUrl: config.fundApiUrl,
		sharedCssUrl: sharedStylesheetUrl(key, config.baseUrl, config.path),
	};
}

module.exports = {
	environments,
	normalizeEnv,
	getBaseUrl,
	getConfig,
};
