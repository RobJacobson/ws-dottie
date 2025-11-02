# Zod Schema Documentation Enhancement PRD

## Executive Summary

This PRD defines the approach for standardizing and enhancing Zod schema documentation (`.describe()` annotations) across all input and output schema files in the WSDOT/WSF API codebase. The goal is to create consistent, business-focused, dual-purpose documentation that serves both human developers consuming APIs via Swagger/OpenAPI and MCP agents connecting via MCP servers.

## Project Goals

1. **Standardize Documentation Format**: Establish consistent patterns for schema-level and field-level descriptions across all Zod schemas
2. **Enhance Business Context**: Add business-focused descriptions that explain *why* and *when* to use fields, not just *what* they are
3. **Optimize for Dual Audiences**: Create documentation that serves both human readers and MCP agents effectively
4. **Maintain Consistency**: Ensure uniform style, terminology, and detail level across all schemas
5. **Balance Completeness with Conciseness**: Provide sufficient detail for complex/non-obvious fields while avoiding boilerplate for obvious ones
6. **Validate Against Actual Data**: Ensure documentation accurately reflects real API responses, including edge cases

## Scope

### In Scope

- **Schema-level descriptions**: Top-level `.describe()` annotations on schema objects (input and output)
- **Field-level descriptions**: `.describe()` annotations on individual schema fields
- **Consistency standardization**: Aligning documentation patterns across all ~110 input/output schema files
- **Template creation**: Developing reusable description templates and guidelines
- **Data validation**: Validating schemas against actual API responses to identify edge cases

### Out of Scope

- Modifying Zod schema structure or validation logic
- Changing top-level endpoint group documentation (resourceDescription, businessContext) - already handled by PRD v4
- Modifying endpoint definition files (*.endpoints.ts)
- Creating new documentation formats or tools
- Migrating from `.describe()` to `.meta()` (keeping current approach for compatibility)

## Current State Analysis

### Strengths

1. **Comprehensive Coverage**: All schemas have at least basic descriptions
2. **Type Safety**: Zod provides validation alongside documentation
3. **Examples Exist**: Some schemas (e.g., `roadwayLocationSchema`) demonstrate good descriptive patterns
4. **Official Documentation**: Reference material available in `docs/references/`

### Weaknesses

1. **Inconsistent Detail Levels**: Some fields have detailed descriptions (e.g., `roadwayLocationSchema`), others are minimal (e.g., "Unique identifier for camera.")
2. **Lack of Business Context**: Most descriptions focus on technical "what" rather than business "why" and "when"
3. **Boilerplate Repetition**: Many descriptions simply restate the field name (e.g., "The name of the vessel.")
4. **Missing Integration Context**: No guidance on how fields relate to other schemas or endpoints
5. **No Standardized Format**: Each schema follows different description patterns
6. **Inadequate for Agents**: Descriptions lack action-oriented language and use-case context needed for MCP agents
7. **Unvalidated Documentation**: Descriptions may not reflect actual API behavior or edge cases

### Examples of Current Issues

**Too Minimal:**
```typescript
VesselID: z.number().int().describe("Unique identifier for a vessel.")
```

**Too Boilerplate:**
```typescript
VesselName: z.string().nullable().describe("The name of the vessel.")
```

**Good Example (from roadwayLocationSchema):**
```typescript
MilePost: z.number().describe(
  "Milepost marker for the roadway location, as a number. E.g., '12.5' for milepost 12.5, '0' for route terminus. Provides precise location reference along highway corridors for accurate incident reporting and navigation."
)
```

## Best Practices Research Summary

### Content Length Guidelines (October 2025)

- **Field descriptions**: 15-40 words for standard fields, up to 60 words for complex fields
- **Schema-level descriptions**: 25-75 words for simple schemas, 50-100 words for complex schemas
- **Input schema descriptions**: Focus on what parameters control and when to use them
- **Output schema descriptions**: Focus on what data is returned and how to use it

### Documentation Style Requirements

