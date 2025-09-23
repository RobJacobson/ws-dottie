# PRD: Schema .describe() Refactoring Across src/apis

## Summary

Refactor and improve all Zod `.describe()` annotations for both input and output schemas across `src/apis/*`. The objective is to provide concise, informative, and agent-friendly descriptions at two levels:
- Top-level schema descriptions (for `z.object(...)` and array schemas) that describe what the entire structure represents.
- Field-level descriptions for every property clarifying semantics, formats, constraints, nullability, and interpretation.

This PRD formalizes the approach used for `wsdot-border-crossings` and scales it across all APIs, pausing per-API for domain knowledge input and validation against live sample data.

## Goals

- Ensure every input schema and output schema has a clear, actionable `.describe()` at the top level.
- Ensure every field in every schema has a meaningful `.describe()` that adds semantic clarity beyond type information.
- Keep comments consistent with our documentation style guide and optimized for automated agent consumption while remaining human-readable.
- Validate descriptions against live API samples prior to committing edits.

## Non-Goals

- Function-level descriptions on `FullEndpointDef` (out of scope for this phase).
- Modifying the schemas' runtime validation logic, types, or transformation behavior.
- Changing endpoint behavior or CLI commands.

## References

- Documentation Style Guide: `docs/API-STYLE-GUIDE.md`
- Getting Started for Agents (CLI usage, testing guidance): `docs/misc/getting-started-for-agents.md`
- Endpoint reference pages (HTML help/specs) under: `docs/endpoints/`
- WSDOT Border Crossings official docs: `https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html`
- WSDOT BorderCrossingData class: `https://wsdot.wa.gov/traffic/api/Documentation/class_border_crossing_data.html`
- WSDOT overview pages (domain background):
  - Border crossings overview: `https://wsdot.wa.gov/travel/roads-bridges/border-crossings`
  - Real-time border crossings: `https://wsdot.com/travel/real-time/border-crossings`

## Scope (APIs Under src/apis)

Process APIs alphabetically by folder name, and within each API, process files alphabetically. For each API:
1. Inputs: Add or refine the top-level `.describe()` on the input `z.object(...)`. Ensure the description explicitly states whether parameters are required and summarizes their role.
2. Outputs: Add/refine top-level `.describe()` for each output `z.object(...)` and array schema. Arrays must describe what the collection represents.
3. Fields: Ensure every field has a `.describe()` clarifying semantics, accepted values (including enums), formats (dates, IDs), nullability conditions, and any interpretation guidance.
4. Keep descriptions consistent with official docs and our style guide; add clarifying domain context where official docs are terse.

### API Folders (Current Status)

**✅ Completed:**
- `wsdot-border-crossings`
- `wsdot-highway-cameras`
- `wsdot-traffic-flow`
- `wsdot-travel-times`
- `wsdot-weather`

**⏳ Remaining:**
- `wsdot-bridge-clearances`
- `wsdot-commercial-vehicle-restrictions`
- `wsdot-highway-alerts`
- `wsdot-mountain-pass-conditions`
- `wsdot-toll-rates`
- `wsf-fares`
- `wsf-schedule`
- `wsf-terminals`
- `wsf-vessels`

## Process & Workflow

1. Fetch Sample Data (Ground Truth)
   - Use the local CLIs via npx to pull current samples before editing:
     - `npx -y fetch-dottie <function> --quiet`
     - `npx -y fetch-native <function> --quiet`
   - Compare validated vs raw responses. Note shape differences and sentinel values (e.g., `-1`).
2. Review Docs
   - Cross-check `docs/endpoints/*` HTML/specs and official WSDOT/WSF docs.
   - Capture key semantics not obvious from types (e.g., UTC time, units, `-1` meaning no data).
3. Edit Descriptions
   - Update input schemas first, then output schemas.
   - Ensure `.describe()` is present at the top of each `z.object(...)` and arrays.
   - Add `.describe()` to every field, following the style guide.
4. Lint & Validate
   - Run lints; ensure zero errors.
   - Optionally re-run sample fetch and sanity-check descriptions against data.
   - Verify descriptions match actual data values and patterns.
   - Check for typos and fix any found (e.g., RelativeHumidty → RelativeHumidity).
   - Ensure all nullable fields have nullability explanations.
   - Validate that examples in descriptions match real data patterns.
5. Pause for Domain Input
   - After each API is updated, pause and request domain clarifications from the maintainer before moving to the next API.

## Acceptance Criteria

- Every input schema has a top-level `.describe()` clearly stating purpose and parameter expectations.
- Every output schema and array schema has a top-level `.describe()` explaining what the object/collection represents.
- 100% of fields across schemas have `.describe()` with meaningful, non-tautological content (semantics, units, formats, nullability).
- Descriptions align with official docs but add practical clarity for agents (e.g., explicit units, enum mappings, sentinel value meanings).
- Lints pass with no new errors.

## Style Guidance (Key Points)

