# Product Requirements Document: Zod Schema Annotation Implementation

## Overview

This PRD provides comprehensive instructions for AI agents tasked with enhancing Zod 4 schema annotations for individual WSDOT and WSF APIs. Each agent will be assigned to work on one specific API, refactoring both `inputSchemas.ts` and `outputSchemas.ts` files according to the unified style guide.

## 🎯 Mission Statement

Transform terse, generic Zod schema descriptions into rich, semantic annotations that serve both human developers and AI agents through Model Context Protocol (MCP) servers. Create consistent, high-quality documentation that enhances API discoverability and usability.

## 📋 Pre-Implementation Checklist

Before beginning any schema modifications, agents **MUST** complete all of the following steps. **Failure to complete any step is a blocking condition** - agents must pause and request user guidance.

### ✅ Step 1: Style Guide Review
- [ ] **Read and understand** `docs/describe-project/unified-style-guide.md` completely
- [ ] **Familiarize yourself** with the layered hybrid approach using `.meta()`
- [ ] **Study the examples** and anti-patterns sections thoroughly
- [ ] **Understand the quality assurance framework** and review checklist
- [ ] **Review the domain glossary** for your assigned API domain

### ✅ Step 2: PRD Review and Assignment Confirmation
- [ ] **Read this PRD** completely and understand your specific assignment
- [ ] **Confirm your assigned API** with the user
- [ ] **Understand the scope** - you will work on ONE API only
- [ ] **Clarify any questions** about the assignment before proceeding

### ✅ Step 3: Data Collection and Analysis
- [ ] **List all endpoints** in your assigned API
- [ ] **Fetch sample data** for each endpoint using `fetch-dottie` with default parameters
- [ ] **Document the data structure** and identify key patterns
- [ ] **Note any discrepancies** between expected and actual data
- [ ] **Identify relationships** between different endpoints and fields
- [ ] **Extract real-world examples** for use in annotations

**Data Collection Commands:**
```bash
# List available functions for your API
fetch-dottie --list

# Fetch sample data for each endpoint (use default parameters)
fetch-dottie [function-name] --quiet

# For endpoints requiring parameters, try with defaults first
fetch-dottie [function-name] --help  # See parameter requirements
```

### ✅ Step 4: Official Documentation Review
- [ ] **Study the official API documentation** provided by the user
- [ ] **Understand the business context** and domain-specific terminology
- [ ] **Identify operational details** (update frequencies, caching policies, business rules)
- [ ] **Note any warnings or special handling requirements**
- [ ] **Map documentation to actual data** to identify gaps or discrepancies

### ✅ Step 5: Domain Knowledge Research
- [ ] **Search the web** for "WSDOT [entity]" or "WSF [entity]" for entities in your domain
- [ ] **Research business logic** and operational context
- [ ] **Understand real-world implications** of the data
- [ ] **Identify additional context** not found in official documentation
- [ ] **Document findings** for incorporation into annotations

**Research Examples:**
- "WSDOT weather stations" for weather API
- "WSF vessels" for vessel API
- "WSDOT traffic flow" for traffic API
- "WSF terminals" for terminal API

## 🚨 Critical Success Criteria

### Must-Have Requirements (Blocking)
- [ ] **All pre-implementation steps completed** before any schema modifications
- [ ] **Real API data fetched and analyzed** for every endpoint
- [ ] **Official documentation reviewed** and understood
- [ ] **Domain research completed** with findings documented
- [ ] **No schema modifications** until all prerequisites are met

### Quality Requirements (Blocking)
- [ ] **Every field has a clear, declarative description** following established patterns
- [ ] **All required metadata keys included** (`domain`, `entity`, `semanticType`)
- [ ] **Real-world examples provided** from actual API data (2-4 per field)
- [ ] **Relationships documented** where applicable (`relatedEndpoints`, `crossReferences`)
- [ ] **Operational context included** (`updateFrequency`, `cachingPolicy`, `businessRules`)
- [ ] **Descriptions pass the "read aloud" test** - natural, flowing language

### Consistency Requirements (Blocking)
- [ ] **Follows established templates** for similar field types
- [ ] **Uses consistent terminology** from the domain glossary
- [ ] **Maintains uniform tone and voice** across all descriptions
- [ ] **Proper parenthetical patterns** for examples and enums
- [ ] **Correct cross-reference formatting** (`[api]/[endpoint]` format)

## 📁 File Structure and Scope

### Assigned Files
Each agent will work on **exactly two files** for their assigned API:
- `src/apis/[api-name]/inputSchemas.ts`
- `src/apis/[api-name]/outputSchemas.ts`

### File Organization
```typescript
// Example structure for inputSchemas.ts
export const [endpointName]InputSchema = z.object({
  // Enhanced field definitions with .meta() annotations
}).meta({
  description: "Schema-level description",
  agentMetadata: {
    // Schema-level metadata
  }
});

// Example structure for outputSchemas.ts
export const [endpointName]OutputSchema = z.object({
  // Enhanced field definitions with .meta() annotations
}).meta({
  description: "Schema-level description", 
  agentMetadata: {
    // Schema-level metadata
  }
});
```

