import { z } from "zod";
import { terminalWaitTimesSchema } from "@/schemas/wsf-terminals";
import type { TerminalWaitTimes } from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
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
  api: "wsf-terminals",
  function: "getTerminalWaitTimesByTerminalId",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}",
  inputSchema: terminalWaitTimesByTerminalIdInput,
  outputSchema: terminalWaitTimesSchema,
  sampleParams: { terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalWaitTimesByTerminalIdInput = z.infer<
  typeof terminalWaitTimesByTerminalIdInput
>;
