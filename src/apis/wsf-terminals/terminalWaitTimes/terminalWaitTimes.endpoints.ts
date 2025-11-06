import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalWaitTimes.input";
import * as o from "./terminalWaitTimes.output";

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
    getTerminalWaitTimes: {
      function: "getTerminalWaitTimes",
      endpoint: "/terminalWaitTimes",
      inputSchema: i.terminalWaitTimesInputSchema,
      outputSchema: z.array(o.terminalWaitTimeSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalWaitTime objects for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesInput,
      o.TerminalWaitTime[]
    >,
    getTerminalWaitTimesByTerminalId: {
      function: "getTerminalWaitTimesByTerminalId",
      endpoint: "/terminalWaitTimes/{TerminalID}",
      inputSchema: i.terminalWaitTimesByIdInputSchema,
      outputSchema: o.terminalWaitTimeSchema,
      sampleParams: { TerminalID: 11 },
      endpointDescription:
        "Returns a single TerminalWaitTime object for specified terminal.",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesByIdInput,
      o.TerminalWaitTime
    >,
  },
} satisfies EndpointGroup;
