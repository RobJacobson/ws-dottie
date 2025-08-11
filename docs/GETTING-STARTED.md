# Getting Started with WS-Dottie

Welcome to WS-Dottie! This guide will help you get up and running with Washington State's transportation APIs.

## 🚀 Quick Setup

### 1. Get Your Free API Key

WS-Dottie requires a WSDOT API key to access the transportation data. The good news? **It's completely free!** 

Visit the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access) and sign up with just your email address. No credit card required, no usage limits, no hidden fees.

### 2. Install WS-Dottie

Install WS-Dottie using your preferred package manager:

```bash
npm install ws-dottie
# or
yarn add ws-dottie
# or
pnpm add ws-dottie
```

### 3. Configure Your API Key

WS-Dottie offers flexible configuration options to fit your deployment needs:

#### Option A: Environment Variables (Recommended)

**Node.js Applications**
```bash
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

**Using a .env file**
```env
WSDOT_ACCESS_TOKEN=your_api_key_here
```

#### Option B: Runtime Configuration

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

## 📦 Module Format Support

WS-Dottie supports both CommonJS and ES Module formats, automatically providing the appropriate format based on your environment:

### ES Modules (Recommended)

```javascript
import { useVesselLocations, useHighwayAlerts } from 'ws-dottie';
import { configManager } from 'ws-dottie';
```

### CommonJS

```javascript
const { useVesselLocations, useHighwayAlerts } = require('ws-dottie');
const { configManager } = require('ws-dottie');
```

Modern bundlers and Node.js will automatically choose the optimal format. The library provides:
- **ES Module build** (`.mjs`) for modern environments
- **CommonJS build** (`.js`) for legacy environments
- **TypeScript definitions** for both formats

## 🎯 Basic Usage

### Node.js Applications

WS-Dottie provides direct API functions for Node.js applications with strong typing:

```javascript
import { WsfVessels, WsdotHighwayAlerts, WsdotApiError } from 'ws-dottie';

// Get real-time ferry locations
const vessels = await WsfVessels.getVesselLocations();
console.log(`Found ${vessels.length} active vessels`);

// Get current highway alerts
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
console.log(`Found ${alerts.length} active alerts`);

// Handle errors gracefully
try {
  const data = await WsfVessels.getVesselLocations();
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.log('API Error:', error.message);
  }
}
```

### React Applications

For React applications, WS-Dottie provides TanStack Query hooks with built-in caching:

```javascript
import { 
  useVesselLocations, 
  useHighwayAlerts, 
  WsdotApiError 
} from 'ws-dottie';

function TransportationDashboard() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();

  if (error instanceof WsdotApiError) {
    return <div>API Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Active Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
```

## 🔧 TanStack Query Setup

WS-Dottie hooks require TanStack Query to be set up in your React application:

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransportationDashboard />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
```

## 🎯 Available Data Sources

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

## 🔄 Data Formats

### Date/Time Properties
WS‑Dottie converts upstream date strings to JavaScript Date objects. Today this happens via a lean parser, and schemas also validate/transform at runtime using Zod 4:

```javascript
// WSDOT returns: "/Date(1703123456789)/"
// WS-Dottie converts to: new Date(1703123456789)

const vessel = await WsfVessels.getVesselLocations();
console.log(vessel[0].LastUpdate); // JavaScript Date object (validated with Zod)
```

### Error Handling
All API functions and hooks can throw `WsdotApiError`:

```javascript
import { WsdotApiError } from 'ws-dottie';

try {
  const data = await WsfVessels.getVesselLocations();
} catch (error) {
  if (error instanceof WsdotApiError) {
    console.log('API Error:', error.message);
    console.log('Status:', error.status);
    console.log('Details:', error.details);
  }
}
```

## 🧩 Consistent Parameter Object Pattern

All WS-Dottie fetch functions and React hooks use a **single, optional, strongly-typed options parameter**. This pattern ensures consistency, type safety, and extensibility across the entire library.

**Example:**

```typescript
// Fetch function
const camera = await WsdotHighwayCameras.getCamera({ cameraID: 1001 });

// React hook
const { data: camera } = useCamera({ cameraID: 1001 });
```

- If no parameters are required, you may call the function with no arguments or with an empty object: `getBorderCrossings()` or `getBorderCrossings({})`.
- All parameters are passed as named properties of the options object.
- All options are fully type-checked with TypeScript.

## 🔧 Advanced Configuration

For advanced configuration options including:
- **Debugging and Logging** - Troubleshoot API calls with detailed logging
- **Advanced Caching** - Customize caching strategies and performance optimization
- **Strong Typing** - TypeScript features and type safety
- **Parameter Object Patterns** - Consistent API parameter structures

See the [API Reference](./API-REFERENCE.md) documentation for comprehensive configuration details.

## 🚀 Next Steps

- Browse the [Documentation Index](./INDEX.md) for complete navigation
- Check out the [API Reference](./API-REFERENCE.md) for detailed documentation and advanced configuration
- Explore [Examples](./EXAMPLES.md) for common use cases and patterns
- Browse the [API Overview](./API-OVERVIEW.md) for quick comparison and use case mapping
- Join our community for support and updates

---

**Happy coding! 🚢** 