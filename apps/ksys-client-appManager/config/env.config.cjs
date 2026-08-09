// App Manager — required default shell for every Studio client project.
// Env keys: dev | stg | prd
// Aliases: development→dev, staging→stg, production|prod→prd
//
// childAppGuids: Studio GUIDs for product-page widgets this shell loads.
// Leave empty until each child app is deployed; the loader skips empty GUIDs.

const environments = {
	dev: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_DEV_GUID_HERE',
		filename: 'appManager.js',
		apiToken: 'YOUR_DEV_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_DEV_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'appManager',
		embedGlobalName: 'appManager',
		childAppGuids: {
			pageHeader: '',
			overview: '',
			performance: '',
			portfolioBreakdown: '',
			literature: '',
		},
	},
	stg: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_STG_GUID_HERE',
		filename: 'appManager.js',
		apiToken: 'YOUR_STG_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_STG_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'appManager',
		embedGlobalName: 'appManager',
		childAppGuids: {
			pageHeader: '',
			overview: '',
			performance: '',
			portfolioBreakdown: '',
			literature: '',
		},
	},
	prd: {
		baseUrl: 'https://api-us.kurtosys.app',
		fundApiUrl: 'https://api-us.fundpress.io',
		path: 'applicationManager/apps',
		guid: 'YOUR_PRD_GUID_HERE',
		filename: 'appManager.js',
		apiToken: 'YOUR_PRD_API_TOKEN_HERE',
		savedSearchToken: 'YOUR_PRD_SAVED_SEARCH_TOKEN_HERE',
		containerId: 'appManager',
		embedGlobalName: 'appManager',
		childAppGuids: {
			pageHeader: '',
			overview: '',
			performance: '',
			portfolioBreakdown: '',
			literature: '',
		},
	},
};

const ENV_ALIASES = {
	staging: 'stg',
	production: 'prd',
	prod: 'prd',
	development: 'dev',
};

function normalizeEnv(env = 'dev') {
	const raw = String(env || 'dev');
	return ENV_ALIASES[raw] || raw;
}

function getBaseUrl(env = 'dev') {
	const key = normalizeEnv(env);
	const config = environments[key];
	if (!config) {
		throw new Error(`Unknown environment: ${env}. Available: ${Object.keys(environments).join(', ')}`);
	}
	return `${config.baseUrl}/${config.path}/${config.guid}`;
}

function getConfig(env = 'dev') {
	const key = normalizeEnv(env);
	const config = environments[key];
	if (!config) {
		throw new Error(`Unknown environment: ${env}. Available: ${Object.keys(environments).join(', ')}`);
	}
	const embedBaseUrl = getBaseUrl(key);
	return {
		...config,
		envKey: key,
		embedBaseUrl,
		apiBaseUrl: config.baseUrl,
		fundApiBaseUrl: config.fundApiUrl,
		fundpressUrl: config.fundApiUrl,
		/** Co-deployed with appManager.js — BuildResult/.../appManager/shared.css */
		sharedCssUrl: `${embedBaseUrl}/shared.css`,
	};
}

module.exports = {
	environments,
	normalizeEnv,
	getBaseUrl,
	getConfig,
};
