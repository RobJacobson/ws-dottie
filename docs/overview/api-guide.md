# WS-Dottie API Guide

This guide provides a high-level overview of all WS-Dottie APIs, their use cases, and how they work together to build comprehensive transportation applications.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](./getting-started.md) • [Architecture](./architecture.md)

## 🗺️ API Overview

WS-Dottie provides access to 16 APIs from Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF), organized into four main categories:

| Category | APIs | Endpoints | Primary Use Cases |
|-----------|-------|------------|-------------------|
| **Ferries** | 4 APIs | 57+ endpoints | Vessel tracking, terminal monitoring, schedule planning |
| **Traffic** | 6 APIs | 15+ endpoints | Traffic monitoring, route planning, incident tracking |
| **Weather** | 4 APIs | 7+ endpoints | Weather monitoring, road conditions, pass status |
| **Infrastructure** | 2 APIs | 11+ endpoints | Commercial vehicle routing, toll planning, border crossing |

## 🚢 Ferry APIs

### Overview

Ferry APIs provide comprehensive access to Washington State Ferries operations, including real-time vessel tracking, terminal information, schedules, and fare data.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSF Vessels** | Real-time vessel locations, specifications, and history | Live tracking, vessel details, historical data |
| **WSF Terminals** | Terminal wait times, sailing space, and locations | Wait monitoring, terminal capacity, location data |
| **WSF Schedule** | Ferry schedules, routes, and sailing times | Trip planning, route information, time tables |
| **WSF Fares** | Fare information, pricing, and terminal combinations | Cost calculation, fare planning, price comparison |

### Common Ferry Use Cases

#### Real-time Ferry Tracking
Build applications that track ferry locations in real-time, showing current positions, speeds, and headings.

**Relevant APIs**: WSF Vessels

#### Ferry Trip Planning
Create tools for planning ferry trips with schedule information, terminal wait times, and fare calculations.

**Relevant APIs**: WSF Schedule, WSF Terminals, WSF Fares

## 🚗 Traffic APIs

### Overview

Traffic APIs provide real-time information about highway conditions, incidents, traffic flow, and travel times throughout Washington State.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Highway Alerts** | Real-time traffic incidents and construction | Incident tracking, construction updates, road closures |
| **WSDOT Traffic Flow** | Current traffic speeds and congestion data | Flow monitoring, congestion analysis, speed data |
| **WSDOT Travel Times** | Estimated travel times between locations | Route planning, ETA calculation, delay tracking |
| **WSDOT Highway Cameras** | Live traffic camera feeds | Visual monitoring, road conditions, traffic visualization |
| **WSDOT Toll Rates** | Real-time toll pricing for managed lanes | Cost calculation, route optimization, toll planning |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status |

### Common Traffic Use Cases

#### Traffic Monitoring Dashboard
Create dashboards for highway conditions, traffic flow, and travel time estimates.

**Relevant APIs**: WSDOT Highway Alerts, WSDOT Traffic Flow, WSDOT Travel Times

#### Route Planning with Traffic Data
Build tools for optimal route planning based on current traffic conditions and toll rates.

**Relevant APIs**: WSDOT Travel Times, WSDOT Toll Rates, WSDOT Highway Alerts

## 🌤️ Weather APIs

### Overview

Weather APIs provide access to weather information, road conditions, and mountain pass status throughout Washington State.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Weather Information** | Current weather conditions at monitoring stations | Temperature, precipitation, road conditions |
| **WSDOT Weather Extended** | Detailed weather with surface/subsurface measurements | Advanced weather data, scientific measurements |
| **WSDOT Weather Stations** | Weather station locations and metadata | Station locations, equipment information, coverage map |
| **WSDOT Mountain Pass Conditions** | Pass status, restrictions, and road conditions | Pass conditions, travel restrictions, closure information |

### Common Weather Use Cases

#### Weather Conditions Dashboard
Display weather conditions, road conditions, and mountain pass status for travel planning.

**Relevant APIs**: WSDOT Weather Information, WSDOT Mountain Pass Conditions

## 🏗️ Infrastructure APIs

### Overview

Infrastructure APIs provide information about physical transportation infrastructure, including bridge clearances, toll rates, and border crossing conditions.

### Available APIs

| API | Description | Key Features |
|------|-------------|---------------|
| **WSDOT Bridge Clearances** | Height restrictions for bridges and overpasses | Clearance data, route planning for tall vehicles |
| **WSDOT Commercial Vehicle Restrictions** | Weight limits and vehicle restrictions | Truck routing, restriction information, compliance data |
| **WSDOT Border Crossings** | Wait times and conditions at border crossings | Border planning, wait time monitoring, crossing status |

### Common Infrastructure Use Cases

#### Commercial Vehicle Route Planning
Build tools for route planning with bridge clearances, toll rates, and vehicle restrictions.

**Relevant APIs**: WSDOT Bridge Clearances, WSDOT Commercial Vehicle Restrictions, WSDOT Border Crossings

## 🔄 Data Update Frequencies

WS-Dottie optimizes caching strategies based on how frequently different data types are updated:

| Category | Update Frequency | Caching Strategy | Examples |
|-----------|------------------|-------------------|----------|
| **Real-time** | 5 seconds | `REALTIME_UPDATES` | Vessel locations, traffic alerts |
| **Frequent** | 1-5 minutes | `MINUTE_UPDATES` | Terminal wait times, traffic flow |
| **Regular** | 15-60 minutes | `HOURLY_UPDATES` | Weather conditions, road status |
| **Static** | Daily | `DAILY_UPDATES` | Schedules, fares |
| **Historical** | Weekly | `WEEKLY_UPDATES` | Terminal info, vessel specs |

## 🔗 API Relationships

Many WS-Dottie APIs work together to provide comprehensive transportation solutions:

### Ferry + Traffic Integration
Combine ferry data with highway information for complete commute planning.

**Relevant APIs**: WSF Vessels, WSF Terminals, WSDOT Highway Alerts, WSDOT Travel Times

### Weather + Traffic Integration
Correlate weather conditions with traffic incidents for weather-aware travel planning.

**Relevant APIs**: WSDOT Weather Information, WSDOT Mountain Pass Conditions, WSDOT Highway Alerts

## 🎯 Choosing Right APIs

### For Different Application Types

#### Real-time Tracking Applications
- **Primary APIs**: Vessel Locations, Highway Alerts, Traffic Flow
- **Caching Strategy**: `REALTIME_UPDATES`
- **Update Frequency**: 5-10 seconds

#### Trip Planning Applications
- **Primary APIs**: Schedules, Fares, Travel Times, Toll Rates
- **Caching Strategy**: `DAILY_UPDATES` or `WEEKLY_UPDATES`
- **Update Frequency**: Daily to weekly

#### Monitoring Applications
- **Primary APIs**: Weather Information, Mountain Pass Conditions, Highway Cameras
- **Caching Strategy**: `HOURLY_UPDATES`
- **Update Frequency**: 15-60 minutes

#### Analytics Applications
- **Primary APIs**: Vessel History, Commercial Vehicle Restrictions, Border Crossings
- **Caching Strategy**: `WEEKLY_UPDATES`
- **Update Frequency**: Weekly or manual refresh

## 🔗 Detailed Documentation

For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](../../openapi/)** - API specifications in YAML format
- **[HTML Documentation](../../redoc/)** - Interactive HTML documentation

## 📚 Next Steps

- **[Category Documentation](./categories/)** - Detailed information by use case
- **[Implementation Guides](./guides/)** - Platform-specific integration patterns
- **[Endpoints Reference](./endpoints.md)** - Complete endpoint reference table
