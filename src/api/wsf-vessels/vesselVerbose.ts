/**
 * Vessel Verbose API
 *
 * Provides comprehensive vessel information from the Washington State Ferries system combining
 * data from multiple endpoints including basic information, accommodations, statistics, and
 * operational details. This API returns the most detailed vessel data available, combining
 * vessel basics, accommodations, and statistics into a single comprehensive response. The data
 * is useful for applications requiring complete vessel information without multiple API calls.
 *
 * API Functions:
 * - getVesselVerboseById: Returns one VesselVerbose object for the specified VesselID
 * - getVesselVerbose: Returns an array of VesselVerbose objects for all vessels
 *
 * Input/Output Overview:
 * - getVesselVerboseById: Input: { vesselId: number }, Output: VesselVerbose
 * - getVesselVerbose: Input: none, Output: VesselVerbose[]
 *
 * Base Type: VesselVerbose
 *
 * interface VesselVerbose {
 *   VesselID: number;
 *   VesselSubjectID: number;
 *   VesselName: string;
 *   VesselAbbrev: string;
 *   Class: VesselClass;
 *   Status: number;
 *   OwnedByWSF: boolean;
 *   CarDeckRestroom: boolean;
 *   CarDeckShelter: boolean;
 *   Elevator: boolean;
 *   ADAAccessible: boolean;
 *   MainCabinGalley: boolean;
 *   MainCabinRestroom: boolean;
 *   PublicWifi: boolean;
 *   ADAInfo: string;
 *   AdditionalInfo: string;
 *   VesselNameDesc: string;
 *   VesselHistory: string;
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
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselverbose/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
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
 *   "Status": 1,
 *   "OwnedByWSF": true,
 *   "CarDeckRestroom": true,
 *   "CarDeckShelter": false,
 *   "Elevator": true,
 *   "ADAAccessible": true,
 *   "MainCabinGalley": true,
 *   "MainCabinRestroom": true,
 *   "PublicWifi": false,
 *   "ADAInfo": "The MV Cathlamet has elevator access from the auto deck to the passenger deck. Notify a ticket seller if you are traveling by car and need to park near an elevator. The vessel has accessible restrooms located on both the main passenger deck and the auto deck. The main passenger deck also has vending and newspaper machines, and a galley. This vessel is equipped with our visual paging system. ",
 *   "AdditionalInfo": " ",
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

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zPositiveInteger } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getVesselVerboseById (singular item)
// getVesselVerbose (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselverbose/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselverbose";

/**
 * Retrieves comprehensive vessel information for a specific vessel by its ID.
 *
 * @param params - Parameters object for vessel verbose query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @returns Promise<VesselVerbose> - Comprehensive vessel information including basics, accommodations, and statistics
 *
 * @example
 * const vesselVerbose = await getVesselVerboseById({ vesselId: 1 });
 * console.log(vesselVerbose.VesselName);  // "Cathlamet"
 * console.log(vesselVerbose.Length);  // "328'"
 * console.log(vesselVerbose.ADAAccessible);  // true
 *
 * @throws {Error} When vessel ID is invalid or API is unavailable
 */
export const getVesselVerboseById = async (
  params: GetVesselVerboseByIdParams
): Promise<VesselVerbose> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselVerboseByIdParamsSchema,
      output: vesselVerboseSchema,
    },
    params
  );
};

/**
 * Retrieves comprehensive vessel information for all vessels.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<VesselVerbose[]> - Array of comprehensive vessel information for all vessels
 *
 * @example
 * const vesselVerbose = await getVesselVerbose();
 * console.log(vesselVerbose.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getVesselVerbose = async (): Promise<VesselVerbose[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselVerboseArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselVerboseByIdParamsSchema
// GetVesselVerboseByIdParams
// ============================================================================

/**
 * Parameters for retrieving comprehensive vessel information for a specific vessel
 */
export const getVesselVerboseByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselVerboseByIdParams = z.infer<
  typeof getVesselVerboseByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselVerboseSchema
// vesselVerboseArraySchema
// VesselVerbose
// ============================================================================

/**
 * Comprehensive vessel information schema - combines basics, accommodations, and statistics data
 */
export const vesselVerboseSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: z
      .object({
        ClassID: z.number().describe(""),
        ClassSubjectID: z.number().describe(""),
        ClassName: z.string().describe(""),
        SortSeq: z.number().describe(""),
        DrawingImg: z.string().describe(""),
        SilhouetteImg: z.string().describe(""),
        PublicDisplayName: z.string().describe(""),
      })
      .describe(""),
    Status: z.number().describe(""),
    OwnedByWSF: z.boolean().describe(""),
    YearBuilt: z.number().describe(""),
    Displacement: z.number().describe(""),
    Length: z.string().describe(""),
    Beam: z.string().describe(""),
    Draft: z.string().describe(""),
    SpeedInKnots: z.number().describe(""),
    EngineCount: z.number().describe(""),
    Horsepower: z.number().describe(""),
    MaxPassengerCount: z.number().describe(""),
    RegDeckSpace: z.number().describe(""),
    TallDeckSpace: z.number().describe(""),
    Tonnage: z.number().describe(""),
    PropulsionInfo: z.string().describe(""),
    ADAAccessible: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    CarDeckRestroom: z.boolean().describe(""),
    MainCabinGalley: z.boolean().describe(""),
    MainCabinRestroom: z.boolean().describe(""),
    PublicWifi: z.boolean().describe(""),
    ADAInfo: z.string().describe(""),
    VesselNameDesc: z.string().describe(""),
    VesselHistory: z.string().nullable().describe(""),
    CityBuilt: z.string().describe(""),
    YearRebuilt: z.number().nullable().describe(""),
    CarDeckShelter: z.boolean().describe(""),
    AdditionalInfo: z.string().nullable().describe(""),
  })
  
  .describe("");

/**
 * VesselVerbose type - represents comprehensive vessel information combining multiple data sources
 */
export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

/**
 * Array of comprehensive vessel objects - wrapper around vesselVerboseSchema
 */
export const vesselVerboseArraySchema = z
  .array(vesselVerboseSchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselVerboseById (singular item)
// useVesselVerbose (array)
// ============================================================================

/**
 * TanStack Query hook for comprehensive vessel data with automatic updates (single item).
 *
 * @param params - Parameters object for vessel verbose query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselVerbose, Error> - Query result with comprehensive vessel data
 *
 * @example
 * const { data: vesselVerbose, isLoading } = useVesselVerboseById({ vesselId: 1 });
 * if (vesselVerbose) {
 *   console.log(vesselVerbose.VesselName);  // "Cathlamet"
 *   console.log(vesselVerbose.Length);  // "328'"
 *   console.log(vesselVerbose.ADAAccessible);  // true
 * }
 */
export const useVesselVerboseById = (
  params: GetVesselVerboseByIdParams,
  options?: TanStackOptions<VesselVerbose>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose", JSON.stringify(params)],
    queryFn: () => getVesselVerboseById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all comprehensive vessel data with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselVerbose[], Error> - Query result with array of comprehensive vessel data
 *
 * @example
 * const { data: vesselVerbose, isLoading } = useVesselVerbose();
 * if (vesselVerbose) {
 *   console.log(vesselVerbose.length);  // 25
 * }
 */
export const useVesselVerbose = (
  options?: TanStackOptions<VesselVerbose[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "verbose"],
    queryFn: getVesselVerbose,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
