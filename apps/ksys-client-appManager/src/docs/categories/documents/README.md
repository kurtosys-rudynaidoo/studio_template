# Documents

Document management, loading, and retrieval

## Endpoints

### Impersonation Sessions Search

**Method:** `POST`  
**Path:** `/impersonation/sessions/search`  
**Description:** Impersonation Sessions Search

#### Parameters
**Body Parameters:**
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit
- `impersonator` (string) **Required** - Body parameter: impersonator
- `userName` (string) **Required** - Body parameter: userName
- `startTimestampRange` (object) **Required** - Body parameter: startTimestampRange

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/sessions/search"
```

---

### Search impersonation

**Method:** `POST`  
**Path:** `/impersonation/search`  
**Description:** Search impersonation

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/search"
```

---

### Search

**Method:** `POST`  
**Path:** `/listApplicationTemplates`  
**Description:** Search

#### Parameters
**Body Parameters:**
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates"
```

---

### Search

**Method:** `POST`  
**Path:** `/listApplications`  
**Description:** Search

#### Parameters
**Body Parameters:**
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications"
```

---

### Upsert Document Entitlements

**Method:** `POST`  
**Path:** `/upsertUserDocumentEntitlements`  
**Description:** Upsert Document Entitlements

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `documentEntitlementSchemeId` (number) **Required** - Body parameter: documentEntitlementSchemeId
- `documentEntitlements` (object) **Required** - Body parameter: documentEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlements"
```

---

### Delete Document Entitlements

**Method:** `POST`  
**Path:** `/deleteUserDocumentEntitlements`  
**Description:** Delete Document Entitlements

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `documentEntitlements` (object) **Required** - Body parameter: documentEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteUserDocumentEntitlements"
```

---

### List Document Entitlements

**Method:** `POST`  
**Path:** `/listUserDocumentEntitlements`  
**Description:** List Document Entitlements

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserDocumentEntitlements"
```

---

### Upsert Document Entitlement Scheme

**Method:** `POST`  
**Path:** `/upsertDocumentEntitlementScheme`  
**Description:** Upsert Document Entitlement Scheme

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `tags` (object) **Required** - Body parameter: tags

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocumentEntitlementScheme"
```

---

### List Document Entitlement Schemes

**Method:** `POST`  
**Path:** `/listDocumentEntitlementSchemes`  
**Description:** List Document Entitlement Schemes

#### Parameters
**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocumentEntitlementSchemes"
```

---

### Delete Document Entitlement Scheme

**Method:** `POST`  
**Path:** `/deleteDocumentEntitlementScheme`  
**Description:** Delete Document Entitlement Scheme

#### Parameters
**Body Parameters:**
- `documentEntitleSchemeId` (number) **Required** - Body parameter: documentEntitleSchemeId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDocumentEntitlementScheme"
```

---

### Bulk Add Document Entitlements

**Method:** `POST`  
**Path:** `/bulkAddDocumentEntitlements`  
**Description:** Bulk Add Document Entitlements

#### Parameters
**Body Parameters:**
- `externalUserIdentifiers` (object) **Required** - Body parameter: externalUserIdentifiers
- `documentEntitlementSchemeName` (string) **Required** - Body parameter: documentEntitlementSchemeName
- `documentEntitlements` (object) **Required** - Body parameter: documentEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkAddDocumentEntitlements"
```

---

### Bulk Replace Document Entitlements

**Method:** `POST`  
**Path:** `/bulkReplaceDocumentEntitlements`  
**Description:** Bulk Replace Document Entitlements

#### Parameters
**Body Parameters:**
- `externalUserIdentifiers` (object) **Required** - Body parameter: externalUserIdentifiers
- `documentEntitlementSchemeName` (string) **Required** - Body parameter: documentEntitlementSchemeName
- `documentEntitlements` (object) **Required** - Body parameter: documentEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkReplaceDocumentEntitlements"
```

