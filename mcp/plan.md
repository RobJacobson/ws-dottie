## ws-dottie-mcp – Architecture & Design Plan

### Scope & Goals

- **Objective**: Build `ws-dottie-mcp`, an MCP server in TypeScript (Bun/Node) that wraps `ws-dottie` and exposes transportation data tools.
- **Phase 1**: Local MCP server (stdio transport) for **ferries only**:
  - APIs: `wsf-vessels`, `wsf-schedule`, `wsf-terminals`, `wsf-fares`.
  - Primary use: Development and debugging from IDEs (e.g., Cursor) and Claude Desktop.
- **Phase 2**: Hosted MCP server:
  - Target: **Cloudflare Workers / Agents** (primary), with the option for **Convex** or other serverless platforms.
- **Key constraints**:
  - Avoid **context bloat**: design tools + docs + skills so agents only pull detail when needed.
  - Leverage existing **Zod schemas**, `*.endpoints.ts` metadata, and **OpenAPI YAML** (`docs/generated/openapi/*.yaml`).
  - Provide **high-level domain guidance** via skills and category docs (`docs/guides/categories/ferries.md`).

---

## 1. Runtime, SDKs, and Deployment Strategy

### 1.1 Phase 1: Local MCP server (stdio)

**Stack**

- **Runtime**:
  - Develop with **Bun**, but restrict code to **Node-compatible APIs** (no Bun-specific features). This ensures easy portability to Node and Cloudflare.
- **MCP SDK**:
  - Use the official **Model Context Protocol TypeScript SDK** (`@modelcontextprotocol/sdk`) from the MCP TypeScript SDK repo  
    ([modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)).
  - Advantages:
    - Provides `McpServer` for registering tools, resources, and prompts.
    - Includes transports for **stdio** (local) and **Streamable HTTP** (for later hosting).
    - Widely used and aligned with Anthropic’s MCP reference implementations.

**Local server behavior**

- Runs as a standalone Node/Bun process:
  - `bun run src/server.ts` or `node dist/server.js`.
- Communicates with clients over **stdio transport** (the standard MCP integration mode for local tools).

**Recommended Phase 1 project layout (`ws-dottie-mcp`)**

- `src/server.ts`
  - Creates an `McpServer` instance.
  - Registers tools for ferries EndpointGroups (vessels, schedules, terminals, fares).
  - Attaches a stdio transport (`StdioServerTransport` or equivalent from the SDK) and starts the server.

- `src/config.ts`
  - Reads `WSDOT_ACCESS_TOKEN` from environment.
  - Exposes configuration helpers, e.g.:
    - `getApiKey()`
    - `setApiKeyOverride(apiKey: string)` for a per-session override.

- `src/wsdottieClient.ts`
  - Wraps `ws-dottie`:
    - Invokes `configManager.setApiKey` at startup (from env or override).
    - Optionally sets base URL if needed.
  - Exposes helpers that call `ws-dottie` functions from `ws-dottie/wsf-*/core` (no React/TanStack dependencies).

- `src/openapi/ferries.ts`
  - Loads and parses ferries OpenAPI YAML:
    - `docs/generated/openapi/wsf-vessels.yaml`
    - `docs/generated/openapi/wsf-schedule.yaml`
    - `docs/generated/openapi/wsf-terminals.yaml`
    - `docs/generated/openapi/wsf-fares.yaml`
  - Builds lookup tables:
    - `operationId -> { requestSchema, responseSchema, groupName }`
    - `groupName (tag) -> supported operations`

- `src/tools/ferries/*.ts`
  - One file per **EndpointGroup** tool (e.g., `vesselLocationsTool.ts`, `faresTool.ts`).
  - Each file:
    - Defines MCP tool metadata (name, description, JSON schema for arguments/results).
    - Uses `wsdottieClient` to perform calls based on an `operation` selector.

