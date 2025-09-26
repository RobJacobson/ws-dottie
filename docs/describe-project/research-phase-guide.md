# Research Phase Guide

## Phase Objective

Understand the business domain and collect real API data to inform documentation decisions. This phase establishes the foundation for all subsequent work.

## Duration
2-3 hours

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
Create `src/apis/[api-name]/domain-analysis.[agent].md` (see `shared-standards.md` for file naming conventions):
- Business purpose and real-world applications
- Key terminology and concepts
- Target users and use cases
- Domain-specific rules and logic

## Step 2: Data Collection

### Data Fetching Requirements
**CRITICAL**: Use only `fetch-dottie` CLI with default parameters. No curl, direct HTTP requests, or manual parameters.

**MANDATORY STOPPING CONDITION**: If `fetch-dottie` fails, stop all work and request assistance. Do not write related descriptions.

### Fetching Process
```bash
# ✅ CORRECT - Use default parameters only
npx fetch-dottie getBridgeClearancesByRoute
npx fetch-dottie getBorderCrossings
npx fetch-dottie getVesselBasics

# ❌ WRONG - Never pass parameters manually
npx fetch-dottie getBridgeClearancesByRoute --route "I-5"
```

### Data Analysis
- List all endpoints in assigned API
- Fetch sample data for each endpoint
- Document data structure and identify patterns
- Note discrepancies between expected and actual data
- Extract verbatim examples for use in annotations

### Canonical Endpoint Names
- Read `id` fields in `src/clients/**` (format: `api:endpoint`)
- Convert to `api-name/function-name` when writing documentation (see `shared-standards.md` for cross-reference format)
- Use these as source of truth for endpoint names

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

## Phase Completion Checklist

### Domain Understanding
- [ ] Business domain researched and documented
- [ ] Key terminology identified and defined
- [ ] Real-world applications understood
- [ ] Target users and use cases identified

### Data Collection
- [ ] All endpoints listed and analyzed
- [ ] Real API data fetched for every endpoint
- [ ] Data structure documented with patterns identified
- [ ] Verbatim examples extracted for annotations
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
- `src/apis/[api-name]/domain-analysis.[agent].md`
- `src/apis/[api-name]/business-workflows.[agent].md` (optional)
- `src/apis/[api-name]/work-notes.[agent].md` (optional)

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
- 100% endpoint coverage with real data
- Accurate data structure documentation
- Verbatim examples preserved exactly (see `shared-standards.md` for data example formatting)
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
