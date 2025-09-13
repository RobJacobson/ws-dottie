import { z } from "zod";
import { terminalsAndMatesByRouteSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalsAndMatesByRoute */
const terminalsAndMatesByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteMeta = {
  api: "wsf-schedule",
  function: "getTerminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
  inputSchema: terminalsAndMatesByRouteInput,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteInput
>;
