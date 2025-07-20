# WSDOT Traveler Information APIs Implementation Plan

## Overview

This document outlines the systematic implementation of all WSDOT Traveler Information APIs following the established WSF API patterns. The implementation will be done sequentially, with each API fully completed (including e2e tests) before moving to the next.

## Phase 1: Infrastructure Setup

### 1.1 Error Handling Rename
- [ ] **Rename WsdApiError to WsdotApiError**
  - [ ] Update `src/shared/fetching/errors.ts` to rename the class
  - [ ] Update all WSF API files to use `WsdotApiError` instead of `WsdApiError`
  - [ ] Update all test files to use the new error name
  - [ ] Update all documentation to reference `WsdotApiError`
  - [ ] Update `src/shared/fetching/fetchInternal.ts` to use new error name
  - [ ] Update `src/shared/fetching/utils.ts` to use new error name

### 1.2 Create WSDOT Fetch Function
- [ ] **Create fetchWsdot function in `src/shared/fetching/fetch.ts`**
  ```typescript
  export const fetchWsdot = async <T>(
    source: WsdotSource,
    endpoint: string,
    logMode?: LoggingMode
  ): Promise<T> => {
    const baseUrl = WSDOT_BASE_URLS[source];
    const url = `${baseUrl}${endpoint}?AccessCode=${API_KEY}`;
    return await fetchInternal<T>(url, endpoint, logMode);
  };
  ```

### 1.3 Update Configuration
- [ ] **Verify WSDOT base URLs in `src/shared/fetching/config.ts`**
  - [ ] Validate each URL against official WSDOT documentation
  - [ ] Ensure all URLs are correct and complete
  - [ ] Update any incorrect URLs based on cURL validation

### 1.4 Update Documentation
- [ ] **Update `docs/API_ACCESS_REQUIREMENTS.md`**
  - [ ] Add WSDOT Traveler Information API specifics
  - [ ] Update authentication requirements
  - [ ] Add WSDOT-specific error handling information

## Phase 2: API Implementation (Alphabetical Order)

### Implementation Standards

For each API, follow these exact standards:

#### File Structure
```
src/api/wsdot-[api-name]/
├── types.ts      # TypeScript type definitions
├── api.ts        # API function implementations
├── hook.ts       # React Query hooks
└── index.ts      # Exports
```

#### Type Naming Convention
- Follow WSDOT API naming exactly (e.g., `CameraID`, `AlertID`)
- Use PascalCase for all property names
- Use uppercase "ID" suffix for identifiers
- Date fields should be typed as `Date` (not `string`)

#### Function Naming Convention
- Use camelCase for function names
- Use descriptive names (e.g., `getHighwayCameras`, `getAlertsAsJson`)
- Follow WSDOT endpoint naming patterns

#### Hook Naming Convention
- Use camelCase with "use" prefix
- Follow function naming patterns (e.g., `useHighwayCameras`, `useAlerts`)

#### Error Handling
- All functions throw `WsdotApiError` instances
- Use appropriate error codes (`API_ERROR`, `NETWORK_ERROR`)
- Include descriptive error messages

#### Caching Strategy
- Use `createInfrequentUpdateOptions()` for static data
- Use `createFrequentUpdateOptions()` for real-time data
- Set `enabled: true` by default

#### Testing Standards
- Create comprehensive e2e tests
- Use real API validation
- Include performance benchmarks (2-second LTE target)
- Use actual test data constants where possible
- Group tests by functionality

### 2.1 Border Crossings API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html`
- [ ] **cURL Endpoint Testing**
  - [ ] Test all available endpoints with real data
  - [ ] Validate response structures
  - [ ] Identify required parameters

#### Implementation
- [ ] **Create `src/api/wsdot-border-crossings/types.ts`**
  - [ ] Define all response types based on cURL validation
  - [ ] Use PascalCase property names
  - [ ] Type date fields as `Date`
- [ ] **Create `src/api/wsdot-border-crossings/api.ts`**
  - [ ] Implement all API functions
  - [ ] Use `fetchWsdot` function
  - [ ] Include comprehensive JSDoc comments
- [ ] **Create `src/api/wsdot-border-crossings/hook.ts`**
  - [ ] Implement React Query hooks for all functions
  - [ ] Use appropriate caching strategies
  - [ ] Include proper TypeScript types
- [ ] **Create `src/api/wsdot-border-crossings/index.ts`**
  - [ ] Export all types, functions, and hooks

#### Testing
- [ ] **Create `tests/e2e/wsdot-border-crossings/borderCrossingsBasics.e2e.test.ts`**
  - [ ] Test basic functionality
  - [ ] Include performance benchmarks
  - [ ] Use real API validation
- [ ] **Create `tests/e2e/wsdot-border-crossings/borderCrossingsGetData.e2e.test.ts`**
  - [ ] Test data retrieval endpoints
  - [ ] Validate response structures
  - [ ] Test error scenarios

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-border-crossings.md`**
  - [ ] Follow WSF API documentation pattern
  - [ ] Include usage examples
  - [ ] Document all endpoints and types

### 2.2 Bridge Clearances API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html`
- [ ] **cURL Endpoint Testing**
  - [ ] Test all available endpoints
  - [ ] Validate response structures
  - [ ] Identify required parameters

