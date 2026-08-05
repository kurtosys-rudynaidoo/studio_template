var fs = require('fs');
var path = require('path');
var envConfig = require('../config/env.config.cjs');

var distDir = path.resolve(__dirname, '..', 'dist-build');
var manifestPath = path.join(distDir, 'asset-manifest.json');
var loaderPath = path.join(distDir, 'embed-loader.js');

var env = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
var baseUrl = envConfig.getBaseUrl(env);
var config = envConfig.getConfig(env);

/**
 * Global embed API name = app id (e.g. overview, pageHeader).
 * Prefer explicit embedGlobalName, else containerId, else filename without .js.
 */
function resolveEmbedGlobalName(cfg) {
	if (cfg.embedGlobalName && String(cfg.embedGlobalName).trim()) {
		return String(cfg.embedGlobalName).trim();
	}
	if (cfg.containerId && String(cfg.containerId).trim()) {
		return String(cfg.containerId).trim();
	}
	var file = String(cfg.filename || 'widget.js');
	return file.replace(/\.js$/i, '') || 'widget';
}

function generateEmbedLoader() {
	var manifest = {};
	if (fs.existsSync(manifestPath)) {
		manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
	}

	var embedName = resolveEmbedGlobalName(config);
	var displayName = embedName;

	var loaderScript =
		'/**\n' +
		' * ' +
		displayName +
		' Embed Loader\n' +
		' * Environment: ' +
		env +
		'\n' +
		' * Base URL: ' +
		baseUrl +
		'\n' +
		' * Global: window.' +
		embedName +
		'\n' +
		' */\n\n' +
		'(function(window) {\n' +
		'  "use strict";\n\n' +
		'  var manifest = ' +
		JSON.stringify(manifest, null, 2) +
		';\n' +
		'  var DEFAULT_BASE_URL = "' +
		baseUrl +
		'";\n' +
		'  var SHARED_CSS_URL = ' +
		JSON.stringify(config.sharedCssUrl) +
		';\n\n' +
		'  var embedApi = {\n' +
		'    config: {\n' +
		'      baseUrl: DEFAULT_BASE_URL,\n' +
		'      containerId: "' +
		config.containerId +
		'",\n' +
		'      useShadowDOM: false\n' +
		'    },\n\n' +
		'    init: function(options) {\n' +
		'      var opts = options || {};\n' +
		'      this.config = {\n' +
		'        baseUrl: opts.baseUrl || DEFAULT_BASE_URL,\n' +
		'        containerId: opts.containerId || "' +
		config.containerId +
		'",\n' +
		'        useShadowDOM: false\n' +
		'      };\n\n' +
		'      var self = this;\n' +
		'      var initAssets = function() {\n' +
		'        self.ensureContainer();\n' +
		'        self.loadAssets();\n' +
		'      };\n\n' +
		'      if (document.readyState === "complete" || document.readyState === "interactive") {\n' +
		'        setTimeout(initAssets, 0);\n' +
		'      } else {\n' +
		'        document.addEventListener("DOMContentLoaded", initAssets);\n' +
		'      }\n' +
		'    },\n\n' +
		'    ensureContainer: function() {\n' +
		'      var container = document.getElementById(this.config.containerId);\n' +
		'      if (!container) {\n' +
		'        container = document.createElement("div");\n' +
		'        container.id = this.config.containerId;\n' +
		'        if (document.body) {\n' +
		'          document.body.appendChild(container);\n' +
		'        }\n' +
		'      }\n' +
		'      return container;\n' +
		'    },\n\n' +
		'    loadAssets: function() {\n' +
		'      var bUrl = this.config.baseUrl.replace(/\\\\/$/, "");\n' +
		'      var self = this;\n' +
		'      var run = function() {\n' +
		'        if (manifest.app) {\n' +
		'          self.loadScript(bUrl + "/" + manifest.app);\n' +
		'        }\n' +
		'      };\n' +
		'      this.loadStylesheetOnce(SHARED_CSS_URL, run);\n' +
		'    },\n\n' +
		'    loadStylesheetOnce: function(href, done, optId) {\n' +
		'      if (!href) { if (done) done(); return; }\n' +
		'      var sheetId = optId || "studio-shared-stylesheet";\n' +
		'      if (document.getElementById(sheetId)) { if (done) done(); return; }\n' +
		'      var link = document.createElement("link");\n' +
		'      link.id = sheetId;\n' +
		'      link.rel = "stylesheet";\n' +
		'      link.href = href;\n' +
		'      link.crossOrigin = "anonymous";\n' +
		'      if (done) { link.onload = function() { done(); }; }\n' +
		'      link.onerror = function() { if (done) done(); };\n' +
		'      document.head.appendChild(link);\n' +
		'    },\n\n' +
		'    loadScript: function(src, callback) {\n' +
		'      var script = document.createElement("script");\n' +
		'      script.src = src;\n' +
		'      script.crossOrigin = "anonymous";\n' +
		'      if (callback) {\n' +
		'        script.onload = callback;\n' +
		'        script.onerror = function() {\n' +
		'          console.error("Failed to load script:", src);\n' +
		'        };\n' +
		'      }\n' +
		'      document.head.appendChild(script);\n' +
		'    }\n' +
		'  };\n\n' +
		'  window[' +
		JSON.stringify(embedName) +
		'] = embedApi;\n' +
		'  embedApi.init();\n' +
		'})(window);\n';

	fs.writeFileSync(loaderPath, loaderScript, 'utf8');
	console.log('✅ Generated embed-loader.js for environment: ' + env + ' (window.' + embedName + ')');
	return loaderScript;
}

generateEmbedLoader();
