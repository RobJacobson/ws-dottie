import { z } from "zod";

/**
 * VesselID input schema
 *
 * Used for endpoints that accept an optional VesselID parameter to retrieve
 * specific vessel information.
 */
export const vesselIdInputSchema = z
  .object({
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
  })
  .describe("Input parameters for vessel-specific endpoints.");

export type VesselIdInput = z.infer<typeof vesselIdInputSchema>;

/**
 * VesselHistory input schema
 *
 * Used for the vessel history endpoint that requires vessel name and date range.
 */
export const vesselHistoryInputSchema = z
  .object({
    VesselName: z.string().describe("The name of the vessel."),
    DateStart: z.string().describe("The start date for the history query."),
    DateEnd: z.string().describe("The end date for the history query."),
  })
  .describe("Input parameters for vessel history endpoint.");

/** VesselHistory input type */
export type VesselHistoryInput = z.infer<typeof vesselHistoryInputSchema>;
