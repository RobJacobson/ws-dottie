import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Traffic Flow API
 * 
 * This API provides traffic flow information including real-time flow readings,
 * station locations, and traffic volume data across Washington State highways.
 */

// No input parameters currently needed for getTrafficFlows
// This schema represents an empty parameter object for consistency
export const getTrafficFlowsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all traffic flow data. The API returns current traffic flow readings from all flow stations across Washington State."
  );

// Parameter schema for getTrafficFlowById
export const getTrafficFlowByIdParamsSchema = z
  .object({
    flowDataID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific traffic flow station to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getTrafficFlows endpoint or other traffic flow listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific traffic flow station by its unique identifier"
  );

// Export the inferred types for use in API functions
export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;
export type GetTrafficFlowByIdParams = z.infer<typeof getTrafficFlowByIdParamsSchema>;

