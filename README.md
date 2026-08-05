# Kurtosys Studio Product-Page Monorepo Template

Generic, reusable monorepo for embeddable product-page widgets.

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
| `pageHeader` | `#pageHeader` / `window.pageHeader` | 5173 |
| `overview` | `#overview` / `window.overview` | 5174 |
| `performance` | `#performance` / `window.performanceApp`* | 5175 |
| `portfolioBreakdown` | `#portfolioBreakdown` / `window.portfolioBreakdown` | 5176 |
| `literature` | `#literature` / `window.literature` | 5177 |

\* Reserved-name safe (`window.performance` is a browser API).

## Common commands

```bash
npm run apps:list
npm run apps:add -- holdingsExposure 5178
npm run apps:rename -- literature materials
npm run client:set -- acme

npm run dev -- overview
npm run build:staging          # uses hostMode from studio.config.json
npm run build:staging:cms      # force CMS artifacts
npm run build:staging:dxm      # force DXM artifacts

npm run audit:security
```

## Host docs

- [`hosts/dxm/README.md`](./hosts/dxm/README.md)
- [`hosts/cms/README.md`](./hosts/cms/README.md)
- [`docs/integration-specs/_TEMPLATE.md`](./docs/integration-specs/_TEMPLATE.md) — CMS product-page integration spec

## Layout

```text
studio.config.json          # hostMode + app registry
hosts/{dxm,cms}/
docs/integration-specs/
BuildResult/{dxm,cms}/<env>/<appId>/
development_v1/product-page-apps/ksys-<client>-<appId>/
```

Keep `../ksys-studio-widget-template` beside this repo for `apps:add`.
