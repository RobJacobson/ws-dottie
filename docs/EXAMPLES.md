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
  const { data: weather } = useWeatherInformation({ stationIds: [1, 2, 3] });
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

### Configuration Management

```javascript
import { configManager, WsfVessels } from 'ws-dottie';

// Runtime configuration for different environments
function initializeApp(environment) {
  switch (environment) {
    case 'development':
      configManager.setConfig({
        WSDOT_ACCESS_TOKEN: process.env.DEV_WSDOT_ACCESS_TOKEN,
        WSDOT_BASE_URL: 'https://dev-proxy.example.com'
      });
      break;
    case 'production':
      configManager.setConfig({
        WSDOT_ACCESS_TOKEN: process.env.PROD_WSDOT_ACCESS_TOKEN,
        WSDOT_BASE_URL: 'https://prod-proxy.example.com'
      });
      break;
  }
}

// Use in your application
initializeApp(process.env.NODE_ENV);
const vessels = await WsfVessels.getVesselLocations();
```

### Parameter Objects and Logging

```javascript
import { 
  WsdotHighwayCameras, 
  WsfFares,
  WsdotApiError 
} from 'ws-dottie';

async function getDetailedData() {
  try {
    // Get specific camera with logging
    const camera = await WsdotHighwayCameras.getCamera(
      { cameraID: 1001 }, 
      'debug'
    );

    // Get fare information with parameters
    const fares = await WsfFares.getFareLineItems({
      tripDate: new Date('2024-01-15'),
      departingTerminalID: 7,
      arrivingTerminalID: 8,
      roundTrip: false
    }, 'info');

    // Search cameras with filters
    const cameras = await WsdotHighwayCameras.searchCameras({
      StateRoute: "5",
      Region: "Northwest"
    });

    return { camera, fares, cameras };
  } catch (error) {
    if (error instanceof WsdotApiError) {
      console.error('Error:', error.getUserMessage());
    }
    throw error;
  }
}
```

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
          <p>{this.state.error.getUserMessage()}</p>
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
    return <div className="error">Error loading vessels: {error.getUserMessage()}</div>;
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

### Advanced Caching Customization

WS-Dottie's caching strategies can be customized using spread operators with TanStack Query options:

```javascript
import { useVesselLocations, tanstackQueryOptions } from 'ws-dottie';

function AdvancedVesselTracker() {
  // Custom 5-minute update strategy with different parameters
  const { data: vessels } = useVesselLocations({
    ...tanstackQueryOptions.REALTIME_UPDATES, // Start with real-time base
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3, // 3 retries
    retryDelay: 5 * 1000, // 5 second delay between retries
  });

  return (
    <div>
      <h2>Vessels (5-minute updates)</h2>
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

This approach allows you to:
- **Extend base strategies** - Start with a predefined strategy and customize specific options
- **Mix and match** - Combine different aspects of various strategies
- **Fine-tune performance** - Optimize caching for your specific use case
- **Maintain consistency** - Keep the base strategy's proven defaults while customizing only what you need

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

## 🎯 Real-World Project Examples

### Ferry Commuter App

```javascript
import { 
  useVesselLocations, 
  useTerminalWaitTimes,
  useSchedules 
} from 'ws-dottie';

function FerryCommuterApp() {
  const { data: vessels } = useVesselLocations();
  const { data: waitTimes } = useTerminalWaitTimes();
  const { data: schedules } = useSchedules({ routeId: 1 });

  const myTerminal = waitTimes?.find(t => t.TerminalName === 'Seattle');
  const nextFerry = schedules?.find(s => s.DepartureTime > new Date());

  return (
    <div className="commuter-app">
      <h1>Ferry Commuter</h1>
      
      {myTerminal && (
        <div className="wait-time">
          <h2>Seattle Terminal</h2>
          <div className="wait">Wait Time: {myTerminal.WaitTime} minutes</div>
        </div>
      )}

      {nextFerry && (
        <div className="next-ferry">
          <h2>Next Ferry</h2>
          <div>Departure: {nextFerry.DepartureTime.toLocaleTimeString()}</div>
        </div>
      )}

      <div className="vessel-map">
        <h2>Active Vessels ({vessels?.length || 0})</h2>
        {/* Render vessel locations on a map */}
      </div>
    </div>
  );
}
```

### Traffic Camera Viewer

```javascript
import { 
  useCameras, 
  useSearchCameras 
} from 'ws-dottie';

function TrafficCameraViewer() {
  const [selectedRoute, setSelectedRoute] = useState('5');
  const { data: allCameras } = useCameras();
  const { data: routeCameras } = useSearchCameras({ StateRoute: selectedRoute });

  return (
    <div className="camera-viewer">
      <h1>Traffic Cameras</h1>
      
      <div className="filters">
        <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)}>
          <option value="5">I-5</option>
          <option value="405">I-405</option>
          <option value="90">I-90</option>
        </select>
      </div>

      <div className="camera-grid">
        {routeCameras?.map(camera => (
          <div key={camera.CameraID} className="camera">
            <h3>{camera.Title}</h3>
            <img src={camera.ImageURL} alt={camera.Title} />
            <div>Location: {camera.RoadName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Weather Dashboard

```javascript
import { 
  useWeatherStations,
  useMountainPassConditions,
  useWeatherInformationForStations 
} from 'ws-dottie';

function WeatherDashboard() {
  const { data: stations } = useWeatherStations();
  const { data: passes } = useMountainPassConditions();
  const { data: weather } = useWeatherInformationForStations({ 
    stationIds: [1, 2, 3, 4, 5] 
  });

  const seattleStation = stations?.find(s => s.StationName.includes('Seattle'));
  const snoqualmiePass = passes?.find(p => p.MountainPassName.includes('Snoqualmie'));

  return (
    <div className="weather-dashboard">
      <h1>Washington Weather</h1>
      
      {seattleStation && (
        <div className="current-weather">
          <h2>Seattle</h2>
          <div>Temperature: {seattleStation.Temperature}°F</div>
          <div>Conditions: {seattleStation.RoadCondition}</div>
        </div>
      )}

      {snoqualmiePass && (
        <div className="pass-conditions">
          <h2>Snoqualmie Pass</h2>
          <div>Status: {snoqualmiePass.RestrictionOne}</div>
          <div>Conditions: {snoqualmiePass.RoadCondition}</div>
        </div>
      )}

      <div className="weather-stations">
        <h2>Weather Stations ({stations?.length || 0})</h2>
        {/* Render weather station data */}
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

// Or check runtime configuration
import { configManager } from 'ws-dottie';
console.log('API Key:', configManager.getApiKey());
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
// Enable debug logging for troubleshooting
const vessels = await WsfVessels.getVesselLocations();
const alerts = await WsdotHighwayAlerts.getHighwayAlerts();
```

---

**For more examples, check out the source code or open an issue on GitHub!**

**Need help navigating the documentation?** Check out the [Documentation Index](./INDEX.md) for complete navigation. 