import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/factories";
import { z } from "@/shared/zod-openapi-init";
import type {
  FaresTerminalsInput,
  TerminalMatesInput,
} from "./terminals.input";
import {
  faresTerminalsInputSchema,
  terminalMatesInputSchema,
} from "./terminals.input";
import type { Terminal } from "./terminals.output";
import { terminalSchema } from "./terminals.output";

export const terminalsGroup = {
  name: "terminals",
  documentation: {
    resourceDescription:
      "Each Terminal item represents a Washington State Ferries port facility with unique identification, location details, and operational status. These terminals serve as departure and arrival points for ferry routes throughout the Puget Sound and San Juan Islands.",
    businessContext:
      "Use to display terminal options and route connections by providing terminal details and mate relationships for trip planning and schedule navigation.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFaresTerminals: {
      function: "getFaresTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: faresTerminalsInputSchema,
      outputSchema: z.array(terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns a list of valid departing terminals for the specified trip date.",
    } satisfies EndpointDefinition<FaresTerminalsInput, Terminal[]>,
    getTerminalMates: {
      function: "getTerminalMates",
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: terminalMatesInputSchema,
      outputSchema: z.array(terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns arriving terminals for the given departing terminal and trip date.",
    } satisfies EndpointDefinition<TerminalMatesInput, Terminal[]>,
  },
} satisfies EndpointGroup;
