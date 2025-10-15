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
 * SpaceForArrivalTerminal schema
 *
 * Contains space information for arrival terminals.
 */
export const spaceForArrivalTerminalSchema = z.object({
  /**
   * Unique identifier for the next closest arrival terminal.
   */
  TerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the next closest arrival terminal."),
  /** The name of the arrival terminal. */
  TerminalName: z
    .string()
    .nullable()
    .describe("The name of the arrival terminal."),
  /**
   * Unique identifier for the vessel that's planned to service this departure.
   */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  /**
   * The name of the vessel making this departure.
   */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  /**
   * Indicates whether or not reservable space should be displayed.
   */
  DisplayReservableSpace: z
    .boolean()
    .describe("Indicates whether or not reservable space should be displayed."),
  /**
   * The remaining reservable space available on the vessel.
   */
  ReservableSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining reservable space available on the vessel."),
  /**
   * A Hex color representing the ReservableSpaceCount.
   */
  ReservableSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing the ReservableSpaceCount."),
  /**
   * Indicates whether or not drive-up space should be displayed.
   */
  DisplayDriveUpSpace: z
    .boolean()
    .describe("Indicates whether or not drive-up space should be displayed."),
  /**
   * The remaining drive-up space available on the vessel.
   */
  DriveUpSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining drive-up space available on the vessel."),
  /**
   * A Hex color representing DriveUpSpaceCount.
   */
  DriveUpSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing DriveUpSpaceCount."),
  /**
   * The maximum space available on the vessel making this departure.
   */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  /**
   * An list of integers representing all arrival terminals associated with this set of counts.
   */
  ArrivalTerminalIDs: z
    .array(z.number().int())
    .nullable()
    .describe(
      "An list of integers representing all arrival terminals associated with this set of counts."
    ),
});

export type SpaceForArrivalTerminal = z.infer<
  typeof spaceForArrivalTerminalSchema
>;

/**
 * DepartingSpace schema
 *
 * Contains departing space information.
 */
export const departingSpaceSchema = z.object({
  /** The date and time of the departure. */
  Departure: zDotnetDate().describe("The date and time of the departure."),
  /**
   * Indicates whether or not the departure is cancelled.
   */
  IsCancelled: z
    .boolean()
    .describe("Indicates whether or not the departure is cancelled."),
  /**
   * Unique identifier for the vessel that's planned to service this departure.
   */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  /**
   * The name of the vessel making this departure.
   */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  /**
   * The maximum space available on the vessel making this departure.
   */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  /**
   * The available space for one or more destinations.
   */
  SpaceForArrivalTerminals: z
    .array(spaceForArrivalTerminalSchema)
    .nullable()
    .describe("The available space for one or more destinations."),
});

export type DepartingSpace = z.infer<typeof departingSpaceSchema>;

/**
 * TerminalSailingSpace schema
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalSailingSpaceSchema = terminalBaseSchema.extend({
  /**
   * The most recent departures leaving this terminal.
   */
  DepartingSpaces: z
    .array(departingSpaceSchema)
    .nullable()
    .optional()
    .describe("The most recent departures leaving this terminal."),
  /**
   * True if this terminal isn't capable of collecting fares.
   */
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),
  /**
   * An optional message detailing how inability to collect fares could affect terminal conditions data.
   */
  NoFareCollectedMsg: z
    .string()
    .nullable()
    .describe(
      "An optional message detailing how inability to collect fares could affect terminal conditions data."
    ),
});

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;

/**
 * GetAllTerminalSailingSpace schema
 *
 * Returns all terminal sailing space information.
 */
export const getAllTerminalSailingSpaceSchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
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