1. **Business-First Language**: Lead with business purpose, then technical details
2. **Action-Oriented**: Use active voice and action verbs (especially for agent consumption)
3. **Context-Rich**: Include when/why to use, not just what it is
4. **Example-Driven**: Provide concrete examples from actual API responses
5. **Consistent Terminology**: Use standardized terms across all schemas
6. **Business Units**: Describe units in business terms (e.g., "UTC timestamp", "decimal degrees") not data types (e.g., "string", "number")

### Dual-Purpose Optimization

- **Human Readers**: Natural language, business context, use cases
- **MCP Agents**: Structured format, action-oriented language, clear field relationships
- **Shared Elements**: Plain-text narrative descriptions (no metadata dependencies)

## Documentation Standards

### Preferred Description Format

**Standard Format:**
```
"[Description of business purpose], as a [business unit type]. E.g., '[concrete example]' for [context], '[another example]' for [another context]. [Optional: Additional business context or use case]."
```

**Key Requirements:**
- Start with business purpose description
- Specify unit type using business terminology (not data types)
- Include concrete examples from actual API responses
- Examples should be specific and contextualized
- Add business context about when/why to use the field

**Examples:**
```typescript
// Good: Uses business units, concrete examples
MilePost: z.number().describe(
  "Milepost marker for the roadway location, as a decimal number. E.g., '12.5' for milepost 12.5, '0' for route terminus. Provides precise location reference along highway corridors for accurate incident reporting and navigation."
)

// Good: Specific examples with context
WaitTime: z.number().int().describe(
  "Current border crossing wait time, as minutes. E.g., '5' for 5 minutes at I-5 crossing, '45' for 45 minutes at SR-543 during peak hours. Used for route planning and border crossing scheduling."
)

// Good: Multiple examples showing different scenarios
VesselID: z.number().int().describe(
  "Unique vessel identifier, as an integer. E.g., '74' for vessel Chelan, '2' for vessel Spokane. Used as primary key for all vessel-related API calls and vessel tracking operations."
)
```

### Business Unit Type Guidelines

Use business/domain terminology rather than programming data types:

**Date/Time Fields:**
- ✅ "as a UTC datetime" (preferred - accessible and precise)
- ✅ "as a .NET datetime string" (when specifically .NET format `/Date(timestamp)/`)
- ✅ "as an ISO datetime" (when specifically ISO 8601 format)
- ✅ "as minutes since midnight" (not "as a number")
- ❌ Avoid "as a UTC timestamp" (timestamp implies Unix epoch number)
- ❌ Avoid "as an ISO 8601 datetime" (too technical - "ISO 8601" is jargon)

**Geographic Fields:**
- ✅ "as decimal degrees" (not "as a number")
- ✅ "as a milepost marker" (not "as a number")
- ✅ "as a WGS84 coordinate" (not "as a number")

**Identifier Fields:**
- ✅ "as an integer ID" (not "as a number")
- ✅ "as a unique vessel ID" (not "as a number")
- ✅ "as a terminal code" (not "as a string")

**Measurement Fields:**
- ✅ "as knots" (not "as a number")
- ✅ "as degrees" (not "as a number")
- ✅ "as minutes" (not "as a number")
- ✅ "as cents" (not "as a number")

**Status/Enum Fields:**
- ✅ "as a status code" (not "as a number")
- ✅ "as an operational status" (not "as an enum")
- ✅ "as a priority level" (not "as a string")

**Text Fields:**
- ✅ "as a human-readable description" (not "as a string")
- ✅ "as a terminal abbreviation" (not "as a string")
- ✅ "as a route designation" (not "as a string")

### Schema-Level Description Templates

#### Input Schema Template
```
"[Action verb] [resource/operation] [optional: scope or constraints], returning [output description]. [Optional: Additional context about when to use or what it enables]."
```

**Examples:**
- "Retrieves vessel location data for all vessels in the fleet, returning real-time GPS coordinates, terminal assignments, and ETA information. Use for fleet monitoring and passenger information systems."
- "Filters highway alerts by geographic region, route, time range, or milepost location, returning matching incident records. Use to find specific incidents affecting travel routes for route planning applications."

#### Output Schema Template
```
"Represents [data category] containing [key field categories], with [optional: data characteristics]. E.g., [concrete example from actual data]. [Optional: Business purpose or primary use case]. [Optional: Data freshness or update characteristics]."
```

**Examples:**
- "Represents vessel location data including GPS coordinates, terminal assignments, speed/heading, and ETA information. E.g., vessel 'Chelan' at position 48.596673, -122.94317 departing Orcas Island terminal. Used for real-time vessel tracking and arrival time calculations. Updates every 5 seconds."
- "Represents highway alert information including incident type, location, impact level, and timing. E.g., collision on I-5 at milepost 12.5 with high priority impact. Used for traffic monitoring and route planning. Updates as incidents occur."

### Field-Level Description Templates

#### Template Options (Choose Based on Field Complexity)

**Template 1: Simple Identifier/Name Field**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' for [context]. [Optional: How it's used]."
```
Example: "Unique vessel identifier, as an integer. E.g., '74' for vessel Chelan. Used as primary key for all vessel-related API calls."

**Template 2: Field with Multiple Examples**
```
"[Business purpose], as a [business unit type]. E.g., '[example1]' for [context1], '[example2]' for [context2]. [Optional: Business implications]."
```
Example: "Highway route designation, as a route code. E.g., '005' for I-5, '090' for I-90, '520' for SR-520. Used for filtering alerts and incidents by specific highway corridor."

**Template 3: Complex Field with Context**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' for [context]. [Technical details or format]. [When/why this field is used or what it enables]."
```
Example: "Milepost marker providing precise location reference, as a decimal number. E.g., '12.5' for milepost 12.5, '0' for route terminus. Enables accurate incident reporting and navigation calculations along highway corridors."

**Template 4: Enum/Union Fields**
```
"[Business purpose], as a [business unit type]. Valid values: [value1] ([meaning1]), [value2] ([meaning2]). E.g., '[example1]' indicates [scenario1], '[example2]' indicates [scenario2]. [When each value applies or business implications]."
```
Example: "Vessel operational status, as a status code. Valid values: 1 (In Service), 2 (Maintenance), 3 (Out of Service). E.g., '1' indicates vessel is available for passenger service, '2' indicates scheduled maintenance. Determines whether vessel is available for route assignments."

**Template 5: Nullable/Optional Fields**
```
"[Business purpose], as a [business unit type]. E.g., '[example]' when [condition], null when [null condition]. [Business implications of null vs. present value]."
```
Example: "Estimated arrival time at destination terminal, as a UTC datetime. E.g., '/Date(1757451301100-0700)/' when vessel is in transit, null when vessel is docked. Used for calculating remaining travel time and arrival predictions."

### Field Description Guidelines

#### When to Use Each Template

- **Template 1**: Simple identifier fields, obvious name fields (VesselID, VesselName)
- **Template 2**: Fields with multiple valid value patterns (StateRoute, TerminalAbbrev)
- **Template 3**: Complex fields requiring business context (MilePost, RoadwayLocation)
- **Template 4**: Enum/union fields, status fields, categorical fields
- **Template 5**: Nullable fields where null has specific meaning

#### Content Requirements by Field Type

**Identifier Fields** (ID, Code, Key):
- Must include: What entity it identifies, business unit type, concrete example
- Should include: How it's used in related API calls
- Optional: Range or multiple examples

**Name/Description Fields**:
- Must include: What entity it names/describes, business unit type, example
- Should include: Display context or usage
- Optional: Format constraints or multiple examples

**Location Fields** (Latitude, Longitude, MilePost):
- Must include: Coordinate system/format, business unit type, concrete examples
- Should include: Precision information, typical ranges
- Optional: Use cases (mapping, distance calculations)

