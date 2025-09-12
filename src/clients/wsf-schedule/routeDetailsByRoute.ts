import { z } from "zod";
import { routeDetailsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRouteDetailsByRoute */
const getRouteDetailsByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetRouteDetailsByRoute params type */

/** Endpoint definition for getRouteDetailsByRoute */
export const getRouteDetailsByRouteDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRouteDetailsByRoute",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
  inputSchema: getRouteDetailsByRouteParamsSchema,
  outputSchema: routeDetailsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
