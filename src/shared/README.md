# WSF Shared Utilities

Shared utilities and configuration for the WSF (Washington State Ferries) data layer, providing core fetch functionality, data transformation, and platform-specific implementations.

## Overview

This module provides the foundational infrastructure for all WSF API interactions, including:
- Platform-agnostic fetch utilities
- Automatic data transformation and date parsing
- Error handling and logging
- Configuration management

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Modules   │    │   Shared Utils  │    │   Platform      │
│   (Vessels/etc) │◄──►│   (Fetch/Utils) │◄──►│   (Web/Mobile)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Query   │    │   Transform     │    │   Fetch Layer   │
│   (Cache/State) │    │   (Date/Data)   │    │   (Implementation)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Core Functions

### Fetch Functions

#### `fetchWsf<T>(path: string, options?: FetchOptions)`
Main fetch function for WSF APIs with automatic transformation.

```typescript
const vessels = await fetchWsf<VesselLocation[]>('/vessels/vessellocations');
```

**Features:**
- Automatic date parsing and data transformation
- Platform-specific fetch implementation
- Comprehensive error handling
- Type-safe responses

#### `fetchWsfArray<T>(path: string, options?: FetchOptions)`
Convenience function for fetching arrays with proper typing.

```typescript
const routes = await fetchWsfArray<Route>('/schedule/routes');
```

**Features:**
- Ensures array return type
- Handles empty responses gracefully
- Same transformation and error handling as `fetchWsf`

#### `fetchInternal(url: string, options?: FetchOptions)`
Platform-specific fetch implementation with comprehensive error handling.

**Features:**
- Web: JSONP implementation for CORS bypass
- Mobile: Native fetch with error handling
- Automatic fallback between platforms
- Structured error responses

### Data Transformation

#### `transformWsfData(data: JsonValue): JsonX`
Automatically transforms WSF API responses with date parsing and key conversion.

**Type System:**
- **`JsonValue`**: Input type representing JSON-like data that can be transformed
- **`JsonX`**: Output type with Date objects and camelCase keys
- **`TransformedJson`**: Generic type for transformed JSON objects
- **`TransformedJsonArray`**: Generic type for transformed JSON arrays

**Supported Date Formats:**
1. **`/Date(timestamp)/`** - WSF timestamp format
2. **`YYYY-MM-DD`** - ISO date format  
3. **`MM/DD/YYYY`** - US date format

**Transformation Features:**
- **Pattern-based detection** - No need to maintain field name lists
- **Robust validation** - Ensures dates are valid before conversion
- **Recursive processing** - Handles nested objects and arrays
- **CamelCase conversion** - Converts PascalCase keys to camelCase
- **Error handling** - Graceful fallback for invalid dates

#### Example Transformation
```typescript
// Input from WSF API
{
  "LastUpdate": "/Date(1703123456789)/",
  "DepartureTime": "2023-12-21T14:30:00",
  "VesselName": "Walla Walla",
  "RouteId": 1
}

// Output after transformation
{
  "lastUpdate": Date(2023-12-21T14:30:56.789Z),
  "departureTime": Date(2023-12-21T14:30:00.000Z),
  "vesselName": "Walla Walla",
  "routeId": 1
}
```

### URL Building

#### `buildWsfUrl(path: string, params?: Record<string, string | number | Date>): string`
Builds WSF API URLs with parameter substitution and date formatting.

```typescript
// Basic URL
const url = buildWsfUrl('/vessels/vessellocations');
// → "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vessellocations"

// With parameters
const url = buildWsfUrl('/schedule/routes', { 
  date: new Date('2023-12-21'),
  terminalId: 1 
});
// → "https://www.wsdot.wa.gov/ferries/api/schedule/rest/routes?date=2023-12-21&terminalId=1"
```

**Features:**
- Automatic date formatting to `YYYY-MM-DD`
- Parameter encoding and validation
- Base URL configuration
- Type-safe parameter handling

## Platform Support

### Web Platform
- **JSONP Implementation**: Bypasses CORS restrictions
- **Error Handling**: Comprehensive error detection and recovery
- **Fallback Support**: Graceful degradation when JSONP fails

### Mobile Platform
- **Native Fetch**: Uses platform-native fetch implementation
- **Network Monitoring**: Automatic retry and error recovery
- **Performance Optimization**: Efficient resource usage

### Cross-Platform Features
- **Automatic Detection**: Platform-specific implementation selection
- **Consistent API**: Same interface across all platforms
- **Error Handling**: Unified error handling regardless of platform

## Type System

### Core Types

#### `JsonValue`
Represents JSON-like data that can be transformed:
```typescript
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
```

#### `JsonX`
Represents transformed data with Date objects and camelCase keys:
```typescript
type JsonX =
  | string
  | number
  | boolean
  | null
  | Date
  | JsonX[]
  | { [key: string]: JsonX };
```

