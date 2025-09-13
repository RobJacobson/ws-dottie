import { z } from "zod";
import { bridgeClearanceSchema } from "./bridgeClearance.zod";

/**
 * BridgeClearances schema
 *
 * Bridge clearance information, see disclaimer.
 */
export const bridgeClearancesSchema = z
  .array(bridgeClearanceSchema)
  .describe("Bridge clearance information, see disclaimer.");

/** BridgeClearances type */
export type BridgeClearances = z.infer<typeof bridgeClearancesSchema>;
