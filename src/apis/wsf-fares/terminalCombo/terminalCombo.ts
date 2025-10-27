import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./terminalCombo.input";
import * as o from "./terminalCombo.output";

export const terminalComboGroup: EndpointGroup = {
  name: "terminal-combo",
  documentation: {
    resourceDescription:
      "Each TerminalCombo item represents valid route pairings between Washington State Ferries terminals with associated fare collection methods and scheduling details. These combinations define which terminals are connected and how fares are collected for specific routes.",
    businessContext:
      "Use to determine route availability and fare collection requirements by providing terminal pairing information for journey planning and ticket purchasing systems.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalCombo: {
      function: "getTerminalCombo",
      endpoint:
        "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.terminalComboSchema,
      outputSchema: o.terminalComboResponseSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      endpointDescription:
        "Returns fare collection descriptions for the specified terminal combination and trip date.",
    } satisfies EndpointDefinition<
      i.TerminalComboInput,
      o.TerminalComboResponse
    >,
    getTerminalComboVerbose: {
      function: "getTerminalComboVerbose",
      endpoint: "/terminalComboVerbose/{TripDate}",
      inputSchema: i.terminalComboVerboseSchema,
      outputSchema: z.array(o.terminalComboVerboseResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns fare collection descriptions for all terminal combinations available on the specified trip date.",
    } satisfies EndpointDefinition<
      i.TerminalComboVerboseInput,
      o.TerminalComboVerboseResponse[]
    >,
  },
};
