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

## Checklist for new UI

1. Every interactive control is reachable by Tab and has a visible focus style
2. Images: decorative → empty `alt`; informative → meaningful `alt`
3. Do not rely on color alone for status (pair with text/icon)
4. Form fields have associated labels
5. Dynamic updates use `aria-live` where needed
6. Hit targets are large enough (≈24×24px minimum)
7. Text remains readable at 200% zoom

## Components

- `src/components/a11y/a11y.tsx` — `VisuallyHidden`, `FOCUS_RING`, `accessibleImageProps`
- `src/index.css` — contrast tokens, focus styles, reduced motion
