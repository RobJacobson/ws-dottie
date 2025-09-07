/**
 * @module WSDOT — Highway Alerts API
 * @description Active highway alerts including construction, incidents, and travel impacts.
 *
 * Provides:
 * - All active alerts
 *
 * Data includes:
 * - Alert identifiers, categories, status, headline/extended descriptions, start/end times (JS Date), roadway locations
 *
 * @functions
 *   - getAlerts: Returns all active alerts
 *
 * @input
 *   - getAlerts: {}
 *
 * @output
 *   - getAlerts: HighwayAlerts
 *   - HighwayAlert fields:
 *     - AlertID: Alert identifier
 *     - County: County name (nullable)
 *     - EndRoadwayLocation: End location details
 *     - EndTime: End time (JS Date, nullable)
 *     - EventCategory: Event category
 *     - EventStatus: Event status
 *     - ExtendedDescription: Extended description (nullable)
 *     - HeadlineDescription: Headline description
 *     - LastUpdatedTime: Last update time (JS Date)
 *     - Priority: Priority
 *     - Region: Region name
 *     - StartRoadwayLocation: Start location details
 *     - StartTime: Start time (JS Date)
 *   - HighwayAlertRoadwayLocation fields:
 *     - Description: Location description (nullable)
 *     - Direction: Direction (nullable)
 *     - Latitude: Latitude (may be 0 when not available)
 *     - Longitude: Longitude (may be 0 when not available)
 *     - MilePost: Highway milepost (may be 0 when not available)
 *     - RoadName: Highway/road name (nullable)
 *
 * @baseType
 *   - HighwayAlert: Highway alert record
 *   - HighwayAlertRoadwayLocation: Roadway location details
 *
 * @cli
 *   - getAlerts: node dist/cli.mjs getAlerts
 *
 * @exampleResponse
 * {
 *   "AlertID": 661208,
 *   "County": null,
 *   "EndRoadwayLocation": {
 *     "Description": null,
 *     "Direction": "S",
 *     "Latitude": 47.578503696,
 *     "Longitude": -122.174652622,
 *     "MilePost": 11,
 *     "RoadName": "405"
 *   },
 *   "EndTime": "2025-09-05T12:00:00.000Z",
 *   "EventCategory": "Construction",
 *   "EventStatus": "Open",
 *   "ExtendedDescription": "",
 *   "HeadlineDescription": "Up to two lanes of southbound I-405 from milepost 12 to milepost 11 will be closed nighty, 9 p.m. Tuesday, Sept. 2 – 5 a.m. Friday, Sept. 5.",
 *   "LastUpdatedTime": "2025-08-29T19:35:05.540Z",
 *   "Priority": "Low",
 *   "Region": "Northwest",
 *   "StartRoadwayLocation": {
 *     "Description": null,
 *     "Direction": "S",
 *     "Latitude": 47.591955273,
 *     "Longitude": -122.181281785,
 *     "MilePost": 12,
 *     "RoadName": "405"
 *   },
 *   "StartTime": "2025-09-02T07:00:00.000Z"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 */
import { z } from "zod";
import { type Alerts, alertsSchema } from "@/schemas/wsdot-highway-alerts";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

/** Params schema for getAlerts (none) */
export const getAlertsParamsSchema = z.object({});

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

/** Fetches all active highway alerts */
export const getAlerts = async (params: GetAlertsParams): Promise<Alerts> =>
  zodFetch({
    endpoint:
      "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson",
    inputSchema: getAlertsParamsSchema,
    outputSchema: alertsSchema,
    params,
  });

/** Returns options for all alerts; polls every 60s */
export const getAlertsOptions = createQueryOptions({
  apiFunction: getAlerts,
  queryKey: ["wsdot", "highway-alerts", "getAlerts"],
  cacheStrategy: "MINUTE_UPDATES",
});
