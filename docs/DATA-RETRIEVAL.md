# Studio widget data retrieval

How embeds in this monorepo **read** fund, document, and config data from Kurtosys.

This is not the full Kurtosys platform API. Widgets are client-side IIFE bundles. Use **read** endpoints only. Typed contracts live in `apps/ksys-client-fundCentre/src/types/ksys-api.types.ts`; copy that pattern into new apps.

## Auth and environment

| Item | How this repo does it |
|------|------------------------|
| Header | `x-ksys-token: <permanent token>` — **not** `Authorization: Bearer` |
| Token source | `config/env.config.cjs` → `apiToken` → Vite `VITE_KURTOSYS_API_TOKEN` |
| API origin | `env.config.cjs` `baseUrl` (default `https://api-us.kurtosys.app`) as `VITE_KURTOSYS_API_URL` |
| FundPress origin | optional `fundApiUrl` (`https://api-us.fundpress.io`) when the client uses it |
| Method | almost always `POST` + `Content-Type: application/json` |

Use a **read-only** permanent token. The token is compiled into the embed; do not use an admin or write token.

Shared helper (Fund Centre): `src/lib/kurtosys-request.ts` — POST, `x-ksys-token`, in-flight dedupe, 5-minute GET cache. Do **not** cache `retrieveDocument` (URLs are short-lived).

## Endpoints widgets actually call

Paths include the service prefix. Do not call `/searchEntity` at the API root.

| Use | Method | Path |
|-----|--------|------|
| Funds / share classes / related includes | `POST` | `/fund/searchEntity` |
| Filter facet values | `POST` | `/fund/getfilters` |
| Manager photo | `GET` | `/fund/fundmanagerpicture?code=&token=` |
| Standalone document search (e.g. Forms) | `POST` | `/documents/searchDocuments` |
| Open / download a document | `POST` | `/documents/retrieveDocument` |
| Global disclaimers | `POST` | `/config/listdisclaimers` |
| UI translations | `POST` | `/config/listtranslations` |

Typical success body is **200** JSON with `values` (and `total` / `start` / `limit`). Treat `data` as a legacy alias for `values`.

## `POST /fund/searchEntity`

Primary data call for Fund Centre, overview, performance, portfolio, literature.

```json
{
  "type": "CLSS",
  "clientCode": [""],
  "fundList": ["us_institutional"],
  "fundListExclusion": [],
  "start": 0,
  "limit": 100,
  "culture": "en-US",
  "sourceCulture": "Default",
  "translate": true,
  "preserveOriginal": true,
  "applyFormats": true,
  "disclaimers": true,
  "search": [
    { "property": "type", "values": ["Mutual Fund"], "matchtype": "MATCH" }
  ],
  "include": {
    "statistics": { "limitTo": ["NAV", "YTD"] },
    "commentaries": { "limitTo": ["OBJECTIVE"] },
    "fundManagers": {},
    "documents": {
      "excludeExpired": true,
      "joinSpec": [
        { "joinFrom": "kurtosys_id", "joinTo": "kurtosys_id", "search": [] },
        { "joinFrom": "type", "joinTo": "type", "search": [] },
        { "joinFrom": "class_name", "joinTo": "fund_name", "search": [] }
      ]
    }
  }
}
```

