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
 * SpaceForArrivalTerminal schema
 *
 * Contains space information for arrival terminals.
 */
export const spaceForArrivalTerminalSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for arrival terminal destination, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Used to identify destination terminal for space availability."
      ),
    TerminalName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of arrival terminal destination, as a terminal name. E.g., 'Anacortes -> Friday Harbor' for multi-destination sailing, 'Seattle' for single destination, null when terminal name is unavailable. Provides destination identification for display."
      ),
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique identifier for vessel planned to service departure, as an integer ID. E.g., '69' for Samish vessel, '38' for Yakima vessel, '17' for Kaleetan vessel. Used to identify which vessel operates departure."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of vessel planned to service departure, as a vessel name. E.g., 'Samish' for vessel 69, 'Yakima' for vessel 38, 'Kaleetan' for vessel 17, null when vessel name is unavailable. Provides vessel identification for display."
      ),
    DisplayReservableSpace: z
      .boolean()
      .describe(
        "Indicator whether reservable space information should be displayed, as a boolean. E.g., true for routes supporting reservations, false for routes without reservations. Used to determine if reservation space data should be shown."
      ),
    ReservableSpaceCount: z
      .number()
      .int()
      .nullable()
      .describe(
        "Remaining reservable vehicle spaces available on vessel, as an integer count. E.g., '45' for 45 reservable spaces remaining, '36' for 36 reservable spaces, null when reservations are not supported or count is unavailable. Used for reservation availability display."
      ),
    ReservableSpaceHexColor: z
      .string()
      .nullable()
      .describe(
        "Hex color code representing reservable space availability status, as a hex color. E.g., '#FFFF00' for yellow (limited availability), '#888888' for gray (not available), null when color is unavailable. Used for visual space availability indicators."
      ),
    DisplayDriveUpSpace: z
      .boolean()
      .describe(
        "Indicator whether drive-up space information should be displayed, as a boolean. E.g., true for routes with drive-up space tracking, false when drive-up space is not tracked. Used to determine if drive-up space data should be shown."
      ),
    DriveUpSpaceCount: z
      .number()
      .int()
      .nullable()
      .describe(
        "Remaining drive-up vehicle spaces available on vessel, as an integer count. E.g., '67' for 67 drive-up spaces remaining, '197' for 197 drive-up spaces, null when drive-up space is not tracked or count is unavailable. Used for drive-up availability display."
      ),
    DriveUpSpaceHexColor: z
      .string()
      .nullable()
      .describe(
        "Hex color code representing drive-up space availability status, as a hex color. E.g., '#00FF00' for green (good availability), '#FFFF00' for yellow (limited availability), null when color is unavailable. Used for visual space availability indicators."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .describe(
        "Maximum vehicle capacity on vessel making departure, as an integer count. E.g., '141' for Samish vessel capacity, '139' for Yakima vessel capacity, '197' for Tacoma vessel capacity. Used to calculate space availability percentage."
      ),
    ArrivalTerminalIDs: z
      .array(z.number().int())
      .nullable()
      .describe(
        "Array of arrival terminal IDs associated with this space count set, as terminal ID integers. E.g., array containing terminal 10 for single destination, array containing terminals 13, 10 for multi-destination sailing, null when terminal IDs are unavailable. Used to identify all destinations served by this space count."
      ),
  })
  .describe(
    "Represents space availability information for arrival terminal destination including terminal/vessel identification, reservable space count and color, drive-up space count and color, maximum capacity, and arrival terminal IDs. E.g., Friday Harbor destination with 67 drive-up spaces (green) and 141 maximum capacity on Samish vessel. Used for real-time space availability display."
  );

export type SpaceForArrivalTerminal = z.infer<
  typeof spaceForArrivalTerminalSchema
>;

/**
 * DepartingSpace schema
 *
 * Contains departing space information.
 */
