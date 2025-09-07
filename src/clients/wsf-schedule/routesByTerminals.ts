import { z } from "zod";
import { type RoutesArray, routesArraySchema } from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRoutesByScheduleTerminalsParams = z.infer<
  typeof getRoutesByScheduleTerminalsParamsSchema
>;

export const getRoutesByScheduleTerminals = async (
  params: GetRoutesByScheduleTerminalsParams
): Promise<RoutesArray> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
    inputSchema: getRoutesByScheduleTerminalsParamsSchema,
    outputSchema: routesArraySchema,
    params,
  });

export const routesByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRoutesByScheduleTerminals,
  queryKey: ["wsf", "schedule", "routes", "getRoutesByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
