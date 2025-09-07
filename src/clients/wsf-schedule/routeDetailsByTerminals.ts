import { z } from "zod";
import {
  type RouteDetailsArray,
  routeDetailsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getRouteDetailsByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRouteDetailsByScheduleTerminalsParams = z.infer<
  typeof getRouteDetailsByScheduleTerminalsParamsSchema
>;

export const getRouteDetailsByScheduleTerminals = async (
  params: GetRouteDetailsByScheduleTerminalsParams
): Promise<RouteDetailsArray> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
    inputSchema: getRouteDetailsByScheduleTerminalsParamsSchema,
    outputSchema: routeDetailsArraySchema,
    params,
  });

export const routeDetailsByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRouteDetailsByScheduleTerminals,
  queryKey: [
    "wsf",
    "schedule",
    "routeDetails",
    "getRouteDetailsByScheduleTerminals",
  ],
  cacheStrategy: "DAILY_STATIC",
});
