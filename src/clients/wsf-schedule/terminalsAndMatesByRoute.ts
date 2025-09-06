import { z } from "zod";
import {
  type TerminalsAndMatesByRoute,
  terminalsAndMatesByRouteSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

export const getTerminalsAndMatesByRoute = zodFetch<
  GetTerminalsAndMatesByRouteParams,
  TerminalsAndMatesByRoute
>(
  ENDPOINT,
  getTerminalsAndMatesByRouteParamsSchema,
  terminalsAndMatesByRouteSchema
);

export const terminalsAndMatesByRouteOptions = createQueryOptions({
  apiFunction: getTerminalsAndMatesByRoute,
  queryKey: [
    "wsf",
    "schedule",
    "terminalsandmatesbyroute",
    "getTerminalsAndMatesByRoute",
  ],
  cacheStrategy: "DAILY_STATIC",
});
