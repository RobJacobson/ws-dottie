import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const terminalsResource = {
  name: "terminals",
  resourceDescription:
    "Provides terminal information for WSF fares including valid departing terminals and terminal mate relationships. Terminal data includes unique identifiers, names, and operational details. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFaresTerminals: {
      function: "getFaresTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns a list of valid departing terminals for the specified trip date.",
    } satisfies EndpointDefinition<i.TerminalsInput, o.TerminalResponse[]>,
    getTerminalMates: {
      function: "getTerminalMates",
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns arriving terminals for the given departing terminal and trip date.",
    } satisfies EndpointDefinition<i.TerminalMatesInput, o.TerminalResponse[]>,
  },
};
