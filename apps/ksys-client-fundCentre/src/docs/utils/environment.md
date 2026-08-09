# Environment Variables

Complete list of environment variables used by the KSYS API.

## Required Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `protocol` | API protocol | `https` |
| `udhost` | API host domain | `api-uk.kurtosys.app` |
| `token` | Access token | `44fa36f5-b417-45d3-82c3-d566e4316e94` |

## Path Prefix Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `auth` | Authentication path | `/auth` |
| `config` | Configuration path | `/config` |
| `fund` | Fund data path | `/fund` |
| `dataloader` | Data loader path | `/dataloader` |
| `docloader` | Document loader path | `/docloader` |
| `documents` | Documents path | `/documents` |
| `applicationManager` | App manager path | `/applicationManager` |
| `layout` | Layout path | `/layout` |
| `websites` | Websites path | `/websites` |

## Environment Configuration Examples

### Development
```env
KSYS_PROTOCOL=https
KSYS_HOST=api-dev.kurtosys.app
KSYS_TOKEN=dev-token-here
KSYS_AUTH_PATH=/auth
KSYS_CONFIG_PATH=/config
```

### Staging
```env
KSYS_PROTOCOL=https
KSYS_HOST=api-staging.kurtosys.app
KSYS_TOKEN=staging-token-here
KSYS_AUTH_PATH=/auth
KSYS_CONFIG_PATH=/config
```

### Production
```env
KSYS_PROTOCOL=https
KSYS_HOST=api-uk.kurtosys.app
KSYS_TOKEN=production-token-here
KSYS_AUTH_PATH=/auth
KSYS_CONFIG_PATH=/config
```

## Usage in Code

### JavaScript/Node.js
```javascript
const config = {
  protocol: process.env.KSYS_PROTOCOL || 'https',
  host: process.env.KSYS_HOST || 'api-uk.kurtosys.app',
  token: process.env.KSYS_TOKEN,
  paths: {
    auth: process.env.KSYS_AUTH_PATH || '/auth',
    config: process.env.KSYS_CONFIG_PATH || '/config',
    fund: process.env.KSYS_FUND_PATH || '/fund'
  }
};
```

### Python
```python
import os

config = {
    'protocol': os.getenv('KSYS_PROTOCOL', 'https'),
    'host': os.getenv('KSYS_HOST', 'api-uk.kurtosys.app'),
    'token': os.getenv('KSYS_TOKEN'),
    'paths': {
        'auth': os.getenv('KSYS_AUTH_PATH', '/auth'),
        'config': os.getenv('KSYS_CONFIG_PATH', '/config'),
        'fund': os.getenv('KSYS_FUND_PATH', '/fund')
    }
}
```

### Bash
```bash
#!/bin/bash

PROTOCOL=${KSYS_PROTOCOL:-https}
HOST=${KSYS_HOST:-api-uk.kurtosys.app}
TOKEN=${KSYS_TOKEN}
AUTH_PATH=${KSYS_AUTH_PATH:-/auth}

curl -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     "$PROTOCOL://$HOST$AUTH_PATH/status"
```
