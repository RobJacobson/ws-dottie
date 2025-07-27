# WS-Dottie 🚢

[![npm version](https://img.shields.io/npm/v/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![npm downloads](https://img.shields.io/npm/dm/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![npm license](https://img.shields.io/npm/l/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![bundle size](https://img.shields.io/bundlephobia/min/ws-dottie.svg)](https://bundlephobia.com/result?p=ws-dottie)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5+-orange.svg)](https://tanstack.com/query)


Meet Dottie - she's not just another API wrapper, she's your cheerful guide through the Washington State Department of Transportation's data jungle. Whether you're tracking ferries across Puget Sound or monitoring traffic on I-5, Dottie makes it feel like you're chatting with a knowledgeable friend who happens to have real-time access to every traffic camera, weather station, and ferry terminal in the state. 

This friendly TypeScript client library provides type-safe data fetching from sixteen different Washington State transportation APIs - from real-time ferry locations to traffic cameras, weather stations, and highway alerts. Whether you're building a hobby project to track your daily commute or developing enterprise applications for transportation planning, WS-Dottie gives you a safe, reliable way to tap into this data firehose with smart caching, strict typing, automatic JSONP data fetching in browser environments to avoid CORS concerns, and seamless React Query integration.

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

Visit the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access) and sign up with just your email address. No credit card required - the API is completely free.

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

This approach is useful for:
- Web applications that need to pass environment variables from server to client
- Applications that load configuration from external sources
- Multi-tenant applications with different API keys
- Development environments with different configurations
- Routing requests through proxy servers for security or monitoring

### 4. Module Format Support

WS-Dottie supports both CommonJS and ES Module formats:

**ES Modules (Recommended)**
```javascript
import { useVesselLocations, useHighwayAlerts } from 'ws-dottie';
```

**CommonJS**
```javascript
const { useVesselLocations, useHighwayAlerts } = require('ws-dottie');
```

The library automatically provides the appropriate format based on your environment. Modern bundlers and Node.js will choose the optimal format automatically.

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

## 📊 Available Data Sources

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

- **🔄 Smart Caching** - Built-in TanStack Query integration with optimized caching strategies for different data types
- **🌐 Cross-Platform** - Works in browsers (JSONP) and Node.js (fetch)
- **📱 React Ready** - Hooks for all APIs with automatic cache management
- **🎯 Strong Typing** - Comprehensive TypeScript types for all APIs, parameters, and responses
- **📦 Parameter Objects** - Consistent single-parameter object pattern for all API calls
- **⚙️ Flexible Configuration** - Environment variables or runtime configuration with type-safe interface
- **🔍 Debugging** - Optional logging for troubleshooting API calls
- **⚡ Tree-Shaking** - Only import what you need to keep bundles small
- **🛡️ Error Handling** - Consistent error types with user-friendly messages
- **📅 Date Conversion** - Automatic conversion of .NET date strings to JavaScript Date objects

## 📚 Documentation

- **[Getting Started](./docs/GETTING-STARTED.md)** - Installation, setup, and basic usage
- **[API Reference](./docs/API-REFERENCE.md)** - Complete API documentation
- **[Examples](./docs/EXAMPLES.md)** - Common use cases and patterns

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
npm run test:unit                    # Unit tests
npm run test:e2e:validation         # E2E tests (Node.js)
npm run test:e2e:validation:jsonp   # E2E tests (Browser/JSONP)
npm run test:e2e:hook               # React hook tests

# Watch mode for development
npm run test:e2e:validation:watch
npm run test:e2e:validation:jsonp:watch
```

**JSONP Testing**: Use `--jsonp` flag or `JSONP=true` environment variable to test browser environment compatibility.

📖 **For detailed testing information, see [Testing Guide](./docs/TESTING.md)**

## 🤝 Contributing

We welcome contributions! Please see our [development guide](./docs/GETTING-STARTED.md) for setup instructions.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for Washington State travelers** 