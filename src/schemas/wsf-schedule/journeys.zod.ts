import { z } from "zod";
import { journeySchema } from "./journey.zod";

/**
 * Array of journeys.
 */
export const journeysSchema = z
  .array(journeySchema)
  .describe(
    "A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing."
  );

export type Journeys = z.infer<typeof journeysSchema>;
