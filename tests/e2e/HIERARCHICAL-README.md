# Hierarchical Test Orchestration System

This document describes the new hierarchical test execution system that implements an improved approach with better display formatting following the sequence: **API → Endpoint → Test**, with roll-up summaries.

## Overview

The hierarchical test orchestration system replaces the previous parallel execution model with a structured approach that provides:

- Clear hierarchical execution order: API → Endpoint → Test
- Detailed pending test display with API, endpoint, and test information
- Roll-up summaries showing overall test results
- Improved terminal output organization

## Architecture

### Core Components

- **`orchestrator.ts`**: Main orchestrator that implements the hierarchical execution logic
- **`shared/hierarchicalSetup.ts`**: New setup module that uses the hierarchical orchestrator
- **`shared/logger.ts`**: Enhanced logger with hierarchical display methods
- Updated test files that use the new orchestration system

### Key Features

1. **Hierarchical Execution**: Tests execute in the order API → Endpoint → Test
2. **Alphabetical Ordering**: APIs and endpoints are sorted alphabetically
3. **Detailed Pending Display**: Shows pending tests with API.endpoint.test structure
4. **Roll-up Summaries**: Provides concise summaries of completed tests
5. **Filtering Support**: Maintains ability to filter to a single API via command line parameter

## Usage

### Running Tests

The existing scripts continue to work with the new hierarchical system:

```bash
# Run all tests with hierarchical orchestration
./tests/e2e/test-api.sh

# Run tests for a specific API
./tests/e2e/test-api.sh wsdot-highway-alerts

# Use the new hierarchical-specific script
./tests/e2e/test-api-hierarchical.sh
```

### Test Output Format

The new system provides enhanced output with:

- API-level grouping with endpoint counts
- Detailed pending test display showing API, endpoint, and function information
- Roll-up summaries with pass/fail counts
- Improved error reporting with clear endpoint identification

## Implementation Details

### New Logger Methods

The enhanced logger includes:

- `apiStart(apiName, endpointCount)`: Logs API start with hierarchical formatting
- `pendingTest(apiName, endpointName, details)`: Logs pending test with detailed information
- `rollupSummary(passed, total, failedList)`: Logs roll-up summary with failed test details

### Hierarchical Test Suite

The `createHierarchicalTestSuite` function creates test suites that:

- Execute tests in API → Endpoint → Test order
- Display pending tests with detailed information
- Provide roll-up summaries at completion
- Maintain filtering capabilities for single API execution

## Benefits

- **Clearer Execution Order**: Tests follow a predictable API → Endpoint → Test sequence
- **Better Visibility**: Detailed pending test display shows exactly what's being tested
- **Improved Summaries**: Roll-up summaries provide concise overview of results
- **Maintained Compatibility**: All existing functionality is preserved
- **Enhanced Debugging**: Better error reporting and clearer output structure