import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./terminalMates.input";
import * as o from "./terminalMates.output";

export const export const scheduleTerminalMatesResource = {: EndpointGroup 
  name: "schedule-terminal-mates",
  resourceDescription:
    "Terminal mates represent terminals that can be used interchangeably or as alternatives for ferry departures and arrivals,
  documentation: {
    resourceDescription: "Terminal mates represent terminals that can be used interchangeably or as alternatives for ferry departures and arrivals, providing flexibility in route planning.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalMates: {
      function: "getTerminalMates",
      endpoint: "/terminalmates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns terminal mates for the specified trip date and terminal ID.",
    } satisfies EndpointDefinition<i.ScheduleTerminalMatesInput, o.Terminal[]>,
  },
};
