import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalTransportsByTerminalIdInputSchema,
  terminalTransportsInputSchema,
} from "./terminalTransports.input";
import { terminalTransportSchema } from "./terminalTransports.output";

export const terminalTransportsGroup = defineEndpointGroup({
  name: "terminal-transports",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalTransport item represents transportation options and parking information for Washington State Ferry terminals. These items include parking notes, vehicle-specific tips, transit links, and alternative transportation methods.",
    businessContext:
      "Use to plan terminal access by providing parking availability and transportation options for ferry terminal commuters.",
  },
});

export const fetchTerminalTransports = defineEndpoint({
  apiName: wsfTerminalsApi.name,
  baseUrl: wsfTerminalsApi.baseUrl,
  group: terminalTransportsGroup,
  functionName: "fetchTerminalTransports",
  endpoint: "/terminalTransports",
  inputSchema: terminalTransportsInputSchema,
  outputSchema: terminalTransportSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple TerminalTransport objects for all terminals.",
});

export const fetchTerminalTransportsByTerminalId = defineEndpoint({
  apiName: wsfTerminalsApi.name,
  baseUrl: wsfTerminalsApi.baseUrl,
  group: terminalTransportsGroup,
  functionName: "fetchTerminalTransportsByTerminalId",
  endpoint: "/terminalTransports/{TerminalID}",
  inputSchema: terminalTransportsByTerminalIdInputSchema,
  outputSchema: terminalTransportSchema,
  sampleParams: { TerminalID: 10 },
  endpointDescription:
    "Returns TerminalTransport data for the terminal with the specified terminal.",
});

