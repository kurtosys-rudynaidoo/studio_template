# Kurtosys Studio Widget Template

Reusable **DXM-embeddable** Vite + React + TypeScript widget template for Kurtosys Studio product-page apps.

Use this for new client builds so every widget shares the same mount, build, and Studio deploy shape.

## What you get

| Area | Pattern |
|------|---------|
| Mount | DXM `#containerId` + App Manager `data-input-*` via `resolve-mount-inputs` |
| Build | IIFE bundle, React externalized, CSS inlined into the JS |
| Envs | `build:dev` / `build:stg` / `build:prd` via `BUILD_ENV` + `config/env.config.cjs` |
| Output | Flat `dist-build/<widget>.js` (ready for Fundpress / Studio upload) |
| Dev | Local `index.html` simulates App Manager + mount node |

## Quick start (single widget)

```bash
cd ~/Documents/GitHub/ksys-studio-widget-template
npm install
npm run dev
```

Then:

1. Rename the feature under `src/components/Widget/`
2. Fill `config/env.config.cjs` (guid, tokens, `filename`, `containerId`)
3. Point DXM at the same mount id as `containerId`
4. Build: `npm run build:stg` or `npm run build:prd`

## Scaffold into a client monorepo

```bash
chmod +x scripts/scaffold-app.sh

# Creates ksys-acme-pageHeader under the given apps folder
./scripts/scaffold-app.sh acme pageHeader \
  ~/Documents/GitHub/acme-pp/apps
```

See [MONOREPO.md](./MONOREPO.md) for the recommended multi-app layout (same shape as BP).

## Project layout

```
ksys-studio-widget-template/
├── config/env.config.cjs          # per-env guid, tokens, filename, containerId
├── scripts/                       # flatten, inline-css, embed-loader, scaffold-app
├── src/
│   ├── main.tsx                   # find mount → resolve inputs → React root
│   ├── utils/resolve-mount-inputs.ts
│   ├── components/App/            # thin shell
│   ├── components/Widget/         # your UI lives here
│   ├── services/                  # Kurtosys / Fundpress API calls
│   ├── hooks/
│   └── types/
├── vite.config.ts                 # IIFE + external React + env defines
└── index.html                     # local DXM simulator
```

## Naming convention

Follow BP-style folders so deploy tools can discover apps:

```
ksys-<clientSlug>-<widgetId>/
```

Examples: `ksys-acme-pageHeader`, `ksys-acme-overview`, `ksys-acme-keyStatistics`.

`widgetId` should match:

- `config.filename` → `pageHeader.js`
- `config.containerId` / DXM mount → `#pageHeader`
- package `name` → `ksys-acme-pageHeader`

## Build outputs

```bash
npm run build:dev       # BUILD_ENV=dev
npm run build:stg       # BUILD_ENV=stg
npm run build:prd       # BUILD_ENV=prd
```

Artifacts land in `dist-build/`. For deploy packages, copy only the relevant JS (and shared CSS from a shell/appManager if you have one) into `BuildResult/<env>/<widgetId>/`.

## Differences from `ksys-gen-ai-template`

This template includes patterns that BP product pages actually use in production:

- IIFE + external React (Studio / DXM host provides React)
- CSS inlined into the JS bundle (`scripts/inline-css.cjs`)
- `BUILD_ENV` separate from `NODE_ENV`
- DXM mount + `data-input-*` resolution (including App Manager)
- MutationObserver guard against DXM wiping the mount children
- Placeholder Fundpress URL + saved-search token fields

## Next steps for a new client

1. Copy this repo or scaffold apps into `apps/`
2. Add shared client config (document rules, fetch cache, etc.) under a sibling `config/` folder when needed
3. Keep the required `appManager` shell (loads child widgets by GUID + shared CSS)
4. Wire `tools/bp_cli.py`-style build/package/deploy once GUIDs exist in Studio
