# API Documentation Format and Structure Recommendations

## Executive Summary

This report analyzes your API documentation needs and provides detailed recommendations for:
1. Documentation format selection (OpenAPI vs alternatives)
2. Code example placement strategy
3. DRY documentation structure
4. MCP server compatibility alignment

Based on analysis of your codebase structure (16 APIs, 95 endpoints, endpoint groups with resourceDescription/businessContext), your existing documentation style guide, and MCP server requirements (hierarchical discovery, context efficiency).

## 1. Documentation Format Analysis

### 1.1 OpenAPI/Swagger: Recommended Primary Format

**Why OpenAPI is Ideal for Your Use Case:**

1. **DRY Components System**: OpenAPI's `components` section perfectly addresses your duplication concerns:
   - Define schemas once (e.g., `BridgeDataGIS`) in `components/schemas`
   - Reference via `$ref` across multiple endpoints
   - Your endpoint groups naturally map to OpenAPI tags/groupings
   - Shared resourceDescription/businessContext can be documented at the tag level

2. **Zod Integration**: Strong ecosystem support:
   - Libraries: `zod-to-openapi`, `@asteasolutions/zod-to-openapi`, `zod-openapi`
   - Can generate OpenAPI from your existing Zod schemas
   - Maintains single source of truth (your Zod schemas)
   - Field-level descriptions from Zod `.describe()` carry through

3. **MCP Server Compatibility**: 
   - OpenAPI can be converted to MCP tool schemas
   - Libraries exist: `openapi-mcp-generator`, `openapi-mcp-server`
   - Your hierarchical structure (API → Endpoint Group → Endpoint) maps cleanly to OpenAPI paths/tags

4. **Human-Readable Output**: Tools generate beautiful docs:
   - Swagger UI: Interactive, try-it-out functionality
   - Redoc: Clean, responsive, navigation-friendly
   - Stoplight Elements: Modern, customizable
   - All support OpenAPI 3.0/3.1

**Structure Mapping:**
```
Your Structure              →  OpenAPI Structure
─────────────────────────────────────────────────
ApiDefinition               →  openapi.info + servers
EndpointGroup               →  tags[] (group-level docs)
  resourceDescription       →  tag.description
  businessContext           →  tag.externalDocs or operation.summary
EndpointDefinition         →  paths[].operations
  inputSchema              →  requestBody/parameters
  outputSchema             →  responses
  endpointDescription      →  operation.description
Zod Schema                 →  components/schemas (via $ref)
```

### 1.2 Alternative Formats Considered

**Markdown (Not Recommended):**
- ❌ No native DRY mechanism (would require template engine)
- ❌ No machine-readable structure for MCP conversion
- ❌ Difficult to maintain consistency across 95 endpoints
- ✅ Human-readable, but requires manual generation

**JSON Schema (Insufficient):**
- ❌ Only describes data structures, not full API contracts
- ❌ No native support for endpoint grouping/business context
- ❌ Missing request/response/parameter definitions

**AsyncAPI (Wrong Domain):**
- ❌ Designed for event-driven/async APIs
- ❌ Your APIs are REST/synchronous

**Conclusion**: OpenAPI is the clear winner for your requirements.

## 2. Code Example Strategy

### 2.1 Recommended Approach: Hybrid Embedded Examples

**Primary Location: OpenAPI `examples` field**
- Store examples in OpenAPI spec using `examples` or `example` fields
- One-line fetch examples as strings in operation `summary` or `description`
- Full request/response examples in `components/examples` (reusable via $ref)

**Secondary Location: Inline Zod Schema Comments**
- Keep minimal examples in Zod `.describe()` calls (already doing this)
- Format: "E.g., 'value' for context" (matches your style guide)

**Why This Works:**
1. **Single Source of Truth**: Examples live in OpenAPI spec, generated from code
2. **DRY**: Use `$ref` to reference shared examples
3. **No Code Bloat**: Examples are metadata, not runtime code
4. **Tooling Support**: Swagger UI/Redoc automatically render examples
5. **MCP Friendly**: Examples included in tool schemas automatically

### 2.2 Example Structure

**In OpenAPI Spec:**
```yaml
paths:
  /getClearancesAsJson:
    get:
      summary: Returns array of BridgeDataGIS objects
      operationId: getBridgeClearances
      tags: [bridge-clearances]
      responses:
        '200':
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BridgeDataGISArray'
              examples:
                default:
                  $ref: '#/components/examples/BridgeClearancesExample'

components:
  examples:
    BridgeClearancesExample:
      summary: Sample bridge clearance data
      value:
        - BridgeNumber: "519/101FTP"
          VerticalClearanceMaximumInches: 171
          Latitude: 47.602165
          # ... full example
```

**Code Example String** (in operation description):

```yaml
description: |
  Returns an array of BridgeDataGIS objects containing vertical clearance data.
  
  **Example Request:**
  ```javascript
  fetch('https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc/getClearancesAsJson')
  ```
```

### 2.3 External Examples (Optional)

For complex integration scenarios:
- Create separate `/docs/examples/` directory
- Link from OpenAPI `externalDocs`
- Keep simple, one-line examples in OpenAPI itself

## 3. DRY Documentation Structure

### 3.1 Component Reuse Strategy

**Level 1: Schema Reuse** (Highest Impact)
- Define each Zod schema once → OpenAPI `components/schemas`
- All endpoints in group reference same schema via `$ref`
- Single `resourceDescription` becomes schema `description`
- Field descriptions from Zod carry through automatically

**Level 2: Response Reuse**
- Define common response patterns:
  ```yaml
  components:
    responses:
      BridgeClearanceArray:
        description: Array of bridge clearance objects
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/BridgeDataGIS'
  ```
- Reference across endpoints: `$ref: '#/components/responses/BridgeClearanceArray'`

**Level 3: Parameter Reuse**
- Shared query parameters (e.g., Route filters) defined once
- Reference via `$ref` in multiple endpoints

**Level 4: Business Context at Tag Level**
- `resourceDescription` → `tags[].description`
- `businessContext` → `tags[].externalDocs.description` or custom extension
- Avoids repeating across all endpoints in group

### 3.2 Endpoint Group → OpenAPI Mapping

**Your Current Structure:**
```typescript
bridgeClearancesGroup: {
  name: "bridge-clearances",
  documentation: {
    resourceDescription: "...",  // Shared across endpoints
    businessContext: "...",       // Shared across endpoints
  },
  endpoints: {
    getBridgeClearances: { ... },
    getBridgeClearancesByRoute: { ... }
  }
}
```

**OpenAPI Structure:**
```yaml
tags:
  - name: bridge-clearances
    description: "Each BridgeDataGIS item represents..." # resourceDescription
    externalDocs:
      description: "Use to check bridge heights..."      # businessContext

paths:
  /getClearancesAsJson:
    get:
      tags: [bridge-clearances]  # Links to tag-level docs
      summary: "Returns array of BridgeDataGIS objects"
      # endpointDescription
```

**Result**: Zero duplication - shared context defined once at tag level.

### 3.3 Example Calculation

**Current Duplication (Without OpenAPI):**
- 2 endpoints × resourceDescription (50 words) = 100 words duplicated
- 2 endpoints × businessContext (40 words) = 80 words duplicated
- Schema definition duplicated in each endpoint doc
- **Total**: ~180 words of duplication per endpoint group

**With OpenAPI Components:**
- resourceDescription: 1 × 50 words (tag level)
- businessContext: 1 × 40 words (tag level)
- Schema: 1 definition, referenced 2× via $ref
- **Total**: 0 words duplicated, ~50% reduction in doc size

## 4. MCP Server Alignment

### 4.1 OpenAPI → MCP Conversion Strategy

**Existing Tools:**
- `openapi-mcp-generator`: Generates MCP servers from OpenAPI specs
- `openapi-mcp-server`: MCP server that serves OpenAPI specs
- Your hierarchical discovery PRD aligns with OpenAPI tag structure

**Conversion Mapping:**
```
OpenAPI Structure           →  MCP Tool Structure
───────────────────────────────────────────────────
tags[] (endpoint groups)   →  Domain tools (Tier 1)
paths[] (endpoints)        →  Capability tools (Tier 2)
components/schemas         →  Tool input/output schemas
operation.description      →  Tool description
operation.summary          →  Tool name
```

### 4.2 Supporting Your MCP Discovery PRD

**Tag-Level Grouping = Domain Discovery:**
- OpenAPI `tags` naturally group endpoints
- Tag description = your `resourceDescription`
- Perfect for Tier 1 domain tools

**Progressive Disclosure:**
- MCP tools can return tag lists when no specific operation requested
- Full schemas provided just-in-time (Tier 3)
- OpenAPI structure supports this natively

**Context Efficiency:**
- OpenAPI's `$ref` system reduces payload size
- Tag-level docs prevent repetition
- Schema reuse minimizes character count

### 4.3 Implementation Path

1. **Generate OpenAPI from Zod** (automated)
2. **Generate MCP tools from OpenAPI** (automated)
3. **Single source of truth**: Your TypeScript endpoint definitions
4. **Human docs**: Swagger UI/Redoc from OpenAPI
5. **MCP docs**: Auto-generated from same OpenAPI

## 5. Implementation Recommendations

### 5.1 Recommended Toolchain

**Core Libraries:**
1. `@asteasolutions/zod-to-openapi` - Zod → OpenAPI conversion
   - Best TypeScript support
   - Preserves Zod descriptions
   - Handles complex types well

2. `redoc-cli` or `@redocly/cli` - Documentation generation
   - Redoc: Clean, readable, optimized for reference documentation
   - Better performance with large API specs (95 endpoints)
   - Superior customization via redocly.yaml
   - Built-in code example support (x-codeSamples)

3. `openapi-mcp-generator` - MCP server generation
   - Converts OpenAPI to MCP tool definitions
   - Supports your hierarchical structure

**Workflow:**
```
TypeScript Endpoints (Zod schemas)
    ↓ (zod-to-openapi)
OpenAPI 3.1 Spec
    ↓                    ↓
Redoc              MCP Server
(Human docs)       (AI agent docs)
```

### 5.2 File Structure Recommendation

```
src/apis/
  [api-name]/
    [endpoint-group]/
      [endpoint-group].endpoints.ts  # Your current structure
      [endpoint-group].input.ts
      [endpoint-group].output.ts

docs/
  openapi/
    wsdot-bridge-clearances.yaml     # Generated OpenAPI spec
    wsf-vessels.yaml
    # ... one per API
  redocly.yaml                       # Redoc theme configuration

  generated/
    redoc/                           # Generated Redoc HTML docs
    mcp-tools/                       # Generated MCP tool definitions

scripts/
  generate-openapi.ts               # Zod → OpenAPI generator
  generate-docs.ts                  # OpenAPI → Redoc HTML
  generate-mcp.ts                   # OpenAPI → MCP tools
```

### 5.3 Generation Strategy

**Option A: Build-Time Generation** (Recommended)
- Run `generate-openapi.ts` during build
- Commit generated OpenAPI specs (version controlled)
- Deploy static Redoc HTML docs
- Generate MCP tools at runtime from OpenAPI

**Option B: Runtime Generation**
- Generate OpenAPI on-demand from Zod schemas
- Cache generated specs
- More dynamic but less performant

**Recommendation**: Option A for consistency and performance.

## 6. Specific Recommendations Summary

### Format: OpenAPI 3.1 ✅
- Best DRY support via components
- Strong MCP conversion tools
- Excellent human-readable output
- Zod integration available

### Code Examples: In OpenAPI Spec ✅
- Use `components/examples` for reusable examples
- One-line fetch in operation descriptions
- Generated from `sampleParams` in your endpoints
- No code bloat (metadata only)

### DRY Structure: Component Reuse ✅
- Schemas: `components/schemas` with `$ref`
- Responses: `components/responses` with `$ref`
- Business context: Tag-level descriptions
- ~50% reduction in documentation size

### MCP Alignment: Direct Conversion ✅
- OpenAPI tags → MCP domain tools
- OpenAPI paths → MCP capability tools
- Supports your hierarchical discovery PRD
- Context-efficient via component reuse

## 7. Next Steps

1. **Proof of Concept**: Convert one endpoint group (bridge-clearances) to OpenAPI
2. **Evaluate Tools**: Test `zod-to-openapi` with your Zod schemas
3. **Generate Docs**: Create Redoc HTML for human review
4. **Test MCP**: Generate MCP tools and validate hierarchical discovery
5. **Scale**: Roll out to all 16 APIs incrementally

This approach provides maximum DRY compliance, excellent human readability, and perfect MCP server alignment while maintaining your existing codebase structure as the single source of truth.

