import { z } from "@/shared/zod";

export const vesselClassSchema = z
  .object({
    ClassID: z.number().int().describe("Numeric ID of the vessel class."),
    ClassSubjectID: z
      .number()
      .int()
      .describe("Numeric ID of the WSF subject for this vessel class."),
    ClassName: z
      .string()
      .nullable()
      .describe("Display name of the vessel class."),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe("Display sort order; lower values appear first in lists."),
    DrawingImg: z
      .string()
      .nullable()
      .describe("URL to detailed vessel class drawing image."),
    SilhouetteImg: z
      .string()
      .nullable()
      .describe("URL to small silhouette image of vessel class."),
    PublicDisplayName: z
      .string()
      .nullable()
      .describe("Public-facing display name of the vessel class."),
  })
  .describe("Vessel class information grouping similar vessels in the fleet.");

export type VesselClass = z.infer<typeof vesselClassSchema>;

export const vesselBaseSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
    VesselSubjectID: z
      .number()
      .int()
      .describe("Numeric ID of the WSF subject for this vessel."),
    VesselName: z.string().nullable().describe("Display name of the vessel."),
    VesselAbbrev: z
      .string()
      .nullable()
      .describe("Abbreviation code of the vessel."),
    Class: vesselClassSchema.nullable(),
  })
  .describe(
    "Base vessel information containing common identification fields shared across all vessel endpoints."
  );

export type VesselBase = z.infer<typeof vesselBaseSchema>;
