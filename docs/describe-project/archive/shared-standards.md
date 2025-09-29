# Shared Standards for API Documentation

This document provides comprehensive standards and guidelines for agents working on API documentation enhancement. All agents must follow these standards consistently.

## Table of Contents

1. [File Structure Overview (READ FIRST)](#file-structure-overview-read-first)
2. [Critical Code Modification Rules](#critical-code-modification-rules)
3. [Quick Start Checklist](#quick-start-checklist)
4. [File Naming and Structure](#file-naming-and-structure)
5. [Writing Standards](#writing-standards)
6. [Field Description Guidelines](#field-description-guidelines)
7. [Schema Documentation](#schema-documentation)
8. [Endpoint Descriptions](#endpoint-descriptions)
9. [Cross-Reference Guidelines](#cross-reference-guidelines)
10. [Integration Discovery Process](#integration-discovery-process)
11. [Data and Examples](#data-and-examples)
12. [Quality Control](#quality-control)
13. [Common Issues and Solutions](#common-issues-and-solutions)

---

## Quick Reference Tables

### Data Freshness by API Type
| API Type | Required Statement |
|----------|-------------------|
| Border crossings | `"Data updates frequently."` |
| Bridge clearances | `"Data updates infrequently."` |
| Ferry schedules | `"Data updates infrequently."` |
| Ferry locations | `"Data is real-time."` |
| Traffic flow | `"Data updates frequently."` |
| Weather stations | `"Data updates frequently."` |
| Travel times | `"Data updates frequently."` |
| Highway alerts | `"Data updates frequently."` |

### Edge Case Documentation Template
**Standard Format:**
```
"[Normal business purpose]. E.g., '[normal_value]' for [normal_condition], '[edge_value]' for [special_condition]. [Business meaning of edge case]."
```

**Example Application:**
```
"The estimated wait time to cross the border, in minutes. E.g., '5' for normal traffic conditions, '-1' for lane closure or unavailable status. Negative values indicate the lane is not operational for safety or maintenance reasons."
```

### Integration Discovery Stopping Criteria
**Stop adding cross-references when you've covered:**
- **Sequential workflows**: 1-2 maximum per endpoint
- **Complementary data**: 1-2 maximum per endpoint  
- **Alternative scenarios**: 0-1 maximum per endpoint
- **Total cross-references per endpoint**: 2-4 maximum

### Agent Naming Convention
**All agent-specific files use format:** `[agent-name]`
**Examples:** `domain-analysis.alice.md`, `outputSchemas.francis.ts`, `inputSchemas.doug.ts`

---

## File Structure Overview (READ FIRST)

### Work Directory Structure

**ALL agent work goes in the `/working/` subdirectory of each API:**

```
src/apis/[api-name]/working/
├── domain-analysis.[agent-name].md    # REQUIRED: Business domain analysis
├── inputSchemas.[agent-name].ts       # REQUIRED: Enhanced input schemas
├── outputSchemas.[agent-name].ts      # REQUIRED: Enhanced output schemas
├── endpointDescriptions.[agent-name].json  # REQUIRED: Endpoint descriptions
└── [other-files].[agent-name].*       # Optional supporting files
```

### Shared Files Structure

**If you need to create your own version of shared files, save them to `/working/` subdirectory:**

```
src/apis/shared/working/
├── roadwayLocationSchema.[agent-name].ts  # Your version of shared schema
└── [other-shared-files].[agent-name].ts   # Other shared file versions
```

### Example for Agent Alice working on wsdot-border-crossings:

```
src/apis/wsdot-border-crossings/working/
├── domain-analysis.alice.md
├── inputSchemas.alice.ts
├── outputSchemas.alice.ts
└── endpointDescriptions.alice.json

src/apis/shared/working/
└── roadwayLocationSchema.alice.ts     # If Alice modifies shared schema
```

**Import Structure:** Even when creating your own versions, follow the canonical import paths:
- `import { schema } from "@/apis/shared/schemaName.original"`
- `import { schema } from "@/schemas/[api-name]/schemaName.zod"`

---

## Critical Code Modification Rules

⚠️ **CRITICAL WARNING: VIOLATION = COMPLETE WORK REJECTION** ⚠️

### ABSOLUTELY PROHIBITED CODE CHANGES:

```typescript
❌ NEVER DO THIS:

// Renaming schema variables
export const borderCrossingSchema = z.object({...});  // WRONG: renamed from borderCrossingDataSchema

// Adding Zod validation methods 
WaitTime: z.number().int().min(-1)     // WRONG: .int() and .min() are structure changes
VesselID: z.string().uuid()            // WRONG: .uuid() is a structure change
params: z.object({}).strict()          // WRONG: .strict() is a structure change

// Adding or modifying JSDoc comments
/** New JSDoc comment */               // WRONG: Don't add JSDoc blocks
/** Modified existing comment */       // WRONG: Don't modify existing JSDoc

// Any code structure changes
// WRONG: All of these are prohibited
```

### ONLY PERMITTED CHANGES:

```typescript
✅ CORRECT APPROACH:

// Keep original schema names exactly
export const borderCrossingDataSchema = z.object({...});

// Only add .describe() annotations
WaitTime: z.number().describe("The estimated wait time...")

// Preserve all existing JSDoc comments unchanged
/** Original comment stays exactly as-is */
export const originalSchema = z.object({
  // Only add .describe() to fields
  field: z.string().describe("Enhanced description...")
})
```

---

## Quick Start Checklist

**Before starting work, ensure you understand:**

✅ **Critical Rules:**
- NEVER modify existing code except `.describe()` annotations
- NEVER rename schema variables - keep original names exactly
- NEVER add Zod methods like `.int()`, `.uuid()`, `.strict()` - these are structure changes
- NEVER modify JSDoc comments or add new JSDoc blocks
- ALWAYS add `.describe()` clauses to all schema definitions and all fields
- ALWAYS use exact API data with single quotes in examples
- ALWAYS use aliased import paths (`@/apis/shared/`) not relative paths

✅ **REQUIRED FILES CHECKLIST:**
- [ ] `src/apis/[api-name]/working/domain-analysis.[agent-name].md` (EVERY API)
- [ ] `src/apis/[api-name]/working/inputSchemas.[agent-name].ts`
- [ ] `src/apis/[api-name]/working/outputSchemas.[agent-name].ts`
- [ ] `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json`

✅ **File Naming:**
- Work files: `src/apis/[api-name]/working/[file-type].[agent-name].[extension]`
- Cross-references: Use client function names like `api-name/function-name`

✅ **Writing Style:**
- Business context first, technical details second
- Plain English, conversational tone
- Active voice throughout
- Focus on real-world meaning and purpose

---

## File Naming and Structure

### Work-in-Progress Files
All agent work goes in the `working/` subdirectory:

```
src/apis/[api-name]/working/[file-type].[agent-name].[extension]
```

**Examples:**
- `src/apis/wsdot-border-crossings/working/inputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/outputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/endpointDescriptions.alice.json`

### Client File References
For cross-references, use the client function names:

```
[api-name]/[function-name]
```

**Examples:**
- `wsdot-border-crossings/getBorderCrossings`
- `wsf-vessels/vesselBasicsById`

The cannonoical API names and function names are those contained in the relevant client definition files under src/clients. E.g.:

```
// src/clients/wsdot-commercial-vehicle-restrictions/getCommercialVehicleRestrictions.ts

/** Endpoint metadata for src/clients/wsdot-commercial-vgetCommercialVehicleRestrictions */
export const getCommercialVehicleRestrictionsMeta: EndpointDefinition<
  CommercialVehicleRestrictionsInput,
  CommercialVehicleRestrictions
> = {
  api: "wsdot-commercial-vehicle-restrictions",
  function: "getCommercialVehicleRestrictions",
  endpoint:
    "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson",
  ...
};
```

### Import Path Requirements

**Shared Schemas (Canonical):**
```typescript
import { schemaName } from "@/apis/shared/schemaName.original"; // Direct use
// OR
import { schemaName } from "@/apis/shared"; // If re-exported from index.ts
```

**API-specific Schemas:**
```typescript
import { schemaName } from "@/schemas/[api-name]/schemaName.zod";
```

**❌ NEVER CREATE OR IMPORT:**
```typescript
❌ import { roadwayLocationSchema } from "./roadwayLocationSchema.alice"; 
❌ import { roadwayLocationSchema } from "../shared/roadwayLocationSchema.bob";
❌ import { schema } from "src/schemas/shared/roadwayLocation.zod"; // Wrong path format
```

**✅ ALWAYS USE CANONICAL IMPORTS:**
```typescript
✅ import { roadwayLocationSchema } from "@/apis/shared/roadwayLocationSchema.original";
✅ import { zWsdotDate } from "@/apis/shared";
```

### **Import Path Decision Tree:**

**1. For shared schemas (roadwayLocationSchema, zWsdotDate, etc.):**
- ✅ **ALWAYS use**: `@/apis/shared/schemaName.original`
- ❌ **NEVER use**: `../shared/schemaName.original` (relative paths)

**2. For API-specific schemas:**
- ✅ **Use**: `@/schemas/[api-name]/schemaName.zod`
- ❌ **NEVER use**: `./schemaName` or `../otherApi/schemaName`

**3. Quick Check:**
- Does path start with `@/`? ✅ Correct canonical format
- Does path start with `../` or `./`? ❌ Wrong relative format

**❌ NEVER:**
- Use relative paths (e.g., `../shared/schema.alice`)
- Create agent-suffixed shared schema files (e.g., `roadwayLocationSchema.alice.ts`)
- Import from agent-suffixed files (e.g., `roadwayLocationSchema.bob`)
- Reference `.original` files in working code (except canonical shared schemas)

### Final File Structure
```bash
src/apis/[api-name]/
├── inputSchemas.original.ts           # Original (renamed)
├── outputSchemas.original.ts          # Original (renamed)
├── inputSchemas.final.ts              # Editor synthesis
├── outputSchemas.final.ts             # Editor synthesis
├── endpointDescriptions.final.json    # Editor synthesis
├── domain-analysis.final.md           # Editor synthesis
└── working/                           # All WIP files
    ├── inputSchemas.alice.ts
    ├── outputSchemas.alice.ts
    ├── endpointDescriptions.alice.json
    └── [... other agent files ...]
```

---

## Code Modification Rules

### CRITICAL: What Agents Can and Cannot Modify

**✅ PERMITTED:**
1. **`.describe()` annotations**: Add or modify for narrative documentation
2. **`domain-analysis.[agent-name].md` files**: Create comprehensive domain analysis
3. **`endpointDescriptions.[agent].json` files**: Create high-level endpoint descriptions

**❌ STRICTLY PROHIBITED:**
- Modifying existing JSDoc comments
- Altering function bodies or variable declarations
- Changing import statements
- Adding custom metadata or new JSDoc blocks
- Renaming schema variables
- Any code structure changes
- Running npm build

**Preserve original code integrity at all costs.**

---

## Writing Standards

### Core Principles

**Business Context First**
- Explain real-world meaning and purpose
- Connect to business workflows and use cases
- Answer "Why would someone use this?"

**Plain English**
- Natural, conversational language
- Write as if explaining to a colleague
- Avoid technical jargon without explanation
- Use active voice throughout

**Literal Data Usage**
- Use exact API response data with single quotes
- Preserve original formats exactly
- Include anomalous values with explanatory labels
- No data transformation permitted

**Conciseness and Value**
- Don't be "Captain Obvious" - avoid filler words or descriptions for obvious points
- Focus on decision-making value
- Write for sophisticated developers and agents
- Be specific and actionable

**Consistency**
- Use domain-appropriate terms consistently
- Maintain parallel structure for related fields
- Apply templates for similar field types

**Factual Grounding**
- Base descriptions on WSDOT API specification
- Use actual API data and website information
- Apply common sense, but don't speculate about specific reasons for edge cases
- Document what the data shows, not what you assume it means
- Prefer existing WSDOT language as starting point

---

## Field Description Guidelines

Field descriptions must follow this structure:

1. **Lead Sentence**: A lead sentence that provides a concise description of what the field represents and its data type. This is usually described as a property of a specific entity, such as "... for this vessel" or "... for this border crossing." This is always required.

2. **E.g. Example Sentence**: An "E.g." sentence that provides one, two, or three examples of the literal data returned by the API (always enclosed in single quotes) plus a description of what entity or context that value relates to. Guidance:

  a. Do not include this sentence for cases below, such as dates, where an concrete example is obvious and would not provide additional context.

  b. Provide one example for obvious cases, like typical ID values. For example (as a TerminalID field): "E.g., '7' for Seattle."

  c. Provide multiple examples where the examples are different in kind and more examples would provide additional context, such as ones that represent different types of objects or edge cases. For example (with border crossing wait times): "E.g., '5' for a five-minute wait time, or '-1' if the lane is closed or unavailable."

  Always look for undocumented edge cases in the data, such as "-1" or "null." If found, provide an explanation about the context for that edge case. However, do not speculate about the reasons for those edge cases, unless they are obvious. For example, use "E.g., "[some-value] for [describe], or null if unavailable." Expand on why it could be null or some other edge case if that is obvious from the surrounding context or documented.

  In complex cases, these examples may require one or two additional sentences of context. For example, see BorderCrossinglocation below.

3. **Further description of data**: Up to two additional sentences that provide further explanation of what this data represents, if that is nonobvious from the context and further explanation is required. Avoid unnecessary, obvious descriptions. Keep it simple.

4. **Business context**: One concluding sentence to explain the business context and purpose of this field, but only if that is nonobvious. For example, there is no need to explain that a standard "ID" field represents a unique ID to identify some entity in the system, that a "minimum bridge clearance" for a bridge represents the minimum safe clearance for a bridge, or that a last-updated date represents the time when the data was last updated.

Examples of 1, 2, and 3:

*borderCrossingDataSchema.CrossingName:*

Original description: 
"Common name of the crossing."

Revised description: 
"The common name for this border crossing lane, as a string. E.g., 'I5' for the main I-5 crossing, 'SR539Nexus' for the NEXUS lane at the SR 539 crossing, or 'SR543Trucks' for commercial vehicle lanes. ..." (Multiple classes of objects.)


*borderCrossingDataSchema.Time:*

Original description: 
"When the reading was taken."

Revised description: 
"The time when this border crossing lane's's reading was last updated, as a UTC date." (No example is needed for a generic date.)


*borderCrossingDataSchema.WaitTime:*

Original description: 
"Current time to cross border"

Revised description: 
"The estimated wait time to cross the border for this border crossing lane, in minutes. E.g., '5' for a five-minute wait time, or '-1' if the lane is closed or unavailable. ..."


*bridgeDataGISSchema.BridgeNumber:*

Original description: 
"A two-part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01)."
  
Revised description:
"A two-part unique ID for the bridge as a string. E.g., '5/650E' for a bridge along interstate I-5 with an identifier of 650E, or '12/348N' for a bridge along U.S. Route 12 with an identifier of 348N. The first part is the State Route identifier associated with the bridge, either as a part of the route, or the route under or adjacent to the bridge. The second part is an identifier assigned to the bridge." (A complex example that requires additional context about the meaning of the ID format, unlike a standard numerical ID.) 

*borderCrossingDataSchema.Location:*

Original description:
"Where the crossing is located."

Revised description:

"A RoadwayLocation object that indicates where this border crossing lane is located, including coordinates and highway information. E.g., detailed location data for 'I-5 General Purpose' and 'SR 543 Nexus Lane'. This field contains null for specialized lanes like Nexus or truck lanes that share location data with their main crossing (SR539Nexus, SR539Trucks). The null values indicate these lanes share physical infrastructure with the main crossing rather than having independent locations."


### Length Targets by Complexity

Do not follow these rules mechanically. Instead, direct the level of explanation to whether the field is obvious or complex:

- **Simple fields** (IDs, timestamps, coordinates): Typically 1 sentence plus example (only if needed) (50-150 chars)
- **Moderate complexity** (business logic, enums): Typically 2-3 sentences (150-400 chars)
- **High complexity** (domain-specific concepts): Typically 3-4 sentences (400-600 chars)


### Business-Focused Data Type Templates

**CRITICAL FORMAT REQUIREMENT:** Each description must start with business purpose, conclude the first sentence with a comma and data type specification, then provide examples and context.

**Template Structure:** `"[Business purpose], as [business-focused data type]. E.g., '[example]' for [context]. [Additional context if needed]."`

#### **Common Data Type Reference Table**

| Schema Type | Business Data Type | Template Format |
|-------------|-------------------|-----------------|
| `z.string()` | `as a string` | Basic text identifier or description |
| `z.number()` | `as a number` | Numeric measurement or count |
| `z.number().int()` | `as an integer` | Whole number ID or count |
| `z.boolean()` | `as a boolean flag` | True/false operational state |
| `zWsdotDate()` | `as a UTC date` | Timestamp for events or updates |
| `roadwayLocationSchema` | `as a roadway location object` | Geographic location with route context |
| `z.number()` (lat/lon) | `in decimal degrees` | Geographic coordinates |
| `z.enum([...])` | `as a status code` | Predefined operational states |
| `z.union([...])` | `as a coded value` | Multiple possible value types |
| Monetary amounts | `in dollars` | Currency values |
| Time durations | `in minutes` | Time measurements |
| Physical measurements | `in [units]` | Distance, clearance, etc. |

#### **Template Examples by Data Type**

##### **Identifiers (z.string(), z.number().int())**
```typescript
// String ID Template
"[Entity] identifier for [primary purpose], as a string. E.g., '[value]' for [specific example]. [Integration context if relevant]."

// Numeric ID Template  
"[Entity] identifier for [primary purpose], as an integer. E.g., '[value]' for [specific example]. [Integration context if relevant]."

// Examples:
"Terminal identifier for ferry scheduling and routing, as an integer. E.g., '3' for Bainbridge Island terminal. Used across ferry system APIs for cross-referencing."

"Bridge number for infrastructure identification and safety planning, as a string. E.g., '12/348S' for State Route 12 bridge. Two-part format combines route and bridge sequence."
```

##### **Timestamps (zWsdotDate())**
```typescript
// Template
"[Event/state] timestamp for [business purpose], as a UTC date. E.g., '[timestamp]' for [context]. [Usage guidance if relevant]."

// Examples:
"Vessel departure timestamp for schedule tracking and passenger planning, as a UTC date. E.g., '2025-09-29T14:30:00.000Z' for afternoon departure."

"Bridge data update timestamp for maintenance scheduling and safety monitoring, as a UTC date. Critical for determining data currency."
```

##### **Geographic Coordinates (z.number() for lat/lon)**
```typescript
// Template
"[Location type] coordinate for [primary purpose], in decimal degrees. E.g., '[coordinate]' for [specific location]. [Integration context]."

// Examples: 
"Bridge latitude coordinate for mapping and navigation systems, in decimal degrees. E.g., '47.961343' for I-5 bridge in Seattle area."

"Border crossing longitude for precise location identification, in decimal degrees. E.g., '-122.756964' for Blaine crossing point."
```

##### **Physical Measurements (z.number())**
```typescript
// Template
"[Physical measurement] for [safety/operational purpose], in [units]. E.g., '[value]' for [real-world context]. [Usage guidance]."

// Examples:
"Maximum bridge clearance for commercial vehicle safety planning, in inches. E.g., '193' for typical overpass clearance. Compare against vehicle height before route planning."

"Wait time estimate for border crossing optimization, in minutes. E.g., '15' for normal traffic flow, '-1' for closed lanes."
```

##### **Boolean Flags (z.boolean())**
```typescript
// Template
"[Operational state] indicator for [decision making], as a boolean flag. True means [active state], false means [inactive state]. [Business impact]."

// Examples:
"Vessel docking status for passenger boarding decisions, as a boolean flag. True means docked and available for boarding, false means en route."

"Direction independence flag for fare calculation, as a boolean flag. True means fare is same regardless of departure terminal, false means fare varies by terminal."
```

##### **Status Codes/Enums (z.enum(), z.union())**
```typescript
// Template
"[System state] indicator for [business purpose], as a status code. E.g., '[code]' for [condition], '[code2]' for [condition2]. [Business meaning explanation]."

// Examples:
"Traffic flow condition at the monitoring station, as a status code. E.g., '1' for wide open traffic, '3' for heavy congestion, '4' for stop-and-go conditions."

"Mountain pass travel advisory level, as a status code. E.g., 'OPEN' for normal conditions, 'CHAINS_REQUIRED' for winter driving restrictions."
```

##### **Complex Objects (roadwayLocationSchema, etc.)**
```typescript
// Template
"[Business context] information for [primary purpose], as a [object type]. E.g., [description of typical content]. [Special conditions if any]."

// Examples:
"Geographic location details for the border crossing point, as a roadway location object. Includes route designation, coordinates, and highway information. Returns null when location data unavailable for specific lane types."

"Vessel position and status information for real-time tracking, as a vessel location object. Contains coordinates, heading, and operational status for ferry monitoring."
```

##### **Monetary Values (z.number() for currency)**
```typescript
// Template
"[Cost/price] for [business purpose], in dollars. E.g., '[amount]' for [fare type/context]. [Pricing context if relevant]."

// Examples:
"Fare amount for passenger transportation, in dollars. E.g., '8.50' for adult passenger fare, '4.25' for senior discount fare."
```

### Parallel language

Use parallel language between similar fields for related concepts:

VerticalClearanceMaximumInches: "The maximum vertical clearance for this bridge in inches, as a number. ..."
VerticalClearanceMaximumFeetInch: "The maximum vertical clearance for this bridge in feet and inches, as a string. ..."
VerticalClearanceMaximumInches: "The minimum vertical clearance for this bridge in inches, as a number. ..."
VerticalClearanceMinimumFeetInch: "The minimum vertical clearance for this bridge in feet and inches, as a string. ..."

Also use parallel language for equivalent examples and business-context explanations, if included.


## Schema Documentation

### CRITICAL Requirements

- **ALL schema definitions MUST have a detailed `.describe()` clause**
- **DO NOT modify existing JSDoc comments** - preserve original WSDOT documentation
- **DO NOT add new JSDoc comments** - use `.describe()` annotations instead
- **Preserve original variable names** - do not rename schema variables

### Input Schema Templates

```typescript
// No parameters
"Input parameters to retrieve all [entity type] across [scope] (none required)."

// Single entity
"Input parameters to retrieve a specific [entity type] by [identifier]."

// Filtered search
"Input parameters to search [entity type] by [criteria] for [purpose]."
```

### Output Schema Templates

```typescript
"Returns [container] of [entity type] including [key data] for [use case] (typically [cardinality]). [Business context]. [Data freshness]."
```

### Data Freshness Documentation

**REQUIRED PLACEMENT: Output schema `.describe()` annotations**

**DATA FRESHNESS PRIORITY ORDER:**
1. **Extract EXACT statements from source API documentation** (highest priority)
2. **Use API-specific patterns** based on data type (real-time vs. static)
3. **Only use defaults** when no specific information is available

**CRITICAL EXAMPLES:**
- Border crossing data = **"Data updates frequently"** (real-time traffic data)
- Bridge clearance data = **"Data updates infrequently"** (static infrastructure)
- Ferry vessel locations = **"Data is real-time"** (GPS tracking data)
- Ferry schedules = **"Data updates infrequently"** (published schedules)

**FORMAT REQUIREMENTS:**
```typescript
// REQUIRED: Include in output schema description
export const outputSchema = z.array(itemSchema).describe(
  "Returns [data description]. [Business context]. [DATA FRESHNESS STATEMENT]."
);

// EXAMPLES:
"...for commercial vehicle routing. Data updates infrequently."
"...for real-time border crossing planning. Data updates frequently."
"...for vessel tracking and scheduling. Data is real-time."
```

**CONSISTENCY RULE:** Use the same data freshness statement across ALL files for each API.

### Schema Documentation Examples

#### ✅ CORRECT
```typescript
/**
 * Schema for GetBorderCrossings input parameters
 */
export const getBorderCrossingsInputSchema = z.object({}).describe(
  "Input parameters to retrieve all border crossing wait times across Washington State (none required)."
);
```

#### ❌ WRONG
```typescript
/**
 * Input parameters to retrieve all border crossing wait times across Washington State (none required).
 * This endpoint provides comprehensive wait time data for all active US-Canada border crossings.
 */
export const getBorderCrossingsInputSchema = z.object({});
```

---

## Endpoint Descriptions

### Format and Structure

The `endpointDescriptions.[agent].json` file **MUST** contain a single JSON object with:
- **Key**: Endpoint's canonical name (e.g., `api-name/endpoint-name`)
- **Value**: Single, plain-text narrative string (maximum 3-5 sentences)

### Required Content Elements

**Synthesize these into a coherent narrative:**

1. **High-Level Function**: What the endpoint does
2. **Business Purpose/Value**: Why it's important, real-world benefits
3. **Target Users**: Who primarily benefits
4. **Key Use Cases**: Specific scenarios where it's used
5. **Cross-References**: Related APIs/endpoints with their purpose

### Template Structure

```
"[High-level function]. [Business purpose/value]. Target users include [list]. Key use cases are [list]. [Cross-references naturally integrated]."
```

### Cross-Reference Integration and Timing

**CRITICAL: Cross-references are ONLY added in Integration Phase (Phase 3).**
**Writing Phase focuses purely on individual field and schema documentation.**

**WHY RESTRICTION TO endpointDescriptions.json:**
- Prevents context bloat in schema files
- Maintains clear separation of concerns  
- Schema descriptions focus on data meaning, endpoint descriptions focus on integration
- Single source of truth for workflow guidance

**DEFINITIVE PHASE TIMING:**
- **Writing Phase (Phase 2):** NO cross-references - focus on field/schema descriptions only
- **Integration Phase (Phase 3):** ALL cross-references created, reviewed, and validated

**INTEGRATION FORMAT:**
Cross-references **MUST** be integrated naturally into the narrative string:

```json
{
  "wsdot-border-crossings/getBorderCrossings": "Shows current wait times at Canadian border crossings to help travelers choose the fastest route. Use with wsdot-traffic-flow/getTrafficFlow to get comprehensive travel conditions and with wsdot-highway-alerts/getAlerts to identify potential delays."
}
```

---

## Cross-Reference Guidelines

### Placement Rules

**CRITICAL**: All cross-references **MUST ONLY** appear in `endpointDescriptions.[agent].json` files. They **MUST NOT** appear in `.describe()` annotations within schema files.

### Verb Usage

- **"Use with"**: For sequential flows (A output → B input)
- **"Combine with"**: For true A+B→C combinations
- **Multiple references**: Use "or" for alternatives, separate sentences for different APIs

### Format Requirements

```
"[Description]. Use this with [api]/[endpoint] to [purpose] and with [api2]/[endpoint2] to [purpose2]."
```

### Common Integration Patterns

- **Traffic conditions**: `wsdot-traffic-flow/getTrafficFlow`
- **Travel calculations**: `wsdot-travel-times/getTravelTimes`
- **Travel alerts**: `wsdot-highway-alerts/getAlerts`
- **Vehicle restrictions**: `wsdot-bridge-clearances/getBridgeClearances`
- **Ferry routes**: `wsf-vessels/vesselBasicsById`, `wsf-terminals/terminalBasicsById`

### Examples

#### ✅ GOOD
```
"The vessel's unique identifier as an integer (e.g., '1'). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information."
```

#### ❌ AVOID
```
"This relates to terminal information and schedule data."
"Binary indicator showing lane direction via wsdot-travel-times/getTravelTimes"
```

---

## Data and Examples

### Example Decision Tree

**Use SINGLE example when:**
- Values are the same type/format
- Examples don't illustrate different categories
- Field represents homogeneous data (IDs, measurements, timestamps)

**Use MULTIPLE examples when:**
- Examples show **different categories** within the same field
- Examples illustrate **different states or conditions**
- Examples demonstrate **format variations** users need to understand
- Field represents **enum-like values** with distinct meanings

**Quality Test**: Ask "Do these examples teach the user something different about the field's possible values or business meaning?" If no, use one example.

### Formatting Rules

- **Always use single quotes** for all data examples
- **Preserve original formats** exactly (e.g., 'true', '35', 'null')
- **Include anomalous values** with explanatory labels
- **No data transformation** permitted

### Example Formats by Field Type

**Multiple Examples (Different Categories):**
```
"(e.g., 'I' for increasing milepost direction, 'D' for decreasing milepost direction, 'B' for both directions)"
```

**Single Examples (Homogeneous Data):**
```
"(e.g., '174' inches)"
"(e.g., '47.961343' for Seattle area bridge location)"
```

**Edge Cases:**
```
"(e.g., '15' for normal wait, '-1' for lane closed)"
```

### CRITICAL: Edge Case Documentation

**MANDATORY**: Actively look for and document edge cases - unusual values representing special conditions.

#### **EDGE CASE DISCOVERY CHECKLIST**

For each field in the API data, systematically look for:

- [ ] **Negative values** (e.g., `-1` for closed/unavailable, `-999` for error states)
- [ ] **Zero values with special meaning** (not just numeric zero)
- [ ] **Null/empty values** and their business context
- [ ] **Magic numbers** (999, 9999, 0, -1) indicating limits or special states
- [ ] **Special strings** ('CLOSED', 'N/A', 'UNKNOWN', 'OFFLINE', 'MAINTENANCE')
- [ ] **Format variations** within the same field type
- [ ] **Boundary conditions** (0.0, 100.0, min/max values)

#### **DOCUMENTATION FORMAT:**
```typescript
// PATTERN: Normal example first, then edge cases
field.describe("Business purpose. E.g., 'normal_value' for normal condition, 'edge_value' for special condition. Business context explanation.")

// EXAMPLES:
WaitTime: z.number().describe(
  "Wait time in minutes for border crossing. E.g., '15' for normal wait, '-1' for lane closed or unavailable. Negative values indicate the lane is not operational."
)

Status: z.string().describe(
  "Operational status of the vessel. E.g., 'IN_SERVICE' for active operations, 'MAINTENANCE' for scheduled repairs, 'OUT_OF_SERVICE' for decommissioned vessels."
)
```

#### **BUSINESS CONTEXT REQUIREMENT:**
Always explain what edge cases mean in real-world terms, not just their technical representation.

#### **AVOID SPECULATION - FACTUAL ACCURACY:**
**CRITICAL:** Never speculate about specific reasons for edge cases or unusual values. Document observable behavior, not assumptions.

**✅ CORRECT - Document what you observe:**
```typescript
WaitTime: z.number().describe(
  "Current wait time for the border crossing, in minutes. E.g., '15' for normal traffic. Returns '-1' when the lane is closed or data is unavailable."
)
```

**❌ WRONG - Speculative assumptions:**
```typescript
WaitTime: z.number().describe(
  "Returns '-1' when crossing is closed for maintenance, emergencies, or weather."
)
```

**Guidelines:**
- **Document patterns**: What value indicates what state
- **Avoid specific reasons**: Don't guess why the system returns that value  
- **Use inclusive language**: "when closed or unavailable" vs "when closed for maintenance"
- **Base on data observation**: Only document patterns you actually see in the data

#### **EDGE CASE DOCUMENTATION SCOPE:**

**ALWAYS DOCUMENT (High Priority):**
- **Negative values** with business meaning (e.g., -1 = closed, -999 = error)
- **Null values** that indicate shared infrastructure or unavailable data
- **Special status codes** (0 = inactive, 999 = unknown)
- **Format variations** users need to understand (feet vs inches)

**DOCUMENT IF BUSINESS-CRITICAL (Medium Priority):**
- **Empty strings** vs null distinctions when they have different meanings
- **Boundary values** (0, maximum limits) when they indicate special states
- **Timestamp patterns** (null = never updated, specific dates = last maintenance)

**USUALLY SKIP (Low Priority):**
- **Technical null values** with no business impact
- **Standard database patterns** (auto-increment IDs, GUIDs)
- **Implementation details** that don't affect user decisions

#### **SYSTEMATIC APPROACH:**
1. **Examine EVERY field** in actual API response data
2. **Look for patterns** across multiple records/responses
3. **Apply scope priorities** above to decide what to document
4. **Document systematically** using the format above
5. **Verify business context** - don't speculate about meanings

#### **COMMON EDGE CASE PATTERNS:**
- **Transport Status**: 'IN_SERVICE', 'MAINTENANCE', 'OUT_OF_SERVICE', 'CLOSED'
- **Wait Times**: Normal minutes vs. -1 for closed, 999 for unknown
- **Availability**: Active records vs. null for inactive/shared infrastructure  
- **Measurements**: Normal ranges vs. 0 for unmeasured, -1 for errors
- **Identifiers**: Standard IDs vs. special codes for system states

---

## Quality Control

### Quality Self-Assessment Checklist

**Use this checklist to validate your work before submission:**

#### **Code Compliance Check**
- [ ] Schema variable names unchanged from original (no renaming)
- [ ] No Zod methods added (.int(), .uuid(), .strict(), .min(), etc.)
- [ ] No JSDoc comments added or modified
- [ ] Only `.describe()` annotations added to schemas and fields
- [ ] Import paths use canonical format (@/apis/shared/, @/schemas/)

#### **File Creation Check**
- [ ] `domain-analysis.[agent-name].md` created for each API
- [ ] `inputSchemas.[agent-name].ts` created with enhanced descriptions
- [ ] `outputSchemas.[agent-name].ts` created with enhanced descriptions
- [ ] `endpointDescriptions.[agent-name].json` created with business context

#### **Content Quality Check**
- [ ] All fields have business context (not just technical descriptions)
- [ ] Examples use literal API data with single quotes
- [ ] Edge cases documented with business meaning (using discovery checklist)
- [ ] Data freshness statements accurate (prioritize source documentation)
- [ ] Cross-references integrated in endpointDescriptions.json only

#### **Length and Structure Check**  
- [ ] Field descriptions within character limits (simple: 50-150, business: 150-400, complex: 400-600)
- [ ] Progressive disclosure structure used ([Purpose] + [Examples] + [Technical] + [Integration])
- [ ] Parallel language used for related fields
- [ ] Plain English throughout, active voice

#### **Business Value Check**
- [ ] Real-world applications explained for each endpoint
- [ ] Usage guidance provided where appropriate
- [ ] Business context prioritized over technical implementation
- [ ] Target audience clear from descriptions

### Context Distribution Strategy

**Endpoint Level**: Overall API purpose, target users, primary workflows  
**Schema Level**: Dataset characteristics, data patterns  
**Field Level**: Specific field purpose, format distinctions, edge cases

**Avoid Redundancy**: Don't repeat obvious API context in every field description.

### Context Management Strategies

**SYSTEMATIC APPROACH to prevent context overflow:**

#### **Session Planning:**
- Work on **maximum 2-3 endpoints** per session
- Complete **full phase** for those endpoints before continuing
- **Monitor context usage** - summarize progress at 70% usage

#### **Context Optimization Techniques:**
- **Use templates** to reduce repetitive context
- **Reference previous work** rather than re-reading files  
- **Batch similar work** (all input schemas, then all output schemas)
- **Summarize findings** when context gets heavy

#### **Information Management:**
- **Extract key patterns** early in research phase
- **Document reusable insights** in domain analysis
- **Focus on decision-making value** over comprehensive coverage
- **Avoid redundant API context** in individual field descriptions

#### **When to Summarize:**
- Context usage approaching 70%
- Repetitive patterns identified across endpoints
- Complex APIs with >10 endpoints
- Long API responses that exceed practical limits

### Length Management for Scale (1000+ Fields)

- **Pattern consolidation**: Create reusable description patterns for similar field types
- **Essential-only content**: Focus on decision-making value, eliminate redundancy
- **Tiered detail**: Core description + optional extended context for complex cases

### Data Fetching and Validation Standards

**FETCHING REQUIREMENTS:**
- **Always use `--limit 500`** for all data fetching commands
- This prevents context overflow on APIs with many endpoints
- Provides representative sample for documentation
- Monitor context usage throughout work

**EXAMPLE DATA VALIDATION PROCESS:**

#### **Step 1: Data Quality Check**
Before using examples in descriptions:
- [ ] **Verify data format** matches schema expectations
- [ ] **Check for realistic values** (not test data like 'test@example.com')
- [ ] **Confirm current data** (timestamps within last 24-48 hours when possible)
- [ ] **Validate edge cases** actually exist in data (not assumptions)

#### **Step 2: Business Context Validation**
- [ ] **Research real locations** mentioned in data
- [ ] **Verify terminology** against official transportation sources
- [ ] **Check status meanings** (e.g., what does `Status: 2` actually mean?)
- [ ] **Confirm business logic** (e.g., negative wait times indicate closure)

#### **Step 3: Example Selection Criteria**
**PRIORITIZE:**
1. **Most representative** values (common use cases)
2. **Clear business meaning** (obvious real-world significance) 
3. **Current/recent data** (not outdated examples)
4. **Edge case coverage** (when they add value)

**AVOID:**
- Generic placeholder data
- Extremely long values that don't add clarity
- Outdated timestamps or deprecated formats
- Confusing edge cases without business context

### Limited Data Scenario Guidance

**When APIs return very few records or have limited field variations:**

#### **For APIs with <5 Total Records:**
- **Use ALL available data** for examples
- Don't force 3-5 examples if only 1-2 exist
- **Quality over quantity** - better to have accurate examples than fabricated ones
- Document the limited dataset size in domain analysis

#### **For Fields with <3 Variations:**
- **Use ALL observed variations** in examples
- Don't create hypothetical examples to reach 3-5 target
- **Focus on representative coverage** of actual data patterns
- Note limited variation patterns in field descriptions

### **Context Management Concrete Guidance**

#### **When to Apply Context Management:**
- **Large APIs**: 15+ endpoints OR 100+ total fields
- **Complex domains**: Multiple interconnected data types
- **Extensive documentation**: When approaching token limits

#### **Context Management Techniques:**
1. **Batch Processing**: Work on 2-3 related endpoints per session
2. **Progressive summarization**: After each endpoint, note key patterns
3. **Template reuse**: Create field description templates for similar concepts
4. **Reference previous work**: Link to earlier findings rather than re-analyzing

#### **Context Warning Thresholds:**
- **70% context usage**: Start summarizing key findings
- **80% context usage**: Complete current endpoint and summarize session
- **90% context usage**: Emergency summarization and continuation planning

**For typical APIs (2-5 endpoints): Context management is usually unnecessary**

#### **Example Approach:**
```typescript
// API returns only 2 border crossings
CrossingName: z.string().describe(
  "Border crossing identifier. E.g., 'I5' for Interstate 5 crossing or 'SR539' for State Route 539 crossing. Limited to major US-Canada crossings in Washington State."
)

// Field has consistent format across all records  
WaitTime: z.number().describe(
  "Current wait time in minutes. E.g., '15' for normal conditions. Negative values like '-1' indicate closed or unavailable lanes."
)
```

#### **Documentation Notes:**
- **Acknowledge limitations** when they exist
- **Don't speculate** beyond observed data
- **Use clear language** about dataset scope
- **Focus on business value** of available data

### Large API Strategy

For APIs with >10 endpoints:
1. Process 3-4 endpoints per session
2. Complete full phase for those endpoints
3. Move to next batch and repeat
4. Final integration phase combines all work

---

## Comprehensive Troubleshooting Guide

### Critical Code Violations

#### **Schema Variable Renaming**
**Problem**: Renaming original schema variables  
**Examples**: `borderCrossingSchema` instead of `borderCrossingDataSchema`  
**Solution**: Keep ALL original variable names exactly as provided  
**Prevention**: Read original files carefully, preserve naming conventions

#### **Unauthorized Code Structure Changes**
**Problem**: Adding Zod validation methods  
**Examples**: `.int()`, `.uuid()`, `.strict()`, `.min()`, `.max()`  
**Solution**: Use ONLY `.describe()` annotations  
**Prevention**: Remember: ANY method addition is a structure change and prohibited

#### **JSDoc Comment Modifications**
**Problem**: Adding or modifying JSDoc comments  
**Solution**: Preserve all existing JSDoc exactly, use `.describe()` for enhancements  
**Prevention**: Think of JSDoc as read-only, use `.describe()` for documentation

### Data and Process Issues

#### **fetch-dottie Command Failures**
**Problem**: `fetch-dottie` returns no data or fails  
**Common Causes**:
- Using `api/function` format instead of function name only
- API endpoint temporarily unavailable  
- Invalid function name from endpoint discovery

**Solutions**:
- Verify using function name only: `getBorderCrossings` not `wsdot-border-crossings/getBorderCrossings`
- Double-check function name from `src/clients/` directory
- If persistent failure: Stop work and request assistance

**Do Not**: Use curl, direct HTTP requests, or workarounds

#### **Import Path Violations**
**Problem**: Creating agent-suffixed shared files or using wrong import paths  
**Examples**: 
- `import from "./roadwayLocationSchema.alice"`
- `import from "src/schemas/shared/roadwayLocation.zod"`

**Solution**: Always use canonical imports:
- `import { schema } from "@/apis/shared/schemaName.original"`
- `import { schema } from "@/schemas/[api-name]/schemaName.zod"`

### Content Quality Issues

#### **Missing Business Context**
**Problem**: Technical descriptions without real-world meaning  
**Examples**: "A string value", "An identifier", "Number field"  
**Solution**: Always explain business purpose and real-world application  
**Template**: "[Business purpose] for [real-world use]. E.g., '[example]' for [context]."

#### **Inconsistent Examples**
**Problem**: Examples don't match actual API data  
**Solution**: Use ONLY literal data from API responses with single quotes  
**Verification**: Cross-check examples against fetched API data

#### **Incorrect Data Freshness**
**Problem**: Wrong data freshness statements  
**Examples**: Labeling real-time data as "updates infrequently"  
**Solution**: Prioritize source documentation, then data type patterns  
**Pattern Reference**:
- Border crossings = "Data updates frequently" (real-time)
- Bridge clearances = "Data updates infrequently" (static)

## Integration Discovery Process

### SYSTEMATIC APPROACH to identify cross-API integration opportunities:

#### **Step 1: Data Relationship Analysis**
Look for shared field patterns across APIs:

**Location-Based Connections:**
- **Road identifiers**: Traffic flow shows 'I-405' data, travel times connect 'I-405' routes, alerts affect 'I-405' segments
- **Geographic coordinates**: Border crossings at `47.879865594, -124.35087107`, traffic cameras near same locations
- **Mile posts**: Alerts from 'milepost 184 to 185' connect with traffic flow sensors at similar mileposts

**Real-World Example:**
```javascript
// Travel times show: "I-405 @ NE 8th St in Bellevue" with delays
// → Check traffic flow on "405" near milepost 13.33  
// → Get alerts for "405" construction between MP 11-15
// → Find alternate routes via border crossings if international travel
```

#### **Step 2: Workflow Analysis**  
Identify natural sequences where one API's data feeds into another:

**Sequential Usage Patterns:**
```
Planning: getTravelTimes() → getTrafficFlow() → getAlerts() → (if delays) getBorderCrossings()
Monitoring: getVesselLocations() → (if ferry delays) getTravelTimes() → getAlerts() 
Navigation: getAlerts() → (if closures) getTrafficFlow() → getTravelTimes()
```

**Real Example from Current Data:**
- Travel time shows "CurrentTime: -1" (unavailable) for Seattle-Federal Way
- → Use getTrafficFlow() for I-5 segments between those points  
- → Check getAlerts() for construction affecting that route
- → Consider getBorderCrossings() if international alternatives needed

#### **Step 3: Complementary Information Patterns**

**Temporal Enhancement:**
- **Alert** shows construction 8pm-6am → **Travel times** may be affected during those hours
- **Traffic flow** shows current conditions → **Alerts** explain why (construction, incidents)

**Spatial Enhancement:** 
- **Bridge clearances** provide static limits → **Traffic flow** shows real-time usage
- **Border wait times** (-1 = closed) → **Travel times** for alternate routes

**Status Correlation:**
- Travel time `AverageTime: 25, CurrentTime: 34` (33% delay) suggests checking alerts for that route
- Traffic flow `FlowReadingValue: 0` often correlates with closure alerts

#### **Step 4: Integration Value Assessment**

**HIGH VALUE integrations (Always Include):**
- **Sequential workflows**: `getTravelTimes() → getAlerts() → getBorderCrossings()`
- **Real-time + explanatory**: `getTrafficFlow() + getAlerts()` (current conditions + why)
- **Static + dynamic combinations**: `getBridgeClearances() + getTrafficFlow()` (limits + usage)
- **Alternative route planning**: Primary route blocked → alternative options

**MEDIUM VALUE integrations (Include if Space):**
- **Backup scenarios**: Ferry delays → road alternatives via `getTravelTimes()`
- **Related planning**: `getVesselSchedules() + getBorderCrossings()` (different transport modes)
- **Complementary timing**: Schedule data + real-time status updates

**LOW VALUE integrations (Usually Skip):**
- **Multi-step chains**: A → B → C → D (too complex for practical use)
- **Different user bases**: Commercial trucking + recreational boating
- **Tenuous geographic connections**: APIs covering different regions with minimal overlap
- **Technical correlations**: APIs that share data formats but serve different purposes

**STOPPING CRITERIA EXAMPLES:**
- ✅ **Good**: "Use with wsdot-traffic-flow/getTrafficFlow to get current conditions on approach routes"
- ❌ **Too tenuous**: "Could potentially be used with ferry data if travelers are considering water transport as an alternative to land routes"

---

### Integration and Cross-Reference Issues

#### **Embedded Cross-References**
**Problem**: Adding cross-references in schema `.describe()` annotations  
**Solution**: ONLY add cross-references in `endpointDescriptions.json` files  
**Reason**: Prevents context bloat, maintains separation of concerns

#### **Incorrect Endpoint Names**
**Problem**: Using generic names instead of exact function names  
**Solution**: Use exact names from `EndpointDefinition` in `src/clients/`  
**Process**: Follow canonical endpoint discovery process in research guide

#### **Non-Actionable Cross-References**
**Problem**: Vague references like "useful for planning"  
**Solution**: Provide specific, actionable integration guidance  
**Template**: "Use with [api]/[endpoint] to [specific purpose]"

### File Management Issues

#### **Missing Required Files**
**Problem**: Not creating all required files per API  
**Solution**: Use file creation checklist:
- `domain-analysis.[agent-name].md` (EVERY API)
- `inputSchemas.[agent-name].ts`  
- `outputSchemas.[agent-name].ts`
- `endpointDescriptions.[agent-name].json`

#### **Incorrect File Placement**
**Problem**: Creating files outside `/working/` subdirectory  
**Solution**: ALL agent work goes in `src/apis/[api-name]/working/`  
**Prevention**: Follow file structure overview at top of this document

### Quality Assurance Workflow

#### **Technical Compliance Checklist**
1. **Use Quality Self-Assessment Checklist** before completing work
2. **Verify against troubleshooting guide** for common issues
3. **Cross-check examples** against actual API data
4. **Validate file structure** and naming conventions  
5. **Confirm code compliance** - no prohibited changes made

#### **Qualitative Success Criteria**

**EXCELLENT Documentation demonstrates:**

**Clarity & Usability:**
- [ ] **Non-expert understanding** - Someone unfamiliar with the domain can understand field purposes
- [ ] **Decision-making value** - Descriptions help users decide whether to use this field/endpoint
- [ ] **Real-world context** - Clear connection between data fields and business scenarios
- [ ] **Actionable guidance** - Users know what to do with the information

**Completeness & Accuracy:**
- [ ] **Edge case coverage** - Important special conditions documented with business meaning
- [ ] **Integration clarity** - Clear guidance on using with related APIs/endpoints
- [ ] **Current examples** - Data reflects recent, realistic usage patterns
- [ ] **Consistent terminology** - Same concepts described same way throughout

**Professional Quality:**
- [ ] **Narrative flow** - Descriptions read naturally, not like technical specifications
- [ ] **Appropriate detail level** - Right amount of information without overwhelming
- [ ] **Error-free content** - No grammar, spelling, or factual errors
- [ ] **Developer empathy** - Anticipates and addresses common developer questions

**MCP-Optimization:**
- [ ] **Agent-friendly structure** - Information organized for programmatic consumption
- [ ] **Context efficiency** - Maximum insight per token used
- [ ] **Discovery support** - Helps agents understand data relationships and usage patterns
- [ ] **Integration guidance** - Clear pathways between related functionality

### When to Request Help

**STOP WORK and request assistance for:**
- Persistent `fetch-dottie` failures after verifying command syntax
- Unclear business domain concepts that research doesn't resolve
- Technical issues with file access or tool failures  
- Conflicting information in source documentation

**Do Not**: Make workarounds, assumptions, or skip requirements

---

**Next Steps**: Review this document thoroughly, then proceed to the appropriate phase guide based on your current work stage.