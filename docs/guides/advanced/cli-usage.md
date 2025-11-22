# CLI Usage Guide

This guide covers using WS-Dottie from command line, including installation, configuration, and common commands.

> **📚 Documentation Navigation**: [Documentation Index](../../INDEX.md) • [Getting Started](../../getting-started.md) • [API Guide](../api-guide.md)

## 🚀 Quick Start

### 1. Install WS-Dottie

```bash
# Install globally
npm install -g ws-dottie

# Or install locally
npm install ws-dottie
```

### 2. Configure API Key

```bash
# Set API key as environment variable
export WSDOT_ACCESS_TOKEN=your_api_key_here

# Or create a .env file
echo "WSDOT_ACCESS_TOKEN=your_api_key_here" >> .env
```

### 3. Basic Usage

```bash
# Get help
fetch-dottie --help

# List all available endpoints
fetch-dottie --list

# Get vessel locations
fetch-dottie fetchVesselLocations

# Get highway alerts
fetch-dottie fetchAlerts

# Get weather information
fetch-dottie fetchWeatherInformation

# Get mountain pass conditions
fetch-dottie fetchMountainPassConditions
```

## 🏗️ CLI Structure

WS-Dottie CLI provides a command-line interface for accessing Washington State transportation data:

```bash
# Basic command structure
fetch-dottie <function-name> [params] [options]

# Examples
fetch-dottie fetchVesselLocations
fetch-dottie fetchBorderCrossings
fetch-dottie fetchBridgeClearancesByRoute '{"Route": "005"}'
```

### Available Options

**Transport & Validation Control**
- `--jsonp` - Use JSONP transport for browser environments (bypasses CORS)
- `--no-validation` - Disable Zod validation (raw fetch with .NET date conversion)

**Output Formatting**
- `--pretty` - Pretty-print JSON output with 2-space indentation (default)
- `--concise` - Concise array output with brackets on own lines
- `--silent` - Suppress all output except final JSON result
- `--limit <number>` - Truncate output to first N items

**Discovery**
- `--list` - List all available endpoints with descriptions
- `--help` - Show help information

## 🚢 Ferry Commands

### Vessel Locations

```bash
# Get all vessel locations
fetch-dottie fetchVesselLocations

# Get specific vessel by ID
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}'

# Pretty-printed output
fetch-dottie fetchVesselLocations --pretty

# Concise output
fetch-dottie fetchVesselLocations --concise

# Limit to first 5 vessels
fetch-dottie fetchVesselLocations --limit 5
```

### Terminal Information

```bash
# Get all terminal wait times
fetch-dottie fetchTerminalWaitTimes

# Get specific terminal wait time
fetch-dottie fetchTerminalWaitTimesByTerminalId '{"TerminalID": 3}'

# Get terminal locations
fetch-dottie fetchTerminalLocations

# Get terminal basics
fetch-dottie fetchTerminalBasics
```

### Schedule Information

```bash
# Get schedules for specific route and date
fetch-dottie fetchScheduleByTripDateAndRouteId '{"TripDate": "2025-01-28", "RouteID": 3}'

# Get route details
fetch-dottie fetchRouteDetailsByTripDateAndRouteId '{"TripDate": "2025-01-28", "RouteID": 3}'

# Get all routes for a date
fetch-dottie fetchRoutesByTripDate '{"TripDate": "2025-01-28"}'
```

### Fare Information

```bash
# Get fares for specific trip
fetch-dottie fetchFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'

# Get fare totals
fetch-dottie fetchFareTotalsByTripDateAndRoute '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false, "FareLineItemID": 1, "Quantity": 1}'
```

## 🚗 Traffic Commands

### Highway Alerts

```bash
# Get all highway alerts
fetch-dottie fetchAlerts

# Get specific alert by ID
fetch-dottie fetchAlertById '{"AlertID": 468632}'

# Get alerts by map area
fetch-dottie fetchAlertsByMapArea '{"MapArea": "Seattle"}'

# Search alerts
fetch-dottie searchAlerts '{"StateRoute": "005", "Region": "King County"}'
```

### Traffic Flow

```bash
# Get all traffic flow data
fetch-dottie fetchTrafficFlows

# Get specific traffic flow by ID
fetch-dottie fetchTrafficFlowById '{"FlowDataID": 123}'
```

### Travel Times

```bash
# Get all travel times
fetch-dottie fetchTravelTimes

# Get specific travel time by ID
fetch-dottie fetchTravelTimeById '{"TravelTimeID": 456}'
```

### Highway Cameras

```bash
# Get all highway cameras
fetch-dottie fetchHighwayCameras

# Get specific camera by ID
fetch-dottie fetchHighwayCameraByCameraId '{"CameraID": 789}'

# Search cameras by route and milepost
fetch-dottie searchHighwayCamerasByRouteAndMilepost '{"Route": "005", "Milepost": 10}'
```

### Toll Rates

```bash
# Get all toll rates
fetch-dottie fetchTollRates

# Get toll trip info
fetch-dottie fetchTollTripInfo

# Get toll trip rates
fetch-dottie fetchTollTripRates
```

### Border Crossings

```bash
# Get all border crossings
fetch-dottie fetchBorderCrossings
```

## 🌤️ Weather Commands

### Weather Information

```bash
# Get all weather information
fetch-dottie fetchWeatherInformation

# Get weather for specific stations
fetch-dottie fetchCurrentWeatherForStations '{"StationList": "1909,1910"}'

# Get weather for specific station
fetch-dottie fetchWeatherInformationByStationId '{"StationID": 1909}'

# Search weather information
fetch-dottie searchWeatherInformation '{"StationID": 1909, "SearchStartTime": "2025-01-01T00:00:00", "SearchEndTime": "2025-01-02T00:00:00"}'
```

