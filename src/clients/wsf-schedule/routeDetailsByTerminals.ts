import { z } from "zod";
import {
  routeDetailsSchema,
  type RouteDetails,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByTerminals */
const routeDetailsByTerminalsInput = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsMeta: Endpoint<
  RouteDetailsByTerminalsInput,
  RouteDetails
> = {
  api: "wsf-schedule",
  function: "getRouteDetailsByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routedetails/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: routeDetailsByTerminalsInput,
  outputSchema: routeDetailsSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type RouteDetailsByTerminalsInput = z.infer<
  typeof routeDetailsByTerminalsInput
>;
