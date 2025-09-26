# Product Requirements Document: Zod Schema Annotation Implementation (v3)

## Overview

This PRD provides comprehensive instructions for AI agents working in pairs to enhance Zod 4 schema annotations for WSDOT and WSF APIs. Each API will be assigned to **two agents**: one for input schemas and one for output schemas, with cross-validation to ensure quality and consistency.

## 🎯 Mission Statement

Transform terse, generic Zod schema descriptions into rich, semantic annotations that serve both human developers and AI agents through **narrative descriptions only** using Zod 4's `.describe()` method. Create consistent, high-quality documentation that enhances API discoverability and usability, with business-focused endpoint descriptions as the final synthesis step.

## 👥 Agent Assignment Structure

### Two-Agent Model
Each API is assigned to **exactly two agents**:
- **Agent-Alice**: Always handles `inputSchemas.ts` + `endpoint-descriptions.json`
- **Agent-Bob**: Always handles `outputSchemas.ts` + `endpoint-descriptions.json`

### Cross-Validation Process
1. **Parallel Work**: Both agents work simultaneously on their assigned files
2. **Cross-Review**: Alice reviews Bob's work, Bob reviews Alice's work
3. **Endpoint Descriptions**: Created as the final step after schemas are complete
4. **Orchestration**: User merges endpoint descriptions and resolves conflicts

## 📋 Pre-Implementation Checklist

Before beginning any schema modifications, agents **MUST** complete all of the following steps. **Failure to complete any step is a blocking condition** - agents must pause and request user guidance.

### ✅ Step 1: Style Guide Review
- [ ] **Read and understand** `docs/describe-project/unified-style-guide-v3.md` completely
- [ ] **Familiarize yourself** with the narrative-only approach using `.describe()` only
- [ ] **Study the 4 core templates** and their specific patterns
- [ ] **Understand the quality assurance framework** and review checklist
- [ ] **Review the domain glossary** for your assigned API domain
- [ ] **Understand endpoint description requirements** and business context guidelines

### ✅ Step 2: PRD Review and Assignment Confirmation
- [ ] **Read this PRD** completely and understand your specific assignment
- [ ] **Confirm your assigned API and role** (Alice: input schemas, Bob: output schemas)
- [ ] **Understand the scope** - you will work on ONE API with ONE partner agent
- [ ] **Clarify any questions** about the assignment before proceeding

### ✅ Step 3: Data Collection and Analysis
- [ ] **List all endpoints** in your assigned API
- [ ] **Fetch sample data** for each endpoint using `fetch-dottie` with default parameters:
      **`npm run fetch-dottie [endpoint]`**
- [ ] **Document the data structure** and identify key patterns
- [ ] **Note any discrepancies** between expected and actual data
- [ ] **Identify relationships** between different endpoints and fields
- [ ] **Extract real-world examples** for use in annotations

**Data Collection Commands:**
```bash
# List available functions for your API
npx fetch-dottie --help

# Fetch sample data for each endpoint (use default parameters)
npx fetch-dottie [function-name] --quiet
```

See docs/misc/getting-started-agents.md for details about fetch-dottie and fetching data.

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
- [ ] **Input schemas** follow template: "Input parameters to [action] [entity] [criteria] (none required)."
- [ ] **Input fields** follow template: "A [field type] as [data type] for [purpose] (e.g., '[example1]', '[example2]')."
- [ ] **Output schemas** follow template: "Returns [entity type] including [key data] for [use case]. [Business context]. Data updates [frequency]."
- [ ] **Output fields** follow template: "The [entity]'s [field purpose] as [data type] (e.g., '[example1]', '[example2]'). [Additional context]."
- [ ] **All descriptions include cross-references** to related endpoints where appropriate
- [ ] **Real-world examples provided** from actual API data (2-4 per field, placed at end of first sentence)
- [ ] **Business context included** in descriptions
- [ ] **Narrative descriptions only** - no metadata, everything in `.describe()`
- [ ] **Descriptions pass the "read aloud" test** - natural, flowing language

