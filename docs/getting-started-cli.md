# 🚀 Getting Started with ws-dottie CLI

The ws-dottie CLI provides command-line access to **89+ endpoints** across **16 Washington State transportation APIs**, enabling you to fetch real-time transportation data directly from your terminal.

## 🛠️ Unified CLI Tool

ws-dottie includes a single, unified CLI tool with configurable fetch strategies:

- **`fetch-dottie`**: Unified API client with configurable transport and validation options
  - Use `--jsonp` flag for browser environments (bypasses CORS)
  - Use `--no-validation` flag for raw API access (no Zod validation)
  - Default: Native fetch with full Zod validation and data transformation

## ⚠️ CRITICAL RULES FOR AGENTS

- **NEVER modify schemas** unless expressly requested by the user
- **ALWAYS use** `$WSDOT_ACCESS_TOKEN` environment variable for authentication, which is already set
- **NEVER attempt to set** or modify authentication schemas

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

# Get real-time border crossing data (default: native fetch with validation)
fetch-dottie getBorderCrossings

# Get raw border crossing data (no validation)
fetch-dottie getBorderCrossings --no-validation

# Get data using JSONP (for browser environments)
fetch-dottie getBorderCrossings --jsonp

# Get raw data using JSONP (browser, no validation)
fetch-dottie getBorderCrossings --jsonp --no-validation

# Get ferry terminal information with parameters
fetch-dottie getTerminalWaitTimes

# List all available functions
fetch-dottie --list
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
npx fetch-dottie getBorderCrossings
npx fetch-dottie getBorderCrossings --no-validation
npx fetch-dottie getBorderCrossings --jsonp
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
fetch-dottie <function-name> [params] [options]
```

### Available Options
- `--list`: List all available endpoints
- `--pretty`: Pretty-print JSON output with 2-space indentation
- `--quiet`: Suppress debug output and verbose messages
- `--silent`: Suppress all output except final JSON result
- `--head <number>`: Truncate output to first N lines
- `--jsonp`: Use JSONP instead of native fetch (for browser environments)
- `--no-validation`: Disable Zod validation (use raw fetch with .NET date conversion)

### Examples
```bash
# Simple function call (no parameters) - default: native fetch with validation
fetch-dottie getBorderCrossings

# Function with JSON parameters
fetch-dottie getBridgeClearances '{"route": "005"}'

# Pretty-print output
fetch-dottie getBorderCrossings --pretty

# Quiet mode (no debug messages)
fetch-dottie getBorderCrossings --quiet

# Raw data access (no validation)
fetch-dottie getBorderCrossings --no-validation

# JSONP for browser environments (with validation)
fetch-dottie getBorderCrossings --jsonp

# JSONP for browser environments (no validation)
fetch-dottie getBorderCrossings --jsonp --no-validation

# List all available functions
fetch-dottie --list

