import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  terminalVerboseByTerminalIdInputSchema,
  terminalVerboseInputSchema,
} from "./terminalVerbose.input";
import { terminalVerboseSchema } from "./terminalVerbose.output";

export const terminalVerboseGroup = defineEndpointGroup({
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
  api: apis.wsdotBorderCrossings,
  group: terminalVerboseGroup,
  functionName: "fetchTerminalVerbose",
  endpoint: "/terminalVerbose",
  inputSchema: terminalVerboseInputSchema,
  outputSchema: terminalVerboseSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple TerminalVerbose objects for all terminals.",
});

export const fetchTerminalVerboseByTerminalId = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: terminalVerboseGroup,
  functionName: "fetchTerminalVerboseByTerminalId",
  endpoint: "/terminalVerbose/{TerminalID}",
  inputSchema: terminalVerboseByTerminalIdInputSchema,
  outputSchema: terminalVerboseSchema,
  sampleParams: { TerminalID: 4 },
  endpointDescription:
    "Returns TerminalVerbose data for the terminal with the specified terminal.",
});
