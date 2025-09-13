import { z } from "zod";
import { mapAreaSchema } from "./mapArea.zod";

/**
 * MapAreas schema
 *
 * Array of map areas used for filtering highway alerts.
 */
export const mapAreasSchema = z
  .array(mapAreaSchema)
  .describe("Array of map areas used for filtering highway alerts.");

/** MapAreas type */
export type MapAreas = z.infer<typeof mapAreasSchema>;
