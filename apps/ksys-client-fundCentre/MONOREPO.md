# Fund Centre in the Studio monorepo

This app is the **Fund Centre** surface (list / filter / performance / materials),
lives under `apps/ksys-<client>-fundCentre/`.

## Relevant config

| File | Purpose |
|------|---------|
| `config/env.config.cjs` | `dev` / `stg` / `prd` — GUID, API token, `filename` (`fundCentre.js`), `containerId`, **`defaultFundlist`**, **`subadvisedLandingUrl`** |
| `index.html` | Local `#root` + `#fundCenter` data-* contract for preview |
| `vite.config.ts` | `HOST_MODE` (dxm/cms), injects `VITE_EMBED_DEFAULT_FUNDLIST`, `VITE_SUBADVISED_LANDING_URL`, Kurtosys tokens |
| `vite.config.single.ts` | Optional CMS scoped single-bundle (`npm run build:single`) |
| `scripts/postcss-scope-embed.cjs` | Scopes CSS under embed container for Elementor/WP |

## Embed contract

- Config node: `#fundCenter` or `#fundCentre` with `data-culture`, `data-fundlist`, `data-base-url`, `data-subadvised-landing-url`, …
- Mount node (IIFE): `#fundCentre` (preferred) or `#fundCenter` / `#root` (dev) / `#your-app-container` (legacy loader)

## Data retrieval

Kurtosys reads (`x-ksys-token`, `/fund/searchEntity`, documents, filters): [`docs/DATA-RETRIEVAL.md`](../../docs/DATA-RETRIEVAL.md).

## Fill before deploy

1. Studio GUIDs + API tokens in `config/env.config.cjs`
2. Client `defaultFundlist` and optional `subadvisedLandingUrl`
3. Host page `data-base-url` / product URL properties (`url_type`, `url_suffix`) for deep links into product pages
