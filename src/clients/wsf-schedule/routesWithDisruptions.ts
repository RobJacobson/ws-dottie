import { z } from "zod";
import { routesWithServiceDisruptionsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRoutesWithDisruptions */
const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRoutesWithDisruptions params type */

/** Endpoint definition for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: getRoutesWithDisruptionsParamsSchema,
  outputSchema: routesWithServiceDisruptionsArraySchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
