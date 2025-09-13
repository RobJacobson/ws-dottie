import { z } from "zod";
import { routesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRoutesByTerminals */
const routesByTerminalsInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getRoutesByTerminals */
export const getRoutesByTerminalsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getRoutesByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
  inputSchema: routesByTerminalsInput,
  outputSchema: routesSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type RoutesByTerminalsInput = z.infer<typeof routesByTerminalsInput>;
