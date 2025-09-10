import { z } from "zod";
import { routeDetailsArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getRouteDetails */
export const getRouteDetailsParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetRouteDetails params type */
export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;

/** Endpoint definition for getRouteDetails */
export const getRouteDetailsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getRouteDetails",
  endpoint: "/ferries/api/schedule/rest/routedetails/{tripDate}",
  inputSchema: getRouteDetailsParamsSchema,
  outputSchema: routeDetailsArraySchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
