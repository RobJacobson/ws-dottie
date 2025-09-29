# Writing Phase Guide

## Phase Objective

Create enhanced documentation for input/output schemas and endpoint descriptions using business context from the research phase.

**CRITICAL: NO cross-references are added in this phase. Cross-references are ONLY added in Integration Phase (Phase 3).**

## Context Management

- Reference research phase findings rather than re-analyzing data
- Work on one endpoint at a time to maintain focus
- Use templates to reduce cognitive load
- **Context management**: Tips are for very large APIs (20+ endpoints). For typical APIs with 2-5 endpoints, context should not be a concern

## Duration

**Complexity-Based Timing:**
- **Simple APIs** (1-2 endpoints, <10 fields): 2-2.5 hours
- **Medium APIs** (2-3 endpoints, 10-15 fields): 3-4 hours  
- **Complex APIs** (3+ endpoints, 15+ fields): 4-5 hours

**Total Project Time by Complexity:**
- **Simple APIs**: 1.5 + 2.5 + 1 = 5 hours total
- **Complex APIs**: 4 + 5 + 2 = 11 hours total

## Phase Deliverables
- **MUST:** Enhanced input schemas with business context
- **MUST:** Enhanced output schemas with business context  
- **MUST:** Endpoint descriptions with business purpose (NO cross-references)
- All examples using literal API data

**CRITICAL REMINDER: NO cross-references in any Phase 2 deliverables. All cross-references are added in Phase 3 only.**

## **REQUIRED: Data Freshness Statement**

**CRITICAL:** Data freshness statement MUST be included in the **main output array schema** `.describe()` annotation using these exact patterns:

| API Type | Required Statement |
|----------|-------------------|
| Border crossings | `"Data updates frequently."` |
| Bridge clearances | `"Data updates infrequently."` |
| Ferry schedules | `"Data updates infrequently."` |
| Ferry locations | `"Data is real-time."` |
| Traffic flow | `"Data updates frequently."` |
| Weather stations | `"Data updates frequently."` |

### **Exact Placement Examples:**

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

**❌ WRONG - In individual object schema:**
```typescript
export const borderCrossingDataSchema = z.object({...}).describe("Border crossing data. Data updates frequently.")
```

## Reference Guide

**ALL detailed rules are in `shared-standards.md` - this guide focuses on writing phase workflow and timing.**

For complete details, see `shared-standards.md` sections:
- Writing Standards → Business context, plain English, conciseness
- Field Description Guidelines → 4-part structure, examples, templates  
- Schema Documentation → Input/output templates, data freshness
- Edge Case Documentation → Discovery checklist, systematic approach

## **⚠️ CRITICAL WORKFLOW RULE**
**If you find yourself wanting to mention other APIs or endpoints during Phase 2, STOP. Note the integration opportunity for Phase 3 instead.**

**Phase 2 Focus**: Individual field meanings, business context, edge cases, data freshness
**Phase 3 Focus**: Cross-API integrations, workflow connections, alternative scenarios

### Description Length Limits (ENFORCED)
- **Simple fields**: 50-150 characters (IDs, timestamps, coordinates)
- **Business fields**: 150-400 characters (most domain-specific fields)
- **Complex integration fields**: 400-600 characters (MAX - requires justification)
- **Endpoint descriptions**: 200-800 characters (as a single narrative string)
- **Exceeding limits**: Requires explicit justification in documentation

### Length Management Strategy
- **Prioritize business context** over technical details
- **Focus on decision-making value** for the user
- **Apply example decision tree**: Multiple examples only when they show different categories/types
- **Minimize obvious fields**: GUIDs and simple IDs need minimal examples
- **Add location context**: Geographic coordinates should reference specific places when possible

### Example Decision Tree (Use This Checklist)

**Before adding examples, apply this numbered checklist:**

1. **Are these examples different CATEGORIES?** (Yes → Multiple examples)
   - *Example: Route types: highway vs local roads*
2. **Do they show different BUSINESS STATES?** (Yes → Multiple examples)  
   - *Example: Normal operation vs emergency closure*
3. **Do they show FORMAT VARIATIONS?** (Yes → Multiple examples)
   - *Example: '16 ft 1 in' vs '193' inches*
4. **If all answers are NO** → Use ONE representative example
5. **If any answer is YES** → Multiple examples add value

**Quick Check:**
- Different categories ✓ = Multiple examples
- Different business states ✓ = Multiple examples  
- Different formats ✓ = Multiple examples
- All same ✓ = Single example only

### Parallel Language Requirements
**CRITICAL**: When describing related fields that represent the same concept in different formats:

1. **Use identical business purpose**: Same core explanation of what the field represents
2. **Vary only format description**: Only change the unit/format explanation
3. **Maintain consistent examples**: Use corresponding values across related fields
4. **Avoid different emphasis**: Don't make users think they serve different business purposes
5. **Avoid obvious repetition**: Don't repeat the API's main purpose in every field

