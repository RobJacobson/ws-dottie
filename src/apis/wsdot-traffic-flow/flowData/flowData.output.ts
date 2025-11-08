/**
 * @fileoverview WSDOT Traffic Flow API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Traffic Flow API, which provides real-time traffic flow data for the entire state.
 */

import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for FlowData - represents a traffic flow station
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const flowDataSchema = z
  .object({
    FlowDataID: z
      .number()
      .describe(
        "Unique traffic flow station identifier, as an integer ID. E.g., '2482' for Homeacres Rd eastbound station, '4828' for Bickford Ave westbound station, '2483' for Homeacres Rd westbound station. Used as primary key for flow station identification and lookups."
      ),
    FlowReadingValue: z
      .union([
        z.literal(0),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ])
      .describe(
        "Current traffic flow condition at station, as a flow status code. Valid values: 0 (Unknown), 1 (WideOpen), 2 (Moderate), 3 (Heavy), 4 (StopAndGo), 5 (NoData). E.g., '1' indicates wide open traffic flow with no congestion, '2' indicates moderate traffic, '3' indicates heavy traffic, '4' indicates stop-and-go conditions. Used for traffic condition assessment and congestion monitoring."
      ),
    FlowStationLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location information for traffic flow station, as a roadway location object. E.g., SR-2 (RoadName '002') at milepost 0.68 eastbound near Homeacres Rd, SR-2 at milepost 3.6 westbound near Bickford Ave, null when location data is unavailable. Provides route, milepost, and direction information for station positioning."
      ),
    Region: z
      .string()
      .nullable()
      .describe(
        "WSDOT region that maintains traffic flow station, as a region name. E.g., 'Northwest' for stations in northwest region, null when region is not specified. Used for regional station organization and maintenance tracking."
      ),
    StationName: z
      .string()
      .nullable()
      .describe(
        "Unique name identifier for traffic flow station, as a station code. E.g., '002es00068' for SR-2 eastbound station at milepost 0.68, '002es00360' for SR-2 eastbound station at milepost 3.6, null when station name is unavailable. Format typically combines route, direction, and milepost information."
      ),
    Time: zDotnetDate().describe(
      "Timestamp when traffic flow reading was taken, as a UTC datetime. E.g., '2025-11-02T19:25:22.000Z' for reading at 7:25 PM on November 2, 2025. Indicates data freshness and when flow measurement occurred. Updates every 90 seconds."
    ),
  })
  .describe(
    "Represents real-time traffic flow data from flow sensor stations including flow condition status, station location, region, and measurement timestamp. E.g., station 2482 (002es00068) on SR-2 at milepost 0.68 eastbound with wide open flow (value 1) measured at 7:25 PM. Used for traffic monitoring, congestion detection, and flow analysis. Data updated every 90 seconds statewide."
  );

export type FlowData = z.infer<typeof flowDataSchema>;
