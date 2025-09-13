import { z } from "zod";
import { terminalBasicsSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalBasicsByTerminalId */
const terminalBasicsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBasicsByTerminalId */
export const getTerminalBasicsByTerminalIdMeta = {
  api: "wsf-terminals",
  function: "getTerminalBasicsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbasics/{terminalId}",
  inputSchema: terminalBasicsByTerminalIdInput,
  outputSchema: terminalBasicsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalBasicsByTerminalIdInput = z.infer<
  typeof terminalBasicsByTerminalIdInput
>;
