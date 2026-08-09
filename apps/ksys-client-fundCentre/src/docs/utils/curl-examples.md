# CURL Examples

Ready-to-use CURL commands for all KSYS API endpoints.

## Authentication

Replace `YOUR_TOKEN` with your actual access token.

## Management Endpoints

### List Impersonation

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/list" \
  -d '{"username":"example_value"}'
```


### Upsert Impersonation

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/upsert" \
  -d '{"username":"example_value","impersonationListType":"example_value","users":"1"}'
```


### Impersonate

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/impersonate" \
  -d '{"username":"example_value"}'
```


### Stop impersonating

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/stopimpersonating"
```


### Update Strategy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateStrategy" \
  -d '{"strategyId":"1","name":"example_value","type":"example_value","applicationCode":"example_value","clientId":"1","config":"1"}'
```


### Request Strategies

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/requestStrategies" \
  -d '{"organization":"example_value","type":"example_value"}'
```


### Create Strategy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createStrategy" \
  -d '{"name":"example_value","type":"example_value","applicationCode":"example_value","clientId":"1","config":"1","callbackIdentifier":"example_value"}'
```


### Get Strategy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getStrategy" \
  -d '{"id":"1"}'
```


### List All Strategies

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listStrategiesForCurrentClient" \
  -d '{"data":"example_value"}'
```


### Retrieve Strategy Config

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveStrategyConfig" \
  -d '{"type":"example_value","applicationCode":"example_value"}'
```


### login

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/login" \
  -d '{"username":"example_value","password":"example_value","clientName":"example_value"}'
```


### login User

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/login" \
  -d '{"username":"example_value","password":"example_value","clientName":"example_value"}'
```


### logout

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/logout" \
  -d '{"data":"example_value"}'
```


### create permanent token

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createPermToken" \
  -d '{"userId":"1"}'
```


### delete permanent token

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletePermToken" \
  -d '{"token":"example_value"}'
```


### get user by token

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getUserByToken" \
  -d '{"token":"example_value"}'
```


### assurance

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance" \
  -d '{"username":"example_value","clientName":"example_value"}'
```


### update-assurance

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/update-assurance" \
  -d '{"imageId":"example_value","message":"example_value"}'
```


### List Permanent Tokens

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listpermtokens" \
  -d '{"userId":"1"}'
```


### 2FA Setup 

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/login/enroll" \
  -d '{"type":"example_value"}'
```


### 2fa Settings

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa" \
  -d '{"data":"example_value"}'
```


### 2FA Methods

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa"
```


### 2FA Auth 

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/login" \
  -d '{"type":"example_value"}'
```


### Password Requirements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/password-requirements" \
  -d '{"passwordRequestId":"example_value"}'
```


### Set Default Permanent Token

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/setDefaultPermanentToken" \
  -d '{"token":"example_value"}'
```


### Get Default Permanent Token

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDefaultPermanentToken"
```


### New User Registration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/registerNewUser" \
  -d '{"type":"example_value","applicationCode":"example_value","name":"example_value","userMeta":"1"}'
```


### addClient

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClient" \
  -d '{"clientName":"example_value","modules":"1"}'
```


### listClients

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listClients" \
  -d '{"clientName":"example_value"}'
```


### clearClient

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/clearClient" \
  -d '{"clientName":"example_value","types":"1"}'
```


### updateClient

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateClient" \
  -d '{"clientId":"1","clientName":"example_value","modules":"1","enabledEntityTypeEntitlements":"1","enableDocumentEntitlement":"1"}'
```


### getClient

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getClient"
```


### listOwnClient

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listOwnClient" \
  -d '{"data":"example_value"}'
```


### Clear Test Client

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/clearTestClient" \
  -d '{"clientId":"1"}'
```


### List Activity Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listActivityTypes" \
  -d '{"start":"1","limit":"1"}'
```


### Activity Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchActivity" \
  -d '{"start":"1","limit":"1","sort":"1","search":"1"}'
```


### Activity Download

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadActivities" \
  -d '{"start":"example_value","end":"example_value","sort":"1","search":"1"}'
```


### Get Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFacets" \
  -d '{"searchTerm":"example_value"}'
```


### Upsert Application Template Permission

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplatePermission" \
  -d '{"applicationTemplateCode":"example_value","permission":"example_value","description":"example_value"}'
```


### List Application Template Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplatePermissions" \
  -d '{"applicationTemplateCode":"example_value"}'
```


### Delete Application Template Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplatePermissions" \
  -d '{"applicationTemplateCode":"example_value","permissions":"1"}'
```


### Upsert Application Template Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateRole" \
  -d '{"applicationTemplateCode":"example_value","role":"example_value","description":"example_value","permissions":"1"}'
```


### List Application Template Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplateRole" \
  -d '{"applicationTemplateCode":"example_value","roles":"1"}'
```


### Delete Application Template Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplateRole" \
  -d '{"applicationTemplateCode":"example_value","role":"example_value"}'
```


### Get Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationTemplatePreset" \
  -d '{"applicationTemplatePresetId":"1"}'
```


### List Presets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplatePresets"
```


### Upsert Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplatePreset" \
  -d '{"applicationTemplateCode":"example_value","type":"example_value","name":"example_value","description":"example_value","preset":"1","wizard":"1"}'
```


### Delete Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplatePreset" \
  -d '{"applicationTemplatePreset":"1"}'
```


### Pagination

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates" \
  -d '{"limit":"1","start":"1"}'
```


### Sort

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates" \
  -d '{"sort":"1"}'
```


### Default

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates"
```


### ReturnFields

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates" \
  -d '{"returnFields":"example_value"}'
```


### Upsert Application Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationPermissions" \
  -d '{"applicationCode":"example_value","permissions":"1"}'
```


### List Application Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationPermissions" \
  -d '{"applicationCode":"example_value"}'
```


### Delete Application Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationPermissions" \
  -d '{"applicationCode":"example_value","permissions":"1"}'
```


### Upsert Application Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationRole" \
  -d '{"applicationCode":"example_value","role":"example_value","description":"example_value","permissions":"1"}'
```


### Delete Application Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationRole" \
  -d '{"applicationCode":"example_value","role":"example_value","description":"example_value","permissions":"1"}'
```


### List Application Roles

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationRoles" \
  -d '{"applicationCode":"example_value"}'
```


### Apps User Logout

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/logout" \
  -d '{"data":"example_value"}'
```


### Apps User Login

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/login" \
  -d '{"userName":"example_value","password":"example_value","clientName":"example_value","applicationCode":"example_value"}'
```


### Apps Auth 2FA Login

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/2fa/login" \
  -d '{"type":"example_value"}'
```


### Add Application User 

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUser" \
  -d '{"userName":"example_value","email":"example_value","roles":"1","clientId":"1","password":"example_value"}'
```


### List User Applications

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserApplication" \
  -d '{"userId":"1"}'
```


### Upsert User Application

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserApplication" \
  -d '{"userId":"1","applicationCodes":"1"}'
```


### Versions - Only source

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/versions" \
  -d '{"sourceTemplateCode":"example_value"}'
```


### Versions - Source and destination

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/versions" \
  -d '{"sourceTemplateCode":"example_value","destinationTemplateCode":"example_value"}'
```


### Preview

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/preview" \
  -d '{"applicationCode":"example_value","destinationTemplateCode":"example_value"}'
```


### Execute

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/execute" \
  -d '{"status":"example_value","messages":"1","configurations":"1","styles":"1","application":"1","destinationTemplateCode":"example_value"}'
```


### Revert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/revert" \
  -d '{"applicationUpgradeId":"1"}'
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upgrade/list" \
  -d '{"applicationCode":"example_value"}'
```


### Apps Auth Update Password

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth/update-password" \
  -d '{"password":"example_value","confirmPassword":"example_value"}'
```


### Apps User Request Strategies

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/987c5234-3abf-4c39-b799-d1a62d635ec0/services/requestStrategies" \
  -d '{"organization":"example_value","type":"example_value"}'
```


### Auth Service  Assurance Update

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/assurance/update" \
  -d '{"clientName":"example_value","imageId":"1","message":"example_value"}'
```


### Auth Service Check Logged In

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/checkLoggedIn"
```


### Auth Service 2FA Methods

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth/2fa"
```


### Auth Service SAML Signin

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/kurtosysapp/services/auth//saml/sign_in"
```


### Default

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications" \
  -d '{"data":"example_value"}'
```


### Pagination

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications" \
  -d '{"limit":"1","start":"1"}'
```


### Sort

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications" \
  -d '{"sort":"1"}'
```


### Exclude Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications" \
  -d '{"excludeProperties":"1"}'
```


### Retrieve Fund Manager Picture

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps//services/fund/fundmanagerpicture"
```


### List Theme Versions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listThemeVersions"
```


### Get Theme Version

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getThemeVersion" \
  -d '{"themeId":"1","effectiveFrom":"example_value"}'
```


### Restore Theme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreTheme" \
  -d '{"themeVersionId":"1","comment":"example_value"}'
```


### Get Theme (ThemeId)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTheme"
```


