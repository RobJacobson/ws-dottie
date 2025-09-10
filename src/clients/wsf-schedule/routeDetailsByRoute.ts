import { z } from "zod";
import { routeDetailsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRouteDetailsByRoute */
export const getRouteDetailsByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetRouteDetailsByRoute params type */
export type GetRouteDetailsByRouteParams = z.infer<
  typeof getRouteDetailsByRouteParamsSchema
>;

/** Endpoint definition for getRouteDetailsByRoute */
export const getRouteDetailsByRouteDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRouteDetailsByRoute",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}/{routeId}",
  inputSchema: getRouteDetailsByRouteParamsSchema,
  outputSchema: routeDetailsArraySchema,
  sampleParams: { tripDate: getSampleDates().tomorrow, routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
