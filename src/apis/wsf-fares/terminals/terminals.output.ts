/**
 * @fileoverview Output schemas for WSF Fares API Terminals endpoints
 *
 * These schemas define the response structures for WSF Fares API Terminals endpoints.
 */

import { z } from "zod";

/**
 * Base terminal schema for fares API
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalBaseSchema = z
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

export type TerminalBase = z.infer<typeof terminalBaseSchema>;

/**
 * Terminal response schema used by multiple endpoints
 */
export const terminalResponseSchema = terminalBaseSchema;

export type TerminalResponse = z.infer<typeof terminalResponseSchema>;
