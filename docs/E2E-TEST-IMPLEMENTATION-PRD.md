# E2E Test Implementation PRD

## Overview

This document outlines the implementation requirements for creating comprehensive end-to-end (e2e) test suites for all remaining API endpoints. The implementation follows the architecture defined in `docs/E2E-TEST-ARCHITECTURE.md` and enables parallel development by multiple agents.

## Goals

- **Complete Coverage**: Implement e2e tests for all 90+ API endpoints
- **Parallel Development**: Enable multiple agents to work simultaneously on different API modules
- **Consistency**: Ensure all test suites follow the established architectural patterns
- **Quality**: Maintain high test reliability and comprehensive validation coverage

## Implementation Strategy

### Parallel Development Approach

Each agent will be assigned one or more API modules to implement independently. This approach:
- Enables simultaneous development across multiple APIs
- Reduces implementation time through parallelization
- Allows agents to focus on specific API domains
- Maintains consistency through shared architectural patterns

### Implementation Phases

1. **Phase 1**: Core infrastructure and first API module (WSDOT Highway Cameras) - **COMPLETED**
2. **Phase 2**: Parallel implementation of remaining API modules
3. **Phase 3**: Integration testing and validation across all modules
4. **Phase 4**: Performance optimization and final validation

## API Module Assignments

### WSDOT APIs (8 modules)

#### Module 1: Border Crossings
- **Agent Assignment**: Agent A
- **Endpoints**: `getBorderCrossings`
- **Category**: Parameterless
- **Estimated Effort**: 1-2 hours

#### Module 2: Bridge Clearances
- **Agent Assignment**: Agent B
- **Endpoints**: `getBridgeClearances`
- **Category**: Parameterless
- **Estimated Effort**: 1-2 hours

#### Module 3: Commercial Vehicle Restrictions
- **Agent Assignment**: Agent C
- **Endpoints**: `getCommercialVehicleRestrictions`, `getCommercialVehicleRestrictionsWithId`
- **Category**: Parameterless, ID-based
- **Estimated Effort**: 2-3 hours

#### Module 4: Highway Alerts
- **Agent Assignment**: Agent D
- **Endpoints**: `getEventCategories`, `getHighwayAlertById`, `getHighwayAlerts`, `getHighwayAlertsByMapArea`, `getHighwayAlertsByRegionId`, `getMapAreas`, `searchHighwayAlerts`
- **Category**: Parameterless, ID-based, Search
- **Estimated Effort**: 3-4 hours

#### Module 5: Mountain Pass Conditions
- **Agent Assignment**: Agent E
- **Endpoints**: `getMountainPassConditionById`, `getMountainPassConditions`
- **Category**: Parameterless, ID-based
- **Estimated Effort**: 2-3 hours

#### Module 6: Toll Rates
- **Agent Assignment**: Agent F
- **Endpoints**: `getTollRates`, `getTollTripInfo`, `getTollTripRates`, `getTollTripVersion`, `getTripRatesByDate`
- **Category**: Parameterized, Date-based
- **Estimated Effort**: 3-4 hours

#### Module 7: Traffic Flow
- **Agent Assignment**: Agent G
- **Endpoints**: `getTrafficFlowById`, `getTrafficFlows`
- **Category**: Parameterless, ID-based
- **Estimated Effort**: 2-3 hours

#### Module 8: Travel Times
- **Agent Assignment**: Agent H
- **Endpoints**: `getTravelTimeById`, `getTravelTimes`
- **Category**: Parameterless, ID-based
- **Estimated Effort**: 2-3 hours

#### Module 9: Weather Information
- **Agent Assignment**: Agent I
- **Endpoints**: `getSearchWeatherInformation`, `getWeatherInformation`, `getWeatherInformationByStationId`, `getWeatherInformationForStations`
- **Category**: Parameterless, ID-based, Search
- **Estimated Effort**: 3-4 hours

#### Module 10: Weather Information Extended
- **Agent Assignment**: Agent J
- **Endpoints**: `getWeatherInformationExtended`
- **Category**: Parameterized
- **Estimated Effort**: 2-3 hours

