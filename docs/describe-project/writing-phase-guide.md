# Writing Phase Guide

## Phase Objective

Create enhanced documentation for input/output schemas and endpoint descriptions using business context from the research phase.

## Context Management

- Reference research phase findings rather than re-analyzing data
- Work on one endpoint at a time to maintain focus
- Use templates to reduce cognitive load
- Monitor context usage - if approaching 70%, summarize progress and continue

## Duration
3-4 hours

## Phase Deliverables
- Enhanced input schemas with business context
- Enhanced output schemas with business context  
- Endpoint descriptions with business purpose
- All examples using literal API data

## Writing Style Standards

Follow `shared-standards.md` for complete writing style standards and quality principles.

## Field Description Guidelines

See `shared-standards.md` for complete field description guidelines, sentence structure rules, templates, and data example formatting.

### Description Length Limits (ENFORCED)
- **Simple fields**: 50-150 characters (IDs, timestamps, coordinates)
- **Business fields**: 150-400 characters (most domain-specific fields)
- **Complex integration fields**: 400-600 characters (MAX - requires justification)
- **Endpoint descriptions**: 200-800 characters
- **Exceeding limits**: Requires explicit justification in documentation

### Length Management Strategy
- **Prioritize business context** over technical details
- **Use cross-references** instead of embedded explanations
- **Consolidate similar patterns** rather than repeating explanations
- **Focus on decision-making value** for the user

## Schema Documentation

See `shared-standards.md` for complete schema documentation templates and data freshness defaults.

### CRITICAL Requirements
- **ALL schema definitions MUST have a detailed `.describe()` clause**
- **DO NOT modify existing JSDoc comments** - they preserve original WSDOT/WSF documentation
- **DO NOT add new JSDoc comments** - use `.describe()` annotations instead
- **Preserve original variable names** - do not rename schema variables

### Key Requirements
- Explain what parameters are required and their purpose
- Explain what data is returned and its business value
- Include container type and typical cardinality
- Add data freshness information (use patterns from research phase)

## Endpoint Descriptions

See `shared-standards.md` for complete endpoint description templates and examples.

### Key Requirements
- High-level endpoint descriptions (write after field and schema work)
- Focus on when and why to use each endpoint
- Target audience and use case guidance
- Do not include data examples at endpoint level

## File Structure

See `shared-standards.md` for complete file naming conventions and examples.

### File Types Created
- `src/apis/[api-name]/working/inputSchemas.[agent].ts`
- `src/apis/[api-name]/working/outputSchemas.[agent].ts`
- `src/apis/[api-name]/working/endpointDescriptions.[agent].json`

## Phase Completion Checklist

### Field Documentation
- [ ] All input fields documented with business context
- [ ] All output fields documented with business context
- [ ] Examples use literal API data with single quotes (see `shared-standards.md`)
- [ ] **Edge cases documented using Doug's format** - unusual values explained with business meaning
- [ ] Sentence count appropriate for field complexity
- [ ] Plain English throughout

### Schema Documentation
- [ ] Input schemas explain parameter purpose
- [ ] Output schemas explain business value
- [ ] Data freshness information included (use research phase patterns)
- [ ] Container type and cardinality specified

### Endpoint Documentation
- [ ] Endpoint descriptions focus on business purpose
- [ ] Target audience and use cases clear
- [ ] No data examples at endpoint level
- [ ] Business context integrated

### Quality Standards
- [ ] Follow all standards in `shared-standards.md`
- [ ] Natural, conversational language
- [ ] Active voice throughout
- [ ] Consistent terminology
- [ ] Business value explained
- [ ] Real-world meaning clear

## Expected Deliverables

### Files Created
- `src/apis/[api-name]/working/inputSchemas.[agent].ts`
- `src/apis/[api-name]/working/outputSchemas.[agent].ts`
- `src/apis/[api-name]/working/endpointDescriptions.[agent].json`

### Content Quality
- Enhanced descriptions for all fields
- Business context integrated throughout
- Literal API data examples (see `shared-standards.md`)
- Clear business purpose and value

## Common Issues

See `shared-standards.md` for complete common issues and solutions. Key writing phase issues:

### Missing .describe() Annotations
- **Problem**: Adding JSDoc comments instead of `.describe()` annotations
- **Solution**: ALWAYS add `.describe()` clauses to schema definitions, preserve original JSDoc comments
- **Do Not**: Modify existing JSDoc comments or rename schema variables

### Over-Engineering Simple Fields
- **Problem**: Writing too much for obvious fields
- **Solution**: Use templates for simple fields, focus on business context for complex ones

### Missing Business Context
- **Problem**: Technical descriptions without real-world meaning
- **Solution**: Always explain what the data means in practice

### Inconsistent Examples
- **Problem**: Examples don't match actual API data
- **Solution**: Use only literal data from API responses with single quotes

### Generic Descriptions
- **Problem**: Descriptions like "A string value" or "An identifier"
- **Solution**: Always include business context and real-world meaning

---

**Next Phase**: Proceed to `integration-phase-guide.md` only after completing all writing phase requirements.