**Status/Enum Fields**:
- Must include: All valid values with meanings, examples of each
- Should include: When each value applies
- Optional: Business implications of each status

**Date/Time Fields**:
- Must include: Format specification ("UTC datetime" preferred, or ".NET datetime string"/"ISO datetime" when format-specific), concrete example
- Should include: Timezone information (typically UTC), typical range
- Optional: Update frequency or freshness context
- Note: Default to "as a UTC datetime" unless the specific format (.NET vs ISO) is important for developers to know

**Nested Object Fields**:
- Must include: What the object represents, business unit type
- Should include: Key fields within the object, example object
- Optional: When to use vs. related objects

**Array Fields**:
- Must include: What items the array contains, business unit type
- Should include: Typical array size or examples
- Optional: How items relate to each other

**Nullable Fields**:
- Must include: When field is present vs. null, examples of both states
- Should include: Business meaning of null value
- Optional: Common scenarios leading to null

## Data Validation Requirements

### Critical: Actual API Data is Canonical

**Important Note**: The official WSF/WSDOT documentation in `docs/references/` may contain errors, omissions, or outdated information. **The actual data returned by API endpoints is always the canonical source of truth.** When discrepancies exist between official documentation and actual API responses, the actual data takes precedence.

### Required Data Retrieval Process

**Step 1: Retrieve Sample Data**
For each endpoint group, agents MUST retrieve actual API data using the fetch-dottie CLI:

```bash
npx fetch-dottie [api-name]:[function-name] --limit 10
```

**Examples:**
```bash
npx fetch-dottie wsf-vessels:getVesselLocations --limit 10
npx fetch-dottie wsdot-border-crossings:getBorderCrossings --limit 10
npx fetch-dottie wsdot-highway-alerts:getAlerts --limit 10
```

**Step 2: Analyze Sample Data**
Agents must analyze the retrieved data to:
1. **Extract Concrete Examples**: Identify real values from actual responses to use in descriptions
2. **Identify Edge Cases**: Look for:
   - Null values that should be documented
   - Magic values (e.g., -1 for "not available", 0 for special cases)
   - Empty arrays vs. null arrays
   - Unexpected data formats
   - Missing fields that are marked as required
   - Fields present that aren't in the schema

**Step 3: Validate Schema Against Data**
Agents must validate that Zod schemas accurately reflect actual API responses:
1. **Null Handling**: Ensure `.nullable()` is used for fields that actually return null
2. **Optional Fields**: Ensure `.optional()` matches fields that may be absent
3. **Default Values**: Verify any defaults match actual behavior
4. **Type Accuracy**: Confirm types match actual data (numbers vs. strings, etc.)
5. **Enum Values**: Verify enum/union values match actual responses

**Step 4: Document Edge Cases**
For any edge cases discovered:
1. Add descriptions explaining when null/empty/magic values occur
2. Update schema definitions if needed (e.g., add `.nullable()`)
3. Include examples showing edge case values in descriptions
4. Document business meaning of special values

### Edge Case Documentation Examples

**Null Value Example:**
```typescript
Eta: zDotnetDate()
  .nullable()
  .describe(
    "Estimated arrival time at destination terminal, as a UTC datetime. E.g., '/Date(1757451301100-0700)/' when vessel is in transit, null when vessel is docked. Used for calculating remaining travel time and arrival predictions."
  )
```

**Magic Value Example:**
```typescript
CurrentToll: z.int().describe(
  "Computed toll amount, as cents. E.g., '125' for $1.25 toll, '-1' when toll is not available or display shows message instead. Negative values indicate toll is unavailable."
)
```

**Empty Array Example:**
```typescript
OpRouteAbbrev: z.array(z.string())
  .nullable()
  .describe(
    "Abbreviated route names currently serviced by vessel, as an array of route codes. E.g., ['SEA-BI', 'SEA-BR'] for Seattle-Bainbridge and Seattle-Bremerton routes, null or empty array when vessel is not in service. Used to identify which routes vessel is currently operating."
  )
```

## Implementation Structure

