# Authentication

Learn how to authenticate with the KSYS API using Bearer tokens.

## Authentication Method

The KSYS API uses **Bearer Token** authentication. All API requests must include a valid access token in the Authorization header.

## Getting Your Token

Contact your system administrator to obtain your API access token. The token should be a UUID string like:

```
44fa36f5-b417-45d3-82c3-d566e4316e94
```

## Using Your Token

Include the token in every API request:

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     "https://api-uk.kurtosys.app/endpoint"
```

## Token Security

- **Never expose your token** in client-side code
- **Store tokens securely** in environment variables
- **Rotate tokens regularly** for security
- **Use HTTPS only** for all API communications

## Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout  
- `GET /auth/status` - Check authentication status
- `POST /auth/refresh` - Refresh access token

## Error Handling

If authentication fails, you'll receive a `401 Unauthorized` response:

```json
{
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

## Two-Factor Authentication

Some endpoints support 2FA. See [Two-Factor Authentication](../categories/management/two-factor.md) for details.
