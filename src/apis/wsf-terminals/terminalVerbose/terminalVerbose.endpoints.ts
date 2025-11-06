import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalVerbose.input";
import * as o from "./terminalVerbose.output";

export const terminalVerboseResource = {
  name: "terminal-verbose",
  documentation: {
    resourceDescription:
      "Each TerminalVerbose item represents comprehensive terminal information for Washington State Ferry terminals. These items include basic details, bulletins, location data, sailing space information, transportation options, wait times, and facility information.",
    businessContext:
      "Use to retrieve comprehensive terminal information by providing complete facility details for integrated ferry terminal planning.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalVerbose: {
      function: "getTerminalVerbose",
      endpoint: "/terminalVerbose",
      inputSchema: i.terminalVerboseInputSchema,
      outputSchema: z.array(o.terminalVerboseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalVerbose objects for all terminals.",
    } satisfies EndpointDefinition<i.TerminalVerboseInput, o.TerminalVerbose[]>,
    getTerminalVerboseByTerminalId: {
      function: "getTerminalVerboseByTerminalId",
      endpoint: "/terminalVerbose/{TerminalID}",
      inputSchema: i.terminalVerboseByTerminalIdInputSchema,
      outputSchema: o.terminalVerboseSchema,
      sampleParams: { TerminalID: 4 },
      endpointDescription:
        "Returns TerminalVerbose data for the terminal with the specified terminal.",
    } satisfies EndpointDefinition<
      i.TerminalVerboseByTerminalIdInput,
      o.TerminalVerbose
    >,
  },
} satisfies EndpointGroup;
