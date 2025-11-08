# TanStack Query Integration Guide

This guide covers integrating WS-Dottie with TanStack Query for optimal data fetching, caching, and state management in React applications.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install WS-Dottie and TanStack Query
npm install ws-dottie @tanstack/react-query

# Or with yarn
yarn add ws-dottie @tanstack/react-query
```

### 2. Set Up TanStack Query

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client with optimized defaults for WS-Dottie
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global cache configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Retry on network errors, not on 4xx client errors
        if (error.status >= 500) return failureCount < 3;
        return false;
      },
    },
  },
});

// Wrap your app with QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourTransportationApp />
    </QueryClientProvider>
  );
}
```

### 3. Use WS-Dottie Hooks

```jsx
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';

function TransportationDashboard() {
  const { data: vessels, isLoading, error } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  const { data: alerts } = useAlerts({
    fetchMode: 'native',
    validate: true,
  });
  
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Washington Transportation</h1>
      {isLoading && <div>Loading...</div>}
      
      <section>
        <h2>Ferries ({vessels?.length || 0})</h2>
        {vessels?.map(vessel => (
          <div key={vessel.VesselID}>
            <h3>{vessel.VesselName}</h3>
            <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
            <p>Speed: {vessel.Speed} knots</p>
          </div>
        ))}
      </section>
      
      <section>
        <h2>Highway Alerts ({alerts?.length || 0})</h2>
        {alerts?.map(alert => (
          <div key={alert.AlertID}>
            <h3>{alert.HeadlineDescription}</h3>
            <p>Priority: {alert.Priority}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
```

### Hook Parameters Align With Fetch Functions

WS-Dottie hooks accept the same `FetchFunctionParams<T>` object as their matching fetch functions. Provide endpoint parameters with the `params` property, override transport with `fetchMode`, and toggle Zod validation with `validate`. TanStack Query options remain available as an optional second argument to every hook.

## 🔄 Cache Strategies

WS-Dottie provides four cache strategies optimized for different types of transportation data:

| Strategy | Stale Time | Refetch Interval | Use Cases |
|-----------|--------------|------------------|------------|
| `REALTIME` | 5s | 5s | Vessel locations, traffic flow |
| `FREQUENT` | 5m | 5m | Highway alerts, weather information |
| `MODERATE` | 1h | 1h | Mountain pass conditions, travel times |
| `STATIC` | 1d | 1d | Terminal locations, schedules, fares |

### Using Cache Strategies

```jsx
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useAlerts } from 'ws-dottie/wsdot-highway-alerts';
import { useTerminalLocations } from 'ws-dottie/wsf-terminals';

// Use default caching strategy (REALTIME for vessel locations)
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: false,
});

// Override with custom caching strategy
const { data: alerts } = useAlerts(
  { fetchMode: 'native', validate: true },
  {
    staleTime: 2 * 60 * 1000, // 2 minutes instead of 5
    refetchInterval: 2 * 60 * 1000, // 2 minutes instead of 5
  }
);

// Use with static data
const { data: terminals } = useTerminalLocations({
  fetchMode: 'native',
  validate: true,
}); // Uses STATIC strategy
```

## 🔄 Cache Invalidation

WSF APIs provide cache flush dates to help determine when data has been updated. WS-Dottie includes automatic cache invalidation for WSF APIs with STATIC cache strategy.

### Understanding Cache Flush Endpoints

WSF APIs include special `cacheFlushDate` endpoints that return timestamps indicating when underlying data was last updated. These endpoints serve a critical purpose:

- **Data Freshness**: They tell you exactly when source data was last modified
- **Efficient Updates**: Instead of polling frequently, you can check if data has changed
- **Bandwidth Savings**: Prevents unnecessary data transfers when nothing has changed
- **User Experience**: Ensures users see fresh data without long loading times

### Automatic Cache Invalidation

The `createHook` factory function automatically:
- Detects WSF APIs with STATIC cache strategy (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
- Polls relevant cacheFlushDate endpoint every 5 minutes
- Compares flush date with last known value
- Invalidates cache when flush date changes
- Persists flush date in localStorage for tracking

### Using Hooks with Automatic Cache Invalidation

```jsx
import { useTerminalLocations } from 'ws-dottie/wsf-terminals';

function FerryTerminals() {
  // Terminal locations hook includes automatic cache invalidation
  // Parameters are optional for endpoints that don't require them
  const { data: terminals, isLoading, error } = useTerminalLocations({
    fetchMode: 'native',
    validate: true,
  });
  
  if (isLoading) return <div>Loading terminals...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Washington State Ferry Terminals</h1>
      {terminals?.map(terminal => (
        <div key={terminal.TerminalID}>
          <h3>{terminal.TerminalName}</h3>
          <p>{terminal.Address}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using with Parameters

```jsx
import { useVesselBasics } from 'ws-dottie/wsf-vessels';

function VesselDetails({ vesselId }) {
  // Vessel basics hook includes automatic cache invalidation
  // Parameters are required for endpoints that need them
  const { data: vessel, isLoading, error } = useVesselBasics({
    params: { VesselID: vesselId },
    fetchMode: 'native',
    validate: true,
  });
  
  if (isLoading) return <div>Loading vessel details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>{vessel?.VesselName}</h1>
      <p>Class: {vessel?.VesselClass}</p>
      <p>Capacity: {vessel?.VehicleCapacity} vehicles</p>
    </div>
  );
}
```

## 🎛️ Advanced Query Options

WS-Dottie hooks support all TanStack Query options for fine-grained control:

### Custom Query Options

```jsx
import { useVesselLocations } from 'ws-dottie/wsf-vessels';

