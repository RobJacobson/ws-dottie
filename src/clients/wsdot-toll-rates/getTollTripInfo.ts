/**
 * @module WSDOT — Toll Trip Info API
 * @description Static information and geometry for toll trips.
 *
 * Provides:
 * - Trip geometries and metadata for tolled corridors
 *
 * Data includes:
 * - Trip name, route/direction, start/end milepost and location, geometry, modified date
 *
 * @functions
 *   - getTollTripInfo: Returns toll trip info records
 *
 * @input
 *   - getTollTripInfo: {}
 *
 * @output
 *   - getTollTripInfo: TollTripInfos
 *   - TollTripInfo fields:
 *     - EndLocationName: End location name (nullable)
 *     - EndMilepost: End milepost
 *     - Geometry: WGS84 LineString geometry (string)
 *     - ModifiedDate: Last modified date (JS Date, nullable)
 *     - StartLocationName: Start location name (nullable)
 *     - StartMilepost: Start milepost
 *     - TravelDirection: Travel direction (nullable)
 *     - TripName: Trip identifier (nullable)
 *
 * @cli
 *   - getTollTripInfo: node dist/cli.mjs getTollTripInfo
 *
 * @exampleResponse
 * {
 *   "EndLocationName": "NE 124th St",
 *   "EndMilepost": 20.76,
 *   "Geometry": "{ \"type\": \"LineString\", \"coordinates\": [[-122.18545726, 47.71554562], ... ] }",
 *   "ModifiedDate": "2022-11-01T20:44:51.757Z",
 *   "StartLocationName": "NE 4th",
 *   "StartMilepost": 13.51,
 *   "TravelDirection": "N",
 *   "TripName": "405tp01351"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import {
  type TollTripInfos,
  tollTripInfosSchema,
} from "@/schemas/wsdot-toll-rates";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

/** Fetches static information and geometry for toll trips */
export const getTollTripInfo = async (
  params: GetTollTripInfoParams = {}
): Promise<TollTripInfos> => {
  return zodFetch({
    endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson",
    inputSchema: getTollTripInfoParamsSchema,
    outputSchema: tollTripInfosSchema,
    params,
  });
};

/** Params schema for getTollTripInfo (none) */
export const getTollTripInfoParamsSchema = z.object({});

export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;

/** Returns options for toll trip info; polls every 60s */
export const tollTripInfoOptions = createQueryOptions({
  apiFunction: getTollTripInfo,
  queryKey: ["wsdot", "toll-rates", "getTollTripInfo"],
  cacheStrategy: "MINUTE_UPDATES",
});
