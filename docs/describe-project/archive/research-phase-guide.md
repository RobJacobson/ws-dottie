# Research Phase Guide

## Phase Objective

Understand the business domain and collect real API data to inform documentation decisions. This phase establishes the foundation for all subsequent work.

## Context Management

- Use `--limit 500` for all data fetching to control context consumption
- Focus on representative samples, not exhaustive data analysis
- Extract 3-5 examples per field type maximum
- **Context management**: Tips are for very large APIs (20+ endpoints). For typical APIs with 2-5 endpoints, context should not be a concern

## Duration

**Complexity-Based Timing:**
- **Simple APIs** (1-2 endpoints, <10 fields): 1-1.5 hours
  - *Example: Border crossings (4 fields) → 1.5 hours*
- **Medium APIs** (2-3 endpoints, 10-15 fields): 2-3 hours  
  - *Example: Weather stations, traffic flow → 2.5 hours*
- **Complex APIs** (3+ endpoints, 15+ fields): 3-4 hours
  - *Example: Bridge clearances (16+ fields) → 3-4 hours*

## Phase Deliverables
- Domain analysis document
- API data samples for all endpoints
- Business context documentation
- Endpoint relationship mapping

## Step 1: Domain Research

### Business Context Understanding
- Study official API documentation provided by user
- Research business domain online (e.g., "WSDOT weather stations", "WSF vessels")
- Understand real-world applications and use cases
- Identify key business concepts and terminology

### Domain Analysis Document
Create `src/apis/[api-name]/working/domain-analysis.[agent-name].md` (see `shared-standards.md` for file naming conventions):
- Business purpose and real-world applications
- Key terminology and concepts
- Target users and use cases
- Domain-specific rules and logic

## Step 2: Data Collection

### Data Fetching Requirements
**CRITICAL**: Use only `fetch-dottie` CLI with `--limit 500` parameter. No curl, direct HTTP requests, or other parameters.

**MANDATORY STOPPING CONDITION**: If `fetch-dottie` fails, stop all work and request assistance. Do not write related descriptions.

### Fetching Process

**CRITICAL COMMAND FORMATS - Use these exact patterns:**

```bash
# ✅ CORRECT FORMATS
npx fetch-dottie getBorderCrossings --limit 500
npx fetch-dottie getBridgeClearancesByRoute --limit 500
npx fetch-dottie getVesselBasics --limit 500
npx fetch-dottie getTravelTimes --limit 500
npx fetch-dottie getAlerts --limit 500

# ❌ COMMON ERRORS TO AVOID
npx fetch-dottie GetBorderCrossings --limit 500                    # Wrong capitalization
npx fetch-dottie wsdot-border-crossings/getBorderCrossings --limit 500   # Wrong path format
npx fetch-dottie getBorderCrossings                               # Missing --limit 500
```

**TROUBLESHOOTING CLI ERRORS:**
- Command not found → Check if you're in the project root directory
- Function not found → Use lowercase function names (getBorderCrossings, not GetBorderCrossings)
- No data returned → Verify API is working with `--limit 5` first

### Data Analysis
- List all endpoints in assigned API
- Fetch sample data for each endpoint (--limit 500)
- Document data structure and identify patterns
- Extract 3-5 representative examples per field type
- **CRITICAL: Edge Case Analysis** - Actively examine data for unusual values that represent special conditions:
  - Look for magic numbers (e.g., `-1`, `0`, `999`) that indicate special states
  - Identify special strings or null values with business meaning
  - Document what these edge cases represent in real-world terms
  - Use Doug's format: `(e.g., 'normal value' for normal condition, 'edge value' for special condition)`
- Focus on structure analysis, not exhaustive data review

### MANDATORY Edge Case Analysis Checklist
- [ ] Examine ALL numeric fields for magic numbers (-1, 0, 999, etc.)
- [ ] Examine ALL string fields for magic contants ("NONE," "UNUSED," etc.) and enum values ("N," "S," "E," "W," etc.)
- [ ] Document ALL null/empty values with business rationale
- [ ] Document ALL non-unique string values (like those above) with business rationale
- [ ] Test boundary conditions (min/max values observed)
- [ ] Identify special status indicators (CLOSED, N/A, UNKNOWN)
- [ ] Validate edge cases represent actual business conditions
- [ ] Document edge cases using Doug's format in field descriptions

### Canonical Endpoint Names Discovery

**REQUIRED PROCESS - Follow these steps exactly:**

1. **List client directory:** `list_dir src/clients/[api-name]/`
2. **Read each client file:** `read_file src/clients/[api-name]/[filename].ts`
3. **Find EndpointDefinition exports:** Look for patterns like:
   ```typescript
   export const getBorderCrossingsMeta: EndpointDefinition<...> = {
     api: "wsdot-border-crossings",
     function: "getBorderCrossings",
     endpoint: "/Traffic/api/...",
     ...
   };
   ```
4. **Extract canonical names:** Use the `function` field value (e.g., 'getBorderCrossings')
5. **Use for cross-references:** Format as `[api]/[function]` (e.g., 'wsdot-border-crossings/getBorderCrossings')

