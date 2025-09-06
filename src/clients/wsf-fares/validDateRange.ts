import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { validDateRangeSchema, type ValidDateRange } from "@/schemas/wsf-fares";

// ============================================================================
// Input Schemas & Types
//
// No input parameters required
// ============================================================================

// ============================================================================
// Output Schemas & Types
//
// validDateRangeSchema (imported from validDateRange.zod)
// ValidDateRange (imported from validDateRange.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getValidDateRange (get valid date range for fares data)
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getValidDateRange = zodFetch<
  Record<string, never>,
  ValidDateRange
>(ENDPOINT, z.object({}), validDateRangeSchema);

// ============================================================================
// TanStack Query Hooks
//
// useValidDateRange
// ============================================================================

export const validDateRangeOptions = createQueryOptions({
  apiFunction: getValidDateRange,
  queryKey: ["wsf", "fares", "validdaterange", "getValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
