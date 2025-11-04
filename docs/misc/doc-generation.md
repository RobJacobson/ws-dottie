# OpenAPI Documentation Generation

**Status:** ✅ **Fully Operational** - All 16 APIs generating successfully

This directory contains all OpenAPI-related files for generating human-readable API documentation from the ws-dottie codebase. The system is production-ready and successfully generates comprehensive OpenAPI 3.1 specifications and Redoc HTML documentation for all APIs.

## Current Status

### ✅ System Status: Fully Operational

- **16/16 APIs** generating successfully (100% success rate)
- **98 paths** documented across all APIs
- **55 tags** organizing endpoint groups
- **169 schemas** registered in `components/schemas`
- **97 sample data files** downloaded and cached
- **16 HTML documentation files** generated via Redoc

### Key Achievements

✅ **Schema Registration Fixed** - All schemas properly registered in `components/schemas` with `$ref` references working correctly  
✅ **Real Sample Data** - Actual API responses integrated into code examples  
✅ **Sample Data Caching** - Fast, offline-friendly builds using cached API responses  
✅ **Code Quality** - Clean, maintainable code using functional patterns  
✅ **Shared Schema Support** - Shared schemas (e.g., `RoadwayLocation`) properly deduplicated  
✅ **Proper JSON Formatting** - Examples display as properly formatted JSON with syntax highlighting in Redoc  
✅ **Array Truncation** - Large arrays are intelligently truncated with clear indicators showing omitted items  

## Features

### Array Truncation with Visual Indicators

For array responses with multiple items, the documentation:
- Shows the **first item** in full detail
- Includes a **`_note` field** indicating how many additional items were omitted
- Updates the **example description** to indicate truncation (e.g., "showing first item of 16 total")
- Maintains **valid JSON** structure while clearly indicating truncation

Example:
```json
[
  {
    "MountainPassId": 1,
    "MountainPassName": "Blewett Pass US 97",
    ...
  },
  {
    "_note": "... 15 more items"
  }
]
```

This approach works within JSON's limitations (JSON doesn't support comments) while providing clear visual feedback about truncated arrays.

### Proper JSON Formatting

Examples are stored as actual JavaScript objects/arrays (not strings), which allows:
- **Proper indentation** in the generated YAML
- **Syntax highlighting** in Redoc's rendered HTML
- **Easy copy/paste** of example JSON
- **Valid JSON structure** that can be parsed and validated

## Structure

```
docs/
├── openapi/                   # OpenAPI specifications (generated)
│   └── {api-name}.yaml        # One YAML file per API
├── redoc/                     # HTML documentation (generated)
│   └── {api-name}.html        # One HTML file per API
├── sample-data/               # Local sample cache (git-ignored)
│   └── {api-name}/            # Per-API sample directories
│       └── {function}.json    # Sample response files
└── misc/
    └── doc-generation.md      # This file (current status & usage)

scripts/
├── generate-openapi.ts        # Converts Zod schemas → OpenAPI YAML
├── generate-docs.ts           # Converts OpenAPI YAML → HTML
└── fetch-sample-data.ts       # Fetches and caches API samples
```

## Quick Start

```bash
# Generate both OpenAPI spec and HTML documentation
npm run docs:generate

# Or generate separately
npm run docs:openapi  # Generate OpenAPI YAML only
npm run docs:html     # Generate HTML only (requires OpenAPI spec)
```

## Sample Data Cache

The OpenAPI generator uses sample API responses to populate code examples in the documentation. The sample data cache allows you to pre-fetch and cache these samples locally for faster, deterministic builds.

### How It Works

- **Cache Location**: `docs/sample-data/{api-name}/{endpoint-function}.json`
  - Example: `docs/sample-data/wsf-vessels/getVesselBasics.json`
- **Cache Behavior**: The generator checks for cached samples first, then falls back to live fetch if missing
- **Git Policy**: The `docs/sample-data/` directory is git-ignored and not committed
- **Current Status**: 97 sample files cached (covers all working endpoints)

### Fetching Samples

```bash
# Fetch all samples for all APIs
npm run docs:samples:fetch

# Fetch samples for a specific API
npm run docs:samples:fetch -- --api wsf-vessels

# Fetch a single endpoint sample
npm run docs:samples:fetch -- --endpoint getVesselBasics
```

### Workflow

1. **Initial Setup**: Run `npm run docs:samples:fetch` once to populate the cache
2. **Normal Builds**: `npm run docs:generate` will use cached samples (faster, offline-friendly)
3. **Refresh Samples**: Re-run `npm run docs:samples:fetch` when you want to update samples

### Generator Behavior

The generator logs which source was used for each endpoint:
- `[sample] using cached` - Using cached sample file ✅
- `[sample] missing` - Sample file not found (will throw error - run `npm run docs:samples:fetch` first)

**Note:** The generator requires sample data files to exist. If a sample is missing, generation will fail with a clear error message instructing you to run `npm run docs:samples:fetch`.

### Benefits

- **Faster Builds**: No network latency when samples exist
- **Deterministic**: Same samples produce consistent documentation
- **Offline-Friendly**: Builds work without API access
- **Selective Refresh**: Update specific APIs or endpoints as needed

## Technical Architecture

### Generation Workflow

1. **Sample Data** (Optional but recommended): `npm run docs:samples:fetch`
   - Downloads real API responses for all endpoints
   - Caches samples in `docs/sample-data/{api}/{function}.json`
   - Required before generating OpenAPI specs

2. **OpenAPI Generation**: `npm run docs:openapi`
   - Reads Zod schemas from API definition files
   - Converts to OpenAPI 3.1 format
   - Registers schemas in `components/schemas`
   - Formats sample data for examples:
     - Arrays with multiple items: First item + `_note` truncation indicator
     - Single items: Full object/array as-is
     - Updates example descriptions with truncation info
   - Outputs YAML files to `docs/openapi/`

