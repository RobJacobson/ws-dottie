import { z } from "zod";

import {
  type TerminalsAndMatesByRoute,
  terminalsAndMatesByRouteSchema,
} from "@/schemas/wsf-schedule/terminalsAndMatesByRoute.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMatesByRoute */
const terminalsAndMatesByRouteInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  RouteID: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteMeta: EndpointDefinition<
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesByRoute
> = {
  api: "wsf-schedule",
  function: "terminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{TripDate}/{RouteID}",
  inputSchema: terminalsAndMatesByRouteInput,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteInput
>;
