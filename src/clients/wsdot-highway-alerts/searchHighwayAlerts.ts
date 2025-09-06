/**
 * @module WSDOT — Highway Alerts: Search
 * @description Search highway alerts by state route, region, time range, and milepost.
 *
 * Provides:
 * - Filtered alert results using optional parameters (falls back to all alerts when empty)
 *
 * Data includes:
 * - Highway alert records (see HighwayAlert schema)
 *
 * @functions
 *   - searchHighwayAlerts: Returns alerts filtered by provided parameters
 *
 * @input
 *   - searchHighwayAlerts:
 *     - StateRoute: State route code (optional)
 *     - Region: Region name (optional)
 *     - SearchTimeStart: Start time (JS Date, optional)
 *     - SearchTimeEnd: End time (JS Date, optional)
 *     - StartingMilepost: Starting milepost (optional)
 *     - EndingMilepost: Ending milepost (optional)
 *
 * @output
 *   - searchHighwayAlerts: HighwayAlert[]
 *
 * @cli
 *   - searchHighwayAlerts: node dist/cli.mjs searchHighwayAlerts '{"StateRoute":"005"}'
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
import { zodFetchCustom } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { alertsSchema, type Alerts } from "@/schemas/wsdot-highway-alerts";

// =========================================================================
// API Function
// =========================================================================

/** Searches highway alerts using optional filters (falls back to all alerts) */
export const searchHighwayAlerts = async (
  params: SearchHighwayAlertsParams
): Promise<Alerts> => {
  // If no parameters are provided, use the simple endpoint
  if (Object.keys(params).length === 0) {
    return zodFetchCustom(
      "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson",
      {
        input: searchHighwayAlertsParamsSchema,
        output: alertsSchema,
      },
      {}
    );
  }

  // Otherwise, use the search endpoint with parameters
  return zodFetchCustom(
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
    {
      input: searchHighwayAlertsParamsSchema,
      output: alertsSchema,
    },
    params
  );
};

// =========================================================================
// Input Schema & Types
// =========================================================================

/** Params schema for searchHighwayAlerts */
export const searchHighwayAlertsParamsSchema = z.object({
  /** State route code (optional) */
  StateRoute: z.string().optional(),
  /** Region name (optional) */
  Region: z.string().optional(),
  /** Start time (JS Date, optional) */
  SearchTimeStart: z.date().optional(),
  /** End time (JS Date, optional) */
  SearchTimeEnd: z.date().optional(),
  /** Starting milepost (optional) */
  StartingMilepost: z.number().optional(),
  /** Ending milepost (optional) */
  EndingMilepost: z.number().optional(),
});

/** SearchHighwayAlerts params type */
export type SearchHighwayAlertsParams = z.infer<
  typeof searchHighwayAlertsParamsSchema
>;

// =========================================================================
// TanStack Query options
// =========================================================================

/** Returns options for searching alerts; polls every 60s */
export const searchHighwayAlertsOptions = createQueryOptions({
  apiFunction: searchHighwayAlerts,
  queryKey: ["wsdot", "highway-alerts", "searchHighwayAlerts"],
  cacheStrategy: "MINUTE_UPDATES",
});
