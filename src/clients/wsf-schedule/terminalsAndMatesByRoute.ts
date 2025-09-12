import { z } from "zod";
import { terminalsAndMatesByRouteSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getTerminalsAndMatesByRoute */
const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetTerminalsAndMatesByRoute params type */

/** Endpoint definition for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getTerminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
  inputSchema: getTerminalsAndMatesByRouteParamsSchema,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
