/**
 * @fileoverview WSDOT Traffic Flow API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Traffic Flow API, which provides real-time traffic flow data for the entire state.
 */

import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for FlowData - represents a traffic flow station
 *
 * Provides real-time data on Traffic Flow sensors for the entire state. Data is updated every 90 seconds. Coverage Area: Statewide.
 */
export const flowDataSchema = z
  .object({
    FlowDataID: z.number().describe("Numeric ID of the traffic flow station."),
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
        "Code indicating traffic flow condition: 0 = Unknown, 1 = WideOpen, 2 = Moderate, 3 = Heavy, 4 = StopAndGo, 5 = NoData."
      ),
    FlowStationLocation: roadwayLocationSchema
      .nullable()
      .describe("Roadway location information for the traffic flow station."),
    Region: z
      .string()
      .nullable()
      .describe("WSDOT region that maintains the traffic flow station."),
    StationName: z
      .string()
      .nullable()
      .describe(
        "Station identifier code combining route, direction, and milepost."
      ),
    Time: z.date().describe(
      "UTC datetime when the traffic flow reading was taken."
    ),
  })
  .describe(
    "Real-time traffic flow data from a sensor station, including flow condition, location, region, and measurement timestamp."
  );

export type FlowData = z.infer<typeof flowDataSchema>;
