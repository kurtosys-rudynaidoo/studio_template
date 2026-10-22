# Claude — ksys-studio-template

Generic Kurtosys Studio embed monorepo. Duplicate the whole folder per client, then `npm run init`. Cursor rules in `.cursor/rules/` are the same source of truth — follow them.

Read first: `README.md` (**Page types**), `docs/DATA-RETRIEVAL.md`, `docs/CMS-EMBED-CSS.md`, `docs/CONTENT-MANAGER.md`.

@.cursor/rules/embed-page-types.mdc
@.cursor/rules/historical-datasets.mdc
@.cursor/rules/cms-embed-css.mdc
@.cursor/rules/content-manager.mdc

## Kurtosys reads

- Header `x-ksys-token` (not `Authorization: Bearer`). Prefixed paths: `/fund/searchEntity`, `/fund/getfilters`, `/documents/searchDocuments`, `/documents/retrieveDocument`, `/config/listdisclaimers`, `/config/listtranslations`.
- Token from `config/env.config.cjs` → `apiToken` (read-only). Do not invent fallback copy when content or data is missing.
- Historical `asAtDate` = today **only** when the call is `include.historicalDatasets` **and** the user/host did not pass a date. UI “as of” comes from the response.

## Page types — do not mix

| Page | Apps | App Manager |
|------|------|-------------|
| Standalone | Fund Centre, document library | No. One JS file on its own page. |
| Product page | `appManager` + pageHeader, overview, performance, portfolioBreakdown, literature | Yes. Publishes `data-input-*`, loads children, ships `shared.css`. |

`literature` ≠ document library. Do not put App Manager on the Fund Centre page.

Default build order: Fund Centre (including list → product URL) → product-page widgets → document library (`npm run apps:add` when that starts). Never rename or remove `appManager`.

## Commands

```bash
npm run init -- --host dxm|cms|both --client <slug>
npm run client:set -- <slug>
npm run apps:add -- <appId> [port]
npm run dev -- fundCentre
npm run build:stg
```

## Style of work

- Keep the repo lean. Do not add platform API dumps or extra `src/docs` copies.
- Prefer editing existing Fund Centre patterns (`ksys-api-service.ts`, `kurtosys-request.ts`) over new stacks.
- Verify UI in the browser when you change layout, data, or embed behaviour.
- Commit only when the user asks.