---

### Upsert Document Entitlement Preset

**Method:** `POST`  
**Path:** `/upsertDocumentEntitlementPreset`  
**Description:** Upsert Document Entitlement Preset

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `code` (string) **Required** - Body parameter: code
- `description` (string) **Required** - Body parameter: description
- `preset` (object) **Required** - Body parameter: preset

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocumentEntitlementPreset"
```

---

### List Document Entitlement Preset

**Method:** `POST`  
**Path:** `/listDocumentEntitlementPresets`  
**Description:** List Document Entitlement Preset

#### Parameters
**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocumentEntitlementPresets"
```

---

### Delete Document Entitlement Preset

**Method:** `POST`  
**Path:** `/deleteDocumentEntitlementPreset`  
**Description:** Delete Document Entitlement Preset

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDocumentEntitlementPreset"
```

---

### List Saved Searches

**Method:** `POST`  
**Path:** `/listSavedSearches`  
**Description:** List Saved Searches

#### Parameters
**Body Parameters:**
- `savedSearchName` (string) **Required** - Body parameter: savedSearchName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSavedSearches"
```

---

### Upsert Saved Searches

**Method:** `POST`  
**Path:** `/upsertSavedSearch`  
**Description:** Upsert Saved Searches

#### Parameters
**Body Parameters:**
- `savedSearchName` (string) **Required** - Body parameter: savedSearchName
- `notificationFrequency` (string) **Required** - Body parameter: notificationFrequency
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSavedSearch"
```

---

### Delete Saved Search

**Method:** `POST`  
**Path:** `/deleteSavedSearch`  
**Description:** Delete Saved Search

#### Parameters
**Body Parameters:**
- `savedSearchId` (number) **Required** - Body parameter: savedSearchId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteSavedSearch"
```

---

### Add Document

**Method:** `POST`  
**Path:** `/adddocument`  
**Description:** Add Document

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/adddocument"
```

---

### Search Document

**Method:** `POST`  
**Path:** `/searchDocuments`  
**Description:** Search Document

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `sort` (object) **Required** - Body parameter: sort
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start
- `excludeExpired` (boolean) **Required** - Body parameter: excludeExpired

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDocuments"
```

---

### Search Document with Identifier Search

**Method:** `POST`  
**Path:** `/searchDocuments`  
**Description:** Search Document with Identifier Search

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include
- `identifierSearches` (object) **Required** - Body parameter: identifierSearches
- `identifierSearchOperator` (string) **Required** - Body parameter: identifierSearchOperator
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDocuments"
```

---

### Retrieve Document

**Method:** `GET`  
**Path:** `/retrieveDocument`  
**Description:** Retrieve Document

#### Parameters
**Query Parameters:**
- `clientCode` (string) **Required** - Query parameter: clientCode

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocument"
```

---

### Retrieve Document

**Method:** `POST`  
**Path:** `/retrieveDocument`  
**Description:** Retrieve Document

#### Parameters
**Query Parameters:**
- `clientCode` (string) **Required** - Query parameter: clientCode

**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocument"
```

---

### Retrieve Document by File Name

**Method:** `GET`  
**Path:** `/retrieve//filename/mybook.pdf`  
**Description:** Retrieve Document by File Name

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieve//filename/mybook.pdf"
```

---

### Add Document via Path

**Method:** `POST`  
**Path:** `/adddocument`  
**Description:** Add Document via Path

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/adddocument"
```

---

### Upsert Document (Base64)

