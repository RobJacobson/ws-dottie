import { z } from "zod";
import { routeBriefResponsesSchema, type RouteBriefResponse } from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutes */
const routesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutes */
export const getRoutesMeta: Endpoint<RoutesInput, RouteBriefResponse[]> = {
  api: "wsf-schedule",
  function: "getRoutes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: routesInput,
  outputSchema: routeBriefResponsesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RoutesInput = z.infer<typeof routesInput>;
