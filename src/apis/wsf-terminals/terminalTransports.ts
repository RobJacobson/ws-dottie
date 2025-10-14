import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Provides helpful information for terminal commuters including parking notes, vehicle-specific tips, transit links, and transportation options. This information assists travelers in planning their journey to and from ferry terminals. Data updates infrequently.";

export const terminalTransportsResource = {
  name: "terminal-transports",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getTerminalTransports",
      endpoint: "/terminalTransports",
      inputSchema: i.terminalTransportsSchema,
      outputSchema: z.array(o.terminalTransportationOptionSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of TerminalTransportationOption data for all terminals. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalTransportsInput,
      o.TerminalTransportationOption[]
    >,
    byId: {
      function: "getTerminalTransportsByTerminalId",
      endpoint: "/terminalTransports/{TerminalID}",
      inputSchema: i.terminalTransportsByIdSchema,
      outputSchema: o.terminalTransportationOptionSchema,
      sampleParams: { TerminalID: 10 },
      cacheStrategy: "STATIC",
      description: `Returns TerminalTransportationOption data for the terminal with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.TerminalTransportsByIdInput,
      o.TerminalTransportationOption
    >,
  },
};