**Method:** `POST`  
**Path:** `/upsertDocument`  
**Description:** Upsert Document (Base64)

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode
- `cultureCode` (string) **Required** - Body parameter: cultureCode
- `title` (string) **Required** - Body parameter: title
- `originalname` (string) **Required** - Body parameter: originalname
- `filename` (string) **Required** - Body parameter: filename
- `meta` (string) **Required** - Body parameter: meta
- `file` (string) **Required** - Body parameter: file

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocument"
```

---

### Add Doc Meta Type

**Method:** `POST`  
**Path:** `/addDocMetaType`  
**Description:** Add Doc Meta Type

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `dataType` (string) **Required** - Body parameter: dataType
- `validationRule` (string) **Required** - Body parameter: validationRule
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `group` (string) **Required** - Body parameter: group

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDocMetaType"
```

---

### List Doc Meta Types

**Method:** `POST`  
**Path:** `/listDocMetaTypes`  
**Description:** List Doc Meta Types

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocMetaTypes"
```

---

### Retrieve Document Zip Single

**Method:** `POST`  
**Path:** `/retrieveDocumentZip`  
**Description:** Retrieve Document Zip Single

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip"
```

---

### Retrieve Document Zip Multiple

**Method:** `POST`  
**Path:** `/retrieveDocumentZip`  
**Description:** Retrieve Document Zip Multiple

#### Parameters
**Body Parameters:**
- `documentCodes` (object) **Required** - Body parameter: documentCodes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip"
```

---

### Retrieve Document Zip Multiple

**Method:** `GET`  
**Path:** `/retrieveDocumentZip`  
**Description:** Retrieve Document Zip Multiple

#### Parameters
**Query Parameters:**
- `documentCode` (string) **Required** - Query parameter: documentCode

**Body Parameters:**
- `documentCodes` (object) **Required** - Body parameter: documentCodes

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip"
```

---

### Retrieve Document Remote Zip

**Method:** `POST`  
**Path:** `/retrieveDocumentRemote`  
**Description:** Retrieve Document Remote Zip

#### Parameters
**Body Parameters:**
- `documentCodes` (object) **Required** - Body parameter: documentCodes
- `cookies` (object) **Required** - Body parameter: cookies
- `rootDomain` (string) **Required** - Body parameter: rootDomain

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentRemote"
```

---

### Add Document No File

**Method:** `POST`  
**Path:** `/addDocumentNoFile`  
**Description:** Add Document No File

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode
- `cultureCode` (string) **Required** - Body parameter: cultureCode
- `title` (string) **Required** - Body parameter: title
- `path` (string) **Required** - Body parameter: path
- `meta` (object) **Required** - Body parameter: meta

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDocumentNoFile"
```

---

### Search Document Meta Facets

**Method:** `POST`  
**Path:** `/getFacets`  
**Description:** Search Document Meta Facets

#### Parameters
**Body Parameters:**
- `searchTerm` (string) **Required** - Body parameter: searchTerm

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFacets"
```

---

### Get Friendly Document URLs

**Method:** `POST`  
**Path:** `/getFriendlyDocumentUrls`  
**Description:** Get Friendly Document URLs

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFriendlyDocumentUrls"
```

---

### Add Shareable Document URL Configuration

**Method:** `POST`  
**Path:** `/addClientConfiguration`  
**Description:** Add Shareable Document URL Configuration

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `config` (object) **Required** - Body parameter: config

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClientConfiguration"
```

---

### Delete Shareable Document URL Configuration

**Method:** `POST`  
**Path:** `/deleteClientConfiguration`  
**Description:** Delete Shareable Document URL Configuration

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteClientConfiguration"
```

---

### Upsert Shareable Document URL Configuration

**Method:** `POST`  
**Path:** `/upsertClientConfiguration`  
**Description:** Upsert Shareable Document URL Configuration

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `config` (object) **Required** - Body parameter: config

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertClientConfiguration"
```

---

### Search Entity (M*)

**Method:** `POST`  
**Path:** `/searchEntity`  
**Description:** Search Entity (M*)

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include
- `sort` (object) **Required** - Body parameter: sort
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity"
```

---

### Search Entity (Complex Sort)

