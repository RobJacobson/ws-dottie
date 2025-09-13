import { z } from "zod";
import { terminalBulletinsSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBulletinsByTerminalId */
const terminalBulletinsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalBulletinsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
  inputSchema: terminalBulletinsByTerminalIdInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalBulletinsByTerminalIdInput = z.infer<
  typeof terminalBulletinsByTerminalIdInput
>;
