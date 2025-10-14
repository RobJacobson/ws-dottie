import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const activeSeasonsResource = {
  name: "active-seasons",
  resourceDescription:
    "Active scheduled seasons represent the current and available scheduling periods for Washington State Ferry routes. Each season defines the time period when specific schedules are active.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getActiveSeasons: {
      function: "getActiveSeasons",
      endpoint: "/activeseasons",
      inputSchema: i.activeScheduledSeasonsSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {},
      endpointDescription: "Returns a list of all active scheduled seasons.",
    } satisfies EndpointDefinition<
      i.ActiveScheduledSeasonsInput,
      o.ScheduleBase[]
    >,
  },
};