**Method:** `POST`  
**Path:** `/searchentity`  
**Description:** Search Entity (Complex Sort)

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `advancedSort` (object) **Required** - Body parameter: advancedSort
- `include` (object) **Required** - Body parameter: include
- `translate` (boolean) **Required** - Body parameter: translate
- `culture` (string) **Required** - Body parameter: culture
- `originCulture` (string) **Required** - Body parameter: originCulture
- `preserveOriginal` (boolean) **Required** - Body parameter: preserveOriginal
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchentity"
```

---

### Search Codes

**Method:** `POST`  
**Path:** `/searchCodes`  
**Description:** Search Codes

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `code` (string) **Required** - Body parameter: code

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchCodes"
```

---

### Search Entity Fund List

**Method:** `POST`  
**Path:** `/searchEntityFundlist`  
**Description:** Search Entity Fund List

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntityFundlist"
```

---

### Upsert Saved Search Entity

**Method:** `POST`  
**Path:** `/upsertsavedsearchentity`  
**Description:** Upsert Saved Search Entity

#### Parameters
**Body Parameters:**
- `savedSearchEntityKey` (string) **Required** - Body parameter: savedSearchEntityKey
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `body` (object) **Required** - Body parameter: body
- `inputs` (object) **Required** - Body parameter: inputs

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertsavedsearchentity"
```

---

### Delete Saved Search Entity

**Method:** `POST`  
**Path:** `/deletesavedsearchentity`  
**Description:** Delete Saved Search Entity

#### Parameters
**Body Parameters:**
- `savedSearchEntityKey` (string) **Required** - Body parameter: savedSearchEntityKey

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletesavedsearchentity"
```

---

### List Saved Search Entities

**Method:** `GET`  
**Path:** `/listsavedsearchentities`  
**Description:** List Saved Search Entities

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listsavedsearchentities"
```

---

### Get Saved Search Entity

**Method:** `GET`  
**Path:** `/getsavedsearchentity/defaultSearchEntityIsin`  
**Description:** Get Saved Search Entity

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getsavedsearchentity/defaultSearchEntityIsin"
```

---

### Execute Saved Search Entity

**Method:** `GET`  
**Path:** `/savedsearchentity/defaultSearchEntityIsin`  
**Description:** Execute Saved Search Entity

#### Parameters
**Query Parameters:**
- `isin` (string) **Required** - Query parameter: isin



#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/savedsearchentity/defaultSearchEntityIsin"
```

---

### Validate Saved Search Entity

**Method:** `GET`  
**Path:** `/validatesavedsearchentity/defaultSearchEntityIsin`  
**Description:** Validate Saved Search Entity

#### Parameters
**Query Parameters:**
- `isin` (string) **Required** - Query parameter: isin



#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validatesavedsearchentity/defaultSearchEntityIsin"
```

---

### SearchEntity

**Method:** `POST`  
**Path:** `/searchEntity`  
**Description:** SearchEntity

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include
- `applyFormats` (boolean) **Required** - Body parameter: applyFormats
- `disclaimers` (boolean) **Required** - Body parameter: disclaimers
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity"
```

---

### Search Snapshots

**Method:** `POST`  
**Path:** `/searchSnapshots`  
**Description:** Search Snapshots

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start
- `url` (string) **Required** - Body parameter: url

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchSnapshots"
```

---

### Get Document

**Method:** `GET`  
**Path:** `/getDocument`  
**Description:** Get Document

#### Parameters
**Query Parameters:**
- `filename` (string) **Required** - Query parameter: filename

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDocument"
```

---

### Update Document Status - JSON Body

**Method:** `POST`  
**Path:** `/updateDocumentStatus`  
**Description:** Update Document Status - JSON Body

