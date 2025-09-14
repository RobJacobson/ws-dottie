import { z } from "zod";
import {
  type TerminalTransports,
  terminalTransportsSchema,
} from "@/schemas/wsf-terminals/terminalTransports.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalTransports */
const terminalTransportsInput = z.object({});

/** Endpoint metadata for getTerminalTransports */
export const getTerminalTransportsMeta: EndpointMeta<
  TerminalTransportsInput,
  TerminalTransports
> = {
  id: "wsf-terminals/terminalTransports",
  endpoint: "/ferries/api/terminals/rest/terminaltransports",
  inputSchema: terminalTransportsInput,
  outputSchema: terminalTransportsSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalTransportsInput = z.infer<typeof terminalTransportsInput>;
