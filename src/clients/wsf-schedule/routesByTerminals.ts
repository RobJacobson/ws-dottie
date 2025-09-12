import { z } from "zod";
import { routesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRoutesByTerminals */
const getRoutesByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** GetRoutesByTerminals params type */

/** Endpoint definition for getRoutesByTerminals */
export const getRoutesByTerminalsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: getRoutesByTerminalsParamsSchema,
  outputSchema: routesArraySchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});
