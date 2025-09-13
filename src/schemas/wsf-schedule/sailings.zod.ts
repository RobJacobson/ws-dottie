import { z } from "zod";
import { sailingSchema } from "./sailing.zod";

/**
 * Array of sailings.
 */
export const sailingsSchema = z
  .array(sailingSchema)
  .describe("The sailings for a particular scheduled route.");

export type Sailings = z.infer<typeof sailingsSchema>;
