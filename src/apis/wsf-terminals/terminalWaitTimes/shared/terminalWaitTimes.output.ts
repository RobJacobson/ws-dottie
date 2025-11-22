/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../../shared/terminalBaseSchema";

/**
 * WaitTime schema
 *
 * Contains wait time information.
 */
export const waitTimeSchema = z
  .object({
    RouteID: z
      .number()
      .int()
      .nullable()
      .describe("Numeric ID of the route associated with the wait time."),
    RouteName: z
      .string()
      .nullable()
      .describe("Display name of the route associated with the wait time."),
    WaitTimeNotes: z
      .string()
      .nullable()
      .describe(
        "Text notes detailing wait time conditions and tips for vehicles and passengers."
      ),
    WaitTimeLastUpdated: z.date()
      .nullable()
      .describe(
        "UTC datetime when the wait time information was last updated."
      ),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe(
        "Wait time notes formatted for Interactive Voice Response systems."
      ),
  })
  .describe(
    "Wait time information including route association, notes, IVR notes, and update date."
  );

export type WaitTime = z.infer<typeof waitTimeSchema>;

/**
 * TerminalWaitTime schema
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimeSchema = terminalBaseSchema
  .extend({
    WaitTimes: z
      .array(waitTimeSchema)
      .nullable()
      .describe("Array of wait time information associated with the terminal."),
  })
  .describe(
    "Terminal wait time information including terminal identification and wait time list."
  );

export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

/**
 * GetAllTerminalWaitTimes schema
 *
 * Returns all terminal wait times.
 */
export const getAllTerminalWaitTimesSchema = z
  .array(terminalWaitTimeSchema)
  .describe("Array of wait time information for all terminals.");

export type GetAllTerminalWaitTimes = z.infer<
  typeof getAllTerminalWaitTimesSchema
>;
