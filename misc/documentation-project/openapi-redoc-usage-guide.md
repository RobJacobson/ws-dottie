# OpenAPI and Redoc Usage Guide

## What is OpenAPI?

**OpenAPI** (formerly known as Swagger) is a specification format for describing REST APIs. Think of it as a "blueprint" for your API that:

- Describes all endpoints, parameters, and responses
- Is machine-readable (YAML/JSON format)
- Can be used to generate documentation, client libraries, and server stubs
- Provides a single source of truth for your API structure

**Key Concept**: OpenAPI is like a contract that says "Here's what my API does, what parameters it accepts, and what it returns."

## What is Redoc?

**Redoc** is a tool that reads OpenAPI specifications and generates beautiful, interactive HTML documentation. It:

- Takes your OpenAPI YAML file as input
- Generates a self-contained HTML file
- Creates a clean, three-panel interface (sidebar navigation, documentation content, code examples)
- Is optimized for reading and understanding APIs (not for testing them)

**Key Concept**: Redoc is like a "documentation renderer" - it takes your API blueprint and makes it human-readable.

## Directory Structure

All OpenAPI-related files are consolidated in the `openapi-docs/` folder:

```
openapi-docs/
├── scripts/
│   ├── generate-openapi.ts    # Generates OpenAPI YAML from TypeScript code
│   └── generate-docs.ts        # Generates HTML from OpenAPI YAML
├── generated/
│   ├── openapi/
│   │   └── wsf-vessels.yaml    # Generated OpenAPI specification
│   └── redoc/
│       └── wsf-vessels.html    # Generated HTML documentation
└── openapi-redoc-usage-guide.md # This file
```

## How Our Implementation Works

### Step-by-Step Process

```
┌─────────────────────────────────────────┐
│ 1. Your TypeScript Code                 │
│    (Zod schemas + endpoint definitions)  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 2. openapi-docs/scripts/                │
│    generate-openapi.ts                   │
│    - Reads wsf-vessels API definition    │
│    - Converts Zod schemas → OpenAPI     │
│    - Generates code examples            │
│    - Outputs: wsf-vessels.yaml          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 3. OpenAPI Specification (YAML)         │
│    - openapi-docs/generated/openapi/    │
│      wsf-vessels.yaml                   │
│    - Machine-readable API description   │
│    - Can be used by other tools         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 4. openapi-docs/scripts/                │
│    generate-docs.ts                     │
│    - Reads OpenAPI YAML                 │
│    - Uses Redoc to generate HTML        │
│    - Outputs: wsf-vessels.html          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 5. HTML Documentation                   │
│    - openapi-docs/generated/redoc/     │
│      wsf-vessels.html                   │
│    - Open in browser to view            │
│    - Self-contained, no server needed   │
└─────────────────────────────────────────┘
```

## Practical Usage Guide

### Step 1: Generate the Documentation

Open your terminal in the project root and run:

```bash
npm run docs:generate
```

**What happens:**
1. `openapi-docs/scripts/generate-openapi.ts` reads your `wsf-vessels` API code
2. Converts all Zod schemas to OpenAPI format
3. Creates `openapi-docs/generated/openapi/wsf-vessels.yaml`
4. `openapi-docs/scripts/generate-docs.ts` reads the YAML file
5. Redoc generates `openapi-docs/generated/redoc/wsf-vessels.html`

**You'll see output like:**
```
Generating OpenAPI specification for wsf-vessels API...
✓ OpenAPI spec generated: openapi-docs/generated/openapi/wsf-vessels.yaml
  - 13 paths
  - 7 tags
  - 0 schemas

Generating Redoc HTML documentation...
✓ Redoc HTML generated: openapi-docs/generated/redoc/wsf-vessels.html
  Open openapi-docs/generated/redoc/wsf-vessels.html in your browser to view the documentation.
```

### Step 2: View the Documentation

**Option A: Open the HTML file directly**
```bash
# On Linux/Mac
open openapi-docs/generated/redoc/wsf-vessels.html

# Or just double-click the file in your file manager
```

