import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./terminals.input";
import * as o from "./terminals.output";

export const terminalsGroup: EndpointGroup = {
  name: "terminals",
  documentation: {
    resourceDescription:
      "Each Terminal item represents a Washington State Ferries port facility with unique identification, location details, and operational status. These terminals serve as departure and arrival points for ferry routes throughout the Puget Sound and San Juan Islands.",
    businessContext:
      "Use to display terminal options and route connections by providing terminal details and mate relationships for trip planning and schedule navigation.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
