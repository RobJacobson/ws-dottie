import { z } from "zod";

import { scheduleTimeSchema } from "./scheduleTime.zod";

/**
 * Schema for terminal combo response from WSF Schedule API.
 * A grouping of departure and arrival terminal pairs.
 */
export const scheduleTerminalComboSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingTerminalName: z
    .string()
    .nullable()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingTerminalName: z
    .string()
    .nullable()
    .describe("The name of the arriving terminal."),
  /** Informational text that might be associated with the underlying sailing. */
  SailingNotes: z
    .string()
    .nullable()
    .describe(
      "Informational text that might be associated with the underlying sailing."
    ),
  /** An array of annotation strings assigned to one or more items in the Times array. */
  Annotations: z
    .array(z.string())
    .nullable()
    .describe(
      "An array of annotation strings assigned to one or more items in the Times array."
    ),
  /** Scheduled departure details, including departure times. */
  Times: z
    .array(scheduleTimeSchema)
    .nullable()
    .describe("Scheduled departure details, including departure times."),
  /** An array of annotation strings assigned to one or more items in the Times array formatted for IVR. */
  AnnotationsIVR: z
    .array(z.string())
    .nullable()
    .describe(
      "An array of annotation strings assigned to one or more items in the Times array formatted for IVR."
    ),
});

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

/**
 * Array of terminal combos.
 */
export const scheduleTerminalCombosSchema = z
  .array(scheduleTerminalComboSchema)
  .describe("A grouping of departure and arrival terminal pairs.");

export type ScheduleTerminalCombos = z.infer<
  typeof scheduleTerminalCombosSchema
>;
