import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for BridgeDataGIS - represents bridge clearance data
 */
export const bridgeDataGISSchema = z.object({
  APILastUpdate: zWsdotDate().describe("Date record was last updated."),
  BridgeNumber: z
    .string()
    .nullable()
    .describe(
      "A two-part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01)."
    ),
  ControlEntityGuid: z.string().describe("An identifier for bridge."),
  CrossingDescription: z
    .string()
    .nullable()
    .describe("The crossing description."),
  CrossingLocationId: z
    .number()
    .describe("A unique identifier for the crossing."),
  CrossingRecordGuid: z
    .string()
    .describe("An identifier for bridge crossing record."),
  InventoryDirection: z
    .string()
    .nullable()
    .describe(
      "A code that represents whether the transportation asset or project is located in the (I) Increasing Milepost Direction of Travel, (D) Decreasing Milepost Direction of Travel or, (B) Both Milepost Directions of Travel."
    ),
  Latitude: z
    .number()
    .describe(
      "Latitude is a north-south measurement of position on the Earth."
    ),
  LocationGuid: z.string().describe("An identifier for bridge location."),
  Longitude: z
    .number()
    .describe("Longitude is a west-east measurement of position on the Earth."),
  RouteDate: zWsdotDate().describe("The route date."),
  SRMP: z
    .number()
    .describe(
      "A logical number, assigned by a Linear Referencing Method, to a given point along a State Route."
    ),
  SRMPAheadBackIndicator: z
    .string()
    .nullable()
    .describe(
      "An indicator that denotes if the Milepost is within a back mileage equation area. A back mileage equation area occurs when a segment of a route is added at any point other than the end of an existing route, or when a realignment occurs."
    ),
  StateRouteID: z
    .string()
    .nullable()
    .describe(
      "The Number assigned to the State Route and enacted into law by the Washington State Legislature."
    ),
  StateStructureId: z
    .string()
    .nullable()
    .describe(
      "A unique permanent 8 digit code assigned by the WSDOT Bridge Office and does not change for the life of the bridge."
    ),
  VerticalClearanceMaximumFeetInch: z
    .string()
    .nullable()
    .describe("Maximum expected clearance of bridge as feet and inches."),
  VerticalClearanceMaximumInches: z
    .number()
    .describe("Maximum expected clearance of bridge in inches."),
  VerticalClearanceMinimumFeetInch: z
    .string()
    .nullable()
    .describe("Minimum expected clearance of bridge as feet and inches."),
  VerticalClearanceMinimumInches: z
    .number()
    .describe("Minimum expected clearance of bridge in inches."),
});

export type BridgeDataGIS = z.infer<typeof bridgeDataGISSchema>;

/**
 * Schema for BridgeDataGISList - the main response list
 */
export const bridgeDataGISListSchema = z.array(bridgeDataGISSchema);

export type BridgeDataGISList = z.infer<typeof bridgeDataGISListSchema>;