- `src/tools/docs/*.ts`
  - Tools for **dynamic documentation retrieval**:
    - E.g., `get_ferries_category_overview`, `get_ferries_endpoint_group_docs`, `get_ferries_endpoint_docs`.
  - Read from:
    - `docs/guides/categories/ferries.md` for narrative context.
    - Ferries OpenAPI YAML for technical details (params, schemas, examples).

This layout keeps Phase 1 focused on local debugging but structured for reuse in Phase 2.

---

### 1.2 Phase 2: Cloudflare (and Optional Convex) Hosting

**Cloudflare target**

- Use **Cloudflare Workers / Agents** with a **remote MCP server** pattern:
  - Patterns described in Cloudflare’s MCP tooling guides  
    ([Cloudflare remote MCP guide](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)) and the `mcp-server-cloudflare` repo  
    ([cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)).

**Approach**

- Factor the core MCP setup into a reusable function:

  - `createWsDottieMcpServer(config: ServerConfig): McpServer`

- For **Cloudflare Workers**:
  - In `worker.ts`:
    - Import `createWsDottieMcpServer`.
    - Initialize a `StreamableHTTPServerTransport` or Cloudflare’s HTTP transport wrapper from `mcp-server-cloudflare`.
    - Implement a `fetch` handler that:
      - Routes MCP HTTP messages to the server.
      - Manages session IDs as required by the MCP Streamable HTTP spec (backwards compatible with deprecated SSE if necessary, per SDK docs).

- For **Cloudflare Agents**:
  - Configure an Agent to connect to the Worker endpoint as a **remote MCP server**.
  - Cloudflare Agents then handle:
    - Tool calling.
    - Session context.
    - Integration with other Cloudflare features.

**Convex**

- If desired, create an HTTP endpoint (e.g., a Convex function) that:
  - Wraps the same `createWsDottieMcpServer` logic using HTTP transport.
  - Exposes MCP over HTTPS similarly to the Cloudflare Worker.

Because the MCP server is decoupled from transport details, adding new hosting surfaces is mostly about wiring up the transport.

---

## 2. Tool Granularity: One Tool per EndpointGroup

### 2.1 EndpointGroup structure recap

Example from `wsf-vessels`:

```12:20:src/apis/wsf-vessels/apiDefinition.ts
export const wsfVesselsApi = {
  api: apis.wsfVessels,
  endpointGroups: [
    cacheFlushDateVesselsGroup,
    vesselAccommodationsGroup,
    vesselBasicsGroup,
    vesselHistoriesGroup,
    vesselLocationsGroup,
    vesselStatsGroup,
    vesselVerboseGroup,
  ],
} satisfies ApiDefinition;
```

Example EndpointGroup (`vesselLocations`):

```15:59:src/apis/wsf-vessels/vesselLocations/vesselLocations.endpoints.ts
export const vesselLocationsGroup: EndpointGroup = {
  name: "vessel-locations",
  cacheStrategy: "REALTIME",
  documentation: {
    summary: "Real-time vessel positions and status for WSF fleet.",
    description:
      "Current GPS coordinates, speed, heading, terminal assignments, and ETAs. This endpoint is real-time; cacheFlushDate is not used for cache invalidation.",
    useCases: [
      "Show live vessel positions and ETAs in rider apps.",
      "Monitor fleet operations in internal dashboards.",
      "Calculate arrival times and voyage progress.",
    ],
    updateFrequency: "5s",
  },
};

export const fetchVesselLocations = createEndpoint<...>({
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  ...
});

export const fetchVesselLocationsByVesselId = createEndpoint<...>({
  functionName: "fetchVesselLocationsByVesselId",
  endpoint: "/vesselLocations/{VesselID}",
  ...
});
```

Each group contains multiple fetch functions that differ mainly in:

- Whether they take parameters.
- Whether they return a single entity vs an array.
- Sometimes minor route/path differences.

### 2.2 Proposed tool shape (EndpointGroup-level)

**Pattern**

