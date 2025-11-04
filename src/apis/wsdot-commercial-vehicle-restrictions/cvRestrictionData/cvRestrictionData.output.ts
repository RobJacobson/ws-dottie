import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for CVRestrictionData - represents a Commercial Vehicle Restriction
 *
 * Represents a Commercial Vehicle Restriction.
 */
export const cVRestrictionDataSchema = z
  .object({
    BLMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for BL (Bridge Legal) classification, as pounds. E.g., '20000' for 20,000 lb per axle limit on Teanaway River bridge, '21500' for 21,500 lb limit on South Nemah River bridge, null when BL classification does not apply. Used for bridge legal weight compliance."
      ),
    BridgeName: z
      .string()
      .nullable()
      .describe(
        "Name of bridge associated with restriction, as a bridge name. E.g., 'Teanaway River' for bridge 10/142, 'Bear River' for bridge 101/16, 'Greenhead Slough' for bridge 101/18, empty string when restriction is not bridge-specific. Provides bridge identification for restriction lookup."
      ),
    BridgeNumber: z
      .string()
      .nullable()
      .describe(
        "WSDOT bridge identifier, as a bridge identifier. E.g., '10/142' for Teanaway River bridge, '101/16' for Bear River bridge, '101/18' for Greenhead Slough bridge, empty string when restriction is not bridge-specific. Used for bridge identification and cross-referencing with bridge clearance data."
      ),
    CL8MaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for CL-8 classification, as pounds. E.g., '20000' for 20,000 lb per axle limit, '18000' for 18,000 lb limit, null when CL-8 classification does not apply. Used for commercial vehicle class 8 weight compliance."
      ),
    DateEffective: zDotnetDate().describe(
      "Date when commercial vehicle restriction becomes effective, as a UTC datetime. E.g., '2011-10-18T07:00:00.000Z' for October 18, 2011, '2024-06-26T07:00:00.000Z' for June 26, 2024. Indicates when restriction enforcement begins."
    ),
    DateExpires: zDotnetDate().describe(
      "Date when commercial vehicle restriction expires, as a UTC datetime. E.g., '2075-12-31T08:00:00.000Z' for December 31, 2075 (long-term restriction), '2013-10-24T07:00:00.000Z' for October 24, 2013 (temporary restriction). Indicates when restriction is no longer in force."
    ),
    DatePosted: zDotnetDate().describe(
      "Date when commercial vehicle restriction was first posted, as a UTC datetime. E.g., '2011-10-19T05:12:00.000Z' for October 18, 2011 at 10:12 PM, '2014-08-27T05:43:00.000Z' for August 26, 2014 at 10:43 PM. Indicates when restriction information was published."
    ),
    EndRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "End location of restriction along roadway, as a roadway location object. E.g., SR 10 at milepost 0 for restriction end point, null when end location is not specified. Provides termination point for restriction zone along highway."
      ),
    IsDetourAvailable: z
      .boolean()
      .describe(
        "Indicator whether detour route is available around restriction, as a boolean. E.g., false for most restrictions like Teanaway River bridge, true when alternate route exists. Used for route planning when restriction must be avoided."
      ),
    IsExceptionsAllowed: z
      .boolean()
      .describe(
        "Indicator whether exceptions are permitted for restriction, as a boolean. E.g., false for most restrictions indicating strict enforcement, true when special permits or exceptions may be granted. Used for determining if restriction can be bypassed with authorization."
      ),
    IsPermanentRestriction: z
      .boolean()
      .describe(
        "Indicator whether restriction is permanent or temporary, as a boolean. E.g., false for temporary restrictions with expiration dates, true for permanent restrictions like railroad trestle height limits. Determines if restriction requires long-term route planning."
      ),
    IsWarning: z
      .boolean()
      .describe(
        "Indicator whether restriction is a warning rather than enforceable limit, as a boolean. E.g., false for enforceable restrictions, true when restriction serves as advisory warning. Used for distinguishing advisory versus mandatory restrictions."
      ),
    Latitude: z
      .number()
      .describe(
        "GPS latitude coordinate for restriction location, in decimal degrees. E.g., '47.15136148800159' for Teanaway River bridge near SR 10, '46.348343747148334' for Bear River bridge on US 101."
      ),
    LocationDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of restriction location, as a location description. E.g., 'SR 10, MP 89.33 both directions-20,000 lbs limitation' for Teanaway River, 'US 101 MP 18.65 BD - Legal axle weights only. Max GVW 105,500lbs' for Bear River, null when description is unavailable. Provides detailed location context for restriction."
      ),
    LocationName: z
      .string()
      .nullable()
      .describe(
        "Name of location where restriction applies, as a location name. E.g., '1.3 E Jct SR 970' for Teanaway River location, '5.2 N JCT SR 103' for Bear River location, 'Railroad Trestle - Thorp Area' for SR-10 height restriction, null when location name is unavailable. Provides landmark reference for restriction identification."
      ),
    Longitude: z
      .number()
      .describe(
        "GPS longitude coordinate for restriction location, in decimal degrees. E.g., '-120.80431521930812' for Teanaway River bridge, '-123.95870200417737' for Bear River bridge."
      ),
    MaximumGrossVehicleWeightInPounds: z
      .number()
      .nullable()
      .describe(
        "Maximum gross vehicle weight limit in pounds, as pounds. E.g., '105500' for 105,500 lb maximum GVW on Bear River bridge, null when GVW limit is not specified. Used for total vehicle weight compliance checking."
      ),
    RestrictionComment: z
      .string()
      .nullable()
      .describe(
        "Additional details and comments about restriction, as a human-readable description. E.g., 'BL =20,000 lbs, CL-8 =20,000 lbs, SA = 40,000 lbs.' for axle weight breakdown, 'CAUTION: Bridge height is 15'. If your height is over 14'10\" alternate route is advised.' for height warning, null when comments are unavailable. Provides detailed restriction information and compliance guidance."
      ),
    RestrictionHeightInInches: z
      .number()
      .nullable()
      .describe(
        "Maximum load height restriction in inches, as inches. E.g., null when height restriction is not specified, '180' for 15-foot height limit (180 inches). Used for height-restricted vehicle routing. Note: Height restrictions may be specified in comments rather than this field."
      ),
    RestrictionLengthInInches: z
      .number()
      .nullable()
      .describe(
        "Maximum load length restriction in inches, as inches. E.g., null when length restriction is not specified. Used for length-restricted vehicle routing."
      ),
    RestrictionType: z
      .number()
      .describe(
        "Type of commercial vehicle restriction, as a restriction type code. Valid values: 0 (BridgeRestriction), 1 (RoadRestriction). E.g., '0' indicates bridge-specific restriction like Teanaway River bridge, '1' indicates roadway restriction like SR-10 height restriction. Determines whether restriction applies to bridge structure or roadway segment."
      ),
    RestrictionWeightInPounds: z
      .number()
      .nullable()
      .describe(
        "Maximum load weight restriction in pounds, as pounds. E.g., '0' when weight restriction uses axle classifications instead, null when weight restriction is not specified. Used for weight-restricted vehicle routing."
      ),
    RestrictionWidthInInches: z
      .number()
      .nullable()
      .describe(
        "Maximum load width restriction in inches, as inches. E.g., null when width restriction is not specified. Used for width-restricted vehicle routing."
      ),
    SAMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for SA (Semi-Automatic) classification, as pounds. E.g., '40000' for 40,000 lb per axle limit, '38000' for 38,000 lb limit, '44500' for 44,500 lb limit, null when SA classification does not apply. Used for semi-automatic vehicle weight compliance."
      ),
    StartRoadwayLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Start location of restriction along roadway, as a roadway location object. E.g., SR 10 at milepost 89.33 for restriction start point, US 101 at milepost 18.65 for Bear River restriction. Provides origin point for restriction zone along highway."
      ),
    State: z
      .string()
      .nullable()
      .describe(
        "State where commercial vehicle restriction is located, as a state code. E.g., 'WA' for Washington state restrictions, null when state is not specified. Used for multi-state restriction filtering."
      ),
    StateRouteID: z
      .string()
      .nullable()
      .describe(
        "State route identifier where restriction applies, as a route identifier. E.g., '10' for SR-10, '101' for US-101. Used for route-specific restriction filtering and identification."
      ),
    TDMaxAxle: z
      .number()
      .nullable()
      .describe(
        "Maximum axle weight for TD (Tandem Drive) classification, as pounds. E.g., null when TD classification does not apply. Used for tandem drive vehicle weight compliance."
      ),
    VehicleType: z
      .string()
      .nullable()
      .describe(
        "Type of vehicle affected by restriction, as a vehicle type code. E.g., empty string when restriction applies to all commercial vehicles, null when vehicle type is not specified. Used for vehicle-specific restriction filtering."
      ),
  })
  .describe(
    "Represents commercial vehicle restriction information including weight limits by classification, height/width/length restrictions, location data, effective dates, and restriction type. E.g., Teanaway River bridge (10/142) on SR-10 with 20,000 lb BL and CL-8 axle limits effective October 2011 through December 2075. Used for commercial vehicle route planning, compliance checking, and restriction awareness. Covers bridge and roadway restrictions statewide."
  );

export type CVRestrictionData = z.infer<typeof cVRestrictionDataSchema>;

// Re-export shared types
export type { RoadwayLocation } from "@/apis/shared";