### File Organization

Each endpoint group has:
- `[endpointGroup].input.ts` - Input schemas with descriptions
- `[endpointGroup].output.ts` - Output schemas with descriptions
- Shared schemas in `shared/` directories (e.g., `roadwayLocationSchema.ts`)

### Documentation Hierarchy

1. **Top-Level Schema Description**: Overall purpose and use case with concrete examples
2. **Field Descriptions**: Individual field business purpose, unit type, and examples from actual data
3. **Nested Schema Descriptions**: Sub-object purposes with examples
4. **Consistency**: Reference shared schemas rather than duplicating descriptions

### Quality Standards

#### Minimum Requirements
- Every schema has a top-level `.describe()` annotation with examples
- Every field has a `.describe()` annotation following preferred format (unless clearly obvious)
- All examples come from actual API responses (retrieved via fetch-dottie)
- Edge cases (null, magic values) are documented
- Descriptions follow established templates
- Word counts meet guidelines (15-40 words for fields, 25-75 for schemas)
- Business unit types are used (not data types)

#### Quality Checklist Per Schema
- [ ] Schema-level description follows template with concrete examples
- [ ] Field descriptions use preferred format: "[description], as a [business unit]. E.g., '[example]'"
- [ ] All examples extracted from actual API responses (fetch-dottie data)
- [ ] Business context included, not just technical details
- [ ] Examples are specific and contextualized
- [ ] Null values documented where they occur
- [ ] Magic values documented where they exist
- [ ] Consistent terminology with related schemas
- [ ] No boilerplate restatements of field names
- [ ] Integration context mentioned where relevant
- [ ] Word counts within guidelines
- [ ] Schema validated against actual API responses
- [ ] Edge cases identified and documented

## Agent Instructions

### Step-by-Step Documentation Process

1. **Review Context**
   - Read endpoint group documentation (`*.endpoints.ts`) for business context
   - Review official API specs in `docs/references/api-specs/` (but remember they may contain errors)
   - Review endpoint specs in `docs/references/endpoint-specs/` (but remember they may contain errors)
   - Examine related schemas for consistency

2. **Retrieve Actual API Data** (REQUIRED)
   ```bash
   npx fetch-dottie [api-name]:[function-name] --limit 10
   ```
   - Analyze actual responses for concrete examples
   - Identify edge cases (null values, magic values, empty arrays)
   - Note any discrepancies with existing schema or documentation

3. **Validate Schema Against Data** (REQUIRED)
   - Test schema against actual API responses
   - Verify null handling matches actual behavior
   - Check for magic values or special cases
   - Identify missing `.nullable()` or `.optional()` annotations
   - Document any schema corrections needed

4. **Analyze Schema Structure**
   - Identify schema purpose (input vs. output)
   - Identify field categories (identifiers, names, locations, statuses, etc.)
   - Note complex or non-obvious fields requiring detailed descriptions
   - Identify obvious fields that can use minimal descriptions
   - Note nullable/optional fields and their conditions

5. **Write Schema-Level Description**
   - Use appropriate input or output template
   - Include business purpose and key field categories
   - Add concrete examples from actual API responses
   - Mention data freshness if relevant (for output schemas)
   - Keep within 25-75 word guideline

6. **Write Field Descriptions**
   - Classify each field by complexity
   - Select appropriate template (1-5)
   - Extract concrete examples from actual API responses
   - Use business unit types (not data types)
   - Document null conditions for nullable fields
   - Document magic values if present
   - Add business context and examples where needed
   - Ensure consistency with related schemas
   - Keep within 15-40 word guideline (up to 60 for complex)

7. **Review and Refine**
   - Verify all examples come from actual API data
   - Check word counts
   - Verify consistency with related schemas
   - Ensure no boilerplate or obvious restatements
   - Validate business context is clear
   - Confirm edge cases are documented
   - Ensure schema matches actual API behavior

### Sentence Structure Alternatives

