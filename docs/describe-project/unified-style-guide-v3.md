# Unified Zod Schema Annotation Style Guide for WSDOT/WSF APIs (v3)

## Overview

This style guide provides comprehensive instructions for AI agents tasked with enhancing Zod 4 schema annotations for the Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs. The goal is to create semantically rich, human-readable descriptions that serve both developers and AI agents through **narrative descriptions only** using Zod 4's `.describe()` method.

## 🚨 Critical Reminders for Agents

- **Ground Truth is API Data:** Always prioritize actual API data samples over official documentation when discrepancies arise regarding data types, nullability, or specific values.
- **Review Actual Data:** For each endpoint you work on, you **must** fetch and review actual API data samples using `fetch-dottie` CLI or similar tools.
- **Failure Condition:** Any inability to fetch correct data using `fetch-dottie` is a **failure condition**. You must **stop and ask the user** for clarification or assistance immediately.
- **No Schema Modification:** **NEVER modify schema implementations or related fetching logic** unless expressly requested by the user. Your task is to enhance annotations only.
- **Report Discrepancies:** Actively look for and report any discrepancies between our schemas/data and official documentation or unexpected behaviors in data samples.
- **API Access Handled Automatically:** The `ws-dottie` library handles API access codes automatically. Omit `APIAccessCode` from schema parameters as it's handled by the underlying system.
- **Focus on Rich Descriptions:** Create comprehensive, narrative descriptions that explain purpose, context, and relationships. Use **only** `.describe()` - no metadata.
- **Provide Relational Context:** It is highly beneficial to provide context about the semantic relationships between different entities and different endpoints. Explain what an entity represents in the real world and how data from different endpoints can be combined or used together.
- **Propose Updates:** If any part of this style guide is confusing, ambiguous, or could be improved, you are encouraged to propose updates.
- **Seek Clarification:** If you are unsure about how to proceed with any portion of the work, stop and request clarification from the user.

## 1. Core Architecture: Narrative-Only Approach

Our annotations use **only** Zod 4's `.describe()` method as the single source of information. No metadata, no `.meta()` calls, no additional complexity. Everything goes into the narrative description.

### Basic Structure

```typescript
import { z } from "zod/v4";

// Field-level annotation
const fieldSchema = z.string().describe(
  "Provides a unique identifier for [entity type] used for [primary purpose]. Use [api]/[endpoint] to retrieve [related data]. [Additional context or business rules]. Data updates [frequency]."
);

// Schema-level annotation
const objectSchema = z.object({
  // field definitions with .describe() annotations
}).describe(
  "Returns a collection of [entity type] providing [primary purpose] for [target users]. Data includes [key components] and updates [frequency]. Use [api]/[endpoint] for [related operations]."
);
```

## 2. Four Core Templates (No Exceptions)

### Template 1: Input Schema
**Pattern:** `"Input parameters to [action] [entity] [criteria] (none required)."`

```typescript
// No parameters
"Input parameters to retrieve all highway cameras across Washington State (none required)."

// Single entity retrieval
"Input parameters to retrieve a specific highway camera by unique identifier."

// Filtered search
"Input parameters to search highway cameras by route and milepost range for specific geographic areas."
```

### Template 2: Input Field
**Pattern:** `"A [field type] as [data type] for [purpose] (e.g., '[example1]', '[example2]')."`

```typescript
"A state route identifier as a string for filtering highway cameras by specific roadway (e.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520)."

"A weather station identifier as an integer for retrieving current conditions from a specific WSDOT weather station (e.g., '1909' for S 144th St on I-5, '1984' for Stevens Pass)."
```

### Template 3: Output Schema
**Pattern:** `"Returns [entity type] including [key data] for [use case]. [Business context]. Data updates [frequency]."`

```typescript
"Returns a list of highway cameras including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides comprehensive data for real-time traffic visualization and route planning. Data updates in real-time."

"Returns information for one WSF terminal including basic details, amenities, and location data for route planning and passenger navigation. Provides essential data for fare calculations and schedule lookups. Data updates infrequently."
```

### Template 4: Output Field
**Pattern:** `"The [entity]'s [field purpose] as [data type] (e.g., '[example1]', '[example2]'). Use this to [cross-reference]."`

```typescript
"The highway camera's unique numeric identifier as an integer (e.g., '9818' for Anacortes Airport, '9460' for SR 9 at MP 2.7). Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera."

"The terminal's latitude coordinate in decimal degrees for displaying the terminal location on maps and navigation systems (e.g., '47.821539' for Seattle area, '48.498333' for Anacortes). Use this for map positioning and geographic visualization."
```

## 3. Example Placement Rules (Simple)

**Rule:** Examples always go at the end of the first sentence in parentheses.
**Format:** `(e.g., 'example1', 'example2')`
**No exceptions, no complex placement rules.**

```typescript
// ✅ Correct
"The vessel's unique identifier as an integer (e.g., '1' for Cathlamet, '2' for Chelan). Use this to fetch vessel details."

// ❌ Wrong - examples in middle
"The vessel's unique identifier (e.g., '1' for Cathlamet) as an integer for fetching details."

// ❌ Wrong - examples at end of description
"The vessel's unique identifier as an integer for fetching details. Use this to get vessel information (e.g., '1' for Cathlamet)."
```

## 4. Cross-Reference Format (Consistent)

**Format:** `Use this to [action] via [api]/[endpoint]`
**Examples:**
- `Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera`
- `Use this to retrieve terminal details via wsf-terminals/terminalbasics`
- `Use this to get current weather conditions via wsdot-weather/getCurrentWeatherInformation`

