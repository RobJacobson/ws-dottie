import { z } from "zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpaceByTerminalId */
const terminalSailingSpaceByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalSailingSpaceByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
  inputSchema: terminalSailingSpaceByTerminalIdInput,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalSailingSpaceByTerminalIdInput = z.infer<
  typeof terminalSailingSpaceByTerminalIdInput
>;
