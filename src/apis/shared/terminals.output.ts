import { z } from "@/shared/zod";

/**
 * Common terminal schema shared across WSF APIs.
 *
 * Represents terminal information including identifier and human-readable
 * description. `Description` is always present based on captured sample data.
 */
export const terminalSchema = z
  .object({
    TerminalID: z.number().describe("Numeric ID of the terminal."),
    Description: z.string().describe("Display name of the terminal."),
  })
  .describe("Terminal information with identifier and name.");

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Common terminal list schema shared across WSF APIs.
 *
 * Represents arrays of terminal records returned by terminal list endpoints.
 */
export const terminalListSchema = z
  .array(terminalSchema)
  .describe("Array of terminal records.");

export type TerminalList = z.infer<typeof terminalListSchema>;
