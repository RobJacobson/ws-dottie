# Shared Standards

## File Naming Conventions

### WIP Files (Agent Work) - All stored in working/ subdirectory
```
src/apis/[api-name]/working/[file-type].[agent-name].[extension]
```

**Examples:**
- `src/apis/wsdot-border-crossings/working/inputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/outputSchemas.alice.ts`
- `src/apis/wsdot-border-crossings/working/endpointDescriptions.alice.json`

### Client Files (Reference)
```
src/clients/[api-name]/[function-name].[extension]
```

**Examples:**
- `src/clients/wsdot-border-crossings/getBorderCrossings.ts`
- `src/clients/wsf-vessels/vesselBasicsById.ts`

### Cross-Reference Format
For cross-references, use the client function names:
```
[api-name]/[function-name]
```

**Examples:**
- `wsdot-border-crossings/getBorderCrossings`
- `wsf-vessels/vesselBasicsById`

### Import Path Requirements
**Shared schemas:**
```typescript
import { schemaName } from "@/schemas/shared/schemaName.zod";
```

**API-specific schemas:**
```typescript
import { schemaName } from "@/schemas/[api-name]/schemaName.zod";
```

**NEVER use:**
- Relative paths with agent suffixes (e.g., `../shared/schema.alice`)
- References to .original files in working code
- Inconsistent path formats across agents

### Final Output Structure
```bash
# Main API directory contains original files and final Editor synthesis:
src/apis/[api-name]/
├── inputSchemas.original.ts           # Original file (renamed)
├── outputSchemas.original.ts          # Original file (renamed)  
├── inputSchemas.final.ts              # Editor's final synthesis
├── outputSchemas.final.ts             # Editor's final synthesis
├── endpointDescriptions.final.json    # Editor's final synthesis
├── domain-analysis.final.md           # Editor's final domain analysis
└── working/                           # All work-in-progress files
    ├── inputSchemas.alice.ts          # Agent Alice's work
    ├── outputSchemas.alice.ts         
    ├── endpointDescriptions.alice.json
    ├── domain-analysis.alice.md
    ├── inputSchemas.bob.ts            # Agent Bob's work
    └── [... all other agent and editor working files ...]
```

### Editing Rule
- **Agents**: Create and edit only agent-suffixed files in `working/` subdirectory
- **Editor**: Create final synthesis files with `.final.*` extensions in main directory
- Do not modify `.original.*` files - they preserve the baseline
- This preserves independence and enables quality synthesis workflow

## Quality Standards

### Core Principles
- **Business Context First**: Explain real-world meaning and purpose
- **Plain English**: Natural, conversational language throughout
- **Literal Data**: Use exact API response data with single quotes
- **Active Voice**: Use active voice throughout
- **Consistent Terminology**: Use domain-appropriate terms consistently

### Writing Style
- Write naturally as if explaining to a colleague
- Focus on what data means in real-world terms
- Use conversational, accessible language
- Avoid technical jargon without explanation
- Connect to business workflows and use cases

## Data Freshness Defaults

### Standard Patterns
- **WSDOT endpoints**: "Data updates infrequently."
- **WSF endpoints**: "Data updates infrequently (use cacheFlushDate for the last-updated time)."
- **Real-time feeds**: "Real-time data (updates about every X seconds/minutes)."

### Usage
- Document data freshness patterns in research phase
- Reference research findings in writing phase
- Validate consistency in integration phase

## Field Description Guidelines

### Sentence Structure
- **First sentence**: Pithy, declarative description with example
- **Second sentence**: Business context or usage guidance (for complex fields)
- **Third sentence**: Additional clarification (only if needed)

### Decision Tree for Sentence Count
- **Simple fields** (IDs, timestamps, coordinates): 1 sentence (50-150 chars)
- **Moderate complexity** (business logic, enums): 1-2 sentences (150-400 chars)
- **High complexity** (domain-specific concepts): 2 sentences max (400-600 chars)

