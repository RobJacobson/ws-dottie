import { z } from "zod";
import { borderCrossingSchema } from "./borderCrossing.zod";

/**
 * BorderCrossings schema
 *
 * Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada.
 */
export const borderCrossingsSchema = z
  .array(borderCrossingSchema)
  .describe(
    "Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada."
  );

/** BorderCrossings type */
export type BorderCrossings = z.infer<typeof borderCrossingsSchema>;
