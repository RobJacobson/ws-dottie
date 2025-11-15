import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  terminalComboFaresVerboseInputSchema,
  terminalComboInputSchema,
} from "./terminalCombo.input";
import {
  terminalComboFaresSchema,
  terminalComboFaresVerboseSchema,
} from "./terminalCombo.output";

export const terminalComboGroup: EndpointGroup = {
  name: "terminal-combo",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Valid terminal pairings with fare collection procedures for WSF routes.",
    description:
      "Terminal combinations define which terminals are connected and describe where and how fares are collected for each route. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine route availability between terminal pairs.",
      "Understand fare collection procedures for specific routes.",
      "Build journey planning interfaces with fare collection details.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchTerminalComboFares = createEndpoint({
  api: apis.wsfFares,
  group: terminalComboGroup,
  functionName: "fetchTerminalComboFares",
  endpoint:
    "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
  inputSchema: terminalComboInputSchema,
  outputSchema: terminalComboFaresSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
  },
  endpointDescription:
    "Get fare collection description for a specific terminal combination and trip date.",
});

export const fetchTerminalComboFaresVerbose = createEndpoint({
  api: apis.wsfFares,
  group: terminalComboGroup,
  functionName: "fetchTerminalComboFaresVerbose",
  endpoint: "/terminalComboVerbose/{TripDate}",
  inputSchema: terminalComboFaresVerboseInputSchema,
  outputSchema: terminalComboFaresVerboseSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "Get fare collection descriptions for all terminal combinations on a trip date.",
});
