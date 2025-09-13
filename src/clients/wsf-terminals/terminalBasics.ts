import { z } from "zod";
import { terminalBasicssSchema } from "@/schemas/wsf-terminals";

/** Input schema for getTerminalBasics */
const terminalBasicsInput = z.object({});

/** Endpoint metadata for getTerminalBasics */
export const getTerminalBasicsMeta = {
  api: "wsf-terminals",
  function: "getTerminalBasics",
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: terminalBasicsInput,
  outputSchema: terminalBasicssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports (ONLY input types, NO output types)
export type TerminalBasicsInput = z.infer<typeof terminalBasicsInput>;
