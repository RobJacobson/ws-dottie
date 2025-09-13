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
import {
  type HighwayAlerts,
  highwayAlertsSchema,
} from "@/schemas/wsdot-highway-alerts/highwayAlert.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getAlertsByRegionId */
const alertsByRegionIdInput = z.object({
  /** Region numeric identifier */
  RegionId: z.number().int().positive(),
});

/** Endpoint metadata for getAlertsByRegionId */
export const getAlertsByRegionIdMeta: Endpoint<
  AlertsByRegionIdInput,
  HighwayAlerts
> = {
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}",
  inputSchema: alertsByRegionIdInput,
  outputSchema: highwayAlertsSchema,
  sampleParams: { RegionId: 9 },
  cacheStrategy: "MINUTE_UPDATES",
};

// Type exports
export type AlertsByRegionIdInput = z.infer<typeof alertsByRegionIdInput>;
