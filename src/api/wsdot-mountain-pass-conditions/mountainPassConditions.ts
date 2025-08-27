/**
 * WSDOT Mountain Pass Conditions API
 *
 * Real-time weather and road condition information for mountain passes throughout Washington State,
 * providing critical travel information for high-elevation highway corridors during winter months
 * and adverse weather conditions. Covers major mountain passes including Snoqualmie Pass (I-90),
 * Stevens Pass (US 2), White Pass (US 12), Blewett Pass (US 97), and other high-altitude routes.
 *
 * This API enables applications to display current mountain pass conditions, monitor weather
 * impacts on travel, and provide essential information for winter driving safety. Data includes
 * elevation information, temperature readings, travel restrictions, road conditions, and weather
 * updates for passes that are critical to cross-state travel and commerce.
 *
 * API Functions:
 * - getMountainPassConditionById: Returns one MountainPassCondition object for the specified PassConditionID
 * - getMountainPassConditions: Returns an array of MountainPassCondition objects for all mountain passes
 *
 * Input/Output Overview:
 * - getMountainPassConditionById: Input: { passConditionId: number }, Output: MountainPassCondition
 * - getMountainPassConditions: Input: none, Output: MountainPassCondition[]
 *
 * Base Type: MountainPassCondition
 *
 * interface MountainPassCondition {
 *   DateUpdated: string; // .NET timestamp format
 *   ElevationInFeet: number;
 *   Latitude: number;
 *   Longitude: number;
 *   MountainPassId: number;
 *   MountainPassName: string | null;
 *   RestrictionOne: TravelRestriction | null;
 *   RestrictionTwo: TravelRestriction | null;
 *   RoadCondition: string | null;
 *   TemperatureInFahrenheit: number | null;
 *   TravelAdvisoryActive: boolean;
 *   WeatherCondition: string | null;
 * }
 *
 * interface TravelRestriction {
 *   TravelDirection: string | null;
 *   RestrictionText: string | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID=1&AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the single mountain pass condition curl command:
 *
 * ```json
 * {
 *   "DateUpdated": "/Date(1755871897433-0700)/",
 *   "ElevationInFeet": 4102,
 *   "Latitude": 47.335298205,
 *   "Longitude": -120.581068216,
 *   "MountainPassId": 1,
 *   "MountainPassName": "Blewett Pass US 97",
 *   "RestrictionOne": {
 *     "RestrictionText": "No restrictions",
 *     "TravelDirection": "Northbound"
 *   },
 *   "RestrictionTwo": {
 *     "RestrictionText": "No restrictions",
 *     "TravelDirection": "Southbound"
 *   },
 *   "RoadCondition": "Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1. Should adverse weather or other incidents occur that will impact travel, updates will be provided as information is available.",
 *   "TemperatureInFahrenheit": null,
 *   "TravelAdvisoryActive": true,
 *   "WeatherCondition": ""
 * }
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Functions
//
// getMountainPassConditionById (singular first)
// ============================================================================

const SINGLE_PASS_ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={passConditionId}";

/**
 * Retrieves real-time mountain pass condition data for a specific pass by its ID.
 *
 * @param params - Parameters object for mountain pass condition query
 * @param params.passConditionId - Unique mountain pass condition identifier (positive integer)
 * @returns Promise<MountainPassCondition> - Real-time mountain pass condition data for the specified pass
 *
 * @example
 * const passCondition = await getMountainPassConditionById({ passConditionId: 1 });
 * console.log(passCondition.MountainPassName);  // "Blewett Pass US 97"
 * console.log(passCondition.ElevationInFeet);  // 4102
 * console.log(passCondition.TravelAdvisoryActive);  // true
 *
 * @throws {Error} When pass condition ID is invalid or API is unavailable
 */
export const getMountainPassConditionById = async (
  params: GetMountainPassConditionByIdParams
): Promise<MountainPassCondition> => {
  return zodFetch(
    SINGLE_PASS_ENDPOINT,
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    },
    params
  );
};

// ============================================================================
// getMountainPassConditions (array second)
// ============================================================================

