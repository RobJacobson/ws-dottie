#!/bin/bash
# Simple script to run API-specific tests with concise syntax
# Usage: ./tests/e2e/test-api.sh [api-name]

API_NAME=${1:-"all"}

if [ "$API_NAME" = "all" ]; then
    npx vitest --config config/vitest.config.ts --run tests/e2e/tests/ --reporter=verbose
else
    TARGET_API="$API_NAME" npx vitest --config config/vitest.config.ts --run tests/e2e/tests/ --reporter=verbose
fi