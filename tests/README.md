# E2E Test Suite Documentation

## Overview

This directory contains a comprehensive, modern end-to-end (E2E) test suite for the WS-Dottie API client architecture. The test suite leverages the `defineEndpoint` metadata structure to provide automatic test discovery, configuration generation, and comprehensive validation across all 16 APIs.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Test Suite Structure](#test-suite-structure)
- [Core Components](#core-components)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Reports and Monitoring](#reports-and-monitoring)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Architecture Overview

The test suite follows a modern, configuration-driven architecture that automatically adapts to changes in the API client structure without requiring manual maintenance.

```
┌─────────────────────────────────────────────────────────────────┐
│                    E2E Test Suite Architecture                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Discovery     │    │   Generation    │    │   Execution  │ │
│  │   Engine        │    │   Engine        │    │   Engine     │ │
│  │                 │    │                 │    │              │ │
│  │ • Endpoint      │───▶│ • Config        │───▶│ • Test       │ │
│  │   Discovery     │    │   Generation    │    │   Execution  │ │
│  │ • Validation    │    │ • Scenario      │    │ • Monitoring │ │
│  │ • Filtering     │    │   Creation      │    │ • Reporting  │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│           │                       │                       │     │
│           ▼                       ▼                       ▼     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Shared        │    │   Test          │    │   Utilities  │ │
│  │   Endpoints     │    │   Generators    │    │   & Helpers  │ │
│  │                 │    │                 │    │              │ │
│  │ • defineEndpoint│    │ • Advanced      │    │ • Validation │ │
│  │ • Discovery     │    │   Scenarios     │    │ • Mock Data  │ │
│  │ • Validation    │    │ • Performance   │    │ • Assertions │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Runtime Discovery**: All endpoints discovered at test execution time
2. **Metadata Reuse**: Leverages existing `Endpoint` metadata directly
3. **Zero Maintenance**: New endpoints automatically get test coverage
4. **Auto-Regeneration**: Configurations automatically updated before each test run
5. **Comprehensive Coverage**: Tests input validation, output validation, performance, and data integrity
6. **Production Ready**: Includes monitoring, reporting, and CI/CD integration

## Auto-Regeneration Feature

The test suite includes **automatic configuration regeneration** that runs before each test execution, ensuring your test configurations are always up-to-date without manual intervention.

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                Auto-Regeneration Flow                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🚀 Start Test Execution                                    │
│           │                                                 │
│           ▼                                                 │
│  🔄 Auto-Regenerate Configs (if enabled)                   │
│           │                                                 │
│           ▼                                                 │
│  🧪 Run Tests                                               │
│           │                                                 │
│           ▼                                                 │
│  📊 Generate Reports                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Benefits

- **✅ Always Up-to-Date**: Configs automatically reflect latest endpoint changes
- **✅ Zero Mental Overhead**: No need to remember when to regenerate
- **✅ Fast Execution**: Regeneration takes <1 second
- **✅ Fail-Safe**: Continues with existing configs if regeneration fails
- **✅ Configurable**: Can be disabled if needed

### Usage

```bash
# All npm test:e2e:* commands include auto-regeneration
npm run test:e2e              # Phase 4 comprehensive suite
npm run test:e2e:auto         # Auto test suite
npm run test:e2e:data-integrity # Data integrity tests
npm run test:e2e:discovery    # Discovery tests
npm run test:e2e:all          # All tests with monitoring

# Manual regeneration only
npm run test:regen

# Disable auto-regeneration (use direct vitest)
npm test tests/e2e/phase4-comprehensive-suite.test.ts

# Direct script execution (if needed)
./tests/e2e/scripts/run-phase4-tests.js
./tests/e2e/scripts/run-tests-with-auto-regen.js tests/e2e/phase4-comprehensive-suite.test.ts
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Access to WS-Dottie API endpoints

### Installation

```bash
# Install dependencies
npm install

# Run tests with automatic configuration regeneration
npm run test:e2e
```

### Basic Usage

```bash
# Run specific test suites (with auto-regeneration)
npm run test:e2e:auto
npm run test:e2e:data-integrity
npm run test:e2e:discovery

# Run all E2E tests with comprehensive monitoring
npm run test:e2e:all

# Manual configuration regeneration (if needed)
npm run test:regen

# Run individual tests without auto-regeneration
npm test tests/e2e/phase4-comprehensive-suite.test.ts
npm test tests/e2e/auto-test-suite.test.ts
npm test tests/e2e/data-integrity-suite.test.ts
```

## Test Suite Structure

```
tests/
├── e2e/                                    # Main E2E test directory
│   ├── generators/                         # Test generation modules
│   │   ├── endpointDiscovery.ts           # Endpoint discovery engine
│   │   ├── configGenerator.ts             # Configuration generation
│   │   ├── test-generators.ts             # Enhanced test generators
│   │   ├── advancedTestScenarios.ts       # Advanced scenario generation
│   │   ├── performanceTesting.ts          # Performance testing framework
│   │   ├── advancedErrorHandling.ts       # Error handling and edge cases
│   │   └── dataIntegrityTests.ts          # Data integrity validation
│   ├── auto-generated/                    # Auto-generated configurations
│   │   ├── wsdot-border-crossings.config.ts
│   │   ├── wsdot-bridge-clearances.config.ts
│   │   └── ... (all 16 APIs)
│   ├── utils/                             # Test utilities
│   │   ├── assertionHelpers.ts            # Context-aware assertions
│   │   ├── mockHelpers.ts                 # Mock data generation
│   │   └── validationHelpers.ts           # Enhanced validation
│   ├── config/                            # Test configuration
│   │   ├── testConfig.ts                  # Central test configuration
│   │   └── discoveryConfig.ts             # Discovery settings
│   ├── fixtures/                          # Test data and configurations
│   ├── scripts/                           # Test execution scripts
│   │   ├── run-phase4-tests.js            # Phase 4 comprehensive runner
│   │   ├── run-tests-with-auto-regen.js   # Individual test runner
│   │   ├── run-auto-config-generation-quiet.js # Quiet config generation
│   │   ├── run-auto-config-generation.js  # Full config generation
│   │   ├── run-comprehensive-tests.js     # Comprehensive test runner
│   │   ├── run-data-integrity-tests.js    # Data integrity runner
│   │   └── run-discovery-test.js          # Discovery test runner
│   ├── phase4-comprehensive-suite.test.ts # Main Phase 4 test suite
│   ├── auto-test-suite.test.ts            # Phase 2 auto test suite
│   ├── data-integrity-suite.test.ts       # Data integrity tests
│   ├── discovery.test.ts                  # Discovery proof of concept
│   ├── setup.ts                           # Global test setup
│   └── README-PHASE4.md                   # Phase 4 documentation
└── README.md                              # This file
```

## Core Components

### 1. Discovery Engine (`generators/endpointDiscovery.ts`)

The discovery engine automatically finds all `Endpoint` objects from client modules.

```typescript
// Discover all endpoints
const endpoints = discoverEndpoints();
console.log(`Found ${endpoints.length} endpoints`);

// Discover endpoints for specific API
const apiEndpoints = discoverEndpointsByApi('wsdot-highway-cameras');

// Get all API names
const apiNames = discoverApiNames();
```

**Key Features:**
- Automatic endpoint discovery from all 16 APIs
- Endpoint validation and filtering
- API-specific endpoint retrieval
- Debug utilities for troubleshooting

### 2. Configuration Generator (`generators/configGenerator.ts`)

Generates comprehensive test configurations from endpoint metadata.

```typescript
// Generate configuration for single endpoint
const config = generateEndpointConfig(endpoint);

// Generate configurations for all APIs
const allConfigs = generateAllApiConfigs(endpoints);

// Validate generated configurations
const validation = validateGeneratedConfigs(allConfigs);
```

**Key Features:**
- Automatic test configuration generation
- Schema-based parameter generation
- Cache strategy-based timeout configuration
- Custom test scenario generation

### 3. Advanced Test Scenarios (`generators/advancedTestScenarios.ts`)

Creates sophisticated test scenarios using endpoint meta data.

```typescript
// Create advanced scenarios for endpoint
const scenarios = createAdvancedTestScenarios(endpoint);

// Filter scenarios by category and priority
const cacheScenarios = filterScenarios(scenarios, {
  categories: ['cache-strategy'],
  priorities: ['high', 'critical']
});
```

**Scenario Types:**
- **Cache Strategy**: Tests based on endpoint cache strategies
- **Performance**: Load, stress, and spike testing
- **Error Handling**: Comprehensive error testing
- **Data Integrity**: Schema validation consistency
- **Edge Cases**: Boundary values and concurrency
- **Integration**: End-to-end workflow testing

### 4. Performance Testing (`generators/performanceTesting.ts`)

Comprehensive performance testing framework with load, stress, and spike testing.

```typescript
// Create performance test scenarios
const scenarios = createPerformanceTestScenarios(endpoint);

// Run performance tests
const runner = new PerformanceTestRunner();
const results = await runner.runAllTests(config, testConfig);
```

**Test Types:**
- **Load Testing**: Concurrent request testing
- **Stress Testing**: Gradual load increase
- **Spike Testing**: Sudden load spikes
- **Memory Profiling**: Memory usage monitoring
- **Response Time Analysis**: Percentile-based metrics

### 5. Advanced Error Handling (`generators/advancedErrorHandling.ts`)

Sophisticated error handling with circuit breakers and retry logic.

```typescript
// Create error handler for endpoint
const errorHandler = createAdvancedErrorHandler(endpoint);

// Execute with error handling
const result = await errorHandler.executeWithErrorHandling(
  () => config.apiFunction(params),
  'test-context'
);
```

**Features:**
- **Retry Logic**: Exponential backoff with jitter
- **Circuit Breaker**: Automatic failure detection
- **Error Classification**: Intelligent error categorization
- **Edge Case Testing**: Boundary values and resource testing

### 6. Data Integrity Tests (`generators/dataIntegrityTests.ts`)

Validates that zodFetch returns the same data as native fetch.

```typescript
// Create data integrity test
const test = createDataIntegrityTest(endpoint, config);

// Run data integrity validation
const result = await test.test(params);
```

**Validation Types:**
- **Field Shape**: Ensures no data is filtered out
- **Data Content**: Validates data consistency
- **Date Conversion**: Handles date field conversions
- **Configurable Whitelist**: User-configurable exclusions

## Usage Examples

### Basic Test Execution

```bash
# Run all Phase 4 tests
./tests/e2e/run-phase4-tests.js

# Run specific test suite
npm test tests/e2e/phase4-comprehensive-suite.test.ts

# Run with coverage
npm test tests/e2e/phase4-comprehensive-suite.test.ts --coverage
```

### Advanced Test Scenarios

```typescript
import { createAdvancedTestScenarios, filterScenarios } from './generators/advancedTestScenarios';

// Create scenarios for endpoint
const scenarios = createAdvancedTestScenarios(endpoint);

// Filter by category
const performanceScenarios = filterScenarios(scenarios, {
  categories: ['performance'],
  priorities: ['high', 'critical'],
  maxScenarios: 5
});

// Execute scenarios
for (const scenario of performanceScenarios) {
  const result = await scenario.test(config);
  console.log(`${scenario.name}: ${result ? 'PASSED' : 'FAILED'}`);
}
```

### Performance Testing

```typescript
import { PerformanceTestRunner, createPerformanceTestScenarios } from './generators/performanceTesting';

const runner = new PerformanceTestRunner();
const scenarios = createPerformanceTestScenarios(endpoint);

const testConfig = {
  duration: 60000,      // 1 minute
  concurrency: 10,      // 10 concurrent requests
  rate: 5,              // 5 requests per second
  maxResponseTime: 30000,
  scenarios
};

const results = await runner.runAllTests(config, testConfig);
console.log(`Performance test completed: ${results.length} scenarios`);
```

### Error Handling Testing

```typescript
import { createAdvancedErrorHandler, createEdgeCaseScenarios } from './generators/advancedErrorHandling';

// Create error handler
const errorHandler = createAdvancedErrorHandler(endpoint);

// Test with error handling
const result = await errorHandler.executeWithErrorHandling(
  () => config.apiFunction(params),
  'test-context'
);

console.log(`Error handling result: ${result.success ? 'PASSED' : 'FAILED'}`);
console.log(`Attempts: ${result.attempts}, Duration: ${result.totalTime}ms`);
```

## Configuration

### Test Configuration (`config/testConfig.ts`)

```typescript
export const testConfig = {
  // API timeouts based on cache strategy
  apiTimeouts: {
    'REALTIME_UPDATES': 10000,
    'MINUTE_UPDATES': 15000,
    'FIVE_MINUTE_UPDATES': 20000,
    'HOURLY_UPDATES': 30000,
    'DAILY_UPDATES': 60000,
    'DAILY_STATIC': 120000,
    'WEEKLY_STATIC': 180000,
    'NONE': 30000
  },
  
  // APIs to skip during testing
  skipApis: [
    'api-that-requires-special-setup'
  ],
  
  // Rate limiting configuration
  rateLimits: {
    'wsdot-highway-cameras': { requestsPerSecond: 10, burstLimit: 50 },
    'wsf-fares': { requestsPerSecond: 5, burstLimit: 25 }
  }
};
```

### Discovery Configuration (`config/discoveryConfig.ts`)

```typescript
export const discoveryConfig = {
  // Discovery settings
  discovery: {
    includeAllApis: true,
    validateEndpoints: true,
    debugOutput: false
  },
  
  // Filtering options
  filters: {
    minEndpointsPerApi: 1,
    excludeApis: [],
    includeOnlyApis: []
  }
};
```

## Running Tests

### Production Test Runner

The production test runner provides comprehensive test execution with monitoring and reporting.

```bash
# Run all tests with full monitoring
./tests/e2e/run-phase4-tests.js

# Run with custom configuration
CONFIG_VERBOSE=true CONFIG_COVERAGE=true ./tests/e2e/run-phase4-tests.js
```

**Features:**
- Real-time test progress monitoring
- Comprehensive error reporting
- Performance metrics collection
- Multiple report formats (JSON, HTML)
- CI/CD integration ready

### Individual Test Suites

```bash
# Phase 4 comprehensive suite (all features)
npm test tests/e2e/phase4-comprehensive-suite.test.ts

# Modern test suite (Phase 2 features)
npm test tests/e2e/modern-test-suite.test.ts

# Data integrity tests
npm test tests/e2e/data-integrity-suite.test.ts

# Discovery tests
npm test tests/e2e/discovery.test.ts
```

### Utility Scripts

```bash
# Generate auto-configurations
./tests/e2e/run-auto-config-generation.js

# Run data integrity tests only
./tests/e2e/run-data-integrity-tests.js

# Run comprehensive tests
./tests/e2e/run-comprehensive-tests.js
```

## Reports and Monitoring

### Report Types

#### 1. JSON Report (`test-results.json`)
Complete test execution data with performance metrics and error statistics.

```json
{
  "startTime": "2024-01-15T10:00:00.000Z",
  "endTime": "2024-01-15T10:05:30.000Z",
  "duration": 330000,
  "summary": {
    "total": 22,
    "passed": 22,
    "failed": 0,
    "skipped": 0,
    "errors": 0
  },
  "performance": {
    "averageResponseTime": 1250,
    "maxResponseTime": 5000,
    "totalRequests": 150,
    "errorRate": 0.5
  }
}
```

#### 2. HTML Report (`test-results.html`)
Visual test results dashboard with interactive metrics and charts.

#### 3. Performance Report (`performance-report.json`)
Detailed performance analysis with recommendations.

#### 4. Error Handling Report (`error-handling-report.json`)
Error statistics and recovery recommendations.

### Monitoring Metrics

```
┌─────────────────────────────────────────────────────────────┐
│                    Test Execution Metrics                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 Test Coverage                                          │
│  ├─ Total Endpoints: 94                                    │
│  ├─ APIs Covered: 16                                       │
│  ├─ Test Scenarios: 500+                                   │
│  └─ Success Rate: 100%                                     │
│                                                             │
│  ⚡ Performance Metrics                                    │
│  ├─ Average Response Time: 1.2s                            │
│  ├─ P95 Response Time: 3.5s                                │
│  ├─ Throughput: 25 req/s                                   │
│  └─ Error Rate: 0.5%                                       │
│                                                             │
│  🛡️ Error Handling                                        │
│  ├─ Total Errors: 12                                       │
│  ├─ Retryable Errors: 8                                    │
│  ├─ Circuit Breaker Trips: 0                               │
│  └─ Recovery Time: 2.1s                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Troubleshooting

### Common Issues

#### 1. Test Timeouts
**Problem**: Tests taking longer than expected
**Solution**: 
```bash
# Increase timeout in test configuration
export TEST_TIMEOUT=120000  # 2 minutes

# Check for slow endpoints
npm test tests/e2e/phase4-comprehensive-suite.test.ts --reporter=verbose
```

#### 2. Memory Leaks
**Problem**: Memory usage increasing during test execution
**Solution**:
```bash
# Enable memory profiling
export ENABLE_MEMORY_PROFILING=true

# Run with memory monitoring
node --inspect tests/e2e/run-phase4-tests.js
```

#### 3. Flaky Tests
**Problem**: Tests that pass/fail inconsistently
**Solution**:
```bash
# Run tests multiple times to identify patterns
for i in {1..5}; do
  npm test tests/e2e/phase4-comprehensive-suite.test.ts
done

# Enable retry logic
export TEST_RETRIES=3
```

#### 4. Network Issues
**Problem**: API endpoints not responding
**Solution**:
```bash
# Check API availability
curl -I https://www.wsdot.wa.gov/Traffic/api/HighwayCameras/

# Run with network debugging
DEBUG=* npm test tests/e2e/phase4-comprehensive-suite.test.ts
```

### Debug Mode

```bash
# Enable debug output
export DEBUG=true

# Run with verbose logging
npm test tests/e2e/phase4-comprehensive-suite.test.ts --reporter=verbose

# Check discovery process
node -e "const { discoverEndpoints } = require('./tests/e2e/generators/endpointDiscovery'); console.log(discoverEndpoints().length);"
```

### Performance Debugging

```bash
# Profile test execution
node --prof tests/e2e/run-phase4-tests.js

# Analyze performance
node --prof-process isolate-*.log > performance-analysis.txt

# Memory usage analysis
node --inspect --inspect-brk tests/e2e/run-phase4-tests.js
```

## Contributing

### Adding New Test Scenarios

1. **Create scenario in appropriate generator**:
```typescript
// In generators/advancedTestScenarios.ts
export const createCustomScenarios = (endpoint: Endpoint<unknown, unknown>) => {
  return [{
    name: "Custom Test Scenario",
    description: "Tests custom functionality",
    category: "custom",
    priority: "medium",
    params: endpoint.sampleParams || {},
    expectation: "success",
    test: async (config) => {
      // Custom test logic
      return true;
    }
  }];
};
```

2. **Integrate with main test suite**:
```typescript
// In phase4-comprehensive-suite.test.ts
import { createCustomScenarios } from './generators/advancedTestScenarios';

// Add to test suite
const customScenarios = createCustomScenarios(endpoint);
```

### Adding New APIs

1. **Add API to discovery**:
```typescript
// In generators/endpointDiscovery.ts
import * as newApi from "@/clients/new-api";

const allModules = [
  // ... existing modules
  newApi,
];
```

2. **Generate configurations**:
```bash
./tests/e2e/run-auto-config-generation.js
```

3. **Verify test coverage**:
```bash
npm test tests/e2e/phase4-comprehensive-suite.test.ts
```

### Performance Testing Guidelines

1. **Start with low concurrency**:
```typescript
const testConfig = {
  concurrency: 2,
  rate: 1,
  duration: 30000
};
```

2. **Gradually increase load**:
```typescript
const testConfig = {
  concurrency: 10,
  rate: 5,
  duration: 60000
};
```

3. **Monitor system resources**:
```bash
# Monitor CPU and memory
top -p $(pgrep node)

# Monitor network
netstat -i
```

### Error Handling Best Practices

1. **Use appropriate retry strategies**:
```typescript
const errorConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  backoffMultiplier: 2
};
```

2. **Implement circuit breakers**:
```typescript
const circuitBreaker = {
  failureThreshold: 5,
  timeWindow: 60000,
  recoveryTimeout: 30000
};
```

3. **Classify errors appropriately**:
```typescript
const errorClassification = {
  retryableErrors: ['network', 'timeout'],
  circuitBreakerErrors: ['server error'],
  ignorableErrors: ['validation error']
};
```

---

## Summary

This E2E test suite provides comprehensive, production-ready testing for the WS-Dottie API client architecture. With automatic endpoint discovery, intelligent test generation, and sophisticated monitoring capabilities, it ensures reliable API functionality while requiring zero manual maintenance.

**Key Benefits:**
- ✅ **Zero Maintenance**: New endpoints automatically get test coverage
- ✅ **Comprehensive Coverage**: Tests all aspects of API functionality
- ✅ **Production Ready**: Includes monitoring, reporting, and CI/CD integration
- ✅ **Extensible**: Easy to add new test scenarios and APIs
- ✅ **Reliable**: Sophisticated error handling and retry logic

For detailed Phase 4 documentation, see [README-PHASE4.md](e2e/README-PHASE4.md).
