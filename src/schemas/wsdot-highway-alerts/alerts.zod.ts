import { z } from "zod";
import { alertSchema } from "./alert.zod";

/**
 * Alerts schema
 *
 * Coverage Area: Statewide. Provides access to all of the active incidents currently logged in our ROADS system.
 */
export const alertsSchema = z
  .array(alertSchema)
  .describe(
    "Coverage Area: Statewide. Provides access to all of the active incidents currently logged in our ROADS system."
  );

/** Alerts type */
export type Alerts = z.infer<typeof alertsSchema>;
