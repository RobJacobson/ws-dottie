/**
 * WSF Schedule API - Route Details
 *
 * Provides detailed information about Washington State Ferry routes including:
 * - Route descriptions and abbreviations
 * - Crossing times and vessel information
 * - Current alerts and service updates
 * - General and seasonal route notes
 * - ADA accessibility information
 * - Reservation and international route flags
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getRouteDetails } from '@ferryjoy/ws-dottie';
 *
 * // Get route details for a specific date
 * const routeDetails = await getRouteDetails('2025-08-27');
 *
 * // Access route information
 * routeDetails.forEach(route => {
 *   console.log(`Route: ${route.Description} (${route.RouteAbbrev})`);
 *   console.log(`Crossing time: ${route.CrossingTime} minutes`);
 *   console.log(`Alerts: ${route.Alerts.length}`);
 * });
 * ```
 *
 * @module wsf-schedule/routeDetails
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getRouteDetailsByTerminals (route details for terminal pair)
// getRouteDetailsByRoute (route details for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}";
const ENDPOINT_STANDALONE =
  "/ferries/api/schedule/rest/routedetails/{tripDate}";

export const getRouteDetailsByTerminals = async (
  params: GetRouteDetailsByTerminalsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getRouteDetailsByTerminalsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

export const getRouteDetailsByRoute = async (
  params: GetRouteDetailsByRouteParams
): Promise<RouteDetailsByRouteResponse> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getRouteDetailsByRouteParamsSchema,
      output: routeDetailsByRouteResponseSchema,
    },
    params
  );
};

/**
 * Retrieves detailed route information for a given trip date.
 *
 * @param params - Parameters object for route details query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @returns Promise<RouteDetails[]> - Array of detailed route information
 *
 * @example
 * const routeDetails = await getRouteDetails({ tripDate: new Date('2025-01-27') });
 * console.log(routeDetails[0].RouteAbbrev);  // "SEA-BI"
 * console.log(routeDetails[0].Description);  // "Seattle - Bainbridge Island"
 *
 * @throws {Error} When date is invalid or API is unavailable
 */
export const getRouteDetails = async (
  params: GetRouteDetailsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT_STANDALONE,
    {
      input: getRouteDetailsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getRouteDetailsByTerminalsParamsSchema
// GetRouteDetailsByTerminalsParams
// getRouteDetailsByRouteParamsSchema
// GetRouteDetailsByRouteParams
// ============================================================================

export const getRouteDetailsByTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetRouteDetailsByTerminalsParams = z.infer<
  typeof getRouteDetailsByTerminalsParamsSchema
>;

export const getRouteDetailsByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;

/**
 * Parameters for retrieving detailed route information for a specific date
 */
export const getRouteDetailsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// serviceDisruptionSchema
// annotationSchema
// routeDetailsSchema
// routeDetailsArraySchema
// RouteDetails
// routeDetailsByRouteServiceDisruptionSchema
// routeDetailsByRouteResponseSchema
// RouteDetailsByRouteResponse
// ============================================================================

export const serviceDisruptionSchema = z
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
  .describe("");

export const annotationSchema = z
  .object({
    AnnotationID: z.number(),
    AnnotationText: z.string(),
    AnnotationType: z.string(),
  })
  .describe("");

export const routeDetailsSchema = z
  .object({
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
  })
  .describe("");

export const routeDetailsArraySchema = z.array(routeDetailsSchema);

export type RouteDetails = z.infer<typeof routeDetailsSchema>;

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
  .describe("");

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
// TanStack Query Hooks
//
// useRouteDetailsByTerminals
// useRouteDetailsByRoute
// ============================================================================

export const useRouteDetailsByTerminals = (
  params: GetRouteDetailsByTerminalsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

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

/**
 * TanStack Query hook for route details with automatic updates.
 *
 * @param params - Parameters object for route details query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<RouteDetails[], Error> - Query result with route details data
 *
 * @example
 * const { data: routeDetails, isLoading } = useRouteDetails({ tripDate: new Date('2025-01-27') });
 * if (routeDetails) {
 *   console.log(routeDetails[0].RouteAbbrev);  // "SEA-BI"
 *   console.log(routeDetails[0].Description);  // "Seattle - Bainbridge Island"
 * }
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