#### Implementation
- [ ] **Create `src/api/wsdot-bridge-clearances/types.ts`**
- [ ] **Create `src/api/wsdot-bridge-clearances/api.ts`**
- [ ] **Create `src/api/wsdot-bridge-clearances/hook.ts`**
- [ ] **Create `src/api/wsdot-bridge-clearances/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-bridge-clearances/bridgeClearancesBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-bridge-clearances/bridgeClearancesGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-bridge-clearances.md`**

### 2.3 Commercial Vehicle Restrictions API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-commercial-vehicle-restrictions/types.ts`**
- [ ] **Create `src/api/wsdot-commercial-vehicle-restrictions/api.ts`**
- [ ] **Create `src/api/wsdot-commercial-vehicle-restrictions/hook.ts`**
- [ ] **Create `src/api/wsdot-commercial-vehicle-restrictions/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-commercial-vehicle-restrictions/cvRestrictionsBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-commercial-vehicle-restrictions/cvRestrictionsGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-commercial-vehicle-restrictions.md`**

### 2.4 Highway Alerts API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-highway-alerts/types.ts`**
- [ ] **Create `src/api/wsdot-highway-alerts/api.ts`**
- [ ] **Create `src/api/wsdot-highway-alerts/hook.ts`**
- [ ] **Create `src/api/wsdot-highway-alerts/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-highway-alerts/highwayAlertsBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-highway-alerts/highwayAlertsGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-highway-alerts.md`**

### 2.5 Highway Cameras API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-highway-cameras/types.ts`**
- [ ] **Create `src/api/wsdot-highway-cameras/api.ts`**
- [ ] **Create `src/api/wsdot-highway-cameras/hook.ts`**
- [ ] **Create `src/api/wsdot-highway-cameras/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-highway-cameras/highwayCamerasBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-highway-cameras/highwayCamerasGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-highway-cameras.md`**

### 2.6 Mountain Pass Conditions API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-mountain-pass-conditions/types.ts`**
- [ ] **Create `src/api/wsdot-mountain-pass-conditions/api.ts`**
- [ ] **Create `src/api/wsdot-mountain-pass-conditions/hook.ts`**
- [ ] **Create `src/api/wsdot-mountain-pass-conditions/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-mountain-pass-conditions/mountainPassConditionsBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-mountain-pass-conditions/mountainPassConditionsGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-mountain-pass-conditions.md`**

### 2.7 Toll Rates API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-toll-rates/types.ts`**
- [ ] **Create `src/api/wsdot-toll-rates/api.ts`**
- [ ] **Create `src/api/wsdot-toll-rates/hook.ts`**
- [ ] **Create `src/api/wsdot-toll-rates/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-toll-rates/tollRatesBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-toll-rates/tollRatesGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-toll-rates.md`**

### 2.8 Traffic Flow API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-traffic-flow/types.ts`**
- [ ] **Create `src/api/wsdot-traffic-flow/api.ts`**
- [ ] **Create `src/api/wsdot-traffic-flow/hook.ts`**
- [ ] **Create `src/api/wsdot-traffic-flow/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-traffic-flow/trafficFlowBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-traffic-flow/trafficFlowGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-traffic-flow.md`**

### 2.9 Travel Times API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-travel-times/types.ts`**
- [ ] **Create `src/api/wsdot-travel-times/api.ts`**
- [ ] **Create `src/api/wsdot-travel-times/hook.ts`**
- [ ] **Create `src/api/wsdot-travel-times/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-travel-times/travelTimesBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-travel-times/travelTimesGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-travel-times.md`**

### 2.10 Weather Information API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-weather-information/types.ts`**
- [ ] **Create `src/api/wsdot-weather-information/api.ts`**
- [ ] **Create `src/api/wsdot-weather-information/hook.ts`**
- [ ] **Create `src/api/wsdot-weather-information/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-weather-information/weatherInformationBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-weather-information/weatherInformationGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-weather-information.md`**

