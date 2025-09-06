import { z } from "zod";
import { type RoutesArray, routesArraySchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRoutesByScheduleTerminalsParams = z.infer<
  typeof getRoutesByScheduleTerminalsParamsSchema
>;

export type Routes = RoutesArray;

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getRoutesByScheduleTerminals = zodFetch<
  GetRoutesByScheduleTerminalsParams,
  Routes
>(
  ENDPOINT_BY_TERMINALS,
  getRoutesByScheduleTerminalsParamsSchema,
  routesArraySchema
);

export const routesByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRoutesByScheduleTerminals,
  queryKey: ["wsf", "schedule", "routes", "getRoutesByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
