# PRD: Zod Schema Validation Against Official WSDOT/WSF API Specifications

## Executive Summary

This PRD establishes a systematic validation process to ensure our Zod schemas accurately represent the official WSDOT and WSF REST API contracts. The validation process involves three critical comparisons:

1. **Official Documentation Review**: Compare schemas against published API specifications
2. **Actual API Response Validation**: Test endpoints with curl to verify real-world behavior
3. **Schema Accuracy Verification**: Ensure our schemas handle all documented fields correctly

**Key Principle**: Our schemas must be the single source of truth for API contracts, accurately reflecting both official documentation and actual API behavior while maintaining proper date handling and type safety.

## Background & Context

### Current State
- WSDOT/WSF APIs provide REST endpoints returning JSON data
- Our schemas use Zod for runtime validation and TypeScript type generation
- Date conversion logic exists in `zodFetch` to handle WSDOT .NET dates and WSF date formats
- Schemas should accept JS Date objects as input and return JS Date objects for date fields

### Problem Statement
Potential schema drift from official specifications can lead to:
- **Validation failures** for valid API responses
- **Type mismatches** between expected and actual data structures
- **Date handling errors** due to incorrect field type assumptions
- **Integration failures** when external consumers encounter unexpected validation errors

### Solution
Implement a comprehensive validation process that:
- Reviews official API documentation for each endpoint
- Tests actual API responses using curl with valid parameters
- Compares both sources against our current Zod schemas
- Identifies and resolves any discrepancies
- Ensures date handling follows established patterns

## Validation Scope

### WSDOT APIs (12 total)
1. Border Crossings
2. Bridge Clearances
3. Commercial Vehicle Restrictions
4. Highway Alerts
5. Highway Cameras
6. Mountain Pass Conditions
7. Toll Rates
8. Traffic Flow
9. Travel Times
10. Weather Information
11. Weather Information Extended
12. Weather Stations

### WSF APIs (4 total)
1. Fares
2. Schedule
3. Terminals
4. Vessels

### Validation Depth
- **Input schemas**: Parameter validation and type checking
- **Output schemas**: Response structure and field validation
- **Date handling**: Proper JS Date object input/output
- **Field types**: Accurate representation of API data types
- **Required vs optional**: Correct field requirement specifications

## Validation Process

### Phase 1: Official Documentation Review

#### 1.1 Documentation Source Hierarchy (CRITICAL)
**Single Source of Truth for Documentation**: "Docs" Column  
**Single Source of Truth for Reality**: Curl Results