3. **HTML Generation**: `npm run docs:html`
   - Reads OpenAPI YAML files
   - Generates static HTML via Redoc with custom configuration:
     - Expands 200 responses by default
     - Shows examples before properties
     - Proper JSON syntax highlighting
   - Outputs HTML files to `docs/redoc/`

4. **Combined**: `npm run docs:generate`
   - Runs both OpenAPI and HTML generation steps

### Key Components

- **Schema Registration**: Uses `src/shared/zod-openapi-init.ts` to ensure all schemas have `.openapi()` method
- **Shared Endpoint Discovery**: Uses `API_MODULES` from `src/shared/endpoints.ts` for DRY principle
- **Sample Data Integration**: Reads cached API responses for realistic code examples
- **Schema Deduplication**: Tracks and reuses schemas within each API spec
- **Array Truncation**: Intelligently formats arrays to show first item with truncation indicators

### Dependencies

- `@asteasolutions/zod-to-openapi`: Schema conversion library
- `@redocly/cli`: Redoc HTML generation
- `zod`: Schema validation
- `js-yaml`: YAML serialization

## Documentation

For detailed instructions on OpenAPI and Redoc, see the documentation in the project's documentation directory:
- How OpenAPI and Redoc work
- Understanding the generated files
- Navigating the HTML documentation
- Troubleshooting common issues

## Known Limitations

### JSON Comments

JSON does not support comments (per RFC 7159), which means:
- Redoc cannot display JSON with traditional comment syntax
- Our solution uses a `_note` field as an object property to indicate truncation
- This maintains valid JSON while providing clear visual feedback

This is a fundamental limitation of the JSON format itself, not a limitation of Redoc or our implementation.

## To-Do List

### High Priority

- [ ] **Verify Schema Documentation Completeness**
  - Review generated OpenAPI specs to ensure all schema descriptions are present and meaningful
  - Verify field-level descriptions follow style guide requirements
  - Ensure examples are from actual API responses
  - Check that business context is included appropriately

- [ ] **Verify Endpoint Documentation Quality**
  - Review endpoint descriptions in generated docs
  - Ensure endpoint descriptions meet best practices (15-25 words)
  - Verify resource descriptions (25-75 words) and business context (25-50 words)
  - Update descriptions if needed to align with style guide

### Medium Priority

- [ ] **Schema Deduplication Across APIs**
  - Identify schemas shared across multiple APIs (e.g., `RoadwayLocation` appears in many APIs)
  - Evaluate approaches for creating shared schema definitions
  - Consider creating `shared-schemas.yaml` or using external `$ref` references
  - Implement if worth the complexity reduction

- [ ] **Add Request Examples**
  - Add request examples for endpoints with parameters using OpenAPI `examples` field
  - Use `components/examples` for reusable examples
  - Enhance documentation with concrete request examples

- [ ] **Automated Documentation Generation**
  - Add GitHub Actions workflow for automatic doc generation
  - Auto-generate docs on code changes (push to main/master)
  - Publish generated docs to GitHub Pages or similar hosting
  - Ensure CI fails if documentation generation fails

### Low Priority (Nice to Have)

- [ ] **Input Schema Registration**
  - Evaluate if registering input schemas in `components/schemas` adds value
  - Currently only output schemas are registered
  - Implement if beneficial for documentation completeness

- [ ] **Enhanced Error Documentation**
  - Review API error responses to identify common error scenarios
  - Document error responses (400, 404, 500, etc.) if API provides error information
  - Add error response schemas to OpenAPI specs

- [ ] **Documentation Validation**
  - Add OpenAPI spec validation to CI/CD pipeline
  - Use `@redocly/cli` lint capabilities
  - Ensure all generated specs are valid OpenAPI 3.1

- [ ] **Single Combined Documentation**
  - Evaluate tools for combining multiple OpenAPI specs into one site
  - Consider creating a unified documentation portal
  - May use OpenAPI `$ref` to external specs

- [ ] **Interactive API Testing**
  - Evaluate Swagger UI vs Redoc for interactive testing
  - Generate Swagger UI docs if needed
  - Consider hosting interactive documentation site

## Success Criteria

### ✅ Completed

- [x] All 16 APIs generate successfully
- [x] Schemas registered in `components/schemas` with proper names
- [x] Real sample data integrated into code examples
- [x] Schema descriptions extracted and displayed
- [x] Shared endpoint discovery implemented (using `API_MODULES`)
- [x] Code simplification and maintainability achieved
- [x] Sample data caching system working
- [x] Redoc HTML generation working for all APIs
- [x] Shared Zod initialization implemented (`zod-openapi-init.ts`)
- [x] Proper JSON formatting in examples (not strings with escape characters)
- [x] Array truncation with visual indicators (`_note` field)
- [x] Example descriptions include truncation information

### 🎯 Remaining (Optional Enhancements)

- [ ] Schema deduplication across APIs
- [ ] Request examples in OpenAPI spec
- [ ] Enhanced error documentation
- [ ] Automated CI/CD generation
- [ ] Documentation validation
- [ ] Single combined documentation site
- [ ] Interactive API testing (Swagger UI)

## Notes

- Generated files in `docs/openapi/` and `docs/redoc/` are committed to git for reference, but sample data cache in `docs/sample-data/` is git-ignored.
- Scripts are located in the root `scripts/` directory for consistency with other project scripts.
- Array truncation uses a `_note` field because JSON doesn't support comments. This is a valid JSON structure that clearly communicates truncation to users.

