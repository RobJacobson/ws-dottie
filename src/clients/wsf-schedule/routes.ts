import { z } from "zod";
import { datesHelper } from "@/shared/utils";
import { routesSchema } from "../../schemas/wsf-schedule";

/** Input schema for getRoutes */
const routesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutes */
export const getRoutesMeta = {
  api: "wsf-schedule",
  function: "getRoutes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: routesInput,
  outputSchema: routesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type RoutesInput = z.infer<typeof routesInput>;
