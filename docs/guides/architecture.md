# WS-Dottie Architecture

This document provides a comprehensive overview of WS-Dottie's architecture, explaining how different components of the codebase work together to provide a unified interface for accessing Washington State transportation data.

> **📚 Documentation Navigation**: [../README.md](../README.md) • [Getting Started](./getting-started.md) • [API Guide](./api-guide.md)

## 🏗️ System Overview

WS-Dottie is a TypeScript library that abstracts the complexity of working with multiple Washington State transportation APIs (WSDOT and WSF). It provides type-safe data access through multiple interfaces: direct fetch functions, React hooks, and a CLI tool, while handling the challenges of CORS through JSONP when needed.

### Core Design Philosophy

The architecture follows a "schema-first" approach where Zod schemas define the contract between the library and external APIs. These schemas serve multiple purposes:

1. **Runtime validation** - Ensuring API responses match expected structure
2. **Type generation** - Creating TypeScript types automatically
3. **Documentation generation** - Powering OpenAPI specifications and Redoc HTML files
4. **Input validation** - Validating parameters before API calls

## 🔄 Data Flow Architecture

### Request Processing Pipeline

The library processes requests through a layered architecture:

1. **User Application Layer** - Where users interact with the library through React hooks, Node.js functions, or CLI commands
2. **WS-Dottie Library Layer** - Contains TanStack Query hooks, core fetch functions, and transport abstraction
3. **External API Layer** - Interfaces with WSDOT, WSF, and other data sources

### Transport Layer Abstraction

The library handles different environments through a transport abstraction layer:

1. **Native Fetch** (Node.js/Modern browsers)
   - Direct HTTP requests with full header support
   - Proper error handling and response parsing
   - Connection pooling and optimization

2. **JSONP** (Legacy browser environments)
   - CORS bypass for browsers without proper CORS support
   - Dynamic script tag injection
   - Callback handling and cleanup

3. **CLI Interface**
   - Command-line access to all API endpoints
   - Output formatting options (JSON, table, etc.)
   - Batch operations and scripting support

## 🧩 Core Components

### 1. API Definitions (`src/apis/`)

The API definitions form the foundation of the library, organized by provider and endpoint:

```
src/apis/
├── wsdot-border-crossings/
│   └── borderCrossingData/
│       ├── borderCrossingData.input.ts     # Input schema
│       ├── borderCrossingData.output.ts    # Output schema
│       └── borderCrossingData.endpoints.ts # Endpoint definition
├── wsf-vessels/
│   └── vesselLocations/
│       ├── vesselLocations.input.ts
│       ├── vesselLocations.output.ts
│       └── vesselLocations.endpoints.ts
└── ... (other API directories)
```

Each API directory contains:
- **Input schemas** - Zod schemas for request parameters
- **Output schemas** - Zod schemas for response data
- **Endpoint definitions** - Configuration for API endpoints

### 2. Shared Infrastructure (`src/shared/`)

The shared infrastructure provides common functionality across all APIs:

```
src/shared/
├── factories/
│   ├── createEndpoint.ts          # Endpoint factory function
│   └── apiFunctionFactory.ts     # API function factory
├── fetching/
│   ├── index.ts                  # Main fetch implementation
│   ├── nativeFetch.ts            # Native fetch implementation
│   └── jsonpFetch.ts             # JSONP implementation
├── tanstack/
│   ├── hooks.ts                  # React hooks
│   └── createHooks.ts            # Hook creation utilities
├── schemas/                      # Shared schemas
├── types/                        # Common type definitions
└── utils/                        # Utility functions
```

### 3. Endpoint Factory System

The endpoint factory is the core of the library's architecture, creating consistent API functions:

```typescript
// Example endpoint definition
export const fetchVesselLocations = createEndpoint<
  VesselLocationsInput,
  VesselLocation[]
>({
  api: apis.wsfVessels,
  group: vesselLocationsGroup,
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  endpointDescription: "List current locations of vessels"
});
```

This factory generates:
- **Fetch functions** - Direct API calls with proper typing
- **React hooks** - TanStack Query integration with caching
- **Type definitions** - TypeScript types from Zod schemas
- **Documentation** - OpenAPI specifications

### 4. React Hooks Integration

The library provides TanStack Query hooks for React applications:

```typescript
// Generated hook usage
const { data, error, isLoading } = useVesselLocations({
  vesselId: 18
});
```

