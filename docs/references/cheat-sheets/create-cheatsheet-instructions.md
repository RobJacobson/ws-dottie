# Cheat Sheet Creation Instructions

This document provides step-by-step instructions for creating API cheat sheets similar to the WSF Vessels cheat sheet. Follow these instructions to create comprehensive cheat sheets for other APIs in the project.

## Prerequisites

1. Ensure you have access to the API's `endpoints.ts` file
2. Have the `fetch-dottie` CLI tool available for data fetching
3. Understand the API's structure and return types

## Step 1: Analyze the API Structure

### 1.1 Read the endpoints.ts file
```bash
# Navigate to the API directory
cd src/apis/[api-name]/

# Read the endpoints file
cat endpoints.ts
```

### 1.2 Identify Return Types
Group the endpoints by their return types (output schemas). Look for patterns in the `outputSchema` field:
- Single items vs arrays
- Different response schemas
- Common groupings

### 1.3 Document the API Overview
Create a brief description of what the API provides and its purpose.

## Step 2: Create the Return Types and Endpoints Table

### 2.1 Create the Table Structure
Create a markdown table with these columns:
- **Return Type**: The base response type (e.g., `CacheFlushDate`, `VesselAccommodations`)
- **Endpoints**: List all endpoint paths that return this type
- **Example Reference**: Links to examples (e.g., `[Example 1](#example-1)`)
- **Notes**: Brief description of what this endpoint type provides

### 2.2 Populate the Table
For each return type:
1. **Endpoints column**: List all endpoint paths, separated by `<br/>` tags
2. **Example Reference**: Create anchor links to examples you'll create
3. **Notes**: Write concise descriptions of what each endpoint type returns

### 2.3 Example Table Structure
```markdown
| Return Type | Endpoints | Example Reference | Notes |
|-------------|-----------|-------------------|-------|
| TypeA | `/endpoint1`<br/>`/endpoint1/{id}` | [Example 1](#example-1) | Description of TypeA |
| TypeB | `/endpoint2` | [Example 2](#example-2) | Description of TypeB |
```

## Step 3: Create Examples Section

### 3.1 Create Example Headers
For each return type, create a section with:
- Anchor ID for linking
- Descriptive title

```markdown
### TypeA Example {#example-1}
```

### 3.2 Add fetchDottie Code Blocks
Before each JSON example, add a TypeScript code block showing how to fetch the data:

```typescript
const data = await fetchDottie({
  endpoint: functionName,
  params: { /* parameters if needed */ },
});
```

**Important Notes:**
- Do NOT wrap the `endpoint` field in quotes
- Only include `params` if the endpoint accepts parameters
- Use the exact function names from the endpoints.ts file
- Use the `sampleParams` values from the endpoints.ts file

### 3.3 Fetch Real Data
Use the `fetch-dottie` CLI to get actual data:

```bash
# For endpoints without parameters
npx fetch-dottie functionName --no-validation --pretty

# For endpoints with parameters (use sampleParams)
npx fetch-dottie functionName '{"param1": "value1", "param2": "value2"}' --no-validation --pretty
```

**Data Selection Guidelines:**
- For array endpoints: Select the first object with meaningful, non-null data
- For single-item endpoints: Use the returned data directly
- Prefer objects that demonstrate the full structure of the response

### 3.4 Format JSON Examples
Place the selected data in a properly formatted JSON code block:

```json
{
  "field1": "value1",
  "field2": "value2",
  "nested": {
    "field3": "value3"
  }
}
```

## Step 4: Handle Special Cases

### 4.1 Parameter Formatting
When endpoints require parameters:
- Use the exact parameter names from the endpoints.ts file
- Use the values from `sampleParams`
- Ensure JSON is properly formatted (double quotes, proper escaping)

### 4.2 Error Handling
If an endpoint returns errors:
- Try alternative endpoints for the same return type
- Use different parameter values if available
- Document any limitations in the notes

### 4.3 Large Responses
For very large responses:
- Select representative portions
- Focus on the most important fields
- Add comments if truncation occurs

## Step 5: Add Cache Strategy Information

### 5.1 Document Cache Strategies
Add a section explaining the caching behavior:

```markdown
## Cache Strategy

- **STATIC**: List of endpoints that use static caching
- **REALTIME**: List of endpoints that provide real-time data
```

### 5.2 Cache Strategy Guidelines
- Check the `cacheStrategy` field in endpoints.ts
- Document which endpoints should not be cached
- Provide guidance on appropriate caching intervals

## Step 6: Final Review and Testing

### 6.1 Verify All Links Work
- Test all example reference links
- Ensure anchor IDs are unique and properly formatted
- Verify that examples match the described return types

### 6.2 Test fetchDottie Commands
- Run all fetchDottie commands to ensure they work
- Verify that the JSON examples are accurate
- Update examples if endpoints or data change

### 6.3 Review Content
- Ensure all return types are covered
- Verify that notes are accurate and helpful
- Check that the cheat sheet is comprehensive but concise

## Step 7: File Organization

### 7.1 Naming Convention
Use the pattern: `[api-name]-cheat-sheet.md`

### 7.2 File Location
Place cheat sheets in: `docs/references/cheat-sheets/`

### 7.3 Markdown Structure
```markdown
# [API Name] API Cheat Sheet

Brief description of the API and its purpose.

## Return Types and Endpoints

[Table with return types, endpoints, examples, and notes]

## Examples

[Detailed examples with fetchDottie code and JSON responses]

## Cache Strategy

[Information about caching behavior]
```

## Common Pitfalls to Avoid

1. **Don't wrap endpoint names in quotes** in fetchDottie calls
2. **Don't forget to include params** when endpoints require them
3. **Don't use placeholder data** - always fetch real examples
4. **Don't create overly complex examples** - keep them representative but manageable
5. **Don't forget to update examples** if the API changes
6. **Don't include unnecessary columns** - keep the table focused and useful

## Tools and Commands Reference

### Essential Commands
```bash
# Fetch data without validation
npx fetch-dottie functionName --no-validation --pretty

# Fetch data with parameters
npx fetch-dottie functionName '{"param": "value"}' --no-validation --pretty

# List available functions
npx fetch-dottie --help
```

### File Operations
```bash
# Read endpoints file
cat src/apis/[api-name]/endpoints.ts

# Create new cheat sheet
touch docs/references/cheat-sheets/[api-name]-cheat-sheet.md
```

## Quality Checklist

Before finalizing a cheat sheet, ensure:

- [ ] All return types are represented in the table
- [ ] All fetchDottie commands work and produce valid results
- [ ] JSON examples are properly formatted and representative
- [ ] Notes provide clear, helpful descriptions
- [ ] All internal links work correctly
- [ ] Cache strategy information is accurate
- [ ] The cheat sheet is comprehensive but not overwhelming
- [ ] Examples use real data, not placeholders
- [ ] Parameter values match the sampleParams from endpoints.ts

## Example Workflow

1. **Analyze**: Read endpoints.ts and understand the API structure
2. **Plan**: Identify return types and create table structure
3. **Fetch**: Use fetch-dottie to get real data for each type
4. **Format**: Create properly formatted examples with code blocks
5. **Document**: Add helpful notes and cache strategy information
6. **Test**: Verify all links and commands work correctly
7. **Review**: Check completeness and accuracy of all content

Following these instructions will ensure consistent, high-quality cheat sheets that provide developers with practical, actionable information about each API.
