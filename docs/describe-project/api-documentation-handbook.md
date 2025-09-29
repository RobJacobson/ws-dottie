# API Documentation Handbook
*Complete guide for agents and editors working on Washington State transportation API documentation*

---

## 📋 Table of Contents

### **For Agents: Individual API Work**
- [1. Project Mission & Overview](#1-project-mission--overview)
- [2. Phase 1: Research Workflow](#2-phase-1-research-workflow) *(1-2 hours)*
- [3. Phase 2: Writing Workflow](#3-phase-2-writing-workflow) *(2-5 hours)*  
- [4. Phase 3: Integration Workflow](#4-phase-3-integration-workflow) *(1-2 hours)*

### **For Editors: Multi-Agent Synthesis**
- [5. Editor Synthesis Workflows](#5-editor-synthesis-workflows) *(3-8 hours)*
- [6. Quality Assessment Framework](#6-quality-assessment-framework)
- [7. Final Integration & Deployment](#7-final-integration--deployment)

### **Reference Materials**
- [8. Standards & Rules Reference](#8-standards--rules-reference)
- [9. Templates & Examples](#9-templates--examples)
- [10. Quick Reference Tables](#10-quick-reference-tables)
- [11. Troubleshooting Guide](#11-troubleshooting-guide)

---

# 1. Project Mission & Overview

## Project Mission

Transform terse, generic API descriptions into rich, semantic documentation that explains business purpose, real-world meaning, and endpoint relationships. Create discoverable documentation that enables both human developers and AI agents to understand and effectively use Washington State transportation APIs.

## Target Audience: Dual Purpose Documentation

### Human Developers
- Need clear business context and real-world applications
- Require integration examples and cross-API workflows
- Benefit from concise, actionable guidance

### AI Agents via Model Context Protocol (MCP)
- **Semantic Discovery**: Rich descriptions enable AI agents to understand when and how to use endpoints
- **Context Efficiency**: Concise but complete descriptions fit within AI context windows
- **Integration Intelligence**: Cross-references help AI agents chain API calls for complex workflows
- **Business Logic**: Edge cases and business rules prevent AI agents from making incorrect assumptions

### Documentation Strategy
- **Business-first explanations** serve both audiences
- **Semantic richness** enables AI discovery without overwhelming humans
- **Structured cross-references** guide both human integration and AI workflow planning
- **Edge case documentation** prevents both human errors and AI hallucinations

## Work Models

### Agent Work Model: Siloed Independence
- Agents work independently unless specifically instructed otherwise
- No coordination or collaboration between agents during development
- Agents may be asked to compare/critique work after completion
- Each agent creates complete, standalone API documentation

### Editor Work Model: Synthesis & Optimization
- Editors receive completed work from multiple agents
- Compare, evaluate, and synthesize best elements from all agents
- Optimize for length, clarity, and technical excellence
- Ensure consistency across the entire project
- Make final integration decisions

## Success Criteria

### For All Work
- 100% field coverage with enhanced descriptions
- Real examples from actual API data
- Cross-references to related endpoints
- Natural, readable language
- Clear business value explanation

### Agent-Specific
- **Individual excellence**: Each agent produces complete, high-quality documentation
- **Consistency**: Following templates and standards precisely
- **Business focus**: Prioritizing decision-making value over technical details

### Editor-Specific
- **Superior synthesis**: Combining best elements while maintaining conciseness
- **Length optimization**: Meeting all character limits while maximizing value
- **Technical perfection**: Flawless schema structure and import paths
- **Cross-project consistency**: Unified voice and approach across all APIs

---

# 2. Phase 1: Research Workflow

**Duration**: 1-2 hours (Simple APIs) to 3-4 hours (Complex APIs)
**Objective**: Understand business domain, gather sample data, identify patterns

## Essential Steps

### Step 1: Endpoint Discovery
```bash
# Discover available endpoints
list_dir src/clients/[api-name]/
```

Read each client file to understand:
- Function names and parameters
- Available endpoints
- Input/output structure

### Step 2: Data Fetching

**CRITICAL COMMAND FORMATS:**
```bash
✅ CORRECT: npx fetch-dottie getBorderCrossings --limit 500
✅ CORRECT: npx fetch-dottie getVesselBasics --limit 500

❌ WRONG: npx fetch-dottie GetBorderCrossings --limit 500
❌ WRONG: npx fetch-dottie api/getBorderCrossings --limit 500
❌ WRONG: npx fetch-dottie border-crossings --limit 500
```

**Command Discovery Process:**
1. Look at client file exports: `export const getBorderCrossings = ...`
2. Use the exact function name: `getBorderCrossings`
3. Always include `--limit 500` for context management

### Step 3: Domain Analysis Creation

**Required File**: `src/apis/[api-name]/working/domain-analysis.[agent-name].md`

**Required Sections:**
1. **Business Purpose** - What real-world problem does this solve?
2. **Target Users** - Who uses this data and why?
3. **Key Business Concepts** - Domain-specific terminology
4. **Data Patterns** - What you observe in the sample data
5. **Edge Cases** - Unusual values and their business meaning
6. **Integration Opportunities** - Potential connections to other APIs

### Step 4: Data Freshness Validation

**Priority Order for Data Freshness Research:**
1. **Source API documentation** (WSDOT/WSF official docs)
2. **API response patterns** (timestamps, update frequencies)
3. **Business logic** (real-time vs scheduled vs static data)
4. **Domain knowledge** (traffic vs ferry schedules vs infrastructure)

## Context Management

**For typical APIs (2-5 endpoints)**: Context management is usually unnecessary
**For large APIs (15+ endpoints)**: 
- Work in batches of 2-3 related endpoints
- Complete research phase for batch before moving to next
- Summarize key findings between batches

## Duration Guidelines

**Complexity-Based Timing:**
- **Simple APIs** (1-2 endpoints, basic data): 1-1.5 hours
- **Medium APIs** (2-3 endpoints, moderate complexity): 2-3 hours  
- **Complex APIs** (3+ endpoints, rich domain): 3-4 hours

---

# 3. Phase 2: Writing Workflow

**Duration**: 2-5 hours depending on API complexity
**Objective**: Create enhanced documentation for input/output schemas and endpoint descriptions

**🚨 CRITICAL: NO cross-references are added in this phase. Cross-references are ONLY added in Phase 3.**

## Phase Deliverables
- **MUST:** Enhanced input schemas with business context
- **MUST:** Enhanced output schemas with business context  
- **MUST:** Endpoint descriptions with business purpose (NO cross-references)
- All examples using literal API data

**CRITICAL REMINDER: NO cross-references in any Phase 2 deliverables. All cross-references are added in Phase 3 only.**

## Required Files

### 1. Input Schemas: `inputSchemas.[agent-name].ts`
- Add `.describe()` annotations to all input fields
- Focus on parameter purpose and business context
- Use canonical imports: `@/apis/shared/schemaName.original`

### 2. Output Schemas: `outputSchemas.[agent-name].ts`
- Add `.describe()` annotations to all output fields
- **REQUIRED**: Data freshness statement in main array schema
- Document edge cases with business meaning
- Use canonical imports: `@/apis/shared/schemaName.original`

### 3. Endpoint Descriptions: `endpointDescriptions.[agent-name].json`
- Business purpose descriptions in JSON format
- NO cross-references (wait for Phase 3)
- Focus on individual endpoint value

## Required: Data Freshness Statement

**CRITICAL:** Data freshness statement MUST be included in the **main output array schema** `.describe()` annotation using these exact patterns:

| API Type | Required Statement |
|----------|-------------------|
| Border crossings | `"Data updates frequently."` |
| Bridge clearances | `"Data updates infrequently."` |
| Ferry schedules | `"Data updates infrequently."` |
| Ferry locations | `"Data is real-time."` |
| Traffic flow | `"Data updates frequently."` |
| Weather stations | `"Data updates frequently."` |

### Exact Placement Examples:

**✅ CORRECT - In main array schema:**
```typescript
export const borderCrossingDataListSchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Returns array of border crossing wait time data... Data updates frequently."
  );
```

**❌ WRONG - In individual field descriptions:**
```typescript
WaitTime: z.number().describe("Wait time in minutes. Data updates frequently.")
```

## Critical Workflow Rule

**⚠️ If you find yourself wanting to mention other APIs or endpoints during Phase 2, STOP. Note the integration opportunity for Phase 3 instead.**

**Phase 2 Focus**: Individual field meanings, business context, edge cases, data freshness
**Phase 3 Focus**: Cross-API integrations, workflow connections, alternative scenarios

## Writing Standards

### Field Description Structure (Business-Focused Format)

**CRITICAL FORMAT REQUIREMENT:** Each description must start with business purpose, conclude the first sentence with a comma and business-focused data type specification, then provide examples and context.

**Template Structure:** `"[Business purpose], as [business-focused data type]. E.g., '[example]' for [context]. [Additional context if needed]."`

**Required Elements:**
1. **Business Purpose** - What this field represents in real-world terms
2. **Data Type Specification** - Business-focused data type (not just JSON type)
3. **Examples** - Concrete values using single quotes with context
4. **Edge Cases** - Unusual values and their business meaning (when relevant)

### **Factual Accuracy Requirements**

**CRITICAL:** Never speculate about specific reasons for edge cases or unusual values. Document what the data shows, not what you assume it means.

**✅ CORRECT - Document observable behavior:**
```typescript
WaitTime: z.number().describe(
  "Current wait time for the border crossing, in minutes. E.g., '15' for normal traffic. Returns '-1' when the lane is closed or data is unavailable."
)
```

**❌ WRONG - Speculative assumptions:**
```typescript
WaitTime: z.number().describe(
  "Returns '-1' when crossing is closed for maintenance, emergencies, or weather."
)
```

**Guidelines for Edge Case Documentation:**
- **Document the pattern**: What value indicates what state
- **Avoid specific reasons**: Don't guess why the system returns that value
- **Use inclusive language**: "when closed or unavailable" vs "when closed for maintenance"
- **Base on data observation**: Only document patterns you actually see in the data


### Business-Focused Data Type Reference

| Schema Type | Business Data Type | Usage |
|-------------|-------------------|-------|
| `z.string()` | `as a string` | Text identifiers, descriptions |
| `z.number()` | `as a number` | Measurements, counts |
| `z.number().int()` | `in [units]` | **PREFERRED**: Concrete values with units (e.g., "in minutes", "in feet") |
| `z.number().int()` | `as an integer` | **FALLBACK**: Abstract counts, IDs without units |
| `z.boolean()` | `as a boolean flag` | True/false operational states |
| `zWsdotDate()` | `as a UTC date` | Timestamps, dates |
| `roadwayLocationSchema` | `as a roadway location object` | Geographic locations |
| `z.number()` (coordinates) | `in decimal degrees` | Latitude/longitude |
| `z.enum([...])` | `as a status code` | Predefined states |
| Monetary amounts | `in dollars` | Currency values |
| Time durations | `in minutes` | Time measurements |
| Physical measurements | `in [specific units]` | Distances, clearances |

**Integer Data Type Guidelines:**
- **PREFER**: `"in [units]"` for concrete values (wait times, distances, counts with meaning)
- **USE**: `"as an integer"` only for abstract counts or IDs without business units
- **EXAMPLES**: 
  - ✅ `"Wait time in minutes"` (concrete business value)
  - ✅ `"Height clearance in feet"` (concrete measurement)
  - ✅ `"Count of available lanes"` (concrete count)
  - ❌ `"as an integer"` for wait times, distances, or other measured values

### Description Length Limits (ENFORCED)
- **Simple fields**: 50-150 characters (IDs, timestamps, coordinates)
- **Business fields**: 150-400 characters (most domain-specific fields)
- **Complex integration fields**: 400-600 characters (MAX - requires justification)
- **Endpoint descriptions**: 200-800 characters (as a single narrative string)

### Example Decision Tree

**Before adding examples, apply this numbered checklist:**

1. **Are these examples different CATEGORIES?** (Yes → Multiple examples)
   - *Example: Route types: highway vs local roads*
2. **Do they show different BUSINESS STATES?** (Yes → Multiple examples)  
   - *Example: Normal operation vs emergency closure*
3. **Do they show FORMAT VARIATIONS?** (Yes → Multiple examples)
   - *Example: '16 ft 1 in' vs '193' inches*
4. **If all answers are NO** → Use ONE representative example
5. **If any answer is YES** → Multiple examples add value

---

# 4. Phase 3: Integration Workflow

**Duration**: 1-2 hours
**Objective**: Add cross-references and perform final quality review

## Phase Deliverables
- **Enhanced endpoint descriptions** with cross-references
- **Final quality review** using success criteria
- **Complete API documentation** ready for deployment

## Integration Discovery Process

### Step 1: Cross-API Data Analysis
Review data from other APIs to identify integration opportunities:
- **Geographic overlaps** (same routes, locations, regions)
- **Temporal relationships** (schedules, real-time updates, delays)
- **Functional workflows** (route planning, alternative finding)
- **Data enrichment** (static info + dynamic conditions)

### Step 2: Integration Value Assessment

**HIGH VALUE integrations (Always Include):**
- **Sequential workflows**: `getTravelTimes() → getAlerts() → getBorderCrossings()`
- **Real-time + explanatory**: `getTrafficFlow() + getAlerts()` (current conditions + why)
- **Static + dynamic combinations**: `getBridgeClearances() + getTrafficFlow()` (limits + usage)
- **Alternative route planning**: Primary route blocked → alternative options

**MEDIUM VALUE integrations (Include if Space):**
- **Backup scenarios**: Ferry delays → road alternatives via `getTravelTimes()`
- **Related planning**: `getVesselSchedules() + getBorderCrossings()` (different transport modes)
- **Complementary timing**: Schedule data + real-time status updates

**LOW VALUE integrations (Usually Skip):**
- **Multi-step chains**: A → B → C → D (too complex for practical use)
- **Different user bases**: Commercial trucking + recreational boating
- **Tenuous geographic connections**: APIs covering different regions with minimal overlap

### Step 3: Cross-Reference Integration

**Add cross-references ONLY to `endpointDescriptions.[agent-name].json` files**

**Format:**
```json
{
  "GetBorderCrossingsAsJson": "Retrieves current wait times for US-Canada border crossings in Washington State. Essential for international travel planning, especially during peak travel periods and holidays. Use with wsdot-traffic-flow/getTrafficFlow to check approach route conditions, or with wsdot-highway-alerts/getAlerts to identify border-related incidents affecting crossing times."
}
```

**Stopping Criteria:**
- **Maximum 2-4 cross-references** per endpoint
- **Focus on highest value integrations** first
- **Stop when reaching diminishing returns**

### Step 4: Final Quality Review

Apply the qualitative success criteria checklist:
- [ ] Business context clearly explained
- [ ] Edge cases documented with real-world meaning
- [ ] Examples use actual API data
- [ ] Cross-references are actionable and specific
- [ ] Length limits respected
- [ ] Data freshness statements included

---

# 5. Editor Synthesis Workflows

**Duration**: 3-8 hours depending on number of agents and API complexity
**Objective**: Synthesize multiple agent outputs into optimal final documentation

## Editor Responsibilities

### Primary Goals
1. **Quality Assessment**: Evaluate all agent outputs against standards
2. **Best Element Synthesis**: Combine superior descriptions from multiple agents
3. **Length Optimization**: Ensure all content meets character limits
4. **Consistency Enforcement**: Maintain unified voice and approach
5. **Technical Excellence**: Perfect schema structure and import paths

### Work Model
- **Receive completed work** from multiple independent agents
- **No agent coordination** - work with whatever agents produced
- **Objective evaluation** using established criteria
- **Synthesis decisions** based on quality, not agent preference

## Multi-Agent Comparison Methodology

### Step 1: Initial Quality Assessment

**CRITICAL FIRST STEP: Data Verification**
- [ ] **Fetch current API data** using `npx fetch-dottie [endpoint] --limit 500`
- [ ] **Verify agent examples** are current and accurate against live data
- [ ] **Identify new patterns** or edge cases not covered by agents
- [ ] **Note discrepancies** for synthesis decisions
- [ ] **Document data insights** that inform synthesis choices

**For each agent's work, evaluate:**

#### **Schema Quality (40% weight)**
- **Field coverage**: Are all fields documented?
- **Business context**: Do descriptions explain real-world purpose?
- **Edge case documentation**: Are unusual values explained?
- **Example quality**: Are examples from actual data and well-chosen?
- **Length management**: Do descriptions fit within limits while maximizing value?

#### **Technical Compliance (30% weight)**
- **Import paths**: Correct canonical imports used?
- **Code structure**: Only `.describe()` annotations added?
- **File organization**: Proper naming and directory structure?
- **Data freshness**: Correctly placed and formatted?

#### **Cross-Reference Quality (20% weight)**
- **Integration value**: Are cross-references high-value and actionable?
- **Accuracy**: Do endpoint names and descriptions match project documentation?
- **Natural integration**: Do cross-references flow naturally in descriptions?
- **Appropriate scope**: 2-4 cross-references maximum per endpoint?

#### **Domain Understanding (10% weight)**
- **Business insight**: Does agent demonstrate understanding of domain?
- **User perspective**: Are descriptions written for actual users?
- **Real-world application**: Do descriptions connect to practical use cases?

### Step 2: Comparative Analysis Framework

**Create comparison matrix:**

| Aspect | Agent A | Agent B | Agent C | Best Choice | Rationale |
|--------|---------|---------|---------|-------------|-----------|
| Field X Description | Score/Notes | Score/Notes | Score/Notes | Winner | Why |
| Cross-references | Score/Notes | Score/Notes | Score/Notes | Winner | Why |
| Edge Case Coverage | Score/Notes | Score/Notes | Score/Notes | Winner | Why |

**Scoring System:**
- **Excellent (4)**: Exceeds standards, superior quality
- **Good (3)**: Meets all standards, solid quality
- **Adequate (2)**: Meets minimum requirements
- **Needs Improvement (1)**: Below standards, requires fixes

### Step 3: Synthesis Decision Trees

#### **Field Description Synthesis**

**Decision Process:**
1. **Identify best overall description** (highest score)
2. **Check for superior elements** in other versions:
   - Better examples from another agent?
   - Superior edge case explanation?
   - More concise business context?
3. **Synthesize hybrid** if multiple agents contribute value
4. **Optimize length** while preserving best elements

**Example Synthesis:**
```typescript
// Agent A: Great business context, too long
WaitTime: z.number().describe(
  "Current wait time in minutes for vehicles crossing the US-Canada border. Critical for international travel planning, especially during peak periods like holidays and weekends. E.g., '15' for normal traffic, '45' during peak hours, '120' during major holidays. Returns '-1' when crossing is closed for maintenance or emergencies."
)

// Agent B: Good edge cases, weak context  
WaitTime: z.number().describe(
  "Wait time in minutes. E.g., '15', '45'. Returns '-1' when closed."
)

// Editor Synthesis: Best of both, optimized length
WaitTime: z.number().describe(
  "Current wait time in minutes for border crossing. Essential for international travel planning. E.g., '15' for normal traffic, '45' during peak hours. Returns '-1' when crossing is closed for maintenance."
)
```

#### **Cross-Reference Synthesis**

**Decision Process:**
1. **Collect all cross-references** from all agents
2. **Apply integration value assessment** (High/Medium/Low)
3. **Select top 2-4 highest value integrations**
4. **Optimize language** for natural flow
5. **Verify endpoint accuracy** against project documentation

#### **Length Optimization Strategies**

**When descriptions exceed limits:**

1. **Prioritize business value** over technical details
2. **Consolidate similar examples** (remove redundant cases)
3. **Streamline edge case explanations** (focus on most important)
4. **Optimize word choice** (remove unnecessary qualifiers)
5. **Maintain core meaning** while reducing length

**Optimization Techniques:**
```typescript
// Before (180 chars): 
"Current wait time in minutes for vehicles crossing the border. This is essential information for travel planning. E.g., '15' for normal conditions."

// After (120 chars):
"Current wait time in minutes for border crossing. Essential for travel planning. E.g., '15' for normal traffic."
```

## Quality Assessment Framework

### Synthesis Quality Checklist

#### **Content Excellence**
- [ ] **Best elements preserved**: Superior descriptions from any agent retained
- [ ] **Business context optimized**: Clear real-world purpose and value
- [ ] **Edge cases comprehensive**: All important unusual values documented
- [ ] **Examples representative**: Using actual API data, showing key variations
- [ ] **Length optimized**: Maximum value within character limits

#### **Technical Excellence**  
- [ ] **Import paths canonical**: All imports use `@/apis/shared/` format
- [ ] **Code structure preserved**: Only `.describe()` annotations added
- [ ] **Data freshness correct**: Proper placement and exact required statements
- [ ] **File organization perfect**: Proper naming, directory structure

#### **Integration Excellence**
- [ ] **Cross-references high-value**: Focus on most actionable integrations
- [ ] **Endpoint accuracy verified**: All references match project documentation
- [ ] **Natural language flow**: Cross-references integrate smoothly
- [ ] **Appropriate scope**: 2-4 maximum per endpoint

#### **Consistency Excellence**
- [ ] **Unified voice**: Consistent tone and approach across all descriptions
- [ ] **Parallel language**: Similar fields described with consistent patterns
- [ ] **Standard compliance**: All descriptions follow established templates
- [ ] **Quality uniformity**: No significant quality variations between sections

### Editor Success Metrics

**Quantitative Measures:**
- **Coverage**: 100% of fields have enhanced descriptions
- **Length compliance**: 0% of descriptions exceed character limits
- **Cross-reference accuracy**: 100% of endpoint references are correct
- **Technical compliance**: 100% of files follow structure requirements

**Qualitative Measures:**
- **Synthesis value**: Final output superior to any individual agent
- **Business clarity**: Descriptions clearly explain real-world purpose
- **User utility**: Documentation enables effective API usage
- **Integration intelligence**: Cross-references provide actionable guidance

---

# 6. Quality Assessment Framework

## Evaluation Criteria for All Work

### Content Quality Standards

#### **Business Context (Weight: 35%)**
- **Purpose clarity**: Does the description explain what this field/endpoint does in real-world terms?
- **User value**: Is it clear why someone would use this information?
- **Decision support**: Does the description help users make informed choices?
- **Domain accuracy**: Are business concepts correctly explained?

**Excellent (4)**: Clear business purpose, obvious user value, supports decision-making
**Good (3)**: Business purpose evident, user value clear, adequate decision support  
**Adequate (2)**: Basic business context present, minimal user guidance
**Poor (1)**: Technical description only, no business context

#### **Example Quality (Weight: 25%)**
- **Real data usage**: Are examples from actual API responses?
- **Representative coverage**: Do examples show key variations/categories?
- **Format consistency**: Single quotes, proper formatting?
- **Decision tree compliance**: Multiple examples only when showing different categories/states/formats?

**Excellent (4)**: Perfect real data examples, optimal coverage, follows decision tree
**Good (3)**: Good real data examples, adequate coverage, mostly follows guidelines
**Adequate (2)**: Some real examples, basic coverage, minor guideline issues
**Poor (1)**: Generic examples, poor coverage, ignores guidelines

#### **Edge Case Documentation (Weight: 20%)**
- **Business meaning**: Are unusual values explained in real-world terms?
- **Systematic coverage**: Are important edge cases identified and documented?
- **Scope appropriateness**: Focus on business-critical vs technical edge cases?

**Excellent (4)**: Comprehensive business-focused edge case coverage
**Good (3)**: Good coverage of important edge cases with business context
**Adequate (2)**: Basic edge case coverage, some business context
**Poor (1)**: Minimal edge case coverage, no business context

#### **Length Management (Weight: 20%)**
- **Character limits**: Does content fit within specified limits?
- **Value density**: Maximum information value per character?
- **Conciseness**: No unnecessary words while maintaining clarity?

**Excellent (4)**: Optimal length, maximum value density, perfectly concise
**Good (3)**: Within limits, good value density, mostly concise
**Adequate (2)**: Within limits, adequate value, some wordiness
**Poor (1)**: Exceeds limits or very poor value density

### Technical Compliance Standards

#### **Code Structure (Weight: 40%)**
- **Modification scope**: Only `.describe()` annotations added?
- **Import paths**: Canonical `@/apis/shared/` paths used?
- **File organization**: Proper naming and directory structure?

#### **Data Freshness (Weight: 30%)**
- **Placement accuracy**: In main output array schema only?
- **Statement correctness**: Exact required statements used?
- **Format compliance**: Proper integration into description?

#### **Cross-Reference Accuracy (Weight: 30%)**
- **Endpoint names**: Exact matches to project documentation?
- **Integration value**: High-value, actionable connections?
- **Scope compliance**: 2-4 maximum per endpoint?

### Integration Quality Standards

#### **Cross-Reference Value Assessment**
- **Sequential workflows**: Do references support logical API call chains?
- **Real-time + context**: Do references combine current data with explanatory information?
- **Alternative scenarios**: Do references provide backup options when primary fails?
- **User workflow support**: Do references match actual user needs?

#### **Natural Language Integration**
- **Flow**: Do cross-references integrate smoothly into descriptions?
- **Actionability**: Are references specific enough to act upon?
- **Clarity**: Is the integration purpose obvious to users?

## Qualitative Success Criteria

### For Individual Descriptions
1. **Business Purpose Test**: Can a developer understand the real-world purpose within 10 seconds?
2. **Example Utility Test**: Do examples help developers understand expected values and formats?
3. **Edge Case Preparedness Test**: Will developers be prepared for unusual values they encounter?
4. **Decision Support Test**: Does the description help developers decide when/how to use this field?

### For Cross-References
1. **Actionability Test**: Can a developer immediately understand what to do with the referenced endpoint?
2. **Value Test**: Does the integration provide clear benefit over using endpoints separately?
3. **Workflow Test**: Do the references support realistic user workflows?
4. **Discoverability Test**: Would developers naturally think to use these endpoints together?

### For Overall API Documentation
1. **Completeness Test**: Can developers understand the full API capability from the documentation?
2. **Integration Intelligence Test**: Do cross-references reveal the API's role in larger workflows?
3. **Business Context Test**: Do developers understand the real-world problems this API solves?
4. **User Experience Test**: Is the documentation pleasant and efficient to use?

---

# 7. Final Integration & Deployment

## Editor Final Steps

### Pre-Deployment Checklist

#### **File Structure Verification**
- [ ] Agent files in correct `/working/` subdirectories with `[agent-name]` suffixes
- [ ] **Editor final files in main API directory** with `.final` suffixes (e.g., `outputSchemas.final.ts`)
- [ ] No modifications to original schema files
- [ ] Canonical import paths throughout

#### **Content Completeness**
- [ ] 100% field coverage with `.describe()` annotations
- [ ] All required data freshness statements present
- [ ] Cross-references in endpoint descriptions only
- [ ] All examples use actual API data with single quotes

#### **Quality Standards Met**
- [ ] All descriptions within character limits
- [ ] Business context clear in all descriptions
- [ ] Edge cases documented with business meaning
- [ ] Cross-references actionable and specific (2-4 max per endpoint)

#### **Technical Excellence**
- [ ] No linting errors in any files
- [ ] Proper TypeScript syntax throughout
- [ ] Import statements correct and functional
- [ ] File naming conventions followed

### Deployment Process

#### **Step 1: Final Quality Review**
Run comprehensive quality check using assessment framework:
- Content quality scoring
- Technical compliance verification
- Integration value assessment
- Overall coherence evaluation

#### **Step 2: Documentation Package**
Prepare final deliverables in main API directory:
- `inputSchemas.final.ts` - Enhanced input schemas ready for integration
- `outputSchemas.final.ts` - Enhanced output schemas ready for integration  
- `endpointDescriptions.final.json` - Endpoint descriptions ready for MCP deployment
- `synthesis-report.final.md` - Quality assessment and synthesis decisions (in `/working/` for reference)

#### **Step 3: Integration Recommendations**
Provide guidance for final integration:
- Priority order for schema integration
- Cross-reference implementation strategy
- MCP server configuration recommendations
- Human documentation generation approach

---

# 8. Standards & Rules Reference

## Critical Code Modification Rules

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

## Import Path Rules

### **Import Path Decision Tree:**

**1. For shared schemas (roadwayLocationSchema, zWsdotDate, etc.):**
- ✅ **ALWAYS use**: `@/apis/shared/schemaName.original`
- ❌ **NEVER use**: `../shared/schemaName.original` (relative paths)

**2. For API-specific schemas:**
- ✅ **Use**: `@/schemas/[api-name]/schemaName.zod`
- ❌ **NEVER use**: `./schemaName` or `../otherApi/schemaName`

**3. Quick Check:**
- Does path start with `@/`? ✅ Correct canonical format
- Does path start with `../` or `./`? ❌ Wrong relative format

## Field Description Guidelines

### **4-Part Structure Template:**
1. **Purpose** - What this field represents in business terms
2. **Examples** - Concrete values from actual API data (single quotes)
3. **Edge Cases** - Unusual values and their business meaning
4. **Context** - Additional business context when helpful

### **MCP-Optimized Templates for Common Field Types:**

#### **Geographic Coordinates**
```typescript
Latitude: z.number().describe(
  "Latitude for [specific location context], in decimal degrees. E.g., '47.6062' for Seattle area, '48.7519' for Bellingham region. Enables precise location mapping and route calculation."
)
```

#### **Timestamps**
```typescript
LastUpdated: z.string().describe(
  "Timestamp when data was last refreshed, as a UTC date. E.g., '2024-01-15T14:30:00Z' for afternoon update. Critical for determining data currency and reliability."
)
```

#### **Status Fields**
```typescript
Status: z.string().describe(
  "Operational status of [entity], as a [string or integer]. E.g., 'ACTIVE' for normal operations, 'MAINTENANCE' for scheduled repairs, 'CLOSED' for emergency situations. Determines service availability."
)
```

#### **Identifiers**
```typescript
LocationID: z.number().describe(
  "Unique identifier for [entity type], as a [string or number]. E.g., '1001' for I-5 corridor, '2005' for SR-20 segment. Used for cross-referencing with other transportation data."
)
```

#### **Concrete Integer Values**
```typescript
WaitTime: z.number().int().describe(
  "Current wait time for [specific context], in minutes. E.g., '15' for normal traffic, '45' for peak periods. Returns '-1' when service unavailable."
)

HeightClearance: z.number().int().describe(
  "Vertical clearance for [structure type], in feet. E.g., '14' for standard bridge, '16' for high-clearance overpass. Critical for commercial vehicle route planning."
)

LaneCount: z.number().int().describe(
  "Number of available lanes for [specific purpose]. E.g., '2' for general purpose, '1' for HOV lane. Indicates current capacity and traffic flow options."
)
```

## Edge Case Documentation

### **Edge Case Documentation Scope:**

**ALWAYS DOCUMENT (High Priority):**
- **Negative values** with business meaning (e.g., -1 = closed, -999 = error)
- **Null values** that indicate shared infrastructure or unavailable data
- **Special status codes** (0 = inactive, 999 = unknown)
- **Format variations** users need to understand (feet vs inches)

**DOCUMENT IF BUSINESS-CRITICAL (Medium Priority):**
- **Empty strings** vs null distinctions when they have different meanings
- **Boundary values** (0, maximum limits) when they indicate special states
- **Timestamp patterns** (null = never updated, specific dates = last maintenance)

**USUALLY SKIP (Low Priority):**
- **Technical null values** with no business impact
- **Standard database patterns** (auto-increment IDs, GUIDs)
- **Implementation details** that don't affect user decisions

### **Edge Case Template:**
```
"[Normal purpose]. E.g., '[normal example]' for [normal condition], '[edge example]' for [edge condition]. [Business meaning of edge case]."
```

## Data Freshness Documentation

### **REQUIRED PLACEMENT: Output schema .describe() annotations**

**Priority Order for Data Freshness Statements:**
1. **Source API documentation** (WSDOT/WSF official statements)
2. **API response analysis** (timestamp patterns, update frequencies)
3. **Business logic** (real-time vs scheduled vs static data types)
4. **Domain knowledge** (traffic patterns vs infrastructure data)

### **Required Statements by API Type:**

| API Type | Required Statement |
|----------|-------------------|
| Border crossings | `"Data updates frequently."` |
| Bridge clearances | `"Data updates infrequently."` |
| Ferry schedules | `"Data updates infrequently."` |
| Ferry locations | `"Data is real-time."` |
| Traffic flow | `"Data updates frequently."` |
| Weather stations | `"Data updates frequently."` |
| Highway alerts | `"Data updates frequently."` |
| Travel times | `"Data updates frequently."` |
| Mountain pass conditions | `"Data updates frequently."` |
| Toll rates | `"Data updates infrequently."` |

---

# 9. Templates & Examples

## Complete Field Description Examples

### **Business Context Fields**
```typescript
// Route Information
RouteName: z.string().describe(
  "Highway or route designation for this traffic segment, as a string. E.g., 'I-5' for Interstate 5, 'SR-520' for State Route 520, 'US-101' for US Highway 101. Essential for route planning and navigation systems."
)

// Wait Times  
WaitTime: z.number().int().describe(
  "Current wait time for border crossing, in minutes. Essential for international travel planning, especially during peak periods and holidays. E.g., '15' for normal traffic, '45' during peak hours. Returns '-1' when crossing is closed for maintenance or emergencies."
)

// Operational Status
ServiceStatus: z.string().describe(
  "Current operational status of ferry service. Critical for travel planning and schedule reliability. E.g., 'ON_TIME' for normal operations, 'DELAYED' for weather-related delays, 'CANCELLED' for emergency situations. Affects departure and arrival planning."
)
```

### **Technical Fields with Business Context**
```typescript
// Coordinates with Location Context
Latitude: z.number().describe(
  "Latitude coordinate for camera location on I-90 corridor. E.g., '47.5902' for Snoqualmie Pass area, '47.6205' for Mercer Island segment. Enables precise traffic monitoring and incident location identification."
)

// Timestamps with Business Meaning
LastUpdated: z.string().describe(
  "Timestamp when traffic data was last refreshed from roadway sensors. E.g., '2024-01-15T14:30:00Z' for afternoon update. Critical for determining data currency during rapidly changing traffic conditions."
)

// Identifiers with Cross-Reference Value
VesselID: z.number().describe(
  "Unique identifier for WSF vessel in the fleet. E.g., '1' for MV Tacoma, '15' for MV Wenatchee. Used for tracking vessel location, schedule adherence, and maintenance status across multiple ferry endpoints."
)
```

## Complete Endpoint Description Examples

### **Simple Endpoint (No Cross-References)**
```json
{
  "GetBridgeClearancesAsJson": "Retrieves vertical clearance information for bridges on Washington State highways. Essential for commercial vehicle route planning to avoid height restrictions and ensure safe passage. Includes both standard and emergency clearance measurements for different bridge structures."
}
```

### **Complex Endpoint (With Cross-References)**
```json
{
  "GetBorderCrossingsAsJson": "Retrieves current wait times for US-Canada border crossings in Washington State. Essential for international travel planning, especially during peak travel periods and holidays. Use with wsdot-traffic-flow/getTrafficFlow to check approach route conditions, or with wsdot-highway-alerts/getAlerts to identify border-related incidents affecting crossing times."
}
```

### **Real-Time Endpoint (With Integration Guidance)**
```json
{
  "GetVesselLocationsAsJson": "Provides real-time location and status data for Washington State Ferry vessels. Critical for passenger planning and schedule verification, especially during weather delays or service disruptions. Combine with wsf-schedule/getSchedules for planned vs actual departure times, or use with wsf-terminals/getTerminalConditions to understand dock availability and boarding status."
}
```

## Schema Structure Examples

### **Input Schema Template**
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

### **Output Schema Template**
```typescript
import { z } from "zod";
import { roadwayLocationSchema } from "@/apis/shared/roadwayLocationSchema.original";

const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: roadwayLocationSchema.describe(
    "Location details for the border crossing point. Includes route designation and geographic context for precise identification."
  ),
  WaitTime: z.number().describe(
    "Current wait time in minutes for vehicles crossing the border. Essential for travel planning. E.g., '15' for normal traffic, '45' during peak hours. Returns '-1' when crossing is closed."
  ),
  // ... other fields
});

export const borderCrossingDataListSchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Returns array of current border crossing wait times for US-Canada crossings in Washington State. Essential for international travel planning and route optimization. Data updates frequently."
  );
```

---

# 10. Quick Reference Tables

## Data Freshness Quick Reference

| API Pattern | Statement | Placement |
|-------------|-----------|-----------|
| Real-time traffic, locations | `"Data is real-time."` | Main array schema |
| Frequent updates (traffic, weather) | `"Data updates frequently."` | Main array schema |
| Infrequent updates (schedules, infrastructure) | `"Data updates infrequently."` | Main array schema |

## Edge Case Documentation Template

| Pattern | Template | Example |
|---------|----------|---------|
| Negative values | `"[Purpose]. E.g., '[normal]' for [condition], '[negative]' for [special condition]. [Business meaning]."` | `"Wait time in minutes. E.g., '15' for normal traffic, '-1' for closed crossing. Negative values indicate crossing unavailability."` |
| Null values | `"[Purpose]. E.g., '[normal]' when [condition], null when [special condition]. [Business meaning]."` | `"Route designation. E.g., 'I-5' for major highways, null for local roads. Null indicates non-highway infrastructure."` |
| Status codes | `"[Purpose]. E.g., '[code1]' for [state1], '[code2]' for [state2]. [Business context]."` | `"Service status. E.g., 'ACTIVE' for normal operations, 'MAINTENANCE' for repairs. Determines service availability."` |

## Integration Discovery Stopping Criteria

| Integration Type | Include If | Skip If |
|------------------|------------|---------|
| Sequential workflows | Clear A→B→C progression | Requires >3 steps |
| Real-time + context | Current data + explanatory info | Different user bases |
| Alternative scenarios | Primary fails → backup option | Tenuous geographic connection |
| Static + dynamic | Infrastructure limits + current usage | Technical correlation only |

## Agent Naming Convention

| File Type | Format | Example |
|-----------|--------|---------|
| Domain analysis | `domain-analysis.[agent-name].md` | `domain-analysis.alice.md` |
| Input schemas | `inputSchemas.[agent-name].ts` | `inputSchemas.bob.ts` |
| Output schemas | `outputSchemas.[agent-name].ts` | `outputSchemas.charlie.ts` |
| Endpoint descriptions | `endpointDescriptions.[agent-name].json` | `endpointDescriptions.alice.json` |

## Context Management Thresholds

| API Size | Context Strategy | Batch Size |
|----------|------------------|------------|
| Small (2-5 endpoints) | No special management needed | Process all together |
| Medium (6-10 endpoints) | Light batching recommended | 3-4 endpoints per batch |
| Large (11+ endpoints) | Required context management | 2-3 endpoints per batch |

---

# 11. Troubleshooting Guide

## Common Issues and Solutions

### **Data Fetching Problems**

#### **Issue**: `fetch-dottie` command fails
**Symptoms**: Command not found, network errors, empty responses
**Solutions**:
1. **Verify command format**: Use exact function name from client files
2. **Check network connection**: Ensure internet access
3. **Try different limit**: Use `--limit 100` or `--limit 50` for testing
4. **Request assistance**: Stop work and escalate if persistent

#### **Issue**: Empty or minimal data returned
**Symptoms**: Very few records, missing expected fields
**Solutions**:
1. **Check API status**: Verify source API is operational
2. **Try different parameters**: Some APIs require specific access codes
3. **Document limitations**: Note limited dataset in domain analysis
4. **Use available data**: Don't fabricate examples, work with what exists

### **Schema Documentation Problems**

#### **Issue**: Import path errors
**Symptoms**: TypeScript errors, cannot resolve modules
**Solutions**:
1. **Use canonical paths**: Always `@/apis/shared/schemaName.original`
2. **Check file existence**: Verify shared schema files exist
3. **Avoid relative paths**: Never use `../` or `./` imports
4. **Follow decision tree**: Use import path decision tree in standards

#### **Issue**: Description length violations
**Symptoms**: Descriptions too long, exceeding character limits
**Solutions**:
1. **Apply length optimization**: Remove unnecessary qualifiers
2. **Prioritize business value**: Focus on decision-making information
3. **Consolidate examples**: Remove redundant cases
4. **Use decision tree**: Apply example decision tree for multiple examples

### **Cross-Reference Problems**

#### **Issue**: Endpoint names don't match
**Symptoms**: References to non-existent endpoints
**Solutions**:
1. **Verify endpoint names**: Check project documentation for exact names
2. **Use canonical format**: `api-name/functionName` format
3. **Check client files**: Confirm function names in client implementations
4. **Test references**: Ensure referenced endpoints actually exist

#### **Issue**: Too many cross-references
**Symptoms**: Endpoint descriptions becoming too long
**Solutions**:
1. **Apply stopping criteria**: Maximum 2-4 per endpoint
2. **Prioritize high-value**: Focus on sequential workflows and real-time+context
3. **Remove low-value**: Skip tenuous connections and multi-step chains
4. **Optimize language**: Make references more concise

### **Quality Issues**

#### **Issue**: Inconsistent description quality
**Symptoms**: Some fields well-documented, others minimal
**Solutions**:
1. **Apply 4-part structure**: Purpose, examples, edge cases, context
2. **Use templates**: Follow MCP-optimized templates for common field types
3. **Check coverage**: Ensure all fields have business context
4. **Review systematically**: Use quality assessment framework

#### **Issue**: Poor business context
**Symptoms**: Technical descriptions without real-world meaning
**Solutions**:
1. **Focus on user value**: Explain why someone would use this information
2. **Add decision support**: Help users understand when/how to use fields
3. **Include real-world examples**: Use actual scenarios and use cases
4. **Review domain analysis**: Ensure business understanding is correct

### **Editor-Specific Issues**

#### **Issue**: Conflicting agent outputs
**Symptoms**: Agents produced very different approaches
**Solutions**:
1. **Use comparison matrix**: Systematically evaluate each approach
2. **Apply scoring system**: Use objective criteria for evaluation
3. **Synthesize best elements**: Combine superior aspects from multiple agents
4. **Maintain consistency**: Ensure final output has unified voice

#### **Issue**: Length optimization challenges
**Symptoms**: Cannot fit quality content within character limits
**Solutions**:
1. **Prioritize business value**: Remove technical details first
2. **Optimize word choice**: Use more concise language
3. **Consolidate examples**: Remove redundant cases
4. **Maintain core meaning**: Don't sacrifice essential information

### **Technical Problems**

#### **Issue**: Linting errors in generated files
**Symptoms**: TypeScript or formatting errors
**Solutions**:
1. **Check syntax**: Ensure proper TypeScript syntax in `.describe()` calls
2. **Verify imports**: Confirm all import statements are correct
3. **Run linter**: Use project linting tools to identify issues
4. **Fix systematically**: Address errors one by one

#### **Issue**: File organization problems
**Symptoms**: Files in wrong directories, incorrect naming
**Solutions**:
1. **Follow structure**: All files in `/working/` subdirectories
2. **Use correct naming**: `[filename].[agent-name].[extension]` format
3. **Check permissions**: Ensure write access to target directories
4. **Verify paths**: Confirm directory structure matches project layout

---

## Emergency Procedures

### **When to Stop Work and Request Help**
- **Data fetching consistently fails** after trying multiple approaches
- **Business concepts remain unclear** after research phase
- **Technical tools malfunction** preventing progress
- **Project requirements conflict** with established standards
- **Quality standards cannot be met** within time constraints

### **How to Request Assistance**
1. **Document the problem**: Clearly describe what you tried and what failed
2. **Provide context**: Include relevant error messages, file paths, command outputs
3. **Specify urgency**: Indicate whether this blocks all progress or just specific tasks
4. **Suggest alternatives**: If possible, propose alternative approaches

### **Continuation Strategies**
- **Work around blocked items**: Continue with unblocked tasks while waiting for help
- **Document assumptions**: Note any assumptions made to continue work
- **Prepare for revision**: Be ready to revise work once issues are resolved
- **Maintain quality**: Don't compromise standards to work around problems

---

**End of Handbook**

*This comprehensive guide provides everything needed for both agents and editors to produce excellent API documentation. For questions not covered here, request clarification rather than guessing.*
