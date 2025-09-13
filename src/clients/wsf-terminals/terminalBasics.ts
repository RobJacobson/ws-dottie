import { z } from "zod";
import { terminalBasicssSchema } from "@/schemas/wsf-terminals";
import type { TerminalBasics } from "@/schemas/wsf-terminals/terminalBasics.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBasics */
const terminalBasicsInput = z.object({});

/** Endpoint metadata for getTerminalBasics */
export const getTerminalBasicsMeta: Endpoint<
  TerminalBasicsInput,
  TerminalBasics[]
> = {
  api: "wsf-terminals",
  function: "getTerminalBasics",
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: terminalBasicsInput,
  outputSchema: terminalBasicssSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports (ONLY input types, NO output types)
export type TerminalBasicsInput = z.infer<typeof terminalBasicsInput>;
