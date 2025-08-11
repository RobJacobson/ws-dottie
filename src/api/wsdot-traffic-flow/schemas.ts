import { z } from "zod";

import { zWsdotDate } from "@/shared/validation";

export const flowStationLocationSchema = z
  .object({
    Description: z.string(),
    Direction: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown());

export const trafficFlowSchema = z
  .object({
    FlowDataID: z.number(),
    FlowReadingValue: z.number(),
    FlowStationLocation: flowStationLocationSchema,
    Region: z.string(),
    StationName: z.string(),
    Time: zWsdotDate(),
  })
  .catchall(z.unknown());

export const trafficFlowArraySchema = z.array(trafficFlowSchema);

export type FlowStationLocation = z.infer<typeof flowStationLocationSchema>;
export type TrafficFlow = z.infer<typeof trafficFlowSchema>;
