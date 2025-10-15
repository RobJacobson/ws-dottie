import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * VesselClass schema
 *
 * Similar vessels in the fleet are grouped into the same class.
 */
export const vesselClassSchema = z
  .object({
    /** Unique identifier for a vessel class. */
    ClassID: z.number().int().describe("Unique identifier for a vessel class."),
    /** Identifies this vessel class as a unique WSF subject. */
    ClassSubjectID: z
      .number()
      .int()
      .describe("Identifies this vessel class as a unique WSF subject."),
    /** The name of the vessel class. */
    ClassName: z.string().nullable().describe("The name of the vessel class."),
    /**
     * A preferred sort order (sort-ascending with respect to other vessel classes).
     */
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "A preferred sort order (sort-ascending with respect to other vessel classes)."
      ),
    /**
     * A URL that points to a detailed drawing of the vessel class.
     */
    DrawingImg: z
      .string()
      .nullable()
      .describe("A URL that points to a detailed drawing of the vessel class."),
    /**
     * A URL that points to a small drawing of the vessel class.
     */
    SilhouetteImg: z
      .string()
      .nullable()
      .describe("A URL that points to a small drawing of the vessel class."),
    /**
     * The name of this vessel class, formatted for the public.
     */
    PublicDisplayName: z
      .string()
      .nullable()
      .describe("The name of this vessel class, formatted for the public."),
  })
  .describe(
    "Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel."
  );

export type VesselClass = z.infer<typeof vesselClassSchema>;

/**
 * Base vessel schema containing common vessel fields
 */
export const vesselBaseSchema = z.object({
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
  Class: vesselClassSchema.nullable(),
});

export type VesselBase = z.infer<typeof vesselBaseSchema>;