## 5. Update Frequency Integration

Include update frequency directly in descriptions using these specific patterns:

### WSF APIs (Ferry System) - Cache Flush Date Mechanism
WSF APIs use a cache flush date mechanism for efficient data management. Most data is static and can be cached, with only a few exceptions for real-time data.

```typescript
// Static WSF data (most common) - can be cached using cache flush date
"Returns terminal basic information including amenities and location data for route planning and passenger navigation. Data is static and can be cached using the cache flush date mechanism."

// Real-time WSF data (rare exceptions) - should not be cached
"Returns real-time vessel position data including current location, speed, and heading for tracking and navigation systems. Data updates continuously and should not be cached."

// Cache flush date endpoint
"Returns the cache flush date indicating when WSF service data was last changed for coordinating application cache invalidation. Use this to determine when to refresh cached data instead of constantly re-fetching static information."
```

### WSDOT APIs - Manual Re-fetching Required
WSDOT APIs require manual re-fetching and have obvious update patterns based on data type.

```typescript
// Real-time WSDOT data (obvious from context)
"Returns real-time border crossing wait time data including current conditions and estimated delays for traveler planning and traffic management systems."

"Returns current weather information from WSDOT weather stations including temperature, wind speed, and precipitation data for environmental monitoring and traveler safety."

"Returns real-time traffic flow data including speed and congestion levels from highway sensors for traffic management and route planning."

// Static WSDOT data (obvious from context)
"Returns bridge clearance information including height restrictions and safety warnings for commercial vehicle routing and navigation systems."

// Special case: Highway cameras (static data, dynamic images)
"Returns highway camera information including location and operational status for traffic monitoring systems. Camera data is static, but images update every 5 minutes via the provided URL."
```

### When to Omit Frequency Information
```typescript
// When frequency is obvious from context, omit it
"Returns the terminal's unique identifier as an integer (e.g., '1' for Seattle, '3' for Bainbridge Island). Use this to fetch terminal details."

// When the field itself indicates the frequency
"Returns the timestamp when this weather reading was recorded as a JavaScript Date object in UTC for determining data freshness."
```

## 6. Comprehensive Examples by Schema Type

### Input Schema Examples
```typescript
// No-parameter API
z.object({}).describe(
  "Input parameters to retrieve all highway cameras across Washington State (none required)."
)

// Single-entity retrieval
z.object({
  CameraID: z.number()
}).describe(
  "Input parameters to retrieve a specific highway camera by unique identifier."
)

// Filtered search
z.object({
  StateRoute: z.string(),
  StartingMilepost: z.number(),
  EndingMilepost: z.number()
}).describe(
  "Input parameters to search highway cameras by route and milepost range for specific geographic areas."
)
```

### Input Field Examples
```typescript
// Identifier parameter
z.string().describe(
  "A state route identifier as a string for filtering highway cameras by specific roadway (e.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520)."
)

// Range parameter
z.number().describe(
  "The starting milepost location as a number for filtering cameras along a specific route segment (e.g., '0' for route beginning, '10' for 10 miles from start). Use with EndingMilepost to define a route segment."
)
```

### Output Schema Examples
```typescript
// Entity list
z.array(cameraSchema).describe(
  "Returns a list of highway cameras including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides comprehensive data for real-time traffic visualization and route planning. Data updates in real-time."
)

// Single entity
z.object({
  CameraID: z.number(),
  DisplayLatitude: z.number(),
  DisplayLongitude: z.number()
}).describe(
  "Returns information for one highway camera including location details, image data, and operational status for traffic monitoring and traveler information systems. Provides essential data for real-time traffic visualization and route planning."
)
```

### Output Field Examples
```typescript
// Identifier field
z.number().describe(
  "The highway camera's unique numeric identifier as an integer (e.g., '9818' for Anacortes Airport, '9460' for SR 9 at MP 2.7). Use this ID to fetch data for individual cameras via wsdot-highway-cameras/getHighwayCamera."
)

// Coordinate field
z.number().describe(
  "The highway camera's latitude coordinate in decimal degrees for displaying the camera location on maps and navigation systems (e.g., '47.821539' for Seattle area, '48.498333' for Anacortes). Use this for map positioning and geographic visualization."
)

// Status field
z.number().describe(
  "The highway alert's severity level indicating impact assessment (1=Low, 2=Medium, 3=High, 4=Critical). Used for prioritizing alert display and routing decisions."
)
```

## 7. Common Anti-Patterns to Avoid

### ❌ Don't Use Metadata
```typescript
// Wrong - using .meta()
z.string().describe("Terminal ID").meta({
  relatedEndpoints: ["wsf-terminals/terminalbasics"],
  updateFrequency: "static"
})

// Correct - everything in description
z.string().describe(
  "The terminal's unique identifier as a string (e.g., '1' for Seattle, '3' for Bainbridge Island). Use this to fetch terminal details via wsf-terminals/terminalbasics. Data updates infrequently."
)
```

### ❌ Don't Use Generic Descriptions
```typescript
// Wrong - too generic
z.string().describe("A string value")
z.number().describe("A number representing the amount")
z.string().describe("Terminal ID")

// Correct - specific and contextual
z.string().describe(
  "The terminal's unique identifier as a string (e.g., '1' for Seattle, '3' for Bainbridge Island). Use this to fetch terminal details via wsf-terminals/terminalbasics."
)
```

