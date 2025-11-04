# Node.js Integration Guide

This guide covers best practices for integrating WS-Dottie with Node.js applications, including setup, patterns, and performance optimization.

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

// Run the function
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

### Streaming Responses

```javascript
import { fetchDottie, getVesselLocations } from 'ws-dottie';

async function* streamVesselLocations() {
  try {
    const response = await fetch(buildUrl(getVesselLocations), {
      headers: {
        'Authorization': `Bearer ${configManager.getApiKey()}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      
      // Process each chunk as it arrives
      const vessels = JSON.parse(chunk);
      
      for (const vessel of vessels) {
        yield vessel;
      }
    }
  } catch (error) {
    console.error('Error streaming vessel locations:', error.message);
    throw error;
  }
}

// Usage
async function main() {
  console.log('Streaming vessel locations:');
  
  for await (const vessel of streamVesselLocations()) {
    console.log(`${vessel.VesselName}: ${vessel.Latitude}, ${vessel.Longitude}`);
  }
}

main();
```

## 🔄 State Management

### In-Memory Cache

```javascript
import { fetchDottie, getVesselLocations } from 'ws-dottie';

class TransportationCache {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map(); // Time to live for each cache entry
  }
  
  // Get data from cache
  async get(key, fetchFunction, ttlMs = 5 * 60 * 1000) { // Default 5 minutes
    // Check if data exists and is not expired
    if (this.cache.has(key)) {
      const entry = this.cache.get(key);
      
      if (Date.now() - entry.timestamp < this.ttl.get(key)) {
        return entry.data;
      }
    }
    
    // Fetch fresh data
    const data = await fetchFunction();
    
    // Update cache
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
    
    this.ttl.set(key, Date.now() + ttlMs);
    
    return data;
  }
  
  // Invalidate cache entry
  invalidate(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }
  
  // Clear all cache
  clear() {
    this.cache.clear();
    this.ttl.clear();
  }
}

// Usage
const transportCache = new TransportationCache();

async function getCachedVessels() {
  return transportCache.get(
    'vessels',
    () => fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    }),
    2 * 60 * 1000 // 2 minutes TTL
  );
}

async function main() {
  const vessels = await getCachedVessels();
  console.log(`Found ${vessels.length} vessels`);
}

main();
```

### Redis Cache

```javascript
import Redis from 'ioredis';
import { fetchDottie, getVesselLocations } from 'ws-dottie';

class RedisTransportationCache {
  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
    });
  }
  
  // Get data from cache
  async get(key, fetchFunction, ttlSeconds = 300) { // Default 5 minutes
    try {
      // Check cache first
      const cached = await this.redis.get(key);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        
        // Return cached data if not expired
        if (Date.now() - timestamp < ttlSeconds * 1000) {
          return data;
        }
      }
      
      // Fetch fresh data
      const data = await fetchFunction();
      
      // Update cache
      await this.redis.setex(
        key,
        ttlSeconds,
        JSON.stringify({
          data,
          timestamp: Date.now()
        })
      );
      
      return data;
    } catch (error) {
      console.error('Redis cache error:', error);
      
      // Fallback to fetching without cache
      return fetchFunction();
    }
  }
  
  // Invalidate cache entry
  async invalidate(key) {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Redis invalidate error:', error);
    }
  }
  
  // Clear all cache
  async clear() {
    try {
      await this.redis.flushall();
    } catch (error) {
      console.error('Redis clear error:', error);
    }
  }
}

// Usage
const redisCache = new RedisTransportationCache();

async function getCachedVessels() {
  return redisCache.get(
    'vessels',
    () => fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    }),
    60 // 1 minute TTL for real-time data
  );
}

async function main() {
  const vessels = await getCachedVessels();
  console.log(`Found ${vessels.length} vessels`);
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
        
        // If this is the last attempt, throw the error
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

### Error Logging and Monitoring

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

class ErrorLogger {
  constructor() {
    this.errors = [];
  }
  
  log(error, context = {}) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      context,
      ...(error instanceof WsdotApiError && {
        status: error.status,
        endpoint: error.context?.endpoint,
        url: error.context?.url
      })
    };
    
    this.errors.push(errorEntry);
    
    // Log to console
    console.error('Transportation Error:', errorEntry);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorEntry);
    }
  }
  
  sendToErrorService(errorEntry) {
    // Implementation depends on your error tracking service
    // Example with a generic HTTP service
    fetch(process.env.ERROR_TRACKING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(errorEntry)
    }).catch(err => {
      console.error('Failed to send error to tracking service:', err);
    });
  }
  
  getErrorSummary() {
    const errorCounts = this.errors.reduce((acc, error) => {
      const key = error.message || 'Unknown error';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total: this.errors.length,
      byMessage: errorCounts,
      recent: this.errors.slice(-10) // Last 10 errors
    };
  }
}

