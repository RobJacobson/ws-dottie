import { z } from "@/shared/zod-openapi-init";

/**
 * Common terminal schema shared across WSF APIs.
 *
 * Represents terminal information including identifier and human-readable
 * description. `Description` is always present based on captured sample data.
 */
export const terminalSchema = z
  .object({
    TerminalID: z
      .number()
      .describe(
        "Unique terminal identifier, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal, '4' for Bremerton terminal, '5' for Clinton terminal, '11' for Coupeville terminal. Used as primary key for terminal identification and fare queries."
      ),
    Description: z
      .string()
      .describe(
        "Human-readable terminal name, as a terminal name. E.g., 'Anacortes' for terminal 1, 'Bainbridge Island' for terminal 3, 'Bremerton' for terminal 4, 'Clinton' for terminal 5, 'Coupeville ' for terminal 11. Provides terminal identification for display and user interfaces."
      ),
  })
  .describe(
    "Represents base terminal information including terminal identifier and name. E.g., terminal 1 (Anacortes) or terminal 3 (Bainbridge Island). Used for terminal identification in fare queries and terminal lookups."
  );

export type Terminal = z.infer<typeof terminalSchema>;

/**
 * Common terminal list schema shared across WSF APIs.
 *
 * Represents arrays of terminal records returned by terminal list endpoints.
 */
export const terminalListSchema = z
  .array(terminalSchema)
  .describe(
    "Represents a list of terminal records, such as those returned from terminal listings or terminal mates lookups."
  );

export type TerminalList = z.infer<typeof terminalListSchema>;
