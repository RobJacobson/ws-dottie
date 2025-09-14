import { z } from "zod";
import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesWithDisruptions */
const routesWithDisruptionsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsMeta: EndpointMeta<
  RoutesWithDisruptionsInput,
  RouteBriefResponse[]
> = {
  id: "wsf-schedule/routesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: routesWithDisruptionsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RoutesWithDisruptionsInput = z.infer<
  typeof routesWithDisruptionsInput
>;
