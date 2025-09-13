import { z } from "zod";
import { routesWithServiceDisruptionsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesHavingServiceDisruptions */
const routesHavingServiceDisruptionsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesHavingServiceDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: routesHavingServiceDisruptionsInput,
  outputSchema: routesWithServiceDisruptionsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type RoutesHavingServiceDisruptionsInput = z.infer<
  typeof routesHavingServiceDisruptionsInput
>;
