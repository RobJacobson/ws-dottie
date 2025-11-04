# CLI Usage Guide

This guide covers using WS-Dottie from the command line, including installation, configuration, and common commands.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](./getting-started.md) • [API Guide](./api-guide.md)

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
```

### Weather Stations

```bash
# Get all weather stations
ws-dottie stations

# Filter by region
ws-dottie stations --region=western
ws-dottie stations --region=eastern
ws-dottie stations --region=central

# Find nearest station
ws-dottie stations --nearest --latitude=47.6062 --longitude=-122.3321

# Get station metadata
ws-dottie stations --metadata
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
```

### Commercial Vehicle Restrictions

```bash
# Get all commercial vehicle restrictions
ws-dottie restrictions

# Filter by route
ws-dottie restrictions --route=i5
ws-dottie restrictions --route=i90
ws-dottie restrictions --route=us-2

# Filter by vehicle type
ws-dottie restrictions --vehicle-type=truck
ws-dottie restrictions --vehicle-type=bus
ws-dottie restrictions --vehicle-type=combination

# Filter by weight limit
ws-dottie restrictions --max-weight=80000
ws-dottie restrictions --min-weight=10000
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

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[React Integration Guide](./react.md)** - React patterns with WS-Dottie hooks
- **[Node.js Integration Guide](./nodejs.md)** - Server-side usage patterns
- **[Error Handling Reference](../reference/error-handling.md)** - WS-Dottie error types and recovery