#### Parameters
**Body Parameters:**
- `accessKey` (string) **Required** - Body parameter: accessKey
- `code` (string) **Required** - Body parameter: code
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `status` (string) **Required** - Body parameter: status
- `docKey` (string) **Required** - Body parameter: docKey
- `reason` (string) **Required** - Body parameter: reason

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateDocumentStatus"
```

---

### Zip Documents

**Method:** `POST`  
**Path:** `/zipDocuments`  
**Description:** Zip Documents

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `distributionType` (string) **Required** - Body parameter: distributionType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/zipDocuments"
```

---

### Search Revision Configurations

**Method:** `POST`  
**Path:** `/searchRevisionConfigurations`  
**Description:** Search Revision Configurations

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `siteId` (number) **Required** - Body parameter: siteId
- `pageFilter` (string) **Required** - Body parameter: pageFilter

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchRevisionConfigurations"
```

---

### Search Domain Mapping

**Method:** `POST`  
**Path:** `/searchDomainMappings`  
**Description:** Search Domain Mapping

#### Parameters
**Body Parameters:**
- `unmappedDomain` (string) **Required** - Body parameter: unmappedDomain

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDomainMappings"
```

---

### Global Search

**Method:** `POST`  
**Path:** `/globalSearch`  
**Description:** Global Search

