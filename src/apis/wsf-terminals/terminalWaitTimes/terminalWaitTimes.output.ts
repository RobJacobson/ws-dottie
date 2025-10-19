/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * WaitTime schema
 *
 * Contains wait time information.
 */
export const waitTimeSchema = z.object({
  /**
   * Unique identifier for the route associated with this wait time.
   */
  RouteID: z
    .number()
    .int()
    .nullable()
    .describe(
      "Unique identifier for the route associated with this wait time."
    ),
  /** The name of the route associated with this wait time. */
  RouteName: z
    .string()
    .nullable()
    .describe("The name of the route associated with this wait time."),
  /**
   * Notes detailing wait time conditions along with tips for vehicles and passengers.
   */
  WaitTimeNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions along with tips for vehicles and passengers."
    ),
  /**
   * The date this wait time information was last updated.
   */
  WaitTimeLastUpdated: zDotnetDate()
    .nullable()
    .describe("The date this wait time information was last updated."),
  /**
   * Notes detailing wait time conditions (tailored for text to speech systems).
   */
  WaitTimeIVRNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions (tailored for text to speech systems)."
    ),
});

export type WaitTime = z.infer<typeof waitTimeSchema>;

/**
 * TerminalWaitTime schema
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimeSchema = terminalBaseSchema.extend({
  /**
   * The wait times associated with this terminal.
   */
  WaitTimes: z
    .array(waitTimeSchema)
    .nullable()
    .describe("The wait times associated with this terminal."),
});

export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

/**
 * GetAllTerminalWaitTimes schema
 *
 * Returns all terminal wait times.
 */
export const getAllTerminalWaitTimesSchema = z
  .array(terminalWaitTimeSchema)
  .describe(
    "This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalWaitTimes = z.infer<
  typeof getAllTerminalWaitTimesSchema
>;
