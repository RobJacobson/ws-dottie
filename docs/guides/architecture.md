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

2. **JSONP** (Browser environments)
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
│   ├── vesselLocations/
│   │   ├── vesselLocations.input.ts
│   │   ├── vesselLocations.output.ts
│   │   └── vesselLocations.endpoints.ts     # Endpoint definition
│   └── vesselVerbose/                       # Metadata-driven pattern
│       ├── shared/
│       │   ├── vesselVerbose.input.ts       # Input schema
│       │   ├── vesselVerbose.output.ts      # Output schema
│       │   └── vesselVerbose.endpoints.ts   # Group metadata only
│       ├── vesselsVerbose.ts                # Endpoint: metadata + fetch + hook
│       └── vesselsVerboseById.ts            # Endpoint: metadata + fetch + hook
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
│   ├── createFetchFunction.ts    # Pure fetch function factory (no React)
│   ├── createHook.ts             # React Query hook factory
│   ├── strategies.ts             # Cache strategy configurations
│   ├── types.ts                  # Factory type definitions
│   └── index.ts                  # Factory exports
├── cache/
│   ├── cacheFlushDate.ts         # Cache flush date hooks with internal fetch functions
│   └── index.ts                  # Cache exports
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

The endpoint factory system provides a metadata-driven approach to creating consistent API functions. The architecture uses three separate metadata objects (API metadata, endpoint group metadata, and endpoint-specific metadata) to generate strongly-typed fetch functions and React Query hooks.

#### Factory Functions

The factory system provides a unified approach to creating both fetch functions and React Query hooks through a single factory call. The primary factory function is:

**`createFetchAndHook`** - Creates both a fetch function and a React Query hook in a single call
   - Combines fetch function and hook creation into one factory call
   - Uses lazy loading for cache strategy to avoid circular dependencies
   - Returns an object with both `fetch` and `hook` properties
   - Automatically handles cache flush date invalidation for WSF APIs with STATIC cache strategy

The factory system also exports separate functions for specialized use cases:

1. **`createFetchFunction`** - Creates pure fetch functions with no React dependencies
   - Suitable for server-side code, Node.js scripts, and non-React environments
   - Used internally by cache flush date endpoints to break circular dependencies
   - Returns a strongly-typed async function that accepts `FetchFunctionParams<TInput>`
   - Uses `buildFetchEndpoint` internally to construct the minimal endpoint descriptor

2. **`createHook`** - Creates React Query hooks with intelligent caching
   - Used internally by `createFetchAndHook`
   - Integrates with TanStack Query for automatic caching and state management
   - Automatically applies cache strategies based on endpoint group configuration
   - Handles cache flush date invalidation for WSF APIs with STATIC cache strategy

#### Example Usage

```typescript
// Example endpoint definition (metadata-driven pattern)
const vesselBasicsMeta = {
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all vessels in the fleet.",
} satisfies EndpointMeta<VesselBasicsInput, VesselBasic[]>;

// Create both fetch function and hook in a single call
const vesselBasicsFactory = createFetchAndHook<VesselBasicsInput, VesselBasic[]>({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsMeta,
  getEndpointGroup: () => require("./shared/vesselBasics.endpoints").vesselBasicsGroup,
});

// Export both from the factory result
export const { fetch: fetchVesselBasics, hook: useVesselBasics } = vesselBasicsFactory;
```

#### Separation of Concerns

The factory system separates concerns cleanly:

- **`createFetchFunction`** - Pure, environment-agnostic fetch functions
  - No React dependencies
  - Can be used in Node.js, edge workers, or any JavaScript environment
  - Minimal bundle size when only fetch functions are imported
  - Uses `buildFetchEndpoint` to create minimal endpoint descriptors with only fetch-related fields

- **`createFetchAndHook`** - Combined factory for both fetch and hook
  - Primary factory used by all endpoint files
  - Returns both fetch function and hook in a single call
  - Uses lazy loading for endpoint group to avoid circular dependencies
  - Internally calls `createFetchFunction` and `createHook`

