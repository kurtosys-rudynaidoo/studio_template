# Handover — for Claude

Snapshot for a fresh Claude session on this template (or a client clone). Read `CLAUDE.md` first.

## Goal

Keep `ksys-studio-template` as the generic Studio monorepo. Next client work: clone, rename, `npm run init`, then **Fund Centre first** (standalone page), then product-page widgets, then a standalone document library.

## Where it stands

| Item | Status |
|------|--------|
| Template (apps, init, hosts, Fund Centre) | Done |
| Lean `docs/DATA-RETRIEVAL.md` + historical-dataset rule | Done |
| Standalone vs product-page docs + Cursor rules | Done |
| CMS embed CSS unlayer / ID-scope (`docs/CMS-EMBED-CSS.md`) | Done |
| Optional Content Manager proxy (`docs/CONTENT-MANAGER.md`) | Done |
| Secure Delivery v4: code safety (DOMPurify `safeHtml`, `safeUrl`, no token in URLs/logs, token only to API origin, prod log stripping, a11y) | Done (`docs/update-handover`) |
| Secure Delivery v4: production dependency CVEs (4.1) — vite 7.3.7, postcss 8.5.29, tar 7.5.22, nanoid 3.3.20, source-map-js 1.2.2 pinned in every app | Done (`docs/update-handover`); dev-tool CVEs (shadcn CLI, vitest, typescript-eslint) still open |
| Secure Delivery v4: API token out of the bundle (3.1), CI/Dependabot/SBOM/threat model (4.3, 8, App. C), SRI + CSP (3.3) | **Not started** — token design deferred by user |
| Client clone / rename / init | **Not started** |
| Fund Centre client build | **Not started** |
| Product pages / document library | **Not started** |

## Decisions

- **No 626-endpoint API dump.** One widget-data guide only.
- Historical datasets: `asAtDate` = **today** only if the fetch is HD **and** the user did not supply a date. No DXM date-stamp scripts; no build-time date.
- Fund Centre and document library are **always standalone** (own page, one JS, no App Manager).
- Product page = App Manager + widgets. `literature` is not the document library.
- Build order: Fund Centre (list → product URL) → product widgets → document library.
- CMS: unlayer + scope CSS; publish `shared.css` only (never `bp-shared.css`).
- Content Manager: CMS holds the token; widgets use same-origin proxy only when opted in. Missing content = `undefined`, no invented copy.

## Files that matter

- `CLAUDE.md` — standing Claude rules
- `README.md` — page types, commands
- `docs/DATA-RETRIEVAL.md`, `docs/CMS-EMBED-CSS.md`, `docs/CONTENT-MANAGER.md`
- `.cursor/rules/{embed-page-types,historical-datasets,cms-embed-css,content-manager}.mdc`
- Fund Centre reference: `apps/ksys-client-fundCentre/src/services/ksys-api-service.ts`, `src/lib/kurtosys-request.ts`, `src/types/ksys-api.types.ts`

## Next step

On the **client** repo (not this template, unless still preparing it):

1. Clone this repo, rename the folder to the client.
2. `npm install` then `npm run init -- --host <dxm|cms|both> --client <slug>`.
3. Fill Fund Centre `config/env.config.cjs` (GUID, read-only token, `defaultFundlist`).
4. Build Fund Centre as a standalone embed. Agree product-page URL contract (`data-base-url` / `url_type` / `url_suffix`) before starting product widgets.

In the first client message, state: host, client slug, and “phase 1 = standalone Fund Centre only.”

## Where

- Repo: `/Users/rudy.naidoo/Documents/GitHub/ksys-studio-template`
- Branch: `main` (`cms-embed-and-content-manager` is merged)
- Latest commit: `6d0ef8a` — Add CLAUDE.md and HANDOVER.md for Claude Code.
- Working tree: clean (as of this note)
