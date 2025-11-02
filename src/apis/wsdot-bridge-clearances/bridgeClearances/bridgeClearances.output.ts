import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for BridgeDataGIS - represents bridge clearance data
 *
 * A record containing the location and clearance information of a bridge structure.
 */
export const bridgeDataGISSchema = z
  .object({
    APILastUpdate: zDotnetDate().describe(
      "Timestamp when bridge clearance record was last updated, as a UTC datetime. E.g., '2025-10-31T17:30:02.390Z' for update on October 31, 2025 at 10:30 AM. Indicates data freshness and when clearance information was last modified."
    ),
    BridgeNumber: z
      .string()
      .nullable()
      .describe(
        "Two-part bridge identifier combining route and structure number, as a bridge identifier. E.g., '519/101FTP' for route 519 bridge 101FTP, '5/629A' for I-5 bridge 629A, '520/36E-E' for SR-520 bridge 36E-E, null when bridge number is unavailable. First part indicates associated state route, second part is unique bridge identifier."
      ),
    ControlEntityGuid: z
      .string()
      .describe(
        "Unique bridge control entity identifier, as a GUID. E.g., 'e589eb93-c01b-4498-8243-89f48bf5c43d' for bridge 519/101FTP, '88ba5341-b39c-43c9-95a5-bc9584b2d798' for bridge 5/629A. Used for bridge management and tracking systems."
      ),
    CrossingDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of bridge crossing, as a crossing description. E.g., 'SEATTLE SLIP 1 PASS. OHL' for overhead line crossing, 'W FRANKLIN ST UNDER US 101' for street underpass, 'I-5 S-S RAMP UNDER BROADWAY' for ramp crossing, null when description is unavailable. Provides context for bridge location and crossing type."
      ),
    CrossingLocationId: z
      .number()
      .describe(
        "Unique identifier for bridge crossing location, as an integer ID. E.g., '9603' for Seattle Slip 1 crossing, '6192' for I-5 Broadway crossing, '9606' for Franklin Street crossing. Used for crossing identification and location tracking."
      ),
    CrossingRecordGuid: z
      .string()
      .describe(
        "Unique identifier for bridge crossing record, as a GUID. E.g., '3d78286b-a191-4978-9382-9f914341d6b0' for crossing 9603, '9b764b55-9fc1-4448-8b0b-3f35b83d6f5f' for crossing 6192. Used for crossing record management and data integrity."
      ),
    InventoryDirection: z
      .string()
      .nullable()
      .describe(
        "Milepost direction indicator for bridge location, as a direction code. E.g., 'I' for Increasing milepost direction, 'D' for Decreasing milepost direction, 'B' for Both directions, null when direction is not applicable. Indicates which direction of travel the bridge clearance applies to."
      ),
    Latitude: z
      .number()
      .describe(
        "Bridge GPS latitude coordinate, in decimal degrees. E.g., '47.602165' for Seattle area bridge, '47.961343' for Everett area bridge, '46.414795' for southern Washington bridge."
      ),
    LocationGuid: z
      .string()
      .describe(
        "Unique identifier for bridge location, as a GUID. E.g., 'dcf13720-32a4-40e3-b824-663775ab2bbc' for Seattle location, 'dad9f2c9-ae79-4efb-8f3e-587e402e0f80' for Everett location. Used for location tracking and geographic referencing."
      ),
    Longitude: z
      .number()
      .describe(
        "Bridge GPS longitude coordinate, in decimal degrees. E.g., '-122.339587' for Seattle area bridge, '-122.200516' for Everett area bridge, '-122.890212' for southern Washington bridge."
      ),
    RouteDate: zDotnetDate().describe(
      "Date when route information was established or last updated, as a UTC datetime. E.g., '2017-01-01T08:00:00.000Z' for route date December 31, 2016, '2019-01-01T08:00:00.000Z' for route date December 31, 2018. Indicates when route association was established or modified."
    ),
    SRMP: z
      .number()
      .describe(
        "State Route Milepost reference point, as a decimal. E.g., '0' for route terminus or non-standard location, '21.59' for milepost 21.59 on SR-167. Linear referencing method value indicating position along state route."
      ),
    SRMPAheadBackIndicator: z
      .string()
      .nullable()
      .describe(
        "Milepost equation area indicator, as an indicator code. E.g., 'A' for ahead mileage equation area, null when not in equation area. Indicates if bridge is in back mileage equation area where route segments were added or realigned."
      ),
    StateRouteID: z
      .string()
      .nullable()
      .describe(
        "State route identifier assigned by legislature, as a route identifier. E.g., '00167' for SR-167, '005S119195' for I-5 southbound segment, '000GEOMETRY' for non-standard geometry route, null when route ID is not applicable. Official route designation for bridge association."
      ),
    StateStructureId: z
      .string()
      .nullable()
      .describe(
        "Permanent bridge structure identifier assigned by WSDOT Bridge Office, as a structure code. E.g., '0014407A' for bridge 519/101FTP, '0003842B' for bridge 5/629A, '0019670A' for bridge 520/36E-E, null when structure ID is unavailable. Permanent 8-digit code that does not change for bridge lifetime."
      ),
    VerticalClearanceMaximumFeetInch: z
      .string()
      .nullable()
      .describe(
        "Maximum vertical clearance height in feet and inches. E.g., '14 ft 3 in' for 14 feet 3 inches clearance, '28 ft 6 in' for 28 feet 6 inches clearance, '19 ft 9 in' for 19 feet 9 inches clearance, null when maximum clearance is unavailable. Human-readable format for display purposes."
      ),
    VerticalClearanceMaximumInches: z
      .number()
      .describe(
        "Maximum vertical clearance height in total inches, as inches. E.g., '171' for 14 feet 3 inches (171 inches), '342' for 28 feet 6 inches (342 inches), '237' for 19 feet 9 inches (237 inches). Used for clearance calculations and height-restricted vehicle routing."
      ),
    VerticalClearanceMinimumFeetInch: z
      .string()
      .nullable()
      .describe(
        "Minimum vertical clearance height in feet and inches. E.g., '14 ft 3 in' for 14 feet 3 inches clearance, '27 ft 11 in' for 27 feet 11 inches clearance, '16 ft 8 in' for 16 feet 8 inches clearance, null when minimum clearance is unavailable. Human-readable format indicating lowest clearance point."
      ),
    VerticalClearanceMinimumInches: z
      .number()
      .describe(
        "Minimum vertical clearance height in total inches, as inches. E.g., '171' for 14 feet 3 inches (171 inches), '335' for 27 feet 11 inches (335 inches), '200' for 16 feet 8 inches (200 inches). Used for clearance calculations and determining safe passage for height-restricted vehicles."
      ),
  })
  .describe(
    "Represents bridge clearance information including location coordinates, route associations, vertical clearance measurements, and structure identification. E.g., bridge 519/101FTP at location 47.602165, -122.339587 with clearance 14 ft 3 in (171 inches) on route 519. Used for route planning, height-restricted vehicle navigation, and bridge inventory management. Data updated periodically as bridge measurements change."
  );

export type BridgeDataGIS = z.infer<typeof bridgeDataGISSchema>;
