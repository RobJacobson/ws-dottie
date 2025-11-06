# CLI Usage Guide

This guide covers using WS-Dottie from command line, including installation, configuration, and common commands.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

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

# Or use --key flag with each command
ws-dottie --key=your_api_key_here [command]
```

### 3. Basic Usage

```bash
# Get help
ws-dottie --help

# List all available commands
ws-dottie --help

# Get vessel locations
ws-dottie getVesselLocations

# Get highway alerts
ws-dottie getHighwayAlerts

# Get weather information
ws-dottie getWeatherInformation

# Get mountain pass conditions
ws-dottie getMountainPassConditions
```

## 🏗️ CLI Structure

WS-Dottie CLI provides a command-line interface for accessing Washington State transportation data:

```bash
# Basic command structure
ws-dottie [function-name] [options]

# Examples
ws-dottie getVesselLocations --limit=10 --format=json
ws-dottie getHighwayAlerts --priority=high --region=seattle
ws-dottie getWeatherInformation --region=western
ws-dottie getMountainPassConditions --status=restricted
```

### Command Categories

| Category | Commands | Description |
|-----------|---------|-------------|
| **Ferries** | vessels, terminals, schedules, fares | Ferry operations data |
| **Traffic** | alerts, flow, travel-times, cameras, tolls | Highway and traffic data |
| **Weather** | weather, weather-extended, stations, passes | Weather and road conditions |
| **Infrastructure** | bridges, restrictions, border | Infrastructure and routing data |

## 🚢 Ferry Commands

### Vessel Locations

```bash
# Get all vessel locations
ws-dottie getVesselLocations

# Get specific vessel
ws-dottie getVesselLocationsByVesselId --vessel-id=18

# Limit results
ws-dottie getVesselLocations --limit=5

# Output in specific format
ws-dottie getVesselLocations --format=json
ws-dottie getVesselLocations --format=table

# Filter by vessel class
ws-dottie getVesselLocations --class=jumbo
ws-dottie getVesselLocations --class=issaquah
```

### Terminal Information

```bash
# Get all terminal wait times
ws-dottie getTerminalWaitTimes

# Get specific terminal
ws-dottie getTerminalWaitTimesByTerminalId --terminal-id=3

# Filter by terminal name
ws-dottie getTerminalWaitTimes --terminal-name=seattle
ws-dottie getTerminalWaitTimes --terminal-name=bainbridge

# Get terminal locations
ws-dottie getTerminalLocations

# Get terminal amenities
ws-dottie getTerminalLocations --amenities
```

### Schedule Information

```bash
# Get schedules for specific route
ws-dottie getSchedulesByTripDateAndRouteId --from=3 --to=7

# Get schedules for specific date
ws-dottie getSchedulesByTripDateAndRouteId --date=2024-12-25

# Get all routes
ws-dottie getRoutesByTripDate --routes

# Get schedules for specific vessel
ws-dottie getSchedules --vessel-id=18
```

### Fare Information

```bash
# Get fares for specific route
ws-dottie getFareLineItemsByTripDateAndTerminals --from=3 --to=7

# Get fares for specific date
ws-dottie getFareLineItemsByTripDateAndTerminals --date=2024-12-25

# Get all fare combinations
ws-dottie getFareLineItemsByTripDateAndTerminals --all

# Filter by passenger type
ws-dottie getFareLineItemsByTripDateAndTerminals --passenger-type=adult
ws-dottie getFareLineItemsByTripDateAndTerminals --passenger-type=senior
ws-dottie getFareLineItemsByTripDateAndTerminals --passenger-type=youth
```

## 🚗 Traffic Commands

### Highway Alerts

```bash
# Get all highway alerts
ws-dottie getHighwayAlerts

# Filter by priority
ws-dottie getHighwayAlerts --priority=high
ws-dottie getHighwayAlerts --priority=medium
ws-dottie getHighwayAlerts --priority=low

# Filter by category
ws-dottie getHighwayAlerts --category=construction
ws-dottie getHighwayAlerts --category=incident
ws-dottie getHighwayAlerts --category=weather

# Filter by region
ws-dottie getHighwayAlerts --region=seattle
ws-dottie getHighwayAlerts --region=spokane
ws-dottie getHighwayAlerts --region=olympic

