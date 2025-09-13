import { z } from "zod";
import { routesSchema } from "../../schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutes */
const routesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutes */
export const getRoutesMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: routesInput,
  outputSchema: routesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type RoutesInput = z.infer<typeof routesInput>;
