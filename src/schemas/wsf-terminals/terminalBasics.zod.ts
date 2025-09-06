import { z } from "zod";
import { terminalSchema } from "./terminal.zod";

/**
 * Terminal basics schema for WSF Terminals API
 *
 * This operation retrieves the most basic / brief information pertaining to terminals.
 * A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a
 * specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed
 * as part of the URL string.
 */
export const terminalBasicsSchema = terminalSchema.extend({
  /** Indicates whether or not overhead passenger loading is available. */
  OverheadPassengerLoading: z
    .boolean()
    .describe(
      "Indicates whether or not overhead passenger loading is available."
    ),

  /** Indicates whether or not the terminal has an elevator. */
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the terminal has an elevator."),

  /** Indicates whether or not the terminal has a waiting room. */
  WaitingRoom: z
    .boolean()
    .describe("Indicates whether or not the terminal has a waiting room."),

  /** Indicates whether or not the terminal offers food service. */
  FoodService: z
    .boolean()
    .describe("Indicates whether or not the terminal offers food service."),

  /** Indicates whether or not the terminal has one or more restrooms. */
  Restroom: z
    .boolean()
    .describe(
      "Indicates whether or not the terminal has one or more restrooms."
    ),
});

export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;

export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);
export type TerminalBasicsArray = z.infer<typeof terminalBasicsArraySchema>;
