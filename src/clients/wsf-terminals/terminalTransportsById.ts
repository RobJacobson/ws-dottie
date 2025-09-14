import { z } from "zod";
import {
  type TerminalTransports,
  terminalTransportsSchema,
} from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalTransportsByTerminalId */
const terminalTransportsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdMeta: EndpointMeta<
  TerminalTransportsByTerminalIdInput,
  TerminalTransports
> = {
  id: "wsf-terminals/terminalTransportsById",
  endpoint: "/ferries/api/terminals/rest/terminaltransports/{terminalId}",
  inputSchema: terminalTransportsByTerminalIdInput,
  outputSchema: terminalTransportsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalTransportsByTerminalIdInput = z.infer<
  typeof terminalTransportsByTerminalIdInput
>;
