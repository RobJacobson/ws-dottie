import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

// WSDOT Traffic Flow schemas
export const flowStationLocationSchema = z.object({
  Description: z.string(),
  Direction: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const trafficFlowSchema = z.object({
  FlowDataID: z.number(),
  FlowReadingValue: z.number(),
  FlowStationLocation: flowStationLocationSchema,
  Region: z.string(),
  StationName: z.string(),
  Time: dateSchema,
});

export const trafficFlowsArraySchema = z.array(trafficFlowSchema);

// Export all schemas
export const schemas = {
  flowStationLocation: flowStationLocationSchema,
  trafficFlow: trafficFlowSchema,
  trafficFlowsArray: trafficFlowsArraySchema,
} as const; 