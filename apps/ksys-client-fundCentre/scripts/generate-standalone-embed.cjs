const fs = require('fs');
const path = require('path');

const envConfig = require(path.resolve(__dirname, '../config/env.config.cjs'));

const distDir = path.resolve(__dirname, '..', process.env.DIST_BUILD_DIR || 'dist-build');
const outputPath = path.join(distDir, 'index.html');

function generateStandaloneEmbed() {
  // Relative URL: Kurtosys (and similar hosts) must serve all dist files from the same app folder.
  // Absolute URLs break if only index.html is deployed or CDN paths differ.
  const loaderSrc = './embed-loader.js';

  const buildEnv = process.env.BUILD_ENV || process.env.NODE_ENV || 'stg';
  const cfg = envConfig.getConfig(buildEnv);
  const fundlist = cfg.defaultFundlist || 'us_institutional';

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fund Centre</title>
    <link rel="icon" href="./vite.svg" type="image/svg+xml" />
  </head>
  <body>
    <!-- Do not open this file via file:// — use a local server (e.g. npx serve .) so bundle.js/CSS load. -->
    <div
      id="fundCenter"
      hidden
      data-culture="en-US"
      data-country="us"
      data-audience="institutional"
      data-api-url="/ksys-app-fund-centre"
      data-fundlist="${fundlist}"
      data-base-url="https://www.example.com"
      data-subadvised-landing-url="${cfg.subadvisedLandingUrl || ''}"
      data-configuration-key="default"
      data-ksys-app-template-id="/ksys-app-fund-center"
      data-initialized="true"
    ></div>
    <div id="your-app-container"></div>
    
    <script 
      src="${loaderSrc}" 
      async 
      onload="YourAppEmbed.init({ containerId: 'your-app-container', useShadowDOM: false })">
    </script>
  </body>
</html>`;

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log('✅ Generated standalone embed HTML');
}

generateStandaloneEmbed();

