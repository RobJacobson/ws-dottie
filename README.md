# WS-Dottie 🚢

<div align="center">
  <img src="assets/dottie.png" alt="WS-Dottie Logo" width="400">
</div>

[![npm version](https://img.shields.io/npm/v/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                           
[![npm downloads](https://img.shields.io/npm/dm/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                        
[![npm license](https://img.shields.io/npm/l/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                           
[![bundle size](https://img.shields.io/bundlephobia/min/ws-dottie.svg)](https://bundlephobia.com/result?p=ws-dottie)                                            
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)                                                          
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)                                                                           
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)                                                                               
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5+-orange.svg)](https://tanstack.com/query)                                                    


Meet Dottie — your comprehensive TypeScript companion for fetching real-time Washington State transportation data. This production-ready library provides type-safe access to **16 WSDOT and WSF APIs** with **90+ endpoints**, transforming complex government APIs into a modern, developer-friendly interface.

## Why WS-Dottie is Special

**🚀 Comprehensive Coverage**: Access the full spectrum of Washington State transportation data — from real-time ferry locations and traffic cameras to weather stations, highway alerts, toll rates, and border crossings.

**🎯 Production-Ready**: Built for real applications with smart caching strategies, comprehensive error handling, and environment-aware logging. Works seamlessly in browsers (JSONP), servers (native fetch), and CLI environments.

**⚡ Developer Experience**: Type-safe from end-to-end with Zod validation, automatic .NET datetime conversion, and sensible defaults. Includes a powerful CLI for debugging and testing.

**🔄 Smart Caching**: TanStack Query integration with transportation-optimized cache strategies — from 5-second real-time updates for traffic cameras to daily updates for static data like terminals and vessels.

**🌐 Environment Agnostic**: Same code works in React apps, Node.js servers, and command-line tools. Automatic CORS handling with JSONP support for browsers.

### Zod‑powered validation (Zod 4)

WS‑Dottie uses Zod 4 schemas for optional runtime validation and type inference across all APIs. That means:                                                             
- Strong, generated TypeScript types from a single source of truth
- Early detection of upstream shape drifts and edge cases
- Safe transformations of date strings and nullable fields
- Pass‑through philosophy for unknown fields (we don't strip upstream data)

Practically, API functions fetch raw data, validate and transform it with Zod, and then return fully typed results. This improves reliability without adding complexity to your app code.                                                       

## ✨ What You Can Build

- **🚢 Ferry Tracking Apps** - Real-time vessel locations, terminal wait times, and sailing schedules                                                           
- **🚗 Traffic Monitoring Dashboards** - Live traffic flow, travel times, and highway alerts                                                                    
- **🌤️ Weather & Road Condition Apps** - Weather station data and mountain pass conditions                                                                       
- **📷 Camera Feeds** - Access to hundreds of traffic cameras across Washington
- **💰 Toll Rate Calculators** - Real-time toll pricing for planning trips
- **🚛 Commercial Vehicle Tools** - Bridge clearances and vehicle restrictions
- **🌉 Border Crossing Apps** - Wait times and conditions at border crossings

## 🚀 Quick Start

### 1. Get Your Free API Key

Visit the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access) and sign up with just your email address. No credit card required — the API is completely free.                                                                  

### 2. Install WS-Dottie

```bash
npm install ws-dottie
```

### 3. Configure Your API Key

**Option A: Environment Variables (Recommended)**
```bash
# For Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

**Using a .env file**
```env
WSDOT_ACCESS_TOKEN=your_api_key_here
```

**Option B: Runtime Configuration**

For dynamic environments or when you need to configure at runtime:

```javascript
import { configManager } from 'ws-dottie';

// Set API key only (recommended for web clients)
configManager.setApiKey('your_api_key_here');

// Set base URL only (optional: route through proxy)
configManager.setBaseUrl('https://your-proxy-server.com');
```

### 4. Module Format Support

WS‑Dottie supports both CommonJS and ES Module formats:

**ES Modules (Recommended)**
```javascript
import { useVesselLocations, useHighwayAlerts, configManager } from 'ws-dottie';
```

**CommonJS**
```javascript
const { useVesselLocations, useHighwayAlerts, configManager } = require('ws-dottie');                                                                           
```

Modern bundlers and Node.js will choose the optimal format automatically. Deep subpath imports are not currently exposed; prefer named imports.                 

### 5. Start Building

**React Application (Recommended)**
```javascript
import { useVesselLocations, useHighwayAlerts } from 'ws-dottie';

function TransportationDashboard() {
  const { data: vessels, isLoading } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();

  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
```

**Server-Side (Node.js)**
```javascript
import { fetchDottie, getVesselLocationsByVesselId, getAlertById, getFareLineItemsByTripDateAndTerminals } from 'ws-dottie';

// Get specific vessel location (VesselID: 18)
const vessel = await fetchDottie({
  endpoint: getVesselLocationsByVesselId,
  params: { VesselID: 18 },
  fetchMode: 'native',
  validate: true
});

// Get specific highway alert (AlertID: 468632)
const alert = await fetchDottie({
  endpoint: getAlertById,
  params: { AlertID: 468632 },
  fetchMode: 'native',
  validate: true
});

// Get ferry fare information for tomorrow's trip
const fares = await fetchDottie({
 endpoint: getFareLineItemsByTripDateAndTerminals,
  params: {
    TripDate: '2025-01-28',
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false
  },
  fetchMode: 'native',
  validate: true
});
```

**Browser (CORS-Safe)**
```javascript
import { fetchDottie, getVesselBasicsByVesselId, getBridgeClearancesByRoute } from 'ws-dottie';

// Get specific vessel details (VesselID: 74)
const vessel = await fetchDottie({
  endpoint: getVesselBasicsByVesselId,
  params: { VesselID: 74 },
  fetchMode: 'jsonp', // Bypasses CORS
  validate: true
});

// Get bridge clearances for I-5 (Route: "005")
const clearances = await fetchDottie({
  endpoint: getBridgeClearancesByRoute,
  params: { Route: "005" },
  fetchMode: 'jsonp',
  validate: true
});
```

**Command Line (Debugging & Testing)**
```bash
# List all available endpoints
fetch-dottie --list

# Test specific vessel location (VesselID: 18)
fetch-dottie getVesselLocationsByVesselId '{"VesselID": 18}'

# Get ferry fares for specific trip
fetch-dottie getFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'

# Fast testing without validation (raw data)
fetch-dottie getVesselBasicsByVesselId '{"VesselID": 74}' --no-validation --pretty

# Browser-compatible JSONP testing with parameters
fetch-dottie getBridgeClearancesByRoute '{"Route": "005"}' --jsonp
```

## 🖥️ Command Line Interface

WS-Dottie includes a comprehensive CLI tool (`fetch-dottie`) that provides **production-ready debugging and testing capabilities**. Access all 90+ endpoints directly from your terminal with configurable transport strategies and validation options.                                                                      

### Installation

The CLI is included with WS-Dottie and works in Node.js environments:

```bash
# Install ws-dottie (includes CLI)
npm install ws-dottie

# Or use directly with npx (no installation required)
npx fetch-dottie --help
```

### Configuration

Set your WSDOT API key as an environment variable:

```bash
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

### Usage

```bash
fetch-dottie <function-name> [params] [options]
```

### Examples

**🚀 Quick Testing & Debugging**
```bash
# List all available endpoints
fetch-dottie --list

# Test any endpoint with full validation
fetch-dottie getBorderCrossings

# Fast testing without validation (raw data)
fetch-dottie getVesselBasics --no-validation
```

**🌐 Environment Testing**
```bash
# Server-side testing (default)
fetch-dottie getVesselLocations

# Browser environment testing (JSONP)
fetch-dottie getBorderCrossings --jsonp

# Mixed: JSONP without validation (fastest)
fetch-dottie getVesselBasics --jsonp --no-validation
```

**📊 Data Exploration**
```bash
# Get bridge clearances for I-5
fetch-dottie getBridgeClearancesByRoute '{"Route": "005"}'

# Get ferry fare information for specific trip
fetch-dottie getFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'

# Get specific vessel location (VesselID: 18)
fetch-dottie getVesselLocationsByVesselId '{"VesselID": 18}'

# Get specific highway alert (AlertID: 468632)
fetch-dottie getAlertById '{"AlertID": 468632}'

# Get weather from specific station (StationID: 1909)
fetch-dottie getWeatherInformationByStationId '{"StationID": 1909}'

# Get vessel history for specific date range
fetch-dottie getVesselHistoriesByVesselNameAndDateRange '{"VesselName": "Tacoma", "DateStart": "2025-09-01", "DateEnd": "2025-10-01"}'

# Pretty-printed output
fetch-dottie getBorderCrossings --pretty

# Concise array output
fetch-dottie getVesselLocations --concise

# Silent mode (JSON only)
fetch-dottie getBorderCrossings --silent

# Limit output to first 5 items
fetch-dottie getVesselLocations --limit 5
```

### Available Functions

The CLI supports all 90+ endpoints across 16 APIs:

- **WSDOT APIs**: Border Crossings, Bridge Clearances, Highway Alerts, Traffic Cameras, Weather Stations, Travel Times, Toll Rates, Mountain Passes, Commercial Vehicle Restrictions                                                            
- **WSF APIs**: Ferry Schedules, Vessel Locations, Terminal Information, Fare Data                                                                              

Use `fetch-dottie --help` to see all available functions with descriptions.

### CLI Options

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

## 📊 Available Data Sources (16 APIs, 90+ endpoints)

### WSDOT APIs
- **Highway Alerts** - Real-time traffic incidents and construction updates
- **Traffic Flow** - Current traffic speeds and congestion data
- **Travel Times** - Estimated travel times between locations
- **Toll Rates** - Real-time toll pricing for managed lanes
- **Weather Information** - Road weather conditions and forecasts
- **Highway Cameras** - Live traffic camera feeds across the state
- **Bridge Clearances** - Height restrictions for commercial vehicles
- **Mountain Pass Conditions** - Pass status and travel restrictions
- **Commercial Vehicle Restrictions** - Truck and commercial vehicle limits
- **Border Crossings** - Wait times and conditions at border crossings
- **Weather Stations** - Weather station data and road conditions

### WSF APIs
- **Vessels** - Real-time vessel locations and status
- **Terminals** - Terminal wait times and sailing space
- **Schedules** - Ferry schedules and sailing times
- **Fares** - Fare information and pricing

## 🔧 Core Features

### **🚀 Comprehensive API Coverage**
- **16 distinct APIs** covering WSDOT (traffic, weather, tolls) and WSF (ferries, schedules)
- **90+ endpoints** with full type safety and validation
- **Unified interface** — all APIs work consistently regardless of source

### **🔄 Smart Caching & React Integration**
- **TanStack Query integration** with transportation-optimized cache strategies:
  - `REALTIME` (5-second updates) for traffic cameras, vessel locations
  - `FREQUENT` (5-minute updates) for schedules, alerts  
  - `MODERATE` (hourly updates) for weather, conditions
  - `STATIC` (daily updates) for terminals, vessels, routes
- **Zero-configuration React hooks** with automatic revalidation and background refresh

### **🌐 Flexible Fetching Strategies**
- **Native fetch** for server-side and Node.js applications
- **JSONP support** for browser environments (bypasses CORS restrictions)
- **Optional Zod validation** for performance vs. safety tradeoffs
- **Unified API** — same code works in browser and server

### **🛠️ Production-Ready Developer Experience**
- **Command-line debugging tool** with all endpoints accessible via CLI
- **Comprehensive error handling** with detailed context and helpful messages
- **Environment-aware logging** with performance metrics
- **Automatic .NET datetime conversion** (handles WSDOT's `/Date(timestamp)/` format)
- **Type-safe configuration** via environment variables or runtime setup

### **🎯 Developer-Friendly Design**
- **Strong TypeScript types** inferred from Zod schemas
- **Consistent parameter patterns** across all APIs
- **Tree-shaking support** — only import what you need
- **Sample parameters** provided for every endpoint                 

## 🔄 TanStack Query Integration

WS-Dottie provides **zero-configuration React hooks** with transportation-optimized caching strategies. Each API endpoint automatically uses the appropriate cache strategy based on data update frequency.

### **Cache Strategies**

```javascript
import { useVesselLocations, useHighwayAlerts, useVesselBasics } from 'ws-dottie';

function TransportationDashboard() {
  // REALTIME: 5-second updates for vessel locations
  const { data: vessels, isLoading: vesselsLoading } = useVesselLocations();
  
  // FREQUENT: 5-minute updates for highway alerts  
  const { data: alerts, isLoading: alertsLoading } = useHighwayAlerts();
  
  // STATIC: Daily updates for vessel information
  const { data: vesselInfo } = useVesselBasics();

  return (
    <div>
      <h2>Active Vessels: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      <h2>Vessel Details: {vesselInfo?.length || 0}</h2>
    </div>
  );
}
```

### **Parameterized Queries**

```javascript
import { useVesselLocationsById, useGetAlert, useFareLineItems } from 'ws-dottie';

function SpecificDataView() {
  // Get specific vessel location (REALTIME caching)
  const { data: vessel } = useVesselLocationsById({ VesselID: 18 });
  
  // Get specific highway alert (FREQUENT caching)
  const { data: alert } = useGetAlert({ AlertID: 468632 });
  
  // Get ferry fares for specific trip (STATIC caching)
  const { data: fares } = useFareLineItems({
    TripDate: '2025-01-28',
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false
  });

  return (
    <div>
      <h3>Vessel: {vessel?.VesselName}</h3>
      <h3>Alert: {alert?.Headline}</h3>
      <h3>Fares: {fares?.length} options</h3>
    </div>
  );
}
```

### **Advanced Query Options**

```javascript
import { useQuery } from '@tanstack/react-query';
import { fetchDottie, vesselBasicsById } from 'ws-dottie';

function CustomQueryExample() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vessel', 74],
    queryFn: () => fetchDottie({
      endpoint: vesselBasicsById,
      params: { VesselID: 74 },
      fetchMode: 'native',
      validate: true
    }),
    staleTime: 60 * 1000, // Custom stale time
    refetchInterval: 30 * 1000, // Custom refetch interval
    retry: 3,
    retryDelay: 1000
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Vessel: {data?.VesselName}</div>;
}
```

### **Cache Strategy Details**

| Strategy | Update Frequency | Use Cases | Stale Time | Refetch Interval |
|----------|------------------|-----------|------------|------------------|
| `REALTIME` | 5 seconds | Traffic cameras, vessel locations | 5s | 5s |
| `FREQUENT` | 5 minutes | Schedules, alerts, weather | 5m | 5m |
| `MODERATE` | 1 hour | Weather conditions, road status | 1h | 1h |
| `STATIC` | 1 day | Terminals, vessels, routes | 1d | 1d |

## 📚 Documentation

- **[API Index](./docs/api-index.md)** - Complete overview of all available endpoints
- **[Getting Started Guide](./docs/readme-cli.md)** - CLI usage and examples
- **[Agent Documentation](./docs/agents/getting-started-for-agents.md)** - AI agent integration guide

### Doc Map
- Start here: **[Documentation Index](./docs/old%20docs/INDEX.md)** — canonical entry point with links to all API docs and guides                                          

## 🎯 Implementation Examples

### **React Dashboard (Recommended)**
```javascript
import { 
  useVesselLocations, 
  useHighwayAlerts, 
  useVesselLocationsById,
  useGetAlert,
  useFareLineItems 
} from 'ws-dottie';

function TransportationDashboard() {
  // Real-time data with automatic caching
  const { data: allVessels, isLoading: vesselsLoading } = useVesselLocations();
  const { data: alerts, isLoading: alertsLoading } = useHighwayAlerts();
  
  // Specific vessel tracking (VesselID: 18)
  const { data: specificVessel } = useVesselLocationsById({ VesselID: 18 });
  
  // Specific alert details (AlertID: 468632)
  const { data: alertDetails } = useGetAlert({ AlertID: 468632 });
  
  // Ferry fare calculation for tomorrow's trip
  const { data: fares } = useFareLineItems({
    TripDate: '2025-01-28',
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false
  });

  return (
    <div className="dashboard">
      <section>
        <h2>Active Ferries: {allVessels?.length || 0}</h2>
        {specificVessel && <p>Tracking: {specificVessel.VesselName}</p>}
        {vesselsLoading && <div>Loading vessels...</div>}
      </section>
      
      <section>
        <h2>Highway Alerts: {alerts?.length || 0}</h2>
        {alertDetails && <p>Latest: {alertDetails.Headline}</p>}
        {alertsLoading && <div>Loading alerts...</div>}
      </section>
      
      <section>
        <h2>Trip Planning</h2>
        <p>Ferry fares: {fares?.length || 0} options available</p>
      </section>
    </div>
  );
}
```

### **Server-Side API Integration**
```javascript
import { 
  fetchDottie,
  getBorderCrossings,
  getVesselLocationsByVesselId,
  getAlertById,
  getBridgeClearancesByRoute
} from 'ws-dottie';

// Express.js route handler with parameterized queries
app.get('/api/transportation/:vesselId/:alertId', async (req, res) => {
  try {
    const { vesselId, alertId } = req.params;
    
    const [crossings, vessel, alert, clearances] = await Promise.all([
      // All border crossings
      fetchDottie({
        endpoint: getBorderCrossings,
        params: {},
        fetchMode: 'native',
        validate: true
      }),
      
      // Specific vessel location
      fetchDottie({
        endpoint: getVesselLocationsByVesselId,
        params: { VesselID: parseInt(vesselId) },
        fetchMode: 'native',
        validate: true
      }),
      
      // Specific highway alert
      fetchDottie({
        endpoint: getAlertById,
        params: { AlertID: parseInt(alertId) },
        fetchMode: 'native',
        validate: true
      }),
      
      // Bridge clearances for I-5
      fetchDottie({
        endpoint: getBridgeClearancesByRoute,
        params: { Route: "005" },
        fetchMode: 'native',
        validate: true
      })
    ]);

    res.json({ crossings, vessel, alert, clearances });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Browser Application (CORS-Safe)**
```javascript
import { 
  fetchDottie,
  getVesselBasicsByVesselId,
  getWeatherInformationByStationId,
  getAlertsByRegionId
} from 'ws-dottie';

// Browser-safe data fetching with parameters
async function loadTransportationData(vesselId = 74, stationId = 1909, regionId = 9) {
  const [vessel, weather, regionalAlerts] = await Promise.all([
    // Specific vessel details
    fetchDottie({
      endpoint: getVesselBasicsByVesselId,
      params: { VesselID: vesselId },
      fetchMode: 'jsonp', // Bypasses CORS
      validate: true
    }),
    
    // Weather from specific station
    fetchDottie({
      endpoint: getWeatherInformationByStationId,
      params: { StationID: stationId },
      fetchMode: 'jsonp',
      validate: true
    }),
    
    // Alerts from specific region
    fetchDottie({
      endpoint: getAlertsByRegionId,
      params: { RegionID: regionId },
      fetchMode: 'jsonp',
      validate: true
    })
  ]);

  return { vessel, weather, regionalAlerts };
}
```

### **CLI Automation & Testing**
```bash
#!/bin/bash
# Automated monitoring script with specific parameters

# Check specific vessel status (VesselID: 18)
echo "=== Vessel Status ==="
fetch-dottie getVesselLocationsByVesselId '{"VesselID": 18}' --concise

# Check highway alerts for specific region (RegionID: 9)
echo "=== Regional Alerts ==="
fetch-dottie getAlertsByRegionId '{"RegionID": 9}' --limit 5

# Check weather from specific station (StationID: 1909)
echo "=== Weather Station ==="
fetch-dottie getWeatherInformationByStationId '{"StationID": 1909}'

# Get ferry fares for tomorrow's trip
echo "=== Ferry Fares ==="
fetch-dottie getFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}' --pretty

# Fast testing without validation
echo "=== Quick Test ==="
fetch-dottie getVesselBasicsByVesselId '{"VesselID": 74}' --no-validation --silent

# Check bridge clearances for I-5
echo "=== Bridge Clearances ==="
fetch-dottie getBridgeClearancesByRoute '{"Route": "005"}' --concise
```

## 🚀 Example Projects

### **For Hobbyists**
- **Ferry Tracker** - Real-time map showing vessel locations and wait times
- **Traffic Camera Viewer** - Browse and view traffic cameras by region
- **Weather Dashboard** - Road conditions and weather for your commute
- **Toll Calculator** - Plan trips with real-time toll pricing

### **For Developers**
- **Transportation Analytics** - Analyze traffic patterns and ferry usage
- **Route Planning** - Integrate real-time data into navigation apps
- **Emergency Response** - Monitor highway alerts and conditions
- **Logistics Tools** - Commercial vehicle routing with restrictions

### **For Enterprise**
- **Fleet Management** - Track vehicles with real-time traffic data
- **Supply Chain Planning** - Optimize routes using traffic and weather data
- **Public Safety** - Monitor transportation infrastructure
- **Urban Planning** - Analyze transportation patterns and trends

## 🧪 Testing

WS-Dottie includes comprehensive testing with support for both Node.js and browser environments.                                                                

```bash
# Quick test commands
npm run test:e2e                    # E2E tests (Node.js)
npm run test:module                 # Module-specific tests
npm run test:direct                 # Direct vitest execution

```

**JSONP Testing**: Use `--jsonp` flag or `JSONP=true` environment variable to test browser environment compatibility.                                           

📖 **For detailed testing information, see [Testing Architecture](./docs/architecture/testing-architecture.md)**

## 🏛️ Governance

Maintained by the Ferryjoy npm org. Issues and contributions welcome.

## 🤝 Contributing

We welcome contributions! Please see our [development guide](./docs/agents/getting-started-for-agents.md) for setup instructions.                                                 

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for Washington State travelers**