# Use with npx (no installation required)
npx fetch-dottie getBorderCrossings
npx fetch-dottie getBorderCrossings --no-validation
```

### Output Formats

**Pretty-printed JSON (default):**
```bash
fetch-dottie getBorderCrossings
```

**Compact JSON:**
```bash
fetch-dottie getBorderCrossings --pretty=false
```

**Quiet mode (no debug output):**
```bash
fetch-dottie getBorderCrossings --quiet
```

**Silent mode (only JSON output):**
```bash
fetch-dottie getBorderCrossings --silent
```

## 📊 Available APIs

### WSDOT APIs

#### 🛣️ **Traffic & Travel**

| Function | Description | API Group |
|----------|-------------|-----------|
| `getBorderCrossings` | Real-time border crossing wait times | wsdot-border-crossings |
| `getBridgeClearances` | Bridge height restrictions | wsdot-bridge-clearances |
| `getBridgeClearancesByRoute` | Bridge clearances by route | wsdot-bridge-clearances |
| `getCommercialVehicleRestrictions` | Truck restrictions | wsdot-commercial-vehicle-restrictions |
| `getCommercialVehicleRestrictionsWithId` | Specific restriction by ID | wsdot-commercial-vehicle-restrictions |
| `getAlert` | Specific alert | wsdot-highway-alerts |
| `getAlerts` | Traffic incidents and construction | wsdot-highway-alerts |
| `getAlertsByRegionId` | Alerts by region | wsdot-highway-alerts |
| `getAlertsForMapArea` | Alerts by map area | wsdot-highway-alerts |
| `getEventCategories` | Alert categories | wsdot-highway-alerts |
| `getMapAreas` | Map areas | wsdot-highway-alerts |
| `searchAlerts` | Search alerts | wsdot-highway-alerts |
| `getTrafficFlow` | Traffic flow data | wsdot-traffic-flow |
| `getTrafficFlowById` | Traffic flow data by ID | wsdot-traffic-flow |
| `getTravelTime` | Travel time data | wsdot-travel-times |
| `getTravelTimes` | All travel times | wsdot-travel-times |

#### 🌤️ **Weather & Conditions**

| Function | Description | API Group |
|----------|-------------|-----------|
| `getWeatherInformation` | Weather stations data | wsdot-weather-information |
| `getWeatherInformationByStationId` | Specific station weather | wsdot-weather-information |
| `getWeatherInformationExtended` | Extended weather data | wsdot-weather-information-extended |
| `getWeatherStations` | Weather station locations | wsdot-weather-stations |
| `getMountainPassCondition` | Mountain pass status | wsdot-mountain-pass-conditions |
| `getMountainPassConditions` | All mountain passes | wsdot-mountain-pass-conditions |

#### 📷 **Cameras & Infrastructure**

| Function | Description | API Group |
|----------|-------------|-----------|
| `getHighwayCamera` | Camera by ID | wsdot-highway-cameras |
| `getHighwayCameras` | All traffic cameras | wsdot-highway-cameras |
| `searchHighwayCameras` | Search cameras | wsdot-highway-cameras |

#### 💰 **Tolls & Pricing**

| Function | Description | API Group |
|----------|-------------|-----------|
| `getTollRates` | Toll rates | wsdot-toll-rates |
| `getTollTripInfo` | Toll trip information | wsdot-toll-rates |
| `getTollTripRates` | Trip-based tolls | wsdot-toll-rates |
| `getTollTripVersion` | Toll system version | wsdot-toll-rates |
| `getTripRatesByDate` | Toll rates by date | wsdot-toll-rates |
| `getTripRatesByVersion` | Toll rates by version | wsdot-toll-rates |

### WSF APIs (Washington State Ferries)

#### 🚢 **Vessels**

| Function | Description | API Group |
|----------|-------------|-----------|
| `vesselBasics` | Basic vessel information | wsf-vessels |
| `vesselBasicsById` | Specific vessel details | wsf-vessels |
| `vesselLocations` | Real-time vessel positions | wsf-vessels |
| `vesselLocationsById` | Specific vessel location | wsf-vessels |
| `vesselsVerbose` | Detailed vessel information | wsf-vessels |
| `vesselsVerboseById` | Detailed vessel by ID | wsf-vessels |
| `vesselStats` | Vessel statistics | wsf-vessels |
| `vesselStatsById` | Specific vessel stats | wsf-vessels |
| `vesselAccommodations` | Vessel accommodation info | wsf-vessels |
| `vesselAccommodationsById` | Specific vessel accommodations | wsf-vessels |
| `vesselHistories` | Recent vessel history | wsf-vessels |
| `vesselHistoriesByVesselAndDateRange` | Historical vessel data | wsf-vessels |

#### 🚟 **Terminals**

| Function | Description | API Group |
|----------|-------------|-----------|
| `terminalBasics` | Basic terminal information | wsf-terminals |
| `terminalBasicsById` | Specific terminal | wsf-terminals |
| `terminalLocations` | Terminal locations | wsf-terminals |
| `terminalLocationsById` | Specific terminal location | wsf-terminals |
| `terminalVerbose` | Detailed terminal info | wsf-terminals |
| `terminalVerboseById` | Detailed terminal by ID | wsf-terminals |
| `terminalSailingSpace` | Terminal sailing space | wsf-terminals |
| `terminalSailingSpaceById` | Sailing space by terminal | wsf-terminals |
| `terminalWaitTimes` | Current wait times | wsf-terminals |
| `terminalWaitTimesById` | Wait times by terminal | wsf-terminals |
| `terminalBulletins` | Terminal bulletins | wsf-terminals |
| `terminalBulletinsById` | Bulletins by terminal | wsf-terminals |
| `terminalTransports` | Terminal transport options | wsf-terminals |
| `terminalTransportsById` | Transport by terminal | wsf-terminals |

#### 📅 **Schedules**

| Function | Description | API Group |
|----------|-------------|-----------|
| `activeSeasons` | Active seasons | wsf-schedule |
| `allSailings` | All sailings | wsf-schedule |
| `routeDetails` | Route details | wsf-schedule |
| `routeDetailsByRoute` | Route by route ID | wsf-schedule |
| `routeDetailsByTerminals` | Route by terminals | wsf-schedule |
| `routes` | All routes | wsf-schedule |
| `routesByTerminals` | Routes by terminals | wsf-schedule |
| `routesHavingServiceDisruptions` | Routes with disruptions | wsf-schedule |
| `routesWithDisruptions` | Routes with disruptions | wsf-schedule |
| `sailings` | Sailing information | wsf-schedule |
| `scheduleAlerts` | Schedule alerts | wsf-schedule |
| `scheduleByRoute` | Schedule by route | wsf-schedule |
| `scheduleByTerminals` | Schedule by terminals | wsf-schedule |
| `scheduleTodayByRoute` | Today's schedule by route | wsf-schedule |
| `scheduleTodayByTerminals` | Today's schedule | wsf-schedule |
| `scheduleValidDateRange` | Valid date range | wsf-schedule |
| `scheduledRoutes` | Scheduled routes | wsf-schedule |
| `scheduledRoutesBySeason` | Routes by season | wsf-schedule |
| `terminalMates` | Terminal connections | wsf-schedule |
| `terminals` | Terminal list | wsf-schedule |
| `terminalsAndMates` | Terminals and connections | wsf-schedule |
| `terminalsAndMatesByRoute` | By route | wsf-schedule |
| `timeAdjustments` | Time adjustments | wsf-schedule |
| `timeAdjustmentsByRoute` | Adjustments by route | wsf-schedule |

#### 💰 **Fares**

| Function | Description | API Group |
|----------|-------------|-----------|
| `fareLineItems` | Fare line items | wsf-fares |
| `fareLineItemsBasic` | Basic fare items | wsf-fares |
| `fareLineItemsVerbose` | Detailed fare items | wsf-fares |
| `fareTotals` | Fare totals | wsf-fares |
| `faresTerminals` | Fare terminals | wsf-fares |
| `faresValidDateRange` | Valid fare date range | wsf-fares |
| `terminalCombo` | Terminal combinations | wsf-fares |
| `terminalComboVerbose` | Detailed combinations | wsf-fares |
| `terminalMates` | Terminal fare connections | wsf-fares |

## 📅 Date Handling

### Date Parameter Format

All date parameters in ws-dottie use the **YYYY-MM-DD** string format:

```bash
# ✅ CORRECT - Use YYYY-MM-DD string format
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}'
fetch-dottie fareLineItems '{"tripDate": "2025-12-25", "departingTerminalId": 7, "arrivingTerminalId": 3}'
fetch-dottie getTripRatesByDate '{"fromDate": "2025-01-01", "toDate": "2025-01-31"}'

