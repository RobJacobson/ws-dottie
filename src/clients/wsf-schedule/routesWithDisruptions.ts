import { z } from "zod";
import {
  type RoutesWithServiceDisruptionsArray,
  routesWithServiceDisruptionsArraySchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

export type RoutesWithDisruptions = RoutesWithServiceDisruptionsArray;

const ENDPOINT_WITH_DISRUPTIONS =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesWithDisruptions = zodFetch<
  GetRoutesWithDisruptionsParams,
  RoutesWithDisruptions
>(
  ENDPOINT_WITH_DISRUPTIONS,
  getRoutesWithDisruptionsParamsSchema,
  routesWithServiceDisruptionsArraySchema
);

export const routesWithDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesWithDisruptions,
  queryKey: ["wsf", "schedule", "routes", "getRoutesWithDisruptions"],
  cacheStrategy: "DAILY_STATIC",
});
