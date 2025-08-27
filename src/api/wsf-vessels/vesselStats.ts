/**
 * Vessel Statistics API
 *
 * Provides detailed vessel specifications and technical data from the Washington State Ferries system
 * including physical dimensions, engine specifications, capacity information, and construction details.
 * This API returns comprehensive vessel statistics such as length, beam, draft, engine count, horsepower,
 * passenger capacity, deck space, and historical information. The data is essential for maritime operations,
 * capacity planning, and technical documentation.
 *
 * API Functions:
 * - getVesselStatsById: Returns one VesselStats object for the specified VesselID
 * - getVesselStats: Returns an array of VesselStats objects for all vessels
 *
 * Input/Output Overview:
 * - getVesselStatsById: Input: { vesselId: number }, Output: VesselStats
 * - getVesselStats: Input: none, Output: VesselStats[]
 *
 * Base Type: VesselStats
 *
 * interface VesselStats {
 *   VesselID: number;
 *   VesselSubjectID: number;
 *   VesselName: string;
 *   VesselAbbrev: string;
 *   Class: VesselClass;
 *   VesselNameDesc: string;
 *   VesselHistory: string | null;
 *   Beam: string;
 *   CityBuilt: string;
 *   SpeedInKnots: number;
 *   Draft: string;
 *   EngineCount: number;
 *   Horsepower: number;
 *   Length: string;
 *   MaxPassengerCount: number;
 *   PassengerOnly: boolean;
 *   FastFerry: boolean;
 *   PropulsionInfo: string;
 *   TallDeckClearance: number;
 *   RegDeckSpace: number;
 *   TallDeckSpace: number;
 *   Tonnage: number;
 *   Displacement: number;
 *   YearBuilt: number;
 *   YearRebuilt: number | null;
 *   VesselDrawingImg: string | null;
 *   SolasCertified: boolean;
 *   MaxPassengerCountForInternational: number | null;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Vessels API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselstats/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "VesselID": 1,
 *   "VesselSubjectID": 1,
 *   "VesselName": "Cathlamet",
 *   "VesselAbbrev": "CAT",
 *   "Class": {
 *     "ClassID": 10,
 *     "ClassSubjectID": 310,
 *     "ClassName": "Issaquah 130",
 *     "SortSeq": 40,
 *     "DrawingImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130.gif",
 *     "SilhouetteImg": "https://www.wsdot.wa.gov/ferries/images/pages/boat_drawings/4-issaquah130-sillouette_sml.gif",
 *     "PublicDisplayName": "Issaquah"
 *   },
 *   "VesselNameDesc": "From the Kathlamet tribe, the Chinook word calamet meaning \"stone,\" was given to the tribe because its members lived along a rocky stretch of the Columbia River. A city also bears its name. ",
 *   "VesselHistory": " ",
 *   "Beam": "78' 8\"",
 *   "CityBuilt": "Seattle, WA",
 *   "SpeedInKnots": 16,
 *   "Draft": "16' 6\"",
 *   "EngineCount": 2,
 *   "Horsepower": 5000,
 *   "Length": "328'",
 *   "MaxPassengerCount": 1200,
 *   "PassengerOnly": false,
 *   "FastFerry": false,
 *   "PropulsionInfo": "DIESEL",
 *   "TallDeckClearance": 186,
 *   "RegDeckSpace": 124,
 *   "TallDeckSpace": 26,
 *   "Tonnage": 2477,
 *   "Displacement": 3310,
 *   "YearBuilt": 1981,
 *   "YearRebuilt": 1993,
 *   "VesselDrawingImg": null,
 *   "SolasCertified": false,
 *   "MaxPassengerCountForInternational": null
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
  zNullableNumber,
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";
import { createVesselIdDescription } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";
import { vesselClassSchema } from "./vesselBasics";

// ============================================================================
// API Functions
//
// getVesselStatsById (singular item)
// getVesselStats (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselstats/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselstats";

/**
 * Retrieves detailed vessel statistics and specifications for a specific vessel by its ID.
 *
 * @param params - Parameters object for vessel statistics query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @returns Promise<VesselStats> - Detailed vessel statistics including dimensions, engine specs, and capacity
 *
 * @example
 * const vesselStats = await getVesselStatsById({ vesselId: 1 });
 * console.log(vesselStats.VesselName);  // "Cathlamet"
 * console.log(vesselStats.Length);  // "328'"
 * console.log(vesselStats.MaxPassengerCount);  // 1200
 *
 * @throws {Error} When vessel ID is invalid or API is unavailable
 */