function VesselTracker() {
  const { data: vessels, isLoading, error, refetch } = useVesselLocations(
    { fetchMode: 'native', validate: false },
    {
      // Override default cache strategy
      staleTime: 10 * 1000, // 10 seconds instead of 5
      refetchInterval: 10 * 1000, // 10 seconds instead of 5

      // Custom retry logic
      retry: (failureCount, error) => {
        if (error.status === 404) return false; // Don't retry 404s
        if (failureCount < 5) return true; // Retry up to 5 times
        return false;
      },

      // Custom error handling
      onError: (error) => {
        console.error('Vessel fetch error:', error);

        // Show user-friendly message
        if (error.status === 401) {
          showNotification('Please check your API key configuration');
        } else if (error.status >= 500) {
          showNotification('Server error. Please try again later.');
        }
      },

      // Success callback
      onSuccess: (data) => {
        console.log(`Loaded ${data.length} vessels`);
      },
    }
  );
  
  if (error) {
    return (
      <div>
        <h3>Error Loading Data</h3>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  if (isLoading) return <div>Loading vessels...</div>;
  
  return (
    <div>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Speed: {vessel.Speed} knots</p>
        </div>
      ))}
    </div>
  );
}
```

### Conditional Data Fetching

```jsx
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useTerminalWaitTimes } from 'ws-dottie/wsf-terminals';

