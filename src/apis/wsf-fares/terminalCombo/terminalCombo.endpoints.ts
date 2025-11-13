import { datesHelper } from "@/shared/utils";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  terminalComboFaresVerboseInputSchema,
  terminalComboInputSchema,
} from "./terminalCombo.input";
import {
  terminalComboFaresSchema,
  terminalComboFaresVerboseSchema,
} from "./terminalCombo.output";
import { wsfFaresApi } from "../apiDefinition";

const group = defineEndpointGroup({
  api: wsfFaresApi,
  name: "terminal-combo",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each TerminalCombo item represents valid route pairings between Washington State Ferries terminals with associated fare collection methods and scheduling details. These combinations define which terminals are connected and how fares are collected for specific routes.",
    businessContext:
      "Use to determine route availability and fare collection requirements by providing terminal pairing information for journey planning and ticket purchasing systems.",
  },
});

export const fetchTerminalComboFares = defineEndpoint({
  group,
  functionName: "fetchTerminalComboFares",
  definition: {
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
      "Returns fare collection descriptions for the specified terminal combination and trip date.",
  },
});

export const fetchTerminalComboFaresVerbose = defineEndpoint({
  group,
  functionName: "fetchTerminalComboFaresVerbose",
  definition: {
    endpoint: "/terminalComboVerbose/{TripDate}",
    inputSchema: terminalComboFaresVerboseInputSchema,
    outputSchema: terminalComboFaresVerboseSchema.array(),
    sampleParams: { TripDate: datesHelper.tomorrow() },
    endpointDescription:
      "Returns fare collection descriptions for all terminal combinations available on the specified trip date.",
  },
});

export const terminalComboGroup = group.descriptor;
