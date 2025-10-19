import { z } from "zod";

/**
 * VesselLocations input schema
 *
 * This operation provides vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselLocationsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselLocationsInput = z.infer<typeof vesselLocationsSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdSchema
>;
