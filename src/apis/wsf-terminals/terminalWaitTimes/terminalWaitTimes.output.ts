/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

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
      .describe(
        "Unique identifier for route associated with wait time, as an integer ID. E.g., null when wait time applies to all routes from terminal, route ID when wait time is route-specific. Used to identify route for wait time context."
      ),
    RouteName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of route associated with wait time, as a route name. E.g., null when wait time applies to all routes, route name when wait time is route-specific. Provides route identification for wait time context."
      ),
    WaitTimeNotes: z
      .string()
      .nullable()
      .describe(
        "Text notes detailing wait time conditions and tips for vehicles and passengers, as wait time notes. E.g., 'Vehicle reservations to the San Juan Islands are available...' for Anacortes wait time notes, 'The morning departures are extremely heavy...' for Bainbridge Island wait time notes, null when notes are unavailable. Used for wait time information display."
      ),
    WaitTimeLastUpdated: zDotnetDate()
      .nullable()
      .describe(
        "Date when wait time information was last updated, as a UTC datetime. E.g., '2020-08-18T19:31:10.000Z' for wait time updated at 7:31 PM on August 18, 2020, null when update date is unavailable. Indicates when wait time information was last modified."
      ),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe(
        "Wait time notes formatted for Interactive Voice Response systems, as IVR notes. E.g., 'Vehicle reservations to the San Juan Islands are available online or by speaking to an information agent...' for IVR playback, null when IVR notes are unavailable. Used for telephone-based wait time information systems."
      ),
  })
  .describe(
    "Represents wait time information including route association, wait time notes, IVR notes, and update date. E.g., wait time for Anacortes terminal with reservation and arrival time guidance (updated August 18, 2020). Used for wait time information display and passenger guidance."
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
      .describe(
        "Array of wait time information associated with terminal, as wait time objects. E.g., array containing wait time notes for Anacortes terminal, array containing wait time notes for Bainbridge Island terminal, null when wait time information is unavailable. Used for displaying terminal wait time conditions and passenger guidance."
      ),
  })
  .describe(
    "Represents terminal wait time information including terminal identification and wait time list. E.g., Anacortes terminal (ID 1) with wait time notes for San Juan Islands routes. Used for terminal wait time information and passenger guidance."
  );

export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

/**
 * GetAllTerminalWaitTimes schema
 *
 * Returns all terminal wait times.
 */
export const getAllTerminalWaitTimesSchema = z
  .array(terminalWaitTimeSchema)
  .describe(
    "Array of terminal wait time information including terminal IDs and wait time lists. E.g., array containing all terminals with their wait time conditions. Used for terminal wait time monitoring across all terminals."
  );

export type GetAllTerminalWaitTimes = z.infer<
  typeof getAllTerminalWaitTimesSchema
>;
