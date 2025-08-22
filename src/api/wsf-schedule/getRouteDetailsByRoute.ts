import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { dateSchema } from "./shared-schemas";

// ============================================================================
// API FUNCTION
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
 * @returns Promise resolving to a RouteDetailsResponse object containing detailed route information
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
): Promise<RouteDetailsResponse> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRouteDetailsByRouteParamsSchema,
      output: actualRouteDetailsResponseSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
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
// OUTPUT SCHEMA & TYPES (based on actual API response)
// ============================================================================

export const serviceDisruptionSchema = z
  .object({
    BulletinID: z.number(),
    BulletinFlag: z.boolean(),
    CommunicationFlag: z.boolean(),
    PublishDate: dateSchema,
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
export const actualRouteDetailsResponseSchema = z.object({
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
  ServiceDisruptions: z.array(serviceDisruptionSchema),
});

export type RouteDetailsResponse = z.infer<
  typeof actualRouteDetailsResponseSchema
>;

// ============================================================================
// QUERY HOOK
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
  options?: TanStackOptions<RouteDetailsResponse>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByRoute",
      params.tripDate,
      params.routeId,
    ],
    queryFn: () => getRouteDetailsByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
