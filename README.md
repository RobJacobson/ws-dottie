# WS-Dottie 🚢

[![npm version](https://img.shields.io/npm/v/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![npm downloads](https://img.shields.io/npm/dm/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![npm license](https://img.shields.io/npm/l/ws-dottie.svg)](https://www.npmjs.com/package/ws-dottie)
[![bundle size](https://img.shields.io/bundlephobia/min/ws-dottie.svg)](https://bundlephobia.com/result?p=ws-dottie)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5+-orange.svg)](https://tanstack.com/query)

> **Say hello to Dottie, your friendly TypeScript companion for Washington State transportation APIs**

Meet Dottie - she's not just another API wrapper, she's your cheerful guide through Washington State's transportation data jungle. Whether you're tracking ferries across Puget Sound or monitoring traffic on I-5, Dottie makes it feel like you're chatting with a knowledgeable friend who happens to have real-time access to every traffic camera, weather station, and ferry terminal in the state.

WS-Dottie is a delightful TypeScript client library that wraps the Washington State Department of Transportation (WSDOT) and Washington State Ferries (WSF) APIs with smart caching, strict typing, automatic use of JSONP data fetching in browser environments to avoid CORS concerns, and seamless React Query integration. This little library allows you to fetch free, real-time commuter data with ease!

## ✨ Features

- 🚗 **WSDOT APIs**: Highway alerts, traffic flow, travel times, toll rates, weather, cameras, and more
- 🚢 **WSF APIs**: Vessel locations, terminal wait times, schedules, fares, and real-time data
- 🔄 **Smart Caching**: Built-in TanStack Query integration with optimized caching strategies
- 🌐 **Cross-Platform**: Automatic JSONP for web browsers, native fetch for Node.js
- 📱 **React Ready**: Hooks for all APIs with automatic cache management
- 🎯 **TypeScript**: Full type safety with comprehensive type definitions
- 🚀 **Tree-Shaking**: Only import what you need to keep bundles small

## 📦 Installation

```bash
npm install ws-dottie
```

## 🔑 API Key Setup

Get your free API key from [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access):

```bash
# For Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here

# For React/Expo applications
export EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

## 🚀 Quick Start

### Node.js Application

```javascript
import { WsfVessels, WsdotHighwayAlerts, WsdotApiError } from 'ws-dottie';

// Get vessel locations
const vessels = await WsfVessels.getVesselLocations();

// Get highway alerts
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();

// Handle errors gracefully
try {
  const data = await WsfVessels.getVesselLocations();
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.log('API Error:', error.message);
  }
}
```

### React Application

```javascript
import { 
  useVesselLocations, 
  useHighwayAlerts, 
  WsdotApiError,
  tanstackQueryOptions 
} from 'ws-dottie';

function FerryApp() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();

  if (error instanceof WsdotApiError) {
    return <div>API Error: {error.message}</div>;
  }

  return (
    <div>
      {isLoading ? 'Loading...' : `Found ${vessels?.length} vessels`}
    </div>
  );
}
```

## 📚 Documentation

- **[Getting Started](./docs/GETTING-STARTED.md)** - Installation, setup, and basic usage
- **[API Reference](./docs/API-REFERENCE.md)** - Complete API documentation
- **[Examples](./docs/EXAMPLES.md)** - Common use cases and patterns

## 🎯 Available APIs

### WSDOT APIs
- **Highway Alerts** - Real-time traffic alerts and incidents
- **Traffic Flow** - Current traffic conditions and speeds
- **Travel Times** - Estimated travel times between locations
- **Toll Rates** - Current toll pricing information
- **Weather Information** - Road weather conditions and forecasts
- **Highway Cameras** - Live traffic camera feeds
- **Bridge Clearances** - Bridge height restrictions
- **Mountain Pass Conditions** - Pass status and restrictions
- **Commercial Vehicle Restrictions** - Truck and commercial vehicle limits
- **Border Crossings** - Border wait times and conditions
- **Weather Stations** - Weather station data and readings

### WSF APIs
- **Vessels** - Real-time vessel locations and status
- **Terminals** - Terminal wait times and conditions
- **Schedules** - Ferry schedules and sailing times
- **Fares** - Fare information and pricing

## 🔧 Caching Configuration

WS-Dottie includes optimized caching strategies for different data types:

```javascript
import { tanstackQueryOptions } from 'ws-dottie';

// Real-time data (5-second updates)
const realtimeConfig = tanstackQueryOptions.REALTIME_UPDATES;

// Minute updates (1-minute intervals)
const minuteConfig = tanstackQueryOptions.MINUTE_UPDATES;

// Hourly updates (1-hour intervals)
const hourlyConfig = tanstackQueryOptions.HOURLY_UPDATES;

// Daily updates (24-hour intervals)
const dailyConfig = tanstackQueryOptions.DAILY_UPDATES;

// Weekly updates (manual refresh only)
const weeklyConfig = tanstackQueryOptions.WEEKLY_UPDATES;
```

## 🤝 Contributing

We welcome contributions! Please see our [development guide](./docs/GETTING-STARTED.md) for setup instructions.

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

**Made with ❤️ for Washington State travelers** 