# Get alerts for specific time range
ws-dottie getHighwayAlerts --start-time=2024-12-25T08:00:00
ws-dottie getHighwayAlerts --end-time=2024-12-25T17:00:00
```

### Traffic Flow

```bash
# Get all traffic flow data
ws-dottie getTrafficFlows

# Filter by highway
ws-dottie getTrafficFlows --highway=i5
ws-dottie getTrafficFlows --highway=i90
ws-dottie getTrafficFlows --highway=i405

# Filter by congestion level
ws-dottie getTrafficFlows --congestion=high
ws-dottie getTrafficFlows --congestion=medium
ws-dottie getTrafficFlows --congestion=low

# Get flow for specific region
ws-dottie getTrafficFlows --region=king-county
ws-dottie getTrafficFlows --region=pierce-county
ws-dottie getTrafficFlows --region=snohomish-county
```

### Travel Times

```bash
# Get all travel times
ws-dottie getTravelTimes

# Filter by route name
ws-dottie getTravelTimes --route="I-5 Northbound"
ws-dottie getTravelTimes --route="I-90 Eastbound"

# Filter by travel time range
ws-dottie getTravelTimes --min-time=10
ws-dottie getTravelTimes --max-time=60

# Sort by travel time
ws-dottie getTravelTimes --sort=asc
ws-dottie getTravelTimes --sort=desc
```

### Highway Cameras

```bash
# Get all highway cameras
ws-dottie getHighwayCameras

# Filter by highway
ws-dottie getHighwayCameras --highway=i5
ws-dottie getHighwayCameras --highway=i90

# Filter by direction
ws-dottie getHighwayCameras --direction=north
ws-dottie getHighwayCameras --direction=south
ws-dottie getHighwayCameras --direction=east
ws-dottie getHighwayCameras --direction=west

# Get camera image URLs
ws-dottie getHighwayCameras --image-urls

# Download camera images
ws-dottie getHighwayCameras --download-images --output-dir=./camera-images
```

### Toll Rates

```bash
# Get all toll rates
ws-dottie getTollRates

# Filter by toll facility
ws-dottie getTollRates --facility=sr-167
ws-dottie getTollRates --facility=i-405-express-lanes

# Filter by vehicle type
ws-dottie getTollRates --vehicle-type=2axle
ws-dottie getTollRates --vehicle-type=3axle
ws-dottie getTollRates --vehicle-type=motorcycle

# Get current time-based rates
ws-dottie getTollRates --time-based

# Get historical toll data
ws-dottie getTollRates --historical --date=2024-12-25
```

### Border Crossings

```bash
# Get all border crossings
ws-dottie getBorderCrossings

# Filter by crossing name
ws-dottie getBorderCrossings --crossing=peace-arch
ws-dottie getBorderCrossings --crossing=lynden

# Filter by direction
ws-dottie getBorderCrossings --direction=north
ws-dottie getBorderCrossings --direction=south

# Filter by crossing type
ws-dottie getBorderCrossings --type=passenger
ws-dottie getBorderCrossings --type=commercial
ws-dottie getBorderCrossings --type=nexus

# Get wait time history
ws-dottie getBorderCrossings --history --days=7
```

## 🌤️ Weather Commands

### Weather Information

```bash
# Get all weather information
ws-dottie getWeatherInformation

# Filter by region
ws-dottie getWeatherInformation --region=western
ws-dottie getWeatherInformation --region=eastern
ws-dottie getWeatherInformation --region=central

# Filter by road condition
ws-dottie getWeatherInformation --condition=dry
ws-dottie getWeatherInformation --condition=wet
ws-dottie getWeatherInformation --condition=snow
ws-dottie getWeatherInformation --condition=ice

# Filter by temperature range
ws-dottie getWeatherInformation --min-temp=20
ws-dottie getWeatherInformation --max-temp=80

# Get weather for specific stations
ws-dottie getWeatherInformation --stations=SEA01,SEA02,SEA03
```

### Weather Extended

```bash
# Get extended weather information
ws-dottie getWeatherReadings

# Filter by surface condition
ws-dottie getWeatherReadings --surface=dry
ws-dottie getWeatherReadings --surface=wet
ws-dottie getWeatherReadings --surface=snow
ws-dottie getWeatherReadings --surface=ice