export const departingSpaceSchema = z
  .object({
    Departure: zDotnetDate().describe(
      "Date and time of departure, as a UTC datetime. E.g., '2025-11-02T21:35:00.000Z' for departure at 9:35 PM on November 2, 2025. Used for departure schedule display and space availability timing."
    ),
    IsCancelled: z
      .boolean()
      .describe(
        "Indicator whether departure is cancelled, as a boolean. E.g., false for active departures, true for cancelled departures. Used to determine if departure is operational."
      ),
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique identifier for vessel planned to service departure, as an integer ID. E.g., '69' for Samish vessel, '38' for Yakima vessel, '17' for Kaleetan vessel. Used to identify which vessel operates departure."
      ),
    VesselName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of vessel planned to service departure, as a vessel name. E.g., 'Samish' for vessel 69, 'Yakima' for vessel 38, 'Kaleetan' for vessel 17, null when vessel name is unavailable. Provides vessel identification for display."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .describe(
        "Maximum vehicle capacity on vessel making departure, as an integer count. E.g., '141' for Samish vessel capacity, '139' for Yakima vessel capacity, '197' for Tacoma vessel capacity. Used to calculate space availability percentage."
      ),
    SpaceForArrivalTerminals: z
      .array(spaceForArrivalTerminalSchema)
      .nullable()
      .describe(
        "Array of space availability information for one or more arrival terminal destinations, as space for arrival terminal objects. E.g., array containing Friday Harbor destination with space counts, array containing multiple destinations for multi-destination sailing, null when space information is unavailable. Used for real-time space availability display by destination."
      ),
  })
  .describe(
    "Represents departing space information including departure time, cancellation status, vessel details, maximum capacity, and space availability for arrival terminals. E.g., departure at 9:35 PM with Samish vessel (ID 69, capacity 141) and space information for Friday Harbor destination. Used for real-time departure space availability display."
  );

export type DepartingSpace = z.infer<typeof departingSpaceSchema>;

/**
 * TerminalSailingSpace schema
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalSailingSpaceSchema = terminalBaseSchema
  .extend({
    DepartingSpaces: z
      .array(departingSpaceSchema)
      .nullable()
      .optional()
      .describe(
        "Array of upcoming departures leaving terminal with space availability information, as departing space objects. E.g., array containing multiple departures with vessel and space details, null when departure information is unavailable. Used for real-time departure space availability display."
      ),
    IsNoFareCollected: z
      .boolean()
      .nullable()
      .describe(
        "Indicator whether terminal is capable of collecting fares, as a boolean. E.g., null when fare collection status is unknown, false when terminal collects fares, true when terminal does not collect fares. Used to determine fare collection capability."
      ),
    NoFareCollectedMsg: z
      .string()
      .nullable()
      .describe(
        "Optional message explaining how inability to collect fares affects terminal conditions data, as a message string. E.g., null when fare collection is available, message when fare collection affects space tracking accuracy. Used to inform users about data limitations."
      ),
  })
  .describe(
    "Represents terminal sailing space information including terminal identification, upcoming departures with space availability, and fare collection status. E.g., Anacortes terminal (ID 1) with multiple departures showing drive-up and reservation space availability. Used for real-time terminal condition monitoring and space availability display."
  );

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;

/**
 * GetAllTerminalSailingSpace schema
 *
 * Returns all terminal sailing space information.
 */
export const getAllTerminalSailingSpaceSchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "Array of terminal sailing space information including terminal IDs, upcoming departures with space availability, and fare collection status. E.g., array containing all terminals with their real-time space data. Used for real-time terminal condition monitoring across all terminals."
  );

export type GetAllTerminalSailingSpace = z.infer<
  typeof getAllTerminalSailingSpaceSchema
>;

/**
 * GetSpecificTerminalSailingSpace schema
 *
 * Returns sailing space information for a specific terminal.
 */
export const getSpecificTerminalSailingSpaceSchema = terminalSailingSpaceSchema;

export type GetSpecificTerminalSailingSpace = z.infer<
  typeof getSpecificTerminalSailingSpaceSchema
>;
