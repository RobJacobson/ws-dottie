import { z } from "zod";

/**
 * EventCategories schema
 *
 * Event category list for highway alerts.
 */
export const eventCategoriesSchema = z
  .array(z.string().nullable())
  .describe(
    "Array of event category strings used for classifying highway alerts."
  );

/** EventCategories type */
export type EventCategories = z.infer<typeof eventCategoriesSchema>;
