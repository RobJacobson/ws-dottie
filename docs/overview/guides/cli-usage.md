# CLI Usage Guide

This guide covers using WS-Dottie from the command line, including installation, configuration, and common commands.

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

# Or use the --key flag with each command
ws-dottie --key=your_api_key_here [command]
```

### 3. Basic Usage

```bash
# Get help
ws-dottie --help

# List all available commands
ws-dottie --help

# Get vessel locations
ws-dottie vessels

# Get highway alerts
ws-dottie alerts

# Get weather information
ws-dottie weather

# Get mountain pass conditions
ws-dottie passes
```

## 🏗️ CLI Structure

WS-Dottie CLI provides a command-line interface for accessing Washington State transportation data:

```bash
# Basic command structure
ws-dottie [command] [options]

# Examples
ws-dottie vessels --limit=10 --format=json
ws-dottie alerts --priority=high --region=seattle
ws-dottie weather --region=western
ws-dottie passes --status=restricted
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
ws-dottie vessels

# Get specific vessel
ws-dottie vessels --vessel-id=18

# Limit results
ws-dottie vessels --limit=5

# Output in specific format
ws-dottie vessels --format=json
ws-dottie vessels --format=table

# Filter by vessel class
ws-dottie vessels --class=jumbo
ws-dottie vessels --class=issaquah
```

### Terminal Information

```bash
# Get all terminal wait times
ws-dottie terminals

# Get specific terminal
ws-dottie terminals --terminal-id=3

# Filter by terminal name
ws-dottie terminals --terminal-name=seattle
ws-dottie terminals --terminal-name=bainbridge

# Get terminal locations
ws-dottie terminals --locations

# Get terminal amenities
ws-dottie terminals --amenities
```

### Schedule Information

```bash
# Get schedules for specific route
ws-dottie schedules --from=3 --to=7

# Get schedules for specific date
ws-dottie schedules --date=2024-12-25

# Get all routes
ws-dottie schedules --routes

# Get schedules for specific vessel
ws-dottie schedules --vessel-id=18
```

### Fare Information

```bash
# Get fares for specific route
ws-dottie fares --from=3 --to=7

# Get fares for specific date
ws-dottie fares --date=2024-12-25

# Get all fare combinations
ws-dottie fares --all

# Filter by passenger type
ws-dottie fares --passenger-type=adult
ws-dottie fares --passenger-type=senior
ws-dottie fares --passenger-type=youth
```

## 🚗 Traffic Commands

### Highway Alerts

```bash
# Get all highway alerts
ws-dottie alerts

# Filter by priority
ws-dottie alerts --priority=high
ws-dottie alerts --priority=medium
ws-dottie alerts --priority=low

# Filter by category
ws-dottie alerts --category=construction
ws-dottie alerts --category=incident
ws-dottie alerts --category=weather

# Filter by region
ws-dottie alerts --region=seattle
ws-dottie alerts --region=spokane
ws-dottie alerts --region=olympic

# Get alerts for specific time range
ws-dottie alerts --start-time=2024-12-25T08:00:00
ws-dottie alerts --end-time=2024-12-25T17:00:00
```

### Traffic Flow

```bash
# Get all traffic flow data
ws-dottie flow

# Filter by highway
ws-dottie flow --highway=i5
ws-dottie flow --highway=i90
ws-dottie flow --highway=i405

# Filter by congestion level
ws-dottie flow --congestion=high
ws-dottie flow --congestion=medium
ws-dottie flow --congestion=low

# Get flow for specific region
ws-dottie flow --region=king-county
ws-dottie flow --region=pierce-county
ws-dottie flow --region=snohomish-county
```

### Travel Times

```bash
# Get all travel times
ws-dottie travel-times

# Filter by route name
ws-dottie travel-times --route="I-5 Northbound"
ws-dottie travel-times --route="I-90 Eastbound"

# Filter by travel time range
ws-dottie travel-times --min-time=10
ws-dottie travel-times --max-time=60

# Sort by travel time
ws-dottie travel-times --sort=asc
ws-dottie travel-times --sort=desc
```

### Highway Cameras

```bash
# Get all highway cameras
ws-dottie cameras

# Filter by highway
ws-dottie cameras --highway=i5
ws-dottie cameras --highway=i90

# Filter by direction
ws-dottie cameras --direction=north
ws-dottie cameras --direction=south
ws-dottie cameras --direction=east
ws-dottie cameras --direction=west