### ❌ Don't Use Passive Voice
```typescript
// Wrong - passive voice
z.string().describe("May be used to identify a terminal")
z.number().describe("Is used for fare calculations")

// Correct - active voice
z.string().describe("The terminal's unique identifier as a string (e.g., '1' for Seattle). Use this to identify terminals.")
z.number().describe("The fare amount in USD for the specified passenger category (e.g., '$15.50' for adult passenger). Use this for fare calculations.")
```

### ❌ Don't Skip Examples
```typescript
// Wrong - no examples
z.string().describe("The terminal's unique identifier as a string for route planning.")

// Correct - with examples
z.string().describe(
  "The terminal's unique identifier as a string (e.g., '1' for Seattle, '3' for Bainbridge Island). Use this for route planning via wsf-terminals/terminalbasics."
)
```

## 8. Quality Assurance Framework

### Comprehensive Review Checklist

#### Narrative Description Quality
1. **Template Compliance:** Does the description follow one of the 4 core templates exactly?
2. **Readability:** Can the description be read aloud naturally without stumbling?
3. **Completeness:** Does it explain purpose, context, and cross-references?
4. **Semantic Richness:** Does it answer "What is this for?" and "How is it used?"
5. **Active Voice:** Uses imperative mood and present tense consistently
6. **Specificity:** Avoids generic terms like "identifier" without context
7. **Length:** Stays within word limits (20-100 words for fields, 30-120 for schemas)
8. **Cross-References:** Includes related endpoints for discoverability

#### Technical Accuracy
9. **Data Validation:** Verifies examples against actual API responses
10. **Type Accuracy:** Ensures descriptions match Zod schema definitions
11. **Relationship Accuracy:** Confirms cross-references point to valid endpoints
12. **Business Logic:** Validates domain-specific rules against real-world behavior

#### Consistency and Standards
13. **Terminology:** Uses consistent domain terms (e.g., "terminal" not "station")
14. **Patterns:** Follows established templates for similar field types
15. **Formatting:** Uses consistent parenthetical patterns for examples
16. **Cross-References:** Uses proper `[api]/[endpoint]` format for related endpoints

### Validation Criteria

#### Must-Have Elements
- [ ] Follows one of the 4 core templates exactly
- [ ] Includes cross-reference to related endpoints
- [ ] Contains real-world examples from actual API data
- [ ] Includes business context and operational notes
- [ ] No metadata - everything in description

#### Should-Have Elements
- [ ] Enum value mappings for enum fields
- [ ] Geographic or operational scope context
- [ ] Data freshness indicators when relevant
- [ ] Business rule integration

#### Quality Indicators
- [ ] Description reads naturally when spoken aloud
- [ ] Examples are diverse and representative
- [ ] Business context is clear and accurate
- [ ] Relationships to other entities are well-documented
- [ ] No redundant or conflicting information

## 9. Documenting Business Workflows and Interrelationships

### The Importance of Plain English Explanations

Agents must focus on creating "plain English" explanations that provide semantic meaning and understanding for both AI agents and humans. The goal is to explain not just what data is returned, but **how different endpoints work together** to solve real-world problems.

### Common Workflow Patterns

#### Pattern 1: Discovery → Details Workflow
Many APIs follow a pattern where you first discover entities, then get detailed information about specific entities.

**Example: Vessel Information Workflow**
```typescript
// Step 1: Discover vessels
"The vessel's unique identifier as an integer (e.g., '1' for Cathlamet, '2' for Chelan). Use this ID to fetch detailed vessel information via wsf-vessels/vesselBasicsById, then use that VesselID to get accommodations via wsf-vessels/vesselAccommodations or specifications via wsf-vessels/vesselStats."

// Step 2: Get basic vessel info
"Returns basic vessel information including name, class, and operational status for fleet management and passenger information systems. Use the VesselID from this response to fetch detailed accommodations via wsf-vessels/vesselAccommodations or technical specifications via wsf-vessels/vesselStats."

// Step 3: Get detailed information
"Returns detailed vessel accommodation information including amenities and accessibility features for passenger planning and accessibility compliance. Requires a VesselID obtained from wsf-vessels/vesselBasics."
```

#### Pattern 2: Multi-Step Planning Workflow
Complex planning often requires multiple API calls in sequence.

**Example: Ferry Trip Planning Workflow**
```typescript
// Step 1: Get valid date range
"Returns the valid date range for which schedule and fare data is available for trip planning. Use this to validate user-selected dates before calling wsf-schedules/terminals and wsf-fares/terminals."

// Step 2: Get available terminals for date
"Returns valid departing terminals for a specific trip date for route planning and schedule lookups. Use the TerminalID from this response to get arriving terminals via wsf-schedules/terminalMates, then use both terminal IDs to get schedules via wsf-schedules/schedule."

// Step 3: Get terminal combinations
"Returns valid terminal combinations for fare calculations and route planning. Use the TerminalID values from this response to calculate fares via wsf-fares/terminalCombo and get detailed fare information via wsf-fares/fareLineItems."
```

#### Pattern 3: Real-time Monitoring Workflow
For real-time data, explain how different endpoints provide complementary information.

**Example: Traffic Monitoring Workflow**
```typescript
// Get current conditions
"Returns real-time traffic flow data including speed and congestion levels from highway sensors for traffic management and route planning. Use the FlowDataID from this response to get detailed sensor information, and combine with wsdot-highway-alerts/getAlerts for complete traffic picture."

// Get alerts that might affect flow
"Returns active highway alerts including incidents and construction that may impact traffic flow conditions. Use this in combination with wsdot-traffic-flow/getTrafficFlows to understand both current conditions and potential disruptions."
```

### Documenting Complex API Relationships

