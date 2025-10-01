import { z } from "zod";

import {
  type TerminalWaitTimes,
  terminalWaitTimesSchema,
} from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalWaitTimesByTerminalId */
const terminalWaitTimesByTerminalIdInput = z.object({
  TerminalID: z.number().int(),
});

/** Endpoint metadata for getTerminalWaitTimesByTerminalId */
export const getTerminalWaitTimesByTerminalIdMeta: EndpointDefinition<
  TerminalWaitTimesByTerminalIdInput,
  TerminalWaitTimes
> = {
  api: "wsf-terminals",
  function: "terminalWaitTimesById",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes/{TerminalID}",
  inputSchema: terminalWaitTimesByTerminalIdInput,
  outputSchema: terminalWaitTimesSchema,
  sampleParams: { TerminalID: 11 },
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalWaitTimesByTerminalIdInput = z.infer<
  typeof terminalWaitTimesByTerminalIdInput
>;
