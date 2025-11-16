import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalVerboseByTerminalIdInputSchema,
  terminalVerboseInputSchema,
} from "./terminalVerbose.input";
import { terminalVerboseSchema } from "./terminalVerbose.output";

export const terminalVerboseGroup: EndpointGroup = {
  name: "terminal-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Comprehensive terminal information combining all terminal data types.",
    description:
      "Complete terminal information combining data from terminalBasics, terminalBulletins, terminalLocations, terminalTransports, and terminalWaitTimes endpoints. Includes identification, amenities, bulletins, locations, transportation info, sailing space, wait times, and additional details. Use when you need to reduce API calls and don't mind larger payloads. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Retrieve all terminal information in a single API call.",
      "Reduce application chattiness when comprehensive data is needed.",
      "Build integrated terminal information displays.",
    ],
  },
};

export const fetchTerminalVerbose = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalVerboseGroup,
  functionName: "fetchTerminalVerbose",
  endpoint: "/terminalVerbose",
  inputSchema: terminalVerboseInputSchema,
  outputSchema: terminalVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List comprehensive information for all terminals.",
});

export const fetchTerminalVerboseByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalVerboseGroup,
  functionName: "fetchTerminalVerboseByTerminalId",
  endpoint: "/terminalVerbose/{TerminalID}",
  inputSchema: terminalVerboseByTerminalIdInputSchema,
  outputSchema: terminalVerboseSchema,
  sampleParams: { TerminalID: 4 },
  endpointDescription:
    "Get comprehensive information for a specific terminal by ID.",
});
