import { z } from "@/shared/zod";

/**
 * Base terminal schema containing common fields shared across all terminal schemas
 */
export const terminalBaseSchema = z
  .object({
    TerminalID: z.number().int().describe("Numeric ID of the terminal."),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Numeric ID of the terminal in the WSF subject management system."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Numeric ID of the geographical region where the terminal is located."
      ),
    TerminalName: z
      .string()
      .nullable()
      .describe("Display name of the terminal."),
    TerminalAbbrev: z
      .string()
      .nullable()
      .describe("Abbreviation code for the terminal."),
    SortSeq: z
      .number()
      .int()
      .describe("Display sort order; lower values appear first in lists."),
  })
  .describe(
    "Base terminal information including identification, naming, regional association, and display ordering."
  );

export type TerminalBase = z.infer<typeof terminalBaseSchema>;
