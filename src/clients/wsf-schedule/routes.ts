import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponsesSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutes */
const routesInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getRoutes */
export const getRoutesMeta: EndpointDefinition<
  RoutesInput,
  RouteBriefResponse[]
> = {
  id: "wsf-schedule:routes",
  endpoint: "/ferries/api/schedule/rest/routes/{tripDate}",
  inputSchema: routesInput,
  outputSchema: routeBriefResponsesSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesInput = z.infer<typeof routesInput>;
