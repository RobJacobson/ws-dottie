import { z } from "zod";

/**
 * Schema for GetBorderCrossings input parameters
 */
export const getBorderCrossingsInputSchema = z.object({});

export type GetBorderCrossingsInput = z.infer<
  typeof getBorderCrossingsInputSchema
>;
