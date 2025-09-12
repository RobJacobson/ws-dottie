/**
 * @module WSDOT — Mountain Pass Conditions API
 * @description Mountain pass conditions, advisories, and travel restrictions.
 *
 * Provides:
 * - Single pass condition by ID
 *
 * Data includes:
 * - Pass identifiers, elevation, coordinates, road/weather conditions, dates (JS Date)
 *
 * @functions
 *   - getMountainPassConditionById: Returns a single pass condition by ID
 *
 * @input
 *   - getMountainPassConditionById:
 *     - passConditionId: Pass condition identifier
 *
 * @output
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
import { passConditionSchema } from "@/schemas/wsdot-mountain-pass-conditions";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getMountainPassCondition */
const getMountainPassConditionParamsSchema = z.object({
  /** Pass condition identifier */
  passConditionId: z.number().int().positive(),
});

/** GetMountainPassCondition params type */

/** Endpoint definition for getMountainPassCondition */
export const getMountainPassConditionDef = defineEndpoint({
  api: "wsdot-mountain-pass-conditions",
  function: "getMountainPassCondition",
  endpoint:
    "/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionAsJon?PassConditionID={passConditionId}",
  inputSchema: getMountainPassConditionParamsSchema,
  outputSchema: passConditionSchema,
  sampleParams: { passConditionId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
