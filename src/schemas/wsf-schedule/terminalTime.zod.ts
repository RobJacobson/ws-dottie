import { z } from "zod";

import { annotationSchema } from "./annotation.zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Schema for terminal time response from WSF Schedule API.
 * One or more terminal departures or arrivals made by the same vessel.
 */
export const terminalTimeSchema = z.object({
  /** Unique identifier for a terminal time. */
  JourneyTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for a terminal time."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  /** The full name of the terminal. */
  TerminalDescription: z
    .string()
    .nullable()
    .describe("The full name of the terminal."),
  /** A brief / shortened name for the terminal. */
  TerminalBriefDescription: z
    .string()
    .nullable()
    .describe("A brief / shortened name for the terminal."),
  /** The time of the departure / arrival. If the journey does not stop at this terminal no value will be present. */
  Time: zWsdotDate()
    .nullable()
    .describe(
      "The time of the departure / arrival. If the journey does not stop at this terminal no value will be present."
    ),
  /** Indicates whether this stop represents a departure or an arrival. If the journey does not stop at this terminal no value will be present. */
  DepArrIndicator: z
    .union([z.literal(1), z.literal(2)])
    .nullable()
    .describe(
      "Indicates whether this stop represents a departure or an arrival (1 = Departure, 2 = Arrival). If the journey does not stop at this terminal no value will be present."
    ),
  /** If true indicates that the journey does not interact with this terminal. */
  IsNA: z
    .boolean()
    .describe(
      "If true indicates that the journey does not interact with this terminal."
    ),
  /** Informational attributes associated with the terminal time. */
  Annotations: z
    .array(annotationSchema)
    .nullable()
    .describe("Informational attributes associated with the terminal time."),
});

export type TerminalTime = z.infer<typeof terminalTimeSchema>;

/**
 * Array of terminal times.
 */
export const terminalTimesSchema = z
  .array(terminalTimeSchema)
  .describe(
    "One or more terminal departures or arrivals made by the same vessel."
  );

export type TerminalTimes = z.infer<typeof terminalTimesSchema>;
