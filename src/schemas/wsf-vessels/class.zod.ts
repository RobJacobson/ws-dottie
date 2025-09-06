import { z } from "zod";

/**
 * Vessel class schema for WSF Vessels API
 *
 * Similar vessels in the fleet are grouped into the same class. This object describes
 * the class associated with a vessel.
 */
export const vesselClassSchema = z.object({
  /** Unique identifier for a vessel class. */
  ClassID: z.number().int().describe("Unique identifier for a vessel class."),

  /** Identifies this vessel class as a unique WSF subject. */
  ClassSubjectID: z
    .number()
    .int()
    .describe("Identifies this vessel class as a unique WSF subject."),

  /** The name of the vessel class. */
  ClassName: z.string().describe("The name of the vessel class."),

  /** A preferred sort order (sort-ascending with respect to other vessel classes). */
  SortSeq: z
    .number()
    .int()
    .nullable()
    .describe(
      "A preferred sort order (sort-ascending with respect to other vessel classes)."
    ),

  /** A URL that points to a detailed drawing of the vessel class. */
  DrawingImg: z
    .string()
    .describe("A URL that points to a detailed drawing of the vessel class."),

  /** A URL that points to a small drawing of the vessel class. */
  SilhouetteImg: z
    .string()
    .describe("A URL that points to a small drawing of the vessel class."),

  /** The name of this vessel class, formatted for the public. */
  PublicDisplayName: z
    .string()
    .describe("The name of this vessel class, formatted for the public."),
});

export type VesselClass = z.infer<typeof vesselClassSchema>;

/**
 * Array of vessel classes
 *
 * The classes associated with vessels in the WSF fleet.
 */
export const vesselClassesSchema = z
  .array(vesselClassSchema)
  .describe("The classes associated with vessels in the WSF fleet.");

export type VesselClasses = z.infer<typeof vesselClassesSchema>;
