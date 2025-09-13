import { z } from "zod";
import {
  type TerminalBasicsList,
  terminalBasicsListSchema,
} from "@/schemas/wsf-terminals/terminalBasics.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTerminalBasics */
const terminalBasicsInput = z.object({});

/** Endpoint metadata for getTerminalBasics */
export const getTerminalBasicsMeta: Endpoint<
  TerminalBasicsInput,
  TerminalBasicsList
> = {
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: terminalBasicsInput,
  outputSchema: terminalBasicsListSchema,
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalBasicsInput = z.infer<typeof terminalBasicsInput>;
