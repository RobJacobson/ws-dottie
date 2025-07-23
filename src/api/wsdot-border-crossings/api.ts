// WSDOT Border Crossings API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

import { createApiClient } from "@/shared/fetching/apiClient";

import type { BorderCrossingData } from "./types";

// Module-scoped fetch function for border crossings API
const fetchBorderCrossings = createApiClient(
  "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc"
);

/**
 * Get border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Data includes location information, crossing names, timestamps, and current wait times.
 *
 * @returns Promise resolving to array of border crossing data
 */
export const getBorderCrossings = async (): Promise<BorderCrossingData[]> =>
  fetchBorderCrossings<BorderCrossingData[]>("/GetBorderCrossingsAsJson");
