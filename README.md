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

## Table of Contents

- [Why WS-Dottie is Special](#why-ws-dottie-is-special)
- [Zod-powered validation](#zod-powered-validation-zod-3)
- [What You Can Build](#-what-you-can-build)
- [Quick Start](#-quick-start)
  - [Get Your Free API Key](#1-get-your-free-api-key)
  - [Install WS-Dottie](#2-install-ws-dottie)
  - [Configure Your API Key](#3-configure-your-api-key)
  - [Module Format Support](#4-module-format-support)
  - [Import Patterns](#5-import-patterns)
  - [TypeScript Types](#typescript-types)
  - [Start Building](#6-start-building)
- [Command Line Interface](#-command-line-interface)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)
  - [Examples](#examples)
  - [Available Functions](#available-functions)
  - [CLI Options](#cli-options)
- [Available Data Sources](#-available-data-sources-16-apis-98-endpoints)
  - [WSDOT APIs](#wsdot-apis)
  - [WSF APIs](#wsf-apis)
- [Core Features](#-core-features)
  - [Comprehensive API Coverage](#-comprehensive-api-coverage)
  - [Smart Caching & React Integration](#-smart-caching--react-integration)
  - [Flexible Fetching Strategies](#-flexible-fetching-strategies)
  - [Production-Ready Developer Experience](#-production-ready-developer-experience)
  - [Automated Documentation](#-automated-documentation)
  - [Developer-Friendly Design](#-developer-friendly-design)
- [Production vs Development](#-production-vs-development)
  - [When to Use Validation](#when-to-use-validation)
  - [Development vs Production Patterns](#development-vs-production-patterns)
  - [Bundle Size Optimization](#bundle-size-optimization)
- [TanStack Query Integration](#-tanstack-query-integration)
  - [Cache Strategies](#-cache-strategies)
  - [Parameterized Queries](#-parameterized-queries)
  - [Advanced Query Options](#-advanced-query-options)
  - [Cache Strategy Details](#-cache-strategy-details)
- [Documentation](#-documentation)
- [Implementation Examples](#-implementation-examples)
  - [React Dashboard (Recommended)](#-react-dashboard-recommended)
  - [Server-Side API Integration](#-server-side-api-integration)
  - [Browser Application (CORS-Safe)](#-browser-application-cors-safe)
  - [CLI Automation & Testing](#-cli-automation--testing)
- [Example Projects](#-example-projects)
  - [For Hobbyists](#-for-hobbyists)
  - [For Developers](#-for-developers)
  - [For Enterprise](#-for-enterprise)
- [Testing](#-testing)
- [Governance](#-governance)
- [Contributing](#-contributing)
- [License](#-license)


Meet Dottie — your comprehensive TypeScript companion for fetching real-time Washington State transportation data. This production-ready library provides type-safe access to **16 WSDOT and WSF APIs** with **98 endpoints**, transforming complex government APIs into a modern, developer-friendly interface.

## Why WS-Dottie is Special

**🚀 Comprehensive Coverage**: Access full spectrum of Washington State transportation data — from real-time ferry locations and traffic cameras to weather stations, highway alerts, toll rates, and border crossings.

**🎯 Production-Ready**: Built for real applications with smart caching strategies, comprehensive error handling, and environment-aware logging. Works seamlessly in browsers (JSONP), servers (native fetch), and CLI environments.c

**⚡ Developer Experience**: Type-safe from end-to-end with Zod validation, automatic .NET datetime conversion, and sensible defaults. Includes a powerful CLI for debugging and testing.

**🔄 Smart Caching**: TanStack Query integration with transportation-optimized cache strategies — from 5-second real-time updates for traffic cameras to daily updates for static data like terminals and vessels.

**🌐 Environment Agnostic**: Same code works in React apps, Node.js servers, and command-line tools. Automatic CORS handling with JSONP support for browsers.

### Zod‑powered validation (Zod 3)

WS‑Dottie uses Zod 3 schemas for **optional** runtime validation and type inference across all APIs. Validation is **disabled by default** (`validate: false`) for optimal performance, but you can enable it when you need extra safety.

- **With validation** (`validate: true`): Strong runtime type safety, early detection of API changes, and safe data transformations
- **Without validation** (`validate: false` - default): Faster performance, smaller bundles, and still type-safe with TypeScript

For detailed information about validation, performance trade-offs, and best practices, see the [Validation Guide](./docs/guides/advanced/validation-guide.md).

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

Visit [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access) and sign up with just your email address. No credit card required — API is completely free.                                                                  

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
import { configManager, fetchDottie } from 'ws-dottie';
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
```

**CommonJS**
```javascript
const { configManager, fetchDottie } = require('ws-dottie');
const { useVesselLocations } = require('ws-dottie/wsf-vessels');
const { useAlerts } = require('ws-dottie/wsdot-highway-alerts');
```

Modern bundlers and Node.js will choose the optimal format automatically.

### 5. Import Patterns

WS-Dottie provides multiple import patterns optimized for different use cases. Choose the pattern that best fits your needs:

#### Shared Utilities (Main Entry)

The root package now exposes shared utilities only:

```javascript
import { configManager, fetchDottie, datesHelper } from 'ws-dottie';
import type { ApiError } from 'ws-dottie';
```

**Use when**: You need global configuration, low-level fetching, or shared helpers.

#### API Hooks and Types

Import hooks, fetch functions, and types for a specific API from its package entry:

```javascript
import { useVesselLocations, type VesselLocation } from 'ws-dottie/wsf-vessels';
import { useAlerts, type Alert } from 'ws-dottie/wsdot-highway-alerts';
```

**Use when**: You want React hooks and types for a particular API.

#### Core Fetch Functions (No Hooks)

Import only fetch functions and types — no React dependencies:

```javascript
import { 
  fetchVesselLocations,   // Fetch functions only
  type VesselLocation      // TypeScript types
} from 'ws-dottie/wsf-vessels/core';
```

**Use when**: Building server-side code, Node.js scripts, or when you don't need React hooks. Excludes TanStack Query dependencies for smaller bundles.

#### Schema Imports (Zod Schemas Only)

Import Zod schemas for custom validation or type inference:

```javascript
import { 
  vesselLocationsSchema,      // Zod schema
  type VesselLocation         // Inferred TypeScript type
} from 'ws-dottie/wsf-vessels/schemas';
```

**Use when**: You need Zod schemas for custom validation logic or want to build your own validation layer.

### TypeScript Types

WS-Dottie exports TypeScript types for all API inputs and outputs. Types are available from the same import paths as functions:

**Importing Types:**
```typescript
// Import types along with functions
import {
  fetchVesselLocations,
  type VesselLocation,           // Output type (single item)
  type VesselLocationsInput,     // Input type
} from 'ws-dottie/wsf-vessels/core';

// Import types without functions
import type { VesselLocation } from 'ws-dottie/wsf-vessels/schemas';
```

**Using Types in Your Code:**
```typescript
import {
  fetchVesselLocations,
  type VesselLocation,
} from 'ws-dottie/wsf-vessels/core';

// Type function parameters
async function processVessel(vessel: VesselLocation) {
  console.log(`Processing ${vessel.VesselName}`);
}

// Type function return values
async function getVesselData(): Promise<VesselLocation[]> {
  const vessels = await fetchVesselLocations({
    fetchMode: 'native',
    validate: false
  });
  return vessels;
}

// Type variables
const vessel: VesselLocation = {
  VesselID: 18,
  VesselName: 'Chelan',
  // ... other properties
};
```

**Input vs Output Types:**
- **Input types** (`*Input`): Parameters for API functions
  - Example: `VesselLocationsByIdInput` for `fetchVesselLocationsByVesselId`
- **Output types**: Response data from API functions
  - Example: `VesselLocation` (single item) or `VesselLocation[]` (array)

**Types with React Hooks:**
```typescript
import { 
  useVesselLocations,
  type VesselLocation 
} from 'ws-dottie/wsf-vessels';

function VesselList() {
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: false,
});
  
  // TypeScript knows vessels is VesselLocation[] | undefined
  if (!vessels) return <div>Loading...</div>;
  
  return (
    <ul>
      {vessels.map((vessel: VesselLocation) => (
        <li key={vessel.VesselID}>{vessel.VesselName}</li>
      ))}
    </ul>
  );
}
```

**Type Naming Convention:**
- Output types: PascalCase singular (e.g., `VesselLocation`, `HighwayAlert`)
- Input types: PascalCase with `Input` suffix (e.g., `VesselLocationsInput`, `VesselLocationsByIdInput`)
- Arrays: Use TypeScript array syntax (e.g., `VesselLocation[]`)

### 6. Start Building

**React Application (Recommended)**
```javascript
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function TransportationDashboard() {
  const { data: vessels, isLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  const { data: alerts } = useAlerts({
    fetchMode: 'native',
    validate: true,
  });

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
import {
  fetchVesselLocationsByVesselId,
  fetchFareLineItemsByTripDateAndTerminals,
} from 'ws-dottie/wsf-vessels/core';
import { fetchAlertById } from 'ws-dottie/wsdot-highway-alerts/core';
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';

// Get specific vessel location (VesselID: 18)
const vessel = await fetchVesselLocationsByVesselId({
  params: { VesselID: 18 },
  fetchMode: 'native',
  validate: true,
});

// Get specific highway alert (AlertID: 468632)
const alert = await fetchAlertById({
  params: { AlertID: 468632 },
  fetchMode: 'native',
  validate: true,
});

// Get ferry fare information for tomorrow's trip
const fares = await fetchFareLineItemsByTripDateAndTerminals({
  params: {
    TripDate: '2025-01-28',
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false,
  },
  fetchMode: 'native',
  validate: true,
});

// Get all border crossings
const crossings = await fetchBorderCrossings({
  fetchMode: 'native',
  validate: true,
});
```

**Browser (CORS-Safe)**
```javascript
import { fetchVesselBasicsByVesselId } from 'ws-dottie/wsf-vessels/core';
import { fetchBridgeClearancesByRoute } from 'ws-dottie/wsdot-bridge-clearances/core';

// Get specific vessel details (VesselID: 74)
const vessel = await fetchVesselBasicsByVesselId({
  params: { VesselID: 74 },
  fetchMode: 'jsonp', // Bypasses CORS
  validate: true
});

// Get bridge clearances for I-5 (Route: "005")
const clearances = await fetchBridgeClearancesByRoute({
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
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}'

# Get ferry fares for specific trip
fetch-dottie fetchFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}'

# Fast testing without validation (raw data)
fetch-dottie fetchVesselBasicsByVesselId '{"VesselID": 74}' --no-validation --pretty

# Browser-compatible JSONP testing with parameters
fetch-dottie fetchBridgeClearancesByRoute '{"Route": "005"}' --jsonp
```

## 📚 OpenAPI JSON Exports

WS-Dottie exports OpenAPI 3.0 specifications for all APIs as JSON files, making them easily consumable by other tools and services like `ws-dottie-mcp`. These exports provide a complete machine-readable description of all endpoints, schemas, and documentation.

### Importing OpenAPI Specifications

You can import OpenAPI specifications directly from the ws-dottie package:

```javascript
// Import a specific API specification
import wsfVesselsSpec from 'ws-dottie/openapi/wsf-vessels.json' assert { type: 'json' };

// Use the specification in your application
console.log(`API Title: ${wsfVesselsSpec.info.title}`);
console.log(`Available endpoints: ${Object.keys(wsfVesselsSpec.paths).length}`);
```

### Available API Specifications

All 16 APIs have OpenAPI specifications available:

**Washington State Ferries (WSF) APIs:**
- `wsf-vessels.json` - Vessel locations, stats, and information
- `wsf-terminals.json` - Terminal locations and information
- `wsf-schedule.json` - Sailing schedules and routes
- `wsf-fares.json` - Fare information and pricing

**Washington State Department of Transportation (WSDOT) APIs:**
- `wsdot-border-crossings.json` - Border crossing wait times
- `wsdot-bridge-clearances.json` - Bridge clearance information
- `wsdot-commercial-vehicle-restrictions.json` - Commercial vehicle restrictions
- `wsdot-highway-alerts.json` - Highway alerts and incidents
- `wsdot-highway-cameras.json` - Highway camera images
- `wsdot-mountain-pass-conditions.json` - Mountain pass conditions
- `wsdot-toll-rates.json` - Toll rate information
- `wsdot-traffic-flow.json` - Traffic flow data
- `wsdot-travel-times.json` - Travel time estimates
- `wsdot-weather-information.json` - Weather information
- `wsdot-weather-readings.json` - Weather sensor readings
- `wsdot-weather-stations.json` - Weather station locations

### Using with External Tools

The OpenAPI JSON exports are particularly useful when integrating with:

- **API documentation tools** - Generate documentation sites
- **Code generation tools** - Create client libraries
- **Testing frameworks** - Automated API testing
- **API gateways** - Proxy and route APIs
- **MCP servers** - Expose APIs through Model Context Protocol

### Example with ws-dottie-mcp

```javascript
// In ws-dottie-mcp configuration
import wsfVesselsSpec from 'ws-dottie/openapi/wsf-vessels.json' assert { type: 'json' };

// Use the specification to configure MCP server
const mcpServer = new MCPServer({
  name: 'wsf-vessels',
  openapiSpec: wsfVesselsSpec
});
```

## 📊 API Graph

WS-Dottie exports a centralized API graph that serves as the single source of truth for all endpoint definitions. The graph provides structured access to API metadata, endpoint groups, and endpoint configurations, enabling programmatic introspection of available endpoints and their properties.

The API graph is available through the `./apis` package export and contains metadata for all 16 APIs, their endpoint groups, and individual endpoints with their schemas, cache strategies, and documentation. This makes it ideal for building tools that need to discover endpoints dynamically, generate documentation, or create custom integrations.

```javascript
import { apis } from 'ws-dottie/apis';

// Access a specific API
const vesselsApi = apis['wsf-vessels'];

// Iterate through endpoint groups
vesselsApi.endpointGroups.forEach(group => {
  console.log(`Group: ${group.name}, Strategy: ${group.cacheStrategy}`);
  
  // Access endpoints in each group
  group.endpoints.forEach(endpoint => {
    console.log(`  Endpoint: ${endpoint.functionName}`);
    console.log(`  Path: ${endpoint.endpoint}`);
  });
});

// Get all endpoints across all APIs
const allEndpoints = Object.values(apis).flatMap(api => 
  api.endpointGroups.flatMap(group => group.endpoints)
);
```

### Endpoint Registry

WS-Dottie also exports a centralized endpoint registry that provides two complementary views of all endpoints:

**`endpointsFlat`** - A flat array of all endpoints, ideal for iteration and searching:

```javascript
import { endpointsFlat } from 'ws-dottie/apis';

// Find an endpoint by function name
const endpoint = endpointsFlat.find(ep => ep.functionName === 'vesselBasics');

// Filter by API
const wsfEndpoints = endpointsFlat.filter(ep => ep.api.name.startsWith('wsf-'));
```

**`endpointsByApi`** - A nested structure organized by API → Group → Function, useful for direct hierarchical access:

```javascript
import { endpointsByApi } from 'ws-dottie/apis';

// Direct access to a specific endpoint
const vesselEndpoint = endpointsByApi['wsf-vessels']['vesselBasics']['vesselBasics'];
```

The registry is automatically generated from the API graph and includes complete endpoint metadata (schemas, cache strategies, URLs, etc.). It's used internally by the CLI, E2E tests, and documentation generation tools.

## 🖥️ Command Line Interface

WS-Dottie includes a comprehensive CLI tool (`fetch-dottie`) that provides **production-ready debugging and testing capabilities**. Access all 98 endpoints directly from your terminal with configurable transport strategies and validation options.                                                                      

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
fetch-dottie fetchBorderCrossings

# Fast testing without validation (raw data)
fetch-dottie fetchVesselBasics --no-validation
```

**🌐 Environment Testing**
```bash
# Server-side testing (default)
fetch-dottie fetchVesselLocations

# Browser environment testing (JSONP)
fetch-dottie fetchBorderCrossings --jsonp

# Mixed: JSONP without validation (fastest)
fetch-dottie fetchVesselBasics --jsonp --no-validation
```

**📊 Data Exploration**
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

# Pretty-printed output
fetch-dottie fetchBorderCrossings --pretty

# Concise array output
fetch-dottie fetchVesselLocations --concise

# Silent mode (JSON only)
fetch-dottie fetchBorderCrossings --silent

# Limit output to first 5 items
fetch-dottie fetchVesselLocations --limit 5
```

### Available Functions

The CLI supports all 98 endpoints across 16 APIs:

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

## 📊 Available Data Sources (16 APIs, 98 endpoints)

### WSDOT APIs
- **Highway Alerts** - Real-time traffic incidents and construction updates
- **Traffic Flow** - Current traffic speeds and congestion data
- **Travel Times** - Estimated travel times between locations
- **Toll Rates** - Real-time toll pricing for managed lanes
- **Weather Information** - Road weather conditions and forecasts
- **Highway Cameras** - Live traffic camera feeds across state
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
- **98 endpoints** with full type safety and validation
- **Unified interface** — all APIs work consistently regardless of source

### **🔄 Smart Caching & React Integration**
- **TanStack Query integration** with transportation-optimized cache strategies:
  - `REALTIME` (5-second updates) for traffic cameras, vessel locations
  - `FREQUENT` (5-minute updates) for schedules, alerts  
  - `MODERATE` (hourly updates) for weather, conditions
  - `STATIC` (daily updates) for terminals, vessels, routes
- **Zero-configuration React hooks** with automatic revalidation and background refresh
- **Hooks Factory**: Automatically generates TanStack Query hooks for all API endpoints with proper caching strategies

### **🌐 Flexible Fetching Strategies**
- **Native fetch** for server-side and Node.js applications
- **JSONP support** for browser environments (bypasses CORS restrictions)
- **Optional Zod validation** for performance vs. safety tradeoffs (disabled by default)
- **Unified API** — same code works in browser and server

### **🛠️ Production-Ready Developer Experience**
- **Command-line debugging tool** with all endpoints accessible via CLI
- **Comprehensive error handling** with detailed context and helpful messages
- **Environment-aware logging** with performance metrics
- **Automatic .NET datetime conversion** (handles WSDOT's `/Date(timestamp)/` format)
- **Type-safe configuration** via environment variables or runtime setup
- **Documentation generation** with OpenAPI specs and interactive HTML docs

### **📚 Automated Documentation**
- **OpenAPI Specification Generation**: Automatically generates OpenAPI 3.1 specifications from Zod schemas
- **Interactive HTML Documentation**: Redoc-powered documentation with examples and schema exploration
- **Sample Data Management**: Fetches and maintains real API response samples for documentation
- **Documentation Scripts**: `npm run docs:generate` creates complete documentation from source code

### **🎯 Developer-Friendly Design**
- **Strong TypeScript types** inferred from Zod schemas
- **Consistent parameter patterns** across all APIs
- **Tree-shaking support** — only import what you need
- **Sample parameters** provided for every endpoint                 

## 🎯 Production vs Development

### When to Use Validation

**Use validation (`validate: true`) in production when:**
- You need to catch API response changes early
- Data integrity is critical for your application
- You want runtime type safety beyond TypeScript
- You're integrating with third-party APIs that may change

**Skip validation (`validate: false`) in production when:**
- Performance is critical and API is stable
- Bundle size matters (validation adds ~50-100KB)
- You trust the API provider's stability
- You're making many rapid API calls

### Development vs Production Patterns

```javascript
// Development: Use validation to catch issues early
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV === 'development'
});

// Production: Optimize for performance
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Faster, smaller bundle
});

// Conditional: Best of both worlds
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV !== 'production'
});
```

### Bundle Size Optimization

- **Full build with validation**: ~200-300KB (includes Zod schemas)
- **Light build without validation**: ~100-150KB (schemas tree-shaken out)
- **API-specific imports**: Further reduces bundle size by excluding unused APIs
- **Core-only imports**: Excludes React/TanStack Query (~50KB savings)

Use API-specific or core-only imports for optimal tree-shaking:

```javascript
// Smaller bundle - only includes wsf-vessels API
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

// Even smaller - no React hooks
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
```

## 🔄 TanStack Query Integration

WS-Dottie provides **zero-configuration React hooks** with transportation-optimized caching strategies. Each API endpoint automatically uses the appropriate cache strategy based on data update frequency.

Every hook now accepts the same `FetchFunctionParams<T>` object as its corresponding fetch function. Pass endpoint parameters with `params`, override fetching behavior with `fetchMode`, and toggle validation with `validate`—then optionally provide TanStack Query options as the second argument.

### **Cache Strategies**

```javascript
import {
  useVesselLocations,
  useVesselBasics,
} from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function TransportationDashboard() {
  // REALTIME: 5-second updates for vessel locations
  const { data: vessels, isLoading: vesselsLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  
  // FREQUENT: 5-minute updates for highway alerts  
  const { data: alerts, isLoading: alertsLoading } = useAlerts({
    fetchMode: 'native',
    validate: true,
  });
  
  // STATIC: Daily updates for vessel information
  const { data: vesselInfo } = useVesselBasics({
    fetchMode: 'native',
    validate: true,
  });

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
import { useVesselLocationsByVesselId } from 'ws-dottie/wsf-vessels';
import { useAlertById } from 'ws-dottie/wsdot-highway-alerts';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function SpecificDataView() {
  // Get specific vessel location (REALTIME caching)
  const { data: vessel } = useVesselLocationsByVesselId({
    params: { VesselID: 18 },
    fetchMode: 'native',
    validate: true,
  });
  
  // Get specific highway alert (FREQUENT caching)
  const { data: alert } = useAlertById({
    params: { AlertID: 468632 },
    fetchMode: 'native',
    validate: true,
  });
  
  // Get ferry fares for specific trip (STATIC caching)
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({
    params: {
      TripDate: '2025-01-28',
      DepartingTerminalID: 3,
      ArrivingTerminalID: 7,
      RoundTrip: false
    },
    fetchMode: 'native',
    validate: true,
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
import { fetchVesselBasicsByVesselId } from 'ws-dottie/wsf-vessels/core';

function CustomQueryExample() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['vessel', 74],
    queryFn: () => fetchVesselBasicsByVesselId({
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

|| Strategy | Update Frequency | Use Cases | Stale Time | Refetch Interval |
||----------|------------------|-----------|------------|------------------|
|| `REALTIME` | 5 seconds | Traffic cameras, vessel locations | 5s | 5s |
|| `FREQUENT` | 5 minutes | Schedules, alerts, weather | 5m | 5m |
|| `MODERATE` | 1 hour | Weather conditions, road status | 1h | 1h |
|| `STATIC` | 1 day | Terminals, vessels, routes | 1d | 1d |

## 📚 Quick Reference

### Common Import Patterns
```javascript
// React hooks (recommended for UI)
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

// Server-side functions (no React)
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';

// TypeScript types only
import type { VesselLocation } from 'ws-dottie/wsf-vessels';
```

### Basic Usage Examples
```javascript
// Get all vessel locations
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: false
});

// Get specific vessel by ID
const { data: vessel } = useVesselLocationsByVesselId({
  params: { VesselID: 18 },
  fetchMode: 'native',
  validate: true
});

// Get highway alerts for a region
const { data: alerts } = useAlertsByRegionId({
  params: { RegionID: 9 },
  fetchMode: 'jsonp', // For browser
  validate: true
});
```

### Configuration Options
```javascript
// Set API key
import { configManager } from 'ws-dottie';
configManager.setApiKey('your_api_key_here');

// Environment variable
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

### CLI Commands
```bash
# List all endpoints
fetch-dottie --list

# Get vessel locations
fetch-dottie fetchVesselLocations

# Get specific vessel with pretty output
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}' --pretty
```

## 📚 Documentation

- **[Documentation Home](./docs/INDEX.md)** - Complete documentation index with getting started guides and API reference
- **[Getting Started](./docs/getting-started.md)** - New to WS-Dottie? Start here
- **[API Guide](./docs/guides/api-guide.md)** - High-level API overview and use cases
- **[Interactive Documentation](./docs/api-reference/)** - Browse APIs with live examples

### 🔗 Detailed API Documentation
For detailed endpoint documentation, interactive examples, and schema definitions, see our generated documentation:
- **[OpenAPI Specifications](./docs/generated/openapi-json/)** - API specifications in JSON format
- **[OpenAPI Specifications (YAML)](./docs/generated/openapi-yaml/)** - API specifications in YAML format
- **[HTML Documentation](./docs/api-reference/)** - Interactive HTML documentation with examples

Our documentation is automatically generated from API definitions, ensuring it stays synchronized with the latest code changes.

## 🎯 Implementation Examples

### **React Dashboard (Recommended)**
```javascript
import {
  useVesselLocations,
  useVesselLocationsByVesselId,
} from 'ws-dottie/wsf-vessels';
import {
  useAlerts,
  useAlertById,
} from 'ws-dottie/wsdot-highway-alerts';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function TransportationDashboard() {
  // Real-time data with automatic caching
  const { data: allVessels, isLoading: vesselsLoading } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  const { data: alerts, isLoading: alertsLoading } = useAlerts({
    fetchMode: 'native',
    validate: true,
  });

  // Specific vessel tracking (VesselID: 18)
  const { data: specificVessel } = useVesselLocationsByVesselId({
    params: { VesselID: 18 },
    fetchMode: 'native',
    validate: true,
  });

  // Specific alert details (AlertID: 468632)
  const { data: alertDetails } = useAlertById({
    params: { AlertID: 468632 },
    fetchMode: 'native',
    validate: true,
  });

  // Ferry fare calculation for tomorrow's trip
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({
    params: {
      TripDate: '2025-01-28',
      DepartingTerminalID: 3,
      ArrivingTerminalID: 7,
      RoundTrip: false,
    },
    fetchMode: 'native',
    validate: true,
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
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';
import { fetchVesselLocationsByVesselId } from 'ws-dottie/wsf-vessels/core';
import { fetchAlertById } from 'ws-dottie/wsdot-highway-alerts/core';
import { fetchBridgeClearancesByRoute } from 'ws-dottie/wsdot-bridge-clearances/core';

// Express.js route handler with parameterized queries
app.get('/api/transportation/:vesselId/:alertId', async (req, res) => {
  try {
    const { vesselId, alertId } = req.params;
    
    const [crossings, vessel, alert, clearances] = await Promise.all([
      // All border crossings
      fetchBorderCrossings({
        fetchMode: 'native',
        validate: true
      }),
      
      // Specific vessel location
      fetchVesselLocationsByVesselId({
        params: { VesselID: parseInt(vesselId) },
        fetchMode: 'native',
        validate: true
      }),
      
      // Specific highway alert
      fetchAlertById({
        params: { AlertID: parseInt(alertId) },
        fetchMode: 'native',
        validate: true
      }),
      
      // Bridge clearances for I-5
      fetchBridgeClearancesByRoute({
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
import { fetchVesselBasicsByVesselId } from 'ws-dottie/wsf-vessels/core';
import { fetchWeatherInformationByStationId } from 'ws-dottie/wsdot-weather-information/core';
import { fetchAlertsByRegionId } from 'ws-dottie/wsdot-highway-alerts/core';

// Browser-safe data fetching with parameters
async function loadTransportationData(vesselId = 74, stationId = 1909, regionId = 9) {
  const [vessel, weather, regionalAlerts] = await Promise.all([
    // Specific vessel details
    fetchVesselBasicsByVesselId({
      params: { VesselID: vesselId },
      fetchMode: 'jsonp', // Bypasses CORS
      validate: true
    }),
    
    // Weather from specific station
    fetchWeatherInformationByStationId({
      params: { StationID: stationId },
      fetchMode: 'jsonp',
      validate: true
    }),
    
    // Alerts from specific region
    fetchAlertsByRegionId({
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
fetch-dottie fetchVesselLocationsByVesselId '{"VesselID": 18}' --concise

# Check highway alerts for specific region (RegionID: 9)
echo "=== Regional Alerts ==="
fetch-dottie fetchAlertsByRegionId '{"RegionID": 9}' --limit 5

# Check weather from specific station (StationID: 1909)
echo "=== Weather Station ==="
fetch-dottie fetchWeatherInformationByStationId '{"StationID": 1909}'

# Get ferry fares for tomorrow's trip
echo "=== Ferry Fares ==="
fetch-dottie fetchFareLineItemsByTripDateAndTerminals '{"TripDate": "2025-01-28", "DepartingTerminalID": 3, "ArrivingTerminalID": 7, "RoundTrip": false}' --pretty

# Fast testing without validation
echo "=== Quick Test ==="
fetch-dottie fetchVesselBasicsByVesselId '{"VesselID": 74}' --no-validation --silent

# Check bridge clearances for I-5
echo "=== Bridge Clearances ==="
fetch-dottie fetchBridgeClearancesByRoute '{"Route": "005"}' --concise
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

# Documentation generation
npm run docs:generate               # Generate all documentation (OpenAPI + HTML)
npm run docs:openapi                # Generate OpenAPI specifications only
npm run docs:html                   # Generate HTML documentation only
npm run docs:samples:fetch           # Fetch fresh sample data for documentation
```

**E2E Testing**: Tests all API endpoints with real data validation and error handling. Tests are organized per endpoint (one test file per endpoint, 97 files total), providing granular testing and easy filtering. Each test file uses the `createEndpointSuite` helper to automatically generate standard tests for the endpoint.

**TanStack Query Testing**: Comprehensive testing of React hooks with caching strategies, error states, and loading states.

**JSONP Testing**: Use `--jsonp` flag or `JSONP=true` environment variable to test browser environment compatibility.                                           

📖 **For detailed testing information, see [Testing Architecture](./docs/guides/testing.md)**

## 🏛️ Governance

Maintained by Ferryjoy npm org. Issues and contributions welcome.

## 🤝 Contributing

We welcome contributions! Please see our development guide for setup instructions.                                                 

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for Washington State travelers**
