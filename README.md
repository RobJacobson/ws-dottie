# WSDOT API Client

A TypeScript client library for Washington State Department of Transportation (WSDOT) APIs, including Washington State Ferries (WSF) APIs.

## Features

- **Type-safe**: Full TypeScript support with compile-time validation
- **Functional**: Pure functions with arrow function syntax
- **React Query ready**: Perfect integration with React Query for caching and state management
- **Instance-based**: Configurable client instances with prop drilling support
- **Comprehensive**: Support for all WSF APIs

## Installation

```bash
npm install wsdot-api-client
```

## API Access Code Required

**Important**: All WSDOT APIs require an Access Code for authentication. You must register at [https://wsdot.wa.gov/traffic/api/](https://wsdot.wa.gov/traffic/api/) to obtain your Access Code.

### Environment Setup

Set your Access Code as an environment variable:

```bash
# Add to your .env file
WSDOT_ACCESS_TOKEN=your_access_code_here
```

For React Native/Expo applications:
```bash
EXPO_PUBLIC_WSDOT_ACCESS_TOKEN=your_access_code_here
```

### Development Requirements

**Before implementing any API endpoints:**
1. **Check official WSDOT API documentation** for exact endpoint specifications
2. **Use cURL to validate actual data structures** returned by the API
3. **Update TypeScript types** based on real API responses, not just documentation

See [API Access Requirements](docs/API_ACCESS_REQUIREMENTS.md) for detailed information and official documentation links.

## Quick Start

### Basic Usage

```typescript
import { WsfFares, WsfSchedule, WsfTerminals, WsfVessels } from 'wsdot-api-client';

// Get WSF routes
const routes = await WsfSchedule.getRoutes(new Date());

// Get vessel locations
const vessels = await WsfVessels.getVesselLocations();

// Get terminal basics
const terminals = await WsfTerminals.getTerminalBasics();
```

### React Integration

```typescript
import React from 'react';
import { useScheduleRoutes, useVesselLocations } from 'wsdot-api-client';

// Component using the API - no provider needed!
const RoutePlanner = () => {
  const { data: routes = [], isLoading } = useScheduleRoutes(new Date());
  const { data: vessels = [] } = useVesselLocations();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>WSF Routes</h1>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            Route {route.RouteID}: {route.Description}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Simple app - no provider wrapper needed
const App = () => <RoutePlanner />;
```

## API Reference

### Configuration

The library uses environment variables for configuration:

```bash
# Required: Your WSDOT API key
WSDOT_ACCESS_TOKEN=your_api_key_here
```

### WSF APIs

#### Schedule API
```typescript
// Get all routes for a date
const routes = await WsfSchedule.getRoutes(tripDate: Date);

// Get routes between specific terminals
const routes = await WsfSchedule.getRoutesByTerminals({
  tripDate: Date,
  departingTerminalId: number,
  arrivingTerminalId: number
});

// Get routes with service disruptions
const routes = await WsfSchedule.getRoutesWithDisruptions(tripDate: Date);

// Get detailed route information
const routes = await WsfSchedule.getRouteDetails(tripDate: Date);

// Get scheduled routes
const routes = await WsfSchedule.getScheduledRoutes();

// Get active seasons
const seasons = await WsfSchedule.getActiveSeasons();

// Get alerts
const alerts = await WsfSchedule.getAlerts();
```

#### Vessels API
```typescript
// Vessel Locations (Real-time positions)
const vessels = await WsfVessels.getVesselLocations();
const vessels = await WsfVessels.getVesselLocationsByVesselId(vesselId: number);

// Vessel Verbose (Detailed information)
const vessels = await WsfVessels.getVesselVerbose();
const vessels = await WsfVessels.getVesselVerboseByVesselId(vesselId: number);
```

#### Fares API
```typescript
// Fares (Comprehensive fare information)
const fares = await WsfFares.getFares();
const fare = await WsfFares.getFareById(fareId: number);

// Fare Categories
const categories = await WsfFares.getFareCategories();
const category = await WsfFares.getFareCategoryById(categoryId: number);

// Fare Types
const types = await WsfFares.getFareTypes();
const type = await WsfFares.getFareTypeById(typeId: number);

// Route Fares
const routeFares = await WsfFares.getRouteFares();
const routeFare = await WsfFares.getRouteFaresByRouteId(routeId: number);

// Terminal Fares
const terminalFares = await WsfFares.getTerminalFares();
const terminalFare = await WsfFares.getTerminalFaresByTerminalId(terminalId: number);
```

#### Terminals API
```typescript
// Terminal Basics (Basic terminal information)
const terminals = await WsfTerminals.getTerminalBasics();
const terminals = await WsfTerminals.getTerminalBasicsByTerminalId(terminalId: number);

// Terminal Sailing Space (Real-time space availability)
const terminals = await WsfTerminals.getTerminalSailingSpace();
const terminals = await WsfTerminals.getTerminalSailingSpaceByTerminalId(terminalId: number);
const terminals = await WsfTerminals.getTerminalSailingSpaceByRoute(routeId: number);
const terminals = await WsfTerminals.getTerminalSailingSpaceByTerminalAndRoute({
  terminalId: number;
  routeId: number;
});

// Terminal Verbose (Detailed terminal information)
const terminals = await WsfTerminals.getTerminalVerbose();
const terminals = await WsfTerminals.getTerminalVerboseByTerminalId(terminalId: number);
```

## React Hooks

```typescript
import { 
  useScheduleRoutes, 
  useVesselLocations, 
  useFaresTerminals,
  useTerminalBasics 
} from 'wsdot-api-client';

// Use hooks directly - no provider needed!
const { data: routes } = useScheduleRoutes(new Date());
const { data: vessels } = useVesselLocations();
const { data: terminals } = useFaresTerminals();
```

## Error Handling

The library provides two error handling approaches:

### Throwing Errors (Recommended)
Core API functions throw custom `WsdApiError` instances for better error handling and React Query integration:

```typescript
import { WsfFares, WsdApiError } from 'wsdot-api-client';

try {
  const fares = await WsfFares.getFares();
  // fares is Fare[]
} catch (error) {
  if (error instanceof WsdApiError) {
    console.error('API Error:', error.getUserMessage());
    console.error('Error code:', error.code);
  }
}
```

### Silent Fallback (Legacy)
Some functions return null or empty arrays on error for backward compatibility:

```typescript
import { WsfFares } from 'wsdot-api-client';

const fares = await WsfFares.getFares();
// fares is Fare[] | null
if (fares) {
  // Process fares
}
```

## WSDOT Traveler Information APIs

**Note**: WSDOT Traveler Information APIs (Highway Cameras, Traffic Flow, Weather Information, etc.) are documented in the [WSDOT API Reference](docs/wsdot-api-reference/) but are not yet implemented in this client library.

For these APIs, you can:
1. Use the official WSDOT REST endpoints directly
2. Check the [API Access Requirements](docs/API_ACCESS_REQUIREMENTS.md) for documentation links
3. Follow the development workflow outlined in [TODO.md](docs/TODO.md) to implement new APIs

## Contributing

See [TODO.md](docs/TODO.md) for current development status and implementation tasks.

## License

MIT 