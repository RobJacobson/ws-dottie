import { z } from "zod";
import {
  type RoutesWithServiceDisruptions,
  routesWithServiceDisruptionsSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getRoutesHavingServiceDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesHavingServiceDisruptionsParams = z.infer<
  typeof getRoutesHavingServiceDisruptionsParamsSchema
>;

const ENDPOINT =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesHavingServiceDisruptions = zodFetch<
  GetRoutesHavingServiceDisruptionsParams,
  RoutesWithServiceDisruptions
>(
  ENDPOINT,
  getRoutesHavingServiceDisruptionsParamsSchema,
  routesWithServiceDisruptionsSchema
);

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
