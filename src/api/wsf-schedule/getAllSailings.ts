import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getAllSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/allsailings/{schedRouteId}";

/**
 * API function for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailings for a specific scheduled route. This endpoint provides
 * comprehensive information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of ActualSailingResponse objects containing all sailing information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const allSailings = await getAllSailings({ schedRouteId: 1 });
 * console.log(allSailings[0].SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const getAllSailings = async (
  params: GetAllSailingsParams
): Promise<SailingResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getAllSailingsParamsSchema,
      output: sailingsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getAllSailingsParamsSchema
// GetAllSailingsParams
// ============================================================================

export const getAllSailingsParamsSchema = z
  .object({
    schedRouteId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the scheduled route to get all sailings for."
      ),
  })
  .describe(
    "Parameters for retrieving all sailings for a specific scheduled route."
  );

export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

// ============================================================================
// Output Schema & Types (based on actual API response)
//
// terminalTimeSchema
// journeySchema
// sailingResponseSchema
// sailingsArraySchema
// SailingResponse
// ============================================================================

export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal within the journey context. Links to the specific terminal instance and maintains consistency across the journey."
      ),
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for the terminal. Primary key for terminal identification and used consistently across all WSF systems and APIs."
      ),
    TerminalDescription: z
      .string()
      .describe(
        "Full description of the terminal. Provides detailed information about the terminal's location, facilities, and operational characteristics."
      ),
    TerminalBriefDescription: z
      .string()
      .describe(
        "Brief description of the terminal. Short identifier used in displays, schedules, and references for passenger convenience."
      ),
    Time: zWsdotDate()
      .nullable()
      .describe(
        "Scheduled time for arrival or departure at this terminal. Null when time is not available. All times are in Pacific Time Zone (PT/PDT)."
      ),
    DepArrIndicator: z
      .number()
      .nullable()
      .describe(
        "Indicator for departure or arrival. Numeric code indicating whether this is a departure time (1) or arrival time (2). Null when the indicator is not available."
      ),
    TidalAdj: z
      .number()
      .nullable()
      .optional()
      .describe(
        "Tidal adjustment in minutes. Accounts for tidal variations that affect ferry operations and timing. Null when no tidal adjustment is needed."
      ),
    TimeToAdj: z
      .number()
      .nullable()
      .optional()
      .describe(
        "Time adjustment in minutes. Additional time buffer or adjustment applied to the scheduled time. Null when no time adjustment is needed."
      ),
    Annotations: z
      .union([z.string(), z.array(z.unknown())])
      .nullable()
      .optional()
      .describe(
        "Additional notes or annotations for this terminal time. Provides context about special conditions, delays, or operational notes. Can be string, array, or null."
      ),
  })
  .describe(
    "Terminal time information including arrival/departure times, adjustments, and operational notes. This schema represents the timing details for a specific terminal within a journey."
  );

export const journeySchema = z
  .object({
    JourneyID: z
      .number()
      .describe(
        "Unique identifier for the journey. Primary key for journey identification and represents a specific ferry trip segment."
      ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this journey. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this journey. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel is accessible to passengers with disabilities. True when accessibility features are available, false when accessibility is limited."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number for the vessel in the journey sequence. Used for ordering multiple vessels on the same route and operational tracking."
      ),
    TerminalTimes: z
      .array(terminalTimeSchema)
      .describe(
        "Array of terminal times for this journey. Contains arrival and departure times at each terminal, providing the complete journey timeline."
      ),
  })
  .describe(
    "Journey information including vessel assignment, accessibility details, operational characteristics, and terminal timing information. This schema represents a complete ferry trip with all associated details."
  );

// API response schema for all sailings
export const sailingResponseSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  SailingNotes: z.string(),
  DisplayColNum: z.number(),
  SailingDir: z.number(),
  DayOpDescription: z.string(),
  DayOpUseForHoliday: z.boolean(),
  ActiveDateRanges: z.array(
    z.object({
      DateFrom: zWsdotDate().nullable(),
      DateThru: zWsdotDate().nullable(),
      EventID: z.number().nullable(),
      EventDescription: z.string().nullable(),
    })
  ),
  Journs: z.array(journeySchema),
});

export const sailingsArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useAllSailings
// ============================================================================

/**
 * React Query hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailings for a specific scheduled route. This endpoint provides
 * comprehensive information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing all sailing information
 *
 * @example
 * ```typescript
 * const { data: allSailings } = useAllSailings({ schedRouteId: 1 });
 * console.log(allSailings?.[0]?.SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const useAllSailings = (
  params: GetAllSailingsParams,
  options?: TanStackOptions<SailingResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "allSailings", JSON.stringify(params)],
    queryFn: () => getAllSailings(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
