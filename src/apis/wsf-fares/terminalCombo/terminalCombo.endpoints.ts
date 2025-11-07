import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalComboInput,
  TerminalComboVerboseInput,
} from "./terminalCombo.input";
import {
  terminalComboInputSchema,
  terminalComboVerboseInputSchema,
} from "./terminalCombo.input";
import type {
  TerminalCombo,
  TerminalComboVerbose,
} from "./terminalCombo.output";
import {
  terminalComboSchema,
  terminalComboVerboseSchema,
} from "./terminalCombo.output";

export const terminalComboGroup = {
  name: "terminal-combo",
  documentation: {
    resourceDescription:
      "Each TerminalCombo item represents valid route pairings between Washington State Ferries terminals with associated fare collection methods and scheduling details. These combinations define which terminals are connected and how fares are collected for specific routes.",
    businessContext:
      "Use to determine route availability and fare collection requirements by providing terminal pairing information for journey planning and ticket purchasing systems.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalCombo: {
      function: "getTerminalCombo",
      endpoint:
        "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: terminalComboInputSchema,
      outputSchema: terminalComboSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns fare collection descriptions for the specified terminal combination and trip date.",
    } satisfies EndpointDefinition<TerminalComboInput, TerminalCombo>,
    getTerminalComboVerbose: {
      function: "getTerminalComboVerbose",
      endpoint: "/terminalComboVerbose/{TripDate}",
      inputSchema: terminalComboVerboseInputSchema,
      outputSchema: z.array(terminalComboVerboseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns fare collection descriptions for all terminal combinations available on the specified trip date.",
    } satisfies EndpointDefinition<
      TerminalComboVerboseInput,
      TerminalComboVerbose[]
    >,
  },
} satisfies EndpointGroup;
