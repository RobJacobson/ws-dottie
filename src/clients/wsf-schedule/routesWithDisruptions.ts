import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesWithDisruptions */
const routesWithDisruptionsInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsMeta: EndpointDefinition<
  RoutesWithDisruptionsInput,
  RouteBriefResponse[]
> = {
  api: "wsf-schedule",
  function: "routesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{TripDate}",
  inputSchema: routesWithDisruptionsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesWithDisruptionsInput = z.infer<
  typeof routesWithDisruptionsInput
>;
