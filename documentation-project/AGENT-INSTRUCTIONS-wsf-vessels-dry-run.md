# Agent Instructions: wsf-vessels API Zod Schema Documentation (Dry-Run)

## Your Task

Implement the Zod Schema Documentation Enhancement PRD for the `wsf-vessels` API as a dry-run test. Follow the PRD guidelines exactly to validate them before full implementation.

## Key Documents

1. **PRD**: `documentation-project/zod-schema-documentation-prd.md` - Your primary reference
2. **Implementation Plan**: `documentation-project/zod-schema-implementation-plan-wsf-vessels.md` - Detailed step-by-step guide
3. **Best Practices**: `documentation-project/api-documentation-best-practices-report.md` - Additional context

## Critical Requirements

### 1. Always Use Actual API Data

**MANDATORY:** Retrieve sample data for each endpoint using:
```bash
npx fetch-dottie wsf-vessels:[function-name] --limit 10
```

Examples:
- `npx fetch-dottie wsf-vessels:getVesselLocations --limit 10`
- `npx fetch-dottie wsf-vessels:getVesselBasics --limit 10`

**Never make up examples** - all examples must come from actual API responses.

### 2. Preferred Description Format

**Format:** `"[Description], as a [business unit type]. E.g., '[concrete example]' for [context]."`

**Business Unit Types (NOT data types):**
- ✅ "as a UTC datetime" (preferred)
- ✅ "as an integer ID"
- ✅ "as decimal degrees"
- ✅ "as knots"
- ✅ "as minutes"
- ❌ NOT "as a string" or "as a number"

### 3. Validate Schemas Against Actual Data

- Check that `.nullable()` matches actual null values
- Verify types match actual responses
- Document edge cases (null values, magic numbers like -1)
- **Important:** Actual API data is canonical - official docs may have errors

### 4. Process Order

1. **Shared schemas first**: `src/apis/wsf-vessels/shared/vesselBase.ts`
2. **Simple endpoints**: `cacheFlushDate`
3. **Basic endpoints**: `vesselBasics`
4. **Complex endpoints**: `vesselLocations`, `vesselVerbose`
5. **Remaining**: `vesselAccommodations`, `vesselHistories`, `vesselStats`

## Endpoint Groups to Document

1. `cacheFlushDate` - 2 files (input, output)
2. `vesselAccommodations` - 2 files
3. `vesselBasics` - 2 files (+ shared `vesselBase.ts`)
4. `vesselHistories` - 2 files
5. `vesselLocations` - 2 files
6. `vesselStats` - 2 files
7. `vesselVerbose` - 2 files

**Total: 14 schema files + 1 shared schema**

## Quality Checklist Per File

- [ ] Schema-level description includes concrete examples from actual API data
- [ ] Schema-level description follows template (25-75 words)
- [ ] All field descriptions follow preferred format
- [ ] All field descriptions include examples from actual API data
- [ ] Field descriptions use business unit types (not data types)
- [ ] Nullable fields documented with conditions
- [ ] Edge cases (null, magic values) documented
- [ ] Word counts within guidelines (15-40 words for fields)
- [ ] Schema validated against actual API responses
- [ ] Consistent terminology with related schemas

## What NOT to Do

- ❌ Don't fix schema validation issues (document them instead)
- ❌ Don't make up examples
- ❌ Don't use data types in descriptions ("as a string", "as a number")
- ❌ Don't skip data retrieval and validation
- ❌ Don't use boilerplate descriptions that just restate field names

## Deliverables

1. **Enhanced Documentation**: All 14 schema files + shared schema updated
2. **Validation Notes**: Document any schema discrepancies found
3. **Examples Documentation**: Note key examples extracted from actual data
4. **Feedback**: Identify any PRD guidelines that need refinement

## Questions to Answer

As you work, note:
- Are PRD guidelines clear and actionable?
- Are word count guidelines appropriate?
- Are there edge cases not covered in PRD?
- Does the preferred format work for all field types?

## Start Here

1. Read the PRD: `documentation-project/zod-schema-documentation-prd.md`
2. Read the detailed plan: `documentation-project/zod-schema-implementation-plan-wsf-vessels.md`
3. Start with shared schema: `src/apis/wsf-vessels/shared/vesselBase.ts`
4. Work through endpoint groups alphabetically
5. Validate each schema against actual API data before documenting

Good luck! This dry-run will help refine the PRD before full implementation.

