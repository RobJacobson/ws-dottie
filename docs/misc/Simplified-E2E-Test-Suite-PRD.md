# PRD: Simplified E2E Test Suite

## Executive Summary

This PRD outlines a simplified, clean E2E test suite that auto-generates tests from `defineEndpoint` metadata while maintaining the proven output format and structure of the old archive tests. The system focuses on core requirements: ZodFetch validation and native fetch comparison with .NET datetime conversion.

## Core Requirements

1. **ZodFetch Validation**: Ensure all endpoints work with ZodFetch and validate correctly
2. **Data Integrity**: Compare ZodFetch results with native fetch (with .NET datetime conversion)
3. **Auto-Generation**: Generate tests from `defineEndpoint` metadata automatically
4. **Clean Output**: Match the old archive test output format with good logging
5. **Simple Commands**: `npm test [module-name] [--full]`

## Architecture

### Test Structure
```
tests/e2e/
├── generated/                    # Auto-generated test files (runtime)
│   ├── wsdot-highway-cameras.test.ts
│   ├── wsf-fares.test.ts
│   └── ... (one per API)
├── utils/
│   ├── test-generator.ts         # Core test generator (simplified)
│   ├── data-integrity.ts         # ZodFetch vs native fetch comparison
│   └── discovery.ts              # Endpoint discovery from defineEndpoint
├── scripts/
│   └── test-runner.js            # Simple test runner
└── setup.ts                      # Test setup
```

### Command Structure
- `npm test [module-name]` - Core tests (ZodFetch + data integrity)
- `npm test [module-name] --full` - Comprehensive tests (core + edge cases)
- `npm test all` - All APIs with core tests
- `npm test all --full` - All APIs with comprehensive tests

### Test Categories

#### Core Tests (Default)
- **Basic Functionality**: ZodFetch works and returns data
- **Data Integrity**: ZodFetch matches native fetch (with datetime conversion)
- **Performance**: Response time validation
- **Schema Validation**: Input/output schemas work correctly

#### Full Tests (--full flag)
- All core tests, plus:
- **Error Handling**: Invalid parameters, edge cases
- **Edge Cases**: Empty results, null values, boundary conditions
- **Rate Limiting**: Timeout and retry scenarios

## Implementation Plan

### Phase 1: Core Infrastructure
1. Create simplified test generator based on old archive format
2. Implement endpoint discovery from defineEndpoint metadata
3. Create data integrity comparison (ZodFetch vs native fetch)
4. Build simple test runner with module filtering

### Phase 2: Auto-Generation
1. Generate test files at runtime in `tests/generated/`
2. One test file per API with clean structure
3. Match old archive test output format exactly
4. Keep generated files for debugging

### Phase 3: Polish
1. Add comprehensive test mode (--full flag)
2. Optimize performance and error handling
3. Add documentation and examples

## Success Criteria

1. **Clean Output**: Matches old archive test format with good logging
2. **Auto-Generation**: Zero manual maintenance for new endpoints
3. **Core Validation**: ZodFetch works, data integrity validated
4. **Simple Commands**: Easy to use, clear documentation
5. **Fast Execution**: Core tests run quickly, full tests comprehensive

## Key Differences from Old System

### Simplified
- No complex test types (comprehensive, clean, auto, etc.)
- No overengineered discovery configuration
- No verbose performance testing
- No complex mock data generation

### Enhanced
- Auto-generation from defineEndpoint metadata
- Data integrity validation (ZodFetch vs native fetch)
- Runtime file generation for debugging
- Simple command structure

### Preserved
- Clean output format with good logging
- Test structure and organization
- Core validation patterns
- Easy debugging and maintenance
