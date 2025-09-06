/**
 * @module WSDOT — Traffic Flow API
 * @description Point-in-time traffic flow readings from WSDOT flow stations.
 *
 * Provides:
 * - All current traffic flows
 *
 * Data includes:
 * - Flow station identifier, numeric flow reading (0–4), station location, region, station name, and observation time (JS Date)
 *
 * @functions
 *   - getTrafficFlows: Returns all current traffic flows
 *
 * @input
 *   - getTrafficFlows: {}
 *
 * @output
 *   - getTrafficFlows: TrafficFlows
 *   - TrafficFlow fields:
 *     - FlowDataID: Flow data identifier (nullable)
 *     - FlowReadingValue: Numeric reading 0–4 (nullable)
 *     - FlowStationLocation: Location details (nullable)
 *     - Region: Region name (nullable)
 *     - StationName: Station identifier (nullable)
 *     - Time: Observation time (JS Date, nullable)
 *
 * @baseType
 *   - TrafficFlow: Traffic flow record
 *   - FlowStationLocation: Station location details
 *
 * @cli
 *   - getTrafficFlows: node dist/cli.mjs getTrafficFlows
 *
 * @exampleResponse
 * {
 *   "FlowDataID": 2482,
 *   "FlowReadingValue": 1,
 *   "FlowStationLocation": {
 *     "Description": "Homeacres Rd",
 *     "Direction": "EB",
 *     "Latitude": 47.978415632,
 *     "Longitude": -122.174701738,
 *     "MilePost": 0.68,
 *     "RoadName": "002"
 *   },
 *   "Region": "Northwest",
 *   "StationName": "002es00068",
 *   "Time": "2025-09-04T00:05:22.000Z"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
 */
import { z } from "zod";
import { type FlowData, flowDataSchema } from "@/schemas/wsdot-traffic-flow";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

/** Params schema for getTrafficFlows (none) */
export const getTrafficFlowsParamsSchema = z.object({});

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

/** Fetches all current traffic flows */
export const getTrafficFlows = zodFetch<GetTrafficFlowsParams, FlowData[]>(
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
  getTrafficFlowsParamsSchema,
  z.array(flowDataSchema)
);

/** Returns options for all traffic flows; polls every 60s */
export const trafficFlowsOptions = createQueryOptions({
  apiFunction: getTrafficFlows,
  queryKey: ["wsdot", "traffic-flow", "getTrafficFlows"],
  cacheStrategy: "MINUTE_UPDATES",
});
