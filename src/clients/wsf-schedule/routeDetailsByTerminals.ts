import { z } from "zod";
import {
  type RouteDetailsArray,
  routeDetailsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getRouteDetailsByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRouteDetailsByScheduleTerminalsParams = z.infer<
  typeof getRouteDetailsByScheduleTerminalsParamsSchema
>;

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getRouteDetailsByScheduleTerminals = zodFetch<
  GetRouteDetailsByScheduleTerminalsParams,
  RouteDetailsArray
>(
  ENDPOINT_BY_TERMINALS,
  getRouteDetailsByScheduleTerminalsParamsSchema,
  routeDetailsArraySchema
);

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
