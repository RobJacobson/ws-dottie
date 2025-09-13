import { z } from "zod";
import { terminalWaitTimessSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalWaitTimes */
const terminalWaitTimesInput = z.object({});

/** Endpoint metadata for getTerminalWaitTimes */
export const getTerminalWaitTimesMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: terminalWaitTimesInput,
  outputSchema: terminalWaitTimessSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesInput>;
