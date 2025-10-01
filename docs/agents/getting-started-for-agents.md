# Getting Started with WSDOT/WSF APIs for Agents

## Overview

This guide explains the different ways agents can fetch data from WSDOT and WSF API endpoints:

1. **`fetch-dottie`**: Unified API client with configurable transport and validation options
   - Default: Native fetch with Zod validation and data transformation
   - `--no-validation`: Raw API access with automatic .NET date conversion (no validation)
   - `--jsonp`: JSONP for browser environments (bypasses CORS)
   - `--jsonp --no-validation`: JSONP without validation (browser, raw data)
2. **`curl`**: Direct HTTP requests for debugging and exploration

All methods use the same `$WSDOT_ACCESS_TOKEN` environment variable for authentication.

## Different Ways to Fetch Data

### 1. fetch-dottie (Recommended for Production)

**Purpose**: Unified API client with configurable transport and validation options
**Use when**: You need validated data and type safety

```bash
# Default: Native fetch with validation
fetch-dottie getBorderCrossings --quiet

# Raw data access (no validation)
fetch-dottie getBorderCrossings --no-validation --quiet

# JSONP for browser environments (with validation)
fetch-dottie getBorderCrossings --jsonp --quiet

# JSONP for browser environments (no validation)
fetch-dottie getBorderCrossings --jsonp --no-validation --quiet

# With parameters
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'

# Pretty-printed output
fetch-dottie vesselLocations --pretty
```

### 2. curl (For Direct API Exploration)

**Purpose**: Direct HTTP requests for debugging and understanding raw API behavior
**Use when**: You need to see exact HTTP requests/responses or debug authentication

**WSDOT APIs:**
```bash
curl "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
```

**WSF APIs:**
```bash
curl "https://www.wsdot.wa.gov/ferries/api/terminals/rest/terminalbasics?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```

## Parameter Handling: Default Values and Error Behavior

### How Default Parameters Work

**fetch-dottie** automatically uses default parameters for endpoints that require them:

```bash
# These endpoints need parameters but work without specifying them
fetch-dottie terminalWaitTimesById     # Uses default terminalId: 1
fetch-dottie vesselBasicsById         # Uses default vesselId: 1
fetch-dottie getBridgeClearancesByRoute  # Uses default route: "005"

# You can override defaults with custom parameters
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'
fetch-dottie vesselBasicsById '{"vesselId": 3}'

# Works with all fetch strategies
fetch-dottie terminalWaitTimesById --no-validation
fetch-dottie terminalWaitTimesById --jsonp
fetch-dottie terminalWaitTimesById --jsonp --no-validation
```

**curl** requires you to specify all parameters manually:

```bash
# Must include all required parameters
curl "https://wsdot.wa.gov/Traffic/api/.../?AccessCode=$WSDOT_ACCESS_TOKEN&terminalId=1"

# Wrong parameters will show errors or help pages
curl "https://wsdot.wa.gov/Traffic/api/.../?AccessCode=$WSDOT_ACCESS_TOKEN&terminalId=999"
# Returns: "Terminal not found" or HTML help page

curl "https://wsdot.wa.gov/Traffic/api/.../?AccessCode=$WSDOT_ACCESS_TOKEN&invalidParam=value"
# Returns: HTML help page showing valid parameters
```

### Understanding API Error Responses

**WSDOT/WSF APIs** respond differently to invalid parameters:

- **fetch-dottie (default)**: Shows clear validation errors with helpful context
- **fetch-dottie --no-validation**: Passes through raw API error messages
- **curl**: Returns HTML help pages or generic error messages

**Common curl confusion:**
```bash
# ❌ This often returns HTML help instead of JSON
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearanceByRoute?AccessCode=$WSDOT_ACCESS_TOKEN&route=999"

# ✅ Check what parameters are expected first
fetch-dottie --list  # Shows available functions and their parameters
fetch-dottie getBridgeClearancesByRoute --help  # Shows parameter requirements
```

### Parameter Validation Differences

| Method | Parameter Handling | Error Response | Use When |
|--------|-------------------|----------------|----------|
| **fetch-dottie (default)** | Validates against Zod schemas | Clear validation errors | You want helpful error messages |
| **fetch-dottie --no-validation** | Passes parameters directly | Raw API responses | You need to see actual API behavior |
| **fetch-dottie --jsonp** | Validates against Zod schemas | Clear validation errors | Browser environments with validation |
| **fetch-dottie --jsonp --no-validation** | Passes parameters directly | Raw API responses | Browser environments, raw data |
| **curl** | Manual parameter construction | HTML help pages or errors | You're debugging API endpoints |

**Tip for curl users:** Always test with fetch-dottie first to see what parameters are expected, then construct your curl command accordingly.

## Authentication: Using $WSDOT_ACCESS_TOKEN

