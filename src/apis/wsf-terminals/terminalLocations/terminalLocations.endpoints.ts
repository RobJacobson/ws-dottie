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
    resourceDescription:
      "Each TerminalLocation item represents geographical location data for Washington State Ferry terminals, including coordinates, address details, and mapping information. These items enable precise terminal identification and navigation for travelers.",
    businessContext:
      "Use to locate ferry terminals and plan travel routes by providing geographical coordinates, address details, and GIS mapping data for navigation systems.",
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
  endpointDescription:
    "Returns multiple TerminalLocation objects for all terminals.",
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
    "Returns a single TerminalLocation object for specified terminal.",
});