- For each ferries EndpointGroup, define **one MCP tool**:

  - `ferries_vessel_locations`
  - `ferries_vessel_basics`
  - `ferries_vessel_histories`
  - `ferries_vessel_accommodations`
  - `ferries_vessel_stats`
  - `ferries_schedules_*` groups (e.g. `ferries_schedules`, `ferries_routes`, etc.)
  - `ferries_fares_*` groups (e.g. `ferries_fares`, `ferries_valid_date_range`, etc.)
  - `ferries_terminals`, `ferries_terminal_combos`, etc.

- Tool arguments:
  - `operation`: enum string that selects which underlying `fetch*` endpoint to call within the group.
  - `params`: object whose schema is a **discriminated union keyed by `operation`**.
  - `options` (optional): maps to `ws-dottie` options (`fetchMode`, `validate`, maybe limit/offset for arrays).

**Example (conceptual)**

```ts
type FerriesVesselLocationsArgs =
  | {
      operation: 'list_all';
      params?: {};
      options?: { validate?: boolean; fetchMode?: 'native' | 'jsonp' };
    }
  | {
      operation: 'by_vessel_id';
      params: { VesselID: number };
      options?: { validate?: boolean; fetchMode?: 'native' | 'jsonp' };
    };
```

**Dispatch logic**

Inside the tool implementation:

- Switch on `args.operation`:
  - `list_all` → `fetchVesselLocations({ params: {}, fetchMode, validate })`.
  - `by_vessel_id` → `fetchVesselLocationsByVesselId({ params: { VesselID }, fetchMode, validate })`.

**Pros**

- **Medium granularity**:
  - Fewer tools than one-per-endpoint; more specific than one-per-API.
  - Keeps the **tool catalog small** and easy to understand.
- **Excellent mapping to docs**:
  - `EndpointGroup.documentation` already has summary, description, useCases, and cacheStrategy.
  - Those fields map naturally to tool descriptions and metadata.
- **Discoverability**:
  - Tool names clearly convey **domain + group**.
  - Skills and category docs can refer to groups (e.g. “vessel locations group”) in human-language explanations.

**Cons**

- Slightly more complex argument schemas than one-tool-per-endpoint.
- Requires a mapping from operation enums to `operationId`/fetch functions.

**Decision**:  
Use **one tool per EndpointGroup** with an `operation` selector. This strikes a good balance between usability and context size.

---

## 3. Response Shaping and Field Selection

### 3.1 Goals

- Avoid flooding the context with rarely-used fields.
- Keep responses **faithful** to actual WSDOT/WSF payloads.
- Allow deliberate selection of fields:
  - “Summary” vs “full” responses.
  - Possibly annotate importance at the schema level.

### 3.2 Where to encode “field importance”

You have three layers:

1. **Zod schemas** (`*.output.ts`).
2. **OpenAPI YAML** (generated via `generate-openapi.ts` from Zod).
3. **MCP response shaping logic** in `ws-dottie-mcp`.

Since we’ve chosen **OpenAPI YAML as canonical for MCP schemas**, the best place to encode importance is:

- Via **OpenAPI extensions** in the generated YAML, e.g.:
  - `x-mcp-importance: "high" | "medium" | "low"`
  - Or `x-mcp-visible: true | false`

You already use `@asteasolutions/zod-to-openapi` and call `.openapi()` in `generate-openapi.ts` to:

- Register schemas (`registerSchema`).
- Add parameter metadata.
- Attach tag-level fields like `x-cacheStrategy`, `x-useCases`, etc.

Adding field-level metadata fits naturally here.

**Possible implementation options (in `ws-dottie` repo):**

- Option A (fine-grained, more work):
  - Update important Zod fields to call `.openapi()` with custom metadata:

    ```ts
    someFieldSchema.openapi({
      description: 'Human readable description',
      'x-mcp-importance': 'high'
    });
    ```

- Option B (coarser but easier):
  - Use a small convention in `generate-openapi.ts` to post-process known schemas:
    - E.g. for `VesselLocation` schema, mark:
      - `VesselID`, `VesselName`, `Latitude`, `Longitude`, `DepartingTerminalID`, `ArrivingTerminalID`, `DepartTime`, `ArriveTime` as `high`.
      - Others as `medium` or `low`.