**Critical**: The `$WSDOT_ACCESS_TOKEN` environment variable is already set in your environment. Use it directly in commands:

```bash
# ✅ CORRECT - Use the environment variable directly
echo $WSDOT_ACCESS_TOKEN  # Should show your token
fetch-dottie getBorderCrossings

# ✅ CORRECT - Use in curl commands
curl "https://wsdot.wa.gov/Traffic/api/.../...?AccessCode=$WSDOT_ACCESS_TOKEN"

# ❌ INCORRECT - Don't try to set it manually
export WSDOT_ACCESS_TOKEN=your_token_here  # Never do this!
```

**Key Points:**
- The token is already available in your environment as `$WSDOT_ACCESS_TOKEN`
- Never hardcode tokens or try to set the environment variable manually
- All three methods (fetch-dottie, fetch-native, curl) use the same token
- WSDOT APIs use `AccessCode` parameter, WSF APIs use `apiaccesscode` parameter

## Official Documentation Sources

### WSDOT APIs (12 total)

| API Name | Documentation | REST API Reference |
|----------|---------------|-------------------|
| Border Crossings | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html) | [REST](https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help) |
| Bridge Clearances | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html) | [REST](https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/Help) |
| Commercial Vehicle Restrictions | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/class_c_v_restrictions.html) | [REST](https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help) |
| Highway Alerts | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html) | [REST](https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help) |
| Highway Cameras | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html) | [REST](https://wsdot.wa.gov/Traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help) |
| Mountain Pass Conditions | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html) | [REST](https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help) |
| Toll Rates | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html) | [REST](https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/Help) |
| Traffic Flow | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html) | [REST](https://wsdot.wa.gov/Traffic/api/TrafficFlow/TrafficFlowREST.svc/Help) |
| Travel Times | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html) | [REST](https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/Help) |
| Weather Information | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html) | [REST](https://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/Help) |
| Weather Information Extended | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_scanweb_controller.html) | [REST](https://wsdot.wa.gov/Traffic/api/api/Scanweb) |
| Weather Stations | [Docs](https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html) | [REST](https://wsdot.wa.gov/Traffic/api/WeatherStations/WeatherStationsREST.svc/Help) |

### WSF APIs (4 total)

| API Name | Documentation | REST API Reference | WSF Specification |
|----------|---------------|-------------------|-------------------|
| WSF Fares | [Docs](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html) | [WSF Fares REST API](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html) |
| WSF Schedule | [Docs](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html) | [WSF Schedule REST API](https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html) |
| WSF Terminals | [Docs](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html) | [WSF Terminals REST API](https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html) |
| WSF Vessels | [Docs](https://wsdot.wa.gov/traffic/api/) | [REST](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html) | [WSF Vessels REST API](https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html) |

## Testing and Verification

### Available Functions

Use these commands to see all available functions:

```bash
# List all available functions
fetch-dottie --list

# Get help for specific tools
fetch-dottie --help
fetch-native --help
```

### Example Function Calls

**Current function names** (updated from the old documentation):

```bash
# Border crossing data
fetch-dottie getBorderCrossings

# Terminal information
fetch-dottie terminalWaitTimes
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'

# Vessel information
fetch-dottie vesselLocations
fetch-dottie vesselBasicsById '{"vesselId": 1}'

# Highway alerts
fetch-dottie getAlerts
fetch-dottie getAlertsByRegionId '{"regionId": 1}'

# Weather data
fetch-dottie getWeatherInformation
fetch-dottie getMountainPassConditions
```

### When Documentation and Implementation Differ

1. **First**: Test with all three methods to understand the discrepancy
2. **Compare**: Check if the issue is with validation, data transformation, or API behavior
3. **Report**: Inform the user immediately and include:
   - The function name and parameters you tested
   - Results from fetch-dottie vs fetch-native vs curl
   - Links to official documentation
   - Your analysis of what seems incorrect

**Never modify schemas or implementation** - report discrepancies for resolution.

## Date Handling

### How Date Parameters Work

**Input**: All date parameters accept YYYY-MM-DD string format:
```typescript
// ✅ CORRECT - Accept YYYY-MM-DD strings
export const paramsSchema = z.object({
  tripDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
});
```

**fetch-dottie** validates YYYY-MM-DD string format:
```bash
# ✅ CORRECT - Use YYYY-MM-DD string format
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}'

# ❌ INCORRECT - Will show validation error
fetch-dottie scheduleByRoute '{"tripDate": "invalid-date", "routeId": 1}'

# Works with all fetch strategies
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}' --no-validation
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}' --jsonp
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}' --jsonp --no-validation
```

**curl** uses the same YYYY-MM-DD format:
```bash
# All APIs now use YYYY-MM-DD format consistently
curl "https://wsdot.wa.gov/Traffic/api/.../?AccessCode=$WSDOT_ACCESS_TOKEN&date=2025-10-01"
curl "https://www.wsdot.wa.gov/ferries/api/.../?apiaccesscode=$WSDOT_ACCESS_TOKEN&date=2025-10-01"
```

## Error Handling & Troubleshooting

### Common Issues

**Authentication Errors:**
```bash
# Test if token is accessible
echo $WSDOT_ACCESS_TOKEN

# Test basic connectivity
fetch-dottie getBorderCrossings --quiet
curl "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
```

**Parameter Errors (when not using --no-validation):**
```bash
# Will show validation error for invalid parameters
fetch-dottie terminalWaitTimesById '{"invalidParam": "value"}'

# Correct usage
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'

# Using --no-validation bypasses parameter validation
fetch-dottie terminalWaitTimesById '{"invalidParam": "value"}' --no-validation
```

**Date Format Errors:**
```bash
# ✅ CORRECT - Use YYYY-MM-DD string format
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}'

# ❌ INCORRECT - Will show validation error
fetch-dottie scheduleByRoute '{"tripDate": "invalid-date", "routeId": 1}'

# For curl, use YYYY-MM-DD format consistently
curl "https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedule/2025-10-01/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
```

**"Getting HTML Help Pages Instead of JSON" (curl):**
```bash
# ❌ This often returns HTML help page instead of JSON error
curl "https://wsdot.wa.gov/Traffic/api/.../?AccessCode=$WSDOT_ACCESS_TOKEN&invalidParameter=value"

# ✅ Check expected parameters first
fetch-dottie --list  # See available functions
fetch-dottie getBridgeClearances --quiet  # Test with defaults first

# ✅ Then construct curl command correctly
curl "https://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearanceByRoute?AccessCode=$WSDOT_ACCESS_TOKEN&route=005"
```

**Tip**: If curl returns HTML help pages, the parameters are likely incorrect. Use `fetch-dottie --list` to see available functions and their expected parameters first.

## Choosing the Right Method

### Use fetch-dottie (default) when:
- You need type safety and validation
- You want automatic default parameter handling
- You're building production applications
- You want clear, helpful error messages for invalid parameters
- You need to ensure data quality

### Use fetch-dottie --no-validation when:
- You need maximum performance
- You want automatic default parameter handling
- You're debugging API responses
- You want automatic .NET date conversion
- You're exploring API behavior and need raw API error messages

### Use fetch-dottie --jsonp when:
- You're running in a browser environment
- You need to bypass CORS restrictions
- You want validation in browser contexts

### Use fetch-dottie --jsonp --no-validation when:
- You're in a browser environment
- You need maximum performance
- You want raw data without validation

### Use curl when:
- You need to see exact HTTP requests/responses
- You're debugging authentication issues
- You want to understand raw API behavior
- You're testing specific API endpoints manually
- You need to construct parameters manually (no automatic defaults)

**Key Difference**: fetch-dottie will automatically insert sensible default parameters for endpoints that require parameters, unless specific parameters are provided. curl requires manual parameter specification and often returns HTML help pages for invalid parameters instead of JSON error messages.

## Best Practices Summary

### 1. Use the Right Tool for the Job
- **fetch-dottie (default)**: Default choice for most work
- **fetch-dottie --no-validation**: When you need speed or raw data
- **fetch-dottie --jsonp**: For browser environments
- **curl**: For debugging and understanding APIs

### 2. Test with Multiple Methods
- Compare fetch-dottie vs fetch-dottie --no-validation vs curl results
- Use curl for debugging authentication or network issues
- Verify behavior across different fetch strategies when investigating problems

### 3. Handle Authentication Correctly
- Always use `$WSDOT_ACCESS_TOKEN` (already set in environment)
- Never try to set or hardcode the token
- Test token accessibility with `echo $WSDOT_ACCESS_TOKEN`

### 4. Follow Documentation Hierarchy
- **Primary**: Official WSDOT/WSF documentation for API structure
- **Secondary**: Test with CLI tools to verify behavior
- **Tertiary**: Use curl for debugging when needed

### 5. Report Issues Appropriately
- Test with all three methods before reporting
- Include results from different methods in reports
- Never modify schemas or implementation code

## Example Workflow

1. **Start with Documentation**: Review official docs for API structure
2. **Test with fetch-dottie**: Verify behavior with validation
3. **Compare with fetch-dottie --no-validation**: Check raw API behavior
4. **Debug with curl**: Use direct HTTP requests if needed
5. **Report Discrepancies**: Include results from different fetch strategies

## Important Note

Agents **must never** edit schema implementations or related fetching logic. The different methods (fetch-dottie with various flags, curl) are tools for understanding and working with the APIs - not for modifying the underlying implementation.
