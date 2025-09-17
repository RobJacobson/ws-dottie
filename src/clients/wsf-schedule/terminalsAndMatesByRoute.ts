import { z } from "zod";
import {
  type TerminalsAndMatesByRoute,
  terminalsAndMatesByRouteSchema,
} from "@/schemas/wsf-schedule/terminalsAndMatesByRoute.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMatesByRoute */
const terminalsAndMatesByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteMeta: EndpointDefinition<
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesByRoute
> = {
  id: "wsf-schedule/terminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
  inputSchema: terminalsAndMatesByRouteInput,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteInput
>;
