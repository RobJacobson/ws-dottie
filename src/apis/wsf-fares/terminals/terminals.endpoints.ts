import type {
  TerminalMatesInput,
  TerminalsInput,
} from "@/apis/shared/terminals.input";
import {
  terminalMatesInputSchema,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";

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
    fetchTerminalFares: {
      endpoint: "/terminals/{TripDate}",
      inputSchema: terminalsInputSchema,
      outputSchema: terminalListSchema,
      sampleParams: { TripDate: datesHelper.tomorrow() },
      endpointDescription:
        "Returns a list of valid departing terminals for the specified trip date.",
    } satisfies EndpointDefinition<TerminalsInput, Terminal[]>,
    fetchTerminalMatesFares: {
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: terminalMatesInputSchema,
      outputSchema: terminalListSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      endpointDescription:
        "Returns arriving terminals for the given departing terminal and trip date.",
    } satisfies EndpointDefinition<TerminalMatesInput, Terminal[]>,
  },
} satisfies EndpointGroup;