**For Simple Fields:**
- "[Field] identifies [entity], as a [business unit]. E.g., '[example]' for [context]."
- "[Field] specifies [entity], as a [business unit]. E.g., '[example]' when [condition]."

**For Fields with Examples:**
- "[Field] represents [entity], as a [business unit]. E.g., '[example1]' for [context1], '[example2]' for [context2]."
- "[Field] provides [information], as a [business unit]. E.g., '[example]' when [condition], null when [null condition]."

**For Complex Fields:**
- "[Field] contains [detailed information], as a [business unit]. E.g., '[example]' for [context]. [Technical details]. Enables [capability]."
- "[Field] specifies [complex concept], as a [business unit]. E.g., '[example]' when [condition]. Used for [use case]."

**For Enum/Status Fields:**
- "[Field] indicates [status/concept], as a [business unit]. Valid values: [value1] ([meaning1]), [value2] ([meaning2]). E.g., '[example1]' indicates [scenario1]."
- "[Field] represents [category], as a [business unit]. Values: [list]. E.g., '[example]' when [condition]. Determines [implication]."

**For Nullable Fields:**
- "[Field] specifies [information], as a [business unit]. E.g., '[example]' when [condition], null when [null condition]. [Meaning of null]."
- "[Field] provides [data], as a [business unit]. Present when [condition], null when [null condition]. E.g., '[example]' indicates [scenario]."

## Success Criteria

### Documentation Quality Metrics

1. **Consistency**: 100% of schemas follow established templates and preferred format
2. **Completeness**: 100% of schemas and fields have descriptions with examples
3. **Data Validation**: 100% of schemas validated against actual API responses
4. **Business Context**: All descriptions include business purpose, not just technical details
5. **Example Quality**: All examples extracted from actual API responses
6. **Edge Case Coverage**: All null values, magic values, and edge cases documented
7. **Word Count Compliance**: 95%+ of descriptions within guidelines
8. **Terminology**: Consistent terminology across related schemas
9. **Unit Types**: Business unit types used consistently (not data types)

### Validation Process

1. **Automated Checks**: Word count validation, template pattern matching
2. **Data Validation**: Schema validation against actual API responses
3. **Peer Review**: Consistency checks across related schemas
4. **Agent Testing**: MCP agent endpoint selection accuracy
5. **Human Review**: Developer feedback on clarity and usefulness

## Implementation Timeline

### Phase 1: Template Development (Week 1)
- Finalize description templates with preferred format
- Create example implementations for 3-5 representative schemas
- Establish quality checklist and validation criteria
- Test fetch-dottie CLI integration

### Phase 2: Pilot Implementation (Weeks 2-3)
- Enhance documentation for 5-10 representative endpoint groups
- Retrieve and analyze actual API data for each
- Validate schemas against actual responses
- Document edge cases discovered
- Gather feedback on templates and guidelines
- Refine templates based on pilot results

### Phase 3: Full Implementation (Weeks 4-12)
- Process all endpoint groups alphabetically
- For each group:
  - Retrieve actual API data using fetch-dottie
  - Validate schema against actual responses
  - Extract concrete examples from responses
  - Identify and document edge cases
  - Write descriptions using preferred format
- Maintain consistency with pilot implementations
- Document any exceptions or special cases

### Phase 4: Quality Assurance (Weeks 13-14)
- Comprehensive review of all enhanced documentation
- Re-validate schemas against actual API responses
- Consistency validation across related schemas
- Edge case documentation review
- Final refinements and corrections

## Deliverables

1. **Enhanced Schema Documentation**: All ~110 input/output schema files updated with standardized descriptions following preferred format
2. **Template Library**: Reusable description templates and examples
3. **Implementation Guide**: Step-by-step instructions for agents including data retrieval
4. **Edge Case Documentation**: Documented null values, magic values, and special cases
5. **Schema Validation Report**: Documentation of schema corrections made based on actual API data
6. **Quality Report**: Validation results and consistency metrics
7. **Best Practices Reference**: Documented patterns for future schema additions

