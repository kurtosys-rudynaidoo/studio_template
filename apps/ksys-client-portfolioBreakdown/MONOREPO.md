# Client product-page monorepo layout

Apps live under a single `apps/` folder at the monorepo root.

```
<client>-pp/
├── BuildResult/
│   ├── dxm/{dev,stg,prd}/
│   └── cms/{dev,stg,prd}/
│       └── <appId>/<appId>.js
├── tools/                          # optional CLI / reports
├── ksys-studio-widget-template/    # in-repo starter for apps:add
└── apps/
    ├── config/                     # shared client utilities (optional)
    ├── ksys-<client>-pageHeader/
    ├── ksys-<client>-overview/
    └── ksys-<client>-.../
```

## Rules

1. **All widgets live under** `apps/`
2. Folder prefix: `ksys-<client>-*`
3. Each app has its own `package.json` with `build:dev` / `build:stg` / `build:prd`
4. Do not keep a production widget only as a sibling repo outside the monorepo unless you also copy/symlink it into `apps/`

## Creating a new widget

Prefer monorepo root:

```bash
npm run apps:add -- <widget> [port]
```

Or from this template directly:

```bash
./scripts/scaffold-app.sh <client> <widget> \
  /path/to/<client>-pp/apps
```

Then:

```bash
cd /path/to/<client>-pp/apps/ksys-<client>-<widget>
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
| `literature` | `literature` | Document list |

Start from this template for each; only `appManager` needs special shared-CSS / child-GUID wiring.
