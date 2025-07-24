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

**React/Expo Applications**
```bash
export EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

**Using a .env file**
```env
WSDOT_ACCESS_TOKEN=your_api_key_here
EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

#### Option B: Runtime Configuration

For dynamic environments or when you need to configure at runtime:

```javascript
import { configManager } from 'ws-dottie';

// Configure at runtime
configManager.setConfig({
  WSDOT_ACCESS_TOKEN: 'your_api_key_here',
  WSDOT_BASE_URL: 'https://your-proxy-server.com' // Optional: route through proxy
});
```

This approach is useful for:
- Applications that load configuration from external sources
- Multi-tenant applications with different API keys
- Development environments with different configurations
- Routing requests through proxy servers for security or monitoring

## 🎯 Basic Usage

### Node.js Applications

WS-Dottie provides direct API functions for Node.js applications:

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

## 🔍 Debugging and Logging

WS-Dottie includes optional logging to help you troubleshoot API calls:

```javascript
import { WsfVessels } from 'ws-dottie';

// Enable debug logging for a specific call
const vessels = await WsfVessels.getVesselLocations('debug');

// Or use info-level logging
const alerts = await WsdotHighwayAlerts.getHighwayAlerts('info');
```

Logging modes:
- `'debug'` - Detailed request/response information
- `'info'` - Basic request information
- `'none'` - No logging (default)

## 📊 Caching Configuration

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

### Custom Caching

You can override the default caching behavior:

```javascript
import { useVesselLocations } from 'ws-dottie';

function CustomVesselApp() {
  const { data: vessels } = useVesselLocations({
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 10 * 1000, // 10 seconds
  });

  return <div>Vessels: {vessels?.length}</div>;
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
WS-Dottie automatically converts WSDOT's .NET date strings to JavaScript Date objects:

```javascript
// WSDOT returns: "/Date(1703123456789)/"
// WS-Dottie converts to: new Date(1703123456789)

const vessel = await WsfVessels.getVesselLocations();
console.log(vessel[0].LastUpdate); // JavaScript Date object
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

## 🚀 Next Steps

- Check out the [API Reference](./API-REFERENCE.md) for detailed documentation
- Explore [Examples](./EXAMPLES.md) for common use cases
- Join our community for support and updates

---

**Happy coding! 🚢** 