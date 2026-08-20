# Accessibility defaults (WCAG 2.1 / 2.2)

These defaults ship in every scaffolded app. Keep them when implementing client UI.

## Built-in

| Concern | Implementation |
|---------|----------------|
| Perceive (contrast) | `--studio-color-text` / `--studio-color-text-muted` on white background |
| Understand (structure) | Landmarks (`section` + `aria-labelledby`), single clear `h2` heading |
| Navigate (keyboard) | Global `:focus-visible` outline; `FOCUS_RING` utility for interactive elements |
| Interact (names) | `VisuallyHidden` for supplemental SR text; `accessibleImageProps` for images |
| Motion | `prefers-reduced-motion: reduce` disables non-essential animation |
| Lint | `eslint-plugin-jsx-a11y` recommended rules |
| Host tracking pixels | App Manager marks nameless beacon `<img>` nodes decorative (BP-662 safety net) |

## Checklist for new UI

1. Every interactive control is reachable by Tab and has a visible focus style
2. Images: decorative → empty `alt`; informative → meaningful `alt` (never omit `alt`)
3. Do not rely on color alone for status (pair with text/icon)
4. Form fields have associated labels
5. Dynamic updates use `aria-live` where needed
6. Hit targets are large enough (≈24×24px minimum)
7. Text remains readable at 200% zoom
8. After DXM/CMS publish: Level Access (or equivalent) scan — confirm no unnamed `body > img` beacons

## Images (Level Access / BP-662)

**Finding:** *Img element missing accessible name* (example ID BP-662 on Boston Partners product pages).

**In our widgets**

| Kind | Rule |
|------|------|
| Informative (chart, logo, unique photo with no adjacent name) | Meaningful `alt` via `accessibleImageProps({ alt: '…' })` |
| Decorative / redundant (icon next to link text, PM photo when name is adjacent) | `accessibleImageProps({ decorative: true })` → `alt=""` |
| Tracking / 1×1 beacon | Do **not** add from widget code |

**Host page example (not from Studio widgets):**

```html
<body>
  <img src="https://d21y75miwcfqoq.cloudfront.net/2ae264f7"
       style="position: absolute"
       referrerpolicy="no-referrer-when-downgrade">
```

CloudFront hash URL + absolute positioning + direct `body` child = marketing/analytics pixel with **no** `alt`.

### What new projects get

1. **Prefer host fix** — tag manager / DXM script should emit `alt=""` (or use a non-`<img>` beacon).
2. **App Manager safety net** — required `appManager` runs `installDecorativeTrackingImageGuard()` on load and watches for late-injected pixels matching the BP-662 pattern, then sets `alt=""` + `role="presentation"`.
3. **Widget lint** — `jsx-a11y` + `accessibleImageProps` so scaffolded UI never ships `<img>` without `alt`.

Implementation: `apps/ksys-<client>-appManager/src/utils/decorative-tracking-images.ts`.

## Components

- `src/components/a11y/a11y.tsx` — `VisuallyHidden`, `FOCUS_RING`, `accessibleImageProps`
- `src/index.css` — contrast tokens, focus styles, reduced motion
- App Manager — decorative tracking-image guard (above)
