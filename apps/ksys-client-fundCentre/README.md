# Fund Centre (`ksys-client-fundCentre`)

Kurtosys Studio embeddable **Fund Centre** — fund list, filters, performance, materials, and optional forms.

## Quick start (from monorepo root)

```bash
npm run dev -- fundCentre
```

Or inside this folder:

```bash
npm install
npm run dev
```

## Config

Edit `config/env.config.cjs` for each environment (`dev` / `stg` / `prd`):

| Field | Purpose |
|-------|---------|
| `guid` | Studio Application Manager GUID |
| `apiToken` | Public Kurtosys API token |
| `filename` / `containerId` | `fundCentre.js` / `#fundCentre` |
| `defaultFundlist` | Default `fundList` when host omits `data-fundlist` |
| `subadvisedLandingUrl` | Optional Subadvised tab URL (empty to hide) |

Optional mutual-fund display prefix strip: set `VITE_MUTUAL_FUND_NAME_PREFIX` in Vite define / env when needed.

See `MONOREPO.md` for embed contract details.

## Build

```bash
npm run build:dev
npm run build:stg
npm run build:prd
```

Deployable output: `dist-build/fundCentre.js` (scaffolding removed by `clean-dist-artifacts`).
