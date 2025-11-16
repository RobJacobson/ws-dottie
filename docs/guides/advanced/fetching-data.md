# Fetching Data Guide

This guide covers how to fetch data using WS-Dottie's basic fetch functionality, including different options for fetching and validating data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install WS-Dottie
npm install ws-dottie

# Or with yarn
yarn add ws-dottie
```

### 2. Configure API Key

```javascript
import { configManager } from 'ws-dottie';

// Set API key from environment variable
configManager.setApiKey(process.env.WSDOT_ACCESS_TOKEN);

// Optional: Set custom base URL (for proxying)
configManager.setBaseUrl(process.env.WSDOT_BASE_URL);

// Note: setLogLevel is currently a stub implementation
// Use logMode parameter in fetch functions instead (see below)
```

### 3. Basic Usage

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';

async function fetchTransportationData() {
  try {
    // Fetch vessel locations (without validation - faster)
    const vessels = await fetchVesselLocations({
      fetchMode: 'native',
      validate: false,  // Default: faster, no validation overhead
      logMode: 'none'   // Default: no logging
    });
    
    console.log(`Found ${vessels.length} vessels`);
    
    // Fetch highway alerts (with validation - safer)
    const alerts = await fetchAlerts({
      fetchMode: 'native',
      validate: true,   // Enable validation for extra safety
      logMode: 'info'   // Log basic request information
    });
    
    console.log(`Found ${alerts.length} alerts`);
    
    // Fetch border crossings (without validation - faster)
    const crossings = await fetchBorderCrossings({
      fetchMode: 'native',
      validate: false,  // Skip validation for better performance
      logMode: 'debug'  // Detailed logging for debugging
    });
    
    console.log(`Found ${crossings.length} border crossings`);
    
    return { vessels, alerts, crossings };
  } catch (error) {
    console.error('Error fetching transportation data:', error.message);
    throw error;
  }
}

// Run function
fetchTransportationData();
```

## 📦 Import Patterns

WS-Dottie provides multiple import patterns optimized for different use cases. For server-side code (no React), use the `/core` subpath:

**Core-Only Imports** (Recommended for server-side):
```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
```

**API-Specific Imports** (Includes hooks):
```javascript
import { useVesselLocations, useVesselLocationsByVesselId } from 'ws-dottie/wsf-vessels';
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
```

Hooks now accept the same `FetchFunctionParams<T>` object as their matching fetch functions. Provide endpoint parameters with `params`, override transport with `fetchMode`, control Zod validation with `validate`, and set logging verbosity with `logMode`.

```javascript
// Hook without endpoint parameters
const { data: vessels } = useVesselLocations({
  fetchMode: 'native',
  validate: false,
  logMode: 'none',  // Optional: 'none' | 'info' | 'debug'
});

// Hook with endpoint parameters
const { data: vessel } = useVesselLocationsByVesselId({
  params: { VesselID: 18 },
  fetchMode: 'native',
  validate: true,
  logMode: 'info',  // Optional: 'none' | 'info' | 'debug'
});
```

**Shared Utilities** (Config, fetch helper, dates):
```javascript
import { configManager, fetchDottie } from 'ws-dottie';
```

**Importing TypeScript Types:**
```typescript
// Import types along with functions
import { 
  fetchVesselLocations,
  type VesselLocation,           // Output type
  type VesselLocationsInput      // Input type
} from 'ws-dottie/wsf-vessels/core';

// Use types in your code
async function processVessels(): Promise<VesselLocation[]> {
  const vessels = await fetchVesselLocations({
    fetchMode: 'native',
    validate: false
  });
  return vessels;
}
```

