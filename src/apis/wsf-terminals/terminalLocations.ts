import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Contains detailed location information for terminals including geographical coordinates, address details, driving directions, and GIS mapping data. This information helps users locate terminals and plan their travel routes. Data updates infrequently.";

export const terminalLocationsResource = {
  name: "terminal-locations",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalLocations",
      endpoint: "/terminalLocations",
      inputSchema: i.terminalLocationsSchema,
      outputSchema: z.array(o.terminalLocationSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalLocation data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalLocationsInput,
      o.TerminalLocation[]
    >,
    byId: {
      function: "getTerminalLocationsByTerminalId",
      endpoint: "/terminalLocations/{TerminalID}",
      inputSchema: i.terminalLocationsByIdSchema,
      outputSchema: o.terminalLocationSchema,
      sampleParams: { TerminalID: 5 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalLocation data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalLocationsByIdInput,
      o.TerminalLocation
    >,
  },
};
