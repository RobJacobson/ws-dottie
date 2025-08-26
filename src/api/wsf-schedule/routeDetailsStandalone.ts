import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// OUTPUT SCHEMA & TYPES (Base schemas for route details)
// ============================================================================

export const serviceDisruptionSchema = z
  .record(z.string(), z.unknown())
  .describe("");

export const annotationSchema = z
  .object({
    AnnotationID: z.number().describe(""),
    AnnotationText: z.string().describe(""),
    AnnotationIVRText: z.string().describe(""),
    AdjustedCrossingTime: z.number().nullable().describe(""),
    AnnotationImg: z.string().describe(""),
    TypeDescription: z.string().describe(""),
    SortSeq: z.number().describe(""),
  })
  .describe("");

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
    EventID: z.number().nullable().describe(""),
    EventDescription: z.string().nullable().describe(""),
    AdjType: z.number().describe(""),
    ReplacedBySchedRouteID: z.number().nullable().describe(""),
  })
  .describe("");

export const routeDetailsSchema = z
  .object({
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    RegionID: z.number().describe(""),
    CrossingTime: z.string().nullable().describe(""),
    ReservationFlag: z.boolean().describe(""),
    PassengerOnlyFlag: z.boolean().describe(""),
    InternationalFlag: z.boolean().describe(""),
    VesselWatchID: z.number().describe(""),
    GeneralRouteNotes: z.string().describe(""),
    SeasonalRouteNotes: z.string().nullable().describe(""),
    AdaNotes: z.string().nullable().describe(""),
    ServiceDisruptions: z.array(serviceDisruptionSchema).describe(""),
  })
  .describe("");

export const routeDetailsArraySchema = z.array(routeDetailsSchema);

export type RouteDetails = z.infer<typeof routeDetailsSchema>;

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getRouteDetailsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/routedetails/{tripDate}";

/**
 * API function for fetching route details from WSF Schedule API
 *
 * Retrieves detailed route information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of RouteDetails objects containing detailed route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routeDetails = await getRouteDetails({ tripDate: new Date('2024-01-15') });
 * console.log(routeDetails[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRouteDetails = async (
  params: GetRouteDetailsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRouteDetailsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching route details from WSF Schedule API
 *
 * Retrieves detailed route information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information
 *
 * @example
 * ```typescript
 * const { data: routeDetails } = useRouteDetails({ tripDate: new Date('2024-01-15') });
 * console.log(routeDetails?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRouteDetails = (
  params: GetRouteDetailsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routeDetails", JSON.stringify(params)],
    queryFn: () => getRouteDetails(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
