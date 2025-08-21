import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Highway Alerts API
 *
 * This API provides highway alert information including traffic incidents, road closures,
 * and other traffic-related alerts across Washington State highways.
 */

// No input parameters currently needed for getHighwayAlerts
// This schema represents an empty parameter object for consistency
export const getHighwayAlertsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway alerts. The API returns all active highway alerts across Washington State."
  );

// Parameter schema for getHighwayAlertById
export const getHighwayAlertByIdParamsSchema = z
  .object({
    alertId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific highway alert to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getHighwayAlerts endpoint or other alert listings."
      ),
  })
  .describe(
    "Parameters for retrieving a specific highway alert by its unique identifier"
  );

// Parameter schema for getHighwayAlertsByMapArea
export const getHighwayAlertsByMapAreaParamsSchema = z
  .object({
    mapArea: z
      .string()
      .min(1, "Map area cannot be empty")
      .describe(
        "The map area or region to filter highway alerts by. Examples include 'Seattle', 'Tacoma', 'Spokane', 'Eastern Washington', or 'Western Washington'. This parameter filters alerts to show only those relevant to the specified geographic area."
      ),
  })
  .describe(
    "Parameters for retrieving highway alerts filtered by a specific map area or region"
  );

// Export the inferred types for use in API functions
export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;
export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;
export type GetHighwayAlertsByMapAreaParams = z.infer<
  typeof getHighwayAlertsByMapAreaParamsSchema
>;
