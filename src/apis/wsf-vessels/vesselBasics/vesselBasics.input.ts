import { z } from "zod";

/**
 * VesselBasics input schema
 *
 * This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselBasicsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselBasicsInput = z.infer<typeof vesselBasicsSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdSchema = z
  .object({
    /** Unique identifier for a vessel. */
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
  })
  .describe(
    "This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdSchema>;
