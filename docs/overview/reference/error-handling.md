# Error Handling Reference

This guide covers error handling patterns and recovery strategies for WS-Dottie applications.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](../getting-started.md) • [API Guide](../api-guide.md)

## 🚨 Error Types

### WsdotApiError

WS-Dottie's primary error type for API-related issues:

```typescript
interface WsdotApiError extends Error {
  message: string;           // Human-readable error message
  status?: number;          // HTTP status code (if available)
  context?: {             // Additional error context
    endpoint: string;      // API endpoint that was called
    url: string;          // Full request URL
    timestamp: Date;      // When the error occurred
    requestId?: string;    // Request identifier for tracking
  };
}
```

### NetworkError

For network-related issues (connection timeouts, DNS failures, etc.):

```typescript
interface NetworkError extends Error {
  message: string;           // Description of the network issue
  code?: string;            // Error code (TIMEOUT, DNS_ERROR, etc.)
  context?: {             // Additional context
    url: string;          // URL that failed to load
    timestamp: Date;      // When the error occurred
  };
}
```

### ValidationError

For data validation issues (schema validation failures):

```typescript
interface ValidationError extends Error {
  message: string;           // Description of the validation issue
  field?: string;           // Field that failed validation
  value?: any;             // Value that failed validation
  context?: {             // Additional context
    endpoint: string;      // API endpoint that was called
    schema: string;       // Schema that failed validation
  };
}
```

## 🔄 Error Handling Patterns

### Try-Catch Pattern

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

async function fetchWithErrorHandling() {
  try {
    const data = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
    
    return data;
  } catch (error) {
    if (error instanceof WsdotApiError) {
      console.error('API Error:', error.message);
      console.error('Status:', error.status);
      console.error('Context:', error.context);
    } else {
      console.error('Unexpected Error:', error.message);
    }
    
    throw error;
  }
}
```

### Error Boundaries (React)

```javascript
import { Component } from 'react';
import { WsdotApiError } from 'ws-dottie';

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
          <details>
            <summary>Error Details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
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

### Async/Await Pattern

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

async function fetchWithAsyncAwait() {
  let vessels;
  
  try {
    vessels = await fetchDottie({
      endpoint: getVesselLocations,
      fetchMode: 'native',
      validate: true
    });
  } catch (error) {
    if (error instanceof WsdotApiError) {
      console.error('Failed to fetch vessels:', error.message);
      // Handle specific API error
      if (error.status === 401) {
        // Handle authentication error
        showAuthErrorDialog();
      } else if (error.status >= 500) {
        // Handle server error
        showServerErrorDialog();
      }
    } else {
      // Handle other errors
      showGenericErrorDialog();
    }
    
    // Return empty array as fallback
    return [];
  }
  
  return vessels;
}
```

## 🛠️ Recovery Strategies

### Retry Logic

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

class RetryableFetch {
  constructor() {
    this.maxRetries = 3;
    this.baseDelay = 1000; // 1 second
    this.maxDelay = 10000; // 10 seconds
    this.backoffFactor = 2;
  }
  
  async fetchWithRetry(endpoint, parameters = {}) {
    let lastError;
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
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
        if (attempt === this.maxRetries) {
          throw error;
        }
        
        // Calculate delay for next attempt
        const delay = Math.min(
          this.baseDelay * Math.pow(this.backoffFactor, attempt - 1),
          this.maxDelay
        );
        
        console.log(`Attempt ${attempt} failed, retrying in ${delay}ms`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  }
}

// Usage
const retryableFetch = new RetryableFetch();
const vessels = await retryableFetch.fetchWithRetry(getVesselLocations);
```

### Fallback Data

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

async function fetchWithFallback(endpoint, fallbackData = []) {
  try {
    const data = await fetchDottie({
      endpoint,
      fetchMode: 'native',
      validate: true
    });
    
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    
    // Return fallback data
    return fallbackData;
  }
}

