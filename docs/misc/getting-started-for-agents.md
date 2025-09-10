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

## Verification with CLI (No curl)

**Policy**: For this project, agents must use the ws-dottie CLI output and the official WSDOT/WSF documentation as the sources of truth. Do not run curl/fetch requests.

### Why CLI is Essential
- Ensures the observed data matches our validated Zod schemas by definition
- Provides consistent outputs aligned with our public API surface

### CLI Commands
c
```bash
# Navigate to project directory
cd /home/rob/code/ferryjoy/ws-dottie

# Example invocations
node dist/cli.mjs getVesselLocations
node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'
node dist/cli.mjs getHighwayAlertsByRegionId '{"regionId": 1}'
node dist/cli.mjs getHighwayAlertsByMapArea '{"mapArea": "Seattle"}'
```

### When Documentation and CLI Differ
- Do not edit schemas or implementation.
- Inform the user in chat immediately and pause work until resolved.
- Include the CLI command you ran and link(s) to the official Docs page in your message.

## Schema and Implementation Policy
- Do not edit schemas or fetching logic as part of this project.
- Use CLI output + official docs to write accurate TSDoc comments.
- If you suspect an error, submit a discrepancy report and alert the maintainer.

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

### 1. Always Test with CLI
- Verify behavior using ws-dottie CLI output
- Do not use curl/fetch in this project

### 2. Follow Documentation Hierarchy
- **Primary**: "Docs" column for API structure
- **Secondary**: "REST" column for examples
- **Additional**: WSF specifications as needed

### 3. Handle Dates Correctly
- Accept JS Date objects in input schemas
- Use appropriate date utility functions for outputs
- Let `zodFetch` handle all date conversion

### 4. Investigate Errors Thoroughly
- Check parameter validity first
- Verify authentication and token status
- Reproduce with CLI to isolate issues

### 5. Maintain Schema Policy
- Do not edit schemas for this project
- Report discrepancies via the template and alert the maintainer

## Example Workflow

1. **Review Documentation**: Start with "Docs" column for API structure
2. **Check Examples**: Review "REST" column for implementation details
3. **Test with CLI**: Verify actual behavior using `node dist/cli.mjs ...`
4. **Compare**: Identify any differences between docs and CLI output
5. **Report**: File discrepancy report if needed (no schema edits)

## Important Note

Agents **must never** edit a schema implementation or related fetching-related source code as part of this project. If you suspect an error, file a discrepancy report and notify the maintainer.