This keeps decisions centralized and allows iteration without editing hundreds of schemas.

### 3.3 How MCP tools can use field importance

At MCP runtime (`ws-dottie-mcp`):

- When reading OpenAPI YAML:
  - For each schema property, inspect `x-mcp-importance` (if present).
- Support a `view` argument for tools, e.g.:

  ```ts
  view?: 'summary' | 'full';
  ```

- Behavior:
  - `view = 'full'` (or absent for Phase 1): return the full `ws-dottie` JSON as-is.
  - `view = 'summary'`: project each object down to **high-importance fields** (and maybe some medium-importance fields depending on design).

Optionally, support:

- `fields?: string[]` to let the agent explicitly ask for additional properties when it knows their names.

**Phase recommendations**

- **Phase 1**:
  - Return **full responses**.
  - Keep ferries-only scope and rely on the model to summarize / drop context where needed.
- **Phase 2**:
  - Introduce field importance metadata in OpenAPI YAML.
  - Add `view = 'summary' | 'full'` and optional `fields: string[]` to tool arguments.
  - Default to `summary` for verbose endpoints (e.g., history/fare endpoints with large payloads).

---

## 4. Documentation Integration: YAML + Category Docs + Docs Tools

### 4.1 Using OpenAPI YAML as schema source

`generate-openapi.ts` already generates high-quality specs for each API from your Zod/endpoint registry:

- Registers schemas with canonical names.
- Builds tags from `endpointGroups` including:
  - `summary`, `description`, `businessContext`, `useCases`, `updateFrequency`, `cacheStrategy` (via custom `x-*` fields).
- Creates example payloads and code samples (`x-codeSamples`).

For ferries, we rely on:

- `docs/generated/openapi/wsf-vessels.yaml`
- `docs/generated/openapi/wsf-schedule.yaml`
- `docs/generated/openapi/wsf-terminals.yaml`
- `docs/generated/openapi/wsf-fares.yaml`

**Plan**

- In `ws-dottie-mcp`, parse these YAML files and construct:
  - `operationId -> { requestParamsSchema, responseSchema, tagName }`.
  - `tagName -> { summary, description, x-useCases, x-cacheStrategy }`.

- When defining EndpointGroup tools:
  - Use **tag name and metadata** to drive tool descriptions:
    - Short summary: from `summary`.
    - Longer description: from `description` and `x-useCases` (truncated to avoid bloat).
    - Cache hints: from `x-cacheStrategy`, `updateFrequency`.

- For `operation` enum values:
  - Use operation IDs and `summary` fields for each path:
    - e.g., `getVesselLocations`, `getVesselLocationsByVesselId`.
    - You can map them to more friendly enum strings: `'list_all'`, `'by_vessel_id'`, etc.

### 4.2 Docs tools for multi-step detail retrieval

To avoid embedding full docs into tool definitions, create **dedicated docs tools**:

- `get_ferries_category_overview`
  - Args: none.
  - Sources:
    - Top of `docs/guides/categories/ferries.md` (overview and API table).
  - Returns:
    - A concise summary of the four ferry APIs and when to use each.

- `get_ferries_endpoint_group_docs`
  - Args: `{ groupName: string }` (e.g., `'vessel-locations'`, `'fare-line-items'`).
  - Sources:
    - `ferries.md` → the row/section for that EndpointGroup.
    - OpenAPI tag metadata for that group (summary, description, use cases).
  - Returns:
    - Explanation of what the group covers.
    - Practical use cases.
    - Notes on cache strategy and update frequency.

- `get_ferries_endpoint_docs`
  - Args: `{ operationId: string }`.
  - Sources:
    - OpenAPI YAML for the operation:
      - Path/method.
      - Parameters, types, descriptions.
      - Response schema and examples.
      - `x-codeSamples` if desired.
  - Returns:
    - Input parameter doc.
    - Key response fields (possibly filtered by importance).
    - A small example.

