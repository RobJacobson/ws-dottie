import { z } from "zod";

/**
 * Input schema for GetAlerts endpoint
 * Retrieves an array of currently active incidents
 */
export const getAlertsSchema = z.object({});

export type GetAlertsInput = z.infer<typeof getAlertsSchema>;

/**
 * Input schema for GetAlert endpoint
 * Retrieves a specific incident
 */
export const getAlertSchema = z.object({
  /** AlertID for a specific incident. */
  AlertID: z.number().describe("AlertID for a specific incident."),
});

export type GetAlertInput = z.infer<typeof getAlertSchema>;

/**
 * Input schema for SearchAlerts endpoint
 * Retrieves an array of incidents that match certain criteria
 */
export const searchAlertsSchema = z.object({
  /**
   * Optional. A State Route formatted as a three digit number. I-5 would be 005.
   */
  StateRoute: z
    .string()
    .optional()
    .describe(
      "Optional. A State Route formatted as a three digit number. I-5 would be 005."
    ),
  /**
   * Optional. Use the integer code as follows: 8 - North Central, 11 - South Central, 12 - Southwest, 9 - Northwest, 10 - Olympic, 7 - Eastern.
   */
  Region: z
    .int()
    .optional()
    .describe(
      "Optional. Use the integer code as follows: 8 - North Central, 11 - South Central, 12 - Southwest, 9 - Northwest, 10 - Olympic, 7 - Eastern."
    ),
  /** Optional. Will only find alerts occuring after this time. */
  SearchTimeStart: z
    .string()
    .optional()
    .describe("Optional. Will only find alerts occuring after this time."),
  /** Optional. Will only find alerts occuring before this time. */
  SearchTimeEnd: z
    .string()
    .optional()
    .describe("Optional. Will only find alerts occuring before this time."),
  /** Optional. Will only find alerts after this milepost. */
  StartingMilepost: z
    .number()
    .optional()
    .describe("Optional. Will only find alerts after this milepost."),
  /** Optional. Will only find alerts before this milepost. */
  EndingMilepost: z
    .number()
    .optional()
    .describe("Optional. Will only find alerts before this milepost."),
});

export type SearchAlertsInput = z.infer<typeof searchAlertsSchema>;

/**
 * Input schema for GetAlertsForMapArea endpoint
 * Return alerts for a specific area
 */
export const getAlertsForMapAreaSchema = z.object({
  /** The area to limit results to. */
  MapArea: z.string().describe("The area to limit results to."),
});

export type GetAlertsForMapAreaInput = z.infer<
  typeof getAlertsForMapAreaSchema
>;

/**
 * Input schema for GetAlertsByRegionID endpoint
 */
export const getAlertsByRegionIDSchema = z.object({
  /** The region ID to limit results to. */
  RegionID: z.number().describe("The region ID to limit results to."),
});

export type GetAlertsByRegionIDInput = z.infer<
  typeof getAlertsByRegionIDSchema
>;

/**
 * Input schema for GetEventCategories endpoint
 * Selects an array of valid categories to use with SearchAlerts
 */
export const getEventCategoriesSchema = z.object({});

export type GetEventCategoriesInput = z.infer<typeof getEventCategoriesSchema>;

/**
 * Input schema for GetMapAreas endpoint
 * Return list of areas and associated IDs
 */
export const getMapAreasSchema = z.object({});

export type GetMapAreasInput = z.infer<typeof getMapAreasSchema>;
