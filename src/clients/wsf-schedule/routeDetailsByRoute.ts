import { z } from "zod";
import { routeDetailsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByRoute */
const routeDetailsByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByRoute */
export const getRouteDetailsByRouteMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getRouteDetailsByRoute",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
  inputSchema: routeDetailsByRouteInput,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type RouteDetailsByRouteInput = z.infer<typeof routeDetailsByRouteInput>;
