import { z } from "zod";
import { routeDetailsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRouteDetailsByScheduleTerminals */
export const getRouteDetailsByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetRouteDetailsByScheduleTerminals params type */
export type GetRouteDetailsByScheduleTerminalsParams = z.infer<
  typeof getRouteDetailsByScheduleTerminalsParamsSchema
>;

/** Endpoint definition for getRouteDetailsByScheduleTerminals */
export const getRouteDetailsByScheduleTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRouteDetailsByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: getRouteDetailsByScheduleTerminalsParamsSchema,
  outputSchema: routeDetailsArraySchema,
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});
