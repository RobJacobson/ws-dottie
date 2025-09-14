import { z } from "zod";
import {
  type RouteDetails,
  routeDetailsSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByRoute */
const routeDetailsByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByRoute */
export const getRouteDetailsByRouteMeta: EndpointMeta<
  RouteDetailsByRouteInput,
  RouteDetails
> = {
  id: "wsf-schedule/routeDetailsByRoute",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
  inputSchema: routeDetailsByRouteInput,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RouteDetailsByRouteInput = z.infer<typeof routeDetailsByRouteInput>;
