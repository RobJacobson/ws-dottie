# API Documentation Guide (Simplified - G25)
*Streamlined guide for agents and editors working on Washington State transportation API documentation*

## 🚨 CRITICAL: Data Volume Management

**ALWAYS use `--limit 10` when fetching data with fetch-dottie.** This prevents overwhelming agent context windows by truncating output to 10KB. The output may be cut mid-item - this is intentional for sampling purposes.

```bash
# REQUIRED format for all data fetching:
npx fetch-dottie [api-name]:[function-name] --limit 10
```

---

## 📋 Table of Contents

### **For Agents: Step-by-Step API Work (The "Updating Process")**
- [1.0 Project Mission & Overview](#1-0-project-mission--overview)
- [1.5 Multi-API Workflow Instructions](#1-5-multi-api-workflow-instructions)
- [2.0 Task 1: Endpoint Discovery & Data Fetching](#2-0-task-1-endpoint-discovery--data-fetching)
- [3.0 Task 2: Domain Analysis Creation](#3-0-task-2-domain-analysis-creation)
- [4.0 Task 3: Input Schema Documentation](#4-0-task-3-input-schema-documentation)
- [5.0 Task 4: Output Schema Documentation](#5-0-task-4-output-schema-documentation)
- [6.0 Task 5: Endpoint Description Creation](#6-0-task-5-endpoint-description-creation)
- [7.0 Task 6: Cross-Reference Integration](#7-0-task-6-cross-reference-integration)

### **For Editors: Synthesis & Finalization (The "Editing Process")**
- [8.0 Editor Workflow: Synthesis & Optimization](#8-0-editor-workflow-synthesis--optimization)

### **Reference Materials**
- [9.0 Standards & Rules Reference](#9-0-standards--rules-reference)
- [10.0 Templates & Examples](#10-0-templates--examples)
- [11.0 Quick References](#11-0-quick-references)
- [12.0 Troubleshooting Guide](#12-0-troubleshooting-guide)

### **📋 Essential Reference**
- **API Index**: `docs/api-index.md` - The canonical reference for all API names, function names, endpoint URLs, and sample parameters. Always consult this file before using `fetch-dottie` commands.

---

# 1.0 Project Mission & Overview

## 1.1 Project Mission

Transform terse, generic API descriptions into rich, semantic documentation that explains business purpose, real-world meaning, and endpoint relationships. Create discoverable documentation that enables both human developers and AI agents to understand and effectively use Washington State transportation APIs.

## 1.2 Target Audience: Dual Purpose Documentation

### 1.2.1 Human Developers
- Need clear business context and real-world applications
- Require integration examples and cross-API workflows
- Benefit from concise, actionable guidance

### 1.2.2 AI Agents via Model Context Protocol (MCP)
- **Semantic Discovery**: Rich descriptions enable AI agents to understand when and how to use endpoints
- **Context Efficiency**: Concise but complete descriptions fit within AI context windows
- **Integration Intelligence**: Cross-references help AI agents chain API calls for complex workflows
- **Business Logic**: Edge cases and business rules prevent AI agents from making incorrect assumptions

### 1.3 Documentation Strategy
- **Business-first explanations** serve both audiences
- **Semantic richness** enables AI discovery without overwhelming humans
- **Structured cross-references** guide both human integration and AI workflow planning
- **Edge case documentation** prevents both human errors and AI hallucinations

---

# 1.5 Multi-API Workflow Instructions

## 1.5.1 Understanding the Two Processes

This guide describes two distinct processes:

### **The "Updating Process" (Tasks 1-6) - For Agents**
Tasks 1 through 6 constitute the **updating process** for documenting API endpoints. When asked to complete the "updating process" for one or more APIs, you should:
1. Complete Task 1 (Endpoint Discovery & Data Fetching)
2. Complete Task 2 (Domain Analysis Creation)
3. Complete Task 3 (Input Schema Documentation)
4. Complete Task 4 (Output Schema Documentation)
5. Complete Task 5 (Endpoint Description Creation)
6. Complete Task 6 (Cross-Reference Integration)

### **The "Editing Process" (Section 8) - For Editors**
Section 8 describes the **editing process** for synthesizing and finalizing agent work. When asked to complete the "editing process" for one or more APIs, editors should follow Section 8's workflow to compare agent outputs and create final versions.

## 1.5.2 Multi-API Workflow: Complete One API at a Time

**CRITICAL**: When assigned multiple APIs (e.g., APIs A, B, and C), you MUST complete ALL tasks for one API before starting the next API. This maintains focused context and prevents fragmentation.

### **✅ CORRECT Workflow for Multiple APIs:**
```
1. API A: Complete Tasks 1 → 2 → 3 → 4 → 5 → 6
2. API B: Complete Tasks 1 → 2 → 3 → 4 → 5 → 6
3. API C: Complete Tasks 1 → 2 → 3 → 4 → 5 → 6
```

### **❌ INCORRECT Workflow (Do Not Do This):**
```
1. Research all APIs (A, B, C) - Task 1 for all
2. Write analyses for all APIs (A, B, C) - Task 2 for all
3. Document schemas for all APIs (A, B, C) - Tasks 3-4 for all
...
```

### **Why This Matters:**
- **Context Continuity**: Completing all tasks for one API maintains deep domain knowledge and consistency
- **Quality**: Each API gets your full attention with fresh understanding of its specific operational details
- **Error Prevention**: Reduces confusion between similar endpoints across different APIs
- **Efficiency**: Eliminates context-switching overhead and improves accuracy

### **For Editors:**
The same principle applies. When editing multiple APIs, complete the full editing process (Section 8) for API A, then API B, then API C. Don't compare all APIs' inputSchemas, then all outputSchemas—complete one API entirely before moving to the next.

## 1.5.3 Execution Instructions

When you receive an assignment to complete the "updating process" for multiple APIs:

1. **Acknowledge the assignment**: Confirm which APIs you'll document and in what order
2. **Begin with the first API**: Start Task 1 for API A
3. **Complete all tasks for API A**: Work through Tasks 1-6 sequentially
4. **Announce completion**: Clearly state when you've finished all tasks for API A
5. **Move to the next API**: Begin Task 1 for API B
6. **Repeat**: Continue this pattern until all assigned APIs are complete

**Example Response:**
> "I'll complete the updating process for three APIs in this order:
> 1. wsf-terminals (Tasks 1-6)
> 2. wsf-vessels (Tasks 1-6)
> 3. wsf-fares (Tasks 1-6)
>
> Starting with wsf-terminals, Task 1: Endpoint Discovery & Data Fetching..."

---

# 2.0 Task 1: Endpoint Discovery & Data Fetching

Task: Discover available API endpoints, fetch representative sample data using `npx fetch-dottie`, and conduct independent online research to gather additional business context.

Required Inputs:
*   The API index file (`docs/api-index.md`) for canonical endpoint names
*   The official API documentation (e.g., WSDOT/WSF docs)

Output: Raw API data samples and a solid understanding of the API's business domain and context.

## 2.1 Instructions for Endpoint Discovery and Data Fetching

### Step-by-Step Process

1. **Open the API Index**: Read `docs/api-index.md` to find all endpoints for your assigned API.

2. **Copy Function Names**: Use the exact function names from the "Function Name" column.

3. **Fetch Data**: Run `npx fetch-dottie [api-name]:[function-name] --limit 10` for each endpoint.

4. **Extract Examples**: Get 3-5 representative examples per field type from the responses.

### Command Format

```bash
# REQUIRED: Always use --limit 10 to prevent overwhelming agent context windows
npx fetch-dottie [api-name]:[function-name] --limit 10

# Examples:
npx fetch-dottie wsdot-border-crossings:getBorderCrossings --limit 10
npx fetch-dottie wsf-vessels:vesselBasics --limit 10
npx fetch-dottie wsf-terminals:terminalLocations --limit 10
```

### ⚠️ Important: Data Truncation Behavior

**CRITICAL**: The `--limit 10` flag truncates output to 10KB (10,240 bytes) by cutting off data at the byte limit. This means:

- **Output may be cut mid-item**: The last object, array element, or field may be incomplete
- **JSON structure may be broken**: Truncated output may not be valid JSON
- **Purpose is sampling**: This is intentional - you need enough data to understand structure and extract examples, not complete datasets
- **Works consistently**: Same 10KB limit applies regardless of `--pretty`, `--concise`, or raw output

**Do NOT attempt to fix or complete truncated JSON** - work with the partial data as provided.

### 🛑 Critical Stopping Condition

If `fetch-dottie` consistently fails to return data, **stop all work and request assistance**.

3.  **Gather Additional Context**: Conduct independent online research to gather additional business context related to the API, its data, and how this data can be meaningfully used.
    *   **Search Example**: For the `GetBorderCrossingsAsJson` endpoint, search for keywords like:
        *   "WSDOT border crossings wait times"
        *   "WSDOT US Canada border crossing regulations Washington State"
        *   "WSDOT roads commercial vehicle restrictions Washington State borders"
        *   "WSDOT Peak travel times US-Canada border WA"

---

# 3.0 Task 2: Domain Analysis Creation

Required inputs: 
*   The API index file (`docs/api-index.md`) for endpoint reference
*   The official API documentation (e.g., WSDOT/WSF docs), provided by the user
*   The raw API sample data (from Task 1)
*   The results from independent online research (from Task 1).

If you are missing any required inputs, this is a mandatory stopping condition.

Task: Analyze the collected data and context to identify the business purpose, target users, key business concepts, data patterns, edge cases, integration opportunities, and domain-specific rules/logic related to the API.

Output: A comprehensive `domain-analysis.[agent-name].md` file detailing the business context and data characteristics of the API.

**Required File**: `src/apis/[api-name]/working/domain-analysis.[agent-name].md`

## 3.1 Instructions for Domain Analysis Creation

To create a comprehensive domain analysis, follow these steps:

1.  **Review Collected Inputs**: Thoroughly examine all required inputs:
    *   API index file (`docs/api-index.md`) for endpoint reference
    *   Official API documentation (e.g., WSDOT/WSF docs)
    *   Raw API sample data (from Task 1)
    *   Results from independent online research (from Task 1)
    Ensure a solid understanding of the API's business domain and context. Stop work and request assistance if any inputs are missing or unclear.

2.  **Define Business Purpose**: Articulate the core problem this API or endpoint solves in the real world. Include relevant business logic and consider data freshness implications. Refer to the "Data Freshness Quick Reference" in [Quick References](#11-0-quick-references) for guidance.

3.  **Identify Target Users**: Determine who will use this data and for what primary purposes. Focus on their decision-making needs.

4.  **Define Key Business Concepts**: Document and define any domain-specific terminology, acronyms, or concepts that are crucial for understanding the API's context.

5.  **Analyze Data Patterns**: Examine the sample data for recurring structures, common values, and observed data freshness patterns. Look for insights into how data is typically organized and behaves.

6.  **Document Edge Cases**: Actively search for and document unusual or special values in the data (e.g., -1 for "closed", nulls with business meaning, magic numbers in numeric fields, special strings in text fields). Explain their business meaning and implications. Prioritize documenting negative values, null values, and special status codes with business meaning. Refer to the "Edge Case Documentation Template" in [Quick References](#11-0-quick-references) for formatting and the "Edge Case Documentation" in [Standards & Rules Reference](#9-0-standards--rules-reference) for scope.

7.  **Identify Integration Opportunities**: Note potential connections and synergies with other APIs or data sources for future cross-referencing. Do NOT add actual cross-references in this phase; simply identify and describe the potential for integration.

8.  **Document Domain-Specific Rules and Logic**: Record any specific rules, constraints, or business logic that govern the data or its usage. This is critical for understanding the business context and preventing misinterpretation by both human developers and AI agents.

9.  **Write in Plain English with Business Context First**: When composing your analysis, prioritize real-world meaning and purpose. Use natural, conversational language, avoiding technical jargon without explanation. Ensure factual grounding based on official documentation and observed API data.

**Output**: A comprehensive `domain-analysis.[agent-name].md` file detailing the business context and data characteristics of the API, saved in `src/apis/[api-name]/working/`.

# 4.0 Task 3: Input Schema Documentation

**Objective**: Add business-focused descriptions to all input fields using `.describe()` annotations.

**Required File**: `src/apis/[api-name]/working/inputSchemas.[agent-name].ts`

## 4.1 Instructions for Documenting Input Schemas

To document input schemas, follow these steps:

1.  **Gather Required Inputs**: Ensure you have the following files and information:
    *   The `src/apis/[api-name]/original/inputSchemas.original.ts` file for this API.
    *   The official API documentation.
    *   The raw API sample data (from Task 1).
    *   The `domain-analysis.[agent-name].md` file (from Task 2).
    If any of these inputs are missing, stop work and request assistance.

2.  **Add Top-Level Schema Description**: Add a `.describe()` annotation to the top-level input schema object. This description should provide a concise, business-focused overview of the schema's overall purpose. Consider these templates:

    *   **No parameters**: `"Input parameters to retrieve all [entity type] across [scope] (none required)."`
    *   **Single entity**: `"Input parameters to retrieve a specific [entity type] by [identifier]."`
    *   **Filtered search**: `"Input parameters to search [entity type] by [criteria] for [purpose]."`

    ```typescript
    import { z } from "zod";

    export const vesselBasicsByIdInputSchema = z
      .object({
        /** Unique identifier for a vessel. */
        VesselID: z.number().int().describe("Unique identifier for a vessel, as an integer. E.g., '1' for MV Tacoma, '15' for MV Wenatchee. Used to retrieve detailed information for a specific vessel."),
      })
      .describe("Input parameters for retrieving basic information for a specific WSF vessel by its unique identifier.");
    ```

3.  **Document All Input Fields**: Add `.describe()` annotations to all individual input fields within the schema. When composing these descriptions:
    *   **Focus on Business Purpose**: Describe the parameter's purpose in business terms and its real-world context.
    *   **Include Business-Related Data Type**: Start the first sentence of the description by clearly stating its business-related data type or format. For example:
        *   "The [something] date, as a UTC date. E.g., '[example-date-string]' for [describe-filter-results]"
        *   "The name of [some entity], as a string. E.g., '[example-name]' for [describe-entity]"
        *   "An array of [some values], as a comma-delimited string. E.g., '[example-values]' for [describe-filter-results]"
    *   **Prefer Definite/Indefinite Articles**: Unless there's a strong business reason otherwise, start descriptions with "The" or "An" for improved readability.
    *   **Consult Guidelines**: Refer to the "Field Description Guidelines" in [Standards & Rules Reference](#9-0-standards--rules-reference) for guidance on incorporating purpose, examples, edge cases, and context.
    *   **Determine Examples Needed**: If an input field benefits from examples, use the "Example Decision Tree" in [Quick References](#11-0-quick-references) to decide if multiple examples are necessary.
    *   **Adhere to Length Limits**: Ensure descriptions meet the "Description Length Limits" specified in [Quick References](#11-0-quick-references).

4.  **Preserve Original Code Integrity**: This is a critical rule [[memory:8705120]]. Do not modify or delete any existing JSDoc comments (`/** Original comment */`). Your sole responsibility is to add new or enhance existing `.describe()` annotations. Also, **never rename schema variables**; preserve original variable names exactly as provided in the original file.

**Output**: An updated file saved as `src/apis/[api-name]/working/inputSchemas.[agent-name].ts`, containing comprehensive, business-focused descriptions for all input fields and the top-level schema, with no other changes to the file.

# 5.0 Task 4: Output Schema Documentation

Required inputs:
- The `src/apis/[api-name]/original/outputSchemas.original.ts` file for this API
- The official API documents
- The raw API sample data fetched above (from Task 1)
- The `domain-analysis.[agent-name].md` file (from Task 2)

If you are missing any required inputs, this is a mandatory stopping condition.

Task: Add missing `z.describe(...)` annotations to the `outputSchemas.original.ts` file for all output fields and nested schema objects, ensuring consistency with our documentation styles, and include the required data freshness statement. This *does not include* editing other portions of the code or the JSDoc comments, which must not be changed.

**CRITICAL REMINDER**: Cross-references are **NOT** to be added in this phase; they are exclusively added in Task 6 (Cross-Reference Integration).

Required output: An updated `src/apis/[api-name]/working/outputSchemas.[agent-name].ts` file with comprehensive, business-focused descriptions for all output fields and schemas, and *no other changes* to the file.

## 5.1 Instructions for Documenting Output Schemas

To document output schemas, follow these steps:

1.  **Gather Required Inputs**: Ensure you have the following files and information:
    *   The `src/apis/[api-name]/original/outputSchemas.original.ts` file for this API.
    *   The official API documents.
    *   The raw API sample data fetched above (from Task 1).
    *   The `domain-analysis.[agent-name].md` file (from Task 2).
    If any of these inputs are missing, stop work and request assistance.

2.  **Add Top-Level and Nested Schema Descriptions**: Add `.describe()` annotations to **all schema definitions, including the top-level and any nested complex object schemas**. These descriptions should provide a concise, business-focused overview of the schema's overall purpose.
    *   **Specify Container Type and Cardinality**: When describing top-level output array schemas, explicitly mention the container type (e.g., "array of") and the typical cardinality (e.g., "typically returns 10-20 items").
    *   Consider this template for top-level output array schemas:
        `"Returns [container] of [entity type] including [key data] for [use case] (typically [cardinality]). [Business context]. [Data freshness]."`

3.  **Document All Output Fields**: Add `.describe()` annotations to *every* individual output field within the schema. When composing these descriptions:
    *   **Focus on Business Meaning**: Explain the field's business meaning, providing real-world examples and clarifying edge cases. Refer to the "Field Description Guidelines" in [Standards & Rules Reference](#9-0-standards--rules-reference) for detailed guidance.
    *   **Apply Parallel Language**: When fields represent the same concept in different formats (e.g., measurements in different units, dates in different formats), use parallel language as described in Section 9.2.6.
    *   **Factual Accuracy - Avoid Speculation**: Never speculate about specific reasons for edge cases or unusual values. Document what the data shows, not what you assume it means. Use inclusive language like "when closed or unavailable" rather than assuming specific causes like "for maintenance or emergencies." Refer to "Factual Accuracy Requirements" in [Standards & Rules Reference](#9-0-standards--rules-reference).
        *   **✅ CORRECT - Document observable behavior:**
            ```typescript
            WaitTime: z.number().describe(
              "Current wait time for the border crossing, in minutes. E.g., '15' for normal traffic. Returns '-1' when the lane is closed or data is unavailable."
            )
            ```
        *   **❌ WRONG - Speculative assumptions:**
            ```typescript
            WaitTime: z.number().describe(
              "Returns '-1' when crossing is closed for maintenance, emergencies, or weather."
            )
            ```
    *   **Examples**: Use actual API data. Refer to the "Complete Field Description Examples" in [Templates & Examples](#10-0-templates--examples) and the "Example Decision Tree" in [Quick References](#11-0-quick-references) to determine if multiple examples are needed.
    *   **Edge Cases**: Explain unusual values (e.g., -1 for "closed", nulls with business meaning, magic numbers in numeric fields, special strings in text fields) and their business implications. Refer to "Edge Case Documentation" in [Standards & Rules Reference](#9-0-standards--rules-reference) for scope and templates.
    *   **Business-Focused Data Type**: Consult the "Business-Focused Data Type Reference" and "Integer Data Type Guidelines" in [Standards & Rules Reference](#9-0-standards--rules-reference) for precise language when describing data types.
    *   **Length**: Adhere to "Description Length Limits" in [Quick References](#11-0-quick-references).

4.  **Preserve Original Code Integrity**: This is a critical rule [[memory:8705120]]. Do not modify or delete any existing JSDoc comments (`/** Original comment */`). Your sole responsibility is to add new or enhance existing `.describe()` annotations. Also, **never rename schema variables**; preserve original variable names exactly as provided in the original file.

6.  **Include Data Freshness Statement**: **CRITICAL**: Include the exact required data freshness statement in the **main output array schema's** `.describe()` annotation. Refer to the "Data Freshness Quick Reference" table in [Quick References](#11-0-quick-references) and "Data Freshness Documentation" in [Standards & Rules Reference](#9-0-standards--rules-reference) for the correct statement based on API type and proper placement.

**Output**: An updated `src/apis/[api-name]/working/outputSchemas.[agent-name].ts` file with comprehensive, business-focused descriptions for all output fields and schemas, and *no other changes* to the file.

# 6.0 Task 5: Endpoint Description Creation

Input: The `domain-analysis.[agent-name].md` file (from Task 2) and the `outputSchemas.[agent-name].ts` file (from Task 4).

Task: Create a JSON file containing clear, business-focused descriptions for each API endpoint. Ensure descriptions focus solely on the individual endpoint's purpose and value, *without* including any cross-references to other APIs or endpoints in this phase.

Output: A new `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json` file with comprehensive, individual endpoint descriptions.

**Required File**: `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json`

## 6.1 Instructions

1.  **Workflow Order**: Create this file **after** all input and output schema documentation (Tasks 3 and 4) is complete.
2.  **Create JSON Object**: Create a JSON object where keys are endpoint function names (e.g., `"GetBorderCrossingsAsJson"`) and values are their descriptions.
3.  **Focus on Individual Endpoint**: Focus solely on the individual endpoint's business purpose and value.
4.  **No Cross-References**: **CRITICAL**: Do NOT include any cross-references to other APIs or endpoints in this phase.
5.  **No Data Examples**: Do NOT include any specific data examples within the endpoint description.
6.  **Refer to Examples**: Refer to "Complete Endpoint Description Examples" in [Templates & Examples](#10-0-templates--examples) for guidance.
7.  **Adhere to Length Limits**: Ensure descriptions adhere to the "Endpoint descriptions" length limit (200-800 characters) in [Quick References](#11-0-quick-references).

**STOP** - Await approval before proceeding to Task 6.

## 6.2 Example

```json
{
  "GetBridgeClearancesAsJson": "Retrieves vertical clearance information for bridges on Washington State highways. Includes both standard and emergency clearance measurements for different bridge structures, helping commercial vehicles avoid height restrictions."
}
```

# 7.0 Task 6: Cross-Reference Integration

Input: The `domain-analysis.[agent-name].md` file (from Task 2) and the `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json` file (from Task 5).

Task: Enhance existing endpoint descriptions by identifying and integrating high-value cross-references to related APIs and endpoints, focusing on integrations that support sequential workflows, combine real-time data with context, or provide alternative scenarios.

Output: An updated `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json` file with comprehensive endpoint descriptions that include relevant cross-references.

**Required File**: Update `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json`

## 7.1 Instructions

1.  **Workflow Order**: This task should be performed **after** completing Task 5 (Endpoint Description Creation) to ensure that the base endpoint descriptions are finalized before adding cross-references.
2.  **Review Inputs**: Review your existing endpoint descriptions and the "Integration Opportunities" identified in your domain analysis.
3.  **Strategic Integration**: Add 2-4 high-value cross-references per endpoint, where appropriate. Focus on integrations that:
    *   Support **sequential workflows** (e.g., `getTravelTimes() → getAlerts() → getBorderCrossings()`).
    *   Combine **real-time data with explanatory context** (e.g., `getTrafficFlow() + getAlerts()`).
    *   Provide **alternative scenarios** when primary options are unavailable.
    Refer to the "Integration Discovery Stopping Criteria" in [Quick References](#11-0-quick-references) for detailed guidance on assessing integration value.
4.  **Natural Language Flow**: Ensure cross-references are naturally integrated into the description and clearly explain the benefit of using the referenced endpoint.
5.  **CRITICAL: Verify Endpoint Names**: Verify that referenced endpoint names are **exact matches** to project documentation (e.g., `api-name/functionName`).
6.  **Adhere to Length Limits**: Ensure descriptions, with integrated cross-references, adhere to the "Endpoint descriptions" length limit (200-800 characters) in [Quick References](#11-0-quick-references).

## 7.2 Example

```json
{
  "GetBorderCrossingsAsJson": "Retrieves current wait times for US-Canada border crossings in Washington State, especially critical during peak travel periods and holidays. Use with wsdot-traffic-flow/getTrafficFlow to check approach route conditions, or with wsdot-highway-alerts/getAlerts to identify border-related incidents affecting crossing times."
}
```

# 8.0 Editor Workflow: Synthesis & Optimization (The "Editing Process")

**This section describes the "editing process" for editors.** As with the updating process (Tasks 1-6), when assigned multiple APIs, complete the ENTIRE editing process for one API before starting the next. Do not compare all APIs' inputSchemas, then all outputSchemas—complete API A entirely, then API B entirely, etc.

**Input**: The agent's `src/apis/[api-name]/working/domain-analysis.[agent-name].md`, `src/apis/[api-name]/working/inputSchemas.[agent-name].ts`, `src/apis/[api-name]/working/outputSchemas.[agent-name].ts`, and `src/apis/[api-name]/working/endpointDescriptions.[agent-name].json` files.

**Task**: Compare and critique the agent's work for compliance with instructions, identify the strongest elements, and synthesize them into a single, optimized final output. This involves reviewing data verification, comparative analysis, synthesis, and a final quality check.

**Output**: Finalized `src/apis/[api-name]/editor/inputSchemas.final.ts`, `src/apis/[api-name]/editor/outputSchemas.final.ts`, and `src/apis/[api-name]/editor/endpointDescriptions.final.json` files that represent the best aspects of the agent's work and adhere to all documentation standards.

## 8.1 Editor Responsibilities

1.  **Initial Review & Data Verification**:
    *   Quickly review agent submissions for completeness and adherence to basic instructions.
    *   Fetch current API data (`npx fetch-dottie [api-name]:[endpoint]`) to verify agent examples against live data. Note any discrepancies.

2.  **Comparative Analysis & Best Element Identification**:
    *   For each field and endpoint, compare descriptions, examples, edge case explanations, and cross-references across all agent outputs.
    *   Identify the strongest, most business-focused, concise, and accurate elements from any agent.

3.  **Synthesis & Optimization**:
    *   Combine the identified "best elements" to create a single, unified, and high-quality set of documentation.
    *   Ensure all content meets character limits (refer to "Description Length Limits" in [Quick References](#11-0-quick-references)).
    *   Maintain a consistent voice and approach across all documentation.
    *   Verify canonical import paths (`@/apis/shared/schemaName.original` and `@/schemas/[api-name]/schemaName.zod`).
    *   Ensure data freshness statements are correctly placed and formatted.
    *   **Deliverables**: 
      - `src/apis/[api-name]/editor/inputSchemas.final.ts`
      - `src/apis/[api-name]/editor/outputSchemas.final.ts`
      - `src/apis/[api-name]/editor/endpointDescriptions.final.json`
      - `src/apis/[api-name]/editor/domain-analysis.final.md` (see Section 8.2)

4.  **Domain Analysis Synthesis** (see Section 8.2 below for detailed instructions):
    *   Synthesize the various `domain-analysis.[agent-name].md` files into a single `domain-analysis.final.md`
    *   This is an internal research document that captures the collective insights from all agents

5.  **Final Quality Check**:
    *   Perform a comprehensive review of the final documentation against the "Qualitative Success Criteria" in [Quick References](#11-0-quick-references).
    *   Check for any linting errors or TypeScript issues.
    *   Ensure file naming conventions and directory structures are correct.

## 8.2 Domain Analysis Synthesis

**Purpose**: The domain analysis files created by agents (Task 2) contain valuable research insights about each API's business purpose, edge cases, and integration opportunities. The editor must synthesize these into a single, comprehensive `domain-analysis.final.md` file.

**Important**: This is an **internal research document** used during the documentation process. It is NOT the final developer-facing documentation. (See Section 8.3 for guidance on creating public-facing API overviews.)

### 8.2.1 Synthesis Process

1. **Review All Agent Analyses**: Read through all `domain-analysis.[agent-name].md` files for the API
2. **Identify Best Insights**: For each section, identify the most accurate, comprehensive, and well-explained content
3. **Merge and De-duplicate**: Combine similar insights, removing redundancy while preserving unique details
4. **Verify Against Live Data**: Cross-check examples and edge cases against actual API responses
5. **Maintain Consistent Structure**: Use the standard domain analysis template (see below)

### 8.2.2 Standard Domain Analysis Structure

Use this structure for `domain-analysis.final.md`:

```markdown
# {API Name} - Domain Analysis (Final)

**Synthesized by Editor**  
**Date**: {Current Date}  
**API**: {api-name}

---

## 1. Business Purpose

{Concise paragraph explaining what this API does and why it exists}

### Core Problems Solved:
1. **{Problem Category}**: {Description}
2. **{Problem Category}**: {Description}
...

### Data Freshness Context:
- **Real-time data**: {Which endpoints}
- **Frequently updating**: {Which endpoints}
- **Infrequently updating**: {Which endpoints}

---

## 2. Target Users

### Primary Users:
- **{User Type}**: {What they need from this API}
...

### Secondary Users:
- **{User Type}**: {What they need from this API}
...

---

## 3. Key Business Concepts

{Define domain-specific terminology, entities, and relationships}

---

## 4. Data Patterns

{Document observed patterns in API responses: typical counts, common values, data structures}

---

## 5. Edge Cases & Special Values

{Document unusual values, null handling, edge cases with business meaning}

---

## 6. Integration Opportunities

### Intra-System Integration:
{Integrations with other APIs in the same system}

### Cross-System Integration:
{Integrations with other WSDOT/external APIs}

---

## 7. Domain-Specific Rules & Logic

{Business rules, operational constraints, caching rules, etc.}

---

## 8. Key Insights for Documentation

{Summary of critical points that informed the schema and endpoint descriptions}

---

**End of Domain Analysis**
```

### 8.2.3 Quality Guidelines for Synthesis

**Do:**
- ✅ Combine the best explanations from multiple agents
- ✅ Verify examples against live API data
- ✅ Include specific, concrete examples throughout
- ✅ Document business-critical edge cases
- ✅ Maintain clear section organization

**Don't:**
- ❌ Include meta-commentary about "observed data" or analysis methodology
- ❌ List agent names or attribute insights to specific agents (except in header)
- ❌ Include redundant or contradictory information
- ❌ Speculate about API behavior without verification
- ❌ Include information better suited for public API documentation

### 8.2.4 Output Location

Save the synthesized file as:
```
src/apis/[api-name]/editor/domain-analysis.final.md
```

## 8.3 API Overview Creation (Future/Optional)

**Note**: Creating public-facing API overview documents is OPTIONAL and should be done AFTER all other editing tasks are complete. This is a separate concern from the internal domain analysis.

**When to Create**: Only after you have deep understanding from synthesizing schemas, endpoint descriptions, and domain analysis.

**Proposed Structure** (for future implementation):
```markdown
# {API Name} - API Overview

## Quick Start
- What it does (one sentence)
- Primary use cases (3-5 bullets)
- Data freshness category
- Authentication requirements

## Core Concepts
- Primary entities and identifiers
- Key relationships
- Important terminology

## Common Workflows
1. Workflow Name: Endpoint sequence + purpose
2. Workflow Name: Endpoint sequence + purpose
3. Workflow Name: Endpoint sequence + purpose

## Critical Edge Cases
- Most important edge cases developers should know
- Special values and their meanings

## Integration Patterns
- Common cross-API integrations
- Sequential workflow examples
- Real-time + context combinations

## Best Practices
- Caching strategy
- Update frequency
- Error handling

## Quick Reference
- Endpoint count
- Base URL
- Rate limits
- Links to detailed documentation
```

**Output Location** (when implemented):
```
docs/apis/[api-name]-overview.md
```

**This section is informational only.** API Overview creation is not currently part of the editing process.

---

# 9.0 Standards & Rules Reference

## 9.1 Critical Code Modification Rules

### **NEVER DO THESE THINGS:**
- ❌ NEVER rename schema variables or change existing code structure
- ❌ NEVER add Zod methods (`.optional()`, `.nullable()`, etc.)
- ❌ NEVER modify import statements in original files
- ❌ NEVER change function signatures or export statements
- ❌ NEVER create agent-suffixed shared schema files
- ❌ **NEVER modify or delete existing JSDoc comments** - they are essential for comparison

### **ALWAYS DO THESE THINGS:**
- ✅ ALWAYS work in `/working/` subdirectories (agents) or main directory (editor final files)
- ✅ ALWAYS use canonical imports: `@/apis/shared/schemaName.original`
- ✅ ALWAYS add only `.describe()` annotations
- ✅ ALWAYS preserve existing JSDoc comments unchanged (/** Original comment */)
- ✅ ALWAYS use agent-suffixed file names: `outputSchemas.[agent-name].ts` or `outputSchemas.final.ts`

## 9.2 Field Description Guidelines

### **9.2.0 Core Principle: Avoid Stating the Obvious**

Before adding any sentence, apply the **"So What?" test**: 
- Would a competent developer or AI agent be **surprised** if you didn't tell them this?
- Does this sentence provide information that is **specific to WSF/WSDOT operations**?
- Does this explain **how the data type generally works** (bad) or **what's unique about this field** (good)?

If you're explaining generic data type behaviors (how IDs work, how coordinates work, how sort orders work), **remove the sentence**.

**Examples of what to AVOID:**
- ❌ "Used for display in schedules and applications" ← Obvious from field name/type
- ❌ "Essential for navigation and distance calculations" ← Obvious for latitude/longitude
- ❌ "Useful for determining freshness" ← Obvious for timestamp fields
- ❌ "Lower numbers appear first in sorted lists" ← Obvious for SortSeq
- ❌ "Enables identification and cross-referencing" ← Obvious for ID fields
- ❌ "Supports space-constrained UI elements" ← Obvious for abbreviations

**Examples of what to INCLUDE:**
- ✅ "Updates every 5 seconds" ← Specific operational detail
- ✅ "May be null or empty object '{}'" ← Specific edge case
- ✅ "Sidney B.C. returns 'BC' for British Columbia" ← Cross-border specific
- ✅ "Commuters track specific vessels for speed differences" ← Domain behavior
- ✅ "When true, check bulletins for explanation" ← Actionable WSF-specific guidance

### **9.2.1 Purpose**
- Explain the field's purpose in practical terms, focusing on how it helps users achieve a specific goal.
- Avoid generic descriptions like "This is a string."
- Describe how this field's data directly supports user decisions or actions.

### **9.2.2 Examples**
- Use specific, real-world examples that demonstrate the field's value.
- Include both typical and edge cases.
- Avoid overly complex or technical examples.

### **9.2.3 Edge Cases**
- Document unusual or unexpected values.
- Clarify the operational conditions or business logic that result in these unusual values.
- Explain the practical implications of these edge cases for users or downstream systems.

### **9.2.4 Context**

**When to add context:**
- Detail how different users or applications might interpret or utilize this field **in WSF-specific ways**
- Connect the field's data to specific steps or outcomes in a user's workflow **that are unique to ferry operations**
- Offer additional background about **WSF-specific operational details, edge cases, or cross-system behaviors**

**When NOT to add context ("The So What?" Test):**
Ask: "Would any developer be surprised if I didn't tell them this?"
- ❌ Don't explain what data types generically do (coordinates → navigation, timestamps → freshness, IDs → reference, abbreviations → compact display)
- ❌ Don't repeat information already clear from the field name and type
- ❌ Don't state obvious technical uses ("used for display", "enables filtering", "supports sorting")

**Examples of context to AVOID:**
- "Used for display in schedules and applications" ← Obvious
- "Essential for navigation and distance calculations" ← Obvious for coordinates
- "Useful for determining freshness" ← Obvious for timestamps
- "Lower numbers appear first in sorted lists" ← Obvious for SortSeq
- "Enables identification and cross-referencing" ← Obvious for IDs

**Examples of context to INCLUDE:**
- "Updates every 5 seconds" ← Specific operational detail
- "May be null or empty object '{}'" ← Specific edge case
- "Sidney B.C. returns 'BC' for British Columbia" ← Cross-border specific
- "Commuters track specific vessels for speed differences" ← Domain behavior
- "When true, check bulletins for explanation" ← Actionable WSF-specific guidance

### **9.2.5 ID Field Guidelines**

ID fields require special consideration to distinguish between primary keys, secondary keys, and linking IDs while avoiding obvious statements.

**For Primary Key IDs** (TerminalID, VesselID, RouteID, etc.):
Use concise, standard language. State it's a primary key, provide examples, then stop.

```typescript
// Template: "Primary key for [entities], as [type]. E.g., '[examples]'."

TerminalID: z.number().int().describe(
  "Primary key for WSF terminals, as an integer. E.g., '1' for Anacortes, '7' for Seattle, '14' for Mukilteo."
)

VesselID: z.number().int().describe(
  "Primary key for WSF vessels, as an integer. E.g., '17' for MV Kaleetan, '36' for MV Walla Walla."
)
```

**For Secondary/Internal IDs** (TerminalSubjectID, etc.):
Explain the specific WSF/WSDOT system that uses this ID and why it exists separately from the primary key.

```typescript
// Template: "[Specific system name] identifier, as [type]. E.g., '[examples]'. [What system uses it and why]."

TerminalSubjectID: z.number().int().describe(
  "WSF subject-based notification system identifier, as an integer. E.g., '111' for Anacortes, '101' for Seattle. Used for coordinating alerts and bulletins across WSF communication systems."
)
```

**For Linking/Reference IDs** (VesselID in departure context):
Explain what entity it references and optionally mention API cross-reference opportunities.

```typescript
// Template: "References [entity] for [purpose], as [type]. E.g., '[examples]'. [Optional: Links to other API]."

VesselID: z.number().int().describe(
  "References the vessel assigned to this departure, as an integer. E.g., '17' for MV Kaleetan. Links to wsf-vessels API for vessel specifications."
)
```

**What NOT to say for any ID:**
- ❌ "Used to identify [entity]" ← Obvious
- ❌ "Enables cross-referencing" ← Obvious (unless explaining specific API cross-reference)
- ❌ "Used for lookups" ← Obvious
- ❌ "Unique identifier for [entity]" ← Use "Primary key" instead for clarity

**Decision Tree:**
1. Is this the main ID used across WSF APIs? → "Primary key for [entities]"
2. Is this an alternative ID for internal systems? → Name the system and explain its purpose
3. Is this referencing another entity? → "References [entity]" and optionally mention API link
4. Provide 2-3 concrete examples with entity names
5. Stop there. Don't add obvious usage statements.

### **9.2.6 Parallel Language Requirements**

When multiple fields represent the **same concept in different formats** (e.g., measurements in different units, dates in different formats, same entity referenced in different contexts), use **parallel language** to maintain consistency and avoid confusion.

**The Pattern**: Use identical business purpose explanations and vary ONLY the format/context description.

**Common Scenarios Requiring Parallel Language:**

1. **Same Measurement, Different Units**
   ```typescript
   // Same concept: bridge clearance in two formats
   VerticalClearanceFeet: z.string().describe(
     "Bridge clearance in feet and inches format. E.g., '21 ft 6 in' for tall clearance, '14 ft 5 in' for low clearance."
   )
   
   VerticalClearanceInches: z.number().int().describe(
     "Bridge clearance in inches for calculations. E.g., '258' for 21 ft 6 in, '173' for 14 ft 5 in."
   )
   ```

2. **Same Entity, Different Representations**
   ```typescript
   // Same entity: terminal name in full and abbreviated forms
   TerminalName: z.string().describe(
     "The full name of the terminal. E.g., 'Anacortes', 'Seattle', 'Mukilteo'."
   )
   
   TerminalAbbrev: z.string().describe(
     "The abbreviated terminal code. E.g., 'ANA' for Anacortes, 'P52' for Seattle, 'MUK' for Mukilteo."
   )
   ```

3. **Same Timestamp, Different Formats**
   ```typescript
   // Same timestamp: bulletin update in two formats
   BulletinLastUpdated: zWsdotDate().nullable().describe(
     "Timestamp when bulletin was last updated, as a UTC date. E.g., '2024-09-28T14:42:03Z'. May be null when unavailable."
   )
   
   BulletinLastUpdatedSortable: z.string().nullable().describe(
     "Timestamp when bulletin was last updated, in sortable string format. E.g., '20240928144203' for Sept 28, 2024 at 14:42:03. For backwards compatibility."
   )
   ```

4. **Same ID, Different Contexts**
   ```typescript
   // VesselID appears in departure context
   VesselID: z.number().int().describe(
     "Primary key for WSF vessels. E.g., '17' for MV Kaleetan, '36' for MV Walla Walla."
   )
   
   // Same VesselID field in different schema - use same description
   VesselID: z.number().int().describe(
     "Primary key for WSF vessels. E.g., '17' for MV Kaleetan, '36' for MV Walla Walla."
   )
   ```

**What to Keep Parallel:**
- ✅ Business purpose (what the concept represents)
- ✅ Example structure and corresponding values
- ✅ Edge case patterns

**What to Vary:**
- ✅ Format specification ("in feet/inches format" vs. "in inches for calculations")
- ✅ Context notes ("for backwards compatibility", "for display", "for calculations")
- ✅ System-specific details when applicable

**What NOT to Do:**
- ❌ Give different business purposes to the same concept
- ❌ Use different examples that make them seem unrelated
- ❌ Repeat the entire API's purpose in both descriptions
- ❌ Add verbose explanations about obvious format differences

**Decision Process:**
1. **Identify the core concept**: What fundamental thing do these fields represent?
2. **Write the core purpose once**: Express what this concept means in business terms
3. **Note the format difference**: State how this particular field presents the concept
4. **Use corresponding examples**: Show the same data in each format
5. **Stop**: Don't add obvious usage statements about why different formats exist

## 9.3 Field Description Structure

```
[Purpose]. E.g., '[example]' for [context]. [Additional context if needed].
```

### **9.3.1 Context Distribution Strategy**

Different levels of documentation serve different purposes. Avoid repeating high-level context at the field level.

**Endpoint/Schema Level** (high-level context):
- Overall API purpose and business value
- Target users and primary use cases
- Dataset characteristics and cardinality ("typically returns 20 items")
- Data freshness statements ("Data is real-time")

**Field Level** (specific context):
- What makes THIS field unique or different
- Format-specific details ("in feet/inches format")
- Field-specific edge cases ("may be null when...")
- WSF-specific operational details

**Example - WRONG (repeating API purpose at field level):**
```typescript
TerminalName: z.string().describe(
  "The terminal name. E.g., 'Seattle'. Helps ferry passengers identify terminals for trip planning across the WSF system."
  // ❌ "Helps ferry passengers identify terminals" is obvious API-level context
)
```

**Example - CORRECT (field-specific detail only):**
```typescript
TerminalName: z.string().describe(
  "The full name of the terminal. E.g., 'Anacortes', 'Seattle', 'Mukilteo'."
  // ✅ Concise, focuses on what makes this field unique (full vs abbreviated)
)
```

**Rule of Thumb**: If a sentence applies equally to most/all fields in the schema, it belongs at the schema/endpoint level, not the field level.

## 9.4 Description Start Convention
- **Recommendation**: Begin descriptions with 'The' or 'An' to ensure a natural, fluid reading experience.
- **Deviation**: Use alternative phrasing only when a field's name is inherently descriptive, making an article redundant.

---

# 10.0 Templates & Examples

## 10.1 Complete Field Description Examples

### **10.1.1 Business Context Fields**
```typescript
// Route Information
RouteName: z.string().describe(
  "Highway or route designation for this traffic segment, as a string. E.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520, 'US-101' for US Highway 101."
)

// Wait Times with Edge Cases
WaitTime: z.number().int().describe(
  "Current wait time for border crossing, in minutes. E.g., '15' for normal traffic, '45' during peak hours. Returns '-1' when crossing is closed or data unavailable."
)

// Operational Status with Business States
ServiceStatus: z.string().describe(
  "Current operational status of ferry service. E.g., 'ON_TIME' for normal operations, 'DELAYED' for weather-related delays, 'CANCELLED' for emergency situations."
)
```

### **10.1.2 Technical Fields with Business Context**
```typescript
// Coordinates with Specific Geographic Context
Latitude: z.number().describe(
  "Latitude coordinate for camera location on I-90 corridor, as a decimal degree. E.g., '47.5902' for Snoqualmie Pass area, '47.6205' for Mercer Island segment."
)

// Timestamps with Update Frequency Context
LastUpdated: z.string().describe(
  "Timestamp when traffic data was last refreshed from roadway sensors, as a UTC date. E.g., '2024-01-15T14:30:00Z' for an afternoon update. Sensors update every 20 seconds during peak traffic."
)

// Primary Key Identifiers
VesselID: z.number().describe(
  "Primary key for WSF vessels, as an integer. E.g., '1' for MV Tacoma, '15' for MV Wenatchee."
)

// Secondary/Internal Identifiers
TerminalSubjectID: z.number().int().describe(
  "WSF subject-based notification system identifier, as an integer. E.g., '111' for Anacortes, '101' for Seattle. Used for coordinating alerts and bulletins across WSF communication systems."
)
```

## 10.2 Complete Endpoint Description Examples

### **10.2.1 Simple Endpoint (No Cross-References)**
```json
{
  "GetBridgeClearancesAsJson": "Retrieves vertical clearance information for bridges on Washington State highways. Assists commercial vehicle route planning by providing data to avoid height restrictions and ensure safe passage. Includes both standard and emergency clearance measurements for different bridge structures."
}
```

### **10.2.2 Complex Endpoint (With Cross-References)**
```json
{
  "GetBorderCrossingsAsJson": "Retrieves current wait times for US-Canada border crossings in Washington State. Provides notice of unexpected delays, especially during peak travel periods and holidays. Use with wsdot-traffic-flow/getTrafficFlow to check approach route conditions, or with wsdot-highway-alerts/getAlerts to identify border-related incidents affecting crossing times."
}
```

### **10.2.3 Real-Time Endpoint (With Integration Guidance)**
```json
{
  "GetVesselLocationsAsJson": "Provides real-time location and status data for Washington State Ferry vessels, especially critical during weather delays or service disruptions. Combine with wsf-schedule/getSchedules for planned vs actual departure times, or use with wsf-terminals/getTerminalConditions to understand dock availability and boarding status."
}
```

### **10.2.4 `wsdot-border-crossings` Editor Step Example**
```json
{
  "GetBorderCrossingsAsJson": "Retrieves current wait times for US-Canada border crossings in Washington State, covering crossings at I-5, SR-543, SR-539, and SR-9, especially critical during peak travel periods and holidays. The `BorderCrossings` class provides the `GetBorderCrossings` method to access this data, which returns an array of `BorderCrossingData` objects. Each `BorderCrossingData` object includes the `Time` (DateTime) of the reading, the `CrossingName` (string), the `BorderCrossingLocation` (RoadwayLocation) with detailed geographical context, and the `WaitTime` (int) in minutes. The data is real-time."
}
```

## 10.3 Schema Structure Examples

### **10.3.1 Input Schema Template**
```typescript
import { z } from "zod";

export const getBorderCrossingsInputSchema = z
  .object({
    AccessCode: z
      .string()
      .describe(
        "API access code for WSDOT Traveler Information API. Required for all requests. Obtain from WSDOT developer registration."
      ),
  })
  .describe(
    "Input parameters for retrieving border crossing wait times. Requires valid WSDOT API access code for authentication."
  );
```

### **10.3.2 Output Schema Template**
```typescript
import { z } from "zod";
import { roadwayLocationSchema } from "@/apis/shared/roadwayLocationSchema.original";

const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: roadwayLocationSchema.describe(
    "Location details for the border crossing point, as a roadway location object. Includes route designation and geographic context."
  ),
  WaitTime: z.number().describe(
    "Current wait time for vehicles crossing the border, in minutes. E.g., '15' for normal traffic, '45' during peak hours. Returns '-1' when crossing is closed."
  ),
  // ... other fields
});

export const borderCrossingDataListSchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Returns array of current border crossing wait times for US-Canada crossings in Washington State (typically returns 4-6 crossings). Data updates frequently."
  );
```

---

# 11.0 Quick References

## 11.1 Data Volume Management Quick Reference

| Command | Purpose | Usage |
|---------|---------|-------|
| `--limit 10` | **REQUIRED** for all data fetching | Always use to prevent overwhelming agent context windows |
| `--sample N` | Optional array sampling | Use only when you need specific array item counts |

**CRITICAL**: Always use `--limit 10` when fetching data. This truncates output to 10KB and may cut data mid-item. This is intentional for sampling purposes.

## 11.2 Data Freshness Quick Reference

| API Pattern | Statement | Placement |
|-------------|-----------|-----------|
| Real-time traffic, locations | `"Data is real-time."` | Main array schema |
| Frequent updates (traffic, weather) | `"Data updates frequently."` | Main array schema |
| Infrequent updates (schedules, infrastructure) | `"Data updates infrequently."` | Main array schema |

## 11.3 Edge Case Documentation Template

| Pattern | Template | Example |
|---------|----------|---------|
| Negative values | `"[Purpose]. E.g., '[normal]' for [condition], '[negative]' for [special condition]. [Business meaning]."` | `"Wait time in minutes. E.g., '15' for normal traffic, '-1' for closed crossing. Negative values indicate crossing unavailability."` |
| Null values | `"[Purpose]. E.g., '[normal]' when [condition], null when [special condition]. [Business meaning]."` | `"Route designation. E.g., 'I-5' for major highways, null for local roads. Null indicates non-highway infrastructure."` |
| Status codes | `"[Purpose]. E.g., '[code1]' for [state1], '[code2]' for [state2]. [Business context]."` | `"Service status. E.g., 'ACTIVE' for normal operations, 'MAINTENANCE' for repairs. Determines service availability."` |

## 11.4 Integration Discovery Stopping Criteria

| Integration Type | Include If | Skip If |
|------------------|------------|---------|
| Sequential workflows | Clear A→B→C progression | Requires >3 steps |
| Real-time + context | Current data + explanatory info | Different user bases |
| Alternative scenarios | Primary fails → backup option | Tenuous geographic connection |
| Static + dynamic | Infrastructure limits + current usage | Technical correlation only |

## 11.5 Agent Naming Convention

| File Type | Location | Format | Example |
|-----------|----------|--------|---------|
| Original input schemas | `src/apis/[api-name]/original/` | `inputSchemas.original.ts` | `inputSchemas.original.ts` |
| Original output schemas | `src/apis/[api-name]/original/` | `outputSchemas.original.ts` | `outputSchemas.original.ts` |
| Working domain analysis | `src/apis/[api-name]/working/` | `domain-analysis.[agent-name].md` | `domain-analysis.alice.md` |
| Working input schemas | `src/apis/[api-name]/working/` | `inputSchemas.[agent-name].ts` | `inputSchemas.bob.ts` |
| Working output schemas | `src/apis/[api-name]/working/` | `outputSchemas.[agent-name].ts` | `outputSchemas.charlie.ts` |
| Working endpoint descriptions | `src/apis/[api-name]/working/` | `endpointDescriptions.[agent-name].json` | `endpointDescriptions.alice.json` |
| Final input schemas (Editor) | `src/apis/[api-name]/editor/` | `inputSchemas.final.ts` | `inputSchemas.final.ts` |
| Final output schemas (Editor) | `src/apis/[api-name]/editor/` | `outputSchemas.final.ts` | `outputSchemas.final.ts` |
| Final endpoint descriptions (Editor) | `src/apis/[api-name]/editor/` | `endpointDescriptions.final.json` | `endpointDescriptions.final.json` |

## 11.6 Description Length Limits (ENFORCED)
- **Simple fields**: 50-150 characters (IDs, timestamps, coordinates)
- **Business fields**: 150-400 characters (most domain-specific fields)
- **Complex integration fields**: 400-600 characters (MAX - requires justification)
- **Endpoint descriptions**: 200-800 characters (as a single narrative string)

## 11.7 Example Decision Tree

**Before adding examples, apply this numbered checklist:**

1.  **Are these examples different CATEGORIES?** (Yes → Multiple examples)
    *   *Example: Route types: highway vs local roads*
2.  **Do they show different BUSINESS STATES?** (Yes → Multiple examples)
    *   *Example: Normal operation vs emergency closure*
3.  **Do they show FORMAT VARIATIONS?** (Yes → Multiple examples)
    *   *Example: '16 ft 1 in' vs '193' inches*
4.  **If all answers are NO** → Use ONE representative example
5.  **If any answer is YES** → Multiple examples add value

---

# 12.0 Troubleshooting Guide

## 12.1 Common Issues and Solutions

### **12.1.1 Data Fetching Problems**

#### **Issue**: `fetch-dottie` command fails
**Symptoms**: Command not found, network errors, empty responses
**Solutions**:
1.  **Verify command format**: Use exact function name from `docs/api-index.md`. Remember: WSDOT APIs use "get" prefix, WSF APIs do NOT.
2.  **Consult the API index**: Don't guess the function name - check `docs/api-index.md` for the exact function name and sample parameters.
3.  **Check network connection**: Ensure internet access.
4.  **Request assistance**: If persistent, stop work and request help.

#### **Issue**: Empty or minimal data returned
**Symptoms**: Very few records, missing expected fields.
**Solutions**:
1.  **Check API status**: Verify the source API is operational.
2.  **Try different parameters**: Some APIs may require specific access codes or query parameters.
3.  **Document limitations**: Note limited dataset in your domain analysis if data is consistently minimal.
4.  **Use available data**: Do not fabricate examples; work with the data that exists.

### **12.1.2 Schema Documentation Problems**

#### **Issue**: Import path errors
**Symptoms**: TypeScript errors (e.g., "Cannot find module"), inability to resolve import paths.
**Solutions**:
1.  **Use canonical paths**: Always use `@/apis/shared/schemaName.original` for shared schemas.
2.  **Check file existence**: Verify shared schema files actually exist at the specified path.
3.  **Avoid relative paths**: Never use `../` or `./` imports for shared schemas.

#### **Issue**: Description length violations
**Symptoms**: Descriptions exceeding character limits.
**Solutions**:
1.  **Apply length optimization**: Remove unnecessary qualifiers and redundant phrases.
2.  **Prioritize business value**: Focus on essential decision-making information.
3.  **Consolidate examples**: Remove redundant examples, ensuring each one shows a distinct category, business state, or format variation.

### **12.1.3 Content Quality Issues**

#### **Issue**: Inconsistent description quality
**Symptoms**: Some fields well-documented, others minimal or lacking context.
**Solutions**:
1.  **Apply 4-part structure**: Ensure each description follows the Purpose, Examples, Edge Cases, Context template.
2.  **Use MCP-optimized templates**: Refer to the "Standards & Rules Reference" for common field type templates.
3.  **Ensure full coverage**: Confirm all fields have business context and relevant details.

#### **Issue**: Poor business context
**Symptoms**: Descriptions are too technical, lacking real-world meaning or user value.
**Solutions**:
1.  **Focus on user value**: Explain *why* someone would use this information.
2.  **Add decision support**: Help users understand *when* and *how* to use the field or endpoint.
3.  **Include real-world examples**: Use actual scenarios and use cases.
4.  **Review domain analysis**: Revisit your domain analysis to reinforce business understanding.

---

## 12.2 Emergency Procedures

### **12.2.1 When to Stop Work and Request Help**
-   **Data fetching consistently fails** after trying multiple approaches.
-   **Business concepts remain unclear** after thorough research.
-   **Critical technical tools malfunction** preventing any further progress.
-   **Project requirements conflict** with established standards, creating an impasse.
-   **Quality standards cannot be met** within reasonable time constraints despite best efforts.

### **12.2.2 How to Request Assistance**
1.  **Document the problem**: Clearly describe what you tried, what failed, and the exact symptoms.
2.  **Provide context**: Include relevant error messages, file paths, and command outputs.
3.  **Specify urgency**: Indicate whether this blocks all progress or just specific tasks.
4.  **Suggest alternatives**: If possible, propose alternative approaches you considered.

### **12.2.3 Continuation Strategies**
-   **Work around blocked items**: Focus on unblocked tasks while awaiting assistance.
-   **Document assumptions**: Clearly note any assumptions made to continue work.
-   **Prepare for revision**: Be ready to revise work once issues are resolved.
-   **Maintain quality**: Do not compromise documentation standards to work around problems.

---

**End of Handbook**
