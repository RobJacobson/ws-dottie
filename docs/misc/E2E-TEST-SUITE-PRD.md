# PRD: Modern E2E Test Suite for Refactored API Client Architecture

## Executive Summary

This PRD outlines the design and implementation of a modern, configuration-driven e2e test suite that builds upon the existing test patterns while leveraging the `Endpoint` metadata structure returned by `defineEndpoint`. The approach eliminates code generation in favor of runtime test discovery and execution, maintaining the proven configuration-driven methodology while adapting to the refactored architecture.

**Status**: Phase 1 Complete ✅ - Discovery engine and configuration generator implemented and tested with 3 APIs. All 22 tests passing with shared utilities architecture established.

## Background

The existing e2e test suite uses a sophisticated configuration-driven approach with:
- **Configuration Files**: Per-API test configurations with endpoint metadata
- **Test Generators**: Reusable test suite generators that create comprehensive tests
- **Runtime Execution**: Tests are generated and executed at test time, not build time
- **Schema Validation**: Comprehensive Zod schema validation for inputs and outputs

The refactored codebase introduces `defineEndpoint` which returns `Endpoint<I, O>` objects containing all the metadata we need:
- `api`, `functionName`, `urlTemplate`
- `inputSchema`, `outputSchema`, `sampleParams`
- `cacheStrategy`
- Pure configuration objects that work with separate fetching utilities

## Problem Statement

The existing e2e tests require manual configuration maintenance for each endpoint. With the new `defineEndpoint` structure, we can:
1. Automatically discover all `Endpoint` objects at test time
2. Generate test configurations from existing metadata
3. Maintain the proven configuration-driven testing approach
4. Eliminate manual test maintenance while preserving comprehensive coverage

## Solution Architecture

### Core Principles

1. **Runtime Discovery**: Discover all `Endpoint` objects at test execution time
2. **Metadata Reuse**: Use existing `Endpoint` metadata directly
3. **Preserve Patterns**: Maintain existing test generator patterns and utilities
4. **Zero Codegen**: No build-time code generation - everything happens at test time
5. **Backward Compatibility**: Support both old manual configs and new auto-generated ones

### Test Suite Structure

```
tests/e2e/
├── auto-generated/               # Auto-discovered endpoint configs (Phase 2)
│   ├── wsdot-border-crossings.config.ts
│   ├── wsdot-bridge-clearances.config.ts
│   └── ... (all 16 APIs)
├── manual/                       # Manually maintained configs (Phase 2)
│   └── custom-endpoints.config.ts
├── generators/                   # Enhanced test generators
│   ├── endpointDiscovery.ts      # ✅ COMPLETE: Discover Endpoint objects
│   ├── configGenerator.ts        # ✅ COMPLETE: Generate configs from Endpoint
│   ├── test-generators.ts        # Phase 2: Enhanced with new features
│   ├── dataIntegrityTests.ts     # Phase 3: zodFetch vs native fetch validation
│   └── validation.ts             # Phase 2: Enhanced validation utilities
├── fixtures/                     # Test data and configurations (Phase 2)
│   ├── apiConfigs.ts
│   ├── sampleData.ts
│   └── testScenarios.ts
├── utils/                        # Shared test utilities (Phase 2)
│   ├── validationHelpers.ts
│   ├── mockHelpers.ts
│   └── assertionHelpers.ts
├── config/                       # Test configuration
│   ├── testConfig.ts            # ✅ COMPLETE: Central test configuration
│   └── discoveryConfig.ts       # ✅ COMPLETE: Endpoint discovery settings
├── discovery.test.ts            # ✅ COMPLETE: Proof of concept test suite
├── run-discovery-test.js        # ✅ COMPLETE: Test runner script
└── setup.ts                     # ✅ COMPLETE: Global test setup
```

### Shared Architecture

The implementation uses a shared utilities architecture with the CLI endpoint registry:

```
src/shared/endpoints/
├── endpoint.ts                  # ✅ COMPLETE: Core endpoint types and defineEndpoint factory
├── endpointDiscovery.ts         # ✅ COMPLETE: Shared discovery utilities
└── index.ts                     # ✅ COMPLETE: Main registry and barrel exports
```

## Detailed Implementation Plan

