#!/bin/bash
# Enhanced script to run API-specific tests with hierarchical output
# Usage: ./tests/e2e/test-api-hierarchical.sh [api-name]
# This script uses the new hierarchical orchestration system with improved display formatting

API_NAME=${1:-"all"}

if [ "$API_NAME" = "all" ]; then
    echo "🚀 Running all E2E tests with hierarchical orchestration..."
    npx vitest --config config/vitest.config.ts --run tests/e2e/tests/ --reporter=verbose
else
    echo "🚀 Running E2E tests for API: $API_NAME with hierarchical orchestration..."
    # Run each test file individually with the TARGET_API environment variable
    for test_file in tests/e2e/tests/*.ts; do
        if [ -f "$test_file" ]; then
            echo "📋 Running $test_file for $API_NAME..."
            TARGET_API="$API_NAME" npx vitest --config config/vitest.config.ts --run "$test_file" --reporter=verbose
            # Check if the test failed and exit if it did
            if [ $? -ne 0 ]; then
                echo "❌ Test failed in $test_file"
                exit 1
            fi
        fi
    done
fi

echo "✅ All hierarchical tests completed successfully!"