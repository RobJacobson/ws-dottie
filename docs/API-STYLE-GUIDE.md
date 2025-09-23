Okay, this is a fantastic task! Building a style guide for documentation, especially when considering automated agent consumption, requires a careful balance of detail, clarity, and conciseness. Your existing schemas and the WSDOT examples provide a solid foundation.

Here's a detailed style guide for your agents, summarizing and expanding the previous guidance, with examples and counter-examples for each point.

---

## Documentation Style Guide for Zod Schemas & Endpoints (for Agent Consumption)

This guide outlines best practices for creating documentation via Zod `.describe()` annotations and `FullEndpointDef.description` properties. The primary goal is to produce clear, actionable, and comprehensive metadata for both human developers and AI agents consuming this library, minimizing ambiguity and facilitating informed decision-making.

---

### General Principles for All Descriptions:

*   **Audience First:** Primarily optimize for AI agents, but ensure human readability. Agents need explicit, unambiguous information to make decisions.
*   **Actionable:** Describe what an endpoint *does* or what data a schema *represents*, enabling agents to map API functionality to user goals.
*   **Concise Clarity:** Be direct and to the point, but provide enough context to prevent misinterpretation. Avoid excessive verbosity for trivial details.
*   **No Redundancy (within context):** Avoid repeating the *same exact information* if it's explicitly conveyed elsewhere (e.g., in a parent schema's description, or an endpoint's `path`/`method`). However, summarizing can be beneficial.
*   **Standard Terminology:** Use consistent terms (e.g., "unique identifier" instead of "ID" sometimes, "UID" other times).
*   **Focus on Semantics:** Describe the *meaning* and *purpose* of data, not just its type.

---

### 1. Top-Level Descriptions for Each Endpoint (`FullEndpointDef.description`)

This description summarizes the entire operation performed by the endpoint. It is the first piece of information an agent (or human) will use to understand the endpoint's purpose.

*   **Purpose:** To provide a high-level overview of the endpoint's functionality, indicating what resource it acts upon and the nature of the action.
*   **Content:**
    *   **Action:** What does this endpoint *do*? (e.g., "Retrieves," "Creates," "Updates," "Lists," "Searches").
    *   **Resource:** What specific entity or collection of entities is affected/returned?
    *   **Identification/Context (if applicable):** How is a specific entity identified, or what general conditions apply to a list?
    *   **Key Behavior/Warning:** Any critical information about its behavior (e.g., real-time data, caching recommendations).
*   **Placement:** `description` property within the `FullEndpointDef` object.

**Good Examples:**

*   **`getAllVessels`:**
    ```ts
    // ...
    description: "Retrieves a comprehensive list of all active vessels within the WSF fleet. Returns basic details for each vessel."
    // ...
    ```
    *   **Why good:** Clearly states "Retrieves," "list of all active vessels," specifies "WSF fleet" (context), and hints at the returned data ("basic details"). This helps an agent decide if it needs to list vessels.

*   **`getVesselBasicsById`:**
    ```ts
    // ...
    description: "Fetches the fundamental information for a single WSF vessel identified by its unique VesselID. Includes its name, abbreviation, class, and operational status."
    // ...
    ```
    *   **Why good:** "Fetches," "single WSF vessel," "identified by its unique VesselID" (input implication), and a concise summary of *what* is returned.

*   **`searchCameras`:**
    ```ts
    // ...
    description: "Searches for highway cameras based on specified criteria such as State Route, Region, and milepost ranges. This operation helps locate cameras relevant to a particular geographic area or route segment."
    // ...
    ```
    *   **Why good:** "Searches for highway cameras," lists search criteria (input implication), explains *why* one would use it ("locate cameras relevant..."), making it highly actionable for agents.

*   **`getVesselLocations`:**
    ```ts
    // ...
    description: "Provides real-time location data and estimated arrival times for all active WSF vessels. This data changes frequently; avoid aggressive caching."
    // ...
    ```
    *   **Why good:** "Provides real-time location data," specifies "all active WSF vessels," and includes the crucial "real-time" and "avoid aggressive caching" warning, which is highly valuable for agent behavior.

**Bad Example (based on your WSDOT reference):**

*   **WSDOT style for `GetAlert`:** `Retrieves a specific incident.`
    *   **Why bad (for agents):** "specific incident" is too vague. What *kind* of incident (traffic, highway, weather)? How is it specified (ID, location, time)? An agent would struggle to map this to a user's request like "find me ferry alerts."

### 2. Top-Level Descriptions for Input Schemas (`z.object({}).describe(...)`)

This describes the *purpose* of the collection of parameters required by an endpoint.

