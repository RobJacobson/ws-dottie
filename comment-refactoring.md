### Suggested filename

You can save the following content as, for example:  
`docs/overview/proposal-b-implementation-plan.md`

---

## WS-Dottie Documentation Refactor Plan (Proposal B)

### 1. Current state of documentation

This section summarizes how documentation is currently structured across `src/apis/` and how it flows into generated docs.

#### 1.1 Sources of documentation

1. **Endpoint group metadata (`*.endpoints.ts`)**
   - Each group uses `defineEndpointGroup({ documentation: { resourceDescription, businessContext, ... } })`.
   - `resourceDescription` is usually a long paragraph describing what each item “represents” plus a list of fields.
   - `businessContext` is another paragraph explaining how to “use” this data, often repeating much of the same information.

2. **Endpoint-level metadata (`*.endpoints.ts`)**
   - Each endpoint definition includes `endpointDescription`.
   - These descriptions often:
     - Repeat the group description (“Returns an array of BorderCrossingData objects…”).
     - State obvious facts implied by the function name and schema.
     - Use full sentences, sometimes longer than needed.

3. **Input schemas (`*.input.ts`)**
   - Zod schemas (`vesselLocationsInputSchema`, etc.) use `.describe()` for:
     - The entire input object.
     - Some or all fields (especially for path/query parameters).
   - Descriptions are often narrative: multiple clauses, examples, and copy lifted from official PDFs.

4. **Output schemas (`*.output.ts`)**
   - Zod schemas (`vesselLocationSchema`, etc.) use `.describe()`:
     - At the top-level: a long paragraph that restates what the endpoint does and includes rich examples.
     - For many fields: verbose descriptions that:
       - Restate the type (“as an integer ID”).
       - Repeat the field name (“vessel name, as a human-readable description…”).
       - Include one or more concrete examples.

5. **Official API docs (`docs/official-docs/api-specs`)**
   - Contain field descriptions and examples, but:
     - Are sometimes incorrect about nullability and enum values.
     - Are not always consistent with actual data.
   - Today, many in-code descriptions are adapted or copied from these documents.

#### 1.2 How this flows into generated docs

- `scripts/generate-docs/generate-openapi.ts`:
  - Uses `group.documentation.resourceDescription` as the OpenAPI tag `description`.
  - Uses `group.documentation.businessContext` as `externalDocs.description` for the tag.
  - Uses `endpoint.endpointDescription` (or `endpoint.description`) as the operation `summary`.
  - Uses Zod `.describe()` text for schemas and properties via `zod-to-openapi` (on top-level objects and fields).
- `docs/openapi/*.yaml` and `docs/redoc/*.html` therefore reflect:
  - Long tag descriptions per group.
  - Single-line but sometimes redundant endpoint summaries.
  - Very verbose schema and field descriptions with heavy repetition and many examples.

#### 1.3 Problems with the current state

- **Verbosity**
  - Many descriptions are multiple sentences long.
  - Similar information appears at API, group, endpoint, and field levels.
  - Fields contain long narrative descriptions with multiple examples.

- **Redundancy**
  - `resourceDescription` and `businessContext` overlap heavily.
  - Endpoint descriptions restate group descriptions.
  - Schema and field descriptions restate what the endpoint description and group text already cover.

- **Agent-unfriendly**
  - For agents and MCP tools, this wastes context on repeated natural language that doesn’t help with routing or tool choice.
  - It’s harder for an agent to quickly understand “what this endpoint does” versus reading through marketing-style descriptions and examples.

- **Inconsistent accuracy**
  - Some descriptions are effectively copies of official docs that are known to be wrong about nullability or enum values.
  - There is not a systematic requirement to confirm docs against Zod schemas or actual data samples.

---

### 2. Target best practices for descriptions

This section defines the *goal* state for descriptions, inspired by OpenAPI 3.1 conventions and Claude Agent Skills best practices.

#### 2.1 High-level goals

- **Concise, task-focused descriptions** for:
  - Endpoint groups (resources).
  - Endpoints.
  - Schemas and fields.
- **Progressive disclosure**:
  - Short, high-signal summaries are always visible.
  - Deeper detail exists where needed but is not repeated everywhere.
- **Strong alignment with reality**:
  - Zod schemas are the canonical truth for types, nullability, and enums.
  - Official docs and actual data are used as guidance, not as ground truth.
