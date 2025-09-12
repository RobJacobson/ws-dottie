import { z } from "zod";
import { routesArraySchema } from "../../schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRoutes */
const getRoutesParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutes params type */
export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;

/** Endpoint definition for getRoutes */
export const getRoutesDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: getRoutesParamsSchema,
  outputSchema: routesArraySchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
