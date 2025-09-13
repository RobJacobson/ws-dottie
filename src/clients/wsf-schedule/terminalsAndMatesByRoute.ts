import { z } from "zod";
import { terminalsAndMatesByRouteSchema } from "@/schemas/wsf-schedule";
import type { TerminalsAndMatesByRoute } from "@/schemas/wsf-schedule/terminalsAndMatesByRoute.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMatesByRoute */
const terminalsAndMatesByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteMeta: Endpoint<
  TerminalsAndMatesByRouteInput,
  TerminalsAndMatesByRoute
> = {
  api: "wsf-schedule",
  function: "getTerminalsAndMatesByRoute",
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
