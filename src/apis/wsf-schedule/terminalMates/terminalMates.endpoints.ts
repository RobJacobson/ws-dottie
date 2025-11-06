import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/factories";
import { z } from "@/shared/zod-openapi-init";
import type { TerminalMatesInput } from "./terminalMates.input";
import { terminalMatesInputSchema } from "./terminalMates.input";
import type { Terminal } from "./terminalMates.output";
import { terminalSchema } from "./terminalMates.output";

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
      inputSchema: terminalMatesInputSchema,
      outputSchema: z.array(terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns multiple of Terminal for specified trip date and terminal ID.",
    } satisfies EndpointDefinition<TerminalMatesInput, Terminal[]>,
  },
} satisfies EndpointGroup;
