# App Manager (required default)

Every client project **must** keep `ksys-<client>-appManager/`.

It is the product-page shell that:

1. Publishes **shared CSS** (`shared.css`, plus `bp-shared.css` alias)
2. Loads child widget scripts by Studio GUID (`appManager.js`)
3. Applies an **a11y safety net** for nameless host tracking `<img>` beacons (Level Access BP-662 pattern) — see `docs/ACCESSIBILITY.md` and `src/utils/decorative-tracking-images.ts`

## Outputs

```text
BuildResult/<host>/<env>/appManager/
  appManager.js
  shared.css
  bp-shared.css          # same bytes as shared.css (legacy filename)
```

## Config

`config/env.config.cjs`:

| Field | Purpose |
|-------|---------|
| `guid` | This shell’s Studio GUID |
| `childAppGuids.*` | GUIDs for pageHeader, overview, performance, portfolioBreakdown, literature |
| `sharedCssUrl` | `${embedBaseUrl}/shared.css` injected at runtime in production |

Fill child GUIDs after each widget is uploaded to Studio. Empty GUID → that script is skipped.

## Mount contract

```html
<div
  id="appManager"
  data-ksys-app-template-id="ksys-app-manager"
  data-input-client-code="…"
  data-input-culture="en-US"
  data-input-product-type="mutualFunds"
></div>
<!-- host page also provides #pageHeader, #overview, … -->
<script src="…/appManager.js"></script>
<link rel="stylesheet" href="…/shared.css" />
```

Do **not** rename or remove this app (`apps:rename` / project setup treat it as required).
