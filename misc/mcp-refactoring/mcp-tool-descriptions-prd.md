# PRD: Author MCP Tool Descriptions for `ws-dottie-mcp`

This PRD describes the work needed to author **structured MCP tool descriptions**
for selected `ws-dottie` endpoints so they can be consumed by `ws-dottie-mcp`.

You (the implementing agent) will be told **which APIs and endpoints** to cover.

---

## Background

`ws-dottie-mcp` exposes `ws-dottie` endpoints as MCP tools using the MCP TypeScript
SDK. In `ws-dottie-mcp`, we provide **Zod schemas for inputs**, but **do not ship
output schemas** (token savings). Therefore, each tool’s description must include
enough high-level output detail for agents to:

- select the right tool,
- interpret the response,
- and chain follow-up tools effectively (IDs-first).

This repo now supports a structured authoring format:
- `EndpointMeta.toolDescriptionParts?: ToolDescriptionParts`

The structured parts are compiled (in `ws-dottie-mcp`) into a single newline-
delimited `description: string` passed to MCP tool registration.

---

## References (read first)

- **Style guide (authoring template + examples)**:
  - `./mcp-tool-descriptions-style-guide.md`
- **Best-practices research (MCP tool descriptions)**:
  - `./mcp-tool-descriptions-best-pratices.md`
- **MCP TypeScript SDK** (tool registration concepts):
  - `https://github.com/modelcontextprotocol/typescript-sdk`
- **MCP tools specification** (what tool descriptions are for):
  - `https://modelcontextprotocol.io/specification/2025-06-18/server/tools`

---

## Goals

For the requested set of endpoints:

1. Add **high-quality, token-efficient, stand-alone tool descriptions** using the
   `toolDescriptionParts` structure.
2. Ensure descriptions are **consistent across the codebase**, follow the style
   guide, and reflect the real inputs/outputs of the endpoint.
3. Provide explicit **Use when / Avoid when** guidance for tool selection.
4. Provide explicit **Chaining** guidance (IDs-first) using exact `functionName`
   references.

Success is measured by: high tool-selection accuracy, low validation failures,
and minimal token bloat in tool metadata.

---

## Non-goals

- Do **not** change endpoint behavior, URL paths, schemas, or caching.
- Do **not** add output Zod schemas to `ws-dottie-mcp`.
- Do **not** write longform narrative documentation inside tool descriptions.
- Do **not** restructure how tools are grouped/registered in `ws-dottie-mcp`.

---

## Deliverable

For each assigned endpoint’s `EndpointMeta` object (in `ws-dottie/src/apis/**`),
add a `toolDescriptionParts` object that matches `ToolDescriptionParts`.

The final output should compile cleanly and keep existing endpoint code behavior
unchanged (documentation-only changes).

---

## Requirements

### R1: Use the structured format
Populate `toolDescriptionParts` (not just a freeform string).

The shape is defined in:
- `src/apis/types.ts` → `ToolDescriptionParts`

### R2: Use the style-guide headings (compiled output)
Your `toolDescriptionParts` must map cleanly to the style guide template:

- **Purpose**: `purpose` (required)
- **Use when**: `useWhen` (optional, ≤ 3 items)
- **Avoid when**: `avoidWhen` (optional, ≤ 2 items; must name preferred tool)
- **Inputs (highlights)**: `inputsHighlights` (optional; use `"none"` if no inputs)
- **Returns**: `returns` (required)
- **Output (highlights)**: `outputHighlights` (required; usually 4–8 clauses,
  but scalar tools may use 1–3 to avoid filler)
- **Chaining**: `chaining` (optional but strongly recommended; 1–3 recipes)

### R3: Tool references must use exact `functionName`
In `ws-dottie`, in `avoidWhen` and `chaining`, reference tools using the **exact
`functionName`** from the corresponding `EndpointMeta` object (for example
`fetchVesselBasicsByVesselId`).

`ws-dottie-mcp` will transform `functionName` values into the final MCP tool
names via deterministic string substitutions.

**Do not guess tool names.** If you cannot find a referenced `functionName` in
the codebase, stop and ask the requester for clarification (or locate the correct
`EndpointMeta.functionName` and use that).

### R4: Output highlights are mandatory and must be accurate
Because there is no output schema in `ws-dottie-mcp`, `outputHighlights` must
give agents enough to reason about:

- shape (array/object is already covered by `returns`)
- key identifiers and join keys
- major “what’s in here” categories
- notable semantics (enums/codes) when important
- bloat risks (long strings, huge arrays) when applicable

### R5: Descriptions must be token-efficient
Follow the style guide’s practical length heuristics:

- Target compiled description length: ~600–1400 characters
- Soft max: ~2000 characters (only if the output is otherwise ambiguous)

Prefer short clauses and omit low-signal details.

### R6: Hard budgets (must pass)
- `useWhen`: 0–3 items
- `avoidWhen`: 0–2 items
- `chaining`: 0–3 items
- `outputHighlights`: objects/arrays 4–8 items; scalars 1–3 items

Reject PRs that exceed budgets unless requester explicitly approves an exception.

---

## Research workflow (required)

For each endpoint, derive the content from these sources (in order):

1. **Input schema** (`*.input.ts`): required params, formats, and `.describe()`.
2. **Output schema** (`*.output.ts`): field meanings, enums/codes, nullability.
3. **Sample output** (`docs/generated/sample-data/<api>/<function>.json`): reality check.
4. **OpenAPI YAML** (`docs/generated/openapi-yaml/<api>.yaml`): validation + missing docs.
5. **Rendered reference HTML** (`docs/api-reference/<api>.html`): what consumers see.
6. **Official docs** (`docs/official-docs/api-specs`): only for domain clarification.

If any of these sources disagree, prefer the schemas and sample outputs. Flag
material mismatches to the requester.

**Important**: validate `returns` and `outputHighlights` against sample output.
Some endpoints return scalar JSON values (for example, a JSON string timestamp),
not objects. Do not assume “object” just because the Zod output schema is `z.date()`.

Also avoid unverified claims like “returns undefined/null if no updates” unless
you can confirm that behavior in the sample output or upstream docs.

---

## Authoring guidelines (what “good” looks like)

### Purpose
- 1 sentence.
- Describe what the endpoint returns, not implementation details.

### Use when
- 1–3 short selection cues.
- Focus on tasks (“build a picker”, “map display”, “live ETA”).

### Avoid when
- 1–2 short anti-patterns.
- Must include the preferred alternative tool by `functionName`:
  - “Avoid when: you only need one vessel (prefer fetchVesselsVerboseByVesselId)”

### Inputs (highlights)
- Use `"none"` when there are no inputs.
- Otherwise only list non-obvious constraints:
  - IDs and where to obtain them (from which tool output field)
  - date formats (e.g., `YYYY-MM-DD`)
  - enums/codes if easy to misuse

### Returns
- Must state array/object plus unit-of-meaning:
  - “array — one item per vessel”
  - “object — one vessel profile”

### Output (highlights)
- Objects/arrays: 4–8 compact clauses.
- Scalars: 1–3 compact clauses.
- Include join keys and major categories.
- Call out bloat fields when they dominate payload size.

**Structured authoring rule**: `outputHighlights` is an array of clauses.
Each array item should be one compact clause. Do not pack multiple clauses into
one string using ` | `; the compiler will join items.

### Chaining
- 1–3 explicit recipes.
- Each recipe should name:
  - the tool to call first,
  - the exact field to extract,
  - the next tool to call,
  - and the input key used.

Example (pattern):
- `fetchVesselBasics → extract VesselID → call fetchVesselsVerboseByVesselId with { VesselID: ... }`

**Required grammar**: each `chaining` entry must follow one of:
- `<functionName> → extract <FieldName> → call <functionName> with { <ParamName>: ... }`
- `<functionName> → extract <FieldName> → call <functionName>`

---

## Acceptance criteria (review checklist)

For each endpoint:

- `toolDescriptionParts` exists and type-checks against `ToolDescriptionParts`.
- `purpose` and `returns` are present and accurate.
- `outputHighlights` is present and has an appropriate number of clauses:
  - 4–8 for objects/arrays
  - 1–3 for scalar-return tools
- `useWhen`/`avoidWhen` are present where they improve selection; avoid is used
  whenever there is a clear “better” tool (by-id vs bulk).
- `chaining` exists for endpoints that take IDs/names and references exact tool
  `functionName` values + exact field names.
- No empty arrays: omit `avoidWhen` / `chaining` if there are no items.
- No speculative claims (nullability/edge cases) unless confirmed by schema + sample output.
- No endpoint behavior changes; docs-only changes.

### Quick rubric (score each tool 0–2; target ≥ 8/10)
- **Selection clarity**: can an agent pick this tool vs nearby tools?
- **Output interpretability**: can an agent use the result without an output schema?
- **Chaining quality**: are the recipes explicit and correct?
- **Token efficiency**: within budgets, no filler.
- **Non-speculative**: claims match schemas + samples.

---

## Implementation notes

- Add `toolDescriptionParts` directly to the `EndpointMeta` object in each endpoint
  file you are assigned.
- Keep changes minimal and localized (no refactors).
- Prefer consistent clause grammar across an API (similar endpoints should read similarly).

---




