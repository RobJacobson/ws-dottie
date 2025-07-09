# WSF Fares API

The WSF Fares API provides comprehensive access to Washington State Ferries fare information, including fare amounts, categories, types, and route-specific pricing.

## Overview

This module integrates with Washington State Ferries Fares APIs to provide:
- Comprehensive fare information and pricing
- Fare categories and types
- Route-specific fare information
- Terminal-specific fare information
- Cache flush date information for data freshness

## API Endpoints

### Fares API (`/fares`)
**Base URL**: `https://www.wsdot.wa.gov/ferries/api/fares/rest`

#### Available Endpoints
- `/fares` - Comprehensive fare information and pricing
- `/farecategories` - Fare category information
- `/faretypes` - Fare type information
- `/routefares` - Route-specific fare information
- `/terminalfares` - Terminal-specific fare information
- `/cacheflushdate` - Cache flush date information

#### Data Types
- `Fare` - Comprehensive fare information
- `FareCategory` - Fare category information
- `FareType` - Fare type information
- `RouteFare` - Route-specific fare information
- `TerminalFare` - Terminal-specific fare information

#### Update Frequency
- **Fare Information**: Weekly (static data)
- **Categories and Types**: Weekly (static data)
- **Route/Terminal Fares**: Weekly (static data)

## Usage Examples

### Get All Fares
```typescript
import { getFares } from '@/api/wsf/fares';

const fares = await getFares();
```

### Get Specific Fare by ID
```typescript
import { getFareById } from '@/api/wsf/fares';

const fare = await getFareById(1); // Fare ID
```

### Get All Fare Categories
```typescript
import { getFareCategories } from '@/api/wsf/fares';

const categories = await getFareCategories();
```

### Get Specific Fare Category by ID
```typescript
import { getFareCategoryById } from '@/api/wsf/fares';

const category = await getFareCategoryById(1); // Category ID
```

### Get All Fare Types
```typescript
import { getFareTypes } from '@/api/wsf/fares';

const types = await getFareTypes();
```

### Get Specific Fare Type by ID
```typescript
import { getFareTypeById } from '@/api/wsf/fares';

const type = await getFareTypeById(1); // Type ID
```

### Get All Route Fares
```typescript
import { getRouteFares } from '@/api/wsf/fares';

const routeFares = await getRouteFares();
```

### Get Route Fares by Route ID
```typescript
import { getRouteFaresByRouteId } from '@/api/wsf/fares';

const routeFares = await getRouteFaresByRouteId(1); // Route ID
```

### Get All Terminal Fares
```typescript
import { getTerminalFares } from '@/api/wsf/fares';

const terminalFares = await getTerminalFares();
```

### Get Terminal Fares by Terminal ID
```typescript
import { getTerminalFaresByTerminalId } from '@/api/wsf/fares';

const terminalFares = await getTerminalFaresByTerminalId(7); // Terminal ID
```

## React Query Integration

### Using Hooks
```typescript
import { 
  useFares, 
  useFareCategories,
  useFareTypes,
  useRouteFares,
  useTerminalFares
} from '@/api/wsf/fares';

function FaresComponent() {
  // Default: enabled is true
  const { data: fares, isLoading: faresLoading } = useFares();
  const { data: categories, isLoading: categoriesLoading } = useFareCategories();
  const { data: types, isLoading: typesLoading } = useFareTypes();
  const { data: routeFares, isLoading: routeFaresLoading } = useRouteFares();
  const { data: terminalFares, isLoading: terminalFaresLoading } = useTerminalFares();

  if (faresLoading || categoriesLoading || typesLoading || routeFaresLoading || terminalFaresLoading) {
    return <div>Loading fare data...</div>;
  }

  return (
    <div>
      <h2>All Fares</h2>
      {fares?.map(fare => (
        <div key={fare.fareId}>
          {fare.fareName}: ${fare.fareAmount} {fare.fareCurrency}
        </div>
      ))}
      
      <h2>Fare Categories</h2>
      {categories?.map(category => (
        <div key={category.categoryId}>
          {category.categoryName}: {category.categoryDescription}
        </div>
      ))}
      
      <h2>Fare Types</h2>
      {types?.map(type => (
        <div key={type.typeId}>
          {type.typeName}: {type.typeDescription}
        </div>
      ))}
      
      <h2>Route Fares</h2>
      {routeFares?.map(routeFare => (
        <div key={`${routeFare.routeId}-${routeFare.fareId}`}>
          {routeFare.routeName}: ${routeFare.fareAmount} {routeFare.fareCurrency}
        </div>
      ))}
      
      <h2>Terminal Fares</h2>
      {terminalFares?.map(terminalFare => (
        <div key={`${terminalFare.terminalId}-${terminalFare.fareId}`}>
          {terminalFare.terminalName}: ${terminalFare.fareAmount} {terminalFare.fareCurrency}
        </div>
      ))}
    </div>
  );
}
```

