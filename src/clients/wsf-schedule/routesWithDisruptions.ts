import { z } from "zod";
import { routeBriefResponseSchema, type RouteBriefResponse } from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesWithDisruptions */
const routesWithDisruptionsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsMeta: Endpoint<
  RoutesWithDisruptionsInput,
  RouteBriefResponse[]
> = {
  api: "wsf-schedule",
  function: "getRoutesWithDisruptions",
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
