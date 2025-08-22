import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

/**
 * Retrieves all mountain pass conditions from WSDOT API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all mountain pass condition data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const conditions = await getMountainPassConditions({});
 * console.log(conditions[0].MountainPassName); // "Snoqualmie Pass"
 * ```
 */
export const getMountainPassConditions = async (
  params: GetMountainPassConditionsParams = {}
): Promise<MountainPassCondition[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMountainPassConditionsParamsSchema,
      output: mountainPassConditionArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getMountainPassConditionsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all mountain pass conditions. The API returns current mountain pass conditions across Washington State, including road conditions, restrictions, and travel advisories."
  );

export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const travelRestrictionSchema = z
  .object({
    TravelDirection: z
      .string()
      .describe(
        "Direction of travel for which the restriction applies. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'. This field indicates which direction of travel is affected by the restriction."
      ),

    RestrictionText: z
      .string()
      .describe(
        "Detailed description of the travel restriction or requirement. This field contains the specific text explaining what restrictions are in place, such as 'Chains required', '4WD/AWD only', 'No trailers', or 'Passenger vehicles only'."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Travel restriction information for a specific direction on a mountain pass. Contains details about what vehicles or travel conditions are allowed or restricted on the pass."
  );

export const mountainPassConditionSchema = z
  .object({
    DateUpdated: zWsdotDate().describe(
      "Timestamp indicating when this mountain pass condition information was last updated in the WSDOT system. This field shows the currency of the condition data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    ElevationInFeet: z
      .number()
      .describe(
        "Elevation of the mountain pass in feet above sea level. This field provides important context for understanding the altitude where the conditions apply, which is crucial for weather-related travel planning and safety considerations."
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
        "Unique identifier assigned to this mountain pass by the WSDOT system. This ID serves as a permanent, unique reference for the pass across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    MountainPassName: z
      .string()
      .describe(
        "Official name of the mountain pass. Examples include 'Snoqualmie Pass', 'Stevens Pass', 'White Pass', 'Chinook Pass', or 'Cayuse Pass'. This field provides the recognizable name used by travelers and transportation officials."
      ),

    RestrictionOne: travelRestrictionSchema.describe(
      "Primary travel restriction information for the mountain pass. This object contains the main restriction details including direction and specific requirements that travelers need to be aware of."
    ),

    RestrictionTwo: travelRestrictionSchema.describe(
      "Secondary travel restriction information for the mountain pass. This object contains additional restriction details that may apply to different directions or vehicle types on the pass."
    ),

    RoadCondition: z
      .string()
      .describe(
        "Current condition of the roadway surface on the mountain pass. Examples include 'Bare and wet', 'Compact snow and ice', 'Bare and dry', 'Loose snow', or 'Ice'. This field is critical for safe travel planning and vehicle preparation."
      ),

    TemperatureInFahrenheit: zNullableNumber().describe(
      "Current temperature at the mountain pass in degrees Fahrenheit. May be null if temperature information is not available or not applicable. This field helps travelers prepare for weather conditions and understand the current environmental situation."
    ),

    TravelAdvisoryActive: z
      .boolean()
      .describe(
        "Indicates whether an active travel advisory is currently in effect for the mountain pass. True means there is an active advisory that travelers should be aware of, False means no special travel advisories are currently in effect."
      ),

    WeatherCondition: z
      .string()
      .describe(
        "Current weather conditions at the mountain pass. Examples include 'Snowing', 'Raining', 'Clear', 'Foggy', 'Windy', or 'Mixed precipitation'. This field provides essential information for understanding the current weather situation affecting travel."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete mountain pass condition information including location, weather, road conditions, and travel restrictions. This schema represents comprehensive condition data from the WSDOT Mountain Pass Conditions API, providing essential information for safe mountain travel planning, winter driving preparation, and transportation safety. The condition details are critical for real-time travel monitoring, route planning, and emergency response coordination in mountainous areas."
  );

export const mountainPassConditionArraySchema = z
  .array(mountainPassConditionSchema)
  .describe(
    "Array of mountain pass condition data for all active passes across Washington State. This collection provides comprehensive condition information that enables safe mountain travel planning, winter driving preparation, and transportation safety management."
  );

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;
export type MountainPassCondition = z.infer<typeof mountainPassConditionSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting all mountain pass conditions from WSDOT Mountain Pass Conditions API
 *
 * Returns current mountain pass conditions across Washington State, including
 * road conditions, restrictions, and travel advisories.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: conditions } = useMountainPassConditions({});
 * console.log(conditions?.[0]?.MountainPassName); // "Snoqualmie Pass"
 * ```
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
      params,
    ],
    queryFn: () => getMountainPassConditions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
