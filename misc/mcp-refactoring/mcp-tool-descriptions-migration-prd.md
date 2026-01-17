# PRD: Migrate `inputsHighlights` to Array Format Across All APIs

This PRD describes the systematic migration of all `inputsHighlights` fields in `ws-dottie` from the current single-string format to the new array format with "FieldName: description" structure.

You (the implementing agent) will systematically update all endpoint files across all APIs.

---

## Background

`ws-dottie-mcp` currently uses a mixed approach for `inputsHighlights`:
- Some tools use semicolon-separated strings: `"TripDate (YYYY-MM-DD); TerminalID (from fetchTerminalsAndMates → TerminalID)"`
- Some tools use single descriptions: `"VesselID (get it from fetchVesselBasics → VesselID)"`
- Some tools use `"none"`

This creates inconsistency and makes maintenance harder. We want to standardize on:
- Array format: `inputs: ["FieldName: description", "FieldName: description"]`
- "FieldName: description" structure for consistency with `outputHighlights`
- Empty array `[]` for tools with no inputs

---

## References (read first)

- **Updated style guide**: `./mcp-tool-descriptions-style-guide.md` (shows the new array format)
- **Migration examples**: See examples in the style guide for the new "FieldName: description" format
- **Type definition**: `src/apis/types.ts` → `ToolDescription.inputsHighlights?: string[]`

---

## Goals

For every endpoint in `ws-dottie` (each `EndpointMeta` object):

1. Convert `inputsHighlights` from string to string array
2. Use "FieldName: description" format for each input field
3. Maintain all existing information while improving consistency
4. Ensure descriptions remain within token budgets

Success is measured by: all endpoints compile successfully, descriptions remain informative, and the codebase is more maintainable.

---

## Non-goals

- Do **not** change endpoint behavior, URLs, schemas, or caching
- Do **not** remove or add information to descriptions
- Do **not** change other parts of `toolDescription` objects
- Do **not** restructure how tools are grouped/registered in `ws-dottie-mcp`

---

## Deliverable

For each `EndpointMeta` object with `inputsHighlights`, convert it to the new array format.

The final output should compile cleanly and keep existing endpoint behavior unchanged.

---

## Migration Rules

### General Rules
- **Convert single strings to arrays**: `"field (description)"` → `["field: description"]`
- **Split semicolon-separated strings**: `"field1 (desc1); field2 (desc2)"` → `["field1: desc1", "field2: desc2"]`
- **Convert "none" to empty array**: `"none"` → `[]`
- **Preserve all existing information**: Don't remove any details from current descriptions
- **Field name**: Change `inputsHighlights` to `inputs` in the object

### FieldName: Description Format
Each array item must follow: `"FieldName: description"`

**FieldName** (exact rules):
- Use the exact parameter name from the Zod input schema
- Maintain exact casing (e.g., `VesselID`, `TripDate`, `DateStart`)

**Description** (content rules):
- Include data type/format when non-obvious (e.g., "YYYY-MM-DD format", "numeric ID")
- Include source guidance for IDs (e.g., "from fetchVesselBasics → VesselID")
- Include constraints (e.g., "must be within valid date range")
- Keep descriptions concise but complete

### Examples

**Before → After:**

```typescript
// Single field with source
inputsHighlights: "VesselID (get it from fetchVesselBasics → VesselID)"
// →
inputs: ["VesselID: numeric ID from fetchVesselBasics → VesselID"]

// Multiple fields, semicolon separated
inputsHighlights: "TripDate (YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range); DepartingTerminalID, ArrivingTerminalID (from fetchTerminalsAndMates → TerminalID)"
// →
inputs: [
  "TripDate: YYYY-MM-DD format, from fetchScheduleValidDateRange → valid date range",
  "DepartingTerminalID: from fetchTerminalsAndMates → TerminalID",
  "ArrivingTerminalID: from fetchTerminalsAndMates → TerminalID"
]

// Date fields
inputsHighlights: "FromDate, ToDate in YYYY-MM-DD format"
// →
inputs: [
  "FromDate: YYYY-MM-DD format",
  "ToDate: YYYY-MM-DD format"
]

// No inputs
inputsHighlights: "none"
// →
inputs: []
```

