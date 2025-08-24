# Getting Started with WSDOT/WSF APIs

## Overview

This guide provides best practices for agents working with WSDOT and WSF API endpoints. It covers the correct URL formats, authentication, documentation references, and date handling patterns.

## API Authentication & URL Formats

### WSDOT APIs
- **Base URL**: `https://wsdot.wa.gov/Traffic/api/`
- **Token Parameter**: `AccessCode={token}`
- **Example**: `https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode={token}`

### WSF APIs
- **Base URL**: `https://www.wsdot.wa.gov/ferries/api/`
- **Token Parameter**: `apiaccesscode={token}` (note lowercase)
- **Example**: `https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbasics?apiaccesscode={token}`

**Important**: The same `WSDOT_ACCESS_TOKEN` environment variable is used for both API types, but the query parameter names differ.

## Official Documentation Sources

### WSDOT APIs (12 total)

| API Name | Docs Column | REST Column |
|----------|-------------|-------------|
| Border Crossings | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html) | [REST](https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help) |
| Bridge Clearances | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html) | [REST](https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/Help) |
| Commercial Vehicle Restrictions | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html) | [REST](https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help) |
| Highway Alerts | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html) | [REST](https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help) |
| Highway Cameras | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html) | [REST](https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help) |
| Mountain Pass Conditions | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html) | [REST](https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help) |
| Toll Rates | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html) | [REST](https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/Help) |
| Traffic Flow | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html) | [REST](https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/Help) |
| Travel Times | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html) | [REST](https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/Help) |
| Weather Information | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html) | [REST](https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/Help) |
| Weather Information Extended | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_scanweb_controller.html) | [REST](https://wsdot.wa.gov/Traffic/api/api/Scanweb) |
| Weather Stations | [Documentation](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html) | [REST](https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/Help) |

### WSF APIs (4 total)

| API Name | Docs Column | REST Column | WSF Specification |
|----------|-------------|-------------|-------------------|
| WSF Fares | [Documentation](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html) | [WSF Fares REST API](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html) |
| WSF Schedule | [Documentation](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html) | [WSF Schedule REST API](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html) |
| WSF Terminals | [Documentation](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html) | [WSF Terminals REST API](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html) |
| WSF Vessels | [Documentation](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html) | [WSF Vessels REST API](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html) |

## Documentation Priority & Usage

### 1. "Docs" Column (Primary Source)
- **When to use**: API structure, parameters, return types, field definitions
- **Purpose**: Authoritative for API contracts and schema definitions
- **Content**: Abstract API definitions, class definitions, function signatures

### 2. "REST" Column (Secondary Source)
- **When to use**: Examples, endpoint URLs, additional implementation details
- **Purpose**: Provides concrete examples and endpoint-specific information
- **Content**: XML schemas, endpoint help pages, parameter examples

### 3. WSF Specifications (WSF APIs Only)
- **When to use**: Additional WSF-specific details, caching information, parameter constraints
- **Purpose**: WSF-specific documentation and best practices
- **Content**: Cache flush dates, valid date ranges, terminal/vessel relationships

## Ground Truth Testing with curl

**Critical Principle**: Always use curl to verify actual API behavior. Published documentation may contain discrepancies with real API responses.

### Why curl is Essential
- **Documentation vs Reality**: APIs sometimes return different data types or structures than documented
- **Field Behavior**: Some fields marked as optional in docs are always present, or vice versa
- **Date Formats**: Actual date formats may differ from documented expectations
- **Error Handling**: Real error responses may not match documented error codes

### curl Testing Commands

```bash
# Set your access token
export WSDOT_ACCESS_TOKEN="your_token_here"

# Test WSDOT endpoint
curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"

# Test WSF endpoint
curl -s "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```

### When Documentation and Reality Differ
- **API Response Wins**: The actual API response is always correct
- **Documentation Errors**: Official docs may contain outdated or incorrect information
- **Schema Updates**: Update our schemas to match actual API behavior, not documentation

## Date Handling & zodFetch

### Input Date Formats
- **WSDOT APIs**: Typically expect `YYYY-MM-DD` format
- **WSF APIs**: Typically expect `MM/DD/YYYY` format
- **Our Interface**: Always accept JavaScript Date objects

### Automatic Conversion
The `zodFetch` utility automatically handles date conversion:
- **Input**: Converts JS Date objects to appropriate string format for API requests
- **Output**: Converts API date responses (usually .NET timestamps) to JS Date objects

### Date Schema Requirements
```typescript
// ✅ CORRECT - Accept JS Date objects
export const paramsSchema = z.object({
  tripDate: z.date().describe("Trip date for the journey"),
  startDate: z.date().describe("Start date for the range")
});

// ❌ INCORRECT - Don't use string schemas for dates
export const wrongSchema = z.object({
  tripDate: z.string().describe("Trip date") // WRONG!
});
```

### Date Output Handling
```typescript
// Use appropriate date utility functions
import { zWsdotDate, zWsfDate } from "@/shared/validation";

export const responseSchema = z.object({
  // WSDOT APIs (.NET format)
  timestamp: zWsdotDate().describe("WSDOT timestamp"),
  
  // WSF APIs (MM/DD/YYYY format)
  scheduleDate: zWsfDate().describe("Schedule date")
});
```

## Error Handling & Troubleshooting

### API Errors vs Our Errors
- **WSDOT/WSF Errors**: Usually indicate invalid parameters or authentication issues
- **Common Causes**: Invalid dates, incorrect IDs, expired tokens, malformed requests
- **Never Assume**: Don't dismiss errors as "API not working" - investigate the cause

### Parameter Validation
- **Date Ranges**: Ensure dates are within valid ranges (usually near future for schedules)
- **ID Validation**: Use valid RouteIDs, VesselIDs, TerminalIDs from test configurations
- **Required Fields**: Check that all required parameters are provided

## Best Practices Summary

### 1. Always Test with curl
- Verify actual API behavior before implementing
- Don't rely solely on published documentation
- Use real responses to validate schema accuracy

### 2. Follow Documentation Hierarchy
- **Primary**: "Docs" column for API structure
- **Secondary**: "REST" column for examples
- **Additional**: WSF specifications for ferry-specific details

### 3. Handle Dates Correctly
- Accept JS Date objects in input schemas
- Use appropriate date utility functions for outputs
- Let `zodFetch` handle all date conversion

### 4. Investigate Errors Thoroughly
- Check parameter validity first
- Verify authentication and token status
- Test with curl to isolate issues
- Never assume API is broken

### 5. Maintain Schema Accuracy
- Update schemas to match actual API behavior
- Focus on type safety and nullability
- Preserve existing field descriptions
- Document any discrepancies found

## Example Workflow

1. **Review Documentation**: Start with "Docs" column for API structure
2. **Check Examples**: Review "REST" column for implementation details
3. **Test with curl**: Verify actual API behavior
4. **Compare Schemas**: Identify any discrepancies
5. **Update if Needed**: Fix schema types to match reality
6. **Document Findings**: Note any documentation vs reality differences

## Important Note

Agents **must never** edit a schema implementation or related fetching-related source code without the user's approval.

Agents **must confirm** a suspected error by doing the following:
- Reading the official specifications above for the API.
- Running a curl test to see the actual data being transmitted and received.
- Comparing the official documentation against the curl response for inconsistencies.
- Comparing the result against our schema for inconsistencies, *without editing the schema* or related files, unless instructed.

Once agents have narrowed down the problem through the techniques above, they should report their findings and conclusions to the user, with proposed mitigations.

This approach ensures accurate, reliable API integration while maintaining proper error handling and date management.
