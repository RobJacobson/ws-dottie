# WS-Dottie Architecture

This document provides an overview of WS-Dottie's architecture, design principles, and technical implementation details.

## 🏗️ System Overview

WS-Dottie is a TypeScript library that provides unified access to Washington State transportation data from WSDOT and WSF APIs. It abstracts away the complexity of working with multiple government APIs while providing type safety, performance optimization, and environment-agnostic operation.

### Core Components

```
┌─────────────────────────────────────────────────────────────────────┐
│                        WS-Dottie Library                        │
├─────────────────────────────────────────────────────────────────────┤
│  API Modules    │  React Hooks  │  Utilities & Config  │
│  (16 APIs)     │  (TanStack)    │  (Type Safety, etc.) │
├─────────────────────────────────────────────────────────────────────┤
│                    Data Access Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   WSDOT    │  │     WSF     │  │  Validation  │  │
│  │   APIs      │  │    APIs      │  │   & Types    │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
├─────────────────────────────────────────────────────────────────────┤
│                    Transport Layer                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │   Native    │  │    JSONP    │  │    CLI      │  │
│  │   Fetch     │  │  (Browser)   │  │  Interface  │  │
│  └─────────────┘  └─────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Request Processing

1. **API Call Initiation**
   - User calls API function or React hook
   - Parameters validated against TypeScript types
   - Configuration checked (API key, base URL)

2. **Transport Selection**
   - Server-side: Native fetch with proper headers
   - Browser: JSONP with callback handling
   - CLI: Native fetch with formatted output

3. **Data Fetching**
   - HTTP request to appropriate WSDOT/WSF endpoint
   - Error handling for network issues
   - Response parsing and validation

4. **Data Processing**
   - Zod schema validation
   - Date/time conversion (.NET format → JavaScript Date)
   - Type inference and safety

5. **Response Delivery**
   - Typed response to user
   - Cache storage (if using React hooks)
   - Error propagation with context

### Error Handling Flow

```
API Request → Network Error → Retry Logic → Error Context → User
                ↓
        API Error → Status Code → Error Type → User
                ↓
        Validation Error → Schema Mismatch → Error Details → User
```

## 🚀 Caching Architecture

WS-Dottie implements a multi-layered caching strategy optimized for different data types and update frequencies.

### Caching Strategies

| Strategy | Stale Time | Refetch Interval | GC Time | Use Cases |
|-----------|--------------|------------------|-----------|------------|
| REALTIME_UPDATES | 5s | 5s | 1h | Vessel locations, traffic alerts |
| MINUTE_UPDATES | 1m | 1m | 1h | Terminal wait times, traffic flow |
| HOURLY_UPDATES | 1h | 1h | 4h | Weather conditions, road status |
| DAILY_UPDATES | 1d | 1d | 2d | Schedules, fares |
| WEEKLY_UPDATES | 1w | false | 2w | Terminal info, vessel specs |

### Cache Implementation

WS-Dottie uses TanStack Query's caching system for React applications:

```typescript
// Automatic cache key generation
['vesselLocations', { vesselId: 18 }] // Key for specific vessel
['vesselLocations'] // Key for all vessels

// Cache invalidation strategies
- Time-based expiration
- Manual invalidation
- Background refetch on window focus
- Stale-while-revalidate pattern
```

## 🌐 Environment Support

### Browser Environment
- **Transport**: JSONP for CORS compatibility
- **Features**: Automatic retry, error handling, type safety
- **Limitations**: No streaming responses

### Node.js Environment
- **Transport**: Native fetch with full HTTP capabilities
- **Features**: Streaming, custom headers, proxy support
- **Performance**: Higher throughput, connection pooling

### CLI Environment
- **Transport**: Native fetch with formatted output
- **Features**: Pretty printing, filtering, batch operations
- **Usage**: Debugging, testing, automation

## 🔧 Configuration System

### Configuration Priority
1. Runtime configuration (highest priority)
2. Environment variables
3. Default values (lowest priority)

### Configuration Options
```typescript
interface WsdotConfig {
  WSDOT_ACCESS_TOKEN: string;    // API authentication
  WSDOT_BASE_URL?: string;      // Custom proxy or endpoint
  LOG_LEVEL?: 'debug' | 'info' | 'none';  // Logging verbosity
}
```

## 🛡️ Type Safety Architecture

### Schema-First Approach
WS-Dottie uses Zod schemas as the single source of truth:

```typescript
// Schema definition
const VesselLocationSchema = z.object({
  VesselID: z.number(),
  VesselName: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  // ... other fields
});

// Type inference
type VesselLocation = z.infer<typeof VesselLocationSchema>;

// Runtime validation
const validatedData = VesselLocationSchema.parse(apiResponse);
```

### Type Safety Benefits
- **Compile-time**: TypeScript checks all API calls
- **Runtime**: Zod validates API responses
- **IDE Support**: Full autocomplete and type hints
- **Refactoring**: Types update automatically with schemas

## 📊 Performance Considerations

### Request Optimization
- **Deduplication**: Identical requests share responses
- **Batching**: Multiple vessel history requests processed in parallel
- **Connection Reuse**: HTTP connections pooled when possible
- **Compression**: Automatic gzip decompression

### Memory Management
- **Tree Shaking**: Unused code eliminated in bundling
- **Lazy Loading**: API modules loaded on demand
- **Cache Limits**: Automatic cleanup of unused data
- **Memory Leaks**: Proper cleanup in React components

### Network Efficiency
- **Conditional Fetching**: Only fetch when data is needed
- **Background Updates**: Refresh data without blocking UI
- **Retry Logic**: Exponential backoff for failures
- **Timeout Handling**: Configurable request timeouts

## 🔍 Debugging Architecture

### Logging System
```typescript
// Log levels with appropriate verbosity
'none'    // No logging (production)
'info'     // Basic request information
'debug'    // Detailed request/response data
```

### Error Context
All errors include rich context for debugging:
```typescript
interface ApiErrorContext {
  endpoint: string;      // API endpoint called
  url: string;          // Full request URL
  timestamp: Date;       // When error occurred
  requestId?: string;     // Request identifier
  statusCode?: number;    // HTTP status code
}
```

## 🧪 Testing Architecture

### Test Categories
- **Unit Tests**: Individual function validation
- **Integration Tests**: API interaction testing
- **E2E Tests**: Full workflow validation
- **Performance Tests**: Load and timing validation

### Test Environments
- **Node.js**: Native fetch testing
- **Browser**: JSONP simulation
- **CLI**: Command-line interface testing
- **Mock**: Local development with sample data

## 🔄 Data Transformation

### Date/Time Handling
WS-Dottie automatically converts WSDOT's .NET date format:

```typescript
// Input: "/Date(1703123456789)/"
// Output: new Date(1703123456789)

// Input: "12/25/2024 02:30:45 PM"
// Output: new Date("2024-12-25T14:30:45")
```

### Field Mapping
- **Preservation**: All original fields maintained
- **Normalization**: Consistent naming conventions
- **Extension**: Additional fields passed through
- **Validation**: Required fields verified

## 🚀 Future Architecture Considerations

### Scalability
- **WebSocket Support**: Real-time data streaming
- **Service Workers**: Offline functionality
- **Edge Computing**: Geographic data distribution
- **CDN Integration**: Global endpoint availability

### Extensibility
- **Plugin System**: Custom data sources
- **Middleware**: Request/response processing
- **Adapters**: Alternative transport methods
- **Custom Schemas**: User-defined validation

This architecture ensures WS-Dottie remains performant, maintainable, and adaptable to future requirements while providing a consistent developer experience across all supported environments.
