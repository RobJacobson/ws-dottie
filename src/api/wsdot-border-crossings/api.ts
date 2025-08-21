// WSDOT Border Crossings API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html
// API Help: https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help

import { createZodFetchFactory } from "@/shared/fetching/api";

import type { GetBorderCrossingsParams } from "./inputs";
import { getBorderCrossingsParamsSchema } from "./inputs";
import type { BorderCrossingData } from "./outputs";
import { borderCrossingDataArraySchema } from "./outputs";

// Create a factory function for WSDOT Border Crossings API
const createFetch = createZodFetchFactory(
  "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc"
);

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
  const fetcher = createFetch<GetBorderCrossingsParams>(
    "/GetBorderCrossingsAsJson",
    {
      input: getBorderCrossingsParamsSchema,
      output: borderCrossingDataArraySchema,
    }
  );
  return fetcher(params) as Promise<BorderCrossingData[]>;
};
