import { z } from "zod";
import {
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalWaitTimesByTerminalId */
const terminalWaitTimesByTerminalIdInput = z.object({
  terminalId: z.number().int(),
});

/** Endpoint metadata for getTerminalWaitTimesByTerminalId */
export const getTerminalWaitTimesByTerminalIdMeta: Endpoint<
  TerminalWaitTimesByTerminalIdInput,
  TerminalWaitTimes
> = {
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}",
  inputSchema: terminalWaitTimesByTerminalIdInput,
  outputSchema: terminalWaitTimesSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalWaitTimesByTerminalIdInput = z.infer<
  typeof terminalWaitTimesByTerminalIdInput
>;
