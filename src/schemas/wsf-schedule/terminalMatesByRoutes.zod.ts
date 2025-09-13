import { z } from "zod";
import { terminalMatesByRouteSchema } from "./terminalMatesByRoute.zod";

/**
 * TerminalMatesByRoutes schema
 *
 * Array of terminal mates by route.
 */
export const terminalMatesByRoutesSchema = z
  .array(terminalMatesByRouteSchema)
  .describe(
    "The valid departing and arriving terminal combinations for the given trip date and route."
  );

/** TerminalMatesByRoutes type */
export type TerminalMatesByRoutes = z.infer<typeof terminalMatesByRoutesSchema>;