- **`createHook`** - React Query integration layer
  - Used internally by `createFetchAndHook`
  - Built on top of fetch functions from `createFetchFunction`
  - Adds caching, state management, and automatic refetching
  - Handles cache invalidation for static data sources

#### Endpoint Building Functions

The factory system uses two different building functions depending on the use case:

1. **`buildFetchEndpoint`** - Creates minimal endpoint descriptors for fetching operations
   - Used by `createFetchFunction` to build fetch-only endpoint objects
   - Contains only fields necessary for fetching: `urlTemplate`, `endpoint`, `inputSchema`, `outputSchema`
   - Excludes housekeeping metadata used by hooks and other system components

2. **`buildDescriptor`** - Creates complete endpoint descriptors for the registry
   - Used by `endpointRegistry` to build full endpoint objects with all metadata
   - Combines API, group, and endpoint metadata into a complete descriptor
   - Includes computed properties: `urlTemplate`, `id`, `cacheStrategy`, `sampleParams`, etc.
   - Used by CLI and E2E tests that need access to all endpoint metadata

```typescript
// buildFetchEndpoint - minimal descriptor for fetching
function buildFetchEndpoint<I, O>(
  api: ApiMeta,
  endpoint: EndpointMeta<I, O>
): FetchEndpoint<I, O> {
  return {
    urlTemplate: `${api.baseUrl}${endpoint.endpoint}`,
    endpoint: endpoint.endpoint,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
  };
}

// buildDescriptor - complete descriptor for registry
function buildDescriptor<I, O>(
  api: ApiMeta,
  group: EndpointGroupMeta,
  endpoint: EndpointMeta<I, O>
): Endpoint<I, O> {
  return {
    api,
    group,
    endpoint: endpoint.endpoint,
    functionName: endpoint.functionName,
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    sampleParams: endpoint.sampleParams,
    endpointDescription: endpoint.endpointDescription,
    cacheStrategy: group.cacheStrategy,
    urlTemplate: `${api.baseUrl}${endpoint.endpoint}`,
    id: `${api.name}:${endpoint.functionName}`,
  };
}
```

#### Cache Strategies

The factory system uses cache strategies defined in `strategies.ts` to optimize data fetching:

- **REALTIME** - 5 second stale time, 5 second refetch interval (vessel locations, traffic alerts)
- **FREQUENT** - 5 minute stale time, 5 minute refetch interval (terminal wait times, traffic flow)
- **MODERATE** - 1 hour stale time, 1 hour refetch interval (weather conditions, road status)
- **STATIC** - 1 day stale time, 1 day refetch interval (schedules, fares, terminal info)

For WSF APIs with STATIC cache strategy, the `createHook` function automatically integrates with cache flush date endpoints to invalidate cache when underlying data changes, rather than using fixed refetch intervals.

#### Cache Flush Date Implementation

The cache flush date system uses internal fetch functions to break circular dependencies:

- **Internal fetch functions** - Created directly in `cacheFlushDate.ts` using `createFetchFunction`
  - These are separate from the public-facing fetch functions exported from API modules
  - Use the same endpoint metadata and schemas for consistency
  - Break the circular dependency because `createFetchFunction` has no dependencies on cache or React hooks

- **Public-facing functions** - Exported from API modules (e.g., `fetchCacheFlushDateFares`)
  - Created using `createHook` which depends on the cache module
  - Used by consumers of the library
  - Provide the same functionality with React Query integration

This dual-function approach ensures:
1. **No circular dependencies** - Internal functions use `createFetchFunction` (no cache dependency)
2. **Consistent behavior** - Both use the same metadata and schemas
3. **Clear separation** - Internal functions for cache management, public functions for consumers

This factory system eliminates circular dependencies by keeping fetch functions separate from React hooks, and provides a clean, maintainable way to generate consistent API functions across the entire codebase.

### 4. Endpoint Registry

