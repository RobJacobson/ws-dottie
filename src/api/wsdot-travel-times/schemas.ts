import { z } from "zod";

import { zWsdotDate } from "@/shared/validation";

export const travelTimeEndpointSchema = z
  .object({
    Description: z.string(),
    Direction: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    MilePost: z.number(),
    RoadName: z.string(),
  })
  .catchall(z.unknown());

export const travelTimeRouteSchema = z
  .object({
    AverageTime: z.number(),
    CurrentTime: z.number(),
    Description: z.string(),
    Distance: z.number(),
    EndPoint: travelTimeEndpointSchema,
    Name: z.string(),
    StartPoint: travelTimeEndpointSchema,
    TimeUpdated: zWsdotDate(),
    TravelTimeID: z.number(),
  })
  .catchall(z.unknown());

export const travelTimesArraySchema = z.array(travelTimeRouteSchema);

export type TravelTimeEndpoint = z.infer<typeof travelTimeEndpointSchema>;
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;
export type TravelTimesResponse = z.infer<typeof travelTimesArraySchema>;
