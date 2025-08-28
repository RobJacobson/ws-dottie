# TSDoc Comments Cleanup Project - Complete Guide

## ⚠️ CRITICAL WARNING ⚠️

**AGENTS MUST COMPLETE ALL DATA COLLECTION BEFORE MAKING ANY EDITS**

This includes:
- Official documentation research
- Curl testing of all endpoints
- ws-dottie CLI testing of all functions
- Data validation and example generation

**NO EDITING IS ALLOWED UNTIL ALL DATA IS COLLECTED AND VERIFIED**

## Overview

This guide establishes a comprehensive strategy for **cleaning up and rewriting** all existing TSDoc comments throughout our WSDOT and WSF API code to ensure consistency with our updated best practices. The goal is to replace all existing comments with high-quality, accurate, and consistent TSDoc comments that follow our standardized format.

**Scope**: This guide covers TSDoc comments only. Zod schema definitions are beyond the scope of this project and must remain completely intact - do not modify, add, or remove any schema definitions.

## 🚀 Quick Start Workflow

1. **Select next API** in alphabetical order
2. **Collect all required data** (docs + curl + CLI testing)
3. **Write new TSDoc comments** following the format below
4. **Validate and test** (e2e tests must pass)
5. **Stop for user review** before proceeding to next API

## 📋 Implementation Process

### Phase 1: Data Collection (MANDATORY - NO EDITING ALLOWED)

**Step 1: Official Documentation Research**
- [ ] **READ `docs/getting-started-agents.md`** for specific instructions on which documentation to download
- [ ] Download WSDOT official documentation for the target API (see getting-started-agents.md for links)
- [ ] Download WSF official documentation (if applicable, see getting-started-agents.md for links)
- [ ] Review and understand the documented API behavior

**Step 2: API Testing with Curl**
- [ ] Test ALL endpoints with curl using `$WSDOT_ACCESS_TOKEN`, using provided env variabale.
- [ ] Verify actual response structure matches documentation
- [ ] Note any discrepancies between docs and actual behavior
- [ ] Document response examples for each endpoint

**Step 3: ws-dottie CLI Testing**
- [ ] Test ALL functions using the ws-dottie CLI tool
- [ ] Generate actual output examples for `@exampleResponse` blocks
- [ ] Compare CLI output with raw curl responses
- [ ] Note transformations applied by ws-dottie

**Step 4: Data Validation**
- [ ] Confirm data accuracy before proceeding
- [ ] Verify no authentication issues with endpoints
- [ ] Ensure sufficient sample data for examples

### Phase 2: Comment Writing (ONLY AFTER DATA COLLECTION COMPLETE)

**Step 5: Delete Existing Comments**
- [ ] Remove ONLY TSDoc comments (/** */ blocks)
- [ ] Preserve ALL Zod schema definitions (completely off-limits)
- [ ] Preserve all existing code logic and functionality

**Step 6: Write New Comments**
- [ ] Write module-level comment at the very top (before imports)
- [ ] Write function-level comments for all API functions
- [ ] Write hook-level comments for all TanStack Query hooks
- [ ] Write schema comments for input/output schemas

**Step 7: Validation and Testing**
- [ ] Run e2e tests for the specific API module
- [ ] Verify all examples work with actual API responses
- [ ] Check consistency with formatting requirements
- [ ] Confirm no Zod schema definitions were modified

## 📝 TSDoc Comment Format

### Module Header Comment Structure

**Required order and placement:**
- **Place at the very top** of the file, before any imports
- **Include all required annotation blocks** in this exact order:

```typescript
/**
 * @module [API_NAME] API
 * @description [Brief overview with context]
 * 
 * Provides:
 * - [Key capability 1]
 * - [Key capability 2]
 * - [Key capability 3]
 * 
 * Data includes:
 * - [Data type 1]
 * - [Data type 2]
 * - [Data type 3]
 *
 * @functions
 *   - [functionName]: [Brief description]
 *   - [functionName]: [Brief description]
 *
 * @input
 *   - [functionName]: [Parameter description]
 *   - [functionName]: [Parameter description]
 *
 * @output
 *   - [functionName]: [Return type description]
 *   - [functionName]: [Return type description]
 *
 * @baseType
 *   - [TypeName]: [Purpose and description]
 *   - [TypeName]: [Purpose and description]
 *
 * @curl
 *   - [Type]: curl command for testing
 *   - [Type]: curl command for testing
 *
 * @exampleResponse
 *   - Single: [Complete object example]
 *   - Array: Array of [ObjectType] objects
 *
 * @cacheStrategy
 *   - WSF endpoints: Automatic cache invalidation via cacheFlushUpdate feature
 *   - WSDOT endpoints: Interval-based invalidation (default: 5 minutes)
 *   - All endpoints: Configurable via TanStack Query options
 *
 * @see [Optional links to official documentation]
 */
```

### Function and Hook Comments

```typescript
/**
 * [Brief description of what the function does]
 * 
 * @param [paramName] - [Parameter description]
 * @returns [Return type description]
 * 
 * @example
 * ```typescript
 * const result = await [functionName]([params]);
 * console.log(result.[property]);
 * ```
 * 
 * @throws {Error} [Error conditions]
 */
```

### Schema Comments

```typescript
/**
 * [Purpose and description of the schema]
 * [Additional context if needed]
 */
export const [schemaName] = z.object({
  // ... schema definition
});
```

## 🔧 Required Tools and Commands

### Curl Testing Commands

```bash
# Test WSDOT endpoint
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test WSF endpoint
curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vessellocations/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```

### ws-dottie CLI Tool Usage

```bash
# Navigate to project directory
cd /home/rob/code/ferryjoy/ws-dottie

# Test specific function with parameters
node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'

# Test function without parameters (returns array)
node dist/cli.mjs getVesselLocations

# Test with different parameter combinations
node dist/cli.mjs getHighwayAlertsByRegionId '{"regionId": 1}'
node dist/cli.mjs getHighwayAlertsByMapArea '{"mapArea": "Seattle"}'
```

### E2E Testing Upon Completion

```bash
# Run e2e tests for the specific API module
npm run test:e2e -- --grep "API_NAME"

# Examples for specific APIs:
npm run test:e2e -- --grep "wsf-vessels"
npm run test:e2e -- --grep "wsdot-highway-alerts"
npm run test:e2e -- --grep "wsdot-border-crossings"
```

## ✅ Validation Checklist

Before marking an API as complete, verify:

- [ ] **All existing TSDoc comments deleted** (/** */ blocks only)
- [ ] **Official documentation downloaded** and reviewed
- [ ] **Curl testing completed** with actual API responses
- [ ] **ws-dottie CLI testing completed** with actual library output
- [ ] **Module-level comment written** with all required annotation blocks at the very top
- [ ] **Function-level comments written** for all API functions
- [ ] **Hook-level comments written** for all TanStack Query hooks
- [ ] **Schema comments written** for input/output schemas
- [ ] **Examples generated** using actual ws-dottie CLI output
- [ ] **Discrepancies documented** between official docs and actual behavior
- [ ] **No Zod schema definitions modified** (completely intact)
- [ ] **Cache strategy documented correctly** (WSF vs WSDOT distinction)
- [ ] **List format used consistently** for all multi-item annotation blocks
- [ ] **E2E tests pass** for the specific API module

## 🚨 Common Issues and Solutions

**Issue**: API returns different data structure than documented
**Solution**: Document the actual behavior, note the discrepancy

**Issue**: ws-dottie CLI tool fails to run
**Solution**: Ensure `$WSDOT_ACCESS_TOKEN` is set, check .env file

**Issue**: Curl returns authentication errors
**Solution**: Verify token validity, check API endpoint URLs

**Issue**: Schema validation fails during testing
**Solution**: Update schemas to match actual API responses (but preserve schema definitions)