# Filter by visibility range
ws-dottie getWeatherReadings --min-visibility=1
ws-dottie getWeatherReadings --max-visibility=10

# Get scientific weather data
ws-dottie getWeatherReadings --scientific
```

### Weather Stations

```bash
# Get all weather stations
ws-dottie getWeatherStations

# Filter by region
ws-dottie getWeatherStations --region=western
ws-dottie getWeatherStations --region=eastern
ws-dottie getWeatherStations --region=central

# Get station metadata
ws-dottie getWeatherStations --metadata

# Find nearest station
ws-dottie getWeatherStations --nearest --latitude=47.6062 --longitude=-122.3321
```

### Mountain Pass Conditions

```bash
# Get all mountain pass conditions
ws-dottie getMountainPassConditions

# Filter by pass name
ws-dottie getMountainPassConditions --pass=snoqualmie
ws-dottie getMountainPassConditions --pass=stevens
ws-dottie getMountainPassConditions --pass=white

# Filter by restriction level
ws-dottie getMountainPassConditions --restriction=open
ws-dottie getMountainPassConditions --restriction=chains-required
ws-dottie getMountainPassConditions --restriction=closed

# Filter by weather condition
ws-dottie getMountainPassConditions --weather=clear
ws-dottie getMountainPassConditions --weather=snow
ws-dottie getMountainPassConditions --weather=freezing-rain

# Get elevation data
ws-dottie getMountainPassConditions --elevation
```

## 🏗️ Infrastructure Commands

### Bridge Clearances

```bash
# Get all bridge clearances
ws-dottie getBridgeClearances

# Filter by route
ws-dottie getBridgeClearances --route=i5
ws-dottie getBridgeClearances --route=i90
ws-dottie getBridgeClearances --route=us-2

# Filter by clearance height
ws-dottie getBridgeClearances --min-clearance=14
ws-dottie getBridgeClearances --max-clearance=16

# Find safe routes for vehicle
ws-dottie getBridgeClearances --vehicle-height=13.5 --find-safe-routes

# Export clearance data
ws-dottie getBridgeClearances --export=csv --output-file=bridge-clearances.csv
```

### Commercial Vehicle Restrictions

```bash
# Get all commercial vehicle restrictions
ws-dottie getCommercialVehicleRestrictions

# Filter by route
ws-dottie getCommercialVehicleRestrictions --route=i5
ws-dottie getCommercialVehicleRestrictions --route=i90

# Filter by vehicle type
ws-dottie getCommercialVehicleRestrictions --vehicle-type=truck
ws-dottie getCommercialVehicleRestrictions --vehicle-type=bus
ws-dottie getCommercialVehicleRestrictions --vehicle-type=combination

# Filter by weight limit
ws-dottie getCommercialVehicleRestrictions --max-weight=80000
ws-dottie getCommercialVehicleRestrictions --min-weight=10000

# Get seasonal restrictions
ws-dottie getCommercialVehicleRestrictions --seasonal
```

## 🔧 Advanced Usage

### Custom Output Formats

```bash
# Output as JSON
ws-dottie getVesselLocations --format=json

# Output as CSV
ws-dottie getVesselLocations --format=csv

# Output as table
ws-dottie getVesselLocations --format=table

# Output as pretty-printed JSON
ws-dottie getVesselLocations --format=pretty

# Custom template
ws-dottie getVesselLocations --format=template --template="{{VesselName}}: {{Speed}} knots"
```

### Data Filtering

```bash
# Combine multiple filters
ws-dottie getHighwayAlerts --priority=high --category=construction --region=seattle

# Use regular expressions
ws-dottie getVesselLocations --filter=".*Jumbo.*" --filter-field=VesselName

# Exclude specific fields
ws-dottie getVesselLocations --exclude=LastUpdated,Heading

# Sort results
ws-dottie getHighwayAlerts --sort=StartTime --sort-order=desc
ws-dottie getHighwayAlerts --sort=Priority --sort-order=asc
```

### Batch Operations

```bash
# Run multiple commands in sequence
ws-dottie getVesselLocations; getHighwayAlerts; getWeatherInformation

# Save output to file
ws-dottie getVesselLocations --output=vessels.json
ws-dottie getHighwayAlerts --output=alerts.csv

