import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for HighwayAlerts endpoint
 *
 * Retrieves an array of currently active incidents
 */
export const alertsInputSchema = z
  .object({})
  .describe(
    "Retrieves all currently active highway alerts statewide, returning alert details including locations, event categories, priorities, timestamps, and descriptions. Use for monitoring current traffic incidents, construction, maintenance, and other highway events."
  );

export type AlertsInput = z.infer<typeof alertsInputSchema>;

/**
 * Input schema for HighwayAlert endpoint
 *
 * Retrieves a specific incident
 */
export const alertByIdInputSchema = z
  .object({
    AlertID: z
      .number()
      .describe(
        "Unique highway alert identifier, as an integer ID. E.g., '669625' for I-405 construction alert, '468632' for SR-520 flammable cargo restriction, '669582' for I-405 collision alert. Used to retrieve specific alert details."
      ),
  })
  .describe(
    "Retrieves specific highway alert by ID, returning alert details including locations, event category, priority, timestamps, and descriptions. Use for individual alert lookups and detailed alert information."
  );

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
        "State route identifier formatted as three-digit number, as a route identifier. E.g., '005' for I-5, '405' for I-405, '090' for I-90. Used to filter alerts by specific highway route."
      ),
    Region: z
      .int()
      .optional()
      .describe(
        "WSDOT region identifier code, as an integer. Valid values: 7 (Eastern), 8 (North Central), 9 (Northwest), 10 (Olympic), 11 (South Central), 12 (Southwest). E.g., '9' for Northwest region, '7' for Eastern region. Used to filter alerts by WSDOT region."
      ),
    SearchTimeStart: z
      .string()
      .optional()
      .describe(
        "Start time for alert search range, in ISO datetime format. E.g., '2025-11-01T00:00:00Z' for November 1, 2025 midnight UTC. Used to filter alerts occurring after this time."
      ),
    SearchTimeEnd: z
      .string()
      .optional()
      .describe(
        "End time for alert search range, in ISO datetime format. E.g., '2025-11-02T23:59:59Z' for November 2, 2025 end of day UTC. Used to filter alerts occurring before this time."
      ),
    StartingMilepost: z
      .number()
      .optional()
      .describe(
        "Starting milepost value for milepost range filtering, as a decimal. E.g., '20.3' for milepost 20.3, '11.5' for milepost 11.5. Used with EndingMilepost to filter alerts within milepost range."
      ),
    EndingMilepost: z
      .number()
      .optional()
      .describe(
        "Ending milepost value for milepost range filtering, as a decimal. E.g., '22.61' for milepost 22.61, '25.91' for milepost 25.91. Used with StartingMilepost to filter alerts within milepost range."
      ),
  })
  .describe(
    "Searches highway alerts matching specified criteria including route, region, time range, and milepost range. Returns array of matching alerts with details. Use for filtered alert queries and location-specific alert searches."
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
      .describe(
        "Map area identifier code, as an area code. E.g., 'L2NW' for Northwest area, 'L2EA' for Eastern area, 'L2CE' for Central area. Use GetMapAreas to retrieve list of valid area codes. Used to filter alerts by geographic map area."
      ),
  })
  .describe(
    "Retrieves highway alerts for specific map area, returning alerts within that geographic region. Use for area-based alert filtering and regional alert monitoring."
  );

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
        "WSDOT region identifier code, as an integer. Valid values: 7 (Eastern), 8 (North Central), 9 (Northwest), 10 (Olympic), 11 (South Central), 12 (Southwest). E.g., '9' for Northwest region, '7' for Eastern region. Used to filter alerts by WSDOT region."
      ),
  })
  .describe(
    "Retrieves highway alerts for specific WSDOT region, returning alerts within that administrative region. Use for region-based alert filtering and regional traffic monitoring."
  );

export type AlertsByRegionIDInput = z.infer<typeof alertsByRegionIDInputSchema>;
