import { z } from "zod";

import {
  type RouteDetailsList,
  routeDetailsListSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByTerminals */
const routeDetailsByTerminalsInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsMeta: EndpointDefinition<
  RouteDetailsByTerminalsInput,
  RouteDetailsList
> = {
  id: "wsf-schedule:routeDetailsByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routedetails/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: routeDetailsByTerminalsInput,
  outputSchema: routeDetailsListSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type RouteDetailsByTerminalsInput = z.infer<
  typeof routeDetailsByTerminalsInput
>;
