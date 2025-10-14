import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Time adjustments represent modifications to scheduled sailing times, including delays, early departures, and other timing changes that affect the published schedule.";

export const timeAdjustmentsResource = {
  name: "time-adjustments",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTimeAdjustments",
      endpoint: "/timeadj",
      inputSchema: i.timeAdjSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns all time adjustments. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TimeAdjInput, o.TimeAdjustment[]>,
    byRoute: {
      function: "getTimeAdjustmentsByRoute",
      endpoint: "/timeadjbyroute/{RouteID}",
      inputSchema: i.timeAdjByRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { RouteID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns time adjustments for the specified route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TimeAdjByRouteInput, o.TimeAdjustment[]>,
    bySchedRoute: {
      function: "getTimeAdjustmentsBySchedRoute",
      endpoint: "/timeadjbyschedroute/{SchedRouteID}",
      inputSchema: i.timeAdjBySchedRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: `Returns time adjustments for the specified scheduled route ID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TimeAdjBySchedRouteInput,
      o.TimeAdjustment[]
    >,
  },
};
