import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Contains tips and wait time conditions for both vehicles and walk-on passengers at terminals. This information helps travelers understand current conditions and wait times at specific terminals. Data updates infrequently.";

export const terminalWaitTimesResource = {
  name: "terminal-wait-times",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalWaitTimes",
      endpoint: "/terminalWaitTimes",
      inputSchema: i.terminalWaitTimesSchema,
      outputSchema: z.array(o.terminalWaitTimeSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalWaitTime data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesInput,
      o.TerminalWaitTime[]
    >,
    byId: {
      function: "getTerminalWaitTimesByTerminalId",
      endpoint: "/terminalWaitTimes/{TerminalID}",
      inputSchema: i.terminalWaitTimesByIdSchema,
      outputSchema: o.terminalWaitTimeSchema,
      sampleParams: { TerminalID: 11 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalWaitTime data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesByIdInput,
      o.TerminalWaitTime
    >,
  },
};
