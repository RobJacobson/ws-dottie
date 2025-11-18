import { z } from "@/shared/zod";

export const vesselVerboseInputSchema = z
  .object({})
  .strict()
  .describe("Input parameters for retrieving complete vessel information for all vessels.");

export type VesselVerboseInput = z.infer<typeof vesselVerboseInputSchema>;

/**
 * VesselVerboseById input schema
 */
export const vesselVerboseByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe("Numeric ID of the vessel."),
  })
  .describe("Input parameters for retrieving complete vessel information for a specific vessel.");

export type VesselVerboseByIdInput = z.infer<
  typeof vesselVerboseByIdInputSchema
>;
