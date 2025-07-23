# API Reference

Complete reference for WS-Dottie's APIs and utilities.

## 📦 Package Structure

WS-Dottie is a single package that provides everything you need:

```javascript
import { 
  // API modules
  WsfVessels, 
  WsdotHighwayAlerts,
  
  // React hooks
  useVesselLocations,
  useHighwayAlerts,
  
  // Configuration
  tanstackQueryOptions,
  
  // Error handling
  WsdotApiError,
  
  // Types
  VesselLocation,
  HighwayAlert
} from 'ws-dottie';
```

## 🔑 Authentication

All API calls require a WSDOT API key. Set it as an environment variable:

```bash
# Node.js applications
export WSDOT_ACCESS_TOKEN=your_api_key_here

# React/Expo applications
export EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_api_key_here
```

## 🎯 API Modules

### WSF (Washington State Ferries) APIs

#### Vessels API
```javascript
import { WsfVessels } from 'ws-dottie';

// Get all vessel locations
const vessels = await WsfVessels.getVesselLocations();

// Get vessel details
const vessel = await WsfVessels.getVesselVerbose(vesselId);

// Get vessel history
const history = await WsfVessels.getVesselHistory(vesselId);

// Get vessel statistics
const stats = await WsfVessels.getVesselStats(vesselId);

// Get vessel accommodations
const accommodations = await WsfVessels.getVesselAccommodations(vesselId);

// Get cache flush date
const flushDate = await WsfVessels.getCacheFlushDate();
```

#### Terminals API
```javascript
import { WsfTerminals } from 'ws-dottie';

// Get terminal basics
const terminals = await WsfTerminals.getTerminalBasics();

// Get terminal wait times
const waitTimes = await WsfTerminals.getTerminalWaitTimes();

// Get terminal locations
const locations = await WsfTerminals.getTerminalLocations();

// Get terminal sailing space
const sailingSpace = await WsfTerminals.getTerminalSailingSpace();

// Get terminal transports
const transports = await WsfTerminals.getTerminalTransports();

// Get terminal bulletins
const bulletins = await WsfTerminals.getTerminalBulletins();

// Get terminal verbose data
const verbose = await WsfTerminals.getTerminalVerbose();

// Get cache flush date
const flushDate = await WsfTerminals.getCacheFlushDate();
```

#### Schedule API
```javascript
import { WsfSchedule } from 'ws-dottie';

// Get all routes
const routes = await WsfSchedule.getRoutes();

// Get scheduled routes
const scheduledRoutes = await WsfSchedule.getScheduledRoutes();

// Get schedules for a route
const schedules = await WsfSchedule.getSchedules(routeId);

// Get terminals
const terminals = await WsfSchedule.getTerminals();

// Get cache flush date
const flushDate = await WsfSchedule.getCacheFlushDate();
```

#### Fares API
```javascript
import { WsfFares } from 'ws-dottie';

// Get fare line items
const fareItems = await WsfFares.getFareLineItems();

// Get terminals
const terminals = await WsfFares.getTerminals();

// Get valid date range
const dateRange = await WsfFares.getValidDateRange();
```

### WSDOT (Washington State Department of Transportation) APIs

#### Highway Alerts API
```javascript
import { WsdotHighwayAlerts } from 'ws-dottie';

// Get all highway alerts
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
```

#### Traffic Flow API
```javascript
import { WsdotTrafficFlow } from 'ws-dottie';

// Get traffic flows
const flows = await WsdotTrafficFlow.getTrafficFlows();
```

#### Travel Times API
```javascript
import { WsdotTravelTimes } from 'ws-dottie';

// Get travel times
const travelTimes = await WsdotTravelTimes.getTravelTimes();
```

#### Toll Rates API
```javascript
import { WsdotTollRates } from 'ws-dottie';

// Get toll rates
const tollRates = await WsdotTollRates.getTollRates();

// Get toll trip info
const tripInfo = await WsdotTollRates.getTollTripInfo();

// Get toll trip rates
const tripRates = await WsdotTollRates.getTollTripRates();
```

#### Weather Information API
```javascript
import { WsdotWeatherInformation } from 'ws-dottie';

// Get weather information
const weather = await WsdotWeatherInformation.getWeatherInformation(stationIds);
```

#### Weather Information Extended API
```javascript
import { WsdotWeatherInformationExtended } from 'ws-dottie';

// Get extended weather information
const weather = await WsdotWeatherInformationExtended.getWeatherInformationExtended(stationIds);
```

#### Weather Stations API
```javascript
import { WsdotWeatherStations } from 'ws-dottie';

// Get weather stations
const stations = await WsdotWeatherStations.getWeatherStations();
```