- **Agent and human friendly**:
  - Humans can quickly skim docs.
  - Agents can easily choose tools and understand inputs/outputs.

#### 2.2 Best-practice patterns (our “gold standard”)

1. **API-level (OpenAPI `info.description`, high-level docs)**
   - 2–3 sentences (~250–400 characters).
   - Identify:
     - Data domain (ferries, highways, weather, etc.).
     - Major resource types (vessels, alerts, cameras, etc.).
     - Primary use-cases.

2. **Endpoint-group level (new Proposal B structure)**
   - `summary`: 1 short sentence (≤160–200 chars).
     - “Real-time vessel locations and status for WSF.”
   - `description` (optional): 1 more sentence, if needed, with nuance.
   - Structured fields (optional but recommended):
     - `useCases`: short bullet list (“Show live vessel positions in rider apps.”).
     - `updateFrequency`: short string (“5s”, “5m”, “daily”).
     - `dataFreshnessNotes`: short caveat (“Approximate; not suitable for legal records.”).
   - These follow the “skill” idea from Claude Agent Skills: compact description + when-to-use hints.

3. **Endpoint-level**
   - `summary` (backed by `endpointDescription` in code):
     - 1 sentence, ≤80–100 characters.
     - Verb-first, clear action.
     - Avoid repeating group description.
     - Example: “List current border crossing wait times for all crossings.”
   - `description` (optional):
     - Only when there is non-obvious behavior (filters, pagination, special error conditions).
     - 1–3 bullet points.

4. **Schema top-level**
   - One or two sentences describing what the type represents:
     - “VesselLocation: current position and status of a single WSF vessel.”
   - Include:
     - What the record represents.
     - Any key caveats (for example, “represents latest known reading, not historical series”).

5. **Schema field-level (per property)**
   - **Every field has a concise description.**
   - Description is:
     - One sentence.
     - At least as informative as official docs, but corrected for reality (nullability, enums).
     - Focused on:
       - What the field represents.
       - Units/formats.
       - Key semantics and constraints.
   - Examples:
     - “Speed over ground in knots.”
     - “UTC datetime when the vessel last departed its origin terminal.”
     - “Management owner code: 1 = WSF, 2 = KCM.”

6. **Avoiding noise**
   - Do not:
     - Restate types (“as an integer ID”).
     - Use overly narrative text (“This field represents, for example, the…”).
     - Copy entire paragraphs from official docs.
   - Do:
     - Use clear, modern phrasing.
     - Remove redundancy across layers (API/group/endpoint/schema).

---

### 3. Gap analysis: how current docs deviate from the goal

1. **Group-level**
   - `resourceDescription` often:
     - Explains what each item is in detail.
     - Lists multiple fields and examples.
   - `businessContext`:
     - Repeats much of the same information.
     - Contains usage guidance that could be structured into `useCases` and `updateFrequency`.
   - Result: long, overlapping blocks of text that are hard to skim and expensive for agents.

2. **Endpoint-level**
   - `endpointDescription`:
     - Frequently begins with “Returns an array of…” or “Returns a [Type] object…”.
     - Adds little beyond the function name and group description.
   - Lacks:
     - Clear, verb-first articulation of the endpoint’s purpose.
     - Consistency in length and style.

3. **Schema-level**
   - Top-level:
     - Often repeats endpoint-level descriptions and adds lots of examples.
   - Field-level:
     - Many fields have repetitive phrases (“as an integer ID”, “as a human-readable description”).
     - Some fields lack descriptions or have copy directly from official docs that may be wrong.
   - Missing:
     - A guarantee that each field has at least one meaningful, concise sentence.
     - Consistent focus on semantics, units, and constraints based on actual behavior.

4. **Source alignment**
   - Official docs under `docs/official-docs/api-specs`:
     - Sometimes inaccurate; currently treated implicitly as authoritative.
   - Zod schemas:
     - Actually canonical for types and nullability but not always reflected in descriptions.
   - Real data:
     - Not consistently used to validate docs or detect outliers.

---

### 4. New documentation structure (Proposal B)

This section defines the **target in-code structure** we want to converge on.

#### 4.1 Group-level documentation

In each `defineEndpointGroup` call:

```ts
const group = defineEndpointGroup({
  api: someApi,
  name: "vessel-locations",
  cacheStrategy: "REALTIME",
  documentation: {
    summary: "Real-time positions and status for WSF vessels.",
    description:
      "Current locations, routes, and ETA data for Washington State Ferries vessels.",
    useCases: [
      "Show live vessel positions and ETAs in rider-facing apps.",
      "Monitor fleet operations in internal dashboards.",
    ],
    updateFrequency: "5s",
  },
});
```

- **Required**:
  - `summary`
- **Optional but recommended**:
  - `description`
  - `useCases`
  - `updateFrequency`

For **WSF endpoint groups**, the group documentation should also include a **standard cache invalidation note** about `cacheFlushDate`, based on the official WSF documentation:

- For WSF groups with `cacheStrategy: "STATIC"`:
  - Include a short, standard sentence in `description` or `useCases` indicating that clients **should use the corresponding `cacheFlushDate` endpoint** to know when to invalidate cached responses for this group.
  - Example pattern: “Use the `cacheFlushDate` endpoint for this API to determine when to invalidate cached data for this group.”
- For WSF groups with `cacheStrategy: "REALTIME"`:
  - Include a short sentence clarifying that `cacheFlushDate` is **not used** to invalidate this data, and that clients should rely on the real-time cache strategy instead.
  - Example pattern: “This endpoint is real-time; `cacheFlushDate` is not used for cache invalidation.”

Agents updating docs should consult the official WSF `cacheFlushDate` docs for wording and intent, but treat our Zod schemas and cache strategies as canonical for behavior.

OpenAPI mapping (to implement in step 3):

- Tag `description` = `summary` or `description` (short).
- Custom OpenAPI extensions:
  - `x-useCases`
  - `x-updateFrequency`
  - `x-dataFreshnessNotes`

#### 4.2 Endpoint-level documentation

Within each `defineEndpoint` call:

```ts
definition: {
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription: "List current locations and status for all active vessels.",
  // Optional in the future:
  // endpointDetails: [
  //   "Includes GPS coordinates, terminals, speed, and ETA.",
  //   "Does not provide historical tracks; only latest snapshot.",
  // ],
}
```

- `endpointDescription` becomes the OpenAPI `summary`.
- Optional future `endpointDetails` could be used as a `description` or `x-notes`.

Guidelines:

- 1 short sentence, ≤80–100 characters.
- Verb-first:
  - “Get…”, “List…”, “Retrieve…”.
- Avoid:
  - “Returns an array of…”.
  - Repeating group description verbatim.

#### 4.3 Schema and field documentation

**Top-level schemas**:

```ts
export const vesselLocationSchema = z
  .object({
    // fields...
  })
  .describe(
    "Current position and operational status of a single WSF vessel, including terminals, speed, and estimated arrival times."
  );
```

- 1–2 sentences, ≤200 characters.
- Focus on what the object represents and any key caveats.

**Fields**:

```ts
Latitude: z
  .number()
  .describe("Latitude of the vessel in decimal degrees."),
Longitude: z
  .number()
  .describe("Longitude of the vessel in decimal degrees."),
Eta: zDotnetDate()
  .nullable()
  .describe("Estimated arrival time at the destination terminal in UTC."),
ManagedBy: z
  .union([z.literal(1), z.literal(2)])
  .describe("Management owner code: 1 = WSF, 2 = KCM."),
SortSeq: z
  .number()
  .int()
  .describe("Display sort order; lower values appear earlier in lists."),
```

Rules:

- Every property must have a `.describe()` with:
  - A single, concise sentence.
  - At least as much conceptual information as the official spec, but corrected where that spec is wrong.
- Emphasize:
  - What the field represents.
  - Units and formats.
  - Code mapping for enums.
  - Constraints that matter to consumers.

---

### 5. Step 1 — Refactor type definitions to the new documentation structure

This step focuses on **types and structures**, not rewriting text yet.

#### 5.1 Update group documentation type

In your shared types (for example `src/apis/types.ts` or equivalent where `EndpointGroup` is defined):

- Introduce a new `GroupDocumentation` shape, for example:

```ts
export type GroupDocumentation = {
  summary: string;
  description?: string;
  useCases?: string[];
  updateFrequency?: string;
};
```

- Update `EndpointGroup` (or equivalent) to use:

```ts
documentation: GroupDocumentation;
```

- Update `defineEndpointGroup` signature to expect `documentation: GroupDocumentation`.

#### 5.2 Deprecate old fields

