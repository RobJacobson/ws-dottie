import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getCommercialVehicleRestrictions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson";

/**
 * Get commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of commercial vehicle restriction data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const restrictions = await getCommercialVehicleRestrictions({});
 * console.log(restrictions[0].BridgeName); // "Aurora Bridge"
 * ```
 */
export const getCommercialVehicleRestrictions = async (
  params: GetCommercialVehicleRestrictionsParams = {}
): Promise<CommercialVehicleRestriction[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getCommercialVehicleRestrictionsParamsSchema,
      output: commercialVehicleRestrictionArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getCommercialVehicleRestrictionsParamsSchema
// GetCommercialVehicleRestrictionsParams
// ============================================================================

export const getCommercialVehicleRestrictionsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for retrieving commercial vehicle restriction data. The API returns all active restrictions across Washington State highways, including bridge weight limits, railroad crossing warnings, seasonal restrictions, and tunnel height limits that affect commercial vehicle operations."
  );

export type GetCommercialVehicleRestrictionsParams = z.infer<
  typeof getCommercialVehicleRestrictionsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// commercialVehicleRestrictionSchema
// CommercialVehicleRestriction
// ============================================================================

export const commercialVehicleRestrictionRoadwayLocationSchema = z
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

export const commercialVehicleRestrictionSchema = z
  .object({
    BLMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for B-train (double trailer) configurations. BL stands for 'Big Load' and applies to 3 or 4 axle single unit vehicles or combinations with 6 axles or more. May be null if this restriction type does not apply to B-train vehicles or if the limit is not specified. Common values include 20,000 lbs for many bridges and 21,500 lbs for specific structures like Nooksack River bridge."
    ),

    BridgeName: z
      .string()
      .describe(
        "Name of the bridge or structure where the restriction applies. This field identifies the specific infrastructure element that has the commercial vehicle limitation. Examples include 'Swamp Creek' with 20,000 lb axle limits, 'Union Slough' bridge restrictions, 'Steamboat Slough' with 19,000 lb axle limits, and 'Aurora Bridge' weight restrictions."
      ),

    BridgeNumber: z
      .string()
      .describe(
        "Unique identifier assigned to the bridge by WSDOT. This number is used internally by the department for bridge management, maintenance scheduling, and record keeping. It serves as the primary key for bridge identification in WSDOT systems. Examples include '524/10' for SR 524 bridge, '529/15W' for Union Slough, and '530/124' for White Creek bridge."
      ),

    CL8MaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for CL8 (eight-axle combination) vehicles. CL8 stands for 'Class 8' and applies to 5 axle combinations (3 axle tractor with a 2 axle trailer). May be null if this restriction type does not apply to CL8 vehicles or if the limit is not specified. Common values include 20,000 lbs for many bridges and 21,500 lbs for specific structures like Nooksack River bridge."
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

    EndRoadwayLocation:
      commercialVehicleRestrictionRoadwayLocationSchema.describe(
        "Geographic endpoint of the restriction zone along the roadway. This object provides the ending location coordinates and descriptive information for the restriction area."
      ),

    IsDetourAvailable: z
      .boolean()
      .describe(
        "Indicates whether an official detour route is available for commercial vehicles to bypass the restriction. True means a detour is provided, False means vehicles must find their own alternative route or wait for the restriction to end. Official documentation: Indicates if a detour is available."
      ),

    IsExceptionsAllowed: z
      .boolean()
      .describe(
        "Indicates whether exceptions to the restriction are allowed under certain circumstances. True means exceptions may be granted (e.g., for emergency vehicles, local deliveries), False means the restriction is absolute with no exceptions."
      ),

    IsPermanentRestriction: z
      .boolean()
      .describe(
        "Indicates whether the restriction is permanent or temporary. True means the restriction is a permanent limitation that will not expire, False means the restriction is temporary and will end on the DateExpires. Official documentation: Indicates whether the restriction is permanent."
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
        "Detailed description of the restriction location providing context about where and why the restriction applies. Examples include 'SR 516 MP 5.19' for railroad crossings, 'SR 520, BD MP 1.63 - No over width loads' for bridge restrictions, 'SR 530, MP 28.78 WB & EB, 20,000 lb per axle weight limit' for weight restrictions, and 'SR 99 Tunnel, BD MP 31 to 34, No loads over 15'2\" high' for tunnel height limits."
      ),

    LocationName: z
      .string()
      .describe(
        "Human-readable name for the restriction location. This field provides a recognizable name that commercial vehicle operators can use to identify the restriction area. Examples include 'AT GRADE RAILROAD CROSSING' for railroad crossings, 'Evergreen Floating Bridge 520/8' for bridge restrictions, 'SR 99 Tunnel' for tunnel height limits, and '6.3 N Jct I-5' for relative location references."
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
        "Additional comments or notes about the commercial vehicle restriction. This field provides supplementary information that may not fit into other structured fields, such as special conditions, enforcement details, or historical context. Examples include '20,000 lbs per axle for BL & CL-8. 40,000 lbs per axle for SA' for weight specifications, 'Mobile homes restricted to 12 feet wide' for width limits, and detailed emergency contact information for railroad crossings."
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
        "Numeric code indicating the type of commercial vehicle restriction. This field categorizes the restriction for system processing and reporting purposes. Different restriction types may have different enforcement procedures and penalties. Values: 0 = BridgeRestriction (weight limits on specific bridges), 1 = RoadRestriction (general road restrictions like width limits, seasonal closures, or railroad crossing warnings)."
      ),

    RestrictionWeightInPounds: zNullableNumber().describe(
      "Maximum vehicle weight in pounds allowed under the restriction. May be null if the restriction does not specify a weight limit or if the limit is not applicable. This is typically the maximum weight for individual axles or axle groups."
    ),

    RestrictionWidthInInches: zNullableNumber().describe(
      "Maximum vehicle width in inches allowed under the restriction. May be null if the restriction does not specify a width limit or if the limit is not applicable. This measurement is the total width of the vehicle including any overhanging loads. Common values include 102 inches (8.5 feet) for general restrictions and 120 inches (10 feet) for specific seasonal limits."
    ),

    SAMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for single-axle configurations. SA stands for 'Single Axle' and applies to 2 axle vehicles with very large tires described in RCW 46.44.091(3). May be null if this restriction type does not apply to single-axle vehicles or if the limit is not specified. Common values include 40,000 lbs for many bridges and 43,000 lbs for specific structures with higher weight capacity."
    ),

    StartRoadwayLocation:
      commercialVehicleRestrictionRoadwayLocationSchema.describe(
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
        "Official Washington State route identifier where the restriction is located. Examples include '005' for I-5, '520' for SR 520, '529' for SR 529, '530' for SR 530, '99' for SR 99, and '516' for SR 516. This is the primary route designation used by WSDOT for traffic management and navigation."
      ),

    TDMaxAxle: zNullableNumber().describe(
      "Maximum axle weight limit in pounds for triple-axle configurations. May be null if this restriction type does not apply to triple-axle vehicles or if the limit is not specified."
    ),

    VehicleType: z
      .string()
      .describe(
        "Type of commercial vehicle that the restriction applies to. This field specifies which vehicle categories are subject to the restriction. Examples include empty string (applies to all commercial vehicles), 'NA' for not applicable, and specific vehicle type codes. Note: This field accepts free-form text values and does not have predefined enumeration values, so the content can vary widely."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete commercial vehicle restriction information for a specific location or bridge. This schema represents comprehensive restriction data from the WSDOT Commercial Vehicle Restrictions API, covering weight limits, height restrictions, width limitations, seasonal closures, and special conditions. Each restriction includes detailed location information, effective dates, and specific requirements that commercial vehicle operators must follow to ensure compliance and safety. The data includes bridge-specific limits (e.g., 'Swamp Creek' with 20,000 lb axle limits) and route-wide restrictions (e.g., mobile home width limits on SR 9). Axle configurations include CL8 (Class 8 - 5 axle combinations), BL (Big Load - 6+ axle combinations), SA (Single Axle - 2 axle vehicles with large tires), and TD (Triple Axle) vehicles."
  );