#### Module 11: Weather Stations
- **Agent Assignment**: Agent K
- **Endpoints**: `getWeatherStations`
- **Category**: Parameterless
- **Estimated Effort**: 1-2 hours

### WSF APIs (4 modules)

#### Module 12: Fares
- **Agent Assignment**: Agent L
- **Endpoints**: `getFareLineItems`, `getFareLineItemsBasic`, `getFareLineItemsVerbose`, `getFaresCacheFlushDate`, `getFaresTerminalMates`, `getFaresTerminals`, `getFaresValidDateRange`, `getFareTotals`, `getTerminalCombo`, `getTerminalComboVerbose`
- **Category**: Parameterized, Date-based
- **Estimated Effort**: 4-5 hours

#### Module 13: Schedule
- **Agent Assignment**: Agent M
- **Endpoints**: `getActiveSeasons`, `getAlerts`, `getAllSailings`, `getAlternativeFormats`, `getCacheFlushDateSchedule`, `getRouteDetails`, `getRouteDetailsByRoute`, `getRouteDetailsByTerminals`, `getRoutes`, `getRoutesByTerminals`, `getRoutesWithDisruptions`, `getSailings`, `getScheduleByRoute`, `getScheduleByTerminals`, `getScheduledRoutes`, `getScheduledRoutesBySeason`, `getScheduleTerminalById`, `getScheduleTerminalComboById`, `getScheduleTodayByRoute`, `getScheduleTodayByTerminals`, `getTerminalMates`, `getTerminals`, `getTerminalsAndMates`, `getTerminalsAndMatesByRoute`, `getTimeAdjustmentById`, `getTimeAdjustments`, `getTimeAdjustmentsByRoute`, `getTimeAdjustmentsBySchedRoute`, `getValidDateRange`
- **Category**: Parameterless, Parameterized, Date-based, ID-based, Search
- **Estimated Effort**: 6-8 hours

#### Module 14: Terminals
- **Agent Assignment**: Agent N
- **Endpoints**: `getCacheFlushDateTerminals`, `getTerminalBasics`, `getTerminalBasicsByTerminalId`, `getTerminalBulletins`, `getTerminalBulletinsByTerminalId`, `getTerminalLocations`, `getTerminalLocationsByTerminalId`, `getTerminalSailingSpace`, `getTerminalSailingSpaceByTerminalId`, `getTerminalTransports`, `getTerminalTransportsByTerminalId`, `getTerminalVerbose`, `getTerminalVerboseByTerminalId`, `getTerminalWaitTimes`, `getTerminalWaitTimesByTerminalId`
- **Category**: Parameterless, ID-based
- **Estimated Effort**: 4-5 hours

#### Module 15: Vessels
- **Agent Assignment**: Agent O
- **Endpoints**: `getAllVesselHistories`, `getCacheFlushDateVessels`, `getMultipleVesselHistories`, `getVesselAccommodations`, `getVesselAccommodationsById`, `getVesselBasics`, `getVesselBasicsById`, `getVesselHistoryByVesselAndDateRange`, `getVesselLocations`, `getVesselLocationsByVesselId`, `getVesselStats`, `getVesselStatsById`, `getVesselVerbose`, `getVesselVerboseById`
- **Category**: Parameterless, ID-based, Date-based
- **Estimated Effort**: 4-5 hours

## Implementation Requirements

### For Each Agent

#### 1. Pre-Implementation Tasks

1. **Review Architecture**: Read and understand `docs/E2E-TEST-ARCHITECTURE.md`
2. **Analyze API Module**: Examine the assigned API module's source code
3. **Identify Endpoints**: List all exported functions and their parameters
4. **Determine Categories**: Categorize each endpoint (parameterless, parameterized, date-based, id-based, search)
5. **Review Schemas**: Identify input and output Zod schemas for each endpoint

#### 2. Implementation Tasks

1. **Create Configuration File**: Implement `tests/e2e/config/{api-module}.config.ts`
2. **Define Test Data**: Configure valid parameters, invalid parameters, and custom tests
3. **Create Test File**: Implement `tests/e2e/validation/{api-module}/{api-module}.validation.e2e.test.ts`
4. **Run Tests**: Execute tests and resolve any failures
5. **Validate Coverage**: Ensure all endpoints have comprehensive test coverage

