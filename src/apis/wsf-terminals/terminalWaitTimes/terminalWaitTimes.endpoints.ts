import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalWaitTimesByIdInputSchema,
  terminalWaitTimesInputSchema,
} from "./terminalWaitTimes.input";
import { terminalWaitTimeSchema } from "./terminalWaitTimes.output";

export const terminalWaitTimesGroup: EndpointGroup = {
  name: "terminal-wait-times",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Wait time conditions and travel tips for vehicles and passengers.",
    description:
      "Current wait conditions and travel recommendations for both vehicles and walk-on passengers at Washington State Ferry terminals including wait time notes, IVR notes, route information, and update dates. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display wait time information and arrival recommendations.",
      "Provide travel tips for optimal departure timing.",
      "Show route-specific wait time conditions.",
    ],
  },
};

export const fetchTerminalWaitTimes = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalWaitTimesGroup,
  functionName: "fetchTerminalWaitTimes",
  endpoint: "/terminalWaitTimes",
  inputSchema: terminalWaitTimesInputSchema,
  outputSchema: terminalWaitTimeSchema.array(),
  sampleParams: {},
  endpointDescription: "List wait time information for all terminals.",
});

export const fetchTerminalWaitTimesByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalWaitTimesGroup,
  functionName: "fetchTerminalWaitTimesByTerminalId",
  endpoint: "/terminalWaitTimes/{TerminalID}",
  inputSchema: terminalWaitTimesByIdInputSchema,
  outputSchema: terminalWaitTimeSchema,
  sampleParams: { TerminalID: 11 },
  endpointDescription:
    "Get wait time information for a specific terminal by ID.",
});
