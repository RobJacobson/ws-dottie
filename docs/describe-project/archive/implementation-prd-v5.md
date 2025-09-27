# Product Requirements Document: API Documentation Enhancement (v5)

## Overview

This PRD provides comprehensive instructions for AI agents to enhance Zod schema annotations for WSDOT and WSF APIs. The approach emphasizes **business context understanding** and **plain English documentation** that serves both human developers and AI agents using Model Context Protocol (MCP) servers.

## 🎯 Mission Statement

Transform terse, generic API descriptions into rich, semantic documentation that explains business purpose, real-world meaning, and endpoint relationships. Create discoverable documentation that enables both human developers and AI agents to understand and effectively use Washington State transportation APIs.

## 👥 Agent Assignment Structure

### Independent Agent Approach
Each API can be assigned to **multiple agents** working completely independently:

#### Option 1: Two-Agent Model
- **Agent-Alice**: Complete independent work on entire API
- **Agent-Bob**: Complete independent work on entire API

#### Option 2: Three-Agent Model (For Complex APIs)
- **Agent-Alice**: Complete independent work on entire API
- **Agent-Bob**: Complete independent work on entire API
- **Agent-Charlie**: Complete independent work on entire API

#### Option 3: Single Agent Model
- **Full ownership**: One agent handles all components for simpler APIs
- **Self-review**: Agent reviews their own work using quality checklist

### Independent Work Process
1. **Complete Independence**: Each agent works on the full API without collaboration
2. **Full Scope**: Each agent handles all components (input schemas, output schemas, endpoint descriptions)
3. **Self-Contained**: Each agent's work is complete and functional independently
4. **No collaboration**: Agents do not compare or coordinate during development

## 📋 Pre-Implementation Checklist

Before beginning any documentation work, agents **MUST** complete all of the following steps. **Failure to complete any step is a blocking condition**.

### ✅ Step 1: Style Guide Review
- [ ] **Read completely** `docs/describe-project/unified-style-guide-v5.md`
- [ ] **Understand the plain English approach** and business context emphasis
- [ ] **Study the bottom-up workflow** (Research → Parameters → Schemas → Endpoints → Integration)
- [ ] **Review quality guidelines** and success criteria
- [ ] **Understand cross-reference timing** (Integration Phase)

### ✅ Step 2: PRD Review and Assignment Confirmation
- [ ] **Read this PRD** completely and understand your specific assignment
- [ ] **Confirm your assigned API and role** (input/output/endpoint descriptions)
- [ ] **Understand the scope** - you will work on ONE API independently
- [ ] **Clarify any questions** about the assignment before proceeding

### ✅ Step 3: Research Phase (Critical First Step)

#### 3.1 Domain Understanding
- [ ] **Study the official API documentation** provided by the user
- [ ] **Research the business domain** online (e.g., "WSDOT weather stations", "WSF vessels")
- [ ] **Understand real-world applications** and use cases
- [ ] **Identify key business concepts** and terminology
- [ ] **Create domain understanding report** (save as `src/apis/[api-folder]/domain-analysis.[agent].md`)

#### 3.2 Data Collection and Analysis
- [ ] **List all endpoints** in your assigned API
- [ ] **Fetch sample data** for each endpoint using `fetch-dottie` **WITHOUT PARAMETERS**:
      **`npx fetch-dottie [endpointname]`**
- [ ] **Document the data structure** and identify key patterns
- [ ] **Note any discrepancies** between expected and actual data
- [ ] **Extract verbatim examples** from actual API responses for use in annotations (no data transformation permitted)
 - [ ] **MANDATORY STOPPING CONDITION**: If you cannot fetch real data with `fetch-dottie`, you MUST stop all work and request assistance. Do NOT use curl, direct HTTP requests, or any other method to circumvent this requirement. Do NOT write or modify any related descriptions. This is a hard blocking condition with no exceptions.
 - [ ] **Canonical endpoint names**: Read the `id` fields in `src/clients/**` (format: `api:endpoint`) as the source of truth. Convert to `api/endpoint` when writing documentation and cross-references.
- [ ] **Identify relationships** between different endpoints and fields

**⚠️ CRITICAL: Use Default Parameters Only**
Default parameters are automatically applied by the client `sampleParams` in `src/clients/**`. Do not pass parameters manually. 