**Primary Documentation Source**: Abstract API Documentation ("Docs" column)
- **Source**: [WSDOT Traffic API](https://wsdot.wa.gov/traffic/api/)
- **Focus**: Abstract API definitions, class definitions, function signatures
- **Examples**: [Highway Alerts Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html)
- **Purpose**: Authoritative for API structure, parameters, and return types
- **Translation**: Cleaner, more schema-like structure for Zod translation

**Secondary Documentation Source**: REST Endpoint Pages
- **Source**: REST endpoint `/Help` pages (e.g., `/BorderCrossingsREST.svc/Help`)
- **Focus**: XML schemas with `nillable="true"` specifications
- **Purpose**: Provide nullability hints when abstract docs don't specify
- **Usage**: Reference only for nullability information

**Reality Validation Source**: Curl Results
- **Source**: Actual API responses using `curl` commands
- **Focus**: Real data types, actual null vs empty string behavior
- **Purpose**: Authoritative for actual field types and nullability
- **Priority**: When docs and reality differ, reality wins for field types

#### 1.2 Discrepancy Resolution Process
When documentation sources conflict:
1. **Stop and analyze** which source is more correct
2. **Abstract docs** are authoritative for API structure and parameters
3. **Curl results** are authoritative for actual data types and nullability
4. **XML schemas** provide additional nullability hints when needed

**Resolution Rules**:
- **Structure conflicts**: Abstract docs win
- **Type conflicts**: Curl results win
- **Nullability conflicts**: XML schemas provide hints, curl results confirm

#### 1.3 WSDOT API Documentation
- **Source**: [WSDOT Traffic API](https://wsdot.wa.gov/traffic/api/)
- **Focus**: REST column endpoints only (not WSDL/SOAP)
- **Documentation**: [WSDOT API Documentation Index](https://wsdot.wa.gov/traffic/api/Documentation/)

#### 1.2 WSF API Documentation
- **Fares**: [WSF Fares REST API](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html)
- **Schedule**: [WSF Schedule REST API](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html)
- **Terminals**: [WSF Terminals REST API](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html)
- **Vessels**: [WSF Vessels REST API](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html)

#### 1.3 Documentation Review Checklist
- [ ] Endpoint URL patterns match our schemas
- [ ] Required vs optional parameters correctly specified
- [ ] Parameter types and constraints documented
- [ ] Response structure and field definitions clear
- [ ] Date format requirements specified
- [ ] Authentication requirements documented

### Phase 2: Actual API Response Validation

#### 2.1 Curl Testing Setup
```bash
# Environment variable for API access
export WSDOT_ACCESS_TOKEN="your_access_token_here"

# Example curl command for WSDOT endpoint
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"

# Example curl command for WSF endpoint
curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbulletins/7?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```
Please match this exact casing. The APIs fail with incorrect casing for the tokenquery parameter.


#### 2.2 Valid Input Parameters
- **Dates**: Use dates within valid ranges (usually near future)
- **IDs**: Use valid RouteIDs, VesselIDs, TerminalIDs from our e2e test configurations
- **Parameters**: Follow documented parameter requirements

#### 2.3 Response Analysis
- **Structure**: Document actual response structure
- **Field types**: Note actual data types returned
- **Nullable fields**: Identify fields that can be `null` vs truly missing
- **Undocumented fields**: Identify fields not in official documentation
- **Date formats**: Verify actual date format returned
- **Error responses**: Document error handling patterns

### Phase 3: Schema Comparison & Validation

#### 3.1 Input Schema Validation
- [ ] Parameter names match official specification exactly
- [ ] Parameter types are correct (string, number, boolean, date)
- [ ] Required vs optional parameters correctly marked
- [ ] Parameter constraints match documented requirements
- [ ] Date parameters accept JS Date objects

#### 3.2 Nullability Analysis (CRITICAL)
- [ ] **Reliable indicators identified**: `nillable="true"` from XML schemas, `?` from abstract docs
- [ ] **Unreliable indicators ignored**: `minOccurs="0"` from WSDOT XML schemas (systematic misconfiguration)
- [ ] **Evidence-based decisions**: Only mark fields as nullable when there's clear documented evidence
- [ ] **Developer burden considered**: Avoid unnecessary null checks that reduce type safety

#### 3.2 Output Schema Validation
- [ ] All documented fields are present in schema
- [ ] Field types match actual API responses
- [ ] Required vs optional fields correctly marked
- [ ] **Nullable fields correctly marked** (critical for production safety)
- [ ] **Schema types updated only** (add `.nullable()`, don't modify descriptions)
- [ ] **Documentation priority respected** (use `.nullable()` when docs specify `nillable="true"`)
- [ ] **Nullability based on reliable indicators only** (ignore `minOccurs="0"` from WSDOT XML schemas)
- [ ] Date fields return JS Date objects
- [ ] No undocumented fields included in schema
- [ ] Field names exactly match API specification

#### 3.3 Date Handling Validation
- [ ] Input date parameters use `z.date()` schemas
- [ ] Output date fields use appropriate date utility functions
- [ ] Date conversion logic exists in `zodFetch`, not in schemas
- [ ] JS Date objects are returned for all date fields

## Validation Criteria

### Schema Accuracy Requirements

#### 1. Documentation Source Hierarchy
- **✅ REQUIRED**: Use abstract API documentation ("Docs" column) as primary source
- **✅ REQUIRED**: Use curl results as authoritative for actual data types
- **✅ REQUIRED**: Use XML schemas only for nullability hints when needed
- **⚠️ CRITICAL**: When sources conflict, stop and analyze which is more correct

#### 2. Field Coverage
- **✅ REQUIRED**: All fields documented in official specification
- **❌ FORBIDDEN**: Undocumented fields returned by API
- **⚠️ NOTE**: Fields not in official docs should be ignored

#### 2. Type Accuracy
- **✅ REQUIRED**: Field types match actual API responses
- **⚠️ WARNING**: Official docs may be incorrect (follow actual data)
- **🔄 UPDATE**: Schemas should reflect real API behavior

#### 3. Nullability Determination (CRITICAL)
- **✅ REQUIRED**: Use `nillable="true"` from XML schemas as authoritative
- **✅ REQUIRED**: Use `?` indicators from abstract documentation as authoritative
- **❌ FORBIDDEN**: Use `minOccurs="0"` to determine nullability (WSDOT misconfiguration)
- **⚠️ WARNING**: WSDOT XML schemas systematically mark all fields as `minOccurs="0"` regardless of actual requirements
- **🔄 UPDATE**: Only mark fields as nullable when there's clear documented evidence (`nillable="true"` or `?`)

#### 3. Date Handling
- **✅ REQUIRED**: Input schemas accept JS Date objects
- **✅ REQUIRED**: Output schemas return JS Date objects
- **❌ FORBIDDEN**: Date conversion logic in individual schemas
- **✅ REQUIRED**: Date conversion handled by `zodFetch`

#### 4. Field Requirements
- **✅ REQUIRED**: Required vs optional correctly specified
- **✅ REQUIRED**: Field names exactly match API specification
- **✅ REQUIRED**: No additional constraints beyond official spec
- **✅ REQUIRED**: Nullable fields correctly marked (critical for production safety)

### Known Issues & Exceptions

#### 1. WSDOT Documentation Discrepancies
- **Issue**: Some endpoints return numbers instead of documented strings
- **Action**: Follow actual API response, not documentation
- **Example**: Enumeration fields may return numeric values

#### 2. Undocumented Fields
- **Issue**: APIs return fields not in official documentation
- **Action**: Ignore these fields, do not include in schemas
- **Rationale**: Maintain schema accuracy based on official contracts

#### 3. Date Format Variations
- **WSDOT/WSF outputs**: Usually .NET date format `/Date(timestamp)/`
- **WSDOT/WSF inputs**: Usually MM-DD-YYYY or YYYY-MM-DD format
- **Our Schemas**: Always JS Date objects for input/output

#### 4. API Behavior vs Documentation Discrepancies
- **Issue**: Some APIs return empty strings `""` instead of `null` for fields marked as `nillable="true"`
- **Action**: Always follow official documentation - use `.nullable()` when docs specify `nillable="true"`
- **Example**: WSDOT Highway Alerts API returns `ExtendedDescription: ""` but docs say `nillable="true"`
- **Rationale**: Better to be safe than sorry - clients should handle both `null` and empty strings

#### 5. WSDOT XML Schema `minOccurs="0"` Misconfiguration
- **Issue**: WSDOT XML schemas systematically mark ALL fields as `minOccurs="0"` regardless of actual requirements
- **Evidence**: Primary identifiers (AlertID, StationID) and core fields (Time, Latitude) marked as optional but are always present
- **Action**: **IGNORE** `minOccurs="0"` when determining field nullability - use only `nillable="true"` and `?` indicators
- **Example**: Highway Alerts API shows `minOccurs="0"` for AlertID (always present) but `DateTime?` for EndTime (nullable)
- **Rationale**: Prevents unnecessary null checks that burden developers and reduce type safety

#### 5. Nullable Field Validation (CRITICAL)
- **Issue**: Official documentation may mark fields as "optional" but API can return `null` values
- **Action**: Use curl testing to identify fields that can be `null` in actual responses
- **Risk**: Marking nullable fields as required will cause validation failures in production
- **Example**: WSDOT Border Crossings API returns `"BorderCrossingLocation": null` for some crossings
- **Validation**: Always test with curl to verify which fields can be `null` vs truly missing
- **Implementation**: Only change schema types (add `.nullable()`), do not modify field descriptions
- **Documentation Priority**: When official docs specify `nillable="true"`, always use `.nullable()` regardless of current API behavior
- **Safety First**: It's better to be safe than sorry - clients should handle both `null` and empty strings for nullable fields

#### 6. WSDOT XML Schema Reliability Issues (CRITICAL DISCOVERY)
- **Issue**: WSDOT XML schemas systematically use `minOccurs="0"` for ALL fields, making this attribute unreliable
- **Evidence**: Primary identifiers (AlertID, StationID, FlowDataID) and core data fields (Time, Latitude, Longitude) marked as `minOccurs="0"` but are always present
- **Action**: **IGNORE** `minOccurs="0"` when determining field nullability - it appears to be a misconfiguration
- **Reliable Indicators**: Use only `nillable="true"` and `?` indicators in abstract documentation
- **Example**: Highway Alerts API shows `minOccurs="0"` for AlertID (always present) but `DateTime?` for EndTime (nullable)
- **Rationale**: Prevents unnecessary null checks that burden developers and reduce type safety

### 5. Documentation vs API Behavior Priority (CRITICAL)
- **Principle**: Official documentation is the authoritative contract, not current API behavior
- **Rule**: When official docs specify `nillable="true"`, always use `.nullable()` in schemas
- **Rationale**: API behavior may change, edge cases may exist, and clients need to be prepared
- **Example**: WSDOT Highway Alerts API docs say `ExtendedDescription` is `nillable="true"`, so schema uses `.nullable()` even though current API returns `""`
- **Client Safety**: Forces clients to handle both `null` and empty string cases, preventing production failures
- **Future-Proofing**: Protects against API behavior changes that might introduce actual `null` values

## Date Conversion Architecture

### **CRITICAL**: Understanding Our Date Handling System

Our system implements a **two-way date conversion layer** that handles the transformation between JavaScript Date objects (our interface) and the various date formats expected by WSDOT/WSF APIs. This conversion happens automatically in `zodFetch`, not in individual schemas.

### 1. Input Date Conversion: JS Date → API String Format

#### How It Works
When a user passes a JavaScript Date object to our API functions, `zodFetch` automatically converts it to the appropriate string format before sending the HTTP request.

#### Implementation Location
**`src/shared/fetching/zodFetch.ts`** - This is the **single source of truth** for date conversion logic.

#### Conversion Patterns by API Type

**WSDOT APIs** (typically expect YYYY-MM-DD format):
```typescript
// User passes JS Date object
const params = { tripDate: new Date('2024-01-15') };

// zodFetch automatically converts to string for URL construction
// Result: /api/endpoint/2024-01-15
```

**WSF APIs** (typically expect MM/DD/YYYY format):
```typescript
// User passes JS Date object
const params = { tripDate: new Date('2024-01-15') };

// zodFetch automatically converts to MM/DD/YYYY format
// Result: /api/endpoint/01/15/2024
```

#### Schema Requirements for Input Dates
**✅ CORRECT**: Use `z.date()` schemas for all date input parameters
```typescript
export const paramsSchema = z.object({
  tripDate: z.date().describe("The trip date for which to retrieve information"),
  startDate: z.date().describe("Start date for the date range"),
  endDate: z.date().describe("End date for the date range")
});
```

**❌ INCORRECT**: Never use string schemas for date inputs
```typescript
// WRONG - Don't do this!
export const wrongSchema = z.object({
  tripDate: z.string().describe("Trip date as string"), // ❌ WRONG!
});
```

### 2. Output Date Conversion: API Response → JS Date Objects

#### How It Works
When WSDOT/WSF APIs return date fields (usually in .NET format), `zodFetch` automatically converts these to JavaScript Date objects before returning the data to the user.

#### Implementation Location
**`src/shared/validation/templates.ts`** - Contains utility functions for parsing different date formats.

#### Available Date Utility Functions

**For WSDOT APIs** (handles .NET date format `/Date(timestamp)/`):
```typescript
import { zWsdotDate } from "@/shared/validation";

export const schema = z.object({
  ReadingTime: zWsdotDate().describe("WSDOT timestamp in .NET format"),
  LastUpdated: zWsdotDate().describe("Last update timestamp")
});
```

**For WSF APIs** (handles MM/DD/YYYY format):
```typescript
import { zWsfDate } from "@/shared/validation";

export const schema = z.object({
  ScheduleDate: zWsfDate().describe("Schedule date in MM/DD/YYYY format"),
  DepartureDate: zWsfDate().describe("Departure date")
});
```

**For nullable date fields**:
```typescript
import { zWsdotNullableDate, zWsfNullableDate } from "@/shared/validation";

export const schema = z.object({
  OptionalDate: zWsdotNullableDate().describe("Optional WSDOT date field"),
  ConditionalDate: zWsfNullableDate().describe("Conditional WSF date field")
});
```

#### Schema Requirements for Output Dates
**✅ CORRECT**: Use appropriate date utility functions for all date output fields
```typescript
export const responseSchema = z.object({
  // WSDOT APIs
  TimeStamp: zWsdotDate().describe("WSDOT timestamp"),
  
  // WSF APIs  
  ScheduleDate: zWsfDate().describe("Schedule date"),
  
  // Nullable dates
  OptionalDate: zWsdotNullableDate().describe("Optional date field")
});
```

**❌ INCORRECT**: Never use raw string schemas for date outputs
```typescript
// WRONG - Don't do this!
export const wrongSchema = z.object({
  TimeStamp: z.string().describe("Timestamp as string"), // ❌ WRONG!
});
```

### 3. Date Conversion Flow Diagram

```
User Input (JS Date) → zodFetch → API Request (String)
                                    ↓
API Response (String) → zodFetch → User Output (JS Date)
```

#### Step-by-Step Process

1. **User calls API function** with JS Date object
2. **zodFetch receives parameters** and validates with Zod schema
3. **Date conversion happens** automatically in zodFetch
4. **HTTP request sent** with converted string format
5. **API response received** with date strings (e.g., .NET format)
6. **Date parsing happens** automatically in zodFetch
7. **User receives data** with JS Date objects for all date fields

### 4. Validation Checklist for Date Handling

#### Input Schema Validation
- [ ] **Date parameters use `z.date()`** schemas (not `z.string()`)
- [ ] **No custom date conversion** logic in individual schemas
- [ ] **Date parameters documented** as accepting JS Date objects
- [ ] **JSDoc examples show** Date object usage

#### Output Schema Validation  
- [ ] **Date fields use appropriate utility functions** (`zWsdotDate`, `zWsfDate`, etc.)
- [ ] **No raw string schemas** for date fields
- [ ] **Date fields documented** as returning JS Date objects
- [ ] **JSDoc examples show** Date object return values

#### Implementation Validation
- [ ] **Date conversion logic exists** in `zodFetch` (not in schemas)
- [ ] **Utility functions imported** from `@/shared/validation`
- [ ] **No manual date parsing** in individual endpoint files
- [ ] **Consistent date handling** across all endpoints

### 5. Common Date Conversion Errors

#### ❌ Error: String Schema for Date Input
```typescript
// WRONG - This will cause type mismatches
export const wrongSchema = z.object({
  tripDate: z.string().describe("Trip date") // ❌ Should be z.date()
});
```

#### ❌ Error: String Schema for Date Output
```typescript
// WRONG - This won't convert API date strings to JS Date objects
export const wrongSchema = z.object({
  timestamp: z.string().describe("Timestamp") // ❌ Should use date utility function
});
```

#### ❌ Error: Custom Date Conversion in Schema
```typescript
// WRONG - Date conversion belongs in zodFetch, not schemas
export const wrongSchema = z.object({
  date: z.string().transform(val => new Date(val)) // ❌ Don't do this!
});
```

#### ✅ Correct: Proper Date Handling
```typescript
// CORRECT - Let zodFetch handle all date conversion
export const correctSchema = z.object({
  // Input: Accepts JS Date objects
  tripDate: z.date().describe("Trip date for the journey"),
  
  // Output: Returns JS Date objects via utility function
  departureTime: zWsdotDate().describe("Departure timestamp"),
  arrivalTime: zWsfDate().describe("Arrival date")
});
```

### 6. Testing Date Handling

#### Input Testing
```typescript
// Test that schemas accept JS Date objects
const validParams = {
  tripDate: new Date('2024-01-15'), // ✅ JS Date object
  startDate: new Date('2024-01-01'), // ✅ JS Date object
  endDate: new Date('2024-01-31')   // ✅ JS Date object
};

// This should work without type errors
const result = await apiFunction(validParams);
```

#### Output Testing
```typescript
// Test that date fields return JS Date objects
const response = await apiFunction(validParams);

// These should be JS Date objects, not strings
console.log(response.departureTime instanceof Date); // ✅ Should be true
console.log(response.arrivalTime instanceof Date);   // ✅ Should be true
```

### 7. Key Principles for Agents

1. **Date conversion is automatic** - Don't implement it in individual schemas
2. **Input schemas use `z.date()`** - Always accept JS Date objects
3. **Output schemas use utility functions** - Always return JS Date objects  
4. **zodFetch handles everything** - It's the single source of truth for date logic
5. **Test with JS Date objects** - Verify both input acceptance and output conversion
6. **Follow established patterns** - Use existing utility functions, don't create new ones

**Remember**: Our date handling system is designed to provide a consistent, type-safe interface where users always work with JavaScript Date objects, while the underlying conversion to/from API formats happens automatically and transparently.

## Implementation Guidelines

### Validation Workflow

#### 1. API Assignment
- User specifies which API to validate
- Agent focuses on single API until completion
- Complete validation before moving to next API

#### 2. Documentation Review
- **Primary**: Fetch abstract API documentation from "Docs" column
- **Secondary**: Review REST endpoint pages for nullability hints
- **Validation**: Use curl results to confirm actual data types
- Document parameter and response requirements from authoritative sources

#### 3. Curl Testing
- Test each endpoint with valid parameters
- Use `$WSDOT_ACCESS_TOKEN` for authentication
- Document actual response structure and types

#### 4. Schema Comparison
- Compare official docs + curl results against schemas
- Identify any discrepancies or mismatches
- Note areas requiring schema updates

#### 5. Report Generation
- Create comprehensive validation report
- Document all findings and recommendations
- Provide specific update requirements

### **CRITICAL SCOPE LIMITATIONS**

#### ❌ FORBIDDEN: Description Modifications
- **Field descriptions are BEYOND SCOPE** of this validation project
- **NEVER modify field descriptions** - they are considered complete and accurate
- **NEVER add nullability comments** like "field can be null" to descriptions
- **NEVER add "Official documentation" references** to descriptions
- **Descriptions should remain exactly as they are** - focus only on schema types
- **Exception**: If fields contain numeric enums, with key/value pairs in the WSDOT/WSF documentation, ask the user. Those enum key/value pairs can be appended to the end of the existing description, subject to approval, to provide better documentation.

#### ✅ ALLOWED: Schema Type Updates Only
- **Add `.nullable()`** when official docs specify `nillable="true"`
- **Update field types** (e.g., `z.string()` → `z.string().nullable()`)
- **Fix type mismatches** between schemas and official documentation
- **Ensure proper date handling** using existing utility functions

#### 🎯 Focus Areas
1. **Type accuracy**: Field types match official specification
2. **Nullability**: Fields marked as nullable when docs require it
3. **Date handling**: Proper use of existing date utility functions
4. **Field coverage**: All documented fields present in schemas
5. **Type safety**: Schemas provide accurate TypeScript types

### Validation Report Template

```markdown
# Schema Validation Report: {API Name}

**Date**: {validation date}
**Agent**: {agent name}
**Status**: {VALIDATED/NEEDS UPDATES/MAJOR ISSUES}

## API Overview
- **Official Documentation**: {link}
- **Total Endpoints**: {number}
- **Authentication Required**: {yes/no}

## Endpoint Validation Summary

### {endpoint-name}
- **Input Schema**: ✅/❌
- **Output Schema**: ✅/❌
- **Date Handling**: ✅/❌
- **Field Coverage**: ✅/❌
- **Status**: {VALIDATED/NEEDS UPDATES/MAJOR ISSUES}

## Discrepancies Found

### {endpoint-name}
- **Issue**: {description}
- **Official Spec**: {what docs say}
- **Actual API**: {what curl returned}
- **Our Schema**: {what we have}
- **Action Required**: {update schema/note discrepancy}

## Schema Updates Required

### {endpoint-name}
- **Before**: {current schema state}
- **After**: {required changes}
- **Reason**: {why change is needed}

## Overall Assessment

**API Status**: {VALIDATED/NEEDS ATTENTION/MAJOR ISSUES}

**Recommendations**:
- {list of specific actions}

**Next Steps**:
- {what should happen next}
```

## Quality Assurance

### Validation Standards

#### 1. Completeness
- **100% endpoint coverage** for assigned API
- **100% field validation** against official specs
- **100% curl response analysis** for each endpoint

#### 2. Accuracy
- **Official documentation compliance** as primary requirement
- **Actual API behavior** as authoritative source
- **Schema precision** matching real-world usage

#### 3. Consistency
- **Date handling patterns** consistent across all schemas
- **Field naming conventions** matching API specifications
- **Type definitions** accurately representing API contracts

### Success Criteria

#### Functional Requirements
- [ ] **All endpoints validated** against official specifications
- [ ] **All field types accurate** based on actual API responses
- [ ] **Date handling consistent** with established patterns
- [ ] **No undocumented fields** included in schemas
- [ ] **Schema updates completed** for any discrepancies found

#### Quality Requirements
- [ ] **Official spec compliance** maintained across all schemas
- [ ] **Real-world validation** confirms schema accuracy
- [ ] **Type safety preserved** for all API interactions
- [ ] **Documentation accuracy** reflects actual API behavior

## Lessons Learned & Best Practices

### **CRITICAL INSIGHTS FROM VALIDATION WORK**

#### 1. Description Modification is Out of Scope
- **Lesson**: Field descriptions are considered complete and accurate
- **Action**: Focus ONLY on schema types, never modify descriptions
- **Rationale**: Descriptions serve different purpose than type validation
- **Example**: Don't add "field can be null" when `.nullable()` already indicates this

#### 2. Nullability Requires Clear Evidence
- **Lesson**: Only use `.nullable()` when there's documented evidence
- **Reliable Indicators**: `nillable="true"` from XML schemas, `?` from abstract docs
- **Unreliable Indicators**: `minOccurs="0"` from WSDOT XML schemas (systematic misconfiguration)
- **Action**: Be evidence-based, not assumption-based

#### 3. API Behavior vs Documentation Priority
- **Lesson**: Official documentation is the authoritative contract
- **Rule**: When docs specify `nillable="true"`, always use `.nullable()`
- **Rationale**: API behavior may change, edge cases may exist
- **Example**: WSDOT APIs may return empty strings now but could return `null` later

#### 4. Type Safety Over Developer Convenience
- **Lesson**: Better to be safe than sorry for production systems
- **Action**: Mark fields as nullable when docs require it, even if current API returns empty strings
- **Rationale**: Prevents runtime errors when API behavior changes
- **Client Safety**: Forces clients to handle both `null` and empty string cases

#### 5. Validation Scope Clarity
- **Lesson**: Clear scope boundaries prevent scope creep
- **Allowed**: Schema type updates, nullability fixes, type mismatches
- **Forbidden**: Description modifications, adding documentation references
- **Result**: Focused, efficient validation process

### **VALIDATION SUCCESS PATTERNS**

#### 1. Systematic Approach
- **Documentation First**: Review official specs before testing
- **Curl Validation**: Test actual API responses for real-world behavior
- **Schema Comparison**: Identify specific discrepancies
- **Targeted Updates**: Fix only what's broken, don't touch what works

#### 2. Evidence-Based Decisions
- **Official Docs**: Primary source for API structure and requirements
- **XML Schemas**: Secondary source for nullability hints only
- **Curl Results**: Validation of actual data types and behavior
- **Resolution Rules**: Clear hierarchy when sources conflict

#### 3. Production Safety Focus
- **Nullability**: Mark fields as nullable when docs require it
- **Type Accuracy**: Ensure schemas match official contracts
- **Future-Proofing**: Protect against API behavior changes
- **Error Prevention**: Prevent runtime validation failures

## Risk Assessment & Mitigation

### Technical Risks

#### 1. API Changes
- **Risk**: Official specifications may have changed
- **Mitigation**: Use curl to verify current API behavior
- **Documentation**: Note any discrepancies between docs and reality

#### 2. Authentication Issues
- **Risk**: Some endpoints may require specific authentication
- **Mitigation**: Document authentication requirements in validation reports
- **Fallback**: Use official documentation when curl fails

#### 3. Rate Limiting
- **Risk**: APIs may have rate limits affecting testing
- **Mitigation**: Space out requests and document any rate limiting
- **Documentation**: Note rate limiting in validation reports

### Project Risks

#### 1. Scope Creep
- **Risk**: Validation may reveal more issues than expected
- **Mitigation**: Focus on one API at a time, complete before moving on
- **Documentation**: Prioritize issues by severity

#### 2. Documentation Gaps
- **Risk**: Official documentation may be incomplete
- **Mitigation**: Use curl responses as the authoritative source
- **Documentation**: Note any gaps in official documentation

## Agent Instructions & Validation Protocol

### **MANDATORY AGENT BEHAVIOR**

#### 1. Scope Adherence
- **ONLY modify schema types** (add `.nullable()`, fix type mismatches)
- **NEVER modify field descriptions** - they are considered complete
- **NEVER add documentation references** to descriptions
- **Focus on type safety and nullability only**

#### 2. Validation Process
- **Start with official documentation** from WSDOT/WSF API sites
- **Test with curl** to verify actual API behavior
- **Compare schemas** against both documentation and reality
- **Update only what's broken** - don't touch working schemas

#### 3. Nullability Rules
- **Use `.nullable()` when**: XML schema shows `nillable="true"` OR abstract docs show `?`
- **Ignore `minOccurs="0"`**: WSDOT XML schemas systematically misconfigure this
- **Be evidence-based**: Only mark fields as nullable with clear documented evidence
- **Production safety first**: Better to be safe than sorry

#### 4. Report Format
- **Status**: VALIDATED/NEEDS UPDATES/MAJOR ISSUES
- **Specific findings**: What's wrong and what needs fixing
- **Action items**: Clear steps for schema updates
- **No description changes**: Focus on types only

### **VALIDATION CHECKLIST FOR AGENTS**

#### Before Starting
- [ ] **Scope understood**: Only schema types, not descriptions
- [ ] **API assigned**: User has specified which API to validate
- [ ] **Documentation ready**: Official API docs accessible

#### During Validation
- [ ] **Official docs reviewed**: API structure and requirements documented
- [ ] **Curl testing done**: Actual API responses verified
- [ ] **Schema comparison**: Discrepancies identified
- [ ] **Type updates planned**: Specific changes needed documented

#### Before Completing
- [ ] **Schema updates made**: Only types modified, descriptions untouched
- [ ] **Nullability fixed**: Fields marked as nullable when docs require it
- [ ] **Report generated**: Clear status and findings documented
- [ ] **Next API ready**: User can proceed to next validation target

## Next Steps

### Immediate Actions
1. **User specifies target API** for validation
2. **Agent begins documentation review** for assigned API
3. **Curl testing initiated** with valid parameters
4. **Schema comparison completed** against both sources

### Long-term Goals
1. **Complete validation** of all 16 WSDOT/WSF APIs
2. **Schema accuracy** maintained at 100%
3. **Documentation alignment** with official specifications
4. **Type safety** preserved across all API interactions

## Conclusion & Key Principles

This validation process ensures our Zod schemas accurately represent the official WSDOT and WSF API contracts while maintaining proper date handling and type safety. By comparing schemas against both official documentation and actual API responses, we can identify and resolve any discrepancies, ensuring our schemas remain the single source of truth for API contracts.

### **CORE VALIDATION PRINCIPLES**

#### 1. **Scope Clarity**
- **ONLY schema types**: Add `.nullable()`, fix type mismatches
- **NEVER descriptions**: Field descriptions are considered complete
- **Focus on safety**: Type accuracy and nullability compliance

#### 2. **Evidence-Based Decisions**
- **Official docs first**: API structure and requirements
- **XML schemas second**: Nullability hints only (`nillable="true"`)
- **Curl validation**: Real-world API behavior confirmation
- **Ignore unreliable indicators**: `minOccurs="0"` from WSDOT schemas

#### 3. **Production Safety Priority**
- **Better safe than sorry**: Mark fields as nullable when docs require it
- **Future-proofing**: Protect against API behavior changes
- **Client safety**: Prevent runtime validation failures
- **Contract compliance**: Follow official API specifications

#### 4. **Efficient Process**
- **One API at a time**: Complete validation before moving on
- **Targeted updates**: Fix only what's broken
- **Clear reporting**: Status, findings, and action items
- **Consistent approach**: All agents follow same protocol

**Key Takeaway**: Schema validation requires both official documentation review and real-world API testing to ensure complete accuracy and compliance, while maintaining strict scope boundaries to prevent unnecessary changes.

## Critical Nullability Guidance Summary

### When to Use `.nullable()` in Schemas

**✅ ALWAYS use `.nullable()` when:**
- XML schema specifies `nillable="true"`
- Abstract documentation shows `?` indicator (e.g., `DateTime?`)
- Actual API responses return `null` values for the field

**❌ NEVER use `.nullable()` when:**
- Only evidence is `minOccurs="0"` from WSDOT XML schemas
- Field is always present in actual API responses
- No clear documented evidence of nullability

**⚠️ WSDOT XML Schema Reliability:**
- **`minOccurs="0"`**: Unreliable - systematically applied to ALL fields regardless of actual requirements
- **`nillable="true"`**: Reliable - indicates field can actually be null
- **Abstract docs with `?`**: Reliable - indicates nullable field

### Developer Experience Priority
- **Avoid unnecessary null checks** that burden developers
- **Maintain type safety** by only marking fields as nullable when there's clear evidence
- **Follow documented contracts** rather than potentially misconfigured XML schemas

---

## Appendix: Example Validation Commands

### WSDOT Highway Alerts
```bash
# Test highway alerts endpoint
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test with specific parameters if available
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?AccessCode=$WSDOT_ACCESS_TOKEN&MapAreaId=1"
```

### WSF Schedule
```bash
# Test schedule endpoint with valid date and route
curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedulebyroute/2024-01-15/1?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test cache flush date
curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/cacheflushdate?AccessCode=$WSDOT_ACCESS_TOKEN"
```

### WSF Vessels
```bash
# Test vessel locations endpoint
curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vessellocations?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test specific vessel if ID available
curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselbasics/1?AccessCode=$WSDOT_ACCESS_TOKEN"
```
