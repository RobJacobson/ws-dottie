import { z } from "zod";

import type { TerminalSailingSpace } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import { terminalSailingSpaceSchema } from "@/schemas/wsf-terminals/terminalSailingSpace.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTerminalSailingSpace */
const terminalSailingSpaceInput = z.object({}).strict();

/** Endpoint metadata for getTerminalSailingSpace */
export const getTerminalSailingSpaceMeta: EndpointDefinition<
  TerminalSailingSpaceInput,
  TerminalSailingSpace[]
> = {
  api: "wsf-terminals",
  function: "terminalSailingSpace",
  endpoint: "/ferries/api/terminals/rest/terminalsailingspace",
  inputSchema: terminalSailingSpaceInput,
  outputSchema: z.array(terminalSailingSpaceSchema),
  sampleParams: {},
  cacheStrategy: "STATIC",
};

// Type exports
export type TerminalSailingSpaceInput = z.infer<
  typeof terminalSailingSpaceInput
>;
