import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type TerminalWaitTimesByIdInput,
  type TerminalWaitTimesInput,
  terminalWaitTimesByIdInputSchema,
  terminalWaitTimesInputSchema,
} from "./terminalWaitTimes.input";
import {
  type TerminalWaitTime,
  terminalWaitTimeSchema,
} from "./terminalWaitTimes.output";

export const terminalWaitTimesResource = {
  name: "terminal-wait-times",
  documentation: {
    resourceDescription:
      "Each TerminalWaitTime item represents current wait conditions and travel tips for both vehicles and walk-on passengers at Washington State Ferry terminals. These items include estimated wait times for different vehicle types, capacity constraints, and travel recommendations.",
    businessContext:
      "Use to plan ferry terminal arrivals by providing current terminal conditions and vehicle capacity information for optimal departure timing.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTerminalWaitTimes: {
      endpoint: "/terminalWaitTimes",
      inputSchema: terminalWaitTimesInputSchema,
      outputSchema: z.array(terminalWaitTimeSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalWaitTime objects for all terminals.",
    } satisfies EndpointDefinition<TerminalWaitTimesInput, TerminalWaitTime[]>,
    fetchTerminalWaitTimesByTerminalId: {
      endpoint: "/terminalWaitTimes/{TerminalID}",
      inputSchema: terminalWaitTimesByIdInputSchema,
      outputSchema: terminalWaitTimeSchema,
      sampleParams: { TerminalID: 11 },
      endpointDescription:
        "Returns a single TerminalWaitTime object for specified terminal.",
    } satisfies EndpointDefinition<
      TerminalWaitTimesByIdInput,
      TerminalWaitTime
    >,
  },
} satisfies EndpointGroup;
