import { z } from "zod";
import {
  type RouteBriefResponse,
  routeBriefResponsesSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutes */
const routesInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutes */
export const getRoutesMeta: EndpointMeta<RoutesInput, RouteBriefResponse[]> = {
  id: "wsf-schedule/routes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: routesInput,
  outputSchema: routeBriefResponsesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RoutesInput = z.infer<typeof routesInput>;
