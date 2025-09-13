import { z } from "zod";
import {
  terminalBasicsSchema,
  type TerminalBasics,
} from "@/schemas/wsf-terminals/terminalBasics.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBasicsByTerminalId */
const terminalBasicsByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalBasicsByTerminalId */
export const getTerminalBasicsByTerminalIdMeta: Endpoint<
  TerminalBasicsByTerminalIdInput,
  TerminalBasics
> = {
  api: "wsf-terminals",
  function: "getTerminalBasicsByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalbasics/{terminalId}",
  inputSchema: terminalBasicsByTerminalIdInput,
  outputSchema: terminalBasicsSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalBasicsByTerminalIdInput = z.infer<
  typeof terminalBasicsByTerminalIdInput
>;
