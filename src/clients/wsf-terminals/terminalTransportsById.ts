import { z } from "zod";

import {
  type TerminalTransports,
  terminalTransportsSchema,
} from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalTransportsByTerminalId */
const terminalTransportsByTerminalIdInput = z.object({
  TerminalID: z.number().int(),
});

/** Endpoint metadata for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdMeta: EndpointDefinition<
  TerminalTransportsByTerminalIdInput,
  TerminalTransports
> = {
  api: "wsf-terminals",
  function: "terminalTransportsById",
  endpoint: "/ferries/api/terminals/rest/terminaltransports/{TerminalID}",
  inputSchema: terminalTransportsByTerminalIdInput,
  outputSchema: terminalTransportsSchema,
  sampleParams: { TerminalID: 10 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalTransportsByTerminalIdInput = z.infer<
  typeof terminalTransportsByTerminalIdInput
>;
