# MCP Tool Descriptions — Modern Best Practices (Dec 2025)

This document is a standalone guide to writing **high-quality MCP tool descriptions**
that are easy for agents to discover, understand, and use correctly—especially in
multi-step workflows that require **chaining** multiple tools.

This guidance synthesizes:

- **MCP specification (tools)**: `https://modelcontextprotocol.io/specification/2025-06-18/server/tools`
- **MCP TypeScript SDK**: `https://github.com/modelcontextprotocol/typescript-sdk`
- **Anthropic guidance on writing tools for agents**: `https://www.anthropic.com/engineering/writing-tools-for-agents`
- **Anthropic Agent Skills (general “how to teach agents” patterns)**:
  - `https://github.com/anthropics/skills`
  - `https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills`
  - `https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview`
  - `https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices`
  - `https://platform.claude.com/docs/en/build-with-claude/skills-guide`

This document also includes **concrete examples** from real MCP servers found via
GitHub (for example: `cyanheads/git-mcp-server` and `tableau/tableau-mcp`), as well
as additional contemporary guidance discovered via web research (for example
Merge’s “MCP tool description” guidance).

---

## What a tool description is (and why it matters)

In MCP, a “tool” is a server-exposed operation that an agent can call. The tool’s
**description** is not just human documentation—it acts like a *micro prompt* that
steers the agent’s tool selection and parameter construction.

Well-written tool descriptions:

- **Improve tool selection** (agents pick the right tool on the first attempt).
- **Reduce invalid calls** (agents provide correct parameters, formats, and constraints).
- **Enable composability** (agents understand how to chain calls to achieve goals).
- **Reduce context bloat** (agents learn token-efficient workflows, avoid “fetch all”).
- **Increase safety** (agents understand side effects, permissions, and irreversible actions).

---

## MCP tool definition fields (what descriptions must complement)

The MCP tools spec defines a tool (at minimum) with:

- **`name`**: unique identifier
- **`title`** (optional): human-friendly label
- **`description`**: freeform text used to explain the tool to agents and humans
- **`inputSchema`**: JSON Schema for arguments
- **`outputSchema`** (optional): JSON Schema for structured results
- **`annotations`** (optional): behavioral hints (for example “read-only” or “destructive”)

See: `https://modelcontextprotocol.io/specification/2025-06-18/server/tools`.

Your description should **not duplicate** the schema. Instead, it should provide:

- The **intent** (“what this is for”)
- The **sharp edges** (formats, defaults, limits, performance)
- The **chaining recipe** (how to obtain required IDs/inputs; what to do next)
- The **safety/performance posture** (side effects, idempotency, large responses)

### Important safety note (from the MCP spec)

The MCP spec explicitly warns that **tool behavior metadata (including annotations) should be treated as untrusted**
unless you trust the server, and that hosts should obtain user consent before invoking tools.
See the “Security and Trust & Safety” guidance in the MCP specification index:
`https://modelcontextprotocol.io/specification/2025-06-18/`.

---

## Core principles for modern descriptions

### 1) Write for agents first (scanable, action-oriented)

Agents benefit from descriptions that are:

- **Short lines, explicit labels**, and **imperative** language (“Use X to do Y”).
- Concrete about parameter keys and formats.
- Explicit about what to do when unsure.

This mirrors the practical guidance in Anthropic’s tool-writing post:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.

### 2) Prefer progressive disclosure (minimum needed to act, then deeper guidance)

Descriptions should be discoverable and not overwhelm the context window.

Use:

- A **1–2 sentence** summary (“Purpose”)
- Then small sections for inputs, outputs, chain, caveats
- Avoid long narratives unless the tool is complex/high-risk

This aligns with the “progressive disclosure” approach emphasized in Agent Skills
materials (conceptually similar, even if Skills ≠ Tools):
`https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills`
and `https://github.com/anthropics/skills`.

### 3) Optimize for token efficiency (both description and implied workflows)

Tool descriptions should actively steer agents toward efficient usage:

- Prefer **narrow tools** (by-id, filtered, paginated) over “return everything”.
- Encourage **two-step patterns**: “find IDs, then fetch details”.
- Document filtering/pagination parameters prominently.

Anthropic calls out token efficiency and structured tool ergonomics directly:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.

Practical implication: if your API supports both **bulk** (large) and **targeted** (small) tools, your description must
teach agents the “IDs-first” drill-down path and discourage the bulk tool unless specifically needed.

