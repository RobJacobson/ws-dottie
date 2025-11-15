import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  terminalLocationsByIdInputSchema,
  terminalLocationsInputSchema,
} from "./terminalLocations.input";
import { terminalLocationSchema } from "./terminalLocations.output";

export const terminalLocationsGroup: EndpointGroup = {
  name: "terminal-locations",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Geographical location data for ferry terminals.",
    description:
      "Location information for Washington State Ferry terminals including coordinates, addresses, map links, driving directions, and GIS zoom-level coordinates. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal locations on maps and navigation systems.",
      "Provide driving directions and address information.",
      "Integrate with GIS mapping applications.",
    ],
  },
};

export const fetchTerminalLocations = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalLocationsGroup,
  functionName: "fetchTerminalLocations",
  endpoint: "/terminalLocations",
  inputSchema: terminalLocationsInputSchema,
  outputSchema: terminalLocationSchema.array(),
  sampleParams: {},
  endpointDescription: "List location information for all terminals.",
});

export const fetchTerminalLocationsByTerminalId = createEndpoint({
  api: apis.wsfTerminals,
  group: terminalLocationsGroup,
  functionName: "fetchTerminalLocationsByTerminalId",
  endpoint: "/terminalLocations/{TerminalID}",
  inputSchema: terminalLocationsByIdInputSchema,
  outputSchema: terminalLocationSchema,
  sampleParams: { TerminalID: 5 },
  endpointDescription:
    "Get location information for a specific terminal by ID.",
});
