import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalLocations.input";
import * as o from "./terminalLocations.output";

export const terminalLocationsResource = {
  name: "terminal-locations",
  documentation: {
    resourceDescription:
      "Each TerminalLocation item represents geographical location data for Washington State Ferry terminals, including coordinates, address details, and mapping information. These items enable precise terminal identification and navigation for travelers.",
    businessContext:
      "Use to locate ferry terminals and plan travel routes by providing geographical coordinates, address details, and GIS mapping data for navigation systems.",
  },
  // Using STATIC strategy because terminal locations rarely change (only when terminals are added/removed)
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalLocations: {
      function: "getTerminalLocations",
      endpoint: "/terminalLocations",
      inputSchema: i.terminalLocationsSchema,
      outputSchema: z.array(o.terminalLocationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalLocation objects for all terminals.",
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
        "Returns a single TerminalLocation object for specified terminal.",
    } satisfies EndpointDefinition<
      i.TerminalLocationsByIdInput,
      o.TerminalLocation
    >,
  },
} satisfies EndpointGroup;
