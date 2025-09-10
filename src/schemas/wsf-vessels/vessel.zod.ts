import { z } from "zod";

/**
 * Base vessel schema for WSF Vessels API
 *
 * Contains the core vessel identification fields that are shared across
 * all vessel-related endpoints.
 */
export const vesselSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),

  /** Identifies this vessel as a unique WSF subject. */
  VesselSubjectID: z
    .number()
    .int()
    .describe("Identifies this vessel as a unique WSF subject."),

  /** The name of the vessel. */
  VesselName: z.string().nullable().describe("The name of the vessel."),

  /** The vessel's abbreviation. */
  VesselAbbrev: z.string().nullable().describe("The vessel's abbreviation."),
});

export type Vessel = z.infer<typeof vesselSchema>;

/**
 * Array of vessels
 *
 * The vessels in the WSF fleet.
 */
export const vesselsSchema = z
  .array(vesselSchema)
  .describe("The vessels in the WSF fleet.");

export type Vessels = z.infer<typeof vesselsSchema>;
