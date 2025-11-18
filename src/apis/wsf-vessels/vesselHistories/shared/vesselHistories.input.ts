import { z } from "@/shared/zod";

export const vesselHistoriesByVesselNameAndDateRangeInputSchema = z
  .object({
    VesselName: z.string().describe("Display name of the vessel."),
    DateStart: z
      .string()
      .describe("Start date for history query in YYYY-MM-DD format."),
    DateEnd: z
      .string()
      .describe("End date for history query in YYYY-MM-DD format."),
  })
  .describe(
    "Input parameters for retrieving vessel history by vessel name and date range."
  );

export type VesselHistoriesByVesselNameAndDateRangeInput = z.infer<
  typeof vesselHistoriesByVesselNameAndDateRangeInputSchema
>;

export const vesselHistoriesInputSchema = z
  .object({})
  .describe("Input parameters for retrieving vessel history for all vessels.");

export type VesselHistoriesInput = z.infer<typeof vesselHistoriesInputSchema>;
