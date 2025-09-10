import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";
import { annotationSchema } from "./annotation.zod";

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
    .enum(["Departure", "Arrival"])
    .nullable()
    .describe(
      "Indicates whether this stop represents a departure or an arrival. If the journey does not stop at this terminal no value will be present."
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
export const terminalTimesArraySchema = z
  .array(terminalTimeSchema)
  .describe(
    "One or more terminal departures or arrivals made by the same vessel."
  );

export type TerminalTimesArray = z.infer<typeof terminalTimesArraySchema>;

/**
 * Schema for journey response from WSF Schedule API.
 * A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing.
 */
export const journeySchema = z.object({
  /** Unique identifier for a journey. */
  JourneyID: z.number().int().describe("Unique identifier for a journey."),
  /** Indicates whether or not the journey contains reservable departures. */
  ReservationInd: z
    .boolean()
    .describe(
      "Indicates whether or not the journey contains reservable departures."
    ),
  /** Indicates whether or not the journey travels outside the US. */
  InternationalInd: z
    .boolean()
    .describe("Indicates whether or not the journey travels outside the US."),
  /** If true, this indicates that the journey operates primarily between islands and a single mainland. */
  InterislandInd: z
    .boolean()
    .describe(
      "If true, this indicates that the journey operates primarily between islands and a single mainland."
    ),
  /** Unique identifier for the vessel that's planned to service this journey. */
  VesselID: z
    .number()
    .int()
    .describe(
      "Unique identifier for the vessel that's planned to service this journey."
    ),
  /** The name of the vessel that's planned to service this journey. */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel that's planned to service this journey."),
  /** A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible. */
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible."
    ),
  /** A number that represents a single vessel that services all of the stops in the journey. */
  VesselPositionNum: z
    .number()
    .int()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
  /** One or more terminal departures or arrivals made by the same vessel. */
  TerminalTimes: z
    .array(terminalTimeSchema)
    .nullable()
    .describe(
      "One or more terminal departures or arrivals made by the same vessel."
    ),
});

export type Journey = z.infer<typeof journeySchema>;

/**
 * Array of journeys.
 */
export const journeysArraySchema = z
  .array(journeySchema)
  .describe(
    "A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing."
  );

export type JourneysArray = z.infer<typeof journeysArraySchema>;
