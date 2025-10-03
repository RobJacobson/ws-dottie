import { z } from "zod";

/**
 * Schema for GetBorderCrossings input parameters
 * Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada.
 */
export const getBorderCrossingsSchema = z.object({});

export type GetBorderCrossingsInput = z.infer<typeof getBorderCrossingsSchema>;
