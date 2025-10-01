import { z } from "zod";

export const getBorderCrossingsInputSchema = z
  .object({})
  .describe(
    "Input parameters to retrieve all border crossing wait times across Washington State US-Canada border crossings (none required)."
  );

export type GetBorderCrossingsInput = z.infer<
  typeof getBorderCrossingsInputSchema
>;
