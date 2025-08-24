import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getRouteDetailsByRoute
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}";

/**
 * API function for fetching route details by route from WSF Schedule API
 *
 * Retrieves detailed route information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to a RouteDetailsByRouteResponse object containing detailed route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routeDetails = await getRouteDetailsByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(routeDetails.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRouteDetailsByRoute = async (
  params: GetRouteDetailsByRouteParams
): Promise<RouteDetailsByRouteResponse> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRouteDetailsByRouteParamsSchema,
      output: routeDetailsByRouteResponseSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getRouteDetailsByRouteParamsSchema
// GetRouteDetailsByRouteParams
// ============================================================================

export const getRouteDetailsByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route details."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the ferry route to get details for."),
  })
  .describe(
    "Parameters for retrieving detailed route information for a specific route and trip date."
  );

export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;

// ============================================================================
// Output Schema & Types (based on actual API response)
//
// routeDetailsByRouteServiceDisruptionSchema
// routeDetailsByRouteResponseSchema
// RouteDetailsByRouteResponse
// ============================================================================

// Service disruption schema specific to this endpoint (different structure than base)
export const routeDetailsByRouteServiceDisruptionSchema = z
  .object({
    BulletinID: z.number(),
    BulletinFlag: z.boolean(),
    CommunicationFlag: z.boolean(),
    PublishDate: zWsdotDate(),
    AlertDescription: z.string(),
    DisruptionDescription: z.string().nullable(),
    AlertFullTitle: z.string(),
    AlertFullText: z.string(),
    IVRText: z.string().nullable(),
  })
  .describe(
    "Service disruption information including bulletin details, alerts, and operational issues affecting ferry service."
  );

// Actual API response schema (based on real API responses)
export const routeDetailsByRouteResponseSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  VesselWatchID: z.number(),
  ReservationFlag: z.boolean(),
  InternationalFlag: z.boolean(),
  PassengerOnlyFlag: z.boolean(),
  CrossingTime: z.number().nullable(),
  AdaNotes: z.string().nullable(),
  GeneralRouteNotes: z.string(),
  SeasonalRouteNotes: z.string(),
  ServiceDisruptions: z.array(routeDetailsByRouteServiceDisruptionSchema),
});

export type RouteDetailsByRouteResponse = z.infer<
  typeof routeDetailsByRouteResponseSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useRouteDetailsByRoute
// ============================================================================

/**
 * React Query hook for fetching route details by route from WSF Schedule API
 *
 * Retrieves detailed route information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information
 *
 * @example
 * ```typescript
 * const { data: routeDetails } = useRouteDetailsByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(routeDetails?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRouteDetailsByRoute = (
  params: GetRouteDetailsByRouteParams,
  options?: TanStackOptions<RouteDetailsByRouteResponse>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getRouteDetailsByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
