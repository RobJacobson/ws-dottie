import { z } from "zod";

import {
  type TerminalTransportsList,
  terminalTransportsListSchema,
} from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalTransports */
const terminalTransportsInput = z.object({});

/** Endpoint metadata for getTerminalTransports */
export const getTerminalTransportsMeta: EndpointDefinition<
  TerminalTransportsInput,
  TerminalTransportsList
> = {
  id: "wsf-terminals/terminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: terminalTransportsInput,
  outputSchema: terminalTransportsListSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalTransportsInput = z.infer<typeof terminalTransportsInput>;
