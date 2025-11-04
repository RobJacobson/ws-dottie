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
import { useVesselLocations, useHighwayAlerts, useTerminalLocations } from 'ws-dottie';

// Use default caching strategy (REALTIME for vessel locations)
const { data: vessels } = useVesselLocations();

// Override with custom caching strategy
const { data: alerts } = useHighwayAlerts({
  staleTime: 2 * 60 * 1000, // 2 minutes instead of 5
  refetchInterval: 2 * 60 * 1000, // 2 minutes instead of 5
});

// Use with static data
const { data: terminals } = useTerminalLocations(); // Uses STATIC strategy
```

## 🔄 Cache Invalidation

WSF APIs provide cache flush dates to help determine when data has been updated. WS-Dottie includes automatic cache invalidation for WSF APIs with STATIC cache strategy.

### Understanding Cache Flush Endpoints

WSF APIs include special `cacheFlushDate` endpoints that return timestamps indicating when the underlying data was last updated. These endpoints serve a critical purpose:

- **Data Freshness**: They tell you exactly when the source data was last modified
- **Efficient Updates**: Instead of polling frequently, you can check if data has changed
- **Bandwidth Savings**: Prevents unnecessary data transfers when nothing has changed
- **User Experience**: Ensures users see fresh data without long loading times

### Automatic Cache Invalidation

The `createHook` factory function automatically:
- Detects WSF APIs with STATIC cache strategy (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels)
- Polls relevant cacheFlushDate endpoint every 5 minutes
- Compares flush date with the last known value
- Invalidates cache when the flush date changes
- Persists flush date in localStorage for tracking

### Using Hooks with Automatic Cache Invalidation

```jsx
import { useTerminalLocations } from 'ws-dottie';

function FerryTerminals() {
  // Terminal locations hook includes automatic cache invalidation
  // Parameters are optional for endpoints that don't require them
  const { data: terminals, isLoading, error } = useTerminalLocations();
  
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
import { useVesselBasics } from 'ws-dottie';

function VesselDetails({ vesselId }) {
  // Vessel basics hook includes automatic cache invalidation
  // Parameters are required for endpoints that need them
  const { data: vessel, isLoading, error } = useVesselBasics({ VesselID: vesselId });
  
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
import { useVesselLocations } from 'ws-dottie';

function VesselTracker() {
  const { data: vessels, isLoading, error, refetch } = useVesselLocations({
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
        showNotification('Please check your API configuration');
      } else if (error.status >= 500) {
        showNotification('Server error. Please try again later.');
      }
    },
    
    // Success callback
    onSuccess: (data) => {
      console.log(`Loaded ${data.length} vessels`);
    },
  });
  
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
import { useVesselLocations, useTerminalWaitTimes } from 'ws-dottie';

function FerryDashboard() {
  const [showDetails, setShowDetails] = useState(false);
  
  // Always fetch vessel locations
  const { data: vessels } = useVesselLocations();
  
  // Conditionally fetch terminal wait times
  const { data: waitTimes } = useTerminalWaitTimes({
    enabled: showDetails // Only fetch when details are shown
  });
  
  return (
    <div>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          
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
  );
}
```

## 🎯 Best Practices

### 1. Choose Appropriate Caching Strategy

```jsx
import { 
  useVesselLocations, 
  useTerminalWaitTimes, 
  useSchedules,
  useTerminalLocations
} from 'ws-dottie';

function FerryApp() {
  // Real-time data for live tracking
  const { data: vessels } = useVesselLocations(); // Uses REALTIME strategy
  
  // Frequent updates for wait times
  const { data: waitTimes } = useTerminalWaitTimes(); // Uses FREQUENT strategy
  
  // Static data with automatic cache invalidation
  const { data: terminals } = useTerminalLocations(); // Uses cache invalidation instead of fixed interval
  
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
import { fetchDottie, getVesselLocations, getTerminalWaitTimes } from 'ws-dottie';

function FerryDashboard() {
  // Fetch multiple data sources in parallel with useQueries
  const results = useQueries({
    queries: [
      {
        queryKey: ['vessels'],
        queryFn: () => fetchDottie({ endpoint: getVesselLocations }),
        staleTime: 5 * 1000, // 5 seconds
      },
      {
        queryKey: ['waitTimes'],
        queryFn: () => fetchDottie({ endpoint: getTerminalWaitTimes }),
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
import { useSchedules, useQueryClient } from 'ws-dottie';

function ScheduleComponent() {
  const queryClient = useQueryClient();
  const { data: schedules } = useSchedules();
  
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

- **[React Integration Guide](./react.md)** - React patterns with WS-Dottie hooks
- **[Node.js Integration Guide](./nodejs.md)** - Server-side usage patterns
- **[CLI Usage Guide](./cli.md)** - Command-line interface and debugging
- **[Error Handling Reference](../reference/error-handling.md)** - WS-Dottie error types and recovery
