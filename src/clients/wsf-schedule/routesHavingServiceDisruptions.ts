import { z } from "zod";
import { routesWithServiceDisruptionsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutesHavingServiceDisruptions params type */
export type GetRoutesHavingServiceDisruptionsParams = z.infer<
  typeof getRoutesHavingServiceDisruptionsParamsSchema
>;

/** Endpoint definition for getRoutesHavingServiceDisruptions */
export const getRoutesHavingServiceDisruptionsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRoutesHavingServiceDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: getRoutesHavingServiceDisruptionsParamsSchema,
  outputSchema: routesWithServiceDisruptionsSchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