function FerryDashboard() {
  const [showDetails, setShowDetails] = useState(false);
  
  // Always fetch vessel locations
  const { data: vessels } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  
  // Conditionally fetch terminal wait times
  const { data: waitTimes } = useTerminalWaitTimes(
    { fetchMode: 'native', validate: true },
    {
      enabled: showDetails // Only fetch when details are shown
    }
  );
  
  return (
    <div>
      <h1>Ferry Dashboard</h1>
      
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      <div className="vessel-list">
        {vessels?.map(vessel => (
          <div key={vessel.VesselID}>
            <h3>{vessel.VesselName}</h3>
            <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
            
            {showDetails && waitTimes && (
              <div className="vessel-details">
                <p>Terminal Wait: {
                  waitTimes.find(t => t.TerminalID === vessel.DestinationTerminalID)?.WaitTime || 'Unknown'
                } minutes</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎯 React Patterns

### Data Fetching with Parameters

```jsx
import { useScheduleByTripDateAndRouteId } from 'ws-dottie/wsf-schedule';
import { useFareLineItemsByTripDateAndTerminals } from 'ws-dottie/wsf-fares';

function FerrySchedule() {
  const [route, setRoute] = useState({ 
    departing: 3, 
    arriving: 7, 
    date: new Date() 
  });
  
  const { data: schedules } = useScheduleByTripDateAndRouteId({ 
    params: {
      TripDate: route.date.toISOString().split('T')[0], 
      RouteID: route.departing
    },
    fetchMode: 'native',
    validate: true,
  });
  
  const { data: fares } = useFareLineItemsByTripDateAndTerminals({ 
    params: {
      TripDate: route.date.toISOString().split('T')[0], 
      DepartingTerminalID: route.departing, 
      ArrivingTerminalID: route.arriving 
    },
    fetchMode: 'native',
    validate: true,
  });
  
  return (
    <div>
      <div className="route-selector">
        <label>From: 
          <select 
            value={route.departing} 
            onChange={e => setRoute({...route, departing: Number(e.target.value)})}
          >
            {/* Terminal options */}
          </select>
        </label>
        
        <label>To: 
          <select 
            value={route.arriving} 
            onChange={e => setRoute({...route, arriving: Number(e.target.value)})}
          >
            {/* Terminal options */}
          </select>
        </label>
        
        <label>Date: 
          <input 
            type="date" 
            value={route.date.toISOString().split('T')[0]} 
            onChange={e => setRoute({...route, date: new Date(e.target.value)})}
          />
        </label>
      </div>
      
      <div className="schedule-display">
        {/* Render schedules and fares */}
      </div>
    </div>
  );
}
```

### Component Structure

Recommended component structure for WS-Dottie data:

```jsx
// Container component - handles data fetching
function VesselMapContainer() {
  const { data: vessels, isLoading, error, refetch } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  });
  
  return (
    <VesselMap 
      vessels={vessels || []}
      isLoading={isLoading}
      error={error}
      onRefresh={refetch}
    />
  );
}

// Presentational component - handles UI rendering
function VesselMap({ vessels, isLoading, error, onRefresh }) {
  if (error) return <ErrorDisplay error={error} />;
  if (isLoading) return <LoadingDisplay />;
  
  return (
    <div>
      <button onClick={onRefresh}>Refresh</button>
      {/* Map rendering logic */}
    </div>
  );
}
```

### Data Transformation

```jsx
import { useWeatherInformation } from 'ws-dottie/wsdot-weather-information';

function WeatherDashboard() {
  const { data: weather } = useWeatherInformation({
    fetchMode: 'native',
    validate: true,
  });
  
  // Transform data for visualization
  const weatherByRegion = useMemo(() => {
    if (!weather) return {};
    
    return weather.reduce((acc, station) => {
      const region = station.Region || 'Unknown';
      if (!acc[region]) acc[region] = [];
      acc[region].push(station);
      return acc;
    }, {});
  }, [weather]);
  
  const regionStats = useMemo(() => {
    return Object.entries(weatherByRegion).map(([region, stations]) => ({
      region,
      count: stations.length,
      avgTemp: stations.reduce((sum, s) => sum + (s.Temperature || 0), 0) / stations.length,
      maxTemp: Math.max(...stations.map(s => s.Temperature || 0)),
      minTemp: Math.min(...stations.map(s => s.Temperature || 0)),
    }));
  }, [weatherByRegion]);
  
  return (
    <div>
      <h1>Weather Dashboard</h1>
      
      <div className="region-stats">
        {regionStats.map(stat => (
          <div key={stat.region}>
            <h3>{stat.region}</h3>
            <p>Stations: {stat.count}</p>
            <p>Avg Temp: {stat.avgTemp.toFixed(1)}°F</p>
            <p>Range: {stat.minTemp}°F - {stat.maxTemp}°F</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Choose Appropriate Caching Strategy

```jsx
import { useVesselLocations } from 'ws-dottie/wsf-vessels';
import { useTerminalWaitTimes, useTerminalLocations } from 'ws-dottie/wsf-terminals';
import { useScheduleByTripDateAndRouteId } from 'ws-dottie/wsf-schedule';

function FerryApp() {
  // Real-time data for live tracking
  const { data: vessels } = useVesselLocations({
    fetchMode: 'native',
    validate: false,
  }); // Uses REALTIME strategy
  
  // Frequent updates for wait times
  const { data: waitTimes } = useTerminalWaitTimes({
    fetchMode: 'native',
    validate: true,
  }); // Uses FREQUENT strategy
  
  // Static data with automatic cache invalidation
  const { data: terminals } = useTerminalLocations({
    fetchMode: 'native',
    validate: true,
  }); // Uses cache invalidation instead of fixed interval
  
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}
```

### 2. Batch Requests for Performance

```jsx
import { useQuery } from '@tanstack/react-query';
import { getVesselLocations, getTerminalWaitTimes } from 'ws-dottie/wsf-vessels/core';

function FerryDashboard() {
  // Fetch multiple data sources in parallel with useQueries
  const results = useQueries({
    queries: [
      {
        queryKey: ['vessels'],
        queryFn: () => getVesselLocations({
          fetchMode: 'native',
          validate: true
        }),
        staleTime: 5 * 1000, // 5 seconds
      },
      {
        queryKey: ['waitTimes'],
        queryFn: () => getTerminalWaitTimes({
          fetchMode: 'native',
          validate: true
        }),
        staleTime: 60 * 1000, // 1 minute
      },
    ],
  });
  
  const [vessels, waitTimes] = results.map(result => result.data);
  
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}
```

### 3. Manual Cache Invalidation

```jsx
import { useScheduleByTripDateAndRouteId } from 'ws-dottie/wsf-schedule';
import { useQueryClient } from '@tanstack/react-query';

function ScheduleComponent() {
  const queryClient = useQueryClient();
  const { data: schedules } = useScheduleByTripDateAndRouteId({
    fetchMode: 'native',
    validate: true,
  });
  
  const refreshSchedules = () => {
    queryClient.invalidateQueries(['schedules']);
  };
  
  return (
    <div>
      <button onClick={refreshSchedules}>
        Refresh Schedules
      </button>
      {/* Display schedules */}
    </div>
  );
}
```

## 📚 Next Steps

- **[Fetching Data Guide](./fetching-data.md)** - Basic fetch-dottie usage patterns
- **[CLI Usage Guide](./cli-usage.md)** - Command-line interface and debugging
- **[Error Handling Reference](./error-handling.md)** - WS-Dottie error types and recovery
