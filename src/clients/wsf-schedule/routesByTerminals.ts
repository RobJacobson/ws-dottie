import { z } from "zod";

import {
  type RouteBriefResponse,
  routeBriefResponseSchema,
} from "@/schemas/wsf-schedule/routeBriefResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesByTerminals */
const routesByTerminalsInput = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for the departing terminal. */
  departingTerminalId: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  arrivingTerminalId: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the arriving terminal."),
});

/** Endpoint metadata for getRoutesByTerminals */
export const getRoutesByTerminalsMeta: EndpointDefinition<
  RoutesByTerminalsInput,
  RouteBriefResponse[]
> = {
  id: "wsf-schedule:routesByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: routesByTerminalsInput,
  outputSchema: z.array(routeBriefResponseSchema),
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type RoutesByTerminalsInput = z.infer<typeof routesByTerminalsInput>;
