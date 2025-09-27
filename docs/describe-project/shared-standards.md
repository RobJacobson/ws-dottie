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
- **Simple fields** (IDs, timestamps, coordinates): 1-2 sentences
- **Moderate complexity** (business logic, enums): 2 sentences  
- **High complexity** (domain-specific concepts): 2-3 sentences

### Templates for Simple Fields

#### Identifiers
```
"The [entity]'s unique identifier as [type] (e.g., '[example]')."
```

#### Timestamps
```
"The time when [event] occurred, in UTC (e.g., '[example]')."
```

#### Coordinates
```
"The [entity]'s [coordinate type] coordinate in decimal degrees (e.g., '[example]')."
```

#### Amounts
```
"The [value type] in [units] for [purpose] (e.g., '[example]')."
```

### Data Examples

#### Formatting Rules
- **Always use single quotes** for all data to emphasize literal copying
- **Preserve original formats** exactly (e.g., 'true', '35', 'null')
- **Include anomalous values** with explanatory labels
- **No data transformation** permitted

#### Example Formats
- **Normal values**: "(e.g., 'I5', 'SR539', '15')"
- **Anomalous values with edge cases**: "(e.g., 'I5', 'SR539', '15' for normal wait, '-1' for lane closed or unavailable)"
- **Null values**: "(e.g., 'I5', 'null' for no location data)"
- **Date formats**: "(e.g., '/Date(1758909900000-0700)/')"

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

## Cross-Reference Guidelines

### When to Add Cross-References
- **Specific endpoint relationships**: When data from one endpoint is used as input for another
- **Workflow guidance**: When endpoints are designed to work together
- **Discovery purposes**: When related data provides additional context

### Cross-Reference Format
- **Placement**: Add as separate final sentence or appended clause
- **Timing**: Add only during Integration Phase, not during writing
- **Format**: Use exact endpoint function names in `[api-name]/[function-name]` format

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

### Missing Edge Case Documentation
- **Problem**: Only documenting normal/expected values, ignoring unusual values that represent special conditions
- **Solution**: ALWAYS analyze data for magic numbers (e.g., `-1`, `0`, `999`) and special strings that indicate edge cases
- **Format**: Use Doug's pattern: `(e.g., 'normal value' for normal condition, 'edge value' for special condition)`
- **Example**: `(e.g., '10' for 10-minute wait, '5' for 5-minute wait, '-1' for lane closed or unavailable)`

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
