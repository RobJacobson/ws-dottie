import { z } from "zod";

import {
  type RouteDetailsList,
  routeDetailsListSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetails */
const routeDetailsInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getRouteDetails */
export const getRouteDetailsMeta: EndpointDefinition<
  RouteDetailsListInput,
  RouteDetailsList
> = {
  id: "wsf-schedule:routeDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: routeDetailsInput,
  outputSchema: routeDetailsListSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RouteDetailsListInput = z.infer<typeof routeDetailsInput>;
