# Management

User management, authentication, roles, and permissions

## Endpoints

### List Impersonation

**Method:** `POST`  
**Path:** `/impersonation/list`  
**Description:** List Impersonation

#### Parameters
**Body Parameters:**
- `username` (string) **Required** - Body parameter: username

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/list"
```

---

### Upsert Impersonation

**Method:** `POST`  
**Path:** `/impersonation/upsert`  
**Description:** Upsert Impersonation

#### Parameters
**Body Parameters:**
- `username` (string) **Required** - Body parameter: username
- `impersonationListType` (string) **Required** - Body parameter: impersonationListType
- `users` (object) **Required** - Body parameter: users

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/upsert"
```

---

### Impersonate

**Method:** `POST`  
**Path:** `/impersonation/impersonate`  
**Description:** Impersonate

#### Parameters
**Body Parameters:**
- `username` (string) **Required** - Body parameter: username

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/impersonate"
```

---

### Stop impersonating

**Method:** `POST`  
**Path:** `/impersonation/stopimpersonating`  
**Description:** Stop impersonating

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/stopimpersonating"
```

---

### Update Strategy

**Method:** `POST`  
**Path:** `/updateStrategy`  
**Description:** Update Strategy

#### Parameters
**Body Parameters:**
- `strategyId` (number) **Required** - Body parameter: strategyId
- `name` (string) **Required** - Body parameter: name
- `type` (string) **Required** - Body parameter: type
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `clientId` (number) **Required** - Body parameter: clientId
- `config` (object) **Required** - Body parameter: config

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateStrategy"
```

---

### Request Strategies

**Method:** `POST`  
**Path:** `/requestStrategies`  
**Description:** Request Strategies

#### Parameters
**Body Parameters:**
- `organization` (string) **Required** - Body parameter: organization
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/requestStrategies"
```

---

### Create Strategy

**Method:** `POST`  
**Path:** `/createStrategy`  
**Description:** Create Strategy

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `type` (string) **Required** - Body parameter: type
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `clientId` (number) **Required** - Body parameter: clientId
- `config` (object) **Required** - Body parameter: config
- `callbackIdentifier` (string) **Required** - Body parameter: callbackIdentifier

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createStrategy"
```

---

### Get Strategy

**Method:** `POST`  
**Path:** `/getStrategy`  
**Description:** Get Strategy

#### Parameters
**Body Parameters:**
- `id` (number) **Required** - Body parameter: id

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getStrategy"
```

---

### List All Strategies

**Method:** `POST`  
**Path:** `/listStrategiesForCurrentClient`  
**Description:** List All Strategies

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
  "https://api-uk.kurtosys.app/listStrategiesForCurrentClient"
```

---

### Retrieve Strategy Config

**Method:** `POST`  
**Path:** `/retrieveStrategyConfig`  
**Description:** Retrieve Strategy Config

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveStrategyConfig"
```

---

### login

**Method:** `POST`  
**Path:** `/login`  
**Description:** login

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

### login User

**Method:** `POST`  
**Path:** `/login`  
**Description:** login User

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

### logout

**Method:** `POST`  
**Path:** `/logout`  
**Description:** logout

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
  "https://api-uk.kurtosys.app/logout"
```

---

### create permanent token

**Method:** `POST`  
**Path:** `/createPermToken`  
**Description:** create permanent token

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
  "https://api-uk.kurtosys.app/createPermToken"
```

---

### delete permanent token

**Method:** `POST`  
**Path:** `/deletePermToken`  
**Description:** delete permanent token

#### Parameters
**Body Parameters:**
- `token` (string) **Required** - Body parameter: token

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletePermToken"
```

---

### get user by token

**Method:** `POST`  
**Path:** `/getUserByToken`  
**Description:** get user by token

#### Parameters
**Body Parameters:**
- `token` (string) **Required** - Body parameter: token

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getUserByToken"
```

---

### assurance

**Method:** `POST`  
**Path:** `/assurance`  
**Description:** assurance

#### Parameters
**Body Parameters:**
- `username` (string) **Required** - Body parameter: username
- `clientName` (string) **Required** - Body parameter: clientName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance"
```

---

### update-assurance

**Method:** `POST`  
**Path:** `/update-assurance`  
**Description:** update-assurance

#### Parameters
**Body Parameters:**
- `imageId` (string) **Required** - Body parameter: imageId
- `message` (string) **Required** - Body parameter: message

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/update-assurance"
```

---

### List Permanent Tokens

**Method:** `POST`  
**Path:** `/listpermtokens`  
**Description:** List Permanent Tokens

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
  "https://api-uk.kurtosys.app/listpermtokens"
```

---

### 2FA Setup 

**Method:** `POST`  
**Path:** `/2fa/login/enroll`  
**Description:** 2FA Setup 

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/login/enroll"
```

---

### 2fa Settings

**Method:** `POST`  
**Path:** `/2fa`  
**Description:** 2fa Settings

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
  "https://api-uk.kurtosys.app/2fa"
```

---

### 2FA Methods

**Method:** `GET`  
**Path:** `/2fa`  
**Description:** 2FA Methods

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa"
```

---

### 2FA Auth 

**Method:** `POST`  
**Path:** `/2fa/login`  
**Description:** 2FA Auth 

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/login"
```

---

### Password Requirements

**Method:** `POST`  
**Path:** `/password-requirements`  
**Description:** Password Requirements

#### Parameters
**Body Parameters:**
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/password-requirements"
```

---

### Set Default Permanent Token

**Method:** `POST`  
**Path:** `/setDefaultPermanentToken`  
**Description:** Set Default Permanent Token

#### Parameters
**Body Parameters:**
- `token` (string) **Required** - Body parameter: token

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/setDefaultPermanentToken"
```

---

### Get Default Permanent Token

**Method:** `POST`  
**Path:** `/getDefaultPermanentToken`  
**Description:** Get Default Permanent Token

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDefaultPermanentToken"
```

---

### New User Registration

**Method:** `POST`  
**Path:** `/registerNewUser`  
**Description:** New User Registration

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `name` (string) **Required** - Body parameter: name
- `userMeta` (object) **Required** - Body parameter: userMeta

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/registerNewUser"
```

---

### addClient

**Method:** `POST`  
**Path:** `/addClient`  
**Description:** addClient

#### Parameters
**Body Parameters:**
- `clientName` (string) **Required** - Body parameter: clientName
- `modules` (object) **Required** - Body parameter: modules

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClient"
```

---

### listClients

**Method:** `POST`  
**Path:** `/listClients`  
**Description:** listClients

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
  "https://api-uk.kurtosys.app/listClients"
```

---

### clearClient

**Method:** `POST`  
**Path:** `/clearClient`  
**Description:** clearClient

#### Parameters
**Body Parameters:**
- `clientName` (string) **Required** - Body parameter: clientName
- `types` (object) **Required** - Body parameter: types

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/clearClient"
```

---

### updateClient

**Method:** `POST`  
**Path:** `/updateClient`  
**Description:** updateClient

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `clientName` (string) **Required** - Body parameter: clientName
- `modules` (object) **Required** - Body parameter: modules
- `enabledEntityTypeEntitlements` (object) **Required** - Body parameter: enabledEntityTypeEntitlements
- `enableDocumentEntitlement` (boolean) **Required** - Body parameter: enableDocumentEntitlement

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateClient"
```

---

### getClient

**Method:** `GET`  
**Path:** `/getClient`  
**Description:** getClient

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getClient"
```

---

### listOwnClient

**Method:** `POST`  
**Path:** `/listOwnClient`  
**Description:** listOwnClient

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
  "https://api-uk.kurtosys.app/listOwnClient"
```

---

### Clear Test Client

**Method:** `POST`  
**Path:** `/clearTestClient`  
**Description:** Clear Test Client

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
  "https://api-uk.kurtosys.app/clearTestClient"
```

---

### List Activity Types

**Method:** `POST`  
**Path:** `/listActivityTypes`  
**Description:** List Activity Types

#### Parameters
**Body Parameters:**
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listActivityTypes"
```

---

### Activity Search

**Method:** `POST`  
**Path:** `/searchActivity`  
**Description:** Activity Search

#### Parameters
**Body Parameters:**
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit
- `sort` (object) **Required** - Body parameter: sort
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchActivity"
```

---

### Activity Download

**Method:** `POST`  
**Path:** `/downloadActivities`  
**Description:** Activity Download

#### Parameters
**Body Parameters:**
- `start` (string) **Required** - Body parameter: start
- `end` (string) **Required** - Body parameter: end
- `sort` (object) **Required** - Body parameter: sort
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadActivities"
```

---

### Get Facets

**Method:** `POST`  
**Path:** `/getFacets`  
**Description:** Get Facets

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

### Upsert Application Template Permission

**Method:** `POST`  
**Path:** `/upsertApplicationTemplatePermission`  
**Description:** Upsert Application Template Permission

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `permission` (string) **Required** - Body parameter: permission
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplatePermission"
```

---

### List Application Template Permissions

**Method:** `POST`  
**Path:** `/listApplicationTemplatePermissions`  
**Description:** List Application Template Permissions

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplatePermissions"
```

---

### Delete Application Template Permissions

**Method:** `POST`  
**Path:** `/deleteApplicationTemplatePermissions`  
**Description:** Delete Application Template Permissions

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplatePermissions"
```

---

### Upsert Application Template Role

**Method:** `POST`  
**Path:** `/upsertApplicationTemplateRole`  
**Description:** Upsert Application Template Role

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `role` (string) **Required** - Body parameter: role
- `description` (string) **Required** - Body parameter: description
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateRole"
```

---

### List Application Template Role

**Method:** `POST`  
**Path:** `/listApplicationTemplateRole`  
**Description:** List Application Template Role

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `roles` (object) **Required** - Body parameter: roles

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplateRole"
```

---

### Delete Application Template Role

**Method:** `POST`  
**Path:** `/deleteApplicationTemplateRole`  
**Description:** Delete Application Template Role

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `role` (string) **Required** - Body parameter: role

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplateRole"
```

---

### Get Preset

**Method:** `POST`  
**Path:** `/getApplicationTemplatePreset`  
**Description:** Get Preset

#### Parameters
**Body Parameters:**
- `applicationTemplatePresetId` (number) **Required** - Body parameter: applicationTemplatePresetId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationTemplatePreset"
```

---

### List Presets

**Method:** `POST`  
**Path:** `/listApplicationTemplatePresets`  
**Description:** List Presets

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplatePresets"
```

---

### Upsert Preset

**Method:** `POST`  
**Path:** `/upsertApplicationTemplatePreset`  
**Description:** Upsert Preset

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `type` (string) **Required** - Body parameter: type
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `preset` (object) **Required** - Body parameter: preset
- `wizard` (object) **Required** - Body parameter: wizard

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplatePreset"
```

---

### Delete Preset

**Method:** `POST`  
**Path:** `/deleteApplicationTemplatePreset`  
**Description:** Delete Preset

#### Parameters
**Body Parameters:**
- `applicationTemplatePreset` (number) **Required** - Body parameter: applicationTemplatePreset

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplatePreset"
```

---

### Pagination

**Method:** `POST`  
**Path:** `/listApplicationTemplates`  
**Description:** Pagination

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

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

### Sort

**Method:** `POST`  
**Path:** `/listApplicationTemplates`  
**Description:** Sort

#### Parameters
**Body Parameters:**
- `sort` (object) **Required** - Body parameter: sort

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

### Default

**Method:** `POST`  
**Path:** `/listApplicationTemplates`  
**Description:** Default

#### Parameters


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

### ReturnFields

**Method:** `POST`  
**Path:** `/listApplicationTemplates`  
**Description:** ReturnFields

#### Parameters
**Body Parameters:**
- `returnFields` (string) **Required** - Body parameter: returnFields

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

### Upsert Application Permissions

**Method:** `POST`  
**Path:** `/upsertApplicationPermissions`  
**Description:** Upsert Application Permissions

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationPermissions"
```

---

### List Application Permissions

**Method:** `POST`  
**Path:** `/listApplicationPermissions`  
**Description:** List Application Permissions

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationPermissions"
```

---

### Delete Application Permissions

**Method:** `POST`  
**Path:** `/deleteApplicationPermissions`  
**Description:** Delete Application Permissions

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationPermissions"
```

---

### Upsert Application Role

**Method:** `POST`  
**Path:** `/upsertApplicationRole`  
**Description:** Upsert Application Role

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `role` (string) **Required** - Body parameter: role
- `description` (string) **Required** - Body parameter: description
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationRole"
```

---

### Delete Application Role

**Method:** `POST`  
**Path:** `/deleteApplicationRole`  
**Description:** Delete Application Role

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `role` (string) **Required** - Body parameter: role
- `description` (string) **Required** - Body parameter: description
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationRole"
```

---

### List Application Roles

**Method:** `POST`  
**Path:** `/listApplicationRoles`  
**Description:** List Application Roles

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationRoles"
```

---

### Apps User Logout

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/logout`  
**Description:** Apps User Logout

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
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/logout"
```

---

### Apps User Login

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/login`  
**Description:** Apps User Login

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `password` (string) **Required** - Body parameter: password
- `clientName` (string) **Required** - Body parameter: clientName
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/login"
```

---

### Apps Auth 2FA Login

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/2fa/login`  
**Description:** Apps Auth 2FA Login

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/2fa/login"
```

---

### Add Application User 

**Method:** `POST`  
**Path:** `/addUser`  
**Description:** Add Application User 

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `email` (string) **Required** - Body parameter: email
- `roles` (object) **Required** - Body parameter: roles
- `clientId` (number) **Required** - Body parameter: clientId
- `password` (string) **Required** - Body parameter: password

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUser"
```

---

### List User Applications

**Method:** `POST`  
**Path:** `/listUserApplication`  
**Description:** List User Applications

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
  "https://api-uk.kurtosys.app/listUserApplication"
```

---

### Upsert User Application

**Method:** `POST`  
**Path:** `/upsertUserApplication`  
**Description:** Upsert User Application

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `applicationCodes` (object) **Required** - Body parameter: applicationCodes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserApplication"
```

---

### Versions - Only source

**Method:** `POST`  
**Path:** `/upgrade/versions`  
**Description:** Versions - Only source

#### Parameters
**Body Parameters:**
- `sourceTemplateCode` (string) **Required** - Body parameter: sourceTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/versions"
```

---

### Versions - Source and destination

**Method:** `POST`  
**Path:** `/upgrade/versions`  
**Description:** Versions - Source and destination

#### Parameters
**Body Parameters:**
- `sourceTemplateCode` (string) **Required** - Body parameter: sourceTemplateCode
- `destinationTemplateCode` (string) **Required** - Body parameter: destinationTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/versions"
```

---

### Preview

**Method:** `POST`  
**Path:** `/upgrade/preview`  
**Description:** Preview

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `destinationTemplateCode` (string) **Required** - Body parameter: destinationTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/preview"
```

---

### Execute

**Method:** `POST`  
**Path:** `/upgrade/execute`  
**Description:** Execute

#### Parameters
**Body Parameters:**
- `status` (string) **Required** - Body parameter: status
- `messages` (object) **Required** - Body parameter: messages
- `configurations` (object) **Required** - Body parameter: configurations
- `styles` (object) **Required** - Body parameter: styles
- `application` (object) **Required** - Body parameter: application
- `destinationTemplateCode` (string) **Required** - Body parameter: destinationTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/execute"
```

---

### Revert

**Method:** `POST`  
**Path:** `/upgrade/revert`  
**Description:** Revert

#### Parameters
**Body Parameters:**
- `applicationUpgradeId` (number) **Required** - Body parameter: applicationUpgradeId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/revert"
```

---

### List

**Method:** `POST`  
**Path:** `/upgrade/list`  
**Description:** List

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/list"
```

---

### Apps Auth Update Password

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/auth/update-password`  
**Description:** Apps Auth Update Password

#### Parameters
**Body Parameters:**
- `password` (string) **Required** - Body parameter: password
- `confirmPassword` (string) **Required** - Body parameter: confirmPassword

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth/update-password"
```

---

### Apps User Request Strategies

**Method:** `POST`  
**Path:** `/apps/987c5234-3abf-4c39-b799-d1a62d635ec0/services/requestStrategies`  
**Description:** Apps User Request Strategies

#### Parameters
**Body Parameters:**
- `organization` (string) **Required** - Body parameter: organization
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/987c5234-3abf-4c39-b799-d1a62d635ec0/services/requestStrategies"
```

---

### Auth Service  Assurance Update

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/assurance/update`  
**Description:** Auth Service  Assurance Update

#### Parameters
**Body Parameters:**
- `clientName` (string) **Required** - Body parameter: clientName
- `imageId` (object) **Required** - Body parameter: imageId
- `message` (string) **Required** - Body parameter: message

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/assurance/update"
```

---

### Auth Service Check Logged In

**Method:** `GET`  
**Path:** `/apps/kurtosysapp/services/checkLoggedIn`  
**Description:** Auth Service Check Logged In

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/checkLoggedIn"
```

---

### Auth Service 2FA Methods

**Method:** `GET`  
**Path:** `/apps/kurtosysapp/services/auth/2fa`  
**Description:** Auth Service 2FA Methods

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth/2fa"
```

---

### Auth Service SAML Signin

**Method:** `POST`  
**Path:** `/apps/kurtosysapp/services/auth//saml/sign_in`  
**Description:** Auth Service SAML Signin

#### Parameters
**Query Parameters:**
- `redirect` (string) - OPTIONAL

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth//saml/sign_in"
```

---

### Default

**Method:** `POST`  
**Path:** `/listApplications`  
**Description:** Default

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
  "https://api-uk.kurtosys.app/listApplications"
```

---

### Pagination

**Method:** `POST`  
**Path:** `/listApplications`  
**Description:** Pagination

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

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

### Sort

**Method:** `POST`  
**Path:** `/listApplications`  
**Description:** Sort

#### Parameters
**Body Parameters:**
- `sort` (object) **Required** - Body parameter: sort

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

### Exclude Properties

**Method:** `POST`  
**Path:** `/listApplications`  
**Description:** Exclude Properties

#### Parameters
**Body Parameters:**
- `excludeProperties` (object) **Required** - Body parameter: excludeProperties

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

### Retrieve Fund Manager Picture

**Method:** `GET`  
**Path:** `/apps//services/fund/fundmanagerpicture`  
**Description:** Retrieve Fund Manager Picture

#### Parameters
**Query Parameters:**
- `code` (string) **Required** - Query parameter: code
- `token` (string) **Required** - Query parameter: token

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps//services/fund/fundmanagerpicture"
```

---

### List Theme Versions

**Method:** `POST`  
**Path:** `/listThemeVersions`  
**Description:** List Theme Versions

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listThemeVersions"
```

---

### Get Theme Version

**Method:** `POST`  
**Path:** `/getThemeVersion`  
**Description:** Get Theme Version

#### Parameters
**Body Parameters:**
- `themeId` (number) **Required** - Body parameter: themeId
- `effectiveFrom` (string) **Required** - Body parameter: effectiveFrom

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getThemeVersion"
```

---

### Restore Theme

**Method:** `POST`  
**Path:** `/restoreTheme`  
**Description:** Restore Theme

#### Parameters
**Body Parameters:**
- `themeVersionId` (number) **Required** - Body parameter: themeVersionId
- `comment` (string) **Required** - Body parameter: comment

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreTheme"
```

---

### Get Theme (ThemeId)

**Method:** `GET`  
**Path:** `/getTheme`  
**Description:** Get Theme (ThemeId)