**Agent workflow (example)**

- User: “Help me calculate the fare for a car and two adults from terminal 3 to 7 tomorrow.”
- Agent (using skill instructions):
  1. Calls `get_ferries_endpoint_group_docs` with `groupName = 'fare-line-items'` to confirm how to query fares.
  2. Calls `ferries_fares` with:
     - `operation = 'fare_line_items_by_trip_date_and_terminals'`.
     - `params` including `TripDate`, `DepartingTerminalID`, `ArrivingTerminalID`, `RoundTrip`.
  3. Interprets returned data and explains total cost.

This design keeps tools small and docs fetchable on demand, avoiding huge static prompts.

---

## 5. Skills and Context-Bloat Strategy

### 5.1 Readiness of MCP+skills ecosystem

- **MCP tooling**:
  - The TypeScript SDK and reference clients/servers are actively maintained and used in real-world deployments.
  - Cloudflare’s code-mode and MCP integrations emphasize the pattern of:
    - Externalizing large corpora (repos, docs) into tools.
    - Letting the model call tools as needed to keep context windows manageable  
    ([Cloudflare code-mode blog](https://blog.cloudflare.com/code-mode/), MCP intro [MCP engineering post](https://www.anthropic.com/engineering/code-execution-with-mcp)).

- **Skills**:
  - Anthropic’s skills feature is an actively supported way to encode:
    - Persistent instructions.
    - Multi-step workflows.
    - Tool usage strategies.  
  - Docs: [Equipping agents with skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills), [skills product intro](https://claude.com/blog/skills), [skills usage guide](https://support.claude.com/en/articles/12512180-using-skills-in-claude#h_2746475e70).

So the patterns we’re designing for (tool-centric workflows + skills + docs tools) are **practical and current best practice**, not speculative.

### 5.2 Skills design for ferries

**Context assumption**: ~200K tokens, but we want to preserve as much budget as possible for conversation, code, and API responses.

**Recommended skills**

1. **Skill: “Work with Washington State ferry data via ws-dottie-mcp”**

   - Purpose:
     - Teach the agent **what `ws-dottie-mcp` is**.
     - Summarize ferries APIs and main EndpointGroups.
     - Describe when to call each tool and how to obtain docs.

   - Contents (high-level outline):
     - Short explanation:
       - “This skill helps you use the `ws-dottie-mcp` MCP server to access real-time and static ferry data (vessels, schedules, terminals, fares) from WSDOT/WSF.”
     - Mapping of user intents to EndpointGroups/tools:
       - “For live vessel positions, use `ferries_vessel_locations`.”
       - “For fare calculations, use `ferries_fares`, often after looking up terminals via `ferries_terminals`.”
       - “For schedules, use the various schedule-related EndpointGroup tools (sailings, routes, route-details, etc.).”
     - Guidance for docs:
       - “If you’re unsure about parameters or outputs, call `get_ferries_category_overview` or `get_ferries_endpoint_group_docs` before calling a data tool.”
     - Key notes:
       - Data is provided by WSDOT/WSF and may be delayed or approximate.
       - Some endpoints are real-time (`REALTIME` cache strategy), others static or periodic.

2. **Skill: “Plan a Washington State ferry trip”** (optional, workflow-focused)

   - Purpose:
     - Encode a **multi-step pattern** for typical trip-planning tasks.
   - Outline:
     - Given a user’s origin, destination, date/time, and approximate passenger/vehicle info:
       - Step 1: Identify possible routes and sailings (schedule tools).
       - Step 2: Compute fares (fares tools).
       - Step 3: Optionally check vessel locations and terminal status for day-of-travel.
     - Instruct agent:
       - “First, understand the user’s requirements and constraints.”
       - “Call appropriate ferries schedule tools to find routes and sailings.”
       - “Then call `ferries_fares` with the same date and terminals to compute cost.”
       - “Provide summarized itinerary and estimated cost.”

These skills stay compact and focus on **how to use tools** and **what workflows are useful**. They do not embed large documentation chunks, which are instead fetched via docs tools.

---

## 6. Config and Auth Strategy

### 6.1 Local / Generic MCP

- Default behavior:
  - Read `WSDOT_ACCESS_TOKEN` from environment at startup.
  - Use `configManager.setApiKey` from `ws-dottie` to configure the global client.
- Expose a `set_ws_dottie_api_key` tool:
  - Args: `{ apiKey: string }`.
  - Sets an in-memory override (per server instance, or more ideally per session if your transport/session handling supports it).
  - Skills can mention:
    - “If a call fails due to lack of API key, you may prompt the user to provide their WSDOT API key and then call `set_ws_dottie_api_key`.”

### 6.2 Cloudflare Hosting

- Use **Cloudflare Workers secrets** or environment vars to store your WSDOT API key.
- At Worker startup:
  - Call `configManager.setApiKey` with the key from environment.
- For security and simplicity:
  - Consider **disabling** `set_ws_dottie_api_key` in Cloudflare environments, or ignore it:
    - Hosted version uses your key only.
    - Local/dev version allows custom keys.

---

## 7. Logging and Observability

**Per-tool-call logging**

- Log each MCP tool invocation with:
  - `toolName`.
  - Timestamp.
  - `operation` (if applicable).
  - Duration (start/end timestamps).
  - Result: success/failure and error message.
- In local dev:
  - Use `console.log` / `console.error`.
- In Cloudflare Workers:
  - Use `console.log` and Cloudflare’s logging infrastructure for aggregation.

Later enhancements:

- Switchable “debug mode”:
  - Via environment variable or special tool to enable more verbose logging (e.g., including partial params).
- Optionally log anonymized/generic usage metrics (counts per EndpointGroup, etc.) to tune skills and docs.

---

## 8. Summary of Key Design Decisions

- **Architecture & SDK**:
  - Phase 1: Bun/Node, stdio MCP server using `@modelcontextprotocol/sdk`.
  - Phase 2: Cloudflare Workers remote MCP, using Streamable HTTP transport or `mcp-server-cloudflare`, plus optional Convex.

- **Tool Granularity**:
  - **One MCP tool per EndpointGroup** for ferries (e.g., `ferries_vessel_locations`), with an `operation` enum selecting specific endpoints.
  - Arguments as a discriminated union on `operation`, with optional `options` (validate, fetchMode).

- **Response Shaping**:
  - Phase 1: Return full `ws-dottie` responses.
  - Later: Add `view: 'summary' | 'full'` and optional `fields: string[]`, using field-importance metadata in OpenAPI (`x-mcp-importance`) to build compact summaries.

- **Documentation Integration**:
  - Use **OpenAPI YAML** as canonical for MCP schemas and endpoint docs, and `ferries.md` for high-level narrative.
  - Provide docs tools:
    - `get_ferries_category_overview`
    - `get_ferries_endpoint_group_docs`
    - `get_ferries_endpoint_docs`
  - Encourage multi-step workflows where the agent calls docs tools before complex data tools.

- **Skills & Context Management**:
  - Define a small number of **high-level skills**:
    - “Work with Washington State ferry data via ws-dottie-mcp.”
    - Optional: “Plan a Washington State ferry trip.”
  - Skills describe **tool usage patterns** and **multi-step workflows**, not detailed schemas.
  - Maintain a ~200K context budget by keeping heavy docs in tools, not in skills/system prompts.

- **Config & Auth**:
  - Local/dev: `WSDOT_ACCESS_TOKEN` env var + `set_ws_dottie_api_key` tool.
  - Cloudflare: use your own key via Workers secrets; possibly disable or ignore the config tool there.

- **Logging**:
  - Per-tool-call structured logging to stdout/Workers logs (MIT-licensed, non-sensitive data).

This plan positions `ws-dottie-mcp` as a modern, MCP-native wrapper around `ws-dottie`, with a careful balance between rich domain guidance (via skills + docs tools) and strict control over context bloat.





