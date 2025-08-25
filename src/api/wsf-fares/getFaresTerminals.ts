import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";

import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";

// ============================================================================
// API Function
//
// getFaresTerminals
// ============================================================================

const ENDPOINT = "/ferries/api/fares/rest/terminals/{tripDate}";

/**
 * Get valid departing terminals for a trip date from WSF Fares API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to array of valid departing terminals
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminals = await getFaresTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals[0].Description); // "Anacortes"
 * ```
 */
export const getFaresTerminals = async (
  params: GetFaresTerminalsParams
): Promise<FaresTerminal[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getFaresTerminalsParamsSchema,
      output: faresTerminalsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getFaresTerminalsParamsSchema
// GetFaresTerminalsParams
// ============================================================================

export const getFaresTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve valid departing terminals. This date must be within the valid date range returned by getFaresValidDateRange."
      ),
  })
  .describe(
    "Parameters for retrieving valid departing terminals for a specific trip date"
  );

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// faresTerminalSchema
// FaresTerminal
// ============================================================================

export const faresTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this ferry terminal by the WSF system. This ID serves as a permanent, unique reference for the terminal across all WSF systems and can be used for tracking, reporting, and data correlation purposes."
      ),
    Description: z
      .string()
      .describe(
        "Human-readable name for the ferry terminal that provides quick identification. Examples include 'Anacortes', 'Friday Harbor', 'Orcas Island', 'Lopez Island', 'Shaw Island', 'San Juan Island', 'Sidney BC', or 'Victoria BC'. This field is the primary display name used in applications."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Basic terminal information including terminal ID and description. This schema represents essential terminal data used for route planning and fare calculations."
  );

export const faresTerminalsArraySchema = z
  .array(faresTerminalSchema)
  .describe(
    "Array of valid departing terminals for a specific trip date. This collection provides all available departure points for fare queries and route planning."
  );

export type FaresTerminal = z.infer<typeof faresTerminalSchema>;

// ============================================================================
// TanStack Query Hook
//
// useFaresTerminals
// ============================================================================

/**
 * Hook for getting fares terminals from WSF Fares API
 *
 * Retrieves all terminals available for fare calculations for a specific trip date.
 * This endpoint provides information about terminals that can be used in fare queries.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing tripDate for which to retrieve valid departing terminals
 * @param options - Optional React Query options
 * @returns React Query result containing array of fares terminals
 */
export const useFaresTerminals = (
  params: GetFaresTerminalsParams,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresTerminals>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<FaresTerminal[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "fares", "terminals"],
    queryFn: () => getFaresTerminals(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
