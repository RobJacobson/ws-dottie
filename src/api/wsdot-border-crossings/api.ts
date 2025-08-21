// WSDOT Border Crossings API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import type { GetBorderCrossingsParams } from "./inputs";
import { getBorderCrossingsParamsSchema } from "./inputs";
import { borderCrossingDataArraySchema } from "./outputs";

// Base URL path for WSDOT Border Crossings API
const WSDOT_BORDER_CROSSINGS_BASE =
  "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc";

/**
 * Get border crossing wait times from WSDOT Border Crossings API
 *
 * Returns estimated wait times for all border crossings between Washington State and Canada.
 * Data includes location information, crossing names, timestamps, and current wait times.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of border crossing data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const crossings = await getBorderCrossings({});
 * console.log(crossings[0].CrossingName); // "Peace Arch"
 * ```
 */
export const getBorderCrossings = async (
  params: GetBorderCrossingsParams = {}
) => {
  return zodFetch(
    `${WSDOT_BORDER_CROSSINGS_BASE}/GetBorderCrossingsAsJson`,
    {
      input: getBorderCrossingsParamsSchema,
      output: borderCrossingDataArraySchema,
    },
    params
  );
};
