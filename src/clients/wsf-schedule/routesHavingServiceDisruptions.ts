import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesHavingServiceDisruptions */
const routesHavingServiceDisruptionsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsMeta: EndpointDefinition<
  RoutesHavingServiceDisruptionsInput,
  RouteBriefResponse[]
> = {
  id: "wsf-schedule/routesHavingServiceDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: routesHavingServiceDisruptionsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesHavingServiceDisruptionsInput = z.infer<
  typeof routesHavingServiceDisruptionsInput
>;
