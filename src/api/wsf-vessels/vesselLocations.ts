/**
 * @module WSF Vessels — Vessel Locations API
 * @description Real-time vessel location data for Washington State Ferries.
 *
 * Provides:
 * - Current positions and headings for active vessels
 * - Access to a single vessel's latest known location
 *
 * Data includes:
 * - Vessel identifiers and names
 * - Coordinates, speed, heading, last update time
 *
 * @functions
 *   - getVesselLocationsByVesselId: Returns a single VesselLocation by vesselId
 *   - getVesselLocations: Returns an array of VesselLocation objects for all vessels
 *
 * @input
 *   - getVesselLocationsByVesselId: { vesselId: number } - Unique vessel identifier
 *   - getVesselLocations: {} - No parameters required
 *
 * @output
 *   - getVesselLocationsByVesselId: VesselLocation - Single vessel location
 *   - getVesselLocations: VesselLocation[] - Array of vessel locations
 *
 * @baseType
 *   - VesselLocation: Vessel metadata and current position information
 *
 * @cli
 *   - getVesselLocationsByVesselId: node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'
 *   - getVesselLocations: node dist/cli.mjs getVesselLocations
 *
 * @exampleResponse
 * {
 *   "VesselID": 1,
 *   "VesselName": "Example",
 *   "Mmsi": 123456789,
 *   "DepartingTerminalID": 1,
 *   "DepartingTerminalName": "Anacortes",
 *   "DepartingTerminalAbbrev": "ANA",
 *   "ArrivingTerminalID": 10,
 *   "ArrivingTerminalName": "Friday Harbor",
 *   "ArrivingTerminalAbbrev": "FRH",
 *   "Latitude": 48.5299,
 *   "Longitude": -122.6728,
 *   "Speed": 16.3,
 *   "Heading": 0,
 *   "InService": true,
 *   "AtDock": false,
 *   "LeftDock": "2025-08-28T23:45:00.000Z",
 *   "Eta": "2025-08-29T01:00:00.000Z",
 *   "EtaBasis": "...",
 *   "ScheduledDeparture": "2025-08-28T23:45:00.000Z",
 *   "ManagedBy": 1,
 *   "OpRouteAbbrev": ["ana-sj"],
 *   "SortSeq": 20,
 *   "TimeStamp": "2025-08-28T23:50:49.000Z",
 *   "VesselPositionNum": 1
 * }
 *
 * @see https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html
 */

import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zPositiveInteger,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import { FIVE_SECONDS, ONE_HOUR } from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getVesselLocationsByVesselId (singular item)
// getVesselLocations (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vessellocations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vessellocations";

/**
 * Fetches a single vessel location by `vesselId`.
 *
 * @param params - `{ vesselId: number }` unique vessel identifier
 * @returns `VesselLocation` - Validated vessel location object
 *
 * @example
 * ```typescript
 * const item = await getVesselLocationsByVesselId({ vesselId: 1 })
 * console.log(item.VesselName)
 * ```
 *
 * @throws {Error} If input or response validation fails
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
 * Fetches vessel locations for all active vessels.
 *
 * @param params - `{}` no parameters required
 * @returns `VesselLocation[]` - Array of validated vessel location objects
 *
 * @example
 * ```typescript
 * const items = await getVesselLocations({})
 * console.log(items.length)
 * ```
 *
 * @throws {Error} If response validation fails
 */
export const getVesselLocations = async (
  params: GetVesselLocationsParams = {}
): Promise<VesselLocations> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getVesselLocationsParamsSchema,
      output: vesselLocationArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getVesselLocationsByVesselIdParamsSchema
// GetVesselLocationsByVesselIdParams
// ============================================================================

/**
 * Input schema for the `getVesselLocationsByVesselId` request
 */
export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: zPositiveInteger("vessel"),
});

/**
 * GetVesselLocationsByVesselIdParams type - validated input parameters for
 * `getVesselLocationsByVesselId`
 */
export type GetVesselLocationsByVesselIdParams = z.infer<
  typeof getVesselLocationsByVesselIdParamsSchema
>;

/**
 * Input schema for the `getVesselLocations` request (no parameters)
 */
export const getVesselLocationsParamsSchema = z.object({});

/**
 * GetVesselLocationsParams type - validated input parameters for `getVesselLocations`
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

/**
 * Response schema for a single `VesselLocation`
 */
export const vesselLocationSchema = z.object({
  VesselID: z.number().int().positive(),
  VesselName: z.string().min(1),
  Mmsi: z.number(),
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  DepartingTerminalAbbrev: z.string(),
  ArrivingTerminalID: z.number().nullable(),
  ArrivingTerminalName: z.string().nullable(),
  ArrivingTerminalAbbrev: z.string().nullable(),
  Latitude: z.number().min(-90).max(90),
  Longitude: z.number().min(-180).max(180),
  Speed: z.number().min(0),
  Heading: z.number().min(0).max(359),
  InService: z.boolean(),
  AtDock: z.boolean(),
  LeftDock: zWsdotDate().nullable(),
  Eta: zWsdotDate().nullable(),
  EtaBasis: z.string().nullable(),
  ScheduledDeparture: zWsdotDate().nullable(),
  ManagedBy: z.number().nullable(),
  OpRouteAbbrev: z.array(z.string()).nullable(),
  SortSeq: z.number().nullable(),
  TimeStamp: zWsdotDate(),
  VesselPositionNum: z.number().nullable(),
});

/**
 * VesselLocation type - validated vessel location object
 */
export type VesselLocation = z.infer<typeof vesselLocationSchema>;

/**
 * Response schema for an array of `VesselLocation`
 */
export const vesselLocationArraySchema = z.array(vesselLocationSchema);

/**
 * VesselLocations type - represents an array of vessel location objects
 */
export type VesselLocations = z.infer<typeof vesselLocationArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

export const vesselLocationsByVesselIdOptions = (
  params: GetVesselLocationsByVesselIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "vessels",
      "locations",
      "getVesselLocationsByVesselId",
      params,
    ],
    queryFn: () => getVesselLocationsByVesselId(params),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const vesselLocationsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
    queryFn: () => getVesselLocations({}),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
