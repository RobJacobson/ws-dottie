import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Bridge Clearances API
 *
 * This API provides bridge clearance information for specific routes, requiring
 * route identifiers as input parameters for data retrieval.
 */

// Parameter schema for getBridgeClearances
export const getBridgeClearancesParamsSchema = z
  .object({
    route: z
      .string()
      .min(1, "Route cannot be empty")
      .describe(
        "WSDOT route identifier for which to retrieve bridge clearance data. Examples include '005' for I-5, '090' for I-90, '405' for I-405. The route should be specified as a zero-padded 3-digit string for interstates (e.g., '005' not '5') or as the full route number for state routes (e.g., '20', '101')."
      ),
  })
  .describe(
    "Parameters for retrieving bridge clearance data for a specific WSDOT route"
  );

// Export the inferred type for use in API functions
export type GetBridgeClearancesParams = z.infer<
  typeof getBridgeClearancesParamsSchema
>;
