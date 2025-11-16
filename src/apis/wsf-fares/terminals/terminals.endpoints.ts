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
    summary:
      "WSF terminal facilities serving as departure and arrival points for ferry routes.",
    description:
      "Terminals represent port facilities with unique identifiers and names. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal options for trip planning interfaces.",
      "Determine valid terminal pairs for route selection.",
      "Build terminal lookup and navigation features.",
    ],
    updateFrequency: "daily",
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
  endpointDescription: "List valid departing terminals for a trip date.",
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
    "List arriving terminals for a given departing terminal and trip date.",
});
