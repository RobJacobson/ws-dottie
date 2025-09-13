import { z } from "zod";
import {
  terminalSailingSpaceSchema,
  type TerminalSailingSpace,
} from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpaceByTerminalId */
const terminalSailingSpaceByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalSailingSpaceByTerminalId */
export const getTerminalSailingSpaceByTerminalIdMeta: Endpoint<
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpace
> = {
  api: "wsf-terminals",
  function: "getTerminalSailingSpaceByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}",
  inputSchema: terminalSailingSpaceByTerminalIdInput,
  outputSchema: terminalSailingSpaceSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalSailingSpaceByTerminalIdInput = z.infer<
  typeof terminalSailingSpaceByTerminalIdInput
>;
