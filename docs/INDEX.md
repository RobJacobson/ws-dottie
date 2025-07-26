# WS-Dottie Documentation Index

Welcome to the WS-Dottie documentation! This index provides organized access to all documentation resources.

## 📚 Getting Started

### Essential Reading
- **[Getting Started](./GETTING-STARTED.md)** - Installation, setup, and basic usage
- **[API Overview](./API-OVERVIEW.md)** - Quick comparison of all APIs and use case mapping
- **[Examples](./EXAMPLES.md)** - Common use cases and practical patterns

### Complete Reference
- **[API Reference](./API-REFERENCE.md)** - Complete API documentation and advanced configuration

## 🚢 WSF (Washington State Ferries) APIs

### Core Ferry APIs
- **[Vessels](./apis/wsf-vessels.md)** - Real-time vessel locations and status
- **[Terminals](./apis/wsf-terminals.md)** - Terminal wait times and sailing space
- **[Schedule](./apis/wsf-schedule.md)** - Ferry schedules and sailing times
- **[Fares](./apis/wsf-fares.md)** - Fare information and pricing

## 🚗 WSDOT (Washington State Department of Transportation) APIs

### Traffic & Transportation
- **[Highway Alerts](./apis/wsdot-highway-alerts.md)** - Real-time traffic incidents and construction updates
- **[Traffic Flow](./apis/wsdot-traffic-flow.md)** - Current traffic speeds and congestion data
- **[Travel Times](./apis/wsdot-travel-times.md)** - Estimated travel times between locations
- **[Toll Rates](./apis/wsdot-toll-rates.md)** - Real-time toll pricing for managed lanes

### Weather & Road Conditions
- **[Weather Information](./apis/wsdot-weather-information.md)** - Road weather conditions and forecasts
- **[Weather Information Extended](./apis/wsdot-weather-information-extended.md)** - Extended weather data and forecasts
- **[Weather Stations](./apis/wsdot-weather-stations.md)** - Weather station data and road conditions
- **[Mountain Pass Conditions](./apis/wsdot-mountain-pass-conditions.md)** - Pass status and travel restrictions

### Infrastructure & Monitoring
- **[Highway Cameras](./apis/wsdot-highway-cameras.md)** - Live traffic camera feeds across the state
- **[Bridge Clearances](./apis/wsdot-bridge-clearances.md)** - Height restrictions for commercial vehicles
- **[Commercial Vehicle Restrictions](./apis/wsdot-commercial-vehicle-restrictions.md)** - Truck and commercial vehicle limits
- **[Border Crossings](./apis/wsdot-border-crossings.md)** - Wait times and conditions at border crossings

## 🎯 Use Case Navigation

### For Commuters
- **Ferry Commuters**: [Vessels](./apis/wsf-vessels.md) + [Terminals](./apis/wsf-terminals.md) + [Schedule](./apis/wsf-schedule.md)
- **Highway Commuters**: [Traffic Flow](./apis/wsdot-traffic-flow.md) + [Travel Times](./apis/wsdot-travel-times.md) + [Highway Alerts](./apis/wsdot-highway-alerts.md)
- **Weather-Aware Travel**: [Weather Information](./apis/wsdot-weather-information.md) + [Mountain Pass Conditions](./apis/wsdot-mountain-pass-conditions.md)

### For Developers
- **Real-time Tracking**: [Vessels](./apis/wsf-vessels.md) + [Highway Alerts](./apis/wsdot-highway-alerts.md) + [Traffic Flow](./apis/wsdot-traffic-flow.md)
- **Route Planning**: [Travel Times](./apis/wsdot-travel-times.md) + [Toll Rates](./apis/wsdot-toll-rates.md) + [Bridge Clearances](./apis/wsdot-bridge-clearances.md)
- **Weather Integration**: [Weather Stations](./apis/wsdot-weather-stations.md) + [Weather Information Extended](./apis/wsdot-weather-information-extended.md)

