import { z } from "zod";
import { terminalWaitTimessSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalWaitTimes */
const terminalWaitTimesInput = z.object({});

/** Endpoint metadata for getTerminalWaitTimes */
export const getTerminalWaitTimesMeta = {
  api: "wsf-terminals",
  function: "getTerminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: terminalWaitTimesInput,
  outputSchema: terminalWaitTimessSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesInput>;
