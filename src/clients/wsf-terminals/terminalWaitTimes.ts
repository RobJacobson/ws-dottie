import { z } from "zod";

import type { TerminalWaitTimes } from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import { terminalWaitTimesSchema } from "@/schemas/wsf-terminals/terminalWaitTimes.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalWaitTimes */
const terminalWaitTimesInput = z.object({}).strict();

/** Endpoint metadata for getTerminalWaitTimes */
export const getTerminalWaitTimesMeta: EndpointDefinition<
  TerminalWaitTimesInput,
  TerminalWaitTimes[]
> = {
  api: "wsf-terminals",
  function: "terminalWaitTimes",
  endpoint: "/ferries/api/terminals/rest/terminalwaittimes",
  inputSchema: terminalWaitTimesInput,
  outputSchema: z.array(terminalWaitTimesSchema),
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalWaitTimesInput = z.infer<typeof terminalWaitTimesInput>;
