import { z } from "zod";

/**
 * Input schema for GetEventCategories endpoint
 *
 * Selects an array of valid categories to use with SearchAlerts
 */
export const getEventCategoriesSchema = z
  .object({})
  .describe("Selects an array of valid categories to use with SearchAlerts");

export type GetEventCategoriesInput = z.infer<typeof getEventCategoriesSchema>;
