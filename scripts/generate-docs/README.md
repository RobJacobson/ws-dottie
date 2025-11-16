# OpenAPI Documentation Generation

This directory contains scripts for generating OpenAPI specifications and HTML documentation from the ws-dottie API definitions.

## Scripts

### generate-openapi.ts

Generates OpenAPI 3.0 specifications from all API definitions. This script:

- Converts Zod schemas to OpenAPI format
- Generates complete OpenAPI specifications for all APIs
- Includes enhanced tag metadata (x-description, x-cacheStrategy, x-useCases, x-updateFrequency)
- Saves specifications as YAML files in `docs/generated/openapi/`

Usage:
```bash
npm run docs:openapi
```

### generate-docs.ts

Generates HTML documentation from OpenAPI specifications using Redoc. This script:

- Uses @redocly/cli to generate static HTML documentation
- Applies custom Redoc theme configuration
- Post-processes generated HTML to enhance tag documentation
- Saves HTML files in `docs/api-reference/`

Usage:
```bash
npm run docs:html
```

### post-process-html.ts

Post-processes generated HTML documentation to enhance tag documentation display. This script:

- Injects custom CSS styles for enhanced tag documentation
- Adds JavaScript to enhance tag descriptions with use cases and metadata
- Displays cache strategies and update frequencies
- Provides a better user experience for API documentation

Usage:
```bash
npx tsx scripts/generate-docs/post-process-html.ts path/to/html/file.html
```

## Enhanced Tag Documentation

The generated HTML documentation includes enhanced tag documentation with:

- **Extended Descriptions**: Additional context and information about API endpoints
- **Use Cases**: Common use cases for the API endpoints
- **Cache Strategies**: Information about caching mechanisms
- **Update Frequencies**: How often the data is updated

These enhancements provide a richer documentation experience for developers consuming the APIs.

## Custom Styling

The enhanced documentation includes custom CSS styling for:

- Tag description boxes with left border
- Styled use case lists
- Metadata badges for cache strategies and update frequencies
- Consistent color scheme and typography

## Process Flow

1. Run `npm run docs:openapi` to generate OpenAPI specifications
2. Run `npm run docs:html` to generate HTML documentation
3. The HTML documentation is automatically post-processed to enhance tag documentation
4. View the enhanced documentation in `docs/api-reference/`

## Combined Command

For convenience, you can generate both OpenAPI specs and HTML documentation with:

```bash
npm run docs:generate
```
