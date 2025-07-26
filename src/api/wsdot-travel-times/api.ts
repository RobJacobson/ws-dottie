// WSDOT Travel Times API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/api";

import type { TravelTimeRoute } from "./types";

// Create a factory function for WSDOT Travel Times API
const createWsdotTravelTimesFetch = createFetchFactory(
  "/Traffic/api/TravelTimes/TravelTimesREST.svc"
);

/**
 * Get all travel times from WSDOT Travel Times API
 *
 * Retrieves current travel time data for all monitored routes.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all travel time data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const travelTimes = await getTravelTimes();
 * console.log(travelTimes[0].CurrentTime); // 30
 * ```
 */
export const getTravelTimes = createWsdotTravelTimesFetch<TravelTimeRoute[]>(
  "/GetTravelTimesAsJson"
);

/**
 * Get specific travel time by ID from WSDOT Travel Times API
 *
 * Returns detailed information about a specific travel time route
 * identified by its ID.
 *
 * @param params - Object containing travelTimeId and optional logMode
 * @param params.travelTimeId - The ID of the specific travel time route
 * @param params.logMode - Optional logging mode for debugging API calls
 * @returns Promise containing the specific travel time data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById(2);
 * console.log(travelTime.CurrentTime); // 30
 * ```
 */
export const getTravelTimeById = createWsdotTravelTimesFetch<
  { travelTimeId: number },
  TravelTimeRoute
>("/GetTravelTimeAsJson?TravelTimeID={travelTimeId}");
