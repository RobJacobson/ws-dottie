import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const terminalWaitTimesResource = {
  name: "terminal-wait-times",
  resourceDescription:
    "Contains tips and wait time conditions for both vehicles and walk-on passengers at terminals. This information helps travelers understand current conditions and wait times at specific terminals. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalWaitTimes: {
      function: "getTerminalWaitTimes",
      endpoint: "/terminalWaitTimes",
      inputSchema: i.terminalWaitTimesSchema,
      outputSchema: z.array(o.terminalWaitTimeSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalWaitTime data for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesInput,
      o.TerminalWaitTime[]
    >,
    getTerminalWaitTimesByTerminalId: {
      function: "getTerminalWaitTimesByTerminalId",
      endpoint: "/terminalWaitTimes/{TerminalID}",
      inputSchema: i.terminalWaitTimesByIdSchema,
      outputSchema: o.terminalWaitTimeSchema,
      sampleParams: { TerminalID: 11 },
      endpointDescription:
        "Returns TerminalWaitTime data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesByIdInput,
      o.TerminalWaitTime
    >,
  },
};
