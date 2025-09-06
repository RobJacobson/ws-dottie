/**
 * @module WSDOT — Commercial Vehicle Restrictions API
 * @description Commercial vehicle bridge/load restrictions and related metadata.
 *
 * Provides:
 * - Statewide commercial vehicle restrictions (no UniqueID)
 * - Locations, dates, load limits, and descriptive metadata
 *
 * Data includes:
 * - Restriction types and comments, bridge/route identifiers, dates (JS Date), roadway location
 *
 * @functions
 *   - getCommercialVehicleRestrictions: Returns commercial vehicle restrictions (no IDs)
 *
 * @input
 *   - getCommercialVehicleRestrictions: {}
 *
 * @output
 *   - getCommercialVehicleRestrictions: CommercialVehicleRestrictions
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
 *
 * @baseType
 *   - CommercialVehicleRestriction: Restriction record
 *   - CommercialVehicleRestrictionRoadwayLocation: Roadway location details
 *
 * @cli
 *   - getCommercialVehicleRestrictions: node dist/cli.mjs getCommercialVehicleRestrictions
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
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___commercial_vehicle.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  commercialVehiclesRestrictionsSchema,
  type CommercialVehiclesRestrictions,
} from "@/schemas/wsdot-commercial-vehicle-restrictions";

// ============================================================================
// Input Schemas & Types
// ============================================================================

/** Params schema for getCommercialVehicleRestrictions (none) */
export const getCommercialVehicleRestrictionsParamsSchema = z.object({});

/** GetCommercialVehicleRestrictions params type */
export type GetCommercialVehicleRestrictionsParams = z.infer<
  typeof getCommercialVehicleRestrictionsParamsSchema
>;

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsAsJson";

/** Fetches commercial vehicle restrictions (no IDs) */
export const getCommercialVehicleRestrictions = zodFetch<
  GetCommercialVehicleRestrictionsParams,
  CommercialVehiclesRestrictions
>(
  ENDPOINT,
  getCommercialVehicleRestrictionsParamsSchema,
  commercialVehiclesRestrictionsSchema
);

// ============================================================================
// TanStack Query Options (new pattern)
// ============================================================================

/** Returns options for commercial vehicle restrictions (no IDs); polls daily */
export const commercialVehicleRestrictionsOptions = createQueryOptions({
  apiFunction: getCommercialVehicleRestrictions,
  queryKey: [
    "wsdot",
    "commercial-vehicle-restrictions",
    "getCommercialVehicleRestrictions",
  ],
  cacheStrategy: "DAILY_STATIC",
});