#### 3. Post-Implementation Tasks

1. **Test Execution**: Run `npm run test:e2e:validation` to verify all tests pass
2. **Documentation**: Update this PRD with completion status
3. **Code Review**: Ensure implementation follows architectural patterns
4. **Integration**: Verify tests work with the overall test suite

### Configuration File Requirements

Each configuration file must include:

```typescript
export const {apiModule}TestConfig: ApiModuleConfig = {
  moduleName: "API Module Name",
  endpoints: [
    {
      apiFunction: importedFunction,
      outputSchema: importedSchema,
      validParams: { /* valid parameters */ },
      invalidParams: [ /* invalid parameter tests */ ],
      endpointName: "functionName",
      category: "endpoint-category",
      maxResponseTime: 5000, // milliseconds
      customTests: [ /* endpoint-specific tests */ ]
    }
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: false,
    rateLimitDelay: 100
  }
};
```

### Test File Requirements

Each test file must follow this pattern:

```typescript
import { describe } from "vitest";
import { {apiModule}TestConfig } from "../../config/{api-module}.config";
import { createEndpointTestSuite } from "../../utils/test-generators";

describe("API Module Name", () => {
  {apiModule}TestConfig.endpoints.forEach((endpointConfig) => {
    createEndpointTestSuite(endpointConfig);
  });
});
```

## Implementation Guidelines

### 1. Endpoint Categorization

- **Parameterless**: No input parameters required
- **Parameterized**: Accepts various parameter combinations
- **Date-based**: Accepts date ranges or specific dates
- **ID-based**: Requires specific ID parameters
- **Search**: Accepts search criteria and filters

### 2. Test Data Selection

- **Valid Parameters**: Use real, working parameters from live API responses
- **Invalid Parameters**: Include edge cases that should trigger errors
- **Custom Tests**: Add endpoint-specific business logic validation

### 3. Performance Thresholds

- **Default**: 5000ms for most endpoints
- **Fast APIs**: 1000-3000ms for simple data retrieval
- **Complex APIs**: 5000-10000ms for data processing endpoints
- **Search APIs**: 3000-5000ms for query-based endpoints

### 4. Error Handling

- **Invalid Parameters**: Test rejection of malformed inputs
- **Edge Cases**: Handle boundary conditions gracefully
- **Network Issues**: Test timeout and connection error scenarios

### 5. Custom Test Implementation

Each endpoint should include 2-3 custom tests that validate:
- **Data Quality**: Ensure returned data meets business requirements
- **Business Logic**: Validate endpoint-specific functionality
- **Data Relationships**: Check consistency between related fields

## Quality Assurance

### Test Coverage Requirements

- **100% Endpoint Coverage**: All exported functions must have tests
- **Schema Validation**: All responses must validate against Zod schemas
- **Error Handling**: All error scenarios must be tested
- **Performance**: All endpoints must meet response time requirements
- **Data Integrity**: All data structures must be validated

### Validation Checklist

Before marking an API module as complete:

- [ ] All endpoints have test configurations
- [ ] All tests pass without errors
- [ ] Performance thresholds are met
- [ ] Error scenarios are properly handled
- [ ] Custom tests validate business logic
- [ ] Test file follows naming conventions
- [ ] Configuration file is properly structured

## Common Implementation Patterns

### Parameterless Endpoints

```typescript
{
  apiFunction: getEndpoint,
  outputSchema: getEndpointSchema,
  validParams: {},
  invalidParams: [], // No invalid params for parameterless endpoints
  endpointName: "getEndpoint",
  category: "parameterless",
  maxResponseTime: 3000,
  customTests: [
    {
      name: "should return non-empty data",
      test: async () => {
        const result = await getEndpoint();
        expect(result.length).toBeGreaterThan(0);
      }
    }
  ]
}
```

### ID-Based Endpoints

