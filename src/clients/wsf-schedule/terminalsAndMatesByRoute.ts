import { z } from "zod";
import {
  type TerminalsAndMatesByRoute,
  terminalsAndMatesByRouteSchema,
} from "@/schemas/wsf-schedule/terminalsAndMatesByRoute.zod";
import type { EndpointMeta } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMatesByRoute */
const terminalsAndMatesByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteMeta: EndpointMeta<
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesByRoute
> = {
  id: "wsf-schedule/terminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
  inputSchema: terminalsAndMatesByRouteInput,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteInput
>;
