import { z } from "zod";
import { datesHelper } from "@/shared/utils";
import { createApiDefinition } from "../utils";
import {
  cacheFlushDateSchema,
  routeDetailSchema,
  routesListSchema,
  sailingsListSchema,
  schedulesListSchema,
} from "./original/outputSchemas.original";

export const wsfScheduleApi = createApiDefinition("wsf-schedule", [
  {
    function: "activeSeasons",
    endpoint: "/ferries/api/schedule/rest/activeseasons",
    inputSchema: z.object({}).strict(),
    outputSchema: schedulesListSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "allSailings",
    endpoint: "/ferries/api/schedule/rest/allsailings/{SchedRouteID}/{Y}",
    inputSchema: z.object({
      /** Unique identifier for a scheduled route. */
      SchedRouteID: z
        .number()
        .int()
        .positive()
        .describe("Unique identifier for a scheduled route."),
      /** Parameter Y for the request. */
      Y: z.number().int().describe("Parameter Y for the request."),
    }),
    outputSchema: sailingsListSchema,
    sampleParams: { SchedRouteID: 2327, Y: 1 },
    cacheStrategy: "STATIC",
  },
  {
    function: "cacheFlushDate",
    endpoint: "/ferries/api/schedule/rest/cacheflushdate",
    inputSchema: z.object({}).strict(),
    outputSchema: cacheFlushDateSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "routeDetails",
    endpoint: "/ferries/api/schedule/rest/routedetails/{TripDate}",
    inputSchema: z.object({
      /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
      TripDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
        .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    }),
    outputSchema: routesListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "routeDetailsByRoute",
    endpoint: "/ferries/api/schedule/rest/routedetails/{TripDate}/{RouteID}",
    inputSchema: z.object({
      /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
      TripDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
        .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
      /** Unique identifier for a route. */
      RouteID: z
        .number()
        .int()
        .positive()
        .describe("Unique identifier for a route."),
    }),
    outputSchema: routeDetailSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
    cacheStrategy: "STATIC",
  },
]);