**EXAMPLE DISCOVERY PROCESS:**
```bash
# Step 1: Find client files
list_dir src/clients/wsdot-border-crossings/

# Step 2: Read client definitions  
read_file src/clients/wsdot-border-crossings/getBorderCrossings.ts

# Step 3: Extract from EndpointDefinition
// Found: function: "getBorderCrossings"
// Found: api: "wsdot-border-crossings"

# Step 4: Use in documentation
// Cross-reference format: wsdot-border-crossings/getBorderCrossings
// fetch-dottie format: getBorderCrossings (function name only)
```

## Step 3: Business Context Analysis

### Endpoint Relationships
- Map how endpoints work together
- Identify business workflows and user journeys
- Understand data dependencies
- Document domain insights

### Integration Opportunities
- Review `docs/getting-started-cli.md` "📊 Available APIs"
- Identify related endpoints that could enhance data
- Note cross-reference opportunities for Integration Phase (see `shared-standards.md` for cross-reference guidelines)

### Business Context Summary
- Document non-obvious business concepts
- Capture endpoint purpose and target users
- Note workflow patterns and dependencies

### Data Freshness Validation Protocol

**CRITICAL: Prioritize source API documentation over assumptions**

- [ ] **Extract EXACT data freshness statements** from source API documentation first
- [ ] **Analyze data type patterns:** Real-time (border crossings, vessel locations) vs. Static (bridge clearances, schedules)
- [ ] **Document observed update frequencies** with evidence from API calls
- [ ] **Validate assumptions against API behavior** - multiple calls to check update patterns
- [ ] **Use API-specific patterns when no explicit documentation exists:**
  - Border crossing wait times = "Data updates frequently" (real-time traffic)
  - Bridge clearances = "Data updates infrequently" (static infrastructure)
  - Vessel locations = "Data is real-time" (GPS tracking)
  - Ferry schedules = "Data updates infrequently" (published schedules)
- [ ] **Note discrepancies** between documentation claims and observed behavior

**WRONG EXAMPLE:** Labeling real-time border crossing data as "updates infrequently"
**CORRECT APPROACH:** Always prioritize the nature of the data type and source documentation

## Phase Completion Checklist

### Domain Understanding
- [ ] Business domain researched and documented
- [ ] Key terminology identified and defined
- [ ] Real-world applications understood
- [ ] Target users and use cases identified

### Data Collection
- [ ] All endpoints listed and analyzed
- [ ] Real API data fetched for every endpoint (--limit 500)
- [ ] Data structure documented with patterns identified
- [ ] 3-5 representative examples extracted per field type
- [ ] **Edge cases identified and documented** (magic numbers, special states, unusual values)
- [ ] Canonical endpoint names confirmed

### Business Context
- [ ] Endpoint relationships mapped
- [ ] Business workflows documented
- [ ] Data dependencies identified
- [ ] Integration opportunities noted
- [ ] Domain insights captured

### Documentation
- [ ] Domain analysis document created
- [ ] Business context summary completed
- [ ] Endpoint purpose notes captured
- [ ] Cross-reference opportunities identified

## Expected Deliverables

### Files Created

**REQUIRED FILES (EVERY API):**
- `src/apis/[api-name]/working/domain-analysis.[agent-name].md` (MANDATORY)

**OPTIONAL SUPPORTING FILES:**
- `src/apis/[api-name]/working/business-workflows.[agent-name].md` 
- `src/apis/[api-name]/working/work-notes.[agent-name].md`

**CRITICAL:** Each API must have its own separate `domain-analysis.[agent-name].md` file. Do NOT combine multiple APIs into one analysis file.

### Knowledge Gained
- Deep understanding of business domain
- Real API data samples for all endpoints
- Clear picture of endpoint relationships
- Foundation for writing phase decisions

## Quality Standards

Follow `shared-standards.md` for complete quality standards. Key research phase requirements:

### Domain Research
- Comprehensive understanding of business purpose
- Clear grasp of real-world applications
- Identification of key business concepts
- Understanding of target users

### Data Collection
- 100% endpoint coverage with real data (--limit 500)
- Accurate data structure documentation
- 3-5 representative examples per field type (see `shared-standards.md` for data example formatting)
- Canonical endpoint names confirmed

### Business Context
- Clear endpoint relationship mapping
- Documented business workflows
- Identified integration opportunities
- Captured domain insights

## Common Issues

See `shared-standards.md` for complete common issues and solutions. Key research phase issues:

### Data Fetching Failures
- **Problem**: `fetch-dottie` returns no data
- **Solution**: Stop work and request assistance
- **Do Not**: Use curl, direct HTTP requests, or workarounds

### Unclear Business Logic
- **Problem**: Domain concepts are confusing
- **Solution**: Research more thoroughly or ask for clarification
- **Do Not**: Make assumptions about business logic

### Missing Endpoint Data
- **Problem**: Some endpoints return no data
- **Solution**: Document the issue and proceed with available data
- **Do Not**: Skip endpoints or use placeholder data

---

**Next Phase**: Proceed to `writing-phase-guide.md` only after completing all research phase requirements.
