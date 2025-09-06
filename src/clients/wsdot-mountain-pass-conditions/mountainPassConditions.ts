/**
 * @module WSDOT — Mountain Pass Conditions API
 * @description Mountain pass conditions, advisories, and travel restrictions.
 *
 * Provides:
 * - Single pass condition by ID
 * - All current pass conditions
 *
 * Data includes:
 * - Pass identifiers, elevation, coordinates, road/weather conditions, dates (JS Date)
 *
 * @functions
 *   - getMountainPassConditions: Returns all pass conditions
 *   - getMountainPassConditionById: Returns a single pass condition by ID
 *
 * @input
 *   - getMountainPassConditions: {}
 *   - getMountainPassConditionById:
 *     - passConditionId: Pass condition identifier
 *
 * @output
 *   - getMountainPassConditions: MountainPassConditions
 *   - getMountainPassConditionById: MountainPassCondition
 *   - MountainPassCondition fields:
 *     - DateUpdated: Last update time (JS Date)
 *     - ElevationInFeet: Elevation in feet
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - MountainPassId: Pass identifier
 *     - MountainPassName: Pass name (nullable)
 *     - RestrictionOne: Restriction details (nullable)
 *     - RestrictionTwo: Restriction details (nullable)
 *     - RoadCondition: Road condition (nullable)
 *     - TemperatureInFahrenheit: Temperature (F, nullable)
 *     - TravelAdvisoryActive: Whether advisory is active
 *     - WeatherCondition: Weather condition (nullable)
 *   - TravelRestriction fields:
 *     - TravelDirection: Travel direction (nullable)
 *     - RestrictionText: Restriction text (nullable)
 *
 * @baseType
 *   - MountainPassCondition: Pass condition record
 *   - TravelRestriction: Travel restriction detail
 *
 * @cli
 *   - getMountainPassConditions: node dist/cli.mjs getMountainPassConditions
 *   - getMountainPassConditionById: node dist/cli.mjs getMountainPassConditionById '{"passConditionId": 1}'
 *
 * @exampleResponse
 * {
 *   "DateUpdated": "2025-08-22T14:11:37.433Z",
 *   "ElevationInFeet": 4102,
 *   "Latitude": 47.335298205,
 *   "Longitude": -120.581068216,
 *   "MountainPassId": 1,
 *   "MountainPassName": "Blewett Pass US 97",
 *   "RestrictionOne": {
 *     "TravelDirection": "Northbound",
 *     "RestrictionText": "No restrictions"
 *   },
 *   "RestrictionTwo": {
 *     "TravelDirection": "Southbound",
 *     "RestrictionText": "No restrictions"
 *   },
 *   "RoadCondition": "Seasonal weather reports have ended for this season. Traditionally weather is reported on this page from November 1 to April 1. Should adverse weather or other incidents occur that will impact travel, updates will be provided as information is available.",
 *   "TemperatureInFahrenheit": null,
 *   "TravelAdvisoryActive": true,
 *   "WeatherCondition": ""
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
 */
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { passConditionSchema, type PassCondition } from "@/schemas/wsdot-mountain-pass-conditions";
import {
  mountainPassConditionsSchema,
  type MountainPassConditions,
} from "@/schemas/wsdot-mountain-pass-conditions";

// ============================================================================
// Input Schemas & Types (singular first, then array)
// ============================================================================

/** Params schema for getMountainPassConditionById */
export const getMountainPassConditionByIdParamsSchema = z.object({
  /** Pass condition identifier */
  passConditionId: z.number().int().positive(),
});

/** GetMountainPassConditionByIdParams type */
export type GetMountainPassConditionByIdParams = z.infer<
  typeof getMountainPassConditionByIdParamsSchema
>;

/** Params schema for getMountainPassConditions (none) */
export const getMountainPassConditionsParamsSchema = z.object({});

/** GetMountainPassConditionsParams type */
export type GetMountainPassConditionsParams = z.infer<
  typeof getMountainPassConditionsParamsSchema
>;

// ============================================================================
// API Functions
//
// getMountainPassConditionById (singular first)
// ============================================================================

/** Fetches a single mountain pass condition by ID */
export const getMountainPassConditionById = zodFetch<
  GetMountainPassConditionByIdParams,
  PassCondition
>(
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={passConditionId}",
  getMountainPassConditionByIdParamsSchema,
  passConditionSchema
);

// ============================================================================
// getMountainPassConditions (array second)
// ============================================================================

/** Fetches all mountain pass conditions */
export const getMountainPassConditions = zodFetch<
  GetMountainPassConditionsParams,
  MountainPassConditions
>(
  "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson",
  getMountainPassConditionsParamsSchema,
  mountainPassConditionsSchema
);

// ============================================================================
// TanStack Query Options (singular first, then array)
// ============================================================================

/** Returns options for a single pass condition by ID; polls daily */
export const mountainPassConditionByIdOptions = createQueryOptions({
  apiFunction: getMountainPassConditionById,
  queryKey: [
    "wsdot",
    "mountain-pass-conditions",
    "getMountainPassConditionById",
  ],
  cacheStrategy: "DAILY_STATIC",
});

/** Returns options for all pass conditions; polls daily */
export const mountainPassConditionsOptions = createQueryOptions({
  apiFunction: getMountainPassConditions,
  queryKey: ["wsdot", "mountain-pass-conditions", "getMountainPassConditions"],
  cacheStrategy: "DAILY_STATIC",
});
