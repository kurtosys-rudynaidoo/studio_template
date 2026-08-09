# Statistics

Analytics and statistical data

## Endpoints

### Analytics

**Method:** `POST`  
**Path:** `/analytics`  
**Description:** Analytics

#### Parameters
**Body Parameters:**
- `type` (string) **Required** - Body parameter: type
- `version` (string) **Required** - Body parameter: version

#### Response
**201:** Resource created successfully

#### Example Request
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api-uk.kurtosys.app/analytics"
```

---

## Quick Reference

| Endpoint | Method | Path | Description |
|----------|--------|------|-------------|
| Analytics | `POST` | `/analytics` | Analytics |
