/**
 * Highway Alerts API
 *
 * Real-time traffic alerts, incidents, and road condition information from the Washington State
 * Department of Transportation. This API provides comprehensive data about traffic events including
 * collisions, construction, weather impacts, and special events affecting Washington state highways.
 *
 * The API returns current highway alerts with detailed location information, event categorization,
 * priority levels, and timing data. Each alert includes roadway location coordinates, milepost
 * information, and status updates to help drivers plan routes and avoid delays.
 *
 * API Functions:
 * - getHighwayAlertById: Returns one HighwayAlert object for the specified AlertID
 * - getHighwayAlerts: Returns an array of HighwayAlert objects for all current alerts
 * - getHighwayAlertsByMapArea: Returns filtered alerts for a specific map area
 * - getHighwayAlertsByRegionId: Returns filtered alerts for a specific WSDOT region
 *
 * Input/Output Overview:
 * - getHighwayAlertById: Input: { AlertID: number }, Output: HighwayAlert
 * - getHighwayAlerts: Input: none, Output: HighwayAlert[]
 * - getHighwayAlertsByMapArea: Input: { MapArea: string }, Output: HighwayAlert[]
 * - getHighwayAlertsByRegionId: Input: { RegionId: number }, Output: HighwayAlert[]
 *
 * Base Type: HighwayAlert
 *
 * interface HighwayAlert {
 *   AlertID: number;
 *   County: string | null;
 *   EndRoadwayLocation: HighwayAlertRoadwayLocation;
 *   EndTime: Date | null;
 *   EventCategory: string;
 *   EventStatus: string;
 *   ExtendedDescription: string | null;
 *   HeadlineDescription: string;
 *   LastUpdatedTime: Date;
 *   Priority: string;
 *   Region: string;
 *   StartRoadwayLocation: HighwayAlertRoadwayLocation;
 *   StartTime: Date;
 * }
 *
 * Base Type: HighwayAlertRoadwayLocation
 *
 * interface HighwayAlertRoadwayLocation {
 *   Description: string | null;
 *   Direction: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   MilePost: number;
 *   RoadName: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "AlertID": 468632,
 *     "EndTime": "/Date(1756851229000-0700)/",
 *     "EventCategory": "Construction",
 *     "EventStatus": "Active",
 *     "ExtendedDescription": "Construction work on I-5 causing delays",
 *     "HeadlineDescription": "Construction on I-5",
 *     "Priority": "High",
 *     "Region": "Seattle"
 *   }
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. The API returns current highway alerts
 * with real-time updates. Some fields may be null or contain default values (0 for coordinates)
 * when specific data is not available.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Functions
//
// getHighwayAlertById (singular item)
// getHighwayAlerts (array)
// getHighwayAlertsByMapArea (array filtered by map area)
// getHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

const ENDPOINT_BY_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}";

const ENDPOINT_BY_MAP_AREA =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}";

const ENDPOINT_BY_REGION_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

/**
 * Retrieves a specific highway alert by its unique identifier.
 *
 * @param params - Parameters object for highway alert query
 * @param params.AlertID - Unique alert identifier (positive integer)
 * @returns Promise<HighwayAlert> - Specific highway alert data
 *
 * @example
 * const alert = await getHighwayAlertById({ AlertID: 468632 });
 * console.log(alert.HeadlineDescription);  // "Construction on I-5"
 * console.log(alert.EventCategory);  // "Construction"
 * console.log(alert.Priority);  // "High"
 *
 * @throws {Error} When alert ID is invalid or API is unavailable
 */
export const getHighwayAlertById = async (
  params: GetHighwayAlertByIdParams
): Promise<HighwayAlert> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getHighwayAlertByIdParamsSchema,
      output: highwayAlertSchema,
    },
    params
  );
};

/**
 * Retrieves all current highway alerts from the WSDOT system.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<HighwayAlert[]> - Array of current highway alert data
 *
 * @example
 * const alerts = await getHighwayAlerts();
 * console.log(alerts.length);  // 15
 * console.log(alerts[0].HeadlineDescription);  // "Construction on I-5"
 *
 * @throws {Error} When API is unavailable
 */