#### Parameters
**Body Parameters:**
- `searchTerm` (string) **Required** - Body parameter: searchTerm
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `siteId` (number) **Required** - Body parameter: siteId
- `postType` (string) **Required** - Body parameter: postType
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/globalSearch"
```

---

### Search Contacts

**Method:** `POST`  
**Path:** `/searchContacts`  
**Description:** Search Contacts

#### Parameters
**Body Parameters:**
- `contactIdentifiers` (object) **Required** - Body parameter: contactIdentifiers
- `include` (object) **Required** - Body parameter: include
- `search` (object) **Required** - Body parameter: search
- `sort` (object) **Required** - Body parameter: sort
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchContacts"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| Impersonation Sessions Search | `POST` | `/impersonation/sessions/search` | Impersonation Sessions Search |
| Search impersonation | `POST` | `/impersonation/search` | Search impersonation |
| Search | `POST` | `/listApplicationTemplates` | Search |
| Search | `POST` | `/listApplications` | Search |
| Upsert Document Entitlements | `POST` | `/upsertUserDocumentEntitlements` | Upsert Document Entitlements |
| Delete Document Entitlements | `POST` | `/deleteUserDocumentEntitlements` | Delete Document Entitlements |
| List Document Entitlements | `POST` | `/listUserDocumentEntitlements` | List Document Entitlements |
| Upsert Document Entitlement Scheme | `POST` | `/upsertDocumentEntitlementScheme` | Upsert Document Entitlement Scheme |
| List Document Entitlement Schemes | `POST` | `/listDocumentEntitlementSchemes` | List Document Entitlement Schemes |
| Delete Document Entitlement Scheme | `POST` | `/deleteDocumentEntitlementScheme` | Delete Document Entitlement Scheme |
| Bulk Add Document Entitlements | `POST` | `/bulkAddDocumentEntitlements` | Bulk Add Document Entitlements |
| Bulk Replace Document Entitlements | `POST` | `/bulkReplaceDocumentEntitlements` | Bulk Replace Document Entitlements |
| Upsert Document Entitlement Preset | `POST` | `/upsertDocumentEntitlementPreset` | Upsert Document Entitlement Preset |
| List Document Entitlement Preset | `POST` | `/listDocumentEntitlementPresets` | List Document Entitlement Preset |
| Delete Document Entitlement Preset | `POST` | `/deleteDocumentEntitlementPreset` | Delete Document Entitlement Preset |
| List Saved Searches | `POST` | `/listSavedSearches` | List Saved Searches |
| Upsert Saved Searches | `POST` | `/upsertSavedSearch` | Upsert Saved Searches |
| Delete Saved Search | `POST` | `/deleteSavedSearch` | Delete Saved Search |
| Add Document | `POST` | `/adddocument` | Add Document |
| Search Document | `POST` | `/searchDocuments` | Search Document |
| Search Document with Identifier Search | `POST` | `/searchDocuments` | Search Document with Identifier Search |
| Retrieve Document | `GET` | `/retrieveDocument` | Retrieve Document |
| Retrieve Document | `POST` | `/retrieveDocument` | Retrieve Document |
| Retrieve Document by File Name | `GET` | `/retrieve//filename/mybook.pdf` | Retrieve Document by File Name |
| Add Document via Path | `POST` | `/adddocument` | Add Document via Path |
| Upsert Document (Base64) | `POST` | `/upsertDocument` | Upsert Document (Base64) |
| Add Doc Meta Type | `POST` | `/addDocMetaType` | Add Doc Meta Type |
| List Doc Meta Types | `POST` | `/listDocMetaTypes` | List Doc Meta Types |
| Retrieve Document Zip Single | `POST` | `/retrieveDocumentZip` | Retrieve Document Zip Single |
| Retrieve Document Zip Multiple | `POST` | `/retrieveDocumentZip` | Retrieve Document Zip Multiple |
| Retrieve Document Zip Multiple | `GET` | `/retrieveDocumentZip` | Retrieve Document Zip Multiple |
| Retrieve Document Remote Zip | `POST` | `/retrieveDocumentRemote` | Retrieve Document Remote Zip |
| Add Document No File | `POST` | `/addDocumentNoFile` | Add Document No File |
| Search Document Meta Facets | `POST` | `/getFacets` | Search Document Meta Facets |
| Get Friendly Document URLs | `POST` | `/getFriendlyDocumentUrls` | Get Friendly Document URLs |
| Add Shareable Document URL Configuration | `POST` | `/addClientConfiguration` | Add Shareable Document URL Configuration |
| Delete Shareable Document URL Configuration | `POST` | `/deleteClientConfiguration` | Delete Shareable Document URL Configuration |
| Upsert Shareable Document URL Configuration | `POST` | `/upsertClientConfiguration` | Upsert Shareable Document URL Configuration |
| Search Entity (M*) | `POST` | `/searchEntity` | Search Entity (M*) |
| Search Entity (Complex Sort) | `POST` | `/searchentity` | Search Entity (Complex Sort) |
| Search Codes | `POST` | `/searchCodes` | Search Codes |
| Search Entity Fund List | `POST` | `/searchEntityFundlist` | Search Entity Fund List |
| Upsert Saved Search Entity | `POST` | `/upsertsavedsearchentity` | Upsert Saved Search Entity |
| Delete Saved Search Entity | `POST` | `/deletesavedsearchentity` | Delete Saved Search Entity |
| List Saved Search Entities | `GET` | `/listsavedsearchentities` | List Saved Search Entities |
| Get Saved Search Entity | `GET` | `/getsavedsearchentity/defaultSearchEntityIsin` | Get Saved Search Entity |
| Execute Saved Search Entity | `GET` | `/savedsearchentity/defaultSearchEntityIsin` | Execute Saved Search Entity |
| Validate Saved Search Entity | `GET` | `/validatesavedsearchentity/defaultSearchEntityIsin` | Validate Saved Search Entity |
| SearchEntity | `POST` | `/searchEntity` | SearchEntity |
| Search Snapshots | `POST` | `/searchSnapshots` | Search Snapshots |
| Get Document | `GET` | `/getDocument` | Get Document |
| Update Document Status - JSON Body | `POST` | `/updateDocumentStatus` | Update Document Status - JSON Body |
| Zip Documents | `POST` | `/zipDocuments` | Zip Documents |
| Search Revision Configurations | `POST` | `/searchRevisionConfigurations` | Search Revision Configurations |
| Search Domain Mapping | `POST` | `/searchDomainMappings` | Search Domain Mapping |
| Global Search | `POST` | `/globalSearch` | Global Search |
| Search Contacts | `POST` | `/searchContacts` | Search Contacts |
