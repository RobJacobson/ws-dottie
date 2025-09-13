import { z } from "zod";
import { routeDetailsSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetails */
const routeDetailsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRouteDetails */
export const getRouteDetailsMeta = {
  api: "wsf-schedule",
  function: "getRouteDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: routeDetailsInput,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type RouteDetailsInput = z.infer<typeof routeDetailsInput>;