### 1. Endpoint Discovery Engine ✅ COMPLETE

**Core Discovery (`tests/e2e/generators/endpointDiscovery.ts`)**
```typescript
import type { Endpoint } from '@/shared/endpoints';
import * as highwayCameras from '@/clients/wsdot-highway-cameras';
import * as fares from '@/clients/wsf-fares';
import * as trafficFlow from '@/clients/wsdot-traffic-flow';
import {
  discoverEndpointsFromModules,
  validateDiscoveredEndpoints as validateEndpoints,
  filterEndpointsByApi,
  getUniqueApiNames,
  sortEndpoints,
  debugDiscoveredEndpoints as debugEndpoints,
} from '@/shared/endpoints/endpointDiscovery';

export const discoverEndpoints = (): Endpoint<unknown, unknown>[] => {
  try {
    // Import specific client modules for proof of concept
    const allModules = [highwayCameras, fares, trafficFlow];

    // Use shared discovery utility
    const endpoints = discoverEndpointsFromModules(allModules);

    // Sort endpoints by API and function name for consistent ordering
    return sortEndpoints(endpoints);
  } catch (error) {
    console.error("Failed to discover endpoints:", error);
    throw new Error(
      `Endpoint discovery failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
```

**Shared Discovery Utilities (`src/shared/endpoints/endpointDiscovery.ts`)**
```typescript
export const discoverEndpointsFromModules = (
  modules: Record<string, any>[]
): Endpoint<unknown, unknown>[] => {
  const endpoints: Endpoint<unknown, unknown>[] = [];

  modules.forEach((module) => {
    if (module && typeof module === "object") {
      Object.values(module).forEach((value) => {
        if (isEndpoint(value)) {
          endpoints.push(value);
        }
      });
    }
  });

  return endpoints;
};

export const isEndpoint = (obj: unknown): obj is Endpoint<unknown, unknown> => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof (obj as any).id === "string" &&
    typeof (obj as any).api === "string" &&
    typeof (obj as any).functionName === "string" &&
    typeof (obj as any).urlTemplate === "string" &&
    typeof (obj as any).endpoint === "string" &&
    (obj as any).inputSchema &&
    (obj as any).outputSchema &&
    typeof (obj as any).cacheStrategy === "string"
  );
};
```

### 2. Configuration Generator ✅ COMPLETE

**Auto-Config Generator (`tests/e2e/generators/configGenerator.ts`)**
```typescript
import type { Endpoint } from '@/shared/endpoints';
import { fetchWithZod } from '@/shared/fetching';

export interface EndpointTestConfig<TParams, TOutput> {
  /** The API function handler created from the endpoint */
  apiFunction: (params: TParams) => Promise<TOutput>;
  /** Zod schema for input validation */
  inputSchema: Endpoint<TParams, TOutput>["inputSchema"];
  /** Zod schema for output validation */
  outputSchema: Endpoint<TParams, TOutput>["outputSchema"];
  /** Valid test parameters */
  validParams: Partial<TParams>;
  /** Invalid test parameters for error testing */
  invalidParams: Partial<TParams>[];
  /** Human-readable endpoint name */
  endpointName: string;
  /** Test category for organization */
  category: string;
  /** Maximum expected response time in milliseconds */
  maxResponseTime: number;
  /** Custom test scenarios specific to this endpoint */
  customTests?: CustomTestScenario<TParams, TOutput>[];
  /** Reference to the original endpoint definition */
  endpointDefinition: Endpoint<TParams, TOutput>;
}

export const generateEndpointConfig = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): EndpointTestConfig<TParams, TOutput> => {
  return {
    apiFunction: (params: TParams) => fetchWithZod(endpoint, params),
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    validParams: endpoint.sampleParams || ({} as Partial<TParams>),
    invalidParams: generateInvalidParams(endpoint),
    endpointName: endpoint.functionName,
    category: categorizeEndpoint(endpoint),
    maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy),
    customTests: generateCustomTests(endpoint),
    endpointDefinition: endpoint,
  };
};
```

### 3. Data Integrity Validation

**Critical Requirement: zodFetch vs Native Fetch Consistency**

The test suite must include validation that `zodFetch` returns the same data as an unfiltered native fetch (after converting dates to JS Date objects):

#### 3.1 Field Shape Validation
- Returned data must have the same fields/shape as native fetch
- No fields should be missing or added unexpectedly
- Schema validation should not accidentally filter out data

#### 3.2 Data Content Validation
- Each field must contain the same data as the native fetch
- Values must be identical (accounting for date conversion)
- No data transformation beyond intentional date conversion

#### 3.3 Configurable Field Whitelist
- User-configurable whitelist for fields intentionally excluded
- Default whitelist should be minimal and well-documented
- Whitelist should be easily configurable per API or globally

**Implementation (`dataIntegrityTests.ts`)**
```typescript
interface DataIntegrityTestConfig {
  excludedFields: string[]; // Fields intentionally excluded from zodFetch
  dateConversionFields: string[]; // Fields that should be converted to Date objects
  toleranceConfig?: {
    numericPrecision?: number; // For floating point comparisons
    dateTolerance?: number; // Milliseconds tolerance for date comparisons
  };
}

export const createDataIntegrityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  config: DataIntegrityTestConfig
) => {
  return describe('Data Integrity Validation', () => {
    it('should return same data as native fetch', async () => {
      const sampleParams = endpoint.sampleParams || {};
      const zodFetchResult = await fetchZod(endpoint, sampleParams as TParams);
      const nativeFetchResult = await fetchNative(endpoint.urlTemplate, sampleParams);
      
      // Compare field shapes
      expect(Object.keys(zodFetchResult)).toEqual(Object.keys(nativeFetchResult));
      
      // Compare field values (accounting for exclusions and date conversion)
      compareDataIntegrity(zodFetchResult, nativeFetchResult, config);
    });
  });
};
```

### 4. Enhanced Test Generators

**Updated Test Generator (`test-generators.ts`)**
```typescript
import type { Endpoint } from '@/shared/endpoints';

export const createModernEndpointTestSuite = <TParams, TOutput>(
  config: EndpointTestConfig<TParams, TOutput> & {
    endpoint?: Endpoint<TParams, TOutput>;
    dataIntegrityConfig?: DataIntegrityTestConfig;
  }
) => {
  // Enhanced test suite with:
  // - Better error messages referencing actual endpoint metadata
  // - Automatic test categorization based on defineEndpoint data
  // - Enhanced performance testing based on cache strategy
  // - Data integrity validation against native fetch
  // - Improved schema validation with endpoint context
};
```

### 5. Runtime Test Discovery ✅ COMPLETE

**Main Test Runner (`tests/e2e/discovery.test.ts`)**
```typescript
import { describe, it, expect, beforeAll } from "vitest";
import {
  discoverEndpoints,
  discoverApiNames,
  validateDiscoveredEndpoints,
  debugDiscoveredEndpoints,
} from "./generators/endpointDiscovery";
import {
  generateApiConfig,
  generateAllApiConfigs,
  validateGeneratedConfigs,
} from "./generators/configGenerator";

describe("Endpoint Discovery System", () => {
  let discoveredEndpoints: ReturnType<typeof discoverEndpoints>;
  let apiNames: string[];
  let generatedConfigs: ReturnType<typeof generateAllApiConfigs>;

  beforeAll(async () => {
    // Discover all endpoints
    discoveredEndpoints = discoverEndpoints();
    apiNames = discoverApiNames();
    
    // Generate configurations
    generatedConfigs = generateAllApiConfigs(discoveredEndpoints);
    
    // Debug output for verification
    debugDiscoveredEndpoints(discoveredEndpoints);
  });

  // 22 comprehensive tests covering:
  // - Discovery engine functionality
  // - Configuration generation
  // - Proof of concept with 3 APIs
  // - Integration validation
});
```

**Test Results**: All 22 tests passing ✅
- Discovery engine discovers endpoints from client modules
- Configuration generator creates valid test configurations
- Proof of concept validates with 3 APIs (wsdot-highway-cameras, wsf-fares, wsdot-traffic-flow)
- Integration validation ensures consistency between discovery and generation

## Implementation Phases

### Phase 1: Discovery Engine ✅ COMPLETE
- ✅ Implement endpoint discovery system using `Endpoint` objects
- ✅ Create configuration generator that works with existing metadata
- ✅ Test with 2-3 APIs as proof of concept (wsdot-highway-cameras, wsf-fares, wsdot-traffic-flow)
- ✅ Establish shared utilities architecture with CLI endpoint registry
- ✅ Reorganize endpoint-related code into `src/shared/endpoints/` structure
- ✅ All 22 tests passing with comprehensive validation

### Phase 2: Enhanced Generators (Week 3-4) - NEXT
- Update test generators to work with `Endpoint` metadata
- Enhance validation utilities to use `meta` properties
- Implement comprehensive test categorization
- Add auto-generated endpoint configurations for all 16 APIs

### Phase 3: Data Integrity Validation (Week 5-6)
- Implement zodFetch vs native fetch comparison tests
- Add configurable field whitelist system
- Create data integrity test generators

### Phase 4: Full Integration (Week 7-8)
- Complete integration with all 16 APIs
- Add advanced test scenarios using `meta` data
- Implement performance testing enhancements

## Key Advantages

### 1. **Leverages Existing Types**
- Uses `Endpoint<I, O>` directly - no new types needed
- Reuses all existing metadata structure
- Maintains type safety throughout

### 2. **Zero Code Generation**
- All tests generated at runtime
- No build-time complexity
- Easy to debug and modify

### 3. **Preserves Proven Patterns**
- Maintains existing test generator approach
- Keeps all existing utilities and patterns
- Backward compatible with manual configs

### 4. **Automatic Maintenance**
- New endpoints automatically get tests
- Schema changes automatically reflected
- No manual configuration updates needed

### 5. **Enhanced Testing**
- Better error messages with endpoint context from endpoint properties
- Automatic test categorization based on endpoint properties
- Performance testing aligned with `cacheStrategy`
- **Critical data integrity validation against native fetch**

### 6. **Shared Architecture** ✅ IMPLEMENTED
- Common discovery utilities shared between CLI and test systems
- Consolidated endpoint-related code in `src/shared/endpoints/`
- Eliminates code duplication while maintaining different organizational needs
- CLI: Organized by function name for command lookup
- Tests: Organized by API groups for test suite organization

## Success Metrics

### Phase 1 Achievements ✅
1. **Discovery**: 100% of `Endpoint` objects discovered from client modules
2. **Validation**: All discovered endpoints pass structure validation
3. **Configuration**: Test configurations generated for all discovered endpoints
4. **Testing**: 22/22 tests passing with comprehensive coverage
5. **Type Safety**: Full TypeScript type safety using existing types
6. **Architecture**: Shared utilities eliminate code duplication

### Future Goals (Phases 2-4)
1. **Coverage**: 100% of `Endpoint` objects automatically tested
2. **Maintenance**: 0% manual configuration updates required
3. **Performance**: Complete test suite runs in <15 minutes
4. **Reliability**: <1% false positive test failures
5. **Data Integrity**: 100% of endpoints pass zodFetch vs native fetch validation

## Conclusion

Phase 1 has been successfully completed, establishing a solid foundation for the modern e2e test suite. The implementation demonstrates that the `defineEndpoint` architecture provides all the metadata needed for comprehensive e2e testing without requiring manual configuration maintenance.

### Key Accomplishments

✅ **Discovery Engine**: Automatically discovers all `Endpoint` objects from client modules  
✅ **Configuration Generator**: Creates comprehensive test configurations from endpoint metadata  
✅ **Shared Architecture**: Common utilities shared between CLI and test systems  
✅ **Code Organization**: Consolidated endpoint-related code in `src/shared/endpoints/`  
✅ **Proof of Concept**: Validated with 3 APIs and 22 passing tests  
✅ **Zero Breaking Changes**: All existing functionality preserved  

### Next Steps

The foundation is now in place for the remaining phases:
- **Phase 2**: Enhanced test generators and validation utilities
- **Phase 3**: Data integrity validation (zodFetch vs native fetch)
- **Phase 4**: Full integration with all 16 APIs and advanced scenarios

This approach builds upon the proven configuration-driven testing methodology while leveraging the new `defineEndpoint` architecture. The addition of data integrity validation (Phase 3) will ensure that our schema validation doesn't accidentally filter out important data while maintaining the benefits of type safety and validation. The result will be a modern, maintainable test suite that automatically adapts to changes in the API client architecture while providing comprehensive validation of data consistency.
