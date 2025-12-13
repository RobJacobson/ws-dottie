# MCP Tool Descriptions Style Guide (ws-dottie → ws-dottie-mcp)

This guide defines **how we write MCP tool descriptions** for `ws-dottie-mcp`,
derived from `ws-dottie` endpoint definitions.

Goal: **maximum discoverability for agents**, with **minimal tokens**, while still
providing enough output detail because `ws-dottie-mcp` ships **input schemas only**
(no output Zod schemas).

This is a *style guide + research workflow* for authoring descriptions. It is not
a PRD for implementation.

---

## What we’re producing

For every endpoint in `ws-dottie` (each `EndpointMeta` object), we will add:

- `toolDescription: string` — the **authoritative MCP tool description** used by
  `ws-dottie-mcp` when registering tools via the MCP TypeScript SDK.

**Important constraint**: because `ws-dottie-mcp` does *not* provide output schemas,
`toolDescription` must include **Output (highlights)**: the high-signal parts of the
returned data that agents need to reason about the result without a schema.

---

## Where truth comes from (and how to research)

When drafting a description, use these sources in this order (most reliable first):

1. **Zod input schemas (`*.input.ts`)**
   - Use `.describe(...)` text for parameter meaning.
   - Use strictness (`.strict()`), required vs optional, and formats (e.g. `YYYY-MM-DD`).
   - These are the source of truth for **inputs**.

2. **Zod output schemas (`*.output.ts`)**
   - Even though `ws-dottie-mcp` won’t ship output schemas, *we* use them to author
     accurate output highlights.
   - Look for:
     - IDs and join keys (`VesselID`, `TerminalID`, `RouteID`, etc.)
     - Enums/codes (e.g. status codes)
     - Nullability (`nullable()`)
     - “big text” fields that can bloat context

3. **Sample outputs (`docs/generated/sample-data/<api>/<function>.json`)**
   - Confirm real-world shape and “gotchas” (nulls, empty strings, field presence).
   - Identify fields that dominate payload size and should be called out in **Efficiency**.

4. **Generated OpenAPI YAML (`docs/generated/openapi-yaml/*.yaml`)**
   - Sanity-check the mapping from code → OpenAPI (especially descriptions and formats).
   - Useful when multiple endpoints share schemas and when field docs are more complete there.

5. **Rendered API reference (`docs/api-reference/*.html`)**
   - Validate “what a consumer sees”, and detect any mismatch between intended docs and outputs.

6. **Official WSDOT/WSF docs (`docs/official-docs/api-specs`)** (if needed)
   - Use only to clarify domain meaning and naming; don’t copy large prose into tool descriptions.

---

## MCP constraints we design for

### Tool descriptions have no spec-enforced max length
The MCP spec does not require a hard maximum size for the `description` field.
In practice, long descriptions:

- reduce “tool list” scanability,
- increase prompt/context cost when clients include tool metadata,
- and can crowd out the user’s request.

### Practical “typical” limits (recommended)
Use these heuristics:

- **Target length**: **600–1400 characters** per tool description.
- **Soft max**: ~**2000 characters**, only when the output is otherwise ambiguous.
- **Line count**: ~**8–16 short lines** (scanable, predictable headings).

If you exceed the soft max, prefer:
- removing low-value narrative,
- tightening output highlights to only “keys agents use”,
- moving deep details into group docs or developer docs (not MCP tool descriptions).

---

## Naming and cross-references (avoid ambiguity)

### Always refer to tools by their MCP tool name
Use the exact `ws-dottie-mcp` tool name, in snake_case, e.g.:

- `get_vessel_basics`
- `get_vessel_verbose_by_id`

This avoids ambiguity for agents and makes chaining instructions copy/pasteable.

### Refer to fields using exact JSON keys
If the output contains `VesselID`, say `VesselID` (not “vessel id”).
If input requires `DateStart`, say `DateStart` and its format.

---

## Annotations: don’t spend tokens here

In `ws-dottie-mcp`, these tools are consistently annotated as:
- open world (network)
- non-destructive
- read-only data access

So: do **not** spend description tokens on annotation semantics. Focus instead on:
- what the tool returns,
- how to use it efficiently,
- and how to chain to other tools.

