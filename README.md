# Kurtosys Studio Monorepo Template (`ksys-studio-template`)

Generic, reusable monorepo for Kurtosys Studio embeds:

- **Fund Centre** — list / filter / performance / materials browser
- **Product-page widgets** — pageHeader, overview, performance, portfolioBreakdown, literature, …

**Start here:** choose the embed host, then the rest of the project is factored for you.

```bash
npm run init
# or: npm run init -- --host dxm|cms|both --client acme
```

| hostMode | Meaning |
|----------|---------|
| `dxm` | Kurtosys DXM / Studio (React external) |
| `cms` | WordPress / Pantheon / custom CMS (React bundled) + integration specs |
| `both` | Dual build outputs from the same widget source |

## User guide

- [`USER_GUIDE.html`](./USER_GUIDE.html) — full walkthrough
- [`USER_GUIDE.pdf`](./USER_GUIDE.pdf) — printable handoff

```bash
npm run docs:user-guide
```

## Starter apps

| App id | Mount / embed global | Dev port |
|--------|----------------------|----------|
| **`appManager`** ★ | `#appManager` / `window.appManager` | 5170 |
| `fundCentre` | `#fundCentre` (+ `#fundCenter` config) / `window.fundCentre` | 5178 |
| `pageHeader` | `#pageHeader` / `window.pageHeader` | 5173 |
| `overview` | `#overview` / `window.overview` | 5174 |
| `performance` | `#performance` / `window.performanceApp`* | 5175 |
| `portfolioBreakdown` | `#portfolioBreakdown` / `window.portfolioBreakdown` | 5176 |
| `literature` | `#literature` / `window.literature` | 5177 |

★ **Required default** for every project — child script loader + co-deployed `shared.css` (`BuildResult/.../appManager/`). Do not remove or rename.

\* Reserved-name safe (`window.performance` is a browser API).

Fund Centre–specific env fields: `defaultFundlist`, `subadvisedLandingUrl` (see `apps/ksys-client-fundCentre/MONOREPO.md`).

## Page types

Two embed shapes — do not mix them on the same page.

| Type | Apps | Host page |
|------|------|-----------|
| **Standalone** | **Fund Centre**, **document library** | Own page. One JS bundle (`fundCentre.js`, or a future `documentLibrary.js`). **No App Manager.** Own mount + data attributes (`data-fundlist`, etc.). |
| **Product page** | `appManager` + `pageHeader`, `overview`, `performance`, `portfolioBreakdown`, `literature` | One page, many widgets. App Manager publishes `data-input-*` and loads children. |

`literature` on a product page is **not** the document library. The library is a separate standalone embed (add with `npm run apps:add` when that build starts).

Typical order: standalone Fund Centre first (including list → product URL), then product-page widgets, then standalone document library.

## Common commands

```bash
npm run apps:list
npm run apps:add -- holdingsExposure 5179
npm run apps:rename -- literature materials
npm run client:set -- acme

npm run dev -- fundCentre
npm run dev -- overview
npm run build:stg          # uses hostMode from studio.config.json
npm run build:stg:cms      # force CMS artifacts
npm run build:stg:dxm      # force DXM artifacts

npm run audit:security
```

## Clean build artifacts

Each app build keeps **only** deployable files in `dist-build/` and `BuildResult/`:

- `<appId>.js` (required)
- `shared.css` — **required from `appManager`**; do not emit `bp-shared.css`

Scaffolding (`index.html`, `vite.svg`, manifests, embed-loader, etc.) is removed automatically.

## Host docs

- [`hosts/dxm/README.md`](./hosts/dxm/README.md)
- [`hosts/cms/README.md`](./hosts/cms/README.md)
- [`docs/DATA-RETRIEVAL.md`](./docs/DATA-RETRIEVAL.md) — how widgets read Kurtosys data
- [`docs/CMS-EMBED-CSS.md`](./docs/CMS-EMBED-CSS.md) — unlayer and ID-scope CSS for WordPress / Elementor
- [`docs/integration-specs/_TEMPLATE.md`](./docs/integration-specs/_TEMPLATE.md) — CMS product-page integration spec

## Layout

```text
studio.config.json          # hostMode + app registry
ksys-studio-widget-template/  # in-repo widget starter for apps:add
hosts/{dxm,cms}/
docs/                       # DATA-RETRIEVAL, a11y, CMS integration specs
BuildResult/{dxm,cms}/{dev,stg,prd}/<appId>/
apps/ksys-<client>-appManager/   # required default
apps/ksys-<client>-fundCentre/
apps/ksys-<client>-<appId>/
```

Duplicate this whole folder for each new client — App Manager, Fund Centre, product-page apps, and the widget template come along automatically.
