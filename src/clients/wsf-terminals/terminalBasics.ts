import { z } from "zod";

import {
  type TerminalBasicsList,
  terminalBasicsListSchema,
} from "@/schemas/wsf-terminals/terminalBasics.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalBasics */
const terminalBasicsInput = z.object({}).strict();

/** Endpoint metadata for getTerminalBasics */
export const getTerminalBasicsMeta: EndpointDefinition<
  TerminalBasicsInput,
  TerminalBasicsList
> = {
  api: "wsf-terminals",
  function: "terminalBasics",
  endpoint: "/ferries/api/terminals/rest/terminalbasics",
  inputSchema: terminalBasicsInput,
  outputSchema: terminalBasicsListSchema,
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalBasicsInput = z.infer<typeof terminalBasicsInput>;