# ❌ INCORRECT - Will show validation error
fetch-dottie scheduleByRoute '{"tripDate": "invalid-date", "routeId": 1}'
fetch-dottie scheduleByRoute '{"tripDate": "10/01/2025", "routeId": 1}'
```

### Date Validation

The CLI validates date format automatically:
```bash
# Shows clear validation error for invalid dates
fetch-dottie scheduleByRoute '{"tripDate": "invalid-date", "routeId": 1}'
# Output: ❌ Error: Date must be in YYYY-MM-DD format
```

### Using Helper Functions

When working with JavaScript/TypeScript, use the `datesHelper` functions:

```javascript
import { datesHelper } from 'ws-dottie';

// These return YYYY-MM-DD strings
const tomorrow = datesHelper.tomorrow();        // "2025-09-25"
const today = datesHelper.today();              // "2025-09-24"
const nextWeek = datesHelper.dayAfterTomorrow(); // "2025-09-26"
```

## 🔧 Advanced Usage

### Fetch Strategies

The unified CLI tool supports four different fetch strategies:

**Default (native fetch with validation):**
```bash
# ✅ Valid parameters (validated against Zod schemas)
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'

# ❌ Invalid parameters (shows validation error)
fetch-dottie terminalWaitTimesById '{"invalidParam": "value"}'
```

**Raw data access (native fetch, no validation):**
```bash
# Parameters passed directly to API (no validation)
fetch-dottie terminalWaitTimesById '{"terminalId": 7}' --no-validation
```

**JSONP with validation (browser environments):**
```bash
# JSONP request with validation
fetch-dottie terminalWaitTimesById '{"terminalId": 7}' --jsonp
```

**JSONP without validation (browser environments, raw data):**
```bash
# JSONP request without validation
fetch-dottie terminalWaitTimesById '{"terminalId": 7}' --jsonp --no-validation
```

## 🤖 Agent Mode

The CLI includes special modes designed for automation and AI agents.

**⚠️ CRITICAL RULES FOR AGENTS:**

- **NEVER modify schemas** unless expressly requested by the user
- **ALWAYS use** `$WSDOT_ACCESS_TOKEN` environment variable for authentication
- **NEVER attempt to set** or modify authentication schemas
- We are locking down schemas to prevent breaking changes

### Output Control Options
All CLI tools support the same output control options:

#### Quiet Mode (`--quiet`)
Suppresses debug output and verbose messages while keeping error messages:

```bash
# Normal mode (with debug output)
fetch-dottie getBorderCrossings

