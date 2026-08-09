# Studio

Studio applications and app management

## Endpoints

### Create Application Template Asset

**Method:** `POST`  
**Path:** `/upsertApplicationTemplateAsset`  
**Description:** Create Application Template Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateAsset"
```

---

### Update Application Template Asset

**Method:** `POST`  
**Path:** `/upsertApplicationTemplateAsset`  
**Description:** Update Application Template Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateAsset"
```

---

### List Application Template Asset

**Method:** `POST`  
**Path:** `/listApplicationTemplateAssets`  
**Description:** List Application Template Asset

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
  "https://api-uk.kurtosys.app/listApplicationTemplateAssets"
```

---

### Delete Application Template Asset

**Method:** `POST`  
**Path:** `/deleteApplicationTemplateAssets`  
**Description:** Delete Application Template Asset

#### Parameters
**Body Parameters:**
- `applicationTemplateCode` (string) **Required** - Body parameter: applicationTemplateCode
- `fileNames` (object) **Required** - Body parameter: fileNames

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplateAssets"
```

---

### Upsert Application Template (Schema Configuration)

**Method:** `POST`  
**Path:** `/upsertApplicationTemplate`  
**Description:** Upsert Application Template (Schema Configuration)

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `configuration` (object) **Required** - Body parameter: configuration
- `configurationSchema` (object) **Required** - Body parameter: configurationSchema

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate"
```

---

### Upsert Application Template (Features)

**Method:** `POST`  
**Path:** `/upsertApplicationTemplate`  
**Description:** Upsert Application Template (Features)

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `styles` (object) **Required** - Body parameter: styles
- `features` (object) **Required** - Body parameter: features

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate"
```

---

### Update Application Template Effective Dates

**Method:** `POST`  
**Path:** `/updateApplicationTemplateEffectiveDates`  
**Description:** Update Application Template Effective Dates

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `effectiveFrom` (string) **Required** - Body parameter: effectiveFrom
- `effectiveTo` (string) **Required** - Body parameter: effectiveTo

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateApplicationTemplateEffectiveDates"
```

---

### Upsert Application Template (Array Configuration)

**Method:** `POST`  
**Path:** `/upsertApplicationTemplate`  
**Description:** Upsert Application Template (Array Configuration)

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `description` (string) **Required** - Body parameter: description
- `styles` (object) **Required** - Body parameter: styles
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate"
```

---

### Create Application Asset

**Method:** `POST`  
**Path:** `/upsertApplicationAsset`  
**Description:** Create Application Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationAsset"
```

---

### Update Application Asset

**Method:** `POST`  
**Path:** `/upsertApplicationAsset`  
**Description:** Update Application Asset

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationAsset"
```

---

### List Application Asset

**Method:** `POST`  
**Path:** `/listApplicationAssets`  
**Description:** List Application Asset

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
  "https://api-uk.kurtosys.app/listApplicationAssets"
```

---

### List Application Thumbnails

**Method:** `POST`  
**Path:** `/listApplicationThumbnails`  
**Description:** List Application Thumbnails

#### Parameters


#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationThumbnails"
```

---

### Retrieve Application Asset

**Method:** `POST`  
**Path:** `/RetrieveApplicationAsset`  
**Description:** Retrieve Application Asset

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `fileName` (string) **Required** - Body parameter: fileName

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/RetrieveApplicationAsset"
```

---

### Delete Application Assets

**Method:** `POST`  
**Path:** `/deleteApplicationAssets`  
**Description:** Delete Application Assets

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `fileNames` (object) **Required** - Body parameter: fileNames

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationAssets"
```

---

### Application Instance Set password

**Method:** `POST`  
**Path:** `/apps/2399fd1c-7439-4c4f-b5c7-ed583267d12b/services/auth/update-password`  
**Description:** Application Instance Set password

#### Parameters
**Body Parameters:**
- `confirmPassword` (string) **Required** - Body parameter: confirmPassword
- `password` (string) **Required** - Body parameter: password
- `passwordRequestId` (string) **Required** - Body parameter: passwordRequestId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/2399fd1c-7439-4c4f-b5c7-ed583267d12b/services/auth/update-password"
```

---

### Application Instance Request reset password

**Method:** `POST`  
**Path:** `/apps/422f9dcb-26c0-4cef-b6bb-80cd8fe3feef/services/auth/password-reset`  
**Description:** Application Instance Request reset password

#### Parameters
**Body Parameters:**
- `userName` (string) **Required** - Body parameter: userName
- `password` (string) **Required** - Body parameter: password

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/422f9dcb-26c0-4cef-b6bb-80cd8fe3feef/services/auth/password-reset"
```

