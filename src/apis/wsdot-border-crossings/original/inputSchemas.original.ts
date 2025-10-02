import { z } from "zod";

/**
 * Schema for GetBorderCrossings input parameters
 */
export const getBorderCrossingsSchema = z.object({});

export type GetBorderCrossingsInput = z.infer<
  typeof getBorderCrossingsSchema
>;
