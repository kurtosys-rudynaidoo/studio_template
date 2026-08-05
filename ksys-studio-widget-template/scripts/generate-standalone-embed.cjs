const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist-build');
const outputPath = path.join(distDir, 'index.html');

function generateStandaloneEmbed() {
  const env = process.env.BUILD_ENV || process.env.NODE_ENV || 'dev';
  const envConfig = require('../config/env.config.cjs');
  const baseUrl = envConfig.getBaseUrl(env);

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your App</title>
  </head>
  <body>
    <div id="your-app-container"></div>
    
    <script 
      src="${baseUrl}/embed-loader.js" 
      async 
      onload="YourAppEmbed.init({ containerId: 'your-app-container' })">
    </script>
  </body>
</html>`;

  fs.writeFileSync(outputPath, html, 'utf8');
  console.log('✅ Generated standalone embed HTML');
}

generateStandaloneEmbed();

