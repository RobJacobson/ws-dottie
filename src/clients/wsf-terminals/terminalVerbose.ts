import { z } from "zod";
import { terminalVerbosesSchema } from "@/schemas/wsf-terminals";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getTerminalVerbose */
const terminalVerboseInput = z.object({});

/** Endpoint metadata for getTerminalVerbose */
export const getTerminalVerboseMeta = defineEndpoint({
  api: "wsf-terminals",
  function: "getTerminalVerbose",
  endpoint: "/ferries/api/terminals/rest/terminalverbose",
  inputSchema: terminalVerboseInput,
  outputSchema: terminalVerbosesSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
});

// Type exports (ONLY input types, NO output types)
export type TerminalVerboseInput = z.infer<typeof terminalVerboseInput>;
