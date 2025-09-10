import { z } from "zod";
import { terminalsAndMatesByRouteSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetTerminalsAndMatesByRoute params type */
export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

/** Endpoint definition for getTerminalsAndMatesByRoute */
export const getTerminalsAndMatesByRouteDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getTerminalsAndMatesByRoute",
  endpoint:
    "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}",
  inputSchema: getTerminalsAndMatesByRouteParamsSchema,
  outputSchema: terminalsAndMatesByRouteSchema,
  sampleParams: { tripDate: getSampleDates().tomorrow, routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
