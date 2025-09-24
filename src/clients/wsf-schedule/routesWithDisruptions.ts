import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesWithDisruptions */
const routesWithDisruptionsInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsMeta: EndpointDefinition<
  RoutesWithDisruptionsInput,
  RouteBriefResponse[]
> = {
  id: "wsf-schedule:routesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: routesWithDisruptionsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesWithDisruptionsInput = z.infer<
  typeof routesWithDisruptionsInput
>;
