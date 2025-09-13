import { z } from "zod";
import { activeSeasonSchema } from "./activeSeason.zod";

/**
 * Array of active seasons.
 */
export const activeSeasonsSchema = z
  .array(activeSeasonSchema)
  .describe("A summary of active seasons.");

export type ActiveSeasons = z.infer<typeof activeSeasonsSchema>;
