import { z } from "zod";
import { routeDetailsSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getRouteDetailsByTerminals */
const routeDetailsByTerminalsInput = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getRouteDetailsByTerminals */
export const getRouteDetailsByTerminalsMeta = {
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
} as const;

// Type exports
export type RouteDetailsByTerminalsInput = z.infer<
  typeof routeDetailsByTerminalsInput
>;
