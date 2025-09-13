import { z } from "zod";
import { routeDetailsSchema, type RouteDetails } from "@/schemas/wsf-schedule/routeDetails.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetails */
const routeDetailsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRouteDetails */
export const getRouteDetailsMeta: Endpoint<RouteDetailsInput, RouteDetails> = {
  api: "wsf-schedule",
  function: "getRouteDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: routeDetailsInput,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RouteDetailsInput = z.infer<typeof routeDetailsInput>;