### 2.11 Weather Information Extended API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/Scanweb/Help` (if available)
  - [ ] Check documentation for this API
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-weather-information-extended/types.ts`**
- [ ] **Create `src/api/wsdot-weather-information-extended/api.ts`**
- [ ] **Create `src/api/wsdot-weather-information-extended/hook.ts`**
- [ ] **Create `src/api/wsdot-weather-information-extended/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-weather-information-extended/weatherInformationExtendedBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-weather-information-extended/weatherInformationExtendedGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-weather-information-extended.md`**

### 2.12 Weather Stations API

#### Research & Validation
- [ ] **cURL Documentation**
  - [ ] `https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc/Help`
  - [ ] `https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html`
- [ ] **cURL Endpoint Testing**

#### Implementation
- [ ] **Create `src/api/wsdot-weather-stations/types.ts`**
- [ ] **Create `src/api/wsdot-weather-stations/api.ts`**
- [ ] **Create `src/api/wsdot-weather-stations/hook.ts`**
- [ ] **Create `src/api/wsdot-weather-stations/index.ts`**

#### Testing
- [ ] **Create `tests/e2e/wsdot-weather-stations/weatherStationsBasics.e2e.test.ts`**
- [ ] **Create `tests/e2e/wsdot-weather-stations/weatherStationsGetData.e2e.test.ts`**

#### Documentation
- [ ] **Create `docs/api/readme-wsdot-weather-stations.md`**

## Phase 3: Integration & Final Updates

### 3.1 Update Main Exports
- [ ] **Update `src/index.ts`**
  - [ ] Export all new WSDOT API types, functions, and hooks
  - [ ] Maintain alphabetical order
  - [ ] Include proper TypeScript exports
- [ ] **Update `src/react/index.ts`**
  - [ ] Export all new WSDOT React hooks
  - [ ] Maintain alphabetical order
  - [ ] Include proper TypeScript exports

### 3.2 Update Test Utilities
- [ ] **Update `tests/e2e/utils.ts`**
  - [ ] Add WSDOT-specific validation functions
  - [ ] Add WSDOT-specific test data constants
  - [ ] Add WSDOT-specific performance benchmarks

### 3.3 Update Main Documentation
- [ ] **Update `README.md`**
  - [ ] Add WSDOT Traveler Information APIs section
  - [ ] Update API reference table
  - [ ] Include usage examples
- [ ] **Update `docs/wsdot-api-reference/index.md`**
  - [ ] Add links to new API documentation
  - [ ] Update implementation status

### 3.4 Final Validation
- [ ] **Run All Tests**
  - [ ] Execute all e2e tests for WSDOT APIs
  - [ ] Ensure all tests pass
  - [ ] Validate performance benchmarks
- [ ] **API Compliance Check**
  - [ ] Verify all endpoints work with real WSDOT API
  - [ ] Validate data structures match documentation
  - [ ] Test error handling scenarios

## Implementation Process for Each API

### Step 1: Research & Validation
1. **cURL Documentation Pages**
   - Visit the Help page for the API
   - Visit the Documentation page for the API
   - Note all available endpoints and parameters

2. **cURL Endpoint Testing**
   - Test each endpoint with real data
   - Validate response structures
   - Identify required vs optional parameters
   - Note any date formats used

### Step 2: Implementation
1. **Create Types (`types.ts`)**
   - Define all response types based on cURL validation
   - Use PascalCase property names
   - Type date fields as `Date`
   - Include comprehensive JSDoc comments

2. **Create API Functions (`api.ts`)**
   - Implement all API functions using `fetchWsdot`
   - Include proper error handling
   - Add comprehensive JSDoc comments
   - Follow WSF API patterns

3. **Create React Hooks (`hook.ts`)**
   - Implement React Query hooks for all functions
   - Use appropriate caching strategies
   - Include proper TypeScript types
   - Follow WSF hook patterns

4. **Create Exports (`index.ts`)**
   - Export all types, functions, and hooks
   - Maintain alphabetical order

### Step 3: Testing
1. **Create E2E Tests**
   - Test basic functionality
   - Test data retrieval endpoints
   - Include performance benchmarks
   - Test error scenarios
   - Use real API validation

2. **Test Data Constants**
   - Use actual test data where possible
   - Use today/tomorrow for date parameters
   - Use valid IDs from real API responses

### Step 4: Documentation
1. **Create README**
   - Follow WSF API documentation pattern
   - Include usage examples
   - Document all endpoints and types
   - Include error handling information

### Step 5: Validation
1. **Run Tests**
   - Execute all e2e tests
   - Ensure all tests pass
   - Validate performance benchmarks

2. **API Compliance**
   - Verify endpoints work with real WSDOT API
   - Validate data structures
   - Test error handling

## Success Criteria

Each API implementation is considered complete when:

1. **All files created** following the established patterns
2. **All e2e tests pass** with real API validation
3. **Performance benchmarks met** (2-second LTE target)
4. **Documentation complete** following WSF patterns
5. **Type safety verified** with proper TypeScript types
6. **Error handling tested** with real error scenarios
7. **Caching strategy implemented** appropriately

## Notes

- **Sequential Implementation**: Each API must be fully completed before moving to the next
- **Real API Validation**: All implementations must be validated against actual WSDOT API responses
- **Consistent Patterns**: Follow established WSF API patterns exactly
- **Comprehensive Testing**: Include both functionality and performance testing
- **Documentation**: Maintain comprehensive documentation for all APIs

## Next Steps

1. **Start with Phase 1**: Complete infrastructure setup
2. **Begin with Border Crossings API**: First alphabetical API
3. **Wait for confirmation**: After each API is complete, wait for further instruction
4. **Continue sequentially**: Move to next API only after current one is fully validated 