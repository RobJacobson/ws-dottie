# WSDOT API Client

A TypeScript client library for Washington State Department of Transportation (WSDOT) APIs, including Washington State Ferries (WSF) and Traveler Information APIs.

## Features

- **Type-safe**: Full TypeScript support with compile-time validation
- **Functional**: Pure functions with arrow function syntax
- **React Query ready**: Perfect integration with React Query for caching and state management
- **Instance-based**: Configurable client instances with prop drilling support
- **Comprehensive**: Support for all WSF and WSDOT Traveler Information APIs

## Installation

```bash
npm install wsdot-api-client
```

## Quick Start

### Basic Usage

```typescript
import { createWsdotClient } from 'wsdot-api-client';

// Create client instance
const wsdotClient = createWsdotClient({
  apiKey: 'your-api-key-here',
  timeout: 15000,
  logLevel: 'info'
});

// Get WSF routes
const routes = await wsdotClient.wsf.schedule.getRoutes(new Date());

// Get vessel locations
const vessels = await wsdotClient.wsf.vessels.getVesselLocations();

// Get highway cameras
const cameras = await wsdotClient.wsdot.traffic.getHighwayCameras();
```

### React Integration

```typescript
import React from 'react';
import { useQuery } from 'react-query';
import { createWsdotClient, WsdotProvider, useWsfApi } from 'wsdot-api-client';

// Create client instance
const wsdotClient = createWsdotClient({
  apiKey: process.env.REACT_APP_WSDOT_API_KEY || '',
  timeout: 15000,
  logLevel: 'info'
});

// Component using the API
const RoutePlanner = () => {
  const wsf = useWsfApi();
  
  const { data: routes = [], isLoading } = useQuery({
    queryKey: ['routes', new Date()],
    queryFn: () => wsf.schedule.getRoutes(new Date()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>WSF Routes</h1>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            Route {route.routeId}: {route.departingTerminal} → {route.arrivingTerminal}
          </li>
        ))}
      </ul>
    </div>
  );
};

// App with provider
const App = () => (
  <WsdotProvider client={wsdotClient}>
    <RoutePlanner />
  </WsdotProvider>
);
```

## API Reference

### Configuration

```typescript
interface WsdotConfig {
  apiKey: string;           // Required: Your WSDOT API key
  timeout?: number;         // Optional: Request timeout in ms (default: 10000)
  retries?: number;         // Optional: Number of retries (default: 3)
  logLevel?: 'none' | 'info' | 'debug'; // Optional: Logging level (default: 'none')
}
```

### WSF APIs

#### Schedule API
```typescript
// Get all routes for a date
const routes = await client.wsf.schedule.getRoutes(tripDate: Date);

// Get routes between specific terminals
const routes = await client.wsf.schedule.getRoutesByTerminals({
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number
});

// Get routes with service disruptions
const routes = await client.wsf.schedule.getRoutesWithDisruptions(tripDate: Date);

// Get detailed route information
const routes = await client.wsf.schedule.getRouteDetails(tripDate: Date);

// Get scheduled routes
const routes = await client.wsf.schedule.getScheduledRoutes();

// Get active seasons
const seasons = await client.wsf.schedule.getActiveSeasons();

// Get alerts
const alerts = await client.wsf.schedule.getAlerts();
```

#### Vessels API
```typescript
// Vessel Locations (Real-time positions)
const vessels = await client.wsf.vessels.getVesselLocations();
const vessels = await client.wsf.vessels.getVesselLocationsByVesselId(vesselId: number);

// Vessel Verbose (Detailed information)
const vessels = await client.wsf.vessels.getVesselVerbose();
const vessels = await client.wsf.vessels.getVesselVerboseByVesselId(vesselId: number);
```

