# Zod Describe Annotations Strategy PRD

## Overview

This PRD establishes a comprehensive strategy for adding high-quality `.describe()` annotations to Zod schemas throughout our WSDOT and WSF API code. The goal is to provide clear, understandable, plain-English descriptions that help both API consumers and MCP server agents understand the purpose, context, and business value of each function, parameter, and return type.

**Scope**: This PRD covers Zod `.describe()` annotations only. TSDoc comments are beyond the scope of this project and must remain completely intact - do not modify, add, or remove any existing TSDoc comments.

## Target Audience

The `.describe()` annotations are intended for:
1. **API consumers** - developers integrating with our APIs
2. **MCP server agents** - AI agents using these schemas in conversational contexts
3. **Business users** - stakeholders who need to understand what questions these APIs can answer

## Fundamental Approach

Our approach must focus on real-world problem-solving and actionable information. For any endpoint, agents must:

1. **Download and review official documentation** from the WSDOT website
2. **For WSF APIs**: Download and review the WSF official documentation  
3. **Use curl to verify each endpoint** to validate correct inputs and response object shape/substance
4. **Generate fresh examples** from actual API calls (different from existing TSDoc examples)

## Documentation Sources Priority

- **Official WSDOT/WSF documentation** (primary source)
- **curl testing** to verify actual API behavior and generate fresh examples
- **Cross-reference with existing codebase patterns**

## Implementation Order

- **Alphabetical order** for APIs
- **One API at a time** - complete annotations for one API, then stop for user instructions
- **No other priority** - follow alphabetical sequence strictly

## Content Structure Requirements

### Function-Level Descriptions (5-7 sentences)

Function descriptions should answer real-world questions that people would ask, such as:

- "What's the current travel time from Seattle to Bellevue on I-405?"
- "How long will it take me to get to the airport right now?"
- "Which border crossing has the shortest wait time?"
- "What's the weather at Snoqualmie Pass, and are there any vehicle restrictions?"
- "What time is the next ferry scheduled to leave from Seattle to Bainbridge Island, and is it on time?"

**Structure**:
1. **Official documentation summary** - what the function does according to WSDOT/WSF docs
2. **Real-world problem-solving context** - what questions this function answers
3. **Business use cases** - specific scenarios where this data is valuable
4. **Data examples** - what kind of information is returned
5. **Actionable insights** - how this data helps make decisions
6. **MCP server context** - how AI agents can use this data (REQUIRED)

**Example**:
```typescript
export const getTravelTimeByIdParamsSchema = z.object({
  travelTimeId: z.number().int().positive().describe("...")
}).describe("Retrieves real-time travel time data for a specific highway route between two major destinations. This function provides current and average travel times in minutes, enabling applications to display live traffic conditions and help users plan optimal travel routes. The data includes route details, distance information, and GPS coordinates for start/end points. This is essential for navigation apps, traffic monitoring systems, and transportation planning tools that need to compare current vs historical travel times. Use this function when you need detailed timing information for a specific corridor rather than all available routes. The function answers questions like 'How long will it take me to get from Seattle to Bellevue right now?' and 'Is traffic worse than usual on my commute route?' AI agents can use this data to provide real-time traffic updates, suggest optimal travel times, and answer user questions about current commute conditions.");
```

### Parameter Descriptions (2-3 sentences MAXIMUM)

Parameter descriptions should follow this concise format:

1. **Declarative statement** from official docs (with modest rewriting for clarity)
2. **Units/data type clarification** (only when needed for context)
3. **Greater context with examples** (what the value represents)

**CRITICAL**: Keep to 2-3 sentences maximum. Avoid verbose explanations or redundant information.

**Important Note on Date/Time Fields**: WSDOT/WSF APIs use various date formats internally including .NET-style timestamps, YYYY-MM-DD, and DD/MM/YYYY. Our system converts all of these to/from JavaScript Date objects and serializes them as ISO 8601 strings over the wire. All date/time descriptions should specify "ISO 8601 format" to accurately reflect how the data is actually transmitted to consumers, regardless of the original WSDOT/WSF internal format.

