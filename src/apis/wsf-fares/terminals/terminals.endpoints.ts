import { apis } from "@/apis/shared/apis";
import {
  type TerminalMatesInput,
  type TerminalsInput,
  terminalMatesInputSchema,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";

export const terminalsGroup: EndpointGroup = {
  name: "terminals",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Terminal item represents a Washington State Ferries port facility with unique identification, location details, and operational status. These terminals serve as departure and arrival points for ferry routes throughout the Puget Sound and San Juan Islands.",
    businessContext:
      "Use to display terminal options and route connections by providing terminal details and mate relationships for trip planning and schedule navigation.",
  },
};

export const fetchTerminalFares = createEndpoint<TerminalsInput, any>({
  api: apis.wsfFares,
  group: terminalsGroup,
  functionName: "fetchTerminalFares",
  endpoint: "/terminals/{TripDate}",
  inputSchema: terminalsInputSchema,
  outputSchema: terminalListSchema,
  sampleParams: { TripDate: datesHelper.tomorrow() },
  endpointDescription:
    "Returns a list of valid departing terminals for specified trip date.",
});

export const fetchTerminalMatesFares = createEndpoint<TerminalMatesInput, any>({
  api: apis.wsfFares,
  group: terminalsGroup,
  functionName: "fetchTerminalMatesFares",
  endpoint: "/terminalMates/{TripDate}/{TerminalID}",
  inputSchema: terminalMatesInputSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
  outputSchema: terminalListSchema,
  endpointDescription:
    "Returns arriving terminals for the given departing terminal and trip date.",
});
