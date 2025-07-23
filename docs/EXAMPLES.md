# Examples

Practical examples and common use cases for WS-Dottie.

## 🚀 Basic Examples

### Node.js Application

```javascript
import { WsfVessels, WsdotHighwayAlerts, WsdotApiError } from 'ws-dottie';

async function getTransportationData() {
  try {
    // Get vessel locations
    const vessels = await WsfVessels.getVesselLocations();
    console.log(`Found ${vessels.length} vessels`);

    // Get highway alerts
    const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
    console.log(`Found ${alerts.length} active alerts`);

    return { vessels, alerts };
  } catch (error) {
    if (error instanceof WsdotApiError) {
      console.error('API Error:', error.message);
    }
    throw error;
  }
}
```

### React Application

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
      <h2>Ferries: {vessels?.length || 0}</h2>
      <h2>Highway Alerts: {alerts?.length || 0}</h2>
      {isLoading && <div>Loading...</div>}
    </div>
  );
}
```

## 🎯 Common Use Cases

### Ferry Tracking App

```javascript
import { 
  useVesselLocations, 
  useTerminalWaitTimes,
  VesselCacheProvider,
  TerminalCacheProvider 
} from 'ws-dottie';

function FerryTracker() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();

  return (
    <div>
      <h1>Ferry Tracker</h1>
      
      <h2>Vessels ({vessels?.length || 0})</h2>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <strong>{vessel.VesselName}</strong>
          <div>Location: {vessel.Latitude}, {vessel.Longitude}</div>
          <div>Last Update: {vessel.LastUpdate.toLocaleString()}</div>
        </div>
      ))}

      <h2>Terminal Wait Times</h2>
      {waitTimes?.map(terminal => (
        <div key={terminal.TerminalID}>
          <strong>{terminal.TerminalName}</strong>
          <div>Wait Time: {terminal.WaitTime} minutes</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <VesselCacheProvider />
      <TerminalCacheProvider />
      <FerryTracker />
    </QueryClientProvider>
  );
}
```

### Traffic Monitoring Dashboard

```javascript
import { 
  useHighwayAlerts, 
  useTrafficFlows, 
  useTravelTimes,
  useTollRates 
} from 'ws-dottie';

function TrafficDashboard() {
  const { data: alerts } = useHighwayAlerts();
  const { data: flows } = useTrafficFlows();
  const { data: travelTimes } = useTravelTimes();
  const { data: tollRates } = useTollRates();

  return (
    <div>
      <h1>Traffic Dashboard</h1>
      
      <h2>Active Alerts ({alerts?.length || 0})</h2>
      {alerts?.slice(0, 5).map(alert => (
        <div key={alert.AlertID}>
          <strong>{alert.HeadlineDescription}</strong>
          <div>{alert.EventCategory}</div>
        </div>
      ))}

      <h2>Traffic Flow</h2>
      {flows?.slice(0, 10).map(flow => (
        <div key={flow.FlowStationID}>
          <strong>{flow.FlowStationLocation}</strong>
          <div>Speed: {flow.CurrentSpeed} mph</div>
        </div>
      ))}

      <h2>Travel Times</h2>
      {travelTimes?.slice(0, 5).map(route => (
        <div key={route.TravelTimeID}>
          <strong>{route.Name}</strong>
          <div>Time: {route.CurrentTime} minutes</div>
        </div>
      ))}

      <h2>Toll Rates</h2>
      {tollRates?.slice(0, 5).map(rate => (
        <div key={rate.TollRateID}>
          <strong>{rate.TripName}</strong>
          <div>Rate: ${rate.TollAmount}</div>
        </div>
      ))}
    </div>
  );
}
```

### Weather Information Display

```javascript
import { 
  useWeatherInformation, 
  useWeatherStations,
  useMountainPassConditions 
} from 'ws-dottie';

function WeatherDisplay() {
  const { data: weather } = useWeatherInformation([1, 2, 3]); // Station IDs
  const { data: stations } = useWeatherStations();
  const { data: passConditions } = useMountainPassConditions();

  return (
    <div>
      <h1>Weather Information</h1>
      
      <h2>Weather Stations ({stations?.length || 0})</h2>
      {stations?.slice(0, 5).map(station => (
        <div key={station.StationID}>
          <strong>{station.StationName}</strong>
          <div>Temperature: {station.Temperature}°F</div>
          <div>Conditions: {station.RoadCondition}</div>
        </div>
      ))}

      <h2>Mountain Passes</h2>
      {passConditions?.map(pass => (
        <div key={pass.MountainPassId}>
          <strong>{pass.MountainPassName}</strong>
          <div>Status: {pass.RestrictionOne}</div>
          <div>Conditions: {pass.RoadCondition}</div>
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Advanced Patterns

### Error Boundary Integration

```javascript
import { WsdotApiError } from 'ws-dottie';

class WSdotErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    if (error instanceof WsdotApiError) {
      return { hasError: true, error };
    }
    return { hasError: false };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Transportation Data Error</h2>
          <p>{this.state.error.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <WSdotErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TransportationDashboard />
      </QueryClientProvider>
    </WSdotErrorBoundary>
  );
}
```

### Custom Loading States

```javascript
import { useVesselLocations } from 'ws-dottie';

function VesselList() {
  const { data: vessels, isLoading, isFetching, error } = useVesselLocations();

  if (isLoading) {
    return <div className="loading">Loading vessels...</div>;
  }

  if (error) {
    return <div className="error">Error loading vessels: {error.message}</div>;
  }

  return (
    <div>
      <h2>Vessels ({vessels?.length || 0})</h2>
      {isFetching && <div className="refreshing">Refreshing...</div>}
      
      {vessels?.map(vessel => (
        <div key={vessel.VesselID} className="vessel">
          <h3>{vessel.VesselName}</h3>
          <p>Location: {vessel.Latitude}, {vessel.Longitude}</p>
        </div>
      ))}
    </div>
  );
}
```

### Custom Caching Configuration

```javascript
import { useVesselLocations, tanstackQueryOptions } from 'ws-dottie';

function CustomVesselTracker() {
  // Use custom caching for more frequent updates
  const { data: vessels } = useVesselLocations({
    ...tanstackQueryOptions.REALTIME_UPDATES,
    refetchInterval: 2000, // Update every 2 seconds
    staleTime: 1000, // Consider data stale after 1 second
  });

  return (
    <div>
      <h2>Real-time Vessel Tracking</h2>
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <strong>{vessel.VesselName}</strong>
          <div>Last Update: {vessel.LastUpdate.toLocaleTimeString()}</div>
        </div>
      ))}
    </div>
  );
}
```

### Multiple API Integration

```javascript
import { 
  useVesselLocations,
  useTerminalWaitTimes,
  useHighwayAlerts,
  useTrafficFlows 
} from 'ws-dottie';

function ComprehensiveDashboard() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  const { data: alerts } = useHighwayAlerts();
  const { data: flows } = useTrafficFlows();

  const isLoading = !vessels || !waitTimes || !alerts || !flows;

  if (isLoading) {
    return <div>Loading comprehensive data...</div>;
  }

  return (
    <div className="dashboard">
      <div className="section">
        <h2>Ferry System</h2>
        <div>Active Vessels: {vessels.length}</div>
        <div>Terminals with Wait Times: {waitTimes.length}</div>
      </div>

      <div className="section">
        <h2>Highway System</h2>
        <div>Active Alerts: {alerts.length}</div>
        <div>Traffic Flow Stations: {flows.length}</div>
      </div>
    </div>
  );
}
```

## 🚨 Troubleshooting

### Common Issues

**"API key not found" error**
```javascript
// Check your environment variables
console.log('WSDOT_ACCESS_TOKEN:', process.env.WSDOT_ACCESS_TOKEN);
console.log('EXPO_PUBLIC_WSDOT_ACCESS_TOKEN:', process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN);
```

**"QueryClient not found" error**
```javascript
// Make sure TanStack Query is installed and configured
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

**Network errors in browser**
```javascript
// WS-Dottie automatically uses JSONP for browsers
// Check your browser's network tab for CORS errors
// Ensure your API key is valid
```

### Performance Optimization

```javascript
// Use selective imports to reduce bundle size
import { useVesselLocations } from 'ws-dottie';

// Instead of importing everything
// import * as WSdot from 'ws-dottie';
```

### Debug Mode

```javascript
// Enable debug logging
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
```

---

**For more examples, check out the source code or open an issue on GitHub!** 