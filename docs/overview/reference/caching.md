# Caching Reference

This guide covers caching strategies and performance optimization techniques for WS-Dottie applications.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🔄 Caching Overview

WS-Dottie implements intelligent caching strategies to optimize performance and reduce API calls. Different data types require different caching approaches based on their update frequencies.

### Caching Strategies

| Strategy | Stale Time | Refetch Interval | GC Time | Use Cases |
|-----------|--------------|------------------|----------|------------|
| `REALTIME_UPDATES` | 5s | 5s | 1h | Vessel locations, traffic alerts |
| `MINUTE_UPDATES` | 1m | 1m | 1h | Terminal wait times, traffic flow |
| `HOURLY_UPDATES` | 1h | 1h | 4h | Weather conditions, road status |
| `DAILY_UPDATES` | 1d | 1d | 2d | Schedules, fares |
| `WEEKLY_UPDATES` | 1w | false | 2w | Terminal info, vessel specs |

## 🚀 React Integration

### TanStack Query Configuration

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useVesselLocations, tanstackQueryOptions } from 'ws-dottie';

// Create a client with optimized defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Global cache configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Retry on network errors, not on 4xx client errors
        if (error.status >= 500) return failureCount < 3;
        return false;
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransportationApp />
    </QueryClientProvider>
  );
}

// Use optimized caching for real-time data
function RealTimeVesselTracker() {
  const { data: vessels } = useVesselLocations({
    // Use real-time strategy for vessel locations
    ...tanstackQueryOptions.REALTIME_UPDATES,
    // Override for specific needs
    refetchInterval: 10 * 1000, // 10 seconds instead of 5
  });
  
  return <VesselMap vessels={vessels} />;
}
```

### Selective Data Fetching

```javascript
import { useState, useEffect } from 'react';
import { useVesselLocations, useTerminalWaitTimes } from 'ws-dottie';

function FerryDashboard() {
  const [selectedVesselId, setSelectedVesselId] = useState(null);
  
  // Always fetch vessel locations (real-time data)
  const { data: vessels } = useVesselLocations();
  
  // Only fetch terminal wait times when needed
  const { data: waitTimes } = useTerminalWaitTimes({
    enabled: !!selectedVesselId, // Only fetch when vessel is selected
  });
  
  const selectedVessel = vessels?.find(v => v.VesselID === selectedVesselId);
  const selectedTerminalWaitTime = waitTimes?.find(t => 
    t.TerminalID === selectedVessel?.DestinationTerminalID
  );
  
  return (
    <div>
      <h1>Ferry Dashboard</h1>
      
      <VesselList 
        vessels={vessels} 
        onSelectVessel={setSelectedVesselId}
      />
      
      {selectedVessel && (
        <VesselDetails 
          vessel={selectedVessel}
          terminalWaitTime={selectedTerminalWaitTime?.WaitTime || 0}
        />
      )}
    </div>
  );
}
```

## 🖥️ Node.js Integration

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
```

## 📊 Performance Optimization

### Request Deduplication

```javascript
import { fetchDottie, getVesselLocations } from 'ws-dottie';

// Deduplicate identical requests
const requestCache = new Map();

async function deduplicatedFetch(endpoint, parameters = {}) {
  const cacheKey = JSON.stringify({ endpoint: endpoint.name, parameters });
  
  // Check if request is already in progress
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey);
  }
  
  // Create new request
  const requestPromise = fetchDottie({
    endpoint,
    parameters,
    fetchMode: 'native',
    validate: true
  });
  
  // Store in cache
  requestCache.set(cacheKey, requestPromise);
  
  // Clean up when request completes
  requestPromise.finally(() => {
    requestCache.delete(cacheKey);
  });
  
  return requestPromise;
}

// Usage in React component
function VesselList() {
  const [vessels, setVessels] = useState([]);
  
  useEffect(() => {
    const fetchVessels = async () => {
      const data = await deduplicatedFetch(getVesselLocations);
      setVessels(data);
    };
    
    fetchVessels();
  }, []);
  
  return <VesselGrid vessels={vessels} />;
}
```

### Batch Processing

```javascript
import { fetchDottie, getVesselLocations, getTerminalWaitTimes } from 'ws-dottie';

// Process multiple vessel history requests in parallel
async function getVesselHistoryBatch(vesselIds) {
  // Create individual requests
  const requests = vesselIds.map(vesselId => 
    fetchDottie({
      endpoint: getVesselHistory,
      parameters: { vesselId },
      fetchMode: 'native',
      validate: true
    })
  );
  
  // Execute all requests in parallel
  const results = await Promise.allSettled(requests);
  
  // Process results
  const vesselHistory = new Map();
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      vesselHistory.set(vesselIds[index], result.value);
    } else {
      console.error(`Failed to fetch history for vessel ${vesselIds[index]}:`, result.reason);
    }
  });
  
  return vesselHistory;
}

// Usage
async function main() {
  const vesselIds = [18, 19, 20, 21];
  const vesselHistory = await getVesselHistoryBatch(vesselIds);
  
  console.log('Fetched vessel history for', vesselIds.length, 'vessels');
  
  vesselHistory.forEach((history, vesselId) => {
    console.log(`Vessel ${vesselId}:`, history.length, 'history entries');
  });
}

main();
```

### Connection Pooling

```javascript
import https from 'https';
import { fetchDottie, getVesselLocations } from 'ws-dottie';

// Create a custom agent for connection pooling
const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
  timeout: 30000 // 30 seconds
});

// Custom fetch function with connection pooling
async function fetchWithPool(url, options = {}) {
  return fetchDottie({
    endpoint: getVesselLocations,
    fetchMode: 'native',
    validate: true,
    // Use custom agent for connection pooling
    agent: httpsAgent
  });
}

// Usage in high-volume scenarios
const vessels = await fetchWithPool('https://api.wsdot.wa.gov/ferries/api/vesselsrest');
```

## 🎯 Best Practices

### 1. Choose Appropriate Caching Strategy

```javascript
import { useVesselLocations, useTerminalWaitTimes, useSchedules } from 'ws-dottie';

function FerryApp() {
  // Real-time data for live tracking
  const { data: vessels } = useVesselLocations(); // Uses REALTIME_UPDATES
  
  // Frequent updates for wait times
  const { data: waitTimes } = useTerminalWaitTimes(); // Uses MINUTE_UPDATES
  
  // Daily updates for schedules
  const { data: schedules } = useSchedules({ 
    tripDate: new Date()
  }); // Uses DAILY_UPDATES
  
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}
```

### 2. Implement Cache Invalidation

```javascript
import { useQueryClient } from '@tanstack/react-query';
import { useVesselLocations } from 'ws-dottie';

function FerryDashboard() {
  const queryClient = useQueryClient();
  
  const { data: vessels } = useVesselLocations();
  
  // Create mutation to invalidate cache
  const refreshVessels = useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries(['vesselLocations']);
    },
  });
  
  return (
    <div>
      <h1>Vessel Dashboard</h1>
      
      <button onClick={() => refreshVessels.mutate()}>
        Refresh Vessel Data
      </button>
      
      {vessels?.map(vessel => (
        <div key={vessel.VesselID}>
          <h3>{vessel.VesselName}</h3>
          <p>Speed: {vessel.Speed} knots</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. Optimize for Mobile

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

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[CLI Usage Guide](../guides/cli-usage.md)** - Command-line interface and debugging
- **[Error Handling Reference](../reference/error-handling.md)** - Error recovery patterns
- **[Type Safety Reference](../reference/type-safety.md)** - TypeScript integration and Zod validation