### Consistency Requirements (Blocking)
- [ ] **Follows the 4 core templates** exactly - no exceptions, no variations
- [ ] **Uses consistent terminology** from the domain glossary
- [ ] **Maintains uniform tone and voice** across all descriptions
- [ ] **Proper parenthetical patterns** for examples (all example data in quotes, placed at end of first sentence)
- [ ] **Correct cross-reference formatting** (`[api]/[endpoint]` format)
- [ ] **Template-specific starting patterns** followed correctly

## 📁 File Structure and Scope

### Assigned Files
Each agent will work on **exactly one primary file** for their assigned API:
- **Agent-Alice**: `src/apis/[api-name]/inputSchemas.ts`
- **Agent-Bob**: `src/apis/[api-name]/outputSchemas.ts`

### Final Deliverable
Both agents will create **endpoint-descriptions.json** as the final step:
- `src/apis/[api-name]/endpoint-descriptions.json`

### File Organization
```typescript
// Example structure for inputSchemas.ts (Agent-Alice)
export const [endpointName]InputSchema = z.object({
  // Input field examples:
  // ParameterField: z.string().describe(
  //   "A [parameter type] as [data type] for [purpose] (e.g., '[example1]', '[example2]')."
  // ),
}).describe("Input parameters to [action] [entity] [criteria] (none required).");

// Example structure for outputSchemas.ts (Agent-Bob)
export const [endpointName]OutputSchema = z.object({
  // Output field examples:
  // IdentifierField: z.number().describe(
  //   "The [entity]'s [field purpose] as [data type] (e.g., '[example1]', '[example2]'). [Additional context]."
  // ),
}).describe("Returns [entity type] including [key data] for [use case]. [Business context]. Data updates [frequency].");

// Example structure for endpoint-descriptions.json (Both agents)
{
  "endpointName": "Retrieves [business purpose] for [use case] and [target users].",
  "anotherEndpoint": "Calculates [business function] for [specific scenarios] and [applications]."
}
```

## 🔧 Implementation Process

### Phase 1: Schema Creation (Morning - 2-3 hours)
1. **Agent-Alice**: Create `inputSchemas.ts` following the input template
2. **Agent-Bob**: Create `outputSchemas.ts` following the output template
3. **Both agents**: Include cross-references and real examples
4. **Both agents**: Add business context and operational information
5. **Both agents**: Complete description structure with all required elements

### Phase 2: Cross-Validation (Midday - 1 hour)
1. **User**: Review and merge both schema files
2. **Agent-Alice**: Review Agent-Bob's `outputSchemas.ts`
3. **Agent-Bob**: Review Agent-Alice's `inputSchemas.ts`
4. **User**: Resolve any conflicts or issues

### Phase 3: Endpoint Descriptions (Afternoon - 2-3 hours)
1. **Agent-Alice**: Create `endpoint-descriptions.json` based on complete understanding
2. **Agent-Bob**: Review and suggest improvements to endpoint descriptions
3. **User**: Final merge and approval of endpoint descriptions

## 📊 Cross-Validation Protocol

### Review Checklist
When reviewing your partner's work, check for:
- [ ] **Template Compliance**: Follows the 4 core templates exactly
- [ ] **Business Context**: Clear purpose and real-world application
- [ ] **Real Examples**: 2-4 realistic examples from API data
- [ ] **Cross-References**: Accurate related endpoint references
- [ ] **Caching Patterns**: Correctly describes update frequencies
- [ ] **Read Aloud Test**: Natural, flowing language
- [ ] **Consistency**: Uniform terminology and patterns

### Review Format
```markdown
## Cross-Validation Review

**Reviewing**: [Partner's file]
**Reviewer**: [Your name - Alice/Bob]

**Checklist Results**:
- [ ] Template compliance verified
- [ ] Business context is clear
- [ ] Examples are realistic and diverse
- [ ] Cross-references are accurate
- [ ] Caching patterns correctly described
- [ ] Passes read aloud test

**Issues Found**: [List any problems]
**Suggestions**: [Improvement recommendations]
**Overall Assessment**: [Quality rating and notes]
```

## 📊 Discrepancy Reporting

After completing all work, provide a comprehensive report in this format:

### Implementation Summary
- **API Assigned:** [API name]
- **Agent Role:** [Alice: input schemas / Bob: output schemas]
- **Partner Agent:** [Bob / Alice]
- **Files Created/Modified:** [list of files]
- **Endpoints Processed:** [number] endpoints
- **Fields Annotated:** [number] fields
- **Time Spent:** [estimated hours]

### Cross-Validation Results
- **Partner's Work Quality:** [assessment]
- **Issues Found:** [list of issues]
- **Suggestions Made:** [list of suggestions]
- **Resolution Status:** [resolved/pending]

### Endpoint Descriptions
- **Endpoints Documented:** [number]
- **Business Context Quality:** [assessment]
- **Cross-References Included:** [list]
- **Final Approval Status:** [approved/pending]

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
- **Cross-references included** - All related endpoints documented
- **Template compliance** - All descriptions follow the 4 core templates
- **Narrative descriptions only** - No metadata, everything in `.describe()`
- **Zero blocking issues** - All success criteria met

### Qualitative Metrics
- **Natural readability** - Descriptions flow when read aloud
- **Semantic richness** - Clear purpose and context for each field
- **Consistent style** - Uniform patterns across all annotations
- **Discoverability** - Cross-references enable endpoint discovery
- **Agent-friendly** - Descriptions provide actionable information for AI agents
- **Business context** - Endpoint descriptions provide clear business purpose

## 🚫 What NOT to Do

### Prohibited Actions
- **Never modify schema implementations** or fetching logic
- **Never skip pre-implementation steps** - all must be completed
- **Never use generic descriptions** like "A string value"
- **Never include .NET datetime references** - use abstraction layer
- **Never make assumptions** about business logic without research
- **Never proceed with questions** - always ask for clarification
- **Never use metadata** - everything goes in `.describe()` only
- **Never deviate from the 4 core templates** - follow them exactly

### Common Mistakes to Avoid
- **Missing real examples** - always use actual API data
- **Inconsistent terminology** - follow the domain glossary
- **Passive voice** - use active, declarative statements
- **Missing cross-references** - document related endpoints
- **Template variations** - follow the 4 core templates exactly
- **Generic descriptions** - provide specific, contextual information
- **Missing business context** - explain real-world purpose and use cases

## 🔄 Iteration and Feedback

### User Review Process
1. **Submit completed work** with cross-validation results
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
- **Disagreements with partner agent** that need resolution

### How to Ask for Help
1. **Be specific** about the issue
2. **Provide context** (API, endpoint, field, partner agent)
3. **Include what you've tried** and results
4. **Suggest potential solutions** if you have ideas
5. **Ask focused questions** rather than general ones

## 🎉 Completion Criteria

Your implementation is complete when:
- [ ] **All pre-implementation steps completed**
- [ ] **Your assigned schema file enhanced** with rich, template-compliant annotations
- [ ] **Partner's work reviewed** with detailed feedback provided
- [ ] **Endpoint descriptions created** with business-focused descriptions
- [ ] **All success criteria met**
- [ ] **Cross-references included** for all related endpoints
- [ ] **Narrative descriptions only** - no metadata anywhere
- [ ] **Cross-validation report submitted**
- [ ] **User review completed** and feedback addressed
- [ ] **No blocking issues remain**

## 📚 Reference Materials

### Essential Documents
- `docs/describe-project/unified-style-guide-v3.md` - Primary implementation guide
- `docs/describe-project/implementation-prd-v3.md` - This document
- `docs/misc/getting-started-for-agents.md` - CLI usage guide

### Domain Resources
- Official API documentation (provided by user)
- Domain glossary in unified style guide
- Web search results for domain-specific context
- Actual API data samples (fetched via CLI)

### Partner Coordination
- Cross-validation protocol and checklist
- Endpoint description guidelines
- Conflict resolution process

---

**Remember:** Quality over speed. Take the time to understand the domain and the relationship between different entities and endpoints, fetch real data, and create meaningful annotations. The goal is to create documentation that truly enhances the developer and AI agent experience through rich, discoverable descriptions with clear business context and no metadata clutter.
