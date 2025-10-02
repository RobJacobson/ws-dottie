import { z } from "zod";

/**
 * Input schema for GetMountainPassConditions endpoint
 *
 * This endpoint only requires AccessCode, so no additional parameters are needed.
 * The AccessCode is handled separately and not included in this schema.
 */
export const getMountainPassConditionsSchema = z.object({});

export type GetMountainPassConditionsInput = z.infer<
  typeof getMountainPassConditionsSchema
>;

/**
 * Input schema for GetMountainPassCondition endpoint
 *
 * This endpoint requires a PassConditionID parameter in addition to the AccessCode.
 * The AccessCode is handled separately and not included in this schema.
 */
export const getMountainPassConditionSchema = z.object({
  /** A PassConditionID for a specific pass condition report. */
  PassConditionID: z
    .int()
    .describe("A PassConditionID for a specific pass condition report."),
});

export type GetMountainPassConditionInput = z.infer<
  typeof getMountainPassConditionSchema
>;