### Get Theme (Name and Type)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTheme"
```


### Theme CSS

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/theme/default.css"
```


### List Themes

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listThemes"
```


### Upsert Theme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTheme" \
  -d '{"name":"example_value","type":"example_value","description":"example_value","comment":"example_value","theme":"1"}'
```


### Delete Theme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTheme" \
  -d '{"themeId":"1"}'
```


### Get JSON Schema (JsonSchemaId)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getJsonSchema"
```


### Get JSON Schema (Type)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getJsonSchema"
```


### List JSON Schemas

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listJsonSchemas"
```


### Upsert JSON Schema

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertJsonSchema" \
  -d '{"jsonSchemaId":"1","type":"example_value","defaultValue":"1","jsonSchema":"1"}'
```


### Delete JSON Schema

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteJsonSchema" \
  -d '{"jsonSchemaId":"1"}'
```


### List Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurationTypes"
```


### Upsert Type (insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfigurationType" \
  -d '{"name":"example_value","jsonSchemaId":"1"}'
```


### Upsert Type (update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfigurationType" \
  -d '{"applicationClientConfigurationTypeId":"1","name":"example_value","jsonSchemaId":"1"}'
```


### Delete Type

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationClientConfigurationType" \
  -d '{"applicationClientConfigurationTypeId":"1"}'
```


### List Versions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurationVersions"
```


### Get Version

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationClientConfigurationVersion" \
  -d '{"applicationClientConfigurationVersionId":"1"}'
```


### Restore

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationClientConfiguration" \
  -d '{"applicationClientConfigurationVersionId":"1","comment":"example_value"}'
```


### Get Application Client Configuration (applicationClientConfigurationId)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationClientConfiguration"
```


### List Application Client Configurations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationClientConfigurations"
```


### Upsert Application Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationClientConfiguration" \
  -d '{"name":"example_value","applicationClientConfigurationTypeId":"1","description":"example_value","comment":"example_value","configuration":"1"}'
```


### Delete Application Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationClientConfiguration" \
  -d '{"applicationClientConfigurationId":"1"}'
```


### Queries - Basic

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/queries" \
  -d '{"include":"1","inputs":"1","queryContextConfigurations":"1","queries":"1","debugOptions":"1"}'
```


### Queries - Debugging

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/queries" \
  -d '{"inputs":"1","queryContextConfigurations":"1","queries":"1","debugOptions":"1"}'
```


### Initialize

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/initialize"
```


### Upsert Email Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertEmailConfiguration" \
  -d '{"applicationCode":"example_value","emailType":"example_value","content":"example_value","subject":"example_value"}'
```


### List Email Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listEmailConfigurations" \
  -d '{"applicationCode":"example_value"}'
```


### Send Test Email

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendTestEmail" \
  -d '{"to":"example_value","applicationCode":"example_value","emailType":"example_value","subject":"example_value","template":"example_value"}'
```


### Send Email

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendEmail" \
  -d '{"to":"example_value","applicationCode":"example_value","emailType":"example_value","contextData":"1","activityLog":"1","clientId":"1"}'
```


### List Commentaries

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listCommentaries" \
  -d '{"commentaryType":"1","culture":"1","linkedList":"1","linkedEntity":"1","global":"1"}'
```


### Add Cache Entry

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addKey" \
  -d '{"key":"example_value","value":"example_value","expiry":"example_value","tags":"1"}'
```


### List all Cache Entries

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listKeys"
```


### Get a Cache Entry by Key

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveKey" \
  -d '{"key":"example_value"}'
```


### Get Cache Entries by Tags

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveKey" \
  -d '{"tags":"1"}'
```


### Remove Expired Cache Entries

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/wipeKeys" \
  -d '{"data":"example_value"}'
```


### Delete Cache Entries by Keys

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteKeys"
```


### Delete all Cache Entries for a Client

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteAll"
```


### Purge Client Edge Cache

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/purgeClientEdgeCache"
```


### Purge ALL Edge Cache

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/purgeAllEdgeCache"
```


### Update Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Retrieve Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveClientConfiguration" \
  -d '{"code":"example_value"}'
```


### Add Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Upsert Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Update Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Retrieve Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveClientConfiguration" \
  -d '{"code":"example_value"}'
```


### Delete Client Configuratio

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteClientConfiguration" \
  -d '{"code":"example_value"}'
```


### Add Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### List Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listProperties" \
  -d '{"entityType":"example_value"}'
```


### Update Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Retrieve Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveClientConfiguration" \
  -d '{"code":"example_value"}'
```


### Add Client Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Upsert Fund Manager Key Fact

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertFundManagerKeyFact" \
  -d '{"code":"example_value","label":"example_value","dataType":"example_value","description":"example_value"}'
```


### List Fund Manager Key Facts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listFundManagerKeyFacts" \
  -d '{"data":"example_value"}'
```


### Lookup List Values - List

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE"
```


### Lookup List Value - Insert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE" \
  -d '{"value":"example_value"}'
```


### Lookup List Value - Update

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE/4" \
  -d '{"value":"example_value"}'
```


### Lookup List Value - Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/lookuplist/DISTRIBUTION_LIST_TYPE/3"
```


### Upsert User Document Entitlement Scheme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlementScheme" \
  -d '{"userId":"1","documentEntitlementSchemeId":"1"}'
```


### Upsert User Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlementPreset" \
  -d '{"userId":"1","presetCode":"example_value"}'
```


### List User Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserDocumentEntitlementPreset" \
  -d '{"userId":"1"}'
```


### Delete User Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteUserDocumentEntitlementPreset" \
  -d '{"userId":"1"}'
```


### Bulk Upsert User Document Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkUpsertUserDocumentEntitlementsPreset" \
  -d '{"userNames":"1","presetCode":"example_value"}'
```


### Get Filters

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFilters" \
  -d '{"codes":"1","search":"1"}'
```


### Replace User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceUserDataEntitlements" \
  -d '{"0":"1","1":"1"}'
```


### Bulk Replace User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkReplaceUserDataEntitlements" \
  -d '{"userNames":"1","dataEntitlementLists":"1","dataEntitlements":"1"}'
```


### Add User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUserDataEntitlements" \
  -d '{"0":"1"}'
```


### Bulk Add User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkAddUserDataEntitlements" \
  -d '{"userNames":"1","dataEntitlementLists":"1","dataEntitlements":"1"}'
```


### Remove User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeUserDataEntitlements" \
  -d '{"0":"1"}'
```


### List User Data Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserDataEntitlements" \
  -d '{"userName":"example_value"}'
```


### Upsert Entity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertentity" \
  -d '{"clientCode":"example_value","type":"example_value","propertiesPub":"1"}'
```


### Search Entity (Core Client) 

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchentity" \
  -d '{"type":"example_value","clientCode":"1","search":"1","sort":"1","include":"1","translate":"1","culture":"example_value","originCulture":"example_value","preserveOriginal":"1","limit":"1","start":"1"}'
```


### Retrieve FM Pic

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/fundmanagerpicture"
```


### startLoad

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/startload" \
  -d '{"loaderName":"example_value","loaderAddress":"example_value","gitRepo":"example_value","targetData":"1"}'
```


### endLoad

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/finishload" \
  -d '{"loaderSnapId":"1","exitCode":"1"}'
```


### Get Unique Filters

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFilters" \
  -d '{"type":"example_value","filterProperties":"1","search":"1","fundList":"example_value","counts":"1"}'
```


### getEntity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getEntity" \
  -d '{"type":"example_value","clientCode":"example_value","include":"1"}'
```


### getFundManager

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFundManager/105"
```


### Get Entity Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getfacets" \
  -d '{"entityType":"example_value","searchTerm":"example_value"}'
```


### Search Entity (Core Client) Multi Sort

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchentity" \
  -d '{"type":"example_value","clientCode":"1","search":"1","sort":"1","include":"1","translate":"1","culture":"example_value","originCulture":"example_value","preserveOriginal":"1","limit":"1","start":"1"}'
```


### Delete Fund Manager

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteFundManager" \
  -d '{"fundManagerId":"1"}'
```


### List Fund Managers

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listFundManagers"
```


### Add FormatCode

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addFormatCode" \
  -d '{"type":"example_value","code":"example_value","label":"example_value","description":"example_value","formatRules":"1"}'
```


### List Format Codes

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listformatcodes"
```


### List Funds

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertcommentarytype" \
  -d '{"commentaryType":"example_value","description":"example_value"}'
```


### Upsert FundList - entity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist" \
  -d '{"listName":"example_value","entityType":"example_value","listType":"example_value","funds":"1"}'
```


### Upsert FundList - query

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist" \
  -d '{"entityType":"example_value","listType":"example_value","segmentationQuery":"1","listName":"example_value","description":"example_value","segmentationTags":"1"}'
```


### Upsert FundList - composite

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertfundlist" \
  -d '{"entityType":"example_value","listName":"example_value","description":"example_value","listType":"example_value","compositeQuery":"1"}'
```


### List Fund Lists

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listfundlists"
```


### Delete FundList

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletefundlist" \
  -d '{"listName":"example_value"}'
```


### Create Page Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertPageTemplateAsset"
```