#### Parameters
**Query Parameters:**
- `themeId` (string) **Required** - Query parameter: themeId

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTheme"
```

---

### Get Theme (Name and Type)

**Method:** `GET`  
**Path:** `/getTheme`  
**Description:** Get Theme (Name and Type)

#### Parameters
**Query Parameters:**
- `name` (string) **Required** - Query parameter: name
- `type` (string) **Required** - Query parameter: type

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTheme"
```

---

### Theme CSS

**Method:** `GET`  
**Path:** `/theme/default.css`  
**Description:** Theme CSS

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
  "https://api-uk.kurtosys.app/theme/default.css"
```

---

### List Themes

**Method:** `POST`  
**Path:** `/listThemes`  
**Description:** List Themes

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listThemes"
```

---

### Upsert Theme

**Method:** `POST`  
**Path:** `/upsertTheme`  
**Description:** Upsert Theme

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `type` (string) **Required** - Body parameter: type
- `description` (string) **Required** - Body parameter: description
- `comment` (string) **Required** - Body parameter: comment
- `theme` (object) **Required** - Body parameter: theme

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTheme"
```

---

### Delete Theme

**Method:** `POST`  
**Path:** `/deleteTheme`  
**Description:** Delete Theme

#### Parameters
**Body Parameters:**
- `themeId` (number) **Required** - Body parameter: themeId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTheme"
```

---

### Get JSON Schema (JsonSchemaId)

**Method:** `GET`  
**Path:** `/getJsonSchema`  
**Description:** Get JSON Schema (JsonSchemaId)

#### Parameters
**Query Parameters:**
- `jsonSchemaId` (string) **Required** - Query parameter: jsonSchemaId

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getJsonSchema"
```

---

### Get JSON Schema (Type)

**Method:** `GET`  
**Path:** `/getJsonSchema`  
**Description:** Get JSON Schema (Type)

#### Parameters
**Query Parameters:**
- `type` (string) **Required** - Query parameter: type

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getJsonSchema"
```

---

### List JSON Schemas

**Method:** `POST`  
**Path:** `/listJsonSchemas`  
**Description:** List JSON Schemas

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listJsonSchemas"
```

---

### Upsert JSON Schema

**Method:** `POST`  
**Path:** `/upsertJsonSchema`  
**Description:** Upsert JSON Schema

#### Parameters
**Body Parameters:**
- `jsonSchemaId` (number) **Required** - Body parameter: jsonSchemaId
- `type` (string) **Required** - Body parameter: type
- `defaultValue` (object) **Required** - Body parameter: defaultValue
- `jsonSchema` (object) **Required** - Body parameter: jsonSchema

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertJsonSchema"
```

---

### Delete JSON Schema

**Method:** `POST`  
**Path:** `/deleteJsonSchema`  
**Description:** Delete JSON Schema

#### Parameters
**Body Parameters:**
- `jsonSchemaId` (number) **Required** - Body parameter: jsonSchemaId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteJsonSchema"
```

---

### List Types

**Method:** `POST`  
**Path:** `/listApplicationClientConfigurationTypes`  
**Description:** List Types

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurationTypes"
```

---

### Upsert Type (insert)

**Method:** `POST`  
**Path:** `/upsertApplicationClientConfigurationType`  
**Description:** Upsert Type (insert)

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `jsonSchemaId` (number) **Required** - Body parameter: jsonSchemaId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfigurationType"
```

---

### Upsert Type (update)

**Method:** `POST`  
**Path:** `/upsertApplicationClientConfigurationType`  
**Description:** Upsert Type (update)

#### Parameters
**Body Parameters:**
- `applicationClientConfigurationTypeId` (number) **Required** - Body parameter: applicationClientConfigurationTypeId
- `name` (string) **Required** - Body parameter: name
- `jsonSchemaId` (number) **Required** - Body parameter: jsonSchemaId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfigurationType"
```

---

### Delete Type

**Method:** `POST`  
**Path:** `/deleteApplicationClientConfigurationType`  
**Description:** Delete Type

#### Parameters
**Body Parameters:**
- `applicationClientConfigurationTypeId` (number) **Required** - Body parameter: applicationClientConfigurationTypeId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationClientConfigurationType"
```

---

### List Versions

**Method:** `POST`  
**Path:** `/listApplicationClientConfigurationVersions`  
**Description:** List Versions

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurationVersions"
```

---

### Get Version

**Method:** `POST`  
**Path:** `/getApplicationClientConfigurationVersion`  
**Description:** Get Version

#### Parameters
**Body Parameters:**
- `applicationClientConfigurationVersionId` (number) **Required** - Body parameter: applicationClientConfigurationVersionId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationClientConfigurationVersion"
```

---

### Restore

**Method:** `POST`  
**Path:** `/restoreApplicationClientConfiguration`  
**Description:** Restore

#### Parameters
**Body Parameters:**
- `applicationClientConfigurationVersionId` (number) **Required** - Body parameter: applicationClientConfigurationVersionId
- `comment` (string) **Required** - Body parameter: comment

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationClientConfiguration"
```

---

### Get Application Client Configuration (applicationClientConfigurationId)

**Method:** `GET`  
**Path:** `/getApplicationClientConfiguration`  
**Description:** Get Application Client Configuration (applicationClientConfigurationId)

#### Parameters
**Query Parameters:**
- `applicationClientConfigurationId` (string) **Required** - Query parameter: applicationClientConfigurationId

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationClientConfiguration"
```

---

### List Application Client Configurations

**Method:** `POST`  
**Path:** `/listApplicationClientConfigurations`  
**Description:** List Application Client Configurations

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurations"
```

---

### Upsert Application Client Configuration

**Method:** `POST`  
**Path:** `/upsertApplicationClientConfiguration`  
**Description:** Upsert Application Client Configuration

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `applicationClientConfigurationTypeId` (number) **Required** - Body parameter: applicationClientConfigurationTypeId
- `description` (string) **Required** - Body parameter: description
- `comment` (string) **Required** - Body parameter: comment
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfiguration"
```

---

### Delete Application Client Configuration

**Method:** `POST`  
**Path:** `/deleteApplicationClientConfiguration`  
**Description:** Delete Application Client Configuration

#### Parameters
**Body Parameters:**
- `applicationClientConfigurationId` (number) **Required** - Body parameter: applicationClientConfigurationId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationClientConfiguration"
```

---

### Queries - Basic

**Method:** `POST`  
**Path:** `/queries`  
**Description:** Queries - Basic

#### Parameters
**Body Parameters:**
- `include` (object) **Required** - Body parameter: include
- `inputs` (object) **Required** - Body parameter: inputs
- `queryContextConfigurations` (object) **Required** - Body parameter: queryContextConfigurations
- `queries` (object) **Required** - Body parameter: queries
- `debugOptions` (object) **Required** - Body parameter: debugOptions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/queries"
```

---

### Queries - Debugging

**Method:** `POST`  
**Path:** `/queries`  
**Description:** Queries - Debugging

#### Parameters
**Body Parameters:**
- `inputs` (object) **Required** - Body parameter: inputs
- `queryContextConfigurations` (object) **Required** - Body parameter: queryContextConfigurations
- `queries` (object) **Required** - Body parameter: queries
- `debugOptions` (object) **Required** - Body parameter: debugOptions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/queries"
```

---

### Initialize

**Method:** `GET`  
**Path:** `/initialize`  
**Description:** Initialize

#### Parameters
**Query Parameters:**
- `request` (string) **Required** - Query parameter: request

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/initialize"
```

---

### Upsert Email Configuration

**Method:** `POST`  
**Path:** `/upsertEmailConfiguration`  
**Description:** Upsert Email Configuration

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `emailType` (string) **Required** - Body parameter: emailType
- `content` (string) **Required** - Body parameter: content
- `subject` (string) **Required** - Body parameter: subject

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertEmailConfiguration"
```

---

### List Email Configuration

**Method:** `POST`  
**Path:** `/listEmailConfigurations`  
**Description:** List Email Configuration

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listEmailConfigurations"
```

---

### Send Test Email

**Method:** `POST`  
**Path:** `/sendTestEmail`  
**Description:** Send Test Email

#### Parameters
**Body Parameters:**
- `to` (string) **Required** - Body parameter: to
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `emailType` (string) **Required** - Body parameter: emailType
- `subject` (string) **Required** - Body parameter: subject
- `template` (string) **Required** - Body parameter: template

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendTestEmail"
```

---

### Send Email

**Method:** `POST`  
**Path:** `/sendEmail`  
**Description:** Send Email

#### Parameters
**Body Parameters:**
- `to` (string) **Required** - Body parameter: to
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `emailType` (string) **Required** - Body parameter: emailType
- `contextData` (object) **Required** - Body parameter: contextData
- `activityLog` (object) **Required** - Body parameter: activityLog
- `clientId` (number) **Required** - Body parameter: clientId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendEmail"
```

---

### List Commentaries

**Method:** `POST`  
**Path:** `/listCommentaries`  
**Description:** List Commentaries

#### Parameters
**Body Parameters:**
- `commentaryType` (object) **Required** - Body parameter: commentaryType
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
  "https://api-uk.kurtosys.app/listCommentaries"
```

---

### Add Cache Entry

**Method:** `POST`  
**Path:** `/addKey`  
**Description:** Add Cache Entry

#### Parameters
**Body Parameters:**
- `key` (string) **Required** - Body parameter: key
- `value` (string) **Required** - Body parameter: value
- `expiry` (string) **Required** - Body parameter: expiry
- `tags` (object) **Required** - Body parameter: tags

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addKey"
```

---

### List all Cache Entries

**Method:** `GET`  
**Path:** `/listKeys`  
**Description:** List all Cache Entries

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listKeys"
```

---

### Get a Cache Entry by Key

**Method:** `POST`  
**Path:** `/retrieveKey`  
**Description:** Get a Cache Entry by Key

#### Parameters
**Body Parameters:**
- `key` (string) **Required** - Body parameter: key

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveKey"
```

---

### Get Cache Entries by Tags

**Method:** `POST`  
**Path:** `/retrieveKey`  
**Description:** Get Cache Entries by Tags

#### Parameters
**Body Parameters:**
- `tags` (object) **Required** - Body parameter: tags

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveKey"
```

---

### Remove Expired Cache Entries

**Method:** `POST`  
**Path:** `/wipeKeys`  
**Description:** Remove Expired Cache Entries

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
  "https://api-uk.kurtosys.app/wipeKeys"
```

---

### Delete Cache Entries by Keys

**Method:** `DELETE`  
**Path:** `/deleteKeys`  
**Description:** Delete Cache Entries by Keys

#### Parameters
**Body Parameters:**
- `keys` (object) **Required** - Body parameter: keys

#### Response
**204:** Resource deleted successfully

#### Example Request
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteKeys"
```

---

### Delete all Cache Entries for a Client

**Method:** `DELETE`  
**Path:** `/deleteAll`  
**Description:** Delete all Cache Entries for a Client

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
  "https://api-uk.kurtosys.app/deleteAll"
```

---

### Purge Client Edge Cache

**Method:** `POST`  
**Path:** `/purgeClientEdgeCache`  
**Description:** Purge Client Edge Cache

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/purgeClientEdgeCache"
```

---

### Purge ALL Edge Cache

**Method:** `POST`  
**Path:** `/purgeAllEdgeCache`  
**Description:** Purge ALL Edge Cache

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/purgeAllEdgeCache"
```

---

### Update Client Configuration

**Method:** `POST`  
**Path:** `/updateClientConfiguration`  
**Description:** Update Client Configuration

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
  "https://api-uk.kurtosys.app/updateClientConfiguration"
```

---

### Retrieve Client Configuration

**Method:** `POST`  
**Path:** `/retrieveClientConfiguration`  
**Description:** Retrieve Client Configuration

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
  "https://api-uk.kurtosys.app/retrieveClientConfiguration"
```

---

### Add Client Configuration

**Method:** `POST`  
**Path:** `/addClientConfiguration`  
**Description:** Add Client Configuration

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

### Upsert Client Configuration

**Method:** `POST`  
**Path:** `/upsertClientConfiguration`  
**Description:** Upsert Client Configuration

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

### Update Client Configuration

**Method:** `POST`  
**Path:** `/updateClientConfiguration`  
**Description:** Update Client Configuration

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
  "https://api-uk.kurtosys.app/updateClientConfiguration"
```

---

### Retrieve Client Configuration

**Method:** `POST`  
**Path:** `/retrieveClientConfiguration`  
**Description:** Retrieve Client Configuration

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
  "https://api-uk.kurtosys.app/retrieveClientConfiguration"
```

---

### Delete Client Configuratio

**Method:** `POST`  
**Path:** `/deleteClientConfiguration`  
**Description:** Delete Client Configuratio

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

### Add Client Configuration

**Method:** `POST`  
**Path:** `/addClientConfiguration`  
**Description:** Add Client Configuration

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

### List Properties

**Method:** `POST`  
**Path:** `/listProperties`  
**Description:** List Properties

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
  "https://api-uk.kurtosys.app/listProperties"
```

---

### Update Client Configuration

**Method:** `POST`  
**Path:** `/updateClientConfiguration`  
**Description:** Update Client Configuration

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
  "https://api-uk.kurtosys.app/updateClientConfiguration"
```

---

### Retrieve Client Configuration

**Method:** `POST`  
**Path:** `/retrieveClientConfiguration`  
**Description:** Retrieve Client Configuration

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
  "https://api-uk.kurtosys.app/retrieveClientConfiguration"
```

---

### Add Client Configuration

**Method:** `POST`  
**Path:** `/addClientConfiguration`  
**Description:** Add Client Configuration

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

### Upsert Fund Manager Key Fact

**Method:** `POST`  
**Path:** `/upsertFundManagerKeyFact`  
**Description:** Upsert Fund Manager Key Fact

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `label` (string) **Required** - Body parameter: label
- `dataType` (string) **Required** - Body parameter: dataType
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertFundManagerKeyFact"
```

---

### List Fund Manager Key Facts

**Method:** `POST`  
**Path:** `/listFundManagerKeyFacts`  
**Description:** List Fund Manager Key Facts

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
  "https://api-uk.kurtosys.app/listFundManagerKeyFacts"
```

---

### Lookup List Values - List

**Method:** `GET`  
**Path:** `/lookuplist/DISTRIBUTION_LIST_TYPE`  
**Description:** Lookup List Values - List

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
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE"
```

---

### Lookup List Value - Insert

**Method:** `POST`  
**Path:** `/lookuplist/DISTRIBUTION_LIST_TYPE`  
**Description:** Lookup List Value - Insert

#### Parameters
**Body Parameters:**
- `value` (string) **Required** - Body parameter: value

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE"
```

---

### Lookup List Value - Update

**Method:** `POST`  
**Path:** `/lookuplist/DISTRIBUTION_LIST_TYPE/4`  
**Description:** Lookup List Value - Update

#### Parameters
**Body Parameters:**
- `value` (string) **Required** - Body parameter: value

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE/4"
```

---

### Lookup List Value - Delete

**Method:** `DELETE`  
**Path:** `/lookuplist/DISTRIBUTION_LIST_TYPE/3`  
**Description:** Lookup List Value - Delete

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
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE/3"
```

---

### Upsert User Document Entitlement Scheme

**Method:** `POST`  
**Path:** `/upsertUserDocumentEntitlementScheme`  
**Description:** Upsert User Document Entitlement Scheme

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `documentEntitlementSchemeId` (number) **Required** - Body parameter: documentEntitlementSchemeId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlementScheme"
```

---

### Upsert User Entitlement Preset

**Method:** `POST`  
**Path:** `/upsertUserDocumentEntitlementPreset`  
**Description:** Upsert User Entitlement Preset

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `presetCode` (string) **Required** - Body parameter: presetCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlementPreset"
```

---

### List User Entitlement Preset

**Method:** `POST`  
**Path:** `/listUserDocumentEntitlementPreset`  
**Description:** List User Entitlement Preset

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
  "https://api-uk.kurtosys.app/listUserDocumentEntitlementPreset"
```

---

### Delete User Entitlement Preset

**Method:** `POST`  
**Path:** `/deleteUserDocumentEntitlementPreset`  
**Description:** Delete User Entitlement Preset

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
  "https://api-uk.kurtosys.app/deleteUserDocumentEntitlementPreset"
```

---

### Bulk Upsert User Document Entitlement Preset

**Method:** `POST`  
**Path:** `/bulkUpsertUserDocumentEntitlementsPreset`  
**Description:** Bulk Upsert User Document Entitlement Preset

#### Parameters
**Body Parameters:**
- `userNames` (object) **Required** - Body parameter: userNames
- `presetCode` (string) **Required** - Body parameter: presetCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkUpsertUserDocumentEntitlementsPreset"
```

---

### Get Filters

**Method:** `POST`  
**Path:** `/getFilters`  
**Description:** Get Filters

#### Parameters
**Body Parameters:**
- `codes` (object) **Required** - Body parameter: codes
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFilters"
```

---

### Replace User Data Entitlements

**Method:** `POST`  
**Path:** `/replaceUserDataEntitlements`  
**Description:** Replace User Data Entitlements

#### Parameters
**Body Parameters:**
- `0` (object) **Required** - Body parameter: 0
- `1` (object) **Required** - Body parameter: 1

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceUserDataEntitlements"
```

---

### Bulk Replace User Data Entitlements

**Method:** `POST`  
**Path:** `/bulkReplaceUserDataEntitlements`  
**Description:** Bulk Replace User Data Entitlements

#### Parameters
**Body Parameters:**
- `userNames` (object) **Required** - Body parameter: userNames
- `dataEntitlementLists` (object) **Required** - Body parameter: dataEntitlementLists
- `dataEntitlements` (object) **Required** - Body parameter: dataEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkReplaceUserDataEntitlements"
```

---

### Add User Data Entitlements

**Method:** `POST`  
**Path:** `/addUserDataEntitlements`  
**Description:** Add User Data Entitlements

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
  "https://api-uk.kurtosys.app/addUserDataEntitlements"
```

---

### Bulk Add User Data Entitlements

**Method:** `POST`  
**Path:** `/bulkAddUserDataEntitlements`  
**Description:** Bulk Add User Data Entitlements

#### Parameters
**Body Parameters:**
- `userNames` (object) **Required** - Body parameter: userNames
- `dataEntitlementLists` (object) **Required** - Body parameter: dataEntitlementLists
- `dataEntitlements` (object) **Required** - Body parameter: dataEntitlements

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkAddUserDataEntitlements"
```

---

### Remove User Data Entitlements

**Method:** `POST`  
**Path:** `/removeUserDataEntitlements`  
**Description:** Remove User Data Entitlements

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
  "https://api-uk.kurtosys.app/removeUserDataEntitlements"
```

---

### List User Data Entitlements

**Method:** `POST`  
**Path:** `/listUserDataEntitlements`  
**Description:** List User Data Entitlements

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserDataEntitlements"
```

---

### Upsert Entity

**Method:** `POST`  
**Path:** `/upsertentity`  
**Description:** Upsert Entity

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode
- `type` (string) **Required** - Body parameter: type
- `propertiesPub` (object) **Required** - Body parameter: propertiesPub

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertentity"
```

---

### Search Entity (Core Client) 

**Method:** `POST`  
**Path:** `/searchentity`  
**Description:** Search Entity (Core Client) 

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `sort` (object) **Required** - Body parameter: sort
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

### Retrieve FM Pic

**Method:** `GET`  
**Path:** `/fundmanagerpicture`  
**Description:** Retrieve FM Pic

#### Parameters
**Query Parameters:**
- `code` (string) **Required** - Query parameter: code
- `token` (string) **Required** - Query parameter: token

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/fundmanagerpicture"
```