Features include:
- **Automatic caching** - Based on data freshness requirements
- **Background refetching** - Keeping data up-to-date
- **Error handling** - Retry logic and error boundaries
- **Optimistic updates** - For better UX

### 5. CLI Tools

The CLI provides command-line access to all APIs:

```bash
# Example CLI usage
ws-dottie vessels locations --vessel-id 18
ws-dottie border-crossings --date 2024-01-15
```

Features include:
- **All endpoints accessible** - Complete API coverage
- **Output formatting** - JSON, table, CSV options
- **Batch operations** - Process multiple requests
- **Scripting support** - Integration with shell scripts

## 📋 Schema and Documentation System

### Zod Schema Architecture

The schema system is the foundation of the library's type safety:

```typescript
// Example schema definition
const vesselLocationSchema = z.object({
  VesselID: z.number(),
  VesselName: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  // ... other fields
});

// Type inference
type VesselLocation = z.infer<typeof vesselLocationSchema>;
```

Benefits include:
- **Single source of truth** - Schema defines the contract
- **Runtime validation** - Ensures data integrity
- **Type generation** - Automatic TypeScript types
- **Documentation** - Self-documenting code

### Documentation Generation Pipeline

The library automatically generates documentation from schemas:

```
Zod Schemas
    ↓
OpenAPI Specification
    ↓
Redoc HTML Documentation
```

This process:
1. **Extracts schema information** - From Zod definitions
2. **Generates OpenAPI specs** - Standard API documentation
3. **Creates HTML docs** - Using Redoc for beautiful documentation
4. **Includes examples** - Real data samples for each endpoint

## 🌐 Environment Support

### Browser vs. Server Architecture

The library adapts to different environments automatically:

```typescript
// Environment detection and transport selection
const transport = isBrowser() ? 
  (supportsCORS() ? nativeFetch : jsonpFetch) : 
  nativeFetch;
```

Features include:
- **Automatic detection** - No manual configuration needed
- **Graceful degradation** - Fallbacks for older browsers
- **Consistent API** - Same interface regardless of environment
- **Performance optimization** - Best transport for each environment

## 🚀 Performance Considerations

### Bundle Size Optimization

The library is designed for optimal bundle sizes:

- **Tree-shaking** - Only used code is included
- **API-specific imports** - Import only what you need
- **Conditional validation** - Optional runtime validation
- **Code splitting** - Separate chunks for different APIs

### Caching Strategy

The library implements intelligent caching:

```typescript
// Cache configuration based on data type
const cacheConfig = {
  realtime: { staleTime: 5 * 1000 },      // 5 seconds
  frequent: { staleTime: 5 * 60 * 1000 },  // 5 minutes
  moderate: { staleTime: 60 * 60 * 1000 }, // 1 hour
  static: { staleTime: 24 * 60 * 60 * 1000 } // 1 day
};
```

## 🔧 Configuration System

The library uses a hierarchical configuration system:

1. **Runtime configuration** - Programmatic configuration
2. **Environment variables** - Deployment-specific settings
3. **Default values** - Sensible out-of-the-box settings

## 🛠️ Development Workflow

### Adding New Endpoints

The workflow for adding new endpoints:

1. **Define schemas** - Create input/output Zod schemas
2. **Create endpoint** - Use the factory function
3. **Generate types** - Automatic from schemas
4. **Add tests** - Unit and integration tests
5. **Update docs** - Automatic from schemas

### Code Generation

The library uses code generation for:

- **Type definitions** - From Zod schemas
- **API functions** - From endpoint definitions
- **Documentation** - From schemas and endpoints
- **CLI commands** - From endpoint registry

## 🚀 Future Architecture Considerations

### Planned Enhancements

1. **WebSocket Support** - Real-time data streaming
2. **Service Workers** - Offline functionality
3. **Plugin System** - Extensible architecture
4. **Geographic Distribution** - CDN and edge caching

### Scalability Roadmap

The architecture is designed to scale with:

- **New data sources** - Easy addition of new APIs
- **Different environments** - Browser, Node.js, edge workers
- **Various use cases** - From simple scripts to complex applications
- **Performance requirements** - Optimized for different scenarios

This architecture ensures WS-Dottie remains maintainable, performant, and adaptable to future requirements while providing a consistent developer experience across all supported environments.
