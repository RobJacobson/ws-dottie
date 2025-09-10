import { z } from "zod";
import { routesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRoutes */
export const getRoutesParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutes params type */
export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;

/** Endpoint definition for getRoutes */
export const getRoutesDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRoutes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: getRoutesParamsSchema,
  outputSchema: routesArraySchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
