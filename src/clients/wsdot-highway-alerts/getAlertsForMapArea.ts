/**
 * @module WSDOT — Highway Alerts API
 * @description Highway alerts filtered by map area including construction, incidents, and travel impacts.
 *
 * Provides:
 * - Alerts filtered by map area
 *
 * Data includes:
 * - Alert identifiers, categories, status, headline/extended descriptions, start/end times (JS Date), roadway locations
 *
 * @functions
 *   - getAlertsForMapArea: Returns alerts filtered by map area
 *
 * @input
 *   - getAlertsForMapArea:
 *     - MapArea: Map area name
 *
 * @output
 *   - getAlertsForMapArea: HighwayAlerts
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
 *   - getAlertsForMapArea: node dist/cli.mjs getAlertsForMapArea '{"MapArea": "Seattle"}'
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
import {
  type HighwayAlerts,
  highwayAlertsSchema,
} from "@/schemas/wsdot-highway-alerts/highwayAlert.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getAlertsForMapArea */
const alertsForMapAreaInput = z.object({
  /** Map area name */
  MapArea: z.string().min(1, "Map area cannot be empty"),
});

/** Endpoint metadata for getAlertsForMapArea */
export const getAlertsForMapAreaMeta: EndpointMeta<
  AlertsForMapAreaInput,
  HighwayAlerts
> = {
  id: "wsdot-highway-alerts/getAlertsForMapArea",
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}",
  inputSchema: alertsForMapAreaInput,
  outputSchema: highwayAlertsSchema,
  sampleParams: { MapArea: "Seattle" },
  cacheStrategy: "MINUTE_UPDATES",
};

// Type exports
export type AlertsForMapAreaInput = z.infer<typeof alertsForMapAreaInput>;