---

## Implementation Workflow

### Step 1: Find all endpoints with inputsHighlights
Use this command to find all files that need updating:
```bash
find src/apis -name "*.ts" -exec grep -l "inputsHighlights:" {} \;
```

This will give you ~88 files across all APIs that need to be migrated from `inputsHighlights` to `inputs`.

### Step 2: Process each API systematically
Process one API at a time to maintain consistency:

1. **wsf-vessels** (4 files with inputs)
2. **wsf-schedule** (12 files with inputs)  
3. **wsf-terminals** (8 files with inputs)
4. **wsf-fares** (6 files with inputs)
5. **wsdot-toll-rates** (5 files with inputs)
6. **wsdot-highway-alerts** (8 files with inputs)
7. **wsdot-bridge-clearances** (2 files with inputs)
8. **wsdot-commercial-vehicle-restrictions** (2 files with inputs)
9. **wsdot-traffic-flow** (2 files with inputs)
10. **wsdot-travel-times** (2 files with inputs)
11. **wsdot-highway-cameras** (3 files with inputs)
12. **wsdot-mountain-pass-conditions** (2 files with inputs)
13. **wsdot-weather-information** (4 files with inputs)
14. **wsdot-border-crossings** (1 file with inputs)

### Step 3: For each endpoint file

1. **Read the current inputsHighlights**
2. **Check the input schema** to confirm field names and types
3. **Convert to array format** following the rules above
4. **Verify the conversion** makes sense and preserves information
5. **Test compilation** to ensure no syntax errors

### Step 4: Quality checks
- All descriptions follow "FieldName: description" format
- Field names match the Zod schema exactly
- All existing information is preserved
- Descriptions remain concise (under 5 items per array)
- No tools exceed the updated budget limits

---

## Research Requirements

For each endpoint, validate:

1. **Input schema** (`*.input.ts`): Confirm exact field names and types
2. **Current description**: Ensure no information is lost in conversion
3. **Compilation**: Each file must compile after changes

---

## Acceptance Criteria

For each endpoint file:

- `inputsHighlights` field is renamed to `inputs`
- `inputs` is now a `string[]` (not `string`)
- Each array item follows "FieldName: description" format
- Field names match Zod schema exactly
- All existing descriptive information is preserved
- Tools with no inputs use empty array `[]`
- File compiles successfully
- No behavior changes to endpoints

### Completion Checklist
- [ ] All 88+ files with `inputsHighlights` migrated to `inputs`
- [ ] All files compile successfully
- [ ] No information lost in conversions
- [ ] Style guide updated to reflect `inputs` field name
- [ ] Type definition updated in `types.ts`
- [ ] Test suite passes (if applicable)

---

## Implementation Notes

- **Work systematically**: Process one API at a time to avoid overwhelming changes
- **Preserve intent**: If current descriptions have specific phrasing that adds value, keep it
- **Be consistent**: Use the same description patterns across similar fields
- **Test as you go**: Compile frequently to catch syntax errors early
- **Commit regularly**: Make small, focused commits for each API

---

## Risk Mitigation

- **Backup current descriptions**: Keep the original strings commented for reference
- **Compile after each API**: Catch type errors immediately
- **Review complex conversions**: For endpoints with complex input descriptions, double-check the conversion

---

## Success Metrics

- **Completion**: 100% of endpoint files migrated (88+ files)
- **Quality**: 0 information loss, all descriptions remain clear and complete
- **Consistency**: All `inputs` follow the new array format with "FieldName: description" structure
- **Maintainability**: Future changes to input descriptions are easier to make