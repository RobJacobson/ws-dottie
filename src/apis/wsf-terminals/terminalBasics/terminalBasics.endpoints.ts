import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import {
  terminalBasicsByIdInputSchema,
  terminalBasicsInputSchema,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";
import { terminalBasicSchema } from "./terminalBasics.output";

export const terminalBasicsResource = {
  name: "terminal-basics",
  documentation: {
    resourceDescription:
      "Each TerminalBasic item represents essential terminal details for Washington State Ferry terminals, including terminal identification, operational status, facility amenities, and regional assignments. These items provide foundational information needed for trip planning and accessibility compliance.",
    businessContext:
      "Use to plan ferry trips and ensure accessibility compliance by providing terminal facility information including amenities and regional assignments for WSF travelers and operators.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalBasics: {
      function: "getTerminalBasics",
      endpoint: "/terminalBasics",
      inputSchema: terminalBasicsInputSchema,
      outputSchema: z.array(terminalBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalBasic objects for all terminals.",
    } satisfies EndpointDefinition<TerminalBasicsInput, TerminalBasic[]>,
    getTerminalBasicsByTerminalId: {
      function: "getTerminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: terminalBasicsByIdInputSchema,
      outputSchema: terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      endpointDescription:
        "Returns a TerminalBasic object containing essential identification and status information for the specified terminal.",
    } satisfies EndpointDefinition<TerminalBasicsByIdInput, TerminalBasic>,
  },
} satisfies EndpointGroup;
