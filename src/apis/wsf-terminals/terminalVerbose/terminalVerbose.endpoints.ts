import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalVerboseByTerminalIdInputSchema,
  terminalVerboseInputSchema,
} from "./terminalVerbose.input";
import { terminalVerboseSchema } from "./terminalVerbose.output";

const group = defineEndpointGroup({
  api: wsfTerminalsApi,
  name: "terminal-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalVerbose item represents comprehensive terminal information for Washington State Ferry terminals. These items include basic details, bulletins, location data, sailing space information, transportation options, wait times, and facility information.",
    businessContext:
      "Use to retrieve comprehensive terminal information by providing complete facility details for integrated ferry terminal planning.",
  },
});

export const fetchTerminalVerbose = defineEndpoint({
  group,
  functionName: "fetchTerminalVerbose",
  definition: {
    endpoint: "/terminalVerbose",
    inputSchema: terminalVerboseInputSchema,
    outputSchema: terminalVerboseSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple TerminalVerbose objects for all terminals.",
  },
});

export const fetchTerminalVerboseByTerminalId = defineEndpoint({
  group,
  functionName: "fetchTerminalVerboseByTerminalId",
  definition: {
    endpoint: "/terminalVerbose/{TerminalID}",
    inputSchema: terminalVerboseByTerminalIdInputSchema,
    outputSchema: terminalVerboseSchema,
    sampleParams: { TerminalID: 4 },
    endpointDescription:
      "Returns TerminalVerbose data for the terminal with the specified terminal.",
  },
});

export const terminalVerboseResource = group.descriptor;
