# Integration spec — Product page template

> Mirror of the Confluence-style “Product Page Strategies / All Regions” integration pages.
> Duplicate this file per product page (and region if needed).

**Status:** Draft  
**Client:** `{{CLIENT}}`  
**Host:** External CMS (`wordpress` | `pantheon` | `custom`)  
**Product page:** `{{PRODUCT_PAGE_NAME}}`  
**Primary culture(s):** `en-US`  
**Owner:**  
**Last updated:**

---

## 1. Purpose

Describe which widgets appear on this product page and how the CMS embeds them.

## 2. Page inventory

| Section / widget | App id | Mount selector | Required inputs | Notes |
|------------------|--------|----------------|-----------------|-------|
| Header | `pageHeader` | `#pageHeader` | client-code, culture, product-type | |
| Overview | `overview` | `#overview` | client-code, culture, product-type | |
| Performance | `performance` | `#performance` | client-code, culture, product-type | embed global: `performanceApp` |
| Portfolio breakdown | `portfolioBreakdown` | `#portfolioBreakdown` | client-code, culture, product-type | |
| Literature | `literature` | `#literature` | client-code, culture | |

## 3. Environments

| Env | Script base URL | Notes |
|-----|-----------------|-------|
| Dev | `https://…` | |
| Staging | `https://…` | |
| Production | `https://…` | |

Artifact path after monorepo build:

```text
BuildResult/cms/{dev|stg|prd}/<appId>/<appId>.js
```

## 4. Embed contract

### Markup

```html
<div
  id="overview"
  data-input-client-code="{{CLIENT_CODE}}"
  data-input-culture="en-US"
  data-input-product-type="institutionalStrategies"
></div>
<script src="{{SCRIPT_BASE}}/overview.js" defer></script>
```

### Input resolution order (widget)

1. Mount node `data-input-*`
2. App Manager node (if present)
3. Query string fallbacks (`kurtosys_id`, `clientCode`) — local/dev only

### Embed globals

| App id | `window` global |
|--------|-----------------|
| overview | `overview` |
| pageHeader | `pageHeader` |
| performance | `performanceApp` (reserved-name safe) |
| portfolioBreakdown | `portfolioBreakdown` |
| literature | `literature` |

## 5. Regions / cultures

| Region | Culture | Product types on page | Special rules |
|--------|---------|------------------------|---------------|
| US | en-US | | |
| UK | en-GB | | |
| … | | | |

## 6. CMS implementation notes

- Platform: WordPress / Pantheon / other
- How script is enqueued (theme / plugin / tag manager)
- Caching / CDN purge steps
- Auth / geo gates if any

## 7. Accessibility QA

- [ ] Keyboard only: all controls reachable; visible focus
- [ ] Screen reader: landmarks / headings / button names make sense
- [ ] Contrast holds against the CMS theme
- [ ] Images have correct alt (or empty if decorative) — use `accessibleImageProps` in widgets
- [ ] Host tag-manager tracking pixels have `alt=""` (Level Access BP-662); App Manager also guards late-injected beacons
- [ ] Reduced-motion respected
- [ ] Level Access (or equivalent) scan on this page after go-live

## 8. Functional QA

- [ ] Correct client / share class data for sample IDs
- [ ] Culture switch (if applicable)
- [ ] Mobile layout (documents / chrome per page requirements)
- [ ] No CMS CSS regressions (Tailwind `important` enabled)

## 9. Contacts & links

- Design / DXM reference (if any):
- Confluence parent:
- Studio apps (if dual-host):
- Support:

## 10. Change log

| Date | Change | Author |
|------|--------|--------|
| | Initial draft | |
