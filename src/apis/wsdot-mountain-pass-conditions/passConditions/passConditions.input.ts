import { z } from "zod";

/**
 * Input schema for GetMountainPassConditions endpoint
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const getMountainPassConditionsSchema = z
  .object({})
  .describe(
    "Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/)."
  );

export type GetMountainPassConditionsInput = z.infer<
  typeof getMountainPassConditionsSchema
>;

/**
 * Input schema for GetMountainPassCondition endpoint
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const getMountainPassConditionSchema = z
  .object({
    /** A PassConditionID for a specific pass condition report. */
    PassConditionID: z
      .int()
      .describe("A PassConditionID for a specific pass condition report."),
  })
  .describe(
    "Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/)."
  );

export type GetMountainPassConditionInput = z.infer<
  typeof getMountainPassConditionSchema
>;
