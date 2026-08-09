# DXM (Digital Experience Management)

Content management, domains, and digital experience features

## Endpoints

### mTLS login

**Method:** `POST`  
**Path:** `/login`  
**Description:** mTLS login

#### Parameters
**Body Parameters:**
- `username` (string) **Required** - Body parameter: username
- `password` (string) **Required** - Body parameter: password
- `clientName` (string) **Required** - Body parameter: clientName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/login"
```

---

### List Domain Whitelist

**Method:** `POST`  
**Path:** `/client/domainwhitelist/list`  
**Description:** List Domain Whitelist

#### Parameters
**Body Parameters:**
- `clientName` (string) **Required** - Body parameter: clientName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/client/domainwhitelist/list"
```

---

### Upsert Domain Whitelist

**Method:** `POST`  
**Path:** `/client/domainwhitelist/upsert`  
**Description:** Upsert Domain Whitelist

#### Parameters
**Body Parameters:**
- `clientName` (string) **Required** - Body parameter: clientName
- `whitelist` (object) **Required** - Body parameter: whitelist

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/client/domainwhitelist/upsert"
```

---

### Get wordpress domain details

**Method:** `POST`  
**Path:** `/getWordpressDomainDetails`  
**Description:** Get wordpress domain details

#### Parameters
**Body Parameters:**
- `domain` (string) **Required** - Body parameter: domain
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressDomainDetails"
```

---

### Insert site redirect

**Method:** `POST`  
**Path:** `/insertRedirect`  
**Description:** Insert site redirect

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `fromUri` (string) **Required** - Body parameter: fromUri
- `toUri` (string) **Required** - Body parameter: toUri
- `ignoreQueryString` (boolean) **Required** - Body parameter: ignoreQueryString
- `permanent` (boolean) **Required** - Body parameter: permanent

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertRedirect"
```

---

### Get list of site redirects

**Method:** `POST`  
**Path:** `/getRedirects`  
**Description:** Get list of site redirects

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit
- `searchTerm` (string) **Required** - Body parameter: searchTerm

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getRedirects"
```

---

### Delete site redirect

**Method:** `POST`  
**Path:** `/deleteRedirect`  
**Description:** Delete site redirect

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `wordpressRedirectId` (number) **Required** - Body parameter: wordpressRedirectId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteRedirect"
```

---

### Insert Wildcard Redirect

**Method:** `POST`  
**Path:** `/upsertWildcardRedirects`  
**Description:** Insert Wildcard Redirect

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `redirects` (object) **Required** - Body parameter: redirects

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWildcardRedirects"
```

---

### Get instance redirect counts

**Method:** `POST`  
**Path:** `/getInstanceRedirectCounts`  
**Description:** Get instance redirect counts

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getInstanceRedirectCounts"
```

---

### Get wildcard redirects

**Method:** `POST`  
**Path:** `/getWildcardRedirects`  
**Description:** Get wildcard redirects

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWildcardRedirects"
```

---

### Add Multisite Domain

**Method:** `POST`  
**Path:** `/addMultiDomain`  
**Description:** Add Multisite Domain

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `type` (string) **Required** - Body parameter: type
- `value` (string) **Required** - Body parameter: value
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addMultiDomain"
```

---

### Delete Multisite Domain

**Method:** `POST`  
**Path:** `/deleteDomain`  
**Description:** Delete Multisite Domain

#### Parameters
**Body Parameters:**
- `wordpressMultiDomainId` (number) **Required** - Body parameter: wordpressMultiDomainId
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDomain"
```

---

### Get list of instance domains

**Method:** `POST`  
**Path:** `/getMultidomainList`  
**Description:** Get list of instance domains

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit
- `searchTerm` (string) **Required** - Body parameter: searchTerm

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getMultidomainList"
```

---

### List Revision Subsites

**Method:** `POST`  
**Path:** `/listRevisionSubsites`  
**Description:** List Revision Subsites

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listRevisionSubsites"
```

---

### Create Revisions

**Method:** `POST`  
**Path:** `/createRevisions`  
**Description:** Create Revisions

#### Parameters
**Body Parameters:**
- `accessKey` (string) **Required** - Body parameter: accessKey
- `clientId` (number) **Required** - Body parameter: clientId
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `siteId` (number) **Required** - Body parameter: siteId
- `siteName` (string) **Required** - Body parameter: siteName
- `pages` (object) **Required** - Body parameter: pages

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createRevisions"
```

---

### Create Revision

**Method:** `POST`  
**Path:** `/createRevision`  
**Description:** Create Revision

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `siteId` (number) **Required** - Body parameter: siteId
- `siteName` (string) **Required** - Body parameter: siteName
- `page` (object) **Required** - Body parameter: page

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createRevision"
```

---

### Add Custom Domain Header

**Method:** `POST`  
**Path:** `/upsertWordpressHeaders`  
**Description:** Add Custom Domain Header

#### Parameters
**Body Parameters:**
- `wordpressMultiDomainId` (number) **Required** - Body parameter: wordpressMultiDomainId
- `headers` (object) **Required** - Body parameter: headers

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWordpressHeaders"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| mTLS login | `POST` | `/login` | mTLS login |
| List Domain Whitelist | `POST` | `/client/domainwhitelist/list` | List Domain Whitelist |
| Upsert Domain Whitelist | `POST` | `/client/domainwhitelist/upsert` | Upsert Domain Whitelist |
| Get wordpress domain details | `POST` | `/getWordpressDomainDetails` | Get wordpress domain details |
| Insert site redirect | `POST` | `/insertRedirect` | Insert site redirect |
| Get list of site redirects | `POST` | `/getRedirects` | Get list of site redirects |
| Delete site redirect | `POST` | `/deleteRedirect` | Delete site redirect |
| Insert Wildcard Redirect | `POST` | `/upsertWildcardRedirects` | Insert Wildcard Redirect |
| Get instance redirect counts | `POST` | `/getInstanceRedirectCounts` | Get instance redirect counts |
| Get wildcard redirects | `POST` | `/getWildcardRedirects` | Get wildcard redirects |
| Add Multisite Domain | `POST` | `/addMultiDomain` | Add Multisite Domain |
| Delete Multisite Domain | `POST` | `/deleteDomain` | Delete Multisite Domain |
| Get list of instance domains | `POST` | `/getMultidomainList` | Get list of instance domains |
| List Revision Subsites | `POST` | `/listRevisionSubsites` | List Revision Subsites |
| Create Revisions | `POST` | `/createRevisions` | Create Revisions |
| Create Revision | `POST` | `/createRevision` | Create Revision |
| Add Custom Domain Header | `POST` | `/upsertWordpressHeaders` | Add Custom Domain Header |
