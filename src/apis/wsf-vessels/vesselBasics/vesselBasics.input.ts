import { z } from "@/shared/zod";

/**
 * VesselBasics input schema
 *
 * This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselBasicsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves basic vessel information for all vessels in the fleet, returning vessel identification, operational status, and ownership. E.g., vessel Chimacum (VesselID 74) with Status 1 (In Service). Use for vessel selection lists, status displays, and as foundation for more detailed vessel queries."
  );

export type VesselBasicsInput = z.infer<typeof vesselBasicsInputSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '74' for vessel Chimacum, '2' for vessel Chelan. Required to retrieve basic information for a specific vessel."
      ),
  })
  .describe(
    "Retrieves basic vessel information for a specific vessel by VesselID, returning vessel identification, operational status, and ownership. E.g., vessel Chimacum (VesselID 74) with Status 1 (In Service). Use when you need basic information for a single known vessel."
  );

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInputSchema>;
