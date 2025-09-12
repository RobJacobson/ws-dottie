import { z } from "zod";
import { routesWithServiceDisruptionsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRoutesHavingServiceDisruptions */
const getRoutesHavingServiceDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutesHavingServiceDisruptions params type */

/** Endpoint definition for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesHavingServiceDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: getRoutesHavingServiceDisruptionsParamsSchema,
  outputSchema: routesWithServiceDisruptionsArraySchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
