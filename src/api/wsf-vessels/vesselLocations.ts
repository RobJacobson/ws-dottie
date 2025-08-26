/**
 * Vessel Locations API
 *
 * Real-time vessel location, speed, heading, and operational status from the Washington State Ferries vessel tracking system.
 *
 * This API provides GPS coordinates, speed, heading, and operational status for all active vessels in the WSF fleet.
 * Data is updated approximately every 30 seconds to 2 minutes and includes departure/arrival terminal information,
 * estimated arrival times, and vessel watch status. Essential for real-time ferry tracking applications, passenger
 * information systems, and logistics planning. The API supports both individual vessel queries by ID and bulk
 * retrieval of all vessel locations.
 *
 * API Functions:
 * - getVesselLocationsByVesselId: Returns one VesselLocation object for the specified VesselID
 * - getVesselLocations: Returns an array of VesselLocation objects for all vessels
 *
 * Input/Output Overview:
 * - getVesselLocationsByVesselId: Input: { vesselId: number }, Output: VesselLocation
 * - getVesselLocations: Input: {} (no parameters), Output: VesselLocation[]
 *
 * Base Type: VesselLocation
 *
 * interface VesselLocation {
 *   VesselID: number;
 *   VesselName: string;
 *   Mmsi: number;
 *   DepartingTerminalID: number;
 *   DepartingTerminalName: string;
 *   DepartingTerminalAbbrev: string;
 *   ArrivingTerminalID: number | null;
 *   ArrivingTerminalName: string | null;
 *   ArrivingTerminalAbbrev: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   Speed: number;
 *   Heading: number;
 *   InService: boolean;
 *   AtDock: boolean;
 *   LeftDock: Date | null;
 *   Eta: Date | null;
 *   EtaBasis: string | null;
 *   ScheduledDeparture: Date | null;
 *   ManagedBy: number | null;
 *   OpRouteAbbrev: string[] | null;
 *   SortSeq: number | null;
 *   TimeStamp: Date;
 *   VesselPositionNum: number | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vessellocations/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "VesselID": 1,
 *   "VesselName": "Cathlamet",
 *   "Mmsi": 366773070,
 *   "DepartingTerminalID": 22,
 *   "DepartingTerminalName": "Vashon Island",
 *   "DepartingTerminalAbbrev": "VAI",
 *   "ArrivingTerminalID": null,
 *   "ArrivingTerminalName": null,
 *   "ArrivingTerminalAbbrev": null,
 *   "Latitude": 47.511142,
 *   "Longitude": -122.463895,
 *   "Speed": 0.1,
 *   "Heading": 169,
 *   "InService": true,
 *   "AtDock": true,
 *   "LeftDock": null,
 *   "Eta": null,
 *   "EtaBasis": null,
 *   "ScheduledDeparture": null,
 *   "ManagedBy": 1,
 *   "OpRouteAbbrev": ["f-v-s"],
 *   "SortSeq": 90,
 *   "TimeStamp": "/Date(1756176829000-0700)/",
 *   "VesselPositionNum":
 *   "VesselWatchMsg": "WSF's VesselWatch page is currently not responding and is out of service. Thank you for your patience while we work to restore this page. ", // Undocumented field
 *   "VesselWatchShutFlag": "0",
 *   "VesselWatchShutID": 22, // Undocumented field
 *   "VesselWatchShutMsg": "", // Undocumented field
 *   "VesselWatchStatus": "0" // Undocumented field
 * }
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zPositiveInteger,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createVesselIdDescription } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";

// ============================================================================
// API Functions
//
// getVesselLocationsByVesselId (singular item)
// getVesselLocations (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

/**
 * Retrieves real-time location data for a specific vessel by its ID.
 *
 * @param params - Parameters object containing vesselId: number
 * @returns Promise<VesselLocation> - Real-time vessel location and status data
 *
 * @example
 * const vesselLocation = await getVesselLocationsByVesselId({ vesselId: 1 });
 * console.log(vesselLocation.VesselName);  // "Cathlamet"
 * console.log(vesselLocation.Speed);  // 0.1
 * console.log(vesselLocation.Latitude);  // 47.511142
 * console.log(vesselLocation.Longitude);  // -122.463895
 *
 * @throws {Error} When vessel ID is invalid or API is unavailable
 */
export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselLocationsByVesselIdParamsSchema,
      output: vesselLocationSchema,
    },
    params
  );
};

