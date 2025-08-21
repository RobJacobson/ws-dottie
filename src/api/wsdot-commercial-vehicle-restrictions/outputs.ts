import { z } from "zod";

import {
  zNullableNumber,
  zNullableString,
  zWsdotDate,
  zLatitude,
  zLongitude,
} from "@/shared/validation";

/**
 * WSDOT Commercial Vehicle Restrictions API Response Schemas
 *
 * This file contains all response/output schemas for the Washington State Department
 * of Transportation Commercial Vehicle Restrictions API. These schemas validate and transform the
 * data returned by the API endpoints, ensuring type safety and consistent data structures.
 */

// ============================================================================
// ROADWAY LOCATION SCHEMA
// ============================================================================

export const roadwayLocationSchema = z
  .object({
    Description: zNullableString().describe(
      "Human-readable description of the roadway location where the restriction applies. May be null if no descriptive information is available. Examples include 'Northbound lanes', 'Bridge approach', or 'Tunnel entrance'."
    ),

    Direction: zNullableString().describe(
      "Direction of travel indicator for the roadway location. May be null if direction information is not applicable or not available. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', or 'Both Directions'."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the roadway location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the restriction location. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the roadway location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the restriction location. Essential for GPS navigation and geographic information systems."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway or road where the restriction is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the restriction is located. Examples include 'I-5', 'SR 520', 'US-2'. This field helps users identify which roadway the restriction applies to."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a roadway location where commercial vehicle restrictions apply. Contains coordinates, road information, and descriptive details that help identify and locate the specific restriction point."
  );

// ============================================================================
// COMMERCIAL VEHICLE RESTRICTION SCHEMA
// ============================================================================

export const commercialVehicleRestrictionSchema = z
  .object({
    BLMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for B-train (double trailer) configurations. May be null if this restriction type does not apply to B-train vehicles or if the limit is not specified."
    ),

    BridgeName: z
      .string()
      .describe(
        "Name of the bridge or structure where the restriction applies. This field identifies the specific infrastructure element that has the commercial vehicle limitation. Examples include 'Aurora Bridge', 'Tacoma Narrows Bridge', or 'Floating Bridge'."
      ),

    BridgeNumber: z
      .string()
      .describe(
        "Unique identifier assigned to the bridge by WSDOT. This number is used internally by the department for bridge management, maintenance scheduling, and record keeping. It serves as the primary key for bridge identification in WSDOT systems."
      ),

    CL8MaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for CL8 (eight-axle combination) vehicles. May be null if this restriction type does not apply to CL8 vehicles or if the limit is not specified."
    ),

    DateEffective: zWsdotDate().describe(
      "Date when the commercial vehicle restriction becomes effective and enforceable. This timestamp indicates when the restriction officially begins and when enforcement actions can be taken. All times are in Pacific Time Zone."
    ),

    DateExpires: zWsdotDate().describe(
      "Date when the commercial vehicle restriction expires and is no longer enforceable. This timestamp indicates when the restriction officially ends. Permanent restrictions may have a far-future expiration date. All times are in Pacific Time Zone."
    ),

    DatePosted: zWsdotDate().describe(
      "Date when the commercial vehicle restriction was posted or published in the WSDOT system. This timestamp indicates when the restriction information was made available to the public and commercial vehicle operators. All times are in Pacific Time Zone."
    ),

    EndRoadwayLocation: roadwayLocationSchema.describe(
      "Geographic endpoint of the restriction zone along the roadway. This object provides the ending location coordinates and descriptive information for the restriction area."
    ),

    IsDetourAvailable: z
      .boolean()
      .describe(
        "Indicates whether an official detour route is available for commercial vehicles to bypass the restriction. True means a detour is provided, False means vehicles must find their own alternative route or wait for the restriction to end."
      ),

    IsExceptionsAllowed: z
      .boolean()
      .describe(
        "Indicates whether exceptions to the restriction are allowed under certain circumstances. True means exceptions may be granted (e.g., for emergency vehicles, local deliveries), False means the restriction is absolute with no exceptions."
      ),

    IsPermanentRestriction: z
      .boolean()
      .describe(
        "Indicates whether the restriction is permanent or temporary. True means the restriction is a permanent limitation that will not expire, False means the restriction is temporary and will end on the DateExpires."
      ),

    IsWarning: z
      .boolean()
      .describe(
        "Indicates whether this is a warning advisory rather than an enforceable restriction. True means it's a warning that commercial vehicles should exercise caution, False means it's an enforceable restriction with potential penalties for violations."
      ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the restriction location in decimal degrees using WGS84 coordinate system. This represents the primary location point for the commercial vehicle restriction. Used for mapping applications and geographic positioning."
    ),

    LocationDescription: z
      .string()
      .describe(
        "Detailed description of the restriction location providing context about where and why the restriction applies. Examples include 'Bridge weight limit due to structural concerns', 'Tunnel height restriction for oversized vehicles', or 'Seasonal weight limit for road preservation'."
      ),

    LocationName: z
      .string()
      .describe(
        "Human-readable name for the restriction location. This field provides a recognizable name that commercial vehicle operators can use to identify the restriction area. Examples include 'Downtown Seattle Bridge', 'Mountain Pass Tunnel', or 'Rural Highway Section'."
      ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the restriction location in decimal degrees using WGS84 coordinate system. This represents the primary location point for the commercial vehicle restriction. Used for mapping applications and geographic positioning."
    ),

    MaximumGrossVehicleWeightInPounds: zNullableNumber().describe(
      "Maximum total vehicle weight in pounds allowed under the restriction. May be null if the restriction does not specify a gross weight limit or if the limit is not applicable. This is the total weight of the vehicle including cargo."
    ),

    RestrictionComment: z
      .string()
      .describe(
        "Additional comments or notes about the commercial vehicle restriction. This field provides supplementary information that may not fit into other structured fields, such as special conditions, enforcement details, or historical context."
      ),

    RestrictionHeightInInches: zNullableNumber().describe(
      "Maximum vehicle height in inches allowed under the restriction. May be null if the restriction does not specify a height limit or if the limit is not applicable. This measurement is from the ground to the highest point of the vehicle."
    ),

    RestrictionLengthInInches: zNullableNumber().describe(
      "Maximum vehicle length in inches allowed under the restriction. May be null if the restriction does not specify a length limit or if the limit is not applicable. This measurement is the total length of the vehicle including any trailers."
    ),

    RestrictionType: z
      .number()
      .describe(
        "Numeric code indicating the type of commercial vehicle restriction. This field categorizes the restriction for system processing and reporting purposes. Different restriction types may have different enforcement procedures and penalties."
      ),

    RestrictionWeightInPounds: zNullableNumber().describe(
      "Maximum vehicle weight in pounds allowed under the restriction. May be null if the restriction does not specify a weight limit or if the limit is not applicable. This is typically the maximum weight for individual axles or axle groups."
    ),

    RestrictionWidthInInches: zNullableNumber().describe(
      "Maximum vehicle width in inches allowed under the restriction. May be null if the restriction does not specify a width limit or if the limit is not applicable. This measurement is the total width of the vehicle including any overhanging loads."
    ),

    SAMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for single-axle configurations. May be null if this restriction type does not apply to single-axle vehicles or if the limit is not specified."
    ),

    StartRoadwayLocation: roadwayLocationSchema.describe(
      "Geographic starting point of the restriction zone along the roadway. This object provides the beginning location coordinates and descriptive information for the restriction area."
    ),

    State: z
      .string()
      .describe(
        "State where the commercial vehicle restriction is located. This field identifies the jurisdiction responsible for enforcing the restriction. Currently, all restrictions in this API are in Washington State."
      ),

    StateRouteID: z
      .string()
      .describe(
        "Official Washington State route identifier where the restriction is located. Examples include '005' for I-5, '520' for SR 520, '002' for US-2. This is the primary route designation used by WSDOT for traffic management and navigation."
      ),

    TDMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for triple-axle configurations. May be null if this restriction type does not apply to triple-axle vehicles or if the limit is not specified."
    ),

    VehicleType: z
      .string()
      .describe(
        "Type of commercial vehicle that the restriction applies to. This field specifies which vehicle categories are subject to the restriction. Examples include 'All Commercial Vehicles', 'Trucks Only', 'Oversized Loads', or 'Hazmat Vehicles'."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete commercial vehicle restriction information including location, weight limits, bridge restrictions, and other limitations. This schema represents comprehensive restriction data from the WSDOT Commercial Vehicle Restrictions API, providing essential information for commercial vehicle route planning, compliance monitoring, and transportation safety. The restriction details are critical for preventing bridge strikes, ensuring road safety, and maintaining infrastructure integrity."
  );