See the [Import Patterns section in README.md](../../README.md#5-import-patterns) for detailed guidance.

## 🏗️ Fetch Modes

WS-Dottie supports different fetch modes for different environments:

### Native Fetch (Server-side)

```javascript
// Native fetch for server-side applications
const vessels = await fetchVesselLocations({
  fetchMode: 'native',  // Default for Node.js
  validate: true
});
```

### JSONP (Browser)

```javascript
// JSONP for browser applications (CORS compatibility)
const vessels = await fetchVesselLocations({
  fetchMode: 'jsonp',   // Default for browser
  validate: true
});
```

## 🎯 Common Patterns

### Data Fetching with Parameters

```javascript
import { 
  fetchScheduleByTripDateAndRouteId,
  fetchFareLineItemsByTripDateAndTerminals
} from 'ws-dottie/wsf-schedule/core';

async function fetchFerrySchedule(departingTerminalId, arrivingTerminalId, tripDate) {
  try {
    // Fetch schedules
    const schedules = await fetchScheduleByTripDateAndRouteId({
      params: {
        TripDate: tripDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        RouteID: departingTerminalId
      },
      fetchMode: 'native',
      validate: true
    });
    
    // Fetch fares
    const fares = await fetchFareLineItemsByTripDateAndTerminals({
      params: {
        TripDate: tripDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        DepartingTerminalID: departingTerminalId,
        ArrivingTerminalID: arrivingTerminalId
      },
      fetchMode: 'native',
      validate: true
    });
    
    // Combine data
    const combinedData = {
      schedules: schedules.Sailings || [],
      fares: fares || [],
      route: {
        departing: departingTerminalId,
        arriving: arrivingTerminalId,
        date: tripDate
      }
    };
    
    return combinedData;
  } catch (error) {
    console.error('Error fetching ferry schedule:', error.message);
    throw error;
  }
}

// Usage
async function main() {
  const scheduleData = await fetchFerrySchedule(3, 7, new Date());
  
  console.log('Schedule Data:');
  console.log(`Route: ${scheduleData.route.departing} to ${scheduleData.route.arriving}`);
  console.log(`Date: ${scheduleData.route.date.toLocaleDateString()}`);
  console.log(`Sailings: ${scheduleData.schedules.length}`);
  console.log(`Fare Options: ${scheduleData.fares.length}`);
}

main();
```

### Batch Data Fetching

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchTerminalWaitTimes } from 'ws-dottie/wsf-terminals/core';
import { fetchAlerts } from 'ws-dottie/wsdot-highway-alerts/core';
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';

async function fetchBatchData() {
  try {
    // Fetch multiple data sources in parallel
    const [vessels, waitTimes, alerts, crossings] = await Promise.all([
      fetchVesselLocations({
        fetchMode: 'native',
        validate: false  // Default: faster
      }),
      fetchTerminalWaitTimes({
        fetchMode: 'native',
        validate: false  // Default: faster
      }),
      fetchAlerts({
        fetchMode: 'native',
        validate: true  // Enable validation for critical data
      }),
      fetchBorderCrossings({
        fetchMode: 'native',
        validate: false  // Default: faster
      })
    ]);
    
    return {
      vessels,
      waitTimes,
      alerts,
      crossings,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error fetching batch data:', error.message);
    throw error;
  }
}

// Usage with caching
const dataCache = new Map();

async function getCachedData(cacheKey, fetchFunction) {
  // Check cache first
  if (dataCache.has(cacheKey)) {
    const cached = dataCache.get(cacheKey);
    
    // Return cached data if not stale (5 minutes)
    if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
      return cached.data;
    }
  }
  
  // Fetch fresh data
  const data = await fetchFunction();
  
  // Update cache
  dataCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}

// Usage
async function main() {
  const data = await getCachedData('transportation-overview', fetchBatchData);
  
  console.log('Transportation Overview:');
  console.log(`Vessels: ${data.vessels.length}`);
  console.log(`Terminal Wait Times: ${data.waitTimes.length}`);
  console.log(`Highway Alerts: ${data.alerts.length}`);
  console.log(`Border Crossings: ${data.crossings.length}`);
  console.log(`Last Updated: ${data.lastUpdated.toLocaleString()}`);
}

main();
```

## 🔧 Validation Options

WS-Dottie provides optional Zod schema validation. Validation is **disabled by default** (`validate: false`) for optimal performance, but you can enable it when you need extra safety.

### Understanding Validation

**With validation enabled** (`validate: true`):
- Validates API responses against Zod schemas at runtime
- Catches API response shape changes immediately
- Transforms date strings and nullable fields safely
- Adds ~50-100KB to bundle size (Zod schemas)
- Slightly slower due to schema parsing overhead

**Without validation** (`validate: false` - default):
- Faster performance — no schema parsing
- Smaller bundle size — Zod schemas can be tree-shaken out
- Still type-safe — TypeScript types are always available
- Automatic .NET date conversion still applies
- Perfect for production when API is stable

### Schema Validation

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

// Enable automatic validation (recommended for development)
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: true  // Validates response against Zod schema
});

// Disable validation (recommended for production)
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Default: faster, no validation overhead
});
```

### When Schemas Are Required

If you request validation (`validate: true`) but schemas aren't available (e.g., using a light build), WS-Dottie will throw a clear error:

```
Validation requires schemas. This endpoint was built without schemas.
Use the full build or import schemas from the /schemas subpath.
```

**Solutions:**
1. Use the full build (includes schemas by default)
2. Import schemas from the `/schemas` subpath:
   ```javascript
   import { vesselLocationsSchema } from 'ws-dottie/wsf-vessels/schemas';
   ```
3. Disable validation (`validate: false`) if you don't need it

### Production vs Development Patterns

