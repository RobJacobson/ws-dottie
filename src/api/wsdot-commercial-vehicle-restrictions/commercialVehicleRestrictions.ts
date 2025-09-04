/**
 * @module WSDOT — Commercial Vehicle Restrictions API
 * @description Commercial vehicle bridge/load restrictions and related metadata.
 *
 * Provides:
 * - Statewide commercial vehicle restrictions (general and with UniqueID)
 * - Locations, dates, load limits, and descriptive metadata
 *
 * Data includes:
 * - Restriction types and comments, bridge/route identifiers, dates (JS Date), roadway location
 *
 * @functions
 *   - getCommercialVehicleRestrictions: Returns commercial vehicle restrictions (no IDs)
 *   - getCommercialVehicleRestrictionsWithId: Returns restrictions including UniqueID
 *
 * @input
 *   - getCommercialVehicleRestrictions: {}
 *   - getCommercialVehicleRestrictionsWithId: {}
 *
 * @output
 *   - getCommercialVehicleRestrictions: CommercialVehicleRestrictions
 *   - getCommercialVehicleRestrictionsWithId: CommercialVehicleRestrictionsWithId
 *   - CommercialVehicleRestriction fields:
 *     - BLMaxAxle: BL maximum axle weight (nullable)
 *     - BridgeName: Bridge name
 *     - BridgeNumber: Bridge number
 *     - CL8MaxAxle: CL-8 maximum axle weight (nullable)
 *     - DateEffective: Effective date (JS Date)
 *     - DateExpires: Expiration date (JS Date)
 *     - DatePosted: Date posted (JS Date)
 *     - EndRoadwayLocation: End location information
 *     - IsDetourAvailable: Whether detour is available
 *     - IsExceptionsAllowed: Whether exceptions are allowed
 *     - IsPermanentRestriction: Whether restriction is permanent
 *     - IsWarning: Whether warning only
 *     - LocationDescription: Location description
 *     - LocationName: Location name
 *     - RestrictionComment: Restriction comment
 *     - RestrictionType: Restriction type code
 *     - State: State code
 *     - StateRouteID: State route identifier
 *     - VehicleType: Vehicle type description
 *   - CommercialVehicleRestrictionRoadwayLocation fields:
 *     - Description: Location description (nullable)
 *     - Direction: Direction (nullable)
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MilePost: Highway milepost
 *     - RoadName: Highway/road name
 *   - CommercialVehicleRestrictionWithId fields add:
 *     - UniqueID: Unique restriction ID
 *
 * @baseType
 *   - CommercialVehicleRestriction: Restriction record
 *   - CommercialVehicleRestrictionWithId: Restriction record with UniqueID
 *   - CommercialVehicleRestrictionRoadwayLocation: Roadway location details
 *
 * @cli
 *   - getCommercialVehicleRestrictions: node dist/cli.mjs getCommercialVehicleRestrictions
 *   - getCommercialVehicleRestrictionsWithId: node dist/cli.mjs getCommercialVehicleRestrictionsWithId
 *
 * @exampleResponse
 * {
 *   "BLMaxAxle": 20000,
 *   "BridgeName": "Teanaway River",
 *   "BridgeNumber": "10/142",
 *   "CL8MaxAxle": 20000,
 *   "DateEffective": "2011-10-18T07:00:00.000Z",
 *   "DateExpires": "2075-12-31T08:00:00.000Z",
 *   "DatePosted": "2011-10-18T22:12:00.000Z",
 *   "EndRoadwayLocation": {
 *     "Description": null,
 *     "Direction": "Both",
 *     "Latitude": 0,
 *     "Longitude": 0,
 *     "MilePost": 0,
 *     "RoadName": "SR 10"
 *   },
 *   "IsDetourAvailable": false,
 *   "IsExceptionsAllowed": false,
 *   "IsPermanentRestriction": false,
 *   "IsWarning": false,
 *   "LocationDescription": "SR 10, MP 89.33 both directions-20,000 lbs limitation",
 *   "LocationName": "1.3 E Jct SR 970",
 *   "RestrictionComment": "BL =20,000 lbs, CL-8 =20,000 lbs, SA = 40,000 lbs.",
 *   "RestrictionType": 0,
 *   "State": "WA",
 *   "StateRouteID": "10",
 *   "VehicleType": ""
 * }
 *
 * @exampleResponse
 * {
 *   "BLMaxAxle": 20000,
 *   "BridgeName": "Teanaway River",
 *   "BridgeNumber": "10/142",
 *   "CL8MaxAxle": 20000,
 *   "DateEffective": "2011-10-18T07:00:00.000Z",
 *   "DateExpires": "2075-12-31T08:00:00.000Z",
 *   "DatePosted": "2011-10-18T22:12:00.000Z",
 *   "EndRoadwayLocation": {
 *     "Description": null,
 *     "Direction": "Both",
 *     "Latitude": 0,
 *     "Longitude": 0,
 *     "MilePost": 0,
 *     "RoadName": "SR 10"
 *   },
 *   "IsDetourAvailable": false,
 *   "IsExceptionsAllowed": false,
 *   "IsPermanentRestriction": false,
 *   "IsWarning": false,
 *   "LocationDescription": "SR 10, MP 89.33 both directions-20,000 lbs limitation",
 *   "LocationName": "1.3 E Jct SR 970",
 *   "RestrictionComment": "BL =20,000 lbs, CL-8 =20,000 lbs, SA = 40,000 lbs.",
 *   "RestrictionType": 0,
 *   "State": "WA",
 *   "StateRouteID": "10",
 *   "VehicleType": "",
 *   "UniqueID": "B-WA-010-1"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___commercial_vehicle.html
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

// TanStack factory hooks removed in favor of queryOptions
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson";

const ENDPOINT_WITH_ID =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson";

/** Fetches commercial vehicle restrictions (no IDs) */
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