**Issue**: E2E tests fail after comment cleanup
**Solution**: Review changes to ensure no code logic was accidentally modified

**Issue**: Cache strategy unclear
**Solution**: Check TanStack Query hook implementation to confirm strategy

## 📊 Success Metrics

Each completed API should have:

- **100% TSDoc coverage** for all exported functions and hooks
- **100% example coverage** using actual ws-dottie CLI output
- **100% curl testing coverage** for all endpoints
- **0 Zod schema definition modifications** (completely intact)
- **Consistent formatting** following the standards above
- **Technical accuracy** verified against actual API behavior
- **100% e2e test pass rate** for the specific API module

## 🎯 Implementation Scope

**Complete ONE API module fully** before stopping:

**Example**: For WSF Vessels API, complete ALL functions:
- getVesselBasics / getVesselBasicsById
- getVesselLocations / getVesselLocationsByVesselId  
- getVesselVerbose / getVesselVerboseById
- getVesselAccommodations / getVesselAccommodationsById
- getVesselStats / getVesselStatsById
- getVesselHistory

**Do NOT** start another API module until the current one is 100% complete.
**Do NOT** move to the next API until user review and approval.

## 📚 Reference Documents

**REQUIRED READING BEFORE STARTING:**
- **`docs/getting-started-agents.md`** - **MUST READ FIRST** for documentation download links and endpoint access instructions

**Additional Reference Materials:**
- `docs/misc/comments-best-practices.md` (formatting standards - now consolidated here)
- `docs/misc/example-structured-comments.md` (examples and templates - now consolidated here)

## 🚫 What NOT to Do

- **Modify Zod schema definitions** - these are completely off-limits
- **Start editing before data collection** - this will result in inaccurate comments
- **Skip curl or CLI testing** - examples must be based on actual data
- **Use marketing language** - focus on technical implementation details
- **Skip e2e testing** - functionality must be verified after changes
- **Move to next API** without user approval - complete one at a time

## 📝 Notes

- **Zod schema definitions must remain completely intact** - do not modify, add, or remove any existing schema definitions
- **Focus on technical implementation** details, not business use cases
- **Prioritize accuracy** over completeness - verify everything with curl and actual ws-dottie output
- **One API at a time** - complete each API fully before moving to next
- **User review required** after each API completion
- **Scope is strictly TSDoc comments only** - any existing Zod schema definitions are off-limits
- **Module header comment must be at the very top** of the file, before any imports
- **E2E testing is mandatory** for each completed API module to ensure functionality integrity
- **List format with dashes (-)** is required for all multi-item annotation blocks
- **Descriptive lists** with "Provides:" and "Data includes:" sections are required for context

## 🔄 Hybrid Documentation Approach

### For Main Fetch Functions:
- Include detailed input/output documentation
- Document parameter descriptions and return type details
- This is where developers will look first to understand "what does this function do?"

### For Schema Definitions:
- Add concise comments that reference the specific schema type
- Example: `/** Input schema for the VesselAccommodation return schema and type */`
- For output schemas: `/** Response schema for the VesselAccommodation return schema and type */`

### For Companion Functions:
- Simple comments like: `/** Returns an array of VesselAccommodation objects */`

### For Hooks:
- Specific comments indicating return type:
  - `/** TanStack Query hook that returns a single VesselAccommodation object */`
  - `/** TanStack Query hook that returns an array of VesselAccommodation objects */`

### Why This Approach Works Best:

1. **Developer Experience**: Developers look at the function first, so that's where the detailed docs should be
2. **Maintainability**: Schema comments stay lightweight and reference the specific type
3. **DRY Principle**: Avoids repetition while keeping detailed docs where they're most useful
4. **Clear Hierarchy**: Function docs → Schema docs → Companion/Hook docs
5. **Type Specificity**: Uses exact type names (e.g., "VesselAccommodation") rather than informal terms