### Overriding Default Options
All hooks use default caching options with `enabled: true`. You can override `enabled` or any other React Query option by passing an options object as the second argument to the hook:

```typescript
const { data } = useFares(undefined, { enabled: false }); // disables the query
```

### Using Specific Fares Hooks
```typescript
import { 
  useFareById,
  useFareCategoryById,
  useFareTypeById,
  useRouteFaresByRouteId,
  useTerminalFaresByTerminalId
} from '@/api/wsf/fares';

function SpecificFaresComponent({ 
  fareId, 
  categoryId, 
  typeId, 
  routeId, 
  terminalId 
}: { 
  fareId: number; 
  categoryId: number; 
  typeId: number; 
  routeId: number; 
  terminalId: number; 
}) {
  const { data: fare } = useFareById(fareId);
  const { data: category } = useFareCategoryById(categoryId);
  const { data: type } = useFareTypeById(typeId);
  const { data: routeFares } = useRouteFaresByRouteId(routeId);
  const { data: terminalFares } = useTerminalFaresByTerminalId(terminalId);

  return (
    <div>
      <h2>Specific Fare</h2>
      {fare?.[0] && (
        <div>
          <p>Name: {fare[0].fareName}</p>
          <p>Amount: ${fare[0].fareAmount} {fare[0].fareCurrency}</p>
          <p>Category: {fare[0].fareCategory}</p>
          <p>Type: {fare[0].fareType}</p>
        </div>
      )}
      
      <h2>Specific Category</h2>
      {category?.[0] && (
        <div>
          <p>Name: {category[0].categoryName}</p>
          <p>Description: {category[0].categoryDescription}</p>
        </div>
      )}
      
      <h2>Specific Type</h2>
      {type?.[0] && (
        <div>
          <p>Name: {type[0].typeName}</p>
          <p>Description: {type[0].typeDescription}</p>
        </div>
      )}
      
      <h2>Route Fares</h2>
      {routeFares?.map(routeFare => (
        <div key={routeFare.fareId}>
          {routeFare.fareName}: ${routeFare.fareAmount} {routeFare.fareCurrency}
        </div>
      ))}
      
      <h2>Terminal Fares</h2>
      {terminalFares?.map(terminalFare => (
        <div key={terminalFare.fareId}>
          {terminalFare.fareName}: ${terminalFare.fareAmount} {terminalFare.fareCurrency}
        </div>
      ))}
    </div>
  );
}
```

## Data Transformation

The API automatically transforms WSF date formats to JavaScript Date objects:

- **`/Date(timestamp)/`** → `Date` object
- **`YYYY-MM-DD`** → `Date` object
- **`MM/DD/YYYY`** → `Date` object

All PascalCase keys are converted to camelCase for consistency.

## Error Handling

All API functions return empty arrays (`[]`) on errors rather than throwing exceptions, making them perfect for use with React Query and other state management solutions.

## Caching Strategy

The hooks use default caching options from `createInfrequentUpdateOptions()`. You do not need to set `enabled`, `refetchInterval`, or `staleTime` manually—these are handled automatically. You can override any option by passing an options object to the hook.

**Caching by Data Type:**
- **Fare Information**: Infrequent updates (static data)
- **Fare Categories**: Infrequent updates (static data)
- **Fare Types**: Infrequent updates (static data)
- **Route Fares**: Infrequent updates (static data)
- **Terminal Fares**: Infrequent updates (static data) 