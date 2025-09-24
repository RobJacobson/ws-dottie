import { z } from "zod";

import {
  type RouteDetails,
  routeDetailsSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByRoute */
const routeDetailsByRouteInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByRoute */
export const getRouteDetailsByRouteMeta: EndpointDefinition<
  RouteDetailsByRouteInput,
  RouteDetails
> = {
  id: "wsf-schedule:routeDetailsByRoute",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
  inputSchema: routeDetailsByRouteInput,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type RouteDetailsByRouteInput = z.infer<typeof routeDetailsByRouteInput>;
