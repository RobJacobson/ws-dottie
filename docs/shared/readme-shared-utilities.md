# WSDOT API Client Shared Utilities

Shared utilities and configuration for the WSDOT API client library, providing core fetch functionality, data transformation, caching, and platform-specific implementations.

## Overview

This module provides the foundational infrastructure for all WSDOT API interactions, including:
- Platform-agnostic fetch utilities with unified `createFetchFunction` approach
- Automatic data transformation and date parsing
- Error handling and logging
- Configuration management
- React Query caching strategies
- Type-safe URL building

> **Note**: The fetch functions described in this documentation are internal implementation details. For normal usage, use the public API functions exported from the main library (e.g., `WsfVessels.getVesselLocations()`).

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Modules   │    │   Shared Utils  │    │   Platform      │
│   (WSF/WSDOT)   │◄──►│   (Fetch/Utils) │◄──►│   (Web/Mobile)  │
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

#### `createFetchFunction(baseUrl: string)`
Creates a module-scoped fetch function for a specific API endpoint with automatic transformation.

```typescript
// Module-scoped fetch function for WSF vessels API
const fetchVessels = createFetchFunction(
  "https://www.wsdot.wa.gov/ferries/api/vessels/rest"
);

// Usage in API functions
export const getVesselLocations = (): Promise<VesselLocation[]> =>
  fetchVessels<VesselLocation[]>("/vessellocations");
```

**Features:**
- Automatic date parsing and data transformation
- Platform-specific fetch implementation (JSONP for web, native fetch for Node.js)
- Comprehensive error handling
- Type-safe responses
- Module-scoped configuration for better organization

#### `fetchInternal(url: string, options?: FetchOptions)`
Platform-specific fetch implementation with comprehensive error handling.

**Features:**
- Web: JSONP implementation for CORS bypass
- Mobile: Native fetch with error handling
- Automatic fallback between platforms
- Structured error responses

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
- **PascalCase preservation** - Maintains original API key casing
- **Field filtering** - Automatically removes unreliable and undocumented fields
- **Error handling** - Graceful fallback for invalid dates

**Field Filtering:**
The JSON reviver automatically filters out unreliable and undocumented fields to improve data quality and reduce memory usage:

- **VesselWatch Fields**: The following fields are automatically removed from VesselLocation responses as they are unreliable and undocumented:
  - `VesselWatchShutID`
  - `VesselWatchShutMsg`
  - `VesselWatchShutFlag`
  - `VesselWatchStatus`
  - `VesselWatchMsg`

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

## React Query Integration

### Caching Configuration

#### `createInfrequentUpdateOptions()`
Default options for static or infrequently updated data:

```typescript
const options = createInfrequentUpdateOptions();
// Returns: { staleTime: 5 * 60 * 1000, refetchInterval: 10 * 60 * 1000 }
```

#### `createFrequentUpdateOptions()`
Default options for real-time or frequently updated data:

```typescript
const options = createFrequentUpdateOptions();
// Returns: { staleTime: 30 * 1000, refetchInterval: 60 * 1000 }
```

### Usage Pattern
```typescript
import { useQuery } from '@tanstack/react-query';
import { createInfrequentUpdateOptions } from '@/shared/caching/config';

// For static data (terminals, vessels, fares)
const { data } = useQuery({
  queryKey: ['terminals'],
  queryFn: getTerminals,
  ...createInfrequentUpdateOptions(),
});

// For real-time data (vessel locations, sailing space)
const { data } = useQuery({
  queryKey: ['vesselLocations'],
  queryFn: getVesselLocations,
  ...createFrequentUpdateOptions(),
});

// Conditional queries - set enabled before spread
const { data } = useQuery({
  queryKey: ['terminal', terminalId],
  queryFn: () => getTerminalById(terminalId),
  enabled: !!terminalId, // conditional logic
  ...createInfrequentUpdateOptions(), // spread at end
});
```

## Platform Support

### Web Platform
- **JSONP Implementation**: Bypasses CORS restrictions
  - **WSDOT APIs**: Uses separate JSONP endpoints (e.g., `GetAlertsAsJsonp`)
  - **WSF APIs**: Uses regular endpoints with callback parameter
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

### Base URLs
```typescript
// Base URLs for different API categories
const API_BASES = {
  vessels: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  terminals: "https://www.wsdot.wa.gov/ferries/api/terminals/rest", 
  schedule: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  fares: "https://www.wsdot.wa.gov/ferries/api/fares/rest"
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
- **Graceful Degradation**: Return empty arrays on failure
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
// Logging is handled automatically by the fetch functions
// Debug information is available in development mode
// Error logging is automatic for all API calls
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

### Module-Scoped Fetch Functions
```typescript
import { createFetchFunction } from '@/shared/fetching/fetchApi';

// Create module-scoped fetch function for WSF vessels API
const fetchVessels = createFetchFunction(
  "https://www.wsdot.wa.gov/ferries/api/vessels/rest"
);

// API functions using the module-scoped fetch
export const getVesselLocations = (): Promise<VesselLocation[]> =>
  fetchVessels<VesselLocation[]>("/vessellocations");

export const getVesselBasics = (): Promise<VesselBasic[]> =>
  fetchVessels<VesselBasic[]>("/vesselbasics");
```

### Direct API Usage
```typescript
import { WsfVessels } from 'ws-dottie';

// Use the public API functions
const vessels = await WsfVessels.getVesselLocations();
const basics = await WsfVessels.getVesselBasics();
```

### Error Handling
```typescript
import { WsfVessels } from 'ws-dottie';

try {
  const vessels = await WsfVessels.getVesselLocations();
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