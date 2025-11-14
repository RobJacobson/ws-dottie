import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  terminalWaitTimesByIdInputSchema,
  terminalWaitTimesInputSchema,
} from "./terminalWaitTimes.input";
import { terminalWaitTimeSchema } from "./terminalWaitTimes.output";

export const terminalWaitTimesGroup = defineEndpointGroup({
  name: "terminal-wait-times",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalWaitTime item represents current wait conditions and travel tips for both vehicles and walk-on passengers at Washington State Ferry terminals. These items include estimated wait times for different vehicle types, capacity constraints, and travel recommendations.",
    businessContext:
      "Use to plan ferry terminal arrivals by providing current terminal conditions and vehicle capacity information for optimal departure timing.",
  },
});

export const fetchTerminalWaitTimes = defineEndpoint({
  apiName: wsfTerminalsApi.name,
  baseUrl: wsfTerminalsApi.baseUrl,
  group: terminalWaitTimesGroup,
  functionName: "fetchTerminalWaitTimes",
  endpoint: "/terminalWaitTimes",
  inputSchema: terminalWaitTimesInputSchema,
  outputSchema: terminalWaitTimeSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple TerminalWaitTime objects for all terminals.",
});

export const fetchTerminalWaitTimesByTerminalId = defineEndpoint({
  apiName: wsfTerminalsApi.name,
  baseUrl: wsfTerminalsApi.baseUrl,
  group: terminalWaitTimesGroup,
  functionName: "fetchTerminalWaitTimesByTerminalId",
  endpoint: "/terminalWaitTimes/{TerminalID}",
  inputSchema: terminalWaitTimesByIdInputSchema,
  outputSchema: terminalWaitTimeSchema,
  sampleParams: { TerminalID: 11 },
  endpointDescription:
    "Returns a single TerminalWaitTime object for specified terminal.",
});

