import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";

// ============================================================================
// Input Schema & Types
//
// getFaresValidDateRangeParamsSchema
// GetFaresValidDateRangeParams
// ============================================================================

export const getFaresValidDateRangeParamsSchema = z.object({});

export type GetFaresValidDateRangeParams = z.infer<
  typeof getFaresValidDateRangeParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// faresValidDateRangeSchema
// FaresValidDateRange
// ============================================================================

export const faresValidDateRangeSchema = z.object({
  DateFrom: zWsdotDate(),
  DateThru: zWsdotDate(),
});

export type FaresValidDateRange = z.infer<typeof faresValidDateRangeSchema>;

// ============================================================================
// API Function
//
// getFaresValidDateRange
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/validdaterange";

export const getFaresValidDateRange = zodFetch<
  GetFaresValidDateRangeParams, FaresValidDateRange
>(
  ENDPOINT,
  getFaresValidDateRangeParamsSchema,
  faresValidDateRangeSchema
);

// ============================================================================
// TanStack Query Hook
//
// useFaresValidDateRange
// ============================================================================

export const faresValidDateRangeOptions = createQueryOptions({
  apiFunction: getFaresValidDateRange,
  queryKey: ["wsf", "fares", "validDateRange", "getFaresValidDateRange"],
  cacheStrategy: "DAILY_STATIC",
});