/** Fetches commercial vehicle restrictions including UniqueID */
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

// ============================================================================
// Input Schemas & Types
// ============================================================================

/** Params schema for getCommercialVehicleRestrictionsWithId (none) */
export const getCommercialVehicleRestrictionsWithIdParamsSchema = z.object({});

/** GetCommercialVehicleRestrictionsWithId params type */
export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdParamsSchema
>;

/** Params schema for getCommercialVehicleRestrictions (none) */
export const getCommercialVehicleRestrictionsParamsSchema = z.object({});

/** GetCommercialVehicleRestrictions params type */
export type GetCommercialVehicleRestrictionsParams = z.infer<
  typeof getCommercialVehicleRestrictionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
// ============================================================================

/** Roadway location schema for restrictions */
export const commercialVehicleRestrictionRoadwayLocationSchema = z.object({
  /** Location description (nullable) */
  Description: zNullableString(),
  /** Direction (nullable) */
  Direction: zNullableString(),
  /** Latitude in decimal degrees */
  Latitude: zLatitude(),
  /** Longitude in decimal degrees */
  Longitude: zLongitude(),
  /** Highway milepost */
  MilePost: z.number(),
  /** Highway/road name */
  RoadName: z.string(),
});

/** Restriction item schema (no UniqueID) */
export const commercialVehicleRestrictionSchema = z.object({
  /** BL maximum axle weight (nullable) */
  BLMaxAxle: zNullableNumber(),
  /** Bridge name */
  BridgeName: z.string(),
  /** Bridge number */
  BridgeNumber: z.string(),
  /** CL-8 maximum axle weight (nullable) */
  CL8MaxAxle: zNullableNumber(),
  /** Effective date (JS Date) */
  DateEffective: zWsdotDate(),
  /** Expiration date (JS Date) */
  DateExpires: zWsdotDate(),
  /** Date posted (JS Date) */
  DatePosted: zWsdotDate(),
  /** End location information */
  EndRoadwayLocation: commercialVehicleRestrictionRoadwayLocationSchema,
  /** Detour available */
  IsDetourAvailable: z.boolean(),
  /** Exceptions allowed */
  IsExceptionsAllowed: z.boolean(),
  /** Permanent restriction */
  IsPermanentRestriction: z.boolean(),
  /** Warning only */
  IsWarning: z.boolean(),
  /** Location description */
  LocationDescription: z.string(),
  /** Location name */
  LocationName: z.string(),
  /** Restriction comment */
  RestrictionComment: z.string(),
  /** Restriction type code */
  RestrictionType: z.number(),
  /** State code */
  State: z.string(),
  /** State route identifier */
  StateRouteID: z.string(),
  /** Vehicle type description */
  VehicleType: z.string(),
});

/** Restriction item schema with UniqueID */
export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema.extend({
    /** Unique restriction ID */
    UniqueID: z.string(),
  });

/** Restriction array schema (no IDs) */
export const commercialVehicleRestrictionArraySchema = z.array(
  commercialVehicleRestrictionSchema
);

/** Restriction array schema (with IDs) */
export const commercialVehicleRestrictionWithIdArraySchema = z.array(
  commercialVehicleRestrictionWithIdSchema
);

/** CommercialVehicleRestrictionRoadwayLocation type */
export type CommercialVehicleRestrictionRoadwayLocation = z.infer<
  typeof commercialVehicleRestrictionRoadwayLocationSchema
>;

/** CommercialVehicleRestriction type */
export type CommercialVehicleRestriction = z.infer<
  typeof commercialVehicleRestrictionSchema
>;

/** CommercialVehicleRestrictionWithId type */
export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;

/** CommercialVehicleRestrictions type */
export type CommercialVehicleRestrictions = z.infer<
  typeof commercialVehicleRestrictionArraySchema
>;

/** CommercialVehicleRestrictionsWithId type */
export type CommercialVehicleRestrictionsWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdArraySchema
>;

// ============================================================================
// TanStack Query Options (new pattern)
// ============================================================================

/** Returns options for commercial vehicle restrictions (no IDs); polls daily */
export const commercialVehicleRestrictionsOptions = () =>
  queryOptions({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictions",
    ],
    queryFn: () => getCommercialVehicleRestrictions({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

/** Returns options for restrictions including UniqueID; polls daily */
export const commercialVehicleRestrictionsWithIdOptions = () =>
  queryOptions({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictionsWithId",
    ],
    queryFn: () => getCommercialVehicleRestrictionsWithId({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
