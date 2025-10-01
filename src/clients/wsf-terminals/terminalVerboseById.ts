import { z } from "zod";

import {
  type TerminalVerbose,
  terminalVerboseSchema,
} from "@/schemas/wsf-terminals/terminalVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalVerboseByTerminalId */
const terminalVerboseByTerminalIdInput = z.object({
  TerminalID: z.number().int(),
});

/** Endpoint metadata for getTerminalVerboseByTerminalId */
export const getTerminalVerboseByTerminalIdMeta: EndpointDefinition<
  TerminalVerboseByTerminalIdInput,
  TerminalVerbose
> = {
  api: "wsf-terminals",
  function: "terminalVerboseById",
  endpoint: "/ferries/api/terminals/rest/terminalverbose/{TerminalID}",
  inputSchema: terminalVerboseByTerminalIdInput,
  outputSchema: terminalVerboseSchema,
  sampleParams: { TerminalID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalVerboseByTerminalIdInput = z.infer<
  typeof terminalVerboseByTerminalIdInput
>;
