# KSYS API Split Documentation

This package contains the KSYS API documentation split into smaller, AI-friendly files following the structure inspired by [Base UI's documentation](https://base-ui.com/llms.txt).

## Structure

```
KSYS-API-Split-Docs/
├── KSYS-API-Docs.md          # Master documentation file with links
├── overview/                  # Getting started and overview files
│   ├── quick-start.md        # Quick start guide
│   ├── authentication.md     # Authentication details
│   ├── environment.md        # Environment configuration
│   └── about.md             # API overview and capabilities
├── categories/               # Category-specific documentation
│   ├── management/           # User management, auth, roles
│   ├── data/                # Properties, segmentation, data loading
│   ├── documents/           # Document processing and management
│   ├── studio/              # Studio applications
│   ├── dxm/                 # Digital experience management
│   └── statistics/          # Analytics and reporting
├── reference/               # Complete API reference
│   └── endpoints.md         # All 626 endpoints listed
└── utils/                   # Utilities and examples
    ├── curl-examples.md     # Ready-to-use CURL commands
    ├── environment.md       # Environment variables guide
    └── postman.md           # Postman collection instructions
```

## Benefits for AI Consumption

### 1. **Focused Content**
- Each file contains specific, relevant information
- AI can load only the sections it needs
- Reduces token usage and improves response quality

### 2. **Clear Navigation**
- Master file provides overview and links
- Hierarchical structure makes it easy to find information
- Consistent naming conventions

### 3. **Comprehensive Coverage**
- **626 endpoints** across 6 categories
- **Complete examples** for every endpoint
- **Environment configuration** details
- **Ready-to-use CURL commands**

### 4. **Easy Integration**
- Markdown format for easy parsing
- Consistent structure across all files
- Self-contained files with clear boundaries

## Usage Examples

### For AI Systems
```markdown
# Load specific category
Read: categories/management/README.md

# Get quick start info
Read: overview/quick-start.md

# Find specific endpoint
Search: reference/endpoints.md for "authentication"

# Get CURL examples
Read: utils/curl-examples.md
```

### For Developers
1. **Start with**: `KSYS-API-Docs.md` for overview
2. **Configure**: `overview/environment.md` for setup
3. **Browse**: `categories/` for specific functionality
4. **Reference**: `reference/endpoints.md` for complete list
5. **Test**: `utils/curl-examples.md` for examples

## File Sizes

- **Master file**: ~2KB (navigation only)
- **Category files**: 50-200KB each (focused content)
- **Reference file**: ~100KB (complete endpoint list)
- **Utility files**: 20-50KB each (examples and guides)

## Total Package Size
- **Compressed**: ~500KB
- **Uncompressed**: ~2MB
- **Files**: 15+ markdown files

## API Statistics
- **626 Total Endpoints**
- **6 Main Categories**
- **Complete CURL Examples**
- **Environment Configuration**
- **Postman Collection Included**

This structure makes the KSYS API documentation much more accessible for both AI systems and human developers, following modern documentation best practices.
