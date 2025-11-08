import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalLocationsByIdInput,
  TerminalLocationsInput,
} from "./terminalLocations.input";
import {
  terminalLocationsByIdInputSchema,
  terminalLocationsInputSchema,
} from "./terminalLocations.input";
import type { TerminalLocation } from "./terminalLocations.output";
import { terminalLocationSchema } from "./terminalLocations.output";

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
    fetchTerminalLocations: {
      endpoint: "/terminalLocations",
      inputSchema: terminalLocationsInputSchema,
      outputSchema: z.array(terminalLocationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalLocation objects for all terminals.",
    } satisfies EndpointDefinition<TerminalLocationsInput, TerminalLocation[]>,
    fetchTerminalLocationsByTerminalId: {
      endpoint: "/terminalLocations/{TerminalID}",
      inputSchema: terminalLocationsByIdInputSchema,
      outputSchema: terminalLocationSchema,
      sampleParams: { TerminalID: 5 },
      endpointDescription:
        "Returns a single TerminalLocation object for specified terminal.",
    } satisfies EndpointDefinition<
      TerminalLocationsByIdInput,
      TerminalLocation
    >,
  },
} satisfies EndpointGroup;
