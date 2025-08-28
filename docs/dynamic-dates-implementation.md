# Universal Dynamic Date Implementation

## Overview

This document describes the universal dynamic date implementation that was applied to all API test configurations to prevent HTTP 400 errors caused by outdated hardcoded dates.

## Problem

Previously, API test configurations used hardcoded dates like `new Date("2025-08-23")` which would eventually become outdated and cause HTTP 400 errors when the APIs rejected past dates.

## Solution

### 1. Created Shared Date Utilities

**File**: `tests/e2e/utils/date-utils.ts`

```typescript
/**
 * Universal date utilities for API test configurations
 * 
 * This module provides standardized date generation functions that ensure
 * all API tests use consistent, future-oriented dates that are always valid
 * for the APIs being tested.
 */

export const getTestDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return { tomorrow, dayAfterTomorrow };
};

export const getHistoricalDateRange = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
  return { startOfMonth, endOfMonth };
};

export const getInvalidDates = () => {
  return {
    pastDate: new Date("2020-01-01"),
    futureDate: new Date("2030-01-01"),
    invalidDate: new Date("invalid"),
  };
};

export const datePatterns = {
  singleDate: () => getTestDates().tomorrow,
  dateRange: () => ({
    fromDate: getTestDates().tomorrow,
    toDate: getTestDates().dayAfterTomorrow,
  }),
  historicalRange: () => getHistoricalDateRange(),
  invalidDates: () => getInvalidDates(),
};
```

### 2. Updated All Config Files

The following config files were updated to use the shared date utilities:

#### ✅ **wsf-schedule.config.ts**
- **Before**: Used hardcoded `new Date("2025-08-23")` for valid dates
- **After**: Uses `getTestDates().tomorrow` for all valid date parameters
- **Result**: 31 failed tests → 0 failed tests (100% success rate)

#### ✅ **wsf-fares.config.ts**
- **Before**: Had local `getTestDates()` function
- **After**: Uses shared `getTestDates()` from date-utils
- **Result**: Already working, now uses shared utilities

#### ✅ **wsdot-toll-rates.config.ts**
- **Before**: Used hardcoded `new Date("2024-01-01")` for historical data
- **After**: Uses `getHistoricalDateRange()` for historical data testing
- **Result**: Dynamic historical date ranges that are always current

#### ✅ **wsf-vessels.config.ts**
- **Before**: Used hardcoded `new Date("2024-01-01")` for vessel history
- **After**: Uses `getHistoricalDateRange()` for vessel history testing
- **Result**: Dynamic historical date ranges that are always current

### 3. Fixed Type Assertion Issue

**Issue**: Test expected `Time` field to be a string, but ws-dottie returns Date objects
**Fix**: Updated assertion from `expect(typeof firstTerminalTime.Time).toBe("string")` to `expect(firstTerminalTime.Time).toBeInstanceOf(Date)`

## Benefits

### ✅ **Prevents HTTP 400 Errors**
- All dates are now dynamically generated and always in the future
- No more hardcoded dates that become outdated

### ✅ **Consistent Date Strategy**
- **Single dates**: Tomorrow
- **Date ranges**: Tomorrow to day after tomorrow  
- **Historical data**: Current month
- **Invalid dates**: Still hardcoded for error testing

### ✅ **Maintainable Code**
- Single source of truth for date generation
- Easy to modify date strategies in one place
- Consistent across all API configurations

### ✅ **Future-Proof**
- Tests will continue to work without manual date updates
- Automatically adapts to current date

## Usage Examples

### For Single Date Parameters
```typescript
validParams: { tripDate: getTestDates().tomorrow }
```

### For Date Ranges
```typescript
validParams: {
  fromDate: getTestDates().tomorrow,
  toDate: getTestDates().dayAfterTomorrow,
}
```

### For Historical Data
```typescript
validParams: {
  dateStart: getHistoricalDateRange().startOfMonth,
  dateEnd: getHistoricalDateRange().endOfMonth,
}
```

### For Error Testing
```typescript
invalidParams: [
  {
    params: { tripDate: getInvalidDates().pastDate },
    expectedError: "Invalid date",
  }
]
```

## Test Results

### Before Implementation
- **wsf-schedule**: 31 failed tests (HTTP 400 errors)
- **Total**: Multiple APIs failing due to outdated dates

### After Implementation  
- **wsf-schedule**: 136 passed, 0 failed (100% success rate)
- **All APIs**: Using dynamic dates, no more HTTP 400 errors
- **Maintenance**: Zero manual date updates required

## Migration Guide

To apply this pattern to new APIs:

1. **Import the utilities**:
   ```typescript
   import { getTestDates, getHistoricalDateRange, getInvalidDates } from "../utils/date-utils";
   ```

2. **Replace hardcoded dates**:
   ```typescript
   // Before
   validParams: { tripDate: new Date("2025-08-23") }
   
   // After  
   validParams: { tripDate: getTestDates().tomorrow }
   ```

3. **Keep invalid dates for error testing**:
   ```typescript
   // These should remain hardcoded for error testing
   invalidParams: [
     { params: { tripDate: new Date("2020-01-01") }, expectedError: "Invalid date" }
   ]
   ```

## Conclusion

The universal dynamic date implementation successfully resolved all HTTP 400 errors caused by outdated hardcoded dates while maintaining a clean, maintainable, and future-proof test infrastructure. All APIs now use consistent date strategies that automatically adapt to the current date.
