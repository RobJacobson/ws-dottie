import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalMates.input";
import * as o from "./terminalMates.output";

export const scheduleTerminalMatesResource = {
  name: "schedule-terminal-mates",
  documentation: {
    resourceDescription:
      "Each TerminalMate item represents terminals that can be used interchangeably or as alternatives for ferry departures and arrivals, providing flexibility in route planning.",
    businessContext:
      "Use to find alternative terminal options by providing terminal ID and date information for flexible route selection.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalMates: {
      function: "getTerminalMates",
      endpoint: "/terminalmates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns multiple of Terminal for specified trip date and terminal ID.",
    } satisfies EndpointDefinition<i.ScheduleTerminalMatesInput, o.Terminal[]>,
  },
} satisfies EndpointGroup;
