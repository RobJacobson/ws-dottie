# Zod Schema Documentation Implementation Plan: wsf-vessels API (Dry-Run)

## Overview

This document provides step-by-step instructions for implementing the Zod Schema Documentation Enhancement PRD for the `wsf-vessels` API as a dry-run. This will serve as a test case to validate the PRD guidelines before full implementation across all APIs.

## Scope

**Endpoint Groups to Document:**
1. `cacheFlushDate` - Cache flush date endpoint
2. `vesselAccommodations` - Vessel accommodation details
3. `vesselBasics` - Basic vessel information
4. `vesselHistories` - Vessel history records
5. `vesselLocations` - Real-time vessel location data
6. `vesselStats` - Vessel technical specifications
7. `vesselVerbose` - Comprehensive vessel information

**Files to Update:**
- `src/apis/wsf-vessels/cacheFlushDate/cacheFlushDate.input.ts`
- `src/apis/wsf-vessels/cacheFlushDate/cacheFlushDate.output.ts`
- `src/apis/wsf-vessels/vesselAccommodations/vesselAccommodations.input.ts`
- `src/apis/wsf-vessels/vesselAccommodations/vesselAccommodations.output.ts`
- `src/apis/wsf-vessels/vesselBasics/vesselBasics.input.ts`
- `src/apis/wsf-vessels/vesselBasics/vesselBasics.output.ts`
- `src/apis/wsf-vessels/vesselHistories/vesselHistories.input.ts`
- `src/apis/wsf-vessels/vesselHistories/vesselHistories.output.ts`
- `src/apis/wsf-vessels/vesselLocations/vesselLocations.input.ts`
- `src/apis/wsf-vessels/vesselLocations/vesselLocations.output.ts`
- `src/apis/wsf-vessels/vesselStats/vesselStats.input.ts`
- `src/apis/wsf-vessels/vesselStats/vesselStats.output.ts`
- `src/apis/wsf-vessels/vesselVerbose/vesselVerbose.input.ts`
- `src/apis/wsf-vessels/vesselVerbose/vesselVerbose.output.ts`
- `src/apis/wsf-vessels/shared/vesselBase.ts` (shared schema)

## Implementation Process

### Phase 1: Data Retrieval and Analysis

For each endpoint group, follow these steps:

#### Step 1.1: Retrieve Sample Data

Execute fetch-dottie commands to retrieve actual API responses:

```bash
# Cache flush date
npx fetch-dottie wsf-vessels:getCacheFlushDate --limit 10

# Vessel accommodations (all vessels)
npx fetch-dottie wsf-vessels:getVesselAccommodations --limit 10

# Vessel accommodations (specific vessel)
npx fetch-dottie wsf-vessels:getVesselAccommodationsByVesselId --limit 10

# Vessel basics (all vessels)
npx fetch-dottie wsf-vessels:getVesselBasics --limit 10

# Vessel basics (specific vessel)
npx fetch-dottie wsf-vessels:getVesselBasicsByVesselId --limit 10

# Vessel histories (all)
npx fetch-dottie wsf-vessels:getVesselHistories --limit 10

# Vessel histories (with filters)
npx fetch-dottie wsf-vessels:getVesselHistoriesByVesselNameAndDateRange --limit 10

# Vessel locations (all vessels)
npx fetch-dottie wsf-vessels:getVesselLocations --limit 10

# Vessel locations (specific vessel)
npx fetch-dottie wsf-vessels:getVesselLocationsByVesselId --limit 10

# Vessel stats (all vessels)
npx fetch-dottie wsf-vessels:getVesselStats --limit 10

# Vessel stats (specific vessel)
npx fetch-dottie wsf-vessels:getVesselStatsByVesselId --limit 10

# Vessel verbose (all vessels)
npx fetch-dottie wsf-vessels:getVesselsVerbose --limit 10

# Vessel verbose (specific vessel)
npx fetch-dottie wsf-vessels:getVesselsVerboseByVesselId --limit 10
```

#### Step 1.2: Analyze Sample Data

For each endpoint's response data:

1. **Extract Concrete Examples:**
   - Identify real values from responses (e.g., vessel IDs, names, coordinates)
   - Note specific examples that represent typical use cases
   - Capture multiple examples showing different scenarios (e.g., docked vs. in-transit vessels)

2. **Identify Edge Cases:**
   - Look for null values - when do they occur?
   - Look for magic values (e.g., -1, 0 with special meaning)
   - Check for empty arrays vs. null arrays
   - Note any fields that are sometimes missing
   - Identify fields that differ from official documentation

3. **Document Findings:**
   - Create a temporary analysis file with key examples
   - Note discrepancies between schema and actual data
   - List edge cases that need documentation

#### Step 1.3: Validate Schemas Against Data

For each schema file:

1. **Check Null Handling:**
   - Verify `.nullable()` is present for fields that return null
   - Verify `.nullable()` is NOT present for fields that never return null
   - Document when null values occur (business conditions)

