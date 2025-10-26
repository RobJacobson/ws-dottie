import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./terminalVerbose.input";
import * as o from "./terminalVerbose.output";

export const terminalVerboseResource: EndpointGroup = {
  name: "terminal-verbose",
  documentation: {
    resourceDescription:
      "Contains highly detailed information about terminals including basic details, bulletins, location data, sailing space information, transportation options, wait times, and comprehensive facility information. This endpoint should be used when you need comprehensive terminal data and don't mind receiving a larger payload.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalVerbose: {
      function: "getTerminalVerbose",
      endpoint: "/terminalVerbose",
      inputSchema: i.terminalVerboseSchema,
      outputSchema: z.array(o.terminalVerboseSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalVerbose data for all terminals.",
    } satisfies EndpointDefinition<i.TerminalVerboseInput, o.TerminalVerbose[]>,
    getTerminalVerboseByTerminalId: {
      function: "getTerminalVerboseByTerminalId",
      endpoint: "/terminalVerbose/{TerminalID}",
      inputSchema: i.terminalVerboseByIdSchema,
      outputSchema: o.terminalVerboseSchema,
      sampleParams: { TerminalID: 4 },
      endpointDescription:
        "Returns TerminalVerbose data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalVerboseByIdInput,
      o.TerminalVerbose
    >,
  },
};
