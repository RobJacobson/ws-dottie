import { z } from "zod";
import { passConditionSchema } from "./passCondition.zod";

/**
 * MountainPassConditions schema
 *
 * Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system.
 */
export const mountainPassConditionsSchema = z
  .array(passConditionSchema)
  .describe(
    "Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system."
  );

/** MountainPassConditions type */
export type MountainPassConditions = z.infer<
  typeof mountainPassConditionsSchema
>;