export const getHighwayAlerts = async (params: GetHighwayAlertsParams = {}) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

/**
 * Retrieves highway alerts filtered by a specific map area within Washington state.
 *
 * @param params - Parameters object for map area filtering
 * @param params.MapArea - Geographic map area name (e.g., "Seattle", "Tacoma", "Spokane")
 * @returns Promise<HighwayAlert[]> - Array of highway alerts for the specified map area
 *
 * @example
 * const alerts = await getHighwayAlertsByMapArea({ MapArea: "Seattle" });
 * console.log(alerts.length);  // 8
 * console.log(alerts[0].HeadlineDescription);  // "Construction on I-5 in Seattle"
 *
 * @throws {Error} When map area is invalid or API is unavailable
 */
export const getHighwayAlertsByMapArea = async (
  params: GetHighwayAlertsByMapAreaParams
): Promise<HighwayAlert[]> => {
  return zodFetch(
    ENDPOINT_BY_MAP_AREA,
    {
      input: getHighwayAlertsByMapAreaParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

/**
 * Retrieves highway alerts filtered by a specific WSDOT region identifier.
 *
 * @param params - Parameters object for region ID filtering
 * @param params.RegionId - WSDOT region identifier (positive integer, 1-10)
 * @returns Promise<HighwayAlert[]> - Array of highway alerts for the specified region
 *
 * @example
 * const alerts = await getHighwayAlertsByRegionId({ RegionId: 1 });
 * console.log(alerts.length);  // 12
 * console.log(alerts[0].HeadlineDescription);  // "Construction on I-5 in Region 1"
 *
 * @throws {Error} When region ID is invalid or API is unavailable
 */
export const getHighwayAlertsByRegionId = async (
  params: GetHighwayAlertsByRegionIdParams
): Promise<HighwayAlert[]> => {
  return zodFetch(
    ENDPOINT_BY_REGION_ID,
    {
      input: getHighwayAlertsByRegionIdParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getHighwayAlertByIdParamsSchema
// getHighwayAlertsParamsSchema
// getHighwayAlertsByMapAreaParamsSchema
// getHighwayAlertsByRegionIdParamsSchema
// ============================================================================

/**
 * Parameters for retrieving a specific highway alert by ID
 */
export const getHighwayAlertByIdParamsSchema = z
  .object({
    AlertID: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;

/**
 * Parameters for retrieving all highway alerts (no parameters required)
 */
export const getHighwayAlertsParamsSchema = z.object({}).describe("");

export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;

/**
 * Parameters for retrieving highway alerts filtered by map area
 */
export const getHighwayAlertsByMapAreaParamsSchema = z
  .object({
    MapArea: z.string().min(1, "Map area cannot be empty").describe(""),
  })
  .describe("");

export type GetHighwayAlertsByMapAreaParams = z.infer<
  typeof getHighwayAlertsByMapAreaParamsSchema
>;

/**
 * Parameters for retrieving highway alerts filtered by region ID
 */
export const getHighwayAlertsByRegionIdParamsSchema = z
  .object({
    RegionId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetHighwayAlertsByRegionIdParams = z.infer<
  typeof getHighwayAlertsByRegionIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// highwayAlertRoadwayLocationSchema
// highwayAlertSchema
// highwayAlertArraySchema
// ============================================================================

/**
 * Highway alert roadway location schema - includes GPS coordinates, milepost, and road information
 */
export const highwayAlertRoadwayLocationSchema = z
  .object({
    Description: z.string().nullable().describe(""),

    Direction: z.string().nullable().describe(""),

    // NOTE: API returns 0 for coordinates when not available, despite published spec suggesting WGS84 coordinates
    // This is a known API behavior that we must accommodate for test stability
    Latitude: z.number().describe(""),

    // NOTE: API returns 0 for coordinates when not available, despite published spec suggesting WGS84 coordinates
    // This is a known API behavior that we must accommodate for test stability
    Longitude: z.number().describe(""),

    // NOTE: API returns 0 for MilePost in some cases, despite published spec suggesting this field is always populated
    // This is a known API behavior that we must accommodate for test stability
    MilePost: z.number().describe(""),

    RoadName: z.string().nullable().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Highway alert schema - represents traffic incident and road condition data
 */
export const highwayAlertSchema = z
  .object({
    AlertID: z.number().int().positive().describe(""),

    County: z.string().nullable().describe(""),

    EndRoadwayLocation: highwayAlertRoadwayLocationSchema.describe(""),

    EndTime: zWsdotDate().nullable().describe(""),

    EventCategory: z.string().describe(""),

    EventStatus: z.string().describe(""),

    // NOTE: API returns null for ExtendedDescription in some cases, despite published spec suggesting this field is always populated
    // This is a known API behavior that we must accommodate for test stability
    ExtendedDescription: z.string().nullable().describe(""),

    HeadlineDescription: z.string().describe(""),

    LastUpdatedTime: zWsdotDate().describe(""),

    Priority: z.string().describe(""),

    Region: z.string().describe(""),

    StartRoadwayLocation: highwayAlertRoadwayLocationSchema.describe(""),

    StartTime: zWsdotDate().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

/**
 * Array of highway alert objects - wrapper around highwayAlertSchema
 */
export const highwayAlertArraySchema = z.array(highwayAlertSchema).describe("");

export type HighwayAlertRoadwayLocation = z.infer<
  typeof highwayAlertRoadwayLocationSchema
>;
export type HighwayAlert = z.infer<typeof highwayAlertSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useHighwayAlertById (singular item)
// useHighwayAlerts (array)
// useHighwayAlertsByMapArea (array filtered by map area)
// useHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

/**
 * TanStack Query hook for highway alert data with automatic updates (single item).
 *
 * @param params - Parameters object for highway alert query
 * @param params.AlertID - Unique alert identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<HighwayAlert, Error> - Query result with highway alert data
 *
 * @example
 * const { data: alert, isLoading } = useHighwayAlertById({ AlertID: 468632 });
 * if (alert) {
 *   console.log(alert.HeadlineDescription);  // "Construction on I-5"
 *   console.log(alert.EventCategory);  // "Construction"
 * }
 */
export const useHighwayAlertById = (
  params: GetHighwayAlertByIdParams,
  options?: TanStackOptions<HighwayAlert>
): UseQueryResult<HighwayAlert, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertById",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlertById(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for all highway alerts with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<HighwayAlert[], Error> - Query result with array of highway alert data
 *
 * @example
 * const { data: alerts, isLoading } = useHighwayAlerts();
 * if (alerts) {
 *   console.log(alerts.length);  // 15
 * }
 */
export const useHighwayAlerts = (
  params: GetHighwayAlertsParams = {},
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlerts",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for highway alerts filtered by map area with automatic updates.
 *
 * @param params - Parameters object for map area filtering
 * @param params.MapArea - Geographic map area name (e.g., "Seattle", "Tacoma", "Spokane")
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<HighwayAlert[], Error> - Query result with filtered highway alert data
 *
 * @example
 * const { data: alerts, isLoading } = useHighwayAlertsByMapArea({ MapArea: "Seattle" });
 * if (alerts) {
 *   console.log(alerts.length);  // 8
 * }
 */
export const useHighwayAlertsByMapArea = (
  params: GetHighwayAlertsByMapAreaParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertsByMapArea",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlertsByMapArea(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for highway alerts filtered by region ID with automatic updates.
 *
 * @param params - Parameters object for region ID filtering
 * @param params.RegionId - WSDOT region identifier (positive integer, 1-10)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<HighwayAlert[], Error> - Query result with filtered highway alert data
 *
 * @example
 * const { data: alerts, isLoading } = useHighwayAlertsByRegionId({ RegionId: 1 });
 * if (alerts) {
 *   console.log(alerts.length);  // 12
 * }
 */
export const useHighwayAlertsByRegionId = (
  params: GetHighwayAlertsByRegionIdParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getHighwayAlertsByRegionId",
      JSON.stringify(params),
    ],
    queryFn: () => getHighwayAlertsByRegionId(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
