import { z } from "zod";
import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "@/schemas/wsf-terminals/terminalVerbose.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalVerboseByTerminalId */
const terminalVerboseByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalVerboseByTerminalId */
export const getTerminalVerboseByTerminalIdMeta: Endpoint<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
> = {
  endpoint: "/ferries/api/terminals/rest/terminalverbose/{terminalId}",
  inputSchema: terminalVerboseByTerminalIdInput,
  outputSchema: terminalVerboseSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalVerboseByTerminalIdInput = z.infer<
  typeof terminalVerboseByTerminalIdInput
>;
