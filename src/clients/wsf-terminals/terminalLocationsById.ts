import { z } from "zod";
import { terminalLocationSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalLocationsByTerminalId */
const terminalLocationsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalLocationsByTerminalId */
export const getTerminalLocationsByTerminalIdMeta = {
  api: "wsf-terminals",
  function: "getTerminalLocationsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminallocations/{terminalId}",
  inputSchema: terminalLocationsByTerminalIdInput,
  outputSchema: terminalLocationSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalLocationsByTerminalIdInput = z.infer<
  typeof terminalLocationsByTerminalIdInput
>;