The endpoint registry provides a centralized, automatically-discovered list of all endpoints across all APIs. It serves as the single source of truth for endpoint metadata and is used by the CLI and E2E test infrastructure.

#### Automatic Discovery

The registry (`src/shared/endpointRegistry.ts`) automatically discovers endpoints by iterating through the API graph:

```
apis (from src/apis/shared/apis.ts)
  → endpointGroups (array of EndpointGroupMeta)
    → endpoints (array of EndpointMeta)
```

The registry creates a flat array of complete `Endpoint` objects, each containing:
- API metadata (name, base URL, etc.)
- Group metadata (cache strategy, documentation, etc.)
- Endpoint metadata (function name, path, schemas, etc.)
- Computed properties (urlTemplate, unique ID, etc.)

#### Initialization Order

The registry ensures proper initialization order by importing Zod OpenAPI initialization FIRST, before any API modules are imported. This guarantees that all Zod schemas have the `.openapi()` method available when the registry is constructed.

```typescript
// endpointRegistry.ts
import "@/shared/zod";  // Initialize Zod OpenAPI FIRST
import { apis } from "@/apis/shared/apis";
// ... rest of registry code
```

#### Usage

The registry is exported from `src/shared/endpointRegistry.ts` and provides:

```typescript
import { endpoints, apis } from '@/shared/endpointRegistry';

// Flat array of all endpoints
endpoints.forEach(endpoint => {
  console.log(`${endpoint.id}: ${endpoint.endpoint}`);
});

// Access the full API graph
Object.values(apis).forEach(api => {
  console.log(`API: ${api.api.name}`);
  console.log(`Groups: ${api.endpointGroups.length}`);
});
```

The registry is primarily used by:
- **CLI tool** - Discovers all available endpoints for command execution
- **E2E tests** - Provides endpoint metadata for test generation
- **Documentation generation** - Iterates through endpoints to generate OpenAPI specs

### 5. API Graph Export

The API graph provides programmatic access to all API definitions, endpoint groups, and endpoints. It is exported through the `./apis` package export and serves as the single source of truth for endpoint structure and metadata.

The graph is structured hierarchically:
- **APIs** - Top-level containers with API metadata (base URL, name, description)
- **Endpoint Groups** - Logical groupings of related endpoints with shared cache strategy
- **Endpoints** - Individual API endpoints with schemas, function names, and metadata

```typescript
import { apis } from 'ws-dottie/apis';

// Access specific API
const vesselsApi = apis['wsf-vessels'];

// Navigate the graph structure
vesselsApi.endpointGroups.forEach(group => {
  console.log(`Group: ${group.name}`);
  console.log(`Cache Strategy: ${group.cacheStrategy}`);
  
  group.endpoints.forEach(endpoint => {
    console.log(`  ${endpoint.functionName}: ${endpoint.endpoint}`);
  });
});
```

The API graph is useful for:
- Building tools that need to discover endpoints dynamically
- Generating custom documentation or integrations
- Creating type-safe endpoint introspection utilities
- Accessing metadata for custom validation or transformation logic

### 6. React Hooks Integration

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

### E2E Testing Structure

E2E tests are organized per endpoint (one test file per endpoint), providing maximum granularity and easy filtering:

```
tests/e2e/api/
├── wsdot-border-crossings--fetch-border-crossings.test.ts
├── wsdot-bridge-clearances--fetch-bridge-clearances.test.ts
├── wsdot-bridge-clearances--fetch-bridge-clearances-by-route.test.ts
├── wsf-vessels--fetch-vessel-basics.test.ts
└── ... (one test file per endpoint, 97 total)
```

Each test file uses the `createEndpointSuite` helper to automatically generate standard tests for the endpoint. This structure:

- **Provides maximum granularity** - One test file per endpoint for precise testing
- **Improves test maintainability** - Easy to locate and update tests for specific endpoints
- **Enables targeted testing** - Run tests for specific endpoints or groups of endpoints using glob patterns
- **Maintains consistency** - All tests use the same factory function and test templates

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
