const fs = require('fs');
const path = require('path');
const { getBaseUrl, getConfig } = require('../config/env.config.cjs');

const distDir = path.resolve(__dirname, '..', process.env.DIST_BUILD_DIR || 'dist-build');
const manifestPath = path.join(distDir, 'asset-manifest.json');
const loaderPath = path.join(distDir, 'embed-loader.js');

const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'development';
const baseUrl = getBaseUrl(env);
const config = getConfig(env);

function generateEmbedLoader() {
  let manifest = {};
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }

  const loaderScript = `/**
 * Fund Center embed loader — loads scoped bundle.css after theme CSS (append to <head>).
 * Cache-bust: manifest.assetVersion → ?v= on stylesheet + module script (fresh deploys on WP/Elementor).
 * Environment: ${env}
 * Fallback base URL: ${baseUrl}
 */

(function(window) {
  'use strict';

  const manifest = ${JSON.stringify(manifest, null, 2)};
  const FALLBACK_BASE_URL = '${baseUrl}'.replace(/\\/$/, '');

  /** Bust cache when bundle.css / bundle.js change but paths stay the same (CDN, Kurtosys static). */
  function appendAssetVersion(url) {
    var v = manifest && manifest.assetVersion;
    if (!v) return url;
    var sep = url.indexOf('?') >= 0 ? '&' : '?';
    return url + sep + 'v=' + encodeURIComponent(v);
  }

  /** Same folder as embed-loader.js (works when all assets are co-located on Kurtosys / static hosts). */
  function resolveAppBaseUrl() {
    if (typeof document === 'undefined') return FALLBACK_BASE_URL;
    var scripts = document.querySelectorAll('script[src*="embed-loader"]');
    for (var i = 0; i < scripts.length; i++) {
      var el = scripts[i];
      var src = el.getAttribute('src') || el.src;
      if (!src) continue;
      try {
        var abs = new URL(src, document.baseURI).href;
        var last = abs.lastIndexOf('/');
        return last > 0 ? abs.slice(0, last) : FALLBACK_BASE_URL;
      } catch (e) { /* ignore */ }
    }
    return FALLBACK_BASE_URL;
  }

  const DEFAULT_BASE_URL = resolveAppBaseUrl();

  const YourAppEmbed = {
    config: {
      baseUrl: DEFAULT_BASE_URL,
      containerId: 'your-app-container',
      /** false: link bundle.css in document head so Tailwind applies (shadow DOM isolates styles). */
      useShadowDOM: false
    },
    shadowRoot: null,

    init: function(options) {
      if (this._initialized) {
        return;
      }
      this._initialized = true;

      var prev = this.config;
      this.config = Object.assign({}, this.config, {
        baseUrl: options?.baseUrl || DEFAULT_BASE_URL,
        containerId: options?.containerId || 'your-app-container',
        useShadowDOM: options?.useShadowDOM !== undefined ? options.useShadowDOM : prev.useShadowDOM
      });
      
      const initAssets = () => {
        if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
          this.showFileProtocolWarning();
          return;
        }
        this.ensureContainer();
        this.loadAssets();
      };
      
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initAssets, 0);
      } else {
        document.addEventListener('DOMContentLoaded', initAssets);
      }
    },

    ensureContainer: function() {
      let container = document.getElementById(this.config.containerId);
      if (!container) {
        container = document.createElement('div');
        container.id = this.config.containerId;
        if (document.body) {
          document.body.appendChild(container);
        }
      }
      
      if (this.config.useShadowDOM && !this.shadowRoot) {
        try {
          this.shadowRoot = container.attachShadow({ mode: 'open' });
          const appRoot = document.createElement('div');
          appRoot.id = 'root';
          this.shadowRoot.appendChild(appRoot);
        } catch (e) {
          console.warn('Shadow DOM not supported:', e);
          this.config.useShadowDOM = false;
        }
      }

      if (!this.config.useShadowDOM && !container.querySelector('#root')) {
        var appRoot = document.createElement('div');
        appRoot.id = 'root';
        container.appendChild(appRoot);
      }

      if (container && container.classList) {
        container.classList.add('fund-center-embed-root');
      }
      
      return container;
    },

    /** file:// cannot load module scripts or fetch(); user must use http(s). */
    showFileProtocolWarning: function() {
      if (document.getElementById('fund-center-file-protocol-warning')) return;
      var msg = document.createElement('div');
      msg.id = 'fund-center-file-protocol-warning';
      msg.setAttribute('role', 'alert');
      msg.style.cssText = [
        'font-family:system-ui,-apple-system,sans-serif',
        'font-size:15px',
        'line-height:1.5',
        'padding:1rem 1.25rem',
        'margin:0',
        'background:#1a1a2e',
        'color:#eee',
        'border-bottom:3px solid #e94560'
      ].join(';');
      var t = document.createTextNode(
        'Fund Center cannot run from a file:// page. Browsers block loading ES modules and fetch() for local files. '
      );
      msg.appendChild(t);
      var code = document.createElement('code');
      code.style.cssText = 'background:#2a2a3e;padding:2px 8px;border-radius:4px;margin:0 4px';
      code.textContent = 'npx serve .';
      msg.appendChild(document.createTextNode('Open a terminal in this folder, run '));
      msg.appendChild(code);
      msg.appendChild(document.createTextNode(' then open the http:// URL it prints (not the file path).'));
      if (document.body) {
        document.body.insertBefore(msg, document.body.firstChild);
      }
      console.warn('[Fund Center] Serve dist over HTTP — file:// blocks bundle.js and bundle.css (CORS / module policy). Example: npx serve .');
    },

    loadAssets: function() {
      const baseUrl = this.config.baseUrl.replace(/\\/$/, '');
      
      if (manifest.styles) {
        this.loadStylesheet(baseUrl + '/' + manifest.styles);
      }

      const vendorChunks = Array.isArray(manifest.vendor) ? manifest.vendor : (manifest.vendor ? [manifest.vendor] : []);
      
      if (vendorChunks.length > 0) {
        let loadedCount = 0;
        const totalVendors = vendorChunks.length;
        
        const checkAndLoadApp = () => {
          loadedCount++;
          if (loadedCount === totalVendors && manifest.app) {
            this.loadScript(baseUrl + '/' + manifest.app);
          }
        };

        vendorChunks.forEach((vendor) => {
          this.loadScript(baseUrl + '/' + vendor, checkAndLoadApp);
        });
      } else if (manifest.app) {
        this.loadScript(baseUrl + '/' + manifest.app);
      }
    },

    loadStylesheet: function(href) {
      var hrefBusted = appendAssetVersion(href);
      if (this.config.useShadowDOM && this.shadowRoot) {
        fetch(hrefBusted)
          .then(response => response.text())
          .then(css => {
            const style = document.createElement('style');
            style.textContent = css;
            this.shadowRoot.insertBefore(style, this.shadowRoot.firstChild);
          })
          .catch(error => {
            console.error('Failed to load CSS:', error);
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = hrefBusted;
            this.shadowRoot.appendChild(link);
          });
      } else {
        var stale = document.querySelectorAll('link[data-fund-center-embed-stylesheet="1"]');
        for (var si = 0; si < stale.length; si++) {
          var n = stale[si];
          if (n.parentNode) n.parentNode.removeChild(n);
        }
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = hrefBusted;
        link.id = 'fund-center-bundle-css';
        link.setAttribute('data-fund-center-embed-stylesheet', '1');
        document.head.appendChild(link);
      }
    },

    loadScript: function(src, callback) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = appendAssetVersion(src);
      
      if (callback) {
        script.onload = callback;
        script.onerror = function() {
          console.error('Failed to load script:', src);
        };
      }
      
      document.head.appendChild(script);
    }
  };

  window.YourAppEmbed = YourAppEmbed;

  /**
   * WordPress / Elementor often include only <script src="...embed-loader.js"> with no onload.
   * Boot when #your-app-container is present (runs now or on DOMContentLoaded if needed).
   */
  function autoInitIfEmbedded() {
    try {
      if (!document.getElementById('your-app-container')) {
        return false;
      }
      YourAppEmbed.init({ containerId: 'your-app-container' });
      return true;
    } catch (e) {
      console.warn('[Fund Center embed] auto-init failed:', e);
      return false;
    }
  }
  if (!autoInitIfEmbedded() && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInitIfEmbedded);
  }
})(window);
`;

  fs.writeFileSync(loaderPath, loaderScript, 'utf8');
  console.log(`✅ Generated embed-loader.js for environment: ${env}`);
  return loaderScript;
}

generateEmbedLoader();

