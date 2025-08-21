// WSDOT Travel Times API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import {
  type GetTravelTimeByIdParams,
  type GetTravelTimesParams,
  getTravelTimeByIdParamsSchema,
  getTravelTimesParamsSchema,
} from "./inputs";
import type { TravelTimeRoute } from "./outputs";
import { travelTimeRouteSchema, travelTimesArraySchema } from "./outputs";

// Create a factory function for WSDOT Travel Times API
const createFetch = createZodFetchFactory(
  "/Traffic/api/TravelTimes/TravelTimesREST.svc"
);

/**
 * Get all travel times from WSDOT Travel Times API
 *
 * Retrieves current travel time data for all monitored routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all travel time data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTimes = await getTravelTimes({});
 * console.log(travelTimes[0].CurrentTime); // 30
 * ```
 */
export const getTravelTimes = async (params: GetTravelTimesParams = {}) => {
  const fetcher = createFetch<GetTravelTimesParams>("/GetTravelTimesAsJson", {
    input: getTravelTimesParamsSchema,
    output: travelTimesArraySchema,
  });
  return fetcher(params) as Promise<TravelTimeRoute[]>;
};

/**
 * Get specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId parameter
 * @param params.travelTimeId - The ID of the specific travel time route
 * @returns Promise containing the specific travel time data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById({ travelTimeId: 2 });
 * console.log(travelTime.CurrentTime); // 30
 * ```
 */
export const getTravelTimeById = async (params: GetTravelTimeByIdParams) => {
  const fetcher = createFetch<GetTravelTimeByIdParams>(
    "/GetTravelTimeAsJson?TravelTimeID={travelTimeId}",
    {
      input: getTravelTimeByIdParamsSchema,
      output: travelTimeRouteSchema,
    }
  );
  return fetcher(params) as Promise<TravelTimeRoute>;
};
