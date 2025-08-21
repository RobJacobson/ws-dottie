import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Mountain Pass Conditions API
 * 
 * This API provides mountain pass condition information including road conditions,
 * travel restrictions, weather conditions, and travel advisories across Washington
 * State mountain passes.
 */

// No input parameters currently needed for getMountainPassConditions
// This schema represents an empty parameter object for consistency
export const getMountainPassConditionsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all mountain pass conditions. The API returns current mountain pass conditions across Washington State, including road conditions, restrictions, and travel advisories."
  );

// Parameter schema for getMountainPassConditionById
export const getMountainPassConditionByIdParamsSchema = z
  .object({
    passConditionId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific mountain pass condition to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getMountainPassConditions endpoint or other mountain pass listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific mountain pass condition by its unique identifier. Note: This endpoint may not work as expected based on testing."
  );

// Export the inferred types for use in API functions
export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;
export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;
