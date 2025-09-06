import { z } from "zod";

/**
 * Space for arrival terminal schema for WSF Terminals API
 *
 * Represents the available space for one or more destinations on a vessel departure.
 */
export const spaceForArrivalTerminalSchema = z.object({
  /** Unique identifier for the next closest arrival terminal. */
  TerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the next closest arrival terminal."),

  /** The name of the arrival terminal. */
  TerminalName: z.string().describe("The name of the arrival terminal."),

  /** Unique identifier for the vessel making this departure. */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),

  /** The name of the vessel making this departure. */
  VesselName: z
    .string()
    .describe("The name of the vessel making this departure."),

  /** Indicates whether or not reservable space should be displayed. */
  DisplayReservableSpace: z
    .boolean()
    .describe("Indicates whether or not reservable space should be displayed."),

  /** The remaining reservable space available on the vessel. */
  ReservableSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining reservable space available on the vessel."),

  /** A Hex color representing the ReservableSpaceCount. */
  ReservableSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing the ReservableSpaceCount."),

  /** Indicates whether or not drive-up space should be displayed. */
  DisplayDriveUpSpace: z
    .boolean()
    .describe("Indicates whether or not drive-up space should be displayed."),

  /** The remaining drive-up space available on the vessel. */
  DriveUpSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining drive-up space available on the vessel."),

  /** A Hex color representing DriveUpSpaceCount. */
  DriveUpSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing DriveUpSpaceCount."),

  /** The maximum space available on the vessel making this departure. */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),

  /** An array of integers representing all arrival terminals associated with this set of counts. */
  ArrivalTerminalIDs: z
    .array(z.number().int())
    .describe(
      "An array of integers representing all arrival terminals associated with this set of counts."
    ),
});

export type SpaceForArrivalTerminal = z.infer<
  typeof spaceForArrivalTerminalSchema
>;
