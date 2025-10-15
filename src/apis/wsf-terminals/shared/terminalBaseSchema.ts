import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Base terminal schema containing common fields shared across all terminal schemas
 */
export const terminalBaseSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  /** Identifies this terminal as a unique WSF subject. */
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  /**
   * Identifies the geographical region where the terminal is located.
   */
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  /** The name of the terminal. */
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  /** The terminal's abbreviation. */
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  /**
   * A preferred sort order (sort-ascending with respect to other terminals).
   */
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
});

export type TerminalBase = z.infer<typeof terminalBaseSchema>;