#### WSF Schedules and Fares Integration
The WSF Schedules and Fares APIs are closely integrated and can be confusing. Always explain how they work together:

```typescript
// Schedule endpoint explaining fare integration
"Returns schedule information including departure times and vessel assignments for trip planning. Use the TerminalID and RouteID from this response to calculate fares via wsf-fares/terminalCombo, then get detailed fare breakdown via wsf-fares/fareLineItems."

// Fare endpoint explaining schedule integration  
"Returns fare information for specific terminal combinations and trip dates for cost planning and booking systems. Use the TerminalID values from this response to get available schedules via wsf-schedules/terminals, then get departure times via wsf-schedules/schedule."
```

#### WSDOT Weather and Traffic Integration
Explain how weather affects traffic conditions:

```typescript
// Weather endpoint explaining traffic impact
"Returns current weather information from WSDOT weather stations including temperature, wind speed, and precipitation for environmental monitoring and traveler safety. Use this data in combination with wsdot-mountain-pass-conditions/getMountainPassConditions to understand how weather affects mountain pass accessibility."

// Mountain pass endpoint explaining weather dependency
"Returns real-time mountain pass conditions including weather-related restrictions and chain requirements for winter travel planning. Weather data from wsdot-weather/getCurrentWeatherInformation helps predict pass conditions and travel restrictions."
```

### Business Context Guidelines

#### Always Explain the "Why"
Don't just describe what data is returned - explain why someone would need it:

```typescript
// ❌ Poor - just describes data
"Returns vessel position data including latitude, longitude, and speed."

// ✅ Good - explains business purpose
"Returns real-time vessel position data including current location, speed, and heading for passenger tracking, arrival time predictions, and fleet management systems. Use this to show passengers where their ferry is and when it will arrive."
```

#### Explain Operational Context
Help users understand how the data fits into real-world operations:

```typescript
// ❌ Poor - technical description only
"Returns terminal sailing space data including available drive-up and reservation spaces."

// ✅ Good - operational context included
"Returns real-time terminal sailing space data including available drive-up and reservation spaces for departure planning and capacity management. Use this to help passengers decide whether to make reservations or risk drive-up availability, and to manage terminal congestion."
```

#### Document Decision Points
Explain when to use different endpoints or approaches:

```typescript
// Good example of decision guidance
"Returns basic terminal information for route planning and passenger navigation. For detailed amenities and accessibility information, use wsf-terminals/terminalVerbose. For real-time space availability, use wsf-terminals/terminalSailingSpace. For current wait times and tips, use wsf-terminals/terminalWaitTimes."
```

### Cross-Reference Best Practices

#### Use Action-Oriented Language
Make cross-references actionable:

```typescript
// ❌ Poor - passive reference
"Related to wsf-vessels/vesselBasics."

// ✅ Good - actionable guidance
"Use this VesselID to fetch detailed vessel information via wsf-vessels/vesselBasicsById, then get accommodations via wsf-vessels/vesselAccommodations."
```

#### Explain the Relationship
Don't just list related endpoints - explain how they relate:

```typescript
// ❌ Poor - just lists endpoints
"Use wsf-schedules/terminals and wsf-fares/terminals."

// ✅ Good - explains the relationship
"Use wsf-schedules/terminals to get valid departing terminals for your trip date, then use wsf-schedules/terminalMates to find arriving terminals, then use both terminal IDs with wsf-fares/terminalCombo to calculate fares for your specific route."
```

## 10. Endpoint-Level Documentation

### Overview

While input and output schemas provide technical details about data structures, endpoint-level documentation provides the business context and overall purpose of each endpoint. This documentation is stored in a separate `endpoint-descriptions.json` file in each API folder to maintain a single source of truth.

### File Structure

Each API folder should contain:
```
src/apis/[api-name]/
├── inputSchemas.ts          # Technical input parameter schemas
├── outputSchemas.ts         # Technical output data schemas
└── endpoint-descriptions.json # Business context and purpose descriptions
```

**Important:** The `endpoint-descriptions.json` file is **required** for every API. This ensures that every endpoint has business-level documentation that complements the technical schema documentation.

### Endpoint Descriptions Format

The `endpoint-descriptions.json` file contains a simple mapping of endpoint names to business descriptions:

```json
{
  "endpointName": "Business description of what this endpoint does and why you would use it",
  "anotherEndpoint": "Another business description explaining purpose and use cases"
}
```

### Endpoint Description Guidelines

#### Purpose and Scope
Endpoint descriptions should answer these key questions:
1. **What does this endpoint do?** - Clear, concise explanation of the endpoint's function
2. **Why would you use it?** - Business purpose and use cases
3. **When would you use it?** - Context and timing for when this endpoint is appropriate
4. **How does it fit into workflows?** - Relationship to other endpoints and common usage patterns

#### Writing Style
- **Start with action verbs**: "Retrieves", "Calculates", "Provides", "Returns"
- **Use present tense**: "Returns current data" not "Will return current data"
- **Be specific**: "Retrieves real-time vessel positions" not "Gets vessel data"
- **Include business context**: Explain the real-world application
- **Keep concise**: 1-2 sentences maximum per endpoint

#### Template Patterns

**For Data Retrieval Endpoints:**
```json
{
  "getVesselBasics": "Retrieves basic vessel information including names, classes, and operational status for fleet management and passenger information systems.",
  "getTerminalBasics": "Retrieves basic terminal information including amenities and location data for route planning and passenger navigation."
}
```