*   **Purpose:** To explain what information the client needs to provide to successfully call the associated API endpoint.
*   **Content:** A concise summary of the input's role.
*   **Placement:** `.describe()` directly on the top-level `z.object` for the input schema.

**Good Examples (using your provided schemas):**

*   **`GetCamerasInputSchema` (for an endpoint like `getCameras`):**
    ```ts
    export const GetCamerasInputSchema = z.object({})
      .describe("No parameters are required for retrieving a list of all highway cameras.");
    ```
    *   **Why good:** Explicitly states "No parameters required," which is crucial. An empty object schema with no description could be ambiguous.

*   **`SearchCamerasInputSchema`:**
    ```ts
    export const SearchCamerasInputSchema = z.object({
      // ... fields
    }).describe("Parameters for searching highway cameras by geographical and route criteria.");
    ```
    *   **Why good:** Clearly states "Parameters for searching" and highlights the *type* of criteria.

*   **`GetVesselHistoryInputSchema`:**
    ```ts
    export const GetVesselHistoryInputSchema = z
      .object({
        // ... fields
      })
      .describe("Input parameters required to retrieve the historical movements and schedules for a specific vessel over a defined date range.");
    ```
    *   **Why good:** Explains the *function* of the input: "retrieve historical movements... for a specific vessel... over a defined date range," directly correlating to the endpoint's purpose.

### 3. Top-Level Descriptions for Output Schemas (`z.object({}).describe(...)` or `z.array(...).describe(...)`)

This describes the *overall structure and content* of the data returned by an endpoint.

*   **Purpose:** To inform consumers (agents and humans) what kind of data to expect from a successful API call.
*   **Content:** A concise summary of the entity or collection represented by the schema. For array schemas, indicate that it's a "list of..." or "array of..."
*   **Placement:** `.describe()` directly on the top-level `z.object` or `z.array` for the output schema.

**Good Examples (using your provided schemas):**

*   **`vesselBasicDetailsSchema`:**
    ```ts
    export const vesselBasicDetailsSchema = z.object({ /* ... */ })
      .describe("Contains the most basic / brief information pertaining to a single WSF vessel, including its name, ID, class, and operational status.");
    ```
    *   **Why good:** Clearly states "most basic / brief information," specifies "single WSF vessel," and lists key included fields.

*   **`vesselBasicDetailsArraySchema`:**
    ```ts
    export const vesselBasicDetailsArraySchema = z.array(vesselBasicDetailsSchema)
      .describe("An array containing the basic details for multiple WSF vessels.");
    ```
    *   **Why good:** Explicitly "An array containing..." and refers to the underlying single-entity schema.

*   **`cacheFlushDateSchema`:**
    ```ts
    export const cacheFlushDateSchema = z.object({ /* ... */ })
      .describe("Provides the timestamp indicating the last time the API's internal cache was flushed. Useful for clients to synchronize their own cached data.");
    ```
    *   **Why good:** Explains *what* the date means and *why it's useful* ("synchronize their own cached data"), adding critical context for agent behavior.

*   **`vesselVerboseDetailsSchema`:**
    ```ts
    export const vesselVerboseDetailsSchema = z.object({ /* ... */ })
      .describe("Represents a comprehensive dataset for a single WSF vessel, aggregating basic details, accommodations, and statistical specifications into one object for reducing multiple API calls.");
    ```
    *   **Why good:** Explains the aggregation and the *design purpose* ("reducing chattiness/multiple API calls"), which is highly valuable context for an agent making API call optimization decisions.

### 4. Describe Comments for Each Field in an Input Schema

This provides context for what data to provide for each parameter.

*   **Purpose:** To guide consumers on the expected type, format, and semantic meaning of the input value.
*   **Content:**
    *   **What it is:** A brief, clear definition.
    *   **Constraints/Format (if not obvious from type):** Min/max, specific string formats (e.g., "YYYY-MM-DD"), enumeration values, or common patterns.
    *   **Example (if helpful):** Concrete examples clarify expectations.
    *   **Relationship to other fields:** Briefly mention if it depends on or affects other inputs.
*   **Placement:** `.describe()` on each Zod field.

**Good Examples (from your schema):**

*   `StateRoute`: `z.string().describe("The state route number or identifier for the camera. E.g., '005' for I‑5, '090' for I‑90.")`
    *   **Why good:** Adds common examples with actual data values in quotes, beyond just "string" and "state route." Enclosing literal examples in quotes (e.g., '005') makes it clear these are specific data values rather than descriptive text.

*   `Region`: `z.string().describe("The geographical region where the camera is located. Call 'GetCameras' to get a list of valid options, such as 'North Puget Sound', 'South Puget Sound'.")`
    *   **Why good:** Not only defines the field but also provides actionable advice ("Call 'GetCameras' to get a list of valid options") and examples, which is excellent for an agent to understand how to fulfill this parameter.