---

### startLoad

**Method:** `POST`  
**Path:** `/startload`  
**Description:** startLoad

#### Parameters
**Body Parameters:**
- `loaderName` (string) **Required** - Body parameter: loaderName
- `loaderAddress` (string) **Required** - Body parameter: loaderAddress
- `gitRepo` (string) **Required** - Body parameter: gitRepo
- `targetData` (object) **Required** - Body parameter: targetData

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/startload"
```

---

### endLoad

**Method:** `POST`  
**Path:** `/finishload`  
**Description:** endLoad

#### Parameters
**Body Parameters:**
- `loaderSnapId` (number) **Required** - Body parameter: loaderSnapId
- `exitCode` (number) **Required** - Body parameter: exitCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/finishload"
```

---

### Get Unique Filters

**Method:** `POST`  
**Path:** `/getFilters`  
**Description:** Get Unique Filters

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `filterProperties` (object) **Required** - Body parameter: filterProperties
- `search` (object) **Required** - Body parameter: search
- `fundList` (string) **Required** - Body parameter: fundList
- `counts` (boolean) **Required** - Body parameter: counts

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFilters"
```

---

### getEntity

**Method:** `POST`  
**Path:** `/getEntity`  
**Description:** getEntity

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (string) **Required** - Body parameter: clientCode
- `include` (object) **Required** - Body parameter: include

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getEntity"
```

---

### getFundManager

**Method:** `GET`  
**Path:** `/getFundManager/105`  
**Description:** getFundManager

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFundManager/105"
```

---

### Get Entity Facets

**Method:** `POST`  
**Path:** `/getfacets`  
**Description:** Get Entity Facets

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `searchTerm` (string) **Required** - Body parameter: searchTerm

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getfacets"
```

---

### Search Entity (Core Client) Multi Sort

**Method:** `POST`  
**Path:** `/searchentity`  
**Description:** Search Entity (Core Client) Multi Sort

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `clientCode` (object) **Required** - Body parameter: clientCode
- `search` (object) **Required** - Body parameter: search
- `sort` (object) **Required** - Body parameter: sort
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

### Delete Fund Manager

**Method:** `POST`  
**Path:** `/deleteFundManager`  
**Description:** Delete Fund Manager

#### Parameters
**Body Parameters:**
- `fundManagerId` (number) **Required** - Body parameter: fundManagerId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteFundManager"
```

---

### List Fund Managers

**Method:** `GET`  
**Path:** `/listFundManagers`  
**Description:** List Fund Managers

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listFundManagers"
```

---

### Add FormatCode

**Method:** `POST`  
**Path:** `/addFormatCode`  
**Description:** Add FormatCode

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `code` (string) **Required** - Body parameter: code
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `formatRules` (object) **Required** - Body parameter: formatRules

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addFormatCode"
```

---

### List Format Codes

**Method:** `POST`  
**Path:** `/listformatcodes`  
**Description:** List Format Codes

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listformatcodes"
```

---

### List Funds

**Method:** `POST`  
**Path:** `/upsertcommentarytype`  
**Description:** List Funds

#### Parameters
**Body Parameters:**
- `commentaryType` (string) **Required** - Body parameter: commentaryType
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertcommentarytype"
```

---

### Upsert FundList - entity

**Method:** `POST`  
**Path:** `/upsertfundlist`  
**Description:** Upsert FundList - entity

#### Parameters
**Body Parameters:**
- `listName` (string) **Required** - Body parameter: listName
- `entityType` (string) **Required** - Body parameter: entityType
- `listType` (string) **Required** - Body parameter: listType
- `funds` (object) **Required** - Body parameter: funds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist"
```

---

### Upsert FundList - query

**Method:** `POST`  
**Path:** `/upsertfundlist`  
**Description:** Upsert FundList - query

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `listType` (string) **Required** - Body parameter: listType
- `segmentationQuery` (object) **Required** - Body parameter: segmentationQuery
- `listName` (string) **Required** - Body parameter: listName
- `description` (string) **Required** - Body parameter: description
- `segmentationTags` (object) **Required** - Body parameter: segmentationTags

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist"
```

---

### Upsert FundList - composite

**Method:** `POST`  
**Path:** `/upsertfundlist`  
**Description:** Upsert FundList - composite

#### Parameters
**Body Parameters:**
- `entityType` (string) **Required** - Body parameter: entityType
- `listName` (string) **Required** - Body parameter: listName
- `description` (string) **Required** - Body parameter: description
- `listType` (string) **Required** - Body parameter: listType
- `compositeQuery` (object) **Required** - Body parameter: compositeQuery

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist"
```

---

### List Fund Lists

**Method:** `POST`  
**Path:** `/listfundlists`  
**Description:** List Fund Lists

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listfundlists"
```

---

### Delete FundList

**Method:** `POST`  
**Path:** `/deletefundlist`  
**Description:** Delete FundList

#### Parameters
**Body Parameters:**
- `listName` (string) **Required** - Body parameter: listName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletefundlist"
```

---

### Create Page Template Asset

**Method:** `POST`  
**Path:** `/upsertPageTemplateAsset`  
**Description:** Create Page Template Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertPageTemplateAsset"
```

---

### Update Page Template Asset

**Method:** `POST`  
**Path:** `/upsertPageTemplateAsset`  
**Description:** Update Page Template Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertPageTemplateAsset"
```

---

### Retrieve Page Template Asset

**Method:** `POST`  
**Path:** `/retrievePageTemplateAsset`  
**Description:** Retrieve Page Template Asset

#### Parameters
**Body Parameters:**
- `templateCode` (string) **Required** - Body parameter: templateCode
- `pageTemplateEnvironment` (string) **Required** - Body parameter: pageTemplateEnvironment
- `fileName` (string) **Required** - Body parameter: fileName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrievePageTemplateAsset"
```

---

### List Page Template Assets

**Method:** `POST`  
**Path:** `/listPageTemplateAssets`  
**Description:** List Page Template Assets

#### Parameters
**Body Parameters:**
- `pageTemplateId` (number) **Required** - Body parameter: pageTemplateId
- `pageTemplateEnvironment` (string) **Required** - Body parameter: pageTemplateEnvironment

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listPageTemplateAssets"
```

---

### Delete Page Template Assets

**Method:** `POST`  
**Path:** `/deletePageTemplateAssets`  
**Description:** Delete Page Template Assets

#### Parameters
**Body Parameters:**
- `pageTemplateId` (number) **Required** - Body parameter: pageTemplateId
- `pageTemplateEnvironment` (string) **Required** - Body parameter: pageTemplateEnvironment
- `pageTemplateAssetIds` (object) **Required** - Body parameter: pageTemplateAssetIds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletePageTemplateAssets"
```

---

### retrieveLayoutConfiguration

**Method:** `POST`  
**Path:** `/retrieveLayoutConfiguration`  
**Description:** retrieveLayoutConfiguration

#### Parameters
**Body Parameters:**
- `layoutConfigurationType` (string) **Required** - Body parameter: layoutConfigurationType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveLayoutConfiguration"
```

---

### List Office Templates

**Method:** `POST`  
**Path:** `/listOfficeTemplates`  
**Description:** List Office Templates

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listOfficeTemplates"
```

---

### Upsert Office Template

**Method:** `POST`  
**Path:** `/upsertOfficeTemplate`  
**Description:** Upsert Office Template

#### Parameters
**Body Parameters:**
- `title` (string) **Required** - Body parameter: title
- `description` (string) **Required** - Body parameter: description
- `fileType` (string) **Required** - Body parameter: fileType
- `fileName` (string) **Required** - Body parameter: fileName
- `officeTemplateType` (string) **Required** - Body parameter: officeTemplateType
- `data` (string) **Required** - Body parameter: data

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertOfficeTemplate"
```

---

### Upsert InDesign Office Template

**Method:** `POST`  
**Path:** `/upsertOfficeTemplate`  
**Description:** Upsert InDesign Office Template

#### Parameters
**Body Parameters:**
- `title` (string) **Required** - Body parameter: title
- `description` (string) **Required** - Body parameter: description
- `fileType` (string) **Required** - Body parameter: fileType
- `fileName` (string) **Required** - Body parameter: fileName
- `officeTemplateType` (string) **Required** - Body parameter: officeTemplateType
- `data` (string) **Required** - Body parameter: data
- `images` (object) **Required** - Body parameter: images
- `applicationData` (object) **Required** - Body parameter: applicationData

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertOfficeTemplate"
```

---

### List Modules

**Method:** `POST`  
**Path:** `/modules`  
**Description:** List Modules

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
  "https://api-uk.kurtosys.app/modules"
```

---

### List Modules All

**Method:** `POST`  
**Path:** `/modules/all`  
**Description:** List Modules All

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
  "https://api-uk.kurtosys.app/modules/all"
```

---

### List Permissions

**Method:** `POST`  
**Path:** `/permissions`  
**Description:** List Permissions

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
  "https://api-uk.kurtosys.app/permissions"
```

---

### Create Role

**Method:** `POST`  
**Path:** `/roles-create`  
**Description:** Create Role

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `role` (string) **Required** - Body parameter: role
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-create"
```

---

### List Roles

**Method:** `POST`  
**Path:** `/roles`  
**Description:** List Roles

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `role` (string) **Required** - Body parameter: role
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles"
```

---

### Update Role

**Method:** `POST`  
**Path:** `/roles-update`  
**Description:** Update Role

#### Parameters
**Body Parameters:**
- `roleId` (number) **Required** - Body parameter: roleId
- `clientId` (number) **Required** - Body parameter: clientId
- `role` (string) **Required** - Body parameter: role
- `permissions` (object) **Required** - Body parameter: permissions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-update"
```

---

### Get Role

**Method:** `POST`  
**Path:** `/roles-single`  
**Description:** Get Role

#### Parameters
**Body Parameters:**
- `roleId` (number) **Required** - Body parameter: roleId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-single"
```

---

### Upsert Snapshot Configuration 

**Method:** `POST`  
**Path:** `/upsertSnapshotConfiguration`  
**Description:** Upsert Snapshot Configuration 

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `urlTemplate` (string) **Required** - Body parameter: urlTemplate
- `allowedInputs` (object) **Required** - Body parameter: allowedInputs
- `inputs` (object) **Required** - Body parameter: inputs

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSnapshotConfiguration"
```

---

### List Snapshot Configurations

**Method:** `POST`  
**Path:** `/listSnapshotConfigurations`  
**Description:** List Snapshot Configurations

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSnapshotConfigurations"
```

---

### List Snapshot Urls

**Method:** `POST`  
**Path:** `/listUrls`  
**Description:** List Snapshot Urls

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUrls"
```

---

### List Snapshot Tags

**Method:** `POST`  
**Path:** `/listTags`  
**Description:** List Snapshot Tags

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTags"
```

---

### List Snapshot Facets

**Method:** `POST`  
**Path:** `/listSnapshotFacets`  
**Description:** List Snapshot Facets

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
  "https://api-uk.kurtosys.app/listSnapshotFacets"
```

---

### Retrieve Snapshot Thumbnail

**Method:** `GET`  
**Path:** `/getSnapshotThumbnail`  
**Description:** Retrieve Snapshot Thumbnail

#### Parameters
**Query Parameters:**
- `snapId` (string) **Required** - Query parameter: snapId

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotThumbnail"
```

---

### Retrieve Snapshot PDF

**Method:** `GET`  
**Path:** `/getSnapshot`  
**Description:** Retrieve Snapshot PDF

#### Parameters
**Query Parameters:**
- `snapId` (string) **Required** - Query parameter: snapId

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshot"
```

---

### Retrieve Snapshot HTML 

**Method:** `GET`  
**Path:** `/getSnapshotHTML`  
**Description:** Retrieve Snapshot HTML 

#### Parameters
**Query Parameters:**
- `snapId` (string) **Required** - Query parameter: snapId

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotHTML"
```

---

### Retrieve Snapshot Archive

**Method:** `POST`  
**Path:** `/getSnapshotArchive`  
**Description:** Retrieve Snapshot Archive

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotArchive"
```

---

### Update Snap Status Callback

**Method:** `POST`  
**Path:** `/updateSnapStatus`  
**Description:** Update Snap Status Callback

#### Parameters
**Body Parameters:**
- `snapId` (number) **Required** - Body parameter: snapId
- `accessKey` (string) **Required** - Body parameter: accessKey
- `lineCount` (number) **Required** - Body parameter: lineCount
- `errors` (object) **Required** - Body parameter: errors

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateSnapStatus"
```

---

### Update Archive Status Callback

**Method:** `POST`  
**Path:** `/updateArchiveStatus`  
**Description:** Update Archive Status Callback

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateArchiveStatus"
```

---

### Take a Snapshot

**Method:** `POST`  
**Path:** `/takeSnapshot`  
**Description:** Take a Snapshot

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/takeSnapshot"
```

---

### List Snaps

**Method:** `POST`  
**Path:** `/listSnaps`  
**Description:** List Snaps

#### Parameters
**Body Parameters:**
- `snapshotId` (number) **Required** - Body parameter: snapshotId
- `date` (string) **Required** - Body parameter: date
- `itemsBefore` (number) **Required** - Body parameter: itemsBefore
- `itemsAfter` (number) **Required** - Body parameter: itemsAfter
- `url` (string) **Required** - Body parameter: url

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSnaps"
```

---

### Update Archive Status

**Method:** `POST`  
**Path:** `/updateArchiveStatus`  
**Description:** Update Archive Status

#### Parameters
**Body Parameters:**
- `accessKey` (string) **Required** - Body parameter: accessKey
- `snapshotId` (number) **Required** - Body parameter: snapshotId
- `year` (number) **Required** - Body parameter: year
- `month` (number) **Required** - Body parameter: month
- `s3Path` (string) **Required** - Body parameter: s3Path

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateArchiveStatus"
```

---

### About

**Method:** `GET`  
**Path:** `/about`  
**Description:** About

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/about"
```

---

### Translate Labels

**Method:** `POST`  
**Path:** `/translateLabels`  
**Description:** Translate Labels

#### Parameters
**Body Parameters:**
- `culture` (string) **Required** - Body parameter: culture
- `translationCulture` (string) **Required** - Body parameter: translationCulture
- `keys` (object) **Required** - Body parameter: keys

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/translateLabels"
```

---

### 2FA Enroll - Push

**Method:** `POST`  
**Path:** `/2fa/enroll`  
**Description:** 2FA Enroll - Push

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll"
```

---

### 2FA Enroll Auth - Push

**Method:** `POST`  
**Path:** `/2fa/enroll/auth`  
**Description:** 2FA Enroll Auth - Push

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth"
```

---

### 2FA Enroll - Text

**Method:** `POST`  
**Path:** `/2fa/enroll`  
**Description:** 2FA Enroll - Text

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `phone` (string) **Required** - Body parameter: phone

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll"
```

---

### 2FA Enroll Auth - Send Text

**Method:** `POST`  
**Path:** `/2fa/enroll/auth`  
**Description:** 2FA Enroll Auth - Send Text

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth"
```

---

### 2FA Enroll Auth - Confirm Text

**Method:** `POST`  
**Path:** `/2fa/enroll/auth`  
**Description:** 2FA Enroll Auth - Confirm Text

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `passcode` (string) **Required** - Body parameter: passcode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth"
```

---

### 2FA Enroll - Call

**Method:** `POST`  
**Path:** `/2fa/enroll`  
**Description:** 2FA Enroll - Call

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `phone` (string) **Required** - Body parameter: phone

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll"
```

---

### 2FA Enroll Auth - Call

**Method:** `POST`  
**Path:** `/2fa/enroll/auth`  
**Description:** 2FA Enroll Auth - Call

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth"
```

---

### Add User

**Method:** `POST`  
**Path:** `/addUser`  
**Description:** Add User

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `email` (string) **Required** - Body parameter: email
- `name` (string) **Required** - Body parameter: name
- `organizationName` (string) **Required** - Body parameter: organizationName
- `status` (string) **Required** - Body parameter: status
- `roles` (object) **Required** - Body parameter: roles
- `clientId` (number) **Required** - Body parameter: clientId
- `password` (string) **Required** - Body parameter: password

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUser"
```

---

### Bulk Add Users

**Method:** `POST`  
**Path:** `/addUsers`  
**Description:** Bulk Add Users

#### Parameters
**Body Parameters:**
- `users` (object) **Required** - Body parameter: users
- `userDefaultApplication` (string) **Required** - Body parameter: userDefaultApplication
- `userApplicationAccess` (object) **Required** - Body parameter: userApplicationAccess
- `userApplicationRoles` (object) **Required** - Body parameter: userApplicationRoles

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUsers"
```

---

### Request Password Reset

**Method:** `POST`  
**Path:** `/password-reset`  
**Description:** Request Password Reset

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `clientName` (string) **Required** - Body parameter: clientName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/password-reset"
```

---

### Reset Password/Register

**Method:** `POST`  
**Path:** `/update-password`  
**Description:** Reset Password/Register

#### Parameters
**Body Parameters:**
- `password` (string) **Required** - Body parameter: password
- `confirmPassword` (string) **Required** - Body parameter: confirmPassword
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/update-password"
```

---

### List Users

**Method:** `POST`  
**Path:** `/listUsers`  
**Description:** List Users

#### Parameters
**Body Parameters:**
- `clientId` (number) **Required** - Body parameter: clientId
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUsers"
```

---

### Update User

**Method:** `POST`  
**Path:** `/updateUser`  
**Description:** Update User

#### Parameters
**Body Parameters:**
- `userId` (number) **Required** - Body parameter: userId
- `clientId` (number) **Required** - Body parameter: clientId
- `userName` (string) **Required** - Body parameter: userName
- `name` (string) **Required** - Body parameter: name
- `organizationName` (string) **Required** - Body parameter: organizationName
- `status` (string) **Required** - Body parameter: status
- `email` (string) **Required** - Body parameter: email
- `roles` (object) **Required** - Body parameter: roles
- `password` (string) **Required** - Body parameter: password

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateUser"
```

---

### Validate Code

**Method:** `POST`  
**Path:** `/validate-code`  
**Description:** Validate Code

#### Parameters
**Body Parameters:**
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validate-code"
```

---

### Get assurance image

**Method:** `POST`  
**Path:** `/assurance/getImage`  
**Description:** Get assurance image

#### Parameters
**Body Parameters:**
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId
- `imageId` (string) **Required** - Body parameter: imageId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance/getImage"
```

---

### Get assurance images

**Method:** `POST`  
**Path:** `/assurance/getImages`  
**Description:** Get assurance images

#### Parameters
**Body Parameters:**
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance/getImages"
```

---

### Username Request

**Method:** `POST`  
**Path:** `/username-request`  
**Description:** Username Request

#### Parameters
**Body Parameters:**
- `email` (string) **Required** - Body parameter: email

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/username-request"
```

---

### Check Availability

**Method:** `POST`  
**Path:** `/checkAvailability`  
**Description:** Check Availability

#### Parameters
**Body Parameters:**
- `usernames` (object) **Required** - Body parameter: usernames
- `externalUserIdentifiers` (object) **Required** - Body parameter: externalUserIdentifiers

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/checkAvailability"
```

---

### Search Users

