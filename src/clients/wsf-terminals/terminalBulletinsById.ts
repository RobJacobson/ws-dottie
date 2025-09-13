import { z } from "zod";
import {
  terminalBulletinsSchema,
  type TerminalBulletins,
} from "@/schemas/wsf-terminals/terminalBulletins.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBulletinsByTerminalId */
const terminalBulletinsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBulletinsByTerminalId */
export const getTerminalBulletinsByTerminalIdMeta: Endpoint<
  TerminalBulletinsByTerminalIdInput,
  TerminalBulletins
> = {
  api: "wsf-terminals",
  function: "getTerminalBulletinsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbulletins/{terminalId}",
  inputSchema: terminalBulletinsByTerminalIdInput,
  outputSchema: terminalBulletinsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalBulletinsByTerminalIdInput = z.infer<
  typeof terminalBulletinsByTerminalIdInput
>;
