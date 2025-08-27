/**
 * Vessel Accommodations API
 *
 * Provides detailed information about vessel accommodations and accessibility features from the Washington State Ferries system.
 * This API returns data about amenities such as restrooms, elevators, ADA accessibility, galley services, and public WiFi
 * available on each vessel. The data is useful for passengers planning their journey and understanding what facilities
 * are available on specific vessels.
 *
 * API Functions:
 * - getVesselAccommodationsById: Returns one VesselAccommodation object for the specified VesselID
 * - getVesselAccommodations: Returns an array of VesselAccommodation objects for all vessels
 *
 * Input/Output Overview:
 * - getVesselAccommodationsById: Input: { vesselId: number }, Output: VesselAccommodation
 * - getVesselAccommodations: Input: none, Output: VesselAccommodation[]
 *
 * Base Type: VesselAccommodation
 *
 * interface VesselAccommodation {
 *   VesselID: number;
 *   VesselSubjectID: number;
 *   VesselName: string;
 *   VesselAbbrev: string;
 *   Class: VesselClass;
 *   CarDeckRestroom: boolean;
 *   CarDeckShelter: boolean;
 *   Elevator: boolean;
 *   ADAAccessible: boolean;
 *   MainCabinGalley: boolean;
 *   MainCabinRestroom: boolean;
 *   PublicWifi: boolean;
 *   ADAInfo: string;
 *   AdditionalInfo: string | null;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Vessels API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselaccommodations/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
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
 *   "CarDeckRestroom": true,
 *   "CarDeckShelter": false,
 *   "Elevator": true,
 *   "ADAAccessible": true,
 *   "MainCabinGalley": true,
 *   "MainCabinRestroom": true,
 *   "PublicWifi": false,
 *   "ADAInfo": "The MV Cathlamet has elevator access from the auto deck to the passenger deck. Notify a ticket seller if you are traveling by car and need to park near an elevator. The vessel has accessible restrooms located on both the main passenger deck and the auto deck. The main passenger deck also has vending and newspaper machines, and a galley. This vessel is equipped with our visual paging system. ",
 *   "AdditionalInfo": " "
 * }
 * ```
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zNullableString,
  zPositiveInteger,
} from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateVessels } from "../wsf/cacheFlushDate";
import { vesselClassSchema } from "./vesselBasics";

// ============================================================================
// API Functions
//
// getVesselAccommodationsById (singular item)
// getVesselAccommodations (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/vessels/rest/vesselaccommodations/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselaccommodations";

/**
 * Retrieves accommodation and accessibility information for a specific vessel by its ID.
 *
 * @param params - Parameters object for vessel accommodation query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @returns Promise<VesselAccommodation> - Vessel accommodation and accessibility data
 *
 * @example
 * const vesselAccommodation = await getVesselAccommodationsById({ vesselId: 1 });
 * console.log(vesselAccommodation.VesselName);  // "Cathlamet"
 * console.log(vesselAccommodation.ADAAccessible);  // true
 * console.log(vesselAccommodation.Elevator);  // true
 *
 * @throws {Error} When vessel ID is invalid or API is unavailable
 */
export const getVesselAccommodationsById = async (
  params: GetVesselAccommodationsByIdParams
): Promise<VesselAccommodation> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselAccommodationsByIdParamsSchema,
      output: vesselAccommodationSchema,
    },
    params
  );
};

/**
 * Retrieves accommodation and accessibility information for all vessels.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<VesselAccommodation[]> - Array of vessel accommodation and accessibility data
 *
 * @example
 * const vesselAccommodations = await getVesselAccommodations();
 * console.log(vesselAccommodations.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getVesselAccommodations = async (): Promise<
  VesselAccommodation[]
> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselAccommodationArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselAccommodationsByIdParamsSchema
// GetVesselAccommodationsByIdParams
// ============================================================================

/**
 * Parameters for retrieving accommodation and accessibility information for a specific vessel
 */
export const getVesselAccommodationsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselAccommodationsByIdParams = z.infer<
  typeof getVesselAccommodationsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselAccommodationSchema
// vesselAccommodationArraySchema
// VesselAccommodation
// ============================================================================

/**
 * Vessel accommodation and accessibility data schema - includes amenities, ADA information, and facility details
 */
export const vesselAccommodationSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: vesselClassSchema.describe(""),
    CarDeckRestroom: z.boolean().describe(""),
    CarDeckShelter: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    ADAAccessible: z.boolean().describe(""),
    MainCabinGalley: z.boolean().describe(""),
    MainCabinRestroom: z.boolean().describe(""),
    PublicWifi: z.boolean().describe(""),
    ADAInfo: z.string().describe(""),
    AdditionalInfo: zNullableString().describe(""),
  })
  
  .describe("");

/**
 * VesselAccommodation type - represents vessel accommodation and accessibility data
 */
export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;

/**
 * Array of vessel accommodation objects - wrapper around vesselAccommodationSchema
 */
export const vesselAccommodationArraySchema = z
  .array(vesselAccommodationSchema)
  .describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselAccommodationsById (singular item)
// useVesselAccommodations (array)
// ============================================================================

/**
 * TanStack Query hook for vessel accommodation data with automatic updates (single item).
 *
 * @param params - Parameters object for vessel accommodation query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselAccommodation, Error> - Query result with vessel accommodation data
 *
 * @example
 * const { data: vesselAccommodation, isLoading } = useVesselAccommodationsById({ vesselId: 1 });
 * if (vesselAccommodation) {
 *   console.log(vesselAccommodation.VesselName);  // "Cathlamet"
 *   console.log(vesselAccommodation.ADAAccessible);  // true
 *   console.log(vesselAccommodation.Elevator);  // true
 * }
 */
export const useVesselAccommodationsById = (
  params: GetVesselAccommodationsByIdParams,
  options?: TanStackOptions<VesselAccommodation>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations", JSON.stringify(params)],
    queryFn: () => getVesselAccommodationsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all vessel accommodations with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselAccommodation[], Error> - Query result with array of vessel accommodation data
 *
 * @example
 * const { data: vesselAccommodations, isLoading } = useVesselAccommodations();
 * if (vesselAccommodations) {
 *   console.log(vesselAccommodations.length);  // 25
 * }
 */
export const useVesselAccommodations = (
  options?: TanStackOptions<VesselAccommodation[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "accommodations"],
    queryFn: getVesselAccommodations,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