### For Enterprise
- **Fleet Management**: [Commercial Vehicle Restrictions](./apis/wsdot-commercial-vehicle-restrictions.md) + [Bridge Clearances](./apis/wsdot-bridge-clearances.md) + [Border Crossings](./apis/wsdot-border-crossings.md)
- **Infrastructure Monitoring**: [Highway Cameras](./apis/wsdot-highway-cameras.md) + [Weather Stations](./apis/wsdot-weather-stations.md) + [Highway Alerts](./apis/wsdot-highway-alerts.md)
- **Transportation Analytics**: [Traffic Flow](./apis/wsdot-traffic-flow.md) + [Travel Times](./apis/wsdot-travel-times.md) + [Vessels](./apis/wsf-vessels.md)

## 🔧 Development Resources

### Configuration & Setup
- **[Getting Started](./GETTING-STARTED.md#configuration)** - Basic API key setup
- **[API Reference - Configuration](./API-REFERENCE.md#configuration)** - Advanced configuration options
- **[API Reference - Debugging](./API-REFERENCE.md#debugging-and-logging)** - Debugging and logging

### React Integration
- **[Getting Started - React Setup](./GETTING-STARTED.md#react-applications)** - Basic React setup
- **[API Reference - React Hooks](./API-REFERENCE.md#react-hooks)** - Complete React hooks reference
- **[Examples - React Patterns](./EXAMPLES.md#react-application)** - React usage examples

### Performance & Caching
- **[API Reference - Performance](./API-REFERENCE.md#performance--caching)** - Caching strategies and optimization
- **[Examples - Caching](./EXAMPLES.md#custom-caching-configuration)** - Custom caching examples

### Error Handling
- **[API Reference - Error Handling](./API-REFERENCE.md#error-handling)** - Error types and handling patterns
- **[Examples - Error Handling](./EXAMPLES.md#error-boundary-integration)** - Error boundary integration

## 📊 API Quick Reference

### Data Update Frequencies
| API Category | Update Frequency | Caching Strategy |
|--------------|------------------|------------------|
| Real-time (Vessels, Alerts) | 30-60 seconds | REALTIME_UPDATES |
| Frequent (Wait Times, Traffic) | 1-5 minutes | MINUTE_UPDATES |
| Static (Terminals, Cameras) | 1 hour | HOURLY_UPDATES |
| Historical (Schedules, Fares) | 1 day | DAILY_UPDATES |
| Static Data (Basics, Verbose) | 1 week | WEEKLY_UPDATES |

### Common Patterns
- **[Parameter Object Pattern](./API-REFERENCE.md#parameter-object-pattern)** - Consistent API parameter structure
- **[React Hooks](./API-REFERENCE.md#react-hooks)** - TanStack Query integration
- **[Error Handling](./API-REFERENCE.md#error-handling)** - Consistent error types
- **[Data Transformation](./API-REFERENCE.md#data-transformation)** - Date conversion and field filtering

## 🚀 Quick Start Paths

### New to WS-Dottie?
1. **[Getting Started](./GETTING-STARTED.md)** - Set up your environment
2. **[API Overview](./API-OVERVIEW.md)** - Understand available APIs
3. **[Examples](./EXAMPLES.md)** - See practical usage

### Building a Ferry App?
1. **[Vessels API](./apis/wsf-vessels.md)** - Real-time vessel tracking
2. **[Terminals API](./apis/wsf-terminals.md)** - Wait times and terminal info
3. **[Schedule API](./apis/wsf-schedule.md)** - Ferry schedules

### Building a Traffic App?
1. **[Highway Alerts](./apis/wsdot-highway-alerts.md)** - Real-time incidents
2. **[Traffic Flow](./apis/wsdot-traffic-flow.md)** - Current speeds
3. **[Highway Cameras](./apis/wsdot-highway-cameras.md)** - Live camera feeds

### Building a Weather App?
1. **[Weather Information](./apis/wsdot-weather-information.md)** - Road conditions
2. **[Weather Stations](./apis/wsdot-weather-stations.md)** - Station data
3. **[Mountain Pass Conditions](./apis/wsdot-mountain-pass-conditions.md)** - Pass status

## 📝 Documentation Style Guide

For contributors and maintainers:
- **[Style Guide](./style-guide.md)** - Documentation standards and guidelines
- **[Documentation Refactoring TODO](./DOCUMENTATION-REFACTORING-TODO.md)** - Current refactoring status

---

**Need help?** Check out the [Examples](./EXAMPLES.md) for common patterns or the [API Reference](./API-REFERENCE.md) for complete documentation. 