### Update Page Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertPageTemplateAsset"
```


### Retrieve Page Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrievePageTemplateAsset" \
  -d '{"templateCode":"example_value","pageTemplateEnvironment":"example_value","fileName":"example_value"}'
```


### List Page Template Assets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listPageTemplateAssets" \
  -d '{"pageTemplateId":"1","pageTemplateEnvironment":"example_value"}'
```


### Delete Page Template Assets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletePageTemplateAssets" \
  -d '{"pageTemplateId":"1","pageTemplateEnvironment":"example_value","pageTemplateAssetIds":"1"}'
```


### retrieveLayoutConfiguration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveLayoutConfiguration" \
  -d '{"layoutConfigurationType":"example_value"}'
```


### List Office Templates

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listOfficeTemplates"
```


### Upsert Office Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertOfficeTemplate" \
  -d '{"title":"example_value","description":"example_value","fileType":"example_value","fileName":"example_value","officeTemplateType":"example_value","data":"example_value"}'
```


### Upsert InDesign Office Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertOfficeTemplate" \
  -d '{"title":"example_value","description":"example_value","fileType":"example_value","fileName":"example_value","officeTemplateType":"example_value","data":"example_value","images":"1","applicationData":"1"}'
```


### List Modules

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/modules" \
  -d '{"data":"example_value"}'
```


### List Modules All

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/modules/all" \
  -d '{"data":"example_value"}'
```


### List Permissions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/permissions" \
  -d '{"data":"example_value"}'
```


### Create Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-create" \
  -d '{"clientId":"1","role":"example_value","permissions":"1"}'
```


### List Roles

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles" \
  -d '{"clientId":"1","role":"example_value","permissions":"1"}'
```


### Update Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-update" \
  -d '{"roleId":"1","clientId":"1","role":"example_value","permissions":"1"}'
```


### Get Role

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/roles-single" \
  -d '{"roleId":"1"}'
```


### Upsert Snapshot Configuration 

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSnapshotConfiguration" \
  -d '{"code":"example_value","name":"example_value","urlTemplate":"example_value","allowedInputs":"1","inputs":"1"}'
```


### List Snapshot Configurations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSnapshotConfigurations"
```


### List Snapshot Urls

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUrls" \
  -d '{"limit":"1","start":"1"}'
```


### List Snapshot Tags

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTags"
```


### List Snapshot Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSnapshotFacets" \
  -d '{"searchTerm":"example_value"}'
```


### Retrieve Snapshot Thumbnail

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotThumbnail"
```


### Retrieve Snapshot PDF

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshot"
```


### Retrieve Snapshot HTML 

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotHTML"
```


### Retrieve Snapshot Archive

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getSnapshotArchive"
```


### Update Snap Status Callback

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateSnapStatus" \
  -d '{"snapId":"1","accessKey":"example_value","lineCount":"1","errors":"1"}'
```


### Update Archive Status Callback

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateArchiveStatus"
```


### Take a Snapshot

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/takeSnapshot"
```


### List Snaps

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSnaps" \
  -d '{"snapshotId":"1","date":"example_value","itemsBefore":"1","itemsAfter":"1","url":"example_value"}'
```


### Update Archive Status

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateArchiveStatus" \
  -d '{"accessKey":"example_value","snapshotId":"1","year":"1","month":"1","s3Path":"example_value"}'
```


### About

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/about"
```


### Translate Labels

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/translateLabels" \
  -d '{"culture":"example_value","translationCulture":"example_value","keys":"1"}'
```


### 2FA Enroll - Push

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll" \
  -d '{"type":"example_value"}'
```


### 2FA Enroll Auth - Push

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth" \
  -d '{"type":"example_value"}'
```


### 2FA Enroll - Text

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll" \
  -d '{"type":"example_value","phone":"example_value"}'
```


### 2FA Enroll Auth - Send Text

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth" \
  -d '{"type":"example_value"}'
```


### 2FA Enroll Auth - Confirm Text

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth" \
  -d '{"type":"example_value","passcode":"example_value"}'
```


### 2FA Enroll - Call

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll" \
  -d '{"type":"example_value","phone":"example_value"}'
```


### 2FA Enroll Auth - Call

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/enroll/auth" \
  -d '{"type":"example_value"}'
```


### Add User

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUser" \
  -d '{"userName":"example_value","email":"example_value","name":"example_value","organizationName":"example_value","status":"example_value","roles":"1","clientId":"1","password":"example_value"}'
```


### Bulk Add Users

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addUsers" \
  -d '{"users":"1","userDefaultApplication":"example_value","userApplicationAccess":"1","userApplicationRoles":"1"}'
```


### Request Password Reset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/password-reset" \
  -d '{"userName":"example_value","clientName":"example_value"}'
```


### Reset Password/Register

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/update-password" \
  -d '{"password":"example_value","confirmPassword":"example_value","passwordRequestId":"example_value"}'
```


### List Users

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUsers" \
  -d '{"clientId":"1","limit":"1","start":"1"}'
```


### Update User

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateUser" \
  -d '{"userId":"1","clientId":"1","userName":"example_value","name":"example_value","organizationName":"example_value","status":"example_value","email":"example_value","roles":"1","password":"example_value"}'
```


### Validate Code

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validate-code" \
  -d '{"passwordRequestId":"example_value","type":"example_value"}'
```


### Get assurance image

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance/getImage" \
  -d '{"passwordRequestId":"example_value","imageId":"example_value"}'
```


### Get assurance images

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/assurance/getImages" \
  -d '{"passwordRequestId":"example_value"}'
```


### Username Request

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/username-request" \
  -d '{"email":"example_value"}'
```


### Check Availability

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/checkAvailability" \
  -d '{"usernames":"1","externalUserIdentifiers":"1"}'
```


### Search Users

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchusers" \
  -d '{"limit":"1","start":"1"}'
```


### Search Users (with all options)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchusers" \
  -d '{"limit":"1","start":"1","email":"example_value","applicationCode":"example_value","status":"example_value","userName":"example_value","clientId":"1"}'
```


### Resend Registration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/user/user_id/resendRegistration" \
  -d '{"data":"example_value"}'
```


### Delete 2FA Method

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/2fa/deleteMethod" \
  -d '{"type":"example_value"}'
```


### Upsert User Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Upsert User Configuration - document_view_config

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Retrieve User Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveUserConfiguration" \
  -d '{"code":"example_value"}'
```


### Retrieve User Configuration - document_view_config

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveUserConfiguration" \
  -d '{"code":"example_value"}'
```


### Delete User Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteUserConfiguration" \
  -d '{"code":"example_value"}'
```


### Delete User Configuration - document_view_config

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteUserConfiguration" \
  -d '{"code":"example_value"}'
```


### Upsert Validation Schema

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertValidationSchema" \
  -d '{"code":"example_value","name":"example_value","entityType":"example_value","linkedEntities":"1","rules":"1"}'
```


### Generate single PDF

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportPdf" \
  -d '{"url":"example_value","printSettings":"1"}'
```


### Upsert Workflow Step

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowStep" \
  -d '{"code":"example_value","type":"example_value","workflowType":"example_value","name":"example_value","description":"example_value","approvalGroups":"1"}'
```


### List Workflow Steps

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowSteps" \
  -d '{"code":"example_value"}'
```


### Upsert Workflow

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflow" \
  -d '{"code":"example_value","name":"example_value","description":"example_value","workflowType":"example_value","allowedInputs":"1","workflowInputs":"1","distributionConfiguration":"1","workflowSteps":"1","workflowOwnerApprovalGroups":"1","pageTemplate":"example_value","environmentName":"example_value"}'
```


### List Workflows

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflows" \
  -d '{"data":"example_value"}'
```


### List Workflow Inputs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowInputs" \
  -d '{"code":"example_value"}'
```


### Initiate Workflow Run

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/initiateWorkflowRun" \
  -d '{"code":"example_value","name":"example_value","description":"example_value","targetDate":"example_value","distributionTargetDate":"example_value"}'
```


### List Workflow Runs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowRuns" \
  -d '{"active":"1"}'
```


### List Available Workflow Runs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listAvailableWorkflowRuns" \
  -d '{"data":"example_value"}'
```


### Finish Workflow Run

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/finishWorkflowRun" \
  -d '{"workflowRunId":"1"}'
```


### Get Workflow Run

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWorkflowRun" \
  -d '{"workflowRunId":"1","start":"1","limit":"1"}'
```


### Update Workflow Run Item

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateWorkflowRunItem" \
  -d '{"workflowRunId":"1","runItems":"1"}'
```


### Replace Workflow Run Item Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceWorkflowRunItemTemplate" \
  -d '{"workflowRunItemId":"1","stepCode":"example_value","file":"1"}'
```


### List Workflow Run Exceptions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowRunExceptions" \
  -d '{"workflowRunId":"1","start":"1","limit":"1"}'
```


### Create Workflow Run Exception

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createWorkflowRunException" \
  -d '{"workflowRunId":"1","workflowItemIds":"1","comment":"example_value","recipients":"1","workflowStepCode":"example_value"}'