### 4) Make chaining explicit (agents do not reliably infer “what to call next”)

If a tool requires an identifier, token, cursor, or other prerequisite, the
description must say:

- **How to get it**
- **Which other tool(s)** are typically used to get it
- **What to extract** from the upstream tool’s output

Chaining guidance is one of the highest leverage parts of a tool description.

### 5) Reduce ambiguity via consistent structure and vocabulary

Across a server, use a consistent pattern for:

- Naming (verbs/resources)
- Parameter naming conventions
- Description sections and headings

Consistency improves agent performance because agents learn “the pattern” and
generalize across tools.

---

## Recommended description structure (a practical template)

Keep most tool descriptions to ~**6–14 lines** (roughly **500–1500 characters**).
Go longer only for: high-risk tools, multi-step tools, or tools with many pitfalls.

### Template (recommended)

- **Purpose**: One sentence describing exactly what the tool does.
- **Best for**: 1–3 short use cases.
- **Inputs (highlights)**: Only non-obvious requirements (IDs, formats, defaults, limits).
- **Returns**: Output shape and the *keys that matter* for downstream use.
- **Chaining**: “Call X first → extract Y → call this tool with Y”; list 1–3 common chains.
- **Safety/side effects**: If the tool changes state, say what changes and whether it’s reversible.
- **Performance/token notes**: Warn if results can be large; recommend narrower alternatives.

### Anti-template (what to avoid)

- Duplicating `inputSchema` line-by-line in prose.
- Describing outputs in vague terms (“returns data”, “returns results”).
- Omitting prerequisites (agents then guess or misuse).
- Hiding expensive behavior (“returns everything” endpoints).
- Overlong “documentation essays” inside the description.

---

## Naming best practices (tool names that agents can pick correctly)

### Prefer “verb + resource + qualifier”

- **Verb**: `get`, `list`, `search`, `create`, `update`, `delete`, `download`, `analyze`
- **Resource**: `issue`, `file`, `calendar_event`, `invoice`, `vessel` (whatever your domain)
- **Qualifier** (when needed): `by_id`, `by_date`, `by_query`, `page`, `batch`

Examples:

- `issues.search`
- `issues.get_by_id`
- `files.read`
- `files.list_directory`

### Use namespacing for tool families

Namespacing reduces ambiguity and helps agents select the correct tool quickly.
Anthropic notes that namespacing choices can matter for agent performance:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.

Two common naming styles:

- **Prefix namespace**: `github_search_issues`, `github_get_issue`
- **Dot namespace**: `github.issues.search`, `github.issues.get`

Pick one style and apply it consistently.

---

## Input schema guidance (how descriptions should complement JSON Schema)

### Use `inputSchema` for types; use `description` for intent + constraints

Your JSON Schema already defines types. The tool description should highlight:

- **Format** expectations:
  - ISO date vs timestamp, timezone assumptions
  - IDs as strings vs numbers
  - accepted enum values (if there are tricky ones)
- **Defaults** and what happens if omitted:
  - “If `query` is omitted, returns the most recent N items”
- **Practical bounds**:
  - “Max 100 items per page”
  - “Date range must be ≤ 31 days”

### Add “how to find the inputs”

The number one missing piece in many tool descriptions is “where do I get this ID?”.

When a parameter is an ID/token:

- Name the upstream tool(s) that return it
- Name the exact output field to extract
- Provide a quick recipe under **Chaining**

---

## Output guidance (especially when you omit `outputSchema`)

If `outputSchema` is not present or not enforced, your description must do more work:

- State **output shape**: object vs array, and what each item represents.
- Name the **primary identifiers** returned (for caching/chaining).
- Name any **pagination fields**: `next_cursor`, `page`, `has_more`, etc.
- If output can be large, say so and provide “narrow” alternatives.

### Return “meaningful context” (and say what it is)

Anthropic recommends returning high-signal, human-meaningful fields in tool responses,
not just opaque IDs. Your descriptions should reinforce what fields are “important”.
See: `https://www.anthropic.com/engineering/writing-tools-for-agents`.

---

## Annotations best practices (behavioral hints)

MCP tools can include `annotations` that help clients/agents reason about tool behavior.
Use annotations to express:

- **Read-only** vs **state-changing**
- **Idempotent** vs not
- **Destructive** / irreversible operations
- **Open-world** access (network / external systems) vs local/closed

See MCP tools spec: `https://modelcontextprotocol.io/specification/2025-06-18/server/tools`.

### Annotations are hints, not enforcement

The official MCP specification documentation emphasizes that tool annotations are **hints** for UX/presentation and should
not be used for security-critical decisions:
`https://github.com/modelcontextprotocol/specification/blob/main/docs/legacy/concepts/tools.mdx`.

### How descriptions should use annotations

Annotations are hints; many clients also show them in UIs. Your description should:

- Echo the safety posture in plain language:
  - “Read-only; no side effects.”
  - “Creates a new record; may send emails/notifications.”
- If destructive, specify:
  - What is deleted/changed
  - Whether it can be undone
  - Whether confirmation is recommended

---

## Chaining patterns (write these explicitly)

Chaining is where tool descriptions create disproportionate value. Use compact recipes.

### Pattern A: Discover → Select ID → Fetch details (IDs-first)

- **Purpose**: prevent “fetch all details” calls.
- **Description must include**:
  - the discovery tool (returns list + IDs)
  - the details tool (takes ID)
  - the key to extract (`*_id`)

Example description snippet (generic):

> **Chaining**: Use `resources.list` to find the right item and extract `resource_id`,
> then call `resources.get_by_id` with `{ "resource_id": ... }` for full details.

### Pattern B: Search → Narrow → Page through results

When searching can return many items:

> **Inputs (highlights)**: Use `limit` and `cursor` to page. Prefer narrow filters.
>
> **Chaining**: Call `items.search` with a restrictive filter → if `next_cursor` is
> returned, call again with `cursor=next_cursor`.

### Pattern C: Plan → Apply (read then write)

For any state-changing tool:

> **Chaining**: Call `X.get` first to confirm the current state; then call `X.update`.
> For destructive actions, prefer “dry run” or “preview” tools if available.

---

## Performance + context-window safety (say the quiet part out loud)

### Mark bulk tools as “bulk” and explain when to use them

If a tool can return thousands of items or huge objects:

- Put “**large payload**” or “**bulk**” in the first 1–2 lines.
- Recommend narrower alternatives.
- Provide an IDs-first chain recipe.

Example:

> **Purpose**: Bulk export of all records (large payload).
>
> **Efficiency**: Prefer `records.search` + `records.get_by_id` unless you truly need
> the entire dataset.

### Encourage pagination and filters

If you offer pagination, mention it explicitly in:

- **Inputs (highlights)**: `limit`, `cursor`, `page`
- **Returns**: `next_cursor`, `has_more`
- **Chaining**: how to loop safely

### Align response design to agent consumption

Descriptions should encourage response shapes that help chaining:

- Return both a human label and the ID:
  - `name` + `id`
- Avoid cryptic identifiers without context.

This echoes Anthropic’s guidance about returning meaningful context:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.

---

## Error behavior (make it easy for agents to recover)

Descriptions can dramatically improve reliability by explaining how errors appear
and what the agent should do next.

### What to include (when it matters)

- Common validation failures:
  - missing required fields
  - invalid formats (date, enum)
- Rate limits / throttling behavior
- Permission errors (auth scopes)
- “Not found” semantics (ID doesn’t exist)

### Describe recoveries, not just failures

Instead of:

> “Returns 400 on invalid input.”

Prefer:

> “If the ID is invalid or missing, you’ll get an input validation error.
> Use `resources.list` to find a valid `resource_id`, then retry.”

Anthropic emphasizes helpful error responses and steering agents toward fixes:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.

---

## “Good” examples (generic templates)

The following examples illustrate **structure**, **chaining**, and **token-efficiency**
in the tool `description` field. These patterns are broadly applicable and align
with MCP and modern agent tool-writing guidance.

### Example 1: list tool (discovery)

```json
{
  "name": "projects.list",
  "title": "List projects",
  "description": "Purpose: List projects you have access to.\nBest for: discovering project IDs; UI pickers.\nInputs (highlights): Use filters to narrow results; use pagination if available.\nReturns: Array of projects; each includes project_id and a human-readable name.\nChaining: Use projects.list → extract project_id → call projects.get_by_id for full details.\nEfficiency: Prefer this + get_by_id over bulk-export tools.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "Optional text filter." },
      "limit": { "type": "integer", "minimum": 1, "maximum": 100 },
      "cursor": { "type": "string" }
    }
  },
  "annotations": { "readOnlyHint": true, "idempotentHint": true }
}
```

### Example 2: by-id tool (targeted detail)

```json
{
  "name": "projects.get_by_id",
  "title": "Get project by ID",
  "description": "Purpose: Fetch a single project’s full details.\nBest for: drill-down views; auditing one project.\nInputs (highlights): Requires project_id (get it from projects.list or search results).\nReturns: One project object, including project_id and configuration fields.\nChaining: projects.list → pick name → extract project_id → call projects.get_by_id.\nEfficiency: Use this instead of exporting all projects if you only need one.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "project_id": { "type": "string", "description": "Project identifier." }
    },
    "required": ["project_id"]
  },
  "annotations": { "readOnlyHint": true, "idempotentHint": true }
}
```

### Example 3: write tool (state-changing, needs safety notes)

```json
{
  "name": "issues.create",
  "title": "Create issue",
  "description": "Purpose: Create a new issue/ticket in the tracker.\nBest for: filing bugs, feature requests, or incidents.\nInputs (highlights): Provide a short title and a detailed body; include relevant links.\nReturns: The created issue, including issue_id and a URL.\nChaining: If you need a project_id or component_id, call projects.list/components.list first.\nSafety/side effects: This creates a new record and may notify watchers.\nEfficiency: Prefer creating one issue with a rich body over many small issues.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "project_id": { "type": "string" },
      "title": { "type": "string" },
      "body": { "type": "string" }
    },
    "required": ["project_id", "title"]
  },
  "annotations": { "readOnlyHint": false, "idempotentHint": false }
}
```

---

## Examples from real MCP servers (verbatim patterns worth copying)

This section highlights patterns from real MCP servers that are representative of modern best practices.

### Example: “verbosity” to control token usage (cyanheads/git-mcp-server)

In `cyanheads/git-mcp-server`, tool inputs and outputs are described in detail using Zod `.describe(...)`, and the server
also implements **response shaping** with an explicit verbosity concept (minimal/standard/full) to control output size.

- Source repo: `https://github.com/cyanheads/git-mcp-server`
- Example tool: `git_add` (`src/mcp-server/tools/definitions/git-add.tool.ts`):
  `https://github.com/cyanheads/git-mcp-server/blob/4b420ad619b13184d32e3cfab5021a63e0fd80f5/src/mcp-server/tools/definitions/git-add.tool.ts`

Takeaways:

- Prefer *schema-level parameter descriptions* for each argument (so the client UI + agent see them).
- Offer an explicit **verbosity** or **response_format** option when outputs can be large (Anthropic also recommends
  response format controls for token efficiency): `https://www.anthropic.com/engineering/writing-tools-for-agents`.
- Even if you have a short tool description, detailed field-level describes can carry most of the “how to call it” load.

### Example: concise, consistent “CRUD-ish” descriptions + strong parameter descriptions (webflow/mcp-server)

`webflow/mcp-server` uses `server.registerTool(name, { title, description, inputSchema }, ...)` with:

- **Concise one-line descriptions** that clearly state the operation and what it returns
- **Per-field `.describe(...)`** that clarifies IDs and constraints (e.g. max limit 100)
- A consistent naming scheme where tool names encode resource + operation

- Source repo: `https://github.com/webflow/mcp-server`
- Example file (`registerCmsTools` with many CRUD-like tools):
  `https://github.com/webflow/mcp-server/blob/fa3d38b6a472da093e159f7c5c4d683b78b56b89/src/tools/cms.ts`
- Example file (`registerPagesTools` with pagination args described):
  `https://github.com/webflow/mcp-server/blob/fa3d38b6a472da093e159f7c5c4d683b78b56b89/src/tools/pages.ts`

Takeaways:

- Concise descriptions work well when the tool name is already descriptive and the input schema carries detailed field docs.
- Document pagination constraints directly in schema descriptions (e.g., “max limit: 100”) so agents don’t guess and fail.
- Keep tool names consistent (resource prefix + verb suffix) to improve discoverability.

### Example: documenting a filter grammar inside the tool description (tableau/tableau-mcp)

In `tableau/tableau-mcp`, the `list-views` tool uses a longer description that includes:

- A clear “when to use this tool” statement
- A structured list of supported filter fields/operators
- Concrete examples of filter strings

- Source repo: `https://github.com/tableau/tableau-mcp`
- Example tool: `list-views` (`src/tools/views/listViews.ts`):
  `https://github.com/tableau/tableau-mcp/blob/daa2ae7b8c1fbe8eb6468acdb4e546efc586d64b/src/tools/views/listViews.ts`

Takeaways:

- If a tool has a non-trivial mini-language (filters, query syntax), it’s sometimes better to include a **compact grammar**
  (table + examples) inside the description rather than forcing the agent to guess.
- Put examples directly adjacent to the grammar (reduces invalid calls).
- For tools with “list/search” semantics, describe how to use filtering and paging together to avoid large outputs.

### Example: coupling error messages with recoverable guidance (tableau/tableau-mcp)

`tableau/tableau-mcp`’s `get-view-data` tool is a simple “by-id” tool whose code shows a clear access-control error type
and a mapping to human-readable error text—exactly the kind of recoverability agents need.

- Example tool: `get-view-data` (`src/tools/views/getViewData.ts`):
  `https://github.com/tableau/tableau-mcp/blob/daa2ae7b8c1fbe8eb6468acdb4e546efc586d64b/src/tools/views/getViewData.ts`

Takeaways:

- If a request can fail for an expected reason (e.g., “not allowed”), produce an error message that is explicit and
  suggests a next step (for example: “use list/search to find an allowed ID”).
- This pairs well with “IDs-first” chaining recipes in descriptions.

### Example: OpenAPI → MCP tool generation (makenotion/notion-mcp-server)

`makenotion/notion-mcp-server` includes an OpenAPI-to-MCP proxy pattern where tool definitions are derived from OpenAPI
operation objects, and the resulting MCP tool list is built from those operation-derived `name`, `description`, and
`inputSchema` values.

- Source repo: `https://github.com/makenotion/notion-mcp-server`
- Example file (`MCPProxy` tool listing + call proxy):
  `https://github.com/makenotion/notion-mcp-server/blob/82ec86b8d5b562bbc09fce52768c25e7963efd04/src/openapi-mcp-server/mcp/proxy.ts`

Takeaways:

- If you generate MCP tools from OpenAPI, invest in **description post-processing**:
  - prepend “when to use this tool”
  - add “chaining” suggestions for required IDs
  - add pagination notes when the OpenAPI operation supports it
- Generated tools often need a *thin human-authored layer* to become agent-friendly, especially around chaining and token
  efficiency.

---

## Additional modern guidance discovered via web research (2024–2025 patterns)

### Explicit prerequisite workflows

Some modern tool ecosystems explicitly recommend documenting “required workflow” prerequisites in the tool description.
For example, Merge recommends patterns like: “call a discovery tool first to learn required fields, then call create”.

See: `https://www.merge.dev/blog/mcp-tool-description`

Practical implication:

- If your tool has “required fields that vary by tenant/object type/config”, provide (or reference) a discovery tool and
  explicitly prescribe: “Call discovery first → then call create/update with the required fields”.

### Security: treat descriptions as untrusted input

Security writeups in the MCP ecosystem also warn that tool descriptions can be used as a vector for malicious
instructions (prompt injection), and that tool behavior metadata should not be trusted blindly.

- MCP spec security principles: `https://modelcontextprotocol.io/specification/2025-06-18/`
- One example risk writeup: `https://socradar.io/top-10-mcp-model-context-protocol-server-risks/`

Practical implications:

- Keep descriptions free of hidden instructions; write them as plain documentation.
- Hosts/clients should require user consent for risky tools, and should not rely on annotations for enforcement.

---

## Checklist: what to verify before shipping a tool description

- **Discoverability**:
  - Is the name unambiguous and consistently namespaced?
  - Would an agent pick it correctly from a list of tools?
- **Inputs**:
  - If an ID is required, does the description say how to get it and which tool returns it?
  - Are formats and defaults spelled out for the tricky parameters?
- **Outputs**:
  - Does the description state the shape (array/object) and the key identifiers returned?
  - Does it explain pagination tokens/cursors if applicable?
- **Chaining**:
  - Does it provide at least one “call X then Y” recipe for common workflows?
- **Safety**:
  - Are side effects explicit? Is reversibility or confirmation guidance included?
  - Do annotations match the plain-language claims?
- **Performance**:
  - Does it warn about large responses and suggest narrower alternatives?
- **Recovery**:
  - Are common error cases paired with concrete recovery instructions?

---

## A note on ongoing improvement (measure, iterate)

Tool descriptions are best improved with evaluation:

- Track wrong-tool selections
- Track invalid inputs
- Track “bulk tool used when narrow tool would work”
- Update descriptions and schemas based on observed failures

This “evaluate and iterate” approach is central to modern agent tool development
practice described by Anthropic:
`https://www.anthropic.com/engineering/writing-tools-for-agents`.