# Process with shell commands
ws-dottie getVesselLocations --format=json | jq '.[] | select(.VesselName, .Speed)'

# Generate report
ws-dottie getVesselLocations --format=markdown --output-report=vessel-report.md
```

### Configuration Management

```bash
# Save configuration
ws-dottie config --set key=your_api_key_here

# Save multiple settings
ws-dottie config --set key=your_api_key_here --base-url=https://proxy.example.com

# View current configuration
ws-dottie config --show

# Reset configuration
ws-dottie config --reset

# Load configuration from file
ws-dottie config --load=./ws-dottie-config.json
```

## 🔄 Automation Examples

### Shell Scripting

```bash
#!/bin/bash

# Ferry monitoring script
API_KEY="your_api_key_here"

# Get current vessel locations
VESSELS=$(ws-dottie --key=$API_KEY getVesselLocations --format=json | jq -r '.[] | "\(.VesselName): \(.Latitude),\(.Longitude)"')

echo "Current vessel locations:"
echo "$VESSELS"

# Check if any vessel is in Seattle area
SEATTLE_VESSELS=$(echo "$VESSELS" | grep -E "47\.6[0-9]|-122\.3[0-9]")

if [ -n "$SEATTLE_VESSELS" ]; then
    echo "Vessels in Seattle area:"
    echo "$SEATTLE_VESSELS"
fi

# Get terminal wait times
WAIT_TIMES=$(ws-dottie --key=$API_KEY getTerminalWaitTimes --format=json | jq -r '.[] | "\(.TerminalName): \(.WaitTime) minutes"')

echo "Terminal wait times:"
echo "$WAIT_TIMES"
```

### Cron Jobs

```bash
# Crontab entry for weather monitoring
# Every 15 minutes
*/15 * * * * /usr/local/bin/ws-dottie --key=$API_KEY getWeatherInformation --region=western >> /var/log/weather-monitor.log 2>&1

# Hourly ferry schedule check
0 * * * * /usr/local/bin/ws-dottie --key=$API_KEY getSchedulesByTripDateAndRouteId --date=$(date +\%Y-\%m-\%d) >> /var/log/ferry-schedule.log 2>&1

# Daily morning traffic report
0 6 * * * /usr/local/bin/ws-dottie --key=$API_KEY getHighwayAlerts --priority=high --format=markdown | mail -s "Morning Traffic Report" your-email@example.com
```

### Integration with Other Tools

```bash
# Pipe to grep for filtering
ws-dottie getVesselLocations --format=json | jq '.[] | select(.Speed > 15)'

# Pipe to awk for formatting
ws-dottie getHighwayAlerts --format=csv | awk -F, 'NR>1 {print $1,$2,$3}'

# Combine with curl for custom processing
ws-dottie getVesselLocations --format=json | curl -X POST -H "Content-Type: application/json" -d @- https://your-api.example.com/ferry-data

# Use with xargs for batch processing
echo "3\n7\n11" | xargs -I {} -n 1 ws-dottie --key=$API_KEY getSchedulesByTripDateAndRouteId --from={} --to={}
```

## 📊 Output Formats

### JSON Output

```bash
# Pretty-printed JSON
ws-dottie getVesselLocations --format=json

# Compact JSON
ws-dottie getVesselLocations --format=json --compact

# JSON with specific fields
ws-dottie getVesselLocations --format=json --fields=VesselName,Speed,Heading
```

### CSV Output

```bash
# Standard CSV
ws-dottie getVesselLocations --format=csv

# Custom delimiter
ws-dottie getVesselLocations --format=csv --delimiter=;

# Custom headers
ws-dottie getVesselLocations --format=csv --headers=ID,Name,Speed,Heading
```

### Table Output

```bash
# Default table
ws-dottie getVesselLocations --format=table

# Wide table
ws-dottie getVesselLocations --format=table --wide

# Custom column width
ws-dottie getVesselLocations --format=table --max-width=20
```

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[React Integration Guide](./react.md)** - React patterns with WS-Dottie hooks
- **[Node.js Integration Guide](./nodejs.md)** - Server-side usage patterns
- **[Error Handling Reference](../reference/error-handling.md)** - WS-Dottie error types and recovery