```


### Export PDF - Type 4

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportPdf" \
  -d '{"url":"example_value","printSettings":"1","config":"1"}'
```


### Create Workflow Run Exception (with attachments)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createWorkflowRunException"
```


### Restart Workflow Run Exceptions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restartWorkflowRunExceptions" \
  -d '{"workflowRunId":"1","workflowItemIds":"1"}'
```


### Remove Workflow Items From Run

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeWorkflowItemsFromRun" \
  -d '{"workflowRunId":"1","workflowItemIds":"1"}'
```


### Download Workflow Exception Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadWorkflowExceptionAsset" \
  -d '{"workflowRunExceptionAssetId":"1"}'
```


### Trigger Distribution

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/triggerDistribution" \
  -d '{"workflowRunId":"1","distributionType":"example_value"}'
```


### List Users

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUsers"
```


### Send Notifications

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sendNotifications" \
  -d '{"workflowRunId":"1"}'
```


### Delete Workflow Exception Reason

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteWorkflowExceptionReason" \
  -d '{"label":"example_value"}'
```


### Upsert Workflow Exception Reason

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowExceptionReason" \
  -d '{"label":"example_value","description":"example_value"}'
```


### List Workflow Exception Reasons

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowExceptionReasons" \
  -d '{"data":"example_value"}'
```


### Retrieve workflow exception detail

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowExceptionStatistics" \
  -d '{"period":"example_value","startDate":"example_value","endDate":"example_value","action":"example_value"}'
```


### Retrieve workflow accuracy detail

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowAccuracyStatistics" \
  -d '{"period":"example_value","startDate":"example_value","endDate":"example_value","action":"example_value"}'
```


### Upsert Workflow Email Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWorkflowEmailTemplate" \
  -d '{"workflowId":"1","emailType":"example_value","subject":"example_value","content":"example_value"}'
```


### Get Workflow Email Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWorkflowEmailTemplate" \
  -d '{"workflowId":"1","emailType":"example_value"}'
```


### Generate single XLSX

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/exportXlsx" \
  -d '{"globalStyles":"1","htmlStyles":"1","worksheets":"1"}'
```


### Distribution List - List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist/list" \
  -d '{"name":"example_value","paging":"1"}'
```


### Distribution List - Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist/1"
```


### Distribution List - Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist" \
  -d '{"distributionListId":"1","name":"example_value","description":"example_value","entityType":"example_value","affiliated":"1","documentKeyProtected":"1","documentKeyType":"example_value","documentKey":"example_value","types":"1","entities":"1","recipients":"1"}'
```


### Distribution List - Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist/1"
```


### Distribution List - Workflow Count

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/distributionlist/1/workflows/count"
```


### Email Workflow - List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/list" \
  -d '{"name":"example_value","paging":"1"}'
```


### Email Workflow - Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/1"
```


### Email Workflow - Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email" \
  -d '{"workflowId":"1","code":"example_value","name":"example_value","description":"example_value","workflowType":"example_value","segmentationLists":"1","workflowConfiguration":"1","template":"1"}'
```


### Email Workflow - Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/1"
```


### Email Workflow - Preview

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/1/preview"
```


### Email Workflow - Start

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/3/start" \
  -d '{"tags":"1"}'
```


### Email Workflow - Finish

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/3/finish" \
  -d '{"data":"example_value"}'
```


### Email Workflow - Runs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/runs" \
  -d '{"paging":"1"}'
```


### Email Workflow - Run Items - List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/run/8/list" \
  -d '{"paging":"1"}'
```


### Email Workflow - Run Items - Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/runitems/123"
```


### Email Workflow - Run Items - Update

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/runitems/123" \
  -d '{"subject":"example_value","template":"example_value","templateJSON":"1"}'
```


### Email Workflow - Run Items - Delete

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/run/8/delete" \
  -d '{"workflowItemIds":"1"}'
```


### List Cultures

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listCultures"
```


### Upsert Culture

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertCulture" \
  -d '{"culture":"example_value","isDefault":"1"}'
```


### Get a site

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressSite" \
  -d '{"wordpressSiteId":"1"}'
```


### Upsert Site

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWordpressSite" \
  -d '{"siteName":"example_value","description":"example_value"}'
```


### Get site list

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressSiteList"
```


### Get instance list

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressInstanceList" \
  -d '{"wordpressSiteId":"1"}'
```


### Get instance

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressInstance" \
  -d '{"wordpressInstanceId":"1"}'
```


### Get Wordpress Instance Cluster Health

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressInstanceClusterHealth" \
  -d '{"wordpressInstanceId":"1"}'
```


### Complete DB backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/completeWordpressBackup" \
  -d '{"location":"example_value","projectNumber":"example_value","environment":"example_value","accessKey":"example_value"}'
```


### List automated DB backups

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWordpressBackups" \
  -d '{"wordpressInstanceId":"1"}'
```


### Get a backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressBackup" \
  -d '{"wordpressBackupId":"1"}'
```


### Restore DB backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreWordpressBackup" \
  -d '{"wordpressBackupId":"1","wordpressInstanceId":"1"}'
```


### Get Instance IP Restriction Counts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getInstanceIPRestrictionCounts" \
  -d '{"wordpressInstanceId":"1"}'
```


### Get Instance IP Restrictions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getIPRestrictions" \
  -d '{"wordpressInstanceId":"1"}'
```


### Upsert IP Restrictions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertIPRestrictions" \
  -d '{"wordpressInstanceId":"1","ipAddresses":"1"}'
```


### Update IP Restrictions Status

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateIPRestrictionsStatus" \
  -d '{"wordpressInstanceId":"1","enabled":"1"}'
```


### Upsert Instance CSR

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertInstanceCSR" \
  -d '{"wordpressInstanceId":"1","primaryDomain":"example_value","additionalDomains":"example_value","country":"example_value","state":"example_value","city":"example_value","organization":"example_value","department":"example_value"}'
```


### Upsert Certificate

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertCertificate" \
  -d '{"wordpressInstanceId":"1","certificateFile":"example_value"}'
```


### Update site url

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateUrl" \
  -d '{"url":"example_value","swarmId":"example_value"}'
```


### Get Audit Logs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAuditLogs" \
  -d '{"siteId":"1","searchTerm":"example_value","start":"1","limit":"1"}'
```


### Get WP Logs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAuditLogs" \
  -d '{"siteId":"1","searchTerm":"example_value","start":"1","limit":"1"}'
```


### Request Validation

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/requestValidation" \
  -d '{"wordpressMultiDomainId":"1","wordpressInstanceId":"1"}'
```


### Insert Wordpress Proxy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertProxy" \
  -d '{"wordpressInstanceId":"1","fromUri":"example_value","toUrl":"example_value","proxyType":"example_value"}'
```


### Get Wordpress Proxy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getProxy" \
  -d '{"wordpressProxyId":"1","wordpressInstanceId":"1"}'
```


### Get Wordpress Proxy List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getProxies" \
  -d '{"wordpressInstanceId":"1","start":"1","limit":"1"}'
```


### Delete Wordpress Proxy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteProxy" \
  -d '{"wordpressProxyId":"1","wordpressInstanceId":"1"}'
```


### Generate Pages

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/generatePages" \
  -d '{"requestType":"example_value","schemaName":"example_value","configId":"1"}'
```


### Share Posts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sharePosts" \
  -d '{"wordpressInstanceId":"1","siteId":"1","postId":"1","toSiteIds":"1","action":"example_value"}'
```


### Push CF Tokens

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/pushCFTokens"
```


### Retrieve OfficeTemplate Asset

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveOfficeTemplateAsset/:officeTemplateCode/images/:size/:slide"
```


### Download Single Office Template

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/downloadOfficeTemplate" \
  -d '{"officeTemplateCode":"example_value"}'
```


### Bulk Download Office Templates

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkDownloadOfficeTemplates" \
  -d '{"officeTemplateCodes":"1"}'
```


### Compress SFO File

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/compressFile"
```


### Retrieve Compressed SFO File

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveFile/asd/asd.pptx"
```


### Get Scenario Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioBackup/get/1"
```


### List Scenario Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioBackup/list" \
  -d '{"scenarioId":"1"}'
```


### Get Portfolio Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioBackup/get/1"
```


### List Portfolio Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioBackup/list" \
  -d '{"portfolioId":"1"}'
```


### Get Portfolio Entity Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntityBackup/get/1"
```


### List Portfolio Entity Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntityBackup/list" \
  -d '{"portfolioEntityId":"1"}'
```


### Get Scenario Manager Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManagerBackup/get/1"
```


### List Scenario Manager Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManagerBackup/list" \
  -d '{"scenarioManagerId":"1"}'
```


### Get Regime Type

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/get/1"
```


### Delete Regime Type

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/delete/2"
```


### List Regime Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/list"
```


### List Regime Types (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/list"
```


### Upsert Regime Types (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/upsert" \
  -d '{"name":"example_value"}'
```


### Upsert Regime Types (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimeType/upsert" \
  -d '{"regimeTypeId":"1","name":"example_value"}'
```


