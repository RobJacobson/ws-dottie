import { z } from "zod";
import type { TerminalVerbose } from "@/schemas/wsf-terminals/terminalVerbose.zod";
import { terminalVerboseSchema } from "@/schemas/wsf-terminals/terminalVerbose.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getTerminalVerbose */
const terminalVerboseInput = z.object({});

/** Endpoint metadata for getTerminalVerbose */
export const getTerminalVerboseMeta: EndpointMeta<
  TerminalVerboseInput,
  TerminalVerbose[]
> = {
  id: "wsf-terminals/terminalVerbose",
  endpoint: "/ferries/api/terminals/rest/terminalverbose",
  inputSchema: terminalVerboseInput,
  outputSchema: z.array(terminalVerboseSchema),
  sampleParams: {},
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type TerminalVerboseInput = z.infer<typeof terminalVerboseInput>;
