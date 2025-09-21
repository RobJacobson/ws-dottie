import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * BridgeClearance schema
 *
 * A record containing the location and clearance information of a bridge structure.
 */
export const bridgeClearanceSchema = z
  .object({
    /** Date record was last updated. */
    APILastUpdate: zWsdotDate().describe("Date record was last updated."),
    /** A 2-part identifier with up to 10 alphanumeric characters. */
    BridgeNumber: z
      .string()
      .nullable()
      .describe("A 2-part identifier with up to 10 alphanumeric characters."),
    /** An identifier for the bridge. */
    ControlEntityGuid: z
      .string()
      .uuid()
      .describe("An identifier for the bridge."),
    /** Description of the crossing. */
    CrossingDescription: z
      .string()
      .nullable()
      .describe("Description of the crossing."),
    /** Unique identifier for bridge. */
    CrossingLocationId: z
      .number()
      .int()
      .describe("Unique identifier for bridge."),
    /** An identifier for the bridge. */
    CrossingRecordGuid: z
      .string()
      .uuid()
      .describe("An identifier for the bridge."),
    /** Code representing the direction of the inventory. */
    InventoryDirection: z
      .enum(["I", "D", "B", "i", "d", "b"])
      .nullable()
      .describe("Code representing the direction of the inventory."),
    /** Latitude of the bridge. */
    Latitude: z.number().describe("Latitude of the bridge."),
    /** An identifier for the bridge. */
    LocationGuid: z.string().uuid().describe("An identifier for the bridge."),
    /** Longitude of the bridge. */
    Longitude: z.number().describe("Longitude of the bridge."),
    /** Date of the route. */
    RouteDate: zWsdotDate().describe("Date of the route."),
    /** State Route Mile Post. */
    SRMP: z.number().describe("State Route Mile Post."),
    /** Indicator for milepost within a back mileage equation area. */
    SRMPAheadBackIndicator: z
      .string()
      .nullable()
      .describe("Indicator for milepost within a back mileage equation area."),
    /** State Route identifier. */
    StateRouteID: z.string().nullable().describe("State Route identifier."),
    /** State structure identifier. */
    StateStructureId: z
      .string()
      .nullable()
      .describe("State structure identifier."),
    /** Maximum vertical clearance in feet and inches. */
    VerticalClearanceMaximumFeetInch: z
      .string()
      .nullable()
      .describe("Maximum vertical clearance in feet and inches."),
    /** Maximum vertical clearance in inches. */
    VerticalClearanceMaximumInches: z
      .number()
      .int()
      .describe("Maximum vertical clearance in inches."),
    /** Minimum vertical clearance in feet and inches. */
    VerticalClearanceMinimumFeetInch: z
      .string()
      .nullable()
      .describe("Minimum vertical clearance in feet and inches."),
    /** Minimum vertical clearance in inches. */
    VerticalClearanceMinimumInches: z
      .number()
      .int()
      .describe("Minimum vertical clearance in inches."),
  })
  .describe(
    "A record containing the location and clearance information of a bridge structure."
  );

/** BridgeClearance type */
export type BridgeClearance = z.infer<typeof bridgeClearanceSchema>;

/**
 * Array of bridge clearances.
 */
export const bridgeClearancesSchema = z
  .array(bridgeClearanceSchema)
  .describe("Bridge clearance information, see disclaimer.");

export type BridgeClearances = z.infer<typeof bridgeClearancesSchema>;