---

## Required description structure (template)

Write descriptions as **short, scanable lines** with consistent headings.
Use line breaks (`\n`) and keep each line as short as possible.

Use this exact structure (headings + order):

```
Purpose: <one sentence>
Use when: <use case 1>; <use case 2>; <use case 3>
Avoid when: <anti-pattern 1> (prefer <tool_name>); <anti-pattern 2>
Inputs (highlights): <only non-obvious inputs/formats/constraints>
Returns: <array|object> — <what each item represents>
Output (highlights): <4–8 short bullet-like clauses separated by " | ">
Chaining: <recipe 1> / <recipe 2> / <recipe 3>
```

Notes:
- **Do not** add a “Title:” line; tool names already exist in MCP.
- Keep “Use when” to **3 items max** (omit if it adds no signal).
- Keep “Avoid when” to **2 items max**; each item should name the preferred tool.
- If a tool has no inputs, still include `Inputs (highlights): none`.
- Use **one line** for `Output (highlights)`; pack clauses with ` | `.
- Use **one line** for `Chaining`, with **slash-separated** recipes.

---

## Writing rules (token efficiency + agent success)

### Content rules (what to include)
- **Purpose**: what this endpoint returns, not how it’s implemented.
- **Inputs (highlights)**:
  - IDs and where to get them (if not obvious).
  - Date/time formats (e.g. `YYYY-MM-DD`) and timezone assumptions if known.
  - Any tricky enums/codes.
- **Returns**: shape + unit-of-meaning (“one row per vessel”, “one record per voyage”).
- **Output (highlights)** (required because there’s no output schema):
  - **Join keys**: IDs/names used to chain.
  - **High-signal operational fields** (status, timestamps, coordinates).
  - **Nullability/optional** only when it matters for downstream logic.
  - **Payload bloat warnings** for large strings/arrays.
- **Use when / Avoid when**:
  - “Use when” is for tool selection (what it’s good at).
  - “Avoid when” is for safety/efficiency (what not to do + which tool to prefer).
- **Chaining**:
  - Always include at least **one** IDs-first recipe when possible.
  - Always reference tools by exact MCP name (snake_case).
  - Always name the field to extract (exact JSON key).

### Content rules (what to avoid)
- Avoid repeating schema-like boilerplate (“this tool takes a VesselID number”) unless
  it’s used for chaining or it’s error-prone.
- Avoid long lists of fields. Prefer 4–8 highlights.
- Avoid marketing prose or domain history; agents want operational guidance.
- Avoid ambiguous references (“this endpoint”, “the previous tool”). Use tool names.

---

## Chaining patterns to standardize

### Pattern A: IDs-first drill-down (preferred)
Use this when a “bulk list” tool exists plus a “by id” tool:

`Chaining: <list tool> → extract <ID field> → call <by-id tool> with { <ID field>: ... }`

### Pattern B: Name-to-ID (if by-name tools exist)
When a tool needs a “name” rather than an ID:

`Chaining: <directory tool> → extract <Name field> → call <by-name tool>`

### Pattern C: Narrow first, then expand
If an endpoint can return very large payloads, recommend a smaller tool first:

`Chaining: <small summary tool> → choose items → call <detail tool>`

---

## Output (highlights): required because ws-dottie-mcp has no output schema

Your `Output (highlights)` line must answer these questions quickly:

- **What are the important keys?** (IDs and the few fields most tasks depend on)
- **What do those keys mean?** (only when non-obvious)
- **What is “big”?** (fields or text that can bloat an agent’s context)

Recommended composition for most endpoints:

`Output (highlights): IDs: <...> | Status: <...> | Time: <...> | Location: <...> | Notes: <...>`

Only include categories that apply.

---

## Worked examples (wsf-vessels)

These examples demonstrate:
- stand-alone descriptions per endpoint,
- explicit IDs-first chaining,
- output highlights (since output schemas aren’t shipped),
- and “avoid when” guidance to prevent context bloat.

### Example: `get_vessel_basics`

