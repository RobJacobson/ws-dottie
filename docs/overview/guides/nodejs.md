# Node.js Integration Guide

This guide covers best practices for integrating WS-Dottie with Node.js applications, including setup, patterns, and performance optimization.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](./getting-started.md) • [API Guide](./api-guide.md)

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
import { fetchDottie, getVesselLocations, getHighwayAlerts } from 'ws-dottie';

async function getTransportationData() {
  try {
    // Fetch vessel locations
    const vessels = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${vessels.length} vessels`);
    
    // Fetch highway alerts
    const alerts = await fetchDottie({
      endpoint: getHighwayAlerts,
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${alerts.length} alerts`);
    
    return { vessels, alerts };
  } catch (error) {
    console.error('Error fetching transportation data:', error.message);
    throw error;
  }
}

// Run function
getTransportationData();
```

## 🏗️ Architecture

### Server-Side Data Fetching

WS-Dottie uses native fetch for server-side applications:

```javascript
// WS-Dottie server-side fetch implementation
const fetchDottie = async ({ endpoint, fetchMode = 'native', validate = true }) => {
  // Build URL with parameters
  const url = buildUrl(endpoint, parameters);
  
  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
  };
  
  // Add API key if configured
  if (configManager.getApiKey()) {
    headers['Authorization'] = `Bearer ${configManager.getApiKey()}`;
  }
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      throw new WsdotApiError(
        `HTTP error: ${response.status} ${response.statusText}`,
        response.status,
        { url, endpoint }
      );
    }
    
    let data = await response.json();
    
    // Validate data if requested
    if (validate && endpoint.schema) {
      data = endpoint.schema.parse(data);
    }
    
    return data;
  } catch (error) {
    if (error instanceof WsdotApiError) {
      throw error;
    }
    
    throw new WsdotApiError(
      `Fetch error: ${error.message}`,
      0,
      { url, endpoint }
    );
  }
};
```

### Express.js Integration

```javascript
import express from 'express';
import { fetchDottie, getVesselLocations } from 'ws-dottie';

const app = express();
const port = process.env.PORT || 3000;

// Configure WS-Dottie
configManager.setApiKey(process.env.WSDOT_ACCESS_TOKEN);

// Middleware to set up CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// API endpoint for vessel locations
app.get('/api/vessels', async (req, res) => {
  try {
    const vessels = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
    
    res.json(vessels);
  } catch (error) {
    console.error('Error fetching vessels:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint for filtered vessel data
app.get('/api/vessels/:id', async (req, res) => {
  try {
    const vessels = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
    
    const vessel = vessels.find(v => v.VesselID === parseInt(req.params.id));
    
    if (!vessel) {
      return res.status(404).json({ error: 'Vessel not found' });
    }
    
    res.json(vessel);
  } catch (error) {
    console.error('Error fetching vessel:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## 🎯 Common Patterns

### Data Fetching with Parameters

```javascript
import { fetchDottie, getSchedules, getFares } from 'ws-dottie';

async function getFerrySchedule(departingTerminalId, arrivingTerminalId, tripDate) {
  try {
    // Fetch schedules
    const schedules = await fetchDottie({
      endpoint: getSchedules,
      parameters: {
        departingTerminalId,
        arrivingTerminalId,
        tripDate: tripDate.toISOString().split('T')[0] // Format as YYYY-MM-DD
      },
      fetchMode: 'native',
      validate: true
    });
    
    // Fetch fares
    const fares = await fetchDottie({
      endpoint: getFares,
      parameters: {
        tripDate: tripDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        departingTerminalId,
        arrivingTerminalId
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
import { fetchDottie, getVesselLocations, getTerminalWaitTimes, getHighwayAlerts } from 'ws-dottie';

async function fetchBatchData() {
  try {
    // Fetch multiple data sources in parallel
    const [vessels, waitTimes, alerts] = await Promise.all([
      fetchDottie({
        endpoint: getVesselLocations,
        fetchMode: 'native',
        validate: true
      }),
      fetchDottie({
        endpoint: getTerminalWaitTimes,
        fetchMode: 'native',
        validate: true
      }),
      fetchDottie({
        endpoint: getHighwayAlerts,
        fetchMode: 'native',
        validate: true
      })
    ]);
    
    return {
      vessels,
      waitTimes,
      alerts,
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
  console.log(`Last Updated: ${data.lastUpdated.toLocaleString()}`);
}

main();
```

## 🚨 Error Handling

### Structured Error Handling

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

class TransportationService {
  constructor() {
    this.retryConfig = {
      maxRetries: 3,
      baseDelay: 1000, // 1 second
      maxDelay: 10000, // 10 seconds
      backoffFactor: 2
    };
  }
  
  async fetchWithRetry(endpoint, parameters = {}) {
    let lastError;
    
    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        const data = await fetchDottie({
          endpoint,
          parameters,
          fetchMode: 'native',
          validate: true
        });
        
        return data;
      } catch (error) {
        lastError = error;
        
        // Don't retry on authentication errors
        if (error instanceof WsdotApiError && error.status === 401) {
          throw error;
        }
        
        // Don't retry on client errors (4xx)
        if (error instanceof WsdotApiError && error.status >= 400 && error.status < 500) {
          throw error;
        }
        
        // If this is the last attempt, throw error
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
    if (error instanceof WsdotApiError) {
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

## 📚 Next Steps

- **[TanStack Query Guide](./tanstack-query.md)** - TanStack Query integration and caching
- **[React Integration Guide](./react.md)** - React patterns with WS-Dottie hooks
- **[CLI Usage Guide](./cli.md)** - Command-line interface and debugging
- **[Error Handling Reference](../reference/error-handling.md)** - WS-Dottie error types and recovery