// Usage
const vessels = await fetchWithFallback(getVesselLocations, [
  { VesselID: 1, VesselName: 'Fallback Vessel 1' },
  { VesselID: 2, VesselName: 'Fallback Vessel 2' }
]);
```

### Graceful Degradation

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

class GracefulDegradation {
  constructor() {
    this.isHealthy = true;
    this.lastHealthCheck = Date.now();
  }
  
  async checkHealth() {
    try {
      // Simple health check
      await fetchDottie({
        endpoint: getVesselLocations,
        fetchMode: 'native',
        validate: true
      });
      
      this.isHealthy = true;
      this.lastHealthCheck = Date.now();
    } catch (error) {
      console.error('Health check failed:', error.message);
      this.isHealthy = false;
    }
  }
  
  async fetchWithGracefulDegradation(endpoint, parameters = {}) {
    // Check if service is healthy
    if (this.isHealthy || Date.now() - this.lastHealthCheck > 60000) { // 1 minute
      try {
        return await fetchDottie({
          endpoint,
          parameters,
          fetchMode: 'native',
          validate: true
        });
      } catch (error) {
        console.error('API call failed:', error.message);
        throw error;
      }
    } else {
      // Service is unhealthy, return cached or fallback data
      console.warn('Service unhealthy, using fallback data');
      return this.getCachedOrFallbackData(endpoint);
    }
  }
  
  getCachedOrFallbackData(endpoint) {
    // Implementation depends on your caching strategy
    // This is a placeholder for the actual implementation
    return [];
  }
}

// Usage
const degradation = new GracefulDegradation();

// Periodic health check
setInterval(() => degradation.checkHealth(), 30000); // Every 30 seconds

// Fetch with graceful degradation
const vessels = await degradation.fetchWithGracefulDegradation(getVesselLocations);
```

## 📊 Error Monitoring

### Error Logging

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
```

### Error Metrics

```javascript
import { fetchDottie, WsdotApiError } from 'ws-dottie';

class ErrorMetrics {
  constructor() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      errorsByStatus: {},
      errorsByEndpoint: {},
      averageResponseTime: 0,
      lastReset: Date.now()
    };
  }
  
  recordRequest(endpoint, startTime, endTime, success, error = null) {
    this.metrics.totalRequests++;
    
    if (success) {
      this.metrics.successfulRequests++;
    } else {
      this.metrics.failedRequests++;
      
      if (error instanceof WsdotApiError && error.status) {
        const status = error.status.toString();
        this.metrics.errorsByStatus[status] = (this.metrics.errorsByStatus[status] || 0) + 1;
      }
      
      if (error instanceof WsdotApiError && error.context?.endpoint) {
        const endpointName = error.context.endpoint;
        this.metrics.errorsByEndpoint[endpointName] = (this.metrics.errorsByEndpoint[endpointName] || 0) + 1;
      }
    }
    
    const responseTime = endTime - startTime;
    this.metrics.averageResponseTime = (
      (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + responseTime) / 
      this.metrics.totalRequests
    );
  }
  
  getMetrics() {
    const successRate = this.metrics.totalRequests > 0 
      ? (this.metrics.successfulRequests / this.metrics.totalRequests * 100).toFixed(2) + '%'
      : '0%';
    
    return {
      ...this.metrics,
      successRate,
      errorRate: (100 - parseFloat(successRate)).toFixed(2) + '%'
    };
  }
  
  reset() {
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      errorsByStatus: {},
      errorsByEndpoint: {},
      averageResponseTime: 0,
      lastReset: Date.now()
    };
  }
}

// Usage
const errorMetrics = new ErrorMetrics();

// Wrap fetch function to record metrics
async function fetchWithMetrics(endpoint, parameters = {}) {
  const startTime = Date.now();
  
  try {
    const data = await fetchDottie({
      endpoint,
      parameters,
      fetchMode: 'native',
      validate: true
    });
    
    errorMetrics.recordRequest(endpoint, startTime, Date.now(), true);
    return data;
  } catch (error) {
    errorMetrics.recordRequest(endpoint, startTime, Date.now(), false, error);
    throw error;
  }
}

// Usage
const vessels = await fetchWithMetrics(getVesselLocations);
console.log('Current metrics:', errorMetrics.getMetrics());
```

## 📚 Next Steps

- **[React Integration Guide](../guides/react-integration.md)** - React patterns with TanStack Query
- **[Node.js Integration Guide](../guides/nodejs-integration.md)** - Server-side usage patterns
- **[CLI Usage Guide](../guides/cli-usage.md)** - Command-line interface and debugging
- **[Caching Reference](../reference/caching.md)** - Performance optimization strategies
- **[Type Safety Reference](../reference/type-safety.md)** - TypeScript integration and Zod validation