### Conciseness Strategy for Scale (1000+ Fields)
- **Pattern consolidation**: Create reusable description patterns for similar field types
- **Cross-reference consolidation**: Move integration guidance to schema/endpoint level
- **Essential-only content**: Focus on decision-making value, eliminate redundancy
- **Tiered detail**: Core description + optional extended context for complex cases

### Templates for Simple Fields (Optimized for Scale)

#### Identifiers
```
"Unique [entity] identifier (e.g., '[single-example]')."
"System-generated unique identifier for [purpose]." // For GUIDs - no example needed
```

#### Timestamps  
```
"When [event] occurred, in UTC (e.g., '[single-timestamp]')."
```

#### Coordinates
```
"[Entity] [latitude/longitude] in decimal degrees (e.g., '[coordinate]' for [location-context])."
```

#### Amounts
```
"[Value type] in [units] (e.g., '[example]')."
```

#### Boolean Flags
```
"Whether [condition] (e.g., 'true' for [case], 'false' for [case])."
```

#### Route and Location References
```
"[Description] (e.g., '[code]' for [highway-name])."
```

### Data Examples

#### Formatting Rules
- **Always use single quotes** for all data to emphasize literal copying
- **Preserve original formats** exactly (e.g., 'true', '35', 'null')
- **Include anomalous values** with explanatory labels
- **No data transformation** permitted

#### Example Guidelines

**Single vs. Multiple Examples Decision Tree:**

**Use SINGLE example when:**
- Values are the same type/format (e.g., two random coordinates, two random dates)
- Examples don't illustrate different categories or business meanings
- Field represents homogeneous data (simple IDs, measurements, timestamps)

**Use MULTIPLE examples when:**
- Examples show **different categories** within the same field (e.g., interstate vs. state route vs. collector-distributor)
- Examples illustrate **different states or conditions** (e.g., normal vs. edge case values)
- Examples demonstrate **format variations** that users need to understand (e.g., different route naming conventions)
- Field represents **enum-like values** with distinct meanings

**Quality Test**: Ask "Do these examples teach the user something different about the field's possible values or business meaning?" If no, use one example.

### Parallel Language for Related Fields

**CRITICAL**: When fields represent the same concept in different formats/units, use parallel language structure to avoid confusion.

**Problem Example:**
```typescript
// ❌ CONFUSING - Same concept, different emphasis
MaximumFeetInch: "...Provides the highest clearance point for reference, though minimum clearance is critical for safety."
MaximumInches: "...Used by routing software to determine clearance margins and safety buffers."
```

**Solution Example:**
```typescript
// ✅ PARALLEL - Same concept, consistent emphasis
MaximumFeetInch: "Maximum vertical clearance under the bridge in human-readable feet and inches format (e.g., '21 ft 6 in'). Provides the highest clearance point for reference."
MaximumInches: "Maximum vertical clearance under the bridge measured in inches for precise calculations (e.g., '258' for 21 ft 6 in). Provides the highest clearance point for reference."
```

**Parallel Structure Rules:**
1. **Same core concept**: Use identical business purpose explanation
2. **Format distinction only**: Only vary the format/unit description
3. **Consistent examples**: Use corresponding values (e.g., '21 ft 6 in' = '258' inches)
4. **Avoid different emphasis**: Don't make users think they serve different purposes
5. **Avoid obvious repetition**: Don't repeat the API's main purpose in every field - put that context at endpoint/schema level

**Improved Example (Concise):**
```typescript
// ✅ BETTER - Focus on field distinction, not obvious API purpose
MaximumFeetInch: "Maximum vertical clearance in human-readable format (e.g., '21 ft 6 in')."
MaximumInches: "Maximum vertical clearance in inches for calculations (e.g., '258' for 21 ft 6 in)."
```

### Explaining Field Distinctions vs. Format Differences

**Format Differences (Parallel Language):**
When fields represent the same measurement in different units, use parallel structure:
```typescript
HeightFeetInch: "Bridge clearance in human-readable format (e.g., '14 ft 5 in')."
HeightInches: "Bridge clearance in inches for calculations (e.g., '173' for 14 ft 5 in)."
```