/**
 * Retrieves real-time location data for all active vessels.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<VesselLocation[]> - Array of real-time vessel location data
 *
 * @example
 * const vesselLocations = await getVesselLocations();
 * console.log(vesselLocations.length);  // 20
 *
 * @throws {Error} When API is unavailable
 */
export const getVesselLocations = async (
  params: GetVesselLocationsParams = {}
): Promise<VesselLocation[]> => {
  return zodFetch(ENDPOINT_ALL, {
    input: getVesselLocationsParamsSchema,
    output: vesselLocationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

/**
 * Input Schema for getVesselLocationsByVesselId (single item by id):
 */
export const getVesselLocationsByVesselIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

/**
 * Type for getVesselLocationsByVesselId (single item by id):
 */
export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

/**
 * Input Schema for getVesselLocations (all items - no parameters required)
 */
export const getVesselLocationsParamsSchema = z.object({}).describe("");

/**
 * Type for getVesselLocations (all items - no parameters required)
 */
export type GetVesselLocationsParams = z.infer<
  typeof getVesselLocationsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselLocationSchema
// vesselLocationArraySchema
// VesselLocation
// ============================================================================

const zDate = () => zWsdotDate();

// Output Schema & Type for getVesselLocationsByVesselId (single item by id):

export const vesselLocationSchema = z
  .object({
    VesselID: z.number().int().positive().describe(""),
    VesselName: z.string().min(1).describe(""),
    Mmsi: z.number().describe(""),
    DepartingTerminalID: z.number().describe(""),
    DepartingTerminalName: z.string().describe(""),
    DepartingTerminalAbbrev: z.string().describe(""),
    ArrivingTerminalID: z.number().nullable().describe(""),
    ArrivingTerminalName: z.string().nullable().describe(""),
    ArrivingTerminalAbbrev: z.string().nullable().describe(""),
    Latitude: z.number().min(-90).max(90).describe(""),
    Longitude: z.number().min(-180).max(180).describe(""),
    Speed: z.number().min(0).describe(""),
    Heading: z.number().min(0).max(359).describe(""),
    InService: z.boolean().describe(""),
    AtDock: z.boolean().describe(""),
    LeftDock: zDate().nullable().describe(""),
    Eta: zDate().nullable().describe(""),
    EtaBasis: z.string().nullable().describe(""),
    ScheduledDeparture: zDate().nullable().describe(""),
    ManagedBy: z.number().nullable().describe(""),
    OpRouteAbbrev: z.array(z.string()).nullable().describe(""),
    SortSeq: z.number().nullable().describe(""),
    TimeStamp: zDate().describe(""),
    VesselPositionNum: z.number().nullable().describe(""),
    VesselWatchMsg: z.string().nullable().describe(""),
    VesselWatchShutFlag: z.string().describe(""),
    VesselWatchShutID: z.number().nullable().describe(""),
    VesselWatchShutMsg: z.string().nullable().describe(""),
    VesselWatchStatus: z.string().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export type VesselLocation = z.infer<typeof vesselLocationSchema>;
/**
 * Array of vessel location objects - wrapper around vesselLocationSchema
 */
export const vesselLocationArraySchema = z
  .array(vesselLocationSchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselLocationsByVesselId (singular item)
// useVesselLocations (array)
// ============================================================================

/**
 * TanStack Query hook for vessel location data with automatic updates (single item).
 *
 * @param params - Parameters object containing vesselId: number
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselLocation, Error> - Query result with real-time vessel data
 *
 * @example
 * const { data: vesselLocation, isLoading } = useVesselLocationsByVesselId({ vesselId: 1 });
 * if (vesselLocation) {
 *   console.log(vesselLocation.VesselName);  // "Cathlamet"
 *   console.log(vesselLocation.Speed);  // 0.1
 * }
 */
export const useVesselLocationsByVesselId = (
  params: GetVesselLocationsByVesselIdParams,
  options?: TanStackOptions<VesselLocation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "locations", JSON.stringify(params)],
    queryFn: () => getVesselLocationsByVesselId(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.REALTIME_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all vessel locations with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselLocation[], Error> - Query result with array of real-time vessel data
 *
 * @example
 * const { data: vesselLocations, isLoading } = useVesselLocations();
 * if (vesselLocations) {
 *   console.log(vesselLocations.length);  // 20
 * }
 */
export const useVesselLocations = (
  params: GetVesselLocationsParams = {},
  options?: TanStackOptions<VesselLocation[]>
): UseQueryResult<VesselLocation[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "locations", JSON.stringify(params)],
    queryFn: () => getVesselLocations(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.REALTIME_UPDATES, ...options },
    params,
  });
};
