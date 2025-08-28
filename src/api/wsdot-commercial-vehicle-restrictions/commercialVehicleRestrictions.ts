/**
 * WSDOT Commercial Vehicle Restrictions API
 *
 * Provides access to Washington State Department of Transportation commercial vehicle restriction data
 * including weight limits, height restrictions, bridge restrictions, and route limitations for commercial
 * vehicles. This API is essential for commercial vehicle operators to plan routes that comply with
 * WSDOT restrictions and avoid violations.
 *
 * The API returns comprehensive restriction data including location information, effective dates,
 * restriction types, and specific limits for weight, height, length, and width. This data is critical
 * for commercial vehicle route planning to ensure compliance with state regulations and prevent
 * damage to infrastructure.
 *
 * API Functions:
 * - getCommercialVehicleRestrictions: Returns an array of CommercialVehicleRestriction objects for all current restrictions
 * - getCommercialVehicleRestrictionsWithId: Returns an array of CommercialVehicleRestrictionWithId objects with unique identifiers
 *
 * Input/Output Overview:
 * - getCommercialVehicleRestrictions: Input: {} (no parameters), Output: CommercialVehicleRestriction[]
 * - getCommercialVehicleRestrictionsWithId: Input: {} (no parameters), Output: CommercialVehicleRestrictionWithId[]
 *
 * Base Types:
 *
 * interface CommercialVehicleRestriction {
 *   BLMaxAxle: number | null;
 *   BridgeName: string;
 *   BridgeNumber: string;
 *   CL8MaxAxle: number | null;
 *   DateEffective: Date;
 *   DateExpires: Date;
 *   DatePosted: Date;
 *   EndRoadwayLocation: CommercialVehicleRestrictionRoadwayLocation;
 *   IsDetourAvailable: boolean;
 *   IsExceptionsAllowed: boolean;
 *   IsPermanentRestriction: boolean;
 *   IsWarning: boolean;
 *   LocationDescription: string;
 *   LocationName: string;
 *   RestrictionComment: string;
 *   RestrictionType: number;
 *   State: string;
 *   StateRouteID: string;
 *   VehicleType: string;
 * }
 *
 * interface CommercialVehicleRestrictionWithId extends CommercialVehicleRestriction {
 *   UniqueID: string;
 * }
 *
 * interface CommercialVehicleRestrictionRoadwayLocation {
 *   Description: string | null;
 *   Direction: string | null;
 *   Latitude: number;
 *   Longitude: number;
 *   MilePost: number;
 *   RoadName: string;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "BLMaxAxle": 80000,
 *     "BridgeName": "I-5 Bridge over Columbia River",
 *     "BridgeNumber": "005-123",
 *     "CL8MaxAxle": 34000,
 *     "DateEffective": "/Date(1756176829000-0700)/",
 *     "DateExpires": "/Date(1756851229000-0700)/",
 *     "DatePosted": "/Date(1756091229000-0700)/",
 *     "EndRoadwayLocation": {
 *       "Description": "North end of bridge",
 *       "Direction": "Northbound",
 *       "Latitude": 45.6123,
 *       "Longitude": -122.6789,
 *       "MilePost": 307.5,
 *       "RoadName": "I-5"
 *     },
 *     "IsDetourAvailable": true,
 *     "IsExceptionsAllowed": false,
 *     "IsPermanentRestriction": false,
 *     "IsWarning": false,
 *     "LocationDescription": "Bridge over Columbia River",
 *     "LocationName": "Columbia River Bridge",
 *     "RestrictionComment": "Weight restriction due to bridge maintenance",
 *     "RestrictionType": 1,
 *     "State": "WA",
 *     "StateRouteID": "005",
 *     "VehicleType": "All Commercial Vehicles"
 *   }
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. Both endpoints return all current commercial
 * vehicle restrictions without requiring specific parameters. The API provides comprehensive data
 * for route planning and compliance checking.
 */

import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson";

const ENDPOINT_WITH_ID =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson";