### Weather Readings

```bash
# Get weather readings
fetch-dottie fetchWeatherReadings

# Get surface measurements
fetch-dottie fetchSurfaceMeasurements

# Get sub-surface measurements
fetch-dottie fetchSubSurfaceMeasurements
```

### Weather Stations

```bash
# Get all weather stations
fetch-dottie fetchWeatherStations
```

### Mountain Pass Conditions

```bash
# Get all mountain pass conditions
fetch-dottie fetchMountainPassConditions

# Get specific pass condition by ID
fetch-dottie fetchMountainPassConditionById '{"PassConditionID": 1}'
```

## 🏗️ Infrastructure Commands

### Bridge Clearances

```bash
# Get all bridge clearances
fetch-dottie fetchBridgeClearances

# Get bridge clearances by route
fetch-dottie fetchBridgeClearancesByRoute '{"Route": "005"}'
```

### Commercial Vehicle Restrictions

```bash
# Get all commercial vehicle restrictions
fetch-dottie fetchCommercialVehicleRestrictions

# Get restrictions with ID
fetch-dottie fetchCommercialVehicleRestrictionsWithId
```

## 🔧 Advanced Usage

### Environment Testing

```bash
# Server-side testing (default - native fetch)
fetch-dottie fetchVesselLocations

# Browser environment testing (JSONP)
fetch-dottie fetchBorderCrossings --jsonp

# JSONP without validation (fastest)
fetch-dottie fetchVesselBasics --jsonp --no-validation
```

### Output Formatting

```bash
# Pretty-printed JSON (default)
fetch-dottie fetchVesselLocations --pretty

# Concise array output
fetch-dottie fetchVesselLocations --concise

# Silent mode (JSON only, no extra output)
fetch-dottie fetchBorderCrossings --silent

# Limit output to first 10 items
fetch-dottie fetchVesselLocations --limit 10
```

### Data Exploration

```bash
# Get bridge clearances for I-5
fetch-dottie fetchBridgeClearancesByRoute '{"Route": "005"}'

# Get ferry fare information for specific trip
fetch-dottie fetchFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'

# Get specific vessel location (VesselID: 18)
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}'

# Get specific highway alert (AlertID: 468632)
fetch-dottie fetchAlertById '{"AlertID": 468632}'

# Get weather from specific station (StationID: 1909)
fetch-dottie fetchWeatherInformationByStationId '{"StationID": 1909}'

# Get vessel history for specific date range
fetch-dottie fetchVesselHistoriesByVesselNameAndDateRange '{"VesselName": "Tacoma", "DateStart": "2025-09-01", "DateEnd": "2025-10-01"}'
```

### Integration with Shell Commands

```bash
# Pipe to jq for filtering
fetch-dottie fetchVesselLocations --silent | jq '.[] | select(.Speed > 15)'

# Save output to file
fetch-dottie fetchVesselLocations --pretty > vessels.json

# Count results
fetch-dottie fetchVesselLocations --silent | jq 'length'

# Extract specific fields
fetch-dottie fetchVesselLocations --silent | jq '.[] | {VesselName, Speed, Latitude, Longitude}'
```

## 🔄 Automation Examples

### Shell Scripting

```bash
#!/bin/bash

# Ferry monitoring script
export WSDOT_ACCESS_TOKEN="your_api_key_here"

# Get current vessel locations
VESSELS=$(fetch-dottie fetchVesselLocations --silent)

echo "Current vessel locations:"
echo "$VESSELS" | jq -r '.[] | "\(.VesselName): \(.Latitude),\(.Longitude)"'

# Get terminal wait times
WAIT_TIMES=$(fetch-dottie fetchTerminalWaitTimes --silent)

echo "Terminal wait times:"
echo "$WAIT_TIMES" | jq -r '.[] | "\(.TerminalName): \(.WaitTime) minutes"'
```

### Cron Jobs

```bash
# Crontab entry for weather monitoring
# Every 15 minutes
*/15 * * * * /usr/local/bin/fetch-dottie fetchWeatherInformation --silent >> /var/log/weather-monitor.log 2>&1

# Hourly ferry schedule check
0 * * * * /usr/local/bin/fetch-dottie fetchScheduleByTripDateAndRouteId '{"TripDate": "'$(date +\%Y-\%m-\%d)'", "RouteID": 3}' --silent >> /var/log/ferry-schedule.log 2>&1
```

## 📊 Available Functions

The CLI supports all endpoints across 16 APIs. Use `fetch-dottie --list` to see all available functions with descriptions.

### Function Naming Convention

Function names follow the pattern `fetch<ResourceName>` or `fetch<ResourceName>By<Parameter>`:

- `fetchVesselLocations` - Get all vessel locations
- `fetchVesselLocationsByVesselId` - Get specific vessel location
- `fetchAlerts` - Get all alerts
- `fetchAlertById` - Get specific alert
- `fetchScheduleByTripDateAndRouteId` - Get schedule with parameters

### Parameter Format

Parameters are passed as JSON strings:

```bash
# Single parameter
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}'

# Multiple parameters
fetch-dottie fetchFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'
```

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[Fetching Data Guide](./fetching-data.md)** - Basic fetch-dottie usage patterns
- **[Error Handling Reference](./error-handling.md)** - WS-Dottie error types and recovery