export const commercialVehicleRestrictionArraySchema = z
  .array(commercialVehicleRestrictionSchema)
  .describe(
    "Array of commercial vehicle restriction data for all active restrictions across Washington State highways. This collection includes 100+ restrictions covering bridge weight limits, railroad crossing warnings, seasonal closures, tunnel height restrictions, and special vehicle limitations. Examples include axle weight limits on bridges like 'Swamp Creek' (20,000 lbs), mobile home width restrictions on SR 9 (12' max), and SR 99 Tunnel height limits (15'2\" max). Axle configurations referenced include CL8 (Class 8 - 5 axle combinations), BL (Big Load - 6+ axle combinations), SA (Single Axle - 2 axle vehicles with large tires), and TD (Triple Axle) vehicles. The array provides comprehensive restriction information enabling commercial vehicle route planning, compliance monitoring, and transportation safety management."
  );

export type CommercialVehicleRestrictionRoadwayLocation = z.infer<
  typeof commercialVehicleRestrictionRoadwayLocationSchema
>;
export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useCommercialVehicleRestrictions
// ============================================================================

/**
 * Hook for getting commercial vehicle restrictions from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictions({});
 * console.log(restrictions?.[0]?.BridgeName); // "Aurora Bridge"
 * ```
 */
export const useCommercialVehicleRestrictions = (
  params: GetCommercialVehicleRestrictionsParams = {},
  options?: TanStackOptions<CommercialVehicleRestriction[]>
): UseQueryResult<CommercialVehicleRestriction[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictions",
      JSON.stringify(params),
    ],
    queryFn: () => getCommercialVehicleRestrictions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
