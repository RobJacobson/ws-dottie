# WS-Dottie 🚢

<div align="center">
  <img src="assets/dottie.png" alt="WS-Dottie Logo" width="200">
</div>

[![npm version](https://img.shields.io/npm/v/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                           
[![npm downloads](https://img.shields.io/npm/dm/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                        
[![npm license](https://img.shields.io/npm/l/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)                                                           
[![bundle size](https://img.shields.io/bundlephobia/min/ws-dottie.svg)](https://bundlephobia.com/result?p=ws-dottie)                                            
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)                                                          
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)                                                                           
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)                                                                               
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5+-orange.svg)](https://tanstack.com/query)                                                    


Meet Dottie — not just another API wrapper, but your cheerful, unauthorized guide to real-time Washington State transportation data pufrom the Department of Transportation and Washington State Ferries. Whether you're tracking ferries across Puget Sound or monitoring traffic on I‑5, Dottie makes it feel like you're chatting with a knowledgeable friend who happens to have real‑time access to every traffic camera, weather station, and ferry terminal in the state.          

This friendly TypeScript client library provides type‑safe data fetching from 16 Washington State transportation APIs, spanning 96 documented endpoints — from real‑time ferry locations to traffic cameras, weather stations, and highway alerts. Whether you're building a weekend project, a classroom demo, or a production app, WS‑Dottie helps you tame the data firehose with smart caching, strict typing, JSONP support for browsers to resolve CORS roadblocks, and seamless TanStack Query integration — all free and easy to use.                                  

Why folks love WS‑Dottie:
- Fun, friendly DX with strong TypeScript types
- Works great for education, hobbyist builds, and commercial apps
- Sensible defaults you can override with standard TanStack Query options

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

**Node.js Application**
```javascript
import { WsfVessels, WsdotHighwayAlerts } from 'ws-dottie';

// Get real-time ferry locations
const vessels = await WsfVessels.getVesselLocations();
console.log(`Found ${vessels.length} active vessels`);

// Get current highway alerts
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
console.log(`Found ${alerts.length} active alerts`);
```

**React Application**
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

## 🖥️ Command Line Interface

WS-Dottie includes a powerful CLI for quick testing, debugging, and production use cases. Access all transportation data directly from your terminal without writing code.                                                                      

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

**Get border crossing data:**
```bash
fetch-dottie getBorderCrossings
```

**Get bridge clearances with parameters:**
```bash
fetch-dottie getBridgeClearances '{"route": "005"}'
```

**Get ferry fare information:**
```bash
fetch-dottie getFareLineItems '{"originTerminalId": 7, "destinationTerminalId": 3, "date": "2025-01-27"}'                                                          
```

**Pretty-printed output:**
```bash
fetch-dottie getBorderCrossings --pretty
```

**Concise array output:**
```bash
fetch-dottie getVesselLocations --concise
```

**Silent mode (JSON only):**
```bash
fetch-dottie getBorderCrossings --silent
```

**Limit output to first 5 items:**
```bash
fetch-dottie getVesselLocations --limit 5
```

**JSONP mode for browser environments:**
```bash
fetch-dottie getBorderCrossings --jsonp
```

**Raw fetch without validation:**
```bash
fetch-dottie getBorderCrossings --no-validation
```

### Available Functions

The CLI supports all 90+ endpoints across 16 APIs:

- **WSDOT APIs**: Border Crossings, Bridge Clearances, Highway Alerts, Traffic Cameras, Weather Stations, Travel Times, Toll Rates, Mountain Passes, Commercial Vehicle Restrictions                                                            
- **WSF APIs**: Ferry Schedules, Vessel Locations, Terminal Information, Fare Data                                                                              

Use `fetch-dottie --help` to see all available functions with descriptions.

### CLI Options

- `--pretty` - Pretty-print JSON output with 2-space indentation (default)
- `--concise` - Concise array output with brackets on own lines
- `--silent` - Suppress all output except final JSON result
- `--limit <number>` - Truncate output to first N items
- `--jsonp` - Use JSONP transport for browser environments
- `--no-validation` - Disable Zod validation (raw fetch with .NET date conversion)

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

## 🔧 Features

- **🔄 Smart Caching** - Built‑in TanStack Query integration with optimized caching strategies for different data types                                         
- **🌐 Cross-Platform** - Works in browsers (JSONP) and Node.js (fetch)
- **📱 React Ready** - Hooks for all APIs with automatic cache management
- **🎯 Strong Typing** - Zod‑inferred TypeScript types for all APIs, parameters, and responses                                                                  
- **📦 Parameter Objects** - Consistent single‑parameter object pattern for all API calls                                                                       
- **⚙️ Flexible Configuration** - Environment variables or runtime configuration with type‑safe interface                                                        
- **🔍 Debugging** - Optional logging for troubleshooting API calls
- **⚡ Tree‑Shaking** - Only import what you need to keep bundles small
- **🛡️ Error Handling** - Consistent error types with user‑friendly messages
- **📅 Date Conversion** - Automatic conversion of upstream date strings to JavaScript Date objects (lean parser) with Zod 4 runtime validation                 

## 📚 Documentation

- **[API Index](./docs/api-index.md)** - Complete overview of all available endpoints
- **[Getting Started Guide](./docs/readme-cli.md)** - CLI usage and examples
- **[Agent Documentation](./docs/agents/getting-started-for-agents.md)** - AI agent integration guide

### Doc Map
- Start here: **[Documentation Index](./docs/old%20docs/INDEX.md)** — canonical entry point with links to all API docs and guides                                          

## 🎯 Example Projects

Here are some projects you could build with WS-Dottie:

### For Hobbyists
- **Ferry Tracker** - Real-time map showing vessel locations and wait times
- **Traffic Camera Viewer** - Browse and view traffic cameras by region
- **Weather Dashboard** - Road conditions and weather for your commute
- **Toll Calculator** - Plan trips with real-time toll pricing

### For Developers
- **Transportation Analytics** - Analyze traffic patterns and ferry usage
- **Route Planning** - Integrate real-time data into navigation apps
- **Emergency Response** - Monitor highway alerts and conditions
- **Logistics Tools** - Commercial vehicle routing with restrictions

### For Enterprise
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

# Individual test files
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/parameter-validation.ts
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/data-integrity.ts
npx vitest --config config/vitest.config.ts --run tests/e2e/tests/schema-and-consistency-validation.ts
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