- Prefer concise, explicit language that explains semantics (not just types).
- Dates: specify format and timezone (e.g., "ISO 8601 timestamp (UTC)").
- Numbers with units: include the unit (e.g., minutes, miles, Fahrenheit, millibars).
- GUID fields: when a field indicates a GUID (e.g., names ending with `Guid`/`GUID`), phrase descriptions as "... as a guid" rather than generic "identifier string"; keep "guid" lowercase and add a short example only when helpful.
- Enums/flags: document possible values and meanings with examples (e.g., "0=Unknown, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo, 5=NoData").
- Nullable fields: explain when and why values may be null (e.g., "May be null if sensor unavailable" or "May be null for some station types").
- Arrays: describe what each element represents and the collection scope (e.g., "Collection of current traffic conditions from all active stations").
- Field descriptions should include concrete examples from real data when available (e.g., "e.g., '2482' for a station on SR 2" or "e.g., '66.74' for temperature").
- Include domain context and practical interpretation guidance (e.g., "Updated every 90 seconds for real-time traffic conditions").
- Use consistent terminology across APIs (e.g., "WSDOT maintained", "Road Weather Information System (RWIS)").
- Add units to numeric fields (e.g., "temperature in Fahrenheit", "distance in miles", "speed in MPH").
- For time-sensitive data, mention update frequency (e.g., "real-time data updated every 90 seconds").
- When fields have specific business meaning, explain it (e.g., "AverageTime vs CurrentTime: historical vs real-time conditions").

## Common Patterns and Templates

### Input Schema Templates
- No parameters: `"No parameters required to retrieve [data type] for all [scope/area]."`
- Single ID parameter: `"Input parameters for retrieving [data type] for a specific [entity] identified by [ID field name]."`
- Search parameters: `"Input parameters for searching [data type] by [criteria fields]."`
- Time range parameters: `"Input parameters for searching historical [data type] for a specific [entity] within a defined time range."`

### Output Schema Templates
- Single entity: `"[Data type] information for a single [entity type], including [key fields/measurements]."`
- Collection: `"Collection of [data type] for all [scope], providing [purpose/value]."`
- Real-time data: `"Real-time [data type] from [source], updated [frequency] for [purpose]."`
- Historical data: `"Historical [data type] records for [entity] within specified time range."`

### Field Description Templates
- Station/Location ID: `"The unique identifier for this [entity] (e.g., 2482 for a station on SR 2)."`
- Temperature: `"Temperature in [unit] at the station (e.g., 66.74). May be null if sensor unavailable."`
- Time/Timestamp: `"ISO 8601 timestamp (UTC) when this [event/data] was recorded."`
- Distance: `"Total distance of this route in miles (e.g., 26.72 for Everett-Seattle HOV)."`
- Speed: `"[Type] speed in [unit] (e.g., 3 for wind speed). May be null if sensor unavailable."`
- Nullable fields: `"[Description] (e.g., 963.4). May be null if sensor unavailable."`
- Enum values: `"[Field meaning]: 0=[meaning1], 1=[meaning2], 2=[meaning3] (e.g., 3=Heavy traffic)."`

### Nullability Explanations
- Sensor-based: "May be null if sensor unavailable"
- Optional data: "May be null for some station/entry types"
- Conditional: "May be null when [specific condition]"
- Configuration: "May be null if not configured for this station"

### Domain Terminology
- "WSDOT maintained" - for government-managed infrastructure
- "RWIS" - Road Weather Information System
- "milepost" - highway location reference
- "HOV lanes" - High Occupancy Vehicle lanes
- "real-time data updated every X seconds/minutes" - for live data sources

## Lessons Learned (from Multiple APIs)

### Border Crossings
- `.describe()` must be applied at the `z.object(...)` level (and arrays), not only at fields, to capture the meaning of the entire structure.
- Real data includes sentinel values (e.g., `WaitTime: -1`) that must be documented explicitly.
- Some entries may omit location details (`BorderCrossingLocation: null`), so nullability reasons should be described.
- The crossing names can represent lanes (e.g., `Nexus`, `Trucks`), not just physical crossings—examples help clarify.

### Highway Cameras
- Include practical guidance for agents (e.g., "Call 'GetCameras' to get a list of valid options").
- Location data may be structured (e.g., `CameraLocation` with roadway details) and should be described as such.
- Image URLs and metadata need clear explanations of their purpose and availability.

### Traffic Flow
- Real-time data update frequencies should be documented (e.g., "updated every 90 seconds").
- Enum values need clear mapping to business meaning (e.g., `FlowReadingValue: 0=Unknown, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo, 5=NoData`).
- Station identifiers have specific formats (e.g., '002es00068') that should be explained.

### Travel Times
- Distinguish between historical and real-time data (e.g., `AverageTime` vs `CurrentTime`).
- Route descriptions include special conditions (e.g., "using HOV lanes").
- Distance measurements are in miles and should be specified as such.

