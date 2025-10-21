import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./activeSeasons.input";
import * as o from "./activeSeasons.output";

export const export const activeSeasonsResource = {: EndpointGroup 
  name: "active-seasons",
  resourceDescription:
    "Active scheduled seasons represent the current and available scheduling periods for Washington State Ferry routes. Each season defines the time period when specific schedules are active.",
  documentation: {
    resourceDescription: "Active scheduled seasons represent the current and available scheduling periods for Washington State Ferry routes. Each season defines the time period when specific schedules are active.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
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
