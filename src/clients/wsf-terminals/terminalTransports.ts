import { z } from "zod";
import { terminalTransportssSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalTransports */
const terminalTransportsInput = z.object({});

/** Endpoint metadata for getTerminalTransports */
export const getTerminalTransportsMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: terminalTransportsInput,
  outputSchema: terminalTransportssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalTransportsInput = z.infer<typeof terminalTransportsInput>;
