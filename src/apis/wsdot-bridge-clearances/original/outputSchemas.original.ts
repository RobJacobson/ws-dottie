import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for BridgeDataGIS - represents bridge clearance data
 *
 * A record containing the location and clearance information of a bridge structure.
 */
export const bridgeDataGISSchema = z
  .object({
    /** Date record was last updated. */
    APILastUpdate: zWsdotDate().describe("Date record was last updated."),
    /**
     * A two-part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01).
     */
    BridgeNumber: z
      .string()
      .nullable()
      .describe(
        "A two-part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01)."
      ),
    /** An identifier for bridge. */
    ControlEntityGuid: z.string().describe("An identifier for bridge."),
    /** The crossing description. */
    CrossingDescription: z
      .string()
      .nullable()
      .describe("The crossing description."),
    /** A unique identifier for the crossing. */
    CrossingLocationId: z
      .number()
      .describe("A unique identifier for the crossing."),
    /** An identifier for bridge crossing record. */
    CrossingRecordGuid: z
      .string()
      .describe("An identifier for bridge crossing record."),
    /**
     * A code that represents whether the transportation asset or project is located in the (I) Increasing Milepost Direction of Travel, (D) Decreasing Milepost Direction of Travel or, (B) Both Milepost Directions of Travel.
     */
    InventoryDirection: z
      .string()
      .nullable()
      .describe(
        "A code that represents whether the transportation asset or project is located in the (I) Increasing Milepost Direction of Travel, (D) Decreasing Milepost Direction of Travel or, (B) Both Milepost Directions of Travel."
      ),
    /** Latitude is a north-south measurement of position on the Earth. */
    Latitude: z
      .number()
      .describe(
        "Latitude is a north-south measurement of position on the Earth."
      ),
    /** An identifier for bridge location. */
    LocationGuid: z.string().describe("An identifier for bridge location."),
    /** Longitude is a west-east measurement of position on the Earth. */
    Longitude: z
      .number()
      .describe(
        "Longitude is a west-east measurement of position on the Earth."
      ),
    /** The route date. */
    RouteDate: zWsdotDate().describe("The route date."),
    /**
     * A logical number, assigned by a Linear Referencing Method, to a given point along a State Route.
     */
    SRMP: z
      .number()
      .describe(
        "A logical number, assigned by a Linear Referencing Method, to a given point along a State Route."
      ),
    /**
     * An indicator that denotes if the Milepost is within a back mileage equation area. A back mileage equation area occurs when a segment of a route is added at any point other than the end of an existing route, or when a realignment occurs.
     */
    SRMPAheadBackIndicator: z
      .string()
      .nullable()
      .describe(
        "An indicator that denotes if the Milepost is within a back mileage equation area. A back mileage equation area occurs when a segment of a route is added at any point other than the end of an existing route, or when a realignment occurs."
      ),
    /**
     * The Number assigned to the State Route and enacted into law by the Washington State Legislature.
     */
    StateRouteID: z
      .string()
      .nullable()
      .describe(
        "The Number assigned to the State Route and enacted into law by the Washington State Legislature."
      ),
    /**
     * A unique permanent 8 digit code assigned by the WSDOT Bridge Office and does not change for the life of the bridge.
     */
    StateStructureId: z
      .string()
      .nullable()
      .describe(
        "A unique permanent 8 digit code assigned by the WSDOT Bridge Office and does not change for the life of the bridge."
      ),
    /** Maximum expected clearance of bridge as feet and inches. */
    VerticalClearanceMaximumFeetInch: z
      .string()
      .nullable()
      .describe("Maximum expected clearance of bridge as feet and inches."),
    /** Maximum expected clearance of bridge in inches. */
    VerticalClearanceMaximumInches: z
      .number()
      .describe("Maximum expected clearance of bridge in inches."),
    /** Minimum expected clearance of bridge as feet and inches. */
    VerticalClearanceMinimumFeetInch: z
      .string()
      .nullable()
      .describe("Minimum expected clearance of bridge as feet and inches."),
    /** Minimum expected clearance of bridge in inches. */
    VerticalClearanceMinimumInches: z
      .number()
      .describe("Minimum expected clearance of bridge in inches."),
  })
  .describe(
    "A record containing the location and clearance information of a bridge structure."
  );

export type BridgeDataGIS = z.infer<typeof bridgeDataGISSchema>;

/**
 * Schema for BridgeDataGISList - the main response list
 *
 * Bridge clearance information, see disclaimer
 */
export const bridgeDataGISListSchema = z
  .array(bridgeDataGISSchema)
  .describe("Bridge clearance information, see disclaimer");

export type BridgeDataGISList = z.infer<typeof bridgeDataGISListSchema>;
