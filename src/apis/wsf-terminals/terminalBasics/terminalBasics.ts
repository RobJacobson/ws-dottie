import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./terminalBasics.input";
import * as o from "./terminalBasics.output";

export const terminalBasicsResource: EndpointGroup = {
  name: "terminal-basics",
  documentation: {
    resourceDescription:
      "Each TerminalBasic item represents essential terminal details including terminal identification (name and ID), operational status (amenities like elevators, waiting rooms, food service, restrooms), and basic facility information.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalBasics: {
      function: "getTerminalBasics",
      endpoint: "/terminalBasics",
      inputSchema: i.terminalBasicsSchema,
      outputSchema: z.array(o.terminalBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalBasic data for all terminals.",
    } satisfies EndpointDefinition<i.TerminalBasicsInput, o.TerminalBasic[]>,
    getTerminalBasicsByTerminalId: {
      function: "getTerminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: i.terminalBasicsByIdSchema,
      outputSchema: o.terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      endpointDescription:
        "Returns TerminalBasic data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<i.TerminalBasicsByIdInput, o.TerminalBasic>,
  },
};
