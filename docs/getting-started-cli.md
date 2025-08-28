# 🚀 Getting Started with ws-dottie CLI

The ws-dottie CLI provides command-line access to **89+ endpoints** across **16 Washington State transportation APIs**, enabling you to fetch real-time transportation data directly from your terminal.

## ⚠️ CRITICAL RULES FOR AGENTS

- **NEVER modify schemas** unless expressly requested by the user
- **ALWAYS use** `$WSDOT_ACCESS_TOKEN` environment variable for authentication
- **NEVER attempt to set** or modify authentication schemas
- We are locking down schemas to prevent breaking changes

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [Available APIs](#available-apis)
  - [WSDOT APIs](#wsdot-apis)
  - [WSF APIs](#wsf-apis)
- [Advanced Usage](#advanced-usage)
- [Examples by Use Case](#examples-by-use-case)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

```bash
# Install ws-dottie
npm install ws-dottie

# Set your API key
export WSDOT_ACCESS_TOKEN=your_api_key_here

# Get real-time border crossing data
ws-dottie getBorderCrossings

# Get ferry terminal information with parameters
ws-dottie getTerminalWaitTimes
```

## 📦 Installation

### Option 1: Install Globally
```bash
npm install -g ws-dottie
```

### Option 2: Install Locally
```bash
npm install ws-dottie
```

### Option 3: Use with npx (No Installation Required)
```bash
npx ws-dottie getBorderCrossings
```

## ⚙️ Configuration

### Set API Key

**Environment Variable (Required):**
```bash
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

**Using a .env file:**
```env
WSDOT_ACCESS_TOKEN=your_api_key_here
```

> **Note:** Get your free API key from the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access)
>
> **⚠️ IMPORTANT**: Agents must **ALWAYS** use the `$WSDOT_ACCESS_TOKEN` environment variable. Never hardcode tokens or attempt to set them in any other way. The ws-dottie package automatically reads from this environment variable or from `.env` files. Agents should **never attempt to set or modify authentication schemas**.

## 🖥️ Basic Usage

### Command Syntax
```bash
ws-dottie <function-name> [params] [--pretty=false]
```

### Examples
```bash
# Simple function call (no parameters)
ws-dottie getBorderCrossings

# Function with JSON parameters
ws-dottie getBridgeClearances '{"route": "005"}'

# Raw output (no pretty-printing)
ws-dottie getBorderCrossings --raw

# Get help
ws-dottie --help
```

### Output Formats

**Pretty-printed JSON (default):**
```bash
ws-dottie getBorderCrossings
```

**Raw JSON:**
```bash
ws-dottie getBorderCrossings --raw
```

## 📊 Available APIs

### WSDOT APIs

#### 🛣️ **Traffic & Travel**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getBorderCrossings` | Real-time border crossing wait times | None |
| `getBridgeClearances` | Bridge height restrictions | `{"route": "005"}` |
| `getCommercialVehicleRestrictions` | Truck restrictions | None |
| `getCommercialVehicleRestrictionsWithId` | Specific restriction by ID | `{"id": 1}` |
| `getHighwayAlerts` | Traffic incidents and construction | None |
| `getHighwayAlertById` | Specific alert by ID | `{"alertId": 1}` |
| `getHighwayAlertsByMapArea` | Alerts by map area | `{"mapAreaId": 1}` |
| `getHighwayAlertsByRegionId` | Alerts by region | `{"regionId": 1}` |
| `getEventCategories` | Alert categories | None |
| `getMapAreas` | Map areas | None |
| `getTrafficFlowById` | Traffic flow data by ID | `{"flowId": 1}` |
| `getTrafficFlows` | All traffic flow data | None |
| `getTravelTimeById` | Travel time by ID | `{"travelTimeId": 1}` |
| `getTravelTimes` | All travel times | None |

#### 🌤️ **Weather & Conditions**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getWeatherInformation` | Weather stations data | None |
| `getWeatherInformationByStationId` | Specific station weather | `{"stationId": 1}` |
| `getWeatherInformationForStations` | Multiple stations | `{"stationIds": [1, 2, 3]}` |
| `getSearchWeatherInformation` | Search weather by location | `{"searchText": "Seattle"}` |
| `getWeatherInformationExtended` | Extended weather data | `{"stationId": 1}` |
| `getWeatherStations` | Weather station locations | None |
| `getMountainPassConditionById` | Mountain pass status | `{"passId": 1}` |
| `getMountainPassConditions` | All mountain passes | None |

#### 📷 **Cameras & Infrastructure**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getHighwayCamera` | Camera by ID | `{"cameraId": 1}` |
| `getHighwayCameras` | All traffic cameras | None |

#### 💰 **Tolls & Pricing**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getTollRates` | Toll rates | None |
| `getTollTripRates` | Trip-based tolls | None |
| `getTollTripInfo` | Toll trip information | None |
| `getTollTripVersion` | Toll system version | None |
| `getTripRatesByDate` | Toll rates by date | `{"date": "2025-10-01"}` |

### WSF APIs (Washington State Ferries)

#### 🚢 **Vessels**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getVesselBasics` | Basic vessel information | None |
| `getVesselBasicsById` | Specific vessel details | `{"vesselId": 1}` |
| `getVesselLocations` | Real-time vessel positions | None |
| `getVesselLocationsByVesselId` | Specific vessel location | `{"vesselId": 1}` |
| `getVesselVerbose` | Detailed vessel information | None |
| `getVesselVerboseById` | Detailed vessel by ID | `{"vesselId": 1}` |
| `getVesselStats` | Vessel statistics | None |
| `getVesselStatsById` | Specific vessel stats | `{"vesselId": 1}` |
| `getVesselAccommodations` | Vessel accommodation info | None |
| `getVesselAccommodationsById` | Specific vessel accommodations | `{"vesselId": 1}` |
| `getVesselHistory` | Recent vessel history | None |
| `getVesselHistoryByVesselAndDateRange` | Historical vessel data | `{"vesselName": "Cathlamet", "dateStart": "2024-01-01", "dateEnd": "2024-01-07"}` |
| `getAllVesselHistories` | All vessel histories | `{"dateStart": "2024-01-01", "dateEnd": "2024-01-07"}` |

#### 🚟 **Terminals**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getTerminalBasics` | Basic terminal information | None |
| `getTerminalBasicsByTerminalId` | Specific terminal | `{"terminalId": 7}` |
| `getTerminalLocations` | Terminal locations | None |
| `getTerminalLocationsByTerminalId` | Specific terminal location | `{"terminalId": 7}` |
| `getTerminalVerbose` | Detailed terminal info | None |
| `getTerminalVerboseByTerminalId` | Detailed terminal by ID | `{"terminalId": 7}` |
| `getTerminalSailingSpace` | Terminal sailing space | None |
| `getTerminalSailingSpaceByTerminalId` | Sailing space by terminal | `{"terminalId": 7}` |
| `getTerminalWaitTimes` | Current wait times | None |
| `getTerminalWaitTimesByTerminalId` | Wait times by terminal | `{"terminalId": 7}` |
| `getTerminalBulletins` | Terminal bulletins | None |
| `getTerminalBulletinsByTerminalId` | Bulletins by terminal | `{"terminalId": 7}` |
| `getTerminalTransports` | Terminal transport options | None |
| `getTerminalTransportsByTerminalId` | Transport by terminal | `{"terminalId": 7}` |

#### 📅 **Schedules**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getRouteDetails` | Route details | `{"tripDate": "2025-10-01"}` |
| `getRouteDetailsByTerminals` | Route by terminals | `{"tripDate": "2025-10-01", "departingTerminalId": 7, "arrivingTerminalId": 3}` |
| `getRouteDetailsByRoute` | Route by route ID | `{"tripDate": "2025-10-01", "routeId": 1}` |
| `getRoutes` | All routes | `{"date": "2025-10-01"}` |
| `getRoutesByTerminals` | Routes by terminals | `{"date": "2025-10-01", "departingTerminalId": 7, "arrivingTerminalId": 3}` |
| `getRoutesWithDisruptions` | Routes with disruptions | `{"date": "2025-10-01"}` |
| `getScheduleByTerminals` | Schedule by terminals | `{"date": "2025-10-01", "departingTerminalId": 7, "arrivingTerminalId": 3}` |
| `getScheduleByRoute` | Schedule by route | `{"date": "2025-10-01", "routeId": 1}` |
| `getScheduleTodayByTerminals` | Today's schedule | `{"departingTerminalId": 7, "arrivingTerminalId": 3}` |
| `getScheduleTodayByRoute` | Today's schedule by route | `{"routeId": 1}` |
| `getSailings` | Sailing information | `{"routeId": 1, "date": "2025-10-01"}` |
| `getAllSailings` | All sailings | `{"date": "2025-10-01"}` |
| `getTerminals` | Terminal list | `{"date": "2025-10-01"}` |
| `getTerminalMates` | Terminal connections | `{"date": "2025-10-01"}` |
| `getTerminalsAndMates` | Terminals and connections | `{"date": "2025-10-01"}` |
| `getTerminalsAndMatesByRoute` | By route | `{"date": "2025-10-01", "routeId": 1}` |
| `getActiveSeasons` | Active seasons | None |
| `getAlerts` | Schedule alerts | None |
| `getTimeAdjustments` | Time adjustments | None |
| `getTimeAdjustmentsByRoute` | Adjustments by route | `{"routeId": 1}` |
| `getScheduledRoutes` | Scheduled routes | None |
| `getScheduledRoutesBySeason` | Routes by season | `{"seasonId": 1}` |
| `getValidDateRange` | Valid date range | None |

#### 💰 **Fares**

| Function | Description | Parameters |
|----------|-------------|------------|
| `getFareLineItems` | Fare line items | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getFareLineItemsBasic` | Basic fare items | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getFareLineItemsVerbose` | Detailed fare items | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getFareTotals` | Fare totals | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getFaresTerminals` | Fare terminals | `{"date": "2025-10-01"}` |
| `getFaresTerminalMates` | Terminal fare connections | `{"date": "2025-10-01"}` |
| `getTerminalCombo` | Terminal combinations | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getTerminalComboVerbose` | Detailed combinations | `{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}` |
| `getFaresValidDateRange` | Valid fare date range | None |

## 🔧 Advanced Usage

### Parameter Validation

The CLI validates all parameters against expected schemas:

```bash
# ✅ Valid parameters
ws-dottie getVesselBasicsById '{"vesselId": 1}'

# ❌ Invalid parameters (will show validation error)
ws-dottie getVesselBasicsById '{"invalidParam": "value"}'
```

## 🤖 Agent Mode

The CLI includes special modes designed for automation and AI agents.

**⚠️ CRITICAL RULES FOR AGENTS:**

- **NEVER modify schemas** unless expressly requested by the user
- **ALWAYS use** `$WSDOT_ACCESS_TOKEN` environment variable for authentication
- **NEVER attempt to set** or modify authentication schemas
- We are locking down schemas to prevent breaking changes

### Agent Mode (`--agent`)
Suppresses debug output and verbose messages while keeping error messages:

```bash
# Normal mode (with debug output)
ws-dottie getBorderCrossings

# Agent mode (clean output)
ws-dottie getBorderCrossings --agent
```

### Quiet Mode (`--quiet`)
Same as agent mode - suppresses debug output and verbose messages:

```bash
ws-dottie getBorderCrossings --quiet
```

### Silent Mode (`--silent`)
Suppresses all output except the final JSON result:

```bash
ws-dottie getBorderCrossings --silent
```

### Agent Usage Examples

```bash
# Get clean ferry data for processing
ws-dottie getVesselLocations --agent

# Get border crossing data for analysis
ws-dottie getBorderCrossings --quiet

# Get raw JSON for programmatic use
ws-dottie getTerminalWaitTimes --silent

# Use in scripts or automation
DATA=$(ws-dottie getBorderCrossings --agent)
echo "$DATA" | jq '.[] | .CrossingName'
```

### Benefits for Agents

- **Clean Output**: No debug messages cluttering the response
- **Structured Data**: Always returns valid JSON
- **Error Handling**: Clear error messages when parameters are invalid
- **Consistent Format**: Predictable output structure
- **Fast Execution**: Minimal overhead from logging

### JSON Formatting

```bash
# Pretty-printed (default)
ws-dottie getBorderCrossings

# Compact JSON
ws-dottie getBorderCrossings --raw

# Pipe to other tools
ws-dottie getBorderCrossings | jq '.[] | .CrossingName'
```

### Error Handling

The CLI provides clear error messages for:
- Invalid function names
- Malformed JSON parameters
- Missing API keys
- Network/API errors
- Parameter validation failures

## 🎯 Examples by Use Case

### 🚗 **Trip Planning**
```bash
# Check border crossing wait times
ws-dottie getBorderCrossings

# Get travel times for your route
ws-dottie getTravelTimes

# Check for highway alerts
ws-dottie getHighwayAlerts
```

### 🚢 **Ferry Travel**
```bash
# Find ferry schedules
ws-dottie getRoutes '{"date": "2025-10-01"}'

# Check terminal wait times
ws-dottie getTerminalWaitTimes

# Get fare information
ws-dottie getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-10-01"}'
```

### 📷 **Traffic Monitoring**
```bash
# Find traffic cameras
ws-dottie getHighwayCameras

# Check traffic flow
ws-dottie getTrafficFlows

# Monitor weather conditions
ws-dottie getWeatherInformation
```

### 🚛 **Commercial Vehicle**
```bash
# Check bridge clearances
ws-dottie getBridgeClearances '{"route": "005"}'

# Find commercial restrictions
ws-dottie getCommercialVehicleRestrictions

# Check toll rates
ws-dottie getTollRates
```

## 🔍 Troubleshooting

### Common Issues

**"Unknown function" error:**
```bash
# Check available functions
ws-dottie --help
```

**"Parameter validation failed" error:**
```bash
# Check the expected parameter format
ws-dottie --help
# Example: vesselId should be a number
ws-dottie getVesselBasicsById '{"vesselId": "1"}'  # ❌ String
ws-dottie getVesselBasicsById '{"vesselId": 1}'    # ✅ Number
```

**API errors:**
```bash
# Verify your API key is set
echo $WSDOT_ACCESS_TOKEN

# Test basic connectivity
ws-dottie getBorderCrossings --raw | head -5
```

### Debug Mode

```bash
# The CLI provides detailed logging for troubleshooting
ws-dottie getBorderCrossings  # Look for debug messages
```

### Performance Tips

```bash
# Use --raw for faster output in scripts
ws-dottie getBorderCrossings --raw > data.json

# Limit output with tools like jq
ws-dottie getBorderCrossings | jq '.[:5]'  # First 5 items only
```

## 📚 Related Documentation

- [Main Getting Started Guide](../GETTING-STARTED.md)
- [API Overview](../API-OVERVIEW.md)
- [API Reference](../API-REFERENCE.md)
- [Examples](../EXAMPLES.md)

---

**🎉 Happy exploring Washington State's transportation data!**

The CLI makes it easy to access real-time ferry schedules, traffic conditions, weather data, and more directly from your terminal. Perfect for development, monitoring, automation, or just staying informed about Washington's transportation network.
