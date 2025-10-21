import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./terminalLocations.input";
import * as o from "./terminalLocations.output";

export const export const terminalLocationsResource = {: EndpointGroup 
  name: "terminal-locations",
  resourceDescription:
    "Contains detailed location information for terminals including geographical coordinates,
  documentation: {
    resourceDescription: "Contains detailed location information for terminals including geographical coordinates, address details, driving directions, and GIS mapping data. This information helps users locate terminals and plan their travel routes. Data updates infrequently.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalLocations: {
      function: "getTerminalLocations",
      endpoint: "/terminalLocations",
      inputSchema: i.terminalLocationsSchema,
      outputSchema: z.array(o.terminalLocationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalLocation data for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalLocationsInput,
      o.TerminalLocation[]
    >,
    getTerminalLocationsByTerminalId: {
      function: "getTerminalLocationsByTerminalId",
      endpoint: "/terminalLocations/{TerminalID}",
      inputSchema: i.terminalLocationsByIdSchema,
      outputSchema: o.terminalLocationSchema,
      sampleParams: { TerminalID: 5 },
      endpointDescription:
        "Returns TerminalLocation data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalLocationsByIdInput,
      o.TerminalLocation
    >,
  },
};