**Meaningful Distinctions (Explain the Difference):**
When fields represent different aspects of the same concept, explain why both exist:
```typescript
MaximumFeetInch: "Highest clearance point under bridge in human-readable format (e.g., '16 ft 2 in'). Useful for reference but use minimum for safety."
MinimumFeetInch: "Lowest clearance point under bridge in human-readable format (e.g., '14 ft 5 in'). Critical measurement - vehicles must be shorter than this height."
```

**Key Principle**: Explain **why** users need both values when the distinction has real-world implications.

## Field Relationship Strategy

### Core Principle: Focus on Similarities and Differences

**When fields describe the SAME thing:**
- Use consistent, parallel language
- Vary only format/unit descriptions
- Maintain identical business purpose

**When fields describe SIMILAR-BUT-DIFFERENT concepts:**
- Focus descriptions on "what's different"
- Use factual distinctions (highest/lowest, first/last, etc.)
- Avoid speculative safety advice or usage guidance unless clearly documented in source API

### Field Relationship Analysis

**Step 1: Identify the Relationship**
- **Identical concept, different format**: Use parallel language
- **Related concepts with meaningful differences**: Explain the differences
- **Unrelated concepts**: Describe independently

**Step 2: Apply Appropriate Strategy**

#### Same Concept Strategy
```typescript
// ✅ Identical concept - parallel language
HeightFeetInch: "Bridge clearance in human-readable format (e.g., '14 ft 5 in')."
HeightInches: "Bridge clearance in inches for calculations (e.g., '173')."
```

#### Similar-But-Different Strategy  
```typescript
// ✅ Related concepts - focus on differences
MaxHeight: "Highest clearance point under bridge (e.g., '16 ft 2 in')."
MinHeight: "Lowest clearance point under bridge (e.g., '14 ft 5 in')."
```

#### Different Concepts Strategy
```typescript
// ✅ Unrelated concepts - describe independently
BridgeNumber: "Two-part identifier for bridge inventory tracking (e.g., '5/629A')."
Latitude: "Bridge location latitude for GPS navigation (e.g., '47.961343')."
```

#### Example Formats by Field Type

**Multiple Examples (Different Categories):**
- **Enum values**: "(e.g., 'I' for increasing milepost direction, 'D' for decreasing milepost direction, 'B' for both directions)"
- **Route types**: "(e.g., '005' for I-5, '520' for SR 522, '522CI01071' for collector-distributor roads)"
- **Bridge identifiers**: "(e.g., '5/629A' for bridge on I-5, '520/36.8P' for pedestrian bridge on SR 520, 'BOT-09' for maintenance structures)"
- **Crossing types**: "(e.g., 'I-5 UNDER NE 130TH ST' for interstate crossing, 'SR 522 EB UNDER ESFR RAILROAD' for railroad crossing)"

**Single Examples (Homogeneous Data):**
- **Simple measurements**: "(e.g., '174' inches)"
- **Coordinates**: "(e.g., '47.961343' for Seattle area bridge location)"
- **Timestamps**: "(e.g., '2025-09-27T21:30:00.000Z')"
- **Simple IDs**: "(e.g., '6192')"

**Edge Cases:**
- **With special conditions**: "(e.g., '15' for normal wait, '-1' for lane closed)"
- **With null handling**: "(e.g., 'I5', 'null' for no location data)"

**Technical Fields:**
- **Date formats**: "(e.g., '2025-09-27T21:30:00.000Z')"
- **Geographic coordinates**: "(e.g., '47.961343' for [specific bridge location])"
- **Numeric IDs**: "(e.g., '6192')"
- **GUIDs**: No example needed, or "(GUID format)" if format clarification needed

#### CRITICAL: Edge Case Documentation
**MANDATORY**: When examining API data, actively look for and document edge cases - unusual values that represent special conditions rather than normal data:
- **Magic numbers**: Values like `-1`, `0`, `999` that indicate special states
- **Special strings**: Values like 'CLOSED', 'N/A', 'UNKNOWN' that represent conditions
- **Format**: Always document edge cases using Doug's pattern: `(e.g., 'normal value' for normal condition, 'edge value' for special condition, 'another edge' for another condition)`
- **Business context**: Explain what the edge case means in real-world terms

