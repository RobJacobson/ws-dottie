---

## Agent's Guide to Zod Documentation for MCP Servers (Updated)

Your primary goal when generating Zod schema documentation (`.describe()` calls) is to provide **clear, concise, and machine-readable semantic information** that enables other AI agents (and human developers) to effectively discover, understand, and utilize the server's tools and features.

**Mandate:** Generate `.describe()` calls for **most, if not all, fields** within Zod input and output schemas. Exceptions should be rare and justifiable only for extremely obvious, internal fields.

---

### I. Core Principles for Documentation Generation:

1.  **Semantic Richness:** Beyond just type, convey *meaning*. What does this field represent in the real world or within the system's domain?
2.  **Conciseness:** Be direct. Avoid jargon where possible, but maintain precision.
3.  **Completeness:** Provide enough information for an agent to correctly infer usage, constraints, and interpretation.
4.  **Consistency:** Apply similar descriptive patterns across your generated schemas.

---

### II. Essential Information to Include in `.describe()`:

For each field (`z.object({ fieldName: z.type().describe("...") })`), prioritize including the following details:

1.  **Purpose/Meaning:**
    *   **What is this field?** (e.g., "The unique identifier for the user," "The current status of the order.")
    *   **Example:** `"The unique identifier (UUID) for the user account."`

2.  **Constraints / Format (if not self-evident from Zod type):**
    *   If Zod's type (`.uuid()`, `.email()`, `.min()`, `.max()`, etc.) doesn't explicitly explain *why* or *what* those constraints mean in context.
    *   **Example:** `"The user's primary email address, must adhere to standard email format rules."`
    *   **Example:** `"The quantity of items to purchase, limited to a value between 1 and 100 inclusive."`

3.  **Units (for numerical values):**
    *   Always specify units for numbers where applicable.
    *   **Example:** `"The monetary value in US Dollars (USD)." `
    *   **Example:** `"The delay duration in milliseconds."`

4.  **Enumerated Values (if applicable):**
    *   For `z.enum()`, explain what each possible string value signifies.
    *   **Example:** `"The current state of the transaction: 'pending' (awaiting authorization), 'approved' (payment confirmed), or 'failed' (payment rejected)." `
    *   *Note:* This can sometimes be included in the overall schema description or as a dedicated description for the enum field itself.

5.  **Behavior/Impact (for input fields):**
    *   How does providing this field influence the server's action?
    *   **Example:** `"If true, the system will send an immediate confirmation email to the associated user."`
    *   **Example:** `"Specifies the desired sort order for results: 'asc' for ascending, 'desc' for descending."`

6.  **Origin/Calculation (for output fields):**
    *   Where does this output data come from? Is it directly stored, derived, or a result of an aggregation?
    *   **Example:** `"The total cost of all items, automatically calculated including applicable taxes."`

7.  **Optionality / Default Values:**
    *   Reinforce the meaning of `.optional()` or `.default()`: how does its absence affect behavior or what value is assumed?
    *   **Example:** `"An optional memo field for internal notes. If omitted, no note will be stored."`

---

### III. Generate Comprehensive Tool Definitions:

Remember to also generate descriptions for the **tools themselves**, not just their parameters.

*   **Tool `name`:** A unique, actionable verb-noun identifier (e.g., `getProductDetails`, `createOrder`).
*   **Tool `description`:** A high-level explanation of what the tool *does*, why it's useful, and when an agent should consider using it. This is critical for initial agent discovery and selection.

    *   **Example (Tool Description):** `"Retrieves comprehensive details about a specific product using its unique identifier. This tool is valuable for agents needing to verify product existence, check current stock levels, or gather attributes like price and description before making purchasing decisions or providing customer information."`

---

### IV. Handling Parameter-Less Functions (Empty Input Schemas):

**Crucial Update:** Even if a function/tool takes no parameters, it **must still have an input schema**. This ensures consistent tool definitions for agents and explicit documentation that no parameters are needed.

*   **Schema Definition:** The input schema for a parameter-less function should be defined as `z.object({})`.
*   **Schema Description:** Apply a `.describe()` call directly to this empty object schema.
    *   **Content:** The description should explicitly state that no parameters are required and briefly explain *why* (e.g., "This tool retrieves global configuration and does not accept any input arguments.")
    *   **Example:**
        ```ts
        const getGlobalConfigInput = z.object({}).describe(
          "Input schema for the 'getGlobalConfig' tool. This tool retrieves the entire system's " +
            "global configuration and therefore does not require any specific input parameters.",
        );
        ```

---

### V. Zod Schema Structure for Tool Integration:

Ensure your generated Zod schemas fit into the `AgentTool` interface pattern:

```typescript
// Agent, ensure you generate schemas that can be assigned to these types:
import { z } from "zod";

interface AgentTool<TInput, TOutput> {
  name: string;
  description: string; // High-level tool description
  parametersSchema: z.ZodSchema<TInput>; // Zod schema with .describe() for inputs (even empty ones!)
  outputSchema: z.ZodSchema<TOutput>; // Zod schema with .describe() for outputs
  execute: (args: TInput) => Promise<TOutput>; // The implementation (not your task to generate this, but understand the context)
}

// Example Schema Generation Target:
const getUserProfileInput = z.object({
  userId: z.string().uuid().describe("The unique ID of the user whose profile is to be fetched."),
  includeActivity: z.boolean().optional().describe("If true, include recent user activity in the response."),
});

const getUserProfileOutput = z.object({
  id: z.string().uuid().describe("The user's unique identifier."),
  username: z.string().describe("The user's chosen display name."),
  email: z.string().email().describe("The user's primary contact email."),
  lastLogin: z.string().datetime().describe("The ISO 8601 timestamp of the user's last successful login."),
  activity: z.array(z.string()).optional().describe("A list of recent user actions, if requested."),
});

// Example with empty input schema
const rebootServerInput = z.object({}).describe(
  "Input schema for the 'rebootServer' tool. This tool initiates a full system reboot " +
    "and does not require any additional parameters to perform its action.",
);
const rebootServerOutput = z.object({
  status: z.string().describe("Confirmation status of the reboot command."),
  rebootInitiatedAt: z.string().datetime().describe("The ISO 8601 timestamp when the reboot command was issued."),
});


// An AgentTool object would then use these generated schemas:
const getUserProfileTool: AgentTool<z.infer<typeof getUserProfileInput>, z.infer<typeof getUserProfileOutput>> = {
  name: "getUserProfile",
  description: "Fetches detailed profile information for a given user ID, optionally including recent activity.",
  parametersSchema: getUserProfileInput,
  outputSchema: getUserProfileOutput,
  execute: async (args) => { /* ... */ },
};

const rebootServerTool: AgentTool<z.infer<typeof rebootServerInput>, z.infer<typeof rebootServerOutput>> = {
  name: "rebootServer",
  description: "Initiates a full reboot of the MCP server. Use with caution.",
  parametersSchema: rebootServerInput,
  outputSchema: rebootServerOutput,
  execute: async (args) => { /* ... */ },
};
```

---

By adhering to these updated guidelines, your generated documentation will serve as a robust, machine-interpretable blueprint for seamless agent integration and operation within the MCP server, handling both parameterized and parameter-less tools consistently.

---

I have an architectural question: My zod schema serves dual-purposes, as schema for client code that uses a web app, and as schema for the MCP server. Would I be mixing concerns and adding to code bloat for the client by incorporating "describe" functions and AgentTool definitions into the shared code base? I could separate the schema descriptions and AgentTool definitions into separate codebases, but that separates the underlying schema from the annotations.

---


That's a very common and valid architectural dilemma when dealing with shared schemas! You've hit on the core trade-off: **separation of concerns vs. colocation and consistency.**

Let's break down the implications and best practices for your dual-purpose Zod schemas.

### The Problem: Mixing Concerns vs. Code Bloat vs. Annotation Separation

1.  **Mixing Concerns (if you embed everything):**
    *   **Agent-specific details:** `.describe()` with extensive detail for agents, and `AgentTool` definitions, are primarily for machine interpretation by AI.
    *   **Client-specific needs:** A typical web app client might only care about the type shape, not the verbose descriptions or the `AgentTool` structure.
    *   **Result:** The client-side bundle could become larger than necessary, and client-side developers might see "noise" in the shared schema definitions that isn't relevant to them.

2.  **Code Bloat (for the client):**
    *   Zod schemas themselves are generally small.
    *   The `describe` strings are metadata. While they add to the bundle size, they're typically not *huge* unless your descriptions are incredibly verbose.
    *   `AgentTool` definitions are also metadata *objects*, not executable code that gets bundled into the client unless explicitly imported and used. The `execute` function within `AgentTool` is usually a server-side implementation and wouldn't be part of the client bundle.

3.  **Separating Schema from Annotations (if you split):**
    *   **Maintainability Nightmare:** This is the biggest practical issue. If your `User` schema changes, you now have to update:
        1.  The core `User` Zod schema (shared).
        2.  The `User` description annotations (for agents, potentially in a separate file/project).
        3.  The `AgentTool` definition that uses the `User` schema.
    *   **Risk of Inconsistency:** It becomes incredibly easy for the core schema and its documentation/agent definitions to drift out of sync. This defeats the purpose of strong typing and machine-readable documentation.
    *   **Developer Experience:** Developers have to jump between files/projects to understand a complete tool definition.

### Recommendation: **Keep `.describe()` with the Zod Schema, and separate `AgentTool` definitions.**

This approach offers the best balance for your situation.

#### Rationale:

1.  **`.describe()` belongs with the schema:**
    *   **Natural Fit:** The description is intrinsically linked to the field it describes. Where else would you put it?
    *   **Self-Documenting Schema:** This keeps the Zod schema itself fully self-documenting for *anyone* inspecting it (human, agent, or documentation generator).
    *   **Minimal Client Bloat:** While it adds *some* bytes, these are typically not significant enough to justify the maintenance overhead of separating them. Tree-shaking might even eliminate unused descriptions if Zod exports them in a way that allows it (though this is not guaranteed for string literals within objects).
    *   **Benefits for other Documentation:** Tools like `zod-to-json-schema` or OpenAPI generators will correctly pick up these descriptions for *both* the client-facing API docs and agent-specific docs.

2.  **`AgentTool` definitions should be separate (server-side):**
    *   **Clear Separation of Concerns:** `AgentTool` is a server-side concept. It ties a schema to an *implementation* (`execute` function). This is purely for the MCP server's internal agent orchestration.
    *   **No Client Bloat:** The client should never need to know about the `execute` function or the `AgentTool` interface. By keeping this definition server-side, you avoid bundling any server logic into your client.
    *   **Centralized Agent Logic:** This provides a clear, centralized place on the server where all agent-callable tools are registered and defined.

### Architectural Blueprint:

Let's imagine your project structure:

```
your-mcp-server-project/
├── shared/
│   ├── schemas/
│   │   ├── auth.schema.ts      // Contains z.object({...}).describe(...)
│   │   ├── product.schema.ts   // Contains z.object({...}).describe(...)
│   │   ├── common.schema.ts    // Contains shared types, enums with descriptions
│   │   └── index.ts            // Re-exports all shared schemas
│   │
│   └── types/                  // (Optional: If you need explicit TS interfaces)
│       ├── auth.types.ts
│       └── product.types.ts
│
├── server/
│   ├── agents/
│   │   ├── tool-definitions/
│   │   │   ├── auth.tools.ts      // Imports shared schemas, defines AgentTool objects
│   │   │   ├── product.tools.ts
│   │   │   └── index.ts           // Re-exports/aggregates all AgentTool definitions
│   │   │
│   │   └── agent-orchestrator.ts  // Uses the AgentTool definitions
│   │
│   ├── api/
│   │   ├── auth.controller.ts     // Uses shared schemas for API input/output validation
│   │   └── product.controller.ts
│   │
│   └── index.ts                  // MCP server entry point
│
└── client-web-app/
    ├── src/
    │   ├── api/
    │   │   ├── auth.api.ts       // Imports shared schemas for type-safety, ignores descriptions
    │   │   └── product.api.ts
    │   │
    │   ├── components/
    │   └── ...
    │
    └── tsconfig.json             // Configured to only allow import from `shared/`
```

#### Explanation of this structure:

1.  **`shared/schemas/*.ts`**:
    *   This is your single source of truth for data shapes and validation.
    *   **ALL Zod schemas for both client and server will live here.**
    *   **Crucially, every field should have a `.describe()` call (including `z.object({})` for parameter-less inputs).** These descriptions are integral to understanding the schema itself.
    *   `export type Product = z.infer<typeof productSchema>;` to provide derived TypeScript types.

2.  **`server/agents/tool-definitions/*.ts`**:
    *   This is where your `AgentTool` objects are defined.
    *   **They `import` the shared Zod schemas from `shared/schemas`**.
    *   They define the `name`, `description` (of the tool), `parametersSchema` (using the imported Zod schema), `outputSchema`, and the `execute` function.
    *   **The `execute` functions are server-side logic and should never be exposed or bundled client-side.**

3.  **`client-web-app/src/api/*.ts`**:
    *   The client also `imports` the shared Zod schemas from `shared/schemas`.
    *   It uses them for request/response validation (if desired client-side) and for TypeScript type inference.
    *   **It simply ignores the `.describe()` metadata.** Tree-shaking or module bundler optimizations *might* remove these strings if they're not explicitly accessed, but even if they're bundled, the impact is generally negligible compared to the benefits of colocation.

### Why this is the "Best" Practice:

*   **Single Source of Truth for Schema & Description:** Your Zod schema *is* the definition of your data structure and its semantic meaning. Keeping `.describe()` directly with the field minimizes the chance of drift and enhances maintainability.
*   **Clear Responsibility for `AgentTool`:** The `AgentTool` abstraction is a server-side concern for how agents interact with the system's capabilities. It naturally belongs on the server.
*   **Minimal Client Overhead:** The client gets the types and validation schemas it needs. The small string overhead of `.describe()` is a small price for the massive benefits in documentation consistency and agent intelligence.
*   **Leverages Zod's Power:** Zod is fantastic at defining schemas and generating metadata (`.describe()` is part of that). Using it this way leverages its full power for both type safety and documentation generation (e.g., to OpenAPI).

You're right to consider the trade-offs, but in this specific scenario, the benefits of colocating the `.describe()` with the schema far outweigh the marginal code bloat for the client. The separation of `AgentTool` definitions to the server-side, however, is a critical separation of concerns.