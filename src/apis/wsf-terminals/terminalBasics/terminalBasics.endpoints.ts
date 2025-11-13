import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalBasicsByIdInputSchema,
  terminalBasicsInputSchema,
} from "./terminalBasics.input";
import { terminalBasicSchema } from "./terminalBasics.output";

const group = defineEndpointGroup({
  api: wsfTerminalsApi,
  name: "terminal-basics",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalBasic item represents essential terminal details for Washington State Ferry terminals, including terminal identification, operational status, facility amenities, and regional assignments. These items provide foundational information needed for trip planning and accessibility compliance.",
    businessContext:
      "Use to plan ferry trips and ensure accessibility compliance by providing terminal facility information including amenities and regional assignments for WSF travelers and operators.",
  },
});

export const fetchTerminalBasics = defineEndpoint({
  group,
  functionName: "fetchTerminalBasics",
  definition: {
    endpoint: "/terminalBasics",
    inputSchema: terminalBasicsInputSchema,
    outputSchema: terminalBasicSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple TerminalBasic objects for all terminals.",
  },
});

export const fetchTerminalBasicsByTerminalId = defineEndpoint({
  group,
  functionName: "fetchTerminalBasicsByTerminalId",
  definition: {
    endpoint: "/terminalBasics/{TerminalID}",
    inputSchema: terminalBasicsByIdInputSchema,
    outputSchema: terminalBasicSchema,
    sampleParams: { TerminalID: 1 },
    endpointDescription:
      "Returns a TerminalBasic object containing essential identification and status information for the specified terminal.",
  },
});

export const terminalBasicsResource = group.descriptor;
