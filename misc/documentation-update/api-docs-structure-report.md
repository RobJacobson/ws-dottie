## WS-Dottie API Documentation Audit & Proposals (2025)

### 1. High-level assessment

**Current state**

- **Group docs**: `resourceDescription` + `businessContext` in `defineEndpointGroup(...)` are long, marketing-style paragraphs and often repeat each other.
- **Endpoint docs**: `endpointDescription` tends to restate the function name and group description (for example “Returns an array of … objects containing …”).
- **Schema docs**: Zod `.describe()` strings (for example in `vesselLocations`) restate obvious types (“Vessel name, as a human-readable description…”) and embed concrete examples for many fields.
- **OpenAPI generation**: `group.documentation.resourceDescription` becomes the tag `description`, and `businessContext` is used as `externalDocs.description` in `generate-openapi.ts`. `endpointDescription` becomes the operation `summary`.

Compared to 2025 best practices for OpenAPI and agent-facing docs (including Claude Agent Skills guidance from [Introducing Agent Skills](https://www.claude.com/blog/skills) and the [skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)), this is:

- **Too verbose**: Extra words and repeated explanations reduce scan-ability in ReDoc and OpenAPI.
- **Too redundant**: The same concepts are explained at group, endpoint, and schema levels.
- **Suboptimal for agents**: Large, repetitive descriptions consume context without adding much routing signal for agents or MCP-style tools.

The overall conclusion: we should tighten and restructure docs to improve signal-to-noise for both humans and agents.

---

### 2. Documentation layers & consumers

#### 2.1 Layers

1. **API-level (per API/package, e.g. `wsf-vessels`)**
   - **Humans**: What data family is this? When do I choose this API vs another?
   - **Agents**: High-level domain tags for routing (for example “ferries”, “vessels”, “real-time positions”).

2. **Endpoint-group level (your “resource”, e.g. `vessel-locations`)**
   - **Humans**: What entity/collection does this group represent, and what problems does it solve?
   - **Agents**: When is any endpoint in this group relevant? What are the main tasks and outputs?

3. **Endpoint level (e.g. `fetchVesselLocations`, `fetchVesselLocationsByVesselId`)**
   - **Humans**: One-line purpose + key parameters; details in schemas.
   - **Agents/MCP**: Verb-oriented, task-focused description; clear action plus conceptual input/output.

4. **Schema level**
   - Top-level schema description (for request or response type).
   - Field-level descriptions: one concise sentence per field describing what it represents, at least as informative as the official WSDOT/WSF specs under `docs/official-docs/api-specs`. We can and should rewrite that language for clarity, but every field should have a clear description.

#### 2.2 Where these appear

- **OpenAPI / ReDoc**
  - API-level → `info.title`, `info.description`, plus high-level docs in `docs/overview`.
  - Group-level → tag `summary`/`description`.
  - Endpoint-level → operation `summary` (short) and optionally `description`.
  - Schema-level → `description` on schemas and properties.

- **Agents / MCP / Skills**
  - Endpoint-level and group-level docs are the primary routing signals.
  - Schema-level docs are consulted selectively, when the agent needs to understand a field.
  - Claude-style Agent Skills emphasize *progressive disclosure* and *compact manifests*; those ideas map well onto API/group/endpoint layers.

---

### 3. Proposal A — Keep `resourceDescription` + `businessContext`, but constrain

**Idea**

Retain the existing `documentation` shape but give each field a specific role and strict length/structure limits.

#### 3.1 Structure

- **API-level**
  - `info.description` (OpenAPI):
    - 2–3 sentences (~250–400 characters).
    - Summarize data domain, main resource groups, and primary consumers.

- **Group-level**
  - `resourceDescription` (the “what”):
    - 1 sentence, ≤160–200 characters.
    - Describe the resource content (entity + key attributes).
    - Example:  
      “Real-time positions and status for WSF vessels, including terminals, speed, and ETAs.”
  - `businessContext` (the “why/when”):
    - 1–2 sentences or 3 bullet points.
    - Focus on key use-cases and constraints, not field lists.
    - Example:  
      “Use to show live vessel positions and ETAs in rider apps and operations dashboards. Updates every ~5 seconds; not suitable for historical analysis.”

- **Endpoint-level**
  - `endpointDescription` → OpenAPI `summary`:
    - 1 line, ≤80–100 characters.
    - Verb-first, avoids echoing the group description.
    - Examples:
      - `fetchVesselLocations`: “List current locations and status for all active vessels.”
      - `fetchVesselLocationsByVesselId`: “Get current location and status for a specific vessel.”

- **Schema-level**
  - Top-level `.describe()`:
    - 1–2 sentences describing what the object represents and any notable quirks.
  - Property `.describe()`:
    - Only when there is extra meaning: units, enums/codes, or non-obvious semantics.
    - Avoid repeats like “Vessel name, as a human-readable description…”.

#### 3.2 Pros & cons

- **Pros**
  - Minimal structural change to code and generators.
  - Keeps compatibility with current `generate-openapi.ts` behavior.
  - Easy to roll out incrementally.

- **Cons**
  - Still two concepts at group level, so authors can slip into duplication.
  - Agents still see two prose fields per group; not as compact as possible.

---

### 4. Proposal B — Consolidated group description + structured metadata (recommended)

**Idea**

Consolidate group-level docs into a single short description and a small amount of structured metadata, inspired by Claude Agent Skills’ emphasis on succinct descriptions and structured “when to use this skill” hints.

#### 4.1 Structure

- **Group-level documentation object (example)**

```ts
documentation: {
  summary: "Real-time vessel locations and status.",
  description: "Real-time positions, routes, and ETA data for WSF vessels.",
  useCases: [
    "Show live vessel positions and ETAs in rider apps.",
    "Monitor fleet operations in internal dashboards.",
  ],
  updateFrequency: "5s",
  dataFreshnessNotes: "Approximate; not suitable for legal records.",
}
```

Suggested mapping:

- Tag `description` in OpenAPI = `summary` or the first part of `description`.
- Additional keys (`useCases`, `updateFrequency`, `dataFreshnessNotes`) can:
  - Be turned into custom extensions (for example `x-useCases`) for tools that care.
  - Power HTML docs pages without bloating core OpenAPI text.

- **Endpoint-level**
  - Keep `endpointDescription` as a short `summary`:
    - 1 line, ≤80–100 characters.
    - Verb-first, focused on the task:
      - “List current border crossing wait times.”
  - Optionally introduce a separate `endpointDetails` (used in human docs only) when truly needed:
    - 1–3 bullets for important behaviors (filters, pagination, oddities).
    - OpenAPI `description` can be populated from this only when there is something non-obvious to convey.

- **Schema-level**
  - Top-level `.describe()`:
    - 1 sentence (≤200 characters) describing the entity:
      - “VesselLocation: current position and operational status of a single vessel.”
  - Property `.describe()`:
    - Use selectively (≤120 characters) for:
      - Units (“Speed over ground in knots.”).
      - Formats (“UTC ISO-8601 datetime.”).
      - Non-obvious semantics (“ManagedBy: 1 = WSF, 2 = KCM.”).
    - Do not restate names or types.

#### 4.2 Pros & cons

- **Pros**
  - Eliminates duplication between “what” and “why”.
  - Produces short, skimmable, agent-friendly group docs with structured hints.
  - Maps cleanly to OpenAPI and works well with a Skill-like view layered on top.

- **Cons**
  - Requires changing the `documentation` object shape and updating the OpenAPI generator to read new fields.
  - Slightly more migration work than Proposal A.

---

### 5. Proposal C — Skill-style manifest overlay for agents

**Idea**

Introduce a separate, compact “skill manifest” per API or endpoint group that agents and MCP-like systems use directly, while OpenAPI remains the ground truth for request/response shapes. This follows the pattern in Anthropic’s Agent Skills articles and cookbooks.

#### 5.1 Structure

Example: `wsf-vessels.skill.ts` (conceptual)

```ts
export const wsfVesselsSkill = {
  id: "wsf-vessels",
  label: "WSF vessels – real-time ferry data",
  description:
    "Real-time locations, schedules, fares, and vessel details for Washington State Ferries.",
  whenToUse: [
    "User asks where a specific WSF ferry currently is.",
    "User needs ETAs for a WSF route or vessel.",
  ],
  safetyConstraints: [
    "Do not claim times are guaranteed precise; they are estimates.",
    "Clarify that data can change and may be delayed.",
  ],
  endpoints: {
    fetchVesselLocations: {
      intent: "List locations and status for all active vessels.",
      inputShape: "No parameters.",
      outputShape: "Array<VesselLocation>.",
    },
    fetchVesselLocationsByVesselId: {
      intent: "Get location and status for a single vessel by ID.",
      keyParams: ["VesselID"],
    },
  },
} as const;
```

#### 5.2 Usage

- Agents (or an MCP server) load this manifest first: it is very cheap in context and gives clear **“what this API/tool is for”** signals.
- The agent then consults OpenAPI only when it needs request/response structure details.
- The manifest fields (`whenToUse`, `safetyConstraints`, `intent`, `keyParams`) mirror patterns recommended for skills in Claude apps and the Agent SDK.

#### 5.3 Pros & cons

- **Pros**
  - Very close to the documented Agent Skills design pattern.
  - Allows aggressive trimming of inline prose in schemas and endpoint descriptions.
  - Makes “how agents should use this” explicit and testable.

- **Cons**
  - Adds a separate artifact to maintain (though some of it could be generated).
  - Requires MCP/agent infrastructure to know about these manifests.

---

### 6. Schema & field documentation guidelines

These apply regardless of which proposal you choose:

#### 6.1 Field description requirements

- Every schema field should have a **concise, meaningful description line**.
- That description should cover at least the same conceptual information as the official WSDOT/WSF docs in `docs/official-docs/api-specs`, but phrased more clearly when possible.

#### 6.2 What to emphasize

- **What the field represents**
  - Business meaning (“Estimated arrival time at the destination terminal.”).
  - Role in the resource (“Primary key for vessel records.”).
- **Units and formats**
  - “Speed over ground in knots.”
  - “UTC ISO-8601 datetime string.”
- **Enum values or codes**
  - “ManagedBy: 1 = WSF, 2 = KCM.”
- **Non-obvious semantics or constraints**
  - “SortSeq: determines display order; lower values appear first.”
  - “Integer 0–359; degrees clockwise from north.”

#### 6.3 What to avoid (while still keeping a description)

- Redundant phrasing that adds no meaning beyond the name and type:
  - Instead of “Vessel name, as a human-readable description…”, prefer “Display name of the vessel.”
  - Instead of “Unique identifier for departing terminal, as an integer ID…”, prefer “Numeric ID of the departing terminal.”
- Repeated inline examples that add little beyond sample data:
  - Prefer using generated sample responses and code examples for rich examples.
- Long narratives in every field description:
  - Keep each field to a single, focused sentence.

#### 6.4 Length guidance

- Top-level schema `.describe`: 1–2 sentences, ≤200 characters.
- Property `.describe`: a single sentence, ideally ≤120 characters.
- Route long stories and multi-step usage patterns into:
  - Sample data (`docs/sample-data` / ReDoc examples).
  - Higher-level guides (`docs/overview`) instead of per-field text.

---

### 7. Alignment with Claude Agent Skills & MCP

From the Claude Agent Skills blog and docs:

- **Composable**: Each API or endpoint group should look like a self-contained “skill” with a clear domain and tasks it supports.
- **Portable**: The same documentation structure should work across ReDoc, the CLI, agents, and MCP tools.
- **Efficient (progressive disclosure)**:
  - First, short summaries and structured “when to use this” hints (group/endpoint level).
  - Only when a tool is chosen do we load detailed schemas and field descriptions.

For **MCP-style machine-readable documentation**:

- Use **OpenAPI + JSON Schema** as the canonical definition of shapes.
- Keep descriptions concise and task-oriented; avoid long, repetitive paragraph text.
- Optionally provide a small **tool manifest** or **skill manifest** per API/group:
  - Fields like `id`, `label`, `description`, `whenToUse`, `safetyConstraints`.
  - These become the agent’s quick reference and routing guidance.

---

### 8. Recommended direction and migration sketch

#### 8.1 Recommended base: Proposal B

As a default:

- **Consolidate** `resourceDescription` + `businessContext` into:
  - `summary` (short), `description` (optional), plus structured fields like `useCases` and `updateFrequency`.
- **Tighten endpoint docs**:
  - `endpointDescription` as short, verb-first summaries.
  - Only add detailed operation descriptions when something non-obvious needs to be communicated.
- **Apply schema rules globally**:
  - Remove obvious/redundant descriptions.
  - Keep high-signal semantics, units, and codes.

This gives a lean, consistent, and agent-friendly documentation model without introducing a lot of new surface area.

#### 8.2 Optional overlay: Proposal C

Once Proposal B is in place, you can optionally add per-API or per-group skill manifests:

- Start with the most agent-relevant APIs (for example `wsf-vessels`, `wsdot-highway-alerts`).
- Use the manifest pattern to encode:
  - Clear `whenToUse` lists.
  - Safety/accuracy caveats.
  - Endpoint intents and key parameters.

#### 8.3 Incremental rollout approach

1. **Update the `documentation` type** for endpoint groups and the OpenAPI generator to support `summary`/`description` and optional structured fields (Proposal B).
2. **Refactor one or two groups** (for example `vessel-locations`, `border-crossing-data`) as references:
   - Short summaries.
   - Structured `useCases`.
   - Trimmed schema descriptions.
3. **Establish lintable guidelines**:
   - Document preferred maximum lengths and patterns in `docs/overview`.
   - Consider simple checks in tests or lint rules for overly long descriptions.
4. **Apply changes gradually**:
   - Process APIs alphabetically, tightening docs group by group.
5. **Add skill manifests (optional)** for the most important agent domains when you begin wiring up an MCP server or agent SDK.

This path keeps your existing strengths (good coverage, structured Zod/OpenAPI integration) while aligning with modern best practices for both human-readable docs and agent-facing, skill-like documentation.