---

### List Application Configuration Versions

**Method:** `POST`  
**Path:** `/listApplicationConfigurationVersions`  
**Description:** List Application Configuration Versions

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
  "https://api-uk.kurtosys.app/listApplicationConfigurationVersions"
```

---

### Get Application Configuration Version

**Method:** `POST`  
**Path:** `/getApplicationConfigurationVersion`  
**Description:** Get Application Configuration Version

#### Parameters
**Body Parameters:**
- `applicationConfigurationVersionId` (number) **Required** - Body parameter: applicationConfigurationVersionId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfigurationVersion"
```

---

### Restore Application Configuration

**Method:** `POST`  
**Path:** `/restoreApplicationConfiguration`  
**Description:** Restore Application Configuration

#### Parameters
**Body Parameters:**
- `applicationConfigurationVersionId` (number) **Required** - Body parameter: applicationConfigurationVersionId
- `comment` (string) **Required** - Body parameter: comment

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationConfiguration"
```

---

### List Application Configurations

**Method:** `POST`  
**Path:** `/listApplicationConfigurations`  
**Description:** List Application Configurations

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
  "https://api-uk.kurtosys.app/listApplicationConfigurations"
```

---

### Get Application Configuration

**Method:** `POST`  
**Path:** `/getApplicationConfiguration`  
**Description:** Get Application Configuration

#### Parameters
**Body Parameters:**
- `applicationConfigurationId` (number) **Required** - Body parameter: applicationConfigurationId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfiguration"
```

---

### Upsert Application Configuration

**Method:** `POST`  
**Path:** `/upsertApplicationConfiguration`  
**Description:** Upsert Application Configuration

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `name` (string) **Required** - Body parameter: name
- `comment` (string) **Required** - Body parameter: comment
- `configuration` (object) **Required** - Body parameter: configuration

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationConfiguration"
```

---

### Delete Application Configuration

**Method:** `POST`  
**Path:** `/deleteApplicationConfiguration`  
**Description:** Delete Application Configuration

#### Parameters
**Body Parameters:**
- `applicationConfigurationId` (number) **Required** - Body parameter: applicationConfigurationId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationConfiguration"
```

---

### List Application Style Versions

**Method:** `POST`  
**Path:** `/listApplicationStyleVersions`  
**Description:** List Application Style Versions

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
  "https://api-uk.kurtosys.app/listApplicationStyleVersions"
```

---

### Get Application Style Version

**Method:** `POST`  
**Path:** `/getApplicationStyleVersion`  
**Description:** Get Application Style Version

#### Parameters
**Body Parameters:**
- `applicationStyleVersionId` (number) **Required** - Body parameter: applicationStyleVersionId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationStyleVersion"
```

---

### Restore Application Style

**Method:** `POST`  
**Path:** `/restoreApplicationStyle`  
**Description:** Restore Application Style

#### Parameters
**Body Parameters:**
- `applicationStyleVersionId` (number) **Required** - Body parameter: applicationStyleVersionId
- `comment` (string) **Required** - Body parameter: comment

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationStyle"
```

---

### List Application Styles

**Method:** `POST`  
**Path:** `/listApplicationStyles`  
**Description:** List Application Styles

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
  "https://api-uk.kurtosys.app/listApplicationStyles"
```

---

### Get Application Style

**Method:** `POST`  
**Path:** `/getApplicationConfiguration`  
**Description:** Get Application Style

#### Parameters
**Body Parameters:**
- `applicationConfigurationId` (number) **Required** - Body parameter: applicationConfigurationId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfiguration"
```

---

### Upsert Application Style

**Method:** `POST`  
**Path:** `/upsertApplicationStyle`  
**Description:** Upsert Application Style

#### Parameters
**Body Parameters:**
- `applicationCode` (string) **Required** - Body parameter: applicationCode
- `name` (string) **Required** - Body parameter: name
- `comment` (string) **Required** - Body parameter: comment
- `style` (object) **Required** - Body parameter: style

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationStyle"
```

---

### Delete Application Style

**Method:** `POST`  
**Path:** `/deleteApplicationStyle`  
**Description:** Delete Application Style

#### Parameters
**Body Parameters:**
- `applicationStyleId` (number) **Required** - Body parameter: applicationStyleId

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationStyle"
```

---

### CSS Application Style

**Method:** `GET`  
**Path:** `/style/1234/default.css`  
**Description:** CSS Application Style

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
  "https://api-uk.kurtosys.app/style/1234/default.css"
