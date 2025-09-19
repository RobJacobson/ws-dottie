import { z } from "zod";

import { spaceForArrivalTerminalSchema } from "./spaceForArrivalTerminal.zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Departing space schema for WSF Terminals API
 *
 * Represents the most recent departures leaving a terminal with space availability information.
 */
export const departingSpaceSchema = z.object({
  /** The date and time of the departure. */
  Departure: zWsdotDate().describe("The date and time of the departure."),

  /** Indicates whether or not the departure is cancelled. */
  IsCancelled: z
    .boolean()
    .describe("Indicates whether or not the departure is cancelled."),

  /** Unique identifier for the vessel making this departure. */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),

  /** The name of the vessel making this departure. */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),

  /** The maximum space available on the vessel making this departure. */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),

  /** The available space for one or more destinations. */
  SpaceForArrivalTerminals: z
    .array(spaceForArrivalTerminalSchema)
    .nullable()
    .describe("The available space for one or more destinations."),
});

export type DepartingSpace = z.infer<typeof departingSpaceSchema>;
