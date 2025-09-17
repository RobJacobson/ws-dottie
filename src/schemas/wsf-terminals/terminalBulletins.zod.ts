import { z } from "zod";
import { bulletinSchema } from "./bulletin.zod";
import { terminalSchema } from "./terminal.zod";

/**
 * Terminal bulletins schema for WSF Terminals API
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal
 * may have zero or more bulletins assigned to it. A TerminalID, or unique terminal
 * identifier, may be optionally passed to retrieve a specific terminal. A valid API
 * Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const terminalBulletinsSchema = terminalSchema.extend({
  /** The bulletins / alerts associated with this terminal. */
  Bulletins: z
    .array(bulletinSchema)
    .nullable()
    .describe("The bulletins / alerts associated with this terminal."),
});

export type TerminalBulletins = z.infer<typeof terminalBulletinsSchema>;

/**
 * Array of terminal bulletins.
 */
export const terminalBulletinsListSchema = z
  .array(terminalBulletinsSchema)
  .describe("Alerts and bulletins associated with terminals.");

export type TerminalBulletinsList = z.infer<typeof terminalBulletinsListSchema>;
