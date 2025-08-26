import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getTerminals
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminals/{tripDate}";

/**
 * API function for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of ScheduleTerminal objects containing terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals[0].Description); // "Anacortes"
 * ```
 */
export const getTerminals = async (
  params: GetTerminalsParams
): Promise<ScheduleTerminal[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalsParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalsParamsSchema
// GetTerminalsParams
// ============================================================================

export const getTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetTerminalsParams = z.infer<typeof getTerminalsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// scheduleTerminalSchema
// scheduleTerminalsArraySchema
// ScheduleTerminal
// ============================================================================

export const scheduleTerminalSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  .describe("");

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminals
// ============================================================================

/**
 * React Query hook for fetching terminals from WSF Schedule API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal information
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals?.[0]?.Description); // "Anacortes"
 * ```
 */
export const useTerminals = (
  params: { tripDate: Date },
  options?: TanStackOptions<ScheduleTerminal[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminals", JSON.stringify(params)],
    queryFn: () => getTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