export const getVesselStatsById = async (
  params: GetVesselStatsByIdParams
): Promise<VesselStats> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselStatsByIdParamsSchema,
      output: vesselStatsSchema,
    },
    params
  );
};

/**
 * Retrieves detailed vessel statistics and specifications for all vessels.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<VesselStats[]> - Array of detailed vessel statistics for all vessels
 *
 * @example
 * const vesselStats = await getVesselStats();
 * console.log(vesselStats.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getVesselStats = async (): Promise<VesselStats[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselStatsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselStatsByIdParamsSchema
// GetVesselStatsByIdParams
// ============================================================================

/**
 * Parameters for retrieving detailed vessel statistics for a specific vessel
 */
export const getVesselStatsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselStatsByIdParams = z.infer<
  typeof getVesselStatsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselStatsSchema
// vesselStatsArraySchema
// VesselStats
// ============================================================================

/**
 * Vessel statistics and specifications schema - includes physical dimensions, engine specs, and capacity data
 */
export const vesselStatsSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: vesselClassSchema.describe(""),
    VesselNameDesc: z.string().describe(""),
    VesselHistory: zNullableString().describe(""),
    Beam: z.string().describe(""),
    CityBuilt: z.string().describe(""),
    SpeedInKnots: z.number().describe(""),
    Draft: z.string().describe(""),
    EngineCount: z.number().describe(""),
    Horsepower: z.number().describe(""),
    Length: z.string().describe(""),
    MaxPassengerCount: z.number().describe(""),
    PassengerOnly: z.boolean().describe(""),
    FastFerry: z.boolean().describe(""),
    PropulsionInfo: z.string().describe(""),
    TallDeckClearance: z.number().describe(""),
    RegDeckSpace: z.number().describe(""),
    TallDeckSpace: z.number().describe(""),
    Tonnage: z.number().describe(""),
    Displacement: z.number().describe(""),
    YearBuilt: z.number().describe(""),
    YearRebuilt: zNullableNumber().describe(""),
    VesselDrawingImg: zNullableString().describe(""),
    SolasCertified: z.boolean().describe(""),
    MaxPassengerCountForInternational: zNullableNumber().describe(""),
  })
  
  .describe("");

/**
 * VesselStats type - represents detailed vessel statistics and specifications
 */
export type VesselStats = z.infer<typeof vesselStatsSchema>;

/**
 * Array of vessel statistics objects - wrapper around vesselStatsSchema
 */
export const vesselStatsArraySchema = z.array(vesselStatsSchema).describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselStatsById (singular item)
// useVesselStats (array)
// ============================================================================

/**
 * TanStack Query hook for vessel statistics data with automatic updates (single item).
 *
 * @param params - Parameters object for vessel statistics query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselStats, Error> - Query result with vessel statistics data
 *
 * @example
 * const { data: vesselStats, isLoading } = useVesselStatsById({ vesselId: 1 });
 * if (vesselStats) {
 *   console.log(vesselStats.VesselName);  // "Cathlamet"
 *   console.log(vesselStats.Length);  // "328'"
 *   console.log(vesselStats.MaxPassengerCount);  // 1200
 * }
 */
export const useVesselStatsById = (
  params: GetVesselStatsByIdParams,
  options?: TanStackOptions<VesselStats>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats", JSON.stringify(params)],
    queryFn: () => getVesselStatsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all vessel statistics with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselStats[], Error> - Query result with array of vessel statistics data
 *
 * @example
 * const { data: vesselStats, isLoading } = useVesselStats();
 * if (vesselStats) {
 *   console.log(vesselStats.length);  // 25
 * }
 */
export const useVesselStats = (options?: TanStackOptions<VesselStats[]>) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "stats"],
    queryFn: getVesselStats,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
