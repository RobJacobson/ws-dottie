import { z } from "zod";

import {
  type RouteDetailsList,
  routeDetailsListSchema,
} from "@/schemas/wsf-schedule/routeDetails.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByTerminals */
const routeDetailsByTerminalsInput = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for the departing terminal. */
  DepartingScheduleTerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingScheduleTerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the arriving terminal."),
});

/** Endpoint metadata for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsMeta: EndpointDefinition<
  RouteDetailsByTerminalsInput,
  RouteDetailsList
> = {
  api: "wsf-schedule",
  function: "routeDetailsByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routedetails/{TripDate}/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID}",
  inputSchema: routeDetailsByTerminalsInput,
  outputSchema: routeDetailsListSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingScheduleTerminalID: 1,
    ArrivingScheduleTerminalID: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type RouteDetailsByTerminalsInput = z.infer<
  typeof routeDetailsByTerminalsInput
>;