## Schema Documentation Requirements

### CRITICAL: .describe() Annotations Required
- **ALL schema definitions MUST have a detailed `.describe()` clause**
- **DO NOT modify existing JSDoc comments** - they preserve original WSDOT/WSF documentation
- **DO NOT add new JSDoc comments** - use `.describe()` annotations instead
- **Preserve original variable names** - do not rename schema variables

### Input Schema Descriptions
- **No parameters**: "Input parameters to retrieve all [entity type] across [scope] (none required)."
- **Single entity**: "Input parameters to retrieve a specific [entity type] by [identifier]."
- **Filtered search**: "Input parameters to search [entity type] by [criteria] for [purpose]."

### Output Schema Descriptions
```
"Returns [container] of [entity type] including [key data] for [use case] (typically [cardinality]). [Business context]. [Data freshness]."
```

### Schema Documentation Examples

#### ✅ CORRECT - Preserve JSDoc, Add .describe()
```typescript
/**
 * Schema for GetBorderCrossings input parameters
 */
export const getBorderCrossingsInputSchema = z.object({}).describe(
  "Input parameters to retrieve all border crossing wait times across Washington State (none required)."
);
```

#### ❌ WRONG - Modified JSDoc, No .describe()
```typescript
/**
 * Input parameters to retrieve all border crossing wait times across Washington State (none required).
 * This endpoint provides comprehensive wait time data for all active US-Canada border crossings,
 * enabling travelers to compare conditions and choose the optimal crossing route.
 */
export const getBorderCrossingsInputSchema = z.object({});
```

#### ❌ WRONG - Renamed Variables
```typescript
export const borderCrossingsInputSchema = z.object({}).describe(
  "Input parameters to retrieve all border crossing wait times across Washington State (none required)."
);
```

### Endpoint Descriptions
```
"[Action] [entity type] for [primary use case]. [Business context and target users]."
```

**Examples:**
- "Shows current wait times at Canadian border crossings to help travelers choose the fastest route."
- "Lists all ferry vessels with basic info like names and capacity for trip planning."
- "Calculates toll costs for HOV lanes to help drivers decide whether to use them."

## Context and Cross-Reference Guidelines

### Context Placement Strategy
**Endpoint-level**: Overall API purpose, target users, primary workflows
**Schema-level**: Dataset characteristics, data patterns, integration workflows  
**Field-level**: Specific field purpose, format distinctions, edge cases

**Avoid Redundancy**: Don't repeat obvious API context in every field description.

**Example Context Distribution:**
```typescript
// ✅ Endpoint level: Overall purpose
"Retrieves bridge clearance data for commercial vehicle route planning..."

// ✅ Schema level: Dataset characteristics  
"Returns array of bridge clearance records (typically 500+ bridges statewide)..."

// ✅ Field level: Specific distinctions
MaximumFeetInch: "Maximum clearance in human-readable format (e.g., '21 ft 6 in')."
MinimumFeetInch: "Minimum clearance in human-readable format (e.g., '14 ft 1 in')."
```

### Cross-Reference Placement Strategy
**Field-level**: Only for direct data relationships (IDs that reference other endpoints)
**Schema-level**: For workflow integrations and complementary data
**Endpoint-level**: For comprehensive integration patterns and user workflows

### When to Add Cross-References
- **Field-level**: When field contains ID/key that directly references another endpoint
- **Schema-level**: When entire dataset commonly used with other APIs
- **Endpoint-level**: For comprehensive workflow guidance and discovery

### Cross-Reference Format
- **Field-level**: `"Use with [api]/[endpoint] to fetch detailed [entity] information."`
- **Schema-level**: `"Use with [api]/[endpoint] and [api]/[endpoint] for comprehensive [workflow]."`
- **Endpoint-level**: Focus on business workflows and user decision-making patterns

### Verb Usage
- **"Use with"**: For sequential flows (A output → B input)
- **"Combine with"**: For true A+B→C combinations
- **Multiple references**: Use "or" for alternatives, separate sentences for different APIs

### Examples