### Weather
- Fixed field name typo in source code (RelativeHumidty → RelativeHumidity).
- RWIS (Road Weather Information System) terminology should be explained.
- Surface and sub-surface measurements need context about road safety monitoring.
- Precipitation accumulation periods need clear time frame explanations.
- Units must be consistent (e.g., temperature in Celsius for AirTemperature, Fahrenheit for TemperatureInFahrenheit).

### General Lessons
- Always include concrete examples from real data when available (e.g., StationID 1909, temperature 66.74°F).
- Sensor availability affects nullability—document when fields may be null due to unavailable sensors.
- Domain-specific terminology (e.g., "WSDOT maintained", "milepost") should be used consistently.
- Update frequencies and data freshness should be mentioned for time-sensitive APIs.
- Nullability should always be explained with practical reasons (e.g., "May be null if sensor unavailable" vs just "nullable").
- Validated (`fetch-dottie`) vs raw (`fetch-native`) responses are both useful; check both when wording descriptions.

## Established Standard

This PRD has established a comprehensive, agent-friendly approach to schema descriptions that includes:

1. **Multi-level descriptions**: Both top-level schema descriptions and detailed field descriptions
2. **Data-driven approach**: Based on real API responses with concrete examples
3. **Domain expertise**: Incorporates WSDOT-specific terminology and context
4. **Practical guidance**: Includes information useful for both human developers and AI agents
5. **Consistency patterns**: Reusable templates and common patterns across APIs
6. **Quality assurance**: Systematic validation against live data

The approach ensures that:
- Schema descriptions are informative and actionable
- Field meanings are clear and unambiguous
- Nullability and data availability are well-documented
- Domain-specific context is preserved
- Real-world examples guide implementation

## Rollout Plan

- Phase by phase across APIs; after each API folder is completed, request maintainer/domain-owner review before proceeding.
- Start with WSDOT APIs, then WSF APIs.
- Keep edits focused on descriptions only; do not alter schema structure.
- Use the established templates and patterns to maintain consistency.
- Apply lessons learned from completed APIs to remaining ones.

## Owner & Review

- Owner: Agents contributing to this repository
- Reviewers: Maintainer(s) providing domain feedback per API

## Examples (Applied: Multiple APIs)

### Border Crossings
- Input `.describe()`: "No parameters are required to retrieve current border crossing wait times for crossings into Canada (I-5/Peace Arch, SR-543/Pacific Highway, SR-539, and SR-9)."
- Output object `.describe()`: "Represents the current wait time record for a single U.S.–Canada border crossing, including the crossing's common name, location (when available), and the timestamp of the reading."
- Output array `.describe()`: "A collection of current wait time records for U.S.–Canada border crossings. Covers I-5 (Peace Arch), SR-543 (Pacific Highway), SR-539, and SR-9. Each element is a single crossing/lane reading."
- Field `.describe()`: "Estimated wait time in minutes. -1 indicates no reported wait time (e.g., lane closed or data unavailable)."

### Traffic Flow
- Input `.describe()`: "Input parameters for retrieving traffic flow data for a specific station identified by FlowDataID."
- Output object `.describe()`: "Real-time traffic flow data for a single traffic monitoring station, including current conditions and location information."
- Output array `.describe()`: "Collection of real-time traffic flow data for all active traffic monitoring stations across Washington state."
- Field `.describe()`: "Current traffic condition indicating congestion level: 0=Unknown, 1=WideOpen (free flowing), 2=Moderate, 3=Heavy, 4=StopAndGo (congested), 5=NoData (sensor offline)."

### Travel Times
- Input `.describe()`: "Input parameters for retrieving travel time data for a specific route identified by TravelTimeID."
- Output object `.describe()`: "Travel time information for a specific route, including current and average travel times, distance, and detailed start/end locations."
- Output array `.describe()`: "Collection of current travel times for all monitored routes across Washington state, covering major corridors in Seattle, Tacoma, Snoqualmie Pass, and other key areas."
- Field `.describe()`: "The current estimated time in minutes that it takes to complete this route, based on real-time conditions (e.g., 29 for Everett-Seattle HOV)."

### Weather
- Input `.describe()`: "No parameters required to retrieve current weather information for all WSDOT maintained weather stations across Washington state."
- Output object `.describe()`: "Current weather information from a single WSDOT maintained weather station, including temperature, humidity, wind, visibility, and atmospheric conditions."
- Output array `.describe()`: "Collection of current weather information from all WSDOT maintained weather stations across Washington state, providing real-time atmospheric conditions for road safety and travel planning."
- Field `.describe()`: "Temperature in Fahrenheit at the station (e.g., 66.74). May be null if sensor unavailable."

### Surface/Sub-surface Measurements
- Object `.describe()`: "Measurements recorded by surface sensors monitoring road conditions for safety."
- Field `.describe()`: "Temperature of the road surface in degrees (e.g., 45.2). May be null if sensor unavailable."
- Array `.describe()`: "Surface measurements from road condition sensors monitoring road surface temperature and conditions. May be null if sensors unavailable."
