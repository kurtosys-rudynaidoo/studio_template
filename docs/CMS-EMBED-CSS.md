# CMS embed CSS

WordPress and Elementor themes style bare `button`, `input`, `table`, and heading elements with **unlayered** CSS. Tailwind v4 emits preflight and utilities inside `@layer`. Unlayered rules beat layered rules regardless of specificity, so a theme `button { border: 1px solid }` wins over a widget utility.

Some themes also set `background-image: initial !important` on every element, which strips gradient and image backgrounds.

## Build pipeline

Run this on the **finished** CSS, after Tailwind has emitted it. `npm run dev` stays unscoped so local preview is unchanged.

1. `scripts/postcss-scope-embed.cjs` flattens every `@layer` block, then prefixes selectors with the mount id and `${mountId}-portal`. `:root`, `html`, and `body` map to that scope. One ID outranks theme class and element selectors. The same file is copied into `ksys-studio-widget-template/scripts/` so a scaffolded app still builds outside this monorepo.
2. Each widget `scripts/inline-css.cjs` scopes its CSS to `containerId` and `${containerId}-portal`, then inlines it into the JS bundle.
3. App Manager `prepare-shared-css.cjs` scopes `shared.css` to every product-page app in `studio.config.json` (apps without `"standalone": true`) and each app's portal id. Standalone apps such as Fund Centre keep their own bundle.
4. `src/styles/host-reset.css` restores heading, table, and form-control properties that preflight does not clear. It is imported from each app entry CSS inside `@layer base`, then unlayered by the build.
5. Portals render into `portalRoot(containerId)`, which creates `#${containerId}-portal` on `document.body`. Do not portal to `document.body` itself.

`bp-shared.css` is not a deliverable. Builds delete it if a previous output left it behind, and `scripts/build-all.mjs` fails if an app emits it.

## New widget checklist

1. Scaffold from `ksys-studio-widget-template`. The template already imports `host-reset.css`, ships `portal-root.ts`, and scopes CSS in `inline-css.cjs`.
2. Register the app in `studio.config.json`. Leave `standalone` unset for a product-page widget so App Manager includes its mount in `shared.css`. Set `"standalone": true` for a page that ships one bundle and does not use App Manager.
3. Add the app to the `@source` list in `apps/ksys-<client>-appManager/src/styles/shared.entry.css` when its utilities must be available from the shared sheet.
4. Keep `@import "tailwindcss" important`. That flags utilities. It does not unlayer preflight, so the PostCSS step is still required.
5. Call `portalRoot(containerId)` for tooltips and menus.
6. Do not rely on `background-image` when the host clears it. Use an `<img>`, an inline SVG, or a scoped `background-image` with `!important`.
7. Set `type="button"` on buttons that must not submit a host form.
8. Verify on a page that loads the real theme. A Vite preview does not reproduce unlayered host CSS.

## What not to copy from a client project

Mount ids, brand colours, and layout measurements belong in the client repo. This template only keeps the cascade fix.
