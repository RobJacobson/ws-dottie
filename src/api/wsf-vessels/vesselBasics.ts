/**
 * Vessel Basics API
 *
 * Provides basic vessel information from the Washington State Ferries system including vessel identification,
 * class details, operational status, and ownership information. This API returns fundamental vessel data
 * such as vessel names, abbreviations, class specifications with drawings, and operational status indicators.
 * The data is essential for vessel identification and basic fleet management operations.
 *
 * API Functions:
 * - getVesselBasicsById: Returns one VesselBasic object for the specified VesselID
 * - getVesselBasics: Returns an array of VesselBasic objects for all vessels
 *
 * Input/Output Overview:
 * - getVesselBasicsById: Input: { vesselId: number }, Output: VesselBasic
 * - getVesselBasics: Input: none, Output: VesselBasic[]
 *
 * Base Type: VesselBasic
 *
 * interface VesselBasic {
 *   VesselID: number;
 *   VesselSubjectID: number;
 *   VesselName: string;
 *   VesselAbbrev: string;
 *   Class: VesselClass;
 *   Status: number;
 *   OwnedByWSF: boolean;
 * }
 *
 * VesselClass Type:
 *
 * interface VesselClass {
 *   ClassID: number;
 *   ClassSubjectID: number;
 *   ClassName: string;
 *   SortSeq: number;
 *   DrawingImg: string;
 *   SilhouetteImg: string;
 *   PublicDisplayName: string;
 * }
 *
 * Note: Only includes fields that are officially documented in the WSF Vessels API specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/vessels/rest/vesselbasics/1?apiaccesscode=$WSDOT_ACCESS_TOKEN"
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
 *   "OwnedByWSF": true
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
// getVesselBasicsById (singular item)
// getVesselBasics (array)
// ============================================================================

const ENDPOINT_BY_ID = "/ferries/api/vessels/rest/vesselbasics/{vesselId}";
const ENDPOINT_ALL = "/ferries/api/vessels/rest/vesselbasics";

/**
 * Retrieves basic vessel information for a specific vessel by its ID.
 *
 * @param params - Parameters object for vessel basics query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @returns Promise<VesselBasic> - Basic vessel information including class details and status
 *
 * @example
 * const vesselBasic = await getVesselBasicsById({ vesselId: 1 });
 * console.log(vesselBasic.VesselName);  // "Cathlamet"
 * console.log(vesselBasic.Class.ClassName);  // "Issaquah 130"
 * console.log(vesselBasic.Status);  // 1
 *
 * @throws {Error} When vessel ID is invalid or API is unavailable
 */
export const getVesselBasicsById = async (
  params: GetVesselBasicsByIdParams
): Promise<VesselBasic> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getVesselBasicsByIdParamsSchema,
      output: vesselBasicSchema,
    },
    params
  );
};

/**
 * Retrieves basic vessel information for all vessels.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<VesselBasic[]> - Array of basic vessel information for all vessels
 *
 * @example
 * const vesselBasics = await getVesselBasics();
 * console.log(vesselBasics.length);  // 25
 *
 * @throws {Error} When API is unavailable
 */
export const getVesselBasics = async (): Promise<VesselBasic[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: vesselBasicArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselBasicsByIdParamsSchema
// GetVesselBasicsByIdParams
// ============================================================================

/**
 * Parameters for retrieving basic vessel information for a specific vessel
 */
export const getVesselBasicsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(""),
  })
  .describe("");

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// vesselBasicSchema
// vesselBasicArraySchema
// VesselBasic
// VesselClass
// ============================================================================

/**
 * Vessel class information schema - includes class identification, names, and visual assets
 */
export const vesselClassSchema = z
  .object({
    ClassID: z.number().describe(""),
    ClassSubjectID: z.number().describe(""),
    ClassName: z.string().describe(""),
    SortSeq: z.number().describe(""),
    DrawingImg: z.string().describe(""),
    SilhouetteImg: z.string().describe(""),
    PublicDisplayName: z.string().describe(""),
  })
  
  .describe("");

/**
 * Basic vessel information schema - includes vessel identification, class details, and operational status
 */
export const vesselBasicSchema = z
  .object({
    VesselID: z.number().describe(""),
    VesselSubjectID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselAbbrev: z.string().describe(""),
    Class: vesselClassSchema.describe(""),
    Status: z.number().describe(""),
    OwnedByWSF: z.boolean().describe(""),
  })
  
  .describe("");

/**
 * VesselBasic type - represents basic vessel information including class details and status
 */
export type VesselBasic = z.infer<typeof vesselBasicSchema>;

/**
 * VesselClass type - represents vessel class information with visual assets
 */
export type VesselClass = z.infer<typeof vesselClassSchema>;

/**
 * Array of basic vessel objects - wrapper around vesselBasicSchema
 */
export const vesselBasicArraySchema = z.array(vesselBasicSchema).describe("");

// ============================================================================
// TanStack Query Hooks
//
// useVesselBasicsById (singular item)
// useVesselBasics (array)
// ============================================================================

/**
 * TanStack Query hook for vessel basics data with automatic updates (single item).
 *
 * @param params - Parameters object for vessel basics query
 * @param params.vesselId - Unique vessel identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselBasic, Error> - Query result with basic vessel data
 *
 * @example
 * const { data: vesselBasic, isLoading } = useVesselBasicsById({ vesselId: 1 });
 * if (vesselBasic) {
 *   console.log(vesselBasic.VesselName);  // "Cathlamet"
 *   console.log(vesselBasic.Class.ClassName);  // "Issaquah 130"
 *   console.log(vesselBasic.Status);  // 1
 * }
 */
export const useVesselBasicsById = (
  params: { vesselId: number },
  options?: TanStackOptions<VesselBasic>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics", JSON.stringify(params)],
    queryFn: () => getVesselBasicsById(params),
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

/**
 * TanStack Query hook for all vessel basics with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<VesselBasic[], Error> - Query result with array of basic vessel data
 *
 * @example
 * const { data: vesselBasics, isLoading } = useVesselBasics();
 * if (vesselBasics) {
 *   console.log(vesselBasics.length);  // 25
 * }
 */
export const useVesselBasics = (options?: TanStackOptions<VesselBasic[]>) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: getVesselBasics,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
