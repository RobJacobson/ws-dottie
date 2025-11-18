import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

export const bridgeClearanceSchema = z
  .object({
    APILastUpdate: zDotnetDate().describe(
      "UTC datetime when the bridge clearance record was last updated."
    ),
    BridgeNumber: z
      .string()
      .nullable()
      .describe(
        "Two-part bridge identifier combining route and structure number. E.g., '519/101FTP' for route 519 bridge 101FTP, '5/629A' for I-5 bridge 629A."
      ),
    ControlEntityGuid: z
      .string()
      .describe("Unique bridge control entity identifier as a GUID."),
    CrossingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the bridge crossing location and type."
      ),
    CrossingLocationId: z
      .number()
      .describe("Numeric ID of the bridge crossing location."),
    CrossingRecordGuid: z
      .string()
      .describe("Unique identifier for the bridge crossing record as a GUID."),
    InventoryDirection: z
      .string()
      .nullable()
      .describe(
        "Code indicating milepost direction: I = Increasing, D = Decreasing, B = Both directions."
      ),
    Latitude: z
      .number()
      .describe("Bridge GPS latitude coordinate in decimal degrees."),
    LocationGuid: z
      .string()
      .describe("Unique identifier for the bridge location as a GUID."),
    Longitude: z
      .number()
      .describe("Bridge GPS longitude coordinate in decimal degrees."),
    RouteDate: zDotnetDate().describe(
      "UTC datetime when the route information was established or last updated."
    ),
    SRMP: z
      .number()
      .describe("State Route Milepost reference point in decimal format."),
    SRMPAheadBackIndicator: z
      .string()
      .nullable()
      .describe(
        "Code indicating milepost equation area: A = ahead mileage equation area."
      ),
    StateRouteID: z
      .string()
      .nullable()
      .describe(
        "State route identifier assigned by legislature. E.g., '00167' for SR-167, '005S119195' for I-5 southbound segment."
      ),
    StateStructureId: z
      .string()
      .nullable()
      .describe(
        "Permanent 8-digit bridge structure identifier assigned by WSDOT Bridge Office."
      ),
    VerticalClearanceMaximumFeetInch: z
      .string()
      .nullable()
      .describe(
        "Maximum vertical clearance height in feet and inches format. E.g., '14 ft 3 in'."
      ),
    VerticalClearanceMaximumInches: z
      .number()
      .describe("Maximum vertical clearance height in total inches."),
    VerticalClearanceMinimumFeetInch: z
      .string()
      .nullable()
      .describe(
        "Minimum vertical clearance height in feet and inches format. E.g., '14 ft 3 in'."
      ),
    VerticalClearanceMinimumInches: z
      .number()
      .describe("Minimum vertical clearance height in total inches."),
  })
  .describe(
    "Bridge clearance record with location coordinates, route associations, vertical clearance measurements, and structure identification."
  );

export type BridgeClearance = z.infer<typeof bridgeClearanceSchema>;
