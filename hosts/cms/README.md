# External CMS host (WordPress / Pantheon / custom)

Use this host mode when widgets are embedded on the **client’s own CMS**, not Kurtosys DXM.

For those implementations you typically maintain an **integration spec per product page** (Confluence-style). Start from:

- [`docs/integration-specs/_TEMPLATE.md`](../../docs/integration-specs/_TEMPLATE.md)

## Characteristics

| Topic | CMS default |
|--------|-------------|
| Mount | Theme / shortcode / block wrapper with `data-*` attrs |
| React | **Bundled** into the widget JS (self-contained) |
| Bundle | IIFE still, but React is not externalized |
| Deploy | Client CDN, theme `/js`, or Pantheon asset pipeline |
| Docs | Integration spec per product page / region |

## Build outputs

```bash
npm run init -- --host cms --client acme --cms-platform wordpress
npm run build:stg
# → BuildResult/cms/stg/<appId>/<appId>.js
```

If `hostMode=both`, CMS artifacts land under `BuildResult/cms/...` and DXM under `BuildResult/dxm/...`.

## Embed snippet (WordPress example)

```html
<!-- wp:html -->
<div
  id="overview"
  data-input-client-code="YOUR_CLIENT_CODE"
  data-input-culture="en-US"
  data-input-product-type="institutionalStrategies"
></div>
<script src="https://cdn.example.com/widgets/overview.js" defer></script>
<!-- /wp:html -->
```

Or enqueue from `functions.php` / a small mu-plugin, localizing config:

```php
wp_enqueue_script('ksys-overview', $src, [], $ver, true);
wp_add_inline_script('ksys-overview', 'window.ksysOverviewBoot=' . wp_json_encode($boot) . ';', 'before');
```

## Pantheon / custom

Same JS artifact; only the deploy path and cache headers change. Keep the integration spec as the source of truth for mount selectors, cultures, and QA.

## Checklist

1. `npm run init -- --host cms` (or `both`)
2. Copy `_TEMPLATE.md` → `docs/integration-specs/<product-page>.md`
3. Fill mount selector, script URL, required inputs, regions
4. Build CMS bundle (`HOST_MODE=cms`)
5. Deploy asset; paste snippet into CMS
6. QA keyboard, contrast, and screen-reader labels on the live theme
