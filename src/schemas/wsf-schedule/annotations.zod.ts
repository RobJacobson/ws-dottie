import { z } from "zod";
import { annotationSchema } from "./annotation.zod";

/**
 * Array of annotations.
 */
export const annotationsSchema = z
  .array(annotationSchema)
  .describe("Informational attributes associated with the terminal time.");

export type Annotations = z.infer<typeof annotationsSchema>;
