import { z } from "zod";
import {
  type TerminalsAndMatesByRoute,
  terminalsAndMatesByRouteSchema,
} from "@/schemas/wsf-schedule";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

export const getTerminalsAndMatesByRoute = async (
  params: GetTerminalsAndMatesByRouteParams
): Promise<TerminalsAndMatesByRoute> =>
  zodFetch({
    endpoint:
      "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
    inputSchema: getTerminalsAndMatesByRouteParamsSchema,
    outputSchema: terminalsAndMatesByRouteSchema,
    params,
  });

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