**For Calculation/Processing Endpoints:**
```json
{
  "calculateFares": "Calculates ferry fares for specific terminal combinations and passenger categories for cost planning and booking systems.",
  "getTravelTimes": "Calculates estimated travel times for popular routes considering current traffic conditions for trip planning and route optimization."
}
```

**For Real-time Data Endpoints:**
```json
{
  "getVesselLocations": "Provides real-time vessel position data including current location, speed, and heading for passenger tracking and arrival time predictions.",
  "getTrafficFlow": "Provides real-time traffic flow data including speed and congestion levels from highway sensors for traffic management and route planning."
}
```

**For Discovery/Reference Endpoints:**
```json
{
  "getValidDateRange": "Provides the valid date range for which schedule and fare data is available for trip planning and date validation.",
  "getTerminals": "Lists all valid departing terminals for a specific trip date for route planning and schedule lookups."
}
```

### Comprehensive Examples by API Type

#### WSF Vessels API Examples
```json
{
  "getVesselBasics": "Retrieves basic vessel information including names, classes, and operational status for fleet management and passenger information systems.",
  "getVesselBasicsById": "Retrieves detailed information for a specific vessel by ID for passenger planning and vessel-specific inquiries.",
  "getVesselAccommodations": "Retrieves vessel accommodation details including amenities and accessibility features for passenger planning and accessibility compliance.",
  "getVesselStats": "Retrieves vessel technical specifications including dimensions, capacity, and performance data for operational planning and fleet management.",
  "getVesselLocations": "Provides real-time vessel position data including current location, speed, and heading for passenger tracking and arrival time predictions.",
  "getVesselVerbose": "Retrieves comprehensive vessel information combining basics, accommodations, and specifications for detailed vessel analysis and planning."
}
```

#### WSF Schedules API Examples
```json
{
  "getValidDateRange": "Provides the valid date range for which schedule data is available for trip planning and date validation.",
  "getTerminals": "Lists all valid departing terminals for a specific trip date for route planning and schedule lookups.",
  "getTerminalsAndMates": "Lists all valid terminal combinations for a specific trip date for comprehensive route planning and fare calculations.",
  "getRoutes": "Retrieves route information including service disruptions and regional coverage for route planning and service status monitoring.",
  "getSchedule": "Retrieves departure times and vessel assignments for specific terminal combinations and dates for trip planning and schedule coordination.",
  "getScheduleToday": "Provides today's departure times for specific routes or terminal combinations for immediate trip planning and real-time scheduling."
}
```

#### WSDOT Weather API Examples
```json
{
  "getCurrentWeatherInformation": "Retrieves current weather conditions from all WSDOT weather stations for environmental monitoring and traveler safety.",
  "getCurrentWeatherInformationByStationID": "Retrieves current weather conditions from a specific weather station for localized weather monitoring and analysis.",
  "searchWeatherInformation": "Searches historical weather data from specific stations within date ranges for weather analysis and trend monitoring."
}
```

#### WSDOT Traffic Flow API Examples
```json
{
  "getTrafficFlow": "Retrieves real-time traffic flow data from a specific sensor station for traffic monitoring and congestion analysis.",
  "getTrafficFlows": "Retrieves real-time traffic flow data from all sensor stations across Washington State for comprehensive traffic monitoring and route planning."
}
```

### Integration with Schema Documentation

Endpoint descriptions complement but do not replace schema documentation:

- **Endpoint descriptions**: Business purpose, use cases, and workflow context
- **Input schemas**: Technical parameter specifications and validation rules
- **Output schemas**: Technical data structure specifications and field meanings

### Quality Assurance for Endpoint Descriptions

#### Review Checklist
- [ ] **Action-oriented**: Starts with appropriate action verb (Retrieves, Calculates, Provides, Returns)
- [ ] **Business-focused**: Explains real-world purpose and use cases
- [ ] **Concise**: 1-2 sentences maximum
- [ ] **Specific**: Avoids generic terms like "data" or "information"
- [ ] **Context-aware**: Explains when and why to use this endpoint
- [ ] **Workflow-integrated**: Shows how it fits with other endpoints

#### Common Anti-Patterns to Avoid
```json
// ❌ Too generic
{
  "getVesselBasics": "Gets vessel data"
}

// ❌ Too technical
{
  "getVesselBasics": "Returns vessel objects with ID, name, class, and status fields"
}

// ❌ Too verbose
{
  "getVesselBasics": "This endpoint retrieves basic information about ferry vessels including their unique identifiers, names, vessel classes, operational status, ownership information, and other fundamental attributes that are used throughout the ferry system for identification and management purposes."
}

// ✅ Good - business-focused and concise
{
  "getVesselBasics": "Retrieves basic vessel information including names, classes, and operational status for fleet management and passenger information systems."
}
```

## 11. Domain-Specific Guidelines

### Transportation APIs (WSDOT/WSF)

#### Terminals and Routes
- Always include geographic context
- Explain relationship to other terminals/routes
- Mention fare implications when relevant
- Document the planning workflow from terminals → routes → schedules → fares

#### Fares and Pricing
- Always specify currency (USD)
- Explain calculation logic
- Include category context
- Document how fare calculation requires terminal combinations and trip dates

### Caching and Update Patterns

#### WSF APIs - Cache Flush Date Mechanism
Most WSF data is static and can be cached using the cache flush date mechanism. Only a few data types are real-time:

**Static WSF Data (Can be cached):**
- Terminal information (basics, locations, amenities)
- Vessel information (basics, accommodations, specifications)
- Route and schedule information
- Fare information and pricing
- Terminal wait times and bulletins