2. **Check Optional Fields:**
   - Verify `.optional()` matches fields that may be absent
   - Check if any required fields are actually optional in responses

3. **Check Types:**
   - Verify number vs. string types match actual data
   - Check enum/union values match actual responses
   - Verify array types match actual structure

4. **Document Schema Corrections:**
   - List any schema changes needed (but don't make them yet - focus on documentation first)
   - Note these for potential follow-up fixes

### Phase 2: Documentation Enhancement

For each endpoint group, enhance documentation in this order:

#### Priority Order:
1. Shared schemas first (`vesselBase.ts`)
2. Simple endpoints (cacheFlushDate)
3. Basic endpoints (vesselBasics)
4. Complex endpoints (vesselLocations, vesselVerbose)
5. Remaining endpoints

#### Step 2.1: Schema-Level Descriptions

For each schema (input and output):

1. **Input Schemas:**
   - Format: "[Action verb] [resource/operation] [optional: scope], returning [output description]. [Optional: when to use]."
   - Include concrete examples from actual API responses
   - Keep within 25-75 words

2. **Output Schemas:**
   - Format: "Represents [data category] containing [key field categories], with [optional: characteristics]. E.g., [concrete example]. [Business purpose]. [Optional: update frequency]."
   - Include concrete examples from actual API responses
   - Keep within 25-75 words

#### Step 2.2: Field-Level Descriptions

For each field in each schema:

1. **Select Appropriate Template:**
   - Template 1: Simple identifier/name fields
   - Template 2: Fields with multiple examples
   - Template 3: Complex fields with context
   - Template 4: Enum/union fields
   - Template 5: Nullable/optional fields

2. **Write Description:**
   - Use format: "[Description], as a [business unit type]. E.g., '[example]' for [context]."
   - Extract examples from actual API responses
   - Use business unit types (not data types)
   - Document null conditions for nullable fields
   - Document magic values if present
   - Keep within 15-40 words (up to 60 for complex)

3. **Validate:**
   - All examples come from actual API data
   - Business context is clear
   - No boilerplate restatements
   - Consistent with related schemas

### Phase 3: Endpoint-by-Endpoint Instructions

#### Endpoint Group 1: cacheFlushDate

**Files:**
- `cacheFlushDate.input.ts`
- `cacheFlushDate.output.ts`

**Steps:**
1. Retrieve data: `npx fetch-dottie wsf-vessels:getCacheFlushDate --limit 10`
2. Analyze the response structure and date format
3. Update schema-level descriptions
4. Update field descriptions (likely simple - cache flush date is straightforward)
5. Validate null handling

**Expected Complexity:** Low - simple date field

#### Endpoint Group 2: vesselAccommodations

**Files:**
- `vesselAccommodations.input.ts`
- `vesselAccommodations.output.ts`

**Steps:**
1. Retrieve data for both endpoints (all vessels and by ID)
2. Analyze accommodation data structure
3. Note any boolean flags, amenities, accessibility features
4. Update schema-level descriptions with business context (amenities, accessibility)
5. Update field descriptions - focus on what accommodations mean for passengers
6. Validate nullable fields (e.g., are some amenities optional?)

**Expected Complexity:** Medium - multiple accommodation fields

#### Endpoint Group 3: vesselBasics

**Files:**
- `vesselBasics.input.ts`
- `vesselBasics.output.ts`
- `shared/vesselBase.ts` (update this first!)

**Steps:**
1. **Start with shared schema:** Update `vesselBase.ts` first since other schemas extend it
2. Retrieve data for both endpoints
3. Analyze vessel identification, class information, status
4. Update shared `vesselBase.ts` schema descriptions
5. Update `vesselBasics` schema-level descriptions
6. Update field descriptions - focus on identification and operational status
7. Pay special attention to Status enum (1=In Service, 2=Maintenance, 3=Out of Service)
8. Validate nullable fields

**Expected Complexity:** Medium - extends shared schema, has enum

#### Endpoint Group 4: vesselHistories

**Files:**
- `vesselHistories.input.ts`
- `vesselHistories.output.ts`

**Steps:**
1. Retrieve data for both endpoints (with and without date filters)
2. Analyze history record structure - departures, arrivals, ETAs
3. Note date/time fields and their formats
4. Update schema-level descriptions - focus on historical tracking
5. Update field descriptions - focus on departure/arrival times, terminal relationships
6. Validate nullable date fields (when do they occur?)

**Expected Complexity:** Medium - multiple date fields, historical data

#### Endpoint Group 5: vesselLocations

**Files:**
- `vesselLocations.input.ts`
- `vesselLocations.output.ts`

**Steps:**
1. Retrieve data for both endpoints
2. Analyze location data - GPS coordinates, terminal assignments, ETA calculations
3. **Critical:** Look for vessels in different states:
   - Docked vessels (AtDock=true, ETA=null)
   - In-transit vessels (AtDock=false, ETA present)
   - Out of service vessels
4. Update schema-level descriptions - focus on real-time tracking
5. Update field descriptions with concrete examples:
   - GPS coordinates with actual values
   - Terminal names and abbreviations
   - ETA calculations (when present vs. null)
   - Speed/heading with real examples
6. Document nullable fields extensively (Eta, EtaBasis, LeftDock, ScheduledDeparture)
7. Document magic values if any (e.g., speed=0 when docked)

**Expected Complexity:** High - many nullable fields, complex state logic

#### Endpoint Group 6: vesselStats

**Files:**
- `vesselStats.input.ts`
- `vesselStats.output.ts`

**Steps:**
1. Retrieve data for both endpoints
2. Analyze technical specifications - dimensions, capacity, speed, build details
3. Note measurement units (feet, inches, knots, etc.)
4. Update schema-level descriptions - focus on technical specifications
5. Update field descriptions with units:
   - Dimensions (feet/inches)
   - Speed (knots)
   - Capacity (passengers, vehicles)
   - Build information (year, city)
6. Validate nullable fields (e.g., historical information)

**Expected Complexity:** Medium-High - technical specifications, various units

#### Endpoint Group 7: vesselVerbose

**Files:**
- `vesselVerbose.input.ts`
- `vesselVerbose.output.ts`

**Steps:**
1. Retrieve data for both endpoints
2. Analyze comprehensive vessel data - this combines information from multiple sources
3. Note which fields come from which endpoints (basics, stats, accommodations, etc.)
4. Update schema-level descriptions - focus on comprehensive information
5. Update field descriptions - reference related endpoints where appropriate
6. Validate nullable fields - some verbose fields may aggregate optional data

**Expected Complexity:** High - comprehensive schema, references multiple data sources

### Phase 4: Quality Assurance

#### Step 4.1: Consistency Check

1. **Terminology:**
   - Verify consistent use of terms (e.g., "vessel" vs. "ferry")
   - Check consistent business unit types
   - Verify consistent example formats

2. **Related Schemas:**
   - Ensure `vesselBase` descriptions align with extensions
   - Check that shared concepts use same terminology
   - Verify cross-references are accurate

#### Step 4.2: Validation

1. **Word Counts:**
   - Verify all descriptions within guidelines
   - Schema-level: 25-75 words
   - Field-level: 15-40 words (up to 60 for complex)

2. **Example Quality:**
   - All examples from actual API responses
   - Examples are specific and contextualized
   - Multiple examples where helpful

3. **Edge Cases:**
   - Null values documented
   - Magic values documented
   - Conditional behavior explained

#### Step 4.3: Format Compliance

1. **Preferred Format:**
   - All descriptions follow: "[Description], as a [business unit type]. E.g., '[example]'"
   - Business unit types used (not data types)
   - UTC datetime used (not "timestamp" or "ISO 8601")

2. **Template Usage:**
   - Appropriate templates selected for field complexity
   - Nullable fields use Template 5
   - Enum fields use Template 4

## Success Criteria

### Documentation Quality

- [ ] All schema-level descriptions include concrete examples from actual API responses
- [ ] All field descriptions follow preferred format
- [ ] All examples extracted from fetch-dottie data
- [ ] Business context included in all descriptions
- [ ] Null values documented with business conditions
- [ ] Magic values documented if present
- [ ] Word counts within guidelines
- [ ] Consistent terminology across all schemas

### Schema Validation

- [ ] All schemas validated against actual API responses
- [ ] Nullable fields correctly marked
- [ ] Optional fields correctly marked
- [ ] Types match actual data
- [ ] Discrepancies documented

### Consistency

- [ ] Shared schema (`vesselBase`) documented first
- [ ] Related schemas use consistent terminology
- [ ] Business unit types used consistently
- [ ] Example formats consistent

## Deliverables

1. **Enhanced Documentation:**
   - All 14 schema files updated with standardized descriptions
   - Shared schema (`vesselBase.ts`) enhanced
   - All descriptions follow PRD guidelines

2. **Validation Report:**
   - List of schema discrepancies found
   - Edge cases documented
   - Recommendations for schema corrections

3. **Examples File:**
   - Documented examples extracted from actual API responses
   - Edge case examples documented

4. **Quality Checklist:**
   - Completed quality checklist for each endpoint group
   - Consistency verification results

## Notes for Implementation Agent

1. **This is a dry-run** - focus on documentation quality, not schema fixes
2. **Document schema issues** but don't fix them yet (unless critical)
3. **Use actual API data** - never make up examples
4. **Follow PRD exactly** - this validates the PRD guidelines
5. **Ask questions** if PRD guidelines are unclear or contradictory
6. **Process alphabetically** - work through endpoint groups in order
7. **Don't skip validation** - ensure all schemas checked against actual data

## Questions to Resolve During Implementation

1. Are there any fields where the PRD format doesn't work well?
2. Are word count guidelines appropriate for all field types?
3. Are there patterns that should be added to templates?
4. What edge cases appear that aren't covered in PRD?
5. Are there terminology inconsistencies that need standardization?

This dry-run will inform refinements to the PRD before full implementation across all APIs.

