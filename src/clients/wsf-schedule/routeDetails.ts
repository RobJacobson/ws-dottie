import { z } from "zod";
import { routeDetailsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRouteDetails */
const getRouteDetailsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRouteDetails params type */

/** Endpoint definition for getRouteDetails */
export const getRouteDetailsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRouteDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: getRouteDetailsParamsSchema,
  outputSchema: routeDetailsArraySchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
