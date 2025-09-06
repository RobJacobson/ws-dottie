/**
 * @module WSDOT — Highway Alerts API
 * @description Active and scheduled highway alerts including construction, incidents, and travel impacts.
 *
 * Provides:
 * - All active alerts
 * - Single alert by ID
 * - Alerts filtered by map area or by region ID
 *
 * Data includes:
 * - Alert identifiers, categories, status, headline/extended descriptions, start/end times (JS Date), roadway locations
 *
 * @functions
 *   - getHighwayAlerts: Returns all active alerts
 *   - getHighwayAlertById: Returns a single alert by ID
 *   - getHighwayAlertsByMapArea: Returns alerts filtered by map area
 *   - getHighwayAlertsByRegionId: Returns alerts filtered by region ID
 *
 * @input
 *   - getHighwayAlerts: {}
 *   - getHighwayAlertById:
 *     - AlertID: Alert identifier
 *   - getHighwayAlertsByMapArea:
 *     - MapArea: Map area name
 *   - getHighwayAlertsByRegionId:
 *     - RegionId: Region numeric identifier
 *
 * @output
 *   - getHighwayAlerts: HighwayAlerts
 *   - getHighwayAlertById: HighwayAlert
 *   - getHighwayAlertsByMapArea: HighwayAlerts
 *   - getHighwayAlertsByRegionId: HighwayAlerts
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
 *   - getHighwayAlerts: node dist/cli.mjs getHighwayAlerts
 *   - getHighwayAlertById: node dist/cli.mjs getHighwayAlertById '{"AlertID": 1}'
 *   - getHighwayAlertsByMapArea: node dist/cli.mjs getHighwayAlertsByMapArea '{"MapArea": "Seattle"}'
 *   - getHighwayAlertsByRegionId: node dist/cli.mjs getHighwayAlertsByRegionId '{"RegionId": 1}'
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
  alertsSchema,
  type Alert,
  type Alerts,
} from "@/schemas/wsdot-highway-alerts";

// ============================================================================
// Input Schemas & Types
//
// getHighwayAlertByIdParamsSchema
// getHighwayAlertsParamsSchema
// getHighwayAlertsByMapAreaParamsSchema
// getHighwayAlertsByRegionIdParamsSchema
// ============================================================================

/** Params schema for getHighwayAlertById */
export const getHighwayAlertByIdParamsSchema = z.object({
  /** Alert identifier */
  AlertID: z.number().int().positive(),
});

export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;

/** Params schema for getHighwayAlerts (none) */
export const getHighwayAlertsParamsSchema = z.object({});

export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;

/** Params schema for getHighwayAlertsByMapArea */
export const getHighwayAlertsByMapAreaParamsSchema = z.object({
  /** Map area name */
  MapArea: z.string().min(1, "Map area cannot be empty"),
});

export type GetHighwayAlertsByMapAreaParams = z.infer<
  typeof getHighwayAlertsByMapAreaParamsSchema
>;

/** Params schema for getHighwayAlertsByRegionId */
export const getHighwayAlertsByRegionIdParamsSchema = z.object({
  /** Region numeric identifier */
  RegionId: z.number().int().positive(),
});

export type GetHighwayAlertsByRegionIdParams = z.infer<
  typeof getHighwayAlertsByRegionIdParamsSchema
>;

// ============================================================================
// API Functions
//
// getHighwayAlertById (singular item)
// getHighwayAlerts (array)
// getHighwayAlertsByMapArea (array filtered by map area)
// getHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

const ENDPOINT_BY_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}";

const ENDPOINT_BY_MAP_AREA =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}";

const ENDPOINT_BY_REGION_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

/** Fetches a single highway alert by ID */
export const getHighwayAlertById = zodFetch<
  GetHighwayAlertByIdParams, Alert
>(
  ENDPOINT_BY_ID,
  getHighwayAlertByIdParamsSchema,
  alertSchema
);

/** Fetches all active highway alerts */
export const getHighwayAlerts = zodFetch<GetHighwayAlertsParams, Alerts>(
  ENDPOINT,
  getHighwayAlertsParamsSchema,
  alertsSchema
);

/** Fetches highway alerts filtered by map area */
export const getHighwayAlertsByMapArea = zodFetch<
  GetHighwayAlertsByMapAreaParams, Alerts
>(
  ENDPOINT_BY_MAP_AREA,
  getHighwayAlertsByMapAreaParamsSchema,
  alertsSchema
);

/** Fetches highway alerts filtered by region ID */
export const getHighwayAlertsByRegionId = zodFetch<
  GetHighwayAlertsByRegionIdParams, Alerts
>(
  ENDPOINT_BY_REGION_ID,
  getHighwayAlertsByRegionIdParamsSchema,
  alertsSchema
);

// ============================================================================
// TanStack Query options
//
// useHighwayAlertById (singular item)
// useHighwayAlerts (array)
// useHighwayAlertsByMapArea (array filtered by map area)
// useHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

/** Returns options for a single alert by ID; polls every 60s */
export const highwayAlertByIdOptions = createQueryOptions({
  apiFunction: getHighwayAlertById,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlertById"],
  cacheStrategy: "MINUTE_UPDATES",
});

/** Returns options for all alerts; polls every 60s */
export const highwayAlertsOptions = createQueryOptions({
  apiFunction: getHighwayAlerts,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts"],
  cacheStrategy: "MINUTE_UPDATES",
});

/** Returns options for alerts by map area; polls every 60s */
export const highwayAlertsByMapAreaOptions = createQueryOptions({
  apiFunction: getHighwayAlertsByMapArea,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByMapArea"],
  cacheStrategy: "MINUTE_UPDATES",
});

/** Returns options for alerts by region ID; polls every 60s */
export const highwayAlertsByRegionIdOptions = createQueryOptions({
  apiFunction: getHighwayAlertsByRegionId,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByRegionId"],
  cacheStrategy: "MINUTE_UPDATES",
});
