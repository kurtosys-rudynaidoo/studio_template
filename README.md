# Kurtosys Studio Product-Page Monorepo Template

Generic, reusable monorepo for DXM-embeddable Studio widgets. Clone this for each new client, set the client slug, then add/rename apps as needed.

Default starter apps:

| App id | Mount / embed global | Dev port |
|--------|----------------------|----------|
| `pageHeader` | `#pageHeader` / `window.pageHeader` | 5173 |
| `overview` | `#overview` / `window.overview` | 5174 |
| `performance` | `#performance` / `window.performanceApp`* | 5175 |
| `portfolioBreakdown` | `#portfolioBreakdown` / `window.portfolioBreakdown` | 5176 |
| `literature` | `#literature` / `window.literature` | 5177 |

\* `window.performance` is reserved by the browser; the embed loader uses `performanceApp` automatically for that app id.

## First-time setup for a new client

```bash
cp -R ~/Documents/GitHub/ksys-studio-pp-template ~/Documents/GitHub/acme-pp
cd ~/Documents/GitHub/acme-pp

# Rename placeholder client slug everywhere
npm run client:set -- acme

# Install + run one app
npm run dev -- overview
```

Keep `../ksys-studio-widget-template` next to this repo (or update `widgetTemplatePath` in `studio.config.json`) so `apps:add` can scaffold new widgets.

## User guide

Full operating instructions (HTML + PDF):

- [`USER_GUIDE.html`](./USER_GUIDE.html) — open in a browser
- [`USER_GUIDE.pdf`](./USER_GUIDE.pdf) — printable handoff doc

Regenerate the PDF after editing the HTML:

```bash
npm run docs:user-guide
```

## Manage apps

```bash
npm run apps:list
npm run apps:add -- holdingsExposure 5178
npm run apps:rename -- literature materials
npm run client:set -- newclient
```

App registry lives in **`studio.config.json`**. Folder convention:

```text
development_v1/product-page-apps/ksys-<clientSlug>-<appId>/
```

## Build (all apps)

```bash
npm run build:dev
npm run build:staging
npm run build:prod
```

Clean artifacts are collected to:

```text
BuildResult/<env>/<appId>/<appId>.js
```

## Defaults baked into every app

### Accessibility (WCAG 2.1 / 2.2 oriented)
- Semantic landmarks / headings in the starter widget
- High-contrast CSS variables (`--studio-color-text` on white)
- Visible `:focus-visible` rings for keyboard navigation
- `VisuallyHidden` helper + `accessibleImageProps` for alt text discipline
- `prefers-reduced-motion` respect
- `eslint-plugin-jsx-a11y` enabled

### Tailwind specificity
```css
@import "tailwindcss" important;
```
All utilities emit `!important` so DXM/Elementor host CSS does not win.

### Embed loader global
`scripts/generate-embed-loader.cjs` exposes **`window.<appId>`** (e.g. `window.overview`), not `YourAppEmbed` / hard-coded names. Set via `embedGlobalName` / `containerId` in each app’s `config/env.config.cjs`.

### Security
- Direct pins + overrides for `vite`, `rollup`, `tar`, `picomatch`, `postcss`
- Per-app `npm run audit:deps`
- Monorepo automation:

```bash
pip install -r tools/requirements-audit-report.txt   # optional PDF helper
npm run audit:security
```

Writes HTML + PDF under `reports/`, scoped to **app packages** and **BuildResult** bundles only.

## Layout

```text
ksys-studio-pp-template/
├── studio.config.json
├── scripts/                 # add / rename / build-all / client:set
├── tools/                   # security audit + PDF helpers
├── BuildResult/
├── reports/
└── development_v1/product-page-apps/
    ├── config/              # shared client utilities (optional)
    ├── ksys-client-pageHeader/
    ├── ksys-client-overview/
    ├── ksys-client-performance/
    ├── ksys-client-portfolioBreakdown/
    └── ksys-client-literature/
```

## Related

- Single-widget starter: `~/Documents/GitHub/ksys-studio-widget-template`
- Proven BP reference: `bp-pp-archive-.../development_v1/product-page-apps`