```typescript
{
  apiFunction: getEndpointById,
  outputSchema: getEndpointByIdSchema,
  validParams: { id: "valid-id" },
  invalidParams: [
    { params: { id: "invalid-id" }, expectedError: "Not found" },
    { params: { id: "" }, expectedError: "Invalid ID" }
  ],
  endpointName: "getEndpointById",
  category: "id-based",
  maxResponseTime: 2000,
  customTests: [
    {
      name: "should return data for valid ID",
      test: async () => {
        const result = await getEndpointById({ id: "valid-id" });
        expect(result.id).toBe("valid-id");
      }
    }
  ]
}
```

### Search Endpoints

```typescript
{
  apiFunction: searchEndpoint,
  outputSchema: searchEndpointSchema,
  validParams: { query: "valid-search-term" },
  invalidParams: [], // Search endpoints typically handle invalid params gracefully
  endpointName: "searchEndpoint",
  category: "search",
  maxResponseTime: 4000,
  customTests: [
    {
      name: "should return relevant search results",
      test: async () => {
        const result = await searchEndpoint({ query: "valid-search-term" });
        expect(result.some(item => 
          item.name.toLowerCase().includes("valid-search-term")
        )).toBe(true);
      }
    }
  ]
}
```

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Parameter Mismatch Errors

**Problem**: `Parameter "paramName" was provided but placeholder "{paramName}" not found in URL template`

**Solution**: 
- Verify parameter names match exactly with API function signatures
- Check casing (e.g., `cameraId` vs `cameraID`)
- Review API source code for expected parameter names

#### 2. Schema Validation Failures

**Problem**: `schema.parse is not a function`

**Solution**:
- Ensure correct argument order: `validateArrayData(data, schema, context)`
- Use type casting: `outputSchema as z.ZodSchema<unknown[]>`
- Verify schema imports are correct

#### 3. API Response Errors

**Problem**: `API returned HTTP 200 with empty body (invalid response)`

**Solution**:
- Use valid test data from live API responses
- Update test configurations with working parameters
- Check API documentation for valid input ranges

#### 4. Performance Test Failures

**Problem**: `expected [std dev] to be less than [average * threshold]`

**Solution**:
- Performance thresholds are already relaxed to 75% variance
- Network conditions may cause natural variance
- Consider running tests multiple times for stability

#### 5. Empty Test Suites

**Problem**: `No test found in suite Category-Specific Tests`

**Solution**:
- Ensure all endpoint categories have associated tests
- Check that category-specific tests are properly implemented
- Verify endpoint categorization is correct

## Success Criteria

### Individual API Module

- [ ] All endpoints have comprehensive test coverage
- [ ] All tests pass without errors or warnings
- [ ] Performance requirements are met
- [ ] Error scenarios are properly handled
- [ ] Custom tests validate business logic
- [ ] Implementation follows architectural patterns

### Overall Test Suite

- [ ] All 90+ API endpoints have tests
- [ ] Test suite runs successfully in parallel
- [ ] Performance benchmarks are established
- [ ] Error handling is consistent across all endpoints
- [ ] Test maintenance is simplified and centralized

## Timeline and Milestones

### Phase 2: Parallel Implementation (Week 1-2)

- **Week 1**: Complete 8 WSDOT API modules
- **Week 2**: Complete 4 WSF API modules
- **Daily**: Update completion status and resolve blockers

### Phase 3: Integration Testing (Week 3)

- **Integration**: Run full test suite across all modules
- **Validation**: Ensure tests work together without conflicts
- **Performance**: Optimize test execution time

### Phase 4: Final Validation (Week 4)

- **Documentation**: Complete implementation documentation
- **Training**: Document lessons learned and best practices
- **Handoff**: Prepare for ongoing maintenance and enhancement

## Conclusion

This PRD provides a comprehensive roadmap for implementing e2e tests for all remaining API endpoints. By following the established architecture and working in parallel, multiple agents can efficiently implement comprehensive test coverage while maintaining consistency and quality.

The implementation approach ensures that:
- Each agent can work independently on assigned modules
- All implementations follow consistent architectural patterns
- Quality and coverage requirements are met across all endpoints
- The overall test suite is maintainable and scalable

Success depends on adherence to the architectural patterns, thorough testing of each module, and collaboration to resolve any cross-module issues that arise during implementation.