```

---

### Get Application App Config

**Method:** `GET`  
**Path:** `/apps/f88a3d96-a4ae-475d-b6af-da6adf1a2d77/services/getApplicationAppConfig`  
**Description:** Get Application App Config

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/f88a3d96-a4ae-475d-b6af-da6adf1a2d77/services/getApplicationAppConfig"
```

---

### Serve Application

**Method:** `GET`  
**Path:** `/serveApplication/kurtosysapp`  
**Description:** Serve Application

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
  "https://api-uk.kurtosys.app/serveApplication/kurtosysapp"
```

---

### Serve Application Details

**Method:** `GET`  
**Path:** `/serveApplicationDetails/f07eaf0e-1f93-4c40-a907-6140e3e3970c`  
**Description:** Serve Application Details

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/serveApplicationDetails/f07eaf0e-1f93-4c40-a907-6140e3e3970c"
```

---

### List Application Inputs

**Method:** `POST`  
**Path:** `/listApplicationInputs`  
**Description:** List Application Inputs

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
  "https://api-uk.kurtosys.app/listApplicationInputs"
```

---

### Get Application Filters

**Method:** `POST`  
**Path:** `/getAplicationFilters`  
**Description:** Get Application Filters

#### Parameters
**Body Parameters:**
- `filterProperties` (object) **Required** - Body parameter: filterProperties
- `search` (object) **Required** - Body parameter: search

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAplicationFilters"
```

---

### Application To Svg

**Method:** `POST`  
**Path:** `/applicationToSvg`  
**Description:** Application To Svg

#### Parameters
**Body Parameters:**
- `width` (number) **Required** - Body parameter: width
- `height` (number) **Required** - Body parameter: height
- `url` (string) **Required** - Body parameter: url

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationToSvg"
```

---

### Application To Pdf

**Method:** `POST`  
**Path:** `/applicationToPdf`  
**Description:** Application To Pdf

#### Parameters
**Body Parameters:**
- `width` (number) **Required** - Body parameter: width
- `height` (number) **Required** - Body parameter: height
- `url` (string) **Required** - Body parameter: url

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationToPdf"
```

---

### Apps Request Strategies

**Method:** `GET`  
**Path:** `/`  
**Description:** Apps Request Strategies

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/"
```

---

### Upsert Fundmanager - application/json

**Method:** `POST`  
**Path:** `/upsertFundmanager`  
**Description:** Upsert Fundmanager - application/json

#### Parameters
**Body Parameters:**
- `code` (string) **Required** - Body parameter: code
- `name` (string) **Required** - Body parameter: name
- `biography` (object) **Required** - Body parameter: biography
- `relatedEntities` (object) **Required** - Body parameter: relatedEntities
- `headshot` (string) **Required** - Body parameter: headshot
- `headshotContentType` (string) **Required** - Body parameter: headshotContentType
- `extended` (object) **Required** - Body parameter: extended

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

### Email Workflow - Run Items - Approve

**Method:** `POST`  
**Path:** `/email/runitems/123/approve`  
**Description:** Email Workflow - Run Items - Approve

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
  "https://api-uk.kurtosys.app/email/runitems/123/approve"
```

---

### Add Domain Mapping

**Method:** `POST`  
**Path:** `/upsertDomainMappings`  
**Description:** Add Domain Mapping

#### Parameters
**Body Parameters:**
- `wordpressMultiDomainId` (number) **Required** - Body parameter: wordpressMultiDomainId
- `mappings` (object) **Required** - Body parameter: mappings

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDomainMappings"
```

---

### Get Application Gallery Addin

**Method:** `GET`  
**Path:** `/applicationGalleryAddin`  
**Description:** Get Application Gallery Addin

#### Parameters


#### Response
**200:** Successful response

#### Example Request
```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationGalleryAddin"
```

---

### Apply Efficient Frontier

**Method:** `POST`  
**Path:** `/portfolio/applyEfficientFrontier`  
**Description:** Apply Efficient Frontier

#### Parameters
**Body Parameters:**
- `portfolioId` (number) **Required** - Body parameter: portfolioId
- `funds` (object) **Required** - Body parameter: funds

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/applyEfficientFrontier"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| Create Application Template Asset | `POST` | `/upsertApplicationTemplateAsset` | Create Application Template Asset |
| Update Application Template Asset | `POST` | `/upsertApplicationTemplateAsset` | Update Application Template Asset |
| List Application Template Asset | `POST` | `/listApplicationTemplateAssets` | List Application Template Asset |
| Delete Application Template Asset | `POST` | `/deleteApplicationTemplateAssets` | Delete Application Template Asset |
| Upsert Application Template (Schema Configuration) | `POST` | `/upsertApplicationTemplate` | Upsert Application Template (Schema Configuration) |
| Upsert Application Template (Features) | `POST` | `/upsertApplicationTemplate` | Upsert Application Template (Features) |
| Update Application Template Effective Dates | `POST` | `/updateApplicationTemplateEffectiveDates` | Update Application Template Effective Dates |
| Upsert Application Template (Array Configuration) | `POST` | `/upsertApplicationTemplate` | Upsert Application Template (Array Configuration) |
| Create Application Asset | `POST` | `/upsertApplicationAsset` | Create Application Asset |
| Update Application Asset | `POST` | `/upsertApplicationAsset` | Update Application Asset |
| List Application Asset | `POST` | `/listApplicationAssets` | List Application Asset |
| List Application Thumbnails | `POST` | `/listApplicationThumbnails` | List Application Thumbnails |
| Retrieve Application Asset | `POST` | `/RetrieveApplicationAsset` | Retrieve Application Asset |
| Delete Application Assets | `POST` | `/deleteApplicationAssets` | Delete Application Assets |
| Application Instance Set password | `POST` | `/apps/2399fd1c-7439-4c4f-b5c7-ed583267d12b/services/auth/update-password` | Application Instance Set password |
| Application Instance Request reset password | `POST` | `/apps/422f9dcb-26c0-4cef-b6bb-80cd8fe3feef/services/auth/password-reset` | Application Instance Request reset password |
| List Application Configuration Versions | `POST` | `/listApplicationConfigurationVersions` | List Application Configuration Versions |
| Get Application Configuration Version | `POST` | `/getApplicationConfigurationVersion` | Get Application Configuration Version |
| Restore Application Configuration | `POST` | `/restoreApplicationConfiguration` | Restore Application Configuration |
| List Application Configurations | `POST` | `/listApplicationConfigurations` | List Application Configurations |
| Get Application Configuration | `POST` | `/getApplicationConfiguration` | Get Application Configuration |
| Upsert Application Configuration | `POST` | `/upsertApplicationConfiguration` | Upsert Application Configuration |
| Delete Application Configuration | `POST` | `/deleteApplicationConfiguration` | Delete Application Configuration |
| List Application Style Versions | `POST` | `/listApplicationStyleVersions` | List Application Style Versions |
| Get Application Style Version | `POST` | `/getApplicationStyleVersion` | Get Application Style Version |
| Restore Application Style | `POST` | `/restoreApplicationStyle` | Restore Application Style |
| List Application Styles | `POST` | `/listApplicationStyles` | List Application Styles |
| Get Application Style | `POST` | `/getApplicationConfiguration` | Get Application Style |
| Upsert Application Style | `POST` | `/upsertApplicationStyle` | Upsert Application Style |
| Delete Application Style | `POST` | `/deleteApplicationStyle` | Delete Application Style |
| CSS Application Style | `GET` | `/style/1234/default.css` | CSS Application Style |
| Get Application App Config | `GET` | `/apps/f88a3d96-a4ae-475d-b6af-da6adf1a2d77/services/getApplicationAppConfig` | Get Application App Config |
| Serve Application | `GET` | `/serveApplication/kurtosysapp` | Serve Application |
| Serve Application Details | `GET` | `/serveApplicationDetails/f07eaf0e-1f93-4c40-a907-6140e3e3970c` | Serve Application Details |
| List Application Inputs | `POST` | `/listApplicationInputs` | List Application Inputs |
| Get Application Filters | `POST` | `/getAplicationFilters` | Get Application Filters |
| Application To Svg | `POST` | `/applicationToSvg` | Application To Svg |
| Application To Pdf | `POST` | `/applicationToPdf` | Application To Pdf |
| Apps Request Strategies | `GET` | `/` | Apps Request Strategies |
| Upsert Fundmanager - application/json | `POST` | `/upsertFundmanager` | Upsert Fundmanager - application/json |
| Email Workflow - Run Items - Approve | `POST` | `/email/runitems/123/approve` | Email Workflow - Run Items - Approve |
| Add Domain Mapping | `POST` | `/upsertDomainMappings` | Add Domain Mapping |
| Get Application Gallery Addin | `GET` | `/applicationGalleryAddin` | Get Application Gallery Addin |
| Apply Efficient Frontier | `POST` | `/portfolio/applyEfficientFrontier` | Apply Efficient Frontier |