```
Purpose: List basic vessel identification and operational status for the fleet.
Use when: discovering VesselID values; building vessel pickers; light status checks
Avoid when: you need full vessel specs/amenities (prefer get_vessel_verbose_by_id)
Inputs (highlights): none
Returns: array — one item per vessel
Output (highlights): IDs: VesselID | Names: VesselName, VesselAbbrev | Class: Class.ClassID, Class.PublicDisplayName | Status: Status (1=in service, 2=maintenance, 3=out of service) | Ownership: OwnedByWSF
Chaining: get_vessel_basics → extract VesselID → call get_vessel_verbose_by_id / get_vessel_locations_by_id / get_vessel_stats_by_id / get_vessel_accommodations_by_id
```

### Example: `get_vessel_verbose` (bulk, large payload)

```
Purpose: List complete vessel profiles for all vessels (basics + stats + accommodations).
Use when: offline snapshots; one-time full export; debugging schema differences
Avoid when: you only need one vessel (prefer get_vessel_verbose_by_id)
Inputs (highlights): none
Returns: array — one item per vessel
Output (highlights): IDs: VesselID | Status/ops: Status, OwnedByWSF | Capacity/specs: MaxPassengerCount, RegDeckSpace, TallDeckSpace, PropulsionInfo | Amenities: ADAAccessible, Elevator, Restroom flags | Large text: ADAInfo, VesselNameDesc, VesselHistory can be long
Chaining: get_vessel_basics → extract VesselID → call get_vessel_verbose_by_id (preferred for one vessel)
```

### Example: `get_vessel_verbose_by_id`

```
Purpose: Get the complete vessel profile for a single vessel by VesselID.
Use when: detailed vessel pages; enriching a selected vessel; minimizing payload size
Avoid when: you need the entire fleet (prefer get_vessel_verbose)
Inputs (highlights): VesselID (get it from get_vessel_basics → VesselID)
Returns: object — one vessel profile
Output (highlights): IDs: VesselID, VesselSubjectID | Names: VesselName, VesselAbbrev | Status/ops: Status, OwnedByWSF | Specs/amenities: combines stats + accommodations | Large text: ADAInfo, VesselNameDesc, VesselHistory may be long
Chaining: get_vessel_basics → extract VesselID → call get_vessel_verbose_by_id
```

### Example: `get_vessel_locations`

```
Purpose: List real-time vessel locations and ETA/terminal assignment data.
Use when: map displays; “where is my ferry”; live operational dashboards
Avoid when: you only need one vessel (prefer get_vessel_locations_by_id)
Inputs (highlights): none
Returns: array — one item per vessel location report
Output (highlights): IDs: VesselID, DepartingTerminalID, ArrivingTerminalID | Position: Latitude, Longitude, Speed (knots), Heading (0–359) | Ops: InService, AtDock | Time: TimeStamp, LeftDock, Eta, ScheduledDeparture | Notes: VesselWatch* fields describe VesselWatch system status/messages
Chaining: get_vessel_locations → extract VesselID → call get_vessel_locations_by_id / get_vessel_basics for names
```

### Example: `get_vessel_histories_by_vessel_name_and_date_range`

```
Purpose: List historical voyage records for one vessel across a date range.
Use when: delay analysis; historical performance; schedule vs actual comparisons
Avoid when: you don’t know the vessel’s name (prefer get_vessel_basics to discover VesselName)
Inputs (highlights): VesselName (from get_vessel_basics → VesselName) | DateStart, DateEnd in YYYY-MM-DD
Returns: array — one item per voyage record
Output (highlights): Keys: VesselId (note casing), Vessel (name) | Terminals: Departing, Arriving | Time: ScheduledDepart, ActualDepart, EstArrival, Date (UTC datetimes) | Semantics: some time fields may be null
Chaining: get_vessel_basics → extract VesselName → call get_vessel_histories_by_vessel_name_and_date_range
```

---

## Author checklist (before shipping a `toolDescription`)

- **Structure**: matches the required template and order.
- **Inputs**: includes every non-obvious format constraint (IDs, date strings).
- **Returns**: states array vs object and the unit-of-meaning.
- **Output highlights**: includes join keys + top 4–8 important fields + bloat warning if needed.
- **Use when / Avoid when**: present and points to specific preferred tools.
- **Chaining**: at least one explicit IDs-first recipe using exact tool names and exact field names.
 



