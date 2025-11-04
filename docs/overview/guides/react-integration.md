# React Integration Guide

This guide covers best practices for integrating WS-Dottie with React applications, including setup, patterns, and performance optimization.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install WS-Dottie and React Query
npm install ws-dottie @tanstack/react-query

# Or with yarn
yarn add ws-dottie @tanstack/react-query
```

### 2. Set Up TanStack Query

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 2,
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

```javascript
import { useVesselLocations, useHighwayAlerts } from 'ws-dottie';

function TransportationDashboard() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();
  
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

## 🏗️ Architecture

### React Query Integration

WS-Dottie uses TanStack Query for data fetching, caching, and state management in React applications:

```javascript
// WS-Dottie hooks are built on TanStack Query
const useVesselLocations = (options = {}) => {
  return useQuery({
    queryKey: ['vesselLocations'],
    queryFn: () => fetchDottie({ endpoint: getVesselLocations }),
    ...tanstackQueryOptions.REALTIME_UPDATES, // Pre-configured options
    ...options, // User overrides
  });
};
```

### Component Structure

Recommended component structure for WS-Dottie data:

```javascript
// Container component - handles data fetching
function VesselMapContainer() {
  const { data: vessels, isLoading, error, refetch } = useVesselLocations();
  
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

## 🎯 Common Patterns

### Data Fetching with Parameters

```javascript
import { useSchedules, useFares } from 'ws-dottie';

function FerrySchedule() {
  const [route, setRoute] = useState({ 
    departing: 3, 
    arriving: 7, 
    date: new Date() 
  });
  
  const { data: schedules } = useSchedules({ 
    departingTerminalId: route.departing, 
    arrivingTerminalId: route.arriving, 
    tripDate: route.date 
  });
  
  const { data: fares } = useFares({ 
    tripDate: route.date, 
    departingTerminalId: route.departing, 
    arrivingTerminalId: route.arriving 
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

### Conditional Data Fetching

```javascript
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

### Data Transformation

```javascript
import { useWeatherInformation } from 'ws-dottie';

function WeatherDashboard() {
  const { data: weather } = useWeatherInformation();
  
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

## 🔄 State Management

### Global State with Context

```javascript
import { createContext, useContext, useReducer } from 'react';
import { useVesselLocations, useHighwayAlerts } from 'ws-dottie';

// Create context
const TransportationContext = createContext();

// Reducer for state management
function transportationReducer(state, action) {
  switch (action.type) {
    case 'SET_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'SET_VEHICLE_TYPE':
      return { ...state, vehicleType: action.payload };
    default:
      return state;
  }
}

// Provider component
function TransportationProvider({ children }) {
  const [state, dispatch] = useReducer(transportationReducer, {
    selectedRegion: 'Western Washington',
    vehicleType: 'passenger',
  });
  
  // Fetch data based on state
  const { data: vessels } = useVesselLocations();
  const { data: alerts } = useHighwayAlerts();
  
  const value = {
    ...state,
    vessels,
    alerts,
    dispatch,
  };
  
  return (
    <TransportationContext.Provider value={value}>
      {children}
    </TransportationContext.Provider>
  );
}

// Custom hook to use context
function useTransportation() {
  const context = useContext(TransportationContext);
  if (!context) {
    throw new Error('useTransportation must be used within TransportationProvider');
  }
  return context;
}

// Usage in components
function RegionalDashboard() {
  const { selectedRegion, vessels, alerts, dispatch } = useTransportation();
  
  // Filter data based on selected region
  const regionalVessels = vessels?.filter(vessel => 
    isInRegion(vessel, selectedRegion)
  );
  
  const regionalAlerts = alerts?.filter(alert => 
    isInRegion(alert, selectedRegion)
  );
  
  return (
    <div>
      <div className="region-selector">
        <select 
          value={selectedRegion} 
          onChange={e => dispatch({ 
            type: 'SET_REGION', 
            payload: e.target.value 
          })}
        >
          <option value="Western Washington">Western Washington</option>
          <option value="Eastern Washington">Eastern Washington</option>
        </select>
      </div>
      
      <div className="dashboard-content">
        <VesselDisplay vessels={regionalVessels} />
        <AlertDisplay alerts={regionalAlerts} />
      </div>
    </div>
  );
}
```

## 🎨 UI Components

### Data Display Components

```javascript
import { useVesselLocations } from 'ws-dottie';

// Vessel card component
function VesselCard({ vessel }) {
  return (
    <div className="vessel-card">
      <h3>{vessel.VesselName}</h3>
      <div className="vessel-details">
        <div className="detail-item">
          <span className="label">Speed:</span>
          <span className="value">{vessel.Speed} knots</span>
        </div>
        <div className="detail-item">
          <span className="label">Heading:</span>
          <span className="value">{vessel.Heading}°</span>
        </div>
        <div className="detail-item">
          <span className="label">Status:</span>
          <span className="value">{vessel.Status}</span>
        </div>
      </div>
    </div>
  );
}

// Vessel list component
function VesselList() {
  const { data: vessels, isLoading, error } = useVesselLocations();
  
  if (isLoading) return <div>Loading vessels...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div className="vessel-list">
      {vessels?.map(vessel => (
        <VesselCard key={vessel.VesselID} vessel={vessel} />
      ))}
    </div>
  );
}
```

### Interactive Map Component

```javascript
import { useEffect, useRef, useState } from 'react';
import { useVesselLocations } from 'ws-dottie';

function VesselMap() {
  const mapRef = useRef(null);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const { data: vessels } = useVesselLocations();
  
  useEffect(() => {
    if (!mapRef.current || !vessels) return;
    
    // Initialize map (simplified example)
    const map = new window.Map(mapRef.current);
    
    // Add vessel markers
    vessels.forEach(vessel => {
      const marker = new window.Marker({
        position: { lat: vessel.Latitude, lng: vessel.Longitude },
        map: map,
        title: vessel.VesselName,
      });
      
      // Add click handler
      marker.addListener('click', () => {
        setSelectedVessel(vessel);
      });
    });
    
    // Center map on vessels
    const bounds = new window.LatLngBounds();
    vessels.forEach(vessel => {
      bounds.extend({ lat: vessel.Latitude, lng: vessel.Longitude });
    });
    map.fitBounds(bounds);
    
    return () => {
      // Cleanup
    };
  }, [vessels]);
  
  return (
    <div className="vessel-map-container">
      <div ref={mapRef} className="vessel-map" />
      
      {selectedVessel && (
        <div className="vessel-popup">
          <h3>{selectedVessel.VesselName}</h3>
          <p>Speed: {selectedVessel.Speed} knots</p>
          <p>Heading: {selectedVessel.Heading}°</p>
          <button onClick={() => setSelectedVessel(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
```

## ⚡ Performance Optimization

### Memoization

```javascript
import { useMemo, useCallback } from 'react';
import { useVesselLocations } from 'ws-dottie';

function OptimizedVesselList() {
  const { data: vessels } = useVesselLocations();
  const [filter, setFilter] = useState('');
  
  // Memoize filtered vessels
  const filteredVessels = useMemo(() => {
    if (!vessels) return [];
    if (!filter) return vessels;
    
    return vessels.filter(vessel => 
      vessel.VesselName.toLowerCase().includes(filter.toLowerCase())
    );
  }, [vessels, filter]);
  
  // Memoize event handlers
  const handleFilterChange = useCallback((e) => {
    setFilter(e.target.value);
  }, []);
  
  // Memoize vessel card component
  const VesselCardMemo = useMemo(() => {
    return ({ vessel }) => (
      <div className="vessel-card">
        <h3>{vessel.VesselName}</h3>
        <p>Speed: {vessel.Speed} knots</p>
      </div>
    );
  }, []);
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Filter vessels..." 
        value={filter}
        onChange={handleFilterChange}
      />
      
      <div className="vessel-list">
        {filteredVessels.map(vessel => (
          <VesselCardMemo key={vessel.VesselID} vessel={vessel} />
        ))}
      </div>
    </div>
  );
}
```

### Virtual Scrolling

```javascript
import { useMemo, useState, useRef, useEffect } from 'react';
import { useVesselLocations } from 'ws-dottie';

function VirtualizedVesselList() {
  const { data: vessels } = useVesselLocations();
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);
  
  // Memoize vessels
  const vesselsMemo = useMemo(() => vessels || [], [vessels]);
  
  // Calculate visible items
  const visibleItems = useMemo(() => {
    const itemHeight = 80; // Height of each vessel item
    const containerHeight = 400; // Height of container
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 5, // Buffer
      vesselsMemo.length
    );
    
    return vesselsMemo.slice(startIndex, endIndex).map((vessel, index) => ({
      ...vessel,
      index: startIndex + index,
    }));
  }, [vesselsMemo, scrollTop]);
  
  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  return (
    <div className="virtualized-container">
      <div 
        ref={containerRef}
        className="virtualized-list"
        style={{ height: '400px', overflow: 'auto' }}
        onScroll={handleScroll}
      >
        <div style={{ height: `${vesselsMemo.length * 80}px` }}>
          {visibleItems.map(item => (
            <div 
              key={item.VesselID}
              className="vessel-item"
              style={{
                position: 'absolute',
                top: `${item.index * 80}px`,
                width: '100%',
                height: '80px',
              }}
            >
              <h3>{item.VesselName}</h3>
              <p>Speed: {item.Speed} knots</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## 🚨 Error Handling

### Error Boundaries

```javascript
import { Component } from 'react';
import { useVesselLocations } from 'ws-dottie';

class TransportationErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Transportation Error:', error, errorInfo);
    
    // Log error to service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>We're having trouble loading transportation data.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <TransportationErrorBoundary>
      <TransportationDashboard />
    </TransportationErrorBoundary>
  );
}
```

### Error Handling in Hooks

```javascript
import { useVesselLocations } from 'ws-dottie';

function ErrorHandlingExample() {
  const { data: vessels, isLoading, error, refetch } = useVesselLocations({
    retry: (failureCount, error) => {
      // Custom retry logic
      if (error.status === 404) return false; // Don't retry 404s
      if (failureCount < 3) return true; // Retry up to 3 times
      return false;
    },
    onError: (error) => {
      // Custom error handling
      console.error('Vessel fetch error:', error);
      
      // Show user-friendly message
      if (error.status === 401) {
        showNotification('Please check your API key configuration');
      } else if (error.status >= 500) {
        showNotification('Server error. Please try again later.');
      }
    },
  });
  
  return (
    <div>
      {error && (
        <div className="error-display">
          <h3>Error Loading Data</h3>
          <p>{error.message}</p>
          <button onClick={() => refetch()}>Retry</button>
        </div>
      )}
      
      {isLoading && <div>Loading...</div>}
      
      {vessels && (
        <div>
          <h2>Vessels ({vessels.length})</h2>
          {/* Render vessels */}
        </div>
      )}
    </div>
  );
}
```

## 📚 Next Steps

- **[Node.js Integration Guide](./nodejs-integration.md)** - Server-side usage patterns
- **[CLI Usage Guide](./cli-usage.md)** - Command-line interface and debugging
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
- **[Type Safety Reference](../reference/type-safety.md)** - TypeScript integration and Zod validation
