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
// getSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

/**
 * API function for fetching sailings from WSF Schedule API
 *
 * Retrieves sailings for a specific scheduled route. This endpoint provides
 * information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of actual sailing response objects containing sailing information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * const sailings = await getSailings({ schedRouteId: 1 });
 * console.log(sailings[0].SailingDescription); // "Leave Anacortes - Summer"
 */
export const getSailings = async (
  params: GetSailingsParams
): Promise<SailingResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getSailingsParamsSchema,
      output: sailingsResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getSailingsParamsSchema
// GetSailingsParams
// ============================================================================

export const getSailingsParamsSchema = z
  .object({
    schedRouteId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the scheduled route to get sailings for."
      ),
  })
  .describe(
    "Parameters for retrieving sailings for a specific scheduled route."
  );

export type GetSailingsParams = z.infer<typeof getSailingsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// terminalTimeSchema
// journeySchema
// sailingSchema
// sailingsArraySchema
// Sailing
// sailingResponseSchema
// sailingsResponseArraySchema
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
    IsNA: z
      .boolean()
      .describe(
        "Indicates whether this terminal time is not applicable. True when the terminal is not part of this specific journey, false when it is included."
      ),
  })
  .describe(
    "Terminal time information including identification, description, scheduled times, and operational indicators. This schema provides the timing details for each terminal in a journey."
  );

export const journeySchema = z
  .object({
    JourneyID: z
      .number()
      .describe(
        "Unique identifier for the journey. Primary key for journey identification and represents a complete ferry trip from departure to arrival."
      ),
    ReservationInd: z
      .boolean()
      .describe(
        "Indicates whether reservations are required for this journey. True when advance booking is necessary, false when first-come-first-served boarding is available."
      ),
    InternationalInd: z
      .boolean()
      .describe(
        "Indicates whether this journey crosses international boundaries. True for journeys to Canada (e.g., Anacortes to Sidney BC), false for domestic routes."
      ),
    InterislandInd: z
      .boolean()
      .describe(
        "Indicates whether this journey is between islands. True for interisland ferry routes, false for mainland-to-island or mainland-to-mainland routes."
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

export const sailingSchema = z
  .object({
    SailingID: z
      .number()
      .describe(
        "Unique identifier for the sailing. Primary key for sailing identification and represents a specific ferry departure."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route. Links the sailing to a specific route schedule and determines the route configuration."
      ),
    SailingDate: zWsdotDate().describe(
      "Date of the sailing in ISO format. Indicates when this specific ferry departure occurs."
    ),
    SailingTime: zWsdotDate().describe(
      "Time of the sailing in ISO format. Indicates the scheduled departure time for this ferry trip."
    ),
    VesselID: z
      .number()
      .describe(
        "Unique identifier for the vessel assigned to this sailing. Links to vessel information and identifies which ferry will operate this trip."
      ),
    VesselName: z
      .string()
      .describe(
        "Name of the vessel assigned to this sailing. Human-readable identifier for the ferry that passengers will board (e.g., 'M/V Cathlamet')."
      ),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Indicates whether the vessel is accessible to passengers with disabilities. True when accessibility features are available, false when accessibility is limited."
      ),
    VesselPositionNum: z
      .number()
      .describe(
        "Position number for the vessel in the sailing sequence. Used for ordering multiple vessels on the same route and operational tracking."
      ),
    Journeys: z
      .array(journeySchema)
      .describe(
        "Array of journeys for this sailing. Contains the complete trip information including terminal times and vessel details."
      ),
  })
  .describe(
    "Sailing information including identification, scheduling, vessel assignment, and journey details. This schema represents a specific ferry departure with all associated operational information."
  );

export const sailingsArraySchema = z.array(sailingSchema);

export type Sailing = z.infer<typeof sailingSchema>;

// ============================================================================
// API RESPONSE SCHEMAS (based on real API responses)
// ============================================================================

// TODO:Add descriptions to schema for all fields
export const sailingResponseSchema = z
  .object({
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
  })
  .describe("Sailing response structure from WSF API");

export const sailingsResponseArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useSailings
// ============================================================================

/**
 * React Query hook for fetching sailings from WSF Schedule API
 *
 * Retrieves sailings for a specific scheduled route. This endpoint provides
 * information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing sailing information
 *
 * @example
 * ```typescript
 * const { data: sailings } = useSailings({ schedRouteId: 1 });
 * console.log(sailings?.[0]?.SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const useSailings = (
  params: GetSailingsParams,
  options?: TanStackOptions<SailingResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "sailings", JSON.stringify(params)],
    queryFn: () => getSailings(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
