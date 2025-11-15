import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import type { EndpointGroup } from "@/apis/types";
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
    resourceDescription:
      "Each TerminalCombo item represents valid route pairings between Washington State Ferries terminals with associated fare collection methods and scheduling details. These combinations define which terminals are connected and how fares are collected for specific routes.",
    businessContext:
      "Use to determine route availability and fare collection requirements by providing terminal pairing information for journey planning and ticket purchasing systems.",
  },
};

export const fetchTerminalComboFares = defineEndpoint({
  api: apis.wsdotBorderCrossings,
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
    "Returns fare collection descriptions for specified terminal combination and trip date.",
});

export const fetchTerminalComboFaresVerbose = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: terminalComboGroup,
  functionName: "fetchTerminalComboFaresVerbose",
  endpoint: "/terminalComboVerbose/{TripDate}",
  inputSchema: terminalComboFaresVerboseInputSchema,
  outputSchema: terminalComboFaresVerboseSchema.array(),
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "Returns fare collection descriptions for all terminal combinations available on the specified trip date.",
});
