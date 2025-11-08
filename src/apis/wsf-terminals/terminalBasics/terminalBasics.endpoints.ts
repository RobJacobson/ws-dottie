import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod";
import {
  type TerminalBasicsByIdInput,
  type TerminalBasicsInput,
  terminalBasicsByIdInputSchema,
  terminalBasicsInputSchema,
} from "./terminalBasics.input";
import {
  type TerminalBasic,
  terminalBasicSchema,
} from "./terminalBasics.output";

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
    fetchTerminalBasics: {
      endpoint: "/terminalBasics",
      inputSchema: terminalBasicsInputSchema,
      outputSchema: z.array(terminalBasicSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalBasic objects for all terminals.",
    } satisfies EndpointDefinition<TerminalBasicsInput, TerminalBasic[]>,
    fetchTerminalBasicsByTerminalId: {
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: terminalBasicsByIdInputSchema,
      outputSchema: terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      endpointDescription:
        "Returns a TerminalBasic object containing essential identification and status information for the specified terminal.",
    } satisfies EndpointDefinition<TerminalBasicsByIdInput, TerminalBasic>,
  },
} satisfies EndpointGroup;