## 🔧 Implementation Process

### Phase 1: Schema Analysis
1. **Review existing schemas** in both input and output files
2. **Identify field types** and their current descriptions
3. **Map fields to domain entities** using the glossary
4. **Plan annotation strategy** for each field type

### Phase 2: Annotation Creation
1. **Start with core descriptions** using established templates
2. **Add domain context** (`domain`, `entity`, `semanticType`)
3. **Include real examples** from fetched API data
4. **Document relationships** and cross-references
5. **Add operational context** and business rules
6. **Complete metadata structure** with all relevant keys

### Phase 3: Quality Review
1. **Apply the 20-point review checklist** from the style guide
2. **Test descriptions** by reading them aloud
3. **Verify examples** against actual API data
4. **Check consistency** with established patterns
5. **Validate relationships** and cross-references

### Phase 4: Final Validation
1. **Ensure all success criteria met**
2. **Complete discrepancy report**
3. **Request user review** if any questions remain

## 📊 Discrepancy Reporting

After completing all schema modifications, provide a comprehensive report in this format:

### Implementation Summary
- **API Assigned:** [API name]
- **Files Modified:** [list of files]
- **Endpoints Processed:** [number] endpoints
- **Fields Annotated:** [number] fields
- **Time Spent:** [estimated hours]

### Discrepancy Report
| Endpoint/Field | Notes |
|----------------|-------|
| `[api]/[endpoint].[field]` | [Description of issue or question] |
| `[api]/[endpoint].[field]` | [Description of issue or question] |

### Questions for User
- [List any business logic or domain knowledge questions]
- [List any unclear concepts that need clarification]
- [List any proposed improvements to the style guide]

### Implementation Notes
- [Any significant challenges encountered]
- [Any patterns or insights discovered]
- [Any recommendations for future implementations]

## 🎯 Success Metrics

### Quantitative Metrics
- **100% field coverage** - Every field has enhanced annotations
- **2-4 examples per field** - Real-world examples from API data
- **Complete metadata** - All required keys present
- **Zero blocking issues** - All success criteria met

### Qualitative Metrics
- **Natural readability** - Descriptions flow when read aloud
- **Semantic richness** - Clear purpose and context for each field
- **Consistent style** - Uniform patterns across all annotations
- **Actionable metadata** - Useful information for AI agents

## 🚫 What NOT to Do

### Prohibited Actions
- **Never modify schema implementations** or fetching logic
- **Never skip pre-implementation steps** - all must be completed
- **Never use generic descriptions** like "A string value"
- **Never include .NET datetime references** - use abstraction layer
- **Never make assumptions** about business logic without research
- **Never proceed with questions** - always ask for clarification

### Common Mistakes to Avoid
- **Missing real examples** - always use actual API data
- **Inconsistent terminology** - follow the domain glossary
- **Passive voice** - use active, declarative statements
- **Missing relationships** - document cross-endpoint connections
- **Incomplete metadata** - include all relevant keys
- **Generic descriptions** - provide specific, contextual information

## 🔄 Iteration and Feedback

### User Review Process
1. **Submit completed work** with discrepancy report
2. **Address any feedback** from user review
3. **Make necessary corrections** based on feedback
4. **Final validation** before completion

### Style Guide Improvements
- **Propose updates** if any guidelines are unclear
- **Suggest enhancements** based on implementation experience
- **Document patterns** that could benefit other agents
- **Share insights** about domain-specific challenges

## 📞 Support and Escalation

### When to Ask for Help
- **Unable to fetch data** using `fetch-dottie` CLI
- **Unclear business logic** after research
- **Conflicting information** between docs and data
- **Ambiguous style guide** instructions
- **Technical issues** with schema modifications

### How to Ask for Help
1. **Be specific** about the issue
2. **Provide context** (API, endpoint, field)
3. **Include what you've tried** and results
4. **Suggest potential solutions** if you have ideas
5. **Ask focused questions** rather than general ones

## 🎉 Completion Criteria

Your implementation is complete when:
- [ ] **All pre-implementation steps completed**
- [ ] **Both schema files enhanced** with rich annotations
- [ ] **All success criteria met**
- [ ] **Discrepancy report submitted**
- [ ] **User review completed** and feedback addressed
- [ ] **No blocking issues remain**

## 📚 Reference Materials

### Essential Documents
- `docs/describe-project/unified-style-guide.md` - Primary implementation guide
- `docs/describe-project/best-practices.md` - Foundational principles
- `docs/describe-project/annotation-principles.md` - Technical architecture
- `docs/misc/getting-started-for-agents.md` - CLI usage guide

### Domain Resources
- Official API documentation (provided by user)
- Domain glossary in unified style guide
- Web search results for domain-specific context
- Actual API data samples (fetched via CLI)

---

**Remember:** Quality over speed. Take the time to understand the domain, fetch real data, and create meaningful annotations. The goal is to create documentation that truly enhances the developer and AI agent experience.