/**
 * Retrieves all current commercial vehicle restrictions with unique identifiers.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<CommercialVehicleRestrictionWithId[]> - Array of commercial vehicle restrictions with unique IDs
 *
 * @example
 * const restrictions = await getCommercialVehicleRestrictionsWithId();
 * console.log(restrictions.length);  // 45
 * console.log(restrictions[0].BridgeName);  // "I-5 Bridge over Columbia River"
 * console.log(restrictions[0].RestrictionType);  // 1
 * console.log(restrictions[0].IsDetourAvailable);  // true
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getCommercialVehicleRestrictionsWithId = async (
  params: GetCommercialVehicleRestrictionsWithIdParams = {}
): Promise<CommercialVehicleRestrictionsWithId> => {
  return zodFetch(
    ENDPOINT_WITH_ID,
    {
      input: getCommercialVehicleRestrictionsWithIdParamsSchema,
      output: commercialVehicleRestrictionWithIdArraySchema,
    },
    params
  );
};

/**
 * Retrieves all current commercial vehicle restrictions.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<CommercialVehicleRestriction[]> - Array of commercial vehicle restrictions
 *
 * @example
 * const restrictions = await getCommercialVehicleRestrictions();
 * console.log(restrictions.length);  // 45
 * console.log(restrictions[0].BridgeName);  // "I-5 Bridge over Columbia River"
 * console.log(restrictions[0].RestrictionType);  // 1
 * console.log(restrictions[0].IsDetourAvailable);  // true
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getCommercialVehicleRestrictions = async (
  params: GetCommercialVehicleRestrictionsParams = {}
): Promise<CommercialVehicleRestrictions> => {
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
// Input Schemas & Types
// ============================================================================

/**
 * Parameters for retrieving commercial vehicle restrictions with unique identifiers (no parameters required)
 */
export const getCommercialVehicleRestrictionsWithIdParamsSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdParamsSchema
>;

/**
 * Parameters for retrieving commercial vehicle restrictions (no parameters required)
 */
export const getCommercialVehicleRestrictionsParamsSchema = z.object({});

export type GetCommercialVehicleRestrictionsParams = z.infer<
  typeof getCommercialVehicleRestrictionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

/**
 * Roadway location schema for commercial vehicle restrictions - includes GPS coordinates and milepost information
 */
export const commercialVehicleRestrictionRoadwayLocationSchema = z.object({
  Description: zNullableString(),

  Direction: zNullableString(),

  Latitude: zLatitude(),

  Longitude: zLongitude(),

  MilePost: z.number(),

  RoadName: z.string(),
});

/**
 * Commercial vehicle restriction schema - includes weight limits, bridge information, and location details
 */
export const commercialVehicleRestrictionSchema = z.object({
  BLMaxAxle: zNullableNumber(),

  BridgeName: z.string(),

  BridgeNumber: z.string(),

  CL8MaxAxle: zNullableNumber(),

  DateEffective: zWsdotDate(),

  DateExpires: zWsdotDate(),

  DatePosted: zWsdotDate(),

  EndRoadwayLocation: commercialVehicleRestrictionRoadwayLocationSchema,

  IsDetourAvailable: z.boolean(),

  IsExceptionsAllowed: z.boolean(),

  IsPermanentRestriction: z.boolean(),

  IsWarning: z.boolean(),

  LocationDescription: z.string(),

  LocationName: z.string(),

  RestrictionComment: z.string(),

  RestrictionType: z.number(),

  State: z.string(),

  StateRouteID: z.string(),

  VehicleType: z.string(),
});

/**
 * Commercial vehicle restriction schema with unique identifier - extends base restriction schema
 */
export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema.extend({
    UniqueID: z.string(),
  });

/**
 * Array of commercial vehicle restriction objects - wrapper around commercialVehicleRestrictionSchema
 */
export const commercialVehicleRestrictionArraySchema = z.array(
  commercialVehicleRestrictionSchema
);

/**
 * Array of commercial vehicle restriction objects with unique IDs - wrapper around commercialVehicleRestrictionWithIdSchema
 */
export const commercialVehicleRestrictionWithIdArraySchema = z.array(
  commercialVehicleRestrictionWithIdSchema
);

/**
 * CommercialVehicleRestrictionRoadwayLocation type - represents roadway location data for restrictions
 */
export type CommercialVehicleRestrictionRoadwayLocation = z.infer<
  typeof commercialVehicleRestrictionRoadwayLocationSchema
>;

/**
 * CommercialVehicleRestriction type - represents commercial vehicle restriction data
 */
export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;

/**
 * CommercialVehicleRestrictionWithId type - represents commercial vehicle restriction data with unique identifier
 */
export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;

/**
 * CommercialVehicleRestrictions type - represents an array of commercial vehicle restriction objects
 */
export type CommercialVehicleRestrictions = z.infer<
  typeof commercialVehicleRestrictionArraySchema
>;

/**
 * CommercialVehicleRestrictionsWithId type - represents an array of commercial vehicle restriction objects with unique identifiers
 */
export type CommercialVehicleRestrictionsWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdArraySchema
>;

// ============================================================================
// TanStack Query Hooks
// ============================================================================

export const useCommercialVehicleRestrictionsWithId = createUseQueryWsdot({
  queryFn: getCommercialVehicleRestrictionsWithId,
  queryKeyPrefix: [
    "wsdot",
    "commercial-vehicle-restrictions",
    "getCommercialVehicleRestrictionsWithId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});

export const useCommercialVehicleRestrictions = createUseQueryWsdot({
  queryFn: getCommercialVehicleRestrictions,
  queryKeyPrefix: [
    "wsdot",
    "commercial-vehicle-restrictions",
    "getCommercialVehicleRestrictions",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
});
