import { z } from "zod";
import { bridgeDataGISSchema } from "./bridgeDataGIS.zod";

/**
 * Clearance schema
 *
 * Bridge clearance information, see disclaimer.
 */
export const clearanceSchema = z
  .array(bridgeDataGISSchema)
  .describe("Bridge clearance information, see disclaimer.");

/** Clearance type */
export type Clearance = z.infer<typeof clearanceSchema>;
