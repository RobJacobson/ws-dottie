import {
  terminalMatesInputSchema,
  terminalsInputSchema,
} from "@/apis/shared/terminals.input";
import { terminalListSchema } from "@/apis/shared/terminals.output";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsfFaresApi } from "../apiDefinition";

const group = defineEndpointGroup({
  api: wsfFaresApi,
  name: "terminals",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each Terminal item represents a Washington State Ferries port facility with unique identification, location details, and operational status. These terminals serve as departure and arrival points for ferry routes throughout the Puget Sound and San Juan Islands.",
    businessContext:
      "Use to display terminal options and route connections by providing terminal details and mate relationships for trip planning and schedule navigation.",
  },
});

export const fetchTerminalFares = defineEndpoint({
  group,
  functionName: "fetchTerminalFares",
  definition: {
    endpoint: "/terminals/{TripDate}",
    inputSchema: terminalsInputSchema,
    outputSchema: terminalListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    endpointDescription:
      "Returns a list of valid departing terminals for the specified trip date.",
  },
});

export const fetchTerminalMatesFares = defineEndpoint({
  group,
  functionName: "fetchTerminalMatesFares",
  definition: {
    endpoint: "/terminalMates/{TripDate}/{TerminalID}",
    inputSchema: terminalMatesInputSchema,
    outputSchema: terminalListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
    endpointDescription:
      "Returns arriving terminals for the given departing terminal and trip date.",
  },
});

export const terminalsGroup = group.descriptor;
