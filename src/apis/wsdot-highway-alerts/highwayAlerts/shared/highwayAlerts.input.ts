import { z } from "@/shared/zod";

/**
 * Input schema for HighwayAlerts endpoint
 *
 * Retrieves an array of currently active incidents
 */
export const alertsInputSchema = z
  .object({})
  .describe(
    "Input for retrieving all currently active highway alerts statewide."
  );

export type AlertsInput = z.infer<typeof alertsInputSchema>;

/**
 * Input schema for HighwayAlert endpoint
 *
 * Retrieves a specific incident
 */
export const alertByIdInputSchema = z
  .object({
    AlertID: z.number().describe("Numeric ID of the highway alert."),
  })
  .describe("Input for retrieving a specific highway alert by ID.");

export type AlertByIdInput = z.infer<typeof alertByIdInputSchema>;

/**
 * Input schema for HighwayAlertsSearch endpoint
 *
 * Retrieves an array of incidents that match certain criteria
 */
export const searchAlertsInputSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "State route identifier as three-digit number, or undefined to include all routes."
      ),
    Region: z
      .int()
      .optional()
      .describe(
        "WSDOT region identifier code: 7 = Eastern, 8 = North Central, 9 = Northwest, 10 = Olympic, 11 = South Central, 12 = Southwest, or undefined to include all regions."
      ),
    SearchTimeStart: z
      .string()
      .optional()
      .describe(
        "UTC datetime when the search time range begins, in ISO format, or undefined for no start limit."
      ),
    SearchTimeEnd: z
      .string()
      .optional()
      .describe(
        "UTC datetime when the search time range ends, in ISO format, or undefined for no end limit."
      ),
    StartingMilepost: z
      .number()
      .optional()
      .describe(
        "Starting milepost value for range filtering, or undefined for no start limit."
      ),
    EndingMilepost: z
      .number()
      .optional()
      .describe(
        "Ending milepost value for range filtering, or undefined for no end limit."
      ),
  })
  .describe(
    "Input for searching highway alerts by route, region, time range, and milepost range."
  );

export type SearchAlertsInput = z.infer<typeof searchAlertsInputSchema>;

/**
 * Input schema for HighwayAlertsByMapArea endpoint
 *
 * Return alerts for a specific area
 */
export const alertsByMapAreaInputSchema = z
  .object({
    MapArea: z
      .string()
      .describe("Map area identifier code for geographic filtering."),
  })
  .describe("Input for retrieving highway alerts filtered by map area code.");

export type AlertsByMapAreaInput = z.infer<typeof alertsByMapAreaInputSchema>;

/**
 * Input schema for HighwayAlertsByRegionID endpoint
 *
 * Return alerts for a specific region
 */
export const alertsByRegionIDInputSchema = z
  .object({
    RegionID: z
      .number()
      .describe(
        "WSDOT region identifier code: 7 = Eastern, 8 = North Central, 9 = Northwest, 10 = Olympic, 11 = South Central, 12 = Southwest."
      ),
  })
  .describe("Input for retrieving highway alerts filtered by WSDOT region ID.");

export type AlertsByRegionIDInput = z.infer<typeof alertsByRegionIDInputSchema>;
