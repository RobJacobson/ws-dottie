import { z } from "@/shared/zod";

/**
 * Terminal information with identifier and display name.
 */
export const terminalSchema = z
  .object({
    TerminalID: z.number().describe("Numeric ID of the terminal."),
    Description: z.string().describe("Display name of the terminal."),
  })
  .describe("Terminal information with identifier and display name.");

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Array of terminal records returned by terminal list endpoints.
 */
export const terminalListSchema = z
  .array(terminalSchema)
  .describe("Array of terminal records.");

export type TerminalList = z.infer<typeof terminalListSchema>;
