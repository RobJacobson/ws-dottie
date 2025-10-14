import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Provides terminal information for WSF fares including valid departing terminals and terminal mate relationships. Terminal data includes unique identifiers, names, and operational details. Data updates infrequently.";

export const terminalsResource = {
  name: "terminals",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getFaresTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: `Returns a list of valid departing terminals for the specified trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalsInput, o.TerminalResponse[]>,
    mates: {
      function: "getTerminalMates",
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalResponseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
      description: `Returns arriving terminals for the given departing terminal and trip date. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.TerminalMatesInput, o.TerminalResponse[]>,
  },
};
