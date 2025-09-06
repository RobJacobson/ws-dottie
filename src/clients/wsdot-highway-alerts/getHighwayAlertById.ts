/**
 * @module WSDOT — Highway Alerts API
 * @description Single highway alert by ID including construction, incidents, and travel impacts.
 *
 * Provides:
 * - Single alert by ID
 *
 * Data includes:
 * - Alert identifiers, categories, status, headline/extended descriptions, start/end times (JS Date), roadway locations
 *
 * @functions
 *   - getHighwayAlertById: Returns a single alert by ID
 *
 * @input
 *   - getHighwayAlertById:
 *     - AlertID: Alert identifier
 *
 * @output
 *   - getHighwayAlertById: HighwayAlert
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
 *   - getHighwayAlertById: node dist/cli.mjs getHighwayAlertById '{"AlertID": 1}'
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
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  alertSchema,
  type Alert,
} from "@/schemas/wsdot-highway-alerts";

// ============================================================================
// Input Schemas & Types
// ============================================================================

/** Params schema for getHighwayAlertById */
export const getHighwayAlertByIdParamsSchema = z.object({
  /** Alert identifier */
  AlertID: z.number().int().positive(),
});

export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT_BY_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}";

/** Fetches a single highway alert by ID */
export const getHighwayAlertById = zodFetch<
  GetHighwayAlertByIdParams, Alert
>(
  ENDPOINT_BY_ID,
  getHighwayAlertByIdParamsSchema,
  alertSchema
);

// ============================================================================
// TanStack Query options
// ============================================================================

/** Returns options for a single alert by ID; polls every 60s */
export const highwayAlertByIdOptions = createQueryOptions({
  apiFunction: getHighwayAlertById,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlertById"],
  cacheStrategy: "MINUTE_UPDATES",
});
