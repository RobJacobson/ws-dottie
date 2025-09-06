/**
 * @module WSDOT — Commercial Vehicle Restrictions API (With ID)
 * @description Commercial vehicle bridge/load restrictions and related metadata with UniqueID.
 *
 * Provides:
 * - Statewide commercial vehicle restrictions including UniqueID
 * - Locations, dates, load limits, and descriptive metadata
 *
 * Data includes:
 * - Restriction types and comments, bridge/route identifiers, dates (JS Date), roadway location
 * - UniqueID for each restriction
 *
 * @functions
 *   - getCommercialVehicleRestrictionsWithId: Returns restrictions including UniqueID
 *
 * @input
 *   - getCommercialVehicleRestrictionsWithId: {}
 *
 * @output
 *   - getCommercialVehicleRestrictionsWithId: CommercialVehicleRestrictionsWithId
 *   - CommercialVehicleRestrictionWithId fields:
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
 *     - UniqueID: Unique restriction identifier
 *   - CommercialVehicleRestrictionRoadwayLocation fields:
 *     - Description: Location description (nullable)
 *     - Direction: Direction (nullable)
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MilePost: Highway milepost
 *     - RoadName: Highway/road name
 *
 * @baseType
 *   - CommercialVehicleRestrictionWithId: Restriction record with UniqueID
 *   - CommercialVehicleRestrictionRoadwayLocation: Roadway location details
 *
 * @cli
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
 *   "VehicleType": "",
 *   "UniqueID": "B-WA-010-1"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___commercial_vehicle.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  commercialVehiclesRestrictionsWithIdSchema,
  type CommercialVehiclesRestrictionsWithId,
} from "@/schemas/wsdot-commercial-vehicle-restrictions";

// ============================================================================
// Input Schemas & Types
// ============================================================================

/** Params schema for getCommercialVehicleRestrictionsWithId (none) */
export const getCommercialVehicleRestrictionsWithIdParamsSchema = z.object({});

/** GetCommercialVehicleRestrictionsWithId params type */
export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdParamsSchema
>;

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT_WITH_ID =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson";

/** Fetches commercial vehicle restrictions including UniqueID */
export const getCommercialVehicleRestrictionsWithId = zodFetch<
  GetCommercialVehicleRestrictionsWithIdParams,
  CommercialVehiclesRestrictionsWithId
>(
  ENDPOINT_WITH_ID,
  getCommercialVehicleRestrictionsWithIdParamsSchema,
  commercialVehiclesRestrictionsWithIdSchema
);

// ============================================================================
// TanStack Query Options (new pattern)
// ============================================================================

/** Returns options for restrictions including UniqueID; polls daily */
export const commercialVehicleRestrictionsWithIdOptions = createQueryOptions({
  apiFunction: getCommercialVehicleRestrictionsWithId,
  queryKey: [
    "wsdot",
    "commercial-vehicle-restrictions",
    "getCommercialVehicleRestrictionsWithId",
  ],
  cacheStrategy: "DAILY_STATIC",
});
