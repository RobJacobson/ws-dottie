import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./terminalTransports.input";
import * as o from "./terminalTransports.output";

export const terminalTransportsResource: EndpointGroup = {
  name: "terminal-transports",
  documentation: {
    resourceDescription:
      "Each TerminalTransportationOption item represents transportation options and parking information for Washington State Ferry terminals. These items include parking notes, vehicle-specific tips, transit links, and alternative transportation methods.",
    businessContext:
      "Use to plan terminal access by providing parking availability and transportation options for ferry terminal commuters.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTerminalTransports: {
      function: "getTerminalTransports",
      endpoint: "/terminalTransports",
      inputSchema: i.terminalTransportsSchema,
      outputSchema: z.array(o.terminalTransportationOptionSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalTransportationOption objects for all terminals.",
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
        "Returns TerminalTransportationOption data for the terminal with the specified terminal.",
    } satisfies EndpointDefinition<
      i.TerminalTransportsByIdInput,
      o.TerminalTransportationOption
    >,
  },
};
