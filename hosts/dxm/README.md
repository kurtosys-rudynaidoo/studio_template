# DXM / Kurtosys Studio host

Use this host mode when widgets are embedded on **Kurtosys DXM** pages (often Elementor) and loaded via Studio `applicationManager/apps/{guid}/`.

## Characteristics

| Topic | DXM default |
|--------|-------------|
| Mount | `#<appId>` + App Manager `data-input-*` |
| React | **External** (provided by DXM / App Manager page) |
| Bundle | IIFE, CSS inlined into JS |
| Deploy | Upload JS to Studio application asset |
| Config | `config/env.config.cjs` GUIDs per env |

## Local preview

Each app’s `index.html` already simulates App Manager + mount node:

```bash
npm run dev -- overview
```

## Build outputs

```bash
npm run init -- --host dxm --client acme
npm run build:stg
# → BuildResult/dxm/stg/<appId>/<appId>.js
```

## DXM checklist

1. Studio application created; GUID copied into `env.config.cjs`
2. DXM page has App Manager (or equivalent) with `data-input-client-code`, `data-input-culture`, `data-input-product-type`
3. Mount `<div id="overview"></div>` (matching `containerId`)
4. Script tag / App Manager child load points at uploaded `overview.js`
5. Tailwind `important` keeps styles above Elementor
6. Keyboard focus + landmarks still work inside the DXM chrome
7. **A11y / Level Access (BP-662):** nameless tracking `<img>` beacons on the host page.
   - Prefer fixing the tag (add `alt=""`).
   - Required `appManager` also applies a decorative-pixel safety net (see `docs/ACCESSIBILITY.md`).
   - Widget bundles must never omit `alt` on their own images (`accessibleImageProps`).

## Related

- Monorepo user guide: `USER_GUIDE.html`
- Accessibility: `docs/ACCESSIBILITY.md`
- Widget mount helpers: `src/utils/resolve-mount-inputs.ts`