# Get camera image URLs
ws-dottie cameras --image-urls

# Download camera images
ws-dottie cameras --download-images --output-dir=./camera-images
```

### Toll Rates

```bash
# Get all toll rates
ws-dottie tolls

# Filter by toll facility
ws-dottie tolls --facility=sr-167
ws-dottie tolls --facility=i-405-express-lanes

# Filter by vehicle type
ws-dottie tolls --vehicle-type=2axle
ws-dottie tolls --vehicle-type=3axle
ws-dottie tolls --vehicle-type=motorcycle

# Get current time-based rates
ws-dottie tolls --time-based

# Get historical toll data
ws-dottie tolls --historical --date=2024-12-25
```

### Border Crossings

```bash
# Get all border crossings
ws-dottie border

# Filter by crossing name
ws-dottie border --crossing=peace-arch
ws-dottie border --crossing=lynden

# Filter by direction
ws-dottie border --direction=north
ws-dottie border --direction=south

# Filter by crossing type
ws-dottie border --type=passenger
ws-dottie border --type=commercial
ws-dottie border --type=nexus

# Get wait time history
ws-dottie border --history --days=7
```

## 🌤️ Weather Commands

### Weather Information

```bash
# Get all weather information
ws-dottie weather

# Filter by region
ws-dottie weather --region=western
ws-dottie weather --region=eastern
ws-dottie weather --region=central

# Filter by road condition
ws-dottie weather --condition=dry
ws-dottie weather --condition=wet
ws-dottie weather --condition=snow
ws-dottie weather --condition=ice

# Filter by temperature range
ws-dottie weather --min-temp=20
ws-dottie weather --max-temp=80

# Get weather for specific stations
ws-dottie weather --stations=SEA01,SEA02,SEA03
```

### Weather Extended

```bash
# Get extended weather information
ws-dottie weather-extended

# Filter by surface condition
ws-dottie weather-extended --surface=dry
ws-dottie weather-extended --surface=wet
ws-dottie weather-extended --surface=snow
ws-dottie weather-extended --surface=ice

# Filter by visibility range
ws-dottie weather-extended --min-visibility=1
ws-dottie weather-extended --max-visibility=10

# Get scientific weather data
ws-dottie weather-extended --scientific
```

### Weather Stations

```bash
# Get all weather stations
ws-dottie stations

# Filter by region
ws-dottie stations --region=western
ws-dottie stations --region=eastern
ws-dottie stations --region=central

# Get station metadata
ws-dottie stations --metadata

# Find nearest station
ws-dottie stations --nearest --latitude=47.6062 --longitude=-122.3321
```

### Mountain Pass Conditions

```bash
# Get all mountain pass conditions
ws-dottie passes

# Filter by pass name
ws-dottie passes --pass=snoqualmie
ws-dottie passes --pass=stevens
ws-dottie passes --pass=white

# Filter by restriction level
ws-dottie passes --restriction=open
ws-dottie passes --restriction=chains-required
ws-dottie passes --restriction=closed

# Filter by weather condition
ws-dottie passes --weather=clear
ws-dottie passes --weather=snow
ws-dottie passes --weather=freezing-rain

# Get elevation data
ws-dottie passes --elevation
```

## 🏗️ Infrastructure Commands

### Bridge Clearances

```bash
# Get all bridge clearances
ws-dottie bridges

# Filter by route
ws-dottie bridges --route=i5
ws-dottie bridges --route=i90
ws-dottie bridges --route=us-2

# Filter by clearance height
ws-dottie bridges --min-clearance=14
ws-dottie bridges --max-clearance=16

# Find safe routes for vehicle
ws-dottie bridges --vehicle-height=13.5 --find-safe-routes

# Export clearance data
ws-dottie bridges --export=csv --output-file=bridge-clearances.csv
```

### Commercial Vehicle Restrictions

```bash
# Get all commercial vehicle restrictions
ws-dottie restrictions

# Filter by route
ws-dottie restrictions --route=i5
ws-dottie restrictions --route=i90

# Filter by vehicle type
ws-dottie restrictions --vehicle-type=truck
ws-dottie restrictions --vehicle-type=bus
ws-dottie restrictions --vehicle-type=combination

# Filter by weight limit
ws-dottie restrictions --max-weight=80000
ws-dottie restrictions --min-weight=10000

# Get seasonal restrictions
ws-dottie restrictions --seasonal
```

## 🔧 Advanced Usage

### Custom Output Formats

```bash
# Output as JSON
ws-dottie vessels --format=json

