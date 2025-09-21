import { z } from "zod";

/**
 * Schema for GetBorderCrossings input parameters
 */
export const GetBorderCrossingsInputSchema = z.object({});

export type GetBorderCrossingsInput = z.infer<
  typeof GetBorderCrossingsInputSchema
>;