**🚨 MANDATORY STOPPING CONDITION**: If a no-parameter call fails to return data, you MUST stop all work and request assistance. Do NOT use curl, direct HTTP requests, or any other method to circumvent this requirement. This is a hard blocking condition with no exceptions.
```bash
# ✅ CORRECT - Use default parameters (no additional parameters)
npx fetch-dottie getBridgeClearancesByRoute
npx fetch-dottie getBorderCrossings
npx fetch-dottie getVesselBasics

# ❌ WRONG - Never pass parameters manually; rely on built-in defaults
npx fetch-dottie getBridgeClearancesByRoute --route "I-5" --date "2024-01-01"
```

#### 3.3 Business Context Analysis
- [ ] **Map endpoint relationships** - how do they work together?
- [ ] **Identify business workflows** - typical user journeys
- [ ] **Understand data dependencies** - what data is needed for what purposes?
- [ ] **Document domain insights** - non-obvious business concepts
- [ ] **Review related APIs** - check `docs/getting-started-cli.md` "📊 Available APIs" for integration opportunities
- [ ] **Identify cross-reference opportunities** - which other endpoints would enhance this data?
- [ ] **Create business context summary** for your own reference

## 🔧 Implementation Process

### Phase 1: Research and Domain Understanding (2-3 hours)
1. **Domain Research**: Study business context and real-world applications
2. **Data Collection**: Fetch and analyze actual API responses
3. **Relationship Mapping**: Understand how endpoints connect
4. **Business Context**: Document domain insights and workflows
5. **Endpoint Purpose Notes**: Capture high-level endpoint goals and target users as notes (do not write final descriptions yet)

### Phase 2: Parameter (Field) Documentation (2-3 hours)
1. **Individual Field Analysis**: Document each input/output field using a **flexible 1–3 sentence approach**
2. **Business Context**: Place business context or cross-references in a separate sentence (typically the second)
3. **Examples**: Use actual API data for realistic examples in parentheses
4. **Consistent Format**: Include a real example at the end of the first sentence for every field; use exact endpoint names in cross-references
5. **Quality Review**: Ensure natural language and clarity without compressing meaning
6. **Holistic Perspective**: While writing fields bottom-up, consider the endpoint's overall purpose captured in Research notes

#### Sentence Count Guidance  
- **Use 1–3 sentences per field**: 1 for obvious/simple fields; 2 when adding usage guidance or cross-references; up to 3 for complex or non-obvious fields  
- **Cross-reference placement**: Put cross-references in a separate sentence (typically the second) using "Use with" for sequential flows; reserve "Combine with" for true A+B→C. You may group multiple references in one final sentence with "or," or use multiple short final sentences—especially across API boundaries.  
- **Clarity over compression**: Do not shorten complex provider descriptions if it harms clarity; it is acceptable to match the source's length when needed  
- **❌ FORBIDDEN**: Embedding cross-references within a sentence (e.g., using "via" inline)
- **Example Format**:
  - **CRITICAL**: Use verbatim data from actual API responses. No data transformation is permitted.
  - **PRESERVE**: Original data formats (e.g., .NET dates, null values, exact strings)
  - **NO CONVERSION**: Do not convert dates, add spaces, or modify any values
  - **Anomalous values**: Include and explain anomalous values like -1, null, or special status codes (e.g., "(e.g., 'I5', 15, -1 for unavailable)")
  - **Nulls and sentinel values**: Include `null` in examples when applicable (e.g., "(e.g., 'I5', null for no location data)")
  - **Cross-references**: Use exact endpoint function names (e.g., `wsdot-traffic-flow/getTrafficFlow`)
- **Example**: "The vessel's unique identifier as an integer (e.g., 1). Use this to fetch detailed vessel information. Use with wsf-vessels/vesselBasicsById to get complete vessel data."

### Phase 3: Schema Documentation (1-2 hours)
1. **Schema-Level Descriptions**: Explain overall purpose and scope, explicitly state the top-level container type (array/object/map) and typical cardinality (singular/plural, approximate counts)
2. **Business Value**: Connect to real-world use cases
3. **Update Frequency**: Describe data freshness using defaults: WSDOT: "Data updates infrequently." WSF: "Data updates infrequently (use cacheFlushDate for the last-updated time)." Real-time feeds: "Real-time data (updates about every X seconds/minutes)."
4. **Consistency**: Ensure uniform tone and terminology
5. **Integration**: Prepare for cross-reference additions

### Phase 4: Endpoint Documentation (1-2 hours)
1. **Business Purpose**: High-level endpoint descriptions (write these only after field and schema work). Do not include data examples at the endpoint level; examples are limited to fields.
2. **Use Case Focus**: When and why to use each endpoint
3. **Target Audience**: Clear guidance for developers and AI agents
4. **Plain English**: Conversational, accessible language
5. **Synthesis**: Combine insights from all phases
6. **Endpoint Cross-References**: Add endpoint-level cross-references only in the Integration Phase as final sentence(s), following the same format/verb rules as field cross-references

