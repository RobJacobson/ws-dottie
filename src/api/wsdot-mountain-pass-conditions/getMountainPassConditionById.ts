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
// API Function
//
// getMountainPassConditionById
// ============================================================================

const ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={passConditionId}";

/**
 * Retrieves a specific mountain pass condition by ID
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID. This endpoint provides individual pass data and works
 * correctly when using valid MountainPassId values.
 *
 * @param params - Object containing passConditionId parameter
 * @param params.passConditionId - The ID of the specific mountain pass condition (e.g., 11 for Snoqualmie Pass I-90, 10 for Stevens Pass US 2, 12 for White Pass US 12)
 * @returns Promise containing the specific mountain pass condition data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const condition = await getMountainPassConditionById({ passConditionId: 11 });
 * console.log(condition.MountainPassName); // "Snoqualmie Pass I-90"
 * console.log(condition.ElevationInFeet); // 3022
 * ```
 */
export const getMountainPassConditionById = async (
  params: GetMountainPassConditionByIdParams
): Promise<MountainPassCondition> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMountainPassConditionByIdParamsSchema,
      output: mountainPassConditionSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getMountainPassConditionByIdParamsSchema
// GetMountainPassConditionByIdParams
// ============================================================================

export const getMountainPassConditionByIdParamsSchema = z
  .object({
    passConditionId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific mountain pass condition to retrieve. This ID corresponds to specific passes like 1 for Blewett Pass US 97, 11 for Snoqualmie Pass I-90, 10 for Stevens Pass US 2, 12 for White Pass US 12, 3 for Chinook Pass SR 410, and others. The ID is assigned by the WSDOT system and can be obtained from the getMountainPassConditions endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving a specific mountain pass condition by its unique identifier. Use IDs like 11 for Snoqualmie Pass I-90, 10 for Stevens Pass US 2, or 12 for White Pass US 12. This endpoint works correctly and returns detailed condition data for the specified mountain pass."
  );

export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// mountainPassConditionSchema
// MountainPassCondition
// ============================================================================

export const travelRestrictionSchema = z
  .object({
    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for which the restriction applies. Examples include 'Northbound' for passes like Blewett Pass US 97, 'Southbound' for Stevens Pass US 2, 'Eastbound' for Snoqualmie Pass I-90, 'Westbound' for White Pass US 12, 'Both Directions' for most passes during normal conditions, or 'All Lanes' for full closures. This field indicates which direction of travel is affected by the restriction."
      ),

    RestrictionText: z
      .string()
      .nullable()
      .describe(
        "Detailed description of the travel restriction or requirement. This field contains the specific text explaining what restrictions are in place, such as 'No restrictions' (most common during summer), 'Chains required' (for winter conditions), '4WD/AWD only' (for severe weather), 'No trailers' (for steep grades), 'Passenger vehicles only' (for hazardous conditions), or 'No current information available' (when data is unavailable)."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Travel restriction information for a specific direction on a mountain pass. Contains details about what vehicles or travel conditions are allowed or restricted on the pass. For example, during summer months most passes show 'No restrictions' in both directions, while winter conditions may require 'Chains required' or '4WD/AWD only' for safety."
  );

export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate().describe(
      "Timestamp indicating when this mountain pass condition information was last updated in the WSDOT system. This field shows the currency of the condition data and helps users determine if they should check for more recent updates. For example, during active winter conditions, updates may occur multiple times daily, while summer updates are less frequent. All times are in Pacific Time Zone."
    ),

    ElevationInFeet: z
      .number()
      .describe(
        "Elevation of the mountain pass in feet above sea level. This field provides important context for understanding the altitude where the conditions apply, which is crucial for weather-related travel planning and safety considerations. Examples include Snoqualmie Pass I-90 at 3022 ft, Stevens Pass US 2 at 4061 ft, Chinook Pass SR 410 at 5430 ft, White Pass US 12 at 4500 ft, and Blewett Pass US 97 at 4102 ft."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the mountain pass location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the pass. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the mountain pass location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the pass. Essential for GPS navigation and geographic information systems."
    ),

    MountainPassId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this mountain pass by the WSDOT system. This ID serves as a permanent, unique reference for the pass across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes. Examples include ID 1 for Blewett Pass US 97, ID 11 for Snoqualmie Pass I-90, ID 10 for Stevens Pass US 2, ID 12 for White Pass US 12, and ID 3 for Chinook Pass SR 410."
      ),

    MountainPassName: z
      .string()
      .nullable()
      .describe(
        "Official name of the mountain pass including its route designation. Examples include 'Snoqualmie Pass I-90', 'Stevens Pass US 2', 'White Pass US 12', 'Chinook Pass SR 410', 'Blewett Pass US 97', 'Cayuse Pass SR 123', 'Manastash Ridge I-82', 'Mt. Baker Hwy SR 542', 'North Cascade Hwy SR 20', 'Satus Pass US 97', 'Sherman Pass SR 20', 'Tiger Mountain SR18', 'Wauconda Pass SR 20', or 'Disautel Pass SR 155'. This field provides the complete recognizable name used by travelers and transportation officials."
      ),

    RestrictionOne: travelRestrictionSchema
      .nullable()
      .describe(
        "Primary travel restriction information for the mountain pass. This object contains the main restriction details including direction and specific requirements that travelers need to be aware of."
      ),

    RestrictionTwo: travelRestrictionSchema
      .nullable()
      .describe(
        "Secondary travel restriction information for the mountain pass. This object contains additional restriction details that may apply to different directions or vehicle types on the pass."
      ),

    RoadCondition: z
      .string()
      .nullable()
      .describe(
        "Current condition of the roadway surface on the mountain pass. Examples include 'Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1...' (during summer), 'Reports have ended for this season...' (off-season message), 'Travel impacts will be updated here if conditions cause delays of an hour or more...' (general status), or specific winter conditions like 'Bare and wet', 'Compact snow and ice', 'Bare and dry', 'Loose snow', or 'Ice'. This field is critical for safe travel planning and vehicle preparation."
      ),

    TemperatureInFahrenheit: zNullableNumber().describe(
      "Current temperature at the mountain pass in degrees Fahrenheit. May be null if temperature information is not available or not applicable. Examples include 87°F at Snoqualmie Pass I-90, 91°F at Blewett Pass US 97, 29°F at Satus Pass US 97 during winter, or 86°F at Loup Loup Pass SR 20. This field helps travelers prepare for weather conditions and understand the current environmental situation."
    ),

    TravelAdvisoryActive: z
      .boolean()
      .describe(
        "Indicates whether an active travel advisory is currently in effect for the mountain pass. True means there is an active advisory that travelers should be aware of, False means no special travel advisories are currently in effect."
      ),

    WeatherCondition: z
      .string()
      .nullable()
      .describe(
        "Current weather conditions at the mountain pass. Examples include 'Clear' (most common during summer), 'Snowing', 'Raining', 'Foggy', 'Windy', 'Mixed precipitation', or may be empty string '' when no specific weather information is available. During off-season, this field often contains messages like 'Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1...'. This field provides essential information for understanding the current weather situation affecting travel."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete mountain pass condition information including location, weather, road conditions, and travel restrictions. This schema represents comprehensive condition data from the WSDOT Mountain Pass Conditions API, providing essential information for safe mountain travel planning, winter driving preparation, and transportation safety. The data includes details for all 16 active mountain passes in Washington State, with elevation data (ranging from 1377 ft at Tiger Mountain to 5575 ft at Sherman Pass), current weather conditions, road surface status, and travel restrictions. During winter months (typically November 1 to April 1), this data is updated regularly to support safe passage through Washington's mountainous regions, while summer months show seasonal messages indicating monitoring is reduced."
  );

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

// ============================================================================
// TanStack Query Hook
//
// useMountainPassConditionById
// ============================================================================

/**
 * Hook for getting a specific mountain pass condition by ID from WSDOT Mountain Pass Conditions API
 *
 * Returns detailed information about a specific mountain pass condition
 * identified by its ID, including elevation, weather conditions, road conditions,
 * and travel restrictions for that specific pass. This endpoint works correctly
 * and provides individual pass data for targeted queries.
 *
 * @param params - Object containing passConditionId parameter
 * @param params.passConditionId - The ID of the specific mountain pass condition (e.g., 11 for Snoqualmie Pass I-90, 10 for Stevens Pass US 2)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with specific mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: condition } = useMountainPassConditionById({ passConditionId: 11 });
 * console.log(condition?.MountainPassName); // "Snoqualmie Pass I-90"
 * console.log(condition?.ElevationInFeet); // 3022
 * console.log(condition?.RoadCondition); // Current road surface conditions
 * ```
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
