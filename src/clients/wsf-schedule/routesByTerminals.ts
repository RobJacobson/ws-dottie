import { z } from "zod";
import { routesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRoutesByScheduleTerminals */
export const getRoutesByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetRoutesByScheduleTerminals params type */
export type GetRoutesByScheduleTerminalsParams = z.infer<
  typeof getRoutesByScheduleTerminalsParamsSchema
>;

/** Endpoint definition for getRoutesByScheduleTerminals */
export const getRoutesByScheduleTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRoutesByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: getRoutesByScheduleTerminalsParamsSchema,
  outputSchema: routesArraySchema,
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});
