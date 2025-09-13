import { z } from "zod";
import type { TerminalVerbose } from "@/schemas/wsf-terminals/terminalVerbose.zod";
import { terminalVerboseSchema } from "@/schemas/wsf-terminals/terminalVerbose.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalVerbose */
const terminalVerboseInput = z.object({});

/** Endpoint metadata for getTerminalVerbose */
export const getTerminalVerboseMeta: Endpoint<
  TerminalVerboseInput,
  TerminalVerbose[]
> = {
  api: "wsf-terminals",
  function: "getTerminalVerbose",
  endpoint: "/ferries/api/terminals/rest/terminalverbose",
  inputSchema: terminalVerboseInput,
  outputSchema: z.array(terminalVerboseSchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalVerboseInput = z.infer<typeof terminalVerboseInput>;