**Method:** `POST`  
**Path:** `/searchusers`  
**Description:** Search Users

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchusers"
```

---

### Search Users (with all options)

**Method:** `POST`  
**Path:** `/searchusers`  
**Description:** Search Users (with all options)

#### Parameters
**Body Parameters:**
- `limit` (number) **Required** - Body parameter: limit
- `start` (number) **Required** - Body parameter: start
- `email` (string) **Required** - Body parameter: email
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `status` (string) **Required** - Body parameter: status
- `userName` (string) **Required** - Body parameter: userName
- `clientId` (number) **Required** - Body parameter: clientId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchusers"
```

---

### Resend Registration

**Method:** `POST`  
**Path:** `/user/user_id/resendRegistration`  
**Description:** Resend Registration

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
  "https://api-uk.kurtosys.app/user/user_id/resendRegistration"
```

---

### Delete 2FA Method

**Method:** `POST`  
**Path:** `/2fa/deleteMethod`  
**Description:** Delete 2FA Method

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/deleteMethod"
```

---

### Upsert User Configuration

**Method:** `POST`  
**Path:** `/upsertUserConfiguration`  
**Description:** Upsert User Configuration

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
  "https://api-uk.kurtosys.app/upsertUserConfiguration"
```

---

### Upsert User Configuration - document_view_config

**Method:** `POST`  
**Path:** `/upsertUserConfiguration`  
**Description:** Upsert User Configuration - document_view_config

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
  "https://api-uk.kurtosys.app/upsertUserConfiguration"
```

---

### Retrieve User Configuration

**Method:** `POST`  
**Path:** `/retrieveUserConfiguration`  
**Description:** Retrieve User Configuration

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
  "https://api-uk.kurtosys.app/retrieveUserConfiguration"
```

---

### Retrieve User Configuration - document_view_config

**Method:** `POST`  
**Path:** `/retrieveUserConfiguration`  
**Description:** Retrieve User Configuration - document_view_config

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
  "https://api-uk.kurtosys.app/retrieveUserConfiguration"
```

---

### Delete User Configuration

**Method:** `POST`  
**Path:** `/deleteUserConfiguration`  
**Description:** Delete User Configuration

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
  "https://api-uk.kurtosys.app/deleteUserConfiguration"
```

---

### Delete User Configuration - document_view_config

**Method:** `POST`  
**Path:** `/deleteUserConfiguration`  
**Description:** Delete User Configuration - document_view_config

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
  "https://api-uk.kurtosys.app/deleteUserConfiguration"
```

---

### Upsert Validation Schema

**Method:** `POST`  
**Path:** `/upsertValidationSchema`  
**Description:** Upsert Validation Schema

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `entityType` (string) **Required** - Body parameter: entityType
- `linkedEntities` (object) **Required** - Body parameter: linkedEntities
- `rules` (object) **Required** - Body parameter: rules

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertValidationSchema"
```

---

### Generate single PDF

**Method:** `POST`  
**Path:** `/exportPdf`  
**Description:** Generate single PDF

#### Parameters
**Body Parameters:**
- `url` (string) **Required** - Body parameter: url
- `printSettings` (object) **Required** - Body parameter: printSettings

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportPdf"
```

---

### Upsert Workflow Step

**Method:** `POST`  
**Path:** `/upsertWorkflowStep`  
**Description:** Upsert Workflow Step

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `type` (string) **Required** - Body parameter: type
- `workflowType` (string) **Required** - Body parameter: workflowType
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `approvalGroups` (object) **Required** - Body parameter: approvalGroups

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowStep"
```

---

### List Workflow Steps

**Method:** `POST`  
**Path:** `/listWorkflowSteps`  
**Description:** List Workflow Steps

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
  "https://api-uk.kurtosys.app/listWorkflowSteps"
```

---

### Upsert Workflow

**Method:** `POST`  
**Path:** `/upsertWorkflow`  
**Description:** Upsert Workflow

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `workflowType` (string) **Required** - Body parameter: workflowType
- `allowedInputs` (object) **Required** - Body parameter: allowedInputs
- `workflowInputs` (object) **Required** - Body parameter: workflowInputs
- `distributionConfiguration` (object) **Required** - Body parameter: distributionConfiguration
- `workflowSteps` (object) **Required** - Body parameter: workflowSteps
- `workflowOwnerApprovalGroups` (object) **Required** - Body parameter: workflowOwnerApprovalGroups
- `pageTemplate` (string) **Required** - Body parameter: pageTemplate
- `environmentName` (string) **Required** - Body parameter: environmentName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflow"
```

---

### List Workflows

**Method:** `POST`  
**Path:** `/listWorkflows`  
**Description:** List Workflows

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
  "https://api-uk.kurtosys.app/listWorkflows"
```

---

### List Workflow Inputs

**Method:** `POST`  
**Path:** `/listWorkflowInputs`  
**Description:** List Workflow Inputs

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
  "https://api-uk.kurtosys.app/listWorkflowInputs"
```

---

### Initiate Workflow Run

**Method:** `POST`  
**Path:** `/initiateWorkflowRun`  
**Description:** Initiate Workflow Run

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `targetDate` (string) **Required** - Body parameter: targetDate
- `distributionTargetDate` (string) **Required** - Body parameter: distributionTargetDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/initiateWorkflowRun"
```

---

### List Workflow Runs

**Method:** `POST`  
**Path:** `/listWorkflowRuns`  
**Description:** List Workflow Runs

#### Parameters
**Body Parameters:**
- `active` (boolean) **Required** - Body parameter: active

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowRuns"
```

---

### List Available Workflow Runs

**Method:** `POST`  
**Path:** `/listAvailableWorkflowRuns`  
**Description:** List Available Workflow Runs

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
  "https://api-uk.kurtosys.app/listAvailableWorkflowRuns"
```

---

### Finish Workflow Run

**Method:** `POST`  
**Path:** `/finishWorkflowRun`  
**Description:** Finish Workflow Run

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/finishWorkflowRun"
```

---

### Get Workflow Run

**Method:** `POST`  
**Path:** `/getWorkflowRun`  
**Description:** Get Workflow Run

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWorkflowRun"
```

---

### Update Workflow Run Item

**Method:** `POST`  
**Path:** `/updateWorkflowRunItem`  
**Description:** Update Workflow Run Item

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `runItems` (object) **Required** - Body parameter: runItems

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateWorkflowRunItem"
```

---

### Replace Workflow Run Item Template

**Method:** `POST`  
**Path:** `/replaceWorkflowRunItemTemplate`  
**Description:** Replace Workflow Run Item Template

#### Parameters
**Body Parameters:**
- `workflowRunItemId` (number) **Required** - Body parameter: workflowRunItemId
- `stepCode` (string) **Required** - Body parameter: stepCode
- `file` (object) **Required** - Body parameter: file

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceWorkflowRunItemTemplate"
```

---

### List Workflow Run Exceptions

**Method:** `POST`  
**Path:** `/listWorkflowRunExceptions`  
**Description:** List Workflow Run Exceptions

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowRunExceptions"
```

---

### Create Workflow Run Exception

**Method:** `POST`  
**Path:** `/createWorkflowRunException`  
**Description:** Create Workflow Run Exception

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `workflowItemIds` (object) **Required** - Body parameter: workflowItemIds
- `comment` (string) **Required** - Body parameter: comment
- `recipients` (object) **Required** - Body parameter: recipients
- `workflowStepCode` (string) **Required** - Body parameter: workflowStepCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createWorkflowRunException"
```

---

### Export PDF - Type 4

**Method:** `POST`  
**Path:** `/exportPdf`  
**Description:** Export PDF - Type 4

#### Parameters
**Body Parameters:**
- `url` (string) **Required** - Body parameter: url
- `printSettings` (object) **Required** - Body parameter: printSettings
- `config` (object) **Required** - Body parameter: config

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportPdf"
```

---

### Create Workflow Run Exception (with attachments)

**Method:** `POST`  
**Path:** `/createWorkflowRunException`  
**Description:** Create Workflow Run Exception (with attachments)

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createWorkflowRunException"
```

---

### Restart Workflow Run Exceptions

**Method:** `POST`  
**Path:** `/restartWorkflowRunExceptions`  
**Description:** Restart Workflow Run Exceptions

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `workflowItemIds` (object) **Required** - Body parameter: workflowItemIds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restartWorkflowRunExceptions"
```

---

### Remove Workflow Items From Run

**Method:** `POST`  
**Path:** `/removeWorkflowItemsFromRun`  
**Description:** Remove Workflow Items From Run

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `workflowItemIds` (object) **Required** - Body parameter: workflowItemIds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeWorkflowItemsFromRun"
```

---

### Download Workflow Exception Asset

**Method:** `POST`  
**Path:** `/downloadWorkflowExceptionAsset`  
**Description:** Download Workflow Exception Asset

#### Parameters
**Body Parameters:**
- `workflowRunExceptionAssetId` (number) **Required** - Body parameter: workflowRunExceptionAssetId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadWorkflowExceptionAsset"
```

---

### Trigger Distribution

**Method:** `POST`  
**Path:** `/triggerDistribution`  
**Description:** Trigger Distribution

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId
- `distributionType` (string) **Required** - Body parameter: distributionType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/triggerDistribution"
```

---

### List Users

**Method:** `POST`  
**Path:** `/listUsers`  
**Description:** List Users

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUsers"
```

---

### Send Notifications

**Method:** `POST`  
**Path:** `/sendNotifications`  
**Description:** Send Notifications

#### Parameters
**Body Parameters:**
- `workflowRunId` (number) **Required** - Body parameter: workflowRunId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendNotifications"
```

---

### Delete Workflow Exception Reason

**Method:** `POST`  
**Path:** `/deleteWorkflowExceptionReason`  
**Description:** Delete Workflow Exception Reason

#### Parameters
**Body Parameters:**
- `label` (string) **Required** - Body parameter: label

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteWorkflowExceptionReason"
```

---

### Upsert Workflow Exception Reason

**Method:** `POST`  
**Path:** `/upsertWorkflowExceptionReason`  
**Description:** Upsert Workflow Exception Reason

#### Parameters
**Body Parameters:**
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowExceptionReason"
```

---

### List Workflow Exception Reasons

**Method:** `POST`  
**Path:** `/listWorkflowExceptionReasons`  
**Description:** List Workflow Exception Reasons

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
  "https://api-uk.kurtosys.app/listWorkflowExceptionReasons"
```

---

### Retrieve workflow exception detail

**Method:** `POST`  
**Path:** `/retrieveWorkflowExceptionStatistics`  
**Description:** Retrieve workflow exception detail

#### Parameters
**Body Parameters:**
- `period` (string) **Required** - Body parameter: period
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate
- `action` (string) **Required** - Body parameter: action

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

### Retrieve workflow accuracy detail

**Method:** `POST`  
**Path:** `/retrieveWorkflowAccuracyStatistics`  
**Description:** Retrieve workflow accuracy detail

#### Parameters
**Body Parameters:**
- `period` (string) **Required** - Body parameter: period
- `startDate` (string) **Required** - Body parameter: startDate
- `endDate` (string) **Required** - Body parameter: endDate
- `action` (string) **Required** - Body parameter: action

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

### Upsert Workflow Email Template

**Method:** `POST`  
**Path:** `/upsertWorkflowEmailTemplate`  
**Description:** Upsert Workflow Email Template

#### Parameters
**Body Parameters:**
- `workflowId` (number) **Required** - Body parameter: workflowId
- `emailType` (string) **Required** - Body parameter: emailType
- `subject` (string) **Required** - Body parameter: subject
- `content` (string) **Required** - Body parameter: content

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowEmailTemplate"
```

---

### Get Workflow Email Template

**Method:** `POST`  
**Path:** `/getWorkflowEmailTemplate`  
**Description:** Get Workflow Email Template

#### Parameters
**Body Parameters:**
- `workflowId` (number) **Required** - Body parameter: workflowId
- `emailType` (string) **Required** - Body parameter: emailType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWorkflowEmailTemplate"
```

---

### Generate single XLSX

**Method:** `POST`  
**Path:** `/exportXlsx`  
**Description:** Generate single XLSX

#### Parameters
**Body Parameters:**
- `globalStyles` (object) **Required** - Body parameter: globalStyles
- `htmlStyles` (object) **Required** - Body parameter: htmlStyles
- `worksheets` (object) **Required** - Body parameter: worksheets

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportXlsx"
```

---

### Distribution List - List

**Method:** `POST`  
**Path:** `/distributionlist/list`  
**Description:** Distribution List - List

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist/list"
```

---

### Distribution List - Get

**Method:** `GET`  
**Path:** `/distributionlist/1`  
**Description:** Distribution List - Get

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
  "https://api-uk.kurtosys.app/distributionlist/1"
```

---

### Distribution List - Upsert

**Method:** `POST`  
**Path:** `/distributionlist`  
**Description:** Distribution List - Upsert

#### Parameters
**Body Parameters:**
- `distributionListId` (number) **Required** - Body parameter: distributionListId
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `entityType` (string) **Required** - Body parameter: entityType
- `affiliated` (boolean) **Required** - Body parameter: affiliated
- `documentKeyProtected` (boolean) **Required** - Body parameter: documentKeyProtected
- `documentKeyType` (string) **Required** - Body parameter: documentKeyType
- `documentKey` (string) **Required** - Body parameter: documentKey
- `types` (object) **Required** - Body parameter: types
- `entities` (object) **Required** - Body parameter: entities
- `recipients` (object) **Required** - Body parameter: recipients

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist"
```

---

### Distribution List - Delete

**Method:** `DELETE`  
**Path:** `/distributionlist/1`  
**Description:** Distribution List - Delete

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
  "https://api-uk.kurtosys.app/distributionlist/1"
```

---

### Distribution List - Workflow Count

**Method:** `GET`  
**Path:** `/distributionlist/1/workflows/count`  
**Description:** Distribution List - Workflow Count

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
  "https://api-uk.kurtosys.app/distributionlist/1/workflows/count"
```

---

### Email Workflow - List

**Method:** `POST`  
**Path:** `/email/list`  
**Description:** Email Workflow - List

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/list"
```

---

### Email Workflow - Get

**Method:** `GET`  
**Path:** `/email/1`  
**Description:** Email Workflow - Get

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
  "https://api-uk.kurtosys.app/email/1"
```

---

### Email Workflow - Upsert

**Method:** `POST`  
**Path:** `/email`  
**Description:** Email Workflow - Upsert

#### Parameters
**Body Parameters:**
- `workflowId` (number) **Required** - Body parameter: workflowId
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `workflowType` (string) **Required** - Body parameter: workflowType
- `segmentationLists` (object) **Required** - Body parameter: segmentationLists
- `workflowConfiguration` (object) **Required** - Body parameter: workflowConfiguration
- `template` (object) **Required** - Body parameter: template

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email"
```

---

### Email Workflow - Delete

**Method:** `DELETE`  
**Path:** `/email/1`  
**Description:** Email Workflow - Delete

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
  "https://api-uk.kurtosys.app/email/1"
```

---

### Email Workflow - Preview

**Method:** `GET`  
**Path:** `/email/1/preview`  
**Description:** Email Workflow - Preview

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
  "https://api-uk.kurtosys.app/email/1/preview"
```

---

### Email Workflow - Start

**Method:** `POST`  
**Path:** `/email/3/start`  
**Description:** Email Workflow - Start

#### Parameters
**Body Parameters:**
- `tags` (object) **Required** - Body parameter: tags

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/3/start"
```

---

### Email Workflow - Finish

**Method:** `POST`  
**Path:** `/email/3/finish`  
**Description:** Email Workflow - Finish

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
  "https://api-uk.kurtosys.app/email/3/finish"
```

---

### Email Workflow - Runs

**Method:** `POST`  
**Path:** `/email/runs`  
**Description:** Email Workflow - Runs

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
  "https://api-uk.kurtosys.app/email/runs"
```

---

### Email Workflow - Run Items - List

**Method:** `POST`  
**Path:** `/email/run/8/list`  
**Description:** Email Workflow - Run Items - List

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
  "https://api-uk.kurtosys.app/email/run/8/list"
```

---

### Email Workflow - Run Items - Get

**Method:** `GET`  
**Path:** `/email/runitems/123`  
**Description:** Email Workflow - Run Items - Get

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
  "https://api-uk.kurtosys.app/email/runitems/123"
```

---

### Email Workflow - Run Items - Update

**Method:** `POST`  
**Path:** `/email/runitems/123`  
**Description:** Email Workflow - Run Items - Update

#### Parameters
**Body Parameters:**
- `subject` (string) **Required** - Body parameter: subject
- `template` (string) **Required** - Body parameter: template
- `templateJSON` (object) **Required** - Body parameter: templateJSON

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/runitems/123"
```

---

### Email Workflow - Run Items - Delete

**Method:** `POST`  
**Path:** `/email/run/8/delete`  
**Description:** Email Workflow - Run Items - Delete

#### Parameters
**Body Parameters:**
- `workflowItemIds` (object) **Required** - Body parameter: workflowItemIds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/run/8/delete"
```

---

### List Cultures

**Method:** `POST`  
**Path:** `/listCultures`  
**Description:** List Cultures

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listCultures"
```

---

### Upsert Culture

**Method:** `POST`  
**Path:** `/upsertCulture`  
**Description:** Upsert Culture

#### Parameters
**Body Parameters:**
- `culture` (string) **Required** - Body parameter: culture
- `isDefault` (boolean) **Required** - Body parameter: isDefault

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertCulture"
```

---

### Get a site

**Method:** `POST`  
**Path:** `/getWordpressSite`  
**Description:** Get a site

#### Parameters
**Body Parameters:**
- `wordpressSiteId` (number) **Required** - Body parameter: wordpressSiteId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressSite"
```

---

### Upsert Site

**Method:** `POST`  
**Path:** `/upsertWordpressSite`  
**Description:** Upsert Site

#### Parameters
**Body Parameters:**
- `siteName` (string) **Required** - Body parameter: siteName
- `description` (string) **Required** - Body parameter: description

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWordpressSite"
```

---

### Get site list

**Method:** `POST`  
**Path:** `/getWordpressSiteList`  
**Description:** Get site list

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressSiteList"
```

---

### Get instance list

**Method:** `POST`  
**Path:** `/getWordpressInstanceList`  
**Description:** Get instance list

#### Parameters
**Body Parameters:**
- `wordpressSiteId` (number) **Required** - Body parameter: wordpressSiteId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressInstanceList"
```

---

### Get instance

**Method:** `POST`  
**Path:** `/getWordpressInstance`  
**Description:** Get instance

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
  "https://api-uk.kurtosys.app/getWordpressInstance"
```

---

### Get Wordpress Instance Cluster Health

**Method:** `POST`  
**Path:** `/getWordpressInstanceClusterHealth`  
**Description:** Get Wordpress Instance Cluster Health

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
  "https://api-uk.kurtosys.app/getWordpressInstanceClusterHealth"
```

---

### Complete DB backup

**Method:** `POST`  
**Path:** `/completeWordpressBackup`  
**Description:** Complete DB backup

#### Parameters
**Body Parameters:**
- `location` (string) **Required** - Body parameter: location
- `projectNumber` (string) **Required** - Body parameter: projectNumber
- `environment` (string) **Required** - Body parameter: environment
- `accessKey` (string) **Required** - Body parameter: accessKey

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/completeWordpressBackup"
```

---

### List automated DB backups

**Method:** `POST`  
**Path:** `/listWordpressBackups`  
**Description:** List automated DB backups

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
  "https://api-uk.kurtosys.app/listWordpressBackups"
