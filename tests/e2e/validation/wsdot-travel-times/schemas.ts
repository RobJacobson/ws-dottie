import { z } from "zod";

// Base schemas for common patterns
export const dateSchema = z.union([
  z.date(),
  z.string().transform((val) => new Date(val)),
  z.number().transform((val) => new Date(val)),
]);

// WSDOT Travel Times schemas
export const travelTimeEndpointSchema = z.object({
  Description: z.string(),
  Direction: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  MilePost: z.number(),
  RoadName: z.string(),
});

export const travelTimeRouteSchema = z.object({
  AverageTime: z.number(),
  CurrentTime: z.number(),
  Description: z.string(),
  Distance: z.number(),
  EndPoint: travelTimeEndpointSchema,
  Name: z.string(),
  StartPoint: travelTimeEndpointSchema,
  TimeUpdated: dateSchema,
  TravelTimeID: z.number(),
});

export const travelTimesArraySchema = z.array(travelTimeRouteSchema);

// Export all schemas
export const schemas = {
  travelTimeEndpoint: travelTimeEndpointSchema,
  travelTimeRoute: travelTimeRouteSchema,
  travelTimesArray: travelTimesArraySchema,
} as const; 