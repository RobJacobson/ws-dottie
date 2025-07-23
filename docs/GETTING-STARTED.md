# Getting Started with WS-Dottie

Welcome to WS-Dottie! This guide will help you get up and running with Washington State's transportation APIs.

## 📦 Installation

Install WS-Dottie using your preferred package manager:

```bash
npm install ws-dottie
# or
yarn add ws-dottie
# or
pnpm add ws-dottie
```

## 🔑 API Key Setup

WS-Dottie requires a WSDOT API key to access the transportation data. Get your free API key from the [WSDOT Developer Portal](https://wsdot.wa.gov/developers/api-access).

### Environment Configuration

#### Node.js Applications
Set your API key as an environment variable:

```bash
export WSDOT_ACCESS_TOKEN=your_api_key_here
```

#### React/Expo Applications
For React applications, use the Expo public environment variable:

```bash
export EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

#### .env File
You can also create a `.env` file in your project root:

```env
WSDOT_ACCESS_TOKEN=your_api_key_here
EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

## 🚀 Basic Usage

### Node.js Applications

WS-Dottie provides direct API functions for Node.js applications:

```javascript
import { WsfVessels, WsdotHighwayAlerts, WsdotApiError } from 'ws-dottie';

// Get vessel locations
const vessels = await WsfVessels.getVesselLocations();
console.log(`Found ${vessels.length} vessels`);

// Get highway alerts
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

function FerryApp() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();

  if (error instanceof WsdotApiError) {
    return <div>API Error: {error.message}</div>;
  }

  return (
    <div>
      {isLoading ? 'Loading vessels...' : `Found ${vessels?.length} vessels`}
      <div>Active alerts: {alerts?.length || 0}</div>
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
      <FerryApp />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
```

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