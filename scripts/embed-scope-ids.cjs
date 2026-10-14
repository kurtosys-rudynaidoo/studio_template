const fs = require('fs');
const path = require('path');

/** Product-page mount ids from studio.config.json, plus one portal id per mount. */
function productScopeIds(repoRoot) {
	const cfg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'studio.config.json'), 'utf8'));
	const mounts = (cfg.apps || []).filter((app) => !app.standalone).map((app) => app.id);
	if (mounts.length === 0) {
		throw new Error('studio.config.json has no product-page apps to scope');
	}
	return mounts.concat(mounts.map((id) => `${id}-portal`));
}

module.exports = { productScopeIds };
