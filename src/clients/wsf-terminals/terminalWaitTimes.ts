import { z } from "zod";
import type { TerminalWaitTimes } from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import { terminalWaitTimesSchema } from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalWaitTimes */
const terminalWaitTimesInput = z.object({});

/** Endpoint metadata for getTerminalWaitTimes */
export const getTerminalWaitTimesMeta: Endpoint<
  TerminalWaitTimesInput,
  TerminalWaitTimes[]
> = {
  api: "wsf-terminals",
  function: "getTerminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: terminalWaitTimesInput,
  outputSchema: z.array(terminalWaitTimesSchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesInput>;