### Phase 5: Integration and Cross-References (1-2 hours)
1. **Cross-Endpoint Relationships**: Add specific endpoint connections strictly in this phase
2. **Workflow Guidance**: Show how endpoints work together using separate cross-reference sentences
3. **Placement Rule**: Place cross-references at the end of the description—preferably as the final sentence or appended to the final sentence
4. **Final Review**: Ensure comprehensive understanding with consistent format
5. **Quality Assurance**: Complete final checklist

#### Integration Approach
- **Timing enforcement**: Do not add cross-references during earlier phases; add them only during Integration
- **Add cross-references**: Use a separate sentence appended at the end of the description (or appended clause) for integrations
- **Ensure consistency**: Respect the flexible 1–3 sentence guidance; cross-refs should be the final sentence when present
- **Validate format**: Cross-references should not be embedded mid-sentence; prefer "Use with" for sequential flows, "Combine with" for true A+B→C
- **⚠️ CRITICAL: Verify API Names**: Cross-references must use exact endpoint function names not generic names

#### Cross-Reference Discovery
When identifying potential cross-references to other APIs, use this systematic approach:

1. **Review API Index**: Check `docs/getting-started-cli.md` "📊 Available APIs" section to understand related endpoints
2. **Identify Integration Opportunities**: Look for APIs that could enhance your current data:
   - **Traffic Flow**: `wsdot-traffic-flow/getTrafficFlow` for traffic conditions
   - **Travel Times**: `wsdot-travel-times/getTravelTimes` for journey calculations
   - **Highway Alerts**: `wsdot-highway-alerts/getAlerts` for travel disruption information
   - **Bridge Clearances**: `wsdot-bridge-clearances/getBridgeClearances` for vehicle restrictions
   - **Vessel Information**: `wsf-vessels/vesselBasicsById`, `wsf-vessels/vesselAccommodations`
   - **Terminal Information**: `wsf-terminals/terminalBasicsById`
3. **Use Specific Format**: `[api-name]/[endpoint-name]` for all cross-references (derived from `id` in `src/clients/**` which uses `api:endpoint`)

#### Cross-Reference Validation Checklist  
- [ ] **Use exact function names**: `wsdot-traffic-flow/getTrafficFlow` not `wsdot-traffic-flow/flowData`  
- [ ] **Common correct patterns verified**:
  - ✅ `wsdot-traffic-flow/getTrafficFlow`
  - ✅ `wsdot-travel-times/getTravelTimes`
  - ✅ `wsdot-highway-alerts/getAlerts`
  - ✅ `wsf-vessels/vesselBasicsById`
  - ✅ `wsf-terminals/terminalBasicsById`
- [ ] **Sentence count matches complexity (1–3)**; cross-references, when present, appear as a separate final sentence
- [ ] **Format requirement checked**: Cross-references use "Use with" for sequential flows, "Combine with" only for true A+B→C, in a separate final sentence (no embedded "via" formats)
- [ ] **Cross-references actionable**: Specific, workable endpoint combinations

## 📊 Quality Assurance Framework

### Self-Review Checklist

#### Business Context Quality
- [ ] **Domain Understanding**: Clear grasp of business purpose and real-world applications
- [ ] **Plain English**: Natural, conversational language throughout
- [ ] **Appropriate Detail**: Right level of explanation for field complexity
- [ ] **Real Examples**: Actual API data used for examples
- [ ] **Business Value**: Clear explanation of why and how to use data

#### Technical Quality
- [ ] **Complete Coverage**: All fields documented with enhanced descriptions
- [ ] **Consistent Format**: Uniform patterns for similar field types
- [ ] **Cross-References**: Specific endpoint relationships included
- [ ] **Data Accuracy**: Examples match actual API responses
- [ ] **Integration**: Clear workflow and relationship guidance

#### Readability Quality
- [ ] **Natural Language**: Reads like normal conversation
- [ ] **Active Voice**: Declarative statements, not passive constructions
- [ ] **Appropriate Length**: 1-2 sentences for simple, 2-3 for complex
- [ ] **Clear Examples**: Realistic values that aid understanding
- [ ] **No Jargon**: Technical terms explained in plain English

 

## 📁 File Structure and Deliverables

### Complete File Deliverables

Each independent agent is responsible for **all files** in their assigned API, using agent-specific naming:

#### Complete API Coverage with Agent Naming
- **Input Schemas**: `src/apis/[api-name]/inputSchemas.[agent].ts`
- **Output Schemas**: `src/apis/[api-name]/outputSchemas.[agent].ts`
- **Endpoint Descriptions**: `src/apis/[api-name]/endpointDescriptions.[agent].json`

#### Agent File Naming Convention
When you are assigned a name (like "Alice", "Bob", "Charlie"), append it to your filenames:
- **Agent Alice**: `*.alice.ts`, `*.alice.json`
- **Agent Bob**: `*.bob.ts`, `*.bob.json`
- **Agent Charlie**: `*.charlie.ts`, `*.charlie.json`

#### Editing Rule
- **Only edit agent-suffixed files**: Do not modify canonical unsuffixed files (e.g., `inputSchemas.ts`, `outputSchemas.ts`, `endpointDescriptions.json`). Your deliverables must be agent-suffixed to avoid conflicts and preserve independence.

#### Independent Work Scope
- **Full API Ownership**: Each agent handles the complete API independently
- **All Components**: Input schemas, output schemas, and endpoint descriptions
- **Self-Contained**: Each agent's work is complete and functional on its own
- **No Collaboration**: Agents do not coordinate or review each other's work during development
- **Unique File Names**: Use agent-specific naming to avoid conflicts with other agents

### Deliverable Files with Agent Naming
```typescript
// Example structure for inputSchemas.[agent].ts
export const [endpointName]InputSchema = z.object({
  // Input field using two-sentence approach
  ParameterField: z.string().describe(
    "A [parameter type] as [data type] for [purpose] (e.g., [example]). Use this with [api]/[endpoint] to [specific action]."
  ),
}).describe("Input parameters to [action] [entity] [criteria] (none required).");

// Note: Fill in the cross-reference sentence during the Integration Phase; leave it blank in earlier phases.

// Example structure for outputSchemas.[agent].ts  
export const [endpointName]OutputSchema = z.object({
  // Output field using two-sentence approach
  IdentifierField: z.number().describe(
    "The [entity]'s [field purpose] as [data type] (e.g., [example]). Use this with [api]/[endpoint] to [specific action]."
  ),
}).describe("Returns [entity type] including [key data] for [use case]. [Business context]. [Data freshness].");

// Note: Fill in the cross-reference sentence during the Integration Phase; leave it blank in earlier phases.

// Example structure for endpointDescriptions.[agent].json
{
  "endpointName": "[Action] [entity type] for [primary use case]. [Business context and target users]."
}
```

### File Naming Examples
```bash
# For Agent Alice working on wsdot-border-crossings:
src/apis/wsdot-border-crossings/inputSchemas.alice.ts
src/apis/wsdot-border-crossings/outputSchemas.alice.ts  
src/apis/wsdot-border-crossings/endpointDescriptions.alice.json

# For Agent Bob working on the same API:
src/apis/wsdot-border-crossings/inputSchemas.bob.ts
src/apis/wsdot-border-crossings/outputSchemas.bob.ts
src/apis/wsdot-border-crossings/endpointDescriptions.bob.json
```

### Supporting Files
- `src/apis/[api-folder]/domain-analysis.[agent].md`: Business context and domain understanding
- `src/apis/[api-folder]/business-workflows.[agent].md`: Endpoint relationships and user journeys
- `src/apis/[api-folder]/work-notes.[agent].md`: Your research notes and decision rationale (optional)

## 🚨 Critical Success Criteria

### Must-Have Requirements (Blocking)
- [ ] **All research phases completed** before any documentation work
- [ ] **Real API data fetched and analyzed** for every endpoint using `fetch-dottie` only (no curl or direct HTTP requests)
- [ ] **Domain research completed** with business context documented
- [ ] **Plain English throughout** - no technical jargon without explanation
- [ ] **Business context included** in all descriptions
- [ ] **Cross-references added** during Integration Phase

### Quality Requirements (Blocking)
- [ ] **Appropriate detail level** - brief for obvious, detailed for complex
- [ ] **Real-world examples** from actual API data
- [ ] **Real-world examples** from actual API data (no placeholders; fetch failures are blocking; no curl workarounds)
- [ ] **Natural language** that reads like conversation
- [ ] **Specific cross-references** - actionable endpoint connections
- [ ] **Business value explained** - why and how to use each endpoint
- [ ] **Integration complete** - clear workflow and relationship guidance

### Consistency Requirements (Blocking)
- [ ] **Uniform terminology** throughout the API
- [ ] **Consistent patterns** for similar field types
- [ ] **Proper cross-reference format** (`[api]/[endpoint]`)
- [ ] **Examples in parentheses** at end of first sentence for every field
- [ ] **Active voice** throughout all descriptions