**Development Pattern** (catch issues early):
```javascript
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV === 'development'
});
```

**Production Pattern** (optimize for performance):
```javascript
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: false  // Faster, smaller bundle
});
```

**Conditional Pattern** (best of both worlds):
```javascript
const vessels = await fetchVesselLocations({
  fetchMode: 'native',
  validate: process.env.NODE_ENV !== 'production'
});
```

### Custom Validation

If you need custom validation logic beyond Zod schemas:

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithCustomValidation() {
  try {
    const vessels = await fetchVesselLocations({
      fetchMode: 'native',
      validate: false  // Disable automatic validation
    });
    
    // Custom validation logic
    const validVessels = vessels.filter(vessel => 
      vessel.VesselID && 
      vessel.VesselName && 
      typeof vessel.Latitude === 'number' && 
      typeof vessel.Longitude === 'number'
    );
    
    if (validVessels.length !== vessels.length) {
      console.warn(`Filtered out ${vessels.length - validVessels.length} invalid vessels`);
    }
    
    return validVessels;
  } catch (error) {
    console.error('Error fetching vessels:', error.message);
    throw error;
  }
}
```

## 🚨 Error Handling

### Structured Error Handling

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';
import { fetchBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';
import { isApiError } from 'ws-dottie';

class TransportationService {
  constructor() {
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000, // 1 second
      maxDelay: 10000, // 10 seconds
      backoffFactor: 2
    };
  }
  
  async fetchWithRetry(fetchFunction, params = {}) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const data = await fetchFunction({
          ...params,
          fetchMode: 'native',
          validate: false  // Default: faster
        });
        
        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication errors
        if (isApiError(error) && error.status === 401) {
          throw error;
        }
        
        // Don't retry on client errors (4xx)
        if (isApiError(error) && error.status >= 400 && error.status < 500) {
          throw error;
        }
        
        // If this is last attempt, throw error
        if (attempt === this.retryConfig.maxRetries) {
          throw error;
        }
        
        // Calculate delay for next attempt
        const delay = Math.min(
          this.retryConfig.baseDelay * Math.pow(this.retryConfig.backoffFactor, attempt - 1),
          this.retryConfig.maxDelay
        );
        
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
  
  async fetchVesselLocations() {
    try {
      return await this.fetchWithRetry(fetchVesselLocations);
    } catch (error) {
      console.error('Failed to fetch vessel locations after retries:', error.message);
      throw error;
    }
  }
}

// Usage
const transportService = new TransportationService();

async function main() {
  try {
    const vessels = await transportService.fetchVesselLocations();
    console.log(`Found ${vessels.length} vessels`);
  } catch (error) {
    console.error('Application error:', error.message);
    
    // Handle application-level error
    if (isApiError(error)) {
      console.error('API Error Details:', {
        status: error.status,
        message: error.message,
        context: error.context
      });
    }
  }
}

main();
```

## 📊 Data Transformation

### Date/Time Handling

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithDateTransformation() {
  try {
    const vessels = await fetchVesselLocations({
      fetchMode: 'native',
      validate: true
    });
    
    // Transform data for easier use
    const transformedVessels = vessels.map(vessel => ({
      ...vessel,
      // WS-Dottie automatically converts .NET dates to JavaScript Date objects
      // But you can add additional transformations if needed
      lastUpdatedFormatted: vessel.LastUpdated 
        ? new Date(vessel.LastUpdated).toLocaleString() 
        : 'Unknown',
      speedKnots: vessel.Speed || 0,
      location: {
        lat: vessel.Latitude,
        lng: vessel.Longitude
      }
    }));
    
    return transformedVessels;
  } catch (error) {
    console.error('Error fetching vessels:', error.message);
    throw error;
  }
}
```

### Field Filtering

```javascript
import { fetchVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithFieldFiltering(fields = []) {
  try {
    const vessels = await fetchVesselLocations({
      fetchMode: 'native',
      validate: true
    });
    
    // Filter to only requested fields
    if (fields.length > 0) {
      return vessels.map(vessel => {
        const filtered = {};
        fields.forEach(field => {
          if (vessel[field] !== undefined) {
            filtered[field] = vessel[field];
          }
        });
        return filtered;
      });
    }
    
    return vessels;
  } catch (error) {
    console.error('Error fetching vessels:', error.message);
    throw error;
  }
}

// Usage
const minimalVessels = await fetchWithFieldFiltering([
  'VesselID', 
  'VesselName', 
  'Latitude', 
  'Longitude'
]);
```

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[CLI Usage Guide](./cli-usage.md)** - Command-line interface and debugging
- **[Error Handling Reference](./error-handling.md)** - WS-Dottie error types and recovery