#### Fares API
```typescript
// Fares (Comprehensive fare information)
const fares = await client.wsf.fares.getFares();
const fare = await client.wsf.fares.getFareById(fareId: number);

// Fare Categories
const categories = await client.wsf.fares.getFareCategories();
const category = await client.wsf.fares.getFareCategoryById(categoryId: number);

// Fare Types
const types = await client.wsf.fares.getFareTypes();
const type = await client.wsf.fares.getFareTypeById(typeId: number);

// Route Fares
const routeFares = await client.wsf.fares.getRouteFares();
const routeFare = await client.wsf.fares.getRouteFaresByRouteId(routeId: number);

// Terminal Fares
const terminalFares = await client.wsf.fares.getTerminalFares();
const terminalFare = await client.wsf.fares.getTerminalFaresByTerminalId(terminalId: number);
```

#### Terminals API
```typescript
// Terminal Basics (Basic terminal information)
const terminals = await client.wsf.terminals.getTerminalBasics();
const terminals = await client.wsf.terminals.getTerminalBasicsByTerminalId(terminalId: number);

// Terminal Sailing Space (Real-time space availability)
const terminals = await client.wsf.terminals.getTerminalSailingSpace();
const terminals = await client.wsf.terminals.getTerminalSailingSpaceByTerminalId(terminalId: number);
const terminals = await client.wsf.terminals.getTerminalSailingSpaceByRoute(routeId: number);
const terminals = await client.wsf.terminals.getTerminalSailingSpaceByTerminalAndRoute({
  terminalId: number;
  routeId: number;
});

// Terminal Verbose (Detailed terminal information)
const terminals = await client.wsf.terminals.getTerminalVerbose();
const terminals = await client.wsf.terminals.getTerminalVerboseByTerminalId(terminalId: number);
```

### WSDOT Traveler Information APIs

#### Traffic API
```typescript
// Get highway cameras
const cameras = await client.wsdot.traffic.getHighwayCameras();

// Get highway cameras by region
const cameras = await client.wsdot.traffic.getHighwayCamerasByRegion(region: string);

// Get traffic flow
const traffic = await client.wsdot.traffic.getTrafficFlow();

// Get traffic flow by region
const traffic = await client.wsdot.traffic.getTrafficFlowByRegion(region: string);

// Get travel times
const times = await client.wsdot.traffic.getTravelTimes();

// Get travel times by region
const times = await client.wsdot.traffic.getTravelTimesByRegion(region: string);

// Get highway alerts
const alerts = await client.wsdot.traffic.getHighwayAlerts();

// Get highway alerts by region
const alerts = await client.wsdot.traffic.getHighwayAlertsByRegion(region: string);

// Get mountain pass conditions
const conditions = await client.wsdot.traffic.getMountainPassConditions();
```

## React Hooks

```typescript
import { useWsdotClient, useWsfApi, useWsdApi } from 'wsdot-api-client';

// Get the full client
const client = useWsdotClient();

// Get WSF APIs
const wsf = useWsfApi();

// Get WSDOT APIs
const wsdot = useWsdApi();
```

## Error Handling

The library returns empty arrays (`[]`) on errors rather than throwing exceptions, making it perfect for use with React Query and other state management solutions.

```typescript
// All API calls return empty arrays on error
const routes = await client.wsf.schedule.getRoutes(new Date());
// routes will be [] if there's an error, never throws
```

## React Query Integration

The library is designed to work seamlessly with React Query:

```typescript
import { useQuery } from 'react-query';
import { useWsfApi } from 'wsdot-api-client';

const RouteComponent = () => {
  const wsf = useWsfApi();
  
  const { data: routes = [], isLoading, error } = useQuery({
    queryKey: ['routes', tripDate],
    queryFn: () => wsf.schedule.getRoutes(tripDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Refresh every minute
  });
  
  // React Query handles loading states, error states, and caching
};
```

## Examples

See the `examples/` directory for complete working examples:

- `examples/react-web/` - React web application
- `examples/vanilla-js/` - Vanilla JavaScript usage
- `examples/react-native/` - React Native application

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the library
npm run build

# Run in development mode
npm run dev
```

## License

MIT 