**Example**:
```typescript
travelTimeId: z.number().int().positive().describe("Unique identifier for a specific travel time route in the WSDOT system. This parameter accepts positive integers typically ranging from 1 to 100+. Examples include route ID 1 for 'Everett to Downtown Seattle' and route ID 5 for 'Seattle to Bellevue via I-405'.")
```

### Return Value Descriptions (2-3 sentences MAXIMUM)

Return value descriptions should follow this concise format:

1. **Declarative statement** from official docs (with modest rewriting for clarity)
2. **Units/data type clarification** (only when needed for context)
3. **Greater context with examples** (what the value represents)

**CRITICAL**: Keep to 2-3 sentences maximum. Avoid verbose explanations or redundant information.

**Important Note on Date/Time Fields**: WSDOT/WSF APIs use various date formats internally including .NET-style timestamps, YYYY-MM-DD, and DD/MM/YYYY. Our system converts all of these to/from JavaScript Date objects and serializes them as ISO 8601 strings over the wire. All date/time descriptions should specify "ISO 8601 format" to accurately reflect how the data is actually transmitted to consumers, regardless of the original WSDOT/WSF internal format.

**Example**:
```typescript
CurrentTime: z.number().describe("Current travel time for the specified route based on real-time traffic conditions. This value is measured in minutes and represents the actual time to travel from start to end point. Examples include 25 minutes for 'Everett to Downtown Seattle' during normal traffic or 45 minutes during peak congestion.")
```

## MCP Server Requirements (NEW SECTION)

### MCP Server Context Integration

**ALL function descriptions MUST include MCP server context** for AI agent usage:

1. **AI Agent Use Cases**: Explain how AI agents can use the data
2. **Real-time Capabilities**: Describe what real-time questions can be answered
3. **Decision Support**: Explain how the data supports user decision-making
4. **Integration Examples**: Provide examples of AI agent interactions

**Example MCP Context Addition**:
```typescript
// Add this to EVERY function description:
"AI agents can use this data to provide real-time updates, suggest alternative routes during adverse conditions, and answer user questions about current highway conditions."
```

### Field Description Standardization

**CRITICAL**: All field descriptions must be standardized to 2-3 sentences maximum:

1. **Avoid redundant explanations** - don't repeat the same concepts
2. **Eliminate verbose null value explanations** - these are obvious from the schema
3. **Standardize length** - all fields should have similar description lengths
4. **Focus on essential information** - what the field represents, units, and examples

**Field Description Template**:
```typescript
FieldName: zType().describe(
  "What the field represents and its purpose. This field contains [specific data type/units] and represents [business context]. Examples include [concrete examples with real values]."
);
```

## Content Guidelines

### Real-World Focus
- **Answer concrete questions** that people actually ask
- **Provide actionable information** for decision-making
- **Include specific examples** from actual API responses
- **Focus on business value** rather than technical implementation

### Avoid Stating the Obvious
- **Don't explain basic concepts** like "speed represents how fast something is going"
- **Don't repeat parameter names** in obvious ways
- **Don't state obvious validation** like "must provide valid ID"
- **Don't repeat null value explanations** for every nullable field

### Error Documentation
- **Include official WSDOT/WSF documented errors**
- **Mention date validation requirements** (near current date, not past/far future)
- **Avoid obvious validation statements** like "must provide valid ID"

### Examples and Data
- **Use fresh examples** from new curl requests (different from existing TSDoc examples)
- **Include realistic values** from actual API responses
- **Provide context** for what the examples represent
- **Use real terminal IDs, vessel IDs, route numbers** from the APIs

## Validation Requirements

### Pre-Implementation Checklist
- [ ] **Download official documentation** from WSDOT/WSF websites
- [ ] **Test with curl** to verify actual API behavior and generate fresh examples
- [ ] **Document any discrepancies** between official docs and actual API responses
- [ ] **Generate new examples** different from existing TSDoc examples

### Curl Testing Commands
```bash
# Set access token
export WSDOT_ACCESS_TOKEN="your_token_here"

# Test WSDOT endpoint
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test WSF endpoint  
curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```

### Discrepancy Documentation
When official documentation differs from actual API behavior:
- **API response wins** - always use actual API behavior
- **Document the discrepancy** in the description
- **Update examples** to match actual API responses
- **Note any limitations** or unexpected behaviors

## Implementation Process

### Step-by-Step Workflow
1. **Select next API** in alphabetical order
2. **Download official documentation** from WSDOT/WSF websites
3. **Test with curl** to verify actual behavior and generate fresh examples
4. **Add function-level descriptions** for all schema objects (INCLUDE MCP CONTEXT)
5. **Add parameter descriptions** for all input fields (2-3 sentences MAX)
6. **Add return value descriptions** for all output fields (2-3 sentences MAX)
7. **Document any discrepancies** found
8. **Stop and wait** for user review and approval

### Quality Control
- **Verify all examples** work with actual API responses
- **Check consistency** with existing codebase patterns
- **Ensure technical accuracy** of all information
- **Test curl commands** before including in descriptions
- **Verify no TSDoc comments were modified** - existing comments must remain intact
- **Generate fresh examples** different from existing TSDoc examples
- **Maintain concise format** - 2-3 sentences for parameters/return values, 5-7 for functions
- **Include MCP server context** in ALL function descriptions
- **Standardize field description lengths** across all schemas

## Success Criteria

- **Complete coverage** of all APIs in alphabetical order
- **Technical accuracy** verified against actual API behavior
- **Concise, focused descriptions** following the 2-3 sentence format for fields, 5-7 for functions
- **Fresh examples** using actual API response data
- **Clear documentation** enabling effective API usage
- **No obvious statements** or redundant information
- **MCP server context** included in all function descriptions
- **Standardized field description lengths** across all schemas

## Examples by API Type

### WSDOT APIs Example
```typescript
// Function description (INCLUDES MCP CONTEXT)
export const getHighwayAlertsParamsSchema = z.object({
  regionId: z.number().optional().describe("Optional region identifier to filter alerts by geographic area. Valid region IDs include 1 for 'Seattle Metro', 2 for 'Tacoma Metro', and 3 for 'Spokane Metro'. When provided, returns only alerts within the specified region, helping users focus on relevant traffic incidents in their area of interest. When omitted, returns all active alerts across Washington State. This parameter is useful for applications that need to display location-specific traffic information or filter alerts by user preference.")
}).describe("Retrieves real-time highway alert information including traffic incidents, road closures, construction, and weather-related events affecting Washington State highways. This function provides detailed information about traffic disruptions that could impact travel plans, including incident descriptions, affected roadways, severity levels, and estimated duration. The data is essential for navigation apps, traffic monitoring systems, and transportation planning tools that need to warn users about potential delays or route changes. Use this function to answer questions like 'Are there any accidents on I-5 between Seattle and Tacoma?' or 'What's causing the traffic jam on SR 520?' The alerts include real-time updates about incidents that could affect travel times, road conditions, and route availability. AI agents can use this data to provide real-time traffic updates, suggest alternative routes during incidents, and answer user questions about current road conditions.");

// Parameter description (2-3 sentences MAX)
regionId: z.number().optional().describe("Optional region identifier to filter alerts by geographic area. This parameter accepts positive integers representing predefined geographic regions. Examples include region ID 1 for 'Seattle Metro', 2 for 'Tacoma Metro', and 3 for 'Spokane Metro'.");

// Return value description (2-3 sentences MAX)
AlertID: z.number().describe("Unique identifier for the traffic alert in the WSDOT system. This field contains positive integers that remain constant for each incident. Examples include accident ID 12345 for a collision on I-5 or construction project ID 67890 for ongoing road work on SR 520.")
```

### WSF APIs Example
```typescript
// Function description (INCLUDES MCP CONTEXT)
export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z.number().int().positive().describe("...")
}).describe("Retrieves real-time location and operational status data for a specific Washington State Ferry vessel. This function provides current GPS coordinates, speed, heading, and operational information including whether the vessel is in service, at dock, or en route. The data is essential for ferry tracking applications, passenger information systems, and maritime traffic monitoring that need to display vessel positions and estimated arrival times. Use this function to answer questions like 'Where is the Cathlamet ferry right now?' or 'Is the ferry from Seattle to Bainbridge Island running on time?' The location data includes precise GPS coordinates, speed in knots, and heading direction to help users track vessel movement and plan their travel accordingly. AI agents can use this data to provide real-time ferry tracking updates, suggest optimal departure times, and answer user questions about current vessel locations and schedules.");

// Parameter description (2-3 sentences MAX)
vesselId: z.number().int().positive().describe("Unique vessel identifier in the WSF system. This parameter accepts positive integers typically ranging from 1 to 25. Examples include vessel ID 1 for 'Cathlamet', 2 for 'Spokane', 3 for 'Walla Walla', and 4 for 'Puyallup'.");

// Return value description (2-3 sentences MAX)
Speed: z.number().describe("Current vessel speed in the WSF system. This value is measured in knots (nautical miles per hour) and represents the vessel's current movement rate. Examples include 0.1 knots when stationary at dock or 12 knots during normal cruising operations.")
```

## Field Description Standardization Examples

### Before (Too Long - 4+ sentences)
```typescript
// ❌ TOO VERBOSE - Don't do this
BarometricPressure: zNullableNumber().describe(
  "Current barometric pressure reading from the weather station. This value is measured in millibars (mb) and represents atmospheric pressure at the station location. Examples include 956.50 mb for normal conditions or 977.60 mb for higher pressure systems. Null values indicate the pressure sensor is not functioning or data is unavailable."
);
```

### After (Standardized - 2-3 sentences)
```typescript
// ✅ CORRECT - Do this
BarometricPressure: zNullableNumber().describe(
  "Current barometric pressure reading from the weather station. This value is measured in millibars (mb) and represents atmospheric pressure at the station location. Examples include 956.50 mb for normal conditions or 977.60 mb for higher pressure systems."
);
```

### Before (Redundant Null Explanations)
```typescript
// ❌ REDUNDANT - Don't repeat null explanations
TemperatureInFahrenheit: zNullableNumber().describe(
  "Current air temperature at the weather station. This value is measured in degrees Fahrenheit and represents the ambient air temperature at the station location. Examples include 86.54°F for warm conditions or 32.0°F for freezing conditions. Null values indicate the temperature sensor is not functioning or data is unavailable."
);
```

### After (Clean and Concise)
```typescript
// ✅ CLEAN - Do this
TemperatureInFahrenheit: zNullableNumber().describe(
  "Current air temperature at the weather station. This value is measured in degrees Fahrenheit and represents the ambient air temperature at the station location. Examples include 86.54°F for warm conditions or 32.0°F for freezing conditions."
);
```

## Notes

- **TSDoc comments must remain completely intact** - do not modify, add, or remove any existing TSDoc comments
- **Focus on real-world problem-solving** and actionable information
- **Prioritize accuracy** over completeness - verify everything with curl
- **One API at a time** - complete each API fully before moving to next
- **User review required** after each API completion
- **Scope is strictly Zod `.describe()` annotations only** - any existing TSDoc comments are off-limits
- **Generate fresh examples** from new curl requests, different from existing TSDoc examples
- **CRITICAL**: Field descriptions must be 2-3 sentences maximum
- **CRITICAL**: Function descriptions must include MCP server context
- **CRITICAL**: Standardize description lengths across all fields
- **CRITICAL**: Eliminate redundant null value explanations

