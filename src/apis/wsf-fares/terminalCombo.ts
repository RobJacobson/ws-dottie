import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Provides terminal combination information for WSF fares including fare collection descriptions for specific terminal pairs and all terminal combinations for a given date. Data updates infrequently.";

export const terminalComboResource = {
  name: "terminal-combo",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    get: {
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
      cacheStrategy: "STATIC",
      description: `Returns fare collection descriptions for the specified terminal combination and trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalComboInput,
      o.TerminalComboResponse
    >,
    verbose: {
      function: "getTerminalComboVerbose",
      endpoint: "/terminalComboVerbose/{TripDate}",
      inputSchema: i.terminalComboVerboseSchema,
      outputSchema: z.array(o.terminalComboVerboseResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns fare collection descriptions for all terminal combinations available on the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalComboVerboseInput,
      o.TerminalComboVerboseResponse[]
    >,
  },
};
