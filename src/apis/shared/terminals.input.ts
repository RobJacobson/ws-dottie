import { z } from "@/shared/zod";

/**
 * Input parameters for retrieving valid departing terminals for a specified trip date.
 */
export const terminalsInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format; must be within valid date range from GetValidDateRange."
      ),
  })
  .describe(
    "Input parameters for retrieving valid departing terminals for a specified trip date."
  );

export type TerminalsInput = z.infer<typeof terminalsInputSchema>;

/**
 * Input parameters for retrieving arriving terminals (terminal mates) for a departing terminal and trip date.
 */
export const terminalMatesInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format; must be within valid date range from GetValidDateRange."
      ),
    TerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
  })
  .describe(
    "Input parameters for retrieving arriving terminals (terminal mates) for a departing terminal and trip date."
  );

export type TerminalMatesInput = z.infer<typeof terminalMatesInputSchema>;
