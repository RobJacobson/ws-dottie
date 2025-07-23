// WSDOT Travel Times API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

import { createApiClient } from "@/shared/fetching/apiClient";

import type { TravelTimeRoute } from "./types";

// Module-scoped fetch function for travel times API
const fetchTravelTimes = createApiClient(
  "https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc"
);

/**
 * Retrieves all travel times from WSDOT API
 *
 * @returns Promise resolving to an array of travel time routes
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const travelTimes = await getTravelTimes();
 * console.log(travelTimes[0].CurrentTime); // 30
 * ```
 */
export const getTravelTimes = (): Promise<TravelTimeRoute[]> =>
  fetchTravelTimes<TravelTimeRoute[]>("/GetTravelTimesAsJson");

/**
 * Retrieves a specific travel time route by ID from WSDOT API
 *
 * @param travelTimeId - The ID of the specific travel time route
 * @returns Promise resolving to a travel time route
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const travelTime = await getTravelTimeById(2);
 * console.log(travelTime.CurrentTime); // 30
 * ```
 */
export const getTravelTimeById = (
  travelTimeId: number
): Promise<TravelTimeRoute> =>
  fetchTravelTimes<TravelTimeRoute>(
    `/GetTravelTimeAsJson?TravelTimeID=${travelTimeId}`
  );