**Option B: Use a simple HTTP server** (if direct opening doesn't work)
```bash
# Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000/openapi-docs/generated/redoc/wsf-vessels.html
```

### Step 3: Navigate the Documentation

When you open the HTML file, you'll see:

**Left Sidebar:**
- List of all endpoint groups (tags)
- Click any group to see its endpoints
- Click any endpoint to see details

**Center Panel:**
- Endpoint description
- Request parameters (if any)
- Response schema
- Code examples

**Right Panel:**
- Schema details
- Example responses

## Understanding the Generated Files

### OpenAPI YAML File (`openapi-docs/generated/openapi/wsf-vessels.yaml`)

This is the machine-readable specification. It's structured like this:

```yaml
openapi: 3.1.0
info:
  title: WSF Vessels API
  version: 1.0.0

tags:
  - name: vessel-basics
    description: "Each VesselBasic item represents..."

paths:
  /vesselBasics:
    get:
      operationId: getVesselBasics
      summary: "Returns multiple VesselBasic objects..."
      tags: [vessel-basics]
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/VesselBasic'
```

**What you can do with this file:**
- Import into API testing tools (Postman, Insomnia)
- Generate client libraries for other languages
- Validate API responses
- Use as a contract for API consumers

### HTML File (`openapi-docs/generated/redoc/wsf-vessels.html`)

This is the human-readable documentation. It's a single HTML file that contains:
- All the documentation content
- Navigation sidebar
- Styling and interactive features
- No external dependencies (works offline!)

**Advantages:**
- Easy to share (just send the HTML file)
- Works offline
- No server setup needed
- Professional appearance

## When to Regenerate Documentation

**Regenerate when:**
- You add new endpoints
- You modify endpoint parameters
- You change schema descriptions
- You update `sampleParams`
- You modify `resourceDescription` or `businessContext`

**How to regenerate:**
```bash
npm run docs:generate
```

The old files are overwritten with new versions.

## Using Individual Scripts

You can also run the scripts separately:

```bash
# Generate only the OpenAPI spec
npm run docs:openapi

# Generate only the HTML (requires OpenAPI spec to exist)
npm run docs:html
```

**Why separate scripts?**
- Faster iteration if you're only modifying the HTML generation
- Debugging - you can check the YAML before generating HTML
- Integration - other tools might use the YAML directly

## Understanding the OpenAPI Specification

### Key Sections

**1. Info Section**
```yaml
info:
  title: WSF Vessels API
  version: 1.0.0
  description: "Washington State Ferries vessel information API"
```
- Basic API information
- Appears at the top of the documentation

**2. Servers Section**
```yaml
servers:
  - url: https://www.wsdot.wa.gov/ferries/api/vessels/rest
    description: Production server
```
- Base URL for API calls
- Used in code examples

**3. Tags Section**
```yaml
tags:
  - name: vessel-basics
    description: "Each VesselBasic item represents..."
```
- Groups related endpoints
- Maps to your `EndpointGroup` structure
- Shows in sidebar navigation

**4. Paths Section**
```yaml
paths:
  /vesselBasics:
    get:
      operationId: getVesselBasics
      summary: "Returns multiple VesselBasic objects..."
      parameters: [...]
      responses:
        200: {...}
```
- Each endpoint with its HTTP method
- Parameters, responses, examples
- Maps to your `EndpointDefinition` structure

**5. Components Section**
```yaml
components:
  schemas:
    VesselBasic:
      type: object
      properties: {...}
```
- Reusable schemas (DRY principle)
- Referenced via `$ref` in paths

## Understanding Redoc Output

### Three-Panel Layout

**Left Panel (Sidebar):**
- API title
- List of endpoint groups
- Endpoint list under each group
- Search functionality (if enabled)

**Center Panel (Content):**
- Endpoint name and description
- HTTP method and path
- Request parameters with descriptions
- Response schema
- Code examples

**Right Panel (Schema Details):**
- Expanded schema properties
- Field descriptions
- Type information
- Example values

### Navigation

1. **Click a tag** in the sidebar → Shows all endpoints in that group
2. **Click an endpoint** → Shows full details
3. **Click schema names** → Shows schema structure
4. **Scroll** → All content is on one page (no page reloads)

## Common Use Cases

### 1. Sharing API Documentation

**With developers:**
- Send them the HTML file
- Or host it on a web server
- They can see all endpoints, parameters, and examples

**With non-developers:**
- Show them the HTML documentation
- They can understand what the API does
- See example responses

### 2. API Integration Planning

**Before integrating:**
- Review the HTML documentation
- Understand available endpoints
- See what parameters are needed
- Check example responses

**During integration:**
- Reference parameter descriptions
- Use code examples as starting points
- Validate responses against schemas

### 3. API Validation

**With the OpenAPI YAML:**
- Import into Postman/Insomnia for testing
- Validate API responses match schemas
- Generate test cases

### 4. Client Library Generation

**Using OpenAPI tools:**
- Generate TypeScript/JavaScript clients
- Generate Python clients
- Generate other language clients
- All from the same YAML file

## Troubleshooting

### Problem: "OpenAPI spec not found"

**Solution:**
```bash
npm run docs:openapi  # Generate the spec first
npm run docs:html     # Then generate HTML
```

### Problem: HTML file doesn't open properly

**Solution:**
- Use a simple HTTP server (see Step 2 above)
- Some browsers block local file access for security

### Problem: Parameters missing descriptions

**Cause:** Field schemas might not have `.describe()` calls

**Solution:** Check your Zod schema files - ensure all fields have descriptions

### Problem: Schema compatibility warnings

**About:** Warnings like "Incompatible types in allOf"

**Impact:** Non-critical - documentation still generates correctly

**Fix:** These are from how zod-to-openapi handles schema extensions - can be ignored for now

## Best Practices

### 1. Keep Schemas Updated

When you update Zod schemas:
- Run `npm run docs:generate` to update documentation
- Commit both code and documentation changes together

### 2. Review Generated Documentation

After generating:
- Open the HTML file
- Check that descriptions are clear
- Verify code examples are correct
- Ensure all endpoints are documented

### 3. Use Descriptive Names

In your endpoint definitions:
- Clear `endpointDescription` values
- Detailed `resourceDescription` and `businessContext`
- Helpful field descriptions in Zod schemas

### 4. Keep Examples Current

Update `sampleParams` when:
- Endpoint parameters change
- Example values become outdated
- New parameters are added

## Next Steps

Now that you understand the basics:

1. **Try it yourself:**
   ```bash
   npm run docs:generate
   open openapi-docs/generated/redoc/wsf-vessels.html
   ```

2. **Explore the documentation:**
   - Click through different endpoint groups
   - Read the descriptions
   - Look at code examples
   - Check schema details

3. **Modify and regenerate:**
   - Update a description in your code
   - Regenerate the docs
   - See the changes reflected

4. **Share with others:**
   - Send the HTML file to team members
   - Get feedback on clarity
   - Iterate based on feedback

## Summary

- **OpenAPI** = Machine-readable API specification (YAML format)
- **Redoc** = Tool that generates beautiful HTML from OpenAPI specs
- **Our scripts** = Automatically convert your TypeScript/Zod code → OpenAPI → HTML
- **Workflow** = Code changes → Run `npm run docs:generate` → View HTML file

The documentation is now automatically generated from your code, keeping it always in sync!

