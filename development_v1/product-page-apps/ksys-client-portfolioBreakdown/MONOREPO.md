# Client product-page monorepo layout

Mirror the Boston Partners archive layout so build/deploy tooling stays consistent.

```
<client>-pp/
├── BuildResult/
│   ├── dev/
│   ├── staging/
│   └── prod/
│       ├── pageHeader/pageHeader.js
│       ├── overview/overview.js
│       └── appManager/
│           ├── appManager.js
│           └── shared.css          # optional
├── tools/                          # optional bp_cli-style wizard
└── development_v1/
    └── product-page-apps/
        ├── config/                 # shared client utilities (optional)
        ├── ksys-<client>-appManager/
        ├── ksys-<client>-pageHeader/
        ├── ksys-<client>-overview/
        └── ksys-<client>-.../
```

## Rules that prevent the BP holdingsExposure issue

1. **All widgets live under** `development_v1/product-page-apps/`
2. Folder prefix: `ksys-<client>-*`
3. Each app has its own `package.json` with `build:dev` / `build:staging` / `build:prod`
4. Do not keep a production widget only as a sibling repo outside the monorepo unless you also copy/symlink it into `product-page-apps/`

## Creating a new widget

From this template:

```bash
./scripts/scaffold-app.sh <client> <widget> \
  /path/to/<client>-pp/development_v1/product-page-apps
```

Then:

```bash
cd /path/to/<client>-pp/development_v1/product-page-apps/ksys-<client>-<widget>
# edit config/env.config.cjs
npm install
npm run dev
```

## DXM mount contract

On the DXM page (or local `index.html`):

```html
<div
  data-ksys-app-template-id="ksys-app-manager"
  data-input-client-code="..."
  data-input-culture="en-US"
  data-input-product-type="mutualFunds"
></div>

<div id="pageHeader"></div>
<script src=".../pageHeader.js"></script>
```

The widget reads inputs from:

1. Mount node `data-input-*`
2. App Manager node
3. Query string (`kurtosys_id` / `clientCode`) as a local/dev fallback

## Suggested first widgets for a new client

| Widget | Mount id | Typical job |
|--------|----------|-------------|
| `appManager` | `appManager` | Nav + load child scripts by GUID |
| `pageHeader` | `pageHeader` | Title, docs, managers |
| `overview` | `overview` | Strategy / fund overview |
| `performance` | `performance` | Returns tables / charts |
| `materials` | `materials` | Document list |

Start from this template for each; only `appManager` needs special shared-CSS / child-GUID wiring.