#### Good Cross-References
```
"The vessel's unique identifier as an integer (e.g., '1'). Use this with wsf-vessels/vesselBasicsById to fetch detailed vessel information."
```

```
"The terminal's unique identifier as an integer (e.g., '7'). Use this to get arriving terminals. Use with wsf-schedule/terminalMates to find connecting routes and with wsf-fares/terminalCombo to calculate fares."
```

#### Avoid These Patterns
```
❌ "This relates to terminal information and schedule data."
❌ "Use this to display crossings on maps via wsdot-traffic-flow/getTrafficFlow..."
❌ "Binary indicator showing lane direction via wsdot-travel-times/getTravelTimes"
```

### Common Integration Patterns
- **Traffic conditions**: `wsdot-traffic-flow/getTrafficFlow`
- **Travel calculations**: `wsdot-travel-times/getTravelTimes`
- **Travel alerts**: `wsdot-highway-alerts/getAlerts`
- **Vehicle restrictions**: `wsdot-bridge-clearances/getBridgeClearances`
- **Ferry routes**: `wsf-vessels/vesselBasicsById`, `wsf-vessels/vesselAccommodations`, `wsf-terminals/terminalBasicsById`

## Context Management

### Data Fetching Limits
- **Always use `--limit 500`** for all data fetching commands
- This controls JSON output lines, not records
- Prevents context overflow on APIs with many endpoints
- Provides representative sample for documentation

### Context Usage Guidelines
- **Monitor context usage** throughout work
- **If approaching 70%**, summarize findings and continue
- **Focus on quality** over quantity of data analysis
- **Use templates** to reduce cognitive load

### Large API Strategy
For APIs with >10 endpoints:
1. Process 3-4 endpoints per session
2. Complete full phase for those endpoints
3. Move to next batch and repeat
4. Final integration phase combines all work

## Common Issues and Solutions

### Edge Case Documentation Requirements
- **Mandatory analysis**: Always examine data for unusual values that represent special conditions
- **Magic numbers**: Look for values like `-1`, `0`, `999` that indicate special states
- **Special strings**: Document values like 'CLOSED', 'N/A', 'UNKNOWN' that represent conditions
- **Format**: Use pattern: `(e.g., 'normal value' for normal condition, 'edge value' for special condition)`
- **Example**: `(e.g., '10' for 10-minute wait, '-1' for lane closed or unavailable)`

### Example Quality Standards
- **Use single examples** for simple fields unless variation shows different meanings
- **Add context to coordinates**: Reference specific locations when possible
- **Minimize GUID examples**: System identifiers rarely need full examples
- **Focus on business value**: Examples should illustrate the field's purpose

### Missing .describe() Annotations
- **Problem**: Adding JSDoc comments instead of `.describe()` annotations
- **Solution**: ALWAYS add `.describe()` clauses to schema definitions, preserve original JSDoc comments
- **Do Not**: Modify existing JSDoc comments or rename schema variables

### Data Fetching Failures
- **Problem**: `fetch-dottie` returns no data
- **Solution**: Stop work and request assistance
- **Do Not**: Use curl, direct HTTP requests, or workarounds

### Over-Engineering Simple Fields
- **Problem**: Writing too much for obvious fields
- **Solution**: Use templates for simple fields, focus on business context for complex ones

### Missing Business Context
- **Problem**: Technical descriptions without real-world meaning
- **Solution**: Always explain what the data means in practice

### Inconsistent Examples
- **Problem**: Examples don't match actual API data
- **Solution**: Use only literal data from API responses with single quotes

### Generic Descriptions
- **Problem**: Descriptions like "A string value" or "An identifier"
- **Solution**: Always include business context and real-world meaning

### Incorrect Endpoint Names
- **Problem**: Using generic names instead of exact function names
- **Solution**: Always use exact endpoint function names from `src/clients/**`

### Embedded Cross-References
- **Problem**: Adding cross-references mid-sentence
- **Solution**: Always add cross-references as separate final sentences

### Non-Actionable Cross-References
- **Problem**: Generic references like "This might be useful for route planning"
- **Solution**: Provide specific, actionable guidance with exact endpoint names
