import { z } from "zod";
import { terminalBulletinsSchema } from "./terminalBulletins.zod";

/**
 * Array of terminal bulletins
 *
 * Alerts and bulletins associated with terminals.
 */
export const terminalBulletinssSchema = z
  .array(terminalBulletinsSchema)
  .describe("Alerts and bulletins associated with terminals.");

export type TerminalBulletinss = z.infer<typeof terminalBulletinssSchema>;
