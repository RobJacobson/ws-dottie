import { z } from "@/shared/zod";

/**
 * Input schema for EventCategories endpoint
 *
 * Selects an array of valid categories to use with SearchAlerts
 */
export const eventCategoriesInputSchema = z
  .object({})
  .describe(
    "Input for retrieving all available event category names for alert filtering."
  );

export type EventCategoriesInput = z.infer<typeof eventCategoriesInputSchema>;
