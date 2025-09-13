import { z } from "zod";
import { terminalWaitTimesSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalWaitTimesByTerminalId */
const terminalWaitTimesByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalWaitTimesByTerminalId */
export const getTerminalWaitTimesByTerminalIdMeta = {
  api: "wsf-terminals",
  function: "getTerminalWaitTimesByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}",
  inputSchema: terminalWaitTimesByTerminalIdInput,
  outputSchema: terminalWaitTimesSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalWaitTimesByTerminalIdInput = z.infer<
  typeof terminalWaitTimesByTerminalIdInput
>;