- Mark `resourceDescription` and `businessContext` as deprecated if they still exist in types, or:
  - Keep them only in a transitional type used by older groups.
  - Add a migration note: new code should use `summary`/`description` instead.

#### 5.3 Adjust OpenAPI generation types

- In `generate-openapi.ts`, update the `ApiDefinition`/`EndpointGroup` types it imports to reflect `GroupDocumentation`.
- Ensure the generator no longer expects `resourceDescription` or `businessContext`; it should instead expect `documentation.summary` and `documentation.description`.

#### 5.4 Do *not* change any strings yet

- At this stage:
  - The only goal is to change **structure**, not content.
  - Group metadata should compile with the new `documentation` shape (even if temporarily bridging fields).
  - The generator may still use the old fields (via a small adapter) until Step 3 is done.

---

### 6. Step 2 — Rewrite documentation to match Proposal B

This is the content rewrite phase. It should follow a consistent process and style, while using several non-canonical sources.

#### 6.1 Sources of truth and guidance

For each endpoint group and schema, the agent must use:

1. **Existing documentation (non-canonical)**
   - Use as a starting point for understanding intent.
   - Do not blindly copy text; improve clarity and correctness.

2. **Official API documentation under `docs/official-docs/api-specs` (non-canonical)**
   - Treat as a reference for:
     - Domain meaning.
     - Original intent from WSDOT/WSF.
   - Do **not** trust:
     - Nullability.
     - Enum value sets.
   - When official docs conflict with Zod or data:
     - Zod and data win.

3. **Zod schemas (canonical for types)**
   - Always check:
     - Field types.
     - Optional/nullable flags.
     - Enum/codes.
   - Descriptions must not contradict these.

4. **Sample data via `npx fetch-dottie <function-name> --limit 10`**
   - For each endpoint, fetch representative data:
     - Use recommended sample parameters if defined.
     - Inspect several records, not just the first.
   - Look for:
     - Null patterns.
     - Out-of-spec values.
     - Practical ranges.
   - Use this to refine descriptions (for example, if a field is usually null or contains only a few values).

5. **Domain knowledge**
   - Use common-sense understanding of:
     - Transportation concepts (routes, trips, schedules).
     - Highways, traffic, alerts.
     - Weather stations, observations, units (Celsius/Fahrenheit, inches of rain, etc.).
   - When official docs are vague or unclear, lean on domain knowledge to clarify.

#### 6.2 Rewrite process (per endpoint group)

For each group (for example `vessel-locations`):

1. **Review**
   - Read:
     - Current `resourceDescription` and `businessContext`.
     - Official WSDOT/WSF docs for the corresponding API.
     - Relevant high-level docs in `docs/overview`.
   - Fetch data:
     - Use `npx fetch-dottie <functionName> ...` to inspect examples.

2. **Draft new group docs**
   - Write:
     - `summary`: 1 sentence, ≤160–200 chars.
     - Optional `description`: 1 sentence that adds nuance.
     - `useCases`: 2–4 bullets, each a short phrase starting with a verb.
     - `updateFrequency`: short identifier (“5s”, “5m”, “1h”, “daily”).
     - `dataFreshnessNotes`: short caveat if relevant.
   - Pattern examples:
     - Summary: “Real-time vessel locations and status for the WSF fleet.”
     - Use case bullets:
       - “Show live vessel positions and ETAs in rider apps.”
       - “Monitor ferry operations on internal dashboards.”

3. **Rewrite endpoint `endpointDescription`**
   - For each endpoint:
     - Identify what distinguishes it from the others in the group (filters, path parameters).
     - Write a new summary:
       - Starts with “Get” or “List”.
       - Refers to the specific selection or filter.
   - Examples:
     - `fetchVesselLocations`: “List current locations and status for all active vessels.”
     - `fetchVesselLocationsByVesselId`: “Get current location and status for a single vessel by ID.”

4. **Rewrite schema-level descriptions**
   - For each top-level schema:
     - Write a 1–2 sentence description following the earlier pattern.
   - For each field:
     - Examine:
       - Official doc entry.
       - Zod type/nullability.
       - Actual data.
     - Write a single sentence:
       - States what this field is, in domain terms.
       - States units or codes where relevant.
       - Corrects any official misstatements (for example, about nullability).
   - Common patterns:
     - IDs:
       - “Numeric ID of the departing terminal.”
     - Names:
       - “Display name of the departing terminal.”
     - Coordinates:
       - “Latitude of the vessel in decimal degrees.”
     - Time fields:
       - “Planned departure time from the origin terminal in UTC.”
     - Enum-like codes:
       - “Management owner code: 1 = WSF, 2 = KCM.”