const ALL_PASSES_ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson";

/**
 * Retrieves real-time mountain pass condition data for all available mountain passes.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<MountainPassCondition[]> - Array of real-time mountain pass condition data for all passes
 *
 * @example
 * const passConditions = await getMountainPassConditions();
 * console.log(passConditions.length);  // 20+
 *
 * @throws {Error} When API is unavailable
 */
export const getMountainPassConditions = async (
  params: GetMountainPassConditionsParams = {}
): Promise<MountainPassCondition[]> => {
  return zodFetch(
    ALL_PASSES_ENDPOINT,
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types (singular first, then array)
// ============================================================================

/**
 * Parameters for retrieving real-time mountain pass condition data for a specific pass
 */
export const getMountainPassConditionByIdParamsSchema = z
  .object({
    passConditionId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

/**
 * Parameters for retrieving all mountain pass conditions (no parameters required)
 */
export const getMountainPassConditionsParamsSchema = z.object({}).describe("");

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types (shared schemas first, then array wrappers)
// ============================================================================

/**
 * TravelRestriction type - represents travel restrictions for a specific direction on a mountain pass
 */
export const travelRestrictionSchema = z
  .object({
    TravelDirection: z.string().nullable().describe(""),

    RestrictionText: z.string().nullable().describe(""),
  })
  
  .describe("");

/**
 * Real-time mountain pass condition data schema - includes weather, road conditions, and travel restrictions
 */
export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate().describe(""),

    ElevationInFeet: z.number().describe(""),

    Latitude: zLatitude().describe(""),

    Longitude: zLongitude().describe(""),

    MountainPassId: z.number().int().positive().describe(""),

    MountainPassName: z.string().nullable().describe(""),

    RestrictionOne: travelRestrictionSchema.nullable().describe(""),

    RestrictionTwo: travelRestrictionSchema.nullable().describe(""),

    RoadCondition: z.string().nullable().describe(""),

    TemperatureInFahrenheit: zNullableNumber().describe(""),

    TravelAdvisoryActive: z.boolean().describe(""),

    WeatherCondition: z.string().nullable().describe(""),
  })
  
  .describe("");

/**
 * Array of mountain pass condition objects - wrapper around mountainPassConditionSchema
 */
export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe("");

/**
 * TravelRestriction type - represents travel restrictions for a specific direction on a mountain pass
 */
export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

/**
 * MountainPassCondition type - represents real-time mountain pass condition data
 */
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

// ============================================================================
// TanStack Query Hooks (singular first, then array)
// ============================================================================

/**
 * TanStack Query hook for mountain pass condition data with automatic updates (single item).
 *
 * @param params - Parameters object for mountain pass condition query
 * @param params.passConditionId - Unique mountain pass condition identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<MountainPassCondition, Error> - Query result with real-time mountain pass condition data
 *
 * @example
 * const { data: passCondition, isLoading } = useMountainPassConditionById({ passConditionId: 1 });
 * if (passCondition) {
 *   console.log(passCondition.MountainPassName);  // "Blewett Pass US 97"
 *   console.log(passCondition.ElevationInFeet);  // 4102
 * }
 */
export const useMountainPassConditionById = (
  params: GetMountainPassConditionByIdParams,
  options?: TanStackOptions<MountainPassCondition>
): UseQueryResult<MountainPassCondition, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditionById",
      JSON.stringify(params),
    ],
    queryFn: () => getMountainPassConditionById(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * TanStack Query hook for all mountain pass conditions with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<MountainPassCondition[], Error> - Query result with array of real-time mountain pass condition data
 *
 * @example
 * const { data: passConditions, isLoading } = useMountainPassConditions();
 * if (passConditions) {
 *   console.log(passConditions.length);  // 20+
 * }
 */
export const useMountainPassConditions = (
  params: GetMountainPassConditionsParams = {},
  options?: TanStackOptions<MountainPassCondition[]>
): UseQueryResult<MountainPassCondition[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "mountain-pass-conditions",
      "getMountainPassConditions",
      JSON.stringify(params),
    ],
    queryFn: () => getMountainPassConditions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