### Get Scenario

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/get/2"
```


### Get Scenario (entity include)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/get/4"
```


### Delete Scenario

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/delete/1"
```


### List Scenario

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/list"
```


### List Scenario (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/list" \
  -d '{"name":"1"}'
```


### Upsert Scenario (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/upsert" \
  -d '{"name":"example_value","mode":"example_value","sharing":"example_value","extended":"1"}'
```


### Upsert Scenario (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/upsert" \
  -d '{"scenarioId":"1","name":"example_value","mode":"example_value","sharing":"example_value","extended":"1"}'
```


### Clone Scenario

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/clone" \
  -d '{"scenarioId":"1"}'
```


### Get Benchmark Scenario

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getBenchmark" \
  -d '{"scenarioId":"1","timeseriesCode":"example_value","statisticsOptions":"1"}'
```


### Get Filters

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getFilters" \
  -d '{"fields":"1"}'
```


### Get Portfolio

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/get/5"
```


### Get Portfolio (entity include)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/get/5"
```


### Delete Portfolio

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/delete/1"
```


### List Portfolio

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/list" \
  -d '{"scenarioId":"1"}'
```


### List Portfolio (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/list" \
  -d '{"scenarioId":"1"}'
```


### Upsert Portfolio (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/upsert" \
  -d '{"scenarioId":"1","name":"example_value","color":"example_value","type":"example_value","extended":"1"}'
```


### Upsert Portfolio (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/upsert" \
  -d '{"portfolioId":"1","scenarioId":"1","name":"1","color":"example_value","type":"example_value","extended":"1"}'
```


### Clone Portfolio

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/clone" \
  -d '{"portfolioId":"1"}'
```


### Get Common Dates

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCommonDates" \
  -d '{"id":"1","timeseriesCode":"example_value"}'
```


### Get Correlation Matrix

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCorrelationMatrix" \
  -d '{"portfolioId":"1","timeseriesCode":"example_value","timePeriod":"example_value"}'
```


### Get Correlation Matrix (All Inputs)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getCorrelationMatrix" \
  -d '{"portfolioId":"1","timeseriesCode":"example_value","periodType":"example_value","category":"1","probability":"1","threshold":"1","timePeriod":"example_value","years":"1","calculateCompositeFundStatistic":"1"}'
```


### Get Efficient Frontier

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getEfficientFrontier" \
  -d '{"portfolioId":"1","timeseriesCode":"example_value","riskFreeRateOptions":"1","correlationMatrix":"1","commonStartDate":"example_value","commonEndDate":"example_value"}'
```


### Get Benchmark

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getBenchmark" \
  -d '{"clientCode":"example_value","entityType":"example_value","timeseriesCode":"example_value"}'
```


### Get Portfolio Entity

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/get/5"
```


### Get Portfolio Entity (entity include)

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/get/5"
```


### Delete Portfolio Entity

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/delete/3"
```


### List Portfolio Entity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/list" \
  -d '{"portfolioId":"1"}'
```


### List Portfolio Entity (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/list" \
  -d '{"portfolioId":"1","weight":"1"}'
```


### Upsert Portfolio Entity (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/upsert" \
  -d '{"portfolioId":"1","entityId":"1","color":"example_value","weight":"1","extended":"1"}'
```


### Upsert Portfolio Entity (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioEntity/upsert" \
  -d '{"portfolioEntityId":"1","portfolioId":"1","entityId":"1","color":"example_value","weight":"1","extended":"1"}'
```


### Get Scenario Manager

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/get/5"
```


### Delete Scenario Manager

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/delete/3"
```


### List Scenario Manager

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/list" \
  -d '{"scenarioId":"1"}'
```


### Upsert Scenario Manager (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/upsert" \
  -d '{"scenarioId":"1","fundManagerId":"1","extended":"1"}'
```


### Upsert Scenario Manager (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioManager/upsert" \
  -d '{"scenarioManagerId":"1","scenarioId":"1","fundManagerId":"1","extended":"1"}'
```


### Get Regime Period

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/get/1"
```


### List Regime Periods

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/list"
```


### List Regime Periods (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/list"
```


### Upsert Regime Period (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/upsert" \
  -d '{"regimeTypeId":"1","date":"example_value","value":"example_value"}'
```


### Upsert Regime Period Collection

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/regimePeriod/upsertCollection" \
  -d '{"regimePeriods":"1"}'
```


### Get Conditional Market Analysis Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysisBackup/get/1"
```


### List Conditional Market Analysis Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysisBackup/list" \
  -d '{"conditionalMarketAnalysisId":"1"}'
```


### Get Conditional Market Analysis

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/get/1"
```


### List Conditional Market Analysis

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/list" \
  -d '{"scenarioId":"1"}'
```


### List Conditional Market Analysis (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/list" \
  -d '{"scenarioId":"1","periodType":"1"}'
```


### Upsert Conditional Market Analysis (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/upsert" \
  -d '{"scenarioId":"1","regimeTypeId":"1","periodType":"example_value"}'
```


### Upsert Conditional Market Analysis (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/conditionalMarketAnalysis/upsert" \
  -d '{"conditionalMarketAnalysisId":"1","scenarioId":"1","regimeTypeId":"1","periodType":"example_value"}'
```


### Delete Conditional Market Analysis

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/delete/1"
```


### Get Scenario Report Backup

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReportBackup/get/1"
```


### List Scenario Report Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReportBackup/list" \
  -d '{"scenarioReportId":"1"}'
```


### Get Scenario Report

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/get/2"
```


### Delete Scenario Report

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/delete/1"
```


### List Scenario Report

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/list"
```


### List Scenario Report (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/list" \
  -d '{"name":"1"}'
```


### Upsert Scenario Report (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/upsert" \
  -d '{"name":"example_value","mode":"example_value","sharing":"example_value","extended":"1","configuration":"1"}'
```


### Upsert Scenario Report (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenarioReport/upsert" \
  -d '{"scenarioReportId":"1","name":"example_value","mode":"example_value","sharing":"example_value","extended":"1","configuration":"1"}'
```


### Execute External API

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/externalApi/execute"
```


### Upsert External API Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/externalApi/upsertConfiguration" \
  -d '{"type":"example_value","providerKey":"example_value","config":"1"}'
```


### Upsert Contacts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContacts" \
  -d '{"0":"1","1":"1","2":"1","3":"1"}'
```


### Validate Contacts Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validateContactsUpsert" \
  -d '{"0":"1","1":"1","2":"1","3":"1"}'
```


### Upsert Contact Group

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContactGroup" \
  -d '{"groupCode":"example_value","name":"example_value"}'
```


### Upsert Contact Group Relationships

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertContactGroupRelationships" \
  -d '{"contactGroupCode":"example_value","childContactIds":"1","childContactGroupCodes":"1"}'
```


### List Contact Groups

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listContactGroups" \
  -d '{"search":"1","includeChildContacts":"1","includeChildGroups":"1","start":"1","limit":"1"}'
```


### Delete Contacts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteContacts" \
  -d '{"contacts":"1"}'
```


### Delete Contact Groups

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteContactGroups" \
  -d '{"0":"example_value","1":"example_value"}'
```


### Enqueue

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/enqueue" \
  -d '{"accessKey":"example_value","taskToken":"example_value","templateURL":"example_value","destinationS3Key":"example_value","importXMLContent":"example_value"}'
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/backup/get/7"
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/backup/list" \
  -d '{"datasetId":"1"}'
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter"
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/list" \
  -d '{"data":"example_value"}'
```


### Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters" \
  -d '{"label":"example_value","description":"example_value","code":"example_value","type":"example_value","configuration":"1"}'
```


### Test

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/test" \
  -d '{"codes":"1"}'
```


### Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter"
```


### List Views

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/views"
```


### Get View

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/views/SNOWFLAKE_SAMPLE_DATA.INFORMATION_SCHEMA.STREAMLITS"
```


### Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsert" \
  -d '{"code":"example_value","body":"example_value","inputs":"1"}'
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute" \
  -d '{"raw":"1"}'
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/get/test"
```


### Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/delete/3"
```


### Execute (Raw)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute" \
  -d '{"raw":"1"}'
```


### Execute (Code)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute" \
  -d '{"code":"example_value","inputs":"1"}'
```


### Execute

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute/test"
```


### Schemas (Raw)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/schemas" \
  -d '{"raw":"1"}'
```


### Schemas (Code)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/execute" \
  -d '{"code":"example_value","inputs":"1"}'
```


### Schemas

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/schemas/test"
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/type/sfo_table"
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/type/list" \
  -d '{"code":"1","paging":"1"}'
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/1"
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/list/SFO_TABLE" \
  -d '{"referencedBy":"1","paging":"1"}'
```


### Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference" \
  -d '{"type":"example_value","code":"example_value","referencedBy":"example_value","referencedByType":"example_value"}'
```


### Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/1"
```


### Replace

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/reference/replace" \
  -d '{"referencedBy":"example_value","referencedByType":"example_value","references":"1"}'
```


### Get

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031"
```


### List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/list/sfo_table" \
  -d '{"code":"1","paging":"1"}'
```


