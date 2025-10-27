import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./terminalBasics.input";
import * as o from "./terminalBasics.output";

export const terminalBasicsResource: EndpointGroup = {
  name: "terminal-basics",
  documentation: {
    resourceDescription:
      "Each TerminalBasic item represents essential terminal details for Washington State Ferry terminals, including terminal identification, operational status, facility amenities, and regional assignments. These items provide foundational information needed for trip planning and accessibility compliance.",
    businessContext:
      "Use to plan ferry trips and ensure accessibility compliance by providing terminal facility information including amenities and regional assignments for WSF travelers and operators.",
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
        "Returns multiple TerminalBasic objects for all terminals.",
    } satisfies EndpointDefinition<i.TerminalBasicsInput, o.TerminalBasic[]>,
    getTerminalBasicsByTerminalId: {
      function: "getTerminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: i.terminalBasicsByIdSchema,
      outputSchema: o.terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      endpointDescription:
        "Returns a TerminalBasic object containing essential identification and status information for the specified terminal.",
    } satisfies EndpointDefinition<i.TerminalBasicsByIdInput, o.TerminalBasic>,
  },
};