*   `StartingMilepost`: `z.number().nullable().describe("The starting milepost along the State Route for camera search. Can be null if only an EndingMilepost is provided.")`
    *   **Why good:** Explicitly notes `nullable()` and provides context for its optionality (when `EndingMilepost` might be the sole range specifier).

**Bad Example (hypothetical):**

*   `UserID`: `z.string().uuid().describe("User ID.")`
    *   **Why bad:** While the type `uuid()` is helpful, "User ID" is tautological.
    *   **Improved:** `z.string().uuid().describe("The unique identifier (UUID) for the target user. Required to specify which user to retrieve.")` (Adds context for "unique" and its requirement.)

### 5. Describe Comments for Each Field in an Output Schema

This provides context for what data to expect for each field.

*   **Purpose:** To explain the meaning and potential values of each field within the API response.
*   **Content:**
    *   **What it is:** A clear definition.
    *   **Interpretation/Context:** How should this value be understood?
    *   **Constraints/States:** For enums, list the possible values and their meanings. For dates, note the format.
    *   **Conditions:** When might a field be `null` or `undefined`?
*   **Placement:** `.describe()` on each Zod field.

**Good Examples (from your schemas):**

*   `Status`: `z.union([z.literal(1), z.literal(2), z.literal(3)]).nullable().describe("Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance, and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService).")`
    *   **Why good:** Provides numeric values and their human-readable meanings, crucial for interpretation by agents.

*   `VesselDrawingImg`: `z.string().nullable().describe("A URL that points to a detailed drawing of the vessel. If not available, the 'DrawingImg' from the vessel class ('Class.DrawingImg') may be used as an alternative.")`
    *   **Why good:** Explains conditional availability and suggests a fallback, which is very useful for agents constructing displays or data pipelines.

*   `LeftDock`: `zWsdotDate().nullable().describe("The date and time (ISO 8601) that the vessel last departed from a dock. This value is always null when the vessel is currently docked.")`
    *   **Why good:** Specifies format ("ISO 8601"), explains precise meaning ("last departed from a dock"), and explicitly states the condition for `null` ("always null when ... docked").

*   `StationID`: `z.number().describe("The unique identifier for this traffic flow station (e.g., '2482' for a station on SR 2).")`
    *   **Why good:** Includes actual data example in quotes, provides context about what the station monitors (SR 2), and uses domain-specific terminology (SR = State Route).

*   `TemperatureInFahrenheit`: `z.number().nullable().describe("Temperature in Fahrenheit at the station (e.g., '66.74'). May be null if sensor unavailable.")`
    *   **Why good:** Specifies units (Fahrenheit), includes concrete example with quotes, explains nullability with practical reason (sensor availability).

*   `FlowReadingValue`: `z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]).describe("Current traffic condition indicating congestion level: 0=Unknown, 1=WideOpen (free flowing), 2=Moderate, 3=Heavy, 4=StopAndGo (congested), 5=NoData (sensor offline).")`
    *   **Why good:** Documents all enum values with their meanings, includes business context for each level, and explains the special case (5=NoData).

**Bad Example (from your WSDOT reference):**

*   `VesselID`: `integer` - `Unique identifier for a vessel.`
    *   **Why bad:** "Unique identifier for a vessel" is okay, but `integer` is implied by Zod's `z.number().int()`. The description could be more explicit about its uniqueness property.
    *   **Improved:** `z.number().int().describe("A globally unique integer identifier assigned to each WSF vessel.")` (Adds "globally unique" and "WSF" context.)

### 6. Enhanced Field Description Patterns

Based on comprehensive work across multiple WSDOT APIs, here are established patterns for field descriptions:

*   **Concrete Examples:** Always enclose literal data examples in single quotes: `e.g., '2482'` not `e.g., 2482`. This makes it clear the example is a specific data value.

*   **Units and Formats:**
    - Always specify units: `"temperature in Fahrenheit"`, `"distance in miles"`, `"speed in MPH"`
    - Specify data formats: `"ISO 8601 timestamp (UTC)"`, `"decimal degrees"`
    - Include measurement context: `"computed every three minutes in meters"`

*   **Nullability Explanations:** Provide practical reasons for nullability:
    - `"May be null if sensor unavailable"` (for sensor-based data)
    - `"May be null for some station/entry types"` (for optional data)
    - `"Always null when [specific condition]"` (for conditional nulls)

*   **Domain Terminology:** Use consistent domain-specific terms:
    - `"WSDOT maintained"` for government-managed infrastructure
    - `"RWIS"` (Road Weather Information System) with explanation when first used
    - `"milepost"` for highway location references
    - `"HOV lanes"` (High Occupancy Vehicle lanes)