**Real-time WSF Data (Should not be cached):**
- Vessel positions and locations
- Terminal sailing space availability
- Real-time departure and arrival times

**Cache Flush Date Usage:**
```typescript
// For static WSF data
"Returns terminal basic information including amenities and location data for route planning and passenger navigation. Data is static and can be cached using the cache flush date mechanism."

// For the cache flush date endpoint itself
"Returns the cache flush date indicating when WSF service data was last changed for coordinating application cache invalidation. Use this to determine when to refresh cached data instead of constantly re-fetching static information."
```

#### WSDOT APIs - Manual Re-fetching
WSDOT APIs require manual re-fetching and have obvious update patterns:

**Real-time WSDOT Data (Obvious from context):**
- Weather information and station readings
- Traffic alerts and incidents
- Traffic flow and travel times
- Border crossing wait times
- Mountain pass conditions
- Toll rates and pricing

**Static WSDOT Data (Obvious from context):**
- Bridge clearances and infrastructure data
- Highway camera locations and metadata
- Commercial vehicle restrictions
- Route definitions and milepost information

**Special Case - Highway Cameras:**
```typescript
"Returns highway camera information including location and operational status for traffic monitoring systems. Camera data is static, but images update every 5 minutes via the provided URL."
```

### Weather and Environmental Data

#### Measurements
- Always include units
- Explain sensor limitations
- Mention update frequencies

#### Geographic Data
- Specify coordinate system
- Include precision expectations
- Explain location context

## 10. Implementation Guidelines

### Agent Workflow

#### Step 1: Data Collection and Analysis
1. **Fetch Real Data:** Use `fetch-dottie` to get actual API responses
2. **Review Documentation:** Study official API docs for context
3. **Identify Relationships:** Map connections between endpoints and fields
4. **Note Discrepancies:** Flag any mismatches between docs and data

#### Step 2: Endpoint Description Creation
1. **Create endpoint-descriptions.json:** Create the endpoint descriptions file first
2. **List All Endpoints:** Identify every endpoint in the API
3. **Write Business Descriptions:** Use the endpoint description guidelines
4. **Focus on Purpose:** Explain what each endpoint does and why you'd use it
5. **Keep Concise:** 1-2 sentences maximum per endpoint

#### Step 3: Schema Annotation Creation
1. **Choose Template:** Select the appropriate template (Input Schema, Input Field, Output Schema, or Output Field)
2. **Add Context:** Include domain-specific information and relationships
3. **Include Cross-References:** Add related endpoints for discoverability
4. **Add Examples:** Use diverse, real-world values from API data
5. **No Metadata:** Everything goes into the description

#### Step 4: Quality Review
1. **Read Aloud Test:** Ensure descriptions flow naturally
2. **Template Check:** Verify all descriptions follow the 4 core templates
3. **Cross-Reference Check:** Confirm all related endpoints are included
4. **Accuracy Validation:** Confirm examples and relationships are correct
5. **Endpoint Description Check:** Verify endpoint descriptions are business-focused and concise

#### Step 5: Discrepancy Reporting
1. **Create Report Table:** Document any issues found
2. **Categorize Issues:** Use established report categories
3. **Request Clarification:** Ask questions about unclear concepts
4. **Propose Improvements:** Suggest style guide updates if needed

## 11. Best Practices Summary

1. **Follow the 4 Core Templates:** No exceptions, no variations
2. **Include Cross-References:** Add related endpoints for discoverability
3. **Use Real Examples:** Provide realistic examples from actual API data
4. **Place Examples at End of First Sentence:** Always put "(e.g., 'example1', 'example2')" at the end of the first sentence
5. **Document Relationships:** Explain how schemas connect to each other
6. **Be Consistent:** Follow established patterns across all schemas
7. **Test Readability:** Ensure descriptions flow naturally when read aloud
8. **No Metadata:** Use only `.describe()` - no `.meta()` calls
9. **Maintain Accuracy:** Verify all information against actual API behavior

## 12. Domain Glossary Reference

### Ferry System Components (WSF APIs)

#### Core Ferry Entities
- **Terminal:** Physical dock or station where ferry vessels depart from and arrive at. Terminals serve as critical hubs for passenger and vehicle boarding, fare collection, and schedule adherence within the ferry network. Identified by `TerminalID`.
- **Vessel:** Physical ferry boat that transports passengers and/or vehicles across specific routes. Vessels have unique characteristics, capacities, and operational statuses, and are identified by `VesselID`.
- **Route:** Defined path or sequence of stops a ferry vessel follows between specific terminals. Routes represent the logical connections within the ferry system and are typically identified by a `RouteID`.
- **Scheduled Route (SchedRoute):** A specific operational plan for a `Route` that is active during a particular `Season`. A scheduled route might have specific notes, contingencies, or service disruptions associated with it. Identified by `SchedRouteID`.
- **Sailing:** A planned departure time for a vessel on a specific `Scheduled Route`, organized by direction of travel and days of operation. Sailings represent individual trip offerings within the schedule and are identified by `SailingID`.
- **Journey:** A single, complete trip made by a specific `Vessel` along a `Sailing`, typically stopping at one or more terminals to complete a full passage in one direction. Journeys can have attributes like reservation availability or international travel indications. Identified by `JourneyID`.
- **TerminalMate:** Refers to an `ArrivingTerminalID` that is a valid destination terminal for a given `DepartingTerminalID` on a specific `TripDate`. This concept highlights the directional relationships between terminals within the ferry network.
- **Season:** A defined period of time (e.g., "Spring," "Summer," "Fall," "Winter") during which specific ferry schedules and fares are active. Seasons dictate the operational context for `Scheduled Routes` and `Sailings`. Identified by `ScheduleID`.

#### Ferry Fare System
- **Fare Line Item:** A specific category of fare (e.g., "Adult (age 19 - 64)," "Standard Vehicle") with an associated cost (`Amount`), collected for a particular journey. Fare line items are grouped into `Category` (e.g., "Passenger", "Vehicle"). Identified by `FareLineItemID`.
- **Terminal Combo:** A valid combination of departing and arriving terminals for fare calculation purposes. Represents the logical pairing of terminals that can be used together for pricing.
- **Fare Total Type:** Logical grouping for fare totals: 1=Depart (departure leg), 2=Return (return leg), 3=Either (applicable to either leg), 4=Total (grand total).

#### Ferry Operational Data
- **Cache Flush Date:** Timestamp indicating when certain WSF service data was last changed. Used for coordinating application caching strategies. Most WSF data is static and can be cached using this mechanism, with only rare exceptions for real-time data like vessel positions.
- **Valid Date Range:** Date range for which fares or schedule data is currently published and available.
- **Terminal Sailing Space:** Real-time data about available drive-up and reservation spaces for select departures. Updates every 5 seconds and should not be cached.
- **Terminal Wait Times:** Tips and wait time conditions for both vehicles and walk-on passengers at terminals. Data is static and can be cached using the cache flush date mechanism.

### WSDOT Traffic & Travel

#### Highway Management
- **Highway Alert:** An active incident or advisory (e.g., collision, construction, weather event) affecting a segment of the highway system, providing critical real-time information for travelers. These are logged in the WSDOT ROADS system. Coverage: Statewide.
- **Area:** List of map areas available for traffic alert queries, used for filtering and organizing highway alerts by geographic regions.
- **Roadway Location:** Describes a specific location on a WA State Highway, providing precise geographic context for traffic incidents and conditions.

#### Border and Commercial Vehicle Management
- **Border Crossing:** A specific point of entry between Washington State and Canada, monitored for real-time wait times to assist travelers. Coverage includes I-5, SR-543, SR-539, and SR-9 crossings.
- **Border Crossing Data:** Information about Canadian border crossing wait times, including current conditions and estimated delays.
- **Commercial Vehicle Restriction (CVRestriction):** Represents restrictions for commercial vehicles, including weight limits, route restrictions, and seasonal limitations. Coverage is statewide.

#### Traffic Monitoring
- **Traffic Flow:** Real-time data collected from sensors on highways indicating current traffic conditions, such as speed and congestion levels. Conditions range from 'Unknown' to 'StopAndGo'. Coverage includes Vancouver, Olympia, Tacoma, Seattle, Spokane. Data is provided by regional Traffic Management Centers and updated every 90 seconds.
- **Flow Data:** A data structure that represents a Flow Station, containing sensor readings and traffic condition assessments.
- **Travel Time Route:** A pre-defined segment of a highway used to calculate estimated travel times between two points, often considering current traffic conditions. Coverage includes Seattle, Tacoma, Snoqualmie Pass.
- **Travel Times:** Provides travel times for many popular travel routes around Washington State, helping travelers plan their journeys.

#### Mountain Pass Management
- **Mountain Pass:** A high-elevation roadway that crosses a mountain range, subject to specific weather and travel conditions that can impact accessibility. Conditions are monitored in real-time. Coverage includes 15 passes.
- **Pass Condition:** A data structure that represents the conditions of a mountain pass, including weather, road conditions, and travel restrictions.
- **Travel Restriction:** A travel restriction for mountain passes, including chain requirements, closures, or other limitations.

#### Toll Management
- **Toll Rate:** Toll information for HOV (High Occupancy Vehicle) lanes, including current pricing and payment methods.
- **Toll Trip Info:** A data contract that represents Trip Information details for tolled routes.
- **Toll Trips:** A data contract that represents Toll Trips, including route information and pricing.
- **Toll Trip Version:** A data contract that represents published Toll Trip Version number, used for tracking pricing changes.
- **Trip Rate:** A data contract that represents Trip rate information for toll calculations.

### WSDOT Weather & Environmental Data

#### Weather Infrastructure
- **Weather Station:** A physical installation maintained by WSDOT that collects various meteorological data (e.g., air temperature, wind speed, precipitation, road surface temperature) from a specific geographic location. Identified by `StationId` and `StationName`.
- **Weather Station Data:** Contains information about weather stations, including location, capabilities, and operational status.
- **Weather Stations:** Return current list of weather stations maintained by WSDOT, providing a comprehensive inventory of available weather monitoring points.

#### Weather Measurements
- **Weather Reading:** A specific set of meteorological measurements (e.g., air temperature, wind speed, precipitation) recorded at a particular `Weather Station` at a `ReadingTime`. This represents a snapshot of weather conditions.
- **Weather Information (WeatherInfo):** Current or historical aggregated weather data derived from one or more `Weather Stations`, providing a summary of conditions.
- **Weather Information:** Returns current weather information from weather stations that are run by the Washington State Department of Transportation.
- **Scanweb Sub-Surface Measurements:** Measurements recorded by sub-surface sensors, providing data about road conditions below the surface.
- **Scanweb Surface Measurements:** Measurements recorded by surface sensors, providing data about road surface conditions including temperature, moisture, and traction.

### WSDOT Infrastructure & Monitoring

#### Bridge Management
- **Bridge Data GIS:** A record containing the location and clearance information of a bridge structure, used for navigation and safety purposes.
- **Clearance:** Bridge clearance information, including height restrictions and safety warnings. Important for commercial vehicle routing.