- `type` is the entity type (`CLSS` for share class in Fund Centre).
- `fundList` comes from embed `data-fundlist` or `defaultFundlist` in `env.config.cjs`.
- `search[]` uses `property` / `values` / `matchtype` (`MATCH` | `NOT_MATCH` | `CONTAINS` | `NOT_CONTAINS`).
- `include` pulls related rows in one round trip. Standard document joins: `apps/ksys-client-fundCentre/src/constants/document-join-spec.ts`.
- Response entities: `properties_pub`, `statistics`, `documents`, `commentaries`, `fundManagers`, `disclaimers`, and `historicalDatasets` when included.
- Historical snapshots: see [Historical datasets](#historical-datasets) — **today** as `asAtDate` only when the fetch is historical datasets **and** the user did not supply a date.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-ksys-token: YOUR_TOKEN" \
  "https://api-us.kurtosys.app/fund/searchEntity" \
  -d '{"type":"CLSS","fundList":["us_institutional"],"start":0,"limit":5,"culture":"en-US"}'
```

## Historical datasets

**When this applies:** the component is loading Kurtosys **Historical Dataset** tables **and** there is **no date from the user** (no date picker, no `data-input-as-at-date`, no query/date prop).

If either is false, do not use the today default:

- Not historical datasets (statistics, documents, properties, etc.) — this section does not apply.
- User or host **did** pass a date — send that value as `asAtDate`. Do not replace it with today.

**When it does apply:** one `searchEntity` include at **runtime**, `asAtDate` = **today** (`YYYY-MM-DD`).

Do not bake a date into the Vite build. Do not use a DXM page script to stamp dates on App Manager.

```json
"include": {
  "historicalDatasets": {
    "asAtDate": "2026-08-27"
  }
}
```

Treat that date as an **as-of ceiling**: the API should return the latest snapshot with `as_at_date` **on or before** today. One round trip — no date-discovery call and no month-end heuristic.

| Rule | Detail |
|------|--------|
| Date to pass | **User/host date if present.** Only if none: current calendar date as `YYYY-MM-DD` |
| User/host date | Date picker, widget prop, query param, or `data-input-as-at-date` — all win over today |
| UI “as of” | Use `as_at_date` / `asAtDate` **on the response rows**, not the date you sent |
| Empty result (today, no user date) | Instance may be **exact-match**. Confirm once with a curl; last calendar month-end is a fallback only then |
| Avoid | Using today when the user picked a date; applying this to non-historical includes; DXM date scripts; build-time dates |

## Documents

**On a fund (joinSpec)** — attach files to `searchEntity` via `include.documents.joinSpec`. Filter types with `search` on a join leg (`document_type` MATCH).

**Standalone list** — `POST /documents/searchDocuments`:

```json
{
  "type": "CLSS",
  "search": [{ "property": "document_type", "values": ["Factsheet"], "matchtype": "MATCH" }],
  "sort": { "key": "document_type", "direction": "ASC" },
  "start": 0
}
```

**Open a file** — `POST /documents/retrieveDocument` with `{ "clientCode": ["<document clientCode>"] }`. Response is JSON with a URL **or** raw bytes. Storage URLs often need a follow-up `GET` with `x-ksys-token` (new-tab navigation does not send the header). See `KSYSApiService.retrieveDocument`.

## Filters, disclaimers, translations

```json
POST /fund/getfilters
{ "type": "CLSS", "filterProperties": ["asset_class", "region"], "fundList": ["us_institutional"] }

POST /config/listdisclaimers
{ "global": true }

POST /config/listtranslations
{ "culture": "en-US", "translationCulture": ["en-US"] }
```

## Mount inputs that drive requests

Resolved by App Manager / `data-input-*` (see `resolve-mount-inputs.ts`):

- `client-code` / `culture` / `product-type` — product-page widgets
- Optional `as-at-date` — user/host as-at for historical datasets (wins over today; see [Historical datasets](#historical-datasets))
- Fund Centre also: `data-fundlist`, `data-base-url`, `data-culture` on `#fundCentre` / `#fundCenter`

## Reference implementation

| Piece | Location |
|-------|----------|
| Request helper | `apps/ksys-client-fundCentre/src/lib/kurtosys-request.ts` |
| API service | `apps/ksys-client-fundCentre/src/services/ksys-api-service.ts` |
| Types | `apps/ksys-client-fundCentre/src/types/ksys-api.types.ts` |
| Request builder | `apps/ksys-client-fundCentre/src/services/fund-service.ts` |

Do not call login, impersonation, upsert, delete, WordPress/DXM admin, or workflow APIs from these embeds.
