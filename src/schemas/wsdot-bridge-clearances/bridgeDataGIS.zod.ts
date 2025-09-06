import { z } from "zod";
import {
  zWsdotDate,
  zLatitude,
  zLongitude,
} from "@/shared/fetching/validation";

/**
 * BridgeDataGIS schema
 *
 * A record containing the location and clearance information of a bridge structure.
 */
export const bridgeDataGISSchema = z
  .object({
    /** Unique identifier for bridge. */
    CrossingLocationId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for bridge."),
    /** State structure identifier. */
    StateStructureId: z.string().describe("State structure identifier."),
    /** A 2-part identifier with up to 10 alphanumeric characters. */
    BridgeNumber: z
      .string()
      .describe("A 2-part identifier with up to 10 alphanumeric characters."),
    /** Description of the crossing. */
    CrossingDescription: z.string().describe("Description of the crossing."),
    /** State Route identifier. */
    StateRouteID: z.string().describe("State Route identifier."),
    /** State Route Mile Post. */
    SRMP: z.number().describe("State Route Mile Post."),
    /** Code representing the direction of the inventory. */
    InventoryDirection: z
      .enum(["I", "D", "B"])
      .describe("Code representing the direction of the inventory."),
    /** Indicator for milepost within a back mileage equation area. */
    SRMPAheadBackIndicator: z
      .string()
      .describe("Indicator for milepost within a back mileage equation area."),
    /** Date of the route. */
    RouteDate: zWsdotDate().describe("Date of the route."),
    /** Minimum vertical clearance in inches. */
    VerticalClearanceMinimumInches: z
      .number()
      .int()
      .positive()
      .describe("Minimum vertical clearance in inches."),
    /** Maximum vertical clearance in inches. */
    VerticalClearanceMaximumInches: z
      .number()
      .int()
      .positive()
      .describe("Maximum vertical clearance in inches."),
    /** Minimum vertical clearance in feet and inches. */
    VerticalClearanceMinimumFeetInch: z
      .string()
      .describe("Minimum vertical clearance in feet and inches."),
    /** Maximum vertical clearance in feet and inches. */
    VerticalClearanceMaximumFeetInch: z
      .string()
      .describe("Maximum vertical clearance in feet and inches."),
    /** Latitude of the bridge. */
    Latitude: zLatitude().describe("Latitude of the bridge."),
    /** Longitude of the bridge. */
    Longitude: zLongitude().describe("Longitude of the bridge."),
    /** Date record was last updated. */
    APILastUpdate: zWsdotDate().describe("Date record was last updated."),
    /** An identifier for the bridge. */
    ControlEntityGuid: z
      .string()
      .uuid()
      .describe("An identifier for the bridge."),
    /** An identifier for the bridge. */
    CrossingRecordGuid: z
      .string()
      .uuid()
      .describe("An identifier for the bridge."),
    /** An identifier for the bridge. */
    LocationGuid: z.string().uuid().describe("An identifier for the bridge."),
  })
  .describe(
    "A record containing the location and clearance information of a bridge structure."
  );

/** BridgeDataGIS type */
export type BridgeDataGIS = z.infer<typeof bridgeDataGISSchema>;