### Upsert

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/" \
  -d '{"type":"example_value","code":"example_value","label":"example_value","description":"example_value","value":"1"}'
```


### Delete

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/sfo_table/018c4d1f-c08b-4c1d-8c72-ef6abc073031"
```


### Options

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/options"
```


### Export

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/export" \
  -d '{"0":"example_value","1":"example_value","2":"example_value","3":"example_value"}'
```


### Import

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/migration/import"
```



## Data Endpoints

### Upsert Commentary

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertcommentary" \
  -d '{"commentaryType":"example_value","commentaries":"1","linkedEntity":"example_value"}'
```


### List Commentary Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listcommentarytypes" \
  -d '{"clientId":"1","entityType":"example_value"}'
```


### Add Transaction Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addTransactionProperty" \
  -d '{"code":"example_value","entityType":"example_value","asAtDate":"example_value","transactionCode":"example_value","label":"example_value","description":"example_value","formatCode":"example_value","group":"example_value","extended":"1"}'
```


### List Transaction Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTransactionProperties" \
  -d '{"entityType":"example_value"}'
```


### Add HistoricalDataset Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addHistoricalDatasetProperty" \
  -d '{"code":"example_value","entityType":"example_value","label":"example_value","description":"example_value","group":"example_value","extended":"1"}'
```


### List HistoricalDataset Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listHistoricalDatasetProperties" \
  -d '{"entityType":"example_value"}'
```


### Add Core Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addproperty" \
  -d '{"code":"example_value","entityType":"example_value","dataType":"example_value","validationRule":"example_value","label":"example_value","formatCode":"example_value","description":"example_value","group":"example_value"}'
```


### Add Allocation Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addAllocProperty" \
  -d '{"code":"example_value","entityType":"example_value","label":"example_value","description":"example_value","formatCode":"example_value","group":"example_value","extended":"1"}'
```


### List Allocation Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listAllocProperties" \
  -d '{"entityType":"example_value"}'
```


### Add Timeseries Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addTSProperty" \
  -d '{"code":"example_value","entityType":"example_value","label":"example_value","description":"example_value","labelFormatCode":"example_value","valueFormatCode":"example_value","group":"example_value","extended":"1"}'
```


### List Timeseries Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTSProperties" \
  -d '{"entityType":"example_value"}'
```


### Add Statistic Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addStatisticProperty" \
  -d '{"code":"example_value","entityType":"example_value","label":"example_value","description":"example_value","group":"example_value","extended":"1"}'
```


### List Statistic Properties

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listStatisticProperties" \
  -d '{"entityType":"example_value"}'
```


### List Approval Groups

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApprovalGroups"
```


### Upsert approval group

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApprovalGroup" \
  -d '{"groupName":"example_value","users":"1"}'
```


### Get Transaction Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTransactionFacets" \
  -d '{"entityType":"example_value","clientCode":"example_value","searchTerm":"example_value","property":"example_value","ccy":"example_value"}'
```


### Update Loader Schedule

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addproperty" \
  -d '{"code":"example_value","entityType":"example_value","dataType":"example_value","validationRule":"example_value","label":"example_value","description":"example_value","group":"example_value"}'
```


### Upsert Disclaimer Type

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertdisclaimertype" \
  -d '{"disclaimerType":"example_value","description":"example_value"}'
```


### Upsert Disclaimer

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertdisclaimer" \
  -d '{"disclaimerType":"example_value","disclaimers":"1","linkedEntity":"example_value"}'
```


### List Disclaimer Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listdisclaimertypes" \
  -d '{"clientId":"1"}'
```


### List Disclaimers

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDisclaimers" \
  -d '{"disclaimerType":"1","culture":"1","linkedList":"1","linkedEntity":"1","global":"1"}'
```


### List Disclaimers Backup

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDisclaimersBackup"
```


### Upsert Segmentation Tag

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSegmentationTag" \
  -d '{"code":"example_value","label":"example_value","description":"example_value","acceptedValues":"1"}'
```


### List Segmentation Tags

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSegmentationTags" \
  -d '{"data":"example_value"}'
```


### Search Document include Entity Data

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDocuments" \
  -d '{"type":"example_value","clientCode":"1","search":"1","include":"1","limit":"1","start":"1"}'
```


### Retrieve Document by Meta Data Value

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieve//region/USA"
```


### Get Document Retrieval Statistics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDocumentRetrievalStatistics" \
  -d '{"startDate":"example_value","endDate":"example_value","period":"example_value","documentMeta":"1"}'
```


### Upsert Data Entitlement List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/replaceDataEntitlementLists" \
  -d '{"entitlementLists":"1"}'
```


### Remove Data Entitlement Lists

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeDataEntitlementLists" \
  -d '{"listNames":"1"}'
```


### Add Data Entitlement List Entities

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDataEntitlementListEntities" \
  -d '{"entitlementLists":"1"}'
```


### Remove Data Entitlement List Entities

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/removeDataEntitlementListEntities" \
  -d '{"entitlementLists":"1"}'
```


### List Data Entitlement Lists

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDataEntitlementLists" \
  -d '{"types":"1","listNames":"1"}'
```


### Include Historical Datasets (asAtDate)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity" \
  -d '{"type":"example_value","search":"1","include":"1"}'
```


### Include Historical Datasets (date range)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity" \
  -d '{"type":"example_value","search":"1","include":"1"}'
```


### Upsert Allocations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertallocations" \
  -d '{"entityType":"example_value","clientCode":"example_value","code":"example_value","ccy":"example_value","values":"1"}'
```


### Insert Transactions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertTransactions" \
  -d '{"0":"1"}'
```


### Delete Transactions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTransactions" \
  -d '{"transactionCodes":"1"}'
```


### Upsert Statistics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertstatistics" \
  -d '{"data":"1"}'
```


### Upsert Timeseries

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttimeseries" \
  -d '{"entityType":"example_value","clientCode":"example_value","code":"example_value","ccy":"example_value","classification":"example_value","periodicity":"example_value","values":"1"}'
```


### Upsert Timeseries Delta

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttimeseriesdelta" \
  -d '{"updateType":"example_value","entityType":"example_value","clientCode":"example_value","code":"example_value","ccy":"example_value","classification":"example_value","periodicity":"example_value","values":"1"}'
```


### Upsert Fundmanager - multipart/form-data

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertFundmanager"
```


### getHistoricalDatasets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getHistoricalDatasets" \
  -d '{"type":"example_value","clientCode":"example_value","code":"example_value","ccy":"example_value","asAtDate":"example_value"}'
```


### Get Transaction Filters

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTransactionFilters" \
  -d '{"type":"example_value","clientCode":"example_value","code":"example_value","extendedProperties":"1","metaProperties":"1","translation":"1"}'
```


### Get Segmentation Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFundListFacets" \
  -d '{"searchTerm":"example_value"}'
```


### List Translation Providers

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTranslationProviders" \
  -d '{"data":"example_value"}'
```


### Get Translation Providers Credentials UI

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProvidersCredentialsUI" \
  -d '{"data":"example_value"}'
```


### Upsert Translation Provider

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTranslationProvider" \
  -d '{"translationProviderId":"1","enabled":"1","credentials":"1"}'
```


### Get Translation Provider Supported Languages

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderSupportedLanguages" \
  -d '{"translationProviderId":"1"}'
```


### Upsert Translation Provider Project

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertTranslationProviderProject" \
  -d '{"translationProviderId":"1","sourceLanguage":"example_value","targetLanguage":"example_value","translationItems":"1"}'
```


### List Translation Provider Projects

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listTranslationProviderProjects" \
  -d '{"translationProjectId":"1","translationProviderId":"1","sourceLanguage":"example_value","targetLanguage":"1","status":"example_value","page":"1","pageSize":"1"}'
```


### Get Translation Provider Project

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderProject" \
  -d '{"translationProjectId":"1"}'
```


### Mark Translation Provider Subscription Complete

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/markTranslationProviderSubscriptionComplete" \
  -d '{"translationProviderSubscriptionId":"1","email":"1"}'
```


### Get Translation Provider Project Status

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getTranslationProviderProjectStatus" \
  -d '{"translationProviderId":"1"}'
```


### Abandon Translation Provider Project

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/abandonTranslationProviderProject" \
  -d '{"translationProjectId":"1"}'
```


### Update Translation Provider Statuses

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateTranslationProviderStatuses" \
  -d '{"translationProjectId":"1"}'
```


### Update All Translation Provider Statuses

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateAllTranslationProviderStatuses" \
  -d '{"data":"example_value"}'
```


### Verify Translation Provider Connection

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/verifyTranslationProviderConnection" \
  -d '{"data":"example_value"}'
```


### Add Translations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upserttranslation" \
  -d '{"clientId":"1","phrase":"example_value","culture":"example_value","translation":"example_value","translationCulture":"example_value"}'
```


### Delete Translations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteTranslations" \
  -d '{"0":"1","1":"1","2":"1"}'
```


### List Translations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listtranslations" \
  -d '{"clientId":"1","culture":"example_value"}'