*   **Update Frequencies:** For time-sensitive data, specify update intervals:
    - `"real-time data updated every 90 seconds"`
    - `"updated every three minutes"`
    - `"data changes frequently; avoid aggressive caching"`

*   **Business Meaning:** Explain differences between similar fields:
    - `"AverageTime vs CurrentTime: historical vs real-time conditions"`
    - `"BarometricPressure: not adjusted for site elevation"`
    - `"SurfaceMeasurements: from road condition sensors monitoring road safety"`

*   **Enum Documentation:** For enums, document all values with meanings:
    - `"0=Unknown, 1=WideOpen (free flowing), 2=Moderate, 3=Heavy, 4=StopAndGo (congested), 5=NoData (sensor offline)"`

*   **Sensor Availability:** For sensor-based fields, explain data availability:
    - `"May be null if sensor unavailable"`
    - `"Resets at midnight GMT"`
    - `"The time period varies by RWIS site type"`

---

### Extent of Context and Information (Agent Consumption)

Given that these descriptions are intended for agents, the balance shifts slightly more towards explicit context than for purely human-read documentation, but still avoiding unnecessary verbosity.

*   **Default to expanding on official docs:**
    *   If the official documentation is vague or leaves room for interpretation, your library's descriptions should clarify and expand.
    *   Agents need to reason about information. More explicit relationships, constraints, and operational advice improve their ability to do so.
    *   **Example:** WSDOT's `Region` description in your schema, advising "Call 'GetCameras' to get a list of valid options," is *perfect* for an agent. It provides a dependency hint.

*   **Add domain knowledge where it clarifies API usage:**
    *   If you have internal domain knowledge (e.g., "WSF" for Washington State Ferries) that makes the field's purpose clearer, add it.
    *   Explain acronyms or industry-specific terms briefly if they are critical to understanding.
    *   **Example:** "WSF vessel" instead of just "vessel." For `Status` enum, explicitly stating `(1 = InService, 2 = Maintenance, 3 = OutOfService)` is excellent.

*   **Apply established patterns from completed APIs:**
    *   Use concrete examples in quotes: `e.g., '2482'` not `e.g., 2482`
    *   Include units and formats: `"temperature in Fahrenheit"`, `"ISO 8601 timestamp (UTC)"`
    *   Provide practical nullability reasons: `"May be null if sensor unavailable"`
    *   Document enum values comprehensively: `"0=Unknown, 1=WideOpen, 2=Moderate"`
    *   Use consistent domain terminology: `"WSDOT maintained"`, `"RWIS"`
    *   Specify update frequencies for real-time data: `"updated every 90 seconds"`

*   **Be maximally concise *only when context is truly redundant*:**
    *   For a simple `id: z.string().uuid()`, if it's merely a lookup key and its `describe` on the parent is clear, the field's description can be very short.
    *   But for most cases, assume a little more context is better than too little for an agent.

*   **Don't generate unnecessary verbosity:**
    *   Avoid flowery language. Stick to factual, explanatory text.
    *   Don't write paragraphs if a sentence or two suffices.
    *   **Counter-example of unnecessary verbosity:** "This field, `VesselName`, is a string that represents the common name by which the maritime vessel is known to the public and operational staff, serving as its primary human-readable identifier. It is essential for human interaction but should not be used for programmatic identification, for which `VesselID` is preferred."
        *   **Better:** `VesselName: z.string().nullable().describe("The common name of the vessel, used for display. Not suitable for programmatic identification; use 'VesselID' instead.")` (More concise, yet still provides the same critical advice.)

---

By consistently applying this style guide, you will produce a remarkably well-documented API client library that is not only robust due to Zod and TypeScript but also highly "intelligent-agent-friendly," allowing advanced automation and introspection.

## Established Best Practices

Based on comprehensive work across multiple WSDOT APIs (border crossings, highway cameras, traffic flow, travel times, weather), these best practices have been established:

1. **Concrete Examples:** Always enclose literal data examples in single quotes to distinguish them from descriptive text
2. **Units and Formats:** Explicitly specify units (Fahrenheit, miles, MPH) and formats (ISO 8601 UTC, decimal degrees)
3. **Practical Nullability:** Explain nullability with practical reasons (sensor availability, optional data, conditional logic)
4. **Domain Consistency:** Use established WSDOT terminology consistently across all APIs
5. **Real-time Context:** Document update frequencies and data freshness for time-sensitive APIs
6. **Business Semantics:** Explain the practical meaning and differences between similar fields
7. **Comprehensive Enums:** Document all possible enum values with their business meanings
8. **Sensor Context:** For sensor-based data, explain data availability and potential unavailability

These patterns ensure that schema descriptions are informative, actionable, and maintainable across the entire API surface.