import { z } from "zod";

import { terminalTimeSchema } from "./terminalTime.zod";

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
export const journeysSchema = z
  .array(journeySchema)
  .describe(
    "A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing."
  );

export type Journeys = z.infer<typeof journeysSchema>;