```


### Search Translations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchTranslations" \
  -d '{"phrase":"example_value","start":"1","limit":"1","cultures":"1"}'
```


### List Workflow Inputs by allowed inputs and segmentation lists

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listWorkflowInputs" \
  -d '{"allowedInputs":"1","segmentationLists":"1"}'
```


### Update Document Status - Form-data

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateDocumentStatus"
```


### Retrieve workflow statistics data

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowStatistics" \
  -d '{"period":"example_value","startDate":"example_value","endDate":"example_value"}'
```


### Retrieve workflow exception statistics data

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowExceptionStatistics" \
  -d '{"period":"example_value","startDate":"example_value","endDate":"example_value"}'
```


### Retrieve workflow accuracy statistics summary

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveWorkflowAccuracyStatistics" \
  -d '{"period":"example_value","startDate":"example_value","endDate":"example_value"}'
```


### Portfolio Statistics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioStatistics" \
  -d '{"statistics":"1","portfolio":"1","benchmark":"1"}'
```


### Portfolio Statistics Copy

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolioStatistics" \
  -d '{"statistics":"1","portfolio":"1","benchmark":"1"}'
```


### Batch Portfolio Statistics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/batchPortfolioStatistics" \
  -d '{"benchmark":"1","fundRiskCategories":"1","periodTypes":"1","portfolios":"1","correlationIndices":"1","fundRiskIndices":"1","statistics":"1"}'
```


### Get Statistics Scenario

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/scenario/getStatistics" \
  -d '{"scenarioId":"1"}'
```


### Get Efficient Frontier Statistics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/getEfficientFrontierStatistics" \
  -d '{"scenarioId":"1","timeseriesCode":"example_value","riskFreeRateOptions":"1","entityRiskOptions":"1","statisticsOptions":"1","benchmarkOptions":"1","portfolioOptions":"1","funds":"1","portfolioId":"1","explicitBenchmark":"1"}'
```


### Upsert Extended Property (Insert)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/upsert" \
  -d '{"clientId":"1","code":"example_value","type":"example_value","dataType":"example_value","label":"example_value","description":"example_value","validationRule":"example_value","acceptedValues":"1","group":"example_value","subGroup":"example_value","formatCodeId":"1","cardinality":"example_value"}'
```


### Upsert Extended Property (Update)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/upsert" \
  -d '{"extendedPropertyId":"1","code":"example_value","type":"example_value","dataType":"example_value","label":"example_value","description":"example_value","validationRule":"example_value","acceptedValues":"1","group":"example_value","subGroup":"example_value","formatCodeId":"1","cardinality":"example_value"}'
```


### Get Extended Property

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/get/1"
```


### List Extended Property

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/list"
```


### List Extended Property (query)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/list" \
  -d '{"type":"1","code":"1"}'
```


### Delete Extended Property

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/extendedProperty/delete/1"
```


### List Referenced Datasets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/dataadapters/sample_snowflake_adapter/references/list" \
  -d '{"paging":"1"}'
```



## Documents Endpoints

### Impersonation Sessions Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/sessions/search" \
  -d '{"start":"1","limit":"1","impersonator":"example_value","userName":"example_value","startTimestampRange":"1"}'
```


### Search impersonation

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/impersonation/search" \
  -d '{"userName":"example_value","start":"1","limit":"1"}'
```


### Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplates" \
  -d '{"search":"1"}'
```


### Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplications" \
  -d '{"search":"1"}'
```


### Upsert Document Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertUserDocumentEntitlements" \
  -d '{"userId":"1","documentEntitlementSchemeId":"1","documentEntitlements":"1"}'
```


### Delete Document Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteUserDocumentEntitlements" \
  -d '{"userId":"1","documentEntitlements":"1"}'
```


### List Document Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listUserDocumentEntitlements" \
  -d '{"userId":"1"}'
```


### Upsert Document Entitlement Scheme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocumentEntitlementScheme" \
  -d '{"name":"example_value","tags":"1"}'
```


### List Document Entitlement Schemes

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocumentEntitlementSchemes" \
  -d '{"data":"example_value"}'
```


### Delete Document Entitlement Scheme

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDocumentEntitlementScheme" \
  -d '{"documentEntitleSchemeId":"1"}'
```


### Bulk Add Document Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkAddDocumentEntitlements" \
  -d '{"externalUserIdentifiers":"1","documentEntitlementSchemeName":"example_value","documentEntitlements":"1"}'
```


### Bulk Replace Document Entitlements

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/bulkReplaceDocumentEntitlements" \
  -d '{"externalUserIdentifiers":"1","documentEntitlementSchemeName":"example_value","documentEntitlements":"1"}'
```


### Upsert Document Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocumentEntitlementPreset" \
  -d '{"name":"example_value","code":"example_value","description":"example_value","preset":"1"}'
```


### List Document Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocumentEntitlementPresets" \
  -d '{"data":"example_value"}'
```


### Delete Document Entitlement Preset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDocumentEntitlementPreset" \
  -d '{"code":"example_value"}'
```


### List Saved Searches

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listSavedSearches" \
  -d '{"savedSearchName":"example_value"}'
```


### Upsert Saved Searches

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertSavedSearch" \
  -d '{"savedSearchName":"example_value","notificationFrequency":"example_value","search":"1"}'
```


### Delete Saved Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteSavedSearch" \
  -d '{"savedSearchId":"1"}'
```


### Add Document

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/adddocument"
```


### Search Document

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDocuments" \
  -d '{"type":"example_value","clientCode":"1","search":"1","sort":"1","limit":"1","start":"1","excludeExpired":"1"}'
```


### Search Document with Identifier Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDocuments" \
  -d '{"type":"example_value","clientCode":"1","search":"1","include":"1","identifierSearches":"1","identifierSearchOperator":"example_value","limit":"1","start":"1"}'
```


### Retrieve Document

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocument"
```


### Retrieve Document

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocument" \
  -d '{"clientCode":"example_value"}'
```


### Retrieve Document by File Name

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieve//filename/mybook.pdf"
```


### Add Document via Path

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/adddocument"
```


### Upsert Document (Base64)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDocument" \
  -d '{"clientCode":"example_value","cultureCode":"example_value","title":"example_value","originalname":"example_value","filename":"example_value","meta":"example_value","file":"example_value"}'
```


### Add Doc Meta Type

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDocMetaType" \
  -d '{"code":"example_value","dataType":"example_value","validationRule":"example_value","label":"example_value","description":"example_value","group":"example_value"}'
```


### List Doc Meta Types

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listDocMetaTypes" \
  -d '{"clientCode":"example_value"}'
```


### Retrieve Document Zip Single

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip" \
  -d '{"clientCode":"example_value"}'
```


### Retrieve Document Zip Multiple

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip" \
  -d '{"documentCodes":"1"}'
```


### Retrieve Document Zip Multiple

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentZip"
```


### Retrieve Document Remote Zip

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/retrieveDocumentRemote" \
  -d '{"documentCodes":"1","cookies":"1","rootDomain":"example_value"}'
```


### Add Document No File

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addDocumentNoFile" \
  -d '{"clientCode":"example_value","cultureCode":"example_value","title":"example_value","path":"example_value","meta":"1"}'
```


### Search Document Meta Facets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFacets" \
  -d '{"searchTerm":"example_value"}'
```


### Get Friendly Document URLs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getFriendlyDocumentUrls" \
  -d '{"clientCode":"example_value"}'
```


### Add Shareable Document URL Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Delete Shareable Document URL Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteClientConfiguration" \
  -d '{"code":"example_value"}'
```


### Upsert Shareable Document URL Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertClientConfiguration" \
  -d '{"code":"example_value","config":"1"}'
```


### Search Entity (M*)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity" \
  -d '{"type":"example_value","clientCode":"1","search":"1","include":"1","sort":"1","limit":"1","start":"1"}'
```


### Search Entity (Complex Sort)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchentity" \
  -d '{"type":"example_value","clientCode":"1","search":"1","advancedSort":"1","include":"1","translate":"1","culture":"example_value","originCulture":"example_value","preserveOriginal":"1","limit":"1","start":"1"}'
```


### Search Codes

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchCodes" \
  -d '{"type":"example_value","code":"example_value"}'
```


### Search Entity Fund List

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntityFundlist" \
  -d '{"code":"example_value"}'
```


### Upsert Saved Search Entity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertsavedsearchentity" \
  -d '{"savedSearchEntityKey":"example_value","name":"example_value","description":"example_value","body":"1","inputs":"1"}'
```


### Delete Saved Search Entity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deletesavedsearchentity" \
  -d '{"savedSearchEntityKey":"example_value"}'
```


### List Saved Search Entities

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listsavedsearchentities"
```


### Get Saved Search Entity

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getsavedsearchentity/defaultSearchEntityIsin"
```


### Execute Saved Search Entity

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/savedsearchentity/defaultSearchEntityIsin"
```


### Validate Saved Search Entity

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/validatesavedsearchentity/defaultSearchEntityIsin"
```


### SearchEntity

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchEntity" \
  -d '{"type":"example_value","search":"1","include":"1","applyFormats":"1","disclaimers":"1","start":"1"}'
