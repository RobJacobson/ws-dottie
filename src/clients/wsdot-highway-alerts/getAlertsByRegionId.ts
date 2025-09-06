/**
 * @module WSDOT — Highway Alerts: Get Alerts by Region ID
 * @description Retrieve alerts for a specific WSDOT region by region ID.
 *
 * Provides:
 * - Alerts filtered by region ID
 *
 * Data includes:
 * - Highway alert records (see HighwayAlert schema)
 *
 * @functions
 *   - getAlertsByRegionId: Returns alerts for a specific region ID
 *
 * @input
 *   - getAlertsByRegionId:
 *     - RegionId: Region numeric identifier
 *
 * @output
 *   - getAlertsByRegionId: HighwayAlert[]
 *
 * @cli
 *   - getAlertsByRegionId: node dist/cli.mjs getAlertsByRegionId '{"RegionId": 8}'
 *
 * @exampleResponse
 * {
 *   "AlertID": 2147483647,
 *   "County": "String content",
 *   "EndRoadwayLocation": {
 *     "Description": "String content",
 *     "Direction": "String content",
 *     "Latitude": 12678967.543233,
 *     "Longitude": 12678967.543233,
 *     "MilePost": 12678967.543233,
 *     "RoadName": "String content"
 *   },
 *   "EndTime": "1999-05-31T11:20:00.000Z",
 *   "EventCategory": "String content",
 *   "EventStatus": "String content",
 *   "ExtendedDescription": "String content",
 *   "HeadlineDescription": "String content",
 *   "LastUpdatedTime": "1999-05-31T11:20:00.000Z",
 *   "Priority": "String content",
 *   "Region": "String content",
 *   "StartRoadwayLocation": {
 *     "Description": "String content",
 *     "Direction": "String content",
 *     "Latitude": 12678967.543233,
 *     "Longitude": 12678967.543233,
 *     "MilePost": 12678967.543233,
 *     "RoadName": "String content"
 *   },
 *   "StartTime": "1999-05-31T11:20:00.000Z"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/help/operations/GetAlertsByRegionIDAsJson
 */
import { z } from "zod";
import { type Alerts, alertsSchema } from "@/schemas/wsdot-highway-alerts";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

/** Params schema for getAlertsByRegionId */
export const getAlertsByRegionIdParamsSchema = z.object({
  /** Region numeric identifier */
  RegionId: z.number().int().positive(),
});

export type GetAlertsByRegionIdParams = z.infer<
  typeof getAlertsByRegionIdParamsSchema
>;

const ENDPOINT_BY_REGION_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

/** Fetches highway alerts filtered by region ID */
export const getAlertsByRegionId = zodFetch<GetAlertsByRegionIdParams, Alerts>(
  ENDPOINT_BY_REGION_ID,
  getAlertsByRegionIdParamsSchema,
  alertsSchema
);

/** Returns options for alerts by region ID; polls every 60s */
export const getAlertsByRegionIdOptions = createQueryOptions({
  apiFunction: getAlertsByRegionId,
  queryKey: ["wsdot", "highway-alerts", "getAlertsByRegionId"],
  cacheStrategy: "MINUTE_UPDATES",
});
