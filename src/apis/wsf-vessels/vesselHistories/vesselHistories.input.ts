import { z } from "zod";

/**
 * GetVesselHistory input schema
 */
export const getVesselHistorySchema = z
  .object({
    /** The name of the vessel. */
    VesselName: z.string().describe("The name of the vessel."),
    /** The start date for the history query. */
    DateStart: z.string().describe("The start date for the history query."),
    /** The end date for the history query. */
    DateEnd: z.string().describe("The end date for the history query."),
  })
  .describe("Input parameters for vessel history endpoint with parameters.");

export type GetVesselHistoryInput = z.infer<typeof getVesselHistorySchema>;

export const getAllVesselHistorySchema = z
  .object({})
  .describe("Input parameters for vessel history endpoint without parameters.");

export type GetAllVesselHistoryInput = z.infer<
  typeof getAllVesselHistorySchema
>;
