import { z } from "zod";

/**
 * Input schema for GetMountainPassConditions endpoint
 * Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system.
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
 * Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system.
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
