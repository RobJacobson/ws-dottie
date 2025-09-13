import { z } from "zod";
import { terminalVerboseSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalVerboseByTerminalId */
const terminalVerboseByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalVerboseByTerminalId */
export const getTerminalVerboseByTerminalIdMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalVerboseByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalverbose/{terminalId}",
  inputSchema: terminalVerboseByTerminalIdInput,
  outputSchema: terminalVerboseSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalVerboseByTerminalIdInput = z.infer<
  typeof terminalVerboseByTerminalIdInput
>;