# Output as CSV
ws-dottie vessels --format=csv

# Output as table
ws-dottie vessels --format=table

# Output as pretty-printed JSON
ws-dottie vessels --format=pretty

# Custom template
ws-dottie vessels --format=template --template="{{VesselName}}: {{Speed}} knots"
```

### Data Filtering

```bash
# Combine multiple filters
ws-dottie alerts --priority=high --category=construction --region=seattle

# Use regular expressions
ws-dottie vessels --filter=".*Jumbo.*" --filter-field=VesselName

# Exclude specific fields
ws-dottie vessels --exclude=LastUpdated,Heading

# Sort results
ws-dottie alerts --sort=StartTime --sort-order=desc
ws-dottie alerts --sort=Priority --sort-order=asc
```

### Batch Operations

```bash
# Run multiple commands in sequence
ws-dottie vessels; alerts; weather

# Save output to file
ws-dottie vessels --output=vessels.json
ws-dottie alerts --output=alerts.csv

# Process with shell commands
ws-dottie vessels --format=json | jq '.[] | select(.VesselName, .Speed)'

# Generate report
ws-dottie vessels --format=markdown --output-report=vessel-report.md
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
VESSELS=$(ws-dottie --key=$API_KEY vessels --format=json | jq -r '.[] | "\(.VesselName): \(.Latitude),\(.Longitude)"')

echo "Current vessel locations:"
echo "$VESSELS"

# Check if any vessel is in Seattle area
SEATTLE_VESSELS=$(echo "$VESSELS" | grep -E "47\.6[0-9]|-122\.3[0-9]")

if [ -n "$SEATTLE_VESSELS" ]; then
    echo "Vessels in Seattle area:"
    echo "$SEATTLE_VESSELS"
fi

# Get terminal wait times
WAIT_TIMES=$(ws-dottie --key=$API_KEY terminals --format=json | jq -r '.[] | "\(.TerminalName): \(.WaitTime) minutes"')

echo "Terminal wait times:"
echo "$WAIT_TIMES"
```

### Cron Jobs

```bash
# Crontab entry for weather monitoring
# Every 15 minutes
*/15 * * * * /usr/local/bin/ws-dottie --key=$API_KEY weather --region=western >> /var/log/weather-monitor.log 2>&1

# Hourly ferry schedule check
0 * * * * /usr/local/bin/ws-dottie --key=$API_KEY schedules --date=$(date +\%Y-\%m-\%d) >> /var/log/ferry-schedule.log 2>&1

# Daily morning traffic report
0 6 * * * /usr/local/bin/ws-dottie --key=$API_KEY alerts --priority=high --format=markdown | mail -s "Morning Traffic Report" your-email@example.com
```

### Integration with Other Tools

```bash
# Pipe to grep for filtering
ws-dottie vessels --format=json | jq '.[] | select(.Speed > 15)'

# Pipe to awk for formatting
ws-dottie alerts --format=csv | awk -F, 'NR>1 {print $1,$2,$3}'

# Combine with curl for custom processing
ws-dottie vessels --format=json | curl -X POST -H "Content-Type: application/json" -d @- https://your-api.example.com/ferry-data

# Use with xargs for batch processing
echo "3\n7\n11" | xargs -I {} -n 1 ws-dottie --key=$API_KEY schedules --from={} --to={}
```

## 📊 Output Formats

### JSON Output

```bash
# Pretty-printed JSON
ws-dottie vessels --format=json

# Compact JSON
ws-dottie vessels --format=json --compact

# JSON with specific fields
ws-dottie vessels --format=json --fields=VesselName,Speed,Heading
```

### CSV Output

```bash
# Standard CSV
ws-dottie vessels --format=csv

# Custom delimiter
ws-dottie vessels --format=csv --delimiter=;

# Custom headers
ws-dottie vessels --format=csv --headers=ID,Name,Speed,Heading
```

### Table Output

```bash
# Default table
ws-dottie vessels --format=table

# Wide table
ws-dottie vessels --format=table --wide

# Custom column width
ws-dottie vessels --format=table --max-width=20
```

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[React Integration Guide](./react.md)** - React patterns with WS-Dottie hooks
- **[Node.js Integration Guide](./nodejs.md)** - Server-side usage patterns
- **[Error Handling Reference](../reference/error-handling.md)** - WS-Dottie error types and recovery
