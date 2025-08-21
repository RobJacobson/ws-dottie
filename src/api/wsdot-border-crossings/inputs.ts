import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Border Crossings API
 *
 * This API currently has no input parameters (all endpoints are GET requests with no parameters),
 * but we maintain this file for consistency with the established pattern and future extensibility.
 */

// No input parameters currently needed for getBorderCrossings
// This schema represents an empty parameter object for consistency
export const getBorderCrossingsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting border crossing data. The API returns all available border crossing information."
  );

// Export the inferred type for use in API functions
export type GetBorderCrossingsParams = z.infer<
  typeof getBorderCrossingsParamsSchema
>;
