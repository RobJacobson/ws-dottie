import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for GetMountainPassConditions endpoint
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const mountainPassConditionsInputSchema = z
  .object({})
  .describe(
    "Retrieves real-time mountain pass condition data for all passes, returning weather conditions, road conditions, temperature, elevation, travel restrictions, and advisory status. Coverage includes 15 mountain passes statewide. Use for winter travel planning and pass condition monitoring."
  );

export type MountainPassConditionsInput = z.infer<
  typeof mountainPassConditionsInputSchema
>;

/**
 * Input schema for GetMountainPassCondition endpoint
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const mountainPassConditionByIdInputSchema = z
  .object({
    PassConditionID: z
      .int()
      .describe(
        "Unique mountain pass identifier, as an integer ID. E.g., '12' for White Pass US 12. Used to retrieve specific pass condition information."
      ),
  })
  .describe(
    "Retrieves real-time mountain pass condition data for specific pass by ID, returning weather conditions, road conditions, temperature, elevation, travel restrictions, and advisory status. Use for individual pass condition lookups."
  );

export type MountainPassConditionByIdInput = z.infer<
  typeof mountainPassConditionByIdInputSchema
>;
