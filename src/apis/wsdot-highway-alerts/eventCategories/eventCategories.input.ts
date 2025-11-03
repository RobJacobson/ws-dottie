import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for GetEventCategories endpoint
 *
 * Selects an array of valid categories to use with SearchAlerts
 */
export const getEventCategoriesSchema = z
  .object({})
  .describe(
    "Retrieves array of valid event category names for use with alert searches. E.g., 'Construction', 'Collision', 'Maintenance', 'Rest Area', 'Closure'. Use to obtain valid category values for filtering alerts by event type."
  );

export type GetEventCategoriesInput = z.infer<typeof getEventCategoriesSchema>;
