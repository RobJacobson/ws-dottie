import { z } from "zod";
import { routesWithServiceDisruptionsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutesWithDisruptions params type */
export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

/** Endpoint definition for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRoutesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: getRoutesWithDisruptionsParamsSchema,
  outputSchema: routesWithServiceDisruptionsArraySchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