#### Highway Cameras API
```javascript
import { WsdotHighwayCameras } from 'ws-dottie';

// Get all cameras
const cameras = await WsdotHighwayCameras.getCameras();

// Get specific camera
const camera = await WsdotHighwayCameras.getCamera(cameraId);

// Search cameras
const searchResults = await WsdotHighwayCameras.searchCameras(params);
```

#### Bridge Clearances API
```javascript
import { WsdotBridgeClearances } from 'ws-dottie';

// Get bridge clearances
const clearances = await WsdotBridgeClearances.getBridgeClearances(route);
```

#### Mountain Pass Conditions API
```javascript
import { WsdotMountainPassConditions } from 'ws-dottie';

// Get mountain pass conditions
const conditions = await WsdotMountainPassConditions.getMountainPassConditions();
```

#### Commercial Vehicle Restrictions API
```javascript
import { WsdotCommercialVehicleRestrictions } from 'ws-dottie';

// Get commercial vehicle restrictions
const restrictions = await WsdotCommercialVehicleRestrictions.getCommercialVehicleRestrictions();
```

#### Border Crossings API
```javascript
import { WsdotBorderCrossings } from 'ws-dottie';

// Get border crossings
const crossings = await WsdotBorderCrossings.getBorderCrossings();
```

## ⚛️ React Hooks

All APIs have corresponding React hooks with built-in caching:

### WSF Hooks
```javascript
import { 
  useVesselLocations,
  useVesselVerbose,
  useVesselHistory,
  useVesselStats,
  useVesselAccommodations,
  useTerminalBasics,
  useTerminalWaitTimes,
  useTerminalLocations,
  useTerminalSailingSpace,
  useTerminalTransports,
  useTerminalBulletins,
  useTerminalVerbose,
  useRoutes,
  useScheduledRoutes,
  useSchedules,
  useTerminals,
  useFareLineItems,
  useFaresTerminals,
  useValidDateRange
} from 'ws-dottie';
```

### WSDOT Hooks
```javascript
import { 
  useHighwayAlerts,
  useTrafficFlows,
  useTravelTimes,
  useTollRates,
  useTollTripInfo,
  useTollTripRates,
  useWeatherInformation,
  useWeatherInformationExtended,
  useWeatherStations,
  useCameras,
  useCamera,
  useSearchCameras,
  useBridgeClearances,
  useMountainPassConditions,
  useCommercialVehicleRestrictions,
  useBorderCrossings
} from 'ws-dottie';
```

### Hook Usage
```javascript
function MyComponent() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Vessels: {vessels?.length}</h2>
      <h2>Alerts: {alerts?.length}</h2>
    </div>
  );
}
```

## 🔧 Caching Configuration

WS-Dottie provides optimized caching strategies:

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

### Configuration Details

| Strategy | Stale Time | GC Time | Refetch Interval | Retry |
|----------|------------|---------|------------------|-------|
| REALTIME_UPDATES | 30s | 2m | 5s | 1 |
| MINUTE_UPDATES | 5m | 10m | 1m | false |
| HOURLY_UPDATES | 2h | 4h | 1h | 5 |
| DAILY_UPDATES | 1d | 2d | 1d | 5 |
| WEEKLY_UPDATES | 1w | 2w | false | 5 |

## 🚨 Error Handling

All APIs throw `WsdotApiError` for consistent error handling:

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

### Error Types
- `API_ERROR` - Server returned an error response
- `NETWORK_ERROR` - Network connection failed
- `TIMEOUT_ERROR` - Request timed out
- `CORS_ERROR` - CORS error (should not happen with JSONP)

## 📅 Data Formats

### Date/Time Properties
WS-Dottie automatically converts WSDOT's .NET date strings to JavaScript Date objects:

```javascript
// WSDOT returns: "/Date(1703123456789)/"
// WS-Dottie converts to: new Date(1703123456789)

const vessel = await WsfVessels.getVesselLocations();
console.log(vessel[0].LastUpdate); // JavaScript Date object
```

### Response Types
All API functions return properly typed data:

```javascript
import { VesselLocation, HighwayAlert } from 'ws-dottie';

const vessels: VesselLocation[] = await WsfVessels.getVesselLocations();
const alerts: HighwayAlert[] = await WsdotHighwayAlerts.getHighwayAlerts();
```

## 🔄 Cache Providers

For WSF APIs, you can use cache providers to automatically invalidate data when the server updates:

```javascript
import { VesselCacheProvider, TerminalCacheProvider } from 'ws-dottie';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VesselCacheProvider />
      <TerminalCacheProvider />
      <MyApp />
    </QueryClientProvider>
  );
}
```

## 📊 Bundle Size

The complete WS-Dottie package is approximately **36KB** (CJS) or **29KB** (ESM), including:
- All API functions
- All React hooks
- All TypeScript types
- Caching configuration
- Error handling utilities

---

**For detailed type definitions, see the TypeScript declarations in your IDE or the source code.** 