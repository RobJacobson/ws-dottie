import { z } from "zod";

import {
  type RouteDetails,
  routeDetailsSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByRoute */
const routeDetailsByRouteInput = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a route. */
  routeId: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a route."),
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
