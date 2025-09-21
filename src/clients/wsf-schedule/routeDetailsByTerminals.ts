import { z } from "zod";

import {
  type RouteDetailsList,
  routeDetailsListSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByTerminals */
const routeDetailsByTerminalsInput = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsMeta: EndpointDefinition<
  RouteDetailsByTerminalsInput,
  RouteDetailsList
> = {
  id: "wsf-schedule/routeDetailsByTerminals",
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
