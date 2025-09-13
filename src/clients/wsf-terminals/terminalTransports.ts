import { z } from "zod";
import { terminalTransportsSchema } from "@/schemas/wsf-terminals";
import type { TerminalTransports } from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalTransports */
const terminalTransportsInput = z.object({});

/** Endpoint metadata for getTerminalTransports */
export const getTerminalTransportsMeta: Endpoint<
  TerminalTransportsInput,
  TerminalTransports
> = {
  api: "wsf-terminals",
  function: "getTerminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: terminalTransportsInput,
  outputSchema: terminalTransportsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalTransportsInput = z.infer<typeof terminalTransportsInput>;