# Quiet mode (clean output)
fetch-dottie getBorderCrossings --quiet
```

#### Silent Mode (`--silent`)
Suppresses all output except the final JSON result:

```bash
fetch-dottie getBorderCrossings --silent
```

#### Pretty-print Mode (`--pretty`)
Formats JSON output with 2-space indentation:

```bash
fetch-dottie getBorderCrossings --pretty
```

### Agent Usage Examples

```bash
# Get clean ferry data for processing
fetch-dottie vesselLocations --quiet

# Get border crossing data for analysis
fetch-dottie getBorderCrossings --quiet

# Get raw JSON for programmatic use
fetch-dottie terminalWaitTimes --silent

# Use in scripts or automation
DATA=$(fetch-dottie getBorderCrossings --quiet)
echo "$DATA" | jq '.[] | .CrossingName'

# Compare validated vs raw results
fetch-dottie getAlerts --quiet > validated.json
fetch-dottie getAlerts --no-validation --quiet > raw.json
diff validated.json raw.json

# Use JSONP for browser environments
fetch-dottie getBorderCrossings --jsonp --quiet
```

### Benefits for Agents

- **Clean Output**: No debug messages cluttering the response
- **Structured Data**: Always returns valid JSON
- **Error Handling**: Clear error messages when parameters are invalid
- **Consistent Format**: Predictable output structure
- **Fast Execution**: Minimal overhead from logging

### Choosing Between Fetch Strategies

**Use default (native fetch with validation) when:**
- You need type safety and validation
- You want automatic data transformation
- You're building production applications
- You need to ensure data quality

**Use --no-validation when:**
- You need raw API access for debugging
- You're exploring API responses
- You want maximum performance
- You need automatic .NET date conversion

**Use --jsonp when:**
- You're running in a browser environment
- You need to bypass CORS restrictions
- You're building web applications

**Use --jsonp --no-validation when:**
- You're in a browser environment
- You need maximum performance
- You want raw data without validation

### JSON Formatting

```bash
# Pretty-printed (default)
fetch-dottie getBorderCrossings

# Compact JSON
fetch-dottie getBorderCrossings

# Pipe to other tools
fetch-dottie getBorderCrossings | jq '.[] | .CrossingName'
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
fetch-dottie getBorderCrossings

# Get travel times for your route
fetch-dottie getTravelTimes

# Check for highway alerts
fetch-dottie getAlerts
```

### 🚢 **Ferry Travel**
```bash
# Find ferry schedules
fetch-dottie routes '{"tripDate": "2025-10-01"}'

# Check terminal wait times
fetch-dottie terminalWaitTimes

# Get fare information
fetch-dottie fareLineItems '{"departingTerminalId": 7, "arrivingTerminalId": 3, "tripDate": "2025-10-01"}'

# Get vessel locations
fetch-dottie vesselLocations
```

### 📷 **Traffic Monitoring**
```bash
# Find traffic cameras
fetch-dottie getHighwayCameras

# Check traffic flow
fetch-dottie getTrafficFlows

# Monitor weather conditions
fetch-dottie getWeatherInformation

# Check mountain pass conditions
fetch-dottie getMountainPassConditions
```

### 🚛 **Commercial Vehicle**
```bash
# Check bridge clearances
fetch-dottie getBridgeClearances '{"route": "005"}'

# Find commercial restrictions
fetch-dottie getCommercialVehicleRestrictions

# Check toll rates
fetch-dottie getTollRates
```

### 🔧 **Debugging & Development**
```bash
# Compare validated vs raw responses
fetch-dottie getAlerts --quiet > validated.json
fetch-dottie getAlerts --no-validation --quiet > raw.json

# List all available functions
fetch-dottie --list

# Test with specific parameters
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'

# Get raw response for debugging
fetch-dottie getBorderCrossings --no-validation --silent

# Test JSONP functionality (will fail in Node.js)
fetch-dottie getBorderCrossings --jsonp --silent
```

## 🔍 Troubleshooting

### Common Issues

**"Function not found" error:**
```bash
# Check available functions
fetch-dottie --list

# Or check help for the specific tool
fetch-dottie --help
```

**"Parameter validation failed" error (when not using --no-validation):**
```bash
# Check the expected parameter format
fetch-dottie --help
# Example: terminalId should be a number, tripDate should be YYYY-MM-DD string
fetch-dottie terminalWaitTimesById '{"terminalId": "7"}'  # ❌ String
fetch-dottie terminalWaitTimesById '{"terminalId": 7}'    # ✅ Number
fetch-dottie scheduleByRoute '{"tripDate": "invalid-date", "routeId": 1}'  # ❌ Invalid date format
fetch-dottie scheduleByRoute '{"tripDate": "2025-10-01", "routeId": 1}'    # ✅ YYYY-MM-DD format
```

**"Invalid JSON parameters" error:**
```bash
# Ensure your parameters are valid JSON
fetch-dottie getBridgeClearances '{"route": "005"}'  # ✅ Valid JSON
fetch-dottie getBridgeClearances '{route: "005"}'    # ❌ Invalid JSON
```

**API errors:**
```bash
# Verify your API key is set
echo $WSDOT_ACCESS_TOKEN

# Test basic connectivity
fetch-dottie getBorderCrossings --quiet | head -5

# Compare with raw version for debugging
fetch-dottie getBorderCrossings --no-validation --quiet
```

### Error Messages

The CLI provides helpful error messages for common issues:

- **Missing API key**: Check that `$WSDOT_ACCESS_TOKEN` is set
- **Network errors**: Check your internet connection
- **API server issues**: The WSDOT API may be experiencing problems
- **Invalid parameters**: Check parameter format and required fields

### Debug Mode

```bash
# The CLI provides detailed logging for troubleshooting
fetch-dottie getBorderCrossings  # Look for debug messages

# Use raw version for debugging
fetch-dottie getBorderCrossings --no-validation

# Test JSONP (will fail in Node.js, as expected)
fetch-dottie getBorderCrossings --jsonp
```

### Performance Tips

```bash
# Use --quiet for faster output in scripts
fetch-dottie getBorderCrossings --quiet > data.json

# Use --silent for maximum performance
fetch-dottie getBorderCrossings --silent > data.json

# Limit output with tools like jq
fetch-dottie getBorderCrossings --quiet | jq '.[:5]'  # First 5 items only

# Use --no-validation for maximum speed when validation isn't needed
fetch-dottie getBorderCrossings --no-validation --quiet > data.json
```

### Getting Help

```bash
# List all available functions
fetch-dottie --list

# Get help for the tool
fetch-dottie --help

# Test with sample parameters
fetch-dottie getBridgeClearancesByRoute --quiet
```

## 📚 Related Documentation

- [Main Getting Started Guide](../GETTING-STARTED.md)
- [API Overview](../API-OVERVIEW.md)
- [API Reference](../API-REFERENCE.md)
- [Examples](../EXAMPLES.md)

---

**🎉 Happy exploring Washington State's transportation data!**

The CLI makes it easy to access real-time ferry schedules, traffic conditions, weather data, and more directly from your terminal. Perfect for development, monitoring, automation, or just staying informed about Washington's transportation network.

**Choose the right strategy for your needs:**
- **Default**: When you need type safety and data validation
- **`--no-validation`**: When you need raw API access and maximum performance
- **`--jsonp`**: When you're in browser environments and need to bypass CORS
- **`--jsonp --no-validation`**: When you're in browser environments and need maximum performance
