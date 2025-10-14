import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const terminalTransportsResource = {
  name: "terminal-transports",
  resourceDescription:
    "Provides helpful information for terminal commuters including parking notes, vehicle-specific tips, transit links, and transportation options. This information assists travelers in planning their journey to and from ferry terminals. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalTransports: {
      function: "getTerminalTransports",
      endpoint: "/terminalTransports",
      inputSchema: i.terminalTransportsSchema,
      outputSchema: z.array(o.terminalTransportationOptionSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of TerminalTransportationOption data for all terminals.",
    } satisfies EndpointDefinition<
      i.TerminalTransportsInput,
      o.TerminalTransportationOption[]
    >,
    getTerminalTransportsByTerminalId: {
      function: "getTerminalTransportsByTerminalId",
      endpoint: "/terminalTransports/{TerminalID}",
      inputSchema: i.terminalTransportsByIdSchema,
      outputSchema: o.terminalTransportationOptionSchema,
      sampleParams: { TerminalID: 10 },
      endpointDescription:
        "Returns TerminalTransportationOption data for the terminal with the given identifier.",
    } satisfies EndpointDefinition<
      i.TerminalTransportsByIdInput,
      o.TerminalTransportationOption
    >,
  },
};
