import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  TerminalTransportsByTerminalIdInput,
  TerminalTransportsInput,
} from "./terminalTransports.input";
import {
  terminalTransportsByTerminalIdInputSchema,
  terminalTransportsInputSchema,
} from "./terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports.output";
import { terminalTransportSchema } from "./terminalTransports.output";

export const terminalTransportsResource = {
  name: "terminal-transports",
  documentation: {
    resourceDescription:
      "Each TerminalTransport item represents transportation options and parking information for Washington State Ferry terminals. These items include parking notes, vehicle-specific tips, transit links, and alternative transportation methods.",
    businessContext:
      "Use to plan terminal access by providing parking availability and transportation options for ferry terminal commuters.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchTerminalTransports: {
      endpoint: "/terminalTransports",
      inputSchema: terminalTransportsInputSchema,
      outputSchema: z.array(terminalTransportSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TerminalTransport objects for all terminals.",
    } satisfies EndpointDefinition<
      TerminalTransportsInput,
      TerminalTransport[]
    >,
    fetchTerminalTransportsByTerminalId: {
      endpoint: "/terminalTransports/{TerminalID}",
      inputSchema: terminalTransportsByTerminalIdInputSchema,
      outputSchema: terminalTransportSchema,
      sampleParams: { TerminalID: 10 },
      endpointDescription:
        "Returns TerminalTransport data for the terminal with the specified terminal.",
    } satisfies EndpointDefinition<
      TerminalTransportsByTerminalIdInput,
      TerminalTransport
    >,
  },
} satisfies EndpointGroup;
