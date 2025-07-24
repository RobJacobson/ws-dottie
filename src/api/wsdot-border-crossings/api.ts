// WSDOT Border Crossings API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type { BorderCrossingData } from "./types";

// Create a factory function for WSDOT Border Crossings API
const createWsdotBorderCrossingsFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc"
);

/**
 * Get border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Data includes location information, crossing names, timestamps, and current wait times.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of border crossing data
 */
export const getBorderCrossings = createWsdotBorderCrossingsFetch<
  BorderCrossingData[]
>("/GetBorderCrossingsAsJson");