**Example Pattern:**
```typescript
// Same concept, parallel structure, no redundant context
HeightFeetInch: "[Concept] in human-readable format (e.g., '21 ft 6 in')."
HeightInches: "[Concept] in inches for calculations (e.g., '258' for 21 ft 6 in)."
```

### Context Distribution Strategy
**Endpoint Level**: Overall API purpose, target users, primary workflows
**Schema Level**: Dataset characteristics, data patterns
**Field Level**: Specific field distinctions, format differences, edge cases

**Avoid**: Repeating obvious API context in individual field descriptions.

### Field Distinction Guidelines

**Format Differences (Use Parallel Language):**
When fields are the same measurement in different units:
```typescript
// Same data, different format - use parallel structure
ClearanceFeet: "Bridge clearance in feet and inches format (e.g., '14 ft 5 in')."
ClearanceInches: "Bridge clearance in inches for calculations (e.g., '173' for 14 ft 5 in)."
```

**Meaningful Distinctions (Explain the Difference):**
When fields represent different aspects that users need to understand:
```typescript
// Different measurements - focus on factual distinctions
MaximumClearance: "Highest clearance point under bridge (e.g., '16 ft 2 in')."
MinimumClearance: "Lowest clearance point under bridge (e.g., '14 ft 5 in')."
```

**Key Question**: Does the user need to understand why both fields exist and when to use each one?

## Field Relationship Analysis

### Step 1: Analyze Field Relationships
Before writing descriptions, identify how fields relate to each other:

**Same Concept, Different Format:**
- Height in feet/inches vs. height in inches
- Date in different formats
- ID in different representations

**Similar Concepts, Meaningful Differences:**
- Minimum vs. maximum measurements
- Different types of the same category
- Related but distinct business concepts

**Unrelated Concepts:**
- Completely different data types
- Independent business concepts

### Step 2: Apply Relationship Strategy

**For SAME concepts → Use parallel language:**
- Identical business purpose explanations
- Vary only format/unit descriptions
- Consistent examples and structure

**For SIMILAR-BUT-DIFFERENT concepts → Focus on differences:**
- Emphasize what makes each field unique using factual distinctions
- Avoid speculative usage advice unless documented in source API
- Let clear field names (Maximum/Minimum, First/Last) speak for themselves

**For UNRELATED concepts → Describe independently:**
- Each field gets its own complete description
- No need for comparative language

### Step 3: Quality Check
Ask: "Would a user understand the relationship between these fields and know when to use each one?"

## Workflow Summary

**Key requirements - see `shared-standards.md` for complete templates and examples:**

### Schema Documentation Requirements
- Input schemas: Explain parameters and their purpose  
- Output schemas: Explain business value, include data freshness statement
- All schemas: Use `.describe()` annotations, preserve JSDoc comments

### Endpoint Description Requirements  
- Write AFTER field and schema work is complete
- Focus on business purpose and target audience
- Cross-references integrated into narrative string (see `shared-standards.md`)
- Single JSON file with endpoint key-value pairs

### File Creation Requirements
All files go in: `src/apis/[api-name]/working/`
- `inputSchemas.[agent-name].ts` 
- `outputSchemas.[agent-name].ts`
- `endpointDescriptions.[agent-name].json`

### File Types Created
- `src/apis/[api-name]/working/inputSchemas.[agent].ts`
- `src/apis/[api-name]/working/outputSchemas.[agent].ts`
- `src/apis/[api-name]/working/endpointDescriptions.[agent].json`

## Phase Completion Checklist

### Field Documentation
- [x] All input fields documented with business context
- [x] All output fields documented with business context
- [x] Examples use literal API data with single quotes (see `shared-standards.md`)
- [x] **Edge cases documented using Doug's format** - unusual values explained with business meaning
- [x] Sentence count appropriate for field complexity
- [x] Plain English throughout

### Schema Documentation
- [x] Input schemas explain parameter purpose
- [x] Output schemas explain business value
- [x] Data freshness information included (see `shared-standards.md`)
- [x] Container type and cardinality specified
- [x] **CRITICAL:** All schema definitions **MUST** have a detailed `.describe()` clause.

### Endpoint Documentation
- [x] Endpoint descriptions focus on business purpose
- [x] Target audience and use cases clear
- [x] No data examples at endpoint level
- [x] Business context integrated
- [x] Cross-references **MUST** be integrated into the narrative string as specified in `shared-standards.md`.

### Quality Standards
- [x] Follow all standards in `shared-standards.md`
- [x] Natural, conversational language
- [x] Active voice throughout
- [x] Consistent terminology
- [x] Business value explained
- [x] Real-world meaning clear

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