5. **Check consistency**
   - Ensure:
     - Group `summary` doesn’t duplicate top-level schema description word-for-word.
     - Endpoint `endpointDescription` is not just restating group `summary`.
     - Field descriptions are consistent with each other and with top-level schema.

#### 6.3 Style guide for descriptions

To reduce inconsistent styles while allowing per-field flexibility:

- **Tone**
  - Neutral, technical, but human-friendly.
  - No marketing language.
  - No passive voice unless needed.

- **Grammar and phrasing**
  - Present tense.
  - Sentence case; no trailing periods for very short phrases is acceptable, but consider consistency.
  - Avoid “This field represents…”; instead, directly describe the concept:
    - “Estimated arrival time at the destination terminal in UTC.”

- **Vocabulary**
  - Use consistent terms:
    - “ID” for numeric identifiers.
    - “UTC datetime” for times represented as timestamps.
    - “In knots” for speed, “in meters” for height, etc.

- **Length**
  - Group `summary`: ≤160–200 chars.
  - Endpoint `endpointDescription`: ≤80–100 chars.
  - Schema `.describe`: ≤200 chars.
  - Field `.describe`: ≤120 chars, one sentence.

- **Examples**
  - Only include value examples when:
    - They clarify unusual behavior or code mapping.
  - Use a single example if needed; avoid long “E.g. this, that, and that” lists.

---

### 7. Step 3 — Refactor documentation generation code

Once types and content have been updated, adjust the documentation generator to fully use the Proposal B structure.

#### 7.1 Update group-to-OpenAPI mapping

In `scripts/generate-docs/generate-openapi.ts`:

- Replace references to `group.documentation.resourceDescription` / `businessContext` with the new fields:

```ts
const tags = api.endpointGroups.map((group) => ({
  name: group.name,
  description: group.documentation.summary ?? group.documentation.description ?? "",
  // Optional: add structured metadata as extensions
  ...(group.documentation.useCases && {
    "x-useCases": group.documentation.useCases,
  }),
  ...(group.documentation.updateFrequency && {
    "x-updateFrequency": group.documentation.updateFrequency,
  }),
}));
```

- Decide whether to keep `externalDocs`:
  - If you have an external URL for each group, keep it.
  - Otherwise, remove or repurpose it; `businessContext` is no longer needed there.

#### 7.2 Endpoint-level mapping

- Ensure that `endpoint.endpointDescription` is consistently used as:
  - Operation `summary` (what humans and agents see first).
- Optionally:
  - Introduce `endpointDetails` and map it to:
    - Operation `description` or `x-notes`.

#### 7.3 Schema and field mapping

- The generator already relies on `zod-to-openapi` for `description` on schemas and properties.
- No structural change required here, but the rewritten `.describe()` texts will:
  - Be shorter, clearer, and more consistent.
  - Provide better signals to downstream tools.

#### 7.4 Backwards compatibility

- Optionally, keep a small “adapter” for any legacy groups not yet migrated:
  - If `documentation.summary` is missing but `resourceDescription` exists:
    - Derive a temporary summary from the first sentence of `resourceDescription`.
  - This allows incremental migration while keeping generator behavior stable.

---

### 8. Summary

Proposal B refactors your API documentation into:

- A **compact, structured group-level documentation model** (`summary`, `description`, `useCases`, etc.).
- **Clear, verb-first endpoint summaries** (`endpointDescription`) for humans and agents.
- **Concise, semantic schema and field descriptions** that are always present and grounded in Zod types and real data.

The three implementation steps are:

1. **Refactor types** to support the new `documentation` structure and deprecate `resourceDescription`/`businessContext`.
2. **Rewrite documentation content** with a systematic process and style guide, using:
   - Current docs,
   - Official specs (non-canonical),
   - Zod schemas,
   - Real data via `npx fetch-dottie`,
   - And domain knowledge.
3. **Update documentation generation** to consume the new structure and emit OpenAPI and HTML docs that are leaner, more consistent, and friendlier for both human developers and agents.

Proposal C (skill-style manifests) can later build on this foundation by adding a dedicated agent-oriented layer without changing the underlying OpenAPI and description structure.