/**
 * WSDOT Travel Times API
 *
 * Real-time travel time data for major highway corridors in Washington State, including current
 * and average travel times between key destinations. Provides route timing information for I-5,
 * I-405, I-90, SR 520, and other major highways with support for HOV lanes and express lanes.
 *
 * This API enables applications to display current traffic conditions, compare current vs average
 * travel times, and provide route planning information. Data includes start/end points with GPS
 * coordinates, milepost information, and route descriptions for major metropolitan areas including
 * Seattle, Bellevue, Everett, Tacoma, and Portland metro regions.
 *
 * API Functions:
 * - getTravelTimeById: Returns one TravelTimeRoute object for the specified TravelTimeID
 * - getTravelTimes: Returns an array of TravelTimeRoute objects for all travel time routes
 *
 * Input/Output Overview:
 * - getTravelTimeById: Input: { travelTimeId: number }, Output: TravelTimeRoute
 * - getTravelTimes: Input: none, Output: TravelTimeRoute[]
 *
 * Base Type: TravelTimeRoute
 *
 * interface TravelTimeRoute {
 *   AverageTime: number;
 *   CurrentTime: number;
 *   Description: string | null;
 *   Distance: number;
 *   EndPoint: TravelTimeEndpoint | null;
 *   Name: string | null;
 *   StartPoint: TravelTimeEndpoint | null;
 *   TravelTimeID: number;
 *   TimeUpdated: string; // Undocumented field
 * }
 *
 * interface TravelTimeEndpoint {
 *   Description: string | null;
 *   Direction: string | null;
 *   MilePost: number;
 *   RoadName: string | null;
 *   Latitude: number; // Undocumented field
 *   Longitude: number; // Undocumented field
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID=1&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the single travel time curl command:
 *
 * ```json
 * {
 *   "AverageTime": 25,
 *   "CurrentTime": 25,
 *   "Description": "Everett to Downtown Seattle",
 *   "Distance": 26.72,
 *   "EndPoint": {
 *     "Description": "I-5 @ University St in Seattle",
 *     "Direction": "S",
 *     "Latitude": 47.609294000,
 *     "Longitude": -122.331759000,
 *     "MilePost": 165.83,
 *     "RoadName": "005"
 *   },
 *   "Name": "Everett-Seattle",
 *   "StartPoint": {
 *     "Description": "I-5 @ 41st St in Everett",
 *     "Direction": "S",
 *     "Latitude": 47.964146000,
 *     "Longitude": -122.199237000,
 *     "MilePost": 192.55,
 *     "RoadName": "005"
 *   },
 *   "TimeUpdated": "/Date(1756192200000-0700)/",
 *   "TravelTimeID": 1
 * }
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Functions
//
// getTravelTimeById (single item)
// getTravelTimes (array)
// ============================================================================

const ENDPOINT_BASE =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson?TravelTimeID={travelTimeId}";
const ALL_TRAVEL_TIMES_ENDPOINT =
  "/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson";

/**
 * Retrieves travel time data for a specific route by its unique identifier.
 *
 * @param params - Parameters object for travel time query
 * @param params.travelTimeId - Unique travel time route identifier (positive integer)
 * @returns Promise<TravelTimeRoute> - Travel time data for the specified route
 *
 * @example
 * const travelTime = await getTravelTimeById({ travelTimeId: 1 });
 * console.log(travelTime.Name);  // "Everett-Seattle"
 * console.log(travelTime.CurrentTime);  // 25
 * console.log(travelTime.AverageTime);  // 25
 * console.log(travelTime.Distance);  // 26.72
 *
 * @throws {Error} When travel time ID is invalid or API is unavailable
 */
export const getTravelTimeById = async (
  params: GetTravelTimeByIdParams
): Promise<TravelTimeRoute> => {
  return zodFetch(
    ENDPOINT_BASE,
    {
      input: getTravelTimeByIdParamsSchema,
      output: travelTimeRouteSchema,
    },
    params
  );
};

/**
 * Retrieves travel time data for all available routes.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TravelTimeRoute[]> - Array of travel time data for all routes
 *
 * @example
 * const travelTimes = await getTravelTimes();
 * console.log(travelTimes.length);  // 100+
 *
 * @throws {Error} When API is unavailable
 */
export const getTravelTimes = async (
  params: GetTravelTimesParams = {}
): Promise<TravelTimeRoute[]> => {
  return zodFetch(
    ALL_TRAVEL_TIMES_ENDPOINT,
    {
      input: getTravelTimesParamsSchema,
      output: travelTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTravelTimeById (single item)
// getTravelTimes (array)
// ============================================================================

/**
 * Parameters for retrieving travel time data for a specific route
 */
export const getTravelTimeByIdParamsSchema = z
  .object({
    travelTimeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;

/**
 * Parameters for retrieving all travel time routes (no parameters required)
 */
export const getTravelTimesParamsSchema = z.object({}).describe("");

export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// travelTimeRoute (shared schema)
// travelTimesArray (array wrapper)
// ============================================================================

/**
 * Travel time endpoint schema - represents start or end point of a travel time route
 */
export const travelTimeEndpointSchema = z
  .object({
    Description: z.string().nullable().describe(""),
    Direction: z.string().nullable().describe(""),
    MilePost: z.number().describe(""),
    RoadName: z.string().nullable().describe(""),
  })
  
  .describe("");

/**
 * Travel time route schema - includes current and average travel times with route details
 */
export const travelTimeRouteSchema = z
  .object({
    AverageTime: z.number().describe(""),
    CurrentTime: z.number().describe(""),
    Description: z.string().nullable().describe(""),
    Distance: z.number().describe(""),
    EndPoint: travelTimeEndpointSchema.nullable().describe(""),
    Name: z.string().nullable().describe(""),
    StartPoint: travelTimeEndpointSchema.nullable().describe(""),
    TravelTimeID: z.number().int().positive().describe(""),
  })
  
  .describe("");

/**
 * Array of travel time route objects - wrapper around travelTimeRouteSchema
 */
export const travelTimesArraySchema = z
  .array(travelTimeRouteSchema)
  .describe("");

/**
 * TravelTimeEndpoint type - represents start or end point of a travel time route
 */
export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;

/**
 * TravelTimeRoute type - represents travel time data for a specific route
 */
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

/**
 * TravelTimesResponse type - array of travel time route objects
 */
export type TravelTimesResponse = z.infer<typeof travelTimesArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTravelTimeById (single item)
// useTravelTimes (array)
// ============================================================================

/**
 * TanStack Query hook for travel time data with automatic updates (single item).
 *
 * @param params - Parameters object for travel time query
 * @param params.travelTimeId - Unique travel time route identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TravelTimeRoute, Error> - Query result with travel time data
 *
 * @example
 * const { data: travelTime, isLoading } = useTravelTimeById({ travelTimeId: 1 });
 * if (travelTime) {
 *   console.log(travelTime.Name);  // "Everett-Seattle"
 *   console.log(travelTime.CurrentTime);  // 25
 * }
 */
export const useTravelTimeById = (
  params: GetTravelTimeByIdParams,
  options?: TanStackOptions<TravelTimeRoute>
): UseQueryResult<TravelTimeRoute, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimeById",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimeById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for all travel time routes with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TravelTimeRoute[], Error> - Query result with array of travel time data
 *
 * @example
 * const { data: travelTimes, isLoading } = useTravelTimes();
 * if (travelTimes) {
 *   console.log(travelTimes.length);  // 100+
 * }
 */
export const useTravelTimes = (
  params: GetTravelTimesParams = {},
  options?: TanStackOptions<TravelTimeRoute[]>
): UseQueryResult<TravelTimeRoute[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "travel-times",
      "getTravelTimes",
      JSON.stringify(params),
    ],
    queryFn: () => getTravelTimes(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
