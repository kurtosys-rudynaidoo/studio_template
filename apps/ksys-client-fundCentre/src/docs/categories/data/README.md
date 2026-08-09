# Data Management

Property setup, segmentation, and data management

## Endpoints

### Upsert Commentary

**Method:** `POST`  
**Path:** `/upsertcommentary`  
**Description:** Upsert Commentary

#### Parameters
**Body Parameters:**
- `commentaryType` (string) **Required** - Body parameter: commentaryType
- `commentaries` (object) **Required** - Body parameter: commentaries
- `linkedEntity` (string) **Required** - Body parameter: linkedEntity

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertcommentary"
```

---

### List Commentary Types

**Method:** `POST`  
**Path:** `/listcommentarytypes`  
**Description:** List Commentary Types

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listcommentarytypes"
```

---

### Add Transaction Property

**Method:** `POST`  
**Path:** `/addTransactionProperty`  
**Description:** Add Transaction Property

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `asAtDate` (string) **Required** - Body parameter: asAtDate
- `transactionCode` (string) **Required** - Body parameter: transactionCode
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `formatCode` (string) **Required** - Body parameter: formatCode
- `group` (string) **Required** - Body parameter: group
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addTransactionProperty"
```

---

### List Transaction Properties

**Method:** `POST`  
**Path:** `/listTransactionProperties`  
**Description:** List Transaction Properties

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTransactionProperties"
```

---

### Add HistoricalDataset Properties

**Method:** `POST`  
**Path:** `/addHistoricalDatasetProperty`  
**Description:** Add HistoricalDataset Properties

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `group` (string) **Required** - Body parameter: group
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addHistoricalDatasetProperty"
```

---

### List HistoricalDataset Properties

**Method:** `POST`  
**Path:** `/listHistoricalDatasetProperties`  
**Description:** List HistoricalDataset Properties

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listHistoricalDatasetProperties"
```

---

### Add Core Property

**Method:** `POST`  
**Path:** `/addproperty`  
**Description:** Add Core Property

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `dataType` (string) **Required** - Body parameter: dataType
- `validationRule` (string) **Required** - Body parameter: validationRule
- `label` (string) **Required** - Body parameter: label
- `formatCode` (string) **Required** - Body parameter: formatCode
- `description` (string) **Required** - Body parameter: description
- `group` (string) **Required** - Body parameter: group

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addproperty"
```

---

### Add Allocation Property

**Method:** `POST`  
**Path:** `/addAllocProperty`  
**Description:** Add Allocation Property

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `formatCode` (string) **Required** - Body parameter: formatCode
- `group` (string) **Required** - Body parameter: group
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addAllocProperty"
```

---

### List Allocation Properties

**Method:** `POST`  
**Path:** `/listAllocProperties`  
**Description:** List Allocation Properties

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listAllocProperties"
```

---

### Add Timeseries Property

**Method:** `POST`  
**Path:** `/addTSProperty`  
**Description:** Add Timeseries Property

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `labelFormatCode` (string) **Required** - Body parameter: labelFormatCode
- `valueFormatCode` (string) **Required** - Body parameter: valueFormatCode
- `group` (string) **Required** - Body parameter: group
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addTSProperty"
```

---

### List Timeseries Properties

**Method:** `POST`  
**Path:** `/listTSProperties`  
**Description:** List Timeseries Properties

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTSProperties"
```

---

### Add Statistic Property

**Method:** `POST`  
**Path:** `/addStatisticProperty`  
**Description:** Add Statistic Property

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `group` (string) **Required** - Body parameter: group
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addStatisticProperty"
```

---

### List Statistic Properties

**Method:** `POST`  
**Path:** `/listStatisticProperties`  
**Description:** List Statistic Properties

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listStatisticProperties"
```

---

### List Approval Groups

**Method:** `POST`  
**Path:** `/listApprovalGroups`  
**Description:** List Approval Groups

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApprovalGroups"
```

---

### Upsert approval group

**Method:** `POST`  
**Path:** `/upsertApprovalGroup`  
**Description:** Upsert approval group

#### Parameters
**Body Parameters:**
- `groupName` (string) **Required** - Body parameter: groupName
- `users` (object) **Required** - Body parameter: users

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApprovalGroup"
```

---

### Get Transaction Facets

**Method:** `POST`  
**Path:** `/getTransactionFacets`  
**Description:** Get Transaction Facets

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `clientCode` (string) **Required** - Body parameter: clientCode
- `searchTerm` (string) **Required** - Body parameter: searchTerm
- `property` (string) **Required** - Body parameter: property
- `ccy` (string) **Required** - Body parameter: ccy

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTransactionFacets"
```

