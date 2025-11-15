import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalTransportsByTerminalIdInputSchema,
  terminalTransportsInputSchema,
} from "./terminalTransports.input";
import { terminalTransportSchema } from "./terminalTransports.output";

export const terminalTransportsGroup: EndpointGroup = {
  name: "terminal-transports",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Transportation options and parking information for terminals.",
    description:
      "Commuter information for Washington State Ferry terminals including parking details, vehicle-specific tips (motorcycle, truck, bike), airport information, transit links, and HOV/carpool information. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display parking information and rates for terminal planning.",
      "Provide vehicle-specific tips for motorcycles, trucks, and bicycles.",
      "Show transit links and airport connection information.",
    ],
  },
};

export const fetchTerminalTransports = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalTransportsGroup,
  functionName: "fetchTerminalTransports",
  endpoint: "/terminalTransports",
  inputSchema: terminalTransportsInputSchema,
  outputSchema: terminalTransportSchema.array(),
  sampleParams: {},
  endpointDescription: "List transportation information for all terminals.",
});

export const fetchTerminalTransportsByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalTransportsGroup,
  functionName: "fetchTerminalTransportsByTerminalId",
  endpoint: "/terminalTransports/{TerminalID}",
  inputSchema: terminalTransportsByTerminalIdInputSchema,
  outputSchema: terminalTransportSchema,
  sampleParams: { TerminalID: 10 },
  endpointDescription:
    "Get transportation information for a specific terminal by ID.",
});
