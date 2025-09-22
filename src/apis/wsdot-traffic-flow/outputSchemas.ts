/**
 * @fileoverview WSDOT Traffic Flow API Output Schemas
 *
 * This module provides Zod schemas for validating responses from the WSDOT
 * Traffic Flow API, which provides real-time traffic flow data for the entire state.
 */

import { z } from "zod";

import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared";

/**
 * Schema for FlowData - represents a traffic flow station
 *
 * A data structure that represents a Flow Station. Provides real-time data on
 * Traffic Flow sensors for the entire state. Data is updated every 90 seconds.
 */
export const flowDataSchema = z.object({
  FlowDataID: z
    .number()
    .describe("A unique ID that identifies a specific station."),
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
      "The current traffic condition at the flow station. (0 = Unknown, 1 = WideOpen, 2 = Moderate, 3 = Heavy, 4 = StopAndGo, 5 = NoData)"
    ),
  FlowStationLocation: roadwayLocationSchema
    .nullable()
    .describe("The location of the flow station."),
  Region: z
    .string()
    .nullable()
    .describe("The region that maintains the flow station."),
  StationName: z.string().nullable().describe("The name of the flow station."),
  Time: zWsdotDate().describe("The time of the station reading."),
});

export type FlowData = z.infer<typeof flowDataSchema>;

/**
 * Schema for FlowDataList - the main response list for GetTrafficFlows
 */
export const flowDataListSchema = z.array(flowDataSchema);

export type FlowDataList = z.infer<typeof flowDataListSchema>;
