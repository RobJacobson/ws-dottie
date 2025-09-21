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
  type TollTripInfo,
  tollTripInfosSchema,
} from "@/schemas/wsdot-toll-rates/tollTripInfo.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTollTripInfo */
const tollTripInfoInput = z.object({}).strict();

/** Endpoint metadata for getTollTripInfo */
export const getTollTripInfoMeta: EndpointDefinition<
  TollTripInfoInput,
  TollTripInfo[]
> = {
  id: "wsdot-toll-rates/getTollTripInfo",
  endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripInfoAsJson",
  inputSchema: tollTripInfoInput,
  outputSchema: tollTripInfosSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type TollTripInfoInput = z.infer<typeof tollTripInfoInput>;
