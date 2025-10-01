import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesHavingServiceDisruptions */
const routesHavingServiceDisruptionsInput = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

/** Endpoint metadata for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsMeta: EndpointDefinition<
  RoutesHavingServiceDisruptionsInput,
  RouteBriefResponse[]
> = {
  api: "wsf-schedule",
  function: "routesHavingServiceDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{TripDate}",
  inputSchema: routesHavingServiceDisruptionsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesHavingServiceDisruptionsInput = z.infer<
  typeof routesHavingServiceDisruptionsInput
>;