```


### Search Snapshots

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchSnapshots" \
  -d '{"limit":"1","start":"1","url":"example_value"}'
```


### Get Document

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getDocument"
```


### Update Document Status - JSON Body

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateDocumentStatus" \
  -d '{"accessKey":"example_value","code":"example_value","workflowRunId":"1","status":"example_value","docKey":"example_value","reason":"example_value"}'
```


### Zip Documents

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/zipDocuments" \
  -d '{"code":"example_value","workflowRunId":"1","distributionType":"example_value"}'
```


### Search Revision Configurations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchRevisionConfigurations" \
  -d '{"wordpressInstanceId":"1","siteId":"1","pageFilter":"example_value"}'
```


### Search Domain Mapping

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchDomainMappings" \
  -d '{"unmappedDomain":"example_value"}'
```


### Global Search

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/globalSearch" \
  -d '{"searchTerm":"example_value","wordpressInstanceId":"1","siteId":"1","postType":"example_value","paging":"1"}'
```


### Search Contacts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/searchContacts" \
  -d '{"contactIdentifiers":"1","include":"1","search":"1","sort":"1","start":"1","limit":"1"}'
```



## Studio Endpoints

### Create Application Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateAsset"
```


### Update Application Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplateAsset"
```


### List Application Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationTemplateAssets" \
  -d '{"applicationTemplateCode":"example_value"}'
```


### Delete Application Template Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationTemplateAssets" \
  -d '{"applicationTemplateCode":"example_value","fileNames":"1"}'
```


### Upsert Application Template (Schema Configuration)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate" \
  -d '{"code":"example_value","name":"example_value","description":"example_value","configuration":"1","configurationSchema":"1"}'
```


### Upsert Application Template (Features)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate" \
  -d '{"code":"example_value","name":"example_value","description":"example_value","styles":"1","features":"1"}'
```


### Update Application Template Effective Dates

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/updateApplicationTemplateEffectiveDates" \
  -d '{"code":"example_value","effectiveFrom":"example_value","effectiveTo":"example_value"}'
```


### Upsert Application Template (Array Configuration)

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationTemplate" \
  -d '{"code":"example_value","name":"example_value","description":"example_value","styles":"1","configuration":"1"}'
```


### Create Application Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationAsset"
```


### Update Application Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationAsset"
```


### List Application Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationAssets" \
  -d '{"applicationCode":"example_value"}'
```


### List Application Thumbnails

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationThumbnails"
```


### Retrieve Application Asset

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/RetrieveApplicationAsset" \
  -d '{"applicationCode":"example_value","fileName":"example_value"}'
```


### Delete Application Assets

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationAssets" \
  -d '{"applicationCode":"example_value","fileNames":"1"}'
```


### Application Instance Set password

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/2399fd1c-7439-4c4f-b5c7-ed583267d12b/services/auth/update-password" \
  -d '{"confirmPassword":"example_value","password":"example_value","passwordRequestId":"example_value"}'
```


### Application Instance Request reset password

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/422f9dcb-26c0-4cef-b6bb-80cd8fe3feef/services/auth/password-reset" \
  -d '{"userName":"example_value","password":"example_value"}'
```


### List Application Configuration Versions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationConfigurationVersions" \
  -d '{"applicationCode":"example_value"}'
```


### Get Application Configuration Version

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfigurationVersion" \
  -d '{"applicationConfigurationVersionId":"1"}'
```


### Restore Application Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationConfiguration" \
  -d '{"applicationConfigurationVersionId":"1","comment":"example_value"}'
```


### List Application Configurations

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationConfigurations" \
  -d '{"applicationCode":"example_value"}'
```


### Get Application Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfiguration" \
  -d '{"applicationConfigurationId":"1"}'
```


### Upsert Application Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationConfiguration" \
  -d '{"applicationCode":"example_value","name":"example_value","comment":"example_value","configuration":"1"}'
```


### Delete Application Configuration

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationConfiguration" \
  -d '{"applicationConfigurationId":"1"}'
```


### List Application Style Versions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationStyleVersions" \
  -d '{"applicationCode":"example_value"}'
```


### Get Application Style Version

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationStyleVersion" \
  -d '{"applicationStyleVersionId":"1"}'
```


### Restore Application Style

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/restoreApplicationStyle" \
  -d '{"applicationStyleVersionId":"1","comment":"example_value"}'
```


### List Application Styles

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationStyles" \
  -d '{"applicationCode":"example_value"}'
```


### Get Application Style

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getApplicationConfiguration" \
  -d '{"applicationConfigurationId":"1"}'
```


### Upsert Application Style

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertApplicationStyle" \
  -d '{"applicationCode":"example_value","name":"example_value","comment":"example_value","style":"1"}'
```


### Delete Application Style

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteApplicationStyle" \
  -d '{"applicationStyleId":"1"}'
```


### CSS Application Style

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/style/1234/default.css"
```


### Get Application App Config

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/apps/f88a3d96-a4ae-475d-b6af-da6adf1a2d77/services/getApplicationAppConfig"
```


### Serve Application

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/serveApplication/kurtosysapp"
```


### Serve Application Details

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/serveApplicationDetails/f07eaf0e-1f93-4c40-a907-6140e3e3970c"
```


### List Application Inputs

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listApplicationInputs" \
  -d '{"applicationCode":"example_value"}'
```


### Get Application Filters

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getAplicationFilters" \
  -d '{"filterProperties":"1","search":"1"}'
```


### Application To Svg

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationToSvg" \
  -d '{"width":"1","height":"1","url":"example_value"}'
```


### Application To Pdf

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationToPdf" \
  -d '{"width":"1","height":"1","url":"example_value"}'
```


### Apps Request Strategies

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/"
```


### Upsert Fundmanager - application/json

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertFundmanager" \
  -d '{"code":"example_value","name":"example_value","biography":"1","relatedEntities":"1","headshot":"example_value","headshotContentType":"example_value","extended":"1"}'
```


### Email Workflow - Run Items - Approve

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/email/runitems/123/approve" \
  -d '{"data":"example_value"}'
```


### Add Domain Mapping

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertDomainMappings" \
  -d '{"wordpressMultiDomainId":"1","mappings":"1"}'
```


### Get Application Gallery Addin

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/applicationGalleryAddin"
```


### Apply Efficient Frontier

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/portfolio/applyEfficientFrontier" \
  -d '{"portfolioId":"1","funds":"1"}'
```



## DXM Endpoints

### mTLS login

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/login" \
  -d '{"username":"example_value","password":"example_value","clientName":"example_value"}'
```


### List Domain Whitelist

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/client/domainwhitelist/list" \
  -d '{"clientName":"example_value"}'
```


### Upsert Domain Whitelist

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/client/domainwhitelist/upsert" \
  -d '{"clientName":"example_value","whitelist":"1"}'
```


### Get wordpress domain details

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWordpressDomainDetails" \
  -d '{"domain":"example_value","wordpressInstanceId":"1"}'
```


### Insert site redirect

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/insertRedirect" \
  -d '{"wordpressInstanceId":"1","fromUri":"example_value","toUri":"example_value","ignoreQueryString":"1","permanent":"1"}'
```


### Get list of site redirects

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getRedirects" \
  -d '{"wordpressInstanceId":"1","start":"1","limit":"1","searchTerm":"example_value"}'
```


### Delete site redirect

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteRedirect" \
  -d '{"wordpressInstanceId":"1","wordpressRedirectId":"1"}'
```


### Insert Wildcard Redirect

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWildcardRedirects" \
  -d '{"wordpressInstanceId":"1","redirects":"1"}'
```


### Get instance redirect counts

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getInstanceRedirectCounts" \
  -d '{"wordpressInstanceId":"1"}'
```


### Get wildcard redirects

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getWildcardRedirects" \
  -d '{"wordpressInstanceId":"1"}'
```


### Add Multisite Domain

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/addMultiDomain" \
  -d '{"wordpressInstanceId":"1","type":"example_value","value":"example_value","description":"example_value"}'
```


### Delete Multisite Domain

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/deleteDomain" \
  -d '{"wordpressMultiDomainId":"1","wordpressInstanceId":"1"}'
```


### Get list of instance domains

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/getMultidomainList" \
  -d '{"wordpressInstanceId":"1","start":"1","limit":"1","searchTerm":"example_value"}'
```


### List Revision Subsites

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/listRevisionSubsites" \
  -d '{"wordpressInstanceId":"1"}'
```


### Create Revisions

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createRevisions" \
  -d '{"accessKey":"example_value","clientId":"1","wordpressInstanceId":"1","siteId":"1","siteName":"example_value","pages":"1"}'
```


### Create Revision

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/createRevision" \
  -d '{"wordpressInstanceId":"1","siteId":"1","siteName":"example_value","page":"1"}'
```


### Add Custom Domain Header

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/upsertWordpressHeaders" \
  -d '{"wordpressMultiDomainId":"1","headers":"1"}'
```



## Statistics Endpoints

### Analytics

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/analytics" \
  -d '{"type":"example_value","version":"example_value"}'
```