---

### Update Loader Schedule

**Method:** `POST`  
**Path:** `/addproperty`  
**Description:** Update Loader Schedule

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `entityType` (string) **Required** - Body parameter: entityType
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
  "https://api-uk.kurtosys.app/addproperty"
```

---

### Upsert Disclaimer Type

**Method:** `POST`  
**Path:** `/upsertdisclaimertype`  
**Description:** Upsert Disclaimer Type

#### Parameters
**Body Parameters:**
- `disclaimerType` (string) **Required** - Body parameter: disclaimerType
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertdisclaimertype"
```

---

### Upsert Disclaimer

**Method:** `POST`  
**Path:** `/upsertdisclaimer`  
**Description:** Upsert Disclaimer

#### Parameters
**Body Parameters:**
- `disclaimerType` (string) **Required** - Body parameter: disclaimerType
- `disclaimers` (object) **Required** - Body parameter: disclaimers
- `linkedEntity` (string) **Required** - Body parameter: linkedEntity

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertdisclaimer"
```

---

### List Disclaimer Types

**Method:** `POST`  
**Path:** `/listdisclaimertypes`  
**Description:** List Disclaimer Types

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listdisclaimertypes"
```

---

### List Disclaimers

**Method:** `POST`  
**Path:** `/listDisclaimers`  
**Description:** List Disclaimers

#### Parameters
**Body Parameters:**
- `disclaimerType` (object) **Required** - Body parameter: disclaimerType
- `culture` (object) **Required** - Body parameter: culture
- `linkedList` (object) **Required** - Body parameter: linkedList
- `linkedEntity` (object) **Required** - Body parameter: linkedEntity
- `global` (boolean) **Required** - Body parameter: global

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDisclaimers"
```

---

### List Disclaimers Backup

**Method:** `POST`  
**Path:** `/listDisclaimersBackup`  
**Description:** List Disclaimers Backup

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDisclaimersBackup"
```

---

### Upsert Segmentation Tag

**Method:** `POST`  
**Path:** `/upsertSegmentationTag`  
**Description:** Upsert Segmentation Tag

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `acceptedValues` (object) **Required** - Body parameter: acceptedValues

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSegmentationTag"
```

---

### List Segmentation Tags

**Method:** `POST`  
**Path:** `/listSegmentationTags`  
**Description:** List Segmentation Tags

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
  "https://api-uk.kurtosys.app/listSegmentationTags"
```

---

### Search Document include Entity Data

**Method:** `POST`  
**Path:** `/searchDocuments`  
**Description:** Search Document include Entity Data

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include
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

### Retrieve Document by Meta Data Value

**Method:** `GET`  
**Path:** `/retrieve//region/USA`  
**Description:** Retrieve Document by Meta Data Value

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieve//region/USA"
```

---

### Get Document Retrieval Statistics

**Method:** `POST`  
**Path:** `/getDocumentRetrievalStatistics`  
**Description:** Get Document Retrieval Statistics

#### Parameters
**Body Parameters:**
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate
- `period` (string) **Required** - Body parameter: period
- `documentMeta` (object) **Required** - Body parameter: documentMeta

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDocumentRetrievalStatistics"
```

---

### Upsert Data Entitlement List

**Method:** `POST`  
**Path:** `/replaceDataEntitlementLists`  
**Description:** Upsert Data Entitlement List

#### Parameters
**Body Parameters:**
- `entitlementLists` (object) **Required** - Body parameter: entitlementLists

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceDataEntitlementLists"
```

---

### Remove Data Entitlement Lists

**Method:** `POST`  
**Path:** `/removeDataEntitlementLists`  
**Description:** Remove Data Entitlement Lists

#### Parameters
**Body Parameters:**
- `listNames` (object) **Required** - Body parameter: listNames

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeDataEntitlementLists"
```

---

### Add Data Entitlement List Entities

**Method:** `POST`  
**Path:** `/addDataEntitlementListEntities`  
**Description:** Add Data Entitlement List Entities

#### Parameters
**Body Parameters:**
- `entitlementLists` (object) **Required** - Body parameter: entitlementLists

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDataEntitlementListEntities"
```

---

### Remove Data Entitlement List Entities

**Method:** `POST`  
**Path:** `/removeDataEntitlementListEntities`  
**Description:** Remove Data Entitlement List Entities

#### Parameters
**Body Parameters:**
- `entitlementLists` (object) **Required** - Body parameter: entitlementLists

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeDataEntitlementListEntities"
```

---

### List Data Entitlement Lists

**Method:** `POST`  
**Path:** `/listDataEntitlementLists`  
**Description:** List Data Entitlement Lists

#### Parameters
**Body Parameters:**
- `types` (object) **Required** - Body parameter: types
- `listNames` (object) **Required** - Body parameter: listNames

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDataEntitlementLists"
```

---

### Include Historical Datasets (asAtDate)

**Method:** `POST`  
**Path:** `/searchEntity`  
**Description:** Include Historical Datasets (asAtDate)

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include

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

### Include Historical Datasets (date range)

**Method:** `POST`  
**Path:** `/searchEntity`  
**Description:** Include Historical Datasets (date range)

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `search` (object) **Required** - Body parameter: search
- `include` (object) **Required** - Body parameter: include

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

### Upsert Allocations

**Method:** `POST`  
**Path:** `/upsertallocations`  
**Description:** Upsert Allocations

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `clientCode` (string) **Required** - Body parameter: clientCode
- `code` (string) **Required** - Body parameter: code
- `ccy` (string) **Required** - Body parameter: ccy
- `values` (object) **Required** - Body parameter: values

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertallocations"
```

---

### Insert Transactions

**Method:** `POST`  
**Path:** `/insertTransactions`  
**Description:** Insert Transactions

#### Parameters
**Body Parameters:**
- `0` (object) **Required** - Body parameter: 0

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertTransactions"
```

---

### Delete Transactions

**Method:** `POST`  
**Path:** `/deleteTransactions`  
**Description:** Delete Transactions

#### Parameters
**Body Parameters:**
- `transactionCodes` (object) **Required** - Body parameter: transactionCodes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTransactions"
```

---

### Upsert Statistics

**Method:** `POST`  
**Path:** `/upsertstatistics`  
**Description:** Upsert Statistics

#### Parameters
**Body Parameters:**
- `data` (object) **Required** - Body parameter: data

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertstatistics"
```

---

### Upsert Timeseries

**Method:** `POST`  
**Path:** `/upserttimeseries`  
**Description:** Upsert Timeseries

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `clientCode` (string) **Required** - Body parameter: clientCode
- `code` (string) **Required** - Body parameter: code
- `ccy` (string) **Required** - Body parameter: ccy
- `classification` (string) **Required** - Body parameter: classification
- `periodicity` (string) **Required** - Body parameter: periodicity
- `values` (object) **Required** - Body parameter: values

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttimeseries"
```

---

### Upsert Timeseries Delta

**Method:** `POST`  
**Path:** `/upserttimeseriesdelta`  
**Description:** Upsert Timeseries Delta

#### Parameters
**Body Parameters:**
- `updateType` (string) **Required** - Body parameter: updateType
- `entityType` (string) **Required** - Body parameter: entityType
- `clientCode` (string) **Required** - Body parameter: clientCode
- `code` (string) **Required** - Body parameter: code
- `ccy` (string) **Required** - Body parameter: ccy
- `classification` (string) **Required** - Body parameter: classification
- `periodicity` (string) **Required** - Body parameter: periodicity
- `values` (object) **Required** - Body parameter: values

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttimeseriesdelta"
```

---

### Upsert Fundmanager - multipart/form-data

**Method:** `POST`  
**Path:** `/upsertFundmanager`  
**Description:** Upsert Fundmanager - multipart/form-data

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertFundmanager"
```

---

### getHistoricalDatasets

**Method:** `POST`  
**Path:** `/getHistoricalDatasets`  
**Description:** getHistoricalDatasets

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (string) **Required** - Body parameter: clientCode
- `code` (string) **Required** - Body parameter: code
- `ccy` (string) **Required** - Body parameter: ccy
- `asAtDate` (string) **Required** - Body parameter: asAtDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getHistoricalDatasets"
```

---

### Get Transaction Filters

**Method:** `POST`  
**Path:** `/getTransactionFilters`  
**Description:** Get Transaction Filters

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (string) **Required** - Body parameter: clientCode
- `code` (string) **Required** - Body parameter: code
- `extendedProperties` (object) **Required** - Body parameter: extendedProperties
- `metaProperties` (object) **Required** - Body parameter: metaProperties
- `translation` (object) **Required** - Body parameter: translation

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTransactionFilters"
```

---

### Get Segmentation Facets

**Method:** `POST`  
**Path:** `/getFundListFacets`  
**Description:** Get Segmentation Facets

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
  "https://api-uk.kurtosys.app/getFundListFacets"
```

---

### List Translation Providers

**Method:** `POST`  
**Path:** `/listTranslationProviders`  
**Description:** List Translation Providers

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
  "https://api-uk.kurtosys.app/listTranslationProviders"
```

---

### Get Translation Providers Credentials UI

**Method:** `POST`  
**Path:** `/getTranslationProvidersCredentialsUI`  
**Description:** Get Translation Providers Credentials UI

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
  "https://api-uk.kurtosys.app/getTranslationProvidersCredentialsUI"
```

---

### Upsert Translation Provider

**Method:** `POST`  
**Path:** `/upsertTranslationProvider`  
**Description:** Upsert Translation Provider

#### Parameters
**Body Parameters:**
- `translationProviderId` (number) **Required** - Body parameter: translationProviderId
- `enabled` (boolean) **Required** - Body parameter: enabled
- `credentials` (object) **Required** - Body parameter: credentials

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTranslationProvider"
```

---

### Get Translation Provider Supported Languages

**Method:** `POST`  
**Path:** `/getTranslationProviderSupportedLanguages`  
**Description:** Get Translation Provider Supported Languages

#### Parameters
**Body Parameters:**
- `translationProviderId` (number) **Required** - Body parameter: translationProviderId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderSupportedLanguages"
```

---

### Upsert Translation Provider Project

**Method:** `POST`  
**Path:** `/upsertTranslationProviderProject`  
**Description:** Upsert Translation Provider Project

#### Parameters
**Body Parameters:**
- `translationProviderId` (number) **Required** - Body parameter: translationProviderId
- `sourceLanguage` (string) **Required** - Body parameter: sourceLanguage
- `targetLanguage` (string) **Required** - Body parameter: targetLanguage
- `translationItems` (object) **Required** - Body parameter: translationItems

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTranslationProviderProject"
```

---

### List Translation Provider Projects

**Method:** `POST`  
**Path:** `/listTranslationProviderProjects`  
**Description:** List Translation Provider Projects

#### Parameters
**Body Parameters:**
- `translationProjectId` (object) **Required** - Body parameter: translationProjectId
- `translationProviderId` (number) **Required** - Body parameter: translationProviderId
- `sourceLanguage` (string) **Required** - Body parameter: sourceLanguage
- `targetLanguage` (object) **Required** - Body parameter: targetLanguage
- `status` (string) **Required** - Body parameter: status
- `page` (number) **Required** - Body parameter: page
- `pageSize` (number) **Required** - Body parameter: pageSize

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTranslationProviderProjects"
```

---

### Get Translation Provider Project

**Method:** `POST`  
**Path:** `/getTranslationProviderProject`  
**Description:** Get Translation Provider Project

#### Parameters
**Body Parameters:**
- `translationProjectId` (number) **Required** - Body parameter: translationProjectId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderProject"
```

---

### Mark Translation Provider Subscription Complete

**Method:** `POST`  
**Path:** `/markTranslationProviderSubscriptionComplete`  
**Description:** Mark Translation Provider Subscription Complete

#### Parameters
**Body Parameters:**
- `translationProviderSubscriptionId` (number) **Required** - Body parameter: translationProviderSubscriptionId
- `email` (object) **Required** - Body parameter: email

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/markTranslationProviderSubscriptionComplete"
```

---

### Get Translation Provider Project Status

**Method:** `POST`  
**Path:** `/getTranslationProviderProjectStatus`  
**Description:** Get Translation Provider Project Status

#### Parameters
**Body Parameters:**
- `translationProviderId` (number) **Required** - Body parameter: translationProviderId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderProjectStatus"
```

---

### Abandon Translation Provider Project

**Method:** `POST`  
**Path:** `/abandonTranslationProviderProject`  
**Description:** Abandon Translation Provider Project

#### Parameters
**Body Parameters:**
- `translationProjectId` (number) **Required** - Body parameter: translationProjectId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/abandonTranslationProviderProject"
```

---

### Update Translation Provider Statuses

**Method:** `POST`  
**Path:** `/updateTranslationProviderStatuses`  
**Description:** Update Translation Provider Statuses

#### Parameters
**Body Parameters:**
- `translationProjectId` (number) **Required** - Body parameter: translationProjectId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateTranslationProviderStatuses"
```

---

### Update All Translation Provider Statuses

**Method:** `POST`  
**Path:** `/updateAllTranslationProviderStatuses`  
**Description:** Update All Translation Provider Statuses

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
  "https://api-uk.kurtosys.app/updateAllTranslationProviderStatuses"
```

---

### Verify Translation Provider Connection

**Method:** `POST`  
**Path:** `/verifyTranslationProviderConnection`  
**Description:** Verify Translation Provider Connection

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
  "https://api-uk.kurtosys.app/verifyTranslationProviderConnection"
```

---

### Add Translations

**Method:** `POST`  
**Path:** `/upserttranslation`  
**Description:** Add Translations

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `phrase` (string) **Required** - Body parameter: phrase
- `culture` (string) **Required** - Body parameter: culture
- `translation` (string) **Required** - Body parameter: translation
- `translationCulture` (string) **Required** - Body parameter: translationCulture

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttranslation"
```

---

### Delete Translations

**Method:** `POST`  
**Path:** `/deleteTranslations`  
**Description:** Delete Translations

#### Parameters
**Body Parameters:**
- `0` (object) **Required** - Body parameter: 0
- `1` (object) **Required** - Body parameter: 1
- `2` (object) **Required** - Body parameter: 2

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTranslations"
```

---

### List Translations

**Method:** `POST`  
**Path:** `/listtranslations`  
**Description:** List Translations

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `culture` (string) **Required** - Body parameter: culture

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listtranslations"
```

---

### Search Translations

**Method:** `POST`  
**Path:** `/searchTranslations`  
**Description:** Search Translations

#### Parameters
**Body Parameters:**
- `phrase` (string) **Required** - Body parameter: phrase
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit
- `cultures` (object) **Required** - Body parameter: cultures

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchTranslations"
```

---

### List Workflow Inputs by allowed inputs and segmentation lists

**Method:** `POST`  
**Path:** `/listWorkflowInputs`  
**Description:** List Workflow Inputs by allowed inputs and segmentation lists

#### Parameters
**Body Parameters:**
- `allowedInputs` (object) **Required** - Body parameter: allowedInputs
- `segmentationLists` (object) **Required** - Body parameter: segmentationLists

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowInputs"
```

---

### Update Document Status - Form-data

**Method:** `POST`  
**Path:** `/updateDocumentStatus`  
**Description:** Update Document Status - Form-data

#### Parameters


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

### Retrieve workflow statistics data

**Method:** `POST`  
**Path:** `/retrieveWorkflowStatistics`  
**Description:** Retrieve workflow statistics data

#### Parameters
**Body Parameters:**
- `period` (string) **Required** - Body parameter: period
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowStatistics"
```

---

### Retrieve workflow exception statistics data

**Method:** `POST`  
**Path:** `/retrieveWorkflowExceptionStatistics`  
**Description:** Retrieve workflow exception statistics data

#### Parameters
**Body Parameters:**
- `period` (string) **Required** - Body parameter: period
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowExceptionStatistics"
```

---

### Retrieve workflow accuracy statistics summary

**Method:** `POST`  
**Path:** `/retrieveWorkflowAccuracyStatistics`  
**Description:** Retrieve workflow accuracy statistics summary

#### Parameters
**Body Parameters:**
- `period` (string) **Required** - Body parameter: period
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowAccuracyStatistics"
```

---

### Portfolio Statistics

**Method:** `POST`  
**Path:** `/portfolioStatistics`  
**Description:** Portfolio Statistics

#### Parameters
**Body Parameters:**
- `statistics` (object) **Required** - Body parameter: statistics
- `portfolio` (object) **Required** - Body parameter: portfolio
- `benchmark` (object) **Required** - Body parameter: benchmark

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioStatistics"
```

---

### Portfolio Statistics Copy

**Method:** `POST`  
**Path:** `/portfolioStatistics`  
**Description:** Portfolio Statistics Copy

#### Parameters
**Body Parameters:**
- `statistics` (object) **Required** - Body parameter: statistics
- `portfolio` (object) **Required** - Body parameter: portfolio
- `benchmark` (object) **Required** - Body parameter: benchmark

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioStatistics"
```

---

### Batch Portfolio Statistics

**Method:** `POST`  
**Path:** `/batchPortfolioStatistics`  
**Description:** Batch Portfolio Statistics

#### Parameters
**Body Parameters:**
- `benchmark` (object) **Required** - Body parameter: benchmark
- `fundRiskCategories` (object) **Required** - Body parameter: fundRiskCategories
- `periodTypes` (object) **Required** - Body parameter: periodTypes
- `portfolios` (object) **Required** - Body parameter: portfolios
- `correlationIndices` (object) **Required** - Body parameter: correlationIndices
- `fundRiskIndices` (object) **Required** - Body parameter: fundRiskIndices
- `statistics` (object) **Required** - Body parameter: statistics

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/batchPortfolioStatistics"
```

---

### Get Statistics Scenario

**Method:** `POST`  
**Path:** `/scenario/getStatistics`  
**Description:** Get Statistics Scenario

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getStatistics"
```

---

### Get Efficient Frontier Statistics

**Method:** `POST`  
**Path:** `/portfolio/getEfficientFrontierStatistics`  
**Description:** Get Efficient Frontier Statistics

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode
- `riskFreeRateOptions` (object) **Required** - Body parameter: riskFreeRateOptions
- `entityRiskOptions` (object) **Required** - Body parameter: entityRiskOptions
- `statisticsOptions` (object) **Required** - Body parameter: statisticsOptions
- `benchmarkOptions` (object) **Required** - Body parameter: benchmarkOptions
- `portfolioOptions` (object) **Required** - Body parameter: portfolioOptions
- `funds` (object) **Required** - Body parameter: funds
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `explicitBenchmark` (object) **Required** - Body parameter: explicitBenchmark

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getEfficientFrontierStatistics"
```

---

### Upsert Extended Property (Insert)

**Method:** `POST`  
**Path:** `/extendedProperty/upsert`  
**Description:** Upsert Extended Property (Insert)

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `code` (string) **Required** - Body parameter: code
- `type` (string) **Required** - Body parameter: type
- `dataType` (string) **Required** - Body parameter: dataType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `validationRule` (string) **Required** - Body parameter: validationRule
- `acceptedValues` (object) **Required** - Body parameter: acceptedValues
- `group` (string) **Required** - Body parameter: group
- `subGroup` (string) **Required** - Body parameter: subGroup
- `formatCodeId` (number) **Required** - Body parameter: formatCodeId
- `cardinality` (string) **Required** - Body parameter: cardinality

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/upsert"
```

---

### Upsert Extended Property (Update)

**Method:** `POST`  
**Path:** `/extendedProperty/upsert`  
**Description:** Upsert Extended Property (Update)

#### Parameters
**Body Parameters:**
- `extendedPropertyId` (number) **Required** - Body parameter: extendedPropertyId
- `code` (string) **Required** - Body parameter: code
- `type` (string) **Required** - Body parameter: type
- `dataType` (string) **Required** - Body parameter: dataType
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `validationRule` (string) **Required** - Body parameter: validationRule
- `acceptedValues` (object) **Required** - Body parameter: acceptedValues
- `group` (string) **Required** - Body parameter: group
- `subGroup` (string) **Required** - Body parameter: subGroup
- `formatCodeId` (number) **Required** - Body parameter: formatCodeId
- `cardinality` (string) **Required** - Body parameter: cardinality

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/upsert"
```

---

### Get Extended Property

**Method:** `GET`  
**Path:** `/extendedProperty/get/1`  
**Description:** Get Extended Property

#### Parameters
**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/get/1"
```

---

### List Extended Property

**Method:** `POST`  
**Path:** `/extendedProperty/list`  
**Description:** List Extended Property

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/list"
```

---

### List Extended Property (query)

**Method:** `POST`  
**Path:** `/extendedProperty/list`  
**Description:** List Extended Property (query)

#### Parameters
**Body Parameters:**
- `type` (object) **Required** - Body parameter: type
- `code` (object) **Required** - Body parameter: code

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/list"
```

---

### Delete Extended Property

**Method:** `DELETE`  
**Path:** `/extendedProperty/delete/1`  
**Description:** Delete Extended Property

#### Parameters
**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**204:** Resource deleted successfully

#### Example Request
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/delete/1"
```

---

### List Referenced Datasets

**Method:** `POST`  
**Path:** `/dataadapters/sample_snowflake_adapter/references/list`  
**Description:** List Referenced Datasets

#### Parameters
**Body Parameters:**
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/references/list"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| Upsert Commentary | `POST` | `/upsertcommentary` | Upsert Commentary |
| List Commentary Types | `POST` | `/listcommentarytypes` | List Commentary Types |
| Add Transaction Property | `POST` | `/addTransactionProperty` | Add Transaction Property |
| List Transaction Properties | `POST` | `/listTransactionProperties` | List Transaction Properties |
| Add HistoricalDataset Properties | `POST` | `/addHistoricalDatasetProperty` | Add HistoricalDataset Properties |
| List HistoricalDataset Properties | `POST` | `/listHistoricalDatasetProperties` | List HistoricalDataset Properties |
| Add Core Property | `POST` | `/addproperty` | Add Core Property |
| Add Allocation Property | `POST` | `/addAllocProperty` | Add Allocation Property |
| List Allocation Properties | `POST` | `/listAllocProperties` | List Allocation Properties |
| Add Timeseries Property | `POST` | `/addTSProperty` | Add Timeseries Property |
| List Timeseries Properties | `POST` | `/listTSProperties` | List Timeseries Properties |
| Add Statistic Property | `POST` | `/addStatisticProperty` | Add Statistic Property |
| List Statistic Properties | `POST` | `/listStatisticProperties` | List Statistic Properties |
| List Approval Groups | `POST` | `/listApprovalGroups` | List Approval Groups |
| Upsert approval group | `POST` | `/upsertApprovalGroup` | Upsert approval group |
| Get Transaction Facets | `POST` | `/getTransactionFacets` | Get Transaction Facets |
| Update Loader Schedule | `POST` | `/addproperty` | Update Loader Schedule |
| Upsert Disclaimer Type | `POST` | `/upsertdisclaimertype` | Upsert Disclaimer Type |
| Upsert Disclaimer | `POST` | `/upsertdisclaimer` | Upsert Disclaimer |
| List Disclaimer Types | `POST` | `/listdisclaimertypes` | List Disclaimer Types |
| List Disclaimers | `POST` | `/listDisclaimers` | List Disclaimers |
| List Disclaimers Backup | `POST` | `/listDisclaimersBackup` | List Disclaimers Backup |
| Upsert Segmentation Tag | `POST` | `/upsertSegmentationTag` | Upsert Segmentation Tag |
| List Segmentation Tags | `POST` | `/listSegmentationTags` | List Segmentation Tags |
| Search Document include Entity Data | `POST` | `/searchDocuments` | Search Document include Entity Data |
| Retrieve Document by Meta Data Value | `GET` | `/retrieve//region/USA` | Retrieve Document by Meta Data Value |
| Get Document Retrieval Statistics | `POST` | `/getDocumentRetrievalStatistics` | Get Document Retrieval Statistics |
| Upsert Data Entitlement List | `POST` | `/replaceDataEntitlementLists` | Upsert Data Entitlement List |
| Remove Data Entitlement Lists | `POST` | `/removeDataEntitlementLists` | Remove Data Entitlement Lists |
| Add Data Entitlement List Entities | `POST` | `/addDataEntitlementListEntities` | Add Data Entitlement List Entities |
| Remove Data Entitlement List Entities | `POST` | `/removeDataEntitlementListEntities` | Remove Data Entitlement List Entities |
| List Data Entitlement Lists | `POST` | `/listDataEntitlementLists` | List Data Entitlement Lists |
| Include Historical Datasets (asAtDate) | `POST` | `/searchEntity` | Include Historical Datasets (asAtDate) |
| Include Historical Datasets (date range) | `POST` | `/searchEntity` | Include Historical Datasets (date range) |
| Upsert Allocations | `POST` | `/upsertallocations` | Upsert Allocations |
| Insert Transactions | `POST` | `/insertTransactions` | Insert Transactions |
| Delete Transactions | `POST` | `/deleteTransactions` | Delete Transactions |
| Upsert Statistics | `POST` | `/upsertstatistics` | Upsert Statistics |
| Upsert Timeseries | `POST` | `/upserttimeseries` | Upsert Timeseries |
| Upsert Timeseries Delta | `POST` | `/upserttimeseriesdelta` | Upsert Timeseries Delta |
| Upsert Fundmanager - multipart/form-data | `POST` | `/upsertFundmanager` | Upsert Fundmanager - multipart/form-data |
| getHistoricalDatasets | `POST` | `/getHistoricalDatasets` | getHistoricalDatasets |
| Get Transaction Filters | `POST` | `/getTransactionFilters` | Get Transaction Filters |
| Get Segmentation Facets | `POST` | `/getFundListFacets` | Get Segmentation Facets |
| List Translation Providers | `POST` | `/listTranslationProviders` | List Translation Providers |
| Get Translation Providers Credentials UI | `POST` | `/getTranslationProvidersCredentialsUI` | Get Translation Providers Credentials UI |
| Upsert Translation Provider | `POST` | `/upsertTranslationProvider` | Upsert Translation Provider |
| Get Translation Provider Supported Languages | `POST` | `/getTranslationProviderSupportedLanguages` | Get Translation Provider Supported Languages |
| Upsert Translation Provider Project | `POST` | `/upsertTranslationProviderProject` | Upsert Translation Provider Project |
| List Translation Provider Projects | `POST` | `/listTranslationProviderProjects` | List Translation Provider Projects |
| Get Translation Provider Project | `POST` | `/getTranslationProviderProject` | Get Translation Provider Project |
| Mark Translation Provider Subscription Complete | `POST` | `/markTranslationProviderSubscriptionComplete` | Mark Translation Provider Subscription Complete |
| Get Translation Provider Project Status | `POST` | `/getTranslationProviderProjectStatus` | Get Translation Provider Project Status |
| Abandon Translation Provider Project | `POST` | `/abandonTranslationProviderProject` | Abandon Translation Provider Project |
| Update Translation Provider Statuses | `POST` | `/updateTranslationProviderStatuses` | Update Translation Provider Statuses |
| Update All Translation Provider Statuses | `POST` | `/updateAllTranslationProviderStatuses` | Update All Translation Provider Statuses |
| Verify Translation Provider Connection | `POST` | `/verifyTranslationProviderConnection` | Verify Translation Provider Connection |
| Add Translations | `POST` | `/upserttranslation` | Add Translations |
| Delete Translations | `POST` | `/deleteTranslations` | Delete Translations |
| List Translations | `POST` | `/listtranslations` | List Translations |
| Search Translations | `POST` | `/searchTranslations` | Search Translations |
| List Workflow Inputs by allowed inputs and segmentation lists | `POST` | `/listWorkflowInputs` | List Workflow Inputs by allowed inputs and segmentation lists |
| Update Document Status - Form-data | `POST` | `/updateDocumentStatus` | Update Document Status - Form-data |
| Retrieve workflow statistics data | `POST` | `/retrieveWorkflowStatistics` | Retrieve workflow statistics data |
| Retrieve workflow exception statistics data | `POST` | `/retrieveWorkflowExceptionStatistics` | Retrieve workflow exception statistics data |
| Retrieve workflow accuracy statistics summary | `POST` | `/retrieveWorkflowAccuracyStatistics` | Retrieve workflow accuracy statistics summary |
| Portfolio Statistics | `POST` | `/portfolioStatistics` | Portfolio Statistics |
| Portfolio Statistics Copy | `POST` | `/portfolioStatistics` | Portfolio Statistics Copy |
| Batch Portfolio Statistics | `POST` | `/batchPortfolioStatistics` | Batch Portfolio Statistics |
| Get Statistics Scenario | `POST` | `/scenario/getStatistics` | Get Statistics Scenario |
| Get Efficient Frontier Statistics | `POST` | `/portfolio/getEfficientFrontierStatistics` | Get Efficient Frontier Statistics |
| Upsert Extended Property (Insert) | `POST` | `/extendedProperty/upsert` | Upsert Extended Property (Insert) |
| Upsert Extended Property (Update) | `POST` | `/extendedProperty/upsert` | Upsert Extended Property (Update) |
| Get Extended Property | `GET` | `/extendedProperty/get/1` | Get Extended Property |
| List Extended Property | `POST` | `/extendedProperty/list` | List Extended Property |
| List Extended Property (query) | `POST` | `/extendedProperty/list` | List Extended Property (query) |
| Delete Extended Property | `DELETE` | `/extendedProperty/delete/1` | Delete Extended Property |
| List Referenced Datasets | `POST` | `/dataadapters/sample_snowflake_adapter/references/list` | List Referenced Datasets |
