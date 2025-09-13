import { z } from "zod";
import { terminalTransportsSchema } from "@/schemas/wsf-terminals";
import type { TerminalTransports } from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalTransportsByTerminalId */
const terminalTransportsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalTransportsByTerminalId */
export const getTerminalTransportsByTerminalIdMeta: Endpoint<
  TerminalTransportsByTerminalIdInput,
  TerminalTransports
> = {
  api: "wsf-terminals",
  function: "getTerminalTransportsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminaltransports/{terminalId}",
  inputSchema: terminalTransportsByTerminalIdInput,
  outputSchema: terminalTransportsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalTransportsByTerminalIdInput = z.infer<
  typeof terminalTransportsByTerminalIdInput
>;
