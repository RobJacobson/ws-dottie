import { z } from "zod";
import {
  type RouteDetailsList,
  routeDetailsListSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetails */
const routeDetailsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRouteDetails */
export const getRouteDetailsMeta: EndpointDefinition<
  RouteDetailsListInput,
  RouteDetailsList
> = {
  id: "wsf-schedule/routeDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: routeDetailsInput,
  outputSchema: routeDetailsListSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RouteDetailsListInput = z.infer<typeof routeDetailsInput>;
