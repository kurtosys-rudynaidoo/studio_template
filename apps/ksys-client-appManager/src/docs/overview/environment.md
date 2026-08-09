# Environment Configuration

Understanding and configuring environment variables for the KSYS API.

## Default Environment Variables

The KSYS API uses several environment variables for configuration:

| Variable | Default Value | Description |
|----------|---------------|-------------|
| `protocol` | `https` | API protocol |
| `udhost` | `api-uk.kurtosys.app` | API host domain |
| `token` | `44fa36f5-b417-45d3-82c3-d566e4316e94` | Access token |
| `auth` | `/auth` | Authentication path prefix |
| `config` | `/config` | Configuration path prefix |
| `fund` | `/fund` | Fund data path prefix |
| `dataloader` | `/dataloader` | Data loader path prefix |
| `docloader` | `/docloader` | Document loader path prefix |
| `documents` | `/documents` | Documents path prefix |
| `applicationManager` | `/applicationManager` | App manager path prefix |
| `layout` | `/layout` | Layout path prefix |
| `websites` | `/websites` | Websites path prefix |

## Configuration Methods

### 1. Environment Variables

Set system environment variables:

```bash
export KSYS_PROTOCOL=https
export KSYS_HOST=api-uk.kurtosys.app
export KSYS_TOKEN=your-token-here
```

### 2. Configuration File

Create a `.env` file in your project:

```env
KSYS_PROTOCOL=https
KSYS_HOST=api-uk.kurtosys.app
KSYS_TOKEN=your-token-here
KSYS_AUTH_PATH=/auth
KSYS_CONFIG_PATH=/config
```

### 3. Runtime Configuration

Configure variables at runtime in your application:

```javascript
const config = {
  protocol: 'https',
  host: 'api-uk.kurtosys.app',
  token: 'your-token-here',
  paths: {
    auth: '/auth',
    config: '/config',
    fund: '/fund'
  }
};
```

## Base URL Construction

The base URL is constructed as: `{protocol}://{udhost}`

Example: `https://api-uk.kurtosys.app`

## Path Prefixes

API endpoints use path prefixes for organization:

- Authentication endpoints: `{baseUrl}{auth}/...`
- Configuration endpoints: `{baseUrl}{config}/...`
- Fund data endpoints: `{baseUrl}{fund}/...`

## Environment-Specific Configuration

### Development
```env
KSYS_HOST=api-dev.kurtosys.app
KSYS_TOKEN=dev-token-here
```

### Staging
```env
KSYS_HOST=api-staging.kurtosys.app
KSYS_TOKEN=staging-token-here
```

### Production
```env
KSYS_HOST=api-uk.kurtosys.app
KSYS_TOKEN=production-token-here
```

## Security Best Practices

1. **Never commit tokens** to version control
2. **Use environment-specific tokens**
3. **Rotate tokens regularly**
4. **Use HTTPS in production**
5. **Validate all environment variables** at startup

## Troubleshooting

### Common Issues

- **Invalid token**: Check token format and expiration
- **Wrong host**: Verify environment-specific host URLs
- **Missing variables**: Ensure all required variables are set
- **Protocol mismatch**: Use HTTPS for production environments
