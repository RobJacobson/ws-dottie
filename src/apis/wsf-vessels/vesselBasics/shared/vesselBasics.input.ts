import { z } from "@/shared/zod";

export const vesselBasicsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Input parameters for retrieving basic vessel information for all vessels."
  );

export type VesselBasicsInput = z.infer<typeof vesselBasicsInputSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdInputSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
  })
  .describe(
    "Input parameters for retrieving basic vessel information for a specific vessel."
  );

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInputSchema>;
