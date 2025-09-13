import { z } from "zod";
import { departingSpaceSchema } from "./departingSpace.zod";
import { terminalSchema } from "./terminal.zod";

/**
 * Terminal sailing space schema for WSF Terminals API
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation
 * spaces available for select departures). A TerminalID, or unique terminal identifier,
 * may be optionally passed to retrieve a specific terminal. A valid API Access Code from
 * the WSDOT Traveler API must be passed as part of the URL string.
 *
 * ⚠️ Important: This data changes very frequently (potentially every 5 seconds).
 * Please do not cache results in your application for an extended period of time.
 */
export const terminalSailingSpaceSchema = terminalSchema.extend({
  /** The most recent departures leaving this terminal. */
  DepartingSpaces: z
    .array(departingSpaceSchema)
    .nullable()
    .describe("The most recent departures leaving this terminal."),

  /** True if this terminal isn't capable of collecting fares. */
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),

  /** An optional message detailing how inability to collect fares could affect terminal conditions data. */
  NoFareCollectedMsg: z
    .string()
    .nullable()
    .describe(
      "An optional message detailing how inability to collect fares could affect terminal conditions data."
    ),
});

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;