#### `TransformedJson`
Generic type for transformed JSON objects:
```typescript
type TransformedJson = { [key: string]: JsonX };
```

#### `TransformedJsonArray`
Generic type for transformed JSON arrays:
```typescript
type TransformedJsonArray = JsonX[];
```

### Usage in Tests
For testing purposes, use `Record<string, any>` for objects and `Record<string, any>[]` for arrays:

```typescript
// Test object transformation
const result = transformWsfData(input) as Record<string, any>;
expect(result.lastUpdate).toBeInstanceOf(Date);

// Test array transformation
const result = transformWsfData(input) as Record<string, any>[];
expect(result[0].vesselId).toBe(1);
```

## Configuration
```typescript
// Base URLs for different API categories
const API_BASES = {
  vessels: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  terminals: "https://www.wsdot.wa.gov/ferries/api/terminals/rest", 
  schedule: "https://www.wsdot.wa.gov/ferries/api/schedule/rest"
} as const;

// Access token configuration
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN;
```

### Fetch Options
```typescript
type FetchOptions = {
  timeout?: number;           // Request timeout in milliseconds
  retries?: number;           // Number of retry attempts
  retryDelay?: number;        // Delay between retries
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
};
```

## Error Handling

### Error Types
- **Network Errors**: Connection failures, timeouts
- **API Errors**: HTTP error responses, invalid data
- **Transformation Errors**: Date parsing failures, type mismatches
- **Platform Errors**: Platform-specific implementation failures

### Error Recovery
- **Automatic Retry**: Exponential backoff for transient failures
- **Graceful Degradation**: Return null/empty arrays on failure
- **User Feedback**: Structured error messages for debugging
- **Logging**: Configurable error logging levels

### Error Response Format
```typescript
type FetchError = {
  message: string;
  status?: number;
  url?: string;
  timestamp: Date;
  retryCount: number;
};
```

## Logging

### Log Levels
- **Debug**: Detailed request/response information
- **Info**: General API interaction logging
- **Warn**: Non-critical issues and warnings
- **Error**: Error conditions and failures

### Logging Configuration
```typescript
// Enable debug logging for specific endpoints
const options: FetchOptions = {
  logLevel: 'debug',
  timeout: 10000
};

const data = await fetchWsf('/vessels/vessellocations', options);
```

## Performance Optimizations

### Caching Strategy
- **Request Deduplication**: Prevents duplicate requests
- **Response Caching**: Efficient memory usage
- **Background Updates**: Non-blocking data refresh

### Network Optimization
- **Connection Pooling**: Efficient resource usage
- **Request Batching**: Reduce API call frequency
- **Compression**: Minimize bandwidth usage

### Memory Management
- **Efficient Data Structures**: Optimized for large datasets
- **Garbage Collection**: Automatic cleanup of unused resources
- **Memory Monitoring**: Performance tracking and optimization

## Usage Examples

### Basic API Call
```typescript
import { fetchWsf } from '@/data/wsf/shared';

// Fetch vessel locations
const vessels = await fetchWsf<VesselLocation[]>('/vessels/vessellocations');

// Fetch with options
const routes = await fetchWsf<Route[]>('/schedule/routes', {
  timeout: 5000,
  retries: 3,
  logLevel: 'debug'
});
```

### URL Building with Parameters
```typescript
import { buildWsfUrl } from '@/data/wsf/shared';

// Build URL with date parameter
const url = buildWsfUrl('/schedule/routes', {
  date: new Date('2023-12-21'),
  terminalId: 1
});

// Use in fetch
const routes = await fetchWsf<Route[]>(url);
```

### Error Handling
```typescript
import { fetchWsf } from '@/data/wsf/shared';

try {
  const vessels = await fetchWsf<VesselLocation[]>('/vessels/vessellocations');
  return vessels || [];
} catch (error) {
  console.error('Failed to fetch vessels:', error);
  return []; // Graceful fallback
}
```

## Development Tools

### Debugging
- **Network Monitoring**: Track API requests and responses
- **Error Inspection**: Detailed error information and stack traces
- **Performance Profiling**: Monitor fetch performance and timing

### Testing
- **Mock Implementation**: Test with simulated API responses
- **Error Simulation**: Test error handling and recovery
- **Performance Testing**: Load testing and optimization

## Future Enhancements

### Planned Features
- **Request Interceptors**: Pre-request data transformation
- **Response Caching**: More sophisticated caching strategies
- **Batch Operations**: Reduce API call frequency
- **WebSocket Support**: Real-time data updates

### API Improvements
- **GraphQL Integration**: More efficient data fetching
- **Compression Support**: Reduce bandwidth usage
- **Rate Limiting**: Respectful API usage patterns
- **Advanced Retry Logic**: More sophisticated retry strategies 