## 📊 Success Metrics

### Quantitative Metrics
- **100% field coverage** - Every field has enhanced, business-context descriptions
- **Real examples provided** - All examples from actual API data
- **Cross-references included** - All related endpoints documented with specific guidance
- **Plain English compliance** - Natural, conversational language throughout
- **Business context coverage** - All descriptions explain real-world meaning

### Qualitative Metrics
- **Discoverability** - Both humans and AI agents can easily find and understand endpoints
- **Business clarity** - Clear explanation of purpose and real-world applications
- **Workflow integration** - Clear guidance on how endpoints work together
- **Natural readability** - Descriptions flow naturally when read aloud
- **Practical value** - Actionable guidance for real-world usage

## 🚫 What NOT to Do

### Prohibited Actions
- **Never skip research phases** - domain understanding is critical
- **Never edit canonical unsuffixed files** - create or edit only agent-suffixed files
- **Never proceed without real data** - if `fetch-dottie` fails, ask for help and do not write related descriptions
- **Never use curl or direct HTTP requests** - if `fetch-dottie` fails, this is a mandatory stopping condition with no workarounds
- **Never use technical jargon** without plain English explanation
- **Never write generic descriptions** like "A string value" or "An identifier"
- **Never make assumptions** about business logic without research
 - **Never proceed with unresolved questions** - ask for clarification before continuing
- **Never use passive voice** - use active, declarative statements
- **Never add cross-references too early** - wait for Integration Phase

### Common Mistakes to Avoid
- **Missing business context** - explain real-world meaning and purpose
- **Over-engineering simple fields** - be brief when purpose is obvious
- **Generic cross-references** - provide specific, actionable guidance
- **Technical language** - use plain English throughout
- **Missing domain research** - understand the business before writing
- **Inconsistent terminology** - use uniform terms throughout the API

## 🔄 Iteration and Feedback

### User Review Process
1. **Submit completed work** with research documentation and cross-review reports
2. **Address any feedback** from user review with specific improvements
3. **Make necessary corrections** based on feedback and domain insights
4. **Final validation** before completion

### Style Guide Improvements
- **Propose updates** if any guidelines are unclear or could be improved
- **Suggest enhancements** based on implementation experience
- **Document patterns** that work well for specific domain types
- **Share insights** about domain-specific challenges and solutions

## 📞 Support and Escalation

### When to Ask for Help
- **Unable to fetch data** using `fetch-dottie` CLI
- **Unclear business logic** after research
- **Conflicting information** between docs and data
- **Ambiguous domain concepts** that need clarification
- **Technical issues** with schema modifications
 

### How to Ask for Help
1. **Be specific** about the issue and context
2. **Provide what you've researched** and found
3. **Include your understanding** and where you're stuck
4. **Suggest potential solutions** if you have ideas
5. **Ask focused questions** rather than general ones

## 🎉 Completion Criteria

Your independent implementation is complete when:
- [ ] **All research phases completed** with domain understanding documented
- [ ] **Complete API enhanced** with rich, business-context annotations
- [ ] **All components finished** - input schemas, output schemas, and endpoint descriptions
- [ ] **Cross-references added** during Integration Phase
- [ ] **All success criteria met** with quality checklist completed
- [ ] **Plain English throughout** - natural, conversational language
- [ ] **Business context included** - real-world meaning and purpose
- [ ] **Integration complete** - clear workflow and relationship guidance
- [ ] **Self-contained work** - complete and functional independently
- [ ] **User review completed** and feedback addressed
- [ ] **No blocking issues remain**

## 📚 Reference Materials

### Essential Documents
- `docs/describe-project/unified-style-guide-v5.md` - Primary implementation guide
- `docs/describe-project/implementation-prd-v5.md` - This document
- `docs/getting-started-cli.md` - CLI usage guide and full API index

### Cross-Reference Discovery Resources
- **Complete API Index**: `docs/getting-started-cli.md` section "📊 Available APIs"
- **Common Integration Patterns**: See Cross-Reference Guidelines in Style Guide
- **Research Phase Task**: Review section 3.3 for related API discovery checklist

### Domain Resources
- Official API documentation (provided by user)
- Web search results for domain-specific context
- Actual API data samples (fetched via CLI)
- Business context research and analysis

### Reference Resources
 - Integration phase guidelines
 - Quality assurance framework

---

**Remember:** Business context first, plain English throughout, and natural integration. Take the time to understand the domain, research real-world applications, and create documentation that truly serves both human developers and AI agents through rich, discoverable descriptions with clear business context.
