import { z } from "zod";

/**
 * VesselVerbose input schema
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /vesselbasics, /vesselaccommodations, /vesselstats.
 */
export const vesselVerboseSchema = z
  .object({})
  .strict()
  .describe(
    'This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don\'t mind receiving a larger payload of data. VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.'
  );

export type VesselVerboseInput = z.infer<typeof vesselVerboseSchema>;

/**
 * VesselVerboseById input schema
 */
export const vesselVerboseByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselVerboseByIdInput = z.infer<typeof vesselVerboseByIdSchema>;
