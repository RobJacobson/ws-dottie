# E2E Testing Debugging Investigation

## Problem Summary

The `wsdot-bridge-clearances` e2e tests are failing with a persistent error: `Invalid input: expected string, received Date` for the `APILastUpdate` and `RouteDate` fields. This error indicates that the Zod schema `zWsdotDate()` is receiving JavaScript Date objects instead of the expected .NET date strings (`/Date(timestamp)/`).

## Root Cause Analysis

The error suggests that somewhere in the data flow, .NET date strings are being automatically converted to JavaScript Date objects before reaching our Zod validation. This is problematic because:

1. **JSON.parse cannot create Date objects by itself** - it only supports primitive types
2. **Our current code uses `zWsdotDate()` to transform strings to dates** - it expects strings, not Date objects
3. **The old, deprecated code used a custom JSON.parse reviver** that automatically converted .NET dates to JS dates

## Evidence of Obsolete Code Execution

Despite our debugging efforts, we discovered that **our current version of the fetching code is not running**:

- ❌ No logging from `fetchNative` appears
- ❌ No logging from `selectFetchStrategy` appears  
- ❌ No logging from `zodFetch` appears
- ❌ No test logging appears
- ❌ No import logging appears

However, the same date conversion error persists, indicating that **some obsolete, cached version of our fetching code is being executed instead of our current source files**.

## Attempted Resolutions

### 1. Vitest Fresh Installation
- **Action**: Completely uninstalled Vitest, deleted all config files, and reinstalled from scratch
- **Result**: ❌ No fix - the error persisted
- **Lesson**: The issue is not with Vitest configuration or caching

### 2. Eliminate Double JSON Conversion
- **Action**: Removed unnecessary `processApiResponse` step and ensured `fetchNative` returns raw text
- **Result**: ❌ No fix - the error persisted  
- **Lesson**: The issue is not with our current source code logic

### 3. Debug Logging Investigation
- **Action**: Added extensive logging throughout the data flow to trace execution
- **Result**: ❌ No logs appear for the problematic API tests
- **Lesson**: Our current source code is not being executed at all

### 4. Import Path Verification
- **Action**: Verified import paths and module resolution
- **Result**: ✅ Import paths are correct and source files are accessible
- **Lesson**: The issue is not with import paths or file accessibility

## Current Status

The problem remains unresolved. We have confirmed that:

1. **Our current source code is not being executed** - no logging appears
2. **Some obsolete version of the code is running** - the same error persists
3. **The issue is deeper than Vitest configuration** - fresh installation didn't help
4. **Module resolution appears correct** - import paths work and files exist

## Lessons Learned

### 1. Module Caching is Insidious
When debugging module-related issues, the fact that source files exist and import paths are correct doesn't guarantee that the current version is being executed.

### 2. Logging is Essential for Debugging
Without the extensive logging we added, we would have continued to believe the issue was in our current source code rather than discovering that obsolete code was running.

### 3. Fresh Installation Doesn't Always Help
Even a complete reinstallation of testing tools doesn't resolve deep module caching issues that may be in the Node.js runtime or other layers.

### 4. The Problem is Not Where We Expected
We initially focused on the date conversion logic in our current code, but the real issue is that our current code isn't running at all.

## Next Steps

To resolve this issue, we need to:

1. **Find where the cached/compiled old code is located**
2. **Force the test environment to use only current source files**
3. **Investigate if there are other caching mechanisms at play** (Node.js module cache, Vite cache, etc.)
4. **Consider if there are environment-specific module resolution issues**

## Technical Details

### Current Code Architecture
- `zodFetch` → `selectFetchStrategy` → `fetchNative` → returns raw text → `JSON.parse` → Zod validation with `zWsdotDate()`

### Expected Data Flow
1. API returns .NET date strings (`/Date(timestamp)/`)
2. `fetchNative` returns raw text
3. `zodFetch` parses JSON and applies Zod schema
4. `zWsdotDate()` transforms strings to Date objects

### Actual Data Flow (Based on Error)
1. API returns .NET date strings
2. **Somewhere in the process, strings are converted to Date objects**
3. Zod validation fails because it receives Date objects instead of strings

The mystery is: **where is this conversion happening if our current code isn't running?**
