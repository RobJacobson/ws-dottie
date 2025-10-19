import { z } from "zod";

/**
 * VesselStats input schema
 *
 * This operation provides details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselStatsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselStatsInput = z.infer<typeof vesselStatsSchema>;

/**
 * VesselStatsById input schema
 */
export const vesselStatsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdSchema>;
