# Postman Collection

Instructions for importing and using the KSYS API Postman collection.

## Import Collection

1. **Download**: The collection file `KurtosysApp.postman_collection.json` is included in this project
2. **Import**: Open Postman and click "Import"
3. **Select File**: Choose the `KurtosysApp.postman_collection.json` file
4. **Import**: Click "Import" to add the collection

## Import Environment

1. **Download**: The environment file `KSYS - PROD-STG (UK).postman_environment.json` is included
2. **Import**: In Postman, click the gear icon (⚙️) next to "Environments"
3. **Import**: Click "Import" and select the environment file
4. **Select**: Choose the imported environment from the dropdown

## Environment Variables

The imported environment includes these variables:

- `protocol`: `https`
- `udhost`: `api-uk.kurtosys.app`
- `token`: `44fa36f5-b417-45d3-82c3-d566e4316e94`
- `auth`: `/auth`
- `config`: `/config`
- `fund`: `/fund`
- `dataloader`: `/dataloader`
- `docloader`: `/docloader`
- `documents`: `/documents`
- `applicationManager`: `/applicationManager`
- `layout`: `/layout`
- `websites`: `/websites`

## Using the Collection

1. **Select Environment**: Choose "KSYS - PROD/STG (UK)" from the environment dropdown
2. **Update Token**: Replace the token value with your actual access token
3. **Run Requests**: Click on any request to test the API
4. **View Examples**: Each request includes example parameters and responses

## Collection Structure

The collection is organized by API categories:

- **Management**: Authentication, user management, roles, permissions
- **Data**: Properties, segmentation, data loading, search
- **Documents**: Document loading, metadata, production
- **Studio**: Applications, app manager
- **DXM**: Multi-domain, redirects, revisions, content
- **Statistics**: Analytics and reporting

## Tips

- **Test Authentication**: Start with authentication endpoints to verify your token
- **Use Variables**: All URLs use environment variables for easy switching between environments
- **Check Responses**: Review response examples to understand data structures
- **Save Examples**: Save successful requests as examples for future reference