// Usage with error handling wrapper
const errorLogger = new ErrorLogger();

async function withErrorHandling(fn, context = {}) {
  try {
    return await fn();
  } catch (error) {
    errorLogger.log(error, context);
    throw error;
  }
}

// Usage
async function main() {
  await withErrorHandling(async () => {
    const vessels = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
    
    console.log(`Found ${vessels.length} vessels`);
  }, { operation: 'fetchVessels' });
  
  // Print error summary
  console.log('Error Summary:', errorLogger.getErrorSummary());
}

main();
```

## ⚡ Performance Optimization

### Connection Pooling

```javascript
import https from 'https';
import { fetchDottie, getVesselLocations } from 'ws-dottie';

class ConnectionPool {
  constructor(maxConnections = 10) {
    this.maxConnections = maxConnections;
    this.connections = [];
    this.waiting = [];
  }
  
  // Get a connection from the pool
  getConnection() {
    // Return an existing connection if available
    if (this.connections.length > 0) {
      return this.connections.pop();
    }
    
    // Create a new connection if under limit
    if (this.connections.length + this.waiting.length < this.maxConnections) {
      return https.request();
    }
    
    // Add to waiting queue
    return new Promise((resolve) => {
      this.waiting.push(resolve);
    });
  }
  
  // Return a connection to the pool
  releaseConnection(connection) {
    // Resolve next waiting request
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve(connection);
      return;
    }
    
    // Add back to pool if under limit
    if (this.connections.length < this.maxConnections) {
      this.connections.push(connection);
    } else {
      connection.end();
    }
  }
}

// Custom fetch with connection pooling
const connectionPool = new ConnectionPool();

async function pooledFetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const connection = connectionPool.getConnection();
    
    connection.on('response', (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          connectionPool.releaseConnection(connection);
          resolve(parsedData);
        } catch (error) {
          connectionPool.releaseConnection(connection);
          reject(error);
        }
      });
    });
    
    connection.on('error', (error) => {
      connectionPool.releaseConnection(connection);
      reject(error);
    });
    
    connection.end(url);
  });
}

// Usage
async function getVesselsWithPooling() {
  try {
    const vessels = await pooledFetch(buildUrl(getVesselLocations), {
      headers: {
        'Authorization': `Bearer ${configManager.getApiKey()}`
      }
    });
    
    return vessels;
  } catch (error) {
    console.error('Error with pooled fetch:', error.message);
    throw error;
  }
}
```

### Data Compression

```javascript
import { fetchDottie, getVesselLocations } from 'ws-dottie';
import { createGzip, gunzip } from 'zlib';

async function fetchCompressed(endpoint, parameters = {}) {
  const url = buildUrl(endpoint, parameters);
  
  return new Promise((resolve, reject) => {
    const request = https.request(url, {
      headers: {
        'Authorization': `Bearer ${configManager.getApiKey()}`,
        'Accept-Encoding': 'gzip',
        'Content-Type': 'application/json'
      }
    });
    
    request.on('response', (response) => {
      const chunks = [];
      
      response.on('data', (chunk) => {
        if (response.headers['content-encoding'] === 'gzip') {
          chunks.push(chunk);
        } else {
          chunks.push(chunk);
        }
      });
      
      response.on('end', () => {
        try {
          let data;
          
          if (response.headers['content-encoding'] === 'gzip') {
            const buffer = Buffer.concat(chunks);
            gunzip(buffer, (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              
              resolve(JSON.parse(result.toString()));
            });
          } else {
            data = Buffer.concat(chunks).toString();
            resolve(JSON.parse(data));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    
    request.on('error', reject);
    request.end();
  });
}

// Usage
async function getCompressedVessels() {
  try {
    const vessels = await fetchCompressed(getVesselLocations);
    console.log(`Found ${vessels.length} vessels`);
    return vessels;
  } catch (error) {
    console.error('Error fetching compressed vessels:', error.message);
    throw error;
  }
}
```

## 📚 Next Steps

- **[React Integration Guide](./react-integration.md)** - React patterns with TanStack Query
- **[CLI Usage Guide](./cli-usage.md)** - Command-line interface and debugging
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
- **[Type Safety Reference](../reference/type-safety.md)** - TypeScript integration and Zod validation