```

---

### Get a backup

**Method:** `POST`  
**Path:** `/getWordpressBackup`  
**Description:** Get a backup

#### Parameters
**Body Parameters:**
- `wordpressBackupId` (number) **Required** - Body parameter: wordpressBackupId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressBackup"
```

---

### Restore DB backup

**Method:** `POST`  
**Path:** `/restoreWordpressBackup`  
**Description:** Restore DB backup

#### Parameters
**Body Parameters:**
- `wordpressBackupId` (number) **Required** - Body parameter: wordpressBackupId
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreWordpressBackup"
```

---

### Get Instance IP Restriction Counts

**Method:** `POST`  
**Path:** `/getInstanceIPRestrictionCounts`  
**Description:** Get Instance IP Restriction Counts

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
  "https://api-uk.kurtosys.app/getInstanceIPRestrictionCounts"
```

---

### Get Instance IP Restrictions

**Method:** `POST`  
**Path:** `/getIPRestrictions`  
**Description:** Get Instance IP Restrictions

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
  "https://api-uk.kurtosys.app/getIPRestrictions"
```

---

### Upsert IP Restrictions

**Method:** `POST`  
**Path:** `/upsertIPRestrictions`  
**Description:** Upsert IP Restrictions

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `ipAddresses` (object) **Required** - Body parameter: ipAddresses

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertIPRestrictions"
```

---

### Update IP Restrictions Status

**Method:** `POST`  
**Path:** `/updateIPRestrictionsStatus`  
**Description:** Update IP Restrictions Status

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `enabled` (boolean) **Required** - Body parameter: enabled

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateIPRestrictionsStatus"
```

---

### Upsert Instance CSR

**Method:** `POST`  
**Path:** `/upsertInstanceCSR`  
**Description:** Upsert Instance CSR

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `primaryDomain` (string) **Required** - Body parameter: primaryDomain
- `additionalDomains` (string) **Required** - Body parameter: additionalDomains
- `country` (string) **Required** - Body parameter: country
- `state` (string) **Required** - Body parameter: state
- `city` (string) **Required** - Body parameter: city
- `organization` (string) **Required** - Body parameter: organization
- `department` (string) **Required** - Body parameter: department

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertInstanceCSR"
```

---

### Upsert Certificate

**Method:** `POST`  
**Path:** `/upsertCertificate`  
**Description:** Upsert Certificate

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `certificateFile` (string) **Required** - Body parameter: certificateFile

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertCertificate"
```

---

### Update site url

**Method:** `POST`  
**Path:** `/updateUrl`  
**Description:** Update site url

#### Parameters
**Body Parameters:**
- `url` (string) **Required** - Body parameter: url
- `swarmId` (string) **Required** - Body parameter: swarmId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateUrl"
```

---

### Get Audit Logs

**Method:** `POST`  
**Path:** `/getAuditLogs`  
**Description:** Get Audit Logs

#### Parameters
**Body Parameters:**
- `siteId` (number) **Required** - Body parameter: siteId
- `searchTerm` (string) **Required** - Body parameter: searchTerm
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAuditLogs"
```

---

### Get WP Logs

**Method:** `POST`  
**Path:** `/getAuditLogs`  
**Description:** Get WP Logs

#### Parameters
**Body Parameters:**
- `siteId` (number) **Required** - Body parameter: siteId
- `searchTerm` (string) **Required** - Body parameter: searchTerm
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAuditLogs"
```

---

### Request Validation

**Method:** `POST`  
**Path:** `/requestValidation`  
**Description:** Request Validation

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
  "https://api-uk.kurtosys.app/requestValidation"
```

---

### Insert Wordpress Proxy

**Method:** `POST`  
**Path:** `/insertProxy`  
**Description:** Insert Wordpress Proxy

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `fromUri` (string) **Required** - Body parameter: fromUri
- `toUrl` (string) **Required** - Body parameter: toUrl
- `proxyType` (string) **Required** - Body parameter: proxyType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertProxy"
```

---

### Get Wordpress Proxy

**Method:** `POST`  
**Path:** `/getProxy`  
**Description:** Get Wordpress Proxy

#### Parameters
**Body Parameters:**
- `wordpressProxyId` (number) **Required** - Body parameter: wordpressProxyId
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getProxy"
```

---

### Get Wordpress Proxy List

**Method:** `POST`  
**Path:** `/getProxies`  
**Description:** Get Wordpress Proxy List

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getProxies"
```

---

### Delete Wordpress Proxy

**Method:** `POST`  
**Path:** `/deleteProxy`  
**Description:** Delete Wordpress Proxy

#### Parameters
**Body Parameters:**
- `wordpressProxyId` (number) **Required** - Body parameter: wordpressProxyId
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteProxy"
```

---

### Generate Pages

**Method:** `POST`  
**Path:** `/generatePages`  
**Description:** Generate Pages

#### Parameters
**Body Parameters:**
- `requestType` (string) **Required** - Body parameter: requestType
- `schemaName` (string) **Required** - Body parameter: schemaName
- `configId` (number) **Required** - Body parameter: configId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/generatePages"
```

---

### Share Posts

**Method:** `POST`  
**Path:** `/sharePosts`  
**Description:** Share Posts

#### Parameters
**Body Parameters:**
- `wordpressInstanceId` (number) **Required** - Body parameter: wordpressInstanceId
- `siteId` (number) **Required** - Body parameter: siteId
- `postId` (number) **Required** - Body parameter: postId
- `toSiteIds` (object) **Required** - Body parameter: toSiteIds
- `action` (string) **Required** - Body parameter: action

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sharePosts"
```

---

### Push CF Tokens

**Method:** `POST`  
**Path:** `/pushCFTokens`  
**Description:** Push CF Tokens

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/pushCFTokens"
```

---

### Retrieve OfficeTemplate Asset

**Method:** `GET`  
**Path:** `/retrieveOfficeTemplateAsset/:officeTemplateCode/images/:size/:slide`  
**Description:** Retrieve OfficeTemplate Asset

#### Parameters
**Path Parameters:**
- `officeTemplateCode` (string) **Required** - Path parameter: officeTemplateCode
- `size` (string) **Required** - Path parameter: size
- `slide` (string) **Required** - Path parameter: slide

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveOfficeTemplateAsset/:officeTemplateCode/images/:size/:slide"
```

---

### Download Single Office Template

**Method:** `POST`  
**Path:** `/downloadOfficeTemplate`  
**Description:** Download Single Office Template

#### Parameters
**Body Parameters:**
- `officeTemplateCode` (string) **Required** - Body parameter: officeTemplateCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadOfficeTemplate"
```

---

### Bulk Download Office Templates

**Method:** `POST`  
**Path:** `/bulkDownloadOfficeTemplates`  
**Description:** Bulk Download Office Templates

#### Parameters
**Body Parameters:**
- `officeTemplateCodes` (object) **Required** - Body parameter: officeTemplateCodes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkDownloadOfficeTemplates"
```

---

### Compress SFO File

**Method:** `POST`  
**Path:** `/compressFile`  
**Description:** Compress SFO File

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/compressFile"
```

---

### Retrieve Compressed SFO File

**Method:** `GET`  
**Path:** `/retrieveFile/asd/asd.pptx`  
**Description:** Retrieve Compressed SFO File

#### Parameters
**Query Parameters:**
- `token` (string) **Required** - Query parameter: token

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveFile/asd/asd.pptx"
```

---

### Get Scenario Backup

**Method:** `GET`  
**Path:** `/scenarioBackup/get/1`  
**Description:** Get Scenario Backup

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
  "https://api-uk.kurtosys.app/scenarioBackup/get/1"
```

---

### List Scenario Backup

**Method:** `POST`  
**Path:** `/scenarioBackup/list`  
**Description:** List Scenario Backup

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
  "https://api-uk.kurtosys.app/scenarioBackup/list"
```

---

### Get Portfolio Backup

**Method:** `GET`  
**Path:** `/portfolioBackup/get/1`  
**Description:** Get Portfolio Backup

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
  "https://api-uk.kurtosys.app/portfolioBackup/get/1"
```

---

### List Portfolio Backup

**Method:** `POST`  
**Path:** `/portfolioBackup/list`  
**Description:** List Portfolio Backup

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioBackup/list"
```

---

### Get Portfolio Entity Backup

**Method:** `GET`  
**Path:** `/portfolioEntityBackup/get/1`  
**Description:** Get Portfolio Entity Backup

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
  "https://api-uk.kurtosys.app/portfolioEntityBackup/get/1"
```

---

### List Portfolio Entity Backup

**Method:** `POST`  
**Path:** `/portfolioEntityBackup/list`  
**Description:** List Portfolio Entity Backup

#### Parameters
**Body Parameters:**
- `portfolioEntityId` (number) **Required** - Body parameter: portfolioEntityId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntityBackup/list"
```

---

### Get Scenario Manager Backup

**Method:** `GET`  
**Path:** `/scenarioManagerBackup/get/1`  
**Description:** Get Scenario Manager Backup

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
  "https://api-uk.kurtosys.app/scenarioManagerBackup/get/1"
```

---

### List Scenario Manager Backup

**Method:** `POST`  
**Path:** `/scenarioManagerBackup/list`  
**Description:** List Scenario Manager Backup

#### Parameters
**Body Parameters:**
- `scenarioManagerId` (number) **Required** - Body parameter: scenarioManagerId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManagerBackup/list"
```

---

### Get Regime Type

**Method:** `GET`  
**Path:** `/regimeType/get/1`  
**Description:** Get Regime Type

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
  "https://api-uk.kurtosys.app/regimeType/get/1"
```

---

### Delete Regime Type

**Method:** `DELETE`  
**Path:** `/regimeType/delete/2`  
**Description:** Delete Regime Type

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
  "https://api-uk.kurtosys.app/regimeType/delete/2"
```

---

### List Regime Types

**Method:** `POST`  
**Path:** `/regimeType/list`  
**Description:** List Regime Types

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/list"
```

---

### List Regime Types (query)

**Method:** `POST`  
**Path:** `/regimeType/list`  
**Description:** List Regime Types (query)

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/list"
```

---

### Upsert Regime Types (Insert)

**Method:** `POST`  
**Path:** `/regimeType/upsert`  
**Description:** Upsert Regime Types (Insert)

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/upsert"
```

---

### Upsert Regime Types (Update)

**Method:** `POST`  
**Path:** `/regimeType/upsert`  
**Description:** Upsert Regime Types (Update)

#### Parameters
**Body Parameters:**
- `regimeTypeId` (number) **Required** - Body parameter: regimeTypeId
- `name` (string) **Required** - Body parameter: name

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/upsert"
```

---

### Get Scenario

**Method:** `GET`  
**Path:** `/scenario/get/2`  
**Description:** Get Scenario

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
  "https://api-uk.kurtosys.app/scenario/get/2"
```

---

### Get Scenario (entity include)

**Method:** `GET`  
**Path:** `/scenario/get/4`  
**Description:** Get Scenario (entity include)

#### Parameters
**Query Parameters:**
- `entityInclude` (string) **Required** - Query parameter: entityInclude

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/get/4"
```

---

### Delete Scenario

**Method:** `DELETE`  
**Path:** `/scenario/delete/1`  
**Description:** Delete Scenario

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
  "https://api-uk.kurtosys.app/scenario/delete/1"
```

---

### List Scenario

**Method:** `POST`  
**Path:** `/scenario/list`  
**Description:** List Scenario

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/list"
```

---

### List Scenario (query)

**Method:** `POST`  
**Path:** `/scenario/list`  
**Description:** List Scenario (query)

#### Parameters
**Body Parameters:**
- `name` (object) **Required** - Body parameter: name

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/list"
```

---

### Upsert Scenario (Insert)

**Method:** `POST`  
**Path:** `/scenario/upsert`  
**Description:** Upsert Scenario (Insert)

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `mode` (string) **Required** - Body parameter: mode
- `sharing` (string) **Required** - Body parameter: sharing
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/upsert"
```

---

### Upsert Scenario (Update)

**Method:** `POST`  
**Path:** `/scenario/upsert`  
**Description:** Upsert Scenario (Update)

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `name` (string) **Required** - Body parameter: name
- `mode` (string) **Required** - Body parameter: mode
- `sharing` (string) **Required** - Body parameter: sharing
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/upsert"
```

---

### Clone Scenario

**Method:** `POST`  
**Path:** `/scenario/clone`  
**Description:** Clone Scenario

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
  "https://api-uk.kurtosys.app/scenario/clone"
```

---

### Get Benchmark Scenario

**Method:** `POST`  
**Path:** `/scenario/getBenchmark`  
**Description:** Get Benchmark Scenario

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode
- `statisticsOptions` (object) **Required** - Body parameter: statisticsOptions

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getBenchmark"
```

---

### Get Filters

**Method:** `POST`  
**Path:** `/scenario/getFilters`  
**Description:** Get Filters

#### Parameters
**Body Parameters:**
- `fields` (object) **Required** - Body parameter: fields

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getFilters"
```

---

### Get Portfolio

**Method:** `GET`  
**Path:** `/portfolio/get/5`  
**Description:** Get Portfolio

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
  "https://api-uk.kurtosys.app/portfolio/get/5"
```

---

### Get Portfolio (entity include)

**Method:** `GET`  
**Path:** `/portfolio/get/5`  
**Description:** Get Portfolio (entity include)

#### Parameters
**Query Parameters:**
- `entityInclude` (string) **Required** - Query parameter: entityInclude

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/get/5"
```

---

### Delete Portfolio

**Method:** `DELETE`  
**Path:** `/portfolio/delete/1`  
**Description:** Delete Portfolio

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
  "https://api-uk.kurtosys.app/portfolio/delete/1"
```

---

### List Portfolio

**Method:** `POST`  
**Path:** `/portfolio/list`  
**Description:** List Portfolio

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
  "https://api-uk.kurtosys.app/portfolio/list"
```

---

### List Portfolio (query)

**Method:** `POST`  
**Path:** `/portfolio/list`  
**Description:** List Portfolio (query)

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
  "https://api-uk.kurtosys.app/portfolio/list"
```

---

### Upsert Portfolio (Insert)

**Method:** `POST`  
**Path:** `/portfolio/upsert`  
**Description:** Upsert Portfolio (Insert)

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `name` (string) **Required** - Body parameter: name
- `color` (string) **Required** - Body parameter: color
- `type` (string) **Required** - Body parameter: type
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/upsert"
```

---

### Upsert Portfolio (Update)

**Method:** `POST`  
**Path:** `/portfolio/upsert`  
**Description:** Upsert Portfolio (Update)

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `name` (number) **Required** - Body parameter: name
- `color` (string) **Required** - Body parameter: color
- `type` (string) **Required** - Body parameter: type
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/upsert"
```

---

### Clone Portfolio

**Method:** `POST`  
**Path:** `/portfolio/clone`  
**Description:** Clone Portfolio

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/clone"
```

---

### Get Common Dates

**Method:** `POST`  
**Path:** `/portfolio/getCommonDates`  
**Description:** Get Common Dates

#### Parameters
**Body Parameters:**
- `id` (number) **Required** - Body parameter: id
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCommonDates"
```

---

### Get Correlation Matrix

**Method:** `POST`  
**Path:** `/portfolio/getCorrelationMatrix`  
**Description:** Get Correlation Matrix

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode
- `timePeriod` (string) **Required** - Body parameter: timePeriod

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCorrelationMatrix"
```

---

### Get Correlation Matrix (All Inputs)

**Method:** `POST`  
**Path:** `/portfolio/getCorrelationMatrix`  
**Description:** Get Correlation Matrix (All Inputs)

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode
- `periodType` (string) **Required** - Body parameter: periodType
- `category` (object) **Required** - Body parameter: category
- `probability` (number) **Required** - Body parameter: probability
- `threshold` (number) **Required** - Body parameter: threshold
- `timePeriod` (string) **Required** - Body parameter: timePeriod
- `years` (number) **Required** - Body parameter: years
- `calculateCompositeFundStatistic` (boolean) **Required** - Body parameter: calculateCompositeFundStatistic

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCorrelationMatrix"
```

---

### Get Efficient Frontier

**Method:** `POST`  
**Path:** `/portfolio/getEfficientFrontier`  
**Description:** Get Efficient Frontier

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode
- `riskFreeRateOptions` (object) **Required** - Body parameter: riskFreeRateOptions
- `correlationMatrix` (object) **Required** - Body parameter: correlationMatrix
- `commonStartDate` (string) **Required** - Body parameter: commonStartDate
- `commonEndDate` (string) **Required** - Body parameter: commonEndDate

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getEfficientFrontier"
```

---

### Get Benchmark

**Method:** `POST`  
**Path:** `/portfolio/getBenchmark`  
**Description:** Get Benchmark

#### Parameters
**Body Parameters:**
- `clientCode` (string) **Required** - Body parameter: clientCode
- `entityType` (string) **Required** - Body parameter: entityType
- `timeseriesCode` (string) **Required** - Body parameter: timeseriesCode

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getBenchmark"
```

---

### Get Portfolio Entity

**Method:** `GET`  
**Path:** `/portfolioEntity/get/5`  
**Description:** Get Portfolio Entity

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
  "https://api-uk.kurtosys.app/portfolioEntity/get/5"
```

---

### Get Portfolio Entity (entity include)

**Method:** `GET`  
**Path:** `/portfolioEntity/get/5`  
**Description:** Get Portfolio Entity (entity include)

#### Parameters
**Query Parameters:**
- `entityInclude` (string) **Required** - Query parameter: entityInclude

**Body Parameters:**
- `data` (string) **Required** - Request body data

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/get/5"
```

---

### Delete Portfolio Entity

**Method:** `DELETE`  
**Path:** `/portfolioEntity/delete/3`  
**Description:** Delete Portfolio Entity

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
  "https://api-uk.kurtosys.app/portfolioEntity/delete/3"
```

---

### List Portfolio Entity

**Method:** `POST`  
**Path:** `/portfolioEntity/list`  
**Description:** List Portfolio Entity

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/list"
```

---

### List Portfolio Entity (query)

**Method:** `POST`  
**Path:** `/portfolioEntity/list`  
**Description:** List Portfolio Entity (query)

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `weight` (object) **Required** - Body parameter: weight

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/list"
```

---

### Upsert Portfolio Entity (Insert)

**Method:** `POST`  
**Path:** `/portfolioEntity/upsert`  
**Description:** Upsert Portfolio Entity (Insert)

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `entityId` (number) **Required** - Body parameter: entityId
- `color` (string) **Required** - Body parameter: color
- `weight` (number) **Required** - Body parameter: weight
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/upsert"
```

---

### Upsert Portfolio Entity (Update)

**Method:** `POST`  
**Path:** `/portfolioEntity/upsert`  
**Description:** Upsert Portfolio Entity (Update)

#### Parameters
**Body Parameters:**
- `portfolioEntityId` (number) **Required** - Body parameter: portfolioEntityId
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `entityId` (number) **Required** - Body parameter: entityId
- `color` (string) **Required** - Body parameter: color
- `weight` (number) **Required** - Body parameter: weight
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/upsert"
```

---

### Get Scenario Manager

**Method:** `GET`  
**Path:** `/scenarioManager/get/5`  
**Description:** Get Scenario Manager

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
  "https://api-uk.kurtosys.app/scenarioManager/get/5"
```

---

### Delete Scenario Manager

**Method:** `DELETE`  
**Path:** `/scenarioManager/delete/3`  
**Description:** Delete Scenario Manager

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
  "https://api-uk.kurtosys.app/scenarioManager/delete/3"
```

---

### List Scenario Manager

**Method:** `POST`  
**Path:** `/scenarioManager/list`  
**Description:** List Scenario Manager

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
  "https://api-uk.kurtosys.app/scenarioManager/list"
```

---

### Upsert Scenario Manager (Insert)

**Method:** `POST`  
**Path:** `/scenarioManager/upsert`  
**Description:** Upsert Scenario Manager (Insert)

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `fundManagerId` (number) **Required** - Body parameter: fundManagerId
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/upsert"
```

---

### Upsert Scenario Manager (Update)

**Method:** `POST`  
**Path:** `/scenarioManager/upsert`  
**Description:** Upsert Scenario Manager (Update)

#### Parameters
**Body Parameters:**
- `scenarioManagerId` (number) **Required** - Body parameter: scenarioManagerId
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `fundManagerId` (number) **Required** - Body parameter: fundManagerId
- `extended` (object) **Required** - Body parameter: extended

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/upsert"
```

---

### Get Regime Period

**Method:** `GET`  
**Path:** `/regimePeriod/get/1`  
**Description:** Get Regime Period

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
  "https://api-uk.kurtosys.app/regimePeriod/get/1"
```

---

### List Regime Periods

**Method:** `POST`  
**Path:** `/regimePeriod/list`  
**Description:** List Regime Periods

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/list"
```

---

### List Regime Periods (query)

**Method:** `POST`  
**Path:** `/regimePeriod/list`  
**Description:** List Regime Periods (query)

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/list"
```

---

### Upsert Regime Period (Insert)

**Method:** `POST`  
**Path:** `/regimePeriod/upsert`  
**Description:** Upsert Regime Period (Insert)

#### Parameters
**Body Parameters:**
- `regimeTypeId` (number) **Required** - Body parameter: regimeTypeId
- `date` (string) **Required** - Body parameter: date
- `value` (string) **Required** - Body parameter: value

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/upsert"
```

---

### Upsert Regime Period Collection

**Method:** `POST`  
**Path:** `/regimePeriod/upsertCollection`  
**Description:** Upsert Regime Period Collection

#### Parameters
**Body Parameters:**
- `regimePeriods` (object) **Required** - Body parameter: regimePeriods

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/upsertCollection"
```

---

### Get Conditional Market Analysis Backup

**Method:** `GET`  
**Path:** `/conditionalMarketAnalysisBackup/get/1`  
**Description:** Get Conditional Market Analysis Backup

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
  "https://api-uk.kurtosys.app/conditionalMarketAnalysisBackup/get/1"
```

---

### List Conditional Market Analysis Backup

**Method:** `POST`  
**Path:** `/conditionalMarketAnalysisBackup/list`  
**Description:** List Conditional Market Analysis Backup

#### Parameters
**Body Parameters:**
- `conditionalMarketAnalysisId` (number) **Required** - Body parameter: conditionalMarketAnalysisId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysisBackup/list"
```

---

### Get Conditional Market Analysis

**Method:** `GET`  
**Path:** `/conditionalMarketAnalysis/get/1`  
**Description:** Get Conditional Market Analysis

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
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/get/1"
```

---

### List Conditional Market Analysis

**Method:** `POST`  
**Path:** `/conditionalMarketAnalysis/list`  
**Description:** List Conditional Market Analysis

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
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/list"
```

---

### List Conditional Market Analysis (query)

**Method:** `POST`  
**Path:** `/conditionalMarketAnalysis/list`  
**Description:** List Conditional Market Analysis (query)

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `periodType` (object) **Required** - Body parameter: periodType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/list"
```

---

### Upsert Conditional Market Analysis (Insert)

**Method:** `POST`  
**Path:** `/conditionalMarketAnalysis/upsert`  
**Description:** Upsert Conditional Market Analysis (Insert)

#### Parameters
**Body Parameters:**
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `regimeTypeId` (number) **Required** - Body parameter: regimeTypeId
- `periodType` (string) **Required** - Body parameter: periodType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/upsert"
```

---

### Upsert Conditional Market Analysis (Update)

**Method:** `POST`  
**Path:** `/conditionalMarketAnalysis/upsert`  
**Description:** Upsert Conditional Market Analysis (Update)

#### Parameters
**Body Parameters:**
- `conditionalMarketAnalysisId` (number) **Required** - Body parameter: conditionalMarketAnalysisId
- `scenarioId` (number) **Required** - Body parameter: scenarioId
- `regimeTypeId` (number) **Required** - Body parameter: regimeTypeId
- `periodType` (string) **Required** - Body parameter: periodType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/upsert"
```

---

### Delete Conditional Market Analysis

**Method:** `DELETE`  
**Path:** `/portfolio/delete/1`  
**Description:** Delete Conditional Market Analysis

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
  "https://api-uk.kurtosys.app/portfolio/delete/1"
```

---

### Get Scenario Report Backup

**Method:** `GET`  
**Path:** `/scenarioReportBackup/get/1`  
**Description:** Get Scenario Report Backup

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
  "https://api-uk.kurtosys.app/scenarioReportBackup/get/1"
```

---

### List Scenario Report Backup

**Method:** `POST`  
**Path:** `/scenarioReportBackup/list`  
**Description:** List Scenario Report Backup

#### Parameters
**Body Parameters:**
- `scenarioReportId` (number) **Required** - Body parameter: scenarioReportId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReportBackup/list"
```

---

### Get Scenario Report

**Method:** `GET`  
**Path:** `/scenarioReport/get/2`  
**Description:** Get Scenario Report

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
  "https://api-uk.kurtosys.app/scenarioReport/get/2"
```

---

### Delete Scenario Report

**Method:** `DELETE`  
**Path:** `/scenarioReport/delete/1`  
**Description:** Delete Scenario Report

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
  "https://api-uk.kurtosys.app/scenarioReport/delete/1"
```

---

### List Scenario Report

**Method:** `POST`  
**Path:** `/scenarioReport/list`  
**Description:** List Scenario Report

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/list"
```

---

### List Scenario Report (query)

**Method:** `POST`  
**Path:** `/scenarioReport/list`  
**Description:** List Scenario Report (query)

#### Parameters
**Body Parameters:**
- `name` (object) **Required** - Body parameter: name

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/list"
```

---

### Upsert Scenario Report (Insert)

**Method:** `POST`  
**Path:** `/scenarioReport/upsert`  
**Description:** Upsert Scenario Report (Insert)

#### Parameters
**Body Parameters:**
- `name` (string) **Required** - Body parameter: name
- `mode` (string) **Required** - Body parameter: mode
- `sharing` (string) **Required** - Body parameter: sharing
- `extended` (object) **Required** - Body parameter: extended
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/upsert"
```

---

### Upsert Scenario Report (Update)

**Method:** `POST`  
**Path:** `/scenarioReport/upsert`  
**Description:** Upsert Scenario Report (Update)

#### Parameters
**Body Parameters:**
- `scenarioReportId` (number) **Required** - Body parameter: scenarioReportId
- `name` (string) **Required** - Body parameter: name
- `mode` (string) **Required** - Body parameter: mode
- `sharing` (string) **Required** - Body parameter: sharing
- `extended` (object) **Required** - Body parameter: extended
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/upsert"
```

---

### Execute External API

**Method:** `POST`  
**Path:** `/externalApi/execute`  
**Description:** Execute External API

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/externalApi/execute"
```

---

### Upsert External API Configuration

**Method:** `POST`  
**Path:** `/externalApi/upsertConfiguration`  
**Description:** Upsert External API Configuration

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `providerKey` (string) **Required** - Body parameter: providerKey
- `config` (object) **Required** - Body parameter: config

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/externalApi/upsertConfiguration"
```

---

### Upsert Contacts

**Method:** `POST`  
**Path:** `/upsertContacts`  
**Description:** Upsert Contacts

#### Parameters
**Body Parameters:**
- `0` (object) **Required** - Body parameter: 0
- `1` (object) **Required** - Body parameter: 1
- `2` (object) **Required** - Body parameter: 2
- `3` (object) **Required** - Body parameter: 3

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContacts"
```

---

### Validate Contacts Upsert

**Method:** `POST`  
**Path:** `/validateContactsUpsert`  
**Description:** Validate Contacts Upsert

#### Parameters
**Body Parameters:**
- `0` (object) **Required** - Body parameter: 0
- `1` (object) **Required** - Body parameter: 1
- `2` (object) **Required** - Body parameter: 2
- `3` (object) **Required** - Body parameter: 3

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validateContactsUpsert"
```

---

### Upsert Contact Group

**Method:** `POST`  
**Path:** `/upsertContactGroup`  
**Description:** Upsert Contact Group

#### Parameters
**Body Parameters:**
- `groupCode` (string) **Required** - Body parameter: groupCode
- `name` (string) **Required** - Body parameter: name

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContactGroup"
```

---

### Upsert Contact Group Relationships

**Method:** `POST`  
**Path:** `/upsertContactGroupRelationships`  
**Description:** Upsert Contact Group Relationships

#### Parameters
**Body Parameters:**
- `contactGroupCode` (string) **Required** - Body parameter: contactGroupCode
- `childContactIds` (object) **Required** - Body parameter: childContactIds
- `childContactGroupCodes` (object) **Required** - Body parameter: childContactGroupCodes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContactGroupRelationships"
```

---

### List Contact Groups

**Method:** `POST`  
**Path:** `/listContactGroups`  
**Description:** List Contact Groups

#### Parameters
**Body Parameters:**
- `search` (object) **Required** - Body parameter: search
- `includeChildContacts` (boolean) **Required** - Body parameter: includeChildContacts
- `includeChildGroups` (boolean) **Required** - Body parameter: includeChildGroups
- `start` (number) **Required** - Body parameter: start
- `limit` (number) **Required** - Body parameter: limit

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listContactGroups"
```

---

### Delete Contacts

**Method:** `POST`  
**Path:** `/deleteContacts`  
**Description:** Delete Contacts

#### Parameters
**Body Parameters:**
- `contacts` (object) **Required** - Body parameter: contacts

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteContacts"
```

---

### Delete Contact Groups

**Method:** `POST`  
**Path:** `/deleteContactGroups`  
**Description:** Delete Contact Groups

#### Parameters
**Body Parameters:**
- `0` (string) **Required** - Body parameter: 0
- `1` (string) **Required** - Body parameter: 1

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteContactGroups"
```

---

### Enqueue

**Method:** `POST`  
**Path:** `/enqueue`  
**Description:** Enqueue

#### Parameters
**Body Parameters:**
- `accessKey` (string) **Required** - Body parameter: accessKey
- `taskToken` (string) **Required** - Body parameter: taskToken
- `templateURL` (string) **Required** - Body parameter: templateURL
- `destinationS3Key` (string) **Required** - Body parameter: destinationS3Key
- `importXMLContent` (string) **Required** - Body parameter: importXMLContent

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/enqueue"
```

---

### Get

**Method:** `GET`  
**Path:** `/backup/get/7`  
**Description:** Get

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
  "https://api-uk.kurtosys.app/backup/get/7"
```

---

### List

**Method:** `POST`  
**Path:** `/backup/list`  
**Description:** List

#### Parameters
**Body Parameters:**
- `datasetId` (number) **Required** - Body parameter: datasetId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/backup/list"
```

---

### Get

**Method:** `GET`  
**Path:** `/dataadapters/sample_snowflake_adapter`  
**Description:** Get

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
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter"
```

---

### List

**Method:** `POST`  
**Path:** `/dataadapters/list`  
**Description:** List

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
  "https://api-uk.kurtosys.app/dataadapters/list"
```

---

### Upsert

**Method:** `POST`  
**Path:** `/dataadapters`  
**Description:** Upsert

#### Parameters
**Body Parameters:**
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `code` (string) **Required** - Body parameter: code
- `type` (string) **Required** - Body parameter: type
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters"
```

---

### Test

**Method:** `POST`  
**Path:** `/dataadapters/test`  
**Description:** Test

#### Parameters
**Body Parameters:**
- `codes` (object) **Required** - Body parameter: codes

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/test"
```

---

### Delete

**Method:** `DELETE`  
**Path:** `/dataadapters/sample_snowflake_adapter`  
**Description:** Delete

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
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter"
```

---

### List Views

**Method:** `GET`  
**Path:** `/dataadapters/sample_snowflake_adapter/views`  
**Description:** List Views

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
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/views"
```

---

### Get View

**Method:** `GET`  
**Path:** `/dataadapters/sample_snowflake_adapter/views/SNOWFLAKE_SAMPLE_DATA.INFORMATION_SCHEMA.STREAMLITS`  
**Description:** Get View

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
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/views/SNOWFLAKE_SAMPLE_DATA.INFORMATION_SCHEMA.STREAMLITS"
```

---

### Upsert

**Method:** `POST`  
**Path:** `/upsert`  
**Description:** Upsert

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `body` (string) **Required** - Body parameter: body
- `inputs` (object) **Required** - Body parameter: inputs

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsert"
```

---

### List

**Method:** `POST`  
**Path:** `/execute`  
**Description:** List

#### Parameters
**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute"
```

---

### Get

**Method:** `GET`  
**Path:** `/get/test`  
**Description:** Get

#### Parameters
**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/get/test"
```

---

### Delete

**Method:** `DELETE`  
**Path:** `/delete/3`  
**Description:** Delete

#### Parameters
**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**204:** Resource deleted successfully

#### Example Request
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/delete/3"
```

---

### Execute (Raw)

**Method:** `POST`  
**Path:** `/execute`  
**Description:** Execute (Raw)

#### Parameters
**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute"
```

---

### Execute (Code)

**Method:** `POST`  
**Path:** `/execute`  
**Description:** Execute (Code)

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `inputs` (object) **Required** - Body parameter: inputs

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute"
```

---

### Execute

**Method:** `GET`  
**Path:** `/execute/test`  
**Description:** Execute

#### Parameters
**Query Parameters:**
- `clientCode` (string) **Required** - Query parameter: clientCode

**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute/test"
```

---

### Schemas (Raw)

**Method:** `POST`  
**Path:** `/schemas`  
**Description:** Schemas (Raw)

#### Parameters
**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/schemas"
```

---

### Schemas (Code)

**Method:** `POST`  
**Path:** `/execute`  
**Description:** Schemas (Code)

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `inputs` (object) **Required** - Body parameter: inputs

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute"
```

---

### Schemas

**Method:** `GET`  
**Path:** `/schemas/test`  
**Description:** Schemas

#### Parameters
**Query Parameters:**
- `clientCode` (string) **Required** - Query parameter: clientCode

**Body Parameters:**
- `raw` (object) **Required** - Body parameter: raw

#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/schemas/test"
```

---

### Get

**Method:** `GET`  
**Path:** `/type/sfo_table`  
**Description:** Get

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/type/sfo_table"
```

---

### List

**Method:** `POST`  
**Path:** `/type/list`  
**Description:** List

#### Parameters
**Body Parameters:**
- `code` (object) **Required** - Body parameter: code
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/type/list"
```

---

### Get

**Method:** `GET`  
**Path:** `/reference/1`  
**Description:** Get

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/1"
```

---

### List

**Method:** `POST`  
**Path:** `/reference/list/SFO_TABLE`  
**Description:** List

#### Parameters
**Body Parameters:**
- `referencedBy` (object) **Required** - Body parameter: referencedBy
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/list/SFO_TABLE"
```

---

### Upsert

**Method:** `POST`  
**Path:** `/reference`  
**Description:** Upsert

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `code` (string) **Required** - Body parameter: code
- `referencedBy` (string) **Required** - Body parameter: referencedBy
- `referencedByType` (string) **Required** - Body parameter: referencedByType

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference"
```

---

### Delete

**Method:** `DELETE`  
**Path:** `/reference/1`  
**Description:** Delete

#### Parameters


#### Response
**204:** Resource deleted successfully

#### Example Request
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/1"
```

---

### Replace

**Method:** `POST`  
**Path:** `/reference/replace`  
**Description:** Replace

#### Parameters
**Body Parameters:**
- `referencedBy` (string) **Required** - Body parameter: referencedBy
- `referencedByType` (string) **Required** - Body parameter: referencedByType
- `references` (object) **Required** - Body parameter: references

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/replace"
```

---

### Get

**Method:** `GET`  
**Path:** `/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031`  
**Description:** Get

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031"
```

---

### List

**Method:** `POST`  
**Path:** `/list/sfo_table`  
**Description:** List

#### Parameters
**Body Parameters:**
- `code` (object) **Required** - Body parameter: code
- `paging` (object) **Required** - Body parameter: paging

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/list/sfo_table"
```

---

### Upsert

**Method:** `POST`  
**Path:** `/`  
**Description:** Upsert

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `code` (string) **Required** - Body parameter: code
- `label` (string) **Required** - Body parameter: label
- `description` (string) **Required** - Body parameter: description
- `value` (object) **Required** - Body parameter: value

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/"
```

---

### Delete

**Method:** `DELETE`  
**Path:** `/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031`  
**Description:** Delete

#### Parameters


#### Response
**204:** Resource deleted successfully

#### Example Request
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031"
```

---

### Options

**Method:** `GET`  
**Path:** `/migration/options`  
**Description:** Options

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/options"
```

---

### Export

**Method:** `POST`  
**Path:** `/migration/export`  
**Description:** Export

#### Parameters
**Body Parameters:**
- `0` (string) **Required** - Body parameter: 0
- `1` (string) **Required** - Body parameter: 1
- `2` (string) **Required** - Body parameter: 2
- `3` (string) **Required** - Body parameter: 3

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/export"
```

---

### Import

**Method:** `POST`  
**Path:** `/migration/import`  
**Description:** Import

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/import"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| List Impersonation | `POST` | `/impersonation/list` | List Impersonation |
| Upsert Impersonation | `POST` | `/impersonation/upsert` | Upsert Impersonation |
| Impersonate | `POST` | `/impersonation/impersonate` | Impersonate |
| Stop impersonating | `POST` | `/impersonation/stopimpersonating` | Stop impersonating |
| Update Strategy | `POST` | `/updateStrategy` | Update Strategy |
| Request Strategies | `POST` | `/requestStrategies` | Request Strategies |
| Create Strategy | `POST` | `/createStrategy` | Create Strategy |
| Get Strategy | `POST` | `/getStrategy` | Get Strategy |
| List All Strategies | `POST` | `/listStrategiesForCurrentClient` | List All Strategies |
| Retrieve Strategy Config | `POST` | `/retrieveStrategyConfig` | Retrieve Strategy Config |
| login | `POST` | `/login` | login |
| login User | `POST` | `/login` | login User |
| logout | `POST` | `/logout` | logout |
| create permanent token | `POST` | `/createPermToken` | create permanent token |
| delete permanent token | `POST` | `/deletePermToken` | delete permanent token |
| get user by token | `POST` | `/getUserByToken` | get user by token |
| assurance | `POST` | `/assurance` | assurance |
| update-assurance | `POST` | `/update-assurance` | update-assurance |
| List Permanent Tokens | `POST` | `/listpermtokens` | List Permanent Tokens |
| 2FA Setup  | `POST` | `/2fa/login/enroll` | 2FA Setup  |
| 2fa Settings | `POST` | `/2fa` | 2fa Settings |
| 2FA Methods | `GET` | `/2fa` | 2FA Methods |
| 2FA Auth  | `POST` | `/2fa/login` | 2FA Auth  |
| Password Requirements | `POST` | `/password-requirements` | Password Requirements |
| Set Default Permanent Token | `POST` | `/setDefaultPermanentToken` | Set Default Permanent Token |
| Get Default Permanent Token | `POST` | `/getDefaultPermanentToken` | Get Default Permanent Token |
| New User Registration | `POST` | `/registerNewUser` | New User Registration |
| addClient | `POST` | `/addClient` | addClient |
| listClients | `POST` | `/listClients` | listClients |
| clearClient | `POST` | `/clearClient` | clearClient |
| updateClient | `POST` | `/updateClient` | updateClient |
| getClient | `GET` | `/getClient` | getClient |
| listOwnClient | `POST` | `/listOwnClient` | listOwnClient |
| Clear Test Client | `POST` | `/clearTestClient` | Clear Test Client |
| List Activity Types | `POST` | `/listActivityTypes` | List Activity Types |
| Activity Search | `POST` | `/searchActivity` | Activity Search |
| Activity Download | `POST` | `/downloadActivities` | Activity Download |
| Get Facets | `POST` | `/getFacets` | Get Facets |
| Upsert Application Template Permission | `POST` | `/upsertApplicationTemplatePermission` | Upsert Application Template Permission |
| List Application Template Permissions | `POST` | `/listApplicationTemplatePermissions` | List Application Template Permissions |
| Delete Application Template Permissions | `POST` | `/deleteApplicationTemplatePermissions` | Delete Application Template Permissions |
| Upsert Application Template Role | `POST` | `/upsertApplicationTemplateRole` | Upsert Application Template Role |
| List Application Template Role | `POST` | `/listApplicationTemplateRole` | List Application Template Role |
| Delete Application Template Role | `POST` | `/deleteApplicationTemplateRole` | Delete Application Template Role |
| Get Preset | `POST` | `/getApplicationTemplatePreset` | Get Preset |
| List Presets | `POST` | `/listApplicationTemplatePresets` | List Presets |
| Upsert Preset | `POST` | `/upsertApplicationTemplatePreset` | Upsert Preset |
| Delete Preset | `POST` | `/deleteApplicationTemplatePreset` | Delete Preset |
| Pagination | `POST` | `/listApplicationTemplates` | Pagination |
| Sort | `POST` | `/listApplicationTemplates` | Sort |
| Default | `POST` | `/listApplicationTemplates` | Default |
| ReturnFields | `POST` | `/listApplicationTemplates` | ReturnFields |
| Upsert Application Permissions | `POST` | `/upsertApplicationPermissions` | Upsert Application Permissions |
| List Application Permissions | `POST` | `/listApplicationPermissions` | List Application Permissions |
| Delete Application Permissions | `POST` | `/deleteApplicationPermissions` | Delete Application Permissions |
| Upsert Application Role | `POST` | `/upsertApplicationRole` | Upsert Application Role |
| Delete Application Role | `POST` | `/deleteApplicationRole` | Delete Application Role |
| List Application Roles | `POST` | `/listApplicationRoles` | List Application Roles |
| Apps User Logout | `POST` | `/apps/kurtosysapp/services/logout` | Apps User Logout |
| Apps User Login | `POST` | `/apps/kurtosysapp/services/login` | Apps User Login |
| Apps Auth 2FA Login | `POST` | `/apps/kurtosysapp/services/2fa/login` | Apps Auth 2FA Login |
| Add Application User  | `POST` | `/addUser` | Add Application User  |
| List User Applications | `POST` | `/listUserApplication` | List User Applications |
| Upsert User Application | `POST` | `/upsertUserApplication` | Upsert User Application |
| Versions - Only source | `POST` | `/upgrade/versions` | Versions - Only source |
| Versions - Source and destination | `POST` | `/upgrade/versions` | Versions - Source and destination |
| Preview | `POST` | `/upgrade/preview` | Preview |
| Execute | `POST` | `/upgrade/execute` | Execute |
| Revert | `POST` | `/upgrade/revert` | Revert |
| List | `POST` | `/upgrade/list` | List |
| Apps Auth Update Password | `POST` | `/apps/kurtosysapp/services/auth/update-password` | Apps Auth Update Password |
| Apps User Request Strategies | `POST` | `/apps/987c5234-3abf-4c39-b799-d1a62d635ec0/services/requestStrategies` | Apps User Request Strategies |
| Auth Service  Assurance Update | `POST` | `/apps/kurtosysapp/services/assurance/update` | Auth Service  Assurance Update |
| Auth Service Check Logged In | `GET` | `/apps/kurtosysapp/services/checkLoggedIn` | Auth Service Check Logged In |
| Auth Service 2FA Methods | `GET` | `/apps/kurtosysapp/services/auth/2fa` | Auth Service 2FA Methods |
| Auth Service SAML Signin | `POST` | `/apps/kurtosysapp/services/auth//saml/sign_in` | Auth Service SAML Signin |
| Default | `POST` | `/listApplications` | Default |
| Pagination | `POST` | `/listApplications` | Pagination |
| Sort | `POST` | `/listApplications` | Sort |
| Exclude Properties | `POST` | `/listApplications` | Exclude Properties |
| Retrieve Fund Manager Picture | `GET` | `/apps//services/fund/fundmanagerpicture` | Retrieve Fund Manager Picture |
| List Theme Versions | `POST` | `/listThemeVersions` | List Theme Versions |
| Get Theme Version | `POST` | `/getThemeVersion` | Get Theme Version |
| Restore Theme | `POST` | `/restoreTheme` | Restore Theme |
| Get Theme (ThemeId) | `GET` | `/getTheme` | Get Theme (ThemeId) |
| Get Theme (Name and Type) | `GET` | `/getTheme` | Get Theme (Name and Type) |
| Theme CSS | `GET` | `/theme/default.css` | Theme CSS |
| List Themes | `POST` | `/listThemes` | List Themes |
| Upsert Theme | `POST` | `/upsertTheme` | Upsert Theme |
| Delete Theme | `POST` | `/deleteTheme` | Delete Theme |
| Get JSON Schema (JsonSchemaId) | `GET` | `/getJsonSchema` | Get JSON Schema (JsonSchemaId) |
| Get JSON Schema (Type) | `GET` | `/getJsonSchema` | Get JSON Schema (Type) |
| List JSON Schemas | `POST` | `/listJsonSchemas` | List JSON Schemas |
| Upsert JSON Schema | `POST` | `/upsertJsonSchema` | Upsert JSON Schema |
| Delete JSON Schema | `POST` | `/deleteJsonSchema` | Delete JSON Schema |
| List Types | `POST` | `/listApplicationClientConfigurationTypes` | List Types |
| Upsert Type (insert) | `POST` | `/upsertApplicationClientConfigurationType` | Upsert Type (insert) |
| Upsert Type (update) | `POST` | `/upsertApplicationClientConfigurationType` | Upsert Type (update) |
| Delete Type | `POST` | `/deleteApplicationClientConfigurationType` | Delete Type |
| List Versions | `POST` | `/listApplicationClientConfigurationVersions` | List Versions |
| Get Version | `POST` | `/getApplicationClientConfigurationVersion` | Get Version |
| Restore | `POST` | `/restoreApplicationClientConfiguration` | Restore |
| Get Application Client Configuration (applicationClientConfigurationId) | `GET` | `/getApplicationClientConfiguration` | Get Application Client Configuration (applicationClientConfigurationId) |
| List Application Client Configurations | `POST` | `/listApplicationClientConfigurations` | List Application Client Configurations |
| Upsert Application Client Configuration | `POST` | `/upsertApplicationClientConfiguration` | Upsert Application Client Configuration |
| Delete Application Client Configuration | `POST` | `/deleteApplicationClientConfiguration` | Delete Application Client Configuration |
| Queries - Basic | `POST` | `/queries` | Queries - Basic |
| Queries - Debugging | `POST` | `/queries` | Queries - Debugging |
| Initialize | `GET` | `/initialize` | Initialize |
| Upsert Email Configuration | `POST` | `/upsertEmailConfiguration` | Upsert Email Configuration |
| List Email Configuration | `POST` | `/listEmailConfigurations` | List Email Configuration |
| Send Test Email | `POST` | `/sendTestEmail` | Send Test Email |
| Send Email | `POST` | `/sendEmail` | Send Email |
| List Commentaries | `POST` | `/listCommentaries` | List Commentaries |
| Add Cache Entry | `POST` | `/addKey` | Add Cache Entry |
| List all Cache Entries | `GET` | `/listKeys` | List all Cache Entries |
| Get a Cache Entry by Key | `POST` | `/retrieveKey` | Get a Cache Entry by Key |
| Get Cache Entries by Tags | `POST` | `/retrieveKey` | Get Cache Entries by Tags |
| Remove Expired Cache Entries | `POST` | `/wipeKeys` | Remove Expired Cache Entries |
| Delete Cache Entries by Keys | `DELETE` | `/deleteKeys` | Delete Cache Entries by Keys |
| Delete all Cache Entries for a Client | `DELETE` | `/deleteAll` | Delete all Cache Entries for a Client |
| Purge Client Edge Cache | `POST` | `/purgeClientEdgeCache` | Purge Client Edge Cache |
| Purge ALL Edge Cache | `POST` | `/purgeAllEdgeCache` | Purge ALL Edge Cache |
| Update Client Configuration | `POST` | `/updateClientConfiguration` | Update Client Configuration |
| Retrieve Client Configuration | `POST` | `/retrieveClientConfiguration` | Retrieve Client Configuration |
| Add Client Configuration | `POST` | `/addClientConfiguration` | Add Client Configuration |
| Upsert Client Configuration | `POST` | `/upsertClientConfiguration` | Upsert Client Configuration |
| Update Client Configuration | `POST` | `/updateClientConfiguration` | Update Client Configuration |
| Retrieve Client Configuration | `POST` | `/retrieveClientConfiguration` | Retrieve Client Configuration |
| Delete Client Configuratio | `POST` | `/deleteClientConfiguration` | Delete Client Configuratio |
| Add Client Configuration | `POST` | `/addClientConfiguration` | Add Client Configuration |
| List Properties | `POST` | `/listProperties` | List Properties |
| Update Client Configuration | `POST` | `/updateClientConfiguration` | Update Client Configuration |
| Retrieve Client Configuration | `POST` | `/retrieveClientConfiguration` | Retrieve Client Configuration |
| Add Client Configuration | `POST` | `/addClientConfiguration` | Add Client Configuration |
| Upsert Fund Manager Key Fact | `POST` | `/upsertFundManagerKeyFact` | Upsert Fund Manager Key Fact |
| List Fund Manager Key Facts | `POST` | `/listFundManagerKeyFacts` | List Fund Manager Key Facts |
| Lookup List Values - List | `GET` | `/lookuplist/DISTRIBUTION_LIST_TYPE` | Lookup List Values - List |
| Lookup List Value - Insert | `POST` | `/lookuplist/DISTRIBUTION_LIST_TYPE` | Lookup List Value - Insert |
| Lookup List Value - Update | `POST` | `/lookuplist/DISTRIBUTION_LIST_TYPE/4` | Lookup List Value - Update |
| Lookup List Value - Delete | `DELETE` | `/lookuplist/DISTRIBUTION_LIST_TYPE/3` | Lookup List Value - Delete |
| Upsert User Document Entitlement Scheme | `POST` | `/upsertUserDocumentEntitlementScheme` | Upsert User Document Entitlement Scheme |
| Upsert User Entitlement Preset | `POST` | `/upsertUserDocumentEntitlementPreset` | Upsert User Entitlement Preset |
| List User Entitlement Preset | `POST` | `/listUserDocumentEntitlementPreset` | List User Entitlement Preset |
| Delete User Entitlement Preset | `POST` | `/deleteUserDocumentEntitlementPreset` | Delete User Entitlement Preset |
| Bulk Upsert User Document Entitlement Preset | `POST` | `/bulkUpsertUserDocumentEntitlementsPreset` | Bulk Upsert User Document Entitlement Preset |
| Get Filters | `POST` | `/getFilters` | Get Filters |
| Replace User Data Entitlements | `POST` | `/replaceUserDataEntitlements` | Replace User Data Entitlements |
| Bulk Replace User Data Entitlements | `POST` | `/bulkReplaceUserDataEntitlements` | Bulk Replace User Data Entitlements |
| Add User Data Entitlements | `POST` | `/addUserDataEntitlements` | Add User Data Entitlements |
| Bulk Add User Data Entitlements | `POST` | `/bulkAddUserDataEntitlements` | Bulk Add User Data Entitlements |
| Remove User Data Entitlements | `POST` | `/removeUserDataEntitlements` | Remove User Data Entitlements |
| List User Data Entitlements | `POST` | `/listUserDataEntitlements` | List User Data Entitlements |
| Upsert Entity | `POST` | `/upsertentity` | Upsert Entity |
| Search Entity (Core Client)  | `POST` | `/searchentity` | Search Entity (Core Client)  |
| Retrieve FM Pic | `GET` | `/fundmanagerpicture` | Retrieve FM Pic |
| startLoad | `POST` | `/startload` | startLoad |
| endLoad | `POST` | `/finishload` | endLoad |
| Get Unique Filters | `POST` | `/getFilters` | Get Unique Filters |
| getEntity | `POST` | `/getEntity` | getEntity |
| getFundManager | `GET` | `/getFundManager/105` | getFundManager |
| Get Entity Facets | `POST` | `/getfacets` | Get Entity Facets |
| Search Entity (Core Client) Multi Sort | `POST` | `/searchentity` | Search Entity (Core Client) Multi Sort |
| Delete Fund Manager | `POST` | `/deleteFundManager` | Delete Fund Manager |
| List Fund Managers | `GET` | `/listFundManagers` | List Fund Managers |
| Add FormatCode | `POST` | `/addFormatCode` | Add FormatCode |
| List Format Codes | `POST` | `/listformatcodes` | List Format Codes |
| List Funds | `POST` | `/upsertcommentarytype` | List Funds |
| Upsert FundList - entity | `POST` | `/upsertfundlist` | Upsert FundList - entity |
| Upsert FundList - query | `POST` | `/upsertfundlist` | Upsert FundList - query |
| Upsert FundList - composite | `POST` | `/upsertfundlist` | Upsert FundList - composite |
| List Fund Lists | `POST` | `/listfundlists` | List Fund Lists |
| Delete FundList | `POST` | `/deletefundlist` | Delete FundList |
| Create Page Template Asset | `POST` | `/upsertPageTemplateAsset` | Create Page Template Asset |
| Update Page Template Asset | `POST` | `/upsertPageTemplateAsset` | Update Page Template Asset |
| Retrieve Page Template Asset | `POST` | `/retrievePageTemplateAsset` | Retrieve Page Template Asset |
| List Page Template Assets | `POST` | `/listPageTemplateAssets` | List Page Template Assets |
| Delete Page Template Assets | `POST` | `/deletePageTemplateAssets` | Delete Page Template Assets |
| retrieveLayoutConfiguration | `POST` | `/retrieveLayoutConfiguration` | retrieveLayoutConfiguration |
| List Office Templates | `POST` | `/listOfficeTemplates` | List Office Templates |
| Upsert Office Template | `POST` | `/upsertOfficeTemplate` | Upsert Office Template |
| Upsert InDesign Office Template | `POST` | `/upsertOfficeTemplate` | Upsert InDesign Office Template |
| List Modules | `POST` | `/modules` | List Modules |
| List Modules All | `POST` | `/modules/all` | List Modules All |
| List Permissions | `POST` | `/permissions` | List Permissions |
| Create Role | `POST` | `/roles-create` | Create Role |
| List Roles | `POST` | `/roles` | List Roles |
| Update Role | `POST` | `/roles-update` | Update Role |
| Get Role | `POST` | `/roles-single` | Get Role |
| Upsert Snapshot Configuration  | `POST` | `/upsertSnapshotConfiguration` | Upsert Snapshot Configuration  |
| List Snapshot Configurations | `POST` | `/listSnapshotConfigurations` | List Snapshot Configurations |
| List Snapshot Urls | `POST` | `/listUrls` | List Snapshot Urls |
| List Snapshot Tags | `POST` | `/listTags` | List Snapshot Tags |
| List Snapshot Facets | `POST` | `/listSnapshotFacets` | List Snapshot Facets |
| Retrieve Snapshot Thumbnail | `GET` | `/getSnapshotThumbnail` | Retrieve Snapshot Thumbnail |
| Retrieve Snapshot PDF | `GET` | `/getSnapshot` | Retrieve Snapshot PDF |
| Retrieve Snapshot HTML  | `GET` | `/getSnapshotHTML` | Retrieve Snapshot HTML  |
| Retrieve Snapshot Archive | `POST` | `/getSnapshotArchive` | Retrieve Snapshot Archive |
| Update Snap Status Callback | `POST` | `/updateSnapStatus` | Update Snap Status Callback |
| Update Archive Status Callback | `POST` | `/updateArchiveStatus` | Update Archive Status Callback |
| Take a Snapshot | `POST` | `/takeSnapshot` | Take a Snapshot |
| List Snaps | `POST` | `/listSnaps` | List Snaps |
| Update Archive Status | `POST` | `/updateArchiveStatus` | Update Archive Status |
| About | `GET` | `/about` | About |
| Translate Labels | `POST` | `/translateLabels` | Translate Labels |
| 2FA Enroll - Push | `POST` | `/2fa/enroll` | 2FA Enroll - Push |
| 2FA Enroll Auth - Push | `POST` | `/2fa/enroll/auth` | 2FA Enroll Auth - Push |
| 2FA Enroll - Text | `POST` | `/2fa/enroll` | 2FA Enroll - Text |
| 2FA Enroll Auth - Send Text | `POST` | `/2fa/enroll/auth` | 2FA Enroll Auth - Send Text |
| 2FA Enroll Auth - Confirm Text | `POST` | `/2fa/enroll/auth` | 2FA Enroll Auth - Confirm Text |
| 2FA Enroll - Call | `POST` | `/2fa/enroll` | 2FA Enroll - Call |
| 2FA Enroll Auth - Call | `POST` | `/2fa/enroll/auth` | 2FA Enroll Auth - Call |
| Add User | `POST` | `/addUser` | Add User |
| Bulk Add Users | `POST` | `/addUsers` | Bulk Add Users |
| Request Password Reset | `POST` | `/password-reset` | Request Password Reset |
| Reset Password/Register | `POST` | `/update-password` | Reset Password/Register |
| List Users | `POST` | `/listUsers` | List Users |
| Update User | `POST` | `/updateUser` | Update User |
| Validate Code | `POST` | `/validate-code` | Validate Code |
| Get assurance image | `POST` | `/assurance/getImage` | Get assurance image |
| Get assurance images | `POST` | `/assurance/getImages` | Get assurance images |
| Username Request | `POST` | `/username-request` | Username Request |
| Check Availability | `POST` | `/checkAvailability` | Check Availability |
| Search Users | `POST` | `/searchusers` | Search Users |
| Search Users (with all options) | `POST` | `/searchusers` | Search Users (with all options) |
| Resend Registration | `POST` | `/user/user_id/resendRegistration` | Resend Registration |
| Delete 2FA Method | `POST` | `/2fa/deleteMethod` | Delete 2FA Method |
| Upsert User Configuration | `POST` | `/upsertUserConfiguration` | Upsert User Configuration |
| Upsert User Configuration - document_view_config | `POST` | `/upsertUserConfiguration` | Upsert User Configuration - document_view_config |
| Retrieve User Configuration | `POST` | `/retrieveUserConfiguration` | Retrieve User Configuration |
| Retrieve User Configuration - document_view_config | `POST` | `/retrieveUserConfiguration` | Retrieve User Configuration - document_view_config |
| Delete User Configuration | `POST` | `/deleteUserConfiguration` | Delete User Configuration |
| Delete User Configuration - document_view_config | `POST` | `/deleteUserConfiguration` | Delete User Configuration - document_view_config |
| Upsert Validation Schema | `POST` | `/upsertValidationSchema` | Upsert Validation Schema |
| Generate single PDF | `POST` | `/exportPdf` | Generate single PDF |
| Upsert Workflow Step | `POST` | `/upsertWorkflowStep` | Upsert Workflow Step |
| List Workflow Steps | `POST` | `/listWorkflowSteps` | List Workflow Steps |
| Upsert Workflow | `POST` | `/upsertWorkflow` | Upsert Workflow |
| List Workflows | `POST` | `/listWorkflows` | List Workflows |
| List Workflow Inputs | `POST` | `/listWorkflowInputs` | List Workflow Inputs |
| Initiate Workflow Run | `POST` | `/initiateWorkflowRun` | Initiate Workflow Run |
| List Workflow Runs | `POST` | `/listWorkflowRuns` | List Workflow Runs |
| List Available Workflow Runs | `POST` | `/listAvailableWorkflowRuns` | List Available Workflow Runs |
| Finish Workflow Run | `POST` | `/finishWorkflowRun` | Finish Workflow Run |
| Get Workflow Run | `POST` | `/getWorkflowRun` | Get Workflow Run |
| Update Workflow Run Item | `POST` | `/updateWorkflowRunItem` | Update Workflow Run Item |
| Replace Workflow Run Item Template | `POST` | `/replaceWorkflowRunItemTemplate` | Replace Workflow Run Item Template |
| List Workflow Run Exceptions | `POST` | `/listWorkflowRunExceptions` | List Workflow Run Exceptions |
| Create Workflow Run Exception | `POST` | `/createWorkflowRunException` | Create Workflow Run Exception |
| Export PDF - Type 4 | `POST` | `/exportPdf` | Export PDF - Type 4 |
| Create Workflow Run Exception (with attachments) | `POST` | `/createWorkflowRunException` | Create Workflow Run Exception (with attachments) |
| Restart Workflow Run Exceptions | `POST` | `/restartWorkflowRunExceptions` | Restart Workflow Run Exceptions |
| Remove Workflow Items From Run | `POST` | `/removeWorkflowItemsFromRun` | Remove Workflow Items From Run |
| Download Workflow Exception Asset | `POST` | `/downloadWorkflowExceptionAsset` | Download Workflow Exception Asset |
| Trigger Distribution | `POST` | `/triggerDistribution` | Trigger Distribution |
| List Users | `POST` | `/listUsers` | List Users |
| Send Notifications | `POST` | `/sendNotifications` | Send Notifications |
| Delete Workflow Exception Reason | `POST` | `/deleteWorkflowExceptionReason` | Delete Workflow Exception Reason |
| Upsert Workflow Exception Reason | `POST` | `/upsertWorkflowExceptionReason` | Upsert Workflow Exception Reason |
| List Workflow Exception Reasons | `POST` | `/listWorkflowExceptionReasons` | List Workflow Exception Reasons |
| Retrieve workflow exception detail | `POST` | `/retrieveWorkflowExceptionStatistics` | Retrieve workflow exception detail |
| Retrieve workflow accuracy detail | `POST` | `/retrieveWorkflowAccuracyStatistics` | Retrieve workflow accuracy detail |
| Upsert Workflow Email Template | `POST` | `/upsertWorkflowEmailTemplate` | Upsert Workflow Email Template |
| Get Workflow Email Template | `POST` | `/getWorkflowEmailTemplate` | Get Workflow Email Template |
| Generate single XLSX | `POST` | `/exportXlsx` | Generate single XLSX |
| Distribution List - List | `POST` | `/distributionlist/list` | Distribution List - List |
| Distribution List - Get | `GET` | `/distributionlist/1` | Distribution List - Get |
| Distribution List - Upsert | `POST` | `/distributionlist` | Distribution List - Upsert |
| Distribution List - Delete | `DELETE` | `/distributionlist/1` | Distribution List - Delete |
| Distribution List - Workflow Count | `GET` | `/distributionlist/1/workflows/count` | Distribution List - Workflow Count |
| Email Workflow - List | `POST` | `/email/list` | Email Workflow - List |
| Email Workflow - Get | `GET` | `/email/1` | Email Workflow - Get |
| Email Workflow - Upsert | `POST` | `/email` | Email Workflow - Upsert |
| Email Workflow - Delete | `DELETE` | `/email/1` | Email Workflow - Delete |
| Email Workflow - Preview | `GET` | `/email/1/preview` | Email Workflow - Preview |
| Email Workflow - Start | `POST` | `/email/3/start` | Email Workflow - Start |
| Email Workflow - Finish | `POST` | `/email/3/finish` | Email Workflow - Finish |
| Email Workflow - Runs | `POST` | `/email/runs` | Email Workflow - Runs |
| Email Workflow - Run Items - List | `POST` | `/email/run/8/list` | Email Workflow - Run Items - List |
| Email Workflow - Run Items - Get | `GET` | `/email/runitems/123` | Email Workflow - Run Items - Get |
| Email Workflow - Run Items - Update | `POST` | `/email/runitems/123` | Email Workflow - Run Items - Update |
| Email Workflow - Run Items - Delete | `POST` | `/email/run/8/delete` | Email Workflow - Run Items - Delete |
| List Cultures | `POST` | `/listCultures` | List Cultures |
| Upsert Culture | `POST` | `/upsertCulture` | Upsert Culture |
| Get a site | `POST` | `/getWordpressSite` | Get a site |
| Upsert Site | `POST` | `/upsertWordpressSite` | Upsert Site |
| Get site list | `POST` | `/getWordpressSiteList` | Get site list |
| Get instance list | `POST` | `/getWordpressInstanceList` | Get instance list |
| Get instance | `POST` | `/getWordpressInstance` | Get instance |
| Get Wordpress Instance Cluster Health | `POST` | `/getWordpressInstanceClusterHealth` | Get Wordpress Instance Cluster Health |
| Complete DB backup | `POST` | `/completeWordpressBackup` | Complete DB backup |
| List automated DB backups | `POST` | `/listWordpressBackups` | List automated DB backups |
| Get a backup | `POST` | `/getWordpressBackup` | Get a backup |
| Restore DB backup | `POST` | `/restoreWordpressBackup` | Restore DB backup |
| Get Instance IP Restriction Counts | `POST` | `/getInstanceIPRestrictionCounts` | Get Instance IP Restriction Counts |
| Get Instance IP Restrictions | `POST` | `/getIPRestrictions` | Get Instance IP Restrictions |
| Upsert IP Restrictions | `POST` | `/upsertIPRestrictions` | Upsert IP Restrictions |
| Update IP Restrictions Status | `POST` | `/updateIPRestrictionsStatus` | Update IP Restrictions Status |
| Upsert Instance CSR | `POST` | `/upsertInstanceCSR` | Upsert Instance CSR |
| Upsert Certificate | `POST` | `/upsertCertificate` | Upsert Certificate |
| Update site url | `POST` | `/updateUrl` | Update site url |
| Get Audit Logs | `POST` | `/getAuditLogs` | Get Audit Logs |
| Get WP Logs | `POST` | `/getAuditLogs` | Get WP Logs |
| Request Validation | `POST` | `/requestValidation` | Request Validation |
| Insert Wordpress Proxy | `POST` | `/insertProxy` | Insert Wordpress Proxy |
| Get Wordpress Proxy | `POST` | `/getProxy` | Get Wordpress Proxy |
| Get Wordpress Proxy List | `POST` | `/getProxies` | Get Wordpress Proxy List |
| Delete Wordpress Proxy | `POST` | `/deleteProxy` | Delete Wordpress Proxy |
| Generate Pages | `POST` | `/generatePages` | Generate Pages |
| Share Posts | `POST` | `/sharePosts` | Share Posts |
| Push CF Tokens | `POST` | `/pushCFTokens` | Push CF Tokens |
| Retrieve OfficeTemplate Asset | `GET` | `/retrieveOfficeTemplateAsset/:officeTemplateCode/images/:size/:slide` | Retrieve OfficeTemplate Asset |
| Download Single Office Template | `POST` | `/downloadOfficeTemplate` | Download Single Office Template |
| Bulk Download Office Templates | `POST` | `/bulkDownloadOfficeTemplates` | Bulk Download Office Templates |
| Compress SFO File | `POST` | `/compressFile` | Compress SFO File |
| Retrieve Compressed SFO File | `GET` | `/retrieveFile/asd/asd.pptx` | Retrieve Compressed SFO File |
| Get Scenario Backup | `GET` | `/scenarioBackup/get/1` | Get Scenario Backup |
| List Scenario Backup | `POST` | `/scenarioBackup/list` | List Scenario Backup |
| Get Portfolio Backup | `GET` | `/portfolioBackup/get/1` | Get Portfolio Backup |
| List Portfolio Backup | `POST` | `/portfolioBackup/list` | List Portfolio Backup |
| Get Portfolio Entity Backup | `GET` | `/portfolioEntityBackup/get/1` | Get Portfolio Entity Backup |
| List Portfolio Entity Backup | `POST` | `/portfolioEntityBackup/list` | List Portfolio Entity Backup |
| Get Scenario Manager Backup | `GET` | `/scenarioManagerBackup/get/1` | Get Scenario Manager Backup |
| List Scenario Manager Backup | `POST` | `/scenarioManagerBackup/list` | List Scenario Manager Backup |
| Get Regime Type | `GET` | `/regimeType/get/1` | Get Regime Type |
| Delete Regime Type | `DELETE` | `/regimeType/delete/2` | Delete Regime Type |
| List Regime Types | `POST` | `/regimeType/list` | List Regime Types |
| List Regime Types (query) | `POST` | `/regimeType/list` | List Regime Types (query) |
| Upsert Regime Types (Insert) | `POST` | `/regimeType/upsert` | Upsert Regime Types (Insert) |
| Upsert Regime Types (Update) | `POST` | `/regimeType/upsert` | Upsert Regime Types (Update) |
| Get Scenario | `GET` | `/scenario/get/2` | Get Scenario |
| Get Scenario (entity include) | `GET` | `/scenario/get/4` | Get Scenario (entity include) |
| Delete Scenario | `DELETE` | `/scenario/delete/1` | Delete Scenario |
| List Scenario | `POST` | `/scenario/list` | List Scenario |
| List Scenario (query) | `POST` | `/scenario/list` | List Scenario (query) |
| Upsert Scenario (Insert) | `POST` | `/scenario/upsert` | Upsert Scenario (Insert) |
| Upsert Scenario (Update) | `POST` | `/scenario/upsert` | Upsert Scenario (Update) |
| Clone Scenario | `POST` | `/scenario/clone` | Clone Scenario |
| Get Benchmark Scenario | `POST` | `/scenario/getBenchmark` | Get Benchmark Scenario |
| Get Filters | `POST` | `/scenario/getFilters` | Get Filters |
| Get Portfolio | `GET` | `/portfolio/get/5` | Get Portfolio |
| Get Portfolio (entity include) | `GET` | `/portfolio/get/5` | Get Portfolio (entity include) |
| Delete Portfolio | `DELETE` | `/portfolio/delete/1` | Delete Portfolio |
| List Portfolio | `POST` | `/portfolio/list` | List Portfolio |
| List Portfolio (query) | `POST` | `/portfolio/list` | List Portfolio (query) |
| Upsert Portfolio (Insert) | `POST` | `/portfolio/upsert` | Upsert Portfolio (Insert) |
| Upsert Portfolio (Update) | `POST` | `/portfolio/upsert` | Upsert Portfolio (Update) |
| Clone Portfolio | `POST` | `/portfolio/clone` | Clone Portfolio |
| Get Common Dates | `POST` | `/portfolio/getCommonDates` | Get Common Dates |
| Get Correlation Matrix | `POST` | `/portfolio/getCorrelationMatrix` | Get Correlation Matrix |
| Get Correlation Matrix (All Inputs) | `POST` | `/portfolio/getCorrelationMatrix` | Get Correlation Matrix (All Inputs) |
| Get Efficient Frontier | `POST` | `/portfolio/getEfficientFrontier` | Get Efficient Frontier |
| Get Benchmark | `POST` | `/portfolio/getBenchmark` | Get Benchmark |
| Get Portfolio Entity | `GET` | `/portfolioEntity/get/5` | Get Portfolio Entity |
| Get Portfolio Entity (entity include) | `GET` | `/portfolioEntity/get/5` | Get Portfolio Entity (entity include) |
| Delete Portfolio Entity | `DELETE` | `/portfolioEntity/delete/3` | Delete Portfolio Entity |
| List Portfolio Entity | `POST` | `/portfolioEntity/list` | List Portfolio Entity |
| List Portfolio Entity (query) | `POST` | `/portfolioEntity/list` | List Portfolio Entity (query) |
| Upsert Portfolio Entity (Insert) | `POST` | `/portfolioEntity/upsert` | Upsert Portfolio Entity (Insert) |
| Upsert Portfolio Entity (Update) | `POST` | `/portfolioEntity/upsert` | Upsert Portfolio Entity (Update) |
| Get Scenario Manager | `GET` | `/scenarioManager/get/5` | Get Scenario Manager |
| Delete Scenario Manager | `DELETE` | `/scenarioManager/delete/3` | Delete Scenario Manager |
| List Scenario Manager | `POST` | `/scenarioManager/list` | List Scenario Manager |
| Upsert Scenario Manager (Insert) | `POST` | `/scenarioManager/upsert` | Upsert Scenario Manager (Insert) |
| Upsert Scenario Manager (Update) | `POST` | `/scenarioManager/upsert` | Upsert Scenario Manager (Update) |
| Get Regime Period | `GET` | `/regimePeriod/get/1` | Get Regime Period |
| List Regime Periods | `POST` | `/regimePeriod/list` | List Regime Periods |
| List Regime Periods (query) | `POST` | `/regimePeriod/list` | List Regime Periods (query) |
| Upsert Regime Period (Insert) | `POST` | `/regimePeriod/upsert` | Upsert Regime Period (Insert) |
| Upsert Regime Period Collection | `POST` | `/regimePeriod/upsertCollection` | Upsert Regime Period Collection |
| Get Conditional Market Analysis Backup | `GET` | `/conditionalMarketAnalysisBackup/get/1` | Get Conditional Market Analysis Backup |
| List Conditional Market Analysis Backup | `POST` | `/conditionalMarketAnalysisBackup/list` | List Conditional Market Analysis Backup |
| Get Conditional Market Analysis | `GET` | `/conditionalMarketAnalysis/get/1` | Get Conditional Market Analysis |
| List Conditional Market Analysis | `POST` | `/conditionalMarketAnalysis/list` | List Conditional Market Analysis |
| List Conditional Market Analysis (query) | `POST` | `/conditionalMarketAnalysis/list` | List Conditional Market Analysis (query) |
| Upsert Conditional Market Analysis (Insert) | `POST` | `/conditionalMarketAnalysis/upsert` | Upsert Conditional Market Analysis (Insert) |
| Upsert Conditional Market Analysis (Update) | `POST` | `/conditionalMarketAnalysis/upsert` | Upsert Conditional Market Analysis (Update) |
| Delete Conditional Market Analysis | `DELETE` | `/portfolio/delete/1` | Delete Conditional Market Analysis |
| Get Scenario Report Backup | `GET` | `/scenarioReportBackup/get/1` | Get Scenario Report Backup |
| List Scenario Report Backup | `POST` | `/scenarioReportBackup/list` | List Scenario Report Backup |
| Get Scenario Report | `GET` | `/scenarioReport/get/2` | Get Scenario Report |
| Delete Scenario Report | `DELETE` | `/scenarioReport/delete/1` | Delete Scenario Report |
| List Scenario Report | `POST` | `/scenarioReport/list` | List Scenario Report |
| List Scenario Report (query) | `POST` | `/scenarioReport/list` | List Scenario Report (query) |
| Upsert Scenario Report (Insert) | `POST` | `/scenarioReport/upsert` | Upsert Scenario Report (Insert) |
| Upsert Scenario Report (Update) | `POST` | `/scenarioReport/upsert` | Upsert Scenario Report (Update) |
| Execute External API | `POST` | `/externalApi/execute` | Execute External API |
| Upsert External API Configuration | `POST` | `/externalApi/upsertConfiguration` | Upsert External API Configuration |
| Upsert Contacts | `POST` | `/upsertContacts` | Upsert Contacts |
| Validate Contacts Upsert | `POST` | `/validateContactsUpsert` | Validate Contacts Upsert |
| Upsert Contact Group | `POST` | `/upsertContactGroup` | Upsert Contact Group |
| Upsert Contact Group Relationships | `POST` | `/upsertContactGroupRelationships` | Upsert Contact Group Relationships |
| List Contact Groups | `POST` | `/listContactGroups` | List Contact Groups |
| Delete Contacts | `POST` | `/deleteContacts` | Delete Contacts |
| Delete Contact Groups | `POST` | `/deleteContactGroups` | Delete Contact Groups |
| Enqueue | `POST` | `/enqueue` | Enqueue |
| Get | `GET` | `/backup/get/7` | Get |
| List | `POST` | `/backup/list` | List |
| Get | `GET` | `/dataadapters/sample_snowflake_adapter` | Get |
| List | `POST` | `/dataadapters/list` | List |
| Upsert | `POST` | `/dataadapters` | Upsert |
| Test | `POST` | `/dataadapters/test` | Test |
| Delete | `DELETE` | `/dataadapters/sample_snowflake_adapter` | Delete |
| List Views | `GET` | `/dataadapters/sample_snowflake_adapter/views` | List Views |
| Get View | `GET` | `/dataadapters/sample_snowflake_adapter/views/SNOWFLAKE_SAMPLE_DATA.INFORMATION_SCHEMA.STREAMLITS` | Get View |
| Upsert | `POST` | `/upsert` | Upsert |
| List | `POST` | `/execute` | List |
| Get | `GET` | `/get/test` | Get |
| Delete | `DELETE` | `/delete/3` | Delete |
| Execute (Raw) | `POST` | `/execute` | Execute (Raw) |
| Execute (Code) | `POST` | `/execute` | Execute (Code) |
| Execute | `GET` | `/execute/test` | Execute |
| Schemas (Raw) | `POST` | `/schemas` | Schemas (Raw) |
| Schemas (Code) | `POST` | `/execute` | Schemas (Code) |
| Schemas | `GET` | `/schemas/test` | Schemas |
| Get | `GET` | `/type/sfo_table` | Get |
| List | `POST` | `/type/list` | List |
| Get | `GET` | `/reference/1` | Get |
| List | `POST` | `/reference/list/SFO_TABLE` | List |
| Upsert | `POST` | `/reference` | Upsert |
| Delete | `DELETE` | `/reference/1` | Delete |
| Replace | `POST` | `/reference/replace` | Replace |
| Get | `GET` | `/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031` | Get |
| List | `POST` | `/list/sfo_table` | List |
| Upsert | `POST` | `/` | Upsert |
| Delete | `DELETE` | `/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031` | Delete |
| Options | `GET` | `/migration/options` | Options |
| Export | `POST` | `/migration/export` | Export |
| Import | `POST` | `/migration/import` | Import |
