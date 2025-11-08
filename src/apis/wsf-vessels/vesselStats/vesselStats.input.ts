import { z } from "@/shared/zod";

/**
 * VesselStats input schema
 *
 * This operation provides details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselStatsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves vessel technical specifications for all vessels, returning dimensions, capacity, speed, propulsion, and build details. E.g., vessel Chimacum built 2017, 362 feet long, 1500 passenger capacity, 17 knots speed. Use for vessel comparison, capacity planning, and technical reference information."
  );

export type VesselStatsInput = z.infer<typeof vesselStatsInputSchema>;

/**
 * VesselStatsById input schema
 */
export const vesselStatsByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '74' for vessel Chimacum, '1' for vessel Cathlamet. Required to retrieve technical specifications for a specific vessel."
      ),
  })
  .describe(
    "Retrieves vessel technical specifications for a specific vessel by VesselID, returning dimensions, capacity, speed, propulsion, and build details. E.g., vessel Tacoma built 1997, Jumbo Mark II class, with beam, length, and horsepower specifications. Use for vessel comparison, capacity planning, and technical reference information when you need specifications for a single vessel."
  );

export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdInputSchema>;
