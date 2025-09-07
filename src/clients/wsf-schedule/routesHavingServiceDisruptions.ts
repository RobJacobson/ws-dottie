import { z } from "zod";
import {
  type RoutesWithServiceDisruptions,
  routesWithServiceDisruptionsSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesHavingServiceDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesHavingServiceDisruptionsParams = z.infer<
  typeof getRoutesHavingServiceDisruptionsParamsSchema
>;

export const getRoutesHavingServiceDisruptions = async (
  params: GetRoutesHavingServiceDisruptionsParams
): Promise<RoutesWithServiceDisruptions> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}",
    inputSchema: getRoutesHavingServiceDisruptionsParamsSchema,
    outputSchema: routesWithServiceDisruptionsSchema,
    params,
  });

export const routesHavingServiceDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesHavingServiceDisruptions,
  queryKey: [
    "wsf",
    "schedule",
    "routeshavingservicedisruptions",
    "getRoutesHavingServiceDisruptions",
  ],
  cacheStrategy: "DAILY_STATIC",
});
