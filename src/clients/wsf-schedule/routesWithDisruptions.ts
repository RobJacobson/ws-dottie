import { z } from "zod";
import {
  type RoutesWithServiceDisruptionsArray,
  routesWithServiceDisruptionsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

export type RoutesWithDisruptions = RoutesWithServiceDisruptionsArray;

export const getRoutesWithDisruptions = async (
  params: GetRoutesWithDisruptionsParams
): Promise<RoutesWithDisruptions> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
    inputSchema: getRoutesWithDisruptionsParamsSchema,
    outputSchema: routesWithServiceDisruptionsArraySchema,
    params,
  });

export const routesWithDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesWithDisruptions,
  queryKey: ["wsf", "schedule", "routes", "getRoutesWithDisruptions"],
  cacheStrategy: "DAILY_STATIC",
});