// ============================================================================
// COMMERCIAL VEHICLE RESTRICTION WITH ID SCHEMA
// ============================================================================

export const commercialVehicleRestrictionWithIdSchema = commercialVehicleRestrictionSchema
  .extend({
    UniqueID: z
      .string()
      .describe(
        "Unique identifier assigned to this commercial vehicle restriction by the WSDOT system. This ID serves as a permanent, unique reference for the restriction across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Commercial vehicle restriction information including all standard restriction details plus a unique identifier. This extended schema provides the same comprehensive restriction data as the base schema but includes a UniqueID field for system integration and data management purposes."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const commercialVehicleRestrictionArraySchema = z
  .array(commercialVehicleRestrictionSchema)
  .describe(
    "Array of commercial vehicle restriction data for all restrictions across Washington State highways. This collection provides comprehensive restriction information that enables commercial vehicle route planning, compliance monitoring, and transportation safety management."
  );

export const commercialVehicleRestrictionWithIdArraySchema = z
  .array(commercialVehicleRestrictionWithIdSchema)
  .describe(
    "Array of commercial vehicle restriction data with unique identifiers for all restrictions across Washington State highways. This collection provides comprehensive restriction information including unique IDs for system integration and data management purposes."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
export type CommercialVehicleRestriction = z.infer<typeof commercialVehicleRestrictionSchema>;
export type CommercialVehicleRestrictionWithId = z.infer<typeof commercialVehicleRestrictionWithIdSchema>;
