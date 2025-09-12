import { z } from "zod";
import { routeDetailsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getRouteDetailsByTerminals */
const getRouteDetailsByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetRouteDetailsByTerminals params type */

/** Endpoint definition for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getRouteDetailsByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routedetails/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: getRouteDetailsByTerminalsParamsSchema,
  outputSchema: routeDetailsArraySchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});
