import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Travel Times API
 *
 * This API provides travel time information including current and average travel times,
 * route details, and endpoint information for monitored routes across Washington State.
 */

// No input parameters currently needed for getTravelTimes
// This schema represents an empty parameter object for consistency
export const getTravelTimesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all travel times. The API returns current travel time data for all monitored routes across Washington State."
  );

// Parameter schema for getTravelTimeById
export const getTravelTimeByIdParamsSchema = z
  .object({
    travelTimeId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific travel time route to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getTravelTimes endpoint or other travel time listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific travel time route by its unique identifier"
  );

// Export the inferred types for use in API functions
export type GetTravelTimesParams = z.infer<typeof getTravelTimesParamsSchema>;
export type GetTravelTimeByIdParams = z.infer<
  typeof getTravelTimeByIdParamsSchema
>;