#### Traffic Monitoring Infrastructure
- **Camera:** Information about traffic cameras used for monitoring highway conditions and incidents. Coverage is statewide, providing access to camera images that appear on Traffic pages. Currently supports snapshots (not full video). Camera availability changes infrequently.
- **Highway Cameras:** Coverage Area: Statewide. Provides access to the camera images that appear on our Traffic pages. Currently only supports snap shots (not full video). The available cameras does not change very often.

### Complete WSDOT Entity Reference

Based on the [WSDOT Traveler Information API documentation](https://wsdot.wa.gov/traffic/api/Documentation/annotated.html), here are all 25+ entities in the WSDOT system:

#### Core Traffic Management Entities
- **Alert:** A Highway Alert - active incidents or advisories affecting highway segments
- **Area:** List of map areas available for traffic alert queries
- **RoadwayLocation:** Describes a specific location on a WA State Highway
- **HighwayAlerts:** Coverage: Statewide. Provides access to all active incidents logged in ROADS system
- **HighwayCameras:** Coverage: Statewide. Provides access to camera images on Traffic pages (snapshots only, not video)

#### Traffic Flow and Travel Time Entities  
- **TrafficFlow:** Coverage: Vancouver, Olympia, Tacoma, Seattle, Spokane. Real-time traffic flow sensor data with conditions: 'Unknown', 'WideOpen', 'Moderate', 'Heavy', 'StopAndGo', 'NoData'. Updates every 90 seconds
- **FlowData:** A data structure representing a Flow Station with sensor readings and traffic condition assessments
- **TravelTimes:** Coverage: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for popular routes around Washington State
- **TravelTimeRoute:** Data structure representing a travel time route

#### Border and Commercial Vehicle Entities
- **BorderCrossings:** Coverage: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for border crossings into Canada
- **BorderCrossingData:** Information about Canadian border crossing wait times
- **CVRestrictions:** Coverage: Statewide. Provides list of restrictions for commercial vehicles
- **CVRestrictionData:** Represents a Commercial Vehicle Restriction
- **CVRestrictionDataWithId:** Represents a Commercial Vehicle Restriction with unique identifier

#### Mountain Pass and Weather Entities
- **MountainPassConditions:** Coverage: 15 passes. Provides real-time data on pass conditions from Mountain Pass Entry system
- **PassCondition:** Data structure representing the conditions of a mountain pass
- **TravelRestriction:** A travel restriction for mountain passes
- **WeatherInformation:** Returns current weather information from WSDOT weather stations
- **WeatherInfo:** Current information from a weather station
- **WeatherReading:** Information from a weather station
- **WeatherStations:** Returns current list of weather stations maintained by WSDOT
- **WeatherStationData:** Contains information about weather stations

#### Bridge and Infrastructure Entities
- **BridgeDataGIS:** A record containing location and clearance information of a bridge structure
- **Clearance:** Bridge clearance information (see disclaimer)
- **BridgeOpeningModel:** Information about a bridge opening
- **BridgeOpeningController:** Information about bridge closures due to boat passage

#### Toll Management Entities
- **TollRate:** Toll information for HOV toll lanes
- **TollTripInfo:** Data contract representing Trip Information details
- **TollTrips:** Data contract representing Toll Trips
- **TollTripVersion:** Data contract representing published Toll Trip Version number
- **TripRate:** Data contract representing Trip rate information
- **TollingController:** Get information for HOV toll lanes

#### Advanced Weather Monitoring (Scanweb)
- **ScanwebController:** Weather information containing additional readings
- **ScanwebSiteModel:** Definition for a Scanweb station
- **ScanwebSubSurfaceMeasurements:** Measurements recorded by sub-surface sensors
- **ScanwebSurfaceMeasurements:** Measurements recorded by surface sensors

### Entity Relationships and Discoverability

#### Ferry System Relationships
- **Vessels** travel between **Terminals** along **Routes**
- **Routes** are organized into **Scheduled Routes** for specific **Seasons**
- **Sailings** define departure times for **Scheduled Routes**
- **Journeys** represent actual vessel trips following **Sailings**
- **TerminalMates** define valid terminal combinations for fare calculations
- **Fare Line Items** apply to specific **Terminal Combos** and **Journeys**

#### WSDOT System Relationships
- **Weather Stations** provide **Weather Readings** that contribute to **Weather Information**
- **Highway Alerts** affect specific **Roadway Locations** within defined **Areas**
- **Traffic Flow** data comes from **Flow Stations** along **Travel Time Routes**
- **Mountain Passes** have **Pass Conditions** that may include **Travel Restrictions**
- **Border Crossings** provide **Border Crossing Data** for wait time information
- **Commercial Vehicle Restrictions** apply to specific routes and conditions

#### Cross-System Integration
- **Weather Information** influences **Mountain Pass Conditions** and **Travel Restrictions**
- **Traffic Flow** data affects **Travel Times** calculations
- **Highway Alerts** may impact **Border Crossing** wait times
- **Weather Stations** provide data for both traffic safety and mountain pass management

This comprehensive glossary provides the semantic foundation for understanding how entities relate to each other across the WSDOT and WSF systems, enabling agents to create meaningful, contextually rich descriptions that enhance discoverability and usability.

This style guide prioritizes human comprehension and agent utility through rich, narrative descriptions while eliminating complexity and confusion through the removal of metadata, creating annotations that serve both audiences effectively while maintaining the abstraction layers provided by the `ws-dottie` library.
