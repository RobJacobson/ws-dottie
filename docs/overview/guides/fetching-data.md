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

// Optional: Set log level
configManager.setLogLevel(process.env.LOG_LEVEL || 'info');
```

### 3. Basic Usage

```javascript
import { getVesselLocations, getHighwayAlerts } from 'ws-dottie/wsf-vessels/fetchFunctions';
import { getBorderCrossings } from 'ws-dottie/wsdot-border-crossings/fetchFunctions';

async function getTransportationData() {
  try {
    // Fetch vessel locations
    const vessels = await getVesselLocations({
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${vessels.length} vessels`);
    
    // Fetch highway alerts
    const alerts = await getHighwayAlerts({
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${alerts.length} alerts`);
    
    // Fetch border crossings
    const crossings = await getBorderCrossings({
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${crossings.length} border crossings`);
    
    return { vessels, alerts, crossings };
  } catch (error) {
    console.error('Error fetching transportation data:', error.message);
    throw error;
  }
}

// Run function
getTransportationData();
```

## 🏗️ Fetch Modes

WS-Dottie supports different fetch modes for different environments:

### Native Fetch (Server-side)

```javascript
// Native fetch for server-side applications
const vessels = await getVesselLocations({
  fetchMode: 'native',  // Default for Node.js
  validate: true
});
```

### JSONP (Browser)

```javascript
// JSONP for browser applications (CORS compatibility)
const vessels = await getVesselLocations({
  fetchMode: 'jsonp',   // Default for browser
  validate: true
});
```

## 🎯 Common Patterns

### Data Fetching with Parameters

```javascript
import { 
  getSchedulesByTripDateAndRouteId,
  getFareLineItemsByTripDateAndTerminals
} from 'ws-dottie/wsf-schedule/core';

async function getFerrySchedule(departingTerminalId, arrivingTerminalId, tripDate) {
  try {
    // Fetch schedules
    const schedules = await getSchedulesByTripDateAndRouteId({
      params: {
        TripDate: tripDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        RouteID: departingTerminalId
      },
      fetchMode: 'native',
      validate: true
    });
    
    // Fetch fares
    const fares = await getFareLineItemsByTripDateAndTerminals({
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
  const scheduleData = await getFerrySchedule(3, 7, new Date());
  
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
import { 
  getVesselLocations,
  getTerminalWaitTimes,
  getHighwayAlerts
} from 'ws-dottie/wsf-vessels/core';
import { getBorderCrossings } from 'ws-dottie/wsdot-border-crossings/core';

async function fetchBatchData() {
  try {
    // Fetch multiple data sources in parallel
    const [vessels, waitTimes, alerts, crossings] = await Promise.all([
      getVesselLocations({
        fetchMode: 'native',
        validate: true
      }),
      getTerminalWaitTimes({
        fetchMode: 'native',
        validate: true
      }),
      getHighwayAlerts({
        fetchMode: 'native',
        validate: true
      }),
      getBorderCrossings({
        fetchMode: 'native',
        validate: true
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

### Schema Validation

```javascript
import { getVesselLocations } from 'ws-dottie/wsf-vessels/core';

// Enable automatic validation
const vessels = await getVesselLocations({
  fetchMode: 'native',
  validate: true  // Validates response against Zod schema
});

// Disable validation (faster but less safe)
const vessels = await getVesselLocations({
  fetchMode: 'native',
  validate: false
});
```

### Custom Validation

```javascript
import { getVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithCustomValidation() {
  try {
    const vessels = await getVesselLocations({
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
import { getVesselLocations, getBorderCrossings } from 'ws-dottie/wsf-vessels/core';
import { ApiError } from 'ws-dottie';

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
          validate: true
        });
        
        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication errors
        if (error instanceof ApiError && error.status === 401) {
          throw error;
        }
        
        // Don't retry on client errors (4xx)
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
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
  
  async getVesselLocations() {
    try {
      return await this.fetchWithRetry(getVesselLocations);
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
    const vessels = await transportService.getVesselLocations();
    console.log(`Found ${vessels.length} vessels`);
  } catch (error) {
    console.error('Application error:', error.message);
    
    // Handle application-level error
    if (error instanceof ApiError) {
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
import { getVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithDateTransformation() {
  try {
    const vessels = await getVesselLocations({
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
import { getVesselLocations } from 'ws-dottie/wsf-vessels/core';

async function fetchWithFieldFiltering(fields = []) {
  try {
    const vessels = await getVesselLocations({
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
