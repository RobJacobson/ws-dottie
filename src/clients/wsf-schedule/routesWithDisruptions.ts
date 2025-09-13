import { z } from "zod";
import { routesWithServiceDisruptionsSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesWithDisruptions */
const routesWithDisruptionsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getRoutesWithDisruptions */
export const getRoutesWithDisruptionsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesWithDisruptions",
  endpoint:
    "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
  inputSchema: routesWithDisruptionsInput,
  outputSchema: routesWithServiceDisruptionsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type RoutesWithDisruptionsInput = z.infer<
  typeof routesWithDisruptionsInput